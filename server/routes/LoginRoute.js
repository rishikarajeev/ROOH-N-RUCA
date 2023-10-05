const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const loginschema = require("../models/LoginModel");
const LoginRouter = express.Router();

LoginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;  //destructure req.body.username//dry code
  try {
    if (username && password) {
      const olduser = await loginschema.findOne({ username });

      if (!olduser) {
        return res
          .status(404)
          .json({ success: false, error: true, message: "User Not Found" });
      
        }
      const isPasswordCorrect = await bcrypt.compare(password, olduser.password);
      //if password wrong
      if (!isPasswordCorrect) {
        return res
          .status(404)
          .json({ success: false, error: true, message: "Incorrect Password" });
      }

      const token = jwt.sign(
         {//payload
          userId: olduser._id,
          userRole: olduser.role,
          userName: olduser.username,
        },
        //secret key
        "secretthisshudbelongerss",
        { expiresIn: "1hr" }
      );
      console.log("token", token);
      return res
        .status(201)
        .json({
          success: true,
          error: false,
          token: token,
          expiresIn: 3600,
          loginId: olduser._id,
          userRole: olduser.role,
          userName: olduser.username,
          
        });
    } else {
      return res
        .status(400)
        .json({
          success: false,
          error: true,
          message: "All fields are required",
        });
    }
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});
module.exports = LoginRouter;
