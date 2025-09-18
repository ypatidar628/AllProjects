import mongoose from "mongoose";
import mongooseUniqueValidator from 'mongoose-unique-validator';

const productSchema = mongoose.Schema({
  _id:Number,
  product_name : {
    type: String,
    required: [true,'Product Name is Required'],
    lowercase: true,
    trim:true
  },
  // product_category_name : {
  //   type: String,
  //   required: [true,'Product Category is Required'],
  //   lowercase: true,
  //   trim:true
  // },
  product_details : {
    type: String,
    required: [true,'Product Details is Required'],
    lowercase:true,
    trim:true
  },
  brandId: {
    type: String,
    required: [true,'Product Brand is Required'],
  },
  product_image : {
    type: String,
    required: [true,'Product Image is Required'],
    trim:true
  },
  product_price : Number,
  categoryId : {
    type: String,
    required:[true,'Product Category is Required']
  },
  info : String
});

// Apply to uniqueValidator plugin to product Schema 

productSchema.plugin(mongooseUniqueValidator);
const productSchemaModel = mongoose.model('product_collection',productSchema);
export default productSchemaModel;