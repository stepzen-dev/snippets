# Obfuscated endpoint URL

One simple mechanism to share an IBM API Connect Essentials (StepZen) endpoint to
to make the [endpoint open](../../protection/makeAllPublic/config.yaml) but
deploy the schema with an obfuscated name.

## Deploying

For example, deploy this schema using a randomly generated name (Linux/MacOS):

```
name=$(cat /dev/urandom | LC_ALL=C tr -dc 'a-zA-Z' | fold -w 64 | head -n 1)
stepzen deploy pocs/$name
```

You will see the endpoint is deployed with a random obfuscated URL.

```
Deploying pocs/FzOYquoOMuQzvQqsLSUfVuvQwfVwuOEhGOkGGpLDnuIzeJZCHQAfHbFMCCIQdmBe to StepZen... done in 511ms 🚀
  ✓ 🔐 https://danville.us-east-a.ibm.stepzen.net/pocs/FzOYquoOMuQzvQqsLSUfVuvQwfVwuOEhGOkGGpLDnuIzeJZCHQAfHbFMCCIQdmBe/__graphql
  ✓ 🔐 wss://danville.us-east-a.ibm.stepzen.net/stepzen-subscriptions/pocs/FzOYquoOMuQzvQqsLSUfVuvQwfVwuOEhGOkGGpLDnuIzeJZCHQAfHbFMCCIQdmBe/__graphql (subscriptions)
```

This endpoint URL can now be handed out to allow others to evaluate the endpoint without requiring any authorization.

> [!WARNING]
> Anyone with the URL has access to the endpoint, so this is security through obscurity.

## Analytics

Using the analytics dashboard the account owner can see activity with this specific endpoint,
so by handing out individual endpoints the account owner can track how extensively the endpoint has been evaluated.

## Single-use & deleting

Thus one can extend this concept to a "single-use" endpoint, for example creating an endpoint
for a demo and then delete it when no longer required.

```
stepzen delete --non-interactive pocs/FzOYquoOMuQzvQqsLSUfVuvQwfVwuOEhGOkGGpLDnuIzeJZCHQAfHbFMCCIQdmBe
```

## Tracking

By maintaining such endpoints in single folder, such as `pocs` or `single-use` you can use `stepzen list` to
see which endpoints are still active.

```
> stepzen list --folder pocs
 Endpoint                                                                 Created at               Updated at
 ──────────────────────────────────────────────────────────────────────── ──────────────────────── ─────────────────────
 pocs/FzOYquoOMuQzvQqsLSUfVuvQwfVwuOEhGOkGGpLDnuIzeJZCHQAfHbFMCCIQdmBe    Sep 8, 2024, 12:46 PM    Sep 8, 2024, 12:59 PM
```

## Schema description

It is recommended to define a [schema description](./index.graphql#L1-L6) so that this GraphQL introspection request can
used to see the purpose of the obfuscated endpoint.

```
> stepzen request '{__schema{description}}'
{
  "data": {
    "__schema": {
      "description": "Sample mocked Customer endpoint."
    }
  }
}
```
