const fetch = require("node-fetch");
const { expect } = require("chai");
const { execSync } = require("child_process");
const { URL } = require("url");
const KeyType = {
  admin: 1,
  api: 2, 
  jwt: 3
}
Object.freeze(KeyType);

// We use admin key to test because there is a cache optimization for apikey's that is not conducive
// to rapid deploy and run cycles that occur with this type of testing
const adminKey = `apikey ` + execSync(`stepzen whoami --adminkey`).toString().trim();
const apiKey = `apikey ` + execSync(`stepzen whoami --apikey`).toString().trim();

const endpoint = process.env.STEPZEN_ENDPOINT;

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
function runGqlOk(keyType, endpoint, fieldSelection, variables, operationName) {
  switch (keyType) {
    case KeyType.admin:
      key = adminKey;
      break;
    case KeyType.api:
      key = apiKey;
      break;
    default:
      key = ""
  }
  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: key,
    },
    body: JSON.stringify({
      query: fieldSelection,
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

// deploys graphql schema located in dirname to the test endpoint provided by the environment (process.env.STEPZEN_ENDPOINT), 
// and then runs through all fo the field selection tests.
function deployAndRun(dirname, tests) {
it("deploy", function () {
  this.timeout(10000);
  return deployEndpoint(endpoint, dirname);
});

tests.forEach(({label, fieldSelection, expected, keyType}) => {
  it(label, function () {
    return runGqlOk(keyType, endpoint, fieldSelection).then(
      function (response) {
        expectData(response, expected);
        });
      });
  });
}

exports.deployAndRun = deployAndRun;
exports.KeyType = KeyType;
