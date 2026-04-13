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

// ─── REWRITTEN PARAGRAPHS ───────────────────────────────────────────────────

const paragraphs = [
  {
    text: `Kashyapa killed his own father. That's where this starts. In 477 CE, he overthrew King Dhatusena of Sri Lanka \u2014 had him sealed alive inside a wall \u2014 and seized the throne. But his half-brother Moggallana, the rightful heir, escaped that night. A teenage prince fleeing through the darkness to South India. Kashyapa knew he'd come back. So he built a palace on top of a 200-meter rock in the middle of the jungle. A fortress no army could reach.`,
  },
  {
    text: `For eighteen years, Kashyapa ruled from the sky. He surrounded Sigiriya with moats, carved a giant lion into the cliff face as his front gate, and painted the walls with golden goddesses. Every staircase, every arrow slit, every chokepoint was designed for one thing: the day his brother would return with an army. And when that day came in 495 CE \u2014 Moggallana arriving with South Indian troops and a kingdom to reclaim \u2014 Kashyapa did the last thing anyone expected.`,
  },
  {
    text: `He came down. Instead of waiting behind the walls he'd spent two decades building, Kashyapa marched his army onto the open plain. Maybe he thought he'd win fast. Maybe he knew hiding would make him look weak. Or maybe \u2014 after eighteen years of living with what he'd done \u2014 he just wanted it over. The man who built a fortress in the sky chose to fight on the ground.`,
  },
  {
    text: `The armies clashed below the rock. Kashyapa rode his war elephant at the center, visible to everyone. Then the moment came. His elephant hit marshy ground and turned sideways to find better footing. Just an animal avoiding mud. But his soldiers saw their king turning away. They saw retreat. And Migara \u2014 the same commander who'd helped him murder his father \u2014 had been waiting for exactly this. He signaled the retreat, and the whole army broke. Within minutes, Kashyapa was completely alone.`,
  },
  {
    text: `What happened next is the most famous death in Sri Lankan history. Kashyapa pulled a jeweled dagger from his waist, pressed it to his throat, and cut. But here's the detail that has haunted people for fifteen hundred years: after cutting his own throat, he raised the bloody dagger above his head so the entire battlefield could see. Then he slid it back into its sheath. And fell. He sheathed the blade because the fight was over. The account was closed.`,
  },
  {
    text: `Moggallana took the throne and moved the capital back to the sacred city of Anuradhapura. Sigiriya \u2014 this jaw-dropping fortress, this monument to guilt and genius \u2014 was handed to Buddhist monks. The pleasure palace of a father-killer became a monastery. The painted goddesses gazed down on shaved heads. The fountains went quiet. The lion crumbled. For fourteen centuries, the only sounds on the rock were monks chanting and visitors scratching love poems onto the polished Mirror Wall.`,
  },
  {
    text: `The Buddhist take on Kashyapa is brutal and simple: karma doesn't wait for your next life. He was brilliant. His fortress was a marvel. But the crime came for him anyway \u2014 not through the walls he'd built, but through the loyalty he never earned. The army that broke that day had never truly forgiven the man who killed his own father. Some debts always get paid.`,
  },
];

const subtitle =
  "After eighteen years in his sky fortress, the king who killed his father rode down to meet his brother's army \u2014 and in one terrible moment, lost everything";

const excerpt =
  "For eighteen years, a king who murdered his own father ruled from a fortress no army could reach. Then his brother came back with an army \u2014 and Kashyapa rode down from the sky to meet him. Everything fell apart in minutes.";

const moralOrLesson =
  "Kashyapa built his fortress to escape what he'd done. But the walls weren't what failed him \u2014 it was the crime itself. An army that serves a man who murdered his own father is an army waiting to leave. And in his final moment, when he cut his throat and sheathed the dagger, Kashyapa proved the only thing he ever truly ruled was himself.";

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
  console.log("\n✓ Story updated successfully in DynamoDB.");
  console.log(`  updatedAt: ${now}`);
  console.log(`  paragraphs: ${result.Attributes.paragraphs.length}`);
  console.log(`  readingTimeMinutes: ${result.Attributes.readingTimeMinutes}`);
  console.log(`  subtitle: ${result.Attributes.subtitle}`);
} catch (err) {
  console.error("\n✗ DynamoDB update failed:", err.message);
  process.exit(1);
}
