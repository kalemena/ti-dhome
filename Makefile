THIS_FILE := $(lastword $(MAKEFILE_LIST))
WORKSPACE := $(PWD)
SHELL := /bin/bash

BACKUP_DATE := $(shell date '+%Y-%m-%d')
BACKUP_FOLDER_ROOT := /tmp
BACKUP_FOLDER_NAME := victoriametrics

BACKUP_FOLDER_ARCHIVE := /<mount>/backups/tidhome

BACKUP_CMD_BASE := docker run --rm -it \
    -v ti-dhome_victoria-metrics-data:/victoria-metrics-data \
    -v $(BACKUP_FOLDER_ROOT)/$(BACKUP_FOLDER_NAME):/backup/victoriametrics \
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

%.stop:
	cd src \
		&& docker compose stop -t 10 $(@:.stop= )

%.start:
	cd src \
		&& docker compose start $(@:.start= )

down:
	cd src && docker compose down

# WARNING: Danger zone !
clean:
	cd src && docker compose down --volumes

##########################
# Backup/Restore DB
##########################

backup.prereq: 
	@mkdir -p $(BACKUP_FOLDER_ROOT)/$(BACKUP_FOLDER_NAME)

backup.cmd: backup.prereq
	$(BACKUP_CMD)

backup.size: backup.prereq
	@echo "TMP files:"
	$(DB_SIZE_CMD)
	find $(BACKUP_FOLDER_ROOT)/$(BACKUP_FOLDER_NAME) -type f | wc -l
	@echo "ARCHIVE files:"
	du -sh $(BACKUP_FOLDER_ARCHIVE)/victoriametrics
	find $(BACKUP_FOLDER_ARCHIVE)/victoriametrics -type f | wc -l

backup: victoriametrics.stop backup.cmd backup.size victoriametrics.start

backup.archive:
	find $(BACKUP_FOLDER_ROOT)/$(BACKUP_FOLDER_NAME) -type f | wc -l
	rsync --delete -rtD --info=progress2 $(BACKUP_FOLDER_ROOT)/$(BACKUP_FOLDER_NAME)/* $(BACKUP_FOLDER_ARCHIVE)/
	tar -cvjf - $(BACKUP_FOLDER_ROOT)/$(BACKUP_FOLDER_NAME) > $(BACKUP_FOLDER_ARCHIVE)/vm-$(BACKUP_DATE).tar.bz2

restore.cmd:
	$(RESTORE_CMD)

# WARNING: Danger zone !
restore: victoriametrics.stop restore.cmd victoriametrics.start

restore.archive:
	find $(BACKUP_FOLDER_ARCHIVE) -type f | wc -l
	rsync --delete -rtD --info=progress2 $(BACKUP_FOLDER_ARCHIVE)/* $(BACKUP_FOLDER_ROOT)/$(BACKUP_FOLDER_NAME)/

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