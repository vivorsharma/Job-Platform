const jwt = require('jsonwebtoken');
const User = require('../model/user');

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decode.userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        req.id = decode.userId;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = isAuthenticated;


// const jwt = require('jsonwebtoken');
// const User = require('../model/user');

// const isAuthenticated = async (req, res, next) => {
//     try {
//         const token = req.cookies.token;
//         if (!token) {
//             return res.status(401).json({ message: "User not authenticated" });
//         }

//         const decode = jwt.verify(token, process.env.SECRET_KEY);
//         const user = await User.findById(decode.userId);

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         req.user = user;
//         next();
//     } catch (error) {
//         console.error(error);
//         return res.status(401).json({ message: "Invalid token" });
//     }
// }

// module.exports = isAuthenticated;
