# @inject

The `@inject` directive enables dependency injection in GraphQL schemas by allowing one field to inject expansion variables into other fields within the same request.

## How @inject Works

1. A field annotated with `@inject` is resolved first when any target field is accessed
2. The injecting field must return an object with key-value pairs
3. These pairs become expansion variables available to target fields
4. Target fields can access these variables using the standard expansion variable syntax
5. The `on` argument specifies which fields have access to the injected variables

## Schema Structure

```graphql
# Inject electronic product (JSON) data as expansion variables available to any Query field
_inject_electronic_products: JSON
  @inject(on: [{ expose: true, types: "Query", fields: ".*" }])
  @materializer(
    query: "products"
    arguments: { name: "category", const: "electronics" }
  )
```

## Snippets

- [user-context](user-context) - Demonstrates simple user context injection for regional e-commerce operations with role-based filtering and currency conversion.
