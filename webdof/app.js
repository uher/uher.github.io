

var express = require('express')
var path = require('path')
var app = express()

var zerorpc = require("zerorpc");

var client = new zerorpc.Client();
client.connect("tcp://127.0.0.1:4242");

client.invoke("send", "Test message from Node.js", function(error, res, more) {
    console.log(res);
});


var port = 3000;

// view engine
app.set('view engine', 'jade')
app.set('views', './views')

app.locals.pretty = true;

app.use('/static', express.static(path.join(__dirname, '/views')))
app.use(express.static(__dirname + '/public'))
/////////

app.get('/form', function (req, res) {
    res.render('form', {time: 'hello'})
});


app.post('/form_receiver', function(req, res) {
    res.send('Hello, post');
});


//////////////////
app.get('/', function (req, res) {
    // res.send('Hello World!')
    res.sendFile(path.join(__dirname + "/public/index.html"));
})

// sementic url Example

app.get('topic/:id/:mode', function(req, res) {
    res.send(req.params.id + req.params.mode);
});


app.get('/login', function(req, res) {
    res.send('login please');
})

app.get('/track', function(req, res) {

    console.log('call get api get track!!');


    client.invoke("getTrack", "get Track message", function(error, response, more) {
        // console.log(res);
        console.log('receive. trackId: ' + response);
        res.send(response)
    });

    
});

app.get('/track/:feedback/:trackId', function(req, res) {
    
    var feedback = req.params.feedback;
    var trackId = req.params.trackId;

    var text = "feedback: " + req.params.feedback + ", trackid: " + req.params.trackId;

    client.invoke("receiveFeedback", feedback, trackId, function(error, response, more) {
        console.log('receiveFeedback message: ' + response);
        res.send(response)
    });

});


app.listen(port, function () {
  console.log('App listening on port: ' + port);
})