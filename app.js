const express = require("express");
const mongoose = require("mongoose");
const app = express();

var ClothesRoutes = require("./routes/ClothesRoutes");
const bodyparser = require("body-parser");

mongoose
  .connect("mongodb+srv://rishika:12345@cluster0.dupgpmj.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("db connected"))
  .catch("error", () => {
    console.log(error);
  });

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use("/api/ashvogue", ClothesRoutes);

app.listen(8080, () => {
  console.log("server started on 8080");
});
