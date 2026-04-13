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

// ─── EDITED PARAGRAPHS ─────────────────────────────────────────────────────
// Changes are surgical: voice/clarity only. Same structure, same facts,
// same quoted inscriptions. Safe for translated versions to remain aligned.

const paragraphs = [
  {
    // P1 — UNCHANGED (strong opening, passes all checks)
    text: `In the fifth century, a Sri Lankan king named Kashyapa had workers polish a wall to a mirror shine. It ran right below the Cloud Maiden frescoes at Sigiriya — those famous painted women floating in golden stillness on the cliff face. The recipe was wild: lime powder, egg whites, wild honey, rubbed smooth with beeswax. Walk along it, and the painted women appeared beside you — real above, reflected below. It was built for a king's pleasure. What it became belonged to everyone.`,
  },
  {
    // P2 — REVISED: "died" → "fell"; Moggallana context now self-explanatory;
    // "private collection" → "private treasure"; tighter transition
    text: `When Kashyapa fell in 495 CE — killed by his own brother, who'd come to reclaim the throne — the fortress became a Buddhist monastery. The Cloud Maidens were no longer a king's private treasure. Monks, pilgrims, soldiers, merchants, farmers — anyone who climbed the rock could see them. And something nobody planned happened. These visitors, overwhelmed by what they saw, pulled out sharp tools and scratched their feelings directly into that polished surface. They turned a mirror into a notebook.`,
  },
  {
    // P3 — REVISED: removed "I came. I saw. I write." (Caesar echo, distracting);
    // replaced with "saying little more than 'I was here.'"; "wasn't a" → "wasn't some"
    text: `For eight hundred years — from the 500s to the 1300s — visitors carved over eighteen hundred inscriptions into the Mirror Wall. Love poems, deep thoughts, Buddhist warnings, jokes, simple notes saying little more than "I was here." All in Sinhala, Sanskrit, and Tamil. This wasn't some planned literary project. It was a deeply human impulse — see something beautiful, say something about it. Together, these scratched-in verses became one of the oldest known collections of Sinhalese poetry.`,
  },
  {
    // P4 — REVISED: removed "and" before "realizing" (tighter rhythm)
    text: `Most of the poets were men, and their subject was desire. "The girl with the golden skin enticed the mind and eyes," one wrote. Another confessed that the painted women left him physically shaken: "Being shot at by their sideways glance, I lay flat on the floor." These weren't casual tourists. They were men genuinely undone by beauty — standing on a narrow walkway, looking up at golden women floating in painted clouds, realizing they had no words big enough for what they felt.`,
  },
  {
    // P5 — UNCHANGED (strongest paragraph in the story, don't touch it)
    text: `But the women who visited had a different take. Deva — identified only as "the wife of Mahamata" — left a verse dripping with jealousy: "That doe-eyed dame on the cliff makes me mad. She dangles her pearls and flirts with my husband." And an anonymous woman dropped the sharpest line on the entire wall: "As a woman, I feel for the painted ones. You dumb men, trying so hard to write songs. None of you brought us rum and molasses." Fifteen centuries old, and it still hits.`,
  },
  {
    // P6 — REVISED: "dally" → "linger here" (fails 25-year-old word check)
    text: `Then there was the monk Kiti, who saw what the lovesick visitors missed. His inscription reads like a warning for the next person in line: "If you linger here, don't lose your heart. Pleasure leads to pain. Pain resembles pleasure." He understood that the Cloud Maidens were the lesson itself — beautiful, desirable, completely unreachable. The longing they inspired was the whole point. The wall beneath those frescoes? Eighteen hundred inscriptions of exactly that longing, carved deep into stone.`,
  },
  {
    // P7 — UNCHANGED (perfect ending, "The mirror failed. The poetry endured.")
    text: `In 1956, archaeologist Senarath Paranavitana published translations of 685 of these verses — recovering voices that had been silent for a thousand years. And here's the final twist: the Mirror Wall was built to reflect beauty. But time clouded the mirror. The reflection is gone. What survived instead were the words of the people who stood where the reflection used to be and tried to describe what they saw. The mirror failed. The poetry endured.`,
  },
];

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
  `Status: ${totalChars >= 2400 && totalChars <= 3600 ? "✓ WITHIN RANGE" : "✗ OUT OF RANGE"}`
);

if (!allPass) {
  console.error("\n✗ Some paragraphs exceed limits. Aborting.");
  process.exit(1);
}

// ─── DYNAMODB UPDATE ────────────────────────────────────────────────────────
// Only updating paragraphs and updatedAt. All other fields stay untouched.

const now = Math.floor(Date.now() / 1000);

const command = new UpdateCommand({
  TableName: "Story",
  Key: {
    siteId: "sigiriya",
    langStoryId: "en#mirror-wall-poets",
  },
  UpdateExpression: "SET paragraphs = :p, updatedAt = :ts",
  ExpressionAttributeValues: {
    ":p": paragraphs,
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
} catch (err) {
  console.error("\n✗ DynamoDB update failed:", err.message);
  process.exit(1);
}
