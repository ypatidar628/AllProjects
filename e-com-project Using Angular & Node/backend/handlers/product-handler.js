const Product = require("../db/product")

async function addProduct(model){
    const addedProduct = await Product.create(model);
    return addedProduct.toObject();
}

async function updateProduct(id, model){  
    const updatedProduct = await Product.findByIdAndUpdate(id, model, { new: true, runValidators: true });
    return updatedProduct?.toObject();       
} 

async function deleteProduct(id) {
    const deletedProduct = await Product.findByIdAndDelete(id);
    return deletedProduct?.toObject();
}   

async function getProductById(id) {
    const product = await Product.findById(id);
    return product?.toObject();  
}

async function viewAllProduct() {
    const allProducts = await Product.find();
    return allProducts.map(product => product.toObject());
}   

module.exports = { addProduct , updateProduct, deleteProduct, getProductById, viewAllProduct };
