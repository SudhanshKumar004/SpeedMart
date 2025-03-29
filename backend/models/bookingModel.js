const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    from:String,
    to:String,
    date:String,
    total:String,
    flight:String,
    amount:Number,
    flightclass:String,
    userid:[{type:mongoose.Schema.Types.ObjectId, ref:'userRegister'}]

})


module.exports = mongoose.model("userBooking", bookSchema)