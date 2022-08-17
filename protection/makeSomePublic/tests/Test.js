const {
  deployAndRun,
  authTypes,
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
      authType: authTypes.adminKey,
    },
    {
      label: "customer(2)",
      query: "{customer(id:2){name city}}",
      expected: {
        customer: { name: "Jane Smith", city: "Santa Clara" },
      },
      authType: authTypes.adminKey,
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
      authType: authTypes.adminKey,
    },
  ];
  return deployAndRun(__dirname, tests);
});
