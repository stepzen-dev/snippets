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
      label: "hominoid",
      query: requests,
      operationName: "Hominoid",
      expected: {
        hominoid: {
          name: "Leia Organa",
        },
      },
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
    },
    {
      label: "humanName",
      query: requests,
      operationName: "HumanName",
      expected: {
        humanName: "Leia Organa",
      },
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
    },
    {
      label: "humanFriendsNames",
      query: requests,
      operationName: "HumanFriendsNames",
      expected: {
        humanFriendsNames: ["C-3PO", "Han Solo", "Luke Skywalker", "R2-D2"],
      },
    },
  ];
  return deployAndRun(__dirname, tests, stepzen.admin());
});
