var async = require('async');

var fruits = [
    'apple',
    'banana',
    'pear'
];
async.each(fruits, eatFruit, function(err) {
    console.log('Error: ', err);
});

function eatFruit(fruit, done) {
    console.log('Eating fruit '+ fruit);
    if(fruit === 'apple') { 
        done('I dont like apple');
        return;
    }
    setTimeout(function() {
        console.log('Done eating '+fruit);
        done();
    }, 3000);
    console.log('omnomnom... ');
}