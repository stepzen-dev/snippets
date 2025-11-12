# IBM IAM Token

## Overview

Defines a field `Query.ibm_iam_token` that obtains an IBM Cloud IAM token.

This can be used in as the first step of a sequence to obtain a token for a subsequent execution
of an `@rest` field in the sequence.

An example (`Query.usage`) is provided of accessing the IBM Cloud billing usage endpoint using
a `@sequence` to fetch a token and then make the REST request.

## Try it out

The schema must be deployed with the environment variable `STEPZEN_IBM_IAM_APIKEY` set
to an IBM Cloud API key, typically by a CI/CD workflow.

Then a request such as this can be executed, replacing `<<account ID>>` with an IBM Cloud account ID
that matches the IBM Cloud API key:

```
stepzen request '{usage(account:"<<account ID>>" month:"2025-01") }'
```
