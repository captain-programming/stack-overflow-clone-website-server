import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  about: {type: String},
  tags: {type: [String]},
  joinedOn: {type: Date, default: Date.now},
  plans: {type: String, required: true},
})

const userModel = mongoose.model("users", userSchema);

export default userModel;