const express = require('express');
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/user.js");
const path = require("path");

router.get("/signup", (req, res) => {
   res.send("Signup Page");
});

module.exports = router;
