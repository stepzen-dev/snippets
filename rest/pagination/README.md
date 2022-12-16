# Pagination with `@rest`

This snippet shows how `@rest` fields are configured to support pagination.

## GraphQL pagination

StepZen supports pagination through the standard
[GraphQL Cursor Connection Specification](https://relay.dev/graphql/connections.htm).

This allows clients consuming a StepZen GraphQL endpoint to page through values
regardless of backend type (e.g. GraphQL endpoint, database, REST API) where the data originates.

 For the `@rest` directive, StepZen supports three styles of pagination to match the typical REST API approaches:

 - PAGE_NUMBER - pages by requesting a specific page number
 - OFFSET - pages by reqesting a starting record offset
 - NEXT_CURSOR - pages by opaque cursors returned by the REST API

This snippet demonstrates how the REST API response typically looks for each style
and how `@rest` is configured for that style.

Query fields that return a connection type must have two field arguments, `first` for
the number of nodes to fetch and `after` an opaque cursor. With StepZen these
arguments are available in the context of the `@rest` configuration with the values
converted to the correct value for the REST API.

For example with `PAGE_NUMBER` the `after` opaque cursor value the client uses
is converted to a integer page number in the context of `@rest`. So if the
REST API expects URL query arguments `pageSize` and `pageNumber` then `@rest` would have
an `endpoint` such as:
```
endpoint: "https://api.example.com/customers?pageSize=$first&pageNumber=$after"
```

## PAGE_NUMBER pagination

A REST API using PAGE_NUMBER pagination typically takes arguments of a page size and page number
and returns a list of values and metadata indicating the total number of pages. The response layout
varies, but is similar to:
```json
{
  "meta": {
    "totalPages": 8
  },
  "values": [
    {
      "name":"Fred"
    },
    {
      "name":"Barney"
    }
  ]
}
```

The field `Query.customersPageNumber` is an example of `PAGE_NUMBER` pagination.


## OFFSET pagination

TODO

## NEXT_CURSOR pagination

TODO

# Using paginated fields

The easiest way to use paginated fields is with a GraphQL operation
that has variables for the `first` and `after` arguments. Examples
are show in `requests.graphql`.

For the first call (to get the first page) the operation is called
with a value of `first` to set the number of nodes in a page
and either an empty string (`""`) for `after` or the `after` variable is omitted.

Then to fetch subsequent pages keep the value of `first` fixed and set
`after` to the value of `endCursor` from `pageInfo` from the previouse request.

This is continued until `hasNextPage` is `false`.

