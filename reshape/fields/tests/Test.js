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
      label: "hominoid",
      query: requests,
      operationName: "Hominoid",
      expected: {
        hominoid: {
          name: "Leia Organa",
        },
      },
      authType: authTypes.adminKey,
    },
    {
      label: "person",
      query: requests,
      operationName: "Person",
      expected: {
        person: {
          name: "Han Solo",
        },
      },
      authType: authTypes.adminKey,
    },
    {
      label: "defaultHero",
      query: requests,
      operationName: "DefaultHero",
      expected: {
        defaultHero: {
          name: "R2-D2",
        },
      },
      authType: authTypes.adminKey,
    },
    {
      label: "luke",
      query: requests,
      operationName: "Luke",
      expected: {
        luke: {
          name: "Luke Skywalker",
        },
      },
      authType: authTypes.adminKey,
    },
    {
      label: "robot",
      query: requests,
      operationName: "Robot",
      expected: {
        robot: {
          name: "C-3PO",
        },
      },
      authType: authTypes.adminKey,
    },
    {
      label: "robotDefault",
      query: requests,
      operationName: "RobotDefault",
      expected: {
        robot: {
          name: "R2-D2",
        },
      },
      authType: authTypes.adminKey,
    },
    {
      label: "humanName",
      query: requests,
      operationName: "HumanName",
      expected: {
        humanName: "Leia Organa",
      },
      authType: authTypes.adminKey,
    },
    {
      label: "droidFriends",
      query: requests,
      operationName: "DroidFriends",
      expected: {
        droidFriends: [
          {
            name: "Han Solo",
            homePlanet: null,
          },
          {
            name: "Leia Organa",
            homePlanet: "Alderaa",
          },
          {
            name: "Luke Skywalker",
            homePlanet: "Tatooine",
          },
          {
            name: "R2-D2",
            primaryFunction: "Astromech",
          },
        ],
      },
      authType: authTypes.adminKey,
    },
    {
      label: "humanFriendsNames",
      query: requests,
      operationName: "HumanFriendsNames",
      expected: {
        humanFriendsNames: ["C-3PO", "Han Solo", "Luke Skywalker", "R2-D2"],
      },
      authType: authTypes.adminKey,
    },
  ];
  return deployAndRun(__dirname, tests);
});
