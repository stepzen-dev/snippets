# Reshaping by field materializers

## Overview

This schema uses the full set of types from a backend Star Wars GraphQL endpoint
but does not expose the backend's Query root operation type fields, e.g. `Query.human`.
Instead it provides new Query root operation type fields derived from the original fields.

This is achieved with a combination of:

 - Use of `@materializer` for the new root operation type fields.
 - [Field based access control](config.yaml) to only expose the new fields.

## Rename

`Query.hominoid` is a simple rename of `Query.human` using `@materializer`:

https://github.com/stepzen-dev/snippets/blob/reshape-subset/reshape/fields/exposed.graphql#L2-L5

You may want to rename a field when an existing field name is unclear or does not match your naming convention.


## Constrain arguments


## Try it out!

Deploy the schema from `reshape/fields` relative to the repository's root directory:

```
stepzen deploy
```

Run the [sample operations](operations.graphql):

```
stepzen request -f operations.graphql Hominoid -H Authorization:
stepzen request -f operations.graphql Luke -H Authorization:
stepzen request -f operations.graphql Robot -H Authorization:
stepzen request -f operations.graphql RobotDefault -H Authorization:
```

> **Note**
> `-H Authorization:` removes the authorization header automatically added by `stepzen request` to demonstrate the fields are public.

