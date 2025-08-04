const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long']
    },
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
