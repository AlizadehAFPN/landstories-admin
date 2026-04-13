import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: `On the evening of April 15, 2019, smoke started rising from the roof of Notre-Dame cathedral in Paris. Within an hour, the 850-year-old oak framework — medieval builders called it "the Forest" because it took an entire forest of trees to build — was a wall of fire. The cathedral's iconic spire collapsed on live television while millions watched, many in tears. But inside the burning building, something far more dramatic was happening than anyone outside could see.`,
  },
  {
    text: `Deep in the cathedral, Father Jean-Marc Fournier — the chaplain of the Paris Fire Brigade — was leading a team of firefighters on a rescue mission. Not for people. For something that had been in continuous human care for nearly two thousand years: the Crown of Thorns, the relic that Christians believe was placed on Jesus's head before his crucifixion. It was locked in Notre-Dame's treasury, and the fire was closing in.`,
  },
  {
    text: `The Crown had an unbelievable backstory. In 1239, King Louis IX of France — so devout he'd later be declared a saint — bought it from the cash-strapped ruler of what remained of the Eastern Roman Empire in Constantinople. The price tag? More than half of France's entire yearly revenue. Then Louis built the Sainte-Chapelle, one of the most stunning churches in Paris, just to house this one relic. When it arrived, the king removed his shoes and walked barefoot through the streets to receive it.`,
  },
  {
    text: `Back in the burning cathedral: the Crown sat inside the treasury vault, behind electronic locks. Father Fournier and the firefighters fought through smoke-filled hallways to reach it. When they got there, the heat had shorted out the locks. A firefighter smashed through the mechanism by force. Inside, they found the relic sitting in its crystal case — a circle of woven rushes held together with gold thread, looking almost impossibly fragile against the chaos around it.`,
  },
  {
    text: `There was no time for careful handling. Burning debris was falling from above. So they formed a human chain and passed the crystal case hand over hand — through smoke, past falling embers, down corridors lit orange by the fire overhead — until it reached the open air of the Paris night. When the Crown of Thorns made it out safely, Father Fournier dropped to his knees. Hardened firefighters — the kind of people who run toward danger for a living — broke down and wept.`,
  },
  {
    text: `Here's what makes this story almost eerie. The Crown has been on the brink of destruction for nearly two thousand years — and every time, someone stepped up. It survived the fall of Rome. It survived the sack of Constantinople in 1204, when Crusaders looted a fellow Christian city instead of marching to Jerusalem. It survived the French Revolution of 1789, when mobs destroyed every religious symbol — a priest hid it just in time. It survived two world wars. And in 2019, it survived Notre-Dame.`,
  },
  {
    text: `Some people call that luck. Some call it coincidence. But there's a pattern that's hard to ignore: in every catastrophe, someone decided this small, fragile circle of thorns was worth risking everything for. Father Fournier walked into a burning cathedral for it. A priest during the French Revolution risked the guillotine for it. A medieval king spent half his kingdom's wealth on it. Whatever you believe, the Crown of Thorns keeps surviving — because people keep choosing to save it.`,
  },
];

const excerpt = `On the evening of April 15, 2019, smoke started rising from the roof of Notre-Dame cathedral in Paris. But inside the burning building, something far more dramatic was happening than anyone outside could see.`;

const moralOrLesson = `Some things survive not by luck, but because in every generation, someone decides they're worth walking into fire for.`;

const now = Math.floor(Date.now() / 1000);

const command = new UpdateCommand({
  TableName: "Story",
  Key: {
    siteId: "notre-dame-de-paris",
    langStoryId: "en#crown-of-thorns-rescue",
  },
  UpdateExpression:
    "SET paragraphs = :p, excerpt = :e, moralOrLesson = :m, updatedAt = :u",
  ExpressionAttributeValues: {
    ":p": paragraphs,
    ":e": excerpt,
    ":m": moralOrLesson,
    ":u": now,
  },
  ReturnValues: "ALL_NEW",
});

try {
  const result = await docClient.send(command);
  console.log("✅ Story updated successfully!");
  console.log(`   siteId: ${result.Attributes.siteId}`);
  console.log(`   langStoryId: ${result.Attributes.langStoryId}`);
  console.log(`   title: ${result.Attributes.title}`);
  console.log(`   paragraphs: ${result.Attributes.paragraphs.length}`);
  console.log(`   updatedAt: ${result.Attributes.updatedAt}`);
  console.log("\n--- Paragraph lengths ---");
  result.Attributes.paragraphs.forEach((p, i) => {
    console.log(`   P${i + 1}: ${p.text.length} chars, ${p.text.split(/\s+/).length} words`);
  });
  const totalChars = result.Attributes.paragraphs.reduce((sum, p) => sum + p.text.length, 0);
  console.log(`\n   Total: ${totalChars} chars across ${result.Attributes.paragraphs.length} paragraphs`);
  console.log(`   Excerpt: ${result.Attributes.excerpt.length} chars`);
  console.log(`   Moral: ${result.Attributes.moralOrLesson}`);
} catch (err) {
  console.error("❌ Error updating story:", err);
  process.exit(1);
}
