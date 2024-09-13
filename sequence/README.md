# @sequence

The custom directive `@sequence` resolves a field by execute a sequence of other fields, for example, fetching an authorization token
and then connecting to a backend.

View the [documentation](https://www.ibm.com/docs/en/api-connect/ace/saas?topic=directives-directive-sequence) on the custom directive `@sequence`.

## Snippets

- [arguments](arguments) shows how query arguments get passed down a sequence
- [forLoops](forLoops) shows how sequence acts as a nested for loop
- [transformsInMaterializer](transformsInMaterializer) shows how connecting two subgraphs can invoke transformations in between. For example, the`city`of a customer can be fed into a`weather`that takes`lat,lon` by calling some geocoding in the sequence
- [useOfJSON](useOfJSON) shows how, in long sequences, a new type does not have to created for every step--treat everything as JSON up to the last step, and your type system stays clean.
