import express from "express"
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyTokens.js";
const router = express.Router();

//Checking user authentication
//router.get("/checkauthentication", verifyToken, (req, res, next) => {
//    res.send("Hello user you are logged in!")
//})

//if user want to delete account
//router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//    res.send("Hello user, you are logged in and you can delete your account!")
//})

//Checking if user is admin or not
//router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//    res.send("Hello admin, you are logged in and can delete all accounts!")
//})

//UPDATE USER
router.put("/:id", verifyUser, updateUser);

//DELETE USER
router.delete("/:id", verifyUser, deleteUser);

//GET USER
router.get("/:id", verifyUser, getUser);

//GET ALL USER
router.get("/", verifyAdmin, getUsers);

export default router