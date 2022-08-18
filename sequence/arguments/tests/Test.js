const {
  deployAndRun,
  authTypes,
  getTestDescription,
} = require("../../../tests/gqltest.js");

testDescription = getTestDescription("snippets", __dirname);

describe(testDescription, function () {
  const tests = [
    { label: "customer(1)", 
      query: "{customer(id:1){name city weather{temp}}}", 
      expected: {customer: { name: "John Doe", city: "Miami", weather: { temp: 100.0, }}},
      authType: authTypes.adminKey,
    },
    { label: "customer(2)",
      query: "{customer(id:2){name city weather{temp}}}",
      expected:  {customer: {name: "Jane Smith", city: "Santa Clara", weather: {temp: 60.4, },},},
      authType: authTypes.adminKey,
    },
  ]
  return deployAndRun(__dirname, tests);
});