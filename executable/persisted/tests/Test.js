const fs = require("fs");
const path = require("node:path");

const {
  deployAndRun,
  authTypes,
  getTestDescription,
} = require("../../../tests/gqltest.js");

testDescription = getTestDescription("snippets", __dirname);

const requestsFile = path.join(path.dirname(__dirname), "operations.graphql");
const requests = fs.readFileSync(requestsFile, "utf8").toString();

describe(testDescription, function () {
  const tests = [
    {
      label: "CustomerName",
      documentId:
        "sha256:9d50d8e35b5882139e836a126f5d6d5a28cf41c5efd80a6e67f920d284b5f6d0",
      operationName: "CustomerName",
      variables: {
        id: 1031,
      },
      expected: {
        customer: {
          name: "Tromp",
        },
      },
      authType: authTypes.adminKey,
    },
    {
      label: "CustomerName",
      documentId:
        "sha256:9d50d8e35b5882139e836a126f5d6d5a28cf41c5efd80a6e67f920d284b5f6d0",
      operationName: "CustomerEmail",
      variables: {
        id: 2845,
      },
      expected: {
        customer: {
          email: "marciaschinner@kub.io",
        },
      },
      authType: authTypes.adminKey,
    },
    {
      label: "Customer",
      documentId:
        "sha256:9d50d8e35b5882139e836a126f5d6d5a28cf41c5efd80a6e67f920d284b5f6d0",
      operationName: "Customer",
      variables: {
        id: 3293,
      },
      expected: {
        customer: {
          id: "3293",
          name: "Veum",
          email: null,
          phone: "5349179326",
          address: {
            city: "New Abshire",
            zip: "75624",
          },
        },
      },
      authType: authTypes.adminKey,
    },
  ];
  return deployAndRun(__dirname, tests);
});
