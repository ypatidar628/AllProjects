const express = require('express');
const router = express.Router();
const Category = require('../db/category');  


router.post('/', async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        const category = await Category.create({ name });

        res.status(201).json(category.toObject());
        console.log(category);
        
    } catch (err) {
        next(err);
    }
});

router.put('/', async (req, res, next) => {
  try {
    const { id, name } = req.body;

    if (!id || !name) {
      return res.status(400).json({ message: 'Both id and name are required' });
    }

    const category = await Category.findByIdAndUpdate(id,{ name: name },{ new:true, runValidators: true });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category.toObject());
  } catch (err) {
    next(err);
  }
});

module.exports = router;
