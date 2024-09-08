# Developing PoCs.

## Sharing

When developing a GraphQL PoC using IBM API Connect Essentials (StepZen) you will typically
want to share the endpoint to allow others to evaluate it by making GraphQL requests against it.

### Admin key

> [!CAUTION]
> Never share an endpoint by handing out the account's adminkey (`stepzen whoami --adminkey`).

### API key

The most simple (but somewhat risky) approach is to share the account's apikey (`stepzen whoami --apikey`).

> [!WARNING]
> The admin key grants access to all endpoints within an account. Thus if you are working on different PoCs, by providing access to one you provide access to all
> which could leak information between different departments or clients.

### Obfuscated endpoints

Obfuscated endpoints allow sharing without handing out any keys or tokens.

The concept can include single-use or short-lived endpoints for a demos, or time-limited evaluations.

> [!WARNING]
> Obfuscated endpoints are public, but have a hard to guess endpoint URL so anyone with the URL has access to the API.

See [obfuscated-endpoint-url](obfuscated-endpoint-url/README.md)
