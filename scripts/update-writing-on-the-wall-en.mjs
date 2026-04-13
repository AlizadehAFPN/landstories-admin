import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: `Here's a fact that should haunt every powerful person on earth: the greatest empire of the ancient world didn't fall to a siege. It fell during a party. On the night of October 12, 539 BCE, Babylon — the most fortified city anyone had ever built, with walls so thick chariots could race on top of them — was conquered while its rulers were getting drunk. The Persian army was camped outside the gates. And inside? They were pouring wine.`,
  },
  {
    text: `The real problem wasn't the enemy outside — it was the king who wasn't home. Nabonidus, Babylon's last king, had left his own capital a decade earlier to live in a desert oasis called Tayma, a thousand kilometers away. He left his son Belshazzar to run the empire. The most sacred festival in Babylonian life — the one that renewed the king's right to rule — went uncelebrated for ten years. The priests were furious. The people were terrified. And Persia was closing in.`,
  },
  {
    text: `On that final night, Belshazzar threw a feast for a thousand nobles. Then he made a choice that still echoes through history. He ordered servants to bring out the gold and silver cups that Nebuchadnezzar — Babylon's greatest king — had looted from the Jewish Temple in Jerusalem nearly fifty years earlier. These were sacred vessels, dedicated to the God of Israel. Belshazzar and his guests drank from them like party cups, toasting their own gods of gold and stone.`,
  },
  {
    text: `That's when it happened. A human hand — no arm, no body, just fingers — appeared out of nowhere and began writing on the palace wall. Belshazzar watched it happen in real time. His face went white. His knees buckled. He screamed for every wise man and astrologer in Babylon, promising riches and power to whoever could read the words. Nobody could.`,
  },
  {
    text: `Finally, someone remembered Daniel — a Jewish exile, now an old man, brought to Babylon as a teenager sixty-six years earlier. He walked in, refused the rewards, and read the wall: MENE, MENE, TEKEL, UPHARSIN. They were Aramaic and worked on two levels. As nouns, they were shrinking units of weight — a mina, a shekel, a half-mina — tracing the fading worth of Babylon's rulers. As verbs, they were a death sentence: Numbered. Weighed. Divided. Your kingdom is done, and Persia is taking it tonight.`,
  },
  {
    text: `That same night, the Persians made their move. Cyrus the Great — the Persian king who'd already conquered half the known world — sent his engineers to divert the Euphrates River upstream. The river ran straight through Babylon, in and out through gates in the massive walls. When the water dropped, Persian soldiers waded up the shallow riverbed, slipped under the unguarded river gates, and took the city from the inside. Babylon fell without a fight.`,
  },
  {
    text: `Belshazzar was dead before sunrise. Cyrus entered Babylon seventeen days later — not as a destroyer, but as a liberator. He restored the neglected temples, honored local gods, and issued a decree that changed history: the exiled Jews could go home and rebuild their Temple in Jerusalem. The Babylonian Captivity — nearly fifty years of forced exile — was over. The sacred cups Belshazzar had partied with would return to the city they were stolen from.`,
  },
  {
    text: `There's a reason "the writing on the wall" became one of the most famous phrases in any language. It captures something everyone recognizes: that moment right before everything falls apart, when the signs are everywhere and the people in charge are too busy celebrating to notice. Empires don't announce their end. They throw parties. They drink from golden cups. And somewhere, in words they refuse to read, the verdict has already been written.`,
  },
];

const excerpt = `On the last night of the Babylonian Empire, a Persian army waited outside the walls. Inside, the crown prince threw a feast for a thousand guests and poured wine into golden cups stolen from Jerusalem's Temple. Then a hand appeared out of thin air and wrote his empire's death sentence on the wall.`;

const subtitle = `MENE, MENE, TEKEL, UPHARSIN — the night a mysterious hand wrote an empire's death sentence on a palace wall`;

const moralOrLesson = `Empires don't announce their end. They throw feasts. They drink from golden cups. They count their walls and tell themselves that what's stood for centuries can't fall in a single night. But history keeps its own score, and every kingdom gets weighed in the balance — mene, tekel, upharsin — numbered, weighed, divided. The writing is always on the wall. The question is whether anyone's sober enough to read it.`;

// Validate constraints before pushing
console.log("\n=== PRE-PUSH VALIDATION ===\n");

let totalChars = 0;
let allValid = true;

paragraphs.forEach((p, i) => {
  const chars = p.text.length;
  const words = p.text.split(/\s+/).length;
  totalChars += chars;
  const charOk = chars <= 500;
  const wordOk = words <= 100;
  const status = charOk && wordOk ? "✅" : "❌";
  if (!charOk || !wordOk) allValid = false;
  console.log(
    `${status} P${i + 1}: ${chars} chars, ${words} words${!charOk ? " [OVER CHAR LIMIT]" : ""}${!wordOk ? " [OVER WORD LIMIT]" : ""}`
  );
});

console.log(`\nTotal paragraphs: ${paragraphs.length} (target: 6-8)`);
console.log(`Total characters: ${totalChars} (target: ~3000 ±20% = 2400-3600)`);
console.log(`Excerpt: ${excerpt.length} chars`);
console.log(`Subtitle: ${subtitle.length} chars`);
console.log(`Moral: ${moralOrLesson.length} chars`);

const totalOk =
  totalChars >= 2400 && totalChars <= 3600 && paragraphs.length >= 6 && paragraphs.length <= 10;
if (!totalOk) allValid = false;

if (!allValid) {
  console.log("\n❌ VALIDATION FAILED — aborting push.");
  process.exit(1);
}

console.log("\n✅ All checks passed. Pushing to DynamoDB...\n");

const command = new UpdateCommand({
  TableName: "Story",
  Key: {
    siteId: "babylon",
    langStoryId: "en#writing-on-the-wall",
  },
  UpdateExpression:
    "SET paragraphs = :p, excerpt = :e, subtitle = :s, moralOrLesson = :m, readingTimeMinutes = :r, updatedAt = :u",
  ExpressionAttributeValues: {
    ":p": paragraphs,
    ":e": excerpt,
    ":s": subtitle,
    ":m": moralOrLesson,
    ":r": 3,
    ":u": Math.floor(Date.now() / 1000),
  },
  ReturnValues: "ALL_NEW",
});

try {
  const result = await docClient.send(command);
  console.log("✅ Successfully updated 'The Writing on the Wall' (en)");
  console.log(`   Updated fields: paragraphs, excerpt, subtitle, moralOrLesson, readingTimeMinutes, updatedAt`);
  console.log(`   Preserved fields: title, characters, era, source, icon, tier, coordinates, storyCategory, etc.`);
  console.log(`\n   New paragraph count: ${result.Attributes.paragraphs.length}`);
  console.log(`   New readingTimeMinutes: ${result.Attributes.readingTimeMinutes}`);
  console.log(`   New updatedAt: ${result.Attributes.updatedAt}`);
} catch (err) {
  console.error("❌ Failed to update:", err.message);
  process.exit(1);
}
