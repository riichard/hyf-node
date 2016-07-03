var express = require('express');
var app = express();
var fs = require('fs');
var async = require('async');

var mongojs = require('mongojs');

var bodyParser = require('body-parser');

// connect using SCRAM-SHA-1 mechanism
var db = mongojs('richard2:hahahaha@ds011664.mlab.com:11664/hackyourfuture?authMechanism=SCRAM-SHA-1', ['players']);

app.use(bodyParser.json());

// Link the frontend dir to the server
app.use(express.static('frontend'));
app.use(express.static('static'));

app.get('/data/news.json', function(req, res) {
    db.articles.find(
        {  },
        function(err, articles) {
        res.json( articles );
    });
});

app.get('/data/categories.json', function(req, res) {
    db.categories.find( function(err, categories) {
        res.json( categories );
    });
});

app.get('/players.json', function(req, res) {
    db.players.find( function(err, players) {

        console.log('Players: ', players);

        res.send( JSON.stringify(players) );
    });
});

// Store ALL the todos
app.post('/todos.json', function(req, res) {
    console.log('writing todos.json');
    console.log('request body', req.body);

    // Turn req.body into a string
    var jsonBody = JSON.stringify(req.body, null, '    ');

    console.log('HELLO A');

    var todos = req.body;

    db.todos.insert(todos, function(err) {
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
    console.log('req.body: ', req.body);
    console.log('Hi');

    var newTodo = req.body;

    // read todos.json
    fs.readFile('todos.json', 'utf8', function(err, data){

        // convert todos.json string to an object
        var todos = JSON.parse(data);

        // push new todo into that object
        todos.push(newTodo);

        // convert it again to a string
        var todosJson = JSON.stringify(todos);

        // write the file back to todos.json
        fs.writeFile('todos.json', todosJson, 'utf8', function(err) {

            // Done writing the file
            console.log('done writing the file');
            res.send(todosJson);
        });
    });
});

// Deleting a SINGLE todo
app.delete('/todos.json', function(req, res) {
    console.log('req.body: ', req.body);
    console.log('Hi');

    var deleteTodo = req.body;

    // read todos.json
    fs.readFile('todos.json', 'utf8', function(err, data){

        // convert todos.json string to an object
        var todos = JSON.parse(data);

        // Todo should be removed here
        var newTodos = [];
        for(var i =0; i < todos.length; i++) {
            var todo = todos[i];
            if(todo.text !== deleteTodo.text) {
                newTodos.push(todo);
            }
        }

        // convert it again to a string
        var todosJson = JSON.stringify(newTodos);

        // write the file back to todos.json
        fs.writeFile('todos.json', todosJson, 'utf8', function(err) {

            // Done writing the file
            console.log('done writing the file');
            res.send(todosJson);
        });
    });
});

app.get('/profile.json', function(req, res) {

    var username = 'richard';

    async.parallel({
        // Get the about information from the database
        about: function(done) {
            db.about.find({ name: username }, done);
        },

        // Get the posts from the database
        posts: function(done) {
            db.posts.find({ name: username }, done);
        },

        // Get the friends from the database
        friends: function(done) {
            db.friends.find({ name: username }, done);
        },

        // Get the photos from the database
        photos: function(done) {
            db.photos.find({ name: username }, done);
        },

        food: function(done) {
            done( 'its ramadan');
        }
    },

    function(err, data) {
        console.log('error: ', err);
        console.log('data: ', data);
        // Send back the response to the browser
        res.json(data);
    });
});


var port = 3004;
app.listen(port, function() {
    console.log('Example app listening on port '+port);
});
