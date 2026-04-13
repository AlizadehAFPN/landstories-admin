import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: `In 1092, Nizam al-Mulk was the most powerful man in the Islamic world. For thirty years, he\u2019d served as grand vizier \u2014 chief minister \u2014 of the Seljuq Empire, first under Sultan Alp Arslan, then his son Malik-Shah I. His domain stretched from China\u2019s borders to the Mediterranean. He built state-funded schools to counter a movement he saw as a threat: the Ismaili Muslims. He wrote a handbook on ruling still read today. And one man, in a mountain fortress called Alamut, decided he had to die.`,
  },
  {
    text: `That man was Hassan-i Sabbah, leader of the Nizari Ismailis and master of Alamut Castle. Hassan had a philosophy: it\u2019s better to kill one tyrant who oppresses millions than to send thousands of soldiers to die in open war. His tools were the fidai \u2014 \u201Cthe devoted ones\u201D \u2014 operatives who trained for years in combat, disguise, and courtly manners. They always used a dagger. They always struck in public. And they never tried to escape. The mission was a one-way trip, embraced as sacrifice.`,
  },
  {
    text: `October 14, 1092 \u2014 the holy month of Ramadan. The vizier\u2019s convoy was traveling from Isfahan to Baghdad, near the town of Nahavand. Nizam al-Mulk, now in his seventies, had just finished the evening meal that breaks the daily fast. A figure in tattered robes \u2014 a wandering holy man \u2014 shuffled toward him, calling out that he had a petition. The vizier was known for welcoming such visitors. He leaned forward. The man\u2019s name was Abu Tahir Arrani. He carried no petition. He carried a dagger.`,
  },
  {
    text: `One thrust, and the most powerful man in the empire collapsed. Abu Tahir tried to run but stumbled over a tent rope. The vizier\u2019s guards killed him on the spot \u2014 seconds after his target fell. He died exactly the way every fidai expected to die. The whole thing took less than a minute. But what came next would reshape the Middle East for over a century.`,
  },
  {
    text: `Thirty-five days later, Sultan Malik-Shah I was dead too \u2014 so suspiciously that many historians believe he was also assassinated. With vizier and sultan both gone, the Seljuq Empire collapsed into civil war among Malik-Shah\u2019s sons, each fighting for the throne. None could spare armies to attack the Ismaili fortresses in the mountains. This was exactly Hassan\u2019s calculation. Removing one man \u2014 possibly two \u2014 neutralized the greatest military threat to his people and bought decades of room to grow.`,
  },
  {
    text: `After the murder of Nizam al-Mulk, every ruler in the region understood: no wall of guards could protect you from someone willing to die. Sultan Sanjar \u2014 one of Malik-Shah\u2019s sons \u2014 learned this firsthand. He woke one morning to find a dagger stuck in the ground beside his bed, with a note from Hassan: if this blade had been in your chest instead of the earth, nothing could have saved you. Sanjar, the mightiest warrior of the Seljuq dynasty, never troubled the Ismailis again.`,
  },
  {
    text: `The blade that killed Nizam al-Mulk on the road to Baghdad didn\u2019t just end one man\u2019s life. It proved a principle that still echoes: the willingness to give up everything \u2014 comfort, safety, life itself \u2014 can bring the mightiest empire on earth to its knees.`,
  },
];

// --- Validation before push ---
let totalChars = 0;
for (let i = 0; i < paragraphs.length; i++) {
  const p = paragraphs[i];
  const chars = p.text.length;
  const words = p.text.split(/\s+/).length;
  totalChars += chars;
  console.log(`P${i + 1}: ${chars} chars, ${words} words`);
  if (chars > 500) {
    console.error(`  ERROR: P${i + 1} exceeds 500 chars (${chars})`);
    process.exit(1);
  }
  if (words > 100) {
    console.error(`  ERROR: P${i + 1} exceeds 100 words (${words})`);
    process.exit(1);
  }
}
console.log(`\nTotal: ${totalChars} chars, ${paragraphs.length} paragraphs`);

if (paragraphs.length < 6 || paragraphs.length > 10) {
  console.error(`ERROR: Paragraph count ${paragraphs.length} outside 6-10 range`);
  process.exit(1);
}

const result = await docClient.send(
  new UpdateCommand({
    TableName: "Story",
    Key: {
      siteId: "alamut-castle",
      langStoryId: "en#murder-of-nizam-al-mulk",
    },
    UpdateExpression:
      "SET paragraphs = :p, readingTimeMinutes = :r, updatedAt = :u",
    ExpressionAttributeValues: {
      ":p": paragraphs,
      ":r": 3,
      ":u": Math.floor(Date.now() / 1000),
    },
    ReturnValues: "ALL_NEW",
  })
);

console.log("\nUpdate successful!");
console.log("Title:", result.Attributes.title);
console.log("Paragraphs:", result.Attributes.paragraphs.length);
console.log("Reading time:", result.Attributes.readingTimeMinutes, "min");
console.log("Updated at:", result.Attributes.updatedAt);
