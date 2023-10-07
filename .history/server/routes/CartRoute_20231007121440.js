const express = require("express");
const CartRoute = express.Router();
const ClothesModel = require("../models/CartModel");
const CheckAuth = require("../middleware/CheckAuth");
const multer=require("multer");
const path=require("path");
const CartModel = require("../models/CartModel");
const favouriteModel = require("../models/FavouriteModel");
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
//add product
CartRoute.post("/addproduct",upload.single("image"), async(req, res) => {
  const { name, username} = req.body;

  const product=await CartModel.findOne({ name:name,username :username});
 console.log(product);
  const data = new CartModel({
    username:req.body.username,
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    quantity: req.body.quantity,
    description: req.body.description,
    image:req.body.image,
    subtotal:req.body.subtotal
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
        subtotal:req.body.subtotal
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

//view products

CartRoute.get("/cartdetails",CheckAuth,(req,res)=>{
  CartModel.aggregate([
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


CartRoute.post("/addfavourites",upload.single("image"), async(req, res) => {
  const { name, username} = req.body;

  const product=await favouriteModel.findOne({ name:name,username :username});
 console.log(product);
  const data = new Fav({
    username:req.body.username,
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    quantity: req.body.quantity,
    description: req.body.description,
    image:req.body.image,
    subtotal:req.body.subtotal,
    favourite:req.body.favourite
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
        subtotal:req.body.subtotal
        favourite:req.body.favourite
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


CartRoute.get("/favouritedetails",CheckAuth,(req,res)=>{
  favouriteModel.aggregate([
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


CartRoute.get("/products/:username", (req, res) => {
  CartModel.find({
    username: req.params.username,
  })
    .then((data) => {
      res.status(200).json({
        success: true,
        error: false,
        data: data,
      });
    })
    .catch((error) => res.json(error));
});

//delete product
CartRoute.delete("/deleteproduct/:id", (req, res) => {
  CartModel.deleteOne({
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
CartRoute.get("/deleteallproducts/:username", (req, res) => {
  CartModel.deleteMany({
    username: req.params.username,
  })
    .then((data) => {
      res.status(200).json({
        success: true,
        error: false,
        data: data,
      });
    })
    .catch((error) => res.json(error));
});

//viewproductby id
CartRoute.get("/viewproductbyid/:id", (req, res) => {
  CartModel.findOne({
    _id: req.params.id,
  })
    .then((data) => {
      res.status(200).json({
        success: true,
        error: false,
        data: data,
      });
    })
    .catch((error) => res.json(error));
});
//updateproductbyid
CartRoute.put("/updateproduct/:id", (req, res) => {
  const data = new CartModel({
    _id: req.params.id,
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
  });
  data
    .updateOne(data)
    .then((data) => {
      res.status(200).json({
        success: true,
        error: false,
        message: "data updated successfully!",
        data: data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});
module.exports = CartRoute;
