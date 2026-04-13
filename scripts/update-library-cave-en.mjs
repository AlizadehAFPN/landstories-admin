import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: `In 1900, a wandering Taoist monk named Wang Yuanlu was sweeping sand from a cave temple in China's Gobi Desert. He wasn't an archaeologist — just a self-taught priest who'd taken it upon himself to care for the crumbling Mogao Caves near Dunhuang. While clearing a painted corridor, he noticed a crack in the wall. Behind it was a sealed room, roughly ten feet square, packed floor to ceiling with manuscripts. About fifty thousand of them.`,
  },
  {
    text: `Nobody knows exactly who sealed that room or why. The best guess is that monks locked it up around 1002 AD — possibly to protect the manuscripts from invading armies, possibly because the cave had simply run out of space. Whatever the reason, the entrance was bricked shut and plastered over, and the desert did the rest. For nearly nine hundred years, the driest air on Earth kept those documents in almost perfect condition.`,
  },
  {
    text: `Wang didn't fully grasp what he'd stumbled on, but he knew it mattered. He told local officials. They shrugged. He wrote to provincial authorities. They told him to seal it back up. For seven years, Wang begged someone — anyone in power — to care about what might have been the greatest library discovery in history. Nobody did.`,
  },
  {
    text: `Then in 1907, a Hungarian-British explorer named Aurel Stein showed up. He'd trekked weeks through the desert on nothing but a rumor. The moment he saw the cave, he knew this was one of the most important document finds ever made. His move was cunning: he told Wang he was a devoted follower of Xuanzang, the legendary Buddhist monk from China's most famous story, "Journey to the West." He said destiny had sent him to carry these sacred texts westward. Wang, a deeply religious man, believed every word.`,
  },
  {
    text: `Stein left with twenty-four cases of manuscripts and five cases of paintings — roughly ten thousand items. He paid Wang almost nothing. A year later, French scholar Paul Pelliot arrived and handpicked another six thousand of the finest pieces. Japanese, Russian, and American teams followed, each helping themselves. By 1910, when the Chinese government finally stepped in and shipped what remained to Beijing, more than half the cave's contents had been carried off to foreign collections around the world.`,
  },
  {
    text: `Here's what makes this story ache: Wang spent every coin he received restoring the caves. He genuinely believed he was trading old paper for sacred stone, saving the temple he loved. He died in 1931 and was buried near the caves he'd spent his whole life protecting. He never understood that what he gave away was worth more than everything he built.`,
  },
  {
    text: `Among Stein's haul was the Diamond Sutra — a Buddhist text printed in 868 AD, making it the oldest dated printed book on Earth. It now lives in the British Library in London. Its full title translates from Sanskrit as "The Diamond That Cuts Through Illusion." A perfect name for a text taken from a man who never saw through the illusion he was living in.`,
  },
  {
    text: `Today, to study what came from one cave in the Chinese desert, you'd need plane tickets to London, Paris, Tokyo, and St. Petersburg. The Library Cave itself is empty now — a small, bare room where fifty thousand voices once sat in the dark for nine centuries. It turns out the greatest threat to a treasure isn't neglect or war. It's the moment someone finally shows up who knows exactly what it's worth.`,
  },
];

const excerpt =
  "In 1900, a wandering Taoist monk named Wang Yuanlu was sweeping sand from a cave temple in China's Gobi Desert.";

const moralOrLesson =
  "The greatest threat to a treasure isn't neglect or war — it's the moment someone shows up who knows exactly what it's worth.";

const now = Math.floor(Date.now() / 1000);

const cmd = new UpdateCommand({
  TableName: "Story",
  Key: {
    siteId: "mogao-caves",
    langStoryId: "en#library-cave-sealed",
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
  const result = await docClient.send(cmd);
  console.log("Updated successfully!");
  console.log("Title:", result.Attributes.title);
  console.log("Paragraphs:", result.Attributes.paragraphs.length);
  console.log("Excerpt:", result.Attributes.excerpt);
  console.log("Moral:", result.Attributes.moralOrLesson);
  console.log("Updated at:", new Date(result.Attributes.updatedAt * 1000).toISOString());

  // Print each paragraph with char count
  result.Attributes.paragraphs.forEach((p, i) => {
    console.log(`\n--- Paragraph ${i + 1} (${p.text.length} chars, ${p.text.split(/\s+/).length} words) ---`);
    console.log(p.text);
  });

  // Total character count
  const totalChars = result.Attributes.paragraphs.reduce((sum, p) => sum + p.text.length, 0);
  console.log(`\n=== Total: ${totalChars} characters, ${result.Attributes.paragraphs.length} paragraphs ===`);
} catch (err) {
  console.error("Update failed:", err);
  process.exit(1);
}
