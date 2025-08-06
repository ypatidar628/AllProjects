const Product = require("../db/product")

async function addProduct(model){
    const addsProduct = await Product.create(model);
    return addsProduct.toObject();
}

async function updatePoduct(id, model){
    const updatedProduct = await Product.findByIdAndUpdate(id, model, { new: true, runValidators: true });
    return updatedProduct.toObject();       
} 

async function deleteProduct(id) {
    const deletedProduct = await Product.findByIdAndDelete(id);
    return deletedProduct.toObject();
}   

async function getProductById(id) {
    const product = await Product.findById(id);
    return product.toObject();  
}

async function viewAllProduct() {
    const allProduct = await Product.find();
    return allProduct.map(product => product.toObject());
}   

module.exports = {addProduct , updatePoduct, deleteProduct, getProductById, viewAllProduct};