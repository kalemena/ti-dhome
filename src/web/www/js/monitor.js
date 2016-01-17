
function parseISO8601(str) {
    // we assume str is a UTC date ending in ‘Z’
    var parts = str.split('T'),
    dateParts = parts[0].split('-'),
    timeParts = parts[1].split('Z'),
    timeSubParts = timeParts[0].split(':'),
    timeSecParts = timeSubParts[2].split('.'),
    timeHours = Number(timeSubParts[0]),
    _date = new Date();
    
    _date.setUTCFullYear(Number(dateParts[0]));
    _date.setUTCDate(1);
    _date.setUTCMonth(Number(dateParts[1])-1);
    _date.setUTCDate(Number(dateParts[2]));
    _date.setUTCHours(Number(timeHours));
    _date.setUTCMinutes(Number(timeSubParts[1]));
    _date.setUTCSeconds(Number(timeSecParts[0]));
    if (timeSecParts[1]) _date.setUTCMilliseconds(Number(timeSecParts[1]));
    return _date;
}

function tempColor(temperature, min, max) {
  var value = ((temperature - min) / (max - min));
  var aR = 0;   var aG = 0; var aB=255;  // RGB for our 1st color (blue in this case).
  var bR = 255; var bG = 0; var bB=0;    // RGB for our 2nd color (red in this case).
 
  var red   = parseInt((bR - aR) * value + aR);      // Evaluated as -255*value + 255.
  var green = parseInt((bG - aG) * value + aG);      // Evaluates as 0.
  var blue  = parseInt((bB - aB) * value + aB);      // Evaluates as 255*value + 0.
 
  //var blueVal = Math.round(Math.min((255.0*2.0)*((temperature-lVal)/(hVal-lVal-1)), 255));
  //var redVal = Math.round(Math.min((255.0*2.0)*((hVal-lVal-1-temperature)/(hVal-lVal-1))));
  return red + ","+green+"," + blue + "";
}

var heaters  = {};
var measures  = {};

google.load("visualization", "1", {packages:["gauge"]});
google.setOnLoadCallback(initialize);

var gaugeOptionsUnits = {width:750, height:250, redFrom: 1500, redTo: 2500, yellowFrom:500, max:2500 , greenFrom: 0, greenTo: 500, yellowTo: 1500, minorTicks: 10};
var gaugeUnits;
var gaugeDataUnits;
var gaugeTotal;
var gaugeDataTotal;
var gaugeOptionsTotal = {height:200, redFrom: 5000, redTo: 9000, yellowFrom:1800, max:9000 , greenFrom: 0, greenTo: 1800, yellowTo: 5000, minorTicks: 100};
      
function initialize() {

  var gaugeDataUnits = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['Bureau', 0],
    ['Lave-VSL', 0],
    ['Lave-Linge', 0],
    ['Aquarium', 0],
    ['TV', 0],
    ['Frigo', 0],
    ['Noel', 0],
    ['NA', 0],
    ['NA', 0]
  ]);

  gaugeUnits = new google.visualization.Gauge(document.getElementById('gaugeUnits_div'));
  gaugeUnits.draw(gaugeDataUnits, gaugeOptionsUnits);

  // Options for TOTAL
  gaugeDataTotal = new google.visualization.DataTable();
  gaugeDataTotal.addColumn('number', 'Total (W)');
  gaugeDataTotal.addRows(1);
  gaugeDataTotal.setCell(0, 0, 0);
  gaugeTotal = new google.visualization.Gauge(document.getElementById('gaugeTotal_div'));
  gaugeTotal.draw(gaugeDataTotal, gaugeOptionsTotal);        
  
  setInterval(function () { 
  
	$.ajax({
	  type: "GET",
	  url: "http://192.168.1.46:1880/power",
	  dataType: "json",
	  headers: {          
	    "Accept" : "application/json; charset=utf-8"
	  },
	  success: function(data,status) {
	    // var now = new Date();		  
	    $.each(data, function(i, item) {
	      if(item.value !== undefined) {		      
		var power = parseInt(item.value)
		// var timestamp = (item.timestamp != undefined ? parseISO8601(item.timestamp) : new Date(0));
		if(item.name === 'Global') {
		  gaugeDataTotal.setValue(0, 0, power);
		  gaugeTotal.draw(gaugeDataTotal, gaugeOptionsTotal);
		} else {
		  var splitted = item.id.split('/');
		  var col = splitted[3];
		  gaugeDataUnits.setValue(col-1, 1, power);
		  gaugeUnits.draw(gaugeDataUnits, gaugeOptionsUnits);
		}
	      }
	    });
	  },
	  error: function(status,error) {
	    //todo: update, just for debugging now
	    alert("Error: " + JSON.stringify(error) + "\nStatus: " + JSON.stringify(status));
	  },
	});
	
  }, 5 * 1000); 

}

