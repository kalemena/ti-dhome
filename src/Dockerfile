FROM ubuntu:14.04

RUN \
        apt-get update; apt-get upgrade -y; \
        apt-get install -y nodejs npm \
		mosquitto \
                git-core \
                python-software-properties python \
                g++ make software-properties-common \
                wget unzip; \
        ln -s /usr/bin/nodejs /usr/bin/node; \
        npm install -g grunt-cli; \
        cd /home; \
        git clone https://github.com/node-red/node-red.git; \
        cd node-red; \
        npm install; \
        grunt build;

WORKDIR /home/node-red

ADD run.sh /run.sh

RUN \
	chmod 777 /run.sh; \
        npm install node-red-contrib-rfxcom; \
        npm install node-red-node-openweathermap; 
        
EXPOSE 1880 1883

CMD ["/run.sh"]
