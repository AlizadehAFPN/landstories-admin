import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: `The Abencerrajes were the most powerful family in the last Muslim kingdom in Europe. In fifteenth-century Granada \u2014 while the rest of Spain had already fallen to Christian armies \u2014 this clan of North African nobles pulled the strings behind every throne. They decided who became sultan and who got removed. They were kingmakers in the truest sense. And someone wanted them dead.`,
  },
  {
    text: `Their rivals, a clan called the Zegries, came up with a lie so simple it was almost elegant. They told the sultan that one of the Abencerraje knights was secretly sleeping with the sultana herself. It didn\u2019t matter whether it was true. In a court built on honor, the accusation alone was a death sentence. The sultan \u2014 consumed by jealousy and the terror that his most powerful nobles had humiliated him in the most intimate way possible \u2014 decided to wipe out the entire family in a single night.`,
  },
  {
    text: `He invited thirty-six of their finest knights to a feast inside the Alhambra palace. They came dressed in their best, because in Granada, a sultan\u2019s invitation was the highest honor a noble family could receive. They walked through the Court of the Lions, past twelve stone lions holding up a marble fountain, through channels of water designed to mirror the four rivers of paradise. They had no idea they were walking toward their own deaths.`,
  },
  {
    text: `One by one, the knights were led into a hall and beheaded over a marble fountain basin at the center of the floor. The water carried the blood away, so each new guest would see nothing, suspect nothing \u2014 until the blade found his neck. One by one, the noblest family in Granada walked into the most beautiful room in the palace and never walked out. That room still carries their name: the Hall of the Abencerrajes.`,
  },
  {
    text: `Above where they died hangs one of the greatest works of Islamic art ever created \u2014 five thousand honeycomb cells rising in an eight-pointed star, light from sixteen windows making the ceiling seem alive. It was built to look like heaven. Below it, in the marble fountain, a reddish stain has never washed away. Scientists call it iron oxide. But for five hundred years, visitors have heard the same story: that\u2019s the blood of the thirty-six, soaked so deep no water will ever clean it.`,
  },
  {
    text: `The sultan had destroyed the one family that held his kingdom together. Without the Abencerrajes, Granada tore itself apart in civil wars \u2014 exactly the weakness that Ferdinand and Isabella\u2019s armies needed to finish off the last foothold of Muslim rule in Spain. An old Spanish ballad laid the blame plain: \u201CYou killed the Abencerrajes, who were the flower of Granada.\u201D Within a generation, the kingdom was gone forever.`,
  },
  {
    text: `Today, millions walk into that hall every year. They look up at the ceiling \u2014 the most intricate thing human hands have ever carved. They look down at the stain in the fountain. And they feel the thing that makes the Alhambra unlike any other palace on earth. Beauty above. Blood below. The highest expression of civilization, hovering directly over the spot where that same civilization destroyed itself.`,
  },
];

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
console.log(`Target: ~3000 chars (±20% = 2400-3600)\n`);

if (totalChars < 2400 || totalChars > 3600) {
  console.error("Total character count out of range! Aborting.");
  process.exit(1);
}

const now = Math.floor(Date.now() / 1000);

const result = await doc.send(
  new UpdateCommand({
    TableName: "Story",
    Key: {
      siteId: "alhambra",
      langStoryId: "en#massacre-of-the-abencerrajes",
    },
    UpdateExpression:
      "SET paragraphs = :p, readingTimeMinutes = :r, updatedAt = :u",
    ExpressionAttributeValues: {
      ":p": paragraphs,
      ":r": 3,
      ":u": now,
    },
    ReturnValues: "ALL_NEW",
  })
);

console.log("✅ Story updated successfully!");
console.log(`   siteId: ${result.Attributes.siteId}`);
console.log(`   langStoryId: ${result.Attributes.langStoryId}`);
console.log(`   title: ${result.Attributes.title}`);
console.log(`   paragraphs: ${result.Attributes.paragraphs.length}`);
console.log(`   readingTimeMinutes: ${result.Attributes.readingTimeMinutes}`);
console.log(`   updatedAt: ${result.Attributes.updatedAt}`);
