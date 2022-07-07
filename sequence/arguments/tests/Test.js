const {
  deployAndRun,
  authTypes,
  getTestDescription,
} = require("../../../tests/gqltest.js");

testDescription = getTestDescription("snippets", __dirname);

describe(testDescription, function () {
  const tests = [
    { label: "customer(1)", 
      query: `{customer(id:1){name city weather{temp}}}`, 
      expected: {customer: { name: "John Doe", city: "Miami", weather: { temp: 100.0, }}},
      authType: authTypes.adminKey,
    },
    { label: "customer(2)",
      query: `{customer(id:2){name city weather{temp}}}`,
      expected:  {customer: {name: "Jane Smith", city: "Santa Clara", weather: {temp: 60.4, },},},
      authType: authTypes.adminKey,
    },
    { label: "customer(1) metric, customer(2) metric",
      query: `{customer1: customer(id: "1") {city name weather(units: "metric") {temp}}
             customer2: customer(id: "2") {city name weather(units: "metric") {temp}}}`,
      expected:   {customer1: {city: "Miami", name: "John Doe", weather: {temp: 37.77777777777778}},
                 customer2: {city: "Santa Clara", name: "Jane Smith", weather: {temp: 15.777777777777779}}},
      authType: authTypes.adminKey,
  },    
  ]
  return deployAndRun(__dirname, tests);
});