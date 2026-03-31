const express = require('express');
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/user.js");
const path = require("path");


router.get("/signup", (req, res) => {
  res.render("users/signup.ejs", { hideAuthButtons: true });
});

router.get("/login", (req, res) => {
  res.render("users/login.ejs", { hideAuthButtons: true });
});

router.get("/forget-password", (req, res) => {
  res.render("users/forget.ejs", { hideAuthButtons: true });
});

router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);
    const newUser = new User({ email,username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.flash("success", "Welcome to WonderHub!");
    res.redirect("/listings");
});
      

module.exports = router;
