import express from "express";
import { login, signup } from "../controllers/auth.controller.js";
import { getAllUser,getAllUserById, updateProfile } from "../controllers/users.controller.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post('/signup', signup)

router.post('/login', login)
router.get('/getAllUsers', getAllUser)
router.get('/getAllUsers/:id', getAllUserById)
router.patch('/update/:id',auth, updateProfile)

router.get("/", (req, res) => {
  res.send("Hii welcome");
})

export default router;