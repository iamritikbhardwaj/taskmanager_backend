import asyncHandler from "express-async-handler";
import taskModel from "../models/task.models.js"; // Make sure the extension matches your setup

const taskController = {
  getAllTasks: asyncHandler(async (req, res) => {
    const tasks = await taskModel.find({
      userId: req.query.id
    });
    res.status(200).json(tasks);
  }),

  getTaskById: asyncHandler(async (req, res) => {
    const task = await taskModel.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  }),

  createTask: asyncHandler(async (req, res) => {
    req.body.userId = req.params.id; // Ensure the task is associated with the user
    const task = await taskModel.create(req.body);
    res.status(201).json(task); // 201 Created is more appropriate
  }),

  updateTask: asyncHandler(async (req, res) => {
    const task = await taskModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,              // return the updated document
      runValidators: true     // optionally run schema validators
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  }),

  deleteTask: asyncHandler(async (req, res) => {
    const task = await taskModel.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  })
};

export default taskController;
