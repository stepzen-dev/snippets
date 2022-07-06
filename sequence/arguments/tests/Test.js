const {
  runGqlOk,
  expectData,
  deployEndpoint,
} = require("../../../tests/gqltest.js");

const endpoint = process.env.STEPZEN_ENDPOINT;

describe("sequence/arguments", function () {
  it("deploy", function () {
    this.timeout(10000);
    return deployEndpoint(endpoint, __dirname);
  });
  it("customer(1)", function () {
    return runGqlOk(endpoint, "{customer(id:1){name city weather{temp}}}").then(
      function (response) {
        expectData(response, {
          customer: {
            name: "John Doe",
            city: "Miami",
            weather: {
              temp: 100.0,
            },
          },
        });
      }
    );
  });
  it("customer(2)", function () {
    return runGqlOk(endpoint, "{customer(id:2){name city weather{temp}}}").then(
      function (response) {
        expectData(response, {
          customer: {
            name: "Jane Smith",
            city: "Santa Clara",
            weather: {
              temp: 60.4,
            },
          },
        });
      }
    );
  });
});
