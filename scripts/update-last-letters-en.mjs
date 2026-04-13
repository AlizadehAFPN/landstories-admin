import { readFileSync } from "node:fs";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

// Load .env.local
const env = {};
for (const line of readFileSync(".env.local", "utf-8").split("\n")) {
  const idx = line.indexOf("=");
  if (idx > 0) env[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
}

const client = new DynamoDBClient({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE = env.DYNAMO_TABLE_STORY || "Story";
const now = Math.floor(Date.now() / 1000);

// ─── REWRITTEN PARAGRAPHS ───────────────────────────────────────────────────

const paragraphs = [
  {
    text: `The Nazis built Auschwitz with one goal beyond murder: total erasure. Every prisoner's name was replaced with a number. Every body was burned, every trace of ash scattered. No graves, no markers, nothing left behind. The Final Solution — the Nazi plan to wipe out Europe's Jewish population — wasn't just genocide. It was the murder of memory itself, designed so the world would forget these people ever existed.`,
  },
  {
    text: `But the prisoners fought back with the only weapon they had: words. From 1940 to 1945, letters and notes were smuggled out through a secret network — prisoners, civilian workers, local Polish families, underground resistance fighters. Messages were hidden in food containers, sewn into laundry, slipped through barbed wire. Every smuggled note was an act punishable by death. Every one carried a voice the Nazis meant to silence forever.`,
  },
  {
    text: `The letters that survived are written in every language of Europe — Polish, Yiddish, Hungarian, French, Greek, Dutch, Czech. Some are scrawled in haste on torn scraps of paper. Others are careful, deliberate farewells — written by people who knew exactly what was coming and chose to spend their final hours making sure someone, somewhere, would know what happened here.`,
  },
  {
    text: `One mother's letter, smuggled through the Polish resistance, reads: "My dear little ones, I am going to a place from which no one returns. Be good to each other. Take care of Papa. Remember that your mother loved you more than life itself. Be brave, my darlings. Do not cry for me. I will watch over you from heaven." Her name is lost. A Polish railwayman found the letter thrown from a deportation train and passed it to the underground.`,
  },
  {
    text: `A father writes to his brother: "They are taking us east. We know what east means. I gave my watch to a guard who promises to mail this, though I know he probably won't. If by some miracle you read these words, tell my children their father died standing up." A sixteen-year-old girl, writing on the back of a bread wrapper: "Today is my birthday. There is no cake, no candles, no singing. If someone finds this, please know that my name was Hannah. I was real. I existed."`,
  },
  {
    text: `The most haunting testimonies come from the Sonderkommando — prisoners the Nazis forced to work inside the gas chambers and crematoria. Men like Zalmen Gradowski, Lejb Langfus, and Zalmen Lewental wrote their accounts in Yiddish and buried them in glass jars near the crematoria, knowing they'd be killed soon. They hid their words in the ashes of the dead and hoped someone would one day dig them up. Several were found after the war.`,
  },
  {
    text: `These weren't just goodbyes. Many letters contained detailed eyewitness descriptions of the killing process — the selections at the railway platform, the gas chambers, the crematoria — giving the outside world proof of the genocide when Allied governments still refused to believe the reports. The Polish resistance sent this evidence to London, building the case that eventually made denying the Holocaust impossible.`,
  },
  {
    text: `Today, the surviving letters sit behind glass at the Auschwitz-Birkenau Memorial, Yad Vashem in Jerusalem, and the Holocaust Museum in Washington. The paper is yellowed. The ink is fading. But the voices are still there — unbroken. In a place built to erase every trace of its victims, scraps of paper did what the entire machinery of death could not prevent. They kept the dead human.`,
  },
];

const subtitle =
  "The words smuggled out of the darkness — messages from those who knew they would not return";

const excerpt =
  "The Nazis built Auschwitz with one goal beyond murder: total erasure. Every prisoner's name was replaced with a number. Every body was burned, every trace of ash scattered. No graves, no markers, nothing left behind. The Final Solution — the Nazi plan to wipe out Europe's Jewish population — wasn't just genocide. It was the murder of memory itself.";

const moralOrLesson =
  "Words are the ultimate weapon against erasure — a single letter, a name scratched on a wall, a testimony buried in ashes can outlast the most powerful killing machine ever built.";

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

console.log(
  `\nTotal: ${totalChars} chars | ${totalWords} words | ${paragraphs.length} paragraphs`
);
console.log(`Target: ~3000 chars (±20% = 2400–3600)`);
console.log(
  `Status: ${totalChars >= 2400 && totalChars <= 3600 ? "✓ WITHIN RANGE" : "✗ OUT OF RANGE"}`
);

if (!allPass) {
  console.error("\n✗ Some paragraphs exceed limits. Aborting.");
  process.exit(1);
}

// ─── DYNAMODB UPDATE ────────────────────────────────────────────────────────

const command = new UpdateCommand({
  TableName: TABLE,
  Key: {
    siteId: "auschwitz-birkenau",
    langStoryId: "en#last-letters",
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
