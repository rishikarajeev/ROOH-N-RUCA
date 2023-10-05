
module.exports =   (req, res, next) => {
    const checkAccess =   req.userData.userRole;
    console.log(checkAccess);
  
    if (!(checkAccess == 2)) {
      
      return  res.status(401).json({
        Error: true,
        Success: false,
        message: 'You do not have access',
      }) 
     
    }
     else
    {
      return next();
    }
  
    return   res.status(401).json({ message: 'Authorization Failed!' });
  };