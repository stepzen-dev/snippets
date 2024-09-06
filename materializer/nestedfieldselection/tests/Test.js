const {
  deployAndRun,
  stepzen,
  getTestDescription,
} = require("../../../tests/gqltest.js");

testDescription = getTestDescription("snippets", __dirname);

describe(testDescription, function () {
  const tests = [
    { label: "book", 
      query: "{book {refId name author {name country} content {id text summary}}}", 
      expected: {"book": {
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
        },
    },
  ]
  return deployAndRun(__dirname, tests, stepzen.admin);
});