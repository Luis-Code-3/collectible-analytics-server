const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if(!token || token === null) {
        return res.status(401).json({message: "Token not found"})
    }

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({message: "Invalid Token"})
        }

        req.user = user;
        next()
    });
}

module.exports = isAuthenticated;