const mongoose=require("mongoose");
const Listing=require("../models/tinderData.js");
const initData=require("./data.js");

main()
     .then(()=>{
        console.log("connections successfully done");
     })
     .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/tinder');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

 init = async ()=>{
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
   
}
init().then(e=>{
    console.log(e)
})
