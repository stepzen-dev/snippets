# Pagination with `@rest`

This snippet shows how `@rest` fields are configured to support pagination.

## GraphQL pagination

StepZen supports pagination through the standard
[GraphQL Cursor Connection Specification](https://relay.dev/graphql/connections.htm).

This allows clients consuming a StepZen GraphQL endpoint to page through results
regardless of the originating backend type (e.g. GraphQL endpoint, database, REST API).

For the `@rest` directive, StepZen supports three styles of pagination to match the typical REST API approaches:

- PAGE_NUMBER - pages by requesting a specific page number
- OFFSET - pages by reqesting a starting record offset
- NEXT_CURSOR - pages by opaque cursors returned by the REST API

This snippet demonstrates the typical REST API response and `@rest` directive configuration for each of the three styles.

In StepZen, Query fields that return a connection type must have two field arguments,

- `first` which specifies the number of nodes to fetch
- `after` which is an opaque cursor.

With the StepZen's `@rest` directive, these arguments are available in the context of the directive's configuration and are converted to the correct value required by the REST API.

For example with `PAGE_NUMBER` the `after` opaque cursor value the client uses
is converted to a integer page number in the context of `@rest`. So if the
REST API expects URL query arguments `pageSize` and `pageNumber` then `@rest` would have
an `endpoint` such as:

```
endpoint: "https://api.example.com/customers?pageSize=$first&pageNumber=$after"
```

## PAGE_NUMBER pagination

A REST API using the PAGE_NUMBER style pagination typically takes two arguments, page size and page number,
and returns a list of values and metadata indicating the total number of pages. The response layout
varies, but is similar to:

```json
{
  "meta": {
    "totalPages": 8
  },
  "values": [
    {
      "name": "Fred"
    },
    {
      "name": "Barney"
    }
  ]
}
```

The field `Query.customersPageNumber` is an example of `PAGE_NUMBER` pagination.

## OFFSET pagination

TODO

## NEXT_CURSOR pagination

TODO

## Using paginated fields

The easiest way to use paginated fields is with a GraphQL operation
that has variables for the arguments `first` and `after`. Examples
are show in `requests.graphql`.

To retrieve the first page of a result, the operation is called with `after` omitted or set to the empty string (`""`), and `first` is set to the number of results to return in a page.

Subsequent pages can then be retrieved by setting `after` to the value of `endCursor` from `pageInfo` from the previous request. `first` should be set to the value used in the first request.

This is continued until `hasNextPage` is `false`.

## Reshaping paginated fields

What is reshaping? See an [overview of reshaping](../../reshape/README.md)

GraphQL pagination is powerful, but in some cases you may want to reshape to simplify your schema.
StepZen can easily simplify a paginated field to:

- only return the first N values as a simple list
- only return the first value as a singular value, not a list

The fields `nCustomers` and `firstCustomer` in [`reshape.graphql`](reshape.graphql) demonstrate
how to achieve this. A selection is used in `@materializer` to pull the node values up into a simple list.
