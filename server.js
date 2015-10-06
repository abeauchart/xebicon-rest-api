var fs = require('fs');
var url = require('url');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var defaultCharset = 'utf8';

app.set('port', process.env.PORT || 8989);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));


/* JapScan */
app.get('/conferences', function(req, res){
    returnHtmlFile('conferences', res);
});

app.get('/conferences/19/schedule', function(req, res){
    returnHtmlFile('schedule', res);
});

app.get('/conferences/19/speakers', function(req, res){
    returnHtmlFile('speakers', res);
});


function returnHtmlFile(fileName, res) {
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