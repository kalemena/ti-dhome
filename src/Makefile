##########################
# Initialize Environment
##########################

init: init-config init-images

init-config:
	echo "Initialize: Folders ..."
	cp .env-example .env

	echo "Initialize: Configuration Defaults ..."
	cp etc/tidhome/ti-dhome.yaml.example etc/tidhome/ti-dhome.yaml
	
	echo "Initialize: Telegraf ..."
	mkdir -p etc/telegraf
	docker run --rm telegraf telegraf config | tee etc/telegraf/telegraf-default.conf > /dev/null
	cp -n etc/telegraf/telegraf-default.conf etc/telegraf/telegraf.conf

init-images:
	echo "Initialize: Pull Images ..."
	docker compose pull
	docker compose build nodered

