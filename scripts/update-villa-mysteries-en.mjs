import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: "Just outside the walls of Pompeii, buried under layers of volcanic ash, there was a room that no one was ever supposed to see again. When archaeologists uncovered it in the early 1900s, they found something that stopped them cold: twenty-nine life-sized figures painted on blood-red walls, acting out what looks like a step-by-step initiation into an ancient forbidden cult.",
  },
  {
    text: "The paintings date to around 60 BC and wrap around three walls like a widescreen movie. They tell one continuous story. A young woman walks in, veiled and clearly nervous. A priestess reads from a sacred scroll. A boy recites something while another woman makes an offering. So far, it could be any Roman religious ceremony. But then the scenes take a hard turn.",
  },
  {
    text: "A woman lifts a cloth from a basket and reveals something hidden \u2014 most likely a sacred symbol of Dionysus, the Greek god of wine, madness, and ecstasy. A winged figure raises a whip. The young woman drops to her knees, half-naked, bracing for the blow. Next to her, another woman dances wildly, completely lost in a trance. It\u2019s pleasure and pain crashing into each other at full speed.",
  },
  {
    text: "Here\u2019s what makes this so shocking. In 186 BC \u2014 more than a century before these paintings were made \u2014 the Roman Senate officially outlawed the cult of Bacchus, the Roman name for Dionysus. They accused its followers of conspiracy, orgies, and murder, then rounded up and executed thousands of people across Italy. It was one of the most brutal religious crackdowns in Roman history.",
  },
  {
    text: "And yet someone \u2014 likely a wealthy Roman woman \u2014 paid to have these banned rituals painted in vivid, unapologetic detail across her private dining room. Floor to ceiling. In a house that guests would visit. Either she was incredibly brave, or the cult had gone so far underground that the authorities simply couldn\u2019t reach it anymore.",
  },
  {
    text: "Scholars have argued about these frescoes for over a hundred years. Some say it\u2019s a real record of an actual initiation. Others think it\u2019s more symbolic \u2014 a painting about the soul\u2019s journey through fear and transformation. A few believe it\u2019s just a wealthy bride\u2019s wedding prep, dressed up in dramatic religious imagery. The honest answer is that nobody knows.",
  },
  {
    text: "And that\u2019s the whole point. They called these rites \u201Cthe Mysteries\u201D because initiates swore to never reveal what happened \u2014 not in speech, not in writing, not ever. The only reason we know anything at all is that Mount Vesuvius erupted in 79 AD and buried this room in darkness for nearly two thousand years. The volcano that destroyed Pompeii accidentally preserved the one thing that was never meant to be seen.",
  },
];

const excerpt =
  "Just outside the walls of Pompeii, buried under layers of volcanic ash, there was a room that no one was ever supposed to see again.";

const now = Math.floor(Date.now() / 1000);

const cmd = new UpdateCommand({
  TableName: "Story",
  Key: {
    siteId: "pompeii",
    langStoryId: "en#villa-mysteries-initiation",
  },
  UpdateExpression: "SET paragraphs = :p, excerpt = :e, updatedAt = :u",
  ExpressionAttributeValues: {
    ":p": paragraphs,
    ":e": excerpt,
    ":u": now,
  },
  ReturnValues: "ALL_NEW",
});

try {
  const result = await docClient.send(cmd);
  console.log("Updated successfully!");
  console.log("Title:", result.Attributes.title);
  console.log("Paragraphs:", result.Attributes.paragraphs.length);
  result.Attributes.paragraphs.forEach((p, i) => {
    console.log(`\n--- Paragraph ${i + 1} (${p.text.length} chars, ~${p.text.split(/\s+/).length} words) ---`);
    console.log(p.text);
  });
  console.log("\nExcerpt:", result.Attributes.excerpt);
  console.log("Updated at:", new Date(result.Attributes.updatedAt * 1000).toISOString());
} catch (err) {
  console.error("Update failed:", err);
  process.exit(1);
}
