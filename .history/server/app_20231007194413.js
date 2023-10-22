const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

//tested
require("dotenv").config();

var ClothesRoutes = require("./routes/ClothesRoutes");
var LoginRoute = require("./routes/LoginRoute");
var RegisterRoute = require("./routes/RegisterRoute");
var ProfileRoute = require("./routes/ProfileRoute");
var AdminRoute=require("./routes/AdminRoute");
var CartRoute=require("./routes/CartRoute");
var favouriteRoute=require("./routes/FavouriteRoute");
const bodyparser = require("body-parser");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("db connected"))
  .catch("error", () => {
    console.log(error);
  });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api/ashvogue", ClothesRoutes);
app.use("/api/ashvogue/login", LoginRoute);
app.use("/api/ashvogue/register", RegisterRoute);
app.use("/api/ashvogue/profile", ProfileRoute);
app.use("/api/ashvogue/admin", AdminRoute);
app.use("/api/ashvogue/cart", CartRoute);


app.listen(process.env.PORT, () => {
  console.log(`server started on ${process.env.PORT}`);
});
