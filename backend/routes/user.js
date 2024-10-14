const express = require('express');
const { User, Account } = require("../db");
const {JWT_SECRET} = require("../config");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const { authMiddleware } = require('../middleware');
const router = express.Router();

const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string()
})
const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
})
const updateSchema = zod.object({
    password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
})

router.post("/signup", async (req, res) => {
    const {success} = signupSchema.safeParse(req.body);
    if (!success) {
        return res.json({
            message: "incorrect inputs"
        })
    }
    const existingUser = await User.findOne({
        username: req.body.username
    })
    if (existingUser) {
        return res.status(411).json({
            message: "user already exists"
        })
    }
    const user =  await User.create({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    })
    const userId = user._id;
    await Account.create({
        userId,
        balance: 10000000
    })
    const token = jwt.sign({
        userId
    }, JWT_SECRET)
    res.json({
        message: "user created successfully",
        token: token
    })
})

router.post("/signin", async (req, res) => {
    const { success } = signinSchema.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const user = await User.findOne({
        username: req.body.username
    });
    if (!user) {
        return res.json({
            message: "user not found"
        })
    }
    const isPasswordValid = await user.isPasswordCorrect(req.body.password);
    if (isPasswordValid) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }
    res.status(411).json({
        message: "Error while logging in"
    })
})
router.get("/username", authMiddleware, async(req, res)=>{

    const user = await User.findOne({
        _id: req.userId
    })
    return res.json({
        user: user.firstname +" "+ user.lastname
    })
})
router.post ("/",authMiddleware, async(req,res) => {
    const body = req.body;
    const {success} = updateSchema.safeParse(body);
    if (!success) {
        res.status(411).json({
            message: "error while update"
        })
    }
    await User.updateOne({ _id: req.userId }, req.body);
    res.json({
        message: "Updated successfully"
    })
})
router.post ("/bulk", async(req, res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [{
            firstname: {
                "$regex": filter
                }
            }, {
                lastname: {
                    "$regex": filter
                }
            }]
    })
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })
})
module.exports = router;