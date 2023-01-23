import mongoose from "mongoose";
import questionsModel from "../models/questions.module.js";


export const askQuestion = async(req, res) => {
  const postQuestionData = req.body;
  const postQuestion = new questionsModel({...postQuestionData});

  try{
    await postQuestion.save();
    res.status(200).json("Posted a question successfully");
  }catch(err){
    console.log(err);
    res.status(409).json("Couldn't post a new question");
  }
}

export const getQuestion = async(req, res) => {

  try{
    const questionData = await questionsModel.find();
    res.status(200).json(questionData);
  }catch(err){
    console.log(err);
    res.status(409).json({"message": err});
  }
}

export const getQuestionById = async(req, res) => {

  const {id: _id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(_id)){
    return res.status(404).send('question unavailable...');
  }

  try{
    const questionData = await questionsModel.findById(_id);
    res.status(200).json(questionData);
  }catch(err){
    console.log(err);
    res.status(409).json({"message": err});
  }
}

export const deleteQuestion = async(req, res)=>{
  const {id: _id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(_id)){
    return res.status(404).send('question unavailable...');
  }

  try{
    await questionsModel.findByIdAndRemove(_id);
    res.status(200).json({message: "successfully deleted..."});
  }catch(err){
    res.status(404).json({message: err.message});
  }
}

export const voteQuestion = async(req, res)=>{
  const {id: _id} = req.params;
  const {value, userId} = req.body;

  if(!mongoose.Types.ObjectId.isValid(_id)){
    return res.status(404).send('question unavailable...');
  }

  try{
    const question = await questionsModel.findById(_id);
    const upIndex = question.upVote.findIndex((id) => id===String(userId));
    const downIndex = question.downVote.findIndex((id) => id===String(userId));

    if(value === 'upVote'){
      if(downIndex !==-1){
        question.downVote = question.downVote.filter((id) => id !== String(userId))
      }
      if(upIndex ===-1){
        question.upVote.push(userId);
      }else{
        question.upVote = question.upVote.filter((id) => id !== String(userId))
      }
    }

    else if(value === 'downVote'){
      if(upIndex !==-1){
        question.upVote = question.upVote.filter((id) => id !== String(userId))
      }
      if(downIndex ===-1){
        question.downVote.push(userId);
      }else{
        question.downVote = question.downVote.filter((id) => id !== String(userId))
      }
    }

    let ans = await questionsModel.findByIdAndUpdate(_id, question);
    // console.log(ans);
    res.status(200).json({message: "voted successfully"});

  }catch(err){
    console.log(err);
    res.status(404).json({message: "id not found"});
  }
}