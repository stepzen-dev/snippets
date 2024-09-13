const fs = require("fs");
const path = require("node:path");

const {
  deployAndRun,
  getTestDescription,
} = require("../../../tests/gqltest.js");

testDescription = getTestDescription("snippets", __dirname);

const requestsFile = path.join(path.dirname(__dirname), "operations.graphql");
const requests = fs.readFileSync(requestsFile, "utf8").toString();

describe(testDescription, function () {
  const tests = [
    {
      label: "customer",
      query: requests,
      operationName: "Customer",
      variables: {
        id: 1238,
      },
      expected: {
        customer: {
          id: "1238",
          name: "Baumbach",
          email: "maxinebashirian@hilpert.com",
          address: {
            city: "New Schroeder",
            zip: "36897",
          },
        },
      },
    },
  ];
  return deployAndRun(__dirname, tests);
});
