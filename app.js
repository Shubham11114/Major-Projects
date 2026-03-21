const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("../Major Projects/models/listing.js");
const path = require("path");
const methodOverrirde = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js");
const { error } = require("console");
const Review = require("./models/reviews.js");
const homepage_data = require("./models/homepage_data.js");
const listings=require("./routes/listing.js");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverrirde("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// Middleware to make currentUser available in all views (even if null)
app.use((req, res, next) => {
  res.locals.currentUser = null; // Set to req.user if auth is implemented
  next();
});




main()
  .then(() => {
    console.log("Mongo is connected")
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/WonderHub");
}


app.get("/", (req, res) => {
  res.send("Hi i am root");
});




// app.get("/testlisting",async (req,res)=>{
//     let sampleListing= new Listing({
//         title:"My villa",
//         description:"This is my private vila ",
//         price:19000,
//         country:"India",
//     })
//     await sampleListing.save(); 
//     console.log("Sample was saved");
//     res.send("Testing was sucessfully"); 
// });
app.get("/listings/login", (req, res) => {
  res.sendFile(path.join(__dirname, "auth", "login", "login.html"));
});
app.get("/listings/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "auth", "signup", "signup.html"));
});
app.get("/listings/forget-password", (req, res) => {
  res.sendFile(path.join(__dirname, "auth", "forget", "forget-password.html"));
});

app.use("/listings", listings);

//Reviews Route
app.post("/listings/:id/reviews", async (req, res) => {

  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);

  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();

  console.log("new reviews saved ");
  res.redirect(`/listings/${listing._id}`);
 

});



// app.all("",(req,res,next)=>{
//   next(new ExpressError(404,"Page not Found!!"));
// })
app.all("", (req, res, next) => {
  next(new ExpressError(404, "Page not Found!!"));
});

// app.use((err,req,res,next)=>{
//   let {statusCode=500,message="Something went Wrong !!"}=err; 
//   res.status(statusCode).render("error.ejs",{err});
//   res.status(statusCode).send(message);
//   next(); 
// })
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong!";
  res.status(statusCode).render("error.ejs", { err });
});

app.listen(8080, () => {
  console.log("Server is listening to port 8080");
});