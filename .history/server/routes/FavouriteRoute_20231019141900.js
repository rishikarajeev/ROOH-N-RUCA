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

  const { name, username,favourite} = req.body;


 const data = new FavouriteModel({
    name:req.body.name,
    favourite:req.body.favourite,
    username:req.body.username
   
  });

try{
  const product=await FavouriteModel.findOne({ name:name,username :username});
  console.log("product..."+product);
  if(product!==null)
  {  
    product
    .updateOne({name:req.body.name,
      favourite:req.body.favourite,
      username:req.body.username
     
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
  const {username}=req.body;
  FavouriteModel.aggregate([
    {
      $lookup: {
        from: "clothesschemas",
        localField: "name",
        foreignField: "name",
        as: "results",
      },
    },
   {
      $unwind: {path:"$results",
      // preserveNullAndEmptyArrays: true,
    }
    },


    {
      $group: {
        _id: "$_id",
        name: { $first: "$results.name" },     
        category: { $first: "$results.category" },
        price: { $first: "$results.price" },
        description: { $first: "$results.description" },
        image: { $first: "$results.image" },
        favourite: { $first: "$favourite" },
        username: { $first: "$username" },

      },
      
    },
    {
      $match:{username:req.userData.use}
    }

 
  ]).then((data) => {
    res.status(200).json({
      success: true,
      error: false,
      data: data,
    });
  });
});

module.exports = FavouriteRoute;
