const mongoose= require("mongoose"); //structure of document in mongodb
const FavouriteModel=new mongoose.Schema( 
    {
        username:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        category:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
              
        description:{
            type:String,
            required:true
        },
        image:{
            type:String
        },

       

    }
);
module.exports=mongoose.model("favouriteSchema",FavouriteModel)