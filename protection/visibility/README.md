# Visibility

## Overview

Visibility patterns allows fine-grained control over fields that are exposed by a schema, including introspection and handling requests.

With directives `@materializer`, `@sequence`, `@supplies` and `@inject` fields can be resolved through resolution of other fields.

For example, here the field `Customer.orders` is resolved by the resolution of `Query.orders`, using `@materializer`.

```graphql
type Query {
  customer(email: String!): Customer @rest(endpoint: "...")

  orders(customer_id: ID!): [Order] @dbquery(type: "postgresql")
}

type Customer {
  id: ID!
  name: String
  email: String
  orders: [Order]
    @materializer(
      query: "orders"
      arguments: { name: "customer_id", field: "id" }
    )
}
```

(details for `@rest`, `@dbquery` omitted for clarity)

In this case, we assume that the schema developer only wants to have clients obtain customer information through `Query.customer`,
including their orders, that is they want to only have clients use the _graph_ defined by the schema (customers have orders).

This means they do not want clients to make a request such as `{orders(customer_id:1) {date cost}}`, instead only
obtain orders through `{customer(email:"alice@example.com") {name orders {date cost}}}`.

While this can be achieved by field access policies, visibility provides a scoping mechanism for fields within the schema definition (`*.graphql` files) itself.

And fields hidden by visibility are effectively not part of the external GraphQL schema and thus cannot be selected by a request
or inspected using GraphQL introspection.

Visibiilty is applied before field access policies, as field access policies apply to the external schema of an endpoint.

> [!WARNING]
> Visibility patterns are not applied for requests make with an admin key, thus the full schema definition from the `*.graphql` files is exposed. This is to aid debugging of schemas.

## Visibility patterns

Visibility is controlled through the directive argument `@sdl(visibility:)`.

The visibility patterns apply only to the schema elements that are included through `@sdl(files:)`.

For our example above we assume the schema is in `customer.graphl`, thus our `index.graphql` would look like:

```graphql
schema
  @sdl(
    files: "customer.graphql"
    visibility: { expose: true, types: "Query", fields: "customer" }
  ) {
  query: Query
}
```

Fields that match the pattern are defined using regular expressions in `types` and `fields`, that match type names and field names.

Defaults match the style of field access policies in that:

- Root operation type fields (`Query`, `Mutation`, `Subscription`) are not exposed by default.
- All other fields in object and interface types are exposed by default.

Thus in this simple example all fields in `Query` are not exposed with the exception of `Query.customer`.

The external schema will only include `Query.customer` and and schema elements reachable from that field.

> [!NOTE]
> Any fields defined in this `index.graphql` are **not** subject to the visibility patterns, as patterns only apply to the schema elements that are included through files listed in `@sdl(files:)`.

## Consistent field naming

Visibility patterns encourage a consistent naming policy for a GraphQL schema.
For example using the prefix `_` for any "internal" field not to be exposed, can be enforced using a visibility pattern such as:

```graphql
schema
  @sdl(
    files: "customer.graphql"
    visibility: [
      { expose: true, types: "Query", fields: "customer" }
      { expose: false, types: ".*", fields: "_.*" } # Any type, any field whose name starts with _
    ]
  ) {
  query: Query
}
```

> [!TIP]
> Double underscore `__` as a prefix is reserved for GraphQL introspection and is not allowed.

## Try it out

Deploy the schema in this folder and then introspect the schema.

This lists the fields in `Query`

```graphql
query {
  __schema {
    queryType {
      fields {
        name
      }
    }
  }
}
```

The response is, showing `Query.orders` is not visible:

```json
{
  "data": {
    "__schema": {
      "description": "",
      "queryType": {
        "fields": [
          {
            "name": "customer"
          }
        ]
      }
    }
  }
}
```

You can verify the `Query.orders` cannot be selected:

```graphql
query {
  orders(customer_id: 1) {
    date
    when
  }
}
```

results in:

```json
{
  "errors": [
    {
      "message": "Cannot query field \"orders\" on type \"Query\".",
      "locations": [
        {
          "line": 1,
          "column": 9
        }
      ]
    }
  ]
}
```

> [!NOTE]
> If you see `Query.orders` then check if you are using the admin key in your request.
