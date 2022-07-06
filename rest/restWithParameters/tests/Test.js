const {
  runGqlOk,
  expectData,
  deployEndpoint,
} = require("../../../tests/gqltest.js");

const endpoint = process.env.STEPZEN_ENDPOINT;

describe("rest/restWithParameters", function () {
  it("deploy", function () {
    this.timeout(10000);
    return deployEndpoint(endpoint, __dirname);
  });
  it("restquery(q,v)", function () {
    return runGqlOk(
      endpoint,
      '{restquery(q: ["Joe Smith", "Jane Smith"] v:"New York")  { args { q v } url } }'
    ).then(function (response) {
      expectData(response, {
        restquery: {
          args: {
            q: ["Joe Smith", "Jane Smith"],
            v: "New York",
          },
          url: "https://httpbin.org/get?q=Joe+Smith&q=Jane+Smith&v=New+York",
        },
      });
    });
  });
  it("restquery(v)", function () {
    return runGqlOk(
      endpoint,
      '{restquery(v:"New York")  { args { q v } url } }'
    ).then(function (response) {
      expectData(response, {
        restquery: {
          args: {
            q: null,
            v: "New York",
          },
          url: "https://httpbin.org/get?v=New+York",
        },
      });
    });
  });
});
