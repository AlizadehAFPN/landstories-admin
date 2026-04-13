import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const ddb = DynamoDBDocumentClient.from(client);

const paragraphs = [
  {
    text: `For over a thousand years, the Oracle at Delphi was the most powerful voice in the ancient world. Kings, generals, and ordinary people traveled to this remote mountain sanctuary in central Greece to hear the future. The Pythia — a priestess who channeled the god Apollo — sat above a crack in the earth, breathed in fumes rising from deep underground, and delivered prophecies that shaped wars, colonies, and entire civilizations. Then, in 393 CE, she spoke for the last time.`,
  },
  {
    text: `The man who silenced her was Emperor Theodosius I — Rome's first ruler to make Christianity the empire's only legal religion. In 391 CE, he banned pagan worship across the entire Roman world. Every sacrifice, every ritual, every temple. Soldiers shuttered sanctuaries from Egypt to Britain. Priests were scattered. Sacred treasures were melted down or carried away. After centuries of gradual decline, Delphi was about to lose the one thing that had always kept it alive.`,
  },
  {
    text: `According to tradition, Theodosius sent one final envoy to the Oracle — whether to taunt the dying religion or to hear official confirmation that the old gods were finished, nobody knows for sure. The last Pythia descended into the underground chamber beneath the temple one final time. She climbed onto the sacred tripod, breathed in the vapors rising from the earth, and spoke.`,
  },
  {
    text: `"Tell the king: the glorious temple has fallen to the ground. Apollo has no shelter anymore, no sacred laurel, no speaking spring. The water of speech is quenched."`,
  },
  {
    text: `That was it. No riddles. No hidden meanings. Just a god — through his last priestess — admitting it was over. The sacred fires were put out. The temple doors closed for the last time. The laurel groves that had surrounded the sanctuary for a millennium slowly withered and died.`,
  },
  {
    text: `The silence held. In the centuries that followed, a few people tried to restart the Oracle, but nothing worked. Delphi — once called the "Navel of the World" because the ancient Greeks believed it was the literal center of the earth — became just another ruin on a Greek mountainside. Pilgrims became tourists. Prayers became photographs.`,
  },
  {
    text: `But here's what stayed: the Oracle may have gone quiet, but she never really stopped speaking. The two phrases carved above the temple entrance — "Know Thyself" and "Nothing in Excess" — became cornerstones of Western philosophy and are still quoted today, over two thousand years later. The idea that there's a place you can go to ask life's biggest questions? That impulse lives in every religion, every search for meaning, every late-night conversation where someone asks what it all means.`,
  },
  {
    text: `The god fell silent. But the questions people brought to his door — about fate, free will, and what comes next — those never went away. They're the same questions we're still asking.`,
  },
];

const excerpt =
  "For over a thousand years, the Oracle at Delphi was the most powerful voice in the ancient world. Kings, generals, and ordinary people traveled to this remote mountain sanctuary in central Greece to hear the future.";

// ── Validation ──────────────────────────────────────────────
console.log("=== Pre-push validation ===\n");

let totalChars = 0;
let allValid = true;

for (let i = 0; i < paragraphs.length; i++) {
  const t = paragraphs[i].text;
  const chars = t.length;
  const words = t.split(/\s+/).length;
  totalChars += chars;

  const charOk = chars <= 500;
  const wordOk = words <= 100;

  console.log(
    `P${i + 1}: ${chars} chars, ${words} words ${charOk ? "✓" : "✗ OVER 500 CHARS"} ${wordOk ? "✓" : "✗ OVER 100 WORDS"}`
  );

  if (!charOk || !wordOk) allValid = false;
}

console.log(`\nTotal: ${totalChars} chars (target ~3000 ±20% → 2400-3600)`);
console.log(`Paragraphs: ${paragraphs.length} (target 6-8)`);

const inRange = totalChars >= 2400 && totalChars <= 3600;
const paraCount = paragraphs.length >= 6 && paragraphs.length <= 10;

if (!inRange) {
  console.error("✗ Total character count out of range!");
  allValid = false;
} else {
  console.log("✓ Character count in range");
}

if (!paraCount) {
  console.error("✗ Paragraph count out of range!");
  allValid = false;
} else {
  console.log("✓ Paragraph count in range");
}

if (!allValid) {
  console.error("\n✗ Validation failed. Aborting.");
  process.exit(1);
}

// ── Push to DynamoDB ────────────────────────────────────────
console.log("\n=== Pushing to DynamoDB ===\n");

const result = await ddb.send(
  new UpdateCommand({
    TableName: "Story",
    Key: {
      siteId: "delphi",
      langStoryId: "en#last-prophecy",
    },
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

console.log("✓ Updated successfully!");
console.log(`  siteId:      ${result.Attributes.siteId}`);
console.log(`  langStoryId: ${result.Attributes.langStoryId}`);
console.log(`  title:       ${result.Attributes.title}`);
console.log(`  paragraphs:  ${result.Attributes.paragraphs.length} paragraphs`);
console.log(`  excerpt:     ${result.Attributes.excerpt.substring(0, 80)}...`);
console.log(`  updatedAt:   ${result.Attributes.updatedAt}`);
