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
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            message: "Incorrect inputs",
            errors: parsed.error.format()
        });
    }

    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
        return res.status(409).json({
            message: "User already exists"
        });
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
    const parsed = signinSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            message: "Incorrect inputs",
            errors: parsed.error.format()
        });
    }
    const user = await User.findOne({
        username: req.body.username
    });
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
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
    const parsed = updateSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            message: "Error while updating",
            errors: parsed.error.format()
        });
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