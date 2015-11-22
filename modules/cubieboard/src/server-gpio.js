var express = require('express'),
    app = express(),
    gpio = require("gpio");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
    
var argv = process.argv;
for (var i = 2; i <= 2; i++) {
  if(!argv[i]) process.exit(-1);
}

var port = argv[2];
    
var intervalTimer;
var items = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ];
var gpios = [];

// catch-all
process.on('uncaughtException', function(err) {
    // handle the error safely
    console.log(err);
});

function responseBody(body,res) {
  res.charset = 'utf-8';
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Length', body.length);
  res.end(body);
}

// GET /gpios/:id/set = switch gpio
app.get('/gpios/:id/set', function(req, res){
  gpio = gpios[req.params.id]

  var ts = new Date();
  var ts_str = ts.toISOString().replace(/\..+/, 'Z');
  if(gpio.value == 0 && req.query.value == 0 || gpio.value == 1 && req.query.value == 1)
  {
    console.log(ts_str + 'no switch : ' + req.params.id + ' = ' + gpio.value + ' - params: ' + req.query.value);
    responseBody(JSON.stringify( { switch: req.params.id, value: gpio.value } ),res);
  }
  else
  {
    gpio.set(req.query.value == undefined ? gpio.value - 1 : req.query.value == 0 ? 0 : 1, function() {
      console.log(ts_str + '   switch : ' + req.params.id + ' = ' + gpio.value + ' - params: ' + req.query.value);
      responseBody(JSON.stringify( { switch: req.params.id, value: gpio.value } ),res);
    });
  }
});

// GET /gpios/status
app.get('/gpios/status', function(req, res) {
  var body = [];
  items.forEach(function(item) {
    gpio = gpios[item];
    body.push( { switch: item, value: gpio.value } );
  });
  responseBody(JSON.stringify( body ),res);
});

// Initialize
function async(i, callback) {
  console.log('prepare : ' + i);
  callback(gpio.export(i, {
   ready: function() {
      console.log('ready : ' + i);
   }
  }));
}
function final() {
  console.log('Done', '');
}
items.forEach(function(item) {
  async(item, function(result) {
    gpios.push(result);
    if(gpios.length == items.length) {
      final();
    }
  })
});

app.listen(process.env.PORT || port);
console.log('Listening on port ' + port);
