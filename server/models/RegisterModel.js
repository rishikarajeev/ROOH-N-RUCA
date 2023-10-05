const mongoose = require("mongoose");
const Schema=mongoose.Schema;
const RegisterSchema = new Schema(
    {
        login_id:{
            type:Schema.Types.ObjectId,
            ref: "login_db",
            required:true,
        },
        name:{
             type:String,
             required:true,

        },
        location:{
            type:String,
            required:true,  
        },
        phone:
        {
            type:Number,
            required:true,  

        }

    }
);
module.exports = mongoose.model("register_db", RegisterSchema);
