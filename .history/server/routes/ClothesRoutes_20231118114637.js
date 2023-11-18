const express = require("express");
const ClothesRoute = express.Router();
const ClothesModel = require("../models/ClothesModel");
const CategoryModel = require("../models/CategoryModel");
const multer = require("multer");
const CheckAuth = require("../middleware/CheckAuth");
const path=require("path");
const mongoose = require("mongoose");

//cloudinary configuration
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ashvogue',
  },
});
const upload = multer({ storage: storage });
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
 
//     cb(null,  path.join(__dirname, "../../client/public/images"))
    
//   },
//   filename: function (req, file, cb) {
//     cb(null,file.originalname)
//   },
// });
// const filefilter=(req,file,cb)=>{
//   const allowedFileTypes=['image/jpeg','image/jpg','image/png'];
//   if(allowedFileTypes.includes(file.mimetype))
//   {
//     cb(null,true);

//   }
//   else{
//     cb(null,false);
//   }
// }


//const upload=multer({storage,filefilter});
//add product
ClothesRoute.post("/addproduct",upload.single("image"), (req, res) => {
  const data = new ClothesModel({
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
   // image:req.file.filename
    image:req.file?req
  });

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
});
//add category

ClothesRoute.post("/addcategory",upload.single("image"), (req, res) => {
  const data = new CategoryModel({
    categoryname: req.body.categoryname,
    description: req.body.description,
    image:req.file.filename
  });

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
});

//view products

ClothesRoute.get("/products", CheckAuth, (req, res) => {
  console.log(req.userData);
  ClothesModel.aggregate([
    {
      $lookup: {
        from: "favourite_dbs",
        localField: "name",
        foreignField: "name",
        as: "results",
      },
    },
  {
      $unwind: {path:"$results",
       preserveNullAndEmptyArrays: true,
    }
    },


    {
      
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        category: { $first: "category" },
        price: { $first: "$price" },
        description: { $first: "$description" },
        image: { $first: "$image" },
        favourite: { $first: "$results.favourite" },
        username: { $first: req.userData.userName },

      },
      
    },
    {
      $sort: {
        // Specify the sorting criteria
        _id: 1, // ascending order
        // Other fields...
      }
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

ClothesRoute.get("/adminproducts", (req, res) => {
  ClothesModel.find()
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
ClothesRoute.delete("/deleteproduct/:id", (req, res) => {
  ClothesModel.deleteOne({
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

//viewproductby id
ClothesRoute.get("/viewproductbyid/:id", (req, res) => {
  ClothesModel.findOne({
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
ClothesRoute.put("/updateproduct/:id",upload.single("image"), (req, res) => {
  const data = new ClothesModel({
    _id: req.params.id,
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
    image:req.file.filename
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

ClothesRoute.get("/productsbycategory", (req, res) => {
  CategoryModel.find()
    .then((data) => {
      res.status(200).json({
        success: true,
        error: false,
        data: data,
      });
    })
    .catch((error) => res.json(error));
});

ClothesRoute.get("/randomproducts", (req, res) => {
  const numberOfRandomDocuments = 4; // Change this as needed

  // Use the aggregation framework to retrieve random documents
 ClothesModel.aggregate([
    { $sample: { size: numberOfRandomDocuments } },
  ])
    .then((data) => {
      res.status(200).json({
        success: true,
        error: false,
        data: data,
      });
    })
    .catch((error) => res.json(error));
});
module.exports = ClothesRoute;
