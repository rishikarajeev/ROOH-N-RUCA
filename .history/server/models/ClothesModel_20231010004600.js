const mongoose= require("mongoose"); //structure of document in mongodb
const clothesModel=new mongoose.Schema( 
    {   
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
        description:{
            type:String,
            required:true
        },
        image:{
            type:String
        }
       

    }
);
module.exports=mongoose.model("clothesSchema",clothesModel)