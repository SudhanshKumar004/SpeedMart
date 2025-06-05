const router = require("express").Router();
const OrderModel = require("../models/orderModel");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const orderGenerator = require("../utils/orderNumber");
router.post("/customerorders", async (req, res) => {
    const {amount, cusname, address, contact, email, productname, cusid} = req.body;

    const Order = await OrderModel.create({
        ordernumber:orderGenerator(),
        productname:productname,
        totalamount:amount,
        cusname:cusname,
        address:address,
        contact:contact,
        email:email,
        ordermethod:"Razorpay",
        Customer: cusid
    })

     try {
        const instance = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET,
        });

        const options = {
            amount: req.body.amount * 100,
            currency:"INR",
            receipt:crypto.randomBytes(10).toString("hex"),
        }
        instance.orders.create(options,(error,order) => {
            if(error) {
                console.log(error);
                return res.status(500).json({message:"Something Went Wrong!"});
            }
            res.status(200).json({data:order});
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error!"});
    }
});


//pqyment verification
router.post("/verification",async(req,res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature } = req.body;
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const resultSign = crypto
        .createHmac("sha256",process.env.KEY_SECRET)
        .update(sign.toString())
        .digest("hex");

        if (razorpay_signature == resultSign){
            return res.status(200).json({message:"Payment verified successfully"});
        }

    } catch(error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error!"});
    }
});


module.exports = router