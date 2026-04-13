import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: `The Bedouin never called it a tomb. They called it Khaznat al-Firaun — the Treasury of the Pharaoh — and swore no human hand had ever touched it. The legend said the Egyptian Pharaoh didn't drown chasing Moses through the Red Sea. He survived, tracked Moses south into the mountains, dragging cartloads of stolen gold. When the gorge got too narrow for his chariots, he did what any sorcerer-king would do. He summoned the djinn.`,
  },
  {
    text: `Djinn, in Islamic tradition, are beings made of smokeless fire — powerful spirits between the human world and the divine. The Quran says King Solomon once commanded them to build his temple in Jerusalem. Now the Pharaoh called on that same power. And the djinn answered. In a single night, they carved a facade forty meters tall from a cliff face. Columns, statues of gods, hidden chambers — all from solid rock. At the top, they placed a stone urn and sealed the gold inside. Then they vanished.`,
  },
  {
    text: `For centuries, the Bedouin believed the gold was really up there. This wasn't just campfire talk — they were shooting at it. Travelers in the 1700s and 1800s found the urn covered in hundreds of bullet holes, fired by generations of tribesmen trying to crack it open. Here's the thing: the urn is solid rock, carved straight from the cliff. There was never anything inside. But those bullet scars are still there — a monument to how badly people wanted the legend to be true.`,
  },
  {
    text: `The real builders were more impressive than any spirit. Around the first century AD, the Nabataeans — Arab nomads turned into the wealthiest traders in the Middle East — carved this as a royal tomb for their greatest king, Aretas IV. The facade is pure power: Greek-style columns, sculptures of gods guarding the afterlife, eagles to carry souls to heaven. It was placed so everyone entering Petra through the narrow canyon would see it first — and know whose kingdom they'd just walked into.`,
  },
  {
    text: `No European had seen it for a thousand years. In 1812, Swiss explorer Johann Ludwig Burckhardt slipped in disguised as Sheikh Ibrahim. He'd spent three years learning Arabic and the Quran for this moment. His cover: sacrificing a goat at the tomb of Prophet Aaron. His guide led him through a canyon ninety meters deep. When they emerged, the Treasury filled his view. "I see you are an infidel," the guide said. Burckhardt retreated — but he'd just found one of the greatest lost cities on Earth.`,
  },
  {
    text: `In 2003, archaeologists dug under the Treasury and found what the legend had always hidden. Not gold — graves. Six meters down, they uncovered chambers with the remains of at least eleven people, ceramic vessels and incense beside them. In 2024, another team found twelve more skeletons nearby, untouched for two thousand years. The Treasury was never a vault. From the start, it was a tomb for the most important people in the kingdom, right where everyone entering the city would pass.`,
  },
  {
    text: `The legend still won't die. Steven Spielberg turned the Treasury into the hiding place of the Holy Grail in Indiana Jones and the Last Crusade. The actual rooms behind that facade? Small, bare, plain — nothing like the movie. But it doesn't matter. There's something about the way dawn light hits that sandstone and turns it the color of living fire that makes even the most skeptical person stop. Maybe the djinn were real. Maybe the gold is still in there, deeper than anyone has ever dug.`,
  },
];

// Validate constraints before pushing
let totalChars = 0;
for (let i = 0; i < paragraphs.length; i++) {
  const text = paragraphs[i].text;
  const chars = text.length;
  const words = text.split(/\s+/).length;
  totalChars += chars;
  console.log(`P${i + 1}: ${chars} chars, ${words} words`);
  if (chars > 500) console.warn(`  ⚠️  P${i + 1} exceeds 500 char limit`);
  if (words > 100) console.warn(`  ⚠️  P${i + 1} exceeds 100 word limit`);
}
console.log(`\nTotal: ${totalChars} chars, ${paragraphs.length} paragraphs`);
console.log(
  `Target: ~3000 chars (±20% = 2400–3600). ${totalChars >= 2400 && totalChars <= 3600 ? "✅ Within range" : "⚠️  Outside range"}`
);

// Push to DynamoDB — only update paragraphs and updatedAt
const result = await docClient.send(
  new UpdateCommand({
    TableName: "Story",
    Key: {
      siteId: "petra",
      langStoryId: "en#treasury-carved-by-djinn",
    },
    UpdateExpression: "SET paragraphs = :p, updatedAt = :u",
    ExpressionAttributeValues: {
      ":p": paragraphs,
      ":u": Math.floor(Date.now() / 1000),
    },
    ReturnValues: "NONE",
  })
);

console.log(`\n✅ Updated successfully (HTTP ${result.$metadata.httpStatusCode})`);
