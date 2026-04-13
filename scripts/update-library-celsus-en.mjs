import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: `In 114 AD, in the Roman city of Ephesus — one of the largest cities in the ancient world, on what's now Turkey's western coast — a man named Celsus died. He'd been a Roman senator who rose all the way to consul, and eventually became governor of the entire province of Asia. His son Aquila could have honored him with a statue or a plaque. Instead, he did something nobody expected. He built his father the most beautiful library the world had ever seen.`,
  },
  {
    text: `Construction took about a decade, finishing around 125 AD. The Library of Celsus wasn't just big — it held around 12,000 scrolls, making it the third-largest library in the ancient world, behind only the legendary Library of Alexandria in Egypt and the rival collection at Pergamon. But what set it apart wasn't size. It was beauty. The two-story facade played tricks on your eye — the outer columns were slightly shorter than the center ones, making the whole building look even grander than it was.`,
  },
  {
    text: `Inside, the architects solved a problem that had ruined countless ancient texts: moisture. They built double walls with an air gap between them — basically ancient climate control — that kept humidity away from the scrolls stored in carved wall niches. At the entrance stood four statues representing the qualities Aquila most admired in his father: Wisdom, Knowledge, Intelligence, and Virtue. These weren't decoration. They were a son saying, "This is who my father was."`,
  },
  {
    text: `Here's where the story gets personal. Beneath the library floor, Aquila placed his father's marble coffin. This broke one of Rome's oldest rules — burying someone inside city walls was strictly forbidden. The fact that an exception was made tells you how deeply the people of Ephesus respected Celsus. So the building wasn't just a library. It was a tomb. A son had turned his grief into a gift for an entire city.`,
  },
  {
    text: `For over a century, the library thrived. Then, in 262 AD, Gothic raiders — Germanic warriors from the north who would eventually help bring down Rome itself — attacked Ephesus and set the interior on fire. The scrolls were lost forever. Earthquakes over the following centuries brought down what the flames hadn't, and slowly the library crumbled into rubble. For more than a thousand years, one of the ancient world's greatest buildings lay buried under dirt and broken stone.`,
  },
  {
    text: `In 1903, Austrian archaeologists began digging at the site. They found fragments of the facade scattered in the earth — columns, carvings, pieces of those four statues. Starting in 1970, a team began putting it all back together, stone by stone, like a massive ancient puzzle. By 1978, the facade stood again. Not a replica. The original stones, returned to the exact positions they'd held nearly two thousand years earlier.`,
  },
  {
    text: `Today, the Library of Celsus is the image of Ephesus — the thing everyone comes to see. Millions photograph that facade every year, most of them probably unaware that behind it lies one of history's greatest love stories between a father and son. It wasn't built to impress an emperor or show off political power. A grieving son decided that the best way to honor his father was to give the world a place to learn. Nearly two thousand years later, it's still working.`,
  },
];

const subtitle = "How a son's grief became the ancient world's greatest library";

const excerpt = paragraphs[0].text;

const updatedAt = Math.floor(Date.now() / 1000);

async function main() {
  const cmd = new UpdateCommand({
    TableName: "Story",
    Key: {
      siteId: "ephesus",
      langStoryId: "en#library-celsus",
    },
    UpdateExpression:
      "SET paragraphs = :p, subtitle = :sub, excerpt = :exc, updatedAt = :ts",
    ExpressionAttributeValues: {
      ":p": paragraphs,
      ":sub": subtitle,
      ":exc": excerpt,
      ":ts": updatedAt,
    },
    ReturnValues: "ALL_NEW",
  });

  const result = await doc.send(cmd);
  const item = result.Attributes;

  console.log("✅ Updated successfully!");
  console.log(`   siteId:       ${item.siteId}`);
  console.log(`   langStoryId:  ${item.langStoryId}`);
  console.log(`   title:        ${item.title}`);
  console.log(`   subtitle:     ${item.subtitle}`);
  console.log(`   paragraphs:   ${item.paragraphs.length}`);
  console.log(`   updatedAt:    ${item.updatedAt}`);
  console.log();

  // Verify: print each paragraph with char/word count
  let totalChars = 0;
  item.paragraphs.forEach((p, i) => {
    const chars = p.text.length;
    const words = p.text.split(/\s+/).length;
    totalChars += chars;
    console.log(`   P${i + 1}: ${chars} chars, ${words} words`);
  });
  console.log(`   Total: ${totalChars} chars across ${item.paragraphs.length} paragraphs`);

  // Verify unchanged fields
  console.log();
  console.log("   Unchanged fields verified:");
  console.log(`   icon:         ${item.icon}`);
  console.log(`   tier:         ${item.tier}`);
  console.log(`   era:          ${item.era}`);
  console.log(`   storyCategory:${item.storyCategory}`);
  console.log(`   isFree:       ${item.isFree}`);
  console.log(`   hasAudio:     ${item.hasAudio}`);
  console.log(`   source:       ${item.source}`);
}

main().catch((err) => {
  console.error("❌ Failed:", err.message);
  process.exit(1);
});
