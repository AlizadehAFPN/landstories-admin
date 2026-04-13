import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: `In 1472, Sophia Palaiologina — niece of the last Byzantine emperor — married Ivan III, Grand Prince of Russia. But her real dowry wasn't gold or land. It was hundreds of ancient Greek and Latin manuscripts, possibly the last surviving pieces of the legendary Library of Constantinople. Texts by Homer, Aristotle, and Cicero that the rest of the world believed were gone forever.`,
  },
  {
    text: `Ivan III had the collection locked in an underground vault beneath the Kremlin, safe from the fires that regularly tore through Moscow's wooden buildings. The vault was reportedly designed by Aristotele Fioravanti, the Italian architect who also built the Kremlin's Cathedral of the Assumption. Centuries of irreplaceable knowledge, sealed underground in the heart of Russia.`,
  },
  {
    text: `The collection grew under Ivan's grandson — Ivan IV, better known as Ivan the Terrible. Despite being one of history's most brutal rulers, the man was obsessed with books. He added hundreds of volumes, including rare texts on alchemy and Jewish mysticism. Around 1570, a German pastor named Johann Wetterman claimed he'd been shown the library and described scrolls "that could not be valued by any treasure on earth."`,
  },
  {
    text: `Then Ivan the Terrible died in 1584. And the library simply vanished.`,
  },
  {
    text: `Nobody knows what happened. Ivan spent his final years growing more paranoid by the day — he may have sealed the vault and taken its location to the grave. Others believe it was hidden during Russia's Time of Troubles, a devastating civil war from 1598 to 1613, and everyone who knew was killed in the chaos. Some say Moscow's relentless fires finally destroyed it. But the eyewitness accounts and Byzantine records suggest it was very real.`,
  },
  {
    text: `People have been hunting for it ever since. In 1724, Tsar Peter the Great sent an expedition beneath the Kremlin. They found nothing. In 1894, Professor Ignatius Stelletsky devoted his entire career to the search, mapping tunnels under the Kremlin until the new Soviet government shut him down. Then in the 1930s, Soviet dictator Joseph Stalin ordered his own secret search. His men found tunnels leading deeper underground. Stalin's response? He had them filled with concrete.`,
  },
  {
    text: `Think about that. The most powerful man in the Soviet Union found tunnels that might lead to the greatest lost library in history — and instead of exploring them, he sealed them shut. What was down there that scared him more than not knowing?`,
  },
  {
    text: `To this day, digging beneath certain parts of the Kremlin is forbidden. If the library still exists, it sits under one of the most guarded places on earth, locked behind centuries of secrets, tons of concrete, and layers of state security. Some believe that when it's finally found, it won't just be a collection of old books — it'll be the missing chapter of human civilization.`,
  },
];

const excerpt =
  "In 1472, Sophia Palaiologina — niece of the last Byzantine emperor — married Ivan III, Grand Prince of Russia. But her real dowry wasn't gold or land. It was hundreds of ancient Greek and Latin manuscripts, possibly the last surviving pieces of the legendary Library of Constantinople.";

const now = Math.floor(Date.now() / 1000);

const cmd = new UpdateCommand({
  TableName: "Story",
  Key: {
    siteId: "moscow-kremlin",
    langStoryId: "en#lost-library-ivan",
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
  console.log("✅ Updated successfully!");
  console.log(`   siteId: ${result.Attributes.siteId}`);
  console.log(`   langStoryId: ${result.Attributes.langStoryId}`);
  console.log(`   title: ${result.Attributes.title}`);
  console.log(`   updatedAt: ${result.Attributes.updatedAt}`);
  console.log(`   paragraphs: ${result.Attributes.paragraphs.length} paragraphs`);
  console.log(`   excerpt: ${result.Attributes.excerpt.substring(0, 80)}...`);
  console.log("\n--- Paragraph preview ---");
  result.Attributes.paragraphs.forEach((p, i) => {
    const chars = p.text.length;
    const words = p.text.split(/\s+/).length;
    console.log(`  P${i + 1} (${chars} chars, ${words} words): ${p.text.substring(0, 70)}...`);
  });
  const totalChars = result.Attributes.paragraphs.reduce((sum, p) => sum + p.text.length, 0);
  const totalWords = result.Attributes.paragraphs.reduce(
    (sum, p) => sum + p.text.split(/\s+/).length,
    0
  );
  console.log(`\n  Total: ${totalChars} chars, ${totalWords} words, ${result.Attributes.paragraphs.length} paragraphs`);
} catch (err) {
  console.error("❌ Failed to update:", err.message);
  process.exit(1);
}
