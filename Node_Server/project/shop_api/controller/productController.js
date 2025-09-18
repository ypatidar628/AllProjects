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

export var viewAllproduct = async (req,res,next)=>{
    try{
      var productList = await productSchemaModel.find();
      var len = productList.length;
      if(len !== 0)
      {
        return res.status(200).json(new APIResponse(true,{product:productList}, "product Data Found"));
      }
      else
      {
      return res.status(404).json(new APIResponse(false,{product:productList},"product Data Not Found"));
      }
    }
    catch(err){
      console.log("View All Product Exception is : "+err);
      if(err) {
        return res.status(500).json(new APIResponse(false, err, "Internal Server Error"));
      }
    }
  }

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

export var updateProduct = async(req,res )=>{
  // var { oldproductName, newproductName } = req.body;
  const request_details = req.body;
    var oldProductName = request_details.oldProductName;
    var newProductName = request_details.newProductName;
try{
  var productList = await productSchemaModel.updateOne(
    {product_name : oldProductName},
    {$set:{product_name : newProductName}});
  // var len = productList.length;
  if(productList.matchedCount > 0)
  {
    return res.status(200).json(new APIResponse(true,{product:productList}, "product Data Updated"));
  }
  else
  {
  return res.status(404).json(new APIResponse(false,{},"product Not Found"));      
  }
}
catch(err){
  console.log("Update product Exception is : "+err);
  return res.status(500).json(new APIResponse(false, {}, "Internal Server Error"));
}
}

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