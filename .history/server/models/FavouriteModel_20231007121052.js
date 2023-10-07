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
        quantity:{
            type:Number,
            required:true
        },
        subtotal:{
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
        favourite:{
            type:Boolean,
        },
    
       

    }
);
module.exports=mongoose.model("favourite",FavouriteModel)