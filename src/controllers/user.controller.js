import asyncHandler from "express-async-handler";
import userModel from "../models/user.models.js"; // Make sure the extension matches your setup
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userController = {
  getAllUsers: asyncHandler(async (req, res) => {
    const users = await userModel.find();
    res.status(200).json(users);
  }),

  createUser: asyncHandler(async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const user = await userModel.create(req.body);
    res.status(201).json(user); // 201 Created is more appropriate
  }),

  updateUser: asyncHandler(async (req, res) => {
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,              // return the updated document
      runValidators: true     // optionally run schema validators
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  }),

  deleteUser: asyncHandler(async (req, res) => {
    const user = await userModel.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  })

  ,
  loginUser: asyncHandler(async (req, res) => {
    const user = await userModel.findOne({ email: req.body.email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production" ? true : false,
      maxAge: 1000 * 60 * 60 * 8 // 8 hours
    });

    res.cookie("token", token, {
      httpOnly: false,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production" ? true : false,
      maxAge: 1000 * 60 * 60 * 8 // 8 hours
    });

    return res.status(200).json({ message: "Logged in successfully", token: token, user: user });
  }),
  createUserWithHashedPassword: asyncHandler(async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = await userModel.create({ ...req.body, password: hashedPassword });
    res.status(201).json(user);
  })
};

export default userController;
