const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const adminRoute = require("./routes/adminRoute");
const customerRoute = require("./routes/customerRoute");
const paymentRoute = require("./routes/payment");
const path = require("path");

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose.connect(process.env.DBCONN).then(() => {
  console.log("DB Connected!");
});

app.use("/admin", adminRoute);
app.use("/customer", customerRoute);
app.use("/api/payment", paymentRoute);

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
