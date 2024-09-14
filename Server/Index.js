const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());
const dbConnection = require("./db/connection");
const Users = require("./Models/User");
const Product = require("./Models/Products");
const Channel = require("./Models/Channels");
const AngleIron = require("./Models/Iron");
const AngleBar = require("./Models/Bar");
const Pipes = require("./Models/Pipes");
// app.post("/", async (req, res) => {
//   let user = new Users(req.body);
//   let result = await user.save();
//   res.send("Signup successful");
// });

app.get("/a", async (req, res) => {
  let users = await Users.find();
  res.send(users);
});
app.get("/getProduct", async (req, res) => {
  let products = await Product.find();
  res.send(products);
});
app.get("/getChannel", async (req, res) => {
  try {
    const channel = await Channel.find();
    res.status(200).json(channel);
  } catch (error) {
    console.error("Error fetching channels:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/getAngleIron", async (req, res) => {
  try {
    const angleIron = await AngleIron.find();
    res.status(200).json(angleIron);
  } catch (error) {
    console.error("Error fetching channels:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/getAngleBar", async (req, res) => {
  try {
    const anglebar = await AngleBar.find();
    res.status(200).json(anglebar);
  } catch (error) {
    console.error("Error fetching channels:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/getPipe", async (req, res) => {
  try {
    const pipe = await Pipes.find();
    res.status(200).json(pipe);
  } catch (error) {
    console.error("Error fetching channels:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  Users.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json({ success: true, username: user.name });
      } else {
        res.json({ success: false, message: "the password is incorrect" });
      }
    } else {
      res.json({ success: false, message: "no record existed" });
    }
  });
});
app.post("/adminlogin", (req, res) => {
  const { email, password } = req.body;
  Users.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.adminCheck === true && user.password === password) {
        res.json({ success: true, username: user.name });
      } else {
        res.json({ success: false, message: "the password is incorrect" });
      }
    } else {
      res.json({ success: false, message: "no record existed" });
    }
  });
});
app.post("/signup", async (req, res) => {
  const { name, email, password, adminCheck } = req.body;
  const newUser = new Users({
    name,
    email,
    password,
    adminCheck,
  });
  await newUser.save();
  res.send("Signup successful");
});

app.post("/check-email", async (req, res) => {
  const { email } = req.body;
  const user = await Users.findOne({ email });
  if (user) {
    res.send("Email already exists");
  } else {
    res.send("Email is available");
  }
});
app.post("/check-product", async (req, res) => {
  const { name } = req.body;
  const products = await Product.findOne({ name });
  if (products) {
    res.send("Product name already exists");
  } else {
    res.send("Product name is available");
  }
});

app.post("/add-product", async (req, res) => {
  const { name, types } = req.body;
  const newProduct = new Product({
    name,
    types,
  });

  await newProduct.save();
  res.send("Product successful Added");
});

app.post("/addChannel", async (req, res) => {
  const { product_id, length, width, weight } = req.body;
  const newChannel = new Channel({
    product_id,
    length,
    width,
    weight,
  });
  await newChannel.save();
  res.product("New Sub-Category for Channel Saved succesfully");
});

app.post("/deleteProducts", async (req, res) => {
  const { id } = req.body;
  try {
    const proDelete = await Product.deleteOne({ _id: id });
    res.send({ status: "Ok", data: "Product Deleted" });
  } catch (error) {
    return res.send({ error: error.message });
  }
});
app.post("/editProducts", async (req, res) => {
  const { _id, name, types } = req.body;
  try {
    const product = await Product.findById(_id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    product.name = name || product.name; // Update name if provided, otherwise keep the existing value
    product.types = types || product.types; // Update types if provided, otherwise keep the existing value
    await product.save();
    res.send({ status: "Ok", data: "Product Edited" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

app.listen(4000);
