
These are work in progress...

At this point, automation is handled using custom nodejs application listening on MQTT event and acting on cubieboard REST API to trigger relays.

Idea is to leverage [Node RED](http://nodered.org)
...


Installation
============

```js
$ sudo npm install -g node-red
$ node-red



$ cd $HOME/.node-red
// http://flows.nodered.org/node/node-red-contrib-rfxcom
$ npm install node-red-contrib-rfxcom

// JeeNodes
https://www.ibm.com/developerworks/community/blogs/B-Fool/entry/home_automation_with_node_red_jeenodes_and_the_oen_energy_monitor_project?lang=en

// http://flows.nodered.org/node/node-red-node-openweathermap
$ npm install node-red-node-openweathermap

```
