var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    var campgrounds = [
        {name: "Salmon Creek", image: "http://photosforclass.com/download/7626464792"},
        {name: "Granite Hill", image: "http://photosforclass.com/download/5641024448"},
        {name: "Mountain Goat's Rest", image: "http://photosforclass.com/download/4812576807"}
        ];
        
        res.render("campgrounds", {campgrounds: campgrounds});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started.");
});