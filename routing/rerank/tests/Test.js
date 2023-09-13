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
      label: "asc",
      query: requests,
      variables: { count: 6, type: "asc" },
      operationName: "CreateAndSort",
      expected: {
        createAndSort: {
          docs: [
            {
              content: "2",
              distance: 0.20008059867222983,
            },
            {
              content: "0",
              distance: 0.7098480789645691,
            },
            {
              content: "4",
              distance: 0.7572533686161478,
            },
            {
              content: "5",
              distance: 0.845018010741569,
            },
            {
              content: "1",
              distance: 0.9742682568157761,
            },
            {
              content: "3",
              distance: 0.9750469207183414,
            },
          ],
        },
      },
      authType: authTypes.adminKey,
    },
    {
      label: "desc",
      query: requests,
      variables: { count: 3, type: "desc" },
      operationName: "CreateAndSort",
      expected: {
        createAndSort: {
          docs: [
            {
              content: "1",
              distance: 0.9742682568157761,
            },
            {
              content: "0",
              distance: 0.7098480789645691,
            },
            {
              content: "2",
              distance: 0.20008059867222983,
            },
          ],
        },
      },
      authType: authTypes.adminKey,
    },
    {
      label: "noop",
      query: requests,
      variables: { count: 5, type: "noop" },
      operationName: "CreateAndSort",
      expected: {
        createAndSort: {
          docs: [
            {
              content: "0",
              distance: 0.7098480789645691,
            },
            {
              content: "1",
              distance: 0.9742682568157761,
            },
            {
              content: "2",
              distance: 0.20008059867222983,
            },
            {
              content: "3",
              distance: 0.9750469207183414,
            },
            {
              content: "4",
              distance: 0.7572533686161478,
            },
          ],
        },
      },
      authType: authTypes.adminKey,
    },
    {
      label: "nothing",
      query: requests,
      variables: { count: 25, type: "nothing" },
      operationName: "CreateAndSort",
      expected: {
        createAndSort: null,
      },
      authType: authTypes.adminKey,
    },
    {
      label: "reRank field",
      query: requests,
      variables: {
        docs: [
          {
            content: "0",
            distance: 0.7098480789645691,
          },
          {
            content: "1",
            distance: 0.9742682568157761,
          },
          {
            content: "2",
            distance: 0.20008059867222983,
          },
          {
            content: "3",
            distance: 0.9750469207183414,
          },
          {
            content: "4",
            distance: 0.7572533686161478,
          },
        ],
        type: "asc",
      },
      operationName: "reRank",
      expected: {
        reRank: {
          docs: [
            {
              content: "2",
              distance: 0.20008059867222983,
            },
            {
              content: "0",
              distance: 0.7098480789645691,
            },
            {
              content: "4",
              distance: 0.7572533686161478,
            },
            {
              content: "1",
              distance: 0.9742682568157761,
            },
            {
              content: "3",
              distance: 0.9750469207183414,
            },
          ],
        },
      },
      authType: authTypes.adminKey,
    },
  ];
  return deployAndRun(__dirname, tests);
});
