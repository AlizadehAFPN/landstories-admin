import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: `In the 1930s, archaeologists cracked open a wall at Persepolis \u2014 the capital of the ancient Persian Empire in modern Iran \u2014 and found thirty thousand clay tablets sealed inside. They were accounting records. Who got paid, how much grain, how many workers. Boring stuff. Until someone actually read them. Buried in those receipts was proof that the biggest empire on earth was paying women the same as men for the same work \u2014 twenty-five centuries before anyone else even started that conversation.`,
  },
  {
    text: `The tablets cover about fifteen years under King Darius the Great, around 500 BCE. They list workers from across the empire \u2014 Persians, Babylonians, Egyptians, Greeks, Indians \u2014 thousands of names, each with a job title and pay rate. And hundreds of those names belonged to women. Not slaves. Not servants. Paid workers and supervisors. When a woman did the same skilled job as a man, she got the same pay. Not as a one-off. Across thousands of records, over fifteen years. It was policy.`,
  },
  {
    text: `Here\u2019s where it gets wild. The tablets show that women who had just given birth received extra pay \u2014 basically government-funded maternity leave in the fifth century BCE. Not Athens, where women couldn\u2019t own property or leave the house without a man. Not Rome, where women were legally treated like children their entire lives. Persia. The civilization the Greeks called barbaric had built a system to support new mothers that wouldn\u2019t be matched anywhere in the West for over two thousand years.`,
  },
  {
    text: `Then there were the women at the very top. A woman named Irdabama appears across dozens of tablets running massive farming estates, commanding hundreds of workers, and signing off on shipments with her own personal seal \u2014 a carved image of a woman sitting on a throne. She traded grain, wine, and livestock at a scale that rivaled governors. No husband or father is ever mentioned approving her decisions. She answered to no one but the king.`,
  },
  {
    text: `But the real power player was Atossa. She was the daughter of Cyrus the Great \u2014 the man who built the Persian Empire from nothing. She married three kings in a row. The Greek historian Herodotus, who normally ignored Persian women, wrote that she held \u201Call power\u201D at court. When King Darius needed to choose his heir, Atossa made her move. She argued that her son Xerxes deserved the throne over his older half-brothers. She won. One woman decided who would rule the largest empire on earth.`,
  },
  {
    text: `For centuries, Western scholars looked at Persepolis and saw what they expected \u2014 harems, veiled women, and a backward empire. They even labeled one building \u201Cthe Harem of Xerxes\u201D with zero proof. But the tablets tell a completely different story. Royal women traveled freely between provinces, hosted feasts, managed estates, and controlled serious wealth. They weren\u2019t locked away behind walls. They were running the empire from inside them.`,
  },
  {
    text: `The Greeks wrote the history, so Persia got painted as a land of tyrants ruling over helpless women. The truth sat sealed in a wall for twenty-three centuries, baked hard by the fire Alexander the Great set when he burned Persepolis to the ground. It ended up in Chicago, where a quiet scholar named Richard Hallock spent decades decoding grain receipts that turned out to be the most revolutionary documents in the history of women\u2019s rights. They weren\u2019t grand declarations. They were pay stubs.`,
  },
];

const subtitle = `Thirty thousand clay tablets revealed what no Greek historian ever recorded \u2014 an empire that paid women equally, gave maternity leave, and was shaped by queens who made kings`;

const excerpt = `Sealed in the walls of Persepolis for twenty-three centuries, thirty thousand clay tablets revealed what no Greek historian ever bothered to write down: the biggest empire on earth paid women the same as men, supported new mothers, and was shaped at the top by queens who decided who sat on the throne.`;

const moralOrLesson = `For twenty-four centuries, the Western world told itself the Persian Empire was just another kingdom where women had no say. Then thirty thousand clay tablets cracked open that myth. They showed an empire where women earned equal pay, got maternity support, ran massive estates, and decided who sat on the throne. The proof was always there \u2014 sealed in a wall, baked by fire, and waiting for someone to actually read it.`;

