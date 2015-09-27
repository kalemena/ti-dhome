FROM ubuntu:14.04

RUN \
	add-apt-repository ppa:chris-lea/node.js -y; \
	apt-get update; apt-get upgrade -y; \
	apt-get install -y nodejs npm git-core python-software-properties python g++ make software-properties-common wget unzip;

#RUN	ln -s /usr/bin/nodejs /usr/bin/node; \
#	npm install -g grunt-cli; \
#	cd /home; \
#	git clone https://github.com/node-red/node-red.git; \
#	cd node-red; \
#	npm install; # --production; \
#	grunt build;

EXPOSE 1880

CMD ["nodejs", "red.js"]
