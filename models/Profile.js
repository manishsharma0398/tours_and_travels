const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    min: 4
  },
  username: {
    type: String,
    required: true,
    min: 6
  },
  name: {
    type: String,
    min: 6,
    required: true
  },
  gender: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("profile", ProfileSchema);
