`@materializer` is a great way to link two graphs together
it takes the data from one graph, feeds it into a query of a second graph
and takes the returned data and makes it a field in the original graph
Sometimes the data needed from the second graph is nested, so @materialier provides the ability to 
specify a single field selection path.

Assume that an original graph `G` (this is the second graph as described above) contains documents of type `document` with `content` and `author`, and that `content` has a required identifier provided by any request.  `G` only exposes direct access to the document, and not to the individaul `content` and `author`:

```
type Document {
   docId: String
   content(id: String!): Content
     @materializer(query: "content", arguments:[{name: "id" argument:"id"}])
   author: Author 
     @materializer(query: "author")
   lastUpdate: Date
}

type Content @mock {
  id: String!
  text: String!
  summary: String!
}

type Author {
    name: String!
    country: String
}

type Query {
  document:  Document
       @rest(
       endpoint: "stepzen:empty"
       ecmascript: """
        function transformREST() { 
            const data = {
                author: {
                            name: 'Roy Derks',
                            country: 'Netherlands'
                        }
                        };
                const resp = JSON.stringify(data);
                return resp
            }
     """
       )
}
```

Another graph, `K`, represents books with names and a reference to the document content stored in `G`. 

type Book {
  refId: String!
  name: String
} 

type Query {
  book: Book
    @rest(
       endpoint: "stepzen:empty"
       ecmascript: """
        function transformREST() { 
            const data = {
                refId: '27',
                name: 'Fullstack GraphQL'
                };
                const resp = JSON.stringify(data);
                return resp
            }
     """
    )
}

But the `book` information with only `title` and a `refID` is rather meaningless, and any application will also want to see `author` and `content` from `G` as first class citizens of type `book`.  With @materializer we can do this naturally using nested selection sets: 

```
extend type Book {
  author: Author @materializer (query: "document {author}")
  content: Content @materializer (query: "document {content}", arguments: {name: "id", field: "refId"})
}
```

Note that since the `author` field of a `document` in `G` do not take arguments, there are no arguments specified.  If they did take arguments, since there is no `arguments` specified for the `@materializer`, they would implicitly map to any field of `Book` with the same name.   For `content` the `@materializer` directive expliclty maps the argument `id` of the referenced `{document {content}}` field to the `{book {refId}}` field.  

Now, to use this information, the developer does not need to know that their `book` information comes from different graphs, they can simpliy issue the following query to get the desired result:

```
query MyQuery {
  book {
    refId
    name
    author {
      name
      country
    }
    content {
      id
      text
      summary
    }
  }
}
```

With our mocked up data, you should get the following result:

```
{
  "data": {
    "book": {
      "name": "Fullstack GraphQL",
      "refId": "27",
      "content": {
        "id": "27",
        "summary": "Ut ultrices ultrices enim",
        "text": "Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis"
      },
      "author": {
        "country": "Netherlands",
        "name": "Roy Derks"
      }
    }
  }
}
```

`stepzen start` in this directory and take it for a spin!

Note: 
In order to make this snippet self-contained, you will see in the `api.graphql` we have added fields to the `query` just to materialize instances of `content` and `author`, but in a live system with data, these fields would likely not be exposed.

