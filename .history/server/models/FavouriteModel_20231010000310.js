const mongoose= require("mongoose"); //structure of document in mongodb
const FavouriteModel=new mongoose.Schema( 
    {    id:{
            type:String,
            required:true
         },
        username:{
            type:String,
            required:true
        },
        fa
  


       

    }
);
module.exports=mongoose.model("favouriteSchema",FavouriteModel)