const express = require('express');
const app = express();
const mongoose = require('mongoose');
const MONGO_URL='mongodb://127.0.0.1:27017/wanderlust';
const path = require('path');
const Listing=require('./models/listing.js');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
app.use(methodOverride('_method'));
main().then(() => {
    console.log("Database connection established");
})
.catch((err) => {console.log(err);
});
async function main() {
  await mongoose.connect(MONGO_URL);
}
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, '/public')));
app.get('/', (req, res) => {
    res.send('hi i am root!');
}); 
//index route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index",{allListings});
});
//new route
app.get("/listings/new", (req, res) => {
    res.render("listings/new");
});
//show route
app.get("/listings/:id", async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show",{listing});
});
app.post("/listings", async (req, res) => {
       console.log(req.body);
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});
//edit route
app.get("/listings/:id/edit", async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit",{listing});
});
app.put("/listings/:id", async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listings");
});
app.delete("/listings/:id", async (req, res) => {
    const { id } = req.params;
    let deletedListing= await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});
// app.get('/testlistings', async (req, res) => {
//     let sampleListings = new Listing({
//         title: "my new villa",
//         description: "by the beech",
//         price: 1200,
//         location: "goa",
//         country: "india",
//     });
//       await sampleListings.save();
//       console.log("saved");
//         res.send('successful');
// });
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});