/**
 * Creates the DeviceToken DynamoDB table for storing FCM tokens.
 *
 * Usage:  node scripts/create-device-token-table.mjs
 *
 * Table schema:
 *   PK: userId (String)  — Cognito user sub
 *   SK: token  (String)  — FCM device token
 *   TTL: ttl             — Auto-expire stale tokens after 90 days
 */

import {
  DynamoDBClient,
  CreateTableCommand,
  UpdateTimeToLiveCommand,
  DescribeTableCommand,
} from "@aws-sdk/client-dynamodb";

const TABLE_NAME = "DeviceToken";
const REGION = process.env.AWS_REGION || "eu-north-1";

const client = new DynamoDBClient({ region: REGION });

async function main() {
  // Check if table already exists
  try {
    await client.send(
      new DescribeTableCommand({ TableName: TABLE_NAME })
    );
    console.log(`✓ Table "${TABLE_NAME}" already exists`);
    return;
  } catch (err) {
    if (err.name !== "ResourceNotFoundException") throw err;
  }

  // Create table
  console.log(`Creating table "${TABLE_NAME}"...`);
  await client.send(
    new CreateTableCommand({
      TableName: TABLE_NAME,
      KeySchema: [
        { AttributeName: "userId", KeyType: "HASH" },
        { AttributeName: "token", KeyType: "RANGE" },
      ],
      AttributeDefinitions: [
        { AttributeName: "userId", AttributeType: "S" },
        { AttributeName: "token", AttributeType: "S" },
      ],
      BillingMode: "PAY_PER_REQUEST",
    })
  );
  console.log("✓ Table created. Waiting for it to become active...");

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
  console.log("\n✓ Table is ACTIVE");

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
  console.log("✓ TTL enabled");
  console.log(`\nDone! Table "${TABLE_NAME}" is ready.`);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
