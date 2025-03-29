const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:String,
    age:String,
    email:String,
    city:String,
    address:String,
    password:String,
    number:Number,
})


module.exports = mongoose.model("userRegister", userSchema)