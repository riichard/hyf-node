var express = require('express');
var app = express();
var fs = require('fs');

var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', function(req, res) {
    console.log(req.query);
    res.send('Hello ' + req.param('name', 'world'));
});

// Store ALL the todos
app.post('/todos.json', function(req, res) {
    console.log('writing todos.json');
    console.log('request body', req.body);

    // Turn req.body into a string
    var jsonBody = JSON.stringify(req.body, null, '    ');

    console.log('HELLO A');

    // write that string to todos.json
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


// Getting ALL todos
app.get('/todos.json', function(req, res) {
    console.log('getting todos.json');

    fs.readFile('todos.json', 'utf8', function(err, todos) {
        res.send(todos);
    });
});


// Saving a SINGLE todo
app.put('/todos.json', function(req, res) {
    var todo = req.body;
    console.log(req.body);

    // read todos
    fs.readFile('todos.json', 'utf8', function(err, todosJson) {
        // Convert todos.json to an object
        var todos = JSON.parse(todosJson);

        // push todo to todos array
        todos.push(todo);

        // Convert todos back to JSON string
        var todosJson = JSON.stringify(todos);

        // write todos to todos.json
        fs.writeFile('todos.json', todosJson, function() {

            // Send back the changed todos to the user
            res.send(todos);
        });
    });
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
