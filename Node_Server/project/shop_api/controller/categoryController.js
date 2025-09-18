import '../connection/dbConfig.js';
import categorySchemaModel from '../model/categoryModel.js'
import APIResponse from '../response/APIResponse.js';


export let saveCategory = async (req, res) => {

  // Data Get from Request Object 
  let categoryDetails = req.body;

  // All Data Get From Collection 
  const categoryListData = await categorySchemaModel.find();

  // Find length;
  let len = categoryListData.length;
  console.log("Category List Length : " + len);

  let _id = (len == 0) ? 1 : categoryListData[len - 1]._id + 1
  console.log("Id is : " + _id);

  categoryDetails = { ...categoryDetails, "_id": _id, };
  console.log("Category Object Is : " + JSON.stringify(categoryDetails));

  try {
    let resp = await categorySchemaModel.create(categoryDetails);


    res.status(200).json({ "status": true, "message": "Data Inserted Successfully...", "Category": resp });
  }
  catch (err) {
    console.log(" Category Exception is : " + err.message);
    res.status(500).json({ "status": false, "message": "Record Not Inserted", "error": err.message });
  }

}

export let viewAllCategory = async (req, res, next) => {
  // let userCategory = req.body;

  try {
    let categoryList = await categorySchemaModel.find();
    // console.log("all"+JSON.stringify(userDetails));

    let len = categoryList.length;
    if (len != 0) {

      res.status(200).json(new APIResponse(true, { category: categoryList }, "Category Data Found"));
    }
    else {
      res.status(401).json(new APIResponse(false, { category: categoryList }, "Category Data Not Found"));
    }
  }
  catch (err) {
    console.log("Category Data found Exception is : " + err);
  }
}

export let searchCategory = async (req, res, next) => {
  let { category_name } = req.body;

  try {
    let categoryList = await categorySchemaModel.findOne({ category_name });
    // console.log("all"+JSON.stringify(userDetails));

    let len = categoryList.length;
    if (len != 0) {
      res.status(200).json(new APIResponse(true, { category: categoryList }, "Category Data Found"));
    }
    else {
      res.status(401).json(new APIResponse(false, { category: categoryList }, "Category Data Not Found"));
    }
  }
  catch (err) {
    console.log("Category Data found Exception is : " + err);
  }
}

export let deleteCategory = async(req,res) =>{
  let {category_name} = req.body;
try{
  let categoryList = await categorySchemaModel.deleteOne({category_name});
  // let len = categoryList.length;
  if(categoryList)   //len != 0
  {
    return res.status(200).json(new APIResponse(true,{category:categoryList}, "Category Data Deleted"));
  }
  else
  {
  return res.status(404).json(new APIResponse(false,{},"Category Data Not Deleted"));      
  }
}
catch(err){
  console.log("Delete Category Exception is : "+err);
  return res.status(500).json(new APIResponse(false, {}, "Internal Server Error"));
}
}

export let updateCategory = async (req, res) => {
  const { id } = req.params; // get id from params
  const { newCategoryName } = req.body; // get new name from body

  try {
    const matchId = await categorySchemaModel.findById(id);

    if (!matchId) {
      return res
          .status(404)
          .json({ status: false, message: "Category not found" });
    }

    const updated = await categorySchemaModel.findByIdAndUpdate(
        id,
        { category_name: newCategoryName },
        { new: true }
    );

    return res.json({ status: true, data: updated, message: "Category updated successfully" });
  } catch (err) {
    console.error("Update Category Exception:", err);
    return res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};
