import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const paragraphs = [
  `In March 1959, a twenty-three-year-old monk held the fate of an entire religion in his hands. His name was Tenzin Gyatso — the Fourteenth Dalai Lama — and the Chinese army had just surrounded his city of Lhasa, the capital of Tibet. Their demand: come to a military camp, alone, for what they called a "cultural performance." Nobody in Tibet was fooled.`,

  `Thirty thousand Tibetans tried to save him. They streamed to the Norbulingka, his summer palace, and formed a human wall around it — farmers, monks, mothers holding children. They stood shoulder to shoulder, daring the Chinese army to come through them. It was the kind of courage that breaks your heart, because everyone there knew how this standoff would end.`,

  `So on the night of March 17th, the most recognizable person in Tibet vanished. He stripped off his monk's robes, took off his glasses, slung a rifle over his shoulder, and walked out dressed as a common soldier. He crossed the Kyichu River in the dark and slipped right past the crowd that had gathered to protect him. Not one person recognized their spiritual leader. He later wrote: "I was walking to freedom, and yet I felt I was leaving my people behind."`,

  `What followed was two weeks of hell through the Himalayas. Mountain passes above 5,000 meters — higher than anything in Europe — in blinding snowstorms and bone-deep cold. Chinese military planes swept overhead, searching. The Dalai Lama was sick, exhausted, barely eating. Fifteen days of pushing through the highest terrain on Earth, never knowing if the next valley held freedom or a firing squad.`,

  `He crossed into India on March 31st. Prime Minister Nehru granted him asylum, and the Dalai Lama set up a Tibetan government-in-exile in Dharamsala, a quiet hill town in northern India. It's still running today — over sixty years later. Back in Tibet, the uprising was crushed. Tens of thousands of Tibetans were killed, the Potala Palace was turned into a museum, and three hundred years of the Dalai Lama's rule ended overnight.`,

  `He has never gone back. Now ninety years old, he's suggested he might be the last Dalai Lama — or that the next one could be found outside Tibet, perhaps even a woman. An unbroken line of spiritual leaders stretching back to the 1600s could end with the man who walked out of a palace gate at twenty-three.`,

  `And yet every day, Tibetan pilgrims walk clockwise around the Potala Palace, spinning prayer wheels and whispering the same words: "May His Holiness return in this life." Over sixty years of that prayer. Over sixty years of believing. Sometimes the bravest thing a leader can do is walk away — not to abandon his people, but to make sure their faith outlives everything that tried to destroy it.`,
];

const excerpt = paragraphs[0];
const now = Math.floor(Date.now() / 1000);

// Validate constraints before pushing
let totalChars = 0;
for (let i = 0; i < paragraphs.length; i++) {
  const chars = paragraphs[i].length;
  const words = paragraphs[i].split(/\s+/).length;
  totalChars += chars;
  console.log(`P${i + 1}: ${chars} chars, ${words} words`);
  if (chars > 500) console.warn(`  ⚠️  P${i + 1} exceeds 500 char limit!`);
  if (words > 100) console.warn(`  ⚠️  P${i + 1} exceeds 100 word limit!`);
}
console.log(`\nTotal: ${totalChars} chars, ${paragraphs.length} paragraphs`);
console.log(`Target: ~3000 chars ±20% (2400-3600)`);
if (totalChars < 2400 || totalChars > 3600) {
  console.warn(`⚠️  Total chars outside acceptable range!`);
}

const dynamoParagraphs = paragraphs.map((text) => ({
  M: { text: { S: text } },
}));

const command = new UpdateItemCommand({
  TableName: "Story",
  Key: {
    siteId: { S: "potala-palace" },
    langStoryId: { S: "en#dalai-lama-escape-1959" },
  },
  UpdateExpression:
    "SET paragraphs = :p, excerpt = :e, updatedAt = :u",
  ExpressionAttributeValues: {
    ":p": { L: dynamoParagraphs },
    ":e": { S: excerpt },
    ":u": { N: String(now) },
  },
  ReturnValues: "ALL_NEW",
});

try {
  const result = await client.send(command);
  console.log("\n✅ Story updated successfully!");
  console.log(`Updated at: ${new Date(now * 1000).toISOString()}`);
  console.log(`Paragraphs: ${result.Attributes.paragraphs.L.length}`);
  console.log(`Title: ${result.Attributes.title.S}`);
  console.log(`Excerpt: ${result.Attributes.excerpt.S.substring(0, 80)}...`);
} catch (err) {
  console.error("❌ Update failed:", err.message);
  process.exit(1);
}
