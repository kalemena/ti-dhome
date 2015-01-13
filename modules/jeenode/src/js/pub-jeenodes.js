#!/usr/bin/env node

var com = require("serialport"),
    mqtt = require('mqtt');

var client = mqtt.createClient('1883', 'localhost');
var serialPort = new com.SerialPort("/dev/ttyUSB1", {
    baudrate: 57600,
    parser: com.parsers.readline('\r\n')
  });

client.on('connect', function() {
  console.log('connected for publications...');
});

serialPort.on('open',function() {
  console.log('serial port open...');
});

serialPort.on('data', function(data) {

  var s = data.split(' ');
  if(s[0] == 'ROOM') {
    // console.log('DATA: ' + data);
    var type = '';
    var value = s[4];
    if(s[3] == 0) {
      type = 'temperature';
      value = s[4].substring(0, s[4].length - 1) + '.' + s[4].substring(s[4].length - 1);
    } else if(s[3] == 1) {
      type = 'humidity';
      value = s[4].substring(0, s[4].length - 1) + '.' + s[4].substring(s[4].length - 1);
    } else if(s[3] == 2) {
      type = 'pressure';
      value = s[4].substring(0, s[4].length - 1) + '.' + s[4].substring(s[4].length - 1);
    } else if(s[3] == 3) {
      type = 'light';
    } else if(s[3] == 4 && value != 0) {
      type = 'battery';
    }

    var now = new Date();
    if(type != '') {
      console.log(now.toISOString() + ' sensors/' + ("00000" + s[1]).slice (-5) + '/entries/' + s[2] + '/events/' + type + ' = ' + value);
      client.publish('sensors/' + ("00000" + s[1]).slice (-5) + '/entries/' + s[2] + '/events/' + type, value);
    } else {
      console.log(now.toISOString() + ' UNKNOWN: ' + data);
    }
  }
});

// client.end();
