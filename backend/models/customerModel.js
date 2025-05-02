const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
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
    },

    password: {
        type: String,
        require: true
    },

    cpassword: {
        type: String,
        require: true
    },
     
})


module.exports = mongoose.model("customer", customerSchema)