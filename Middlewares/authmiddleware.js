
const jwt = require("jsonwebtoken");
const JWT_TOKEN = "121212";
function authMiddleware(req, res, next) {
    const headers = req.headers.authorization;

    if (!headers || headers.startsWith('bearer')) {
        res.status(403).json({

        })
    }



    const token = headers.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_TOKEN);
        req.userId = decoded.userId;
        next();

    } catch (error) {

        res.status(403).json({})
    }

}

module.exports = authMiddleware;