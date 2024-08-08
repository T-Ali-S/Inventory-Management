const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());
const dbConnection = require("./db/connection");
const Users = require("./Models/User");
const User = require("./Models/User");

// app.post("/", async (req, res) => {
//   let user = new Users(req.body);
//   let result = await user.save();
//   res.send("Signup successful");
// });

app.get("/a", async (req, res) => {
  let users = await Users.find();
  res.send(users);
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  Users.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("the password is incorrect");
      }
    } else {
      res.json("no record existed");
    }
  });
});
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new Users({
    name,
    email,
    password,
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

app.listen(4000);
