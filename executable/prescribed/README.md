# Prescribed Tools

A **prescribed tool** is a tool that maps to a specific [GraphQL operation](https://spec.graphql.org/September2025/#sec-Language.Operations) in a [persisted document](https://spec.graphql.org/September2025/#sec-Persisted-Documents). The `@tool(prescribed:)` argument links the tool definition to an operation name in a persisted document. This approach provides a structured way to expose specific GraphQL operations as tools that can be called by AI models.

This sample demonstrates how to use the `@tool` directive to create prescribed tools for MCP (Model Context Protocol).

## Overview

The sample implements a mock weather service API with a single operation: weather forecast for a city.

The key feature demonstrated is how to create a prescribed tool that maps to a persisted GraphQL operation, allowing AI models to execute specific, well-defined queries.

## Schema Structure

The schema consists of:

1. A main schema file (`index.graphql`) that defines:
   - The GraphQL types for weather data
   - The `@tool` directive that creates a prescribed tool
   - The `@sdl` directive that includes the persisted operation

2. An operations file (`operations.graphql`) that contains:
   - A GraphQL operation that will be exposed as a tool
   - Descriptions for the operation and its variables (recommended best practice)

## How Prescribed Tools Work

A prescribed tool is defined using the `@tool` directive with the `prescribed` argument pointing to a specific operation in a persisted document:

```graphql
schema
  # Load the persisted operations document that contains the WeatherForecast operation
  @sdl(
    files: []
    executables: [{ document: "operations.graphql", persist: true }]
  )
  # Define a prescribed tool that maps to the WeatherForecast operation in the persisted document
  @tool(name: "weather-lookup", prescribed: "WeatherForecast") {
  query: Query
}
```

The operation in the persisted document should include descriptions ([new to GraphQL September 2025](https://spec.graphql.org/September2025/#Description)) to help AI models understand how to use the tool:

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
  weatherForecast(city: $city, days: $days) {
    city {
      name
      country
      timezone
    }
    forecast {
      date
      conditions
      high {
        celsius
        fahrenheit
      }
      low {
        celsius
        fahrenheit
      }
      precipitation
      humidity
      windSpeed
      windDirection
    }
  }
}
```

## MCP Tool Description

When deployed, this schema will expose a tool through the MCP endpoint. The tool's description and parameter information are derived from the GraphQL operation's descriptions:

```json
{
  "name": "weather-lookup",
  "description": "Get detailed weather forecast for a specific city. This operation provides a multi-day weather forecast including temperature, conditions, and other meteorological data",
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

1. Understanding the tool's purpose from the operation's description
2. Providing the required variables (city name and optionally number of days)
3. Receiving structured weather forecast data in response

## Benefits of Prescribed Tools

1. **Controlled Access**: Only specific, predefined operations are exposed as tools, providing fine-grained control over what AI models can execute.
2. **Type Safety**: The GraphQL schema ensures that inputs are properly validated.
3. **Clear Documentation**: Operation descriptions serve as both documentation for developers and instructions for AI models.
4. **Versioning**: Operations can be versioned and updated independently of the tool definition.

## Testing as an MCP Tool

To test this as an MCP tool with AI models:

1. Deploy the schema to StepZen using the command `stepzen deploy`
2. [Connect Claude Desktop](https://modelcontextprotocol.io/docs/develop/connect-local-servers) to your StepZen MCP endpoint
3. The tool will appear as `weather-lookup` and can be called by the AI model

**Example**: Interaction between MCP and the Claude UI.

<img width="563" height="360" alt="Image" src="https://github.com/user-attachments/assets/7da0cd20-2469-45cd-8a17-0891a1a03dec" />

<img width="502" height="588" alt="Image" src="https://github.com/user-attachments/assets/cf499b7e-a3fe-433c-b837-bdde25441739" />