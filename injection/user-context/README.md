# Inject user context

This example demonstrates how to use the `@inject` directive.It provides a powerful way to extract context information (like user preferences, regional settings, and role) and make it available as expansion variables to multiple fields in a single request. This enables clean, reusable context patterns without repetitive parameter passing.

- **Injection field**: `_inject_user_context` - automatically resolved without parameters
- **Target fields**: `orders`, `products`, `recommendations` - can access injected variables
- **Context variables**: `preferred_region`, `currency`, `role`, `language`, `default_user_id`

## How It Works

1. **Context Extraction**: The `_inject_user_context` field provides default user context
2. **Automatic Injection**: Target fields automatically receive context as expansion variables  
3. **Flexible Usage**: Target fields can use optional `userId` parameters to override defaults
4. **Shared Context**: Multiple operations in one request share the same injected context

**Note**: The injection field cannot have required parameters - it must be resolvable without arguments.

## Schema Structure

```graphql
_inject_user_context: JSON
  @inject(on: [{ expose: true, types: "Query", fields: "orders|products|recommendations" }])
  @value(script: { ... })  # Returns default context
```

## Example operations

### Using Default Context

```graphql
query UserDashboardDefault {
  orders(limit: 3) {        # Uses injected context
    id
    customerName
    total
  }
  products(category: "electronics") {  # Uses injected context  
    id
    name
    price
  }
}
```

### Overriding with Explicit Parameters

```graphql
query UserDashboardExplicit($userId: ID!) {
  orders(userId: $userId, limit: 3) {  # Overrides default userId
    id
    customerName
    total
  }
}
```

## Try it out

Deploy the schema from `injection/user-context`:

```bash
stepzen deploy
```

### Sample Operations

1. **Get Orders by UserID:**

```bash
stepzen request -f operations.graphql --operation-name=UserOrdersExplicit --var userId=1
```

2. **Get Products by UserID:**

```bash
stepzen request -f operations.graphql --operation-name=UserProductsExplicit --var userId=2 --var category="electronics"
```

3. **Get Recommendations by userId:**

```bash
stepzen request -f operations.graphql --operation-name=UserRecommendationsExplicit --var userId=2 --var count=2
```

4. **multiple injected operations:**

```bash
stepzen request -f operations.graphql --operation-name=UserDashboardDefault
```
