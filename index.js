const express = require("express");
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

let tasks = [];

// POST endpoint to add a new task
app.post('/tasks', (req, res) => {
    const { title, body, status } = req.body;
    const newTask = {
        id: uuidv4(),
        title,
        body,
        status
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// GET endpoint to get a list of all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// GET endpoint to get a task by its ID
app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === req.params.id);
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// PUT endpoint to change the title and body of a task
app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === req.params.id);
    if (task) {
        task.title = req.body.title || task.title;
        task.body = req.body.body || task.body;
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// PATCH endpoint to change the status of a task
app.patch('/tasks/:id/status', (req, res) => {
    const task = tasks.find(t => t.id === req.params.id);
    if (task) {
        task.status = req.body.status;
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// DELETE endpoint to remove a task from the array of tasks
app.delete('/tasks/:id', (req, res) => {
    tasks = tasks.filter(t => t.id !== req.params.id);
    res.status(204).end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

 

 
   

 

