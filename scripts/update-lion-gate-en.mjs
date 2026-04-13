import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: `Picture this. You're in fifth-century Sri Lanka, climbing a granite cliff that shoots two hundred meters straight out of the jungle. Halfway up, the staircase ends — and the only way forward is through the open jaws of a lion so enormous its body towers thirty-five meters up the rock face. Built from brick, plaster, and the sheer audacity of a king named Kashyapa. That lion was not decoration. It was the front door.`,
  },
  {
    text: `Kashyapa had blood on his hands. Around 477 CE, he seized the Sri Lankan throne by killing his own father, King Dhatusena. His half-brother Moggallana — the rightful heir — escaped to southern India and started gathering an army. Kashyapa knew revenge was coming. So he abandoned the old capital and moved his entire court to the top of a sheer rock called Sigiriya, deep in the jungle. If you can't win loyalty, you build a fortress no army can climb.`,
  },
  {
    text: `But the lion wasn't just military engineering — it was a political statement in brick. The Sinhalese people trace their origin to a literal lion. Their founding myth says Prince Vijaya, the island's first settler, was the grandson of a lion. "Sinhala" literally means "lion people." So when Kashyapa built a colossal lion onto the cliff, the message was unmistakable: I am the true heir of the lion bloodline. My throne is legitimate.`,
  },
  {
    text: `The scale was staggering. From surviving paws and scars in the rock, the lion stood roughly thirty-five meters tall and twenty-one meters wide — brick and plaster over a skeleton of timber and iron bolted into the granite. Between the paws, each several meters tall with individual toes sculpted in, a staircase led straight into the lion's open mouth. You walked in through the jaws, climbed through the throat, and came out at the summit. You didn't walk past the lion. You walked through it.`,
  },
  {
    text: `The effect was exactly what Kashyapa wanted. Every ambassador, every general, every person seeking an audience had to walk into the mouth of a predator. On a gut level, it triggered something primal — that deep fear of being swallowed whole. Symbolically, you were being devoured and reborn: you entered as an ordinary person and climbed out into a sky palace as something transformed. And politically? Simple. You are prey. The king is the predator.`,
  },
  {
    text: `The lion was just the showpiece. The whole rock was a war machine dressed up as paradise. A moat — reportedly stocked with crocodiles — surrounded water gardens where elegant pools doubled as reservoirs and open lawns became kill zones. The only path up was carved into the cliff, wide enough for just two people. Water tanks cut into the rock could keep the palace alive through a siege. Every detail served two masters: beauty and survival.`,
  },
  {
    text: `In 1898, British archaeologist H.C.P. Bell dug through centuries of debris on the lion terrace and found two massive paws — brick claws on carved stone, detailed enough to show retracted talons. Above them, the rock still bore the scars: anchor holes, faded plaster, the ghost of something impossibly large. The body was gone — timber rotted, plaster crumbled, brickwork beaten down by fifteen centuries of tropical storms.`,
  },
  {
    text: `Today, a metal staircase bolted into the cliff takes you where the lion's body once stood. Tourists grip the handrails against the wind, staring down at the jungle far below. But the paws are still there — two massive, patient, feline paws resting on the terrace like the lion just lay down for a nap and the rest of it is hiding inside the rock. Fifteen hundred years later, you still can't reach the top without passing between them. Kashyapa built a door that outlasted his kingdom.`,
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
console.log(
  `Target: ~3000 chars (±20% = 2400-3600). ${totalChars >= 2400 && totalChars <= 3600 ? "✅ PASS" : "❌ FAIL"}`
);

// Push to DynamoDB
const now = Math.floor(Date.now() / 1000);

const command = new UpdateCommand({
  TableName: "Story",
  Key: {
    siteId: "sigiriya",
    langStoryId: "en#lion-gate-sky-fortress",
  },
  UpdateExpression:
    "SET paragraphs = :p, updatedAt = :u, readingTimeMinutes = :r",
  ExpressionAttributeValues: {
    ":p": paragraphs,
    ":u": now,
    ":r": 3,
  },
  ReturnValues: "ALL_NEW",
});

try {
  const result = await docClient.send(command);
  console.log("\n✅ Story updated successfully!");
  console.log(`   Updated at: ${new Date(now * 1000).toISOString()}`);
  console.log(`   Paragraphs: ${result.Attributes.paragraphs.length}`);
  console.log(`   Reading time: ${result.Attributes.readingTimeMinutes} min`);
  console.log(`   Title: ${result.Attributes.title}`);
  console.log(`   Fields preserved: title, subtitle, excerpt, moralOrLesson, source, characters, icon, tier, storyCategory, coordinates, era, image, thumbnail, disabled, hasAudio, isFree, storyId, lang, siteId`);
} catch (err) {
  console.error("❌ Update failed:", err);
  process.exit(1);
}
