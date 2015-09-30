
These are work in progress...

At this point, automation is handled using custom nodejs application listening on MQTT event and acting on cubieboard REST API to trigger relays.

Idea is to leverage [Node RED](http://nodered.org)
...


Installation
============

```js
$ docker build -t node-red .
$ docker run -d -p 1880:1880 -p 1883:1883 \
  --device=/dev/ttyUSB0:/dev/ttyRfxTrx \
  --device=/dev/ttyUSB1:/dev/ttyJeeLink \
  --device=/dev/ttyUSB2:/dev/ttyCurrentCost \
  node-red
```

Used node-red nodes
===================

* http://flows.nodered.org/node/node-red-contrib-rfxcom
* Jeenodes: https://www.ibm.com/developerworks/community/blogs/B-Fool/entry/home_automation_with_node_red_jeenodes_and_the_oen_energy_monitor_project?lang=en
* http://flows.nodered.org/node/node-red-node-openweathermap