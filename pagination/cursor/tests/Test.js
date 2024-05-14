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
      label: "first results",
      query: requests,
      operationName: "FirstResults",
      expected: {
        paginatedCustomers: {
          edges: [
            { node: { id: "1", name: "Lucas Bill                                        " } },
            { node: { id: "2", name: "Mandy Jones                                       " } }
          ],
          pageInfo: {
            hasNextPage: true,
            endCursor: "eyJjIjoiTDpRdWVyeTpwYWdpbmF0ZWRDdXN0b21lcnMiLCJvIjoxfQ=="
          }
        }
      },
      authType: authTypes.adminKey,
    },
    {
      label: "next results",
      query: requests,
      operationName: "NextResults",
      expected: {
        paginatedCustomers: {
          edges: [
            { node: { id: "3", name: "Salim Ali                                         " } },
            { node: { id: "4", name: "Jane Xiu                                          " } }
          ]
        }
      },
      authType: authTypes.adminKey,
    },
  ];
  return deployAndRun(__dirname, tests);
});
