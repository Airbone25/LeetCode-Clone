const express = require('express');
const mongoose = require('mongoose');
const connectdb = require('./database/connectdb'); 
const User = require('./models/schema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json()); 


const connectdb=async()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/jwtauth');
        console.log(`MongoDb Connected`);
    } catch(err){
        console.log(`error not connected`);
        process.exit(1);
    }
};
connectdb();

app.post('/signup', async (req, res) => {
    const { emailId, password } = req.body;

    try {
        
        const userExists = await User.findOne({ emailId });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({
            emailId,
            password
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully' });

    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Login User
app.post('/login', async (req, res) => {
    const { emailId, password } = req.body;

    try {
        
        const user = await User.findOne({ emailId });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user._id }, 'password12', { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
        
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
