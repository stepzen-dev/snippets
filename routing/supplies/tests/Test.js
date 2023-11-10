const fs = require("fs");
const path = require("node:path");
const {
  deployAndRun,
  authTypes,
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
      authType: authTypes.adminKey,
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
      authType: authTypes.adminKey,
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
      authType: authTypes.adminKey,
    },
    {
      label: "none",
      query: requests,
      variables: { id: "OTH-789" },
      expected: {
        expected: null,
      },
      authType: authTypes.adminKey,
    },
  ];
  return deployAndRun(__dirname, tests);
});
