import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const docClient = DynamoDBDocumentClient.from(client);

// ─── REWRITTEN PARAGRAPHS ───────────────────────────────────────────────────

const paragraphs = [
  {
    text: `Right now, inside a fortress that William the Conqueror built nearly a thousand years ago, six black ravens are sitting on the lawn at the Tower of London like they own the place. And in a way, they do. There's an old prophecy — nobody knows exactly how old — that says if the ravens ever leave the Tower, the Crown will fall and Britain with it. It sounds absurd. But for over three centuries, the British government has refused to take the chance.`,
  },
  {
    text: `The earliest test came under King Charles II in the 1670s. His Astronomer Royal, John Flamsteed, set up a telescope inside the Tower — and the ravens were ruining everything. They fouled his instruments and made an unholy racket. Flamsteed demanded they go. But when Charles heard the prophecy, he made a call that still echoes today: the ravens stayed, the astronomer moved. Flamsteed was sent to Greenwich, where the Royal Observatory still stands — its spot decided by a flock of noisy birds.`,
  },
  {
    text: `After that, the ravens were never questioned again. Over the centuries, the Tower appointed dedicated keepers to care for them, turning old superstition into official policy. A colony of large, glossy black birds has been maintained on those grounds for over three hundred years — outlasting monarchs, wars, and the rise and fall of the British Empire itself. The prophecy stopped being a question of belief. It became part of the job.`,
  },
  {
    text: `The prophecy's real test came during World War II. German bombs hammered London during the Blitz — the devastating air raids of 1940 and 1941 — and the Tower took direct hits. The ravens, terrified, fled or died. By war's end, only one survived: a bird named Grip, so shaken he wouldn't leave his patch of ground. Churchill, told the flock had collapsed to one, ordered them replaced at once. He understood: let the prophecy come true, and you break something in people that bombs never could.`,
  },
  {
    text: `Today, the Tower keeps exactly seven ravens — six to honor the prophecy, plus one spare. Each bird has a name, a personality, and a following. There have been troublemakers like Jubilee and Harris, famous for stealing visitors' sandwiches right out of their hands. There was Merlina, a fiercely independent raven who vanished in early 2021 and was mourned like a national figure. They respond to their names, play games, and some have even learned to say "hello" to passing tourists.`,
  },
  {
    text: `One person is responsible for all of them: the Ravenmaster, a specially assigned Yeoman Warder — one of the Tower's ceremonial guards — who feeds the birds raw meat, blood-soaked biscuits, and the occasional egg. He trims their flight feathers so they can flutter around the grounds but can't easily fly away. He keeps a logbook recording each raven's personality, quirks, and life story going back decades. It's not a government document. It's more like a family Bible, written in crow.`,
  },
  {
    text: `And that might be the real point. Nobody actually believes a handful of birds is holding up the British monarchy. But nobody's willing to test it, either. The ravens are proof that some stories are stronger than logic — that a nation built on a thousand years of tradition will keep feeding its birds, trimming their wings, and whispering the old prophecy, because the moment you stop believing in the symbols, you lose the thing they stand for.`,
  },
];

const subtitle =
  "The prophecy that binds a kingdom to its birds";

const excerpt =
  "Right now, inside a fortress that William the Conqueror built nearly a thousand years ago, six black ravens are sitting on the lawn at the Tower of London like they own the place. And in a way, they do.";

const moralOrLesson =
  "Some stories are stronger than logic — the moment you stop believing in the symbols, you lose the thing they stand for";

// ─── VALIDATION ─────────────────────────────────────────────────────────────

console.log("\n=== PARAGRAPH VALIDATION ===\n");

let totalChars = 0;
let totalWords = 0;
let allPass = true;

for (let i = 0; i < paragraphs.length; i++) {
  const text = paragraphs[i].text;
  const chars = text.length;
  const words = text.split(/\s+/).length;
  totalChars += chars;
  totalWords += words;

  const charOk = chars <= 500;
  const wordOk = words <= 100;

  if (!charOk || !wordOk) allPass = false;

  console.log(
    `P${i + 1}: ${chars} chars ${charOk ? "✓" : "✗ OVER"} | ${words} words ${wordOk ? "✓" : "✗ OVER"}`
  );
}

console.log(`\nTotal: ${totalChars} chars | ${totalWords} words | ${paragraphs.length} paragraphs`);
console.log(`Target: ~3000 chars (±20% = 2400–3600)`);
console.log(
  `Status: ${totalChars >= 2400 && totalChars <= 3600 ? "✓ WITHIN RANGE" : "✗ OUT OF RANGE"}`
);

if (!allPass) {
  console.error("\n✗ Some paragraphs exceed limits. Aborting.");
  process.exit(1);
}

// ─── DYNAMODB UPDATE ────────────────────────────────────────────────────────

const now = Math.floor(Date.now() / 1000);

const command = new UpdateCommand({
  TableName: "Story",
  Key: {
    siteId: "tower-of-london",
    langStoryId: "en#ravens-of-the-tower",
  },
  UpdateExpression:
    "SET paragraphs = :p, subtitle = :sub, excerpt = :exc, moralOrLesson = :moral, updatedAt = :ts, readingTimeMinutes = :rtm",
  ExpressionAttributeValues: {
    ":p": paragraphs,
    ":sub": subtitle,
    ":exc": excerpt,
    ":moral": moralOrLesson,
    ":ts": now,
    ":rtm": 3,
  },
  ReturnValues: "ALL_NEW",
});

try {
  const result = await docClient.send(command);
  console.log("\n✓ Story updated successfully in DynamoDB.");
  console.log(`  updatedAt: ${now}`);
  console.log(`  paragraphs: ${result.Attributes.paragraphs.length}`);
  console.log(`  readingTimeMinutes: ${result.Attributes.readingTimeMinutes}`);
  console.log(`  subtitle: ${result.Attributes.subtitle}`);
} catch (err) {
  console.error("\n✗ DynamoDB update failed:", err.message);
  process.exit(1);
}
