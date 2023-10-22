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

  const { _id, username} = req.body;
  console.log("ss"+req.body.name);
  console.log("ss"+req.body.username);

  const product=await FavouriteModel.findOne({ _id:_id,username :username});
 console.log(product);
  const data = new FavouriteModel({
    username:req.body.username,
    _id:req.
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

FavouriteRoute.delete("/removefavouriteproduct/:id", (req, res) => {
  FavouriteModel.deleteOne({
    _id: req.params.id,
  })
    .then(() => {
      res.status(200).json({
        success: true,
        error: false,
        message: "data deleted successfully!",
      });
    })
    .catch((error) => console.log(error));
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
