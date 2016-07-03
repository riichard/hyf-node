var async = require('async');

var messagebird = require('messagebird')('test_hUIMlHJdaiAxbfwqrZg');
var messagebirdLive = require('messagebird')('live_v38Qs4BfpOtei8MNkwMNWM58e')

messagebirdLive.messages.create({
    originator: '+12023580001',
    body: 'Earth is going down! Long live nibiru',
    recipients:['+31614757004']
}, function(err, data){
    console.log(err, data);
});

