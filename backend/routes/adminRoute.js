const express = require("express");
const route = express.Router();
const adminController = require("../controller/adminController");
const upload = require("../middlewares/multerMiddleware");

route.post("/adminlogin", adminController.adminLogin);
route.post(
  "/addproduct",
  upload.array("images", 6),
  adminController.addProduct
);
route.get("/showproduct", adminController.showProduct);
route.get("/getorders", adminController.getOrders);
route.get("/editproduct/:id", adminController.editProduct);
route.post(
  "/updateproduct/:id",
  upload.array("images", 6),
  adminController.updateProduct
);
route.get("/getcategories", adminController.getCategories);
route.post("/categoryproduct", adminController.categoryProduct);
route.get("/showallproduct", adminController.showallProduct);
route.post("/deleteproduct", adminController.deleteProduct);
route.post("/searchproduct", adminController.searchProduct);

module.exports = route;
