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
      label: "fast-package",
      query: requests,
      variables: { id: "FP-123" },
      expected: {
        expected: {
          when: "2023-08-29",
          note: "Package FP-123 is expected soon",
          distance: 17,
        },
      },
    },
    {
      label: "rain-or-shine",
      query: requests,
      variables: { id: "ROS-456" },
      expected: {
        expected: {
          when: "2023-09-01",
          note: "Package ROS-456 is on its way",
          weather: "dry and sunny",
        },
      },
    },
    {
      label: "tyd",
      query: requests,
      variables: { id: "TYD-789" },
      expected: {
        expected: {
          when: "2023-09-04",
          note: "Package TYD-789 is heading your way",
        },
      },
    },
    {
      label: "none",
      query: requests,
      variables: { id: "OTH-789" },
      expected: {
        expected: null,
      },
    },
  ];
  return deployAndRun(__dirname, tests, stepzen.admin);
});
