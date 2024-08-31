# Persisted Documents

GraphQL _executable documents_ containing at least one operation definition
and optional fragment defintions can be persisted with a schema.

## Overview

The optional `executables` argument of `@sdl` takes a list of input document files
that are GraphQL _executable documents_.

```
  @sdl(
    files: []
    executables: [{ document: "operations.graphql", persist: true }]
  )
```

When a schema is deployed the _executable documents_ must validate successfully
against the schema.

By itself this can be used to validate applications' use
of a GraphQL endpoint remain valid when the schema changes.
This requires that the application loads GraphQL requests from
files containing executable documents that are declared in the schema.

In addition any _executable document_ in the schema that is marked with `persist: true`
is loaded as a _persisted document_.

A client uses a _persisted document_ by specifying its document identifier
(based upon a SHA256 hash) in a request instead of the content of the _executable document_.

For example instead of this POST body for a request:

```
{
  "query": "{__typname}"
}
```

a request can use this:

```
{
"documentId": "sha256:ecf4edb46db40b5132295c0291d62fb65d6759a9eedfa4d5d612dd5ec54a6b38"
}
```

if an _executable document_ was declared in the schema with the matching SHA256 hash.

The request parameters `operationName` and `variables` can be used as required with `documentId`.

## Benefits

Use of persisted documents typically saves network bandwidth as for real application requests
the hash is smaller than the body of the _executable document_.

In addition query requests can use HTTP GET while maintaining a reasonable sized URL
that improves caching of URL requests. For example the above request can be a coded as an HTTP GET:

```
https://london.us-east-a.ibm.stepzen.net/api/customer/graphql?documentId=sha256:ecf4edb46db40b5132295c0291d62fb65d6759a9eedfa4d5d612dd5ec54a6b38
```

## Executable Documents

A good practice is to ensure that a CI/CD process ensures that _executable documents_ declared as
part of the schema using `@sdl(executables:)` are formatted consistentcy, using tooling such as `prettier`.

For example the simple _executable document_ shown above `{__typename}` stored in a document file
and formatted will have contents (including a newline at the end):

```
{
  __typename
}
```

and thus a document identifier of `sha256:8d8f7365e9e86fa8e3313fcaf2131b801eafe9549de22373089cf27511858b39`.

Clients can obtain the SHA256 hash for a document identifer using any standard mechanism for calculating hashes,
for example on Linux/Unix systems this command can be used:

```
shasum -a 256 operations.graphql
```

When _executable document_ are persisted using `@sdl(executables:)` the schema calculates the document identifiers automatically.
