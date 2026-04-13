import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: `For almost five hundred years, people walked into the Sistine Chapel, looked up, and saw exactly what Michelangelo wanted them to see — or so they thought. The Creation of Adam shows God reaching out to touch Adam's finger, surrounded by angels and wrapped in a flowing red cloak. It's probably the most recognized painting on Earth. You've seen it on posters, phone cases, memes. Everyone knows this image. But nobody — not for five centuries — noticed what was hiding in plain sight.`,
  },
  {
    text: `In 1990, a doctor named Frank Meshberger published a paper in the Journal of the American Medical Association — one of the most respected medical journals in the world — and changed everything. His claim was extraordinary: the shape surrounding God and the angels isn't just a cloak. It's an anatomically accurate cross-section of the human brain.`,
  },
  {
    text: `The match-ups are stunning. The red cloak traces the outer surface of the brain. The angel tucked under God's arm lines up perfectly with the brain stem. A trailing green scarf follows the exact path of a major artery that feeds the brain. A small figure near God's left foot sits right where a key hormone gland would be. Point after point, the anatomy matches with a precision that can't be accidental.`,
  },
  {
    text: `And Michelangelo absolutely had the knowledge to pull this off. As a young artist in Florence, he spent years dissecting dead bodies at a church called Santo Spirito — the head monk let him study corpses in exchange for a wooden crucifix Michelangelo carved by hand. By his thirties, he understood human anatomy better than most doctors of his time.`,
  },
  {
    text: `So what was the message? The most powerful reading is this: God isn't just giving Adam life — he's giving him a mind. The brain shape means the true divine gift isn't a heartbeat or a body. It's consciousness. Thought. Reason. The ability to wonder why you exist. In this version, God lives inside human intelligence itself.`,
  },
  {
    text: `But there's a far more dangerous reading. Michelangelo hated this job. Pope Julius II — a man more warrior than priest — essentially forced him to paint the ceiling, and the two clashed constantly. So what if the message is flipped? If God is shown inside a brain, maybe Michelangelo was saying God is a creation of the human mind, not the other way around. That would make it one of the most radical ideas in history — painted directly above the pope's head.`,
  },
  {
    text: `The plot thickened in 2010, when researchers Ian Suk and Rafael Tamargo published a study in the journal Neurosurgery revealing a second hidden anatomy lesson on the same ceiling. In the panel where God separates light from darkness, his throat and chest form a precise image of the brain stem and spinal cord. Michelangelo did this more than once.`,
  },
  {
    text: `No one knows for sure what Michelangelo meant. Was he celebrating consciousness as God's greatest gift? Quietly rebelling against a pope he despised? Or was he simply a genius who couldn't stop hiding what he knew inside his art? Five hundred years later, the most famous ceiling in the world is still giving up secrets nobody thought to look for.`,
  },
];

const excerpt = paragraphs[0].text;

// Validate constraints before pushing
let totalChars = 0;
for (let i = 0; i < paragraphs.length; i++) {
  const p = paragraphs[i];
  const chars = p.text.length;
  const words = p.text.split(/\s+/).length;
  totalChars += chars;
  console.log(`P${i + 1}: ${chars} chars, ${words} words`);
  if (chars > 500) console.warn(`  ⚠️  P${i + 1} exceeds 500 char limit!`);
  if (words > 100) console.warn(`  ⚠️  P${i + 1} exceeds 100 word limit!`);
}
console.log(`\nTotal: ${totalChars} chars, ${paragraphs.length} paragraphs`);
console.log(`Target: ~3000 chars (±20% = 2400–3600)\n`);

if (totalChars < 2400 || totalChars > 3600) {
  console.error("❌ Total character count out of range. Aborting.");
  process.exit(1);
}

// Update only translated fields: paragraphs, excerpt, updatedAt
const result = await docClient.send(
  new UpdateCommand({
    TableName: "Story",
    Key: {
      siteId: "vatican-st-peters",
      langStoryId: "en#hidden-brain-creation-adam",
    },
    UpdateExpression:
      "SET #p = :paragraphs, #e = :excerpt, #u = :updatedAt",
    ExpressionAttributeNames: {
      "#p": "paragraphs",
      "#e": "excerpt",
      "#u": "updatedAt",
    },
    ExpressionAttributeValues: {
      ":paragraphs": paragraphs,
      ":excerpt": excerpt,
      ":updatedAt": Math.floor(Date.now() / 1000),
    },
    ReturnValues: "ALL_NEW",
  })
);

console.log("✅ Story updated successfully!");
console.log(`   siteId: ${result.Attributes.siteId}`);
console.log(`   langStoryId: ${result.Attributes.langStoryId}`);
console.log(`   title: ${result.Attributes.title}`);
console.log(`   paragraphs: ${result.Attributes.paragraphs.length} paragraphs`);
console.log(`   excerpt length: ${result.Attributes.excerpt.length} chars`);
console.log(`   updatedAt: ${result.Attributes.updatedAt}`);

// Verify non-translated fields were NOT changed
console.log(`\n--- Verification (non-translated fields unchanged) ---`);
console.log(`   icon: ${result.Attributes.icon}`);
console.log(`   tier: ${result.Attributes.tier}`);
console.log(`   storyCategory: ${result.Attributes.storyCategory}`);
console.log(`   isFree: ${result.Attributes.isFree}`);
console.log(`   hasAudio: ${result.Attributes.hasAudio}`);
console.log(`   coordinates: ${JSON.stringify(result.Attributes.coordinates)}`);
