FROM ubuntu:14.04

RUN \
  apt-get update; apt-get upgrade -y; \
  apt-get install -y \
    nodejs npm \
    mosquitto \
    git-core \
    python-software-properties python \
    g++ make software-properties-common \
    wget unzip; \
  ln -s /usr/bin/nodejs /usr/bin/node; \
  npm install -g grunt-cli;
        
RUN \
  cd /home; \
  git clone https://github.com/node-red/node-red.git; \
  cd node-red; \
  npm install; \
  grunt build;

WORKDIR /home/node-red

RUN \
  npm install node-red-contrib-rfxcom; \
  npm install node-red-node-openweathermap; \
  npm install node-red-node-ping;
        
EXPOSE 1880 1883
ENV TZ=Europe/Paris

ADD run.sh /run.sh

CMD ["bash", "/run.sh"]
