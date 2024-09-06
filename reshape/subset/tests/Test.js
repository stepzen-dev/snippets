const fs = require("fs");
const path = require("node:path");
const {
  deployAndRun,
  stepzen,
  getTestDescription,
} = require("../../../tests/gqltest.js");

testDescription = getTestDescription("snippets", __dirname);

const requestsFile = path.join(path.dirname(__dirname), "operations.graphql");
const requests = fs.readFileSync(requestsFile, "utf8").toString();

describe(testDescription, function () {
  const tests = [
    {
      label: "human",
      query: requests,
      operationName: "Human",
      expected: {
        human: {
          name: "Darth Vader",
          appearsIn: ["NEWHOPE", "EMPIRE", "JEDI"],
        },
      },
    },
    {
      label: "version",
      query: "{version { __typename}}",
      expected: { version: { __typename: "Version" } },
    },
  ];
  return deployAndRun(__dirname, tests, stepzen.admin);
});
