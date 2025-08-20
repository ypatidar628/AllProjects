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

router.get("/view", async (req, res) => {
  try {
    const brands = await Brand.find();
    if (!brands ) {
      return res.status(404).json({
        status:404,
        success: false,
        message: "No brands found"
      });
    }
    else{
    return res.status(200).json({
      success: true,
      allBrand: brands
    });
}
  } catch (err) {
    console.error("Error fetching brands:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching brands"
    });
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
    res.status(200).json({ status: 200,success:true, message: "Brand updated successfully", updated });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Update failed", error });
  }
});


router.delete("/delete/:id", async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) {
      return res.status(404).json({status:404, success: false, message: "Brand not found" });
    }
    return res.status(200).json({status:200, success: true, message: "Brand deleted successfully" });
  } catch (err) {
    console.error("Error deleting brand:", err);
    return res.status(500).json({ status:500 ,success: false, message: "Server error while deleting brand" });
  }
});

module.exports = router;
