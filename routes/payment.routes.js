import express from "express";
import Razorpay  from "razorpay";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.post('/', async(req, res) =>{
  const {amount} = req.body;

  // console.log(amount)
  try{
    var instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY, key_secret: process.env.RAZORPAY_SECRET })
    
    let order=await instance.orders.create({
      amount: amount,
      currency: "INR",
      receipt: "receipt#1",
    })
    return res.status(201).send({message:"Successful",order:order,amount:amount})
  }catch(err){
    console.log(err);
    res.status(400).json({message: err.message});
  }
})

export default app;