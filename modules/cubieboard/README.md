
Simple web service in nodejs to monitor and act on SainSmart relay board (12v 16x relay).

Purpose of relay board is to act on room electric heaters using "pilot" wire (low power 220v current).

Schematic
=========

![Schematic](res/Schema.jpg?raw=true "Schema overview")

Wiring
======

## Prototype

![Prototype](res/prototype.jpg?raw=true "Prototype")

## Cubieboard to SainSmart

Because input relay board take 5v, 2 ULN2803 were used to pull up from 3.3v gpios.

No extraordinary wiring:
- share ground between Cubieboard gpios, ULN2803 and Relay board
- each gpio pin to input of ULN2803
- each ULN2803 5v pin to input of relay board
- Vcc 5v from relay board to Vcc ULN2803

## SainSmart to Electric Heaters

Only the pilote wire is plugged.

[Here](http://www.planete-domotique.com/blog/2012/01/05/piloter-un-radiateur-grace-a-son-fil-pilote/) is order table.
<img src="res/ordre_fil_pilote.jpg?raw=true" alt="Order table" style="width: 240px;"/>

Following the orders table, only no signal or total stop (alternate up signal) is pushed to heaters (1N4007 used):
- Relay COM: Pilote Heater wire (supposed to be black)
- Relay NC: None or "Délesteur"
- Relay NO: 1N4007 + 220v Phase (heater stop command)

Library
=======

Raspberry cloned GpiO library used with minor change to match Cubian resources.

See [kalemena/GpiO](https://github.com/kalemena/GpiO)

API
===

* GET /gpios/status
Returns list of relay with states.

e.g.
```js
[
  {"switch":0,"value":1},
  {"switch":1,"value":1},
  {"switch":2,"value":1},
  {"switch":3,"value":1},
  {"switch":4,"value":1},
  {"switch":5,"value":1},
  {"switch":6,"value":1},
  {"switch":7,"value":1},
  {"switch":8,"value":0},
  {"switch":9,"value":0},
  {"switch":10,"value":0},
  {"switch":11,"value":0},
  {"switch":12,"value":0},
  {"switch":13,"value":0},
  {"switch":14,"value":1},
  {"switch":15,"value":0}
]
```

* GET /gpios/:id/set?value=Y

Sets or Switch relay On/Off

X is relay id

optional Y is value to change to. 0 = Off, 1 = On

e.g. response
```js
{"switch":"13","value":1}
```

How-To
======

```js
$ sudo mkdir /opt/node
$ wget http://nodejs.org/dist/v0.10.2/node-v0.10.2-linux-arm-pi.tar.gz
$ tar xvzf node-v0.10.2-linux-arm-pi.tar.gz
$ sudo cp -r node-v0.10.2-linux-arm-pi/* /opt/node
$ nano /etc/profile

<<<
...
NODE_JS_HOME="/opt/node"
PATH="$PATH:$NODE_JS_HOME/bin"
export PATH
...
<<<

$ git clone https://github.com/kalemena/ti-dhome.git
$ cd ti-dhome/modules/cubieboard/src
$ npm install mqtt express
$ node server-gpio.js
```

Running as service (forever)

```js
$ sudo -i npm install -g forever
$ sudo mkdir /var/run/forever

$ sudo cp web-gpio /etc/init.d/web-gpio
$ sudo chmod a+x /etc/init.d/web-gpio
$ sudo update-rc.d web-gpio defaults

$ sudo -i service web-gpio start
$ sudo -i service web-gpio stop
```