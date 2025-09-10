import express from "express";
import userController from "../controllers/user.controller.js"; // Adjust path if needed

const router = express.Router();

// GET all users
router.get("/", userController.getAllUsers);

// // GET by id
// router.get("/:id", userController.getUserById);

// POST create new user
router.post("/", userController.createUser);

// POST create user with manual hashing (optional, possibly redundant)
router.post("/with-hash", userController.createUserWithHashedPassword);

// PUT update user by ID
router.put("/:id", userController.updateUser);

// DELETE user by ID
router.delete("/:id", userController.deleteUser);

// POST login
router.post("/login", userController.loginUser);

export default router;