THIS_FILE := $(lastword $(MAKEFILE_LIST))
WORKSPACE := $(PWD)
SHELL := /bin/bash
DATE := $(date '+%Y-%m-%d')

.PHONY: backup

all: 

##########################
# Manage Environment
##########################

build:
	cd src && docker-compose build

start: 
	cd src && docker-compose up -d

logs:
	cd src && docker-compose logs -f

stop:
	cd src && docker-compose stop

down:
	cd src && docker-compose down

clean:
	cd src && docker-compose down --volumes

backup:
	date
	docker stop ti-dhome_victoriametrics_1
	mkdir -p $(WORKSPACE)/backup/victoriametrics
	docker run --rm -it -v ti-dhome_victoria-metrics-data:/victoria-metrics-data -v $(WORKSPACE)/backup/victoriametrics:/backup/victoriametrics -w /victoria-metrics-data ubuntu sh -c 'tar czvf /backup/victoriametrics/vm-$(DATE).tar.gz .'
	docker start ti-dhome_victoriametrics_1
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