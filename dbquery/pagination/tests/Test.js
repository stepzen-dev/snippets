const fs = require("fs");
const path = require("node:path");
const {
  deployAndRun,
  authTypes,
  getTestDescription,
} = require("../../../tests/gqltest.js");

testDescription = getTestDescription("snippets", __dirname);

const requestsFile = path.join(path.dirname(__dirname), "requests.graphql");
const requests = fs.readFileSync(requestsFile, "utf8").toString();

describe(testDescription, function () {
  const CURSOR = "eyJjIjoiTDpRdWVyeTpjdXN0b21lcnMiLCJvIjoxfQ=="

  const tests = [
    {
      label: "first set of results",
      query: requests,
      operationName: "CustomersConnectionBased",
      variables: { 
        first: 2 
      },
      expected: {
        customers: {
          edges: [
            { 
              node: { 
                id: "1", 
                name: "Lucas Bill                                        " 
              } 
            },
            { 
              node: { 
                id: "2", 
                name: "Mandy Jones                                       " 
              } 
            }
          ],
          pageInfo: {
            hasNextPage: true,
            endCursor: CURSOR
          }
        }
      },
      authType: authTypes.adminKey,
    },
    {
      label: "next set of results",
      query: requests,
      operationName: "CustomersConnectionBased",
      variables: {
        first: 2,
        after: CURSOR
      },
      expected: {
        customers: {
          edges: [
            {
              node: {
                id: "3",
                name: "Salim Ali                                         "
              }
            },
            {
              node: {
                id: "4",
                name: "Jane Xiu                                          "
              }
            }
          ],
          pageInfo: {
            endCursor: "eyJjIjoiTDpRdWVyeTpjdXN0b21lcnMiLCJvIjozfQ==",
            hasNextPage: true
          }
        }
      },
      authType: authTypes.adminKey,
    },
  ];
  return deployAndRun(__dirname, tests);
});
