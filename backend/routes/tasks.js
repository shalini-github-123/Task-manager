const express = require("express");
const {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  updateTask,
  toggleStatus,
} = require("../controllers/taskController"); // Import the adapted controller functions
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// Require authentication for all task routes
router.use(requireAuth);

// GET all tasks
router.get("/", getTasks);

// GET a single task
router.get("/:id", getTask);

// POST a new task
router.post("/", createTask);

// DELETE a task
router.delete("/:id", deleteTask);

// UPDATE a task
router.patch("/:id", updateTask);

// TOGGLE status of a task
router.patch("/:id/toggle", toggleStatus);

module.exports = router;
