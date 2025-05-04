const express = require("express")
const route = express.Router();
const customerController = require("../controller/customerController")

route.post("/registration", customerController.customerRegistration)
route.post("/login", customerController.customerLogin)

module.exports = route