// middleware.js

const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: err });
        }

        req.user = decoded;
        next();
    });
}

module.exports = authenticateToken;


//Format
// email:
// exp
// firstName
// iat
// lastName
// userId