import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client);

const paragraphs = [
  {
    text: `For centuries, the world believed a lie. The ancient Greek writer Herodotus \u2014 writing 2,000 years after the Great Pyramid was built \u2014 claimed the pharaoh Khufu forced 100,000 men to work as slaves. Hollywood ran with it. Picture whipped prisoners dragging stones through the desert in chains. The Bible\u2019s story of Israelite slavery in Egypt got mixed into pyramid lore. By the 20th century, everyone \u201Cknew\u201D the pyramids were built on human suffering. Everyone was wrong.`
  },
  {
    text: `Then in 1990, a tourist\u2019s horse tripped. An American riding near the Sphinx stumbled over a low mud-brick wall poking out of the sand, about 400 meters to the south. It looked like nothing \u2014 just another ruin in a desert full of them. But that clumsy stumble was about to blow apart everything the world thought it knew about who really built the pyramids.`
  },
  {
    text: `Archaeologists Mark Lehner and Zahi Hawass started digging \u2014 and what they found was staggering. An entire planned city, buried under the sand. Dormitories, bakeries, breweries, fish-processing buildings, a copper workshop, and a hospital with evidence of expertly treated injuries. This wasn\u2019t a slave camp. It was a real town designed to house up to 20,000 workers and keep them fed, healthy, and working at their best.`
  },
  {
    text: `These workers ate beef \u2014 a luxury in ancient Egypt that no slave would ever see on their plate. They got generous rations of bread and beer, the standard meals of free Egyptian laborers. When they got hurt, they received real medical care: broken arms properly set, even amputations that workers survived for years afterward. You don\u2019t spend that kind of time and money patching up slaves. You spend it on people you value.`
  },
  {
    text: `But here\u2019s the detail that sealed it. Many workers were buried in their own tombs \u2014 small, but dignified \u2014 right next to the pyramids themselves. Burying a slave near a pharaoh\u2019s sacred body would have been unthinkable in ancient Egypt. And some tombs carried inscriptions with work-crew names like \u201CFriends of Khufu\u201D and \u201CDrunkards of Menkaure.\u201D Those aren\u2019t names of misery. They\u2019re the kind of proud, inside-joke names coworkers have given themselves since the beginning of time.`
  },
  {
    text: `The real picture was something nobody expected. The pyramids were a national project \u2014 more like a draft than a death sentence. Workers came from villages across Egypt, serving three-month shifts as a form of labor tax. They competed between crews, took fierce pride in their craft, and went home knowing they\u2019d helped build the most sacred structure in their civilization. This wasn\u2019t punishment. It was the closest thing an ordinary Egyptian could get to touching the divine.`
  },
  {
    text: `One horse stumbled, and a 2,500-year-old myth came crashing down. The pyramids weren\u2019t built by cruelty \u2014 they were built by belief, skill, and jaw-dropping organization. Millions of people hadn\u2019t been whipped into building them. They\u2019d lined up for the chance to be part of something bigger than themselves \u2014 and they raised monuments that have outlasted every empire since.`
  }
];

const excerpt = `For centuries, the world believed a lie. The ancient Greek writer Herodotus claimed the pharaoh Khufu forced 100,000 men to work as slaves. Everyone was wrong.`;

const updatedAt = Math.floor(Date.now() / 1000);

// Verify constraints before pushing
let totalChars = 0;
for (let i = 0; i < paragraphs.length; i++) {
  const text = paragraphs[i].text;
  const chars = text.length;
  const words = text.split(/\s+/).length;
  totalChars += chars;
  console.log(`Paragraph ${i + 1}: ${chars} chars, ${words} words`);
  if (chars > 500) {
    console.error(`ERROR: Paragraph ${i + 1} exceeds 500 characters (${chars})`);
    process.exit(1);
  }
  if (words > 100) {
    console.error(`ERROR: Paragraph ${i + 1} exceeds 100 words (${words})`);
    process.exit(1);
  }
}
console.log(`\nTotal: ${totalChars} chars, ${paragraphs.length} paragraphs`);
console.log(`Excerpt: ${excerpt.length} chars\n`);

const command = new UpdateCommand({
  TableName: "Story",
  Key: {
    siteId: "great-pyramids-giza",
    langStoryId: "en#workers-village-discovery",
  },
  UpdateExpression: "SET paragraphs = :p, excerpt = :e, updatedAt = :u",
  ExpressionAttributeValues: {
    ":p": paragraphs,
    ":e": excerpt,
    ":u": updatedAt,
  },
  ReturnValues: "ALL_NEW",
});

const result = await docClient.send(command);
console.log("Update successful!");
console.log("Title:", result.Attributes.title);
console.log("Paragraphs count:", result.Attributes.paragraphs.length);
console.log("Excerpt:", result.Attributes.excerpt);
console.log("Updated at:", new Date(result.Attributes.updatedAt * 1000).toISOString());
