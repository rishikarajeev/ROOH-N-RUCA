const mongoose= require("mongoose"); //structure of document in mongodb
const CartModel=new mongoose.Schema( 
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
            type:String,
            required:true
        },
        quantity:{
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
        subt:{
            type:String
        }
       

    }
);
module.exports=mongoose.model("cartSchema",CartModel)