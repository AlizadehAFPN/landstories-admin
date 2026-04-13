import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: `In 32 AD \u2014 the same decade Jesus was crucified outside Jerusalem \u2014 priests in the Syrian desert city of Palmyra finished the most ambitious temple their world had ever seen. They dedicated it to Bel, the Lord of the Universe, a supreme god who borrowed from the Babylonian Marduk and the Greek Zeus but was something entirely his own. He didn\u2019t rule alone. The sun god stood at his right, the moon god at his left. Together, the three of them owned the sky.`,
  },
  {
    text: `From the outside, it looked like a classic Greek temple \u2014 tall golden columns, the works. But walk through the door and every rule broke. The entrance was on the wrong side. The ceiling was flat. Windows flooded the space with light, which almost no ancient temple allowed. And above the main shrine, a massive stone slab had been carved with one of the earliest zodiac ceilings ever made. The whole building was Palmyra in stone \u2014 a city standing between East and West that refused to choose a side.`,
  },
  {
    text: `This wasn\u2019t a place you just prayed in \u2014 you feasted here. The temple\u2019s massive courtyard was lined with dining halls where hundreds gathered for sacred meals. They ate sacrificed lamb, goat, even camel. They passed wine around the table and burned incense while priests presided. Rich citizens funded these banquets and carved their names into the walls so nobody would forget. Thousands of tiny clay tokens \u2014 basically admission tickets \u2014 have been found across the ruins. Each one was once held by someone walking toward the smell of roasting meat, about to sit down at a table with their gods.`,
  },
  {
    text: `The temple survived everything history threw at it. When Rome turned Christian and banned pagan worship, they converted it into a church \u2014 and that saved it. When Arab armies conquered Syria in the 600s, they turned the church into a mosque \u2014 and that saved it again. A whole village eventually grew up inside its ancient walls. By the early 2000s, it was one of the best-preserved ancient temples on Earth. UNESCO named it the most important monument at Palmyra. It had outlasted the Roman Empire, the Crusades, the Mongol invasions, and two World Wars.`,
  },
  {
    text: `On August 30, 2015 \u2014 twelve days after ISIS beheaded Khaled al-Asaad, the 83-year-old archaeologist who\u2019d spent fifty years as the temple\u2019s guardian \u2014 fighters packed the building with explosives and detonated them. Satellite images confirmed what the world feared: the inner temple was obliterated. The zodiac ceiling, carved when the Roman emperor Tiberius was still alive, was dust. The columns, the carvings, the stone reliefs of gods \u2014 all of it, gone. One thing survived: the main doorway, standing alone in the rubble, framing nothing but empty sky.`,
  },
  {
    text: `That doorway became one of the defining images of our century \u2014 an entrance with nothing behind it. A threshold between the world that had the Temple of Bel and the world that doesn\u2019t. The banquet tokens sit in museums now. The portraits of the dead stare from glass cases in Paris and London. But the place where it all came together \u2014 where priests burned incense, merchants feasted with their gods, and East met West in every column \u2014 is a field of rubble in the Syrian desert. It survived two thousand years of history. It couldn\u2019t survive one afternoon of men who were afraid of what it meant.`,
  },
];

// Validate constraints before pushing
let totalChars = 0;
for (let i = 0; i < paragraphs.length; i++) {
  const text = paragraphs[i].text;
  const charCount = text.length;
  const wordCount = text.split(/\s+/).length;
  totalChars += charCount;
  console.log(`P${i + 1}: ${charCount} chars, ${wordCount} words`);
  if (charCount > 600) {
    console.error(`  ⚠ WARNING: Paragraph ${i + 1} exceeds 600 chars (500 + 20% tolerance)`);
  }
  if (wordCount > 120) {
    console.error(`  ⚠ WARNING: Paragraph ${i + 1} exceeds 120 words (100 + 20% tolerance)`);
  }
}
console.log(`\nTotal: ${totalChars} chars, ${paragraphs.length} paragraphs`);
console.log(`Target: ~3000 chars (±20% = 2400-3600), 6-8 paragraphs\n`);

if (totalChars < 2400 || totalChars > 3600) {
  console.error(`⚠ Total character count ${totalChars} is outside acceptable range.`);
  process.exit(1);
}

// Update only the paragraphs and readingTimeMinutes — nothing else
const result = await docClient.send(
  new UpdateCommand({
    TableName: "Story",
    Key: {
      siteId: "palmyra",
      langStoryId: "en#temple-of-bel",
    },
    UpdateExpression: "SET #p = :paragraphs, #r = :readingTime, #u = :updatedAt",
    ExpressionAttributeNames: {
      "#p": "paragraphs",
      "#r": "readingTimeMinutes",
      "#u": "updatedAt",
    },
    ExpressionAttributeValues: {
      ":paragraphs": paragraphs,
      ":readingTime": 3,
      ":updatedAt": Math.floor(Date.now() / 1000),
    },
    ReturnValues: "ALL_NEW",
  })
);

console.log("✅ Story updated successfully!");
console.log(`Updated paragraphs: ${result.Attributes.paragraphs.length}`);
console.log(`Reading time: ${result.Attributes.readingTimeMinutes} min`);
console.log(`Updated at: ${new Date(result.Attributes.updatedAt * 1000).toISOString()}`);
