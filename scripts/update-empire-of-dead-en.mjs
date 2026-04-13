import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client);

const paragraphs = [
  {
    text: "Picture Paris in the 1780s. Not the city of lights and lovers \u2014 a city choking on its own dead. For over a thousand years, Parisians had been burying bodies in the same cemeteries, and the biggest, Saints-Innocents, sat right in the middle of town. Graves were stacked ten deep. In 1780, a basement wall in a building next door finally collapsed, and a landslide of decomposing remains poured into someone\u2019s cellar. The city was rotting from the inside out."
  },
  {
    text: "So in 1786, the authorities made a drastic call: dig up every major cemetery in Paris and move all the bones underground. Beneath the city lay over 300 kilometers of abandoned tunnels \u2014 old limestone quarries mined since the Middle Ages to build Paris itself. Notre-Dame, the Louvre, those grand stone buildings \u2014 all carved from the rock below. Now the empty tunnels were about to get six million new residents."
  },
  {
    text: "The work only happened after dark. The Catholic Church insisted \u2014 this was sacred work. Every night, covered wagons loaded with bones rolled through the streets by torchlight while priests walked alongside, chanting prayers for the dead. Imagine living on one of those routes. The creak of wooden wheels on cobblestone, the low chanting, knowing exactly what was in those carts. Night after night, year after year. Six million people, moved one wagonload at a time."
  },
  {
    text: "Here\u2019s where the story takes its strangest turn. Instead of just dumping remains in a tunnel, workers started arranging them into art. Femurs were stacked into tight, clean walls \u2014 row after row, floor to ceiling. Skulls were placed at regular intervals, forming crosses, hearts, and geometric patterns. The bones became architecture. And over the entrance, someone carved the words that gave this place its name: \u2018Stop. This is the Empire of the Dead.\u2019"
  },
  {
    text: "Here\u2019s what really stays with you: nobody sorted the bones. A king\u2019s thighbone sits next to a beggar\u2019s. A nun\u2019s skull rests beside a criminal\u2019s. Paris survived revolutions, plagues, and centuries of war, and all those people \u2014 powerful and forgotten alike \u2014 ended up in the same wall, completely anonymous. Six million lives, and not a single name survived. Death doesn\u2019t care about your r\u00e9sum\u00e9."
  },
  {
    text: "Today, you can walk through about 1.5 kilometers of this underground bone palace \u2014 a tiny fraction of the full tunnel network beneath Paris. The corridors are narrow, damp, and lined floor to ceiling with the remains of people who once walked the same streets you did to get there. They were bakers, soldiers, mothers, criminals, priests. Now they\u2019re all the same shade of white, arranged in patterns that are somehow both beautiful and deeply unsettling."
  },
  {
    text: "The Paris Catacombs aren\u2019t really a cemetery. They\u2019re a monument to the one thing every person who ever lived has in common. You can build an empire, write a masterpiece, spend your whole life making sure the world remembers your name \u2014 and your bones still end up in a wall next to a stranger\u2019s. That\u2019s either the most terrifying thing in Paris, or the most honest."
  }
];

const excerpt = "Picture Paris in the 1780s. Not the city of lights and lovers \u2014 a city choking on its own dead. For over a thousand years, Parisians had been burying bodies in the same cemeteries, and the biggest, Saints-Innocents, sat right in the middle of town.";

// Verify paragraph constraints before pushing
let totalChars = 0;
for (let i = 0; i < paragraphs.length; i++) {
  const text = paragraphs[i].text;
  const chars = text.length;
  const words = text.split(/\s+/).length;
  totalChars += chars;
  console.log(`P${i + 1}: ${chars} chars, ${words} words${chars > 500 ? " *** OVER 500 CHARS ***" : ""}${words > 100 ? " *** OVER 100 WORDS ***" : ""}`);
}
console.log(`\nTotal: ${totalChars} chars, ${paragraphs.length} paragraphs`);
console.log("---");

const command = new UpdateCommand({
  TableName: "Story",
  Key: {
    siteId: "catacombs-of-paris",
    langStoryId: "en#empire-of-the-dead",
  },
  UpdateExpression: "SET paragraphs = :p, excerpt = :e, updatedAt = :u",
  ExpressionAttributeValues: {
    ":p": paragraphs,
    ":e": excerpt,
    ":u": Math.floor(Date.now() / 1000),
  },
  ReturnValues: "ALL_NEW",
});

try {
  const result = await docClient.send(command);
  console.log("Updated successfully!");
  console.log("Title:", result.Attributes.title);
  console.log("Subtitle:", result.Attributes.subtitle);
  console.log("Excerpt:", result.Attributes.excerpt);
  console.log("Paragraphs count:", result.Attributes.paragraphs.length);
  console.log("\n--- Updated paragraphs ---");
  result.Attributes.paragraphs.forEach((p, i) => {
    console.log(`\nP${i + 1}:`);
    console.log(p.text);
  });
} catch (err) {
  console.error("Update failed:", err);
  process.exit(1);
}
