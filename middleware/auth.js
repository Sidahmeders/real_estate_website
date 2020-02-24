require('dotenv').config();
const jwt = require('jsonwebtoken');


function auth(req, res, next) {
    const token = req.header('x-auth-token');

    if(!token) return res.status(401).json({msg: "No Token Found, Authorization denied"});

    try {
        const decoded = jwt.verify(token, process.env.jwtSecret);
        req.user = decoded;
        next();
    } catch(err) {
        res.status(400).json({msg: "Token is Not valid"});
    }
    
}

module.exports = auth;
