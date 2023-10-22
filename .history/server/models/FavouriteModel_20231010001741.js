const mongoose = require("mongoose"); //structure of document in mongodb
const FavouriteModel = new mongoose.Schema({
    login_id:{
        type:Schema.Types.ObjectId,
        ref: "login_db",
        required:true,
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

module.exports = mongoose.model("favouriteSchema", FavouriteModel);
