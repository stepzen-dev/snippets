const {
    deployAndRun,
    stepzen,
    getTestDescription,
} = require("../../../tests/gqltest.js");

testDescription = getTestDescription("snippets", __dirname);

describe(testDescription, function () {
    const tests = [
        {
            label: "WeatherForecast",
            documentId:
                "sha256:eb01da571734ea3074e4aa494398f947ff76c3b339ad0c15d5c9127b5f53ac4d",
            operationName: "WeatherForecast",
            variables: {
                city: "Sydney",
            },
            expected: {
                weatherForecast: {
                    city: {
                        name: "Sydney",
                        country: "Australia",
                        timezone: "Australia/Sydney"
                    },
                    forecast: [
                        {
                            high: {
                                celsius: 28,
                                fahrenheit: 82
                            },
                            low: {
                                celsius: 20,
                                fahrenheit: 68
                            },
                            conditions: "Sunny",
                            precipitation: 10,
                            humidity: 60,
                            windSpeed: 15,
                            windDirection: "NE"
                        },
                    ],
                },
            },
        },
    ];
    return deployAndRun(__dirname, tests, stepzen.admin);
});
