var google = require('google');
var async = require('async');

var queries = [
    'earth',
    'richard kraaijenhagen',
    'hack your future'
];

async.map(queries, function(query, done) {
    console.log('Going to search for: '+query);
    google(query, done);
}, function(err, results) {
    console.log('results: ', results.map(result => result.links));
});