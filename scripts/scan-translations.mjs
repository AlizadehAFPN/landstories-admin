/**
 * Scan Landstories table to find all English items and check which translations exist.
 * Usage: node scripts/scan-translations.mjs
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client);

const TABLE = "Landstories";
const TARGET_LANGS = ['es', 'zh', 'fr', 'ar', 'fa', 'tr', 'ru', 'ko', 'de', 'ja'];

async function scanAll() {
  const items = [];
  let lastKey;
  do {
    const res = await docClient.send(new ScanCommand({
      TableName: TABLE,
      ExclusiveStartKey: lastKey,
    }));
    items.push(...(res.Items ?? []));
    lastKey = res.LastEvaluatedKey;
  } while (lastKey);
  return items;
}

async function main() {
  console.log("Scanning Landstories table...\n");
  const allItems = await scanAll();
  console.log(`Total items in table: ${allItems.length}\n`);

  // Group by siteId
  const bySite = {};
  for (const item of allItems) {
    const sid = item.siteId;
    if (!bySite[sid]) bySite[sid] = {};
    bySite[sid][item.lang] = item;
  }

  const siteIds = Object.keys(bySite).sort();
  console.log(`Total unique sites: ${siteIds.length}\n`);

  // Check English items and their translations
  let totalMissing = 0;
  for (const siteId of siteIds) {
    const langs = Object.keys(bySite[siteId]).sort();
    const hasEn = langs.includes("en");
    const missingLangs = TARGET_LANGS.filter(l => !langs.includes(l));

    if (hasEn) {
      console.log(`Site: ${siteId}`);
      console.log(`  Title: ${bySite[siteId].en.title}`);
      console.log(`  Existing langs: ${langs.join(", ")}`);
      if (missingLangs.length > 0) {
        console.log(`  MISSING langs: ${missingLangs.join(", ")}`);
        totalMissing += missingLangs.length;
      } else {
        console.log(`  All translations present!`);
      }
      console.log();
    } else {
      console.log(`Site: ${siteId} — NO ENGLISH VERSION FOUND (langs: ${langs.join(", ")})\n`);
    }
  }

  console.log(`\n===== SUMMARY =====`);
  console.log(`Sites with English: ${siteIds.filter(s => bySite[s].en).length}`);
  console.log(`Total missing translations: ${totalMissing}`);
}

main().catch(console.error);
