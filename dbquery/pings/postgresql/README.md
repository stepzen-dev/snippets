# Ping PostgreSQL

Simple schema that when deployed provides an easy way to check that a
PostgreSQL database can be connected to from a GraphQL endpoint.

## Setup

Either set an environment variable or an `.env` file containing the URI of the PostgreSQL instance.

Replace `<<xxx>>` values with the correct connection information.

If a port number is required then add it to the host as `:1234`.

If the password contains special characters then must be URL escaped.

### Environment variable
```
export STEPZEN_PG_DB_URI=postgresql://<<host>>/<<database>>?user=<<user>>&password=<<password>>
```

### `.env` contents

```
STEPZEN_PG_DB_URI=postgresql://<<host>>/<<database>>?user=<<user>>&password=<<password>>
```

## Deploy

```
stepzen deploy
```

## Test

```
stepzen request '{ping{status}}'
```

## Example

```
>stepzen deploy 
Deploying dbping/postgresql to StepZen... done in 443ms 🚀
  ✓ 🔐 https://danville.us-east-a.ibm.stepzen.net/dbping/postgresql/__graphql
  ✓ 🔐 wss://danville.us-east-a.ibm.stepzen.net/stepzen-subscriptions/dbping/postgresql/__graphql (subscriptions)

You can test your hosted API with curl:

curl https://danville.us-east-a.ibm.stepzen.net/dbping/postgresql/__graphql \
   --header "Authorization: Apikey $(stepzen whoami --apikey)" \
   --header "Content-Type: application/json" \
   --data-raw '{
     "query": "query SampleQuery { __schema { description queryType { fields {name} } } }"
   }'

stepzen request '{ping{status}}'
{
  "data": {
    "ping": {
      "status": "ok"
    }
  }
}
```