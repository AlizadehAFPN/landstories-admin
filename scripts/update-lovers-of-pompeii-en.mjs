import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: `In 79 AD, Mount Vesuvius exploded and buried the Roman city of Pompeii under volcanic ash and superheated gas. Thousands died before they could take a single step. Centuries later, archaeologists found that bodies had left hollow spaces in the hardened ash — and by pouring in plaster, they could recreate the dead exactly as they fell. Out of hundreds of these haunting casts, one stopped people cold: two figures tangled in an embrace, one sheltering the other, holding on as everything ended.`,
  },
  {
    text: `For over a hundred years, everyone called them "The Two Maidens." The story seemed obvious: two young women — maybe sisters, maybe mother and daughter — clinging together as death arrived. The pose looked tender, the bodies seemed delicate, and the scholars who first studied them in the 1800s never thought to question it. Generations of tour guides repeated the same line. The Two Maidens became one of Pompeii's most famous symbols — a picture of devotion frozen in ash.`,
  },
  {
    text: `Then, in 2017, a team from the University of Florence ran CT scans and DNA tests on the casts — technology that simply didn't exist when the figures were first discovered. The results shattered more than a century of assumptions. The Two Maidens weren't maidens at all. Both figures were male. Both were young — around eighteen to twenty years old. Two men, holding each other, while the volcano killed everyone around them.`,
  },
  {
    text: `The news made headlines everywhere. The obvious question came fast: what were these two men to each other? Science couldn't answer that. They might have been brothers. Close friends. Lovers. In ancient Rome, romantic and sexual relationships between men were common and openly acknowledged — though society had strict rules about who could be with whom, based on class and social standing. These two could have been anything to each other. The ash preserved their bodies, not their story.`,
  },
  {
    text: `But here's what the pose itself tells us: when the sky turned black and the air became poison, these two didn't run in opposite directions. They reached for each other. One curled protectively around the other, face pressed against the other's body, arms wrapped tight. It's a gesture that doesn't need a label. Brothers do this. Friends do this. Lovers do this. Two people who refuse to let someone they care about die alone — that's what this is.`,
  },
  {
    text: `The hundred-year mistake became its own lesson — a story about how we see what we expect to see. Scholars in the 1800s looked at tenderness and assumed "women." It never crossed their minds that two men might hold each other this way. The misidentification says more about the people doing the interpreting than about the two figures in the ash.`,
  },
  {
    text: `Today, they're sometimes called "The Lovers of Pompeii," though no official name commits to that. Every generation reads the embrace through its own lens. But the image doesn't change. Two young men, barely past their teens, wrapped around each other on the last morning of their lives. Whatever you call it — brotherhood, friendship, love — the ash doesn't care. They held on. That's the whole story.`,
  },
];

// ── Validate constraints before pushing ──────────────────────────────
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
console.log(
  `Target: ~3000 chars (±20% = 2400-3600). ${totalChars >= 2400 && totalChars <= 3600 ? "✅ PASS" : "❌ FAIL"}`
);

// ── Push to DynamoDB ─────────────────────────────────────────────────
const now = Math.floor(Date.now() / 1000);

const subtitle = "An embrace that outlasted a volcano — and the century we spent getting it wrong";
const moralOrLesson = "Whatever form love takes, it's the last thing we reach for when everything else is gone — and the stories we tell about the dead say more about us than about them.";
const excerpt = "In 79 AD, Mount Vesuvius exploded and buried the Roman city of Pompeii under volcanic ash and superheated gas. Thousands died before they could take a single step.";

const command = new UpdateCommand({
  TableName: "Story",
  Key: {
    siteId: "pompeii",
    langStoryId: "en#lovers-of-pompeii",
  },
  UpdateExpression:
    "SET paragraphs = :p, subtitle = :s, moralOrLesson = :m, excerpt = :e, updatedAt = :u, readingTimeMinutes = :r",
  ExpressionAttributeValues: {
    ":p": paragraphs,
    ":s": subtitle,
    ":m": moralOrLesson,
    ":e": excerpt,
    ":u": now,
    ":r": 3,
  },
  ReturnValues: "ALL_NEW",
});

try {
  const result = await docClient.send(command);
  console.log("\n✅ Story updated successfully!");
  console.log(`   Updated at: ${new Date(now * 1000).toISOString()}`);
  console.log(`   Paragraphs: ${result.Attributes.paragraphs.length}`);
  console.log(`   Reading time: ${result.Attributes.readingTimeMinutes} min`);
  console.log(`   Title: ${result.Attributes.title}`);
  console.log(`   Subtitle: ${result.Attributes.subtitle}`);
  console.log(
    `   Fields preserved: title, icon, tier, storyCategory, coordinates, era, image, thumbnail, disabled, hasAudio, isFree, storyId, lang, siteId, characters, source`
  );
} catch (err) {
  console.error("❌ Update failed:", err);
  process.exit(1);
}
