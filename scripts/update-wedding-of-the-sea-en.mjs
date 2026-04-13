/**
 * Update "The Wedding of the Sea (Sposalizio del Mare)" English story — editorial rewrite.
 * Only updates: paragraphs, excerpt, updatedAt.
 * All other fields (metadata, coordinates, source, characters, etc.) remain untouched.
 */

import { readFileSync } from "fs";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

// Load env
const envFile = readFileSync("/Users/wallex/landstories-admin/.env.local", "utf-8");
for (const line of envFile.split("\n")) {
  const match = line.match(/^(\w+)\s*=\s*(.+)$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
}

const client = new DynamoDBClient({ region: process.env.AWS_REGION || "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const KEY = { siteId: "venice-st-marks-doges", langStoryId: "en#wedding-of-the-sea" };

// ─── REVISED PARAGRAPHS ─────────────────────────────────────────────

const updatedParagraphs = [
  {
    text: `Once a year, for almost 800 years, the leader of Venice did something no other ruler in history ever tried \u2014 he married the ocean. Not as a joke. Not as a metaphor. As an official act of government. The Doge, Venice\u2019s elected ruler for life, would board a massive golden barge, sail out to the open Adriatic, pull a gold ring off his finger, and drop it into the waves. His declaration: \u201CWe wed thee, Sea, as a sign of true and permanent rule.\u201D And he meant every word.`,
  },
  {
    text: `It started around the year 1000. Venice was a young city built on stilts in a lagoon, and pirates from the coast of what\u2019s now Croatia were choking its trade routes. So Doge Pietro Orseolo II sailed the whole Venetian fleet across the Adriatic, crushed the pirates, and seized the coast. He came home on Ascension Day \u2014 a major Christian holiday \u2014 and celebrated by sailing to open water and claiming the sea itself as Venetian property. Every Doge after him repeated the vow, same day, every year.`,
  },
  {
    text: `The ceremony got an upgrade in 1177. Pope Alexander III was on the run from the Holy Roman Emperor Frederick Barbarossa \u2014 at the time, the most powerful man in Europe \u2014 and Venice gave him shelter and brokered a peace deal. The grateful Pope handed the Doge a golden ring and declared that Venice now had God\u2019s own blessing to \u201Cwed\u201D the Adriatic each year. They called it the Sposalizio del Mare \u2014 the Wedding of the Sea. It wasn\u2019t just a power play anymore. It was sacred.`,
  },
  {
    text: `The real showstopper was the Bucintoro \u2014 the Doge\u2019s ceremonial barge. The final version, built in 1729, stretched 35 meters long, coated in gold leaf, draped in red silk, and rowed by 168 oarsmen. Foreign diplomats wrote home that nothing in Europe \u2014 no coronation, not even the spectacles at Versailles \u2014 could match this golden ship gliding across the water, trailed by hundreds of boats, the Doge standing at the front like a groom walking down the aisle.`,
  },
  {
    text: `The last real ceremony took place on Ascension Day, 1797. Twelve days later, Napoleon\u2019s army marched into Venice and the republic voted to dissolve itself \u2014 ending 1,100 years of unbroken self-rule. Napoleon knew exactly what he was doing next. He had the Bucintoro\u2019s gold stripped and melted down, then set fire to what was left. The ashes of the most stunning ship ever built were dumped into the same water it had once sailed in triumph. He didn\u2019t just conquer Venice. He burned its wedding dress.`,
  },
  {
    text: `The ceremony was brought back in the 1900s and still happens every year \u2014 though now it\u2019s the mayor, not a Doge, who tosses the ring. Think about what that means: somewhere on the floor of the Adriatic, beneath the waves off the Venice coast, there are roughly 800 years of gold rings sitting in the mud. The price a republic paid, year after year, to stay married to the sea. And for a thousand years, Venice kept its vows.`,
  },
];

const updatedExcerpt =
  "Once a year, for almost 800 years, the leader of Venice did something no other ruler in history ever tried \u2014 he married the ocean.";

// ─── EXECUTE ─────────────────────────────────────────────────────────

async function main() {
  // Verify item exists
  const { Item: current } = await docClient.send(
    new GetCommand({ TableName: TABLE, Key: KEY })
  );
  if (!current) {
    console.error("\u2717 Story not found!");
    process.exit(1);
  }

  console.log("\u2500\u2500\u2500 Current story \u2500\u2500\u2500");
  console.log("  Title:", current.title);
  console.log("  Paragraphs:", current.paragraphs.length);
  const oldChars = current.paragraphs.reduce((s, p) => s + p.text.length, 0);
  console.log("  Total chars:", oldChars);

  // Validate new paragraphs
  console.log("\n\u2500\u2500\u2500 New paragraph stats \u2500\u2500\u2500");
  for (let i = 0; i < updatedParagraphs.length; i++) {
    const t = updatedParagraphs[i].text;
    const words = t.split(/\s+/).length;
    console.log(`  P${i + 1}: ${t.length} chars, ${words} words`);
    if (t.length > 500) console.warn(`  \u26A0\uFE0F  P${i + 1} exceeds 500 chars!`);
    if (words > 100) console.warn(`  \u26A0\uFE0F  P${i + 1} exceeds 100 words!`);
  }
  const newChars = updatedParagraphs.reduce((s, p) => s + p.text.length, 0);
  console.log(`  Total: ${newChars} chars (target ~3000 \u00B120%)`);

  // Update
  const now = Math.floor(Date.now() / 1000);
  await docClient.send(
    new UpdateCommand({
      TableName: TABLE,
      Key: KEY,
      UpdateExpression: "SET paragraphs = :p, excerpt = :e, updatedAt = :u",
      ExpressionAttributeValues: {
        ":p": updatedParagraphs,
        ":e": updatedExcerpt,
        ":u": now,
      },
    })
  );
  console.log("\n\u2713 Story updated successfully");

  // Verify
  const { Item: updated } = await docClient.send(
    new GetCommand({ TableName: TABLE, Key: KEY })
  );
  console.log("\n\u2500\u2500\u2500 Verification \u2500\u2500\u2500");
  console.log("  Title:", updated.title);
  console.log("  Subtitle:", updated.subtitle);
  console.log("  Excerpt:", updated.excerpt);
  console.log("  Paragraphs:", updated.paragraphs.length);
  for (let i = 0; i < updated.paragraphs.length; i++) {
    const t = updated.paragraphs[i].text;
    console.log(`  P${i + 1}: ${t.length} chars, ${t.split(/\s+/).length} words`);
  }
  const verifyChars = updated.paragraphs.reduce((s, p) => s + p.text.length, 0);
  console.log(`  Total: ${verifyChars} chars`);

  // Confirm unchanged fields
  console.log("\n\u2500\u2500\u2500 Unchanged fields check \u2500\u2500\u2500");
  console.log("  siteId:", updated.siteId);
  console.log("  langStoryId:", updated.langStoryId);
  console.log("  storyCategory:", updated.storyCategory);
  console.log("  tier:", updated.tier);
  console.log("  source:", updated.source);
  console.log("  icon:", updated.icon);
  console.log("  characters:", JSON.stringify(updated.characters));
  console.log("  moralOrLesson:", updated.moralOrLesson);
  console.log("  coordinates:", JSON.stringify(updated.coordinates));

  console.log("\n\u2713 All done.");
}

main().catch(console.error);
