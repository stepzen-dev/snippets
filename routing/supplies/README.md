# `@supplies` routing

## Overview

An abstract `Query` or `Mutation` field with no backend annotations (e.g. no `@rest` etc.) can be resolved
though supplying `Query` or `Mutation` fields that implement the abstract type.

Without any routing all of the supplying fields are executed when the abstact field is selected and
the result is derived from the set of results.

Routing, using the `if` argument to `@supplies` allows a supplying field to only be invoked
based upon a condition against its field arguments.

## Example

The abstract field in `Query` is:
```graphql
expected(id:ID):Delivery
```
which given a tracking identifier returns when a package is expected.

It is supplied by two fields, each with a condition.

```graphql
  fp(id: ID!): FastPackage
    @supplies(query: "expected" if: { src: "id.startsWith('FP-')" })
  ros(id: ID!): RainOrShine
    @supplies(query: "expected", if: { src: "id.startsWith('ROS-')" })
```
> **Note**
> Implementation of the fields (`@rest`) have been omitted for brevity.

The script `src` must be ECMAScript 5.1 and the field's arguments
are available as global variables.

If the returned value is `true` (ECMAScript `ToBoolean` conversion) then
the field is invoked, otherwise its value is `null`.

Thus in this example if the tacking identifier starts with `FP-` a call
is made to the FastPackage REST api, if it starts with `ROS-` a call to
the `RainOrShine` REST api is called, otherwise no call is made.

> **Note**
> The supplying fields can have any implementation, FastPackage could
> be a GraphQL endpoint while RainOrShine a database query.

## Try it out
Login to your StepZen account, deploy the schema and then issue requests.

```shell
stepzen deploy

stepzen request -f operations.graphql --var id='FP-123'
stepzen request -f operations.graphql --var id='ROS-456'
stepzen request -f operations.graphql --var id='OTH-789'
```
