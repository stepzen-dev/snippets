# Reshaping by subsetting

## `@graphql`

`starwars.graphql` is a strict subset of the schema exposed by the example endpoint
`https://chester.stepzen.net/examples/starwars` demonstrating that there's no need
to include all the types and fields of the backend endpoint.

In this case only information about human characters (type `Human`) is exposed
through the root operation type field `Query.human`.

## `@rest`

`version.graphql` is a strict subset of a schema that matches the StepZen
service version REST API `https://account.stepzen.net/version`.

A GraphQL type matching the **full** REST API is:
```graphql
type Version {
  """
  The Git SHA value of the branch from which the release was built.
  """
  GitSha: String
  """
  Indicates the quality of service. Typically production.
  """
  Service: String
  """
  The version tag associated with the build.
  """
  Version: String
}
```
but with the subsetting in `version.graphql` we just expose a single field `GitSha`.

## Try it out!

Deploy the schema

```
stepzen deploy
```

Run the sample operations:

```
stepzen request -f operations.graphql Human
stepzen request -f operations.graphql Version
```

