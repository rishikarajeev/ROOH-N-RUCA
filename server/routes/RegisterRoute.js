const express=require("express");
const bcrypt=require("bcryptjs");
const registerRoute=express.Router();
const RegisterModel = require("../models/RegisterModel");
const LoginModel = require("../models/LoginModel");
registerRoute.post("/", async (req,res)=>{
    try{
        const oldUser= await LoginModel.findOne({username:req.body.username});
        if(oldUser)
        {
            return res.status(400)
            .json({success:false,error:true,message:"User Already Exist"});
        }
        const oldphone=await RegisterModel.findOne({phone:req.body.phone})
        const hashpassword= await bcrypt.hash(req.body.password,12);
       
        if(oldphone)
        {
            return res.status(400)
            .json({success:false,error:true,message:"Phone Already Exist"});
        }
        let log={
            username:req.body.username,
            password:hashpassword,
            role:2, //rbac
        }
        //save in login model with username bcrypt password and role
        const result=await LoginModel(log).save();
        let register={

            login_id:result._id, //login model _id is saved as login_id in register model
            name:req.body.name,
            phone:req.body.phone,
            location:req.body.location,


        };
        
        const result2=await RegisterModel(register).save();
        if(result2)
        {
            res.status(201)
            .json({success:true,error:false,message:"Registration Completed", details:result2});
           

        }
    }
    catch(error)
    {
         res.status(500)
        .json({success:false,error:true,message:"Spmething Went Wrong"});
        console.log(error);

    }
    
});
module.exports=registerRoute;
