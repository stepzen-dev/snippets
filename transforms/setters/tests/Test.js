const fs = require("fs");
const path = require("node:path");
const {
  deployAndRun,
  stepzen,
  getTestDescription,
} = require("../../../tests/gqltest.js");

testDescription = getTestDescription("snippets", __dirname);

const requestsFile = path.join(path.dirname(__dirname), "requests.graphql");
const requests = fs.readFileSync(requestsFile, "utf8").toString();

describe(testDescription, function () {
  const tests = [
    {
      label: "customer-by-id-1",
      query: requests,
      operationName: "CustomerByID",
      variables: { id: 1 },
      expected: {
        customerByID: {
          address: {
            city: "Raleigh",
            country: "USA",
            state: "NC",
          },
          id: "12345",
          name: "John Doe",
        },
      },
    },
    {
      label: "customer-by-id-100",
      query: requests,
      operationName: "CustomerByID",
      variables: { id: 100 },
      expected: {
        customerByID: {
          address: {
            city: "Hyderabad",
            country: "India",
            state: "TS",
          },
          id: "21345",
          name: "Siddarth A",
        },
      },
    },
  ];
  return deployAndRun(__dirname, tests, stepzen.admin);
});
