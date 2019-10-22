const mongoose = require("mongoose");
const app = require('./app')
// dotenv
require("dotenv/config");

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => console.log("Connected To DB!")
);

app.listen(3000, () => {
    console.log('App is listening on port 3000!');
})