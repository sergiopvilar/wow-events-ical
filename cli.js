var config = require('./config.json');
var extractor = require('./lib/extractor.js')(config);

function fdate(date) {
  return new Date(date).toLocaleDateString();
}

extractor.getEvents(function(events) {
  events.forEach(function(event) {
    console.log(event.name+': '+fdate(event.start)+ ' - '+fdate(event.end));
  });
});
