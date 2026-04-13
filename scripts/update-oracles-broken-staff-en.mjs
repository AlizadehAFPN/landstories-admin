import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const paragraphs = [
  `In 114 CE, Emperor Trajan was the most powerful man on Earth. The Roman Senate had literally called him "the best of all rulers." He'd conquered nations and built monuments that still stand. Now he had one last target: Parthia — the eastern empire that had humiliated Rome for two centuries, most famously by slaughtering General Crassus's army at the Battle of Carrhae. Trajan was going to finish what Rome couldn't. But before he moved a single soldier, he did something no one saw coming. He wrote a letter to a god.`,

  `Not just any god. He chose the oracle at Baalbek — a massive temple in what's now Lebanon. Despite its Roman name, Jupiter Heliopolitanus was really Baal, the ancient storm god, worshipped on that hilltop for thousands of years before Rome existed. The oracle worked like nothing else in the ancient world: priests carried a golden statue on a platform, and when you asked a question, the statue moved on its own — lurching, spinning, pulling back. The priests read those movements as the god's answer.`,

  `But Trajan didn't trust easily. He was a soldier who'd climbed the ranks on skill, not bloodline, and he had the instincts of a commander checking intelligence reports: verify everything. So he set a trap. He sealed a completely blank letter with the imperial stamp and sent it to the temple. Prove you're real. The priests performed their rituals. And the oracle sent back its answer — a blank scroll. Nothing written. A perfect mirror of what Trajan had sent. The trap didn't just fail. It turned into proof.`,

  `Convinced, Trajan asked his real question — the one keeping him up at night. Would his invasion succeed? Would he make it home alive? The oracle didn't answer with words. The priests took a centurion's staff — the wooden baton Roman officers carried as a symbol of command — and snapped it into pieces. They wrapped the fragments in cloth and sent the bundle to the emperor. It was a riddle. And it would take three years to solve.`,

  `At first, the campaign was a masterpiece. Trajan stormed through Mesopotamia, captured the Parthian capital of Ctesiphon, and reached the Persian Gulf — farther east than any Roman army would ever go. He stood on the shore and wished he were young enough to follow Alexander the Great to India. Then it all collapsed. Revolts erupted. His health broke. In 117 CE, sailing home, he suffered a massive stroke and died. His ashes were carried back to Rome in a golden urn and placed beneath the great column that still bears his name.`,

  `A staff, broken and wrapped in cloth. A body, broken and carried home. The oracle had answered with savage precision: you will conquer everything. And you will never come back alive. It might be the cruelest prophecy in history — not because it predicted failure, but because it promised complete victory and buried the price in a riddle no one could solve until it was too late.`,

  `The god who made that prediction outlasted Trajan by centuries. Pilgrims crossed the empire to ask about love, war, and death. Then, in 391 CE, the Christian emperor Theodosius — who saw the old gods as demons — banned all pagan worship across Rome. The fires at Baalbek went dark. The golden statue was destroyed. The oracle that once predicted the death of emperors fell silent forever.`,

  `Today, six massive columns still stand at Baalbek — the tallest surviving columns from the ancient world. They're the last witnesses to a god powerful enough to make emperors listen, and honest enough to tell them what they didn't want to hear. The staff is gone. The prophecy was kept.`,
];

// Self-check: validate constraints
let totalChars = 0;
for (let i = 0; i < paragraphs.length; i++) {
  const chars = paragraphs[i].length;
  const words = paragraphs[i].split(/\s+/).length;
  totalChars += chars;
  console.log(`P${i + 1}: ${chars} chars, ${words} words ${chars > 500 ? "⚠️ OVER 500 CHARS" : "✓"} ${words > 100 ? "⚠️ OVER 100 WORDS" : "✓"}`);
}
console.log(`\nTotal: ${paragraphs.length} paragraphs, ${totalChars} characters`);
console.log(`Target: 3000 chars ±20% = 2400-3600. ${totalChars >= 2400 && totalChars <= 3600 ? "✓ IN RANGE" : "⚠️ OUT OF RANGE"}`);

const now = Math.floor(Date.now() / 1000);

const command = new UpdateItemCommand({
  TableName: "Story",
  Key: {
    siteId: { S: "baalbek" },
    langStoryId: { S: "en#oracles-broken-staff" },
  },
  UpdateExpression: "SET paragraphs = :p, updatedAt = :u, readingTimeMinutes = :r",
  ExpressionAttributeValues: {
    ":p": {
      L: paragraphs.map((text) => ({
        M: { text: { S: text } },
      })),
    },
    ":u": { N: String(now) },
    ":r": { N: "4" },
  },
});

console.log("\nPushing to DynamoDB...");
const result = await client.send(command);
console.log("✅ Successfully updated en#oracles-broken-staff");
console.log("HTTP status:", result.$metadata.httpStatusCode);
