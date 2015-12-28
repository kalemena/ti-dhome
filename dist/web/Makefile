WEBPATH_RELATIVE=../../src/web/www
WEBPATH_ABSOLUTE=$(realpath $(WEBPATH_RELATIVE))

default: build

run: build
	docker run --restart=always --name ti-dhome --hostname ti-dhome \
		-d -p 80:80 \
		-v $(WEBPATH_ABSOLUTE):/usr/share/nginx/html nginx
	
build:
	docker pull nginx
