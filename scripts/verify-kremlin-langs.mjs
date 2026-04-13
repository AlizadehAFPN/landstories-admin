import { readFileSync } from "fs";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const envFile = readFileSync("/Users/wallex/landstories-admin/.env.local", "utf-8");
for (const line of envFile.split("\n")) {
  const match = line.match(/^(\w+)\s*=\s*(.+)$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
}

const client = new DynamoDBClient({ region: process.env.AWS_REGION || "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, { marshallOptions: { removeUndefinedValues: true } });

const langs = ['en', 'es', 'zh', 'fr', 'ar', 'fa', 'tr', 'ru', 'ko', 'de', 'ja'];

async function main() {
  console.log("Moscow Kremlin — All Language Versions in DynamoDB:\n");
  for (const lang of langs) {
    const res = await docClient.send(new GetCommand({
      TableName: "Landstories",
      Key: { PK: "SITE#moscow-kremlin", SK: `LANG#${lang}` }
    }));
    if (res.Item) {
      const i = res.Item;
      console.log(`${lang.toUpperCase()} | "${i.title}"`);
      console.log(`   shortDescription: ${i.shortDescription.substring(0, 80)}...`);
      console.log(`   funFacts: ${i.funFacts?.length || 0} | timeline: ${i.timeline?.length || 0} | tags: ${i.tags?.length || 0}`);
      console.log(`   disabled: ${i.disabled} | unesco: ${i.unesco}`);
      console.log();
    } else {
      console.log(`${lang.toUpperCase()} | MISSING!\n`);
    }
  }
}
main().catch(console.error);
