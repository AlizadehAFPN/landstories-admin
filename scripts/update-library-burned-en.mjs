/**
 * Update "The Library That Burned for Seven Days" — English version
 * siteId: alamut-castle
 * langStoryId: en#library-burned-seven-days
 *
 * Only updates translated text fields: paragraphs, subtitle, excerpt, moralOrLesson, updatedAt
 * Does NOT touch: siteId, storyId, lang, icon, tier, storyCategory, era, characters,
 *                 coordinates, thumbnail, image, source, isFree, isFeatured, hasAudio, disabled
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

// ─── New paragraphs ────────────────────────────────────────────────
const paragraphs = [
  {
    text: `In 1090, a scholar named Hassan-i Sabbah pulled off one of the boldest moves in medieval history. He captured Alamut Castle — a fortress perched on a rock in the Alborz Mountains of northern Iran — without spilling a single drop of blood. Then he locked himself inside and barely left for the next thirty-four years. What did he do in there? He read. He collected. He built one of the greatest libraries the Islamic world had ever seen.`,
  },
  {
    text: `For over a hundred and sixty years, every leader who followed Hassan added to that collection. By the mid-1200s, the library held around four hundred thousand volumes — works on theology, philosophy, astronomy, medicine, poetry. Scholars from across the Muslim world made the long journey to this remote mountain valley just to study there. This wasn't just a book collection. It was one of the great centers of knowledge on earth.`,
  },
  {
    text: `One of those scholars was Nasir al-Din al-Tusi — probably the most brilliant scientific mind in the thirteenth-century Islamic world. He lived at Alamut for over thirty years, and during that time he wrote groundbreaking work on astronomy that would eventually reach Copernicus in Renaissance Europe. He used the library the way only a genius can — not just reading, but connecting ideas across fields, pushing the edges of what anyone thought was possible.`,
  },
  {
    text: `In 1256, the Mongols came. Hulagu Khan — grandson of Genghis Khan — marched over a hundred thousand soldiers into the mountains with one goal: wipe out the community that had held Alamut for nearly two centuries. The last leader, a young man named Rukn al-Din Khurshah, tried to negotiate. He even started tearing down his own castle walls to show he'd surrender. It didn't matter. Hulagu wanted total destruction.`,
  },
  {
    text: `Here's what really stings. Before the fire was lit, a historian named Juvayni — who was traveling with the Mongol army — was allowed to walk through the library. He was an educated man. He understood exactly what he was looking at. He saved the Qurans. He saved the astronomical instruments. He even read Hassan-i Sabbah's autobiography — the only first-person account of how Alamut was founded. Then he set fire to everything else. The library of Alamut burned for seven days and seven nights.`,
  },
  {
    text: `Al-Tusi survived. He switched sides — whether out of betrayal or survival instinct, nobody's sure — and became Hulagu Khan's chief science adviser. He convinced the warlord to build an observatory in Maragha, Iran, and filled it with four hundred thousand books — the same number as Alamut — gathered from conquered cities. The work produced there would reach Copernicus centuries later. Some of what lived inside al-Tusi's mind made it through the fire. But only some.`,
  },
  {
    text: `Today, only about a third of Alamut's original structure survives as ruins on that same rock in the Alborz Mountains. Archaeologists have found water channels still holding water after eight centuries. People came back after the Mongols left — they always do. But the library is gone. Four hundred thousand volumes. Centuries of thought and poetry — turned to ash in a single week. We know what one brilliant man carried out in his memory. We will never know what burned.`,
  },
];

const subtitle =
  "Four hundred thousand books, a fire that burned for seven days, and the knowledge lost forever";

const excerpt =
  "A historian walked through the greatest library in the Alborz Mountains and chose what to save. He kept the Qurans. He kept the astronomical instruments. Then he set fire to everything else. The library of Alamut burned for seven days and seven nights.";

const moralOrLesson =
  "You can rebuild walls. You can restore kingdoms. But you can never un-burn a book. The greatest tragedy of Alamut isn't what was lost — it's that we'll never even know what was lost.";

// ─── Validation ────────────────────────────────────────────────────

let totalChars = 0;
let allValid = true;

for (let i = 0; i < paragraphs.length; i++) {
  const t = paragraphs[i].text;
  const chars = t.length;
  const words = t.split(/\s+/).length;
  totalChars += chars;

  const charOk = chars <= 500;
  const wordOk = words <= 100;

  console.log(
    `P${i + 1}: ${chars} chars, ${words} words ${charOk ? "✓" : "✗ OVER 500 CHARS"} ${wordOk ? "✓" : "✗ OVER 100 WORDS"}`
  );

  if (!charOk || !wordOk) allValid = false;
}

console.log(`\nTotal: ${totalChars} chars across ${paragraphs.length} paragraphs`);
console.log(`Target: ~3000 chars (±20% = 2400–3600)`);
console.log(
  `Status: ${totalChars >= 2400 && totalChars <= 3600 ? "✓ WITHIN RANGE" : "✗ OUT OF RANGE"}`
);

if (!allValid) {
  console.error("\n❌ Validation failed — aborting.");
  process.exit(1);
}

if (totalChars < 2400 || totalChars > 3600) {
  console.error("\n❌ Total character count out of range — aborting.");
  process.exit(1);
}

// ─── Push to DynamoDB ──────────────────────────────────────────────

const updatedAt = Math.floor(Date.now() / 1000);

const command = new UpdateCommand({
  TableName: "Story",
  Key: {
    siteId: "alamut-castle",
    langStoryId: "en#library-burned-seven-days",
  },
  UpdateExpression:
    "SET paragraphs = :p, subtitle = :s, excerpt = :e, moralOrLesson = :m, updatedAt = :u",
  ExpressionAttributeValues: {
    ":p": paragraphs,
    ":s": subtitle,
    ":e": excerpt,
    ":m": moralOrLesson,
    ":u": updatedAt,
  },
  ReturnValues: "ALL_NEW",
});

try {
  const result = await docClient.send(command);
  console.log("\n✅ Story updated successfully in DynamoDB.");
  console.log(`   updatedAt: ${updatedAt}`);
  console.log(`   title: ${result.Attributes?.title}`);
  console.log(`   paragraphs: ${result.Attributes?.paragraphs?.length} paragraphs`);
  console.log(`   subtitle: ${result.Attributes?.subtitle}`);
} catch (err) {
  console.error("\n❌ DynamoDB update failed:", err.message);
  process.exit(1);
}
