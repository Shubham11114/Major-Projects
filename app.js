const express= require("express");
const app = express();
const mongoose =require("mongoose");
const Listing=require("../Major Projects/models/listing.js");
const path= require("path");
const methodOverrirde= require("method-override");
const ejsMate= require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema}=require("./schema.js");
const { error } = require("console");
const Review=require("./models/reviews.js");



app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverrirde ("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));




main()  
  .then(()=>{
    console.log("Mongo is connected")
  })
  .catch((err)=>{
    console.log(err);
  });

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/WonderHub");
}


app.get("/",(req,res)=>{
    res.send("Hi i am root");
});

const validateSchema=(req,res,next)=>{
  let {error}=listingSchema.validate(req.body);
  if(error){
    throw new ExpressError(400,error);
  }else{
    next();
  }
}


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


//index Routing
app.get("/listings",wrapAsync(async (req,res)=>{
 const allListing= await Listing.find({});
 res.render("listings/index.ejs",{allListing});

}));

//New route / Create new
app.get("/listings/new",(req,res)=>{
  res.render("listings/new.ejs");
});

//Show Route
app.get("/listings/:id",wrapAsync(async (req,res)=>{
  let{id}=req.params;
  const listing=await Listing.findById(id);
  res.render("listings/show.ejs",{listing});
}));

//Create Route
app.post("/listings",validateSchema,wrapAsync( async (req,res,next)=>{
  const newListing= new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
}));
 

//Edit Route
app.get("/listings/:id/edit",wrapAsync(async (req,res)=>{
  let{id}=req.params;
  const listing=await Listing.findById(id);
  res.render("listings/edit.ejs",{listing});
}));

//Update Route
app.put("/listings/:id",validateSchema,wrapAsync(async (req,res)=>{
  let{id}=req.params;
  await Listing.findByIdAndUpdate(id,{...req.body.listing});
  res.redirect(`/listings/${id}`);
  
}));

//Delete Route
app.delete("/listings/:id",wrapAsync( async (req,res)=>{
  let{id}=req.params;
  id = id.trim();
  await Listing.findByIdAndDelete( id );
  res.redirect("/listings");
}));

//Reviews Route
app.post("/listings/:id/reviews",async (req,res)=>{

  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);

  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();

  console.log("new reviews saved ");
  res.send("New reviw saved"); 


})
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

app.listen(8080,()=>{
    console.log("Server is listening to port 8080");
});