// ── Validate constraints ────────────────────────────────────
console.log("\n=== CONSTRAINT VALIDATION ===\n");

let totalChars = 0;
let totalWords = 0;
let allPass = true;

paragraphs.forEach((p, i) => {
  const chars = p.text.length;
  const words = p.text.split(/\s+/).length;
  totalChars += chars;
  totalWords += words;
  const charOk = chars <= 500;
  const wordOk = words <= 100;
  const status = charOk && wordOk ? "PASS" : "FAIL";
  if (!charOk || !wordOk) allPass = false;
  console.log(
    `P${i + 1}: ${chars} chars ${charOk ? "\u2713" : "\u2717"} | ${words} words ${wordOk ? "\u2713" : "\u2717"} | ${status}`
  );
});

console.log(`\nTotal: ${totalChars} chars | ${totalWords} words | ${paragraphs.length} paragraphs`);
console.log(`Target: ~3000 chars (\u00b120% = 2400\u20133600)`);
console.log(
  `Range check: ${totalChars >= 2400 && totalChars <= 3600 ? "PASS \u2713" : "FAIL \u2717"}`
);
console.log(
  `Paragraph count (6-8+): ${paragraphs.length >= 6 && paragraphs.length <= 10 ? "PASS \u2713" : "FAIL \u2717"}`
);

if (!allPass) {
  console.error("\n\u274C Some paragraphs exceed limits. Aborting.");
  process.exit(1);
}

// ── Push to DynamoDB ────────────────────────────────────────
console.log("\n=== PUSHING TO DYNAMODB ===\n");

const command = new UpdateCommand({
  TableName: "Story",
  Key: {
    siteId: "persepolis",
    langStoryId: "en#women-who-ran-the-empire",
  },
  UpdateExpression:
    "SET paragraphs = :p, subtitle = :s, excerpt = :e, moralOrLesson = :m, readingTimeMinutes = :r, updatedAt = :u",
  ExpressionAttributeValues: {
    ":p": paragraphs,
    ":s": subtitle,
    ":e": excerpt,
    ":m": moralOrLesson,
    ":r": 4,
    ":u": Math.floor(Date.now() / 1000),
  },
  ReturnValues: "ALL_NEW",
});

try {
  const result = await docClient.send(command);
  console.log("Updated successfully! HTTP status:", result.$metadata.httpStatusCode);
  console.log("\nUpdated fields:");
  console.log("  - paragraphs:", result.Attributes.paragraphs.length, "paragraphs");
  console.log("  - subtitle:", result.Attributes.subtitle.substring(0, 60) + "...");
  console.log("  - excerpt:", result.Attributes.excerpt.substring(0, 60) + "...");
  console.log("  - moralOrLesson:", result.Attributes.moralOrLesson.substring(0, 60) + "...");
  console.log("  - readingTimeMinutes:", result.Attributes.readingTimeMinutes);
  console.log("  - updatedAt:", result.Attributes.updatedAt);
  console.log("\nUntouched fields (verified present):");
  console.log("  - title:", result.Attributes.title);
  console.log("  - siteId:", result.Attributes.siteId);
  console.log("  - storyId:", result.Attributes.storyId);
  console.log("  - icon:", result.Attributes.icon);
  console.log("  - tier:", result.Attributes.tier);
  console.log("  - era:", result.Attributes.era);
  console.log("  - source:", result.Attributes.source ? "present" : "MISSING");
  console.log("  - characters:", result.Attributes.characters?.length, "entries");
  console.log("  - coordinates:", JSON.stringify(result.Attributes.coordinates));
  console.log("  - storyCategory:", result.Attributes.storyCategory);
  console.log("  - isFree:", result.Attributes.isFree);
  console.log("  - hasAudio:", result.Attributes.hasAudio);
  console.log("  - disabled:", result.Attributes.disabled);
  console.log("\n\u2705 Done. Only text content fields were updated.");
} catch (err) {
  console.error("\u274C Update failed:", err.message);
  process.exit(1);
}
