
This is custom Sensor unit handler used to capture plenty of metrics and send them over the air (868 Mhz) to central server.

The unit module was inspired from the great JeeLab Room node.

Sensors are placed in each room and are each monitoring few of below metrics:
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



*CURRENTLY RUNNING FROM NODE-RED PROJECT FLOW*



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


![Parts](res/Arduino-parts.jpg?raw=true "Parts")


Prototypes
==========

![Sample#1](res/20150104_211827-notes.JPG?raw=true "Sample #1")

![Sample#2](res/20150104_211916-notes.JPG?raw=true "Sample #2")


How-To - central receiver node
==============================

* Open sketch from folder 'modules/jeenode/src/sketches/sensor_rx_unit/' into Arduino IDE

* Upload sketch to radio-enabled device (TBD)

* Connect receiver node to USB and find which usb resource connected

```js
$ lsusb
$ dmesg
```

* Allow user access to resource and set speed

```js
$ sudo stty -F /dev/ttyUSB0 57600
$ sudo chmod 777 /dev/ttyUSB0
$ cat /dev/ttyUSB0
```

* Edit test script to point to USB devices or point Node-Red to correct USB device.



How-To - remote sensor nodes
============================

* Open sketch from folder 'modules/jeenode/src/sketches/sensor_trx_unit/' into Arduino IDE

* Modify sketch to match sensor devices plugged onto the arduino (ensure pins are correct)

* Upload sketch to radio-enabled device (TBD)

* ... let it submit metrics over the air ...

Tests
=====

* Go to folder 'modules/jeenode/src/js/' and run below commands:


```js
$ npm install serialport
$ npm install mqtt
$ node pub-jeenodes.js
```

