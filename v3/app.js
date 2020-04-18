var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Campground      = require("./models/campground"),
    seedDB          = require("./seeds");


mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
seedDB();


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

// --- SHOW route ---

app.get("/campgrounds/:id", (req, res) => {   
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
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