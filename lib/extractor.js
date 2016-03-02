var request = require('request')
  , cheerio = require('cheerio');

var Extractor = function(config) {

  this.getPage = function(page, callback) {
    request(page, function (error, response, body) {
      var data = body.split("new Listview({template: 'holiday'")[1];
      data = data.split('});')[0]
      data = data.split('data: ')[1]
      if(callback) callback(JSON.parse(data))
    })
  }

  this.extractEventsData = function(callback) {
    this.getPage(config.source, function(data) {
      var events = [];
      data.forEach(function(item) {

        item.dates.forEach(function(date) {
          if(date == '') return;
          var evt = {
            name: item.name,
            id: item.id
          };

          evt.start = new Date(date);
          var duration = (typeof item.duration1 != 'undefined') ? item.duration1 : item.duration0;
          evt.end = new Date(new Date(date).getTime() + (duration * 60 * 60 * 1000))
          events.push(evt);

        });

      })

      if(callback) callback(events);

    });
  }

  this.getEvents = function(cb) {
    this.extractEventsData(cb);
  }

};

module.exports = function(config) {
  return new Extractor(config);
}
