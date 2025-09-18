import mongoose from "mongoose";
var url = "mongodb://127.0.0.1:27017/my_shop_app"
mongoose.connect(url)
console.log("Connection Successfully");