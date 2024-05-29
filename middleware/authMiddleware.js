const jwt = require('jsonwebtoken');
const User = require('../models/user');


const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token  || token !== 'batman-secret') {
         return res.status(401).json({ message: 'Authentication token is missing'});
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        
        
        // Log the decoded token to ensure it contains the expected information
        
        console.log("Decoded Token:", decoded);
        console.log("Here")
        
        const currUser = await User.findOne({ user_id: decoded.user_id });   
        
        if (!currUser) {
            throw new Error('User not found');
        }

        req.currUser = currUser;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed' + error });
    }
};

// export const generateJWTToken = (userId) =>{
//     // Generating JWT token
//     JWT_SECRET="batman-secret";
//     const token = jwt.sign(userId, JWT_SECRET, { expiresIn: '1h' });
//     console.log(token);
//     return token;
// }

module.exports = authMiddleware;
