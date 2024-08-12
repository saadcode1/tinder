const express=require("express");
const port=8085;
const app=express();
const mongoose=require("mongoose");
const wrapAsync=require("./utils/wrapAsync.js");
const methodOverride=require("method-override");
// requiring ejs-mate
const engine = require('ejs-mate');
// reqiuring data of tinder
const Listing=require("./models/tinderData.js");
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
const path=require("path");
app.use(express.static(path.join(__dirname,"public")));
app.engine('ejs', engine);
app.set("view engine","ejs");
// making folder globally accessible
app.set("views",path.join(__dirname,"/views"));
// parsing form data
app.use(express.urlencoded({extended:true}));
 main()
     .then(()=>{
        console.log("connections successfully done");
     })
     .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/tinder');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.listen(port,(req,res)=>{
    console.log("connected")
 });

 let currentIndex = 0; // To keep track of the current index


 app.get("/fetch", async (req, res) => {
     try {
         const count = await Listing.countDocuments(); // Get total count of documents
 
         if (currentIndex >= count) {
             currentIndex = 0; // Reset index if all documents have been fetched
         }
 
         const listing = await Listing.findOne().skip(currentIndex); // Fetch one document at the current index 
         currentIndex++; // Increment index for the next fetch
 
         res.render("tinder.ejs", { item: listing });
     } catch (err) {
        //  console.log(err);
        //  res.status(500).send("Internal Server Error");
        next(err);
     }
 });
// middleware
app.use((err,req,res,next)=>{
    res.send("something went wrong!");
})

 app.get("/fetch/add",(req,res)=>{
    res.render("form.ejs");
 });

 app.post("/fetch/add/posted",async(req,res)=>{
    let={name,image,description,location,country,}=req.body;
  let postData = new Listing({
    name,
    image,
    description,
    location,
    country
});

try {
    await postData.save();
    res.redirect("/fetch");
} catch (err) {
    console.log(err.message);
    res.status(500).send("Internal Server Error");
}
 })

 app.get("/fetch/add/:id",async (req,res)=>{
   try{
    let {id}=req.params;
    let editData=await Listing.findById(id);
    res.render("edit.ejs",{data:editData});
   } catch(err){
    res.send(err);
   }
 })

 app.put("/fetch/add/:id",async (req,res)=>{
    try{

        let data = {name,description,image,location,country}=req.body;
        let {id}=req.params;
        console.log(data);
        let updatedData=await Listing.findByIdAndUpdate(id,{...req.body.data});
        updatedData.save();
        res.redirect("/fetch");
    }catch(err){
        res.send(err);
    }
    
 })