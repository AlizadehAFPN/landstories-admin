// Update English paragraphs for "The Queen Who Defied Rome" (Zenobia)
// Only updates: paragraphs, readingTimeMinutes, updatedAt
// Does NOT touch any other fields or other language versions.

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

const paragraphs = [
  {
    text: `In 267 AD, at a banquet in the Syrian city of Emesa, the most powerful man in the Roman East was murdered. Septimius Odaenathus \u2014 warrior-king, Rome\u2019s strongman in the desert \u2014 was killed alongside his eldest son, struck down by his own nephew over what sources call a petty grudge. But the real story walked out of the bloodbath alive. His second wife. Her name was Zenobia, and she was about to become the most dangerous woman in the ancient world.`,
  },
  {
    text: `Every ancient source describes her like she wasn\u2019t supposed to exist. She spoke four languages. She studied philosophy under one of the greatest thinkers of her time. She rode on horseback at the head of her armies, marched miles on foot with her soldiers, and could outdrink Persian kings at the table. She claimed to be a descendant of Cleopatra. With her husband dead and her infant son technically on the throne, Zenobia wasn\u2019t just ruling on his behalf \u2014 she was running the show.`,
  },
  {
    text: `Then she did something nobody saw coming. In 270 AD, Zenobia sent seventy thousand soldiers south into Egypt \u2014 the province whose grain fed the city of Rome itself. She crushed the Roman forces and seized the richest land in the ancient world. At the same time, her armies swept north through Syria and deep into modern-day Turkey. At its peak, her empire covered roughly a third of Rome\u2019s territory. She put her own face on coins and dropped the Roman emperor\u2019s entirely. That wasn\u2019t ambition. That was a declaration of war.`,
  },
  {
    text: `Rome sent its best. Emperor Aurelian \u2014 a brutal, brilliant soldier who\u2019d already stitched the western half of the empire back together \u2014 marched east in 272 AD. Zenobia sent back one of history\u2019s greatest rejection letters: \u201CYou demand my surrender as though you were not aware that Cleopatra preferred to die a queen rather than remain alive.\u201D Aurelian wasn\u2019t moved. He lured her armored cavalry into chasing his lighter horsemen under the Syrian sun until the heat did what his swords couldn\u2019t. Her army shattered. Zenobia fled toward Palmyra.`,
  },
  {
    text: `Aurelian surrounded Palmyra and waited. Inside the walls, food ran out. The Persian reinforcements Zenobia had promised never came. When she knew it was over, she slipped out at night on a racing camel \u2014 the fastest animal in the desert \u2014 heading for the Euphrates River and the safety of Persia beyond it. Roman cavalry caught her at the riverbank, boarding a boat, within sight of freedom. She was captured with one foot in the water and the other in history.`,
  },
  {
    text: `What happened next depends on who you believe. One Roman source says she was paraded through Rome in golden chains so heavy with jewels that servants had to help her carry them \u2014 then given a villa where she lived quietly as a senator\u2019s wife. Another says she starved herself on the journey, choosing to die like the Cleopatra she\u2019d always claimed as her ancestor. The Arabic tradition gives her the best exit: she bit down on poison hidden in a ring and said, \u201CBy my own hand \u2014 not by the hand of my enemy.\u201D`,
  },
  {
    text: `When Roman senators mocked Aurelian for wasting his legions on a woman, he shot back: \u201CThose who fault me would praise me, did they know what manner of woman she is.\u201D Even the man who destroyed her couldn\u2019t talk about her without respect. Today her statue stands in Damascus. Her face appears on Syrian currency. And the ruins of Palmyra \u2014 her desert capital, battered by centuries and wars \u2014 still rise from the sand like the bones of something that refused to kneel.`,
  },
];

async function main() {
  const params = {
    TableName: TABLE,
    Key: {
      siteId: "palmyra",
      langStoryId: "en#zenobia-queen-who-defied-rome",
    },
    UpdateExpression:
      "SET paragraphs = :p, readingTimeMinutes = :r, updatedAt = :u",
    ExpressionAttributeValues: {
      ":p": paragraphs,
      ":r": 3,
      ":u": now,
    },
    ReturnValues: "ALL_NEW",
  };

  const result = await doc.send(new UpdateCommand(params));
  console.log("Updated successfully.");
  console.log("Paragraph count:", result.Attributes.paragraphs.length);
  console.log(
    "Total characters:",
    result.Attributes.paragraphs.reduce((sum, p) => sum + p.text.length, 0)
  );
  console.log("Reading time:", result.Attributes.readingTimeMinutes, "min");

  // Print each paragraph with its character & word count for verification
  result.Attributes.paragraphs.forEach((p, i) => {
    const words = p.text.split(/\s+/).length;
    console.log(`\n--- P${i + 1} (${p.text.length} chars, ${words} words) ---`);
    console.log(p.text);
  });
}

main().catch((err) => {
  console.error("Update failed:", err);
  process.exit(1);
});
