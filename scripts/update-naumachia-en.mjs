import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client);

const paragraphs = [
  {
    text: `Picture this: the year is 80 AD, the brand-new Colosseum has just opened in Rome, and Emperor Titus decides that gladiator fights aren't impressive enough for opening night. So he floods the entire arena and stages a full-scale naval battle inside. Real warships. Real weapons. Real death. It sounds impossible — the kind of detail you'd dismiss as ancient exaggeration — but multiple eyewitnesses wrote about it, and modern archaeologists have found the engineering that made it work.`,
  },
  {
    text: `A poet named Martial was in the crowd that day. He saw the whole thing and wrote about it in a collection of poems about the opening games. His message to latecomers was essentially: don't let the ocean fool you — this was dry land this morning, and it will be again by tonight. Warships crashed through water where gladiators had fought on solid ground just hours before. The arena kept shifting between land and sea, as if the building itself couldn't make up its mind.`,
  },
  {
    text: `The historian Cassius Dio filled in the details. Titus didn't just float a couple of boats — he recreated famous naval battles from Greek history, like Athens against Syracuse. Horses and bulls trained for water were brought in alongside the warships. And the fighters? Condemned prisoners, given real swords and forced to play the roles of ancient sailors. There was no stage combat, no safety net. The weapons were sharp, the drowning was real, and the water turned red.`,
  },
  {
    text: `The engineering behind this still blows minds. Beneath the arena floor, Romans had built a network of water channels connected to the city's aqueducts. Massive gates controlled the flow, and the floor was sealed with waterproof concrete so nothing leaked into the rooms below. When the show was over, a drainage system could empty the whole flooded arena in just hours. They essentially built a stadium that doubled as a swimming pool — except the pool was for killing people.`,
  },
  {
    text: `The sea battles only lasted about a decade. Titus's brother and successor, Emperor Domitian, decided the space under the arena was more valuable as a permanent backstage. He built an underground maze of tunnels, animal cages, and mechanical lifts — the same ruins you can still see today when you visit the Colosseum. Once that went in, with its wooden floors and complex machinery, flooding the arena became impossible. Just like that, the most spectacular show in Roman history was gone forever.`,
  },
  {
    text: `But here's why this story stays with you. Romans called the Mediterranean "Mare Nostrum" — Our Sea. By dragging the ocean inside their greatest building, the emperors were making a statement no one could miss: we don't just rule the land, we command the water itself. The sea rises and falls at the emperor's word. For the fifty thousand people watching warships clash to the death in the middle of their city, the message hit like a fist. There was nothing on earth that Rome could not control.`,
  },
];

// Validation
console.log("=== PARAGRAPH VALIDATION ===\n");
let totalChars = 0;
let allValid = true;

for (let i = 0; i < paragraphs.length; i++) {
  const text = paragraphs[i].text;
  const chars = text.length;
  const words = text.split(/\s+/).length;
  totalChars += chars;

  const charOk = chars <= 500;
  const wordOk = words <= 100;

  if (!charOk || !wordOk) allValid = false;

  console.log(
    `P${i + 1}: ${chars} chars ${charOk ? "✅" : "❌"} | ${words} words ${wordOk ? "✅" : "❌"}`
  );
}

console.log(`\nTotal: ${totalChars} chars (target ~3000, ±20% = 2400-3600)`);
console.log(`Paragraphs: ${paragraphs.length} (target 6-8)`);

const totalOk = totalChars >= 2400 && totalChars <= 3600;
console.log(`Total chars in range: ${totalOk ? "✅" : "❌"}`);

if (!allValid || !totalOk) {
  console.error("\n❌ Validation failed. Aborting.");
  process.exit(1);
}

const excerpt = `Picture this: the year is 80 AD, the brand-new Colosseum has just opened in Rome, and Emperor Titus decides that gladiator fights aren't impressive enough for opening night. So he floods the entire arena and stages a full-scale naval battle inside. Real warships. Real weapons. Real death.`;

console.log(`\nExcerpt: ${excerpt.length} chars`);

// Push to DynamoDB
const now = Math.floor(Date.now() / 1000);

const command = new UpdateCommand({
  TableName: "Story",
  Key: {
    siteId: "colosseum-rome",
    langStoryId: "en#naumachia-sea-battles",
  },
  UpdateExpression: "SET paragraphs = :p, excerpt = :e, updatedAt = :u",
  ExpressionAttributeValues: {
    ":p": paragraphs,
    ":e": excerpt,
    ":u": now,
  },
  ReturnValues: "ALL_NEW",
});

try {
  const result = await docClient.send(command);
  console.log("\n✅ Story updated successfully!");
  console.log(`Updated at: ${now}`);
  console.log(`Title: ${result.Attributes.title}`);
  console.log(`Paragraphs: ${result.Attributes.paragraphs.length}`);
  console.log(`Excerpt: ${result.Attributes.excerpt.substring(0, 80)}...`);
} catch (error) {
  console.error("\n❌ DynamoDB update failed:", error.message);
  process.exit(1);
}
