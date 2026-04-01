const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const { error } = require("console");
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");
const ExpressError = require("../utils/ExpressError.js");
const {isLoggedIn} = require("../middleware.js");
const { validateReview} = require("../middleware.js");


//Reviews Route
router.post("/", isLoggedIn, validateReview, async (req, res) => {

  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
   req.flash("success", "Review added successfully!");
  res.redirect(`/listings/${listing._id}`);
 

});

module.exports = router;