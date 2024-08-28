const {
  deployAndRun,
  authTypes,
  getTestDescription,
} = require("../../../../tests/gqltest.js");

testDescription = getTestDescription("snippets", __dirname);

describe(testDescription, function () {
  const tests = [
  ]
  return deployAndRun(__dirname, tests);
});