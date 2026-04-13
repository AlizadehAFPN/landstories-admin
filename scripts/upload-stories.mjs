/**
 * Upload 4 stories × 11 languages to DynamoDB Story table.
 * Reads JSON files from /tmp/stories-final/
 *
 * Usage: node /tmp/upload-stories.mjs [--dry-run]
 */

import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

// Load .env.local for AWS credentials
const envFile = readFileSync(
  new URL("/Users/wallex/landstories-admin/.env.local", import.meta.url),
  "utf-8"
);
for (const line of envFile.split("\n")) {
  const match = line.match(/^(\w+)\s*=\s*(.+)$/);
  if (match) process.env[match[1]] = match[2].trim();
}

const DRY_RUN = process.argv.includes("--dry-run");
const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "eu-north-1",
});
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});
const TABLE = process.env.DYNAMO_TABLE_STORY || "Story";

const dir = "/tmp/stories-final";
const files = readdirSync(dir).filter(f => f.endsWith(".json")).sort();

console.log(`\n📦 Found ${files.length} story files to upload\n`);

// Group by story for display
const byStory = {};
for (const f of files) {
  const item = JSON.parse(readFileSync(join(dir, f), "utf-8"));
  const key = item.storyId || "unknown";
  if (!byStory[key]) byStory[key] = [];
  byStory[key].push(item.lang);
}
for (const [storyId, langs] of Object.entries(byStory)) {
  console.log(`  📖 ${storyId}: ${langs.sort().join(", ")}`);
}
console.log();

// Upload
let success = 0;
let failed = 0;

for (const f of files) {
  const filePath = join(dir, f);
  const item = JSON.parse(readFileSync(filePath, "utf-8"));
  const label = `[${item.lang}] ${item.storyId}`;

  // Ensure paragraphs are objects
  if (item.paragraphs) {
    item.paragraphs = item.paragraphs.map(p =>
      typeof p === "string" ? { text: p } : p
    );
  }

  if (DRY_RUN) {
    console.log(`🔍 DRY RUN: would put ${label}`);
    console.log(`   siteId: ${item.siteId}`);
    console.log(`   langStoryId: ${item.langStoryId}`);
    console.log(`   title: ${item.title}`);
    console.log(`   paragraphs: ${item.paragraphs?.length || 0}`);
    success++;
    continue;
  }

  try {
    await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: item,
      })
    );
    console.log(`✅ ${label} — "${item.title}"`);
    success++;
  } catch (err) {
    console.error(`❌ ${label} — ${err.message}`);
    failed++;
  }
}

console.log(
  `\n🏁 Done: ${success} succeeded, ${failed} failed${DRY_RUN ? " (dry run)" : ""}\n`
);

if (failed > 0) process.exit(1);
