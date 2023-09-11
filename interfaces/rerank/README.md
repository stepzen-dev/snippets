`@supplies` directive connects a field selection on a concrete type to an interface request. 

For example, you can use interface queries when you want to be able to run the same field request against multiple backends.

This same feature can also be used to provide alternative logic to execute when a field is selected.

In this snippet we introduce a very generic interface `JSONDocs` that has a single field to contain a `JSON` field `docs`, and a single implementation of that interface `Concrete`.

```
interface JSONDocs {
    docs: JSON
}

type Concrete implements JSONDocs {
    docs: JSON
}
```

This snippet demonstrates the alternative execution paths, with `reRank` field selection being *supplied* by the fields `reRankAsc`, `reRankDesc`, and `reRankNoop`.

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

