import '../connection/dbConfig.js';
import productSchemaModel from '../model/productModel.js';
import APIResponse from '../response/APIResponse.js';
import categorySchemaModel from "../model/categoryModel.js";
import brandSchemaModel from "../model/brandModel.js";

export var saveProduct = async(req ,res,next)=>{
    // Data Get from Request Object 
  var productDetails = req.body;

  // All Data Get From Collection 
  const productListData = await productSchemaModel.find();
  const cateId = await categorySchemaModel.findById(productDetails.categoryId);
  const brandId = await  brandSchemaModel.findById(productDetails.brandId);

  // Find length;
  var len = productListData.length;
  console.log("product List Length : "+len);

  var _id = (len==0) ? 1 : productListData[len-1]._id+1
  console.log("Id is : "+_id);

  productDetails = {...productDetails,"_id":_id,"info":new Date()};
  console.log("product Object Is : "+JSON.stringify(productDetails));
  console.log("cateId is : "+brandId._id);
  console.log("cateId 2 is : "+productDetails.brandId);
  try{
    if (cateId._id == productDetails.categoryId){

      if (brandId._id == productDetails.brandId){
    let resp = await productSchemaModel.create(productDetails);
    return res.status(200).json({"status":true,"message":"Product Data Inserted Successfully...","product":resp});
      console.log("save")
      }
      else {
        return res.status(404).json({"status":true,"message":"Brnad Not Found"});
      }
    }
    else
    {
      return res.status(404).json({"status":true,"message":"Category Not Found"});
    }
  }
   catch(err){
    console.log("Exception is : "+err);
    return res.status(400).json({"status":false,"message":"Product Data Not Inserted","error":err});
  }
}

export const viewAllProduct = async (req, res) => {
  try {
    const productList = await productSchemaModel.find();

    if (productList && productList.length > 0) {
      return res
          .status(200)
          .json(new APIResponse(true, { product: productList }, "Product Data Found"));
    }

    return res
        .status(404)
        .json(new APIResponse(false, { product: [] }, "Product Data Not Found"));
  } catch (err) {
    console.error("View All Product Exception:", err.message || err);

    return res
        .status(500)
        .json(new APIResponse(false, err , "Internal Server Error"));
  }
};

export var searchProduct = async(req,res )=>{
    var {product_name} = req.body;
  try{
    var productList = await productSchemaModel.findOne({product_name});
    // var len = productList.length;
    if(productList)
    {
      return res.status(200).json(new APIResponse(true,{product:productList}, "product Data Found"));
    }
    else
    {
    return res.status(404).json(new APIResponse(false,{},"product Data Not Found"));      
    }
  }
  catch(err){
    console.log("Search product Exception is : "+err);
    return res.status(500).json(new APIResponse(false, {}, "Internal Server Error"));
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;  // ✅ get product id from URL param
    const updateData = req.body; // ✅ all fields from request body

    const result = await productSchemaModel.updateOne(
        { _id: id },
        { $set: updateData }
    );

    if (result.matchedCount > 0) {
      return res
          .status(200)
          .json(new APIResponse(true, { product: result }, "Product Updated Successfully"));
    } else {
      return res
          .status(404)
          .json(new APIResponse(false, {}, "Product Not Found"));
    }
  } catch (err) {
    console.error("Update Product Exception:", err.message || err);
    return res
        .status(500)
        .json(new APIResponse(false, {}, "Internal Server Error"));
  }
};

export var deleteProduct = async(req,res) =>{
    var {product_name} = req.body;

  try{
    var productList = await productSchemaModel.deleteOne({product_name});
    // var len = productList.length;
    if(productList)
    {
      return res.status(200).json(new APIResponse(true,{product:productList}, "Product Data Deleted"));
    }
    else
    {
    return res.status(404).json(new APIResponse(false,{},"Product Data Not Deleted"));      
    }
  }
  catch(err){
    console.log("Delete product Exception is : "+err);
    return res.status(500).json(new APIResponse(false, {}, "Internal Server Error"));
  }
}