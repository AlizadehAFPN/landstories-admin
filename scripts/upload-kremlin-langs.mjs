import { readFileSync } from "fs";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

// Load env
const envFile = readFileSync("/Users/wallex/landstories-admin/.env.local", "utf-8");
for (const line of envFile.split("\n")) {
  const match = line.match(/^(\w+)\s*=\s*(.+)$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
}

const client = new DynamoDBClient({ region: process.env.AWS_REGION || "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, { marshallOptions: { removeUndefinedValues: true } });

// Load the English source to get shared fields
const enData = JSON.parse(readFileSync("/tmp/moscow-kremlin-en.json", "utf-8"));

// Load all 3 language files
const euLangs = JSON.parse(readFileSync("/tmp/kremlin-eu-langs.json", "utf-8"));
const menaLangs = JSON.parse(readFileSync("/tmp/kremlin-mena-langs.json", "utf-8"));
const asiaEsLangs = JSON.parse(readFileSync("/tmp/kremlin-asia-es-langs.json", "utf-8"));

// Merge all into one object
const allLangs = { ...euLangs, ...menaLangs, ...asiaEsLangs };

const now = Math.floor(Date.now() / 1000);

async function uploadLang(lang, content) {
  // Check if already exists
  const existing = await docClient.send(new GetCommand({
    TableName: "Landstories",
    Key: { PK: `SITE#moscow-kremlin`, SK: `LANG#${lang}` }
  }));

  if (existing.Item) {
    console.log(`  ${lang}: ALREADY EXISTS — skipping (title="${existing.Item.title}")`);
    return false;
  }

  const item = {
    // DynamoDB keys
    PK: `SITE#moscow-kremlin`,
    SK: `LANG#${lang}`,
    "GSI1-PK": `CAT#${enData.category}`,
    "GSI1-SK": now,
    "GSI2-PK": `LANG#${lang}`,
    "GSI2-SK": now,

    // Shared fields (from English source)
    siteId: "moscow-kremlin",
    lang,
    lat: enData.lat,
    lng: enData.lng,
    category: enData.category,
    countryId: enData.countryId,
    cityId: enData.cityId,
    unesco: enData.unesco,
    thumbnail: enData.thumbnail,
    nameLocal: enData.nameLocal, // Always "Московский Кремль"
    updatedAt: now,
    disabled: true, // Start disabled

    // Language-specific content
    title: content.title,
    shortDescription: content.shortDescription,
    description: content.description,
    builder: content.builder,
    historicalPeriod: content.historicalPeriod,
    constructionYear: content.constructionYear,
    historicalSignificance: content.historicalSignificance,
    funFacts: content.funFacts,
    timeline: content.timeline,
    tags: content.tags,
  };

  await docClient.send(new PutCommand({
    TableName: "Landstories",
    Item: item,
  }));

  console.log(`  ${lang}: UPLOADED — "${content.title}"`);
  return true;
}

async function main() {
  const langs = Object.keys(allLangs).sort();
  console.log(`Uploading ${langs.length} language versions for moscow-kremlin...\n`);

  let uploaded = 0;
  let skipped = 0;

  for (const lang of langs) {
    try {
      const result = await uploadLang(lang, allLangs[lang]);
      if (result) uploaded++;
      else skipped++;
    } catch (err) {
      console.error(`  ${lang}: ERROR — ${err.message}`);
    }
  }

  console.log(`\nDone! Uploaded: ${uploaded}, Skipped: ${skipped}, Total: ${langs.length}`);
}

main().catch(console.error);
