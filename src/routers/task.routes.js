import express from "express";
import taskController from "../controllers/task.controller.js"; // Adjust path if needed

const router = express.Router();

// GET all tasks
router.get("/", taskController.getAllTasks);

// POST create new task
router.post("/", taskController.createTask);

// PUT update task by ID
router.put("/:id", taskController.updateTask);

// DELETE task by ID
router.delete("/:id", taskController.deleteTask);

export default router;
