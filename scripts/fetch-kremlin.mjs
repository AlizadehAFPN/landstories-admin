import { readFileSync, writeFileSync } from "fs";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

const envFile = readFileSync("/Users/wallex/landstories-admin/.env.local", "utf-8");
for (const line of envFile.split("\n")) {
  const match = line.match(/^(\w+)\s*=\s*(.+)$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
}

const client = new DynamoDBClient({ region: process.env.AWS_REGION || "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, { marshallOptions: { removeUndefinedValues: true } });

async function main() {
  // Fetch English version of moscow-kremlin
  const enRes = await docClient.send(new GetCommand({
    TableName: "Landstories",
    Key: { PK: "SITE#moscow-kremlin", SK: "LANG#en" }
  }));

  if (!enRes.Item) {
    console.log("No English site record found for moscow-kremlin!");
    return;
  }

  console.log("English moscow-kremlin site data:");
  console.log(JSON.stringify(enRes.Item, null, 2));
  writeFileSync("/tmp/moscow-kremlin-en.json", JSON.stringify(enRes.Item, null, 2));
  console.log("\nSaved to /tmp/moscow-kremlin-en.json");

  // Check which language versions already exist
  const allLangs = ['en', 'es', 'zh', 'fr', 'ar', 'fa', 'tr', 'ru', 'ko', 'de', 'ja'];
  console.log("\nExisting language versions:");
  for (const lang of allLangs) {
    const res = await docClient.send(new GetCommand({
      TableName: "Landstories",
      Key: { PK: "SITE#moscow-kremlin", SK: `LANG#${lang}` }
    }));
    console.log(`  ${lang}: ${res.Item ? 'EXISTS' : 'missing'}`);
  }
}
main().catch(console.error);
