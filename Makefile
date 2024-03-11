THIS_FILE := $(lastword $(MAKEFILE_LIST))
WORKSPACE := $(PWD)
SHELL := /bin/bash

BACKUP_DATE := $(shell date '+%Y-%m-%d')
BACKUP_FOLDER := /backup/victoriametrics

.PHONY: build backup restore

all: 

##########################
# Manage Environment
##########################

init:
	cd src && $(MAKE) init

build:
	cd src && docker compose build

up: 
	cd src && docker compose up -d

logs:
	cd src && docker compose logs -f

stop:
	cd src && docker compose stop

down:
	cd src && docker compose down

clean:
	cd src && docker compose down --volumes

backup:
	date
	docker stop ti-dhome-victoriametrics-1
	mkdir -p $(WORKSPACE)/backup/victoriametrics
	docker run --rm -it -v ti-dhome_victoria-metrics-data:/victoria-metrics-data -v $(BACKUP_FOLDER):/backup/victoriametrics -w /victoria-metrics-data alpine sh -c "apk add rsync && rsync --delete -rtD --info=progress2 /victoria-metrics-data/* /backup/victoriametrics/"
	docker start ti-dhome-victoriametrics-1
	date

# WARNING: Danger zone !
restore:
	date
	docker stop ti-dhome-victoriametrics-1
	docker run --rm -it -v ti-dhome_victoria-metrics-data:/victoria-metrics-data -v $(BACKUP_FOLDER):/backup/victoriametrics -w /victoria-metrics-data alpine sh -c "apk add rsync && rsync --delete -rtD --info=progress2 /backup/victoriametrics/* /victoria-metrics-data/"
	docker start ti-dhome-victoriametrics-1
	date

###########################
# BUILDING & PUBLISHING DOC
###########################

# Builds PDF book
doc.publishToPDF: 
	source .github/docPublishingScripts.sh && publishPDF

# Builds PDF book
doc.publishToHTML: 
	source .github/docPublishingScripts.sh && publishHTML

# Clean caches
doc.clean:
	rm -rf $(CURDIR)/build
	# docker run --rm -v $(CURDIR):/docs alpine rm -rf /docs/build