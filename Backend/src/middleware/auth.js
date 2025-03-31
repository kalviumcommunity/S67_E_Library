// const jwt = require("jsonwebtoken");        // Import JWT for token verification
// require("dotenv").config();                 // Load environment variables

// const auth = (req, res, next) => {
//   const tokenauth = req.headers.authorization;  // Extract token from headers

//   // ✅ Check if token exists and is correctly formatted
//   if (!tokenauth || !tokenauth.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Unauthorized: No token provided" });
//   }

//   const token = tokenauth.split(" ")[1];    // Extract the actual token
//   const secret = process.env.private_key;   // Load the JWT secret from .env

//   jwt.verify(token, secret, (err, decoded) => {
//     if (err) {
//       console.error("Error in auth middleware:", err);
//       return res.status(401).json({ message: "Invalid or expired token" });
//     }

//     req.user = decoded.email;   // ✅ Attach the user email to req.user
//     next();                      // ✅ Proceed to the next middleware
//   });
// };

// module.exports = auth;







const auth = (req, res, next) => {
  const tokenauth = req.headers.authorization; // ✅ Using lowercase `authorization`
  
  // Static token for validation
  const STATIC_TOKEN = "your-static-secret-token";

  if (!tokenauth) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = tokenauth.split(" ")[1]; // Extract the token

  if (token === STATIC_TOKEN) {
    console.log("✅ Token verified successfully");
    next();
  } else {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

module.exports = auth;
