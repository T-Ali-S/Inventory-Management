const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  custName: String,
  productName: String,
  length: String,
  width: String,
  weight: String,
  mass: String,
  guage: String,
  shape: String,
  quantity: String,
  price: String,
  date: { type: Date, default: Date.now },
  paymentType: { type: String, enum: ["cash", "credit"], required: true },
});

module.exports = mongoose.model("sales", UsersSchema);
