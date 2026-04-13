import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: `Picture this: it's 1801, and Greece doesn't belong to the Greeks. The Ottoman Empire — modern-day Turkey's predecessor — has ruled the country for over 350 years. Into this walks Thomas Bruce, a Scottish nobleman better known as the Earl of Elgin, freshly appointed as Britain's ambassador to the Ottoman court. He arrives in Athens with a permit to sketch and make plaster casts of the Parthenon's ancient sculptures. What he does next will spark a fight that's still raging over two centuries later.`,
  },
  {
    text: `Elgin didn't just sketch. He brought teams of workers who sawed through marble, pried statues loose with crowbars, and shipped roughly half the Parthenon's surviving sculpture back to England. We're talking about 75 meters of intricate frieze, 15 carved battle scenes, and 17 larger-than-life figures from the temple's roofline. They even grabbed a Caryatid — one of the famous maiden-shaped columns — from the building next door.`,
  },
  {
    text: `The Greeks living under Ottoman occupation couldn't stop it, but they didn't stay silent. Workers cracked ancient joints apart, and pieces tumbled to the ground during removal. One Greek witness left behind a line that still cuts deep: "The Turks did not weep, but we wept." Even back in Britain, the poet Lord Byron was furious — he called Elgin a plunderer and wrote an entire poem cursing him for stripping Athens of its soul.`,
  },
  {
    text: `Elgin shipped everything to London and put the sculptures on display at his home. But the whole operation had nearly bankrupted him, so in 1816 he sold the collection to the British government. Parliament debated whether the purchase was ethical but voted yes anyway. The sculptures have been in the British Museum ever since, drawing millions of visitors a year. Greece has been asking for them back almost from the moment it won independence in 1832.`,
  },
  {
    text: `The British Museum's argument goes like this: we saved these sculptures. If Elgin hadn't taken them, pollution, war, or neglect might have destroyed them — and here in London, anyone on Earth can see them for free. Greece fires back: you took them while a foreign empire occupied our land. No Greek government ever gave permission. They belong on the Parthenon, the building they were literally carved for 2,500 years ago. Both sides have a point. Neither side is budging.`,
  },
  {
    text: `In 2009, Greece made its most powerful move yet — not with lawyers, but with architecture. Athens opened the new Acropolis Museum, a stunning glass building right at the foot of the Parthenon. Inside, there's a gallery built to the exact dimensions of the original temple. The sculptures Greece still has sit in their original positions. Where the London pieces should be, there are empty spaces. No labels needed. The gaps say everything.`,
  },
  {
    text: `Even the name is a battleground. Say "Elgin Marbles" and you're framing a British lord as their rightful owner. Say "Parthenon Sculptures" and you're saying they belong to Athens. These 2,500-year-old carvings were made to tell stories of gods and heroes. Now they tell a different one — about empire, ownership, and a question nobody has settled: when you take something beautiful from a conquered people, can you ever really call it yours?`,
  },
];

const excerpt =
  "Picture this: it's 1801, and Greece doesn't belong to the Greeks. A Scottish nobleman arrives with a permit to sketch the Parthenon. What he does next will spark a fight that's still raging.";

const moralOrLesson =
  "Who truly owns the past? The Parthenon sculptures debate asks whether cultural treasures belong to the nations that created them — or to whoever had the power to take them.";

const updatedAt = Math.floor(Date.now() / 1000);

const cmd = new UpdateCommand({
  TableName: "Story",
  Key: {
    siteId: "acropolis-athens",
    langStoryId: "en#elgin-marbles",
  },
  UpdateExpression:
    "SET paragraphs = :p, excerpt = :e, moralOrLesson = :m, updatedAt = :u",
  ExpressionAttributeValues: {
    ":p": paragraphs,
    ":e": excerpt,
    ":m": moralOrLesson,
    ":u": updatedAt,
  },
  ReturnValues: "ALL_NEW",
});

try {
  const result = await doc.send(cmd);
  console.log("Updated successfully!");
  console.log("Title:", result.Attributes.title);
  console.log("Paragraphs:", result.Attributes.paragraphs.length);
  console.log("Excerpt:", result.Attributes.excerpt);
  console.log("Moral:", result.Attributes.moralOrLesson);
  console.log("UpdatedAt:", result.Attributes.updatedAt);

  // Verify character counts
  let totalChars = 0;
  result.Attributes.paragraphs.forEach((p, i) => {
    const chars = p.text.length;
    const words = p.text.split(/\s+/).length;
    totalChars += chars;
    console.log(`  P${i + 1}: ${chars} chars, ${words} words`);
  });
  console.log(`  Total: ${totalChars} chars across ${result.Attributes.paragraphs.length} paragraphs`);
} catch (err) {
  console.error("Failed to update:", err);
  process.exit(1);
}
