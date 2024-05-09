const Task = require('../models/taskModel'); // Import the Task model
const mongoose = require('mongoose');

// Get all tasks
const getTasks = async (req, res) => {
  const user_id = req.user._id;

  try {
    const tasks = await Task.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single task
const getTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such task' });
  }

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'No such task' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new task
const createTask = async (req, res) => {
  const { task, priority, deadline } = req.body;

  if (!task || !priority || !deadline) {
    return res.status(400).json({ error: 'Please fill in all the fields' });
  }

  try {
    const user_id = req.user._id;
    const todo = await Task.create({ user_id, task, priority, deadline, status:"not completed" });
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such task' });
  }

  try {
    const task = await Task.findOneAndDelete({ _id: id });
    if (!task) {
      return res.status(400).json({ error: 'No such task' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a task
const updateTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such task' });
  }

  try {
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (!task) {
      return res.status(404).json({ error: 'No such task' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Toggle the status of a task
const toggleStatus = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such task' });
  }

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'No such task' });
    }
    
    // Toggle the status between "completed" and "not completed"
    task.status = task.status === 'completed' ? 'not completed' : 'completed';
    
    // Save the updated task
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
  toggleStatus
};
