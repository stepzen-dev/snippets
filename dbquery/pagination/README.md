# Pagination with `@dbquery`

This snippet shows how `@dbquery` fields are configured to support pagination.

## Getting Started

[Install](https://www.ibm.com/docs/en/api-connect/ace/saas?topic=setting-up-your-environment) the StepZen command line interface.

To run these examples,

- `git clone` this repo
- Change to the right working directory.
- run `stepzen deploy`

This example uses a demo database filled with mock data, you can inspect the `config.yaml` file to find the credentials for this database.

## GraphQL pagination

StepZen supports pagination through the standard [GraphQL Cursor Connection Specification](https://relay.dev/graphql/connections.htm).

This allows clients consuming a StepZen GraphQL endpoint to page through resultsmregardless of the originating backend type (e.g. GraphQL endpoint, database, REST API).

For the `@dbquery` directive, StepZen supports a connection based model for pagination out of the box.

This snippet demonstrates the typical `@dbquery` response and directive configuration for pagination.

In StepZen, Query fields that return a connection type must have two field arguments,

- `first` which specifies the number of nodes to fetch
- `after` which is an opaque cursor.

## Using paginated fields

The easiest way to use paginated fields is with a GraphQL operation that has variables for the arguments `first` and `after`. Examples
are show in `requests.graphql`.

To retrieve the first page of a result, the operation is called with `after` omitted or set to the empty string (`""`), and `first` is set to the number of results to return in a page.

Subsequent pages can then be retrieved by setting `after` to the value of `endCursor` from `pageInfo` from the previous request. `first` should be set to the value used in the first request.

This is continued until `hasNextPage` is `false`.

## Try it out!

Deploy the schema from `dbquery/pagination` relative to the repository's root directory:

```
stepzen deploy
```

Run the [sample operations](operations.graphql):

Fetch the first five records:

```
stepzen request -f operations.graphql --operation-name=Customers --var first=5
```

Fetch the next five, the value of `after` is taken from the `endCursor` field of the previous request:

```
stepzen request -f operations.graphql --operation-name=Customers --var first=5 --var after="eyJjIjoiTDpRdWVyeTpjdXN0b21lcnMiLCJvIjo0fQ=="
```

## GraphQL filtering

Filtering using a "MongoDB" inspired style for GraphQL is supported with `@dbquery` and is typically
used with pagination, though it can be used alone. [Reference](https://www.ibm.com/docs/en/api-connect-graphql/saas?topic=directives-directive-dbquery#filtering__title__1)

The field `Query.lookup` in [`filter.graphql`](./filter.graphql) is similar to `Query.customers` but adds a `filter` argument.

This filter value would return all names that start with "S":

```json
{ "name": { "like": "S%" } }
```

This returns two customers using an OR clause:

```json
{
  "or": {
    "name": { "eq": "John Doe" },
    "email": { "eq": "jane.smith@example.com" }
  }
}
```

### Examples

With no filter all customers are returned (subject to pagination)

```
stepzen request -f operations.graphql --operation-name=Lookup
```

With a filter then only matching customers are returned.

```
stepzen request -f operations.graphql --operation-name=Lookup --var 'f={ "name": { "like": "S%" } }'
```

```
stepzen request -f operations.graphql --operation-name=Lookup --var first=5 --var 'f={
  "or": {
    "name": { "eq": "John Doe" },
    "email": { "eq": "jane.smith@example.com" }
  }
}'
```

Also note that `totalEdges` returns the number of customers (edges) in the connection subject to the filter.
