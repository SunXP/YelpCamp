var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
// Schema

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
    
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Granite Hill", 
//     image: "http://photosforclass.com/download/5641024448",
//     description: "This is a great place"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("NEWLY CREATED CAMPGROUND: ");
//             console.log(campground);
//         }
//     });

var campgrounds = [
        {name: "Salmon Creek", image: "http://photosforclass.com/download/7626464792"},
        {name: "Granite Hill", image: "http://photosforclass.com/download/5641024448"},
        {name: "Mountain Goat's Rest", image: "http://photosforclass.com/download/4812576807"}
        ];

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
       if(err){
            console.log(err);
       } else{
            res.render("index", {campgrounds:allCampgrounds});
       }
    });
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    //get data from form and add to campgrounds array
    var newCampground = {name: name, image: image, description: desc};
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
            //redirect back to campgrounds page
        }
        
    });

});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampGround){
        if(err){
            console.log(err);
        } else {
            res.render("show", {campground: foundCampGround});

        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started.");
});