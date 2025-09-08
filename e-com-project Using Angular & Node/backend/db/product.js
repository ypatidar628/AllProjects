const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  image: { type: Array },
  categoryId: { type: String, required: true },
  brandId: { type: String , required: true }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
