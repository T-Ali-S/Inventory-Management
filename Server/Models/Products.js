const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

module.exports = mongoose.model("products", UsersSchema);
