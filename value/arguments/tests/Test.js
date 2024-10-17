const {
    deployAndRun,
    stepzen,
    getTestDescription,
  } = require("../../../tests/gqltest.js");

  testDescription = getTestDescription("snippets", __dirname);

  describe(testDescription, function () {
    const tests = [
      { label: "emptyCustomer with return null",
        query: '{emptyCustomer(id:1){name city }}',
        expected: {emptyCustomer: null},
      },
      { label: "customer(1)",
        query: '{customer(id:1){name city }}',
        expected: {customer: {name:'John Doe',city:'Miami'}},
      },
      { label: "customer(2) with pass default state value",
        query: '{customer(id:2){name city state }}',
        expected: {customer: {name:'John Doe',city:'Miami',state:"Florida"}},
      },
      { label: "return pi const value 3.14159",
        query: '{pi}',
        expected: {pi:3.14159},
      },
    ]
    return deployAndRun(__dirname, tests, stepzen.admin);
  });

