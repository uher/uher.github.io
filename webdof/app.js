

var express = require('express')
var path = require('path')
var app = express()
var PythonShell = require('python-shell');

PythonShell.defaultOptions = {
        scriptPath: './python'
};

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
    // res.send

    getTracksFromPython(function(message) {
        console.log('received message: ' + message);
        res.send(message);
    });
});

app.get('/track/:feedback/:trackId', function(req, res) {
    
    var feedback = req.params.feedback;
    var trackId = req.params.trackId;

    var text = "feedback: " + req.params.feedback + ", trackid: " + req.params.trackId;
    
    sendFeedback(feedback, trackId, function(message){
        console.log('received message: ' + message);
        res.send(message);
    });

});

// app.post()

function getTracksFromPython(callback) {
    
    var option = { mode: 'text'};
    var pyshell = new PythonShell('get_track.py', option)

    pyshell.on('message', function (message) {

        console.log('message: ' + message);
        callback(message);

        }).on('close', function () {
        console.log('closed...');
    }).end();

}

function sendFeedback(trackId, feedback, callback) {

    console.log("trackid : " + trackId + ", feedback: " + feedback);

    var option = { mode: 'text'};
    var pyshell = new PythonShell('receive_feedback.py', option)

    var output = '';

    pyshell.stdout.on('data', function (data) {
        
        output += ''+data;
        console.log('stdout: ' + data);
    });

    pyshell.send(trackId).send(feedback).end(function (err) {

        console.log('send feedback end. output: ' + output + ', error: ' + err);

        if (err) {
            callback(output)
        } else {
            callback(output);
        }
    });
}



app.listen(port, function () {
  console.log('App listening on port: ' + port);
})