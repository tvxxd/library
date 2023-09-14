if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");

let accounts = [];
const initPassport = require("./passport");
initPassport(passport, (email) =>
  accounts.find((user) => user.email === email)
);


app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.render("index.ejs");
});
// app.get("/views/login.ejs", (req, res) => {
//   res.render("login.ejs");
// });

app.get("/login", (req, res) => {
  res.render("login.ejs");
})

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  try {
    console.log(accounts);
    const hashedPsw = await bcrypt.hash(req.body.password, 10);
    accounts.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPsw,
    });
    res.redirect("/login");
  } catch (error) {
    res.redirect("/register");
    console.log(error);
  }
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));

app.listen(3000);
