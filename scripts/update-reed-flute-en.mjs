import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client);

const paragraphs = [
  {
    text: `In the year 1258, in the Turkish city of Konya, a heartbroken poet picked up his pen and wrote the opening lines of what would become the most celebrated poem in the Persian language. His name was Rumi. And he didn't start with wisdom or philosophy. He started with a sound — the cry of a reed flute.`,
  },
  {
    text: `"Listen to the reed, how it complains," Rumi wrote. The flute — called a ney — is made from a hollow reed cut from a riverbank. Once it's torn from the ground where it grew, it can never go back. And every note it plays, every mournful sound that comes out of it, is a cry of longing. The reed isn't making music. It's grieving.`,
  },
  {
    text: `The metaphor is brutally simple. The reed is the human soul. The riverbank is God — or the divine, or wherever we came from before we were born. Every time you feel restless for no reason, every time sadness hits and you can't explain why — that's the reed in you. That's your soul remembering a home it was torn from.`,
  },
  {
    text: `Rumi didn't pull this idea out of thin air. Before writing the Masnavi, he'd lived through a loss that wrecked him. A wandering mystic named Shams-i-Tabrizi had walked into his life and turned everything upside down. Shams wasn't a typical teacher — he challenged Rumi, provoked him, stripped away everything Rumi thought he knew about God and love. Then Shams vanished. Possibly murdered. Rumi never saw him again.`,
  },
  {
    text: `That grief broke Rumi open. He went from being a respected but conventional religious scholar to becoming one of the greatest poets who ever lived. The pain of losing Shams became the engine of everything he wrote. And when he sat down to write the Masnavi — a six-book epic poem so revered that followers of Sufism, Islam's mystical tradition, call it "the Quran in Persian" — he opened with the reed flute. Because the deepest truth about being human isn't joy. It's longing.`,
  },
  {
    text: `That poem shaped an entire spiritual practice. Rumi's followers became the Mevlevi order — the whirling dervishes you may have seen in photos, spinning in white robes. In their ceremonies, a ney player always begins first. The opening notes are deliberately raw and mournful, echoing the reed's original cry. Then the dervishes begin to turn, one palm facing heaven, one toward earth — not performing, but praying with their bodies.`,
  },
  {
    text: `Today, nearly eight centuries later, Rumi is the best-selling poet in America. His words show up on coffee mugs, tattoos, and Instagram posts. But that opening image — the reed flute crying because it remembers where it came from — remains the one that hits hardest. It doesn't matter what you believe. Everyone has felt that ache, that pull toward something you can't quite name.`,
  },
  {
    text: `Rumi's genius was capturing all of that in a few lines about a hollow piece of wood. We are all homesick for a home we can't quite remember — and the reed flute is the sound of that homesickness, given a voice.`,
  },
];

const excerpt = `In the year 1258, in the Turkish city of Konya, a heartbroken poet picked up his pen and wrote the opening lines of what would become the most celebrated poem in the Persian language. His name was Rumi.`;

// Validate constraints before pushing
let totalChars = 0;
for (let i = 0; i < paragraphs.length; i++) {
  const p = paragraphs[i];
  const chars = p.text.length;
  const words = p.text.split(/\s+/).length;
  totalChars += chars;
  console.log(`P${i + 1}: ${chars} chars, ${words} words`);
  if (chars > 500) {
    console.error(`ERROR: P${i + 1} exceeds 500 character limit!`);
    process.exit(1);
  }
  if (words > 100) {
    console.error(`ERROR: P${i + 1} exceeds 100 word limit!`);
    process.exit(1);
  }
}
console.log(`\nTotal: ${totalChars} chars, ${paragraphs.length} paragraphs`);

if (paragraphs.length < 6 || paragraphs.length > 10) {
  console.error(`ERROR: Paragraph count ${paragraphs.length} outside 6-10 range!`);
  process.exit(1);
}

const minChars = 3000 * 0.8; // 2400
const maxChars = 3000 * 1.2; // 3600
if (totalChars < minChars || totalChars > maxChars) {
  console.error(`ERROR: Total chars ${totalChars} outside ${minChars}-${maxChars} range!`);
  process.exit(1);
}

console.log("\nAll constraints pass. Pushing to DynamoDB...\n");

const command = new UpdateCommand({
  TableName: "Story",
  Key: {
    siteId: "mevlana-museum",
    langStoryId: "en#reed-flute",
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
  console.log("Successfully updated 'The Reed Flute' (en)");
  console.log(`Updated fields: paragraphs (${paragraphs.length}), excerpt, updatedAt`);
  console.log(`Title: ${result.Attributes.title}`);
  console.log(`Paragraphs: ${result.Attributes.paragraphs.length}`);
  console.log(`Excerpt: ${result.Attributes.excerpt.substring(0, 80)}...`);
} catch (err) {
  console.error("Failed to update:", err.message);
  process.exit(1);
}
