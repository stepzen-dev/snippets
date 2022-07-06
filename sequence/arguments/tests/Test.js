const {
  deployAndRun,
  KeyType,
} = require("../../../tests/gqltest.js");

describe("sequence/arguments", function () {
  const tests = [
    { label: "customer(1)", 
      fieldSelection: "{customer(id:1){name city weather{temp}}}", 
      expected: {customer: { name: "John Doe", city: "Miami", weather: { temp: 100.0, }}},
      keyType: KeyType.admin,
    },
    { label: "customer(2)",
      fieldSelection: "{customer(id:2){name city weather{temp}}}",
      expected:  {customer: {name: "Jane Smith", city: "Santa Clara", weather: {temp: 60.4, },},},
      keyType: KeyType.admin,
    },
  ]
  return deployAndRun(__dirname, tests);
});

/*
  it("deploy", function () {
    this.timeout(10000);
    return deployEndpoint(endpoint, __dirname);
  });

  tests.forEach(({label, fieldSelection, expected}) => {
    it(label, function () {
      return runGqlOk(endpoint, fieldSelection).then(
        function (response) {
          expectData(response, expected);
          });
        });
    });
});
*/