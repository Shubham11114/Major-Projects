const mongoose =require("mongoose");
const initData= require("./data.js");
const Listing=require("../models/listing.js");
const hoamePageData=require("./homePageData.js");


main()  
  .then(()=>{
    console.log("Mongo is connected");
  })
  .catch((err)=>{
    console.log(err);
  });

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/WonderHub");
}
const initDB= async ()=>{
   await  Listing.deleteMany({});
  initData.data= initData.data.map((obj)=>({ ...obj, owner:"69cbc497ee5f72485a6e7956" || null }));
   await Listing.insertMany(initData.data);
  //  await hoamePageData.insertMany(initData.data);
   console.log("Data was initilize Sucessfully");
}
initDB(); 