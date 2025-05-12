const customerModel = require("../models/customerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const shippingModel = require("../models/shippingModel");

const customerRegistration = async(req, res) => {
    const { name, email, number, address, city, state, password, cpassword } = req.body;

    let User = await customerModel.findOne({ email: email });
    if (User) {
        return res.status(400).send("User already exists");
    }

    if(password != cpassword) {
        return res.status(400).send("Password and Confirm Password does not match");
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const chashedPassword = await bcrypt.hash(cpassword, salt);  
    try {
        const Customer = await customerModel.create({
            name: name,
            email: email,
            number: number,
            address: address,
            city: city,
            state: state,
            password: hashedPassword,
            cpassword: chashedPassword
        })
        res.status(200).send("Customer registered Successfully");
    } catch (error) {
        res.status(400).send("Something went wrong");
    }
}

customerLogin = async(req, res) => {
    const { email, password } = req.body;
    try {
        const Customer = await customerModel.findOne({ email: email });
        if (!Customer) {
            return res.status(404).send({ msg: "Invalid Email!" });
        }
        const PassMatch = await bcrypt.compare(password, Customer.password);
        if (!PassMatch) {
            return res.status(404).send({ msg: "Invalid Password!" });
        }

        const token=jwt.sign({id:Customer._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.status(200).send({
            msg: "You are Succesfully Login",
            Customer:Customer,
            token:token
        });
    } catch (error) {
        console.log(error);
    }
}

const customerAuthenticate = async(req,res)=>{
    const {authorization} = req.headers;
    const token = authorization.split(" ")[1];
     try {
        const decodedToken = jwt.verify(token,  process.env.JWT_SECRET);
        console.log(decodedToken.id);
      const Customer = await customerModel.findById(decodedToken.id).select("-password");
      res.status(200).send(Customer);
     
    } catch (error) {
         console.log(error);
     }

}


const shippingData = async(req, res) => {
    const {cusid, name, email, number, address, city, state } = req.body;
try {
    let shippingData = await shippingModel.create({
        cusid: cusid,
        name: name,
        email: email,
        number: number,
        address: address,
        city: city,
        state: state
    })
    res.status(200).send(shippingData);
    
} catch (error) {
    res.status(400).send("Something went wrong");
}
}

const checkoutData = async(req, res) => {
    const { cusid } = req.body;
    try {
        const Customer = await customerModel.findById(cusid);
        res.status(200).send(Customer);
    } catch (error) {
        console.log(error);
    }
}

const orderData = async(req, res) => {
    const { cusid } = req.body;
    try {
        const Customer = await shippingModel.findOne({cusid:cusid}).sort({createdAt:-1});
        if(!Customer) {
            return res.status(404).send({ msg: "Invalid Customer Id!" });
        }   
        res.status(200).send(Customer);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    customerRegistration,
    customerLogin,
    customerAuthenticate,
    checkoutData,
    shippingData,
    orderData
}