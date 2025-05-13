const jwt = require("jsonwebtoken");
const UserModel = require("../model/UserSchema");
require('dotenv').config();

const auth = async (req, res, next) => {
  try {
    if (!process.env.SECRET) {
        return res.status(401).json({ message: "SECRET is missing" });
    }

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    if (!token) {
      return res.status(401).json({ message: "token is missing" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token has expired" });
      } else if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      } else {
        return res.status(401).json({ message: "Failed to authenticate token" });
      }
    }

    console.log("Token verified");
    
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    req.userId = user._id;
    next();
  } 
  
  catch (err) {
    console.log("error in auth middleware", err);
    res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = auth;