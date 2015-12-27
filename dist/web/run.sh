#!/bin/bash

cd /home/node-red
mosquitto&
nodejs red.js
