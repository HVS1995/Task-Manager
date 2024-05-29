const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Controller functions for CRUD operations
exports.getAllUsers =async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createUser = async (req, res) => {
    const user = new User({
        
        name: req.body.name,
        email: req.body.email
    });
    
    try {
        const newUser = await user.save();

        // Generating JWT token
        JWT_SECRET="batman-secret";
        const payload = { id: newUser.user_id };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        console.log(token);
        // return token;
        // token = generateToken(user.id)
        res.status(201).json({ token, user: newUser });
    } catch (error) {
        
        res.status(400).json({ message: error.message });
    }
};
    
exports.getUserById = async (req, res) => {
    let user;
   
    try {
        const { userId } = req.params;

        user = await User.findOne({user_id:userId});
        
        
        if (user == null) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    //res.user = user;
   
    //this next() used here is to pass control to the next middleware fun in stack
    //next();
};
