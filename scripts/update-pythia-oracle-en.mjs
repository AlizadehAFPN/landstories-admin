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
    text: `For over a thousand years, the most powerful person in the ancient world wasn't a king or a general. It was a woman — sitting alone on a tripod in a dark underground chamber, breathing in fumes rising from a crack in the earth. She was the Pythia, the Oracle of Delphi. When she spoke, people believed they were hearing the voice of Apollo, the Greek god of prophecy. Kings crossed continents and waited months just to ask her a single question.`,
  },
  {
    text: `The Pythia was always a local woman from Delphi. At first she had to be young and unmarried — until a visitor assaulted one of them. After that, only women over fifty were chosen, though they still dressed in a maiden's white robes. Once selected, she gave up everything: her home, her family, her name. She belonged to Apollo now. She'd serve as his mouthpiece until the day she died.`,
  },
  {
    text: `The ritual happened once a month, on the seventh day — seven being Apollo's sacred number. She fasted, bathed in a cold mountain spring, and descended into the deepest, most restricted room of the temple. There, she sat on a tripod positioned directly over a crack in the rock. Sweet-smelling gas seeped up from below, making her lightheaded, even dreamy. She chewed laurel leaves, drank sacred water, and slowly slipped into a trance.`,
  },
  {
    text: `What came next was terrifying and electric. The Pythia would shake, cry out, and speak in a voice that witnesses said wasn't hers. Her words came out raw and scrambled — impossible for most people to follow. But the priests standing beside her caught every sound and shaped her wild outbursts into carefully worded prophecies. These prophecies were almost always riddles — and the Oracle never lied. She just made sure the truth had more than one meaning.`,
  },
  {
    text: `Those riddles changed the world. When Croesus, king of Lydia and the richest man alive, asked if he should attack Persia, the Oracle said: "If you cross the river, a great empire will fall." Croesus marched east, confident. His own empire was the one destroyed. When Athens faced a massive Persian invasion in 480 BCE, the Oracle said to "trust in the wooden walls." The general Themistocles argued she meant their warships. Athens bet everything on the fleet — and crushed the Persians at Salamis.`,
  },
  {
    text: `So what was really happening down there? In 2001, geologists found that two fault lines cross right beneath the temple ruins. Those cracks could have released ethylene — a natural gas that in small doses causes exactly what the ancient sources describe: a dreamy, floating feeling where you lose track of your own body. Maybe the Pythia was just getting high on fumes. Or maybe something stranger was at work. Either way, people believed her — and that belief moved armies and toppled kingdoms.`,
  },
  {
    text: `The end came in 393 CE. The Roman Emperor Theodosius — a Christian determined to shut down every trace of the old Greek religion — sent a messenger to Delphi to ask if the Oracle had anything left to say. Her answer is one of the most haunting goodbyes ever spoken: "Tell the emperor the great hall has fallen. Apollo has no shelter, no sacred laurel, no speaking spring. Even the water has gone silent." After more than a thousand years, the voice of the god went quiet — and never spoke again.`,
  },
];

const subtitle =
  "The priestess who spoke for a god for over a thousand years";

const excerpt =
  "For over a thousand years, the most powerful person in the ancient world wasn't a king or a general. It was a woman — sitting alone on a tripod in a dark underground chamber, breathing in fumes rising from a crack in the earth.";

const moralOrLesson =
  "The Oracle never lied — she just made sure the truth had more than one meaning. Understanding her answers required the very thing the Greeks carved above her temple door: Know Thyself.";

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
    siteId: "delphi",
    langStoryId: "en#pythia-oracle",
  },
  UpdateExpression:
    "SET paragraphs = :p, subtitle = :sub, excerpt = :exc, moralOrLesson = :moral, updatedAt = :ts",
  ExpressionAttributeValues: {
    ":p": paragraphs,
    ":sub": subtitle,
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
  console.log(`  subtitle: ${result.Attributes.subtitle}`);
  console.log(`  excerpt: ${result.Attributes.excerpt.substring(0, 80)}...`);
  console.log(`  moralOrLesson: ${result.Attributes.moralOrLesson.substring(0, 80)}...`);
} catch (err) {
  console.error("\n✗ DynamoDB update failed:", err.message);
  process.exit(1);
}
