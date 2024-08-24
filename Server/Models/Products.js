const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("products", UsersSchema);
