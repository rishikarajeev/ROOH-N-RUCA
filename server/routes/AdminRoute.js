const express = require("express");
const CheckAuth = require("../middleware/CheckAuth");
const LoginModel = require("../models/LoginModel");
const adminRoute = express.Router();
adminRoute.get("/adminrole", CheckAuth, (req, res) => {
 return res.status(200).json({
    success: true,
    error: false,
    data:req.userData,
  });
});
module.exports = adminRoute;
