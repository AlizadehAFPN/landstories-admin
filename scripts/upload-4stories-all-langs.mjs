/**
 * Upload 4 stories × 11 languages to DynamoDB Story table.
 *
 * Reads individual JSON files from /tmp/stories-* directories and
 * the fixed English versions from /tmp/stories-en-fixed/.
 *
 * Usage: node scripts/upload-4stories-all-langs.mjs [--dry-run]
 */

import { readFileSync, readdirSync, existsSync } from "fs";
import { join } from "path";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

// Load .env.local for AWS credentials
const envFile = readFileSync(
  new URL("../.env.local", import.meta.url),
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
const now = Math.floor(Date.now() / 1000);

// ─── Directories to scan ────────────────────────────────────────────────────
const dirs = [
  "/tmp/stories-en-fixed",
  "/tmp/stories-molon-labe",
  "/tmp/stories-napoleon-kremlin",
  "/tmp/stories-napoleon-pyramid",
  "/tmp/stories-nowruz",
];

const items = [];

for (const dir of dirs) {
  if (!existsSync(dir)) {
    console.warn(`⚠️  Directory not found: ${dir}`);
    continue;
  }

  const files = readdirSync(dir).filter((f) => f.endsWith(".json"));

  for (const file of files) {
    const filePath = join(dir, file);
    try {
      const item = JSON.parse(readFileSync(filePath, "utf-8"));

      // Ensure updatedAt is current
      item.updatedAt = now;

      // Ensure paragraphs are in correct format
      if (item.paragraphs) {
        item.paragraphs = item.paragraphs.map((p) =>
          typeof p === "string" ? { text: p } : p
        );
      }

      items.push({ item, file: filePath });
    } catch (err) {
      console.error(`❌ Could not read ${filePath}: ${err.message}`);
    }
  }
}

console.log(`\n📦 Found ${items.length} story records to upload\n`);

// Group by story for display
const byStory = {};
for (const { item } of items) {
  const key = item.storyId || "unknown";
  if (!byStory[key]) byStory[key] = [];
  byStory[key].push(item.lang);
}
for (const [storyId, langs] of Object.entries(byStory)) {
  console.log(`  📖 ${storyId}: ${langs.sort().join(", ")}`);
}
console.log();

// ─── Upload ──────────────────────────────────────────────────────────────────
let success = 0;
let failed = 0;

for (const { item, file } of items) {
  const label = `[${item.lang}] ${item.storyId}`;

  // Validate required fields
  if (!item.siteId || !item.langStoryId) {
    console.error(`❌ ${label} — missing siteId or langStoryId in ${file}`);
    failed++;
    continue;
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
