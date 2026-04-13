// Update English version of "The Gardens That Vanished" (hanging-gardens)
// Only updates: paragraphs, readingTimeMinutes, updatedAt

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: `Of the Seven Wonders of the Ancient World, six have been accounted for. The Great Pyramid still stands. The ruins of the others have all been found. But the Hanging Gardens of Babylon \u2014 the only Wonder supposedly built not for a god or for glory, but for love \u2014 have never been found at all. No foundation. No root. Not a single brick. They are the most famous garden in human history, and they may never have existed.`,
  },
  {
    text: `The story goes like this. Around 600 BCE, Nebuchadnezzar II \u2014 the most powerful king on Earth \u2014 married Amytis, a princess from the mountains of Media, now Iran. She\u2019d grown up among cool streams and valleys that blazed green after the rains. Then she moved to Babylon \u2014 flat, brown, fifty-degree summers, nothing but date palms and canals. She was homesick. So her husband, a man who\u2019d conquered nations and burned Jerusalem\u2019s Temple, set out to fix it. He would build her a mountain.`,
  },
  {
    text: `Ancient writers went wild describing it. Writing centuries later, the historian Diodorus said the gardens were 120 meters on each side, rising in terraces twenty meters high. Each level was waterproofed with reeds, brick, and lead, then packed with enough soil for full-grown trees. Water was pumped from the Euphrates to the top using some kind of screw device, then cascaded down through channels. One writer called it \u2018an eternal spring, suspended above the heads of those who walked below.\u2019`,
  },
  {
    text: `Here\u2019s the problem: none of it checks out. Nebuchadnezzar left hundreds of inscriptions about his building projects \u2014 walls, gates, temples, palaces. He never mentioned a garden. Not once. The historian Herodotus visited Babylon a century later and described the city in detail. No gardens. The earliest account came 300 years after his death. Archaeologists spent eighteen years digging up Babylon from 1899 and found nothing. The most famous garden in history left zero physical trace.`,
  },
  {
    text: `In 2013, Oxford scholar Stephanie Dalley dropped a bombshell. The gardens were real \u2014 just not in Babylon. They were in Nineveh, 450 kilometers north, built by the Assyrian king Sennacherib a century earlier. His inscriptions describe terraced gardens fed by bronze water-screws and an 80-km aqueduct from the mountains. A relief from his palace, now in the British Museum, shows gardens on columns matching ancient descriptions perfectly. Ancient writers, Dalley argued, just mixed up the cities.`,
  },
  {
    text: `Even the name is misleading. \u2018Hanging\u2019 comes from the Greek word kremastos, which doesn\u2019t mean dangling from chains \u2014 it means overhanging, like one terrace spilling over the next. Picture a stepped hillside of trees and flowers, each level pouring greenery over the edge of the one below, all rising from flat desert like something that shouldn\u2019t exist. Not a garden in the sky. A forest pretending to be a mountain.`,
  },
  {
    text: `The debate may never be settled. Maybe the gardens were in Babylon, buried under the water table where no one can dig. Maybe Nineveh. Maybe they were stitched together from travelers\u2019 tales and never existed as one place. But here\u2019s what hasn\u2019t faded in twenty-six centuries: the story of a king who looked at the most powerful city on Earth and thought, she\u2019s unhappy \u2014 and then tried to raise a mountain to fix it. The gardens vanished. The love story didn\u2019t. That might be the real wonder.`,
  },
];

const result = await doc.send(
  new UpdateCommand({
    TableName: "Story",
    Key: {
      siteId: "babylon",
      langStoryId: "en#hanging-gardens",
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

console.log("✓ Update successful");
console.log("  siteId:", result.Attributes.siteId);
console.log("  langStoryId:", result.Attributes.langStoryId);
console.log("  title:", result.Attributes.title);
console.log("  paragraphs:", result.Attributes.paragraphs.length);
console.log("  readingTimeMinutes:", result.Attributes.readingTimeMinutes);
console.log("  updatedAt:", result.Attributes.updatedAt);

// Verify paragraph constraints
console.log("\n--- Paragraph checks ---");
for (let i = 0; i < paragraphs.length; i++) {
  const t = paragraphs[i].text;
  const chars = t.length;
  const words = t.split(/\s+/).length;
  const ok = chars <= 500 && words <= 100 ? "✓" : "✗";
  console.log(`  P${i + 1}: ${chars} chars, ${words} words ${ok}`);
}
const totalChars = paragraphs.reduce((sum, p) => sum + p.text.length, 0);
console.log(`  Total: ${totalChars} chars, ${paragraphs.length} paragraphs`);
