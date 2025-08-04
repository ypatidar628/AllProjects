const express = require('express');
const router = express.Router();
const Brand = require('../db/brand');
const { addBrand, deleteBrand, getBrandById, viewAllBrand } = require('../handlers/brand-handler');

router.post('/add', async (req, res, next) => {
    try {
       console.log('Request body:', JSON.stringify(req.body));
        const  {name}  = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }
        let ifDuplicate = await Brand.findOne({ name: name });
        if (ifDuplicate) {
            return res.status(400).json({ message: 'Brand already exists' });
        }
        let result = await addBrand(name);
        console.log(result);
        res.status(201).json( { status: 200, message: "Brand added successfully", result });


    } catch (err) {
        next(err);
    }
});

router.get('/view', async (req, res, next) => {
    try {
        let allBrand = await viewAllBrand();
        if (!allBrand || allBrand.length === 0) {
            return res.status(404).json({ message: 'No Brand found' });
        }
        res.status(200).json({ status: 200, message: "All Brands", allBrand });
    } catch (err) {
        next(err);  
    }
});

router.get('/:id', async (req, res, next) => {
 let id = req.params["id"];
 let result = await getBrandById(id);
    if (!result) {
        return res.status(404).json({ message: 'Brand not found' });
    }
    res.status(200).json({ status: 200, message: "Brand found", result });
});

router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updated = await Brand.findByIdAndUpdate(id, { name }, { new: true });
    res.status(200).json({ status: 200, message: "Brand updated successfully", updated });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Update failed", error });
  }
});


router.delete('/delete/:id', async (req, res, next) => {
    try {
       const id = req.params["id"];
        console.log('id:', id);
        
        if (!id) {
            return res.status(400).json({ message: 'Id is required' });
        }
        let result = await deleteBrand(id);
        if (!result) {
            return res.status(404).json({ message: 'Breans not found' });
        }
        res.status(200).json({ status: 200, message: 'Brand deleted successfully', result });
    }
    catch (err) {
        next(err);
    }
})

module.exports = router;
