var mongoose        = require("mongoose"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment");


var data = [
    {   name: "Radawa", 
        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ex dui, scelerisque imperdiet sem sed, facilisis pharetra nisi. Etiam risus lectus, facilisis sit amet urna."
    },
    {   name: "Zakopane", 
    image: "https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non pellentesque turpis, id semper dui. Ut dapibus ipsum eu leo consectetur semper."
    }, 
    {   name: "Pieniny", 
    image: "https://images.unsplash.com/photo-1573111651692-39ec7f38fec9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac est feugiat, commodo ante ac, molestie mauris. Quisque vestibulum libero sit amet massa commodo, vitae tincidunt quam lacinia. Phasellus sem nisi, dapibus nec viverra at, faucibus eu enim. Suspendisse et massa et velit pulvinar fermentum maximus vitae felis. Ut rhoncus."
    }  
];

function seedDB(){
//========= Remove All Campgrounds ========

    Campground.deleteMany({}, (err) => {
        if(err){
            console.log(err);
        } else {
        console.log("Removed campgrounds!");
        }

        //========= Add Few Campgrounds ========

    data.forEach((seed) => {
        Campground.create(seed, (err, campground) => {
            if(err) {
                console.log(err);
            } else {
                console.log("Added a campground");
                Comment.create(
                    {
                        text: "This place is great, but i wish there was internet avaible!",
                        author: "Homer"
                    }, (err, comment) => {
                        if(err) {
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created new comment.");
                        }
                    });
            }
         });
        });
    });

//========= ADD Few Comments========




}

module.exports = seedDB;