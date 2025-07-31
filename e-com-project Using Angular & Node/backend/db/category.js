const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { 
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long']
    },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
