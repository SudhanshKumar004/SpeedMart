const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: true,
  },
   totalamount: {
    type: Number,
    required: true,
  },
   
  cusname: {
    type: String,
    required: true,
  },
   address: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  orderAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);