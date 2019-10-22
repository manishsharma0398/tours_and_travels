const mongoose = require("mongoose");
const app = require('./app')
// dotenv
require("dotenv/config");

// logger init
const morgan = require("morgan");

// logging in console
app.use(morgan("dev"));

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => console.log("Connected To DB!")
);

app.listen(3000, () => {
    console.log('App is listening on port 3000!');
})