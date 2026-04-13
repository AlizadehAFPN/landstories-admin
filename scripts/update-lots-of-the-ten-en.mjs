/**
 * Update "The Lots of the Ten" English story — full editorial rewrite.
 * Only updates: paragraphs, readingTimeMinutes, updatedAt.
 * All other fields (title, subtitle, excerpt, source, coordinates, etc.) remain untouched.
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
const KEY = { siteId: "masada", langStoryId: "en#lots-of-the-ten" };

// ─── REVISED PARAGRAPHS ─────────────────────────────────────────────

const updatedParagraphs = [
  {
    text: `In 1963, Yigael Yadin climbed Masada with thousands of volunteers from twenty-eight countries. Yadin wasn\u2019t just an archaeologist \u2014 he\u2019d commanded Israel\u2019s army during its 1948 war of independence. Now he was digging into the desert fortress where, in 73 CE, nearly a thousand Jewish rebels chose death over surrender to Rome. The ancient historian Josephus claimed that on the final night, ten men were chosen by lot to kill everyone else. Yadin wanted to find those lots.`,
  },
  {
    text: `He found something extraordinary. Near the southern gate, his team pulled eleven pottery shards from the dirt \u2014 each scratched with a name. One read \u201CBen Ya\u2019ir.\u201D That was the name of Eleazar ben Ya\u2019ir, the commander who\u2019d convinced his people to choose death over slavery. \u201CWe can imagine the feelings of the man who drew the lot,\u201D Yadin wrote. The world was captivated \u2014 physical proof of the most dramatic night in Jewish history, right there in the dust.`,
  },
  {
    text: `But scholars pushed back hard. There were eleven shards, not ten as Josephus specified. \u201CBen Ya\u2019ir\u201D was a common name in the first century \u2014 finding it proved nothing, like finding \u201CSmith\u201D at a modern dig. Hundreds of similar name-shards had turned up across Masada, used for mundane things like work rosters and food rations. And Josephus was writing under the sponsorship of the very Roman emperors who\u2019d destroyed Jerusalem. A noble suicide made a far better story than a messy, chaotic end.`,
  },
  {
    text: `Then there were the bodies. In the ruins of the Northern Palace bathhouse, diggers uncovered three skeletons: a young man around twenty, a woman of about eighteen, and a child. Near the woman lay braided hair \u2014 still intact after two thousand years, preserved by the bone-dry desert air. She had braided her hair knowing she was about to die. The image was unforgettable. But right nearby lay pig bones. Jews didn\u2019t keep pigs. Romans did. Were these fallen defenders \u2014 or Roman soldiers?`,
  },
  {
    text: `Israel answered with politics, not science. In 1969, twenty-seven sets of remains received a full military funeral on the slopes of Masada \u2014 flag-draped coffins, honor guard, gun salute. The ceremony treated as fact what archaeology couldn\u2019t prove. Nachman Ben-Yehuda later showed how textbooks quietly erased an ugly truth: the defenders weren\u2019t heroes. They\u2019d massacred seven hundred fellow Jews at a nearby village before fleeing to the mountain. The myth was more useful than the mess.`,
  },
  {
    text: `But the dig also uncovered something no controversy could touch. Among the scrolls in the ruins lay a fragment of Ezekiel 37 \u2014 the prophet\u2019s vision of a valley filled with dry bones, where God asks: \u201CCan these bones live?\u201D A passage about national resurrection, found at the exact spot where a nation\u2019s last resistance died. Then, in 2005, scientists planted a date palm seed recovered from Yadin\u2019s dig. Two thousand years old. It sprouted, it grew, and they named the tree Methuselah.`,
  },
  {
    text: `The shards may not be the lots. The bones may not be defenders. The speeches may never have been spoken. But the scrolls were real \u2014 read by real people in a real synagogue on a real mountaintop. And that seed was real, buried for two millennia beneath the rubble, waiting for someone to give it water and light. Can these bones live? At Masada, even the seeds say yes.`,
  },
];

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
  let anyFail = false;
  for (let i = 0; i < updatedParagraphs.length; i++) {
    const t = updatedParagraphs[i].text;
    const words = t.split(/\s+/).length;
    console.log(`  P${i + 1}: ${t.length} chars, ${words} words`);
    if (t.length > 500) {
      console.warn(`  \u26A0\uFE0F  P${i + 1} exceeds 500 chars!`);
      anyFail = true;
    }
    if (words > 100) {
      console.warn(`  \u26A0\uFE0F  P${i + 1} exceeds 100 words!`);
      anyFail = true;
    }
  }
  const newChars = updatedParagraphs.reduce((s, p) => s + p.text.length, 0);
  console.log(`  Total: ${newChars} chars (target ~3000 \u00B120%)`);
  console.log(`  Paragraphs: ${updatedParagraphs.length} (target 6-8)`);

  if (anyFail) {
    console.error("\n\u2717 Validation failed — aborting.");
    process.exit(1);
  }

  // Update only paragraphs, readingTimeMinutes, and updatedAt
  const now = Math.floor(Date.now() / 1000);
  await docClient.send(
    new UpdateCommand({
      TableName: TABLE,
      Key: KEY,
      UpdateExpression:
        "SET paragraphs = :p, readingTimeMinutes = :r, updatedAt = :u",
      ExpressionAttributeValues: {
        ":p": updatedParagraphs,
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
  console.log("  Paragraphs:", updated.paragraphs.length);
  for (let i = 0; i < updated.paragraphs.length; i++) {
    const t = updated.paragraphs[i].text;
    console.log(`  P${i + 1}: ${t.length} chars, ${t.split(/\s+/).length} words`);
  }
  const verifyChars = updated.paragraphs.reduce((s, p) => s + p.text.length, 0);
  console.log(`  Total: ${verifyChars} chars`);
  console.log(`  readingTimeMinutes: ${updated.readingTimeMinutes}`);

  // Confirm unchanged fields
  console.log("\n\u2500\u2500\u2500 Unchanged fields check \u2500\u2500\u2500");
  console.log("  siteId:", updated.siteId);
  console.log("  langStoryId:", updated.langStoryId);
  console.log("  storyCategory:", updated.storyCategory);
  console.log("  tier:", updated.tier);
  console.log("  icon:", updated.icon);
  console.log("  source:", updated.source?.substring(0, 80) + "...");
  console.log("  moralOrLesson:", updated.moralOrLesson?.substring(0, 80) + "...");
  console.log("  characters:", updated.characters?.length, "entries");

  console.log("\n\u2713 All done.");
}

main().catch(console.error);
