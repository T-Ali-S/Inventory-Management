const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  mass: String,
});

module.exports = mongoose.model("inventory", UsersSchema);
