const {
  deployAndRun,
  authTypes,
  getTestDescription,
} = require("../../../tests/gqltest.js");

testDescription = getTestDescription("snippets", __dirname);

describe(testDescription, function () {
  const tests = [
    { label: "restquery(q,v)", 
      query: '{restquery(q: ["Joe Smith", "Jane Smith"] v:"New York")  { args { q v } url } }', 
      expected: {restquery: {args: {q: ["Joe Smith", "Jane Smith"],v: ["New York"],},url: "https://httpbingo.org/get?q=Joe+Smith&q=Jane+Smith&v=New+York",},},
      authType: authTypes.adminKey,
    },
    { label: "restquery(v)",
      query:  '{restquery(v:"New York")  { args { q v } url } }',
      expected: {restquery: {args: {q: null,v: ["New York"],}, url: "https://httpbingo.org/get?v=New+York",},},
      authType: authTypes.adminKey,
    },
    { label: "restquery(q)",
      query:  '{restquery(q:["Mike Jones", "Sally Jones"])  { args { q v } url } }',
      expected: {restquery: {args: {q: ["Mike Jones", "Sally Jones"],v: null,}, url: "https://httpbingo.org/get?q=Mike+Jones&q=Sally+Jones",},},
      authType: authTypes.adminKey,
    },
  ]
  return deployAndRun(__dirname, tests);
});