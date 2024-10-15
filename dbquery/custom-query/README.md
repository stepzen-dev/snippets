# @dbquery SQL query Snippet

This example demonstrates how to use the `@dbquery` directive with custom SQL queries for `Customer` data in StepZen.

## Files

- **api.graphql**: Contains the GraphQL schema for querying `Customer` objects using custom SQL queries.
- **config.yaml**: Database configuration, including connection URI.
- **index.graphql**: Entry point schema file.
- **operations.graphql**: Sample queries to test the `@dbquery` directive.
- **stepzen.config.json**: Configuration for the StepZen endpoint.

## Prerequisites

- A PostgreSQL database with a `customer` table containing `id`, `name`, and `email` fields.
- Replace the `uri` in `config.yaml` with your database connection details.

## Usage

1. Deploy the schema using StepZen.
2. Use the sample queries in `operations.graphql` to test the `@dbquery` functionality.
3. Adjust the queries as needed to fit your database schema.
