

var express = require('express')
var path = require('path')
var app = express()
var PythonShell = require('python-shell');

// view engine
app.set('view engine', 'jade')
app.set('views', './views')

app.locals.pretty = true;

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/static', express.static(path.join(__dirname, 'views')))

/////////

app.get('/form', function (req, res) {
    res.render('form', {time: 'hello'})
});


app.post('/form_receiver', function(req, res) {
    res.send('Hello, post');
});


//////////////////
app.get('/', function (req, res) {
    res.send('Hello World!')
})

// sementic url Example

app.get('topic/:id/:mode', function(req, res) {
    res.send(req.params.id + req.params.mode);
});


app.get('/login', function(req, res) {
    res.send('login please');
})

// app.post()

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})













// test area

app.get('/topic', function(req, res) {
var topics = [
    'Java',
    'Node',
    'express',
]
    var as = `
    <a href="/topic?id=0">JavasScript</a><br>
    <a href="/topic?id=1">Nodejs</a><br>
    <a href="/topic?id=2">Express</a><br>
    ${topics[req.query.id]}
    `

    res.send(as)
});
