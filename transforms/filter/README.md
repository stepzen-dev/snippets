### Tranforms: Filtering

## ECMAScript

The `ecmascript` argument is great for writing filters.
See https://stepzen.com/docs/custom-graphql-directives/directives#ecmascript for more information on `ecmascript`.
We are picturing a real-life scenario in which you call a backend using the `endpoint` argument.
See https://stepzen.com/docs/connecting-backends/how-to-connect-a-rest-service for more information on `@rest`.

### Quick try
```
stepzen deploy
stepzen request '{customer(name: "John Doe") {id name}}'
```

## JSONata

JSONata transforms provdes an alternate method for filtering
customer_1 uses the `[ ... ]` filter to return all "customers" (`$`) that
contain `name = the argument name`

The outer array constructor `[]` is used to defeat singleton sequence equivalence.

### Quick try
```
stepzen deploy
stepzen request '{customer_1(name: "John Doe") {id name}}'
```
