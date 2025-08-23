const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  ordernumber: {
    type: Number,
    required: true,
  },

  productname: {
    type: String,
    required: true,
  },

  qnty: {
    type: Number,
    required: true,
  },

  productprice: {
    type: Number,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  gst: {
    type: Number,
    required: true,
  },

  shippingcharge: {
    type: Number,
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

  paymentstatus: {
    type: String,
    required: true,
  },

  ordermethod: {
    type: String,
    required: true,
  },

  orderAt: {
    type: Date,
    default: Date.now,
  },

  Customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer",
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
