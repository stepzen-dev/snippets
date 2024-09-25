const {
  deployAndRun,
  stepzen,
  getTestDescription,
} = require("../../../tests/gqltest.js");

testDescription = getTestDescription("snippets", __dirname);

describe(testDescription, function () {
  const tests = [
    {
      label: "customer(1)",
      query: "{customer(id:1){name city}}",
      expected: {
        customer: { name: "John Doe", city: "Miami" },
      },
    },
    {
      label: "customer(2)",
      query: "{customer(id:2){name city}}",
      expected: {
        customer: { name: "Jane Smith", city: "Santa Clara" },
      },
    },
    {
      label: "customers",
      query: "{customers{name city}}",
      expected: {
        customers: [
          { name: "John Doe", city: "Miami" },
          { name: "Jane Smith", city: "Santa Clara" },
        ],
      },
    },
  ];
  return deployAndRun(__dirname, tests, stepzen.admin);
});
