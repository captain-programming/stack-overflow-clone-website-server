import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/users.routes.js";
import questionRoutes from "./routes/question.routes.js";
import answerRoutes from "./routes/answer.routes.js";
import dotenv from 'dotenv';

const app = express();
const PORT = process.env.PORT || 8080;
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}))
app.use(cors());

app.get("/", (req, res) => {
  res.send("This is a stack overfow clone API");
})

app.use('/users', userRoutes);
app.use('/questions', questionRoutes);
app.use('/answer', answerRoutes);



connectDB().then(() => {
  app.listen(PORT, () => {
      console.log("listening for requests");
  })
})