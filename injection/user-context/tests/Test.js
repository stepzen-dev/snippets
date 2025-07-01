const fs = require("fs");
const path = require("node:path");
const {
  deployAndRun,
  stepzen,
  getTestDescription,
} = require("../../../tests/gqltest.js");
const { gqltest } = require("../../../tests/gqltest");

testDescription = getTestDescription("snippets", __dirname);

describe(testDescription, function () {
  const tests = [
    {
      label: "Should inject default user context for orders",
      query: `
        query {
          orders(limit: 3) {
            id
            customerName
            total
            status
            region
          }
        }
      `,
      expected: {
        orders: [
          {
            id: "1",
            customerName: "Acme Corp",
            total: 1500.0,
            status: "completed",
            region: "US_WEST",
          },
          {
            id: "5",
            customerName: "West Coast Inc",
            total: 1800.0,
            status: "completed",
            region: "US_WEST",
          },
        ],
      },
    },
    {
      label: "Should inject default user context for products",
      query: `
        query {
          products(category: "electronics") {
            id
            name
            category
            price
            region
            inStock
          }
        }
      `,
      expected: {
        products: [
          {
            id: "p1",
            name: "Laptop Pro",
            category: "electronics",
            price: 1299.99,
            region: "US_WEST",
            inStock: true,
          },
          {
            id: "p6",
            name: "Monitor 4K",
            category: "electronics",
            price: 499.99,
            region: "US_WEST",
            inStock: true,
          },
        ],
      },
    },
    {
      label: "Should inject default user context for recommendations",
      query: `
        query {
          recommendations(count: 2) {
            productId
            productName
            score
            reason
          }
        }
      `,
      expected: {
        recommendations: [
          {
            productId: "p1",
            productName: "Laptop Pro",
            score: 1.0,
            reason: "Premium: Popular in your region",
          },
          {
            productId: "p6",
            productName: "Monitor 4K",
            score: 0.93,
            reason: "Premium: Great for productivity",
          },
        ],
      },
    },
    {
      label: "Should use shared injection context across multiple operations",
      query: `
        query {
          orders(limit: 1) {
            id
            region
          }
          products(category: "electronics") {
            id
            region
          }
        }
      `,
      expected: {
        orders: [
          {
            id: "1",
            region: "US_WEST",
          },
        ],
        products: [
          {
            id: "p1",
            region: "US_WEST",
          },
          {
            id: "p6",
            region: "US_WEST",
          },
        ],
      },
    },
    {
      label: "Should override default context with explicit userId",
      query: `
        query GetUserOrders($userId: ID!) {
          orders(userId: $userId, limit: 5) {
            id
            customerName
            region
          }
        }
      `,
      variables: { userId: "2" },
      expected: {
        orders: [], // User 2's orders are in EU_WEST but injection provides US_WEST context, so no matches
      },
    },
  ];

  return deployAndRun(__dirname, tests, stepzen.admin);
});
