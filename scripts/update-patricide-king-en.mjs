import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: `In 473 CE, a prince named Kashyapa killed his own father \u2014 and then tried to outrun the guilt by building his throne in the sky. His father, King Dhatusena, ruled Anuradhapura, the ancient capital of Sri Lanka. Dhatusena was a builder-king who created the Kala Wewa \u2014 a massive reservoir covering six thousand acres that kept the kingdom\u2019s rice paddies alive. But Kashyapa\u2019s mother was a lower-caste woman, which meant the throne was promised to his younger half-brother Moggallana, the queen\u2019s son.`,
  },
  {
    text: `That resentment found a partner. Migara, the king\u2019s nephew and army commander, wanted revenge \u2014 Dhatusena had executed Migara\u2019s mother. Together, they turned the army against the king. Dhatusena was thrown in chains. Then came the moment the chronicles never forgot. Kashyapa dragged his father to the Kala Wewa and demanded to know where the treasury was hidden. The old king knelt at the water\u2019s edge, cupped the water in his chained hands, and said: \u201CThis is all the wealth I possess.\u201D`,
  },
  {
    text: `It was a final act of dignity from a king who understood that his real legacy was the water he gave his people \u2014 not gold. Kashyapa didn\u2019t care. Migara took his revenge. They stripped the old king naked, chained him, and sealed him alive inside a brick wall. Dhatusena \u2014 the man who built reservoirs to give life \u2014 died slowly, in darkness, buried inside the kind of wall his own genius had taught his people to build.`,
  },
  {
    text: `In Buddhist belief, killing your father is the worst thing a person can do \u2014 a sin so grave that no prayer or good deed can undo it. The monks of Anuradhapura refused to accept Kashyapa as king. The people called him \u201CKashyapa the Patricide.\u201D His half-brother Moggallana escaped across the sea to southern India, where he began raising an army to take back the throne. Kashyapa held the crown, but the crown held no honor.`,
  },
  {
    text: `So he did something no king had ever done. He abandoned the sacred capital entirely and moved his kingdom to a place that barely seemed real \u2014 a granite rock rising a hundred and eighty meters straight out of the flat jungle, with a summit about the size of two football fields. Buddhist monks had meditated in its caves for centuries, but nobody had ever tried to live on top of it. Kashyapa looked at that rock and saw a throne that no army could reach and no monk could judge.`,
  },
  {
    text: `What he built over eighteen years was jaw-dropping. At the base: water gardens so precise that their fountains still work fifteen hundred years later. Along the ascent: frescoes of celestial women on the cliff face, a wall polished to a mirror finish, and \u2014 at the top \u2014 the entrance through the jaws of a massive stone lion, twenty meters tall. Visitors walked into its mouth to reach the summit. Up there: a full palace with a pool the size of an Olympic swimming pool, carved from solid rock.`,
  },
  {
    text: `Kashyapa declared himself a god-king. He issued gold coins, opened trade ports, and donated a monastery to the monks who\u2019d rejected him. Every painted goddess, every impossible fountain screamed the same thing: I am worthy. I deserve this. But the chroniclers saw right through it. They understood what Kashyapa never could \u2014 he hadn\u2019t built a paradise. He\u2019d built the most beautiful prison in the world. And no fortress, however high, can protect a man from the thing that already lives inside him.`,
  },
];

async function main() {
  const now = Math.floor(Date.now() / 1000);

  const result = await docClient.send(
    new UpdateCommand({
      TableName: "Story",
      Key: {
        siteId: "sigiriya",
        langStoryId: "en#patricide-king",
      },
      UpdateExpression:
        "SET paragraphs = :p, readingTimeMinutes = :r, updatedAt = :u",
      ExpressionAttributeValues: {
        ":p": paragraphs,
        ":r": 3,
        ":u": now,
      },
      ReturnValues: "ALL_NEW",
    })
  );

  console.log("Successfully updated 'The Patricide King' (en)");
  console.log("Paragraphs:", result.Attributes.paragraphs.length);
  console.log("Reading time:", result.Attributes.readingTimeMinutes, "min");
  console.log("Updated at:", new Date(now * 1000).toISOString());

  // Verify character counts
  result.Attributes.paragraphs.forEach((p, i) => {
    const chars = p.text.length;
    const words = p.text.split(/\s+/).length;
    console.log(`  P${i + 1}: ${chars} chars, ${words} words`);
  });
}

main().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
