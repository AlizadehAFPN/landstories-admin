/**
 * Upload Karnak Temple Complex stories in 10 languages to DynamoDB Story table.
 *
 * Reads the generated JSON files from the parallel story-generation agents,
 * merges them with the base story metadata from the English reference,
 * and writes each story record to DynamoDB.
 *
 * Usage: node scripts/upload-karnak-stories.mjs [--dry-run]
 */

import { readFileSync } from "fs";
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

// ─── Load English reference (base metadata) ─────────────────────────────────
const englishRef = JSON.parse(
  readFileSync(new URL("./karnak-english-ref.json", import.meta.url), "utf-8")
);

// ─── Load generated story files ──────────────────────────────────────────────
const storyFiles = [
  "./karnak-stories-es-fr.json",
  "./karnak-stories-de-ru.json",
  "./karnak-stories-ar-fa.json",
  "./karnak-stories-tr.json",
  "./karnak-stories-zh-ja-ko.json",
];

// Merge all language data by storyId
const langDataByStoryId = {};

for (const file of storyFiles) {
  let data;
  try {
    data = JSON.parse(
      readFileSync(new URL(file, import.meta.url), "utf-8")
    );
  } catch (err) {
    console.error(`⚠️  Could not read ${file}: ${err.message}`);
    continue;
  }

  for (const story of data.stories) {
    if (!langDataByStoryId[story.storyId]) {
      langDataByStoryId[story.storyId] = {};
    }
    // Collect all language keys (everything except storyId)
    for (const [key, value] of Object.entries(story)) {
      if (key !== "storyId") {
        langDataByStoryId[story.storyId][key] = value;
      }
    }
  }
}

// ─── Build DynamoDB items ────────────────────────────────────────────────────
const items = [];

for (const baseStory of englishRef.stories) {
  const storyId = baseStory.storyId;
  const langData = langDataByStoryId[storyId] || {};

  for (const [lang, content] of Object.entries(langData)) {
    const item = {
      // Keys
      siteId: "karnak-temple",
      langStoryId: `${lang}#${storyId}`,

      // Story identity
      storyId,
      lang,

      // Content from generated files
      title: content.title,
      subtitle: content.subtitle,
      excerpt: content.excerpt,
      moralOrLesson: content.moralOrLesson,
      era: content.era,
      characters: content.characters,
      paragraphs: content.paragraphs.map((text) =>
        typeof text === "string" ? { text } : text
      ),

      // Base metadata from English reference
      icon: baseStory.icon,
      tier: baseStory.tier,
      storyCategory: baseStory.storyCategory,
      isFree: baseStory.isFree,
      hasAudio: baseStory.hasAudio,
      disabled: baseStory.disabled,
      readingTimeMinutes: baseStory.readingTimeMinutes,
      coordinates: baseStory.coordinates,
      image: baseStory.image,
      thumbnail: baseStory.thumbnail,
      source: baseStory.source,

      // Timestamp
      updatedAt: now,
    };

    items.push(item);
  }
}

console.log(
  `\n📦 Prepared ${items.length} story records for ${new Set(items.map((i) => i.lang)).size} languages\n`
);

// ─── Upload ──────────────────────────────────────────────────────────────────
let success = 0;
let failed = 0;

for (const item of items) {
  const label = `[${item.lang}] ${item.storyId}`;

  if (DRY_RUN) {
    console.log(`🔍 DRY RUN: would put ${label}`);
    console.log(`   title: ${item.title}`);
    console.log(`   paragraphs: ${item.paragraphs.length}`);
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
