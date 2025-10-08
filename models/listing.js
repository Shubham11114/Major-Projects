// const mongoose =require("mongoose");
// const Schema=mongoose.Schema;

// const listingSchema= new Schema({
//     title:{
//         type: String,
//         required:true,
//     } ,
//     description: String,
//     image:{
//         type:String,
//         default:"https://wallpaperaccess.com/full/505152.jpg",
//         set:(v) => v === "" ? "https://wallpaperaccess.com/full/505152.jpg" : v,
//     },
//     price:Number,
//     country:String,
// });

// const Listing= mongoose.model("Listing",listingSchema);
 
// module.exports=Listing;
// 
const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    filename: {
      type: String,
      default: "default-image.jpg",
    },
    url: {
      type: String,
      default: "https://wallpaperaccess.com/full/505152.jpg",
      set: v => v === "" ? "https://wallpaperaccess.com/full/505152.jpg" : v,
    },
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price must be positive"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
  },
  country: {
    type: String,
    required: [true, "Country is required"],
  },
}, { timestamps: true });

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
