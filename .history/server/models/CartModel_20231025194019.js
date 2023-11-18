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
        :{
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
    
       

    }
);
module.exports=mongoose.model("cartSchema",CartModel)