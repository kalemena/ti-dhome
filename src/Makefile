
############################
# Prepare for 1st time usage
############################
init: init-images init-influxdb init-telegraf init-grafana init-nodered

init-images:
	docker-compose pull
	docker-compose build

init-influxdb:
	mkdir -p var/lib/influxdb/meta
	mkdir -p etc/influxdb
	docker run --rm influxdb influxd config | tee etc/influxdb/influxdb.conf > /dev/null
	touch var/lib/.influx_history

	docker run --rm \
		--user 1000:1000 \
		-e INFLUXDB_HTTP_AUTH_ENABLED=true \
        -e INFLUXDB_ADMIN_USER=default \
        -e INFLUXDB_ADMIN_PASSWORD=password \
        -v $(CURDIR)/var/lib/influxdb:/var/lib/influxdb \
        -v $(CURDIR)/etc/influxdb/scripts:/docker-entrypoint-initdb.d \
        influxdb /init-influxdb.sh

init-telegraf:
	mkdir -p etc/telegraf
	docker run --rm telegraf telegraf config | tee etc/telegraf/telegraf.conf > /dev/null

init-grafana:
	mkdir -p var/lib/grafana
	mkdir -p var/log/grafana

init-nodered:
	mkdir -p var/log/node-red

############################
# Manages life cycle
############################
start: 
	docker-compose up -d

stop:
	docker-compose stop

down:
	docker-compose down

clean:
	docker-compose down --volumes