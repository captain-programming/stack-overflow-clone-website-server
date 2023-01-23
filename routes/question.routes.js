import express from "express";
import { askQuestion, deleteQuestion, getQuestion, getQuestionById, voteQuestion } from "../controllers/askQuestion.controller.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/ask", auth, askQuestion);
router.get("/", getQuestion);
router.get("/:id", auth, getQuestionById);
router.delete("/delete/:id", auth, deleteQuestion);
router.patch('/vote/:id', auth, voteQuestion)

export default router;