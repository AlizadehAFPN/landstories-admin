/**
 * Translate Olympia site record to 10 languages and push to DynamoDB.
 *
 * Usage: node scripts/translate-olympia.mjs [--dry-run]
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
  if (match) process.env[match[1].trim()] = match[2].trim();
}

const DRY_RUN = process.argv.includes("--dry-run");
const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "eu-north-1",
});
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});
const TABLE = process.env.DYNAMO_TABLE_SITES || "Landstories";
const now = Math.floor(Date.now() / 1000);

const base = {
  PK: "SITE#olympia",
  category: "ancient_ruins",
  cityId: "olympia",
  constructionYear: "~2000 BCE (earliest cult activity), 776 BCE (first Olympics)",
  countryId: "GR",
  "GSI1-PK": "CAT#ancient_ruins",
  "GSI1-SK": now,
  lat: 37.6388,
  lng: 21.63,
  siteId: "olympia",
  thumbnail:
    "https://landstories-images.s3.eu-north-1.amazonaws.com/images/sites/olympia/1771155267060.webp",
  unesco: true,
  updatedAt: now,
};

/* ═══════════════════════════════════════════════════════════════════════════
   TRANSLATIONS
   ═══════════════════════════════════════════════════════════════════════════ */

const translations = {};

// ─── Shared helper to build lang fields ───
function langFields(lang) {
  return {
    lang,
    SK: `LANG#${lang}`,
    "GSI2-PK": `LANG#${lang}`,
    "GSI2-SK": now,
  };
}

// ════════════════════════════════════════════════════════════════════════════
//  The translations object is populated from individual files
// ════════════════════════════════════════════════════════════════════════════

import { es } from "./olympia-langs/es.mjs";
import { zh } from "./olympia-langs/zh.mjs";
import { fr } from "./olympia-langs/fr.mjs";
import { ar } from "./olympia-langs/ar.mjs";
import { fa } from "./olympia-langs/fa.mjs";
import { tr } from "./olympia-langs/tr.mjs";
import { ru } from "./olympia-langs/ru.mjs";
import { ko } from "./olympia-langs/ko.mjs";
import { de } from "./olympia-langs/de.mjs";
import { ja } from "./olympia-langs/ja.mjs";

Object.assign(translations, { es, zh, fr, ar, fa, tr, ru, ko, de, ja });

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════════════════ */

async function main() {
  const langs = Object.keys(translations);
  console.log(
    `${DRY_RUN ? "[DRY RUN] " : ""}Pushing ${langs.length} translations for olympia to table "${TABLE}"...\n`
  );

  for (const [lang, data] of Object.entries(translations)) {
    const item = { ...base, ...langFields(lang), ...data };
    console.log(`  ${DRY_RUN ? "[skip] " : ""}${lang} — ${item.title}`);

    if (!DRY_RUN) {
      await docClient.send(
        new PutCommand({
          TableName: TABLE,
          Item: item,
        })
      );
      console.log(`    ✓ pushed`);
    }
  }

  console.log(`\nDone. ${langs.length} languages processed. updatedAt = ${now}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
