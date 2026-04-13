import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

// ─── New paragraphs ────────────────────────────────────────────────────────────

const paragraphs = [
  {
    text: `Here's something that will mess with your head. In the mid-1990s, German archaeologist Klaus Schmidt started digging into a hilltop in southeastern Turkey — and found something that shouldn't exist. Göbekli Tepe: a stone temple built around 9600 BC, seven thousand years before the Egyptian pyramids. Schmidt noticed where it sits. Right in the Fertile Crescent, the exact region where the Bible's Genesis places the Garden of Eden — near where the Tigris and Euphrates rivers begin.`,
  },
  {
    text: `Eleven thousand years ago, this wasn't the dry landscape you see today. The hills around Göbekli Tepe were thick with wild wheat, barley, and grapes. Game animals roamed everywhere. For the hunter-gatherers who lived here, it was nature's all-you-can-eat buffet — no farming, no backbreaking labor. Just walk outside and the world feeds you. If that doesn't sound like paradise, what does?`,
  },
  {
    text: `Then came what might be the biggest shift in human history. People in this very region started planting crops, keeping animals, and settling into permanent villages. They invented farming. And if you've ever wondered why Genesis describes humanity's "fall" as being thrown out of a garden and cursed to work the earth "by the sweat of your brow" — Schmidt thought that was no coincidence. The Eden story might be an ancient memory of the moment we traded paradise for a plow.`,
  },
  {
    text: `It gets stranger. Around 8000 BC, the people of Göbekli Tepe did something no one can fully explain. They buried the entire temple complex under tons of dirt — deliberately, carefully, as if sealing it shut forever. The timing is eerie: it lines up almost perfectly with agriculture taking over the region. It's like they were closing a door on the old world. A final goodbye to the life they were leaving behind.`,
  },
  {
    text: `The symbolic connections keep stacking up. The site's massive T-shaped stone pillars could represent trees — and in each ring, two stand taller at the center, which some researchers compare to Eden's two famous trees: the Tree of Life and the Tree of Knowledge. Dozens of animal carvings — foxes, snakes, scorpions, vultures — look like a catalog of creatures from a lost world. The whole place seems built for ritual, somewhere humans came to touch something bigger than themselves.`,
  },
  {
    text: `Was Göbekli Tepe literally the Garden of Eden? Probably not — Eden is a myth, not a place you can pin on a map. But that's not really the point. The deeper question is whether one of humanity's oldest stories carries an echo of something that actually happened: the moment we stopped living with the wild and started reshaping the world to suit us. A choice that gave us civilization — and cost us paradise.`,
  },
  {
    text: `The people who raised these stones had no writing, no metal tools, no wheels. They lived before almost everything we call "civilization." Yet standing in that temple twelve thousand years ago, they may have watched the world they loved start to vanish — and somehow passed that loss down through a hundred generations, until it became the story of a garden, a fall, and a world that could never be the same.`,
  },
];

// ─── Validation ────────────────────────────────────────────────────────────────

let totalChars = 0;
let totalWords = 0;
let valid = true;

paragraphs.forEach((p, i) => {
  const chars = p.text.length;
  const words = p.text.split(/\s+/).length;
  totalChars += chars;
  totalWords += words;

  if (chars > 500) {
    console.error(`❌ P${i + 1}: ${chars} chars (max 500)`);
    valid = false;
  }
  if (words > 100) {
    console.error(`❌ P${i + 1}: ${words} words (max 100)`);
    valid = false;
  }
  console.log(`  P${i + 1}: ${chars} chars, ${words} words ✓`);
});

console.log(`\n  Total: ${totalChars} chars, ${totalWords} words, ${paragraphs.length} paragraphs`);
console.log(`  Target: ~3000 chars (±20% = 2400–3600)`);

if (totalChars < 2400 || totalChars > 3600) {
  console.error(`❌ Total chars ${totalChars} outside acceptable range (2400–3600)`);
  valid = false;
}
if (paragraphs.length < 6 || paragraphs.length > 10) {
  console.error(`❌ Paragraph count ${paragraphs.length} outside range (6–10)`);
  valid = false;
}

if (!valid) {
  console.error("\n❌ Validation failed. Aborting.");
  process.exit(1);
}

console.log("\n✅ All constraints pass.\n");

// ─── New excerpt (matches new opening) ─────────────────────────────────────────

const newExcerpt =
  "In the mid-1990s, German archaeologist Klaus Schmidt started digging into a hilltop in southeastern Turkey — and found something that shouldn't exist.";

// ─── Update DynamoDB ───────────────────────────────────────────────────────────

const result = await docClient.send(
  new UpdateCommand({
    TableName: "Story",
    Key: {
      siteId: "gobeklitepe",
      langStoryId: "en#garden-of-eden",
    },
    UpdateExpression:
      "SET paragraphs = :p, excerpt = :e, updatedAt = :u",
    ExpressionAttributeValues: {
      ":p": paragraphs,
      ":e": newExcerpt,
      ":u": Math.floor(Date.now() / 1000),
    },
    ReturnValues: "ALL_NEW",
  })
);

console.log("✅ DynamoDB updated successfully.");
console.log(`   siteId:      ${result.Attributes.siteId}`);
console.log(`   langStoryId: ${result.Attributes.langStoryId}`);
console.log(`   title:       ${result.Attributes.title}`);
console.log(`   paragraphs:  ${result.Attributes.paragraphs.length} paragraphs`);
console.log(`   excerpt:     ${result.Attributes.excerpt.substring(0, 80)}…`);
console.log(`   updatedAt:   ${result.Attributes.updatedAt}`);
console.log(`\n   Unchanged fields: title, subtitle, moralOrLesson, characters, icon, era, tier, storyCategory, source, coordinates, etc.`);
