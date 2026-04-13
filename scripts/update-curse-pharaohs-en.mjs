import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const ddb = DynamoDBDocumentClient.from(client);

const siteId = "great-pyramids-giza";
const langStoryId = "en#curse-of-the-pharaohs-original";

const paragraphs = [
  {
    text: `Everyone knows the "Curse of the Pharaohs" — the story about how people who opened King Tut's tomb in 1922 started dying mysteriously. But centuries before any European archaeologist set foot inside a pyramid, Arab scholars in medieval Cairo were writing about something far older and far stranger. Not curses carved into walls. Living guardians — spirits the pharaohs themselves had bound to the stone, waiting in the darkness for anyone foolish enough to enter.`,
  },
  {
    text: `The most detailed account comes from al-Maqrizi, an Egyptian historian writing in the 1400s who gathered stories that were already ancient by his time — oral traditions stretching back to the age of the pharaohs. According to what he recorded, the kings who built the pyramids weren't just master architects. They were masters of something else entirely. Before sealing their tombs, they performed rituals to summon djinn — powerful spirits — and bound them to guard these places for eternity.`,
  },
  {
    text: `The most feared guardian of the Great Pyramid appeared as a breathtakingly beautiful woman. She came to men who entered at night, and the sight of her destroyed them. They'd stumble back out unable to speak, unable to recognize their own families. Some wandered into the desert and never came back. The few who partially recovered could only say that her beauty was so far beyond anything human that the mind couldn't hold it — like staring at the sun, but worse. It didn't blind you. It broke you.`,
  },
  {
    text: `The second guardian took the form of a young boy with honey-colored skin and golden eyes that glowed like lanterns in the dark. This djinn targeted tomb robbers specifically, appearing just ahead of them in the tunnels, always out of reach, leading them deeper into passages that shifted and rearranged behind them. Some of these intruders were found years later — sealed inside chambers with no visible entrance, their hair turned white, their minds completely gone.`,
  },
  {
    text: `The third pyramid — built by the pharaoh Menkaure, smallest of the three at Giza — had its own protector: a figure wrapped in a spinning column of sand. When it moved through the corridors, every torch died instantly. Total darkness. And in that darkness, voices — speaking a language dead for three thousand years. The Arab explorers of that era took it seriously. Before stepping inside, they recited the Quran, treating these places less like ruins and more like something still alive.`,
  },
  {
    text: `Modern scholars dismiss all of this as folklore. But the people who live and work in the shadow of the pyramids tell a different story. Guards report cold spots in sealed chambers with no airflow. Workers hear stone grinding against stone in rooms where nothing moves. And almost everyone describes the same thing: a heavy, unmistakable feeling of being watched by something ancient and aware. Four and a half thousand years on, the pyramids still keep their secrets — and maybe their guardians too.`,
  },
];

const excerpt =
  "Centuries before King Tut's tomb made headlines, Arab scholars in medieval Cairo wrote about something far older guarding the pyramids — living spirits bound to the stone, waiting in the darkness for anyone foolish enough to enter.";

async function main() {
  // First, fetch the current item to verify it exists
  const { GetCommand } = await import("@aws-sdk/lib-dynamodb");
  const existing = await ddb.send(
    new GetCommand({
      TableName: "Story",
      Key: { siteId, langStoryId },
    })
  );

  if (!existing.Item) {
    console.error("Story not found!");
    process.exit(1);
  }

  console.log("Found existing story:", existing.Item.title);
  console.log("Current paragraph count:", existing.Item.paragraphs.length);
  console.log("---");

  // Update only paragraphs, excerpt, and updatedAt
  const result = await ddb.send(
    new UpdateCommand({
      TableName: "Story",
      Key: { siteId, langStoryId },
      UpdateExpression:
        "SET paragraphs = :p, excerpt = :e, updatedAt = :u",
      ExpressionAttributeValues: {
        ":p": paragraphs,
        ":e": excerpt,
        ":u": Math.floor(Date.now() / 1000),
      },
      ReturnValues: "ALL_NEW",
    })
  );

  console.log("Update successful!");
  console.log("Title:", result.Attributes.title);
  console.log("New paragraph count:", result.Attributes.paragraphs.length);
  console.log("New excerpt:", result.Attributes.excerpt);
  console.log("---");

  // Verify each paragraph
  result.Attributes.paragraphs.forEach((p, i) => {
    const charCount = p.text.length;
    const wordCount = p.text.split(/\s+/).length;
    console.log(
      `P${i + 1}: ${charCount} chars, ${wordCount} words${charCount > 500 ? " ⚠️ OVER 500 CHARS" : " ✓"}`
    );
  });

  const totalChars = result.Attributes.paragraphs.reduce(
    (sum, p) => sum + p.text.length,
    0
  );
  console.log(`\nTotal: ${totalChars} chars, ${result.Attributes.paragraphs.length} paragraphs`);
}

main().catch(console.error);
