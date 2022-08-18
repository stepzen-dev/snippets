`@materializer` allows the developer to seamlessly extend a type with data by executing an operation, sometimes with arguments supplied by the extended type. 

Sometimes for schema curation or celanliness the desried value of the field is from a nested value of the operation, for example, just picking a `city` from an `Address`  type.  The @materializer directive provides the ability to 
specify a single field selection path.  This snippet demonstrates how to do this.

Assume that the schema contains documents of type `Document` with `content` and `author`, and that `content` has a required identifier provided by any request, and that the query operation only exposes direct access to the document, and not to the individual `content` and `author`:

```
type Document {
   docId: String
   content(id: String!): Content
   author: Author 
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
```

The schema evolves to represent books with names and a reference to the Document content from the previous types. Perhaps these types come from different backends. 

```
type Book {
  refId: String!
  name: String
} 

type Query {
  book: Book
}
```

But the `book` information with only `title` and a `refID` is rather meaningless, and any application will also want to see `author` and `content` from `{document {content}}` as first class citizens of type `book`.  With @materializer we can do this naturally using selection sets: 

```
extend type Book {
  author: Author @materializer (query: "document {author}")
  content: Content @materializer (query: "document {content}", arguments: {name: "id", field: "refId"})
}
```

Note that since the `author` field of a `Document` type does not take arguments, there are no arguments specified.  If they did take arguments, since there is no `arguments` specified for the `@materializer`, they would implicitly map to any field of `Book` with the same name.   For `content` the `@materializer` directive expliclty maps the argument `id` of the referenced `{document {content}}` field to the `{book {refId}}` field.  

Now, to use this information, the developer does not need to know that their `book` information comes from different backends, they can simplify issue the following query to get the desired result:

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

