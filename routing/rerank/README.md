# `@supplies` alternative execution paths

## Overview

An abstract `Query` or `Mutation` field with no backend annotations (e.g. no `@rest~` etc.) can be resolved though supplying `Query` or `Mutation` fields that implement the abstract type.

Without any routing all of the supplying fields are executed when the abstract field is selected and the result is derived from the set of results.

Routing, using the `if` argument to `@supplies` allows a supplying field to only be invoked based upon a condition against its field arguments. See the [routing/supplies snippet](https://github.com/stepzen-dev/snippets/tree/main/routing/supplies).

This feature can also be used to provide alternative logic to execute when a field is selected.

## Example 

In this snippet we introduce a very generic interface `JSONDocs` that has a single field to contain a `JSON` field `docs`, and a single implementation of that interface `Concrete`.

```graphql
interface JSONDocs {
    docs: JSON
}

type Concrete implements JSONDocs {
    docs: JSON
}
```

The main field in `Query` is:
```graphql
 createAndSort (count: Int, type: String): JSONDocs
```
which uses `@sequence` to first creates an array of `count` elements and then optionally sorts the created array depending on the specified `type` an array of elements.

Note: See [these snippets](https://github.com/stepzen-dev/snippets/tree/main/sequence) for other uses of `@sequence`.

This snippet demonstrates the alternative execution paths. 

The abstract field in `Query` is:
```graphql
_reRank (docs: JSON, type: String): JSONDocs
```

and it is supplied by the three fields in `Query`
```graphql
 _reRankAsc ( docs: JSON, type: String): Concrete
 _reRankDesc (docs: JSON, type: String): Concrete
 _reRankNoop (docs: JSON, type: String): Concrete
```

The `@supplies` directive for each of these three fields specifies that the field *supplies* `_reRank`, and the `if:` argument specifies the condition of `type` that must be satisfied for this field to be executed when `_reRank` is requested.

So you can ask to have 10 elements created and put in ascending order according to the randomly generated distance:
```
query createAndSort {
  createAndSort(count: 5, type: "asc") {
    docs
  }
}
```

You should get something like the following result:

```
{
  "data": {
    "createAndSort": {
      "docs": [
        {
          "content": "4",
          "distance": 0.13254703006300933
        },
        {
          "content": "2",
          "distance": 0.17854698214270298
        },
        {
          "content": "3",
          "distance": 0.4329910198089866
        },
        {
          "content": "0",
          "distance": 0.5006544406073421
        },
        {
          "content": "1",
          "distance": 0.6477612950765871
        }
      ]
    }
  }
}
```

`stepzen start` in this directory and take it for a spin!  Try out `desc`, `noop`, and then your own value!

