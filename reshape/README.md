# Reshape

Snippets showing how a GraphQL API can be reshaped to expose subsets of the information or with a different structure.

## Overview

When creating a GraphQL endpoint you may want to present a simple clean GraphQL API. In some cases this will
require reshaping existing GraphQL schemas. Reshaping of existing schemas can be used when you:

- want to create an GraphQL api that is independent of the current backends,
  for example, currently your data is in PostgreSQL but may move to a REST API in the future.
- are federating or proxying an existing GraphQL endpoint that you have no control over
  - for example, the [GitHub GraphQL API](https://docs.github.com/en/graphql).
- are incorporating existing GraphQL schemas for backend sources
  - for example, you are using pre-canned schemas from an open source repository.

With StepZen there are a number of techniques to reshape your API.

In general most of the follow techniques are independent of how GraphQL types are
populated, that is, it doesn't matter if a type is populated from an `@rest`, `@graphql` or `@dbquery` field.
So the reshaping is happening at the GraphQL schema level.

Reshaping is combined with access control of GraphQL fields so that
"implementation" fields are not exposed. More information on access control can be found at:

- [Policies for Access Control of GraphQL Fields](https://stepzen.com/docs/access-control/access-control-rules)
- [Protection Snippets](https://github.com/stepzen-dev/snippets#protection)

In all of the reshaping examples fields that are part of the reshaped api are accessible with no authorization.

> [!NOTE]
> Any reshaped GraphQL schema can also be expanded with any StepZen GraphQL functionality, such as adding fields with `@materializer` or adding `@sequence` fields that invoked fields from reshaped and or original schema.

## Techniques

### Subsetting

Subsetting is simply defining types that contain omit fields from a backend that you do not want to expose.

See the sample schema in [subset](subset/README.md)

### Fields

Fields shows how root operation type fields can hidden and replaced with variants with renaming, constrained arguments, default arguments etc.

See the sample schema in [fields](fields/README.md)

### Simplifying paginated fields

GraphQL pagination is powerful, but in some cases you may want to reshape to simplify your schema.

See [reshaping paginated fields](../rest/pagination/README.md#reshaping-paginated-fields)
