/**
 * Update "The Stones That Should Not Exist" (en) — editorial rewrite.
 * Touches: paragraphs, excerpt, moralOrLesson, readingTimeMinutes, updatedAt.
 * All other fields (title, subtitle, source, characters, etc.) stay untouched.
 *
 * Usage: node scripts/update-stones-should-not-exist-en.mjs
 */

import { readFileSync } from "fs";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  UpdateCommand,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";

/* ── env ─────────────────────────────────────────────────────────── */
const envFile = readFileSync(
  new URL("../.env.local", import.meta.url),
  "utf-8"
);
for (const line of envFile.split("\n")) {
  const match = line.match(/^(\w+)\s*=\s*(.+)$/);
  if (match) process.env[match[1]] = match[2].trim();
}

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "eu-north-1",
});
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});
const TABLE = process.env.DYNAMO_TABLE_STORY || "Story";

/* ── new content ─────────────────────────────────────────────────── */
const paragraphs = [
  {
    text: "Three stones sit in a wall in Baalbek, Lebanon. Each one weighs eight hundred tons. They\u2019re the foundation of the Temple of Jupiter \u2014 the largest religious structure the Roman Empire ever built. They fit together so tightly that a razor blade won\u2019t slide between them. No mortar. No cement. Just limestone against limestone, held by gravity and the skill of engineers who never signed their names.",
  },
  {
    text: "For centuries, nobody had the slightest idea how they got there. The mystery was so enormous it swallowed every rational answer whole. One Arabic legend said the city was built by Cain \u2014 Adam\u2019s son \u2014 with the help of giants. Islamic tradition credited supernatural beings called djinn, commanded by King Solomon. In the 1800s, an English explorer seriously proposed that prehistoric elephants were used as living cranes.",
  },
  {
    text: "When Mark Twain visited in 1867, he stared at the wall and wrote: \u201CHow those immense blocks were ever hauled from the quarries are mysteries that no man has solved.\u201D He wasn\u2019t exaggerating. The quarry sits half a mile away. Eight-hundred-ton blocks somehow crossed that distance two thousand years ago \u2014 no engines, no steel, no wheels strong enough to bear the weight. And yet, there the stones sit.",
  },
  {
    text: "The real answer came in 1977 from a French architect named Jean-Pierre Adam. He did the math. Sixteen rotating drums called capstans, each turned by thirty-two men, connected by hemp ropes and pulleys. Five hundred twelve workers total. The ground between the quarry and the temple slopes slightly downhill \u2014 gravity helped. The impossibly tight joints? A Roman technique where only the edges of each block are ground perfectly flat. No aliens. No giants. Just Rome being Rome.",
  },
  {
    text: "But the quarry had a bigger secret. Lying half-buried where it had rested for two thousand years was a partially carved block called the Stone of the Pregnant Woman. A thousand tons \u2014 even heavier than the three stones in the wall. It was nearly cut free from the bedrock but never moved. A crack during quarrying may have killed the project. Or maybe a plague hit. Or the money ran out. Nobody knows.",
  },
  {
    text: "The name comes from a local legend. A pregnant woman told the people of Baalbek she knew the secret to moving the impossible stone \u2014 if they\u2019d just feed her until she gave birth. They agreed. She ate well for nine months. When the baby came, she confessed she had absolutely no idea. It might be the greatest bluff in the history of folklore.",
  },
  {
    text: "Then in 2014, everything changed. A team led by archaeologist Dr. Jeanine Abdul Massih was digging beneath the Pregnant Woman when they struck something no one expected \u2014 a third stone, bigger than anything humans had ever carved. Nearly twenty metres long. Six metres wide. Over five metres tall. Sixteen hundred and fifty tons. Heavier than four fully loaded Boeing 747s. The largest worked stone in human history, hiding underground since the age of the Caesars.",
  },
  {
    text: "They hadn\u2019t even reached the bottom. Abdul Massih stood in the quarry and said: \u201CWe have no idea of the complete dimension.\u201D Two thousand years ago, Roman engineers looked at this rock and thought: we can use that. They shaped it, smoothed its surfaces, prepared it for transport \u2014 and then walked away forever. What they left behind isn\u2019t a monument to failure. It\u2019s proof that the biggest thing human hands ever carved from rock was meant for something even bigger.",
  },
];

const excerpt =
  "Three stones in a wall in Lebanon. Each one weighs eight hundred tons. Fitted so tightly a razor blade won\u2019t slide between them. No mortar. No cement. And for centuries, no explanation.";

const moralOrLesson =
  "The true measure of ambition isn\u2019t what you finish \u2014 it\u2019s what you dare to start. The Romans left the biggest stone ever carved sitting unfinished in a quarry, and two thousand years later, it still makes us wonder what they were building toward.";

/* ── fetch-then-update ───────────────────────────────────────────── */
async function main() {
  const key = { siteId: "baalbek", langStoryId: "en#stones-that-should-not-exist" };

  // 1. Verify the item exists
  const existing = await docClient.send(
    new GetCommand({ TableName: TABLE, Key: key })
  );
  if (!existing.Item) {
    console.error("Story not found!", key);
    process.exit(1);
  }
  console.log("Found story:", existing.Item.title);
  console.log("Old paragraph count:", existing.Item.paragraphs?.length);

  // 2. Update only translated fields + updatedAt
  const now = Math.floor(Date.now() / 1000);
  const result = await docClient.send(
    new UpdateCommand({
      TableName: TABLE,
      Key: key,
      UpdateExpression:
        "SET paragraphs = :p, excerpt = :e, moralOrLesson = :m, readingTimeMinutes = :r, updatedAt = :u",
      ExpressionAttributeValues: {
        ":p": paragraphs,
        ":e": excerpt,
        ":m": moralOrLesson,
        ":r": 3,
        ":u": now,
      },
      ReturnValues: "ALL_NEW",
    })
  );

  console.log("\nUpdate successful!");
  console.log("New paragraph count:", result.Attributes.paragraphs.length);
  console.log("New readingTimeMinutes:", result.Attributes.readingTimeMinutes);
  console.log("updatedAt:", result.Attributes.updatedAt);

  // 3. Quick verification
  console.log("\n--- First paragraph preview ---");
  console.log(result.Attributes.paragraphs[0].text.substring(0, 120) + "...");
  console.log("\n--- Excerpt ---");
  console.log(result.Attributes.excerpt);
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
