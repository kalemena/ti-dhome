
Attempt to put together the source and explanation to build minimalist home automation.

Minimalist:
* avoid complex framework used here and there on the web
* client(s)/server(s) javascript 
* arduino sketches
* simple datastore

Schematic
=========

![Architecture](/res/Architecture.png?raw=true "Architecture overview")

Material
========

Hardware used for sensors/actors:
* CurrentCost: Main + 6 plugs
* RFXtrx433: Weather Station, and soon alarm monitoring
* Arduino with radio enabled (JeeNode compatible): 15+ low cost sensors
* Sainsmart relay board: 16 relays
* Fanless low-consumption servers (Cubieboard v2 or multi-purpose Core i3 with SSD)

![Overview](/res/Schema.jpg?raw=true "Hardware overview")