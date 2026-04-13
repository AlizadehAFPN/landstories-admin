/**
 * Update "The Council of Ephesus" English story — editorial polish.
 * Only updates: paragraphs, excerpt, updatedAt.
 * All other fields (metadata, coordinates, source, etc.) remain untouched.
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
const KEY = { siteId: "ephesus", langStoryId: "en#council-ephesus" };

// ─── REVISED PARAGRAPHS ─────────────────────────────────────────────

const updatedParagraphs = [
  {
    text: `In the summer of 431 AD, over two hundred bishops flooded into the ancient city of Ephesus \u2014 not to pray, but to fight. The Roman emperor had called a massive church council to settle a question that was ripping the Christian world apart: Was Mary simply the mother of a man who happened to be divine, or was she something far bigger \u2014 the Mother of God herself? The answer would shape what billions of people believed for the next sixteen hundred years.`,
  },
  {
    text: `On one side: Nestorius, Patriarch of Constantinople \u2014 the most powerful church leader in the eastern Roman Empire. His take: Mary gave birth to Christ\u2019s human nature only. Facing him was Cyril, Patriarch of Alexandria in Egypt, who wouldn\u2019t budge \u2014 Mary carried God in the flesh, end of story. But this was never just about theology. Constantinople and Alexandria had been at each other\u2019s throats for decades over who ran eastern Christianity. The doctrine fight was just the latest battlefield.`,
  },
  {
    text: `Cyril arrived in Ephesus first \u2014 and he didn\u2019t wait. The Syrian bishops backing Nestorius were still traveling when Cyril opened the council without them. In a single day, he put Nestorius on trial, condemned his teachings, and stripped him of his title. It was done before the other side even walked through the city gates. When the Syrians finally showed up, they were furious. They held their own rival council and excommunicated Cyril right back.`,
  },
  {
    text: `What followed was weeks of total chaos. Two groups of bishops roamed the streets of Ephesus, each calling the other side heretics and frauds. Monks from both camps brawled in public. Emperor Theodosius II \u2014 the man who called this whole council to bring unity \u2014 got so fed up he threw both Cyril and Nestorius in prison. A meeting meant to heal the church had turned into the most spectacular religious meltdown the Roman Empire had ever seen.`,
  },
  {
    text: `But Cyril knew how to play the long game. From behind bars, he launched a lobbying campaign that would make a modern politician blush: crates of gold, ivory, and fine silk quietly shipped to key officials at the imperial court. The bribes worked. The emperor released Cyril, upheld his verdict, and banished Nestorius to a remote desert in Egypt \u2014 where he spent his remaining years writing letters that nobody ever answered.`,
  },
  {
    text: `The council\u2019s ruling \u2014 that Mary is Theotokos, the Mother of God \u2014 became one of the defining doctrines of Christianity. Nearly sixteen hundred years later, it still sits at the heart of Catholic and Orthodox belief. And it all came down to a rigged vote, a backroom deal, and one bishop who understood something most people still don\u2019t: the winners don\u2019t just write history \u2014 they write the theology too.`,
  },
];

const updatedExcerpt =
  "In the summer of 431 AD, over two hundred bishops flooded into the ancient city of Ephesus \u2014 not to pray, but to fight.";

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

  console.log("\n\u2713 All done.");
}

main().catch(console.error);
