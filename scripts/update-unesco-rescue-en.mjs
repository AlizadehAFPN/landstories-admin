import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: `In 1960, Egypt faced an impossible choice. President Gamal Abdel Nasser was building the Aswan High Dam — a massive project to tame the Nile's floods and power the country's future. But the dam would create Lake Nasser, one of the biggest man-made lakes on Earth, drowning a 500-kilometer stretch of the Nile Valley. Dozens of ancient temples would vanish — including Abu Simbel, twin temples that Ramesses the Great carved into a cliff over 3,200 years ago.`,
  },
  {
    text: `UNESCO did something nobody had ever tried. They asked the entire world for help — save these temples, or watch them disappear forever. And the world actually showed up. Fifty countries, including nations that couldn't agree on anything else during the Cold War, sent money, engineers, and equipment. Sweden, a country with zero ties to Egypt, became one of the biggest donors. The price tag: around $40 million — roughly $360 million today. It was the most expensive archaeological rescue ever.`,
  },
  {
    text: `Here's what made it borderline insane. Abu Simbel wasn't a building you could pick up and move. The temples were carved directly into a sandstone cliff. So a Swedish firm called VBB came up with a wild plan: cut the entire complex into 1,036 separate blocks, each weighing 20 to 30 tons, then haul every piece 65 meters uphill and 200 meters inland. After that, reassemble everything on an artificial hill built to look exactly like the original cliff.`,
  },
  {
    text: `Work started in 1964, with the lake already creeping toward the temples. Workers threw up a temporary dam to hold back the water and bought themselves just enough time. And here's the part that gets me: they couldn't use power tools. The vibrations would have cracked the ancient sandstone. So every cut was made by hand, with millimeter precision. Each block was numbered, lifted by crane, and set in its exact original spot — the highest-stakes jigsaw puzzle ever assembled.`,
  },
  {
    text: `Inside the new hill, engineers built one of the largest concrete domes in the world to protect the stone from the humidity Lake Nasser brought to the desert. Then they shaped the surrounding landscape to match the original terrain so closely that someone walking toward Abu Simbel would see almost exactly what the subjects of Ramesses had seen more than three thousand years before.`,
  },
  {
    text: `On September 22, 1968, the rebuilt Abu Simbel was officially opened. The engineers had pulled off one final miracle. Twice a year, sunlight reaches deep into the inner temple and lights up the statues of the gods — a precision trick the original builders designed 32 centuries ago. At the new location, that solar alignment was preserved to within a single day of the original dates. Visitors who had seen Abu Simbel before the move said they couldn't tell the difference.`,
  },
  {
    text: `But the biggest thing Abu Simbel gave the world wasn't the temples. It was proof — proof that people from every corner of the planet could set aside their differences to save something that belonged to all of them. That effort led directly to the UNESCO World Heritage Convention of 1972, now protecting over 1,100 sites worldwide. Every protected place, from Machu Picchu to the Great Wall, exists because fifty nations once proved that some things are worth moving mountains for.`,
  },
];

const excerpt =
  "In 1960, Egypt faced an impossible choice. President Gamal Abdel Nasser was building the Aswan High Dam — a massive project to tame the Nile's floods and power the country's future. But the dam would create Lake Nasser, one of the biggest man-made lakes on Earth, drowning a 500-kilometer stretch of the Nile Valley.";

// ── Validation ──────────────────────────────────────────────
console.log("=== Pre-push validation ===\n");
let totalChars = 0;
for (let i = 0; i < paragraphs.length; i++) {
  const t = paragraphs[i].text;
  const chars = t.length;
  const words = t.split(/\s+/).length;
  totalChars += chars;
  const ok = chars <= 500 && words <= 100;
  console.log(
    `P${i + 1}: ${chars} chars, ${words} words ${ok ? "✅" : "❌ OVER LIMIT"}`
  );
  if (!ok) {
    console.error(`\n❌ Paragraph ${i + 1} exceeds limits. Aborting.`);
    process.exit(1);
  }
}
console.log(`\nTotal: ${totalChars} chars across ${paragraphs.length} paragraphs`);
console.log(
  totalChars >= 2400 && totalChars <= 3600
    ? "Total length ✅ (within ±20% of 3000)"
    : `Total length ❌ (${totalChars} outside 2400-3600 range)`
);

// ── Push to DynamoDB ────────────────────────────────────────
const cmd = new UpdateCommand({
  TableName: "Story",
  Key: {
    siteId: "abu-simbel",
    langStoryId: "en#unesco-rescue-moving-mountains",
  },
  UpdateExpression:
    "SET paragraphs = :p, excerpt = :e, updatedAt = :u",
  ExpressionAttributeValues: {
    ":p": paragraphs,
    ":e": excerpt,
    ":u": Math.floor(Date.now() / 1000),
  },
  ReturnValues: "ALL_NEW",
});

try {
  const result = await doc.send(cmd);
  console.log("\n✅ DynamoDB updated successfully.");
  console.log(`   Title: ${result.Attributes.title}`);
  console.log(`   Paragraphs: ${result.Attributes.paragraphs.length}`);
  console.log(`   Excerpt length: ${result.Attributes.excerpt.length} chars`);
  console.log(`   updatedAt: ${result.Attributes.updatedAt}`);
} catch (err) {
  console.error("\n❌ DynamoDB update failed:", err.message);
  process.exit(1);
}
