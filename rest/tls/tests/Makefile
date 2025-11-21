# Makefile to build and validate a pair of *example* self-signed certificates for *simple* tests

# alternate endpoint settings for different container toolsets
# hostname: "https://host.docker.internal:8443"
# hostname: "https://localhost:8443"
# hostname: "https://host.rancher-desktop.internal:8443"
SERVER_URL:=https://host.docker.internal:8443

# enable to debug ssl server
# DEBUG:=-debug
all: client.crt server.crt env

#  server.crt client.key server.key
client.crt:
	openssl req -x509 -newkey rsa:4096 -keyout client.key -out client.crt -sha256 -days 7650  \
           -subj "/C=US/ST=Florida/L=Jacksonville/O=LOCALCLIENT/OU=Com/CN=localhost" -nodes \
           -addext "subjectAltName = DNS:localhost, DNS:myalt, DNS:host.docker.internal"

server.crt:
	openssl req -x509 -newkey rsa:4096 -keyout server.key -out server.crt -sha256 -days 7650 \
           -subj "/C=US/ST=California/L=San Jose/O=LOCALSERVER/OU=Com/CN=localhost" -nodes \
           -addext "subjectAltName = DNS:localhost, DNS:host.docker.internal"

run_validation_client_self_sign: client.crt
	curl --cacert server.crt https://localhost:9443 -debug

run_validation_server_self_sign: server.crt
	openssl s_server -accept 8443 -cert server.crt -key server.key $(DEBUG) -www 

clean:
	rm -f server.crt server.key client.crt client.key

env:	../.env

../.env: client.crt server.crt
	( echo STEPZEN_SERVICE_URL=\"$(SERVER_URL)\"; \
          echo STEPZEN_CLIENT_CRT=\""`cat client.crt`"\"; \
	  echo STEPZEN_CLIENT_KEY=\""`cat client.key`"\"; \
	   echo STEPZEN_SERVER_CRT=\""`cat server.crt`"\") > ../.env
