const adminModel = require("../models/adminModel")


const adminLogin=async(req, res)=>{
    const { adminid, password} = req.body;
    try {
        const Admin= await adminModel.findOne({adminid:adminid});         
        if (!Admin)
        {
            res.status(404).send({msg:"Invalid Admin Id!"});
        }
        if (Admin.password!=password)
        {
            res.status(404).send({msg:"Invalid Password!"});
        }
        res.status(200).send({msg:"You are Succesfully Login", Admin:Admin});
    } catch (error) {
        console.log(error);
    }
}

module.exports ={
    adminLogin
}