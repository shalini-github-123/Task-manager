const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    task: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["completed", "not completed"],
      default: "completed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("task", taskSchema);
