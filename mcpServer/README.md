# Using MCP Inspector with Default StepZen MCP Server

This guide explains how to modify the **MCP Inspector** code and use it to connect to a **StepZen MCP server** that is created for a Stepzen endpoint.

## 1. Clone and Install MCP Inspector

```
git clone https://github.com/modelcontextprotocol/inspector.git
cd inspector
npm install
```

## 2. Modify Inspector for StepZen Authentication

StepZen expects the API key *without* a `Bearer ` prefix in the authentication header. By default, MCP Inspector prepends `Bearer `, so you need to edit the code:

- **File:** `client/src/lib/hooks/useConnection.ts`
- **Find:**
```
headers[authHeaderName] = `Bearer ${token}`;
```

- **Replace with:**
```

// Use token as-is without adding "Bearer " prefix
headers[authHeaderName] = token;

```
This ensures the API key is sent exactly as StepZen expects.


## 3. Start MCP Inspector

```
npm start
```
The Inspector UI will be running on local host and requires a session token that is provided as output of the above command.  Should look something line `http://localhost:6274/?MCP_PROXY_AUTH_TOKEN=`<Session Token>.

## 4. Create a StepZen endpoint
For demonstration purposes, we will create and deploy an endpoint with the `Starwars` schema.

Create a starwars folder:
```
mkdir starwars
cd starwars
```

Import the starwars schema: 
```
stepzen import graphql https://stepzen-chester.us-east-a.ibm.stepzen.net/examples/starwars/graphql
```
Call it `api/starwars`.

Deploy the imported schema:
```
stepzen deploy
```

It will deploy to an endpoint such as:
```
https://<userid>.<region>.ibm.stepzen.net/api/starwars/__graphql
```

Your MCP server will be 
```
https://<userid>.<region>.ibm.stepzen.net/api/starwars/mcp
```

## 4. Connect to StepZen MCP Server

- In the Inspector UI, click **▶︎ Connect**.
- **URL:** Enter your StepZen MCP endpoint (e.g., `https://<userid>.<region>.ibm.stepzen.net/api/starwars/mcp
`).
- **Transport Type:** Select **streamable-http**.
- **Authentication:** Enter your API key with the value returned from:
```
echo "apikey $(stepzen whoami --apikey)"
```

- **Query Editing:** If the query box seems uneditable, try clicking at the start of the field to begin typing.
- **Operation Name/Variables:** These can be left empty; just enter your GraphQL query in the **query** field. Here's an example:

```
query hero {
  hero {
    appearsIn
    friends {
      appearsIn
      id
      name
    }
    id
    name
  }
}
```

Click `Run-tool`.

