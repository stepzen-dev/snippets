const {
  deployAndRun,
  stepzen,
  getTestDescription,
} = require("../../../tests/gqltest.js");

testDescription = getTestDescription("snippets", __dirname);

describe(testDescription, function () {
  const tests = [
    {
      label: "customer",
      query:
        '{customer(email:"alice@example.com") {id name email orders {cost}}}',
      expected: {
        customer: {
          id: "464979",
          name: "Lesch",
          email: "alice@example.com",
          orders: [
            {
              cost: 100,
            },
          ],
        },
      },
    },
    {
      label: "query-fields",
      query: "{__schema {queryType {fields {name}}}}",
      expected: {
        __schema: {
          queryType: {
            fields: [
              {
                name: "customer",
              },
            ],
          },
        },
      },
    },
  ];
  return deployAndRun(__dirname, tests, stepzen.regular);
});
