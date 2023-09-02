const express = require("express");
const ClothesRoute = express.Router(); 
const ClothesModel = require("../models/ClothesModel");
//add product
ClothesRoute.post("/addproduct",(req, res) => {
  const data = new ClothesModel({ 
    name: req.body.name, 
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,

  });

  data
    .save()
    .then((data) => {
      res.status(200).json({
        success: true,
        error: false,
        message: "data added successfully!",
        data:data
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

//view products

ClothesRoute.get("/products", (req, res) => {
  ClothesModel
    .find()
    .then((data) => {
      res.status(200).json({
        success: true,
        error: false,
        data:data
      });
      
    })
      .catch((error) => res.json(error));
  });
  
//delete product
ClothesRoute.post("/deleteProduct/:id", (req, res) => {
  ClothesModel
    .deleteOne({
      _id: req.params.id,
    })
    .then(() => {
      res.status(200).json({
        success: true,
        error: false,
        message: "data deleted successfully!",
        data:data
      });
    })
    .catch((error) => console.log(error));
});


//viewproductby id
ClothesRoute.get("/viewProductById/:id", (req, res) => {
  ClothesModel
    .findOne({
      _id: req.params.id,
    })
    .then(
      (data) =>{
      res.status(200).json({
        success: true,
        error: false,
        data:data
      });
    })
    .catch((error) => res.json(error));
});
//updateproductbyid
ClothesRoute.post("/updateProduct/:id", (req, res) => {
  const data = new ClothesModel({
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
        data:data
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});
module.exports = ClothesRoute;
