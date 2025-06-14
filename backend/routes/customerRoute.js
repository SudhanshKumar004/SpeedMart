const express = require("express")
const route = express.Router();
const customerController = require("../controller/customerController")

route.post("/registration", customerController.customerRegistration)
route.post("/login", customerController.customerLogin)
route.get("/authenticate", customerController.customerAuthenticate)
route.post("/checkoutData", customerController.checkoutData)
route.post("/shippingData", customerController.shippingData)
route.post("/orderData", customerController.orderData)
route.post("/contactus", customerController.contactUs)
route.post("/customercodorders", customerController.customerCODorders)
route.post("/orderdetail", customerController.orderDetail)
route.post("/customerdetails", customerController.customerDetails)
route.get("/orderhistory/:cusid", customerController.orderHistory)
module.exports = route