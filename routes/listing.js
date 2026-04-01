const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const homepage_data = require("../models/homepage_data.js");
const {isLoggedIn, isOwner,validateSchema} = require("../middleware.js");


//index Routing
router.get("/", wrapAsync(async (req, res) => {
  const allListing = await Listing.find({});
  const homePage = await homepage_data.find({});
  res.render("./listings/index.ejs", { allListing, homePage });

}));

//New route 
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new.ejs");
});

//Show Route
router.get("/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
  .populate({ path: "reviews", populate: { path: "author" } })
  .populate("owner");
  if(!listing){
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
}));

//Create Route
router.post("/",isLoggedIn, validateSchema, wrapAsync(async (req, res, next) => {
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success", "Listing created successfully!");
  res.redirect("/listings");
}));



//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
   req.flash("success", "Edited successfully!");
  res.render("listings/edit.ejs", { listing });
}));

//Update Route
router.put("/:id",isLoggedIn,isOwner, validateSchema, wrapAsync(async (req, res) => {
  let { id } = req.params;
  let listing= await Listing.findById(id);
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
   req.flash("success", "Listing updated successfully!");
  res.redirect(`/listings/${id}`);

}));

//Delete Route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
  let { id } = req.params;
  id = id.trim();
  await Listing.findByIdAndDelete(id);
   req.flash("success", "Listing Deleted successfully!");
  res.redirect("/listings");
}));

module.exports=router;