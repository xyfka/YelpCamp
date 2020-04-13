var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose");

mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// Schema Setup

var campgroundSchema = new mongoose.Schema({
        name: String,
        image: String,
        description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Zakopane", 
//         image: "https://images.unsplash.com/photo-1559760283-b522593aa0b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=449&q=80",   
//         description: "This is a silly place!"
//     }, (err, campground) => {
//         if(err){
//             console.log("We have an error!");
//             console.log(err);
//         } else {
//             console.log("Campground created!");
//             console.log(campground);
//         }
//     });


app.get("/", (req, res) => {
    res.render("landing")
});

app.get("/campgrounds", (req, res) => {

    Campground.find({}, (err, allCampground) => {
        if(err){
            console.log(err);
        }else {
            res.render("index", {campgrounds: allCampground});
        }
    });
});

app.post("/campgrounds", (req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = { name: name, image: image, description: desc};
    Campground.create(newCampground, (err, campground) => {
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });

    
});

app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});


app.get("/campgrounds/:id", (req, res) => {
    
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err){
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });

});




app.listen(3000, () => {
    console.log("Server run on port 3000.");
});