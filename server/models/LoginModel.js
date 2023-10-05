const mongoose = require("mongoose");
const Schema=mongoose.Schema;
const LoginSchema=new Schema(
    {
        username:String,
        password:String,
        role:Number,
    }
);
module.exports=mongoose.model("login_db", LoginSchema);