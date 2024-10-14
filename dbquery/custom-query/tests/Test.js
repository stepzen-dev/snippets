const fs = require("fs");
const path = require("node:path");
const {
  deployAndRun,
  stepzen,
  getTestDescription,
} = require("../../../tests/gqltest.js");

testDescription = getTestDescription("snippets", __dirname);

// Read the GraphQL operations from the operations file
const requestsFile = path.join(path.dirname(__dirname), "operations.graphql");
const requests = fs.readFileSync(requestsFile, "utf8").toString();

describe(testDescription, function () {
  const tests = [
    {
      label: "fetch customer by ID",
      query: requests,
      operationName: "GetCustomerById",
      variables: { 
        id: 1 
      },
      expected: {
        getCustomerById: {
          id: "1",
          name: "Lucas Bill",
          email: "lucas@example.com"
        }
      },
    },
    {
      label: "search customers by name pattern",
      query: requests,
      operationName: "SearchCustomersByName",
      variables: {
        name: "John"
      },
      expected: {
        searchCustomersByName: [
          {
            id: "2",
            name: "John Doe",
            email: "john@example.com"
          },
          {
            id: "5",
            name: "Johnny Smith",
            email: "johnny@example.com"
          }
        ]
      },
    },
  ];
  
  // Run the tests against the deployed schema
  return deployAndRun(__dirname, tests, stepzen.admin);
});
