require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.use(express.json());

function createToken(id){
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn: '1d'})
}

router.post('/signup', async (req, res) => {
    try {
        const user = await User.signup(req.body.username, req.body.password);
        const token = createToken(user._id);
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.login(req.body.username, req.body.password);
        const token = createToken(user._id);
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;