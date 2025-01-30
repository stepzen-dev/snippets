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

describe(testDescription, function () {
  const tests = [
    {
      label: "customer-by-id-1",
      query: requests,
      operationName: 'CustomerByID',
      variables: { id: 1 },
      expected: {
        customerByID: {
          cAddress: {
            city: "Raleigh",
            country: "USA",
            state: "NC",
            street: "101 Main St",
            postalCode: "54321"
          },
          cId: "12345",
          cName: "John Doe"

        }
      }
    },
    {
      label: "customer-by-id-100",
      query: requests,
      operationName: 'CustomerByID',
      variables: { id: 100 },
      expected: {
        customerByID: {
          cAddress: {
            city: "Hyderabad",
            country: "India",
            state: "TS",
            street: "J.N.T.U Colony",
            postalCode: "654231"
          },
          cId: "21345",
          cName: "Siddarth A"

        }
      }
    }
  ]
  return deployAndRun(__dirname, tests, stepzen.admin);
});
