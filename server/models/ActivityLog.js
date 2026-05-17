const mongoose = require("mongoose");

const activityLogSchema = mongoose.Schema({
  action: {
    type: String,
    required: true
  },
  details: {
    type: String
  },
  performedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  targetUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  targetTask: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task"
  }
}, { timestamps: true });

module.exports = mongoose.model("ActivityLog", activityLogSchema);
