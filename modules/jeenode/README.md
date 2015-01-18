
This is custom Sensor unit handler used to capture plenty of metrics and send them over the air (868 Mhz) to central server.

The unit module was inspired from the great JeeLab Room node.

Sensors are placed in each room and are each monitoring few of below:
* Temparature (1 or more sensor per unit)
* Humidity
* Pressure
* Light
* Move
* TODO: plant humidity
* TODO: gaz
* TODO: pH-meter / CO2

Eventualy, the various measure will serve for:
* control electric heaters
* control VMC (home motorized air flow controler)
* alarms on various actions (plants, etc)

Hardware
========

Central board:
* JeeLink (full enclosure, see JeeLab web site)
or
* TBD: Arduino nano 3.3v + radio (RFM12B or RFM69CW)

Base board for sensors:
* JeeNode (arduino compatible + radio, see JeeLab web site)
or
* Arduino pro mini 3.3v or clone (cut power led, TBD: remove regulator?)
* RFM12B or RFM69CW module
* Batteries: 3xAA or 1xAA+3.3v step-up, or other

Sensors (1+ per board):
* Temparature: DS18B20 (waterproof or not: for some reason waterproof is cheaper!)
* Temparature + Humidity: SHT11 or DHT22 (bigger but with case, and cheaper!)
* Pressure: BMP85
* Light: standard LDR
* Move: TBD
* Plant humidity: TBD
* Gaz: TBD
* pH-meter / CO2: TBD

Actors:
* TBD: Sainsmart relay boards

Prototypes
==========

![Sample#1](res/20150104_211827-notes.JPG?raw=true "Sample #1")

![Sample#2](res/20150104_211916-notes.JPG?raw=true "Sample #2")



