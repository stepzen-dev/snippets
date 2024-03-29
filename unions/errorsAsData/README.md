## Unions: Errors as Data

This example shows how to use a union type to represent errors as data. This is a common pattern when using GraphQL to represent errors in a way that is easy to consume by the client.

## Getting Started

[Install](https://stepzen.com/docs/quick-start/install-and-setup) the StepZen command line interface.

To run these examples,

- `git clone` this repo
- Change to the right working directory.
- run `stepzen start`

## Explore

You can use the following query to explore the data:

```graphql
mutation {
  auth(email: "demo", password: "demo") {
    # client can optionally request the type name instead of figuring it out from the returned keys
    __typename

    # requested fields when response is of type Token
    ... on Token {
      id
      token
    }

    # requested fields when response is of type AuthError
    ... on AuthError {
      message
    }
  }
}
```

This will return a response of type `Token` if the credentials are correct, or `AuthError` if they are not. Try changing the credentials to see the error response.
