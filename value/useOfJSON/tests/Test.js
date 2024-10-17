const {
    deployAndRun,
    stepzen,
    getTestDescription,
  } = require("../../../tests/gqltest.js");

  testDescription = getTestDescription("snippets", __dirname);

  describe(testDescription, function () {
    const tests = [
      { label: "return sum of two input using @value with script-json",
        query: '{sum(a: 10, b: 10)}',
        expected: {sum: 20},
      },
      { label: "concat string",
        query: '{concat(a: "Steve",b:"Jobs" )}',
        expected: {concat: 'Steve-Jobs'},
      },
    ]
    return deployAndRun(__dirname, tests, stepzen.admin);
  });

