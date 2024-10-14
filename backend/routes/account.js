const express = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
const {JWT_SECRET} = require("../config");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const { authMiddleware } = require("../middleware");
const router = express.Router();

router.get("/balance",authMiddleware, async(req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });
    const balance = account.balance
    return res.json({
        balance
    })
});

router.post("/transfer",authMiddleware, async(req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    const {amount, to} = req.body;
    const account = await Account.findOne({userId: req.userId}).session(session);
    if(!account) {
        await session.abortTransaction();
        return res.json({
            message: "account not found"
        })
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
})
router.get("/accno", authMiddleware, async(req, res) => {
    return res.json({
        acc: req.userId
    })
})
module.exports = router;