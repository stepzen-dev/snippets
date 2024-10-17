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
      label: "fetch all customers",
      query: requests,
      operationName: "Customers",
      variables: {},
      expected: {
        getAllCustomers: [
          { id: "1", name: "Lucas Bill                                        ", email: "lucas.bill@example.com                            " },
          { id: "2", name: "Mandy Jones                                       ", email: "mandy.jones@example.com                           " },
          { id: "3", name: "Salim Ali                                         ", email: "salim.ali@example.com                             " },
          { id: "4", name: "Jane Xiu                                          ", email: "jane.xiu@example.com                              " },
          { id: "5", name: "John Doe                                          ", email: "john.doe@example.com                              " },
          { id: "6", name: "Jane Smith                                        ", email: "jane.smith@example.com                            " },
          { id: "7", name: "Sandeep Bhushan                                   ", email: "sandeep.bhushan@example.com                       " },
          { id: "8", name: "George Han                                        ", email: "george.han@example.com                            " },
          { id: "9", name: "Asha Kumari                                       ", email: "asha.kumari@example.com                           " },
          { id: "10", name: "Salma Khan                                        ", email: "salma.khan@example.com                            " }
        ]
      },
    },
    {
      label: "fetch customer by ID",
      query: requests,
      operationName: "Customer",
      variables: { 
        id: 1  
      },
      expected: {
        getCustomerById: {
          id: "1",
          name: "Lucas Bill                                        ",
          email: "lucas.bill@example.com                            "
        }
      },
    },
  ];

  // Run the tests against the deployed schema
  return deployAndRun(__dirname, tests, stepzen.admin);
});
