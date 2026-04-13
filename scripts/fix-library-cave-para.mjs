import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

// Fix paragraph 4 (index 3): trim "one of the most important document finds ever made" → "one of the biggest document finds in history"
const para4 = `Then in 1907, a Hungarian-British explorer named Aurel Stein showed up. He'd trekked weeks through the desert on nothing but a rumor. The moment he saw the cave, he knew this was one of the biggest document finds in history. His move was cunning: he told Wang he was a devoted follower of Xuanzang, the legendary Buddhist monk from China's most famous story, "Journey to the West." He said destiny had sent him to carry these sacred texts westward. Wang, a deeply religious man, believed every word.`;

// Fix paragraph 5 (index 4): trim ending
const para5 = `Stein left with twenty-four cases of manuscripts and five cases of paintings — roughly ten thousand items. He paid Wang almost nothing. A year later, French scholar Paul Pelliot arrived and handpicked another six thousand of the finest pieces. Japanese, Russian, and American teams followed, each helping themselves. By 1910, when the Chinese government finally stepped in and shipped what remained to Beijing, more than half the cave's contents were already scattered across the globe.`;

console.log(`Para 4: ${para4.length} chars, ${para4.split(/\s+/).length} words`);
console.log(`Para 5: ${para5.length} chars, ${para5.split(/\s+/).length} words`);

const now = Math.floor(Date.now() / 1000);

const cmd = new UpdateCommand({
  TableName: "Story",
  Key: {
    siteId: "mogao-caves",
    langStoryId: "en#library-cave-sealed",
  },
  UpdateExpression:
    "SET paragraphs[3] = :p4, paragraphs[4] = :p5, updatedAt = :u",
  ExpressionAttributeValues: {
    ":p4": { text: para4 },
    ":p5": { text: para5 },
    ":u": now,
  },
  ReturnValues: "ALL_NEW",
});

try {
  const result = await docClient.send(cmd);
  console.log("\nFixed successfully!");
  result.Attributes.paragraphs.forEach((p, i) => {
    const flag = p.text.length > 500 ? " ⚠️ OVER 500" : " ✓";
    console.log(`P${i + 1}: ${p.text.length} chars, ${p.text.split(/\s+/).length} words${flag}`);
  });
  const totalChars = result.Attributes.paragraphs.reduce((sum, p) => sum + p.text.length, 0);
  console.log(`\nTotal: ${totalChars} characters, ${result.Attributes.paragraphs.length} paragraphs`);
} catch (err) {
  console.error("Update failed:", err);
  process.exit(1);
}
