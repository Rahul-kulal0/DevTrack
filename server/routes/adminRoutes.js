const express = require("express");
const router = express.Router();
const {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  getAllTasks,
  adminDeleteTask,
  getActivityLogs
} = require("../controllers/adminController");
const { protect, admin } = require("../middleware/authMiddleware");

router.use(protect, admin);

router.get("/stats", getDashboardStats);
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.get("/tasks", getAllTasks);
router.delete("/tasks/:id", adminDeleteTask);
router.get("/logs", getActivityLogs);

module.exports = router;
