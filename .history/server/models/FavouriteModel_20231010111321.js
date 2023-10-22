const mongoose = require("mongoose"); //structure of document in mongodb
const Schema=mongoose.Schema;
const FavouriteModel = new mongoose.Schema({
  clothes_id: {
    type: Schema.Types.ObjectId,
    ref: "clothesSchema",
    required: true,
  },
  name:{
    type: String,
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
