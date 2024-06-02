const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const user = require("./models/userModal");

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/create", (req, res) => {});

app.post("/create", async (req, res) => {
  const { name, email, image } = req.body;
  var createdUser = await user.create({ name, email, image });
  res.redirect("/users");
});

app.get("/users", async (req, res) => {
  let users = await user.find();
  res.render("users", { users });
});

app.get("/delete/:id", async (req, res) => {
  let deleteuser = await user.findOneAndDelete({ id: req.params._id });
  res.redirect("/users");
});

app.get("/update/:id", async (req, res) => {
  let users = await user.findOne({ _id: req.params.id });
  res.render("update", { users });
});

app.post("/update/:id", async (req, res) => {
  const { name, email, image } = req.body;
  var updated = await user.findOneAndUpdate(
    { _id: req.params.id },
    { name, email, image },
    { new: true }
  );
  res.redirect("/users");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
