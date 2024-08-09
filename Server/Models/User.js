const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  adminCheck: Boolean,
});

module.exports = mongoose.model("Users", UsersSchema);
