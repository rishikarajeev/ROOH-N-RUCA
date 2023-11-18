const mongoose = require("mongoose"); //structure of document in mongodb
const Schema=mongoose.Schema;
const FavouriteModel = new mongoose.Schema({
  productid:{
    type:String,
    required:true
},
  name:{
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  favourite: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("favourite_db", FavouriteModel);
