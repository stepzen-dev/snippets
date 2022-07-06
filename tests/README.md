# Testing

Initial test framework for snippets, still a WIP.

# Running

Must have one environment variables set:

 * `STEPZEN_ENDPOINT` - StepZen endpoint all the tests will be deployed to (one at a time). For example:
   ```
   export STEPZEN_ENDPOINT=https://YOUR_ACCOUNT.stepzen.net/test/snippets/__graphql`
   ```

We use admin key to test because there is a cache optimization for apikey's that is not conducive to rapid deploy and run cycles that occur with this type of testing

Must be logged into your StepZen account (matching `YOUR_ACCOUNT` in `STEPZEN_ENDPOINT`)
```
stepzen login
```

Execute at the root of the snippets repo.

```
npm install
npm test
```

