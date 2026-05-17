const Task = require("../models/Task");

// Create Task
const createTask = async (req, res) => {
  const { title, description } = req.body;

  const task = await Task.create({
    user: req.user._id,
    title,
    description
  });

  res.status(201).json(task);
};

// Get Tasks
const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
};

// Update Task
const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task) {
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;

    const updated = await task.save();
    res.json(updated);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task) {
    await task.deleteOne();
    res.json({ message: "Task removed" });
  } else {
    res.status(404).json({ message: "Task not found" });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };