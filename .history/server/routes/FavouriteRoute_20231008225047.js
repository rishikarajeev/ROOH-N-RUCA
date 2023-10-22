const express = require("express");
const FavouriteRoute = express.Router();
const CheckAuth = require("../middleware/CheckAuth");
const multer=require("multer");
const path=require("path");
const mongoose = require("mongoose");
const FavouriteModel = require("../models/FavouriteModel");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
 
    cb(null,  path.join(__dirname, "../../client/public/images/"))
    
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname)
  },
});
const filefilter=(req,file,cb)=>{
  const allowedFileTypes=['image/jpeg','image/jpg','image/png'];
  if(allowedFileTypes.includes(file.mimetype))
  {
    cb(null,true);

  }
  else{
    cb(null,false);
  }
}


const upload=multer({storage,filefilter});


FavouriteRoute.post("/addfavourites", async(req, res) => {

  const { name, username} = req.body;
  console.log("ss"+name);
  console.log("ss"+name);

  const product=await FavouriteModel.findOne({ name:name,username :username});
 console.log(product);
  const data = new FavouriteModel({
    username:req.body.username,
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
    image:req.body.image,
   
  });

  if(product)
  {
    product
    .updateOne(
      {
        username:req.body.username,
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        quantity: req.body.quantity,
        description: req.body.description,
        image:req.body.image,
        subtotal:req.body.subtotal,
    
      })
    .then((data) => {
      res.status(200).json({
        success: true,
        error: false,
        message: "data added successfullyy!",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });

  }
  else{

  data
    .save()
    .then((data) => {
      res.status(200).json({
        success: true,
        error: false,
        message: "data added successfullyy!",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }
});


FavouriteRoute.get("/favouritedetails",CheckAuth,(req,res)=>{
  FavouriteModel.aggregate([
    {
      $lookup: {
        from: "login_dbs",
        localField: "username",
        foreignField: "username",
        as: "results",
      },
    },
    {
      $unwind: "$results",
    },
    {
      $match: {
        username: req.userData.userName,
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

module.exports = FavouriteRoute;
