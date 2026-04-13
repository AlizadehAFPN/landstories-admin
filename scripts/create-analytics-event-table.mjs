/**
 * Creates the AnalyticsEvent DynamoDB table for tracking custom events.
 *
 * Usage:  node scripts/create-analytics-event-table.mjs
 *
 * Table schema:
 *   PK: PK (String)   — EVENT#{eventType}
 *   SK: SK (String)    — {ISO timestamp}#{uuid}
 *
 * GSI1: TARGET#{storyId|siteId} → SK  (top content queries)
 * GSI2: DATE#{YYYY-MM-DD}      → SK  (time-series & recent feed)
 * TTL:  ttl                            (180-day auto-expiry)
 */

import {
  DynamoDBClient,
  CreateTableCommand,
  UpdateTimeToLiveCommand,
  DescribeTableCommand,
} from "@aws-sdk/client-dynamodb";

const TABLE_NAME = process.env.DYNAMO_TABLE_ANALYTICS_EVENTS || "AnalyticsEvent";
const REGION = process.env.AWS_REGION || "eu-north-1";

const client = new DynamoDBClient({ region: REGION });

async function main() {
  // Check if table already exists
  try {
    await client.send(
      new DescribeTableCommand({ TableName: TABLE_NAME })
    );
    console.log(`Table "${TABLE_NAME}" already exists`);
    return;
  } catch (err) {
    if (err.name !== "ResourceNotFoundException") throw err;
  }

  console.log(`Creating table "${TABLE_NAME}"...`);
  await client.send(
    new CreateTableCommand({
      TableName: TABLE_NAME,
      KeySchema: [
        { AttributeName: "PK", KeyType: "HASH" },
        { AttributeName: "SK", KeyType: "RANGE" },
      ],
      AttributeDefinitions: [
        { AttributeName: "PK", AttributeType: "S" },
        { AttributeName: "SK", AttributeType: "S" },
        { AttributeName: "GSI1-PK", AttributeType: "S" },
        { AttributeName: "GSI1-SK", AttributeType: "S" },
        { AttributeName: "GSI2-PK", AttributeType: "S" },
        { AttributeName: "GSI2-SK", AttributeType: "S" },
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: "GSI1",
          KeySchema: [
            { AttributeName: "GSI1-PK", KeyType: "HASH" },
            { AttributeName: "GSI1-SK", KeyType: "RANGE" },
          ],
          Projection: { ProjectionType: "ALL" },
        },
        {
          IndexName: "GSI2",
          KeySchema: [
            { AttributeName: "GSI2-PK", KeyType: "HASH" },
            { AttributeName: "GSI2-SK", KeyType: "RANGE" },
          ],
          Projection: { ProjectionType: "ALL" },
        },
      ],
      BillingMode: "PAY_PER_REQUEST",
    })
  );
  console.log("Table created. Waiting for it to become active...");

  // Wait for table to be active
  let status = "CREATING";
  while (status !== "ACTIVE") {
    await new Promise((r) => setTimeout(r, 2000));
    const desc = await client.send(
      new DescribeTableCommand({ TableName: TABLE_NAME })
    );
    status = desc.Table?.TableStatus ?? "CREATING";
    process.stdout.write(".");
  }
  console.log("\nTable is ACTIVE");

  // Enable TTL
  console.log("Enabling TTL on 'ttl' attribute...");
  await client.send(
    new UpdateTimeToLiveCommand({
      TableName: TABLE_NAME,
      TimeToLiveSpecification: {
        Enabled: true,
        AttributeName: "ttl",
      },
    })
  );
  console.log("TTL enabled");
  console.log(`\nDone! Table "${TABLE_NAME}" is ready.`);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
