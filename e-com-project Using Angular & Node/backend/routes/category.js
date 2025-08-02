const express = require('express');
const router = express.Router();
const Category = require('../db/category');
const { addCategory, updateCategory, deleteCategory, viewAllCategory } = require('../handlers/category-handler');


router.post('/add', async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }
        let ifDuplicate = await Category.findOne({ name: name });
        if (ifDuplicate) {
            return res.status(400).json({ message: 'Category already exists' });
        }
        let result = await addCategory(name);
        console.log(result);
        res.status(201).json( { status: 200, message: "Category added successfully", result });


    } catch (err) {
        next(err);
    }
});
router.get('/view', async (req, res, next) => {
    try {
        let allCategories = await viewAllCategory();
        if (!allCategories || allCategories.length === 0) {
            return res.status(404).json({ message: 'No categories found' });
        }
        res.status(200).json({ status: 200, message: "All Categories", allCategories });
    } catch (err) {
        next(err);  
    }
});
router.put('/update/:id', async (req, res, next) => {
    try {
        const { id, name } = req.body;

        if (!id || !name) {
            return res.status(400).json({ message: 'Both id and name are required' });
        }

        let result = await updateCategory(id, name);
        if (!result) {
            return res.status(404).json({ message: 'Category not found' });
        }


        res.status(200).json({ status: 200, message: "Category Update Successfully", result });
    } catch (err) {
        next(err);
    }
});

router.delete('/delete/:id', async (req, res, next) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'Id is required' });
        }
        let result = await deleteCategory(id);
        if (!result) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ status: 200, message: 'Category deleted successfully', result });
    }
    catch (err) {
        next(err);
    }
})

module.exports = router;
