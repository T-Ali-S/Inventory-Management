const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  product_id: String,
  length: String,
  width: String,
  weight: String,
  mass: String,
  price: String,
});

module.exports = mongoose.model("channel", UsersSchema);
