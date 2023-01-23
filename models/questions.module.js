import mongoose from "mongoose";


const QuestionSchema = mongoose.Schema({
  questionTitle: {type: String, required: "Question must have a title"},
  questionBody: {type: String, required: "Question must have a Body"},
  questionTags: {type: [String], required: "Question must have a tags"},
  noOfAnswers: {type: Number, default: 0},
  upVote: {type : [String], default: []},
  downVote: {type : [String], default: []},
  userPosted: {type: String, required: "Question must have an author"},
  userId: {type: String, required: true},
  askedOn: {type: Date, default: Date.now},
  answer: [{
    answerBody: String,
    userAnswered: String,
    userId: String,
    answerdOn: {type: Date, default: Date.now},
  }]
})

const questionsModel = mongoose.model("question", QuestionSchema);

export default questionsModel;