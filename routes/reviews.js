const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const { error } = require("console");
const Listing = require("../models/listing.js");
const homepage_data = require("../models/homepage_data.js");
const Review = require("../models/reviews.js");
const ExpressError = require("../utils/ExpressError.js");

const validateReviewSchema = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
      let msg = error.details.map(el => el.message).join(",");
      throw new ExpressError(400, msg);
    } else {
      next();
    }
};



//Reviews Route
router.post("/", async (req, res) => {

  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);

  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();

  console.log("new reviews saved ");
   req.flash("success", "Review added successfully!");
  res.redirect(`/listings/${listing._id}`);
 

});

module.exports = router;