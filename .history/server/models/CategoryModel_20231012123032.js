const mongoose= require("mongoose"); //structure of document in mongodb
const categorymodel=new mongoose.Schema( 
    {   
        categoryname:{
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
module.exports=mongoose.model("category_schema",clothesModel)