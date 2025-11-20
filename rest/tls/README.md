# TLS


For more information on using TLS in your REST apis and other services [see our documentation](https://www.ibm.com/docs/en/api-connect-graphql/saas?topic=directives-directive-rest#tls-string__title__1).

## Using `@rest(tls:)`

This examples demonstrates a number of API Connect for GraphQL capabilities:
- Use of `@rest(tls:)`
- stepzen service
- Simple ecmascript capability for reshaping data.

## mTLS and certificates

API Connect for GraphQL supports mTLS and custom certificates (self-signed, private,
etc.) by using using a combination of a `@rest(tls:)` argument
that refers to a configuration in the `config.yaml`

When the tls entry is given the name of a configuration entry, you can provide
- `ca` - the server `ca` or `ca` chain (starting with the leaf certificate)
- `cert` - the client certificate
- `key` - the client certifcate key
The data should be in PEM format.

In our examples, we have two configuration: `selfsign` with a `ca` entry and `selfsignedmtls` with all three entries.

TLS 1.2 and 1.3 are supported.  TLS 1.0 and 1.1 are not supported.

## Try it out!

`rest_self` in tls.graphql provides an example of self signed certificates by pointing to the `selfsign` resource in config.yaml.   That configuration contains `ca: STEPZEN_SERVER_CRT`
During `stepzen deploy`, the `STEPZEN_SERVER_CRT` environment variable is expanded and the result will be a yaml that looks like:
```
configurationset:
  - configuration:
      name: selfsign
      ca: |
        -----BEGIN CERTIFICATE-----
        MIIF5zCCA8+gAwIBAgIUS2BwtghuA7PREQ5AWzOeeT+tCe4wDQYJKoZIhvcNAQEL
        ...
        -----END CERTIFICATE-----
```

The `selfsignedmtls` configuration contains an example mutual TLS configuration.

Two safe approaches are to set the environment variables from secrets or to have a `.env` file.

See tricks below for some possible hurdles.

### Running a test

Testing mTLS or self-signed certificates locally is best done using local API Connect for GraphQL.
In the following, we'll generate the certificates using openssl, use openssl to for trivialself-signed cert servers
and use the stepzen cli local service mode as a client.

Note: if you are not using Docker, see Tricks and hints/Container tools.

#### Steps
```
stepzen service start
stepzen login --config ~/.stepzen/stepzen-config.local.yaml
(cd tests; make env)
# WARNING: if you are not using Docker, please see 
# Tricks and hints/Container tools
stepzen deploy

# start trivial local TLS server using openssl
# enable DEBUG if there are issues
((cd tests; make run_validation_server_self_sign) &
# wait until it gets establish 1-30s

# run the actual tests
stepzen request -f operations.graphql

# cleanup
stepzen service stop
# restore your SaaS or other credentials
```


## Tricks and hints

### Container tools 

API Connect for GraphQL local services runs inside of a container using Docker, Podman, or other container runtime toolset.   Each of these have a slightly different method whereby containers can access the host machine's localhost.  The details of these are varied depending upon the actual toolset.

By default,  `rest_self` uses `host.docker.internal` which works in most modern Docker environments.

For Podman, you may need to change this to `host.containers.internal` or `localhost` depending on your podman defaults.   You may also need to modify your podman default configuration to allow for such access.

### env variables

You can set `STEPZEN_*` env variables in .env or using export.

For example:
```
export STEPZEN_SERVER_CRT=`cat server.pem`
```
will set STEPZEN_SERVER_CRT to something like this:
```
-----BEGIN CERTIFICATE-----\nMIIF5zCCA8+gAwIBAgIUS2BwtghuA7PREQ5AWzOeeT+tCe4wDQYJKoZIhvcNAQEL\nBQA....\nEUhqWbTk+y13A1OPfWbJu82zTKfJFvCAUgCf -----END CERTIFICATE-----"
```

Be aware that the `\n` will show up as spaces if you do echo $STEPZEN_SERVER_CRT

To double check, you'll want to do something like this:
```
cat <<EOF
$STEPZEN_SERVER_CRT
EOF
```
or use techniques outlined in Misconfigured config.yaml below.

You can also set the env variables in `.env`.  In that case, you can either replace the line breaks with `\n` or simply quote them:
```
STEPZEN_SERVER_CRT="-----BEGIN CERTIFICATE-----\nMIIF5zCCA8+gAwIBAgIUS2BwtghuA7PREQ5AWzOeeT+tCe4wDQYJKoZIhvcNAQEL\n...\n-----END CERTIFICATE-----"
```
or 
```
STEPZEN_SERVER_CRT="-----BEGIN CERTIFICATE-----
MIIF5zCCA8+gAwIBAgIUS2BwtghuA7PREQ5AWzOeeT+tCe4wDQYJKoZIhvcNAQEL
...
-----END CERTIFICATE-----"
```


### Misconfigured config.yaml

You can check if the config.yaml being uploaded by running
```
DEBUG="stepzen:sdk:trace" stepzen deploy 
```
and looking for the configuration.  Useful if the .env or exported variables are not 
as expected in the config.yaml or if you've directly placed the data in the `config.yaml`
that it is as you expected.

You are looking for something that looks like:
```
"configuration":{"configurationset":[{"configuration":{"name":"selfsign","ca":
"-----BEGIN CERTIFICATE-----\nMIIF5zCCA8+gAwIBAgIUS2BwtghuA7PREQ5AWzOeeT+tCe4wDQYJKoZIhvcNAQEL\nBQAwbTE...
```
notice the '\n'.  If you see spaces you've done something wrong upsteram.


### Debugging
You can debug using stepzen request by adding `-H "stepzen-debug-level: 1"`
```
 stepzen request '{rest_self}'  -H "stepzen-debug-level: 1"
```
and you can check the output for issues.  You can check if tls values are being passed by looking for the tls
block.  In this case for mutual tls, we'll have:
```
            "tls": {
              "clientCertificate": {
                "keyPresent": true,
                "present": true
              },
              "serverRootCA": {
                "present": true
              }
            },
```
