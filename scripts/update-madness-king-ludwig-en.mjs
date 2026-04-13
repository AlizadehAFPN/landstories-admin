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
    text: `Ludwig was eighteen when they made him King of Bavaria in 1864 \u2014 tall, dark-haired, and completely uninterested in power. What he wanted was music. Weeks after his coronation, he sent composer Richard Wagner a letter that read like a love confession: "I want to lift the yoke of daily toil from your shoulders forever. You are a god to me." He was eighteen. Wagner was fifty-one. It was the beginning of one of history\u2019s most reckless and beautiful obsessions.`,
  },
  {
    text: `Ludwig emptied Bavaria\u2019s treasury into Wagner\u2019s genius. He wiped out the composer\u2019s debts, funded the Bayreuth Festival Theatre that Wagner had dreamed of for decades, and commissioned private opera performances for an audience of one \u2014 himself, alone in a darkened Munich theater, weeping at the music. Politicians were furious. They forced Wagner out of the city. But Ludwig\u2019s devotion never wavered. The king who couldn\u2019t be bothered to govern would move heaven and earth for a piece of music.`,
  },
  {
    text: `When the real world failed him, Ludwig built his own. Three fantasy castles, each more extravagant than the last. Linderhof had an underground grotto where he floated in a golden boat on a hidden lake while Wagner\u2019s music echoed off the cave walls. Herrenchiemsee was a full-scale replica of Versailles, built on an island, its Hall of Mirrors longer than the original. And Neuschwanstein \u2014 perched on a cliff in the Alps \u2014 was a whole castle designed as a stage set for Wagner\u2019s operas.`,
  },
  {
    text: `Ludwig\u2019s behavior grew stranger by the year. He flipped day and night, riding through the forest in golden sleighs by torchlight at three in the morning. He set dinner tables for guests who didn\u2019t exist \u2014 dead French royals like Louis XIV and Marie Antoinette \u2014 and talked to their empty chairs throughout the meal. He sketched plans for a flying machine and a castle on a rock pillar reachable only by hot-air balloon. Neither was ever built.`,
  },
  {
    text: `On June 8, 1886, four psychiatrists who had never once examined Ludwig in person declared him insane. Two days later, officials arrived at Neuschwanstein to arrest him. His guards turned the first group away, and for a few wild hours the king held his castle like a character from his own legends. The second attempt succeeded. Ludwig was stripped of his crown and taken to Berg Castle on Lake Starnberg. The man who built fairy tales was now a prisoner.`,
  },
  {
    text: `Three days later, on June 13, Ludwig and his psychiatrist Dr. Bernhard von Gudden went for an evening walk along the lake. Neither came back. Their bodies were found in the shallows that night. Ludwig was forty years old. The official ruling was drowning \u2014 but the water where they found him was barely waist-deep, and Ludwig was a strong swimmer. No one has ever explained what really happened. The mystery has haunted Bavaria for over a century.`,
  },
  {
    text: `Today, 1.4 million people visit Neuschwanstein every year. Walt Disney saw it and made it the model for Sleeping Beauty Castle at Disneyland. The fairy-tale fortress that got a king locked up became the most famous castle on earth. Ludwig\u2019s ministers are long forgotten. His government is a footnote. But the dream they tried to destroy? Still standing on that cliff in the Alps. They called him mad for choosing beauty over power. The world proved him right.`,
  },
];

const excerpt =
  "Ludwig was eighteen when they made him King of Bavaria in 1864 \u2014 tall, dark-haired, and completely uninterested in power. What he wanted was music. He sent Richard Wagner a letter that read like a love confession, and so began one of history\u2019s most reckless and beautiful obsessions.";

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
    siteId: "neuschwanstein-castle",
    langStoryId: "en#madness-of-king-ludwig",
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
  console.log(`  title: ${result.Attributes.title}`);
  console.log(`  updatedAt: ${now}`);
  console.log(`  paragraphs: ${result.Attributes.paragraphs.length}`);
  console.log(`  excerpt: ${result.Attributes.excerpt.substring(0, 80)}...`);
} catch (err) {
  console.error("\n\u2717 DynamoDB update failed:", err.message);
  process.exit(1);
}
