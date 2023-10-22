const mongoose= require("mongoose"); //structure of document in mongodb
const FavouriteModel=new mongoose.Schema( 
    {    id:{

         },
        username:{
            type:String,
            required:true
        },
  


       

    }
);
module.exports=mongoose.model("favouriteSchema",FavouriteModel)