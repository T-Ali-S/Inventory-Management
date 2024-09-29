const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  productName: String,
  length: String,
  width: String,
  weight: String,
  guage: String,
  price: String,
  quantity: String,
  mass: String,
  customerName: String,
  cellNumber: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("orders", UsersSchema);
