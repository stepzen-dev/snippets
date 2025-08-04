const fs = require('fs');
const path = require("node:path");
const {
  deployAndRun,
  stepzen,
  getTestDescription,
} = require("../../../tests/gqltest.js");

testDescription = getTestDescription("snippets", __dirname);

const requestsFile = path.join(path.dirname(__dirname), 'requests.graphql');
const requests = fs.readFileSync(requestsFile, 'utf8').toString();

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
      query: requests,
      operationName: 'CustomersPageNumber',
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
    },
    {
      label: "customerPageNumber-11-20",
      query: requests,
      operationName: 'CustomersPageNumber',
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
    },
    {
      label: "customerPageNumber-21-23",
      query: requests,
      operationName: 'CustomersPageNumber',
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
    },
    {
      label: "firstCustomer",
      query: requests,
      operationName: 'FirstCustomer',
      expected: {
        firstCustomer: generateNodes(1, 1)[0].node,
      },
    },
    {
      label: "firstNCustomers",
      query: requests,
      operationName: 'FirstNCustomers',
      variables: { first: 5 },
      expected: {
        nCustomers: generateNodes(1, 5).map(edge => edge.node),
      },
    },
    {
      label: "customersOffset-1-10",
      query: requests,
      operationName: 'CustomersOffset',
      variables: { first: 10 },
      expected: {
        customersOffset: {
          edges: generateNodes(1, 10),
          pageInfo: {
            endCursor:
              "eyJjIjoiTzpRdWVyeTpjdXN0b21lcnNPZmZzZXQiLCJvIjo5fQ==",
            hasNextPage: true,
          },
        },
      },
    },
    {
      label: "customersOffset-10-20",
      query: requests,
      operationName: 'CustomersOffset',
      variables: { 
        first: 10,
        after: "eyJjIjoiTzpRdWVyeTpjdXN0b21lcnNPZmZzZXQiLCJvIjo5fQ=="
      },
      expected: {
        customersOffset: {
          edges: generateNodes(11, 20),
          pageInfo: {
            endCursor:
              "eyJjIjoiTzpRdWVyeTpjdXN0b21lcnNPZmZzZXQiLCJvIjoxOX0=",
            hasNextPage: true,
          },
        },
      },
    },
    {
      label: "customersOffset-21-23",
      query: requests,
      operationName: 'CustomersOffset',
      variables: {
        first: 10,
        after:
          "eyJjIjoiTzpRdWVyeTpjdXN0b21lcnNPZmZzZXQiLCJvIjoxOX0=",
      },
      expected: {
        customersOffset: {
          edges: generateNodes(21, 23),
          pageInfo: {
            endCursor:
              "eyJjIjoiTzpRdWVyeTpjdXN0b21lcnNPZmZzZXQiLCJvIjoyMn0=",
            hasNextPage: false,
          },
        },
      },
    },
  ];
  return deployAndRun(__dirname, tests, stepzen.admin);
});
