
Attempt to put together the source and explanation to build minimalist home automation.

Minimalist:
* avoid complex monolithic framework used here and there on the web
* client(s)/server(s) plugs together using *ANY* progamming language
* simple arduino sketches for sensors
* simple datastore (any or multiple)

Material
========

Hardware used for sensors/actors:
* Arduino with radio enabled (JeeNode compatible): 15+ low cost sensors
* CurrentCost: Main + 6 plugs
* RFXtrx433: Weather Station, Window motor openers, Alarm monitoring
* Sainsmart relay board: 16 relays
* Fanless low-consumption servers (Cubieboard v2 or multi-purpose Core i3 with SSD)
* few cheap components (for téléinfo)

![Overview](/res/Schema.jpg?raw=true "Hardware overview")

Schematic
=========

![Architecture](/res/Architecture.png?raw=true "Architecture overview")

How-To
======

* intall pre-requisites

```js
$ sudo apt-get install python-software-properties
$ sudo add-apt-repository ppa:chris-lea/node.js
$ sudo apt-get update && sudo apt-get upgrade
$ sudo apt-get install build-essential couchdb nodejs mosquitto
```

* run mosquitto (port 1884)
```js
$ /etc/init.d/mosquitto start
```

* run central server
```js
TBD
```