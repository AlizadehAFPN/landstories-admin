import { readFileSync, writeFileSync } from "fs";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

const envFile = readFileSync(new URL("../.env.local", import.meta.url), "utf-8");
for (const line of envFile.split("\n")) {
  const match = line.match(/^(\w+)\s*=\s*(.+)$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
}

const client = new DynamoDBClient({ region: process.env.AWS_REGION || "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, { marshallOptions: { removeUndefinedValues: true } });

async function main() {
  // Get all language versions of the Ephesus site
  const res = await docClient.send(new QueryCommand({
    TableName: "Landstories",
    KeyConditionExpression: "PK = :pk",
    ExpressionAttributeValues: { ":pk": "SITE#ephesus" }
  }));

  console.log("Total records:", res.Items.length);
  for (const item of res.Items) {
    console.log("  Lang:", item.lang, "| Title:", item.title);
  }

  // Save the English one
  const enItem = res.Items.find(i => i.lang === "en");
  if (enItem) {
    writeFileSync("/tmp/ephesus-site-en.json", JSON.stringify(enItem, null, 2));
    console.log("\nSaved English site record to /tmp/ephesus-site-en.json");
  }
}
main().catch(console.error);
