
The Current Cost allows to monitor main power home usage live and historical.

Every 2 hours, historical reports can be submittend to home computer using USB adapter.

Additional plugable sensor can be used to monitor more devices.

Schema
======

![Schema](res/Schema.jpg?raw=true "Schema overview")

How-To
======

* Connect to USB and find which usb resource connected

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

* Edit script to point to USB devices

* Run script from script folder (once mosquitto bus running on port 1884)

```js
$ npm install serialport
$ npm install eyes
$ npm install xml2js
$ npm install mqtt
$ node pub-current-cost.js
```
