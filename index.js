var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var config = require('./config.json');
var extractor = require('./lib/extractor.js')(config);
var ical = require('ical-generator');

var cal = ical({
  domain: 'wowarmory.com',
  name: 'Wow Events Calendar',
  timezone: 'America/Recife'
});

app.set('view engine', 'ejs');

app.get('/', function (req, res) {

  extractor.getEvents(function(events) {

    res.header('Content-type', 'text/calendar');
    res.header('Content-Disposition', 'inline');

    events.forEach(function(event) {
      cal.createEvent({
      	start: new Date(event.start),
      	end: new Date(event.end),
      	summary: event.name,
      	uid: event.id
      });
    });

    res.send(cal.toString());
  })

});

app.listen(port, function () {
  console.log('Wow events listening on port '+port);
});
