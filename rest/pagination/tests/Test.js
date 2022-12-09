const {
  deployAndRun,
  authTypes,
  getTestDescription,
} = require("../../../tests/gqltest.js");

testDescription = getTestDescription("snippets", __dirname);

const cpn = `
query ($first:Int! $after:String) {
  customersPageNumber(first: $first after:$after) {
    edges {
      node {
        id
        name
        email
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
`;

function generateNodes(start, end) {
  nodes = [];
  for (let i = start; i <= end; i++) {
    nodes.push({
      node: {
        id: i.toString(),
        name: "name-" + i,
        email: "user-" + i + "@example.com",
      },
    });
  }
  return nodes;
}

describe(testDescription, function () {
  const tests = [
    {
      label: "customerPageNumber-1-10",
      query: cpn,
      variables: { first: 10 },
      expected: {
        customersPageNumber: {
          edges: generateNodes(1, 10),
          pageInfo: {
            endCursor:
              "eyJjIjoiUDpRdWVyeTpjdXN0b21lcnNQYWdlTnVtYmVyIiwicCI6MSwibCI6MTAsIm8iOjl9",
            hasNextPage: true,
          },
        },
      },
      authType: authTypes.adminKey,
    },
    {
      label: "customerPageNumber-11-20",
      query: cpn,
      variables: {
        first: 10,
        after:
          "eyJjIjoiUDpRdWVyeTpjdXN0b21lcnNQYWdlTnVtYmVyIiwicCI6MSwibCI6MTAsIm8iOjl9",
      },
      expected: {
        customersPageNumber: {
          edges: generateNodes(11, 20),
          pageInfo: {
            endCursor:
              "eyJjIjoiUDpRdWVyeTpjdXN0b21lcnNQYWdlTnVtYmVyIiwicCI6MiwibCI6MTAsIm8iOjl9",
            hasNextPage: true,
          },
        },
      },
      authType: authTypes.adminKey,
    },
    {
      label: "customerPageNumber-21-23",
      query: cpn,
      variables: {
        first: 10,
        after:
          "eyJjIjoiUDpRdWVyeTpjdXN0b21lcnNQYWdlTnVtYmVyIiwicCI6MiwibCI6MTAsIm8iOjl9",
      },
      expected: {
        customersPageNumber: {
          edges: generateNodes(21, 23),
          pageInfo: {
            endCursor:
              "eyJjIjoiUDpRdWVyeTpjdXN0b21lcnNQYWdlTnVtYmVyIiwicCI6MywibCI6MTAsIm8iOjJ9",
            hasNextPage: false,
          },
        },
      },
      authType: authTypes.adminKey,
    },
  ];
  return deployAndRun(__dirname, tests);
});
