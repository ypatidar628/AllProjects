import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    items: [
        {
            productId: { type: String, required: true },
            product_name: { type: String, required: true },
            product_price: { type: Number, required: true },
            product_image: { type: String },
            quantity: { type: Number, required: true, default: 1 },
        },
    ],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
        default: "pending",
    },
    createdAt: { type: Date, default: Date.now },
});


orderSchema.plugin(mongooseUniqueValidator);

const orderSchemaModel = mongoose.model("orders_collection", orderSchema);

export default orderSchemaModel;
