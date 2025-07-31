const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    date:Date,
    item:Array(any),
    status:Number
});
const Order = mongoose.model('orders', orderSchema);
module.exports = Order
;