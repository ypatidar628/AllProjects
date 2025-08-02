const Category = require('../db/category');  



async function addCategory (name){
 const addingCategory = await Category.create({ name });

        return addingCategory.toObject();
}

async function updateCategory (id,name){

 const updatedCategory = await Category.findByIdAndUpdate(id,{ name: name },{ new:true, runValidators: true });

    return updatedCategory.toObject();;
}

async function deleteCategory(id) {
    const deletedCategory = await Category.findByIdAndDelete(id);   
    return  deletedCategory.toObject() ;
}
async function viewAllCategory(id) {
    const allCategory = await Category.find();   
    return  allCategory.map(category => category.toObject());
}
module.exports = { addCategory , updateCategory , deleteCategory , viewAllCategory};