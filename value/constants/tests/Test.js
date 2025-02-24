const {
    deployAndRun,
    stepzen,
    getTestDescription,
  } = require("../../../tests/gqltest.js");

  testDescription = getTestDescription("snippets", __dirname);

  describe(testDescription, function () {
    const tests = [
      { label: "customer(1) return default name and city ",
        query: '{customer(id:1){name city }}',
        expected: {customer: {name:'John Doe',city:'Miami'}},
      },
      { label: "customer(2) with pass default state value",
        query: '{customer(id:2){name city state }}',
        expected: {customer: {name:'John Doe',city:'Miami',state:"Florida"}},
      },
      { label: "customer(3) xid returns null value",
        query: '{customer(id:2){name city state xid }}',
        expected: {customer: {name:'John Doe',city:'Miami',state:"Florida",xid:null}},
      },
      { label: "customer(4) joinDate returns const value",
        query: '{customer(id:2){name city joinDate }}',
        expected: {customer: {name:'John Doe',city:'Miami',joinDate:'2024-02-24'}},
      },
      { label: "customer(5) createdDate returns const value",
        query: '{customer(id:2){name city createdDate }}',
        expected: {customer: {name:'John Doe',city:'Miami',createdDate:'2024-02-24T07:20:50.52Z'}},
      },
      { label: "concat string",
        query: '{concat(a: "Steve",b:"Jobs" )}',
        expected: {concat: 'Steve-Jobs'},
      },
      { label: "JSON scalars return json_string",
        query: '{json_string}',
        expected: {"json_string": "goodbye"},
      },
      { label: "JSON scalars return json_list",
        query: '{json_list}',
        expected: {"json_list": [2,"hi"]},
      },
      { label: "return const true boolean value ",
        query: '{returnBoolean}',
        expected: {"returnBoolean": true},
      },
      { label: "return const integer value ",
        query: '{integer}',
        expected: {"integer": 94},
      },
      { label: "return const float value ",
        query: '{float}',
        expected: {"float": 241.8},
      },
    ]
    return deployAndRun(__dirname, tests, stepzen.admin);
  });

