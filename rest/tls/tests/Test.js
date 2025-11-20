const fs = require("fs");
const path = require("node:path");
const {
  deployAndRun,
  stepzen,
  getTestDescription,
} = require("../../../tests/gqltest.js");

testDescription = getTestDescription("snippets", __dirname);

describe(testDescription, function () {
  // empty tests since this test is not valid for SaaS
  const tests = [];
  return deployAndRun(__dirname, tests, stepzen.admin);
});
