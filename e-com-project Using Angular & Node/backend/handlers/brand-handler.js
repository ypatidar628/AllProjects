const Brand = require('../db/brand');


    
async function addBrand (name){
 const addingBrand = await Brand.create({name});
        return addingBrand.toObject();
}

async function viewAllBrand(id) {
    const allBrand = await Brand.find();   
    return  allBrand.map(Brand => Brand.toObject());
}
 
async function getBrandById (id){
 const getBrand = await Brand.findById(id);
        return getBrand.toObject(); 
}

async function updateBrand (id,name){
 const updatedBrand = await Brand.findByIdAndUpdate(id,{ name: name },{ new:true, runValidators: true });

    return updatedBrand.toObject();;
}

async function deleteBrand(id) {
    const deletedBrand = await Brand.findByIdAndDelete(id);   
    return  deletedBrand.toObject() ;
}

module.exports = { addBrand , updateBrand , deleteBrand , viewAllBrand, getBrandById };