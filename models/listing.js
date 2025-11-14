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
// 
const mongoose = require("mongoose");
const reviews = require("./reviews");
const { ref } = require("joi");
const { Schema } = mongoose;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,

  image: {
    filename: {
      type: String,
      default: "default-image.jpg"
    },
    url: {
      type: String,
      default: "https://wallpaperaccess.com/full/505152.jpg",
      set: (v) =>
        v === "" ? "https://wallpaperaccess.com/full/505152.jpg" : v
    }
  },

  price: Number,
  location: String,
  country: String,
  reviews:[
    {
      type: Schema.Types.ObjectId,
      ref:"Review",
    },
  ],
});

module.exports = mongoose.model("Listing", listingSchema);
