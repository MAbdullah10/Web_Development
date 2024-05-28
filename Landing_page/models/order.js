const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userid: String,
  quantity: String,
  productid: String
},{timestamps:true});

module.exports = mongoose.model('order', orderSchema);