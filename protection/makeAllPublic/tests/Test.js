const fs = require("fs");
const path = require("node:path");
const {
  deployAndRun,
  stepzen,
  getTestDescription,
} = require("../../../tests/gqltest.js");

testDescription = getTestDescription("snippets", __dirname);

const requestsFile = path.join(path.dirname(__dirname), "operations.graphql");
const requests = fs.readFileSync(requestsFile, "utf8").toString();

describe(testDescription, function () {
  // note tests using no authorization since api is public
  const tests = [
    {
      label: "customer-1",
      query: requests,
      operationName: "Customer",
      variables: {
        id: 1,
      },
      expected: {
        customer: {
          name: "John Doe",
          city: "Miami",
        },
      },
    },
    {
      label: "customer-2",
      query: requests,
      operationName: "Customer",
      variables: {
        id: 2,
      },
      expected: {
        customer: {
          name: "Jane Smith",
          city: "Santa Clara",
        },
      },
    },
  ];
  return deployAndRun(__dirname, tests, stepzen.public());
});
