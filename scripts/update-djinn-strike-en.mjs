import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: `The people of Lebanon's Bekaa Valley had a name for the ancient ruins at Baalbek. They called it the City of the Djinn. Not haunted by djinn, not built near djinn — built BY them. Because when you're standing in front of stone blocks the size of school buses, cut with surgical precision and stacked thirteen stories high, "a bunch of guys did it" just doesn't feel like a big enough answer.`,
  },
  {
    text: `The oldest legend goes back to the very beginning. After Cain killed his brother Abel — the first murder in human history — he wandered east into the mountains of Lebanon, mad with guilt. He built a fortress and filled it with giants called the Nephilim, massive beings described in the Book of Genesis. These giants quarried stones so huge no normal person could have lifted them. Then God sent the Great Flood. The giants drowned. But the stones survived.`,
  },
  {
    text: `After the waters went down, a king named Nimrod looked at those ruins and saw a challenge. Nimrod was Noah's great-grandson and the same king who tried to build the Tower of Babel to reach heaven. He sent another wave of giants to rebuild Baalbek, because the stones were simply too massive for any human crew. This was a king who once shot arrows at the sky just to prove he could challenge God. Baalbek was the ultimate flex.`,
  },
  {
    text: `But the legend everyone remembers is Solomon's. In the Quran, God gave King Solomon power over the djinn — beings made of smokeless fire, invisible but strong enough to reshape the earth. With a magical ring called the Seal of Solomon, he could command any djinn alive. He used that power to build Baalbek as a wedding gift for the Queen of Sheba. The djinn carved thousand-ton blocks from mountainsides and carried them on wind. Everyone who saw the finished palace knew: humans didn't do this.`,
  },
  {
    text: `Nine hundred meters from the temple, half-buried in a quarry, lies the proof that even the djinn had limits. It's called the Hajar el-Hibla — the Stone of the Pregnant Woman — a single block weighing a thousand tons that never reached its destination. One legend says pregnant djinn were assigned to move it. They went into labor, dropped everything, and never came back. The stone is still there, exactly where they left it. The djinn didn't quit. They went on strike.`,
  },
  {
    text: `There's another version of that name. A pregnant woman once told the people of Baalbek she knew the secret to moving the stone — but she couldn't share it on an empty stomach. The city fed her their finest food for nine full months. When the baby arrived, she confessed: she had absolutely no idea. She'd tricked an entire city because they were so desperate for an answer, they'd believe anyone who claimed to have one.`,
  },
  {
    text: `Archaeologists say the Romans built it — first century AD, using rollers, ramps, and organized labor. That's the rational answer. But through Roman conquest, Christian demolition, Arab invasion, Crusader occupation, and Tamerlane burning it in 1401, the djinn legends never died. They were never about engineering. They were about standing before something so impossible your brain reaches for the supernatural — not because science can't explain it, but because science doesn't feel big enough.`,
  },
  {
    text: `To say Baalbek was built by djinn wasn't an insult to human skill. It was the highest compliment the human imagination could pay — a way of saying this place broke the rules of what stone is supposed to do. And two thousand years later, standing in that quarry next to a rock that weighs more than two fully loaded 747s, you kind of get it. Maybe the djinn were real. Maybe they're still on break.`,
  },
];

// Validate constraints
let totalChars = 0;
for (let i = 0; i < paragraphs.length; i++) {
  const p = paragraphs[i];
  const charCount = p.text.length;
  const wordCount = p.text.split(/\s+/).length;
  totalChars += charCount;
  console.log(
    `P${i + 1}: ${charCount} chars, ${wordCount} words ${charCount > 500 ? "⚠️ OVER 500 CHARS" : "✓"} ${wordCount > 100 ? "⚠️ OVER 100 WORDS" : "✓"}`
  );
}
console.log(`\nTotal: ${totalChars} chars, ${paragraphs.length} paragraphs`);
console.log(
  `Target: ~3000 chars (±20% = 2400-3600). ${totalChars >= 2400 && totalChars <= 3600 ? "✓ IN RANGE" : "⚠️ OUT OF RANGE"}`
);

const excerpt = `The people of Lebanon's Bekaa Valley called it the City of the Djinn. Not haunted by djinn, not built near djinn — built BY them. And nine hundred meters from the temple, a thousand-ton stone sits in a quarry as proof that even the supernatural builders had their limits.`;

const now = Math.floor(Date.now() / 1000);

const cmd = new UpdateCommand({
  TableName: "Story",
  Key: {
    siteId: "baalbek",
    langStoryId: "en#when-the-djinn-went-on-strike",
  },
  UpdateExpression:
    "SET paragraphs = :p, excerpt = :e, updatedAt = :u, readingTimeMinutes = :r",
  ExpressionAttributeValues: {
    ":p": paragraphs,
    ":e": excerpt,
    ":u": now,
    ":r": 4,
  },
  ReturnValues: "ALL_NEW",
});

console.log("\nPushing to DynamoDB...");
const result = await docClient.send(cmd);
console.log("\n✅ Successfully updated story in DynamoDB");
console.log(`   siteId: ${result.Attributes.siteId}`);
console.log(`   langStoryId: ${result.Attributes.langStoryId}`);
console.log(`   title: ${result.Attributes.title}`);
console.log(`   paragraphs: ${result.Attributes.paragraphs.length} paragraphs`);
console.log(`   updatedAt: ${result.Attributes.updatedAt}`);
console.log(`   readingTimeMinutes: ${result.Attributes.readingTimeMinutes}`);
