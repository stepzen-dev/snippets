# Pulling field arguments from JWT claims

This snippet shows how JWT claims can be used for field arguments.

This examples demonstrates a number of StepZen capabilities:

- Authorization using JWT
- Field access rules
- Field visibility rules
- `@value` directive with access to JWT claims
  - https://www.ibm.com/docs/en/api-connect/ace/saas?topic=directives-directive-value
- Reshaping

## Restricting access through JWT claims.

This example shows how a JWT claim may be used as a field argument, in this case the JWT subject claim
is used as a customer's identifier. Thus the customer can only view their own information even though
the backend database includes all customers.

The field `Query.customer` provides an identifier lookup to all customers. This field is restricted
from being executed by field visibility and access rules.

Instead a field `Query.me` is exposed with no field arguments that invokes `Query.customer`
with the customer identifier pulled from the `sub` claim in the request's JWT.

This is implemented using `@sequence` with the first step an intermediate field (`Query._myid`) that is annotated with `@value` using ECMAScript.
This script has access to field arguments of its annotated field (in this case none) and JWT claims through `$jwt`.
Thus it returns the `sub` claim which is then automatically mapped as a scalar value to the sole argument of
the next step in the sequence (`Query.customer(id:)`).

An alternate version of `Query._myid` exists `Query._my_id_jsonata` showing that scripts can be implemented in JSONata.
The default langauge is ECMAScript.

Note these concepts could be combined with field access through ABAC rules (see `protection/simpleABACSample`)
so that `Query.customer` could be exposed, but only customer service reps could call it
with any customer identifier.

## Try it out!

Deploy the schema from `protection/jwt-claims` relative to the repository's root directory:

```
stepzen deploy
```

Run the [sample operations](operations.graphql):

JWT with `sub: 5`.

JWT: https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1In0.LE_mbGsS2FbxF41r4wOYKhWdBoYhnIk0-6d6U7ibF-A

Secret Key: development-only

```
stepzen request -f operations.graphql --operation-name=Customer --header "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1In0.LE_mbGsS2FbxF41r4wOYKhWdBoYhnIk0-6d6U7ibF-A"
```

JWT with `sub: 9`.

JWT: https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1In0.LE_mbGsS2FbxF41r4wOYKhWdBoYhnIk0-6d6U7ibF-A

Secret Key: development-only

```
stepzen request -f operations.graphql --operation-name=Customer --header "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5In0.liX79YjQ1EIqdVSLqvKoVJxoj63OkBANwZLsZcdLzDM"
```
