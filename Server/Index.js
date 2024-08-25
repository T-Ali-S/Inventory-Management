const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());
const dbConnection = require("./db/connection");
const Users = require("./Models/User");
const Product = require("./Models/Products");

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
  const { name, price } = req.body;
  const newProduct = new Product({
    name,
    price,
  });

  await newProduct.save();
  res.send("Product successful Added");
});

app.listen(4000);
