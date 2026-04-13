import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: `It\u2019s 366 AD, and a Buddhist monk named Yuezun is walking through the Gobi Desert, following the Silk Road \u2014 the ancient trade route that connected China to the rest of the known world. He\u2019s tired, sun-beaten, and completely alone. Then he reaches a cliff face near the oasis town of Dunhuang, right as the sun starts going down. And that\u2019s when everything changes.`,
  },
  {
    text: `As the last light hits the sandstone, the entire cliff seems to catch fire with golden light. And in that glow, Yuezun sees something that stops him cold \u2014 a thousand Buddhas, glowing and enormous, alive with compassion. Maybe it was a spiritual vision. Maybe it was just the desert sun doing something incredible to the stone. It didn\u2019t matter. Yuezun dropped to his knees and made a vow on the spot.`,
  },
  {
    text: `He would turn this cliff into something sacred. With his own hands, Yuezun carved the first meditation cave into the rock. Not long after, another monk named Faliang showed up and carved a second one right beside it. Two small caves in a desert cliff. That\u2019s how it started.`,
  },
  {
    text: `Here\u2019s where it gets wild. Word spread along the Silk Road, and people kept coming \u2014 monks, artists, merchants, pilgrims. Over the next thousand years, generation after generation carved and painted nearly 500 caves into that same cliff. Dunhuang sat at a major crossroads of the busiest trade network on Earth. Wealthy merchants funded entire caves as prayers for safe passage through the desert.`,
  },
  {
    text: `These weren\u2019t empty rooms. Every cave was a masterpiece. Walls covered floor-to-ceiling with paintings of Buddhas, spirits, and everyday life along the Silk Road. Ceilings alive with flying heavenly figures. Giant Buddha statues \u2014 the tallest over a hundred feet \u2014 carved straight out of the cliff. In total, the Mogao Caves hold over 45,000 square meters of wall paintings. That\u2019s enough art to cover about eight football fields.`,
  },
  {
    text: `Then the Silk Road died. By the 1400s, sea routes had replaced overland trade, and Dunhuang emptied out. The caves were left to the desert. Sand piled against the entrances. Paintings sat in darkness. For nearly five hundred years, one of the greatest art collections ever created just sat there in the silence, completely forgotten.`,
  },
  {
    text: `In 1900, a Taoist priest named Wang Yuanlu was clearing sand from one of the caves when he found a hidden door. Behind it lay a sealed chamber packed with over 50,000 ancient manuscripts, paintings, and silk banners \u2014 some more than a thousand years old. It was one of the most important discoveries in history, and the Mogao Caves were finally back in the light.`,
  },
  {
    text: `Today, they\u2019re a UNESCO World Heritage Site and one of the most important art collections on the planet. All of it traces back to one tired monk, standing alone in the desert at sunset, watching light hit a cliff and seeing something nobody else could see. Sometimes that\u2019s all it takes \u2014 one person who looks at a wall of stone and sees a thousand golden Buddhas.`,
  },
];

const excerpt = `It\u2019s 366 AD, and a Buddhist monk named Yuezun is walking through the Gobi Desert, following the Silk Road \u2014 the ancient trade route that connected China to the rest of the known world.`;

async function main() {
  const now = Math.floor(Date.now() / 1000);

  const cmd = new UpdateCommand({
    TableName: "Story",
    Key: {
      siteId: "mogao-caves",
      langStoryId: "en#yuezun-thousand-buddhas",
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

  const result = await docClient.send(cmd);
  const item = result.Attributes;

  console.log("Updated successfully!");
  console.log(`  siteId:       ${item.siteId}`);
  console.log(`  langStoryId:  ${item.langStoryId}`);
  console.log(`  title:        ${item.title}`);
  console.log(`  subtitle:     ${item.subtitle}`);
  console.log(`  excerpt:      ${item.excerpt.slice(0, 80)}...`);
  console.log(`  paragraphs:   ${item.paragraphs.length} paragraphs`);
  console.log(`  updatedAt:    ${item.updatedAt}`);
  console.log();

  // Print each paragraph with char/word counts for verification
  item.paragraphs.forEach((p, i) => {
    const chars = p.text.length;
    const words = p.text.split(/\s+/).length;
    console.log(`  P${i + 1}: ${chars} chars, ${words} words`);
    console.log(`      "${p.text.slice(0, 70)}..."`);
  });

  const totalChars = item.paragraphs.reduce((s, p) => s + p.text.length, 0);
  const totalWords = item.paragraphs.reduce(
    (s, p) => s + p.text.split(/\s+/).length,
    0
  );
  console.log();
  console.log(`  TOTAL: ${totalChars} chars, ${totalWords} words, ${item.paragraphs.length} paragraphs`);
}

main().catch((err) => {
  console.error("FAILED:", err.message);
  process.exit(1);
});
