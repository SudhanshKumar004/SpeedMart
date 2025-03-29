const express = require("express")
const route = express.Router();
const userController = require("../controller/userController")

route.post("/registration" , userController.Registration )
route.post("/login" , userController.Login )
route.post("/userdata" , userController.UserInfo)
route.post("/booking" , userController.Booking)
route.post("/mybookings" , userController.MyBookings)
route.post("/bookdelete" , userController.MyDelete)

module.exports = route;