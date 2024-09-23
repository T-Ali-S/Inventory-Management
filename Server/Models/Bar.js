const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  name: String,
  shape: String,
  length: String,
  price: String,
});

module.exports = mongoose.model("anglebar", UsersSchema);
