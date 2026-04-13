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
    text: `In March 1974, in a dusty village outside Xi'an, China, a farmer named Yang Zhifa and two of his neighbors set out to dig a well. A brutal drought was killing their crops, and they needed water \u2014 nothing more, nothing less. About four meters down, Yang's shovel cracked against something hard. He figured it was a rock. He was wrong.`,
  },
  {
    text: `He pulled out a chunk of baked clay. Then another piece. Then what looked like a head \u2014 a human head, with calm eyes, a faint smile, and carefully sculpted hair, all made of terracotta. The farmers froze. In Chinese folk belief, disturbing buried figures could release evil spirits. Yang's gut told him to throw the thing back and walk away.`,
  },
  {
    text: `But curiosity \u2014 and a farmer's no-nonsense practicality \u2014 won. He loaded the fragments onto his wheelbarrow and hauled them to the local cultural artifacts station. His reward for the trip? Ten yuan. About a dollar fifty. That was the price tag on what would turn out to be the greatest archaeological find of the twentieth century.`,
  },
  {
    text: `Within weeks, archaeologists from the Shaanxi Provincial Institute arrived and started digging. Within months, the full picture emerged: beneath these dry wheat fields lay an entire underground army. Over 8,000 life-sized soldiers, horses, and war chariots \u2014 all built more than two thousand years ago to protect the tomb of Qin Shi Huang, the first emperor to unify China into a single nation.`,
  },
  {
    text: `The discovery flipped everything. Yang's quiet farming village became one of the most visited archaeological sites on Earth. Xi'an went from a forgotten inland city to a world-class destination. China gained a national symbol as powerful as the Great Wall itself \u2014 living proof that its ancient civilization could still stop the modern world in its tracks.`,
  },
  {
    text: `But here's the part people don't talk about. Yang Zhifa's family lost their farmland to the excavation \u2014 seized with barely any compensation. Local officials tried to erase him from the story entirely, claiming credit for the find. The man who literally unearthed an emperor's army couldn't even prove he'd been there when it happened.`,
  },
  {
    text: `Years later, the museum finally gave him a job at the gift shop, signing books about the Terracotta Army for tourists. Picture it: an old farmer in his seventies, face weathered by decades of sun, sitting at a small desk writing "Yang Zhifa \u2014 discoverer of the Terracotta Warriors" while 8,000 immortal soldiers stood in silent rows just beyond the wall.`,
  },
  {
    text: `Yang Zhifa died in 2024 at the age of ninety-one. He never got rich. He never became famous beyond that gift shop desk. But ask anyone who met him, and they'll tell you the same thing. When visitors asked how he found an empire, he'd just shrug. "I was digging a well," he'd say. "I was thirsty."`,
  },
];

const excerpt =
  "In March 1974, in a dusty village outside Xi'an, China, a farmer named Yang Zhifa and two of his neighbors set out to dig a well. A brutal drought was killing their crops, and they needed water \u2014 nothing more, nothing less.";

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

const now = Math.floor(Date.now() / 1000);

const command = new UpdateCommand({
  TableName: "Story",
  Key: {
    siteId: "terracotta-army",
    langStoryId: "en#farmer-discovery",
  },
  UpdateExpression:
    "SET paragraphs = :p, excerpt = :exc, updatedAt = :ts",
  ExpressionAttributeValues: {
    ":p": paragraphs,
    ":exc": excerpt,
    ":ts": now,
  },
  ReturnValues: "ALL_NEW",
});

try {
  const result = await docClient.send(command);
  console.log("\n\u2713 Story updated successfully in DynamoDB.");
  console.log(`  updatedAt: ${now}`);
  console.log(`  paragraphs: ${result.Attributes.paragraphs.length}`);
  console.log(`  title: ${result.Attributes.title}`);
  console.log(`  excerpt: ${result.Attributes.excerpt.substring(0, 80)}...`);
} catch (err) {
  console.error("\n\u2717 DynamoDB update failed:", err.message);
  process.exit(1);
}
