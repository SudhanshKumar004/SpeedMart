const userModel = require("../models/userModel")
const bookingModel = require("../models/bookingModel")
const MyPass = require("../passgenerater")
const nodemailer = require('nodemailer');





const Registration =async (req,res) =>{
    const { name, age, number, email, address, city } = req.body;

    const genpassword = MyPass.passGenerate();

    let User = await userModel.findOne({email:email})

    if(User)
    {
       return res.status(400).send("Email already registered!")
    }
   
try {

     let user = await userModel.create({
            name:name,
            age:age,
            number:number,
            email:email,
            address:address,
            city:city,
            password:genpassword
        })
  


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "sudhanshkr04@gmail.com",
    pass: "ypnv vspk hiri uwwd",
  }
});

var mailOptions = {
  from: 'sudhanshkr04@gmail.com',
  to: email,
  subject: 'Account created SuccessFully',
  text: `Hello, Your account has been created successfully \n Your password for account is ${genpassword}`
};

await transporter.sendMail(mailOptions);


res.status(200).send("You Are Registered SuccessFully!") 
} catch (error) {
    res.status(400).send(error)
}  
}


const Login = async (req,res)=>{
    const {email,password} = req.body;

    try {
    let user = await userModel.findOne({email:email}) 
     
    if(!user)
    {
        res.status(400).send("invalid Email")
    }

    if(user.password != password)
    {
        res.status(400).send("Invalid Password")
    }

    res.status(200).send(user)
    } 
    
    catch (error) {
        res.status(400).send("Server Error")
    }
}

const UserInfo =async (req,res) =>{
    const { userid } = req.body;

    try {
    let userData = await userModel.findById(userid);
    res.status(200).send(userData)     
    } 
    
    catch (error) {
        res.status(400).send("internal error")
    }
    
}

const Booking = async(req,res)=>{
   const {from, to, date, flight, amount, flightclass, total, id} = req.body;

   try {
   let userBooking = await bookingModel.create({
    from:from,
    to:to,
    date:date,
    flight:flight,
    amount:amount,
    flightclass:flightclass,
    amount:amount,
    userid:id
   })

   res.status(200).send("Booking done")
   } 
   
   catch (error) {
    res.status(400).send("Error")
   }

    
}

const MyBookings = async (req,res)=>{
const {userid} = req.body;
let response = await bookingModel.findOne({userid:userid})
res.send(response)
}

const MyDelete =async(req,res)=>{
   const {bookid} = req.body;
    let response = await bookingModel.findByIdAndDelete(bookid)

    res.send("Booking Cancelled")
   } 
    

module.exports = {
    Registration,
    Login,
    UserInfo,
    Booking,
    MyBookings,
    MyDelete
}