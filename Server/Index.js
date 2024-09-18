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
    const angleBars = await AngleBar.find();
    res.status(200).json(angleBars);
  } catch (error) {
    console.error("Error fetching AngleBars:", error);
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

app.post("/checkChannel", async (req, res) => {
  try {
    const { length, width, weight } = req.body;
    const checkChannel = await Channel.findOne({ length, width, weight });

    if (checkChannel) {
      res.status(409).send("Channel with the same dimensions already exists");
    } else {
      res.status(200).send("Channel name is available");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while checking the product");
  }
});
app.post("/checkAngleBar", async (req, res) => {
  try {
    const { _id, shape, length } = req.body;

    // Check if another row with the same shape and length already exists (excluding the current one being edited)
    const checkAngleBar = await AngleBar.findOne({
      shape: shape,
      length: length,
      _id: { $ne: _id }, // Exclude the current row by _id
    });

    if (checkAngleBar) {
      // If such a row exists, send a conflict error
      res
        .status(409)
        .send("An AngleBar with the same shape and length already exists.");
    } else {
      // No conflicts, safe to proceed with editing
      res.status(200).send("AngleBar is available for editing.");
    }
  } catch (error) {
    res.status(500).send({ error: "Error checking AngleBar" });
  }
});

app.post("/checkAngleIron", async (req, res) => {
  try {
    const { length, width } = req.body;
    const checkAngleIron = await AngleIron.findOne({ length, width });

    if (checkAngleIron) {
      res.status(409).send("AngleIron with the same dimensions already exists");
    } else {
      res.status(200).send("AngleIron name is available");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while checking the product");
  }
});
app.post("/checkPipes", async (req, res) => {
  try {
    const { guage, length, width } = req.body;
    const checkPipes = await Pipes.findOne({ guage, length, width });

    if (checkPipes) {
      res.status(409).send("Pipes with the same dimensions already exists");
    } else {
      res.status(200).send("Pipes name is available");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while checking the product");
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
  res.send("New Sub-Category for Channel Saved succesfully");
});
app.post("/addAngleIron", async (req, res) => {
  const { product_id, length, width } = req.body;
  const newAngleIron = new AngleIron({
    product_id,
    length,
    width,
  });
  await newAngleIron.save();
  res.send("New Sub-Category for AngleIron Saved succesfully");
});
app.post("/addAngleBar", async (req, res) => {
  const { product_id, shape, length } = req.body;

  try {
    // Validate input fields
    if (!product_id || !shape || !length) {
      return res.status(400).send("All fields are required");
    }

    // Create a new AngleBar object
    const newAngleBar = new AngleBar({
      product_id,
      shape,
      length,
    });

    // Save the new AngleBar in the database
    await newAngleBar.save();
    res.status(201).send("New Sub-Category for AngleBar Saved successfully");
  } catch (error) {
    console.error("Error saving AngleBar:", error);
    res.status(500).send("Error saving AngleBar");
  }
});
app.post("/addPipes", async (req, res) => {
  const { product_id, guage, width, length } = req.body;

  try {
    // Validate input fields
    if (!product_id || !guage || !width || !length) {
      return res.status(400).send("All fields are required");
    }

    // Create a new AngleBar object
    const newPipes = new Pipes({
      product_id,
      guage,
      width,
      length,
    });

    // Save the new AngleBar in the database
    await newPipes.save();
    res.status(201).send("New Sub-Category for Pipes Saved successfully");
  } catch (error) {
    console.error("Error saving Pipes:", error);
    res.status(500).send("Error saving Pipes");
  }
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

app.post("/editChannel", async (req, res) => {
  const { _id, length, width, weight } = req.body;
  try {
    const channel = await Channel.findById(_id);
    if (!channel) {
      return res.status(404).json({ msg: "Channel not found" });
    }
    channel.length = length || channel.length; // Update name if provided, otherwise keep the existing value
    channel.width = width || channel.width; // Update name if provided, otherwise keep the existing value
    channel.weight = weight || channel.weight; // Update name if provided, otherwise keep the existing value

    await channel.save();
    res.send({ status: "Ok", data: "Channel Edited" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});
app.post("/editAngleIron", async (req, res) => {
  const { _id, length, width } = req.body;
  try {
    const angleIron = await AngleIron.findById(_id);
    if (!angleIron) {
      return res.status(404).json({ msg: "AngleIron not found" });
    }
    angleIron.length = length || angleIron.length; // Update name if provided, otherwise keep the existing value
    angleIron.width = width || angleIron.width;

    await angleIron.save();
    res.send({ status: "Ok", data: "AngleIron Edited" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});
app.post("/editAngleBar", async (req, res) => {
  const { _id, length, shape } = req.body;
  try {
    const angleBar = await AngleBar.findById(_id);
    if (!angleBar) {
      return res.status(404).json({ msg: "AngleBar not found" });
    }

    angleBar.length = length || angleBar.length;
    angleBar.shape = shape || angleBar.shape;

    await angleBar.save();
    res.send({ status: "Ok", data: "AngleBar Edited" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

app.listen(4000);
