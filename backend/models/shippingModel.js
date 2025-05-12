const mongoose = require("mongoose");

const shippingSchema = new mongoose.Schema({
    cusid: {
        type: String,
        require: true
    },
     name: {
        type: String,
        require: true
    },
    
    email: {
        type: String,
        require: true
    },
     
    number: {
        type: Number,
        require: true
    },

    address: {
        type: String,
        require: true
    },

    city: {
        type: String,
        require: true
    },
     
    state: {
        type: String,
        require: true
    }
     
},
{
    timestamps: true
})

module.exports = mongoose.model("shipping", shippingSchema)
