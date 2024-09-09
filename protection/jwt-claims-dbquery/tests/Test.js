const fs = require("fs");
const path = require("node:path");
const {
  deployAndRun,
  runtests,
  GQLHeaders,
  endpoint,
  getTestDescription,
} = require("../../../tests/gqltest.js");

testDescription = getTestDescription("snippets", __dirname);

const requestsFile = path.join(path.dirname(__dirname), "operations.graphql");
const requests = fs.readFileSync(requestsFile, "utf8").toString();

describe(testDescription, function () {
  // just deploy
  deployAndRun(__dirname, [], undefined);

  // and then run with various JWTs
  runtests(
    "regions-in",
    endpoint,
    new GQLHeaders().withToken(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1IiwicmVnaW9ucyI6WyJJTiJdfQ.hDi3-qaIOSFKzlFvaXwSh0trXC3vjiOehSKE0OxgOdE"
    ),
    [
      {
        label: "customers",
        query: requests,
        operationName: "Customers",
        expected: {
          customers: [
            {
              id: "10",
              name: "Salma Khan                                        ",
              city: "Delhi               ",
              region: "IN                  ",
            },
          ],
        },
      },
    ]
  );
  runtests(
    "regions-in-uk",
    endpoint,
    new GQLHeaders().withToken(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1IiwicmVnaW9ucyI6WyJJTiIsIlVLIl19.CRD85IIMMwjaFebtQ_p3AjSoUM6KtH4gvjcfLQfdmjw"
    ),
    [
      {
        label: "customers",
        query: requests,
        operationName: "Customers",
        expected: {
          customers: [
            {
              id: "3",
              name: "Salim Ali                                         ",
              city: "London              ",
              region: "UK                  ",
            },
            {
              id: "4",
              name: "Jane Xiu                                          ",
              city: "Edinburgh           ",
              region: "UK                  ",
            },
            {
              id: "10",
              name: "Salma Khan                                        ",
              city: "Delhi               ",
              region: "IN                  ",
            },
          ],
        },
      },
    ]
  );
  runtests(
    "regions-us-uk",
    endpoint,
    new GQLHeaders().withToken(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1IiwicmVnaW9ucyI6WyJVUyIsIlVLIl19.pf0-A6TN_hT-ldCvsZyqYGv4Twjm9s6wO1aatCjK9Aw"
    ),
    [
      {
        label: "customers",
        query: requests,
        operationName: "Customers",
        expected: {
          customers: [
            {
              id: "1",
              name: "Lucas Bill                                        ",
              city: "Boston              ",
              region: "US                  ",
            },
            {
              id: "2",
              name: "Mandy Jones                                       ",
              city: "Round Rock          ",
              region: "US                  ",
            },
            {
              id: "3",
              name: "Salim Ali                                         ",
              city: "London              ",
              region: "UK                  ",
            },
            {
              id: "4",
              name: "Jane Xiu                                          ",
              city: "Edinburgh           ",
              region: "UK                  ",
            },
            {
              id: "5",
              name: "John Doe                                          ",
              city: "Miami               ",
              region: "US                  ",
            },
            {
              id: "6",
              name: "Jane Smith                                        ",
              city: "San Francisco       ",
              region: "US                  ",
            },
            {
              id: "7",
              name: "Sandeep Bhushan                                   ",
              city: "New York            ",
              region: "US                  ",
            },
            {
              id: "8",
              name: "George Han                                        ",
              city: "Seattle             ",
              region: "US                  ",
            },
            {
              id: "9",
              name: "Asha Kumari                                       ",
              city: "Chicago             ",
              region: "US                  ",
            },
          ],
        },
      },
      {
        label: "customers-filter",
        query: requests,
        operationName: "Customers",
        variables: {
          f: { city: { eq: "London" } },
        },
        expected: {
          customers: [
            {
              id: "3",
              name: "Salim Ali                                         ",
              city: "London              ",
              region: "UK                  ",
            },
          ],
        },
      },
    ]
  );
});
