This repo contains `.graphql` (and in some case, config.yaml files) for various "self-contained" example code for doing simple operations in StepZen

To run these examples, 
- `git clone git@github.com:https://...`
- Change to the right working directory.
- run `stepzen start`

## transforms (an argument of @rest)
These are available in `/transforms`:

- `/filter` shows how the response of a REST API can be filtered
- `/combineintostring` shows how a new field in the return type can be created by concatenating some other fields (like address parts into one address)
- `/jsonobjectToJsonarray` shows how an array of data (say coords) can be converted into an object, `{"lat":, "lon",..}` so that it can be fed into some other system that requires data to be expressed that way
- `/jsonobjectToJsonarray` shows how an object (typically where each key is an id of a record) can be converted into an array (e.g., `{"1":{"name": "john"}, "2": "jane"}` can be converted to `[{"id":"1", "name": "john"}, {"id":"2", name: "jane"}]`), so that it can then behave well for GraphQL processing.

## @sequence
These are available in `/sequence`:

- `/arguments` shows how query arguments get passed down a sequence
- `/forLoops` shows how sequence acts as a nested for loop
- `/transformsInMaterializer` shows how connecting two subgraphs can invoke transformations in between. For example, the `city` of a customer can be fed into a `weather` that takes `lat,lon` by calling some geocoding in the sequence
- `/useOfJSON` shows how, in long sequences, a new type does not have to created for every step--treat everything as JSON up to the last step, and your type system stays clean.

## protection
In `/protection`, you will find several subdirectories. Each contains a `.graphql` file, and `index.graphql` file and a `config.yaml` settings (which enables you to get extremely granular (or coarse) with protecting who can call what query/mutation). 

- `/makeAllPublic` shows how you can easily make all queries public.
- `/makeSomePublic` shows how you can make some public, and some private (which can still be accessed using your `admin` or `service` keys)
- `/checkQueryParameters` shows how private queries can still be accessed publicly provided some specific conditions are met. This allows you to get extremely granular.

## rest calls and responses
Where possible, we use [httpbin.org](http://httpbin.org) as our REST endpoint, since it allows us to mimic lots of REST capabilities.

In the repos below, we have given the code that you will likely not handwrite, you will just use `stepzen import curl` but it is worthwhile to look at the generated code, which is what we will use to show different ways in which REST calls can be made, and the responses be modified.

- `/restWithParameters` shows how GraphQL query arguments are automatically added to the REST call--there is nothing for you to do!
- `/restWithConfigYaml` shows how REST query parameters can also be fetched from `config.yaml`--this allows you to keep your SDL code separate from your secrets.
- `/postbody` shows how a POST body can be automatically filled with query arguments when the `Content-Type:application/x-www-form-urlencoded`. This is the easiest way to send postbodies down the REST API
- `/morecomplexpost` shows how a POST body can be filled with query arguments using `{{.Get \"name-of-query-argument\"}}` when the `Content-Type:application/x-www-form-urlencoded`. 
