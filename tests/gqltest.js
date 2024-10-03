require("dotenv").config();
const { execSync } = require("child_process");
const { URL } = require("url");
const path = require("node:path");

const {
  runtests,
  GQLHeaders,
} = require('gqltest/packages/gqltest/gqltest.js');

const stepzen = require("gqltest/packages/gqltest/stepzen.js");

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

// deploys graphql schema located in dirname to the test endpoint provided by the environment (process.env.STEPZEN_ENDPOINT),
// and then runs through all fo the field selection tests.
function deployAndRun(dirname, tests, headers) {
  describe("deployAndRun", function () {
    this.timeout(10000);
    this.slow(1000);
    it("deploy", function () {
      // deployEndpoint will try up to three times to deploy
      // the schema with a backoff that can total four seconds.
      // So set the timeout to be (3*10)+4 seconds to cover a worst case scenario.
      this.timeout(34000);
      this.slow(5000);
      return deployEndpoint(endpoint, dirname);
    });

    runtests("run", endpoint, headers, tests);
  });
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
exports.endpoint = endpoint;

exports.GQLHeaders = GQLHeaders;
exports.runtests = runtests;
exports.stepzen = stepzen;
