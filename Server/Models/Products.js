const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  name: String,
  types: Number,
});

module.exports = mongoose.model("products", UsersSchema);
