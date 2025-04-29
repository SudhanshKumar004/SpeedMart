const express = require("express")
const route = express.Router();
const adminController = require("../controller/adminController")
const upload = require("../middlewares/multerMiddleware")


route.post("/adminlogin" , adminController.adminLogin)
route.post("/addproduct" , upload.array("images", 6) , adminController.addProduct)
route.get("/showproduct", adminController.showProduct)

module.exports = route;