const fetch = require("node-fetch");
const { expect } = require("chai");
const { execSync } = require("child_process");
const { URL } = require("url");

// We use admin key to test because there is a cache optimization for apikey's that is not conducive
// to rapid deploy and run cycles that occur with this type of testing
const adminKey = `apikey ` + execSync(`stepzen whoami --adminkey`).toString().trim();

// deploys the schema in a directory to a StepZen endpoint.
// endpoint is the full URL.
function deployEndpoint(endpoint, dirname) {
  console.log(`deploying ${endpoint} from ${dirname}`);
  const url = new URL(endpoint);
  const endpointPath = url.pathname
    .replace(/^\//, "")
    .replace(/\/__graphql$/, "");

  const stdout = execSync(
    `stepzen start --no-dashboard --no-console --no-watcher --endpoint=${endpointPath} --dir=${dirname}`
  ).toString();
  console.log(stdout);
}

// Runs a GraphQL request against the endpoint
// as a test returning the response.
// The test will fail if the request does not
// have status 200 or has any GraphQL errors.
function runGqlOk(endpoint, query, variables, operationName) {
  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: adminKey,
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
      operationName: operationName,
    }),
  })
    .then(function (result) {
      expect(result.status).to.equal(200);
      return result;
    })
    .then(function (result) {
      response = result.json();
      expect(response.errors).to.be.undefined;
      return response;
    });
}

// tests that the data key in a GraphQL response
// is equal to value.
function expectData(response, value) {
  expect(response.data).to.eql(value);
}

exports.runGqlOk = runGqlOk;
exports.expectData = expectData;
exports.deployEndpoint = deployEndpoint;
