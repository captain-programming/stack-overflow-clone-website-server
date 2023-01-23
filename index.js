import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/users.routes.js";
import questionRoutes from "./routes/question.routes.js";
import answerRoutes from "./routes/answer.routes.js";
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const dbConnect=()=>{
  return mongoose.connect(`${process.env.MONGODB_URL}`)
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
const PORT = process.env.PORT || 8080;


app.listen(PORT, async()=>{
  await dbConnect();
  console.log(`server started on port ${PORT}`);
});