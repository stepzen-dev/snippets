require("dotenv").config();
const { execSync } = require("child_process");
const { URL } = require("url");
const path = require("node:path");

const {
  GQLHeaders,
  executeOK,
  logOnFail,
} = require('gqltest/packages/gqltest/gqltest.js')

const authTypes = {
  adminKey: 1,
  apiKey: 2,
  jwt: 3,
  noAuth: 4,
};
Object.freeze(authTypes);

// We use admin key to test because there is a cache optimization for apikey's that is not conducive
// to rapid deploy and run cycles that occur with this type of testing
const adminKey = execSync(`stepzen whoami --adminkey`).toString().trim();
const apiKey = execSync(`stepzen whoami --apikey`).toString().trim();

const endpoint = process.env.STEPZEN_ENDPOINT;

// deploys the schema in a directory to a StepZen endpoint.
// endpoint is the full URL.
function deployEndpoint(endpoint, dirname) {
  console.log(`deploying ${endpoint} from ${dirname}`);
  const url = new URL(endpoint);
  const endpointPath = url.pathname
    .replace(/^\//, "")
    .replace(/\/__graphql$/, "");

  const cmd = `stepzen deploy ${endpointPath} --dir=${dirname}`;
  // simple retry with backoff to avoid a deploy error
  // when another client (typically a test) has deployed
  // causing a 'Conflict: content has changed' error.
  const stdout = execSync(
    `${cmd} || (sleep 1; ${cmd}) || (sleep 3; ${cmd})`
  ).toString();
  console.log(stdout);
}

// Runs a GraphQL request against the endpoint
// as a test returning the response.
// The test will fail if the request does not
// have status 200 or has any GraphQL errors.
async function runGqlOk(authType, endpoint, query, variables, operationName, expected) {
  let headers = new GQLHeaders();
  switch (authType) {
    case authTypes.adminKey:
      headers.withAPIKey(adminKey);
      break;
    case authTypes.apiKey:
      headers.withAPIKey(apiKey);
      break;
    //  Have not  implemented jwt and noAuth yet
    case authTypes.jwt:
    case authTypes.noAuth:
    default:
      authValue = "";
  }
 await executeOK({
    test: this,
    endpoint,
    headers,
    request: {
      query: query,
      variables: variables,
      operationName: operationName,
    },
    expected,
  })
}

// deploys graphql schema located in dirname to the test endpoint provided by the environment (process.env.STEPZEN_ENDPOINT),
// and then runs through all fo the field selection tests.
function deployAndRun(dirname, tests) {
  it("deploy", function () {
    // deployEndpoint will try up to three times to deploy
    // the schema with a backoff that can total four seconds.
    // So set the timeout to be (3*10)+4 seconds to cover a worst case scenario.
    this.timeout(34000);
    return deployEndpoint(endpoint, dirname);
  });

  afterEach('log-failure', logOnFail)
  tests.forEach(
    ({ label, query, variables, operationName, expected, authType }) => {
      it(label, async function () {
        this.timeout(4000); // Occasional requests take > 2s
        return await runGqlOk(
          authType,
          endpoint,
          query,
          variables,
          operationName,
          expected,
        );
      });
    }
  );
}

function getTestDescription(testRoot, fullDirName) {
  segments = fullDirName.split(path.sep);
  rootIndex = segments.findIndex((element) => element == testRoot);
  // Construct the test description from the unique path from testRoot, which is likely the root of the git repo.
  // Intentionally not using `path.sep` as this is not a path to a file now, but a test description.
  return segments.slice(rootIndex + 1, -1).join("/");
}

exports.deployAndRun = deployAndRun;
exports.authTypes = authTypes;
exports.getTestDescription = getTestDescription;
