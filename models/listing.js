const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const listingSchema=new mongoose.Schema({
    title:{
        type:String,
       required:true,
    },
    description:String,
    image:{
          filename:{
          type: String,
          },
          url:{
        type:String,

        default:"https://unsplash.com/photos/the-sun-is-setting-over-the-ocean-and-rocks-zq_wTHSFV0g",
        set:(v)=>v ===""?"https://unsplash.com/photos/the-sun-is-setting-over-the-ocean-and-rocks-zq_wTHSFV0g"
        :v,
    },
},
        price:Number,
    location:String,
    country:String,
});
const Listing=mongoose.model('Listing',listingSchema);
module.exports=Listing;