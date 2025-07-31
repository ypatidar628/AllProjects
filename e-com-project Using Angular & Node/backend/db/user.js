const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long']   
     },
    email:{
        type: String,
        required: [true, 'Email is required'],
         },
    password:{
        type: String,
        required: [true, 'Password is required'],
        trim: true,
        minlength: [2, 'Password must be at least 6 characters long']   
     },
    idAdmin:Boolean,
});
const User = mongoose.model('users', userSchema);
module.exports = User;