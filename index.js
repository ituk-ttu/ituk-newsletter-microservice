var app = require('express')();
var request = require('request');
var fs = require("fs");
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var cors = require('cors');
var config = JSON.parse(fs.readFileSync("config.json"));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({	extended: true })); // support encoded bodies
app.use(cors());

app.post('/signup', function (req, res) {
    console.log({
        list_id: config.newsletter.listId,
        subscriber: req.body.email,
        pre_confirmed: false,
        pre_approved: true
    });
    request({
        method: "POST",
        url: config.newsletter.signupUrl,
        formData: {
            list_id: config.newsletter.listId,
            subscriber: req.body.email,
            pre_confirmed: false,
            pre_approved: true
        }
    }, function (response, err) {
        console.log(response);
        console.log(err);
        res.sendStatus(200);
    });
});

http.listen(config.port, function(){
    console.log('listening on *:' + config.port);
});
