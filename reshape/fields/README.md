# Reshaping by field materializers

## Overview

This schema uses the [full set of types from a backend Star Wars GraphQL](starwars/index.graphql) endpoint
but does not expose the backend's `Query` root operation type fields, e.g. `Query.human`.
Instead it provides new Query root operation type fields derived from the original fields.

This is achieved with a combination of:

- Use of `@materializer` for the [new root operation type fields](exposed.graphql).
- [Field based access control](config.yaml) to only expose the new fields.

> **Note**
> Even though this schema uses `@graphql` the techniques are independent of the data coming from a backend GraphQL endpoint, the reshaping is just against fields in `Query`regardless of their source.

## Rename

[`Query.hominoid`](reshape/fields/exposed.graphql#L2-L5) is a simple rename of `Query.human` using `@materializer`.

[`Query.person`](reshape/fields/exposed.graphql#L7-L14) calls `Query.human` by changes the argument name to `personId` from `id` using an argument mapping in `@materializer`.

You may want to rename a field name or argument name when an existing name is unclear or does not match your naming convention.

## Constrain arguments

For an existing root operation type field that exposes arguments you can expose a variant of
the field that constrains the arguments that a client of your api can supply.

This is achieved by not including the field argument in the exposed defintion and then either:

- not providing an argument mapping for `@materializer` so that the default value or `null` is used, see `Query.defaultHero` which does not expose a `episode` argument, thus using the default from `Query.hero`.
- providing a constant value in the argument mapping, see `Query.luke` which invokes `Query.human` but providing the constant 1000 for the `id` argument which corresponds to Luke Skywalker.

## Add defaults

For an existing root operation type field that exposes arguments you can expose a variant of
the field that sets different or new defaults for arguments to better match the common use cases for your client api.
For example a language based API may have a default language argument set to `en` for English, but you could expose
a endpoint specifically for a German speaking market where the default is `de`.

The field `Query.robot` has its `id` argument being optional by providing a default that maps to the identifier for R2-D2.

## Try it out!

Deploy the schema from `reshape/fields` relative to the repository's root directory:

```
stepzen deploy
```

Run the [sample operations](operations.graphql):

```
stepzen request -f operations.graphql --operation-name=Hominoid -H Authorization:
stepzen request -f operations.graphql --operation-name=Person -H Authorization:
stepzen request -f operations.graphql --operation-name=DefaultHero -H Authorization:
stepzen request -f operations.graphql --operation-name=Luke -H Authorization:
stepzen request -f operations.graphql --operation-name=Robot -H Authorization:
stepzen request -f operations.graphql --operation-name=RobotDefault -H Authorization:
```

> **Note** > `-H Authorization:` removes the authorization header automatically added by `stepzen request` to demonstrate the fields are public.
