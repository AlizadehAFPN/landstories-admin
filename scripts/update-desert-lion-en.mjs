import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: `In 260 AD, Rome suffered the most humiliating moment in its eight-hundred-year history. Emperor Valerian marched east to fight Shapur I, the king of Persia, and lost everything \u2014 not just the battle, but himself. He was captured alive near the city of Edessa in modern Turkey, the only reigning Roman emperor ever taken prisoner by a foreign enemy. The Persians reportedly used him as a human footstool. Rome\u2019s eastern half was now wide open, and the greatest empire on Earth was breaking apart.`,
  },
  {
    text: `Enter Odaenathus \u2014 or Udhayna in his native Aramaic, meaning \u201Clittle ear.\u201D He was the lord of Palmyra, a fabulously wealthy caravan city in the Syrian desert that sat right on the trade routes between Rome and Persia. He wasn\u2019t a Roman general or a governor. He was an Arab client king \u2014 a local ruler allied to Rome \u2014 whose Palmyrene mounted archers and heavily armored cavalry were some of the deadliest fighters in the ancient world. And he was about to make the biggest gamble of his life.`,
  },
  {
    text: `Odaenathus tried diplomacy first. He sent Shapur a caravan loaded with gold, silver, and luxury goods \u2014 basically an offer to talk. Shapur\u2019s response was pure arrogance. \u201CWho is this Odaenathus that he dares write to his lord?\u201D the Persian king shot back. \u201CLet him crawl to me with his hands bound.\u201D Then he ordered the gifts thrown into the Euphrates. It was the kind of mistake that changes history. Instead of neutralizing the one man who could fight him, Shapur had just made his worst enemy.`,
  },
  {
    text: `So Odaenathus went to war. He first crushed two Roman rebels who had seized power in the chaos, proving his loyalty to the legitimate emperor back in Rome. Then he turned east, gathered his Palmyrene cavalry and allied warriors, and did what no one thought possible. He smashed across the Euphrates and marched all the way to Ctesiphon \u2014 the Persian capital near modern Baghdad. He reached the gates, wrecked everything in sight, and pulled back loaded with treasure. Then he did it again.`,
  },
  {
    text: `Rome\u2019s emperor Gallienus, stuck fighting his own wars in the West, did the smart thing: he gave Odaenathus the title \u201CGovernor of the Entire Roman East.\u201D Overnight, a desert caravan lord was officially running half the Roman Empire. But the title Odaenathus gave himself was even bolder \u2014 Palmyrene inscriptions call him \u201CKing of Kings,\u201D the exact title used by Persian emperors since Cyrus the Great. The man Shapur told to crawl was now claiming Shapur\u2019s own crown.`,
  },
  {
    text: `It ended at a banquet in 267 AD. Odaenathus and his eldest son Hairan were murdered by his own nephew, Maeonius \u2014 officially over a hunting insult. But the real question is who benefited from both father and heir dying on the same night. The answer: Zenobia, Odaenathus\u2019s second wife, a brilliant queen who claimed descent from Cleopatra. With Hairan gone, her infant son became king and she became the real power. Maeonius was killed right after. Nobody ever got to ask him who gave the order.`,
  },
  {
    text: `Here\u2019s the part that stays with you. Odaenathus spent his life saving the Roman Empire. He drove Persia back, held the eastern frontier together when nobody else could, and Rome rewarded him with every title and honor they had. Within a decade of his death, a Roman army marched into Palmyra, sacked it, and reduced it to a ruin that never recovered. The empire he saved destroyed the city he built. That\u2019s the deal the powerful offer the useful \u2014 gratitude with an expiration date.`,
  },
];

// Validate constraints before pushing
let totalChars = 0;
for (let i = 0; i < paragraphs.length; i++) {
  const chars = paragraphs[i].text.length;
  const words = paragraphs[i].text.split(/\s+/).length;
  totalChars += chars;
  console.log(`P${i + 1}: ${chars} chars, ${words} words`);
  if (chars > 500) console.warn(`  ⚠️  P${i + 1} exceeds 500 char limit!`);
  if (words > 100) console.warn(`  ⚠️  P${i + 1} exceeds 100 word limit!`);
}
console.log(`\nTotal: ${totalChars} chars, ${paragraphs.length} paragraphs`);
console.log(`Target: ~3000 chars (±20% = 2400-3600)\n`);

const cmd = new UpdateCommand({
  TableName: "Story",
  Key: {
    siteId: "palmyra",
    langStoryId: "en#desert-lion-who-saved-rome",
  },
  UpdateExpression: "SET paragraphs = :p, updatedAt = :u, readingTimeMinutes = :r",
  ExpressionAttributeValues: {
    ":p": paragraphs,
    ":u": Math.floor(Date.now() / 1000),
    ":r": 3,
  },
  ReturnValues: "ALL_NEW",
});

try {
  const result = await docClient.send(cmd);
  console.log("✅ Story updated successfully!");
  console.log(`   siteId: ${result.Attributes.siteId}`);
  console.log(`   langStoryId: ${result.Attributes.langStoryId}`);
  console.log(`   paragraphs: ${result.Attributes.paragraphs.length}`);
  console.log(`   readingTimeMinutes: ${result.Attributes.readingTimeMinutes}`);
  console.log(`   updatedAt: ${result.Attributes.updatedAt}`);
} catch (err) {
  console.error("❌ Update failed:", err.message);
  process.exit(1);
}
