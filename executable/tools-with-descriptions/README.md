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

### Testing as an MCP Tool

To test this as an MCP tool with AI models:

1. Deploy the schema to StepZen using the command `stepzen deploy`
2. [Connect Claude Desktop](https://modelcontextprotocol.io/docs/develop/connect-local-servers) to your StepZen MCP endpoint
3. The tool will appear as `weather-lookup` and can be called by the AI model

**Example**: Interaction between MCP and the Claude UI.

<img width="563" height="360" alt="Image" src="https://github.com/user-attachments/assets/7da0cd20-2469-45cd-8a17-0891a1a03dec" />

<img width="502" height="588" alt="Image" src="https://github.com/user-attachments/assets/cf499b7e-a3fe-433c-b837-bdde25441739" />