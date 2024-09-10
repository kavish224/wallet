const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");
const { User } = require("./db")
const authMiddleware = async(req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1]; 
   
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(token?._id).select("-password")
        req.userId = decoded.userId;
        req.user = user
        next();
    } catch (err) {
        return res.status(403).json({});
    }
};

module.exports = {
    authMiddleware
}