const {
  deployAndRun,
  authTypes,
  getTestDescription,
} = require("../../../tests/gqltest.js");

testDescription = getTestDescription("snippets", __dirname);

describe(testDescription, function () {
  const tests = [
    { label: "asc", 
      query: "{createAndSort(count: 6, type: \"asc\") {docs}}", 
      expected: {
        "createAndSort": {
          "docs": [
            {
              "content": "2",
              "distance": 0.20008059867222983
            },
            {
              "content": "0",
              "distance": 0.7098480789645691
            },
            {
              "content": "4",
              "distance": 0.7572533686161478
            },
            {
              "content": "5",
              "distance": 0.845018010741569
            },
            {
              "content": "1",
              "distance": 0.9742682568157761
            },
            {
              "content": "3",
              "distance": 0.9750469207183414
            }
          ]
        }
      },
      authType: authTypes.adminKey,
    },
    { label: "desc", 
      query: "{createAndSort(count: 3, type: \"desc\") {docs}}", 
      expected:{
        "createAndSort": {
          "docs": [
            {
              "content": "1",
              "distance": 0.9742682568157761
            },
            {
              "content": "0",
              "distance": 0.7098480789645691
            },
            {
              "content": "2",
              "distance": 0.20008059867222983
            }
          ]
        }
      },
     authType: authTypes.adminKey,
    },
    { label: "noop", 
      query: "{createAndSort(count: 5, type: \"noop\") {docs}}", 
      expected:{
        "createAndSort": {
          "docs": [
            {
              "content": "0",
              "distance": 0.7098480789645691
            },
            {
              "content": "1",
              "distance": 0.9742682568157761
            },
            {
              "content": "2",
              "distance": 0.20008059867222983
            },
            {
              "content": "3",
              "distance": 0.9750469207183414
            },
            {
              "content": "4",
              "distance": 0.7572533686161478
            }
          ]
        }
      },
      authType: authTypes.adminKey,
    },
    { label: "nothing", 
    query: "{createAndSort(count: 25, type: \"nothing\") {docs}}", 
    expected:{
      "createAndSort": null
    },
    authType: authTypes.adminKey,
  },
  ]
  return deployAndRun(__dirname, tests);
});