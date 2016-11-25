var should = require('should');
var PythonShell = require('python-shell');


var assert = require('assert');

describe('Array Test', function() {
    
    describe('#indexOf()', function() {

        it('should return -1 when the value is not present', function() {

            assert.equal(-1, [1,2,3].indexOf(4));
        });
    });

});


describe('PythonShell', function () {

    PythonShell.defaultOptions = {
        scriptPath: './test/python'
    };

    describe('.receive(data)', function () {


            it('should emit messages as strings when mode is "text"', function (done) {
                var pyshell = new PythonShell('echo_text.py', {
                    mode: 'text'
                });
                var count = 0;
                pyshell.on('message', function (message) {

                    console.log('message: ' + message);
                    count === 0 && message.should.be.exactly('hello');
                    count === 1 && message.should.be.exactly('world');
                    count++;
                }).on('close', function () {
                    count.should.be.exactly(2);
                }).send('hello').send('world').end(done);
            });
            
            
    });

    
    
    
    describe('.send(message)', function () {


        it('should send JSON messages when mode is "json"', function (done) {
            var pyshell = new PythonShell('echo_json.py', {
                mode: 'json'
            });
            var output = '';
            pyshell.stdout.on('data', function (data) {
                output += ''+data;
                
                console.log('output: ' + output);
                console.log('data: ' + data);
            });
            pyshell.send({ a: 'b' }).send(null).send([1, 2, 3]).end(function (err) {
                if (err) return done(err);
                output.should.be.exactly('{"a": "b"}\nnull\n[1, 2, 3]\n');
                done();
            });
        });

        
    });




    describe('.printMessage', function () {

        it('print text from python', function(done) {

             var pyshell = new PythonShell('print_text.py', {
                 mode: 'text'
             });

            pyshell.on('message', function (message) {

                    console.log('message: ' + message);
             
                }).on('close', function () {
                    console.log('closed...');
                }).end(done);
            });

    });


});