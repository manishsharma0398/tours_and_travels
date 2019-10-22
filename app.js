const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// logger init
const morgan = require("morgan");

// logging in console
app.use(morgan("dev"));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");

app.get("/", (req, res) => {
  res.send("Hi, Index is working fine.");
});
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);


module.exports = app

