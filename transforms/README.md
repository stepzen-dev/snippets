# Transforms

When bringing a REST API into a schema using `@rest` the response may need to be transformed to align with the GraphQL type used the field's type.

For more on what `transforms` is and how it operates within the custom `@rest` directive, [see our documentation](https://www.ibm.com/docs/en/api-connect/ace/saas?topic=directives-directive-rest#transforms-transform__title__1).

## Snippets

- [filter](filter) shows how the response of a REST API can be filtered
- [combineintostring](combineintostring) shows how a new field in the return type can be created by concatenating some other fields (like address parts into one address)
- [jsonarrayToJsonobject](jsonarrayToJsonobject) shows how an array of data (say coords) can be converted into an object, `{"lat":, "lon",..}` so that it can be fed into some other system that requires data to be expressed that way
- [jsonobjectToJsonarray](jsonobjectToJsonarray) shows how an object (typically where each key is an id of a record) can be converted into an array (e.g., `{"1":{"name": "john"}, "2": "jane"}` can be converted to `[{"id":"1", "name": "john"}, {"id":"2", name: "jane"}]`), so that it can then behave well for GraphQL processing.
