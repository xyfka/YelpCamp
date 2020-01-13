var express = require("express");
var app = express();
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("landing")
});

app.get("/campgrounds", (req, res) => {

    var campgrounds = [
        {name: "Radawa", image: "https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
        {name: "Tarnica", image: "https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
        {name: "Zakopane", image: "https://images.unsplash.com/photo-1533518509997-eddedc7f704e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80"}
    ];
    res.render("campgrounds", {campgrounds: campgrounds});

});






app.listen(3000, () => {
    console.log("Server run on port 3000.");
});