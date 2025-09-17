const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
   name: { type: String, required: true, unique: true },
  shortDescription: String,
  description: String,
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  image: { type: [String], default: [] }, // ✅ array of strings
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  brandId: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
  isFeatured: { type: Boolean, default: false },
  isNew: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);

