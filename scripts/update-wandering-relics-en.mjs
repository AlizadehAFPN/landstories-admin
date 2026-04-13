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
    text: `In 946 AD, a hermit monk named Ivan died alone in a cave high in Bulgaria's Rila Mountains. When his followers found him, they couldn't believe what they saw — his body hadn't decayed at all. In Orthodox Christianity, a body that refuses to rot is the ultimate proof of holiness. So they preserved his remains as sacred relics. But Ivan's peaceful rest in that mountain cave? It was already over. His bones were about to be stolen, fought over, and paraded across the Balkans for five hundred years.`,
  },
  {
    text: `Around 980 AD, Bulgaria's Tsar Samuel needed a power move. The Byzantine Empire — the superpower based in Constantinople, modern Istanbul — was squeezing Bulgaria from every side. In medieval politics, owning the remains of a famous saint was like carrying a divine stamp of approval. So Samuel had Ivan's relics moved from the remote Rila cave to his capital, Sredets — the city we now call Sofia. A dead hermit became a political weapon, and wherever his bones went, power followed.`,
  },
  {
    text: `Then Bulgaria lost them entirely. Around 1183, during a war with the Kingdom of Hungary, Ivan's relics were carried off to Esztergom — Hungary's royal capital. Whether they were seized as war trophies or handed over in some kind of deal, the result was the same: Bulgaria's most sacred possession was now sitting in a foreign church, in a foreign country. For Bulgarians, it felt like losing a piece of their soul.`,
  },
  {
    text: `But Bulgaria fought back. The Asen brothers — Ivan and Peter — led a massive revolt that threw off foreign rule and rebuilt the Bulgarian Empire. Around 1195, they brought the saint's relics to their new capital, Tarnovo, in a triumphant procession. People lined the roads, weeping and cheering. Getting Ivan back wasn't just a religious moment — it was proof that Bulgaria was alive again. The bones of a monk who just wanted to pray alone in a cave had become the beating heart of an entire nation.`,
  },
  {
    text: `It didn't last. In 1396, the Ottoman Empire — the massive power expanding from modern-day Turkey — conquered Bulgaria completely. Tarnovo fell. Churches were destroyed or abandoned. For decades, Ivan's relics sat in the ruins of what had been a proud capital. No processions. No celebrations. Just silence. The nation was crushed, and the saint's bones gathered dust alongside its shattered hopes.`,
  },
  {
    text: `But here's where the story gets incredible. In 1469 — over seventy years into Ottoman rule — three brothers from a small town called Kratovo decided they would bring Ivan home to Rila Monastery, where he'd lived and died. They organized the journey, and when the procession passed through Sofia, thousands of Bulgarians flooded the streets. Under foreign occupation, openly celebrating a Bulgarian saint was a quiet act of rebellion. It said: you can take our country, but you cannot take who we are.`,
  },
  {
    text: `Ivan's relics still rest at Rila Monastery today — the same mountains where he chose to live and pray more than a thousand years ago. Every year, Bulgarians celebrate the day his bones finally came home. What started as the death of a lonely hermit in a mountain cave became one of the strangest journeys in European history — a dead man's body holding an entire nation together across five centuries of war, conquest, and survival.`,
  },
];

const excerpt =
  "In 946 AD, a hermit monk named Ivan died alone in a cave high in Bulgaria's Rila Mountains. When his followers found him, they couldn't believe what they saw — his body hadn't decayed at all.";

const moralOrLesson =
  "What's sacred can outlast any empire — sometimes one person's remains can hold an entire nation's identity together across centuries.";

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
    siteId: "rila-monastery",
    langStoryId: "en#wandering-relics",
  },
  UpdateExpression:
    "SET paragraphs = :p, excerpt = :exc, moralOrLesson = :moral, updatedAt = :ts",
  ExpressionAttributeValues: {
    ":p": paragraphs,
    ":exc": excerpt,
    ":moral": moralOrLesson,
    ":ts": now,
  },
  ReturnValues: "ALL_NEW",
});

try {
  const result = await docClient.send(command);
  console.log("\n✓ Story updated successfully in DynamoDB.");
  console.log(`  updatedAt: ${now}`);
  console.log(`  paragraphs: ${result.Attributes.paragraphs.length}`);
  console.log(`  excerpt: ${result.Attributes.excerpt.substring(0, 80)}...`);
  console.log(`  moralOrLesson: ${result.Attributes.moralOrLesson.substring(0, 80)}...`);
  console.log(`  title: ${result.Attributes.title}`);
  console.log(`  subtitle: ${result.Attributes.subtitle}`);
} catch (err) {
  console.error("\n✗ DynamoDB update failed:", err.message);
  process.exit(1);
}
