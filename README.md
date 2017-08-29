
Home automation from scratch for the dummies!

A home server can be put in place to monitor and act on various environment sensors.
Initially, this all started with idea that each room can be tracked in temperature, then heaters can be switched on/off based on sensor metrics.


This repository is an attempt to put together the source and explanation to build minimalist home automation.

Minimalist approach:
* avoid complex monolithic framework used here and there on automation
* client(s)/server(s) plugs together using *ANY* progamming language by leveraging message queues (MQTT)
* simple arduino sketches for sensors
* simple datastore (any or multiple)
* deploys as much as possible with automation using [Docker](https://www.docker.com/)

The samples in each module were build in full nodejs, however from now, the central service can be handled using the wonderful Node-red project.

# Material

Hardware used for sensors/actors:
* Arduino with radio enabled (JeeNode compatible): 15+ low cost sensors
* [CurrentCost EnviR](http://www.currentcost.com/product-envir.html): Main + 9 plugs
* [RFXtrx433](http://www.rfxcom.com/): Weather Station, Window motor openers, Alarm monitoring
* Sainsmart relay board: 16 relays
* Fanless low-consumption servers ([Cubieboard v2](http://cubieboard.org) or multi-purpose Core i3 with SSD)
* few cheap components (for téléinfo)

![Overview](/res/Schema.jpg?raw=true "Hardware overview")

# Schematic

![Architecture](/res/Architecture.png?raw=true "Architecture overview")

# How-To

## Setup each module

Everything can be setup at need.

* [Téléinfo](/modules/teleinfo)
* [Web Relays](/modules/cubieboard)
* [RfxTrx433](/modules/rfxtrx433)
* [CurrentCost](/modules/currentcost)
* [Sensors](https://github.com/kalemena/ti-dhome-sensors)
* Database is up to user. Using CouchDB, but this is not shared for now.


## Install software


Central service is fully contained into Docker container.
The service has an inner mosquitto and uses pre-build strategies to wire-up the few modules.
Idea is to leverage [Node RED](http://nodered.org)

* steps: 
 * install [Docker](https://www.docker.com/)
 * change the below command line to map your USB devices.
 * connect to http://localhost:1880, change the project flow based on need. 

```js
$ git clone https://github.com/kalemena/ti-dhome.git
$ cd ti-dhome/dist/flow
$ docker build -t kalemena/ti-dhome .
$ docker run --restart=always --name nodered --hostname nodered \
  -d -p 1880:1880 -p 1883:1883 \
  -v ./data:/root/.node-red \
  --device=/dev/ttyUSB2:/dev/ttyRfxTrx \
  --device=/dev/ttyUSB1:/dev/ttyJeeLink \
  --device=/dev/ttyUSB0:/dev/ttyCurrenCost node-red
```

### Used node-red nodes

* http://flows.nodered.org/node/node-red-contrib-rfxcom
* http://flows.nodered.org/node/node-red-node-openweathermap

### Project default flows

![Flows](/res/nodered-sensors-input.png?raw=true "Node-red flows")
