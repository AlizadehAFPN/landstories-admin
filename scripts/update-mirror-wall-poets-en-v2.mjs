import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const docClient = DynamoDBDocumentClient.from(client);

// ─── EDITED PARAGRAPHS (v2) ────────────────────────────────────────────────
//
// EDITING PHILOSOPHY:
//   Only the VOICE changes. Every historical fact, every quoted inscription,
//   every structural paragraph stays aligned with translated versions.
//
// CHANGES PER PARAGRAPH:
//   P1 — "frescoes" replaced (fails vocab test); added Sigiriya context
//         ("a rock fortress rising out of the jungle"); "golden stillness"
//         → "in gold among the clouds" (less purple, more visual).
//   P2 — "killed by" → "killed in battle by" (more vivid); "These visitors"
//         → "Visitors" (tighter); smoothed transition phrasing.
//   P3 — "deep thoughts" → "reflections on life" (more specific); "a deeply
//         human impulse" → "pure human instinct" (tighter, avoids vagueness).
//   P4 — Removed unnecessary "that"; "looking up" → "staring up" (intensity).
//   P5 — UNCHANGED. Strongest paragraph in the story.
//   P6 — "frescoes" → "paintings" (vocab consistency).
//   P7 — Natural intro for Paranavitana; "over a thousand years" (more
//         accurate); "And here's" → "Here's" (tighter).
//
// ALSO UPDATED:
//   excerpt — "frescoes" → "paintings"
//

const paragraphs = [
  {
    text: `In the fifth century, a Sri Lankan king named Kashyapa had workers polish a wall to a mirror shine on Sigiriya, a rock fortress rising from the jungle. It ran just below the Cloud Maidens — those painted women floating in gold among the clouds. The recipe was wild: lime, egg whites, wild honey, rubbed smooth with beeswax. Walk along it, and the painted women appeared beside you — real above, reflected below. It was built for a king's pleasure. What it became belonged to everyone.`,
  },
  {
    text: `When Kashyapa fell in 495 CE — killed in battle by his own brother, who'd come to reclaim the throne — the fortress became a Buddhist monastery. The Cloud Maidens were no longer a king's private treasure. Monks, pilgrims, soldiers, merchants, farmers — anyone who climbed the rock could see them. Then something nobody planned for happened. Visitors, overwhelmed by what they saw, pulled out sharp tools and scratched their feelings into that polished surface. They turned a mirror into a notebook.`,
  },
  {
    text: `For eight hundred years — from the 500s to the 1300s — visitors carved over eighteen hundred inscriptions into the Mirror Wall. Love poems, reflections on life, Buddhist warnings, jokes, and simple notes saying little more than "I was here." All in Sinhala, Sanskrit, and Tamil. This wasn't some planned literary project. It was pure human instinct — see something beautiful, say something about it. Together, these scratched-in verses became one of the oldest known collections of Sinhalese poetry.`,
  },
  {
    text: `Most of the poets were men, and their subject was desire. "The girl with the golden skin enticed the mind and eyes," one wrote. Another confessed the painted women left him physically shaken: "Being shot at by their sideways glance, I lay flat on the floor." These weren't casual tourists. They were men genuinely undone by beauty — standing on a narrow walkway, staring up at golden women floating in painted clouds, realizing they had no words big enough for what they felt.`,
  },
  {
    // P5 — UNCHANGED (the female visitors' quotes are the heartbeat of this story)
    text: `But the women who visited had a different take. Deva — identified only as "the wife of Mahamata" — left a verse dripping with jealousy: "That doe-eyed dame on the cliff makes me mad. She dangles her pearls and flirts with my husband." And an anonymous woman dropped the sharpest line on the entire wall: "As a woman, I feel for the painted ones. You dumb men, trying so hard to write songs. None of you brought us rum and molasses." Fifteen centuries old, and it still hits.`,
  },
  {
    text: `Then there was the monk Kiti, who saw what the lovesick visitors missed. His inscription reads like a warning for the next person in line: "If you linger here, don't lose your heart. Pleasure leads to pain. Pain resembles pleasure." He understood that the Cloud Maidens were the lesson itself — beautiful, desirable, completely unreachable. The longing they inspired was the whole point. The wall beneath those paintings? Eighteen hundred inscriptions of exactly that longing, carved deep into stone.`,
  },
  {
    text: `In 1956, an archaeologist named Senarath Paranavitana published translations of 685 of these verses — recovering voices that had been silent for over a thousand years. Here's the final twist: the Mirror Wall was built to reflect beauty. But time clouded the mirror. The reflection is gone. What survived instead were the words of the people who stood where the reflection used to be and tried to describe what they saw. The mirror failed. The poetry endured.`,
  },
];

const excerpt = `Below the painted women, a wall was polished so smooth it could reflect the paintings above. And for eight hundred years, visitors stopped, gazed upward, and did something no one expected — they wrote poetry.`;

// ─── VALIDATION ─────────────────────────────────────────────────────────────

console.log("\n=== PARAGRAPH VALIDATION ===\n");

let totalChars = 0;
let totalWords = 0;
let allPass = true;

for (let i = 0; i < paragraphs.length; i++) {
  const text = paragraphs[i].text;
  const chars = text.length;
  const words = text.split(/\s+/).length;
  totalChars += chars;
  totalWords += words;

  const charOk = chars <= 500;
  const wordOk = words <= 100;

  if (!charOk || !wordOk) allPass = false;

  console.log(
    `P${i + 1}: ${chars} chars ${charOk ? "✓" : "✗ OVER"} | ${words} words ${wordOk ? "✓" : "✗ OVER"}`
  );
}

console.log(`\nTotal: ${totalChars} chars | ${totalWords} words | ${paragraphs.length} paragraphs`);
console.log(`Target: ~3000 chars (±20% = 2400–3600)`);
console.log(
  `Range: ${totalChars >= 2400 && totalChars <= 3600 ? "✓ WITHIN RANGE" : "✗ OUT OF RANGE"}`
);

const excerptChars = excerpt.length;
console.log(`\nExcerpt: ${excerptChars} chars`);

if (!allPass) {
  console.error("\n✗ Some paragraphs exceed limits. Aborting.");
  process.exit(1);
}

// ─── DYNAMODB UPDATE ────────────────────────────────────────────────────────
// Only updating: paragraphs, excerpt, updatedAt
// Everything else stays untouched (title, subtitle, moralOrLesson, characters,
// source, era, coordinates, icon, tier, storyCategory, etc.)

const now = Math.floor(Date.now() / 1000);

const command = new UpdateCommand({
  TableName: "Story",
  Key: {
    siteId: "sigiriya",
    langStoryId: "en#mirror-wall-poets",
  },
  UpdateExpression: "SET paragraphs = :p, excerpt = :e, updatedAt = :ts",
  ExpressionAttributeValues: {
    ":p": paragraphs,
    ":e": excerpt,
    ":ts": now,
  },
  ReturnValues: "ALL_NEW",
});

try {
  const result = await docClient.send(command);
  console.log("\n✓ Story updated successfully in DynamoDB.");
  console.log(`  updatedAt: ${now}`);
  console.log(`  paragraphs: ${result.Attributes.paragraphs.length}`);
  console.log(`  title: ${result.Attributes.title}`);
  console.log(`  excerpt preview: ${result.Attributes.excerpt.substring(0, 80)}…`);
} catch (err) {
  console.error("\n✗ DynamoDB update failed:", err.message);
  process.exit(1);
}
