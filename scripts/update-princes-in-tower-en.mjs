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
    text: `In the spring of 1483, a twelve-year-old boy became King of England. Edward V had just lost his father, and he and his nine-year-old brother Richard were sent to the Tower of London — which, back then, was still a royal palace, not just a prison. Their uncle, Richard of Gloucester, was put in charge until Edward was old enough to rule. People saw the boys playing in the Tower gardens, shooting arrows on the grounds. Then the sightings stopped. By summer, both princes had vanished.`,
  },
  {
    text: `Their uncle moved fast. He declared both boys illegitimate, arguing that their parents' marriage was invalid because their father, Edward IV, had already been secretly engaged to someone else. With the boys legally erased, he crowned himself King Richard III. Rumors tore across Europe. The French chancellor openly accused Richard of killing his own nephews. Everyone was asking the same question — what happened to the princes?`,
  },
  {
    text: `The most famous account comes from Sir Thomas More, writing about thirty years later. He claimed Richard sent Sir James Tyrrell to the Tower to kill the boys. Tyrrell hired two men who crept into the princes' room at night and smothered them with their pillows as they slept. Tyrrell supposedly confessed before his own execution in 1502. But nobody has ever found that confession. The document doesn't exist. And the one person who benefited most from its 'discovery'? Henry VII — the new king.`,
  },
  {
    text: `Almost two centuries later, in 1674, workers tearing down a staircase inside the Tower found a wooden chest buried beneath the stones. Inside: the skeletons of two children, bones tangled together. King Charles II had the remains sealed in a marble urn in Westminster Abbey. In 1933, doctors examined the bones and concluded they matched children aged roughly twelve and ten — the princes' ages. DNA testing could settle this today. Westminster Abbey has refused every request to reopen the urn.`,
  },
  {
    text: `So who actually did it? Some historians point the finger at Henry VII, not Richard. Henry seized the throne after defeating Richard at the Battle of Bosworth Field in 1485 — the battle that ended the Wars of the Roses, England's brutal thirty-year civil war. The princes were a bigger threat to Henry's claim than to Richard's. Others blame the Duke of Buckingham, an ambitious nobleman with his own designs on the crown. Almost everyone near power had a motive.`,
  },
  {
    text: `Then there's the strangest twist. In the 1490s, a young man named Perkin Warbeck showed up at royal courts across Europe claiming to be Prince Richard — the younger brother, alive and escaped. He was convincing enough that the kings of France and Scotland backed his claim. He launched two invasions of England before being captured and executed. Was he really the lost prince? Almost certainly not. But nobody could prove it then, and nobody can prove it now.`,
  },
  {
    text: `More than five hundred years later, two small skeletons sit in a marble urn in Westminster Abbey, and we still don't know whose bones they are. We don't know who gave the order. We don't even know for certain that the princes were murdered. The Tower of London has held a thousand secrets over the centuries, but this is the one it has never given up. Some mysteries endure not because the evidence is lost — but because no one in power wants the answer found.`,
  },
];

const excerpt =
  "In the spring of 1483, a twelve-year-old boy became King of England. Edward V had just lost his father, and he and his nine-year-old brother Richard were sent to the Tower of London.";

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
    siteId: "tower-of-london",
    langStoryId: "en#princes-in-the-tower",
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
  console.log("\n✓ Story updated successfully in DynamoDB.");
  console.log(`  updatedAt: ${now}`);
  console.log(`  paragraphs: ${result.Attributes.paragraphs.length}`);
  console.log(`  title: ${result.Attributes.title}`);
  console.log(`  subtitle: ${result.Attributes.subtitle}`);
  console.log(`  excerpt: ${result.Attributes.excerpt}`);
} catch (err) {
  console.error("\n✗ DynamoDB update failed:", err.message);
  process.exit(1);
}
