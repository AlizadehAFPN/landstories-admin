import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: `Around 1755 BCE, a king in Babylon did something no ruler had done before. Hammurabi took 282 laws \u2014 rules about murder, theft, divorce, even shoddy construction \u2014 and carved them into a seven-foot pillar of black stone so hard it was nearly impossible to work. Then he placed it in a temple for anyone to see. The message was radical: the law isn\u2019t a secret. It belongs to everyone.`,
  },
  {
    text: `Carved at the top is a scene that tells you everything. Hammurabi stands before Shamash, the Babylonian sun god \u2014 the one who saw all things and let no lie go unpunished. Shamash hands him a rod and a ring, ancient symbols of divine authority. The meaning is clear: these aren\u2019t just one king\u2019s opinions. They carry the weight of heaven. Below that image, forty-nine columns of wedge-shaped script lay out rules for nearly every corner of daily life.`,
  },
  {
    text: `Hammurabi wasn\u2019t a philosopher. He was a conqueror. When he took the throne around 1792 BCE, Babylon was a small kingdom surrounded by rivals. Over thirty years, he crushed them all \u2014 including Mari, a wealthy trading city on the Euphrates whose destruction shocked the ancient world. His surviving letters show a king who personally settled irrigation disputes and tracked down corrupt officials. The code was this control freak\u2019s masterpiece.`,
  },
  {
    text: `The most famous law is number 196: destroy a free man\u2019s eye, and yours gets destroyed. An eye for an eye \u2014 a principle that echoes through the Bible, the Quran, and into every courtroom on earth. But here\u2019s what people forget: justice in Babylon depended on your class. Blind a wealthy citizen, lose your eye. Blind a commoner, pay a fine. Blind a slave, just pay the owner. The law was written for everyone to see. It wasn\u2019t written to treat everyone the same.`,
  },
  {
    text: `Some laws were shockingly modern. If a builder\u2019s shoddy work caused a house to collapse and kill the owner, the builder was executed. If your husband was captured in war, you could remarry \u2014 and if he came back, you chose which husband to keep. A wife who proved her husband was constantly humiliating her could take her money and leave. Four thousand years ago, women in Babylon had legal protection against emotional abuse.`,
  },
  {
    text: `The pillar survived six centuries in its temple. Then, around 1158 BCE, a king named Shutruk-Nahhunte invaded from what is now southwestern Iran, looted the city of Sippar, and hauled the stone home as a war trophy. He started chiseling off Hammurabi\u2019s name to carve his own \u2014 but never finished. The pillar sat buried for over three thousand years, forgotten by every civilization that rose and fell above it.`,
  },
  {
    text: `In December 1901, a French archaeologist named Jacques de Morgan dug it up in what is now Shush, Iran. The discovery was a bombshell. When a scholar named Jean-Vincent Scheil translated the text the following year, the parallels to biblical law \u2014 especially the Book of Exodus \u2014 were impossible to ignore. Scholars who believed the laws of Moses were entirely original had to reckon with a Babylonian king who\u2019d written strikingly similar rules over a thousand years earlier.`,
  },
  {
    text: `Today the pillar stands in the Louvre in Paris, still pointing toward the sky. Its laws aren\u2019t fair by modern standards \u2014 they favored the rich and allowed cruelties we wouldn\u2019t accept. But Hammurabi gave the world an idea that outlasted every empire: the law exists before the crime, punishment should fit the offense, and even a king answers to something bigger than himself. He carved that idea into the hardest stone he could find. Four thousand years later, we still haven\u2019t improved on it.`,
  },
];

async function main() {
  const result = await doc.send(
    new UpdateCommand({
      TableName: "Story",
      Key: {
        siteId: "babylon",
        langStoryId: "en#code-of-hammurabi",
      },
      UpdateExpression: "SET paragraphs = :p, updatedAt = :u",
      ExpressionAttributeValues: {
        ":p": paragraphs,
        ":u": Math.floor(Date.now() / 1000),
      },
      ReturnValues: "ALL_NEW",
    })
  );

  console.log("Update successful!");
  console.log(`Paragraphs: ${result.Attributes.paragraphs.length}`);
  console.log(`UpdatedAt: ${result.Attributes.updatedAt}`);

  // Verify character counts
  let totalChars = 0;
  result.Attributes.paragraphs.forEach((p, i) => {
    const chars = p.text.length;
    const words = p.text.split(/\s+/).length;
    totalChars += chars;
    console.log(`  P${i + 1}: ${chars} chars, ${words} words`);
  });
  console.log(`  Total: ${totalChars} chars`);
}

main().catch(console.error);
