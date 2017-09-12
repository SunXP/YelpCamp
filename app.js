var express = require("express");
var app = express();
var bodyParser = require("body-parser");

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
    
        res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
     //get data from form and add to campgrounds array
     res.redirect("/campgrounds");
     //redirect back to campgrounds page
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started.");
});