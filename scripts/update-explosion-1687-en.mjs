import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: "For over two thousand years, the Parthenon had survived everything history threw at it. Earthquakes. Fires. Armies from half a dozen empires. It went from Greek temple to Christian church to Ottoman mosque \u2014 battered, repurposed, stripped of its original statues and paint, but still standing. Its bones were intact. Then, on the evening of September 26, 1687, one bomb changed all of that forever.",
  },
  {
    text: "Here\u2019s the setup. Venice and the Ottoman Empire were locked in a war over the eastern Mediterranean \u2014 two superpowers fighting for islands, ports, and trade routes. A Venetian fleet under General Francesco Morosini sailed to Greece and laid siege to Athens. The Ottoman garrison, badly outnumbered, fell back to the Acropolis \u2014 the ancient hilltop fortress that was still the strongest defensive position in the city.",
  },
  {
    text: "Then the Ottoman commander made the decision that would haunt history. He moved his entire gunpowder supply \u2014 barrels and barrels of it \u2014 inside the Parthenon. His logic wasn\u2019t crazy: for centuries, attacking armies had respected the building because it had served as a Christian church. He was gambling that the Venetians, fellow Christians, would never shell it. It was a reasonable bet. It was also dead wrong.",
  },
  {
    text: "A Swedish officer named Count von K\u00f6nigsmark, serving with the Venetian forces, aimed his cannons straight at the hilltop. For three days starting September 23rd, cannonballs slammed into ancient walls and temples. Then, around seven in the evening on September 26th, a mortar shell arced over the fortifications, punched through the Parthenon\u2019s roof, and landed directly on top of the gunpowder.",
  },
  {
    text: "The explosion killed three hundred people instantly \u2014 soldiers, women, children who had taken shelter inside. The center of the building was blown wide open. Eight columns on the south side gone, six on the north gone, the entire inner chamber destroyed. Sculptures carved during the golden age of Athens \u2014 we\u2019re talking the 400s BC, the era of Pericles \u2014 were shattered or hurled hundreds of meters. Marble blocks weighing tons scattered across the hilltop like dice thrown by a giant.",
  },
  {
    text: "And then came the insult on top of the injury. Morosini marched into the wreckage and decided to take a trophy \u2014 the massive stone horses that decorated the roofline. His workers rigged up ropes to lower them. The ropes snapped. The horses crashed to the ground and shattered into pieces. The Venetians held Athens for less than a year before abandoning the city. Their grand prize: a ruin they created and couldn\u2019t even loot properly.",
  },
  {
    text: "Next time you see a photo of the Parthenon \u2014 that famous silhouette, the row of columns, the gaps where the roof used to be \u2014 know that you\u2019re looking at the scar from one night. Every empty space where a sculpture once stood, every broken column, every stretch of wall that just stops mid-air \u2014 that\u2019s September 26, 1687. War destroyed in one evening what twenty-one centuries of time could not.",
  },
];

const subtitle = "When a bomb destroyed what 2,000 years had preserved";
const excerpt =
  "For over two thousand years, the Parthenon had survived everything history threw at it. Earthquakes. Fires. Armies from half a dozen empires.";
const moralOrLesson =
  "War destroys what time cannot. The Parthenon stood for over two thousand years, then was blown apart in a single night. What we\u2019ve inherited is precious \u2014 and far more fragile than we think.";

const updatedAt = Math.floor(Date.now() / 1000);

const command = new UpdateCommand({
  TableName: "Story",
  Key: {
    siteId: "acropolis-athens",
    langStoryId: "en#venetian-explosion",
  },
  UpdateExpression:
    "SET paragraphs = :p, subtitle = :sub, excerpt = :exc, moralOrLesson = :mol, updatedAt = :ua",
  ExpressionAttributeValues: {
    ":p": paragraphs,
    ":sub": subtitle,
    ":exc": excerpt,
    ":mol": moralOrLesson,
    ":ua": updatedAt,
  },
  ReturnValues: "ALL_NEW",
});

try {
  const result = await docClient.send(command);
  console.log("Story updated successfully!");
  console.log("Updated fields:");
  console.log("  - title:", result.Attributes.title);
  console.log("  - subtitle:", result.Attributes.subtitle);
  console.log("  - paragraphs:", result.Attributes.paragraphs.length, "paragraphs");
  console.log("  - excerpt:", result.Attributes.excerpt.substring(0, 80) + "...");
  console.log("  - moralOrLesson:", result.Attributes.moralOrLesson.substring(0, 80) + "...");
  console.log("  - updatedAt:", result.Attributes.updatedAt);
  console.log("\nUntouched fields preserved:");
  console.log("  - siteId:", result.Attributes.siteId);
  console.log("  - storyId:", result.Attributes.storyId);
  console.log("  - lang:", result.Attributes.lang);
  console.log("  - era:", result.Attributes.era);
  console.log("  - characters:", result.Attributes.characters);
  console.log("  - coordinates:", result.Attributes.coordinates);
  console.log("  - storyCategory:", result.Attributes.storyCategory);
  console.log("  - icon:", result.Attributes.icon);
  console.log("  - tier:", result.Attributes.tier);
  console.log("  - source:", result.Attributes.source);
  console.log("  - isFree:", result.Attributes.isFree);
  console.log("  - disabled:", result.Attributes.disabled);
  console.log("  - hasAudio:", result.Attributes.hasAudio);

  // Print full paragraphs for verification
  console.log("\n--- FULL PARAGRAPHS ---");
  result.Attributes.paragraphs.forEach((p, i) => {
    console.log(`\n[P${i + 1}] (${p.text.length} chars, ${p.text.split(/\s+/).length} words)`);
    console.log(p.text);
  });

  const totalChars = result.Attributes.paragraphs.reduce(
    (sum, p) => sum + p.text.length,
    0
  );
  console.log(`\nTotal: ${totalChars} characters across ${result.Attributes.paragraphs.length} paragraphs`);
} catch (err) {
  console.error("Failed to update story:", err);
  process.exit(1);
}
