import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: `On the morning of May 23, 1618, a group of Protestant nobles stormed through Prague Castle, ready to do something extreme. The Habsburgs \u2014 the most powerful royal family in Europe \u2014 had been crushing their religious freedoms for years. Catholic governors now ran Bohemia. The Letter of Majesty, guaranteeing Protestant rights, was treated like scrap paper. Petitions and diplomacy had gotten nowhere. So the nobles fell back on an old Czech tradition: when politics fails, there\u2019s always the window.`,
  },
  {
    text: `This wasn\u2019t even the first time. Two hundred years earlier, in 1419, followers of the reformer Jan Hus had thrown Catholic officials out of a Prague town hall window, kicking off fifteen years of religious war. Now history was about to repeat. The nobles found the imperial governors \u2014 Slavata and Martinic \u2014 in the royal offices, along with their secretary Fabricius. There were shouts, accusations of tyranny. Then hands seized the governors and dragged them toward the window.`,
  },
  {
    text: `Slavata fought hard, clinging to the window frame, screaming for the Virgin Mary to save him. Martinic went quiet \u2014 maybe frozen in shock. The secretary tried to hide. One by one, all three were grabbed and hurled from the window, dropping about seventy feet into the castle moat below.`,
  },
  {
    text: `Here\u2019s the part that sounds made up but isn\u2019t: all three survived. Catholics claimed the Virgin Mary sent angels to catch them mid-fall. Protestants pointed to something less divine \u2014 a massive pile of manure that had built up in the dry moat. The truth probably lies somewhere between theology and compost. But nobody was laughing about what came next.`,
  },
  {
    text: `That single act of rage set off a chain reaction nobody could have predicted. Bohemia erupted in rebellion. Then the fighting spread across the Holy Roman Empire \u2014 a patchwork of hundreds of states across Central Europe, loosely ruled by the Habsburgs. What started as a fight over religion became the Thirty Years\u2019 War, the deadliest conflict Europe had ever seen. Cities were burned to the ground. Some regions lost half their population. By 1648, around eight million people were dead.`,
  },
  {
    text: `Prague paid the highest price. Just two years after the defenestration, Czech forces were crushed at the Battle of White Mountain right outside the city. Twenty-seven Protestant leaders were publicly executed in Old Town Square. The Czech language was banned from official use. Bohemia lost its independence and wouldn\u2019t get it back for three hundred years, until Czechoslovakia was finally born in 1918.`,
  },
  {
    text: `All of that \u2014 a continent-wide war, millions dead, a nation erased for three centuries \u2014 because three men were thrown from a window. You can still visit the room where it happened. The window is still there. The moat has long since been cleaned up. But if you stand in that room and look down, you can almost feel it: one of history\u2019s starkest reminders that a single act of defiance can spiral far beyond anyone\u2019s control.`,
  },
];

const excerpt =
  "On the morning of May 23, 1618, a group of Protestant nobles stormed through Prague Castle, ready to do something extreme.";

const now = Math.floor(Date.now() / 1000);

const cmd = new UpdateCommand({
  TableName: "Story",
  Key: {
    siteId: "prague-castle",
    langStoryId: "en#defenestration-1618",
  },
  UpdateExpression:
    "SET paragraphs = :p, excerpt = :e, updatedAt = :u",
  ExpressionAttributeValues: {
    ":p": paragraphs,
    ":e": excerpt,
    ":u": now,
  },
  ReturnValues: "ALL_NEW",
});

try {
  const result = await doc.send(cmd);
  console.log("Successfully updated story.");
  console.log("Title:", result.Attributes.title);
  console.log("Excerpt:", result.Attributes.excerpt);
  console.log("Paragraphs:", result.Attributes.paragraphs.length);
  console.log("UpdatedAt:", result.Attributes.updatedAt);
  console.log("\n--- Paragraph texts ---");
  result.Attributes.paragraphs.forEach((p, i) => {
    console.log(`\nP${i + 1} (${p.text.length} chars, ${p.text.split(/\s+/).length} words):`);
    console.log(p.text);
  });
} catch (err) {
  console.error("Update failed:", err);
  process.exit(1);
}
