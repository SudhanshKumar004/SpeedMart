const customerModel = require("../models/customerModel");
const bcrypt = require("bcryptjs");

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




module.exports = {
    customerRegistration
}