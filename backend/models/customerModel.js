const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  number: {
    type: Number,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  state: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  customerImage: {
    type: String,
    default:"https://cdn-icons-png.flaticon.com/512/149/149071.png"
  },
});

module.exports = mongoose.model("customer", customerSchema);
