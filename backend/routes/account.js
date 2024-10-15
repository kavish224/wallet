const express = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
const {JWT_SECRET} = require("../config");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const { authMiddleware } = require("../middleware");
const router = express.Router();
const transferSchema = zod.object({
    amount: zod.number().positive(),
    to: zod.string()
});

router.get("/balance", authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.userId });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        return res.json({ balance: account.balance });
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving balance", error });
    }
});

router.post("/transfer",authMiddleware, async(req, res) => {
    const { success, error } = transferSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "Invalid transfer request",
            errors: error.format()
        });
    }
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const {amount, to} = req.body;
        const account = await Account.findOne({userId: req.userId}).session(session);
        if(!account) {
            await session.abortTransaction();
            return res.status(404).json({ message: "Sender account not found" });
        }
        if (account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "insufficient balance"
            })
        }
        const toAccount = await Account.findOne({userId: to}).session(session);
        if(!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "to account not found"
            })
        }
        await Account.updateOne({userId: req.userId},{$inc: {balance: -amount}}).session(session);
        await Account.updateOne({userId: to}, {$inc: {balance: amount}}).session(session);
        await session.commitTransaction();
        res.json({
            message: "transfer successful"
        })
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({ message: "Error during transfer", error: err.message });
    } finally {
        session.endSession(); // Ensure session is always closed
    }
})
router.get("/accno", authMiddleware, async(req, res) => {
    return res.json({
        acc: req.userId
    })
})
module.exports = router;