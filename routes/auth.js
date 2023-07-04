import express from "express";
import { register, login } from "../controllers/auth.js";

const router = express.Router();

//CREATE USER
router.post("/register", register)

//LOGIN USER
router.post("/login", login)

export default router