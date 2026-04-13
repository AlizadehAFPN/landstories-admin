import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: `There's a story you hear in Agra, India \u2014 right in the shadow of the Taj Mahal. When Emperor Shah Jahan's masterpiece was finished in 1653, he supposedly ordered the hands of all twenty thousand workers chopped off. So no one could ever build anything this beautiful again. Some versions say he took their eyes too. It's one of the most famous legends in the world. It's also completely made up.`,
  },
  {
    text: `And it's not even an original lie. The same story shows up at St. Basil's Cathedral in Moscow \u2014 Ivan the Terrible supposedly blinded the architects. Same with Istanbul's Fatih Mosque \u2014 Sultan Mehmed allegedly cut off the architect's hand. Folklore scholar Stith Thompson catalogued it as a universal myth: wherever humans build something impossibly beautiful, we tell ourselves the builders were destroyed for it.`,
  },
  {
    text: `Shah Jahan's official court history, the Padshahnama \u2014 hundreds of pages of obsessive Mughal bookkeeping covering every wage, quarry contract, and marble shipment \u2014 mentions zero punishments. Not one line. Chopping forty thousand hands off twenty thousand workers would've been an administrative catastrophe \u2014 the sudden loss of Asia's most skilled labor force. In an empire that documented everything, it wasn't recorded. Because it never happened.`,
  },
  {
    text: `Shah Jahan actually did the opposite. In 1641, mid-construction, he banned forced labor across his empire. An inscription at Agra Fort records eleven million dams from the royal treasury spent on workers' wages. And archaeologists later found around 670 names carved into the Taj's sandstone \u2014 in Arabic and Persian, with Hindu and Muslim symbols side by side. Not prisoners' scratches. Signatures from people proud of what they built.`,
  },
  {
    text: `The chief architect, Ustad Ahmad Lahori \u2014 a mathematician who'd studied Euclid, honored as \u201cWonder of the Age\u201d \u2014 didn't vanish after the Taj. He went straight to his next project: designing the Red Fort in Delhi, Shah Jahan's brand-new capital. He died of natural causes around 1649, hands intact. His son later built a deliberate copy of the Taj, commissioned by Shah Jahan's own son, Emperor Aurangzeb. No ban on replication ever existed.`,
  },
  {
    text: `Then there's the calligrapher Abd ul-Haq, brought from Iran to inscribe Quranic verses across every arch. He sized the letters to grow larger as they climbed the walls, so they'd look uniform from the ground \u2014 a visual trick that still works today. Shah Jahan gave him a noble title, land, and wealth for life. The only person who signed the Taj Mahal died rich, building a rest house for travelers with his own earnings.`,
  },
  {
    text: `So why does the myth stick? Partly because British colonial tales of \u201ccruel Eastern emperors\u201d helped justify ruling India. But mostly because when you stand before the Taj Mahal and the marble fills your vision and the stone flowers look like you could pluck them \u2014 your brain needs an explanation that matches the beauty. Forty thousand severed hands is, in its terrible way, an answer big enough for the question.`,
  },
  {
    text: `The real story is better. Twenty thousand workers of different faiths, led by a genius architect, paid from the treasury, built for twenty-two years under an emperor who banned forced labor. They carved their names into the walls. They taught their sons, who built for emperors not yet born. The hands that built the Taj Mahal were never cut off. The beauty wasn't a curse. It was a gift \u2014 given freely.`,
  },
];

const excerpt = `There's a story you hear in Agra, India \u2014 when the Taj Mahal was finished, Emperor Shah Jahan had the hands of every worker chopped off so no one could ever build anything this beautiful again. It's one of the most famous legends in the world. It's also completely made up.`;

// Validate constraints before pushing
let totalChars = 0;
for (let i = 0; i < paragraphs.length; i++) {
  const text = paragraphs[i].text;
  const charCount = text.length;
  const wordCount = text.split(/\s+/).length;
  totalChars += charCount;
  console.log(
    `P${i + 1}: ${charCount} chars, ${wordCount} words ${charCount > 500 ? "⚠️ OVER 500 CHARS" : "✓"} ${wordCount > 100 ? "⚠️ OVER 100 WORDS" : "✓"}`
  );
}
console.log(`\nTotal: ${totalChars} chars, ${paragraphs.length} paragraphs`);
console.log(
  `Target: ~3000 chars (±20% = 2400-3600), 6-8 paragraphs`
);

if (totalChars < 2400 || totalChars > 3600) {
  console.error(`❌ Total chars ${totalChars} outside acceptable range!`);
  process.exit(1);
}
if (paragraphs.some((p) => p.text.length > 500)) {
  console.error("❌ A paragraph exceeds 500 characters!");
  process.exit(1);
}
if (paragraphs.some((p) => p.text.split(/\s+/).length > 100)) {
  console.error("❌ A paragraph exceeds 100 words!");
  process.exit(1);
}

console.log("\n✅ All constraints pass. Pushing to DynamoDB...\n");

const result = await docClient.send(
  new UpdateCommand({
    TableName: "Story",
    Key: {
      siteId: "taj-mahal",
      langStoryId: "en#hands-that-built-eternity",
    },
    UpdateExpression: "SET paragraphs = :p, excerpt = :e, updatedAt = :u",
    ExpressionAttributeValues: {
      ":p": paragraphs,
      ":e": excerpt,
      ":u": Math.floor(Date.now() / 1000),
    },
    ReturnValues: "NONE",
  })
);

console.log("✅ Story updated successfully!");
console.log(`   HTTP status: ${result.$metadata.httpStatusCode}`);
console.log(`   Updated fields: paragraphs (${paragraphs.length}), excerpt, updatedAt`);
console.log("   Unchanged: title, subtitle, moralOrLesson, source, characters, era, icon, tier, audio, coordinates, all metadata");
