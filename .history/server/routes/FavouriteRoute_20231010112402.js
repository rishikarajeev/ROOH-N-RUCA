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
  const clothes_id=req.body;
  if (mongoose.Types.ObjectId.isValid(inputId)) {
    const objectId = new ObjectId(inputId);
  
    // Now you can use `objectId` in your MongoDB queries
  } else {
    // Handle the case where the inputId is not a valid ObjectId
    console.error('Invalid ObjectId');
  }
  In this example:
  
  mongoose.Types.ObjectId.isValid(inputId) checks if the provided string is a valid ObjectId.
  new ObjectId(inputId) creates a new ObjectId instance from the string.
  Make sure to replace req.body._id with the actual field you're working with. Also, handle the case where the input is not a valid ObjectId according to your application's logic.
  
  Keep in mind that in recent versions of Mongoose, using mongoose.Types.ObjectId() directly is also a valid approach without the need for new:
  
  javascript
  Copy code
  const objectId = mongoose.Types.ObjectId(inputId);
  This simplifies the code a bit.
  
  
  
  
  
  
 const data = new FavouriteModel({
    clothes_id:req.body._id,
    favourite:req.body.favourite,
    username:req.body.username
   
  });

try{
  const product=await FavouriteModel.findOne({ _id:_id,username :username,clothes_id:clothes_id});
  if(product!==null)
  {
    product
    .updateOne(data )
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
}catch(e)
{
  console.log(e);


}
});


// FavouriteRoute.post("/addfavourites", async(req, res) => {

//   const { _id, username} = req.body;
//   console.log("ss"+req.body.name);
//   console.log("ss"+req.body.username);

//   const product=await FavouriteModel.findOne({ _id:_id,username :username});
//  console.log(product);
//   const data = new FavouriteModel({
//     username:req.body.username,
//     _id:req.body._id,
//     name: req.body.name,
//     category: req.body.category,
//     price: req.body.price,
//     description: req.body.description,
//     image:req.body.image,
   
//   });

//   if(product)
//   {
//     product
//     .updateOne(
//       {
//         username:req.body.username,
//         name: req.body.name,
//         _id:req.body._id,
//         category: req.body.category,
//         price: req.body.price,
//         quantity: req.body.quantity,
//         description: req.body.description,
//         image:req.body.image,
    
    
//       })
//     .then((data) => {
//       res.status(200).json({
//         success: true,
//         error: false,
//         message: "data added successfullyy!",
//         data: data,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });

//   }
//   else{

//   data
//     .save()
//     .then((data) => {
//       res.status(200).json({
//         success: true,
//         error: false,
//         message: "data added successfullyy!",
//         data: data,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   }
// });

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

FavouriteRoute.get("/deleteallfavouriteproducts/:username", (req, res) => {
  FavouriteModel.deleteMany({
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
