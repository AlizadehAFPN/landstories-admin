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
    text: `On the night of November 3, 1793, a man named Philibert Aspairt walked into the tunnels beneath Paris and never came back out. His body was found eleven years later — and here's the detail that makes this story unforgettable: he died just twenty meters from an exit. He was right there. He almost made it. But in total darkness, "almost" means nothing.`,
  },
  {
    text: `Aspairt was the doorkeeper at the Val-de-Grâce military hospital on the Left Bank of Paris. The hospital sat right on top of old quarry tunnels, and the staff all knew about passages leading underground from the basement. Why did he go down? The best guess is that he was looking for the wine cellar of a nearby monastery — the monks had supposedly left behind a hidden stash of liqueur when they were kicked out during the French Revolution. Free booze, just a few tunnels away.`,
  },
  {
    text: `He brought one candle. One. The quarry network beneath Paris stretches over 300 kilometers — a tangled web of dead ends, flooded halls, collapsed ceilings, and passages that split and split again until your sense of direction is completely gone. In 1793, almost none of it was mapped. A single candle lit maybe two or three meters around you. Beyond that? Absolute, crushing blackness — the kind of dark where you can't see your own hand touching your face.`,
  },
  {
    text: `Aspairt's candle went out.`,
  },
  {
    text: `Maybe a draft blew it out. Maybe it burned down to nothing. Maybe he tripped. It doesn't matter. What matters is this: a man was now standing in total darkness, somewhere inside 300 kilometers of tunnels, with no light, no map, and no way to tell which direction led to safety and which led deeper into the maze.`,
  },
  {
    text: `He walked. He must have walked for hours, maybe days, dragging his hands along the rough limestone walls, guessing at every turn, shouting into stone that swallowed his voice without an echo. He left no marks, no trail, nothing. The darkness just took him.`,
  },
  {
    text: `His body turned up in 1804 — eleven years later. Quarry workers mapping the tunnels recognized him by the hospital keys still in his pocket. He was lying in a passage that connected, through one short corridor, straight back to the basement of the very hospital where he worked. The exit was twenty meters away. One left turn instead of a right, and he walks out alive. But in pitch black, with no way to know which way holds life and which holds death, he went right.`,
  },
  {
    text: `They buried him right where he fell. His gravestone is still there in the tunnels — one of the only marked graves in the entire Catacombs. Today, trespassers who sneak into the off-limits passages leave candles and coins on his stone. His story survives because it hits something we all fear: being so close to safety you could almost reach out and touch it, and never knowing. In the labyrinth under Paris, twenty meters might as well be twenty miles. The dark doesn't care how close you are.`,
  },
];

const excerpt =
  "On the night of November 3, 1793, a man named Philibert Aspairt walked into the tunnels beneath Paris and never came back out.";

const moralOrLesson =
  "In the labyrinth, direction is everything and distance means nothing — Aspairt died twenty meters from escape, a reminder that sometimes safety is closer than we think but invisible in the dark.";

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
    siteId: "catacombs-of-paris",
    langStoryId: "en#philibert-aspairt-lost",
  },
  UpdateExpression:
    "SET paragraphs = :p, excerpt = :exc, moralOrLesson = :moral, updatedAt = :ts, readingTimeMinutes = :rtm",
  ExpressionAttributeValues: {
    ":p": paragraphs,
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
  console.log(`  excerpt: ${result.Attributes.excerpt}`);
  console.log(`  moralOrLesson: ${result.Attributes.moralOrLesson}`);
} catch (err) {
  console.error("\n✗ DynamoDB update failed:", err.message);
  process.exit(1);
}
