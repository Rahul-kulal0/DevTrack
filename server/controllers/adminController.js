const User = require("../models/User");
const Task = require("../models/Task");
const ActivityLog = require("../models/ActivityLog");

// Get Dashboard Stats
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTasks = await Task.countDocuments();
    const recentLogs = await ActivityLog.find().sort({ createdAt: -1 }).limit(5).populate('performedBy', 'name email');

    res.json({ totalUsers, totalTasks, recentLogs });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role === 'admin') {
      return res.status(400).json({ message: "Cannot delete admin user" });
    }

    await Task.deleteMany({ user: user._id });
    await user.deleteOne();

    await ActivityLog.create({
      action: "User Deleted",
      details: `Admin deleted user ${user.email}.`,
      performedBy: req.user._id
    });

    res.json({ message: "User and associated tasks deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Task (Admin)
const adminDeleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.deleteOne();

    await ActivityLog.create({
      action: "Task Deleted by Admin",
      details: `Admin deleted task "${task.title}".`,
      performedBy: req.user._id
    });

    res.json({ message: "Task deleted by admin" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get Activity Logs
const getActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find().populate('performedBy', 'name email').sort({ createdAt: -1 }).limit(100);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  getAllTasks,
  adminDeleteTask,
  getActivityLogs
};
