## @rest calls and responses

`@rest` is a powerful declarative custom directive that brings REST API calls into a GraphQL schema.

Documentation: https://www.ibm.com/docs/en/api-connect/ace/saas?topic=directives-directive-rest

Where possible, we use [httpbingo.org](https://httpbingo.org) as our REST endpoint, since it allows us to mimic lots of REST capabilities.

- [morecomplexpost](morecomplexpost) shows how a POST body can be filled with field arguments using `{{.Get \"name-of-query-argument\"}}` when the `Content-Type:application/x-www-form-urlencoded`.
- [pagination](pagination) shows how standard REST API pagination styles can be converted to standard GraphQL pagination.
- [postbody](postbody) shows how a POST body can be automatically filled with field arguments with `Content-Type:application/x-www-form-urlencoded`. This is the easiest way to send postbodies down the REST API
- [restWithConfigYaml](restWithConfigYaml) shows how REST query parameters can also be fetched from `config.yaml`--this allows you to keep your SDL code separate from your secrets.
- [restWithParameters](restWithParameters) shows how GraphQL field arguments are automatically added to the REST call--there is nothing for you to do!
