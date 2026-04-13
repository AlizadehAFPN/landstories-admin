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
    text: `It was 619 CE — the Year of Sorrow. Muhammad, already hunted for preaching a faith that threatened Mecca's ruling class, lost the two people keeping him alive. His uncle Abu Talib, who'd shielded him for a decade out of stubborn family love. Then his wife Khadijah, who'd held him after his first encounter with an angel and said, "God will never forsake you." No uncle, no protection. No wife, no refuge. He tried the city of Ta'if for allies. They stoned him until blood soaked his sandals.`,
  },
  {
    text: `That was his lowest point. And right there — broken, bleeding, fifty — the angel Jibril appeared with a winged steed called the Buraq, whose stride covered the horizon. In an instant he crossed 1,200 kilometers of desert to Jerusalem, landing at the Temple Mount — the hilltop where Abraham raised the knife over his son and Solomon built his temple. Inside the sanctuary, every prophet God had ever sent stood waiting. Jibril told Muhammad to lead the prayer. The last prophet led the first.`,
  },
  {
    text: `From the Foundation Stone — the same rock where the Jewish Holy of Holies once stood — Muhammad rose through seven heavens. In each he met a prophet. Adam in the first, weeping over lost souls. Jesus and John the Baptist in the second. Joseph in the third, said to have been given "half of all beauty." Moses in the sixth, weeping because Muhammad's community would outnumber his own. In the seventh, Abraham — father of all three faiths — leaned against the heavenly Kaaba and smiled.`,
  },
  {
    text: `Then Muhammad went on alone. Even Jibril couldn't follow — "One step more and I'd burn." He reached the Lote Tree of the Utmost Boundary, the edge of creation. There, he stood before God. The command: fifty daily prayers. He accepted. But Moses stopped him. "Your people can't handle that — I tried with the Israelites." Back he went. Forty. Moses shook his head. Thirty. Twenty. Ten. Finally five, each counting for ten. Moses pushed again. Muhammad said, "I've asked until I'm ashamed. I accept."`,
  },
  {
    text: `He was back in Mecca before dawn. His bed was still warm. Its leaders laughed — a round trip to Jerusalem in one night? They demanded he describe a city he'd never visited. God placed a vision before his eyes, and he described its gates, walls, and buildings perfectly. Most still called him a liar. But his closest friend Abu Bakr didn't hesitate: "If he says it happened, then it happened." From that day Abu Bakr carried the title al-Siddiq — the Confirmer — a name that has outlasted empires.`,
  },
  {
    text: `Seventy years later, Caliph Abd al-Malik built the golden Dome of the Rock over the stone from which Muhammad ascended. The western wall of the Temple Mount — which Jews call the Western Wall — Muslims named the Buraq Wall, for the steed that carried Muhammad through the sky. The five prayers negotiated that night are still performed by two billion people today. One journey turned Jerusalem into Islam's third-holiest city. One rock. Three faiths. The same ancient, unfinished reach toward heaven.`,
  },
];

const excerpt =
  "It was 619 CE — the Year of Sorrow. Muhammad, already hunted for preaching a faith that threatened Mecca's ruling class, lost the two people keeping him alive.";

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
    siteId: "jerusalem-old-city",
    langStoryId: "en#night-journey-isra-miraj",
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
} catch (err) {
  console.error("\n✗ DynamoDB update failed:", err.message);
  process.exit(1);
}
