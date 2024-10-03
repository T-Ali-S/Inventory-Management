const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  name: String,
  guage: String,
  length: String,
  width: String,
  mass: String,
  price: String,
});

module.exports = mongoose.model("pipe", UsersSchema);
