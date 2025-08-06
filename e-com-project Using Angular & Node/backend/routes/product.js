const express = require('express');
const router = express.Router();
const Product = require('../db/product');
const { addProduct } = require('../handlers/product-handler');


router.post('/add', async (req, res, next) => {
    try {
        console.log('Request body:', JSON.stringify(req.body));
        const { name, shotDescription, description, Price, discount, image, categoryId } = req.body;
        if (!name || !Price || !categoryId) {
            return res.status(400).json({ message: 'Name, Price and Category ID are required' });
        }
        let ifDuplicate = await Product.findOne({ name: name });
        if (ifDuplicate) {
            return res.status(400).json({ message: 'Product already exists' });
        }
        let result = await addProduct(req.body);
        console.log(result);
        res.status(201).json({ status: 200, message: "Product added successfully", result });
    } catch (err) {
        next(err);
    }
});

router.put('/update/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, shotDescription, description, Price, discount, image, categoryId } = req.body;
        if (!name || !Price || !categoryId) {
            return res.status(400).json({ message: 'Name, Price and Category ID are required' });
        }
        let updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ status: 200, message: "Product updated successfully", result: updatedProduct.toObject() });
    } catch (err) {
        next(err);
    }
});

router.delete('/delete/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        let deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ status: 200, message: "Product deleted successfully", result: deletedProduct.toObject() });
    } catch (err) {
        next(err);
    }   
});

router.get('/view/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        let product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ status: 200, message: "Product retrieved successfully", result: product.toObject() });
    }
    catch (err) {
        next(err);
    }
});

router.get('/viewAll', async (req, res, next) => {
    try {
        let allProducts = await Product.find();
        res.status(200).json({ status: 200, message: "All products retrieved successfully", result: allProducts.map(product => product.toObject()) });
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;