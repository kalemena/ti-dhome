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
	echo "Initialize: Get default config for grafana, etc ..."
	mkdir -p etc/telegraf
	docker run --rm telegraf telegraf config | tee etc/telegraf/telegraf-default.conf > /dev/null

init-telegraf: init-defaults
	echo "Initialize: Setup Telegraf ..."
	# For information only
	mkdir -p etc/telegraf
	cp -n etc/telegraf/telegraf-default.conf etc/telegraf/telegraf.conf

init-grafana: init-defaults
	echo "Initialize: Setup Grafana ..."
	# mkdir -p var/lib/grafana
	# mkdir -p var/log/grafana
