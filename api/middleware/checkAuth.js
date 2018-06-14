/// Check Auhtenticated 
const jwt = require("jsonwebtoken"); 
const private = require("../../private"); 

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, private.JWT_KEY);
        req.userData = decoded;
        next(); 
    } catch (error) {
        return res.status(401).json({
            message: "Authentication failed" 
        });
    }
};