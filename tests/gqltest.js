require("dotenv").config();
const { execSync } = require("child_process");
const { URL } = require("url");
const path = require("node:path");

const {
  executeOK,
  logOnFail,
} = require('gqltest/packages/gqltest/gqltest.js')

const stepzen = require('gqltest/packages/gqltest/stepzen.js');

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
async function runGqlOk(endpoint, headers, request, expected) {
 await executeOK({
    test: this,
    endpoint,
    headers: headers,
    request,
    expected,
  })
}

// deploys graphql schema located in dirname to the test endpoint provided by the environment (process.env.STEPZEN_ENDPOINT),
// and then runs through all fo the field selection tests.
function deployAndRun(dirname, tests, headers) {
  it("deploy", function () {
    // deployEndpoint will try up to three times to deploy
    // the schema with a backoff that can total four seconds.
    // So set the timeout to be (3*10)+4 seconds to cover a worst case scenario.
    this.timeout(34000);
    return deployEndpoint(endpoint, dirname);
  });

  afterEach('log-failure', logOnFail)
  tests.forEach(
    ({ label, documentId, query, variables, operationName, expected, authType }) => {
      it(label, async function () {
        this.timeout(4000); // Occasional requests take > 2s
        let request = {}
        if (query) {
          request.query = query;
        }
        if (documentId) {
          request.documentId = documentId;
        }
        if (operationName) {
          request.operationName = operationName;
        }
        if (variables) {
          request.variables = variables;
        }
        return await runGqlOk(
          endpoint,
          headers,
          request,
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
exports.getTestDescription = getTestDescription;

exports.stepzen = stepzen
