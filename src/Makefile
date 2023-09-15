##########################
# Initialize Environment
##########################

init: init-env init-config init-images init-telegraf init-grafana

init-env:
	echo "Initialize: Folders ..."
	cp .env-example src/.env

init-config:
	echo "Initialize: Configuration Defaults ..."
	cp etc/tidhome/ti-dhome.yaml.example etc/tidhome/ti-dhome.yaml

init-images:
	echo "Initialize: Pull Images ..."
	docker-compose pull

init-defaults:
	echo "Initialize: Get default config for influxdb, grafana, etc ..."
	mkdir -p etc/influxdb
	docker run --rm influxdb:1.8.6 influxd config | tee etc/influxdb/influxdb-default.conf > /dev/null

	mkdir -p etc/influxdb2
	docker run --rm influxdb:2.0.7 influxd print-config > etc/influxdb2/config-default.yml

	mkdir -p etc/telegraf
	docker run --rm telegraf telegraf config | tee etc/telegraf/telegraf-default.conf > /dev/null

init-influxdb: init-defaults
	echo "Initialize: Setup InfluxDB ..."
	# For information only
	mkdir -p etc/influxdb
	cp -n etc/influxdb/influxdb-default.conf etc/influxdb/influxdb.conf
	# Volumes
	# mkdir -p var/lib/influxdb
	# touch var/lib/.influx_history
	# Initialize DB (done through first run)
	docker-compose up -d influxdb
	sleep 10s
	docker-compose down
	# docker run --rm \
	# 	--user 1000:1000 \
	# 	-e INFLUXDB_HTTP_AUTH_ENABLED=true \
    #     -e INFLUXDB_ADMIN_USER=default \
    #     -e INFLUXDB_ADMIN_PASSWORD=password \
    #     -v $(CURDIR)/var/lib/influxdb:/var/lib/influxdb \
    #     -v $(CURDIR)/etc/influxdb/scripts:/docker-entrypoint-initdb.d \
    #     influxdb /init-influxdb.sh

init-telegraf: init-defaults
	echo "Initialize: Setup Telegraf ..."
	# For information only
	mkdir -p etc/telegraf
	cp -n etc/telegraf/telegraf-default.conf etc/telegraf/telegraf.conf

init-grafana: init-defaults
	echo "Initialize: Setup Grafana ..."
	# mkdir -p var/lib/grafana
	# mkdir -p var/log/grafana
