const {
  deployAndRun,
  stepzen,
  getTestDescription,
} = require("../../../tests/gqltest.js");

testDescription = getTestDescription("snippets", __dirname);

describe(testDescription, function () {
  const tests = 
    [
      { label: "restquerywithconfig(q)", 
        query: '{rest(q: ["Joe Smith", "Jane Smith"])  { args { q } url } }', 
        expected: {rest: {args: {q: ["Joe Smith", "Jane Smith"],},url: "https://httpbingo.org/get?apikey=56hdlks45reghunq&q=Joe+Smith&q=Jane+Smith",},},
      },
    ]
  return deployAndRun(__dirname, tests, stepzen.admin());
});