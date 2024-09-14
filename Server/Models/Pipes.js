const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  guage: String,
  length: String,
  width: String,
});

module.exports = mongoose.model("pipe", UsersSchema);
