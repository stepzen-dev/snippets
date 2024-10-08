const {
  deployAndRun,
  stepzen,
  getTestDescription,
} = require('../../../tests/gqltest.js');

testDescription = getTestDescription('snippets', __dirname);

describe(testDescription, function () {
  const tests = [
    {
      label: 'auth(correct)',
      query:
        'mutation { auth(email: "demo", password: "demo") { ... on Token { id token } ... on AuthError { message } } }',
      expected: {
        auth: {
          id: '1',
          token: '1234567890',
        },
      },
    },
    {
      label: 'auth(incorrect)',
      query:
        'mutation { auth(email: "demo", password: "wrong") { ... on Token { id token } ... on AuthError { message } } }',
      expected: {
        auth: {
          message: 'Invalid credentials',
        },
      },
    },
  ];
  return deployAndRun(__dirname, tests, stepzen.admin);
});
