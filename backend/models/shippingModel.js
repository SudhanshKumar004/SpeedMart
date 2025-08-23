const mongoose = require("mongoose");

const shippingSchema = new mongoose.Schema(
  {
    cusid: {
      type: String,
      required: true,
    },
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("shipping", shippingSchema);
