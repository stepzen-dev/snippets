const fs = require("fs");
const path = require("node:path");
const {
    deployAndRun,
    stepzen,
    getTestDescription,
} = require("../../../tests/gqltest.js");

testDescription = getTestDescription("snippets", __dirname);

describe(testDescription, function () {
    const forecastDates = Array.from({ length: 3 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        return d.toISOString().split('T')[0];
    });


    const tests = [
        {
            label: "WeatherForecast",
            documentId:
                "sha256:68026b11d1c611f4285a1dd21837f8243e12e6f5e96719a361d6f864525a72da",
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
                            date: forecastDates[0],
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
                        {
                            date: forecastDates[1],
                            high: {
                                celsius: 27,
                                fahrenheit: 81
                            },
                            low: {
                                celsius: 19,
                                fahrenheit: 66
                            },
                            conditions: "Partly Cloudy",
                            precipitation: 15,
                            humidity: 65,
                            windSpeed: 14,
                            windDirection: "E"
                        },
                        {
                            date: forecastDates[2],
                            high: {
                                celsius: 29,
                                fahrenheit: 84
                            },
                            low: {
                                celsius: 21,
                                fahrenheit: 70
                            },
                            conditions: "Sunny",
                            precipitation: 5,
                            humidity: 55,
                            windSpeed: 13,
                            windDirection: "NE"
                        }
                    ],
                },
            },
        },
    ];
    return deployAndRun(__dirname, tests, stepzen.admin);
});
