import mongoose from "mongoose";
var url = 'mongodb://127.0.0.1:27017/first_mongo_connection'
mongoose.connect(url);
console.log("DB Connection success....");
