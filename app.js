if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
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

const e = require("express");
const session = require('express-session');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/reviews.js");
const userRouter=require("./routes/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverrirde("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const sessionOptions = {
  secret:"mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expire: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
};



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

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user; // Make the authenticated user available in all views
  next();
}
);

// app.get("/listings/login", (req, res) => {
//   res.sendFile(path.join(__dirname, "auth", "login", "login.html"));
// });
// app.get("/listings/signup", (req, res) => {
//   res.sendFile(path.join(__dirname, "auth", "signup", "signup.html"));
// });
// app.get("/listings/forget-password", (req, res) => {
//   res.sendFile(path.join(__dirname, "auth", "forget", "forget-password.html"));
// });

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);


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