# Watsonx.AI generation.

## Overview

Creates a field `Query.wxai_generation` that invokes a Watsonx.AI generation endpoint to infer the next text from an input.

This provides a simple example of calling an LLM from a GraphQL endpoint.

An IBM Cloud IAM token is used for authorization, taken from the [ibm-iam snippet](../../rest/ibm-iam/).

## Try it out

Deploy the schema with this values set in `.env` for your Watsonx.AI project.

STEPZEN_IBM_IAM_APIKEY=
STEPZEN_WATSONXAI_URL=
STEPZEN_WATSONXAI_PROJECTID=

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
