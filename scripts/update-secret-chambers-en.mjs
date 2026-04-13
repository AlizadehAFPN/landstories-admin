import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: `In 2017, a team of physicists pointed particle detectors at the Great Pyramid of Giza and found something nobody expected. Deep inside 6.1 million tons of limestone, roughly above a passage called the Grand Gallery, sat a massive void about 30 meters long. No tunnel led to it. No passage connected it to any known room. It had been sealed since Pharaoh Khufu's workers placed the final stone over 4,500 years ago. A secret room nobody was meant to find.`,
  },
  {
    text: `The way they found it sounds like science fiction. The team used something called muon tomography — they tracked tiny subatomic particles that rain down from space and pass through solid rock. Dense stone blocks more particles than open space does, so by mapping where particles slipped through easily, they built a kind of X-ray of the pyramid's insides. And right there, inside the most studied building on Earth, was an empty space the length of a commercial airplane.`,
  },
  {
    text: `This was the first major discovery inside the Great Pyramid in over a thousand years. The last one happened around 820 AD, when Caliph al-Ma'mun — the ruler of the Islamic empire based in Baghdad — ordered his men to hack a tunnel straight through the stone. They found the ascending passage and the King's Chamber. For twelve centuries after that, everyone assumed the pyramid's layout was fully mapped. The muon scan proved all of them spectacularly wrong.`,
  },
  {
    text: `The discovery set off a firestorm. Some experts called the void a "construction gap" — basically an air pocket left over from the building process, nothing special. But others pushed back hard. A 30-meter void sitting directly above the Grand Gallery doesn't happen by accident. Could it be an undiscovered burial chamber? A sealed vault of sacred texts? Maybe even the real resting place of Khufu himself — because here's the thing: his mummy has never actually been found.`,
  },
  {
    text: `Here's where it gets frustrating. We know the void is there, but we can't see inside it. Scientists have proposed sending tiny robots through micro-tunnels drilled into the stone, but the Egyptian government has pushed back. You don't just poke holes in the most important archaeological monument on the planet and hope for the best. So the void sits there — detected but untouched, a room we can sense but cannot enter.`,
  },
  {
    text: `Think about that for a second. We live in an age where satellites photograph every inch of Earth's surface. We've decoded ancient DNA and mapped the ocean floor. But right there, in one of the most visited places on the planet — a spot where millions of tourists snap selfies every year — there's a sealed space that has kept its secret for forty-five centuries. Nobody alive knows what's inside.`,
  },
  {
    text: `The Great Pyramid has outlasted tomb robbers, dynamite-wielding explorers, and the rise and fall of every empire since ancient Egypt. Whatever sits inside that hidden void — empty air, a forgotten king, or something nobody has imagined yet — it's been waiting for four and a half thousand years. It can wait a little longer.`,
  },
];

const excerpt = `In 2017, a team of physicists pointed particle detectors at the Great Pyramid of Giza and found something nobody expected. Deep inside 6.1 million tons of limestone sat a massive void about 30 meters long, sealed for over 4,500 years.`;

// Validate constraints before pushing
let totalChars = 0;
for (let i = 0; i < paragraphs.length; i++) {
  const p = paragraphs[i];
  const charCount = p.text.length;
  const wordCount = p.text.split(/\s+/).length;
  totalChars += charCount;
  console.log(`P${i + 1}: ${charCount} chars, ${wordCount} words`);
  if (charCount > 500) {
    console.error(`  ❌ EXCEEDS 500 char limit!`);
    process.exit(1);
  }
  if (wordCount > 100) {
    console.error(`  ❌ EXCEEDS 100 word limit!`);
    process.exit(1);
  }
}
console.log(`\nTotal: ${totalChars} chars, ${paragraphs.length} paragraphs`);
console.log(`Excerpt: ${excerpt.length} chars\n`);

// Push to DynamoDB — only updating paragraphs, excerpt, and updatedAt
const result = await docClient.send(
  new UpdateCommand({
    TableName: "Story",
    Key: {
      siteId: "great-pyramids-giza",
      langStoryId: "en#secret-chambers-void",
    },
    UpdateExpression:
      "SET paragraphs = :p, excerpt = :e, updatedAt = :u",
    ExpressionAttributeValues: {
      ":p": paragraphs,
      ":e": excerpt,
      ":u": Math.floor(Date.now() / 1000),
    },
    ReturnValues: "ALL_NEW",
  })
);

console.log("✅ Updated successfully!");
console.log(`Title: ${result.Attributes.title}`);
console.log(`Paragraphs: ${result.Attributes.paragraphs.length}`);
console.log(`Excerpt: ${result.Attributes.excerpt.substring(0, 80)}...`);
console.log(`Updated at: ${new Date(result.Attributes.updatedAt * 1000).toISOString()}`);
