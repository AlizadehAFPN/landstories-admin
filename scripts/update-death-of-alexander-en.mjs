import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client);

// ─── NEW PARAGRAPHS (rewritten for storytelling voice) ──────────────

const paragraphs = [
  {
    text: `Alexander the Great had conquered everything between Greece and India by the age of thirty-two. Never lost a battle. Not one. In the spring of 323 BCE, he was heading back to Babylon \u2014 the ancient city in modern-day Iraq \u2014 when a group of Babylonian priests rode out to warn him: do not enter from the west. Disaster was coming. Alexander tried to circle around, but the swamps blocked his army. So he walked right through the western gates anyway. He had eleven days to live.`,
  },
  {
    text: `He wasn\u2019t there to rest. Babylon was his new capital, and he was already planning his next conquest \u2014 a massive invasion of Arabia, with eight hundred ships being built in the harbor. He was receiving ambassadors from North Africa, Italy, even Spain. The man had built the largest empire in history, and he wasn\u2019t done. Then, on May 29th, he went to a drinking party at his friend Medius\u2019s place. He drank heavily. By morning, he had a fever.`,
  },
  {
    text: `The court records read like a hospital chart. Days one and two: still working, giving orders for the fleet. Day three: he bathed and made offerings, but the fever wouldn\u2019t break. Day four: too weak to stand, carried on a stretcher. Day five: moved near the river, hoping cool air would help. Day six: the fever spiked. He could barely talk. Day seven: his officers came in and he recognized them, but couldn\u2019t form words. Just his eyes, moving from face to face.`,
  },
  {
    text: `On the eighth day, his soldiers forced their way in. They\u2019d heard he was already dead and that the generals were hiding it. These were the men who\u2019d charged into battle beside him across Persia, Egypt, Afghanistan, and India. They lined up and filed past his bed, one by one. Alexander couldn\u2019t speak. He couldn\u2019t move. But as each soldier passed, he lifted his head and looked at them. That was all he had left. The greatest conqueror in history said goodbye to his army with nothing but his eyes.`,
  },
  {
    text: `He died June 10 or 11, 323 BCE, at thirty-two. Nobody knows what killed him \u2014 the debate has lasted two thousand years. Ancient sources blamed poison. Modern doctors suggest typhoid, malaria, even heavy drinking. The wildest theory came in 2018: a researcher proposed he had an autoimmune condition that left him paralyzed but conscious. His body didn\u2019t decompose for six days \u2014 the ancients called it proof he was a god. The researcher\u2019s take? He wasn\u2019t decomposing because he wasn\u2019t dead yet.`,
  },
  {
    text: `His last words might be the most expensive sentence ever spoken. Asked who should inherit his empire, he either said \u2018to the strongest\u2019 or \u2018to Kraterus\u2019 \u2014 one of his generals. In Greek, those phrases sound almost identical, and from a man who could barely whisper, no one could tell which he meant. What followed was forty years of war. His mother, his wife, and his infant son were all murdered. The empire he\u2019d spent thirteen years building was torn apart in a generation.`,
  },
  {
    text: `One of his generals stole the body and took it to Egypt, where it sat in a golden coffin in Alexandria for centuries. Julius Caesar visited the tomb. Augustus accidentally broke the nose off the mummy. Then, around the fourth century, the tomb vanished. No one has found it since. The palace where Alexander took his last breath is a crumbling field of mud brick south of Baghdad. The greatest man of the ancient world died in the greatest city of the ancient world. Both are ruins now.`,
  },
];

const subtitle =
  "The last eleven days of the greatest conqueror who ever lived \u2014 and a mystery two thousand years old";

const excerpt =
  "He\u2019d conquered everything between Greece and India. Never lost a battle. Egypt worshipped him as a god. He died in a palace in Babylon at thirty-two \u2014 and it started at a drinking party.";

const moralOrLesson =
  "Alexander conquered every kingdom he faced except the one that killed him \u2014 his own body. The man who planned to march to the ends of the earth couldn\u2019t cross the space between his bed and the door. All his armies, all the wealth of Persia, all the prayers of Egypt couldn\u2019t buy him one more heartbeat. The lesson isn\u2019t that ambition is pointless \u2014 his thirty-two years reshaped the world more than most civilizations manage in centuries. The lesson is that your body doesn\u2019t care how important you are, and when death comes, it doesn\u2019t negotiate.";

// ─── VALIDATE CONSTRAINTS ───────────────────────────────────────────

console.log("\n=== CONSTRAINT VALIDATION ===\n");
let totalChars = 0;
let allPass = true;

for (let i = 0; i < paragraphs.length; i++) {
  const t = paragraphs[i].text;
  const chars = t.length;
  const words = t.split(/\s+/).length;
  totalChars += chars;
  const charOk = chars <= 500;
  const wordOk = words <= 100;
  const status = charOk && wordOk ? "PASS" : "FAIL";
  if (!charOk || !wordOk) allPass = false;
  console.log(
    `P${i + 1}: ${chars} chars, ${words} words  [${status}]${!charOk ? " CHARS OVER" : ""}${!wordOk ? " WORDS OVER" : ""}`
  );
}

console.log(`\nTotal: ${totalChars} chars across ${paragraphs.length} paragraphs`);
console.log(`Target: ~3000 chars (±20% = 2400-3600)`);
console.log(`Paragraphs: ${paragraphs.length} (target: 6-8)`);

const paraCountOk = paragraphs.length >= 6 && paragraphs.length <= 10;
const totalOk = totalChars >= 2400 && totalChars <= 3600;

if (!allPass || !paraCountOk || !totalOk) {
  console.error("\n❌ CONSTRAINT VIOLATION — aborting push.");
  process.exit(1);
}

console.log("\n✅ All constraints pass.\n");

// ─── PUSH TO DYNAMODB ───────────────────────────────────────────────

const params = {
  TableName: "Story",
  Key: {
    siteId: "babylon",
    langStoryId: "en#death-of-alexander",
  },
  UpdateExpression:
    "SET paragraphs = :p, subtitle = :sub, excerpt = :exc, moralOrLesson = :mol, readingTimeMinutes = :rtm, updatedAt = :ua",
  ExpressionAttributeValues: {
    ":p": paragraphs,
    ":sub": subtitle,
    ":exc": excerpt,
    ":mol": moralOrLesson,
    ":rtm": 3,
    ":ua": Math.floor(Date.now() / 1000),
  },
};

console.log("Pushing to DynamoDB (Story table, en#death-of-alexander)...\n");

try {
  await docClient.send(new UpdateCommand(params));
  console.log("✅ Successfully updated 'The Death of Alexander' (English).");
  console.log("   Updated fields: paragraphs, subtitle, excerpt, moralOrLesson, readingTimeMinutes, updatedAt");
  console.log("   Untouched fields: siteId, storyId, langStoryId, lang, title, icon, storyCategory,");
  console.log("                     era, tier, isFree, isFeatured, hasAudio, characters, coordinates,");
  console.log("                     thumbnail, image, source, disabled");
} catch (err) {
  console.error("❌ DynamoDB update failed:", err.message);
  process.exit(1);
}
