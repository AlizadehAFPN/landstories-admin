/**
 * Scan Story table to count enabled English stories and existing translations.
 * Usage: node scripts/scan-story-translations.mjs
 */

import { readFileSync } from "fs";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

// Load .env.local
const envFile = readFileSync(new URL("../.env.local", import.meta.url), "utf-8");
for (const line of envFile.split("\n")) {
  const match = line.match(/^(\w+)\s*=\s*(.+)$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
}

const client = new DynamoDBClient({ region: process.env.AWS_REGION || "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});
const TABLE = process.env.DYNAMO_TABLE_STORY || "Story";

const TARGET_LANGS = ["es", "zh", "fr", "ar", "fa", "tr", "ru", "ko", "de", "ja"];

async function scanAll() {
  const items = [];
  let lastKey = undefined;
  do {
    const res = await docClient.send(
      new ScanCommand({
        TableName: TABLE,
        ExclusiveStartKey: lastKey,
      })
    );
    items.push(...(res.Items || []));
    lastKey = res.LastEvaluatedKey;
  } while (lastKey);
  return items;
}

const allStories = await scanAll();
console.log(`Total records in Story table: ${allStories.length}`);

// Group by storyId+siteId
const storyMap = new Map(); // key = siteId#storyId -> { langs: Set, disabled, ... }

for (const item of allStories) {
  const key = `${item.siteId}#${item.storyId}`;
  if (!storyMap.has(key)) {
    storyMap.set(key, { siteId: item.siteId, storyId: item.storyId, langs: new Map(), enDisabled: null });
  }
  const entry = storyMap.get(key);
  entry.langs.set(item.lang, { disabled: item.disabled, title: item.title });
  if (item.lang === "en") {
    entry.enDisabled = item.disabled || false;
  }
}

// Count enabled English stories
const enabledEnglish = [];
for (const [key, entry] of storyMap) {
  if (entry.langs.has("en") && !entry.enDisabled) {
    enabledEnglish.push(entry);
  }
}

console.log(`\nUnique stories (by siteId+storyId): ${storyMap.size}`);
console.log(`Enabled English stories: ${enabledEnglish.length}`);

// Count missing translations for enabled stories
let totalMissing = 0;
let totalExisting = 0;
const missingByLang = {};
TARGET_LANGS.forEach((l) => (missingByLang[l] = 0));

for (const entry of enabledEnglish) {
  for (const lang of TARGET_LANGS) {
    if (entry.langs.has(lang)) {
      totalExisting++;
    } else {
      totalMissing++;
      missingByLang[lang]++;
    }
  }
}

console.log(`\nExisting translations (for enabled stories): ${totalExisting}`);
console.log(`Missing translations to create: ${totalMissing}`);
console.log(`\nMissing by language:`);
for (const [lang, count] of Object.entries(missingByLang)) {
  console.log(`  ${lang}: ${count} missing`);
}

// Cost estimation
// Each story recreation: ~4000 input tokens + ~3000 output tokens (using Sonnet 4.5)
// Sonnet 4.5: $3/M input, $15/M output
const inputCostPerStory = 4000 * (3 / 1_000_000);
const outputCostPerStory = 3000 * (15 / 1_000_000);
const costPerStory = inputCostPerStory + outputCostPerStory;
const totalCost = totalMissing * costPerStory;

console.log(`\n--- Cost Estimation (Claude Sonnet 4.5) ---`);
console.log(`Cost per story: ~$${costPerStory.toFixed(4)}`);
console.log(`Total stories to create: ${totalMissing}`);
console.log(`Estimated total cost: ~$${totalCost.toFixed(2)}`);

// Also print a sample of existing stories
console.log(`\n--- Sample enabled English stories (first 10) ---`);
for (const entry of enabledEnglish.slice(0, 10)) {
  const existingLangs = TARGET_LANGS.filter((l) => entry.langs.has(l));
  console.log(`  ${entry.siteId} / ${entry.storyId} — existing: [${existingLangs.join(", ")}]`);
}
