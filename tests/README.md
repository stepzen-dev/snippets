# Testing

Initial test framework for snippets, still a WIP.

# Running

Must have two environment variables set:

 * `STEPZEN_ENDPOINT` - StepZen endpoint all the tests will be deployed to (one at a time).
   - E.g. `https:danville.stepzen.net/test/snippets`
 * `STEPZEN_ADMIN_KEY` - Admin key for the account used in `$STEPZEN_ENDPOINT`

Must be logged into your StepZen account (matching `$STEPZEN_ENDPOINT`)

Execute at the root of the snippets repo.

```
npm install
npm test
```

