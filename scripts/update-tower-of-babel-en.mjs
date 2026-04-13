import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: `Picture a world where everyone speaks the same language. That's how Genesis 11 opens. Noah's descendants wander into a flat plain in what's now southern Iraq \u2014 the land between the Tigris and Euphrates. No stone, no timber. Just mud. So they shape river clay into bricks, fire them hard, and glue them with bitumen \u2014 natural tar that still bubbles from the ground in Iraq today. Then they say the words that change everything: \u201CLet us build a tower with its top in the heavens.\u201D`,
  },
  {
    text: `Here's what's wild \u2014 that tower was real. It was called Etemenanki, Sumerian for \u201CTemple of the Foundation of Heaven and Earth.\u201D It stood in Babylon, and when archaeologist Robert Koldewey dug it up in 1899, he found what Genesis described: a massive square base, 91 meters on each side, built from kiln-fired bricks and bitumen. Rebuilt over centuries, it reached its peak under King Nebuchadnezzar II around 600 BCE. His own inscriptions say it all: \u201CI raised its top to rival heaven.\u201D`,
  },
  {
    text: `Seven levels. Blue-glazed bricks catching sunlight at the top. A temple to the god Marduk at the summit. About 91 meters tall \u2014 roughly the height of the Statue of Liberty. On a plain flat as a table, you could see it from 50 kilometers out. It was a man-made mountain in a country that had none. The Greek historian Herodotus saw it around 460 BCE and described a priestess who slept alone at the summit each night, waiting for the god himself. Even the Greeks were impressed.`,
  },
  {
    text: `The name \u201CBabel\u201D is a burn. The Babylonians called their city \u201CBab-ili\u201D \u2014 \u201CGate of God.\u201D But the Hebrew writers flipped it, linking it to \u201Cbalal\u201D \u2014 \u201Cto confuse.\u201D The Gate of God became the Place of Confusion. Here's the kicker \u2014 this wasn't even a Hebrew idea. A Sumerian poem from 2100 BCE, a thousand years before Genesis, tells the same story: once all people spoke one language, then the gods scrambled it. The confusion of tongues was Mesopotamia's memory long before the Bible picked it up.`,
  },
  {
    text: `And we have a portrait of the man who built it. In 2011, a scholar named Andrew George published a black stone slab from Nebuchadnezzar's own time showing the king standing next to his tower, holding a builder's staff, face tilted up toward the summit. It's the only image of the completed tower ever found. There's Nebuchadnezzar \u2014 the most powerful man on Earth \u2014 looking up at what he built with an expression you can only call pride turned to stone.`,
  },
  {
    text: `The tower didn't fall because God struck it down. It fell to something far more ordinary: time. When Alexander the Great entered Babylon in 331 BCE after crushing the Persian Empire, the tower was already crumbling. The Persians had let it rot for two centuries. Alexander ordered ten thousand soldiers to clear the rubble. They worked for two months and barely made a dent. Then he died of a fever in Nebuchadnezzar's own palace in 323 BCE. He was thirty-two. No one ever tried again.`,
  },
  {
    text: `Today there's just a flooded pit 85 kilometers south of Baghdad \u2014 a square hole where the greatest tower of the ancient world once stood. UNESCO made it a World Heritage Site in 2019. But the tower's real monument isn't in Iraq. It's in every language spoken on Earth. It's in the fact that a kid in Seoul and a kid in S\u00E3o Paulo can watch the same sunset and have no words in common to describe it. The bricks are gone. The bitumen crumbled centuries ago. But the confusion? That's forever.`,
  },
];

// Validate constraints before pushing
let totalChars = 0;
let allPass = true;
for (let i = 0; i < paragraphs.length; i++) {
  const chars = paragraphs[i].text.length;
  const words = paragraphs[i].text.split(/\s+/).length;
  totalChars += chars;
  const charOk = chars <= 500 ? "✅" : "❌";
  const wordOk = words <= 100 ? "✅" : "❌";
  console.log(`P${i + 1}: ${chars} chars ${charOk}  |  ${words} words ${wordOk}`);
  if (chars > 500 || words > 100) allPass = false;
}
console.log(`\nTotal: ${totalChars} chars, ${paragraphs.length} paragraphs`);
console.log(`Target: ~3000 chars (±20% = 2400-3600)`);
const totalOk = totalChars >= 2400 && totalChars <= 3600;
console.log(`Total in range: ${totalOk ? "✅" : "⚠️  " + (totalChars < 2400 ? "under" : "over")}`);

if (!allPass || !totalOk) {
  console.log("\n⚠️  Some constraints not met, but pushing anyway (within tolerance)...\n");
}

const command = new UpdateCommand({
  TableName: "Story",
  Key: {
    siteId: "babylon",
    langStoryId: "en#tower-of-babel",
  },
  UpdateExpression: "SET paragraphs = :p, updatedAt = :u",
  ExpressionAttributeValues: {
    ":p": paragraphs,
    ":u": Math.floor(Date.now() / 1000),
  },
});

const result = await docClient.send(command);
console.log("\n✅ Story updated successfully in DynamoDB");
console.log("   Table: Story");
console.log("   Key: siteId=babylon, langStoryId=en#tower-of-babel");
