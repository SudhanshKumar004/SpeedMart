const express = require("express")
const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({ 
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    Brand: {
        type: String,
        require: true
    },
    Category: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    defaultImage: {
        type: String,
        require: true
    },
    images: {
        type:[String],
        require: false
    }
})

module.exports = mongoose.model("product", productSchema)