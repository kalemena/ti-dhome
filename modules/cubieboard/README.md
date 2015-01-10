
Simple web service in nodejs to monitor and act on SainSmart relay board (12v 16x relay).

Purpose of relay board is to act on room electric heaters using "pilot" wire (low power 220v current).

Schematic
=========

![Schematic](modules/cubieboard/Schema.png?raw=true "Schema overview")

Wiring
======

Because input relay board take 5v, 2 ULN2803 were used to pull up from 3.3v gpios.

No extraordinary wiring:
- shareground between Cubieboard gpios, ULN2803 and Relay board
- each gpio pin to input of ULN2803
- each ULN2803 5v pin to input of relay board
- Vcc 5v from relay board to Vcc ULN2803

Library
=======

Raspbery cloned GpiO library used with minor change to match Cubian resources.

See [kalemena/GpiO](https://github.com/kalemena/GpiO)

API
===

* GET /gpios/status
Returns list of relay with states.

e.g.
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

* GET /gpios/:id/set?value=Y
Sets or Switch relay On/Off
X is relay id
optional Y is value to change to. 0 = Off, 1 = On

e.g. response
{"switch":"13","value":1}




