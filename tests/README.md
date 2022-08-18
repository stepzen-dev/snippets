# Testing

Initial test framework for snippets, still a WIP.

# Running

Must have one environment variable set:

 * `STEPZEN_ENDPOINT` - StepZen endpoint all the tests will be deployed to (one at a time). For example:
   ```
   export STEPZEN_ENDPOINT=https://YOUR_ACCOUNT.stepzen.net/test/snippets/__graphql
   ```


Must be logged into your StepZen account (matching `YOUR_ACCOUNT` in `STEPZEN_ENDPOINT`)
```
stepzen login
```

Execute at the root of the snippets repo.

```
npm install
npm test
```

