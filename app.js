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

app.get("/result", (req, res) => {

    var queryUrl = 'http://www.boredapi.com/api/activity';

    if (!(req.query.randomActivity == "activity")){
        var queryUrl = queryUrl + '?type=' + req.query.activityType;
        
        var priceInc = Boolean(req.query.priceIncluded);
        var participantInc = Boolean(req.query.participantIncluded);
        
        if (priceInc){
            var queryUrl = queryUrl + '&price=' + req.query.price;
        }
        if (participantInc){
            var queryUrl = queryUrl + '&participants=' + req.query.participants;
        }
    }

    request(queryUrl, (error, response, body) => {
        if (error){
            console.log("Error");
            res.render("home");
        }
        else{
            var data = JSON.parse(body);
            console.log(data);
            res.render("result", {data: data});
        }
    });
});

//serve app on port 3000
app.listen(3000, () => console.log('Boredom Web App being served on Port 3000'));
