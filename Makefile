THIS_FILE := $(lastword $(MAKEFILE_LIST))
WORKSPACE := $(PWD)
SHELL := /bin/bash

BACKUP_DATE := $(shell date '+%Y-%m-%d')
BACKUP_FOLDER := /backups
BACKUP_FOLDER_RAW := $(BACKUP_FOLDER)/victoriametrics

BACKUP_CMD_BASE := docker run --rm -it \
    -v ti-dhome_victoria-metrics-data:/victoria-metrics-data \
    -v $(BACKUP_FOLDER_RAW):/backup/victoriametrics \
    -w /victoria-metrics-data alpine sh

BACKUP_CMD := $(BACKUP_CMD_BASE) \
    -c "apk add rsync && rsync --delete -rtD --info=progress2 /victoria-metrics-data/* /backup/victoriametrics/"

RESTORE_CMD := $(BACKUP_CMD_BASE) \
    -c "apk add rsync && rsync --delete -rtD --info=progress2 /backup/victoriametrics/* /victoria-metrics-data/"

DB_SIZE_CMD := $(BACKUP_CMD_BASE) \
	-c "du -sh /victoria-metrics-data"

.PHONY: build backup restore

all: 

##########################
# Tools
##########################
%.time:
	time $(MAKE) $(@:.time= )

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

# WARNING: Danger zone !
clean:
	cd src && docker compose down --volumes

##########################
# Backup/Restore DB
##########################

backup.cmd:
	@mkdir -p $(WORKSPACE)/backup/victoriametrics
	$(BACKUP_CMD)

backup.size:
	@mkdir -p $(WORKSPACE)/backup/victoriametrics
	$(DB_SIZE_CMD)


# WARNING: Danger zone !
restore:
	docker stop ti-dhome-victoriametrics-1
	$(RESTORE_CMD)
	docker start ti-dhome-victoriametrics-1

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