import express from "express";
import { register } from "../Controllers/auth.controller.js";
import { allUsers, deleteUser } from "../Controllers/user.controller.js";

const userRoutes = express.Router();

export default userRoutes;

userRoutes.post("/register", register);
userRoutes.get("/allUsers", allUsers);
userRoutes.post("/delete/:id", deleteUser);
