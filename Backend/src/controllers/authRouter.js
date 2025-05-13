const { Router } = require("express");
const UserModel = require("../model/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const authRouter = Router();

authRouter.post('/signup', async(req, res) => {
    try{
        const { username, email, password } = req.body;
        if(!username || !email || !password){
            return res.status(400).json({ message: "Username, Email and password are required" });
        }
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({ 
            username,
            email,
            password: hashedPassword 
        });

        const token = jwt.sign(
            { id: newUser._id, email: newUser.email, role: newUser.role }, 
            process.env.SECRET, 
            { expiresIn: "1h" }
        );

        res.status(201).json({ 
            message: "User created successfully",
            token: token,
            user: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email
            },
        });
    }
    catch(err) {
        console.log("error in signup", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

authRouter.post('/login', async(req, res) => {
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({ message: "Email and password are required" });
        }
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role }, 
            process.env.SECRET, 
            { expiresIn: "1h" }
        );

        res.status(200).json({ 
            message: "User logged in successfully",
            token: token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            },
        });
    }
    catch(err) {
        console.log("error in login", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = authRouter;