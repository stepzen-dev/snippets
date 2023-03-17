# Reshaping by field materializers

## Overview

This schema uses the [full set of types from a backend Star Wars GraphQL](starwars/index.graphql) endpoint
but does not expose the backend's `Query` root operation type fields, e.g. `Query.human`.
Instead it provides new Query root operation type fields derived from the original fields.

This is achieved with a combination of:

- Use of `@materializer` for the [new root operation type fields](exposed.graphql).
- [Field based access control](config.yaml) to only expose the new fields.

> **Note**
> Even though this schema uses `@graphql` the techniques are independent of the data coming from a backend GraphQL endpoint, the reshaping is just against fields in the schema regardless of their source.

## Rename

[`Query.hominoid`](exposed.graphql#L2-L5) is a simple rename of `Query.human` using `@materializer`.

[`Query.person`](exposed.graphql#L7-L14) calls `Query.human` by changes the argument name to `personId` from `id` using an argument mapping in `@materializer`.

You may want to rename a field name or argument name when an existing name is unclear or does not match your naming convention.

## Constrain arguments

For an existing root operation type field that exposes arguments you can expose a variant of
the field that constrains the arguments that a client of your api can supply.

This is achieved by not including the field argument in the exposed defintion and then either:

- not providing an argument mapping for `@materializer` so that the default value or `null` is used, see [`Query.defaultHero`](exposed.graphql#L16-L19) which does not expose a `episode` argument, thus using the default from `Query.hero`.
- providing a constant value in the argument mapping, see [`Query.luke`](exposed.graphql#L21-L25) which invokes `Query.human` but providing the constant 1000 for the `id` argument which corresponds to Luke Skywalker.

## Add defaults

For an existing root operation type field that exposes arguments you can expose a variant of
the field that sets different or new defaults for arguments to better match the common use cases for your client api.
For example a language based API may have a default language argument set to `en` for English, but you could expose
a endpoint specifically for a German speaking market where the default is `de`.

The field [`Query.robot`](exposed.graphql#L27-L30) has its `id` argument being optional by providing a default that maps to the identifier for R2-D2.

## Nested field selection

In its simplest form, the `query` argument of `@materializer` is a reference to a single field in `Query`, for example `@materializer(query: "human")` indicates the annotated field will be materialized (or resolved) by execution of `Query.human`.

However, the argument can include a selection, for example `@materializer(query: "human {name}")` which indicates the annotated field will be materialized by execution of `Query.human` and the selection of `name` from the resulting `Human` object. The selection must only select a single field, but the selected field can be of **any type** that is assignable to the annotated field, and at **any depth**.

This can be used to pull up fields from information nested in the object tree from a `Query` root operation field, for example, `Query.location(zip:String!):Location` may have `city:String` in `Location` but by using

```
extend type SimplifiedCustomer {
  city:String @materializer(query:"location {city}")
}
```

now `city` is a leaf `String` field, rather than being buried in a `Location` object.

[`Query.humanName`](exposed.graphql#L32-L35) uses the selection `human { name }` which selects just a `Human`'s name, is effectively executing `query ($id:ID!) {human(id:$id) { name }}` when `humanName` is selected in an operation.

[`Query.droidFriends`](exposed.graphql#L37-L40) uses the selection `droid { friends }` where `friends` type is a composite type, `[Character]`. Even though the selected single field `friends` is a composite type, it has no selection in its `@materializer`. Instead when an operation is executed that selects `droidFriends` then the selection against that field is applied to the selection of `friends`. For example the execution of this operation

```graphql
query DroidFriends {
  droidFriends(id: 2000) {
    name
    ... on Human {
      homePlanet
    }
    ... on Droid {
      primaryFunction
    }
  }
}
```

effectively executes this modified operation with internal processing that pulls up the nested aliased response key (`droidFriends`) :

```graphql
query DroidFriends {
  droid(id: 2000) {
    droidFriends: friends {
      name
      ... on Human {
        homePlanet
      }
      ... on Droid {
        primaryFunction
      }
    }
  }
}
```

> **Note** > The selection in the client's operation (`DroidFriends` in this example) against an annotated field with a selection in its `@materializer` can be **any valid selection** against the type of the annotated field, which include selections of nested fields that themselves have `@materializer`, with or without selections.

If anywhere in the selection any field is a list then the annotated field must have a type that is a list of the single field.
For example [`Query.humanFriendsNames`](exposed.graphql#L42-L46) uses the selection `human { friends { name }}` even though the single field `name` has type `String` the field `humanFriendsNames` must have type `[String]` since `friends` is a list (`[Character]`).

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
stepzen request -f operations.graphql --operation-name=HumanName -H Authorization:
stepzen request -f operations.graphql --operation-name=DroidFriends -H Authorization:
stepzen request -f operations.graphql --operation-name=HumanFriendsNames -H Authorization:
```

> **Note** > `-H Authorization:` removes the authorization header automatically added by `stepzen request` to demonstrate the fields are public.
