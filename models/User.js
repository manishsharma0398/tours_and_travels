const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    minlength: 5
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}, {timestamps: true});

module.exports = mongoose.model("users", UserSchema);
