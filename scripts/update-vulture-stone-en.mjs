import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: `Twelve thousand years ago, in what's now southeastern Turkey, someone carved a message into stone. Not words — pictures. A vulture gripping a round disc. A headless human body. A scorpion. Strange symbols that no one alive can fully explain. This is Pillar 43 at Göbekli Tepe, and people call it the Vulture Stone. For most of history, we had no idea what it meant. We might now.`,
  },
  {
    text: `Göbekli Tepe is already one of the most jaw-dropping places on Earth. It's a massive stone temple complex built around 9600 BC — roughly 6,000 years before Stonehenge and 7,000 years before the Egyptian pyramids. And it was built by hunter-gatherers. People who, according to everything we thought we knew, shouldn't have been able to build anything like this. The Vulture Stone sits among its pillars as the most mysterious carving of all.`,
  },
  {
    text: `For years, most experts figured the carvings showed some kind of death ritual. Some ancient cultures left their dead out in the open for vultures to pick clean — a practice still found in parts of Tibet today called sky burial. The vulture, the headless body, the circling animals — it all seemed to fit. A scene about death and whatever comes after, carved by people who clearly spent a lot of time thinking about it.`,
  },
  {
    text: `Then in 2017, two researchers at the University of Edinburgh flipped everything. Martin Sweatman and Dimitrios Tsikritsis ran the carvings through computer models of ancient star positions and realized something wild: each animal on the stone lines up with a real constellation. The vulture matches Sagittarius. The scorpion matches Scorpius. That round disc the vulture holds? That's the sun.`,
  },
  {
    text: `Put it all together and the Vulture Stone becomes a snapshot of the night sky at a very specific moment — around 10,950 BC. That date is loaded. It lines up with what scientists call the Younger Dryas impact, when a comet or its fragments likely slammed into Earth and kicked off a brutal cold spell lasting over a thousand years. Temperatures crashed, ecosystems collapsed, and entire ways of life vanished.`,
  },
  {
    text: `Stop and think about what that means. Twelve thousand years ago, people we've always written off as "primitive" were watching the stars closely enough to track a cosmic disaster — and then carved a permanent record of it into stone. They weren't just surviving day to day. They were observing, calculating, documenting. They were trying to make sure no one forgot what happened.`,
  },
  {
    text: `And that headless figure at the center? It might be their way of saying: this killed people. The whole pillar starts to look less like decoration and more like a warning carved in stone by the very people who lived through it. We spent centuries assuming our ancestors were simple. The Vulture Stone says otherwise. Sometimes the oldest message in the room is the one we should've been reading all along.`,
  },
];

const excerpt = paragraphs[0].text;

const moralOrLesson =
  "We keep underestimating our ancestors — the people who built the first temples may have understood the universe better than we ever imagined.";

const now = Math.floor(Date.now() / 1000);

const command = new UpdateCommand({
  TableName: "Story",
  Key: {
    siteId: "gobeklitepe",
    langStoryId: "en#vulture-stone",
  },
  UpdateExpression:
    "SET paragraphs = :p, excerpt = :e, moralOrLesson = :m, updatedAt = :u",
  ExpressionAttributeValues: {
    ":p": paragraphs,
    ":e": excerpt,
    ":m": moralOrLesson,
    ":u": now,
  },
  ReturnValues: "ALL_NEW",
});

try {
  const result = await docClient.send(command);
  console.log("✅ Story updated successfully!");
  console.log("Updated fields:");
  console.log("  - paragraphs:", result.Attributes.paragraphs.length, "paragraphs");
  console.log("  - excerpt: (first 80 chars)", result.Attributes.excerpt.substring(0, 80) + "...");
  console.log("  - moralOrLesson:", result.Attributes.moralOrLesson);
  console.log("  - updatedAt:", new Date(result.Attributes.updatedAt * 1000).toISOString());
  console.log("\nFull paragraphs:");
  result.Attributes.paragraphs.forEach((p, i) => {
    console.log(`\n  [${i + 1}] (${p.text.length} chars, ${p.text.split(/\s+/).length} words)`);
    console.log(`  ${p.text}`);
  });
} catch (err) {
  console.error("❌ Error updating story:", err.message);
  process.exit(1);
}
