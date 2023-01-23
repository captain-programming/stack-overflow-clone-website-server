import mongoose from "mongoose";
import userModel from "../models/auth.modeule.js";

export const getAllUser = async(req, res)=>{
  try{
    const allUsers = await userModel.find({},{email:0, password: 0});
    
    res.status(200).json(allUsers);
  }catch(err){
    res.status(404).json({message: err.message});
  }
}

export const getAllUserById = async(req, res) => {
  const {id: _id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(_id)){
    return res.status(404).send('users unavailable...');
  }

  try{
    const questionData = await userModel.findById(_id, {email:0, password: 0});
    res.status(200).json(questionData);
  }catch(err){
    // console.log(err);
    res.status(404).json({"message": err.message});
  }
}

export const updateProfile = async(req, res) => {
  const {id: _id} = req.params;
  const {name, about, tags} = req.body;

  if(!mongoose.Types.ObjectId.isValid(_id)){
    return res.status(404).send('users unavailable...');
  }

  try{
    const updatedProfile = await userModel.findByIdAndUpdate(_id, { $set: {'name': name, 'about': about, 'tags': tags}}, {new: true});
    res.status(200).json(updateProfile)
    
  }catch(err){
    // console.log(err);
    res.status(405).json({"message": err.message});
  }
}
