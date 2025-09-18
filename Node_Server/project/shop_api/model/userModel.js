import mongoose from "mongoose";
import mongooseUniqueValidator from 'mongoose-unique-validator';

const userSchema = mongoose.Schema({
  _id:Number,
  name : {
    type: String,
    required: [true,'Name is Required'],
    lowercase: true,
    trim:true
  },
  email : {
    type: String,
    required: [true,'Email is Required'],
    unique: true,
    lowercase: true,
    trim:true
  },
  password : {
    type: String,
    required: [true,'Password is Required'],
    maxlength: 10, 
    minlength: 5, 
    trim:true
  },
  contact : {
    type: String,
    required: [true,'Contact is Required'],
    unique: true,
    maxlength: 10, 
    minlength: 10, 
    trim:true
  },
  gender:{
    type: String,
    required: [true,"Gender is Required"]
  },
  role:String,
  status:Number,
  info:String
});

userSchema.plugin(mongooseUniqueValidator);
const userSchemaModel = mongoose.model('user_collection',userSchema);
export default userSchemaModel;