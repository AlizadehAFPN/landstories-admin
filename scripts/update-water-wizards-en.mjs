import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: `Petra gets less rain than parts of the Sahara — barely 150 millimeters a year. Two thousand years ago, the Nabataeans built a city of thirty thousand people here with fountains, pools, and gardens. Not beside a river. Not on a lake. In one of the driest deserts on earth. They didn't find water — they engineered it, with technology so advanced that modern scientists found they'd cracked fluid dynamics centuries before the Western world had a name for it.`,
  },
  {
    text: `Their first edge wasn't pipes — it was secrecy. In 312 BC, a Greek army came to steal their wealth. The raid worked, but the Nabataeans chased them down and destroyed them. When a bigger force arrived, the Nabataeans vanished into the desert. The Greeks, dying of thirst, begged for peace and left. The secret? Hidden water tanks buried across the wasteland, sealed and disguised so well that only they could find them. The desert wasn't their weakness. It was their fortress.`,
  },
  {
    text: `Petra's lifeline was Ain Musa — the Spring of Moses — seven kilometers away. They piped it through the Siq, the kilometer-long canyon that was the city's only entrance, using twin systems: a stone channel on one cliff wall and terracotta pipes with precision joints on the other. At the canyon mouth, a dam and tunnel diverted flash floods around the city. In 1963, one such flood killed twenty-two tourists in the Siq — proof the Nabataeans solved this problem two thousand years before.`,
  },
  {
    text: `But survival wasn't enough — they wanted to show off. In 1998, archaeologist Leigh-Ann Bedal started digging a spot that old maps labeled 'the Lower Market.' It wasn't a market. It was a paradise garden with a pool forty-three meters long and an island pavilion you could only reach by swimming. A lake with an island — in the desert. Any Roman official would have understood the message: if these people can build this here, don't even think about challenging them.`,
  },
  {
    text: `A public fountain called the Nymphaeum stood at the city center, serving thirty thousand residents. In 2025, researcher Niklas Jungmann of Humboldt University found something in the mountains: a 116-meter pressurized lead pipeline that worked as an inverted siphon — pushing water uphill before letting it flow down the other side. Engineers thought this only existed inside Roman buildings. The Nabataeans ran it across open wilderness two thousand years earlier.`,
  },
  {
    text: `When Rome took over Petra in AD 106, the conquerors did something almost unheard of: they kept the Nabataean water system instead of replacing it with their own. Rome was famous for stamping its engineering on every territory it conquered. But at Petra, they looked at what was already there and essentially admitted — we can't do better. For two more centuries, the Nabataean pipes kept flowing.`,
  },
  {
    text: `Then on May 19, AD 363, a massive earthquake hit. Pipelines shattered. Channels collapsed. Five centuries of engineering crippled in minutes. It could have been rebuilt — but the world had moved on. Trade routes had shifted to the sea. The caravans that made Petra rich stopped coming. Without money or people, no one fixed the system. Without water, Petra died. The pools filled with sand, the pipes crumbled, and the desert took back what the Nabataeans had stolen from it.`,
  },
  {
    text: `Today, flash floods still tear through the Siq — in 2022, six months of rain fell in a single day and 1,700 tourists had to be evacuated. The ancient dams stand in ruins now, silent proof of a people who understood something most civilizations learn too late: water isn't just something you drink. It's power. It's secrecy. It's the difference between a kingdom and a ruin.`,
  },
];

// ── Validation ──────────────────────────────────────────────────────────
let totalChars = 0;
let valid = true;

for (let i = 0; i < paragraphs.length; i++) {
  const t = paragraphs[i].text;
  const chars = t.length;
  const words = t.split(/\s+/).length;
  totalChars += chars;

  console.log(`P${i + 1}: ${chars} chars, ${words} words`);

  if (chars > 500) {
    console.warn(`  ⚠️  P${i + 1} exceeds 500 char limit (${chars})`);
    valid = false;
  }
  if (words > 100) {
    console.warn(`  ⚠️  P${i + 1} exceeds 100 word limit (${words})`);
    valid = false;
  }
}

console.log(`\nTotal: ${totalChars} chars across ${paragraphs.length} paragraphs`);
console.log(`Target: ~3000 chars (±20% = 2400–3600)`);

if (totalChars < 2400 || totalChars > 3600) {
  console.warn(`⚠️  Total chars (${totalChars}) outside ±20% range`);
  valid = false;
}

if (paragraphs.length < 6 || paragraphs.length > 10) {
  console.warn(`⚠️  Paragraph count (${paragraphs.length}) outside 6-10 range`);
  valid = false;
}

if (!valid) {
  console.error("\n❌ Validation failed. Aborting.");
  process.exit(1);
}

console.log("\n✅ All checks passed. Pushing to DynamoDB...\n");

// ── Push ────────────────────────────────────────────────────────────────
const newExcerpt =
  "Petra gets less rain than parts of the Sahara. And yet two thousand years ago, the Nabataeans built a city of thirty thousand people here — with fountains, swimming pools, and gardens. They didn't find water — they engineered it.";

const now = Math.floor(Date.now() / 1000);

const result = await doc.send(
  new UpdateCommand({
    TableName: "Story",
    Key: {
      siteId: "petra",
      langStoryId: "en#nabataean-water-wizards",
    },
    UpdateExpression:
      "SET paragraphs = :p, excerpt = :e, readingTimeMinutes = :r, updatedAt = :u",
    ExpressionAttributeValues: {
      ":p": paragraphs,
      ":e": newExcerpt,
      ":r": 4,
      ":u": now,
    },
    ReturnValues: "ALL_NEW",
  })
);

console.log("✅ Successfully updated 'en#nabataean-water-wizards'");
console.log(`   Updated at: ${new Date(now * 1000).toISOString()}`);
console.log(`   Paragraphs: ${result.Attributes.paragraphs.length}`);
console.log(`   Reading time: ${result.Attributes.readingTimeMinutes} min`);
console.log(`   Excerpt: "${result.Attributes.excerpt.substring(0, 80)}..."`);
