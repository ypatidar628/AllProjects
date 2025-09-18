import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const brandSchema = mongoose.Schema({
    _id: Number,
    brand_name : {
        type: String,
        required: [true,'Category Name is Required'],
        unique:true,
        lowercase: true,
        trim:true
    },
    info : String,
});

brandSchema.plugin(mongooseUniqueValidator);
const brandSchemaModel = mongoose.model('brand_collection',brandSchema);
export default brandSchemaModel;