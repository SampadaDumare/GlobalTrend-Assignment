const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Task = require('../model/Task')
const Users = require('../model/User')
const fetchuser = require('../middleware/fetchuser');

// Route1: addTask route for role=admin POST = '/api/user/addTask'. Login required
router.post('/addTask', fetchuser, [
    body('title', 'Enter valid title').isLength({ min: 2 }),
    body('description', 'Enter valid description').isLength({ min: 3 }),
    body('status')
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        // create a new project 
        const { title, description, status } = req.body;
        const task = new Task({
            title, description, status, user: req.user.id
        })
        const savedTask = await task.save();
        res.json(savedTask);

    } catch (error) {
        console.error(error.message)
        return res.status(500).send("Internal server error")
    }
})

// Route2: deleteTask route for role=admin DELETE = '/api/user/deleteTask'. Login required
router.delete('/deleteTask/:id', fetchuser, async (req, res) => {

    try {
        // find the task by its id mensioned in parameter
        let task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: "Not found" })
        }

        // dont delete project if this user did not created it
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Not allowd" })
        }

        // delete project
        task = await Task.findByIdAndDelete(req.params.id);
        res.json({ "success": "Task deleted successfully", task: task })

    } catch (error) {
        console.error(error.message)
        return res.status(500).send("Internal server error")
    }
})

//Route3 : Get all tasks using: GET "/api/notes/fetchallTasks". login required
router.get('/fetchallTasks', fetchuser, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

//Route4 : Update tasks using: PUT "/api/notes/updatetasks". login required
router.put('/updatetasks/:id', fetchuser, async (req, res) => {
    try {
        const { status } = req.body;
        // create a newNote object
        const newTask = {};
        if (status) { newTask.status = status; }

        // Find note to be updated and update it
        let task = await Task.findById(req.params.id); // find the note using note id we passed as paramerter
        if (!task) { return res.status(404).send("Not Found") } // if note not found

        // Allow updation only if user owns this note
        if (task.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        task = await Task.findByIdAndUpdate(req.params.id, { $set: newTask }, { new: true });
        res.json(task);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

// for filtering
router.get('/filter',fetchuser, async(req, res) =>{
    try {
        const {status} = req.query;
        let filter = {};
        if(status){
            filter.status = status;
        }
        let task = await Task.find(filter);
        res.json(task);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal server error");
    }
})

module.exports = router;