import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client);

const paragraphs = [
  {
    text: `In 522 BCE, the Persian Empire stretched from Libya to India — the biggest the world had ever seen. Its king, Bardiya, son of Cyrus the Great, had just waived taxes across the empire. People loved him. Then one night, seven noblemen broke into his fortress. In the dark, one wrestled the king while Darius held back, afraid of stabbing his own ally. The man pinning him screamed: "Strike, even if you hit us both!" Darius drove his blade home. They cut off the king's head and showed it to the crowd.`,
  },
  {
    text: `Darius was no heir — a minor noble nobody had considered for the throne. What he did next changed everything. On a sheer cliff in the Zagros Mountains, a hundred meters above an ancient road, he carved the largest royal inscription ever seen — in three languages. In it, he rewrote reality. The man they killed? Not the real Bardiya. The real prince had been secretly murdered months earlier. A look-alike priest named Gaumata had stolen the throne. Darius, chosen by God, restored truth.`,
  },
  {
    text: `Here's the problem: almost no modern historian believes him. Darius is the only source for his own story. The entire empire — including people who knew Bardiya personally — accepted the king as real. The tax breaks make more sense from a real ruler than a desperate fraud. After the coup, Darius married Cyrus's daughter and Bardiya's daughter — moves you make to absorb a bloodline, not restore one. Leading scholars say it plainly: he murdered the rightful king and invented the cover story.`,
  },
  {
    text: `The empire didn't buy it either. Nineteen revolts erupted across every major province in a single year. A second man even claimed to be Bardiya — which tells you how many Persians thought Darius was lying. He crushed them all with terrifying violence. One rebel had his nose, ears, and tongue cut off, one eye gouged out, then impaled for all to see. Every killing carried the same message: these men followed "the Lie," the cosmic enemy of Truth in Persian faith. Oppose Darius, oppose God himself.`,
  },
  {
    text: `Then — having won through blood and propaganda — Darius built one of history's most advanced civilizations. At Persepolis, workers from dozens of nations were paid, not enslaved. Women earned equal pay. Pregnant workers got extra rations. His roads ran so fast Herodotus wrote "Neither snow nor rain nor heat nor darkness of night" could slow his couriers — a line the US Postal Service made its motto twenty-four centuries later. The liar built something genuinely worth believing in.`,
  },
  {
    text: `The inscription stayed unreadable for two thousand years — until 1835, when a British officer named Henry Rawlinson started climbing. He copied ancient script one-handed, dangling from a ladder against the cliff face. He lowered a Kurdish boy on ropes to reach the hardest sections. It took twelve years. When he cracked it, it unlocked the writing system of ancient Mesopotamia — what the Rosetta Stone did for hieroglyphics. After two thousand years of silence, Darius was speaking again.`,
  },
  {
    text: `Today, he still stands carved into that cliff — foot on his enemy's back, nine rebel kings bound before him. Persepolis still rises from the plains of Iran, its columns reaching for the sky Darius said his god created. And the paradox has no clean answer: a killer who championed Truth, a propagandist who built something worth believing in, a man who founded the world's greatest empire on its most elaborate lie — and then spent his life making that lie real.`,
  },
];

// Validate constraints
let totalChars = 0;
let allValid = true;
for (let i = 0; i < paragraphs.length; i++) {
  const text = paragraphs[i].text;
  const charCount = text.length;
  const wordCount = text.split(/\s+/).length;
  totalChars += charCount;
  const ok = charCount <= 500 && wordCount <= 100;
  console.log(
    `P${i + 1}: ${charCount} chars, ${wordCount} words ${ok ? "✓" : "✗ OVER LIMIT"}`
  );
  if (!ok) allValid = false;
}
console.log(`\nTotal: ${totalChars} chars, ${paragraphs.length} paragraphs`);
console.log(
  `Target: ~3000 chars (±20% = 2400–3600). ${totalChars >= 2400 && totalChars <= 3600 ? "✓ IN RANGE" : "✗ OUT OF RANGE"}`
);

if (!allValid) {
  console.error("\n✗ Some paragraphs exceed limits. Aborting.");
  process.exit(1);
}

const now = Math.floor(Date.now() / 1000);

const result = await docClient.send(
  new UpdateCommand({
    TableName: "Story",
    Key: {
      siteId: "persepolis",
      langStoryId: "en#king-who-conquered-the-lie",
    },
    UpdateExpression:
      "SET paragraphs = :p, updatedAt = :t, readingTimeMinutes = :r",
    ExpressionAttributeValues: {
      ":p": paragraphs,
      ":t": now,
      ":r": 4,
    },
    ReturnValues: "ALL_NEW",
  })
);

console.log("\n✓ Story updated successfully!");
console.log(`  updatedAt: ${now}`);
console.log(`  readingTimeMinutes: 4`);
console.log(`  paragraphs: ${result.Attributes.paragraphs.length}`);
console.log(`  title: ${result.Attributes.title}`);
