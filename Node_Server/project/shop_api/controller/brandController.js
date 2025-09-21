import '../connection/dbConfig.js';
import brandSchemaModel from '../model/brandModel.js'
import APIResponse from '../response/APIResponse.js';
import categorySchemaModel from "../model/categoryModel.js";


export let saveBrand = async (req, res) => {

    // Data Get from Request Object 
    let brandDetails = req.body;

    // All Data Get From Collection 
    const brandListData = await brandSchemaModel.find();

    // Find length;
    let len = brandListData.length;
    console.log("brand List Length : " + len);

    let _id = (len == 0) ? 1 : brandListData[len - 1]._id + 1
    console.log("Id is : " + _id);

    brandDetails = { ...brandDetails, "_id": _id, };
    console.log("brand Object Is : " + JSON.stringify(brandDetails));

    try {
        let resp = await brandSchemaModel.create(brandDetails);


        res.status(200).json({ "status": true, "message": "Data Inserted Successfully...", "brand": resp });
    }
    catch (err) {
        console.log(" brand Exception is : " + err.message);
        res.status(500).json({ "status": false, "message": "Record Not Inserted", "error": err.message });
    }

}

export let viewAllBrand = async (req, res, next) => {
    // let userbrand = req.body;

    try {
        let brandList = await brandSchemaModel.find();
        // console.log("all"+JSON.stringify(userDetails));

        let len = brandList.length;
        if (len != 0) {

            res.status(200).json(new APIResponse(true, { brand: brandList }, "brand Data Found"));
        }
        else {
            res.status(401).json(new APIResponse(false, { brand: brandList }, "brand Data Not Found"));
        }
    }
    catch (err) {
        console.log("brand Data found Exception is : " + err);
    }
}

export let serachBrand = async (req, res, next) => {
    let { brand_name } = req.body;

    try {
        let brandList = await brandSchemaModel.findOne({ brand_name });
        // console.log("all"+JSON.stringify(userDetails));

        let len = brandList.length;
        if (len != 0) {
            res.status(200).json(new APIResponse(true, { brand: brandList }, "brand Data Found"));
        }
        else {
            res.status(401).json(new APIResponse(false, { brand: brandList }, "brand Data Not Found"));
        }
    }
    catch (err) {
        console.log("brand Data found Exception is : " + err);
    }
}

export let deleteBrand = async(req,res) =>{
    let {brand_name} = req.body;
    try{
        let brandList = await brandSchemaModel.deleteOne({brand_name});
        // let len = brandList.length;
        if(brandList)   //len != 0
        {
            return res.status(200).json(new APIResponse(true,{brand:brandList}, "brand Data Deleted"));
        }
        else
        {
            return res.status(404).json(new APIResponse(false,{},"brand Data Not Deleted"));
        }
    }
    catch(err){
        console.log("Delete brand Exception is : "+err);
        return res.status(500).json(new APIResponse(false, {}, "Internal Server Error"));
    }
}

export let updateBrand = async(req,res )=>{
    const { id } = req.params; // get id from params
    const { newBrandName } = req.body; // get new name from body

    try {
        const matchId = await brandSchemaModel.findById(id);

        if (!matchId) {
            return res
                .status(404)
                .json({ status: false, message: "Brand not found" });
        }

        const updated = await brandSchemaModel.findByIdAndUpdate(
            id,
            { brand_name: newBrandName },
            { new: true }
        );

        return res.json({ status: true, data: updated, message: "Brand updated successfully" });

    } catch (err) {
        console.error("Update Brand Exception:", err);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}