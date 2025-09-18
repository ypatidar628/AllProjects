import mongoose from "mongoose";
import mongooseUniqueValidator from 'mongoose-unique-validator';

const categorySchema = mongoose.Schema({
  _id:Number,
  category_name : {
    type: String,
    required: [true,'Category Name is Required'],
    unique:true,
    lowercase: true,
    trim:true
  },
  info:String,
});

// Apply to uniqueValidator plugin to category Schema 
categorySchema.plugin(mongooseUniqueValidator);
const categorySchemaModel = mongoose.model('category_collection',categorySchema);
export default categorySchemaModel;