const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:String,
    shotDescription:String,
    description:String,
    purchasePrice:Number,
    sellingPrice:Number,
    image:Array(String),
    categoryId:{type : mongoose.Schema.Types.ObjectId, ref: 'categories'},
});
const Product = mongoose.model('products', productSchema);
module.exports = Product;