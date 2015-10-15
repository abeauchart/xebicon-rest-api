var fs = require('fs');
var url = require('url');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require('lodash');
var defaultCharset = 'utf8';

app.set('port', process.env.PORT || 8989);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));


/* JapScan */
app.get('/conferences', function(req, res){
    returnJsonFile('conferences', res);
});

app.get('/conferences/19/schedule', function(req, res){
    returnJsonFile('schedule', res);
});

app.get('/conferences/19/speakers', function(req, res){
    returnJsonFile('speakers', res);
});

app.get('/conferences/19/tracks', function(req, res){
    fs.readFile('data/schedule.json', defaultCharset, function (err, data) {
        if (err) {
            res.status(500);
        }

        tracks = _.map(_.filter(JSON.parse(data), function(talk){
            return talk.kind === "keynote" || talk.kind === "talk" ;
        }), function (talk) {
                return {
                    'name': talk.track,
                    'description':"",
                    'conferenceId':18,
                    'descriptionPlainText':""
                }
            })

        res.type('application/json; charset=' + defaultCharset);
        res.status(200).send(_.uniq(tracks, function(obj){
            return obj.name;
        }));
    });
});


function returnJsonFile(fileName, res) {
    res.type('application/json; charset=' + defaultCharset);
    fs.readFile('data/' + fileName + '.json', defaultCharset, function (err, data) {
        if (err) {
            res.status(500);
        }
        res.status(200).send(data);
    });
}

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});