const express = require('express');
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/user.js");
const path = require("path");
const wrapAsync = require("../utils/wrapAsync.js");
const {saveRedirectUrl} = require("../middleware.js");


router.get("/signup", (req, res) => {
  res.render("users/signup.ejs", { hideAuthButtons: true });
});

router.post("/signup", wrapAsync(async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ email,username });
    const registeredUser = await User.register(newUser, password);
      req.login(registeredUser, (err) => {
      if (err) {
        next(err);
      } else {
        req.flash("success", `Welcome ${username} to WonderHub!`);
        res.redirect("/listings");
      } });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
   } 
}));

router.get("/login", (req, res) => {
  res.render("users/login.ejs", { hideAuthButtons: true });
});

router.post("/login", saveRedirectUrl,passport.authenticate("local", {
  failureFlash: true,
  failureRedirect: "/login",
}), (req, res) => {
  req.flash("success",`Welcome back, ${req.user.username}!`);
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
}
);

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) { 
      return next(err);
    }
    req.flash("success", "Logged out successfully!");
    res.redirect("/listings");
  }); 
});



router.get("/forget-password", (req, res) => {
  res.render("users/forget.ejs", { hideAuthButtons: true });
});


      

module.exports = router;
