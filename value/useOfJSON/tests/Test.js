const {
    deployAndRun,
    stepzen,
    getTestDescription,
  } = require("../../../tests/gqltest.js");

  testDescription = getTestDescription("snippets", __dirname);

  describe(testDescription, function () {
    const tests = [
      { label: "return sum of two input using @value with JSONATA",
        query: '{sum(a: 10, b: 10)}',
        expected: {sum: 20},
      },
      { label: "convert lower string",
        query: '{lower(value: "mIAmI")}',
        expected: {lower: 'miami'},
      },
      { label: "convert upper string",
        query: '{upper(value: "mIaMi")}',
        expected: {upper: 'MIAMI'},
      },
      { label: "concat string",
        query: '{concat(a: "Steve",b:"Jobs" )}',
        expected: {concat: 'Steve-Jobs'},
      },
    ]
    return deployAndRun(__dirname, tests, stepzen.admin);
  });

