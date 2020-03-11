const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const Admin = require('../models/Admin');
const User = require('../models/User');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// @route   GET    api/admin
// @desc    Get Logged In Admin
// @access  Private
router.get('/', auth, async (req, res) => {
      
    try {
        const user = await Admin.findById(req.user.id).select('-password');
        res.json(user);
    } 
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
        
});

// @route   POST    api/admin
// @desc    Auth Admin & get token
// @access  Public
router.post(
    '/', 
    [
        check('email', 'Please include a valid email id').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try{
            let user = await Admin.findOne({ email });

            if(!user){
                return res.status(400).json({ msg: 'Invalid Email Id' })
            }
            
            const isMatch = await bcrypt.compare(password, user.password)
            
            if(!isMatch){
                return res.status(400).json({ msg: 'Invalid Password' })
            }

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, config.get('jwtSecret'), 
                {
                    expiresIn:36000
                }, (err, token) => {
                    if(err) throw err;
                    res.json({ token });
                }
            );
        }
        catch (err){
            console.error(err.message);
            res.status(500).send('Server Error');
        }
});

// @route   GET    api/admin/users
// @desc    Get all Users
// @access  Public
router.get('/users', auth, async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ date: -1 });
        res.json(users);    
    } 
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET    api/admin/users/:id
// @desc    Get User's tasks
// @access  Public
router.get('/users/:id', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.params.id}).sort({ date: -1});
        res.json(tasks);
    } 
    catch (err) {
        res.status(500).send('Server Error');
    }
});


module.exports = router;