const jwt=require("jsonwebtoken");
module.exports=  (req,res,next)=>
{ 
    try{
        //authorization with bearer token 
         const token=req.headers.authorization.split(" ")[1]
       //x-access-token||bearer-token
      // const token=   req.body.token || req.query.token ||req.headers["x-access-token"]
       console.log("xx",token);

        const decodedToken = jwt.verify(token, 'secretthisshudbelongerss');
        req.userData = {
        userId: decodedToken.userId,
        userName: decodedToken.userName,
        userRole: decodedToken.userRole,
    };
    next();
    
  
    }
    catch(error)
    { //if token is not given
      return   res.status(401).json({success:false,error:true,message:"Auth failed"});
    

    }

}