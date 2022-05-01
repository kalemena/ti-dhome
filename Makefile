THIS_FILE := $(lastword $(MAKEFILE_LIST))

SHELL := /bin/bash

.PHONY: 

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