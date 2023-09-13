const express = require("express");
const app = express();
const path = require('path');

app.set("view-engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))

app.listen(3000);
