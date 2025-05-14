const adminModel = require("../models/adminModel")
const productModel = require("../models/productModel")
const OrderModel = require("../models/orderModel")

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


const getOrders=async(req, res)=>{
    try {
        const Order = await OrderModel.find();
        res.status(200).send(Order);
    } catch (error) {
        res.status(400).send("Cannot load Order details");
    }
}

const editProduct=async(req, res)=>{
    const {id} = req.params;
    try {
        let product = await productModel.findById(id);
    res.status(200).send(product);
    } catch (error) {
        res.status(400).send("Cannot load Product details");
    }    
}

const updateProduct = async (req, res) => {
    const { id } = req.params;  
    const imgURLs = req.files.map(file => file.path);
    const { name, description, Brand, Category, price } = req.body;  
  
    try {
      
      const updatedProduct = await productModel.findByIdAndUpdate(id, {...req.body, defaultImage: imgURLs[0],  images: imgURLs,},
        { new: true }
      );
  
      if (!updatedProduct) {
        return res.status(404).send("Product not found");
      }
  
      res.status(200).send("Product updated successfully");
    } catch (error) {
      console.error(error);
      res.status(400).send("Something went wrong");
    }
  };
  
module.exports ={
    adminLogin,
    addProduct,
    showProduct,
    getOrders,
    editProduct,
    updateProduct
}