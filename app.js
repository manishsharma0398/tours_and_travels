const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");

app.get("/", (req, res) => {
  res.json("Hi, Index is working fine.");
});
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);


module.exports = app

