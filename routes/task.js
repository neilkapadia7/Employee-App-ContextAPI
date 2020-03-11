const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const User = require('../models/User');
const Task = require('../models/Task');

// @route   GET    api/task
// @desc    Get all Tasks
// @access  Private
router.get('/', auth , async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id }).sort({ date: -1 });
        res.json(tasks);
    } 
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST    api/task
// @desc    Add New Task
// @access  Private
router.post(
    '/',
    [ auth, 
        [
            check('title', 'Title is Required').not().isEmpty(),
            check('body', 'Body is Required').not().isEmpty(),
            check('status','Status is required').not().isEmpty()
        ]
    ] ,
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, body, status } = req.body;

        try {
            const newTask = new Task({
                title,
                body,
                status,
                user: req.user.id 
            });
            
            const task = await newTask.save();

            res.json(task);
        } 
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
)

// @route   PUT    api/task/:id
// @desc    Update Tasks
// @access  Private
router.put('/:id', auth, async (req, res) =>{
    const {title, body, status} = req.body;

    // Build blog object
    const taskFields = {};
    
    if(title) taskFields.title = title;
    if(body) taskFields.body = body;
    if(status) taskFields.status = status;

    try {
        let task = await Task.findById(req.params.id);

        if(!task) return res.status(404).json({ msg: 'Task Not FOund'});

        if(task.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not Authorized' });
        }

        task = await Task.findByIdAndUpdate(req.params.id,
            { $set: taskFields },
            { new: true });

        res.json(task);
    } 
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route   DELETE    api/tast/:id
// @desc    Delete Tasts
// @access  Private
router.delete('/:id', auth, async (req,res) => {
    try {
        const task = await Task.findById(req.params.id);

        if(!task) return res.status(404).json({ msg: 'Task Not Found'});

        if(task.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not Authorized'});
        }

        await Task.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Task Removed'});
    } 
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});




module.exports = router;