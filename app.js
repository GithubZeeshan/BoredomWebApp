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

    if (req.query.activityType == undefined && req.query.numParticipants == undefined){
        var url = 'http://www.boredapi.com/api/activity';
    }
    else{
        var url = 'http://www.boredapi.com/api/activity?type=' + req.query.activityType;
    }

    request(url, (error, response, body) => {
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
