const mongoose = require("mongoose"); //structure of document in mongodb
const FavouriteModel = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  favourite: {
    type: Boolean,
    required: tru,
  },
});

module.exports = mongoose.model("favouriteSchema", FavouriteModel);