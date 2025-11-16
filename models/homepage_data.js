const mongoose =require("mongoose");
const Schema=mongoose.Schema;

const homepage_data= new Schema({

    title: String,
    heading: String,
    description: String,
    image:String,
});
 module.exports= mongoose.model("homepage_data",homepage_data);
