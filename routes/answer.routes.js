import express from "express";
import { deleteAnswers, postAnswer } from "../controllers/answer.controller.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.patch("/post/:id", auth, postAnswer);
router.patch("/delete/:id", auth, deleteAnswers);

export default router;