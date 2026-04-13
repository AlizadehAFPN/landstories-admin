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
// Changes from v1:
// P1: "seized"→"took", "that night"→"that same night", "fleeing through the darkness to"→"running through darkness toward"
// P2: "cliff face"→"rock", "designed"→"built", "would return"→"came back", +finally, "arriving"→"marching in", "kingdom"→"throne"
// P3: unchanged (perfect as-is)
// P4: "moment came"→"it happened", pronoun clarity (Kashyapa named), "murder"→"kill", "signaled"→"called"
// P5: "pulled"→"drew", contraction "that's", "cutting"→"slashing", "entire"→"whole"
// P6: "jaw-dropping"→"impossible", city reorder+ancient, "onto"→"into", "on the rock"→"on that rock"
// P7: "never earned"→"could never earn", "forgiven the man"→"followed a king", new closer

const paragraphs = [
  {
    text: `Kashyapa killed his own father. That\u2019s where this starts. In 477 CE, he overthrew King Dhatusena of Sri Lanka \u2014 had him sealed alive inside a wall \u2014 and took the throne. But his half-brother Moggallana, the rightful heir, escaped that same night. A teenage prince running through darkness toward South India. Kashyapa knew he\u2019d come back. So he built a palace on top of a 200-meter rock in the middle of the jungle. A fortress no army could reach.`,
  },
  {
    text: `For eighteen years, Kashyapa ruled from the sky. He surrounded Sigiriya with moats, carved a giant lion into the rock as his front gate, and painted the walls with golden goddesses. Every staircase, every arrow slit, every chokepoint was built for one thing: the day his brother came back with an army. And when that day finally arrived in 495 CE \u2014 Moggallana marching in with South Indian troops and a throne to reclaim \u2014 Kashyapa did the last thing anyone expected.`,
  },
  {
    text: `He came down. Instead of waiting behind the walls he\u2019d spent two decades building, Kashyapa marched his army onto the open plain. Maybe he thought he\u2019d win fast. Maybe he knew hiding would make him look weak. Or maybe \u2014 after eighteen years of living with what he\u2019d done \u2014 he just wanted it over. The man who built a fortress in the sky chose to fight on the ground.`,
  },
  {
    text: `The armies clashed below the rock. Kashyapa rode his war elephant at the center, visible to everyone. Then it happened. His elephant hit marshy ground and turned sideways to find better footing. Just an animal avoiding mud. But his soldiers saw their king turning away \u2014 and they saw retreat. Migara, the same commander who\u2019d helped Kashyapa kill his father, had been waiting for exactly this. He called the retreat, and the whole army broke. Within minutes, Kashyapa was completely alone.`,
  },
  {
    text: `What happened next is the most famous death in Sri Lankan history. Kashyapa drew a jeweled dagger from his waist, pressed it to his throat, and cut. But here\u2019s the detail that\u2019s haunted people for fifteen hundred years: after slashing his own throat, he raised the bloody dagger above his head so the whole battlefield could see. Then he slid it back into its sheath. And fell. He sheathed the blade because the fight was over. The account was closed.`,
  },
  {
    text: `Moggallana took the throne and moved the capital back to Anuradhapura, the ancient sacred city. Sigiriya \u2014 this impossible fortress, this monument to guilt and genius \u2014 was handed to Buddhist monks. The pleasure palace of a father-killer became a monastery. The painted goddesses gazed down on shaved heads. The fountains went quiet. The lion crumbled. For fourteen centuries, the only sounds on that rock were monks chanting and visitors scratching love poems into the polished Mirror Wall.`,
  },
  {
    text: `The Buddhist take on Kashyapa is brutal and simple: karma doesn\u2019t wait for your next life. He was brilliant. His fortress was a marvel. But the crime came for him anyway \u2014 not through the walls he\u2019d built, but through the loyalty he could never earn. The army that broke that day had never truly followed a king who\u2019d killed his own father. You can build your fortress as high as you want. The fall is always waiting.`,
  },
];

const subtitle =
  "After eighteen years in his sky fortress, the king who murdered his father rode down to face his brother\u2019s army \u2014 and in one terrible moment, lost everything";

const excerpt =
  "For eighteen years, a king who murdered his own father ruled from a fortress no army could reach. Then his brother came back with an army \u2014 and Kashyapa rode down from the sky to meet him. Everything fell apart in minutes.";

const moralOrLesson =
  "Kashyapa built his fortress to outrun what he\u2019d done. But the walls weren\u2019t what failed him \u2014 it was the crime itself. An army that serves a man who murdered his own father is an army waiting to leave. And in his final moment, when he cut his throat and sheathed the dagger, Kashyapa proved the only thing he ever truly ruled was himself.";

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
    `P${i + 1}: ${chars} chars ${charOk ? "\u2713" : "\u2717 OVER"} | ${words} words ${wordOk ? "\u2713" : "\u2717 OVER"}`
  );
}

console.log(`\nTotal: ${totalChars} chars | ${totalWords} words | ${paragraphs.length} paragraphs`);
console.log(`Target: ~3000 chars (\u00b120% = 2400\u20133600)`);
console.log(
  `Status: ${totalChars >= 2400 && totalChars <= 3600 ? "\u2713 WITHIN RANGE" : "\u2717 OUT OF RANGE"}`
);

if (!allPass) {
  console.error("\n\u2717 Some paragraphs exceed limits. Aborting.");
  process.exit(1);
}

// ─── DYNAMODB UPDATE ────────────────────────────────────────────────────────
// Only updates translated text fields: paragraphs, subtitle, excerpt, moralOrLesson
// Does NOT touch: title, characters, coordinates, era, icon, image, source, tier, etc.

const now = Math.floor(Date.now() / 1000);

const command = new UpdateCommand({
  TableName: "Story",
  Key: {
    siteId: "sigiriya",
    langStoryId: "en#kings-downfall",
  },
  UpdateExpression:
    "SET paragraphs = :p, subtitle = :sub, excerpt = :exc, moralOrLesson = :moral, updatedAt = :ts, readingTimeMinutes = :rtm",
  ExpressionAttributeValues: {
    ":p": paragraphs,
    ":sub": subtitle,
    ":exc": excerpt,
    ":moral": moralOrLesson,
    ":ts": now,
    ":rtm": 3,
  },
  ReturnValues: "ALL_NEW",
});

try {
  const result = await docClient.send(command);
  console.log("\n\u2713 Story updated successfully in DynamoDB.");
  console.log(`  updatedAt: ${now}`);
  console.log(`  paragraphs: ${result.Attributes.paragraphs.length}`);
  console.log(`  readingTimeMinutes: ${result.Attributes.readingTimeMinutes}`);
  console.log(`  subtitle: ${result.Attributes.subtitle}`);
} catch (err) {
  console.error("\n\u2717 DynamoDB update failed:", err.message);
  process.exit(1);
}
