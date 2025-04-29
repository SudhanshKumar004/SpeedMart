const adminModel = require("../models/adminModel")
const productModel = require("../models/productModel")


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


const addProduct=async(req, res)=>{
    const imgURLs = req.files.map(file => file.path);

    const {name, description, Brand, Category, price} = req.body;

    try {

         const Product = await productModel.create({
        name:name,
        description:description,
        Brand:Brand,
        Category:Category,
        price:price,
        defaultImage:imgURLs[0],
        images:imgURLs
    })

    res.status(200).send("Product added Successfully");
    } 
    catch (error) {
    res.status(400).send("Something went wrong");
    }
}

const showProduct=async(req, res)=>{
    try {
        const Product = await productModel.find();
        res.status(200).send(Product);
    } catch (error) {
        res.status(400).send("Cannot load Product details");
    }
}
module.exports ={
    adminLogin,
    addProduct,
    showProduct
}