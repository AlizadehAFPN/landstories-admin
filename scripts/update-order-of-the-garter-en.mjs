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
    text: `Here's a story about a wardrobe malfunction that created the most exclusive club in history. It's the year 1348. England's King Edward III — a warrior-king who'd just crushed the French at the Battle of Crécy — is throwing a massive ball at his castle. The court is packed with knights, nobles, and the most powerful people in England. The wine is flowing. The music is playing. And then something happens that changes everything.`,
  },
  {
    text: `On the dance floor is Joan of Kent — known as the most beautiful woman in England, and the woman the King is rumored to be obsessed with. Mid-dance, her garter — a silk band worn below the knee to hold up her stocking — slips off her leg and drops to the floor. Right there. In front of everyone. Now, in the 1300s, a garter was considered intimate clothing. Seeing it in public was like... well, imagine the worst wardrobe malfunction you can think of. The entire room erupted in laughter.`,
  },
  {
    text: `And then King Edward did something nobody expected. He walked across the floor, bent down, and picked up the garter. The room went dead silent. He looked around at every smirking face, then slowly and deliberately tied the blue silk ribbon around his own leg. And he said six words in French that would echo through the next seven centuries: "Honi soit qui mal y pense." Shame on anyone who thinks evil of it.`,
  },
  {
    text: `With one gesture, he'd flipped the entire moment. What had been a woman's humiliation was now a king's challenge. He told the stunned room that this garter would become the symbol of a new order of knighthood — one so powerful and so honored that every person who had laughed would one day beg to wear it. And he meant every word. He went on to create the Order of the Garter, and nearly 700 years later, it's still the oldest and most prestigious order of chivalry on Earth.`,
  },
  {
    text: `Edward modeled his new brotherhood on King Arthur's legendary Round Table — and in the 1300s, people took the Arthur legends dead seriously. He capped membership at 24 knights, matching Arthur's mythical circle, and chose Windsor Castle as the Order's home. But these weren't ceremonial titles. The founding knights were the hardest fighters in England — including Edward's own son, the Black Prince, the most feared warrior in Europe. This was honor earned in battle, not at banquets.`,
  },
  {
    text: `The Order's spiritual home is St. George's Chapel at Windsor — a stunning Gothic masterpiece where ten kings and queens are buried. Inside, carved stalls display the crests of every Garter Knight since 1348, with colorful banners overhead. Every June, new Knights walk through the castle grounds in floor-length blue velvet robes and hats topped with massive white feathers, looking like something out of a fantasy novel. The crowds still cheer. The tradition hasn't broken once in nearly 700 years.`,
  },
  {
    text: `Here's what makes it truly remarkable: to this day, the Order of the Garter is the personal gift of the British monarch — no prime minister, no committee, no politics. Just the King or Queen choosing who deserves it. Winston Churchill wore the Garter. So did the Duke of Wellington, who beat Napoleon. It all traces back to one moment on a dance floor — a King who turned a woman's embarrassment into the highest honor in the land, and dared anyone to say a word about it.`,
  },
];

const excerpt =
  "Here's a story about a wardrobe malfunction that created the most exclusive club in history. It's the year 1348. England's King Edward III — a warrior-king who'd just crushed the French at the Battle of Crécy — is throwing a massive ball at his castle.";

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

// ─── DYNAMODB UPDATE (paragraphs + excerpt + readingTime + timestamp ONLY) ──

const now = Math.floor(Date.now() / 1000);

const command = new UpdateCommand({
  TableName: "Story",
  Key: {
    siteId: "windsor-castle",
    langStoryId: "en#order-of-the-garter",
  },
  UpdateExpression:
    "SET paragraphs = :p, excerpt = :exc, updatedAt = :ts, readingTimeMinutes = :rtm",
  ExpressionAttributeValues: {
    ":p": paragraphs,
    ":exc": excerpt,
    ":ts": now,
    ":rtm": 4,
  },
  ReturnValues: "ALL_NEW",
});

try {
  const result = await docClient.send(command);
  console.log("\n✓ Story updated successfully in DynamoDB.");
  console.log(`  updatedAt: ${now}`);
  console.log(`  paragraphs: ${result.Attributes.paragraphs.length}`);
  console.log(`  readingTimeMinutes: ${result.Attributes.readingTimeMinutes}`);
  console.log(`  excerpt: ${result.Attributes.excerpt.substring(0, 80)}...`);
} catch (err) {
  console.error("\n✗ DynamoDB update failed:", err.message);
  process.exit(1);
}
