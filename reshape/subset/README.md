# Reshaping by subsetting

## `@graphql`

[`starwars.graphql`](starwars.graphql) is a strict subset of the schema exposed by the example endpoint
`https://chester.stepzen.net/examples/starwars` demonstrating that there's no need
to include all the types and fields of the backend endpoint.

In this case only information about human characters (type `Human`) is exposed
through the root operation type field `Query.human`.

## `@rest`

[`version.graphql`](version.graphql) is a strict subset of a schema that matches the StepZen
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

## `@dbquery`

Similar to `@graphql` and `@rest` there is no requirement for the GraphQL type
representing a table to represent all columns as fields.

For example with an `Employees` table such as:
```sql
CREATE TABLE Employees (
  id   VARCHAR(10) NOT NULL,
  name VARCHAR(255),
  ssn  CHAR(11),
  pay  DECIMAL(8,2)
)
```

the corresponding GraphQL type could just contain the non-sensitive columns:
```graphql
type Employee {
   id: ID!
   name: String
}
```

Then this field:
```graphql
extend type Query {
  employee(id:ID!): Employee @dbquery(type:"postgres" table:"Employees" configuration:"pgemps")
}
```
when executed will only issue a `SELECT id, name FROM EMPLOYEES WHERE id = $1`
thus not even accessing the sensitive columns.

## Try it out!

Deploy the schema

```
stepzen deploy
```

Run the [sample operations](operations.graphql):

```
stepzen request -f operations.graphql Human
stepzen request -f operations.graphql Version
```

