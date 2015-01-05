
This is a simple web service in nodejs to monitor and act on SainSmart relay board (12v 16x relay).

Purpose of relay board is to act on room electric heaters using "pilot" wire.

Schematic
=========

![Architecture](modules/cubieboard/Schema.png?raw=true "Architecture overview")

API
===

* GET /status
Returns list of relay with states.

* POST /relays/X?state=Y
Sets relay On/Off
X is relay id
Y is state to change to. 0 = Off, 1 = On






