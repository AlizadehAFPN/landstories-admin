import { readFileSync, writeFileSync } from "fs";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

const envFile = readFileSync("/Users/wallex/landstories-admin/.env.local", "utf-8");
for (const line of envFile.split("\n")) {
  const match = line.match(/^(\w+)\s*=\s*(.+)$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
}

const client = new DynamoDBClient({ region: process.env.AWS_REGION || "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, { marshallOptions: { removeUndefinedValues: true } });

async function main() {
  const res = await docClient.send(new QueryCommand({
    TableName: "Story",
    KeyConditionExpression: "siteId = :sid AND begins_with(langStoryId, :prefix)",
    ExpressionAttributeValues: { ":sid": "ephesus", ":prefix": "en#" }
  }));

  console.log("English stories count:", res.Items.length);
  writeFileSync("/tmp/ephesus-en-stories.json", JSON.stringify(res.Items, null, 2));
  console.log("Saved to /tmp/ephesus-en-stories.json");

  // Also check existing translations
  const allRes = await docClient.send(new QueryCommand({
    TableName: "Story",
    KeyConditionExpression: "siteId = :sid",
    ExpressionAttributeValues: { ":sid": "ephesus" },
    ProjectionExpression: "lang, storyId, title"
  }));

  // Group by lang
  const byLang = {};
  for (const item of allRes.Items) {
    if (!byLang[item.lang]) byLang[item.lang] = [];
    byLang[item.lang].push(item.storyId);
  }
  console.log("\nExisting languages and story counts:");
  for (const [lang, stories] of Object.entries(byLang).sort()) {
    console.log("  " + lang + ": " + stories.length + " stories");
  }
}
main().catch(console.error);
