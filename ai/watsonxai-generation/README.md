# watsonx.ai generation.

## Overview

Creates a field `Query.wxai_generation` that invokes a watsonx.ai generation endpoint to infer the next text from an input.

This provides a simple example of calling an LLM from a GraphQL endpoint.

An IBM Cloud IAM token is used for authorization, taken from the [ibm-iam snippet](../../rest/ibm-iam/).

## Try it out

### Deploying

Deploy the schema with this values set in `.env` for your watsonx.ai project.

```
STEPZEN_IBM_IAM_APIKEY=
STEPZEN_WATSONXAI_URL=
STEPZEN_WATSONXAI_PROJECTID=
```

These can be obtained from the watsonx dashboard:

<img width="362" height="452" alt="image" src="https://github.com/user-attachments/assets/1eaa1671-2e2c-4a34-8ae7-1fd42ce9887e" />

### Sample request

Then you can use `stepzen request` and the provided operation to ask simple questions:

```
stepzen request --file op.graphql --var question="when was hadrian's wall built"
```

recieving a GraphQL response like:

```
{
  "data": {
    "wxai_generation": {
      "created_at": "2025-11-12T18:29:23.65Z",
      "model_id": "ibm/granite-3-8b-instruct",
      "model_version": "1.1.0",
      "results": [
        {
          "generated_text": "\n\nHadrian's Wall was built between 122 and 128 AD",
          "generated_token_count": 20,
          "input_token_count": 7,
          "stop_reason": "max_tokens"
        }
      ]
    }
  }
}
```
