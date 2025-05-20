const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    // Brand: {
    //     type: String,
    //     required: true
    // },
    price: {
        type: String,
        required: true
    },
    defaultImage: {
        type: String,
        required: true
    },
    images: {
        type:[String],
        required: false
    },
    Category: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"category",
        required: true
    }
})

module.exports = mongoose.model("product", productSchema)