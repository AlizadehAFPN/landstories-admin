/**
 * One-time script to set isFeatured=false on all stories in the Story DynamoDB table.
 *
 * Usage: node scripts/set-featured-false.mjs [--dry-run]
 */

import { readFileSync } from "fs";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

// Load .env.local for AWS credentials
const envFile = readFileSync(new URL("../.env.local", import.meta.url), "utf-8");
for (const line of envFile.split("\n")) {
  const match = line.match(/^(\w+)=(.+)$/);
  if (match) process.env[match[1]] = match[2];
}

const DRY_RUN = process.argv.includes("--dry-run");
const client = new DynamoDBClient({ region: process.env.AWS_REGION || "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client);
const TABLE = process.env.DYNAMO_TABLE_STORY || "Story";

async function main() {
  console.log(`${DRY_RUN ? "[DRY RUN] " : ""}Setting isFeatured=false on all stories in table "${TABLE}"...`);

  let lastKey;
  let updated = 0;
  let skipped = 0;

  do {
    const result = await docClient.send(
      new ScanCommand({
        TableName: TABLE,
        ExclusiveStartKey: lastKey,
      }),
    );

    for (const item of result.Items ?? []) {
      if (item.isFeatured === false) {
        skipped++;
        continue;
      }

      const pk = item.siteId;
      const sk = item.langStoryId;
      console.log(`  ${DRY_RUN ? "[skip] " : ""}${pk} / ${sk} — isFeatured: ${item.isFeatured} → false`);

      if (!DRY_RUN) {
        await docClient.send(
          new UpdateCommand({
            TableName: TABLE,
            Key: { siteId: pk, langStoryId: sk },
            UpdateExpression: "SET isFeatured = :f",
            ExpressionAttributeValues: { ":f": false },
          }),
        );
      }
      updated++;
    }

    lastKey = result.LastEvaluatedKey;
  } while (lastKey);

  console.log(`\nDone. Updated: ${updated}, Already false: ${skipped}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
