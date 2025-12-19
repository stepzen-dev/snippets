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
  const CURSOR = "eyJjIjoiTDpRdWVyeTpjdXN0b21lcnMiLCJvIjoxfQ==";

  const tests = [
    {
      label: "first set of results",
      query: requests,
      operationName: "Customers",
      variables: {
        first: 2,
      },
      expected: {
        customers: {
          edges: [
            {
              node: {
                id: "1",
                name: "Lucas Bill                                        ",
              },
            },
            {
              node: {
                id: "2",
                name: "Mandy Jones                                       ",
              },
            },
          ],
          pageInfo: {
            hasNextPage: true,
            endCursor: CURSOR,
          },
          totalEdges: 10,
        },
      },
    },
    {
      label: "next set of results",
      query: requests,
      operationName: "Customers",
      variables: {
        first: 2,
        after: CURSOR,
      },
      expected: {
        customers: {
          edges: [
            {
              node: {
                id: "3",
                name: "Salim Ali                                         ",
              },
            },
            {
              node: {
                id: "4",
                name: "Jane Xiu                                          ",
              },
            },
          ],
          pageInfo: {
            endCursor: "eyJjIjoiTDpRdWVyeTpjdXN0b21lcnMiLCJvIjozfQ==",
            hasNextPage: true,
          },
          totalEdges: 10,
        },
      },
    },
    {
      label: "lookup-filter",
      query: requests,
      operationName: "Lookup",
      variables: {
        first: 2,
        f: {
          or: {
            name: { eq: "John Doe" },
            email: { eq: "jane.smith@example.com" },
          },
        },
      },
      expected: {
        customers: {
          edges: [
            {
              node: {
                id: "5",
                name: "John Doe                                          ",
                email: "john.doe@example.com                              ",
              },
            },
            {
              node: {
                id: "6",
                name: "Jane Smith                                        ",
                email: "jane.smith@example.com                            ",
              },
            },
          ],
          pageInfo: {
            hasNextPage: true,
            endCursor: "eyJjIjoiTDpRdWVyeTpsb29rdXAiLCJvIjoxfQ==",
          },
          totalEdges: 2,
        },
      },
    },
  ];
  return deployAndRun(__dirname, tests, stepzen.admin);
});
