import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: `Qin Shi Huang had done what no one before him could. By 221 BC, he'd crushed six rival kingdoms and stitched them together into a single empire — China, named after him. He built the Great Wall. He standardized writing, money, even the width of cart axles. The man had essentially invented a country. But none of it was enough. Because Qin Shi Huang was terrified of the one enemy he couldn't outfight: death.`,
  },
  {
    text: `So he went looking for a cure. His court alchemists told him that mercury — that strange, liquid metal — held the secret to eternal life. The Emperor started swallowing mercury pills every day, convinced they were making him immortal. In reality, they were slowly destroying his body from the inside. The very thing he believed would save him was killing him, one dose at a time.`,
  },
  {
    text: `His wildest attempt was a full-scale naval mission. In 219 BC, he ordered an alchemist named Xu Fu to sail east with sixty ships and three thousand young men and women — all to find a group of mythical islands where, supposedly, immortals lived and an elixir of eternal life grew on trees. It was one of the largest expeditions of the ancient world, and it sailed straight into the unknown.`,
  },
  {
    text: `Xu Fu never came back. Not with the elixir, not with his fleet, not with his three thousand passengers. Chinese legend says he reached Japan and settled there, becoming an ancestor of the Japanese people. To this day, towns along the Japanese coast claim to be his landing place, and shrines in his name still stand. He'd been sent to find immortality — and in a way, the story itself became immortal.`,
  },
  {
    text: `In 210 BC, Qin Shi Huang died while traveling — still searching for his miracle. And what happened next is almost too bizarre to believe. His chief minister Li Si and a powerful court official named Zhao Gao decided to hide the Emperor's death for months. To cover the smell of the rotting body, they loaded carts of fish around his carriage. The most powerful man in the world was smuggled home disguised by the stench of dead fish.`,
  },
  {
    text: `But the Emperor had a backup plan. If he couldn't live forever, he'd rule forever underground. His tomb was built to be an entire empire in miniature: rivers of liquid mercury tracing the paths of China's great rivers, a ceiling of copper and jewels mapping the night sky, and an army of eight thousand life-sized terracotta soldiers standing guard for eternity. He even installed crossbow traps to kill anyone who tried to break in.`,
  },
  {
    text: `Here's the thing that gets you. The mercury that poisoned him — the same substance he swallowed for years thinking it would make him live forever — is the same mercury that flows through the rivers of his tomb. The thing that killed him became the centerpiece of his afterlife. He never found immortality. But he built the most spectacular grave on Earth, and two thousand years later, we're still talking about it.`,
  },
];

const excerpt =
  "Qin Shi Huang had done what no one before him could. By 221 BC, he'd crushed six rival kingdoms and stitched them together into a single empire — China, named after him.";

const now = Math.floor(Date.now() / 1000);

const cmd = new UpdateCommand({
  TableName: "Story",
  Key: {
    siteId: "terracotta-army",
    langStoryId: "en#quest-for-immortality",
  },
  UpdateExpression:
    "SET paragraphs = :p, excerpt = :e, updatedAt = :u",
  ExpressionAttributeValues: {
    ":p": paragraphs,
    ":e": excerpt,
    ":u": now,
  },
  ReturnValues: "ALL_NEW",
});

try {
  const result = await docClient.send(cmd);
  console.log("✅ Story updated successfully!");
  console.log(`   siteId: ${result.Attributes.siteId}`);
  console.log(`   langStoryId: ${result.Attributes.langStoryId}`);
  console.log(`   title: ${result.Attributes.title}`);
  console.log(`   paragraphs: ${result.Attributes.paragraphs.length}`);
  console.log(`   excerpt: ${result.Attributes.excerpt.substring(0, 80)}...`);
  console.log(`   updatedAt: ${result.Attributes.updatedAt}`);

  // Verify non-translated fields are untouched
  console.log("\n🔒 Non-translated fields preserved:");
  console.log(`   storyCategory: ${result.Attributes.storyCategory}`);
  console.log(`   tier: ${result.Attributes.tier}`);
  console.log(`   icon: ${result.Attributes.icon}`);
  console.log(`   era: ${result.Attributes.era}`);
  console.log(`   characters: ${JSON.stringify(result.Attributes.characters)}`);
  console.log(`   source: ${result.Attributes.source}`);
  console.log(`   isFree: ${result.Attributes.isFree}`);
  console.log(`   hasAudio: ${result.Attributes.hasAudio}`);
  console.log(`   subtitle: ${result.Attributes.subtitle}`);
  console.log(`   moralOrLesson: ${result.Attributes.moralOrLesson}`);
} catch (err) {
  console.error("❌ Update failed:", err);
  process.exit(1);
}
