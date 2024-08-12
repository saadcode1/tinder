const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const tinderSchema=new Schema({
    name:{
        type:String
    },
    description: {
      type:String
    },
    image:{
        type:String,
    },
    location:{
        type:String
    },
    country:{
        type:String,
        required:true
    }
});

const Listing=mongoose.model("Listing",tinderSchema);
module.exports=Listing;
