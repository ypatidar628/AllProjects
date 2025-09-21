import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const cartSchema = new mongoose.Schema({
  userId: { type:Number, required: true },
  productId: {  type:Number, required: true },
  quantity: { type: Number, default: 1 },
  category_name: { type: String, required: true },
  product_name: { type: String, required: true },
  product_price: { type: Number, required: true },
  product_image: { type: String },
}, { timestamps: true });

cartSchema.plugin(mongooseUniqueValidator);
const cartSchemaModel = mongoose.model('cart_collection',cartSchema);
export default cartSchemaModel;
