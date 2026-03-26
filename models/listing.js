const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const Review = require("./review.js");
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
default: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        // default:"https://unsplash.com/photos/the-sun-is-setting-over-the-ocean-and-rocks-zq_wTHSFV0g",
         set:(v)=>v ===""?"https://images.unsplash.com/photo-1507525428034-b723cf961d3e"//"https://unsplash.com/photos/the-sun-is-setting-over-the-ocean-and-rocks-zq_wTHSFV0g"
        :v,
    },
},
        price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
});
const Listing=mongoose.model('Listing',listingSchema);
// Delete all reviews when listing is deleted
listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});
module.exports=Listing;