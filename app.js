var express = require('express');
var app = express();
var fs = require('fs');

var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', function(req, res) {
    console.log(req.query);
    res.send('Hello ' + req.param('name', 'world'));
});

app.post('/todos.json', function(req, res) {
    console.log('writing todos.json');

    var jsonBody = JSON.stringify(req.body, null, '    ');

    console.log('HELLO A');

    fs.writeFile('todos.json', jsonBody, function(err) {
        console.log('HELLO B');
        if (err) {
            res.send(JSON.stringify({
                success: false
            }));
        } else {
            res.send(JSON.stringify({
                success: true
            }));
        }
    });
    console.log('HELLO C');
});

app.get('/todos.json', function(req, res) {
    console.log('getting todos.json');

    fs.readFile('todos.json', 'utf8', function(err, todos) {
        res.send(todos);
    });
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
