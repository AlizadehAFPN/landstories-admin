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
    text: `Here's what you think happened: thousands of armed workers charged the gates of the Winter Palace, fought their way through hallway after hallway, and toppled the Russian government in a blaze of gunfire. That version comes from Eisenstein's 1927 film "October" — and it's basically propaganda. The real story of October 1917, the night communist revolutionaries called the Bolsheviks seized power and ended centuries of rule by Russian tsars, was stranger, messier, and honestly kind of absurd.`,
  },
  {
    text: `The palace was guarded by a few hundred soldiers — mostly teenage cadets and members of the Women's Battalion of Death, an all-female volunteer unit that had already fought on the front lines of World War I. They were defending Russia's Provisional Government, the shaky democracy that had taken over when Tsar Nicholas II gave up the throne eight months earlier. But as the hours dragged on, most guards quietly slipped out through back doors. The revolution's biggest obstacle just walked away.`,
  },
  {
    text: `The Bolsheviks didn't storm in so much as wander in, climbing through windows and servants' entrances. The Winter Palace had over a thousand rooms, and small groups of armed workers got completely lost in the hallways. Then some of them found the tsar's wine cellar: roughly 100,000 bottles of the finest wine in Russia. What followed nearly ended the revolution before it started — a massive, out-of-control drinking spree in the middle of a coup.`,
  },
  {
    text: `Bolshevik commanders panicked. They sent armed guards to shut it down, but the guards started drinking too. They tried walling off the cellar, but people broke through. Finally, they smashed every last bottle. Wine poured through the palace gutters and out into the streets — a river of red running through the capital. Meanwhile, the actual government — Russia's cabinet ministers — were found huddled around a table in a small dining room. They were arrested without a single shot fired.`,
  },
  {
    text: `By dawn on October 26th, 1917, Vladimir Lenin stood before a crowd and announced: "The Provisional Government has been overthrown." Just like that, the Winter Palace — the seat of power for three centuries of Romanov tsars — belonged to a new regime. The whole thing had taken about twelve hours, and the bloodiest part might have been the wine.`,
  },
  {
    text: `Here's the part nobody expects. The revolutionaries who just toppled an empire didn't destroy its treasures. The Winter Palace held one of the greatest art collections on Earth — Rembrandt, Rubens, Leonardo da Vinci. The new Soviet government could have burned it all as a symbol of royal excess. Instead, they opened the doors wide. The palace became the heart of the Hermitage Museum, and the tsar's private masterpieces became everyone's masterpieces.`,
  },
  {
    text: `So the palace the Romanovs built to show off their wealth ended up showing off their downfall. And the revolution that was supposed to be an epic battle turned out to be a confused stumble through dark hallways, a wine disaster, and a quiet arrest over dinner. The greatest power shift of the twentieth century happened not with a roar, but with a hangover.`,
  },
];

// ─── VALIDATION ──────────────────────────────────────────────────────────────

let totalChars = 0;
let allValid = true;

paragraphs.forEach((p, i) => {
  const chars = p.text.length;
  const words = p.text.split(/\s+/).length;
  totalChars += chars;
  const ok = chars <= 500 && words <= 100;
  console.log(`P${i}: ${chars} chars, ${words} words ${ok ? "✓" : "✗ OVER LIMIT"}`);
  if (!ok) allValid = false;
});

console.log(`\nTotal: ${totalChars} chars (target ~3000 ±20%: 2400-3600)`);
console.log(`Paragraphs: ${paragraphs.length} (target 6-8)`);
console.log(`All valid: ${allValid}`);

if (!allValid) {
  console.error("\n❌ Validation failed. Not pushing.");
  process.exit(1);
}

// ─── UPDATE DynamoDB ─────────────────────────────────────────────────────────

const now = Math.floor(Date.now() / 1000);

const result = await docClient.send(
  new UpdateCommand({
    TableName: "Story",
    Key: {
      siteId: "hermitage-winter-palace",
      langStoryId: "en#storming-winter-palace",
    },
    UpdateExpression:
      "SET paragraphs = :p, excerpt = :e, moralOrLesson = :m, updatedAt = :u",
    ExpressionAttributeValues: {
      ":p": paragraphs,
      ":e": "The movie shows an epic battle. The truth? A confused stumble through a thousand rooms, 100,000 bottles of wine, and a quiet arrest over dinner.",
      ":m": "The greatest revolutions don't always come with a battle cry — sometimes they come with a hangover.",
      ":u": now,
    },
    ReturnValues: "UPDATED_NEW",
  })
);

console.log("\n✅ Story updated successfully in DynamoDB!");
console.log(
  "Updated fields:",
  Object.keys(result.Attributes).join(", ")
);
