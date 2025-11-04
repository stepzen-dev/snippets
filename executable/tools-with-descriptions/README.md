# Prescribed Tools with Descriptions

This sample demonstrates how to use the `@tool` directive with prescribed operations that contains descriptions that can be used through to create MCP (Model Context Protocol) tools.

## Overview

The sample implements a mock weather service API with a simple operations, Weather forecast for a city

The key feature demonstrated is how to create a prescribed tool with rich descriptions that help AI models understand how to use the tool effectively.

## Schema Structure

The schema consists of:

1. A main schema file (`index.graphql`) that defines:
   - The GraphQL types for weather data
   - The `@tool` directive that creates a prescribed tool
   - The `@sdl` directive that includes persisted operations

2. An operations file (`operations.graphql`) that contains:
   - Documented GraphQL operations with descriptions
   - Variable descriptions that are used by the tool

## How Prescribed Tools Work

A prescribed tool is defined using the `@tool` directive with the `prescribed` argument pointing to a specific operation in a persisted document:

```graphql
@tool(
  name: "weather-lookup"
  prescribed: "WeatherForecast"
)
```

The operation itself can include descriptions:

```graphql
"""
Get detailed weather forecast for a specific city
This operation provides a multi-day weather forecast including temperature, conditions, and other meteorological data
"""
query WeatherForecast(
  """The name of the city to get weather forecast for"""
  $city: String!, 
  """Number of days to forecast (1-7), defaults to 3 days"""
  $days: Int = 3
) {
  // operation details
}
```

## MCP Tool Description

When deployed, this schema will expose a tool through the MCP endpoint with the following description:

```json
{
  "name": "weather-lookup",
  "description": "Weather forecast lookup tool for cities and locations",
  "inputSchema": {
    "type": "object",
    "properties": {
      "variables": {
        "properties": {
          "city": {
            "description": "The name of the city to get weather forecast for",
            "type": "string"
          },
          "days": {
            "description": "Number of days to forecast (1-7), defaults to 3 days",
            "type": "integer",
            "default": 3
          }
        },
        "required": ["city"],
        "type": "object"
      }
    },
    "required": ["variables"]
  }
}
```

## Using the Tool

An AI model can use this tool by:

1. Understanding the tool's purpose from its description
2. Providing the required variables (city name and optionally number of days)
3. Receiving structured weather forecast data in response

## Benefits of Prescribed Tools with Descriptions

1. **Improved AI Understanding**: Detailed descriptions help AI models understand the purpose and parameters of the tool.
2. **Structured Input Validation**: The GraphQL schema ensures that inputs are properly validated.
3. **Documentation**: The descriptions serve as both documentation for developers and instructions for AI models.

## Testing

You can test this tool by:

1. Deploying the schema to StepZen using the command `stepzen deploy`
2. Making requests to the MCP endpoint with tool calls
3. Verifying that the tool returns properly structured weather data.



Sydney, defaults to 3 days
 
curl \
   --header "Authorization: Apikey $(stepzen whoami --apikey)" \
   --header "Content-Type: application/json" \
 'https://changjaeto.us-east-a.ibm.stepzen.net/api/miscellaneous/graphql?documentId=sha256:1bc7a3eefaa1f9dc0a3bbe2eba6cdcbf393aac3b1273a036b885ac1407eac11a&operationName=WeatherForecast&variables=%7B%22city%22%3A%20%22Sydney%22%7D'


Sydney, 1 day

curl \
   --header "Authorization: Apikey $(stepzen whoami --apikey)" \
   --header "Content-Type: application/json" \
 'https://changjaeto.us-east-a.ibm.stepzen.net/api/miscellaneous/graphql?documentId=sha256:1bc7a3eefaa1f9dc0a3bbe2eba6cdcbf393aac3b1273a036b885ac1407eac11a&operationName=WeatherForecast&variables=%7B%22city%22%3A%20%22Sydney%22%2C%20%22days%22%3A%201%7D'