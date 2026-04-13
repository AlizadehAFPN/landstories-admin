/**
 * Update "The Solstice Alignment and Druid Mysteries" English story — editorial rewrite.
 * Only updates: paragraphs, excerpt, readingTimeMinutes, updatedAt.
 * All other fields (title, subtitle, metadata, coordinates, source, etc.) remain untouched.
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
const KEY = { siteId: "stonehenge", langStoryId: "en#solstice-druid-mysteries" };

// ─── REVISED PARAGRAPHS ─────────────────────────────────────────────

const updatedParagraphs = [
  {
    text: `Stonehenge wasn\u2019t placed randomly. Its main axis lines up perfectly with the midsummer sunrise and the midwinter sunset. Stand in the center on the longest day of the year \u2014 around June 21st \u2014 and the sun rises directly over a massive stone called the Heel Stone, shooting its first golden rays straight through the heart of the monument. That kind of precision doesn\u2019t happen by accident. Someone, five thousand years ago, designed it this way on purpose.`,
  },
  {
    text: `In the 1720s, a man named William Stukeley changed how the world saw Stonehenge. He was an English physician and clergyman who became the first person to carefully measure and map the site. When he noticed the solstice alignment, he became obsessed with an idea: the monument must have been built by the Druids, the powerful priests described by Roman general Julius Caesar as the spiritual leaders of ancient Celtic Britain. Stukeley even started calling himself \u201CPrince of the Druids.\u201D`,
  },
  {
    text: `Here\u2019s the thing \u2014 Stukeley was wrong. The Druids lived thousands of years after Stonehenge was built. But his idea took on a life of its own. By the 1800s, groups calling themselves Druids were holding ceremonies at Stonehenge in white robes at dawn. By the mid-1900s, the summer solstice had become a full-blown pilgrimage, drawing everyone from pagans and mystics to curious travelers who simply wanted to feel connected to something ancient and real.`,
  },
  {
    text: `Then things got ugly. By the early 1980s, the Stonehenge Free Festival \u2014 a wild celebration of music and alternative living \u2014 drew tens of thousands. Authorities banned it, worried about damage to the stones. On June 1, 1985, police intercepted around 600 travelers heading there. What followed was brutal: officers smashed vehicle windows, dragged families from buses, and arrested 537 people \u2014 the largest mass arrest in England since World War Two. It became known as the Battle of the Beanfield.`,
  },
  {
    text: `After years of negotiation, a compromise was reached. Since the year 2000, Stonehenge has opened its stone circle for free on both solstices. Every midsummer, between 20,000 and 37,000 people gather in the darkness \u2014 Druids in white robes, tourists with phones, families with little kids \u2014 and wait for dawn together. When the sun clears the Heel Stone and floods the circle with light, a massive cheer goes up. It\u2019s the same sunrise people watched here five thousand years ago.`,
  },
  {
    text: `The alignment drew serious scientists. In 1965, astronomer Gerald Hawkins published \u201CStonehenge Decoded,\u201D arguing that the monument worked like an ancient computer for predicting solar and lunar eclipses. Some of his claims didn\u2019t hold up, but the core idea stuck: Stonehenge tracks the sun and moon with stunning precision. Even the landscape helped \u2014 a natural ridge in the chalk beneath the site happens to point toward the solstice sunrise, as if the earth itself was already marking the spot.`,
  },
  {
    text: `The Druids didn\u2019t build Stonehenge. That much is settled. But Stukeley was right about one thing: this is a place where people have always reached for the sky. Five thousand years later, we\u2019re still doing it \u2014 standing in the same circle, watching the same sun, feeling the same pull that made someone drag stones from 150 miles away and set them in perfect line with the stars.`,
  },
];

const updatedExcerpt =
  "Stonehenge wasn\u2019t placed randomly. Its main axis lines up perfectly with the midsummer sunrise and the midwinter sunset. That kind of precision doesn\u2019t happen by accident.";

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
  let allValid = true;
  for (let i = 0; i < updatedParagraphs.length; i++) {
    const t = updatedParagraphs[i].text;
    const words = t.split(/\s+/).length;
    console.log(`  P${i + 1}: ${t.length} chars, ${words} words`);
    if (t.length > 500) {
      console.warn(`  \u26A0\uFE0F  P${i + 1} exceeds 500 chars!`);
      allValid = false;
    }
    if (words > 100) {
      console.warn(`  \u26A0\uFE0F  P${i + 1} exceeds 100 words!`);
      allValid = false;
    }
  }
  const newChars = updatedParagraphs.reduce((s, p) => s + p.text.length, 0);
  console.log(`  Total: ${newChars} chars (target ~3000 \u00B120%)`);

  if (!allValid) {
    console.error("\n\u2717 Validation failed! Fix paragraph lengths before updating.");
    process.exit(1);
  }

  // Update
  const now = Math.floor(Date.now() / 1000);
  await docClient.send(
    new UpdateCommand({
      TableName: TABLE,
      Key: KEY,
      UpdateExpression:
        "SET paragraphs = :p, excerpt = :e, readingTimeMinutes = :r, updatedAt = :u",
      ExpressionAttributeValues: {
        ":p": updatedParagraphs,
        ":e": updatedExcerpt,
        ":r": 3,
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
  console.log("  Reading time:", updated.readingTimeMinutes, "min");
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
  console.log("  moralOrLesson:", updated.moralOrLesson?.substring(0, 60) + "...");
  console.log("  characters:", JSON.stringify(updated.characters));
  console.log("  era:", updated.era);

  console.log("\n\u2713 All done.");
}

main().catch(console.error);
