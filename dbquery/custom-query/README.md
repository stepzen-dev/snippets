
# SQL Queries with `@dbquery`

This snippet demonstrates how to configure the `@dbquery` directive for custom SQL queries.

## Getting Started

[Install](https://www.ibm.com/docs/en/api-connect/ace/saas?topic=setting-up-your-environment) the StepZen command line interface.

To run these examples,

- `git clone` this repo
- Change to the right working directory.
- run `stepzen deploy`

This example uses a demo database filled with mock data, you can inspect the `config.yaml` file to find the credentials for this database. Also you can configure the connection in the `config.yaml` file by providing your database credentials.

Here’s a more generalized and specific description of the `@dbquery` directive functionality without referring to any particular data:

---

## The `@dbquery` Directive with SQL Query

The `@dbquery` directive in StepZen is used to connect your GraphQL API to databases and allows you to execute custom SQL queries within your schema. It supports various database types, such as MySQL, PostgreSQL, MSSQL, and Snowflake.

In this snippet, the `query` argument is used to define custom SQL queries for more control over the data being fetched. The functionality of the `query` argument allows for:

- Running complex SQL queries directly from GraphQL fields.
- Retrieving data from specific columns or joining multiple tables based on your query requirements.
- Filtering and querying data using SQL syntax when database field names or structures differ from the GraphQL schema.

The `query` argument provides the flexibility to write any SQL statement, while the **configuration** argument references the connection settings defined in the `config.yaml` file.

For example, a query may look like this:

```graphql
@dbquery(
  query: "SELECT column1, column2 FROM your_table WHERE condition = $1",
  type: "postgresql",
  configuration: "your_config"
)
```

This allows you to fetch exactly the data you need, based on the custom SQL query provided. You can adjust the queries to match your database schema and use case.

## Try it Out!

Deploy the schema from `dbquery/pagination` relative to the repository's root directory:

```
stepzen deploy
```

Run the [sample operations](operations.graphql):

- **Fetch all customers**:
  ```
  stepzen request -f operations.graphql --operation-name=Customers
  ```

- **Fetch a customer by ID**:
  ```
  stepzen request -f operations.graphql --operation-name=Customer --var id=1
  ```
  