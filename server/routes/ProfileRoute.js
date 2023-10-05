const express = require("express");
const profileroute = express.Router();
const RegisterModel = require("../models/RegisterModel");
const LoginModel = require("../models/LoginModel");
const checkAuth = require("../middleware/CheckAuth");
const mongoose = require("mongoose");

profileroute.get("/", checkAuth, (req, res) => {
  console.log(req.userData);
  LoginModel.aggregate([
    {
      $lookup: {
        from: "register_dbs",
        localField: "_id",
        foreignField: "login_id",
        as: "results",
      },
    },
    {
      $unwind: "$results",
    },
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.userData.userId),
      },
    },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$results.name" },
        phone: { $first: "$results.phone" },
        location: { $first: "$results.location" },
        username: { $first: "$username" },
      },
    },
  ]).then((data) => {
    res.status(200).json({
      success: true,
      error: false,
      data: data,
    });
  });
});

profileroute.put("/updateprofile/:id", async (req, res) => {
  try {
    const registerUpdate = {
      name: req.body.name,
      phone: req.body.phone,
      location: req.body.location,
    };

    await RegisterModel.updateOne(
      { login_id: req.params.id },
      { $set: registerUpdate }
    );

    const loginUpdate = {
      username: req.body.username,
    };

    await LoginModel.updateOne({ _id: req.params.id }, { $set: loginUpdate });

    res.status(200).json({
      success: true,
      error: false,
      message: "Documents updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: true,
      message: " server error",
    });
  }
});

module.exports = profileroute;