function refreshPlan() {
  
  $.ajax({
    type: "GET",
    url: "http://192.168.1.46:1880/status",
    dataType: "json",
    headers: {          
      "Accept" : "application/json; charset=utf-8"
    },
    success: function(data,status) {
      var heaters_rows = '';
      var measures_rows = '';
      measures = data;
      var now = new Date();
      
      // min/max
      var minT = 20;
      var maxT = 20;
      var minR = 20;
      var maxR = 20;
      $.each(data, function(i, item){
	if(item.value != undefined && item.id.indexOf("temp") > -1) {
	  minT = (minT < item.value) ? minT : item.value;
	  maxT = (maxT > item.value) ? maxT : item.value;
	  if(item.heater != undefined) {
	    minR = (minR < item.value) ? minR : item.value;
	    maxR = (maxR > item.value) ? maxR : item.value;
	  }
	} 
      });
      
      $.each(data, function(i, item){
	var timestamp = (item.timestamp != undefined ? parseISO8601(item.timestamp) : new Date(0));
	// 20min late = batteries dead? 
        var isOld = ((timestamp.getTime() + 1000*60*20) < now.getTime())
	var classTS = (isOld ? "class=red" : "class=green")
	if(item.actor != undefined) {
	  if($('#switch_' + item.actor).length) { // SVG contains this sensor
	    var svg = $('#switch_' + item.actor);
	    if(item.heater == 0) { svg.css('fill','rgb(255,127,0)'); } 
	    else { svg.css('fill','rgb(0,0,255)'); }
	  }
	}
	var classHeater = (item.heater === 0 ? "class=red" : "class=blue")
	if(item.heater != undefined)
	  heaters_rows += "<tr class=heater><td>" + item.name + "</td><td " +classHeater+ ">" + (item.heater === 0 ? "ON" : "OFF") + "</td>" + renderValue(item.id, item.value, minR, maxR) + "<td " + classTS + ">" + (timestamp != undefined ? timestamp.toLocaleString() : "NA") + "</td></tr>";
	measures_rows += "<tr class=measure><td>" + item.name + "</td>" + renderValue(item.id, item.value, minT, maxT) + "<td " + classTS + ">" + (timestamp != undefined ? timestamp.toLocaleString() : "NA") + "</td></tr>";
      });
      $("#heaters > tbody").children().remove();
      $('#heaters > tbody').append(heaters_rows);
      $("#measures > tbody").children().remove();
      $('#measures > tbody').append(measures_rows);
    },
    error: function(status,error) {
      //todo: update, just for debugging now
      alert("Error: " + JSON.stringify(error) + "\nStatus: " + JSON.stringify(status));
    },
  });
  
  $.each(measures, function(key, room) {    
    var keySVG = room.id.replace(/\//g,'_');
    if($('#' + keySVG).length) { // SVG contains this sensor
      var svgText = $('#' + keySVG);
      svgText.text(renderText(room.id, room.value));
    }
    else
    {
      console.log(keySVG + '--- NOT found');
    }
  });
  
  // setTimeout(tiDhome(), 5000);
  setTimeout(function () { 
    refreshPlan();
  }, 5 * 1000);
}

function renderValue(sensorKey, sensorValue, min, max) {
  var splitted = sensorKey.split('/');
  var value = 'N/A';
  if(sensorValue != undefined) {
    if(splitted[5] != 'rain') value = sensorValue;
    else value = JSON.parse(sensorValue).rainrate;
  }
  if(splitted[5] == 'temperature')   { value += ' \u00B0C'; }
  else if(splitted[5] == 'humidity') { value += ' %'; }
  else if(splitted[5] == 'light')    { value += ' L'; }
  else if(splitted[5] == 'pressure') { value += ' hPa'; }
  else if(splitted[5] == 'rain')     { value += ' mm/h'; }
  
  //console.log(sensorKey + '===' + value);
  if(splitted[5] == 'temperature') 
    return "<td style=\"background-color: rgb(" + tempColor(sensorValue, min, max) + ")\">" + value + "</td>";
  return "<td>" + value + "</td>";
}

function renderText(sensorKey, sensorValue) {
  var splitted = sensorKey.split('/');
  var value = 'N/A';
  if(sensorValue != undefined) {
    if(splitted[5] != 'rain') value = sensorValue;
    else value = JSON.parse(sensorValue).rainrate;
  }
  if(splitted[5] == 'temperature')   { value += ' \u00B0C'; }
  else if(splitted[5] == 'humidity') { value += ' %'; }
  else if(splitted[5] == 'light')    { value += ' L'; }
  else if(splitted[5] == 'pressure') { value += ' hPa'; }
  else if(splitted[5] == 'rain')     { value += ' mm/h'; }
  
  return value;
}


function prepareSwitch(switchName, uri) {
  $(switchName).click( function(e) {
    $.getJSON(uri, function() { });
    setTimeout(refreshPlan, 5*1000);
  });
}

function tiDhome() {
    
  $('#svg_rdc').svg({});
  var svg = $('#svg_rdc').svg('get');
  svg.load('images/maison_rdc.svg', { 
    addTo: false, 
    changeSize: true, 
    onLoad: function() { 
      $('#switch_6').click( function(e) {
        $.getJSON('switches/gpios/6/set', function() {});
      });
      $('#switch_7').click( function(e) {
        $.getJSON('switches/gpios/7/set', function() {});
      });
      $('#switch_14').click( function(e) {
        $.getJSON('switches/gpios/14/set', function() {});
      });
      $('#switch_15').click( function(e) {
        $.getJSON('switches/gpios/15/set', function() {});
      });
    } 
  });
  
  $('#svg_1er').svg({});
  var svg = $('#svg_1er').svg('get');
  svg.load('images/maison_1er.svg', { 
    addTo: false, 
    changeSize: true, 
    onLoad: function() {
      $('#switch_0').click( function(e) {
        $.getJSON('switches/gpios/0/set', function() { });
      });
      $('#switch_1').click( function(e) {
        $.getJSON('switches/gpios/1/set', function() { });
      });
      $('#switch_2').click( function(e) {
        $.getJSON('switches/gpios/2/set', function() { });
      });
      $('#switch_3').click( function(e) {
        $.getJSON('switches/gpios/3/set', function() { });
      });
      $('#switch_4').click( function(e) {
        $.getJSON('switches/gpios/4/set', function() { });
      });
      $('#switch_5').click( function(e) {
        $.getJSON('switches/gpios/5/set', function() { });
      });
    }  
  });
  
  refreshPlan();
}
