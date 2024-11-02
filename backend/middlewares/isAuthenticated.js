const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token; // or req.headers.authorization if you're using a Bearer token
        if (!token) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY); // No need to await here
        req.id = decode.userId; // Assign userId to req.id
        next(); // Call the next middleware or route handler
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = isAuthenticated;
