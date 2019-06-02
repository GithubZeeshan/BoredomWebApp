var express = require("express");
var app = express();
var request = require("request");

//tell express to serve "public" directory on server
app.use(express.static("public"));

//tell express to use ejs format as default
app.set("view engine", "ejs");

//index route
app.get("/", (req, res) => {
    res.render("home");
});

//serve app on port 3000
app.listen(3000, () => console.log('Boredom Web App being served on Port 3000'));
