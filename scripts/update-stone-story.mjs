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
    text: `There's a block of rough red sandstone sitting in Edinburgh Castle right now. It weighs about 152 kilograms — nothing special to look at. But for over a thousand years, this rock has decided who gets to call themselves king. Scottish rulers were crowned on it at the ancient abbey of Scone in Perthshire. Legend said the stone would cry out beneath a true king and stay dead silent under a fraud. They call it the Stone of Destiny, and its story is one of the wildest power struggles in history.`,
  },
  {
    text: `In 1296, King Edward I of England — so brutal they nicknamed him the Hammer of the Scots — invaded Scotland and seized the Stone. He wasn't just taking a rock. He was stealing Scotland's right to crown its own kings. He had an oak chair built around it at Westminster Abbey so every future English king would sit on top of Scotland's most sacred object. His message was clear: your kingdom is mine, your stone is my footstool. Every British monarch since 1308 has been crowned in that chair.`,
  },
  {
    text: `The Stone's backstory goes deeper than England versus Scotland. Medieval writers traced it back to the Bible — to Genesis, where a man named Jacob fell asleep on a stone at a place called Bethel and dreamed of a ladder reaching up to heaven. God promised Jacob that land, and Jacob declared the stone holy. The legends say it then traveled through Egypt, Spain, and Ireland — where it sat on the Hill of Tara as the crowning stone of Irish High Kings — before reaching Scotland around 500 AD.`,
  },
  {
    text: `Now here's where it gets wild. Christmas Day, 1950. Four Scottish students — led by 25-year-old law student Ian Hamilton — broke into Westminster Abbey in the dead of night and pried the Stone from under the Coronation Chair. It cracked in half during the getaway. They loaded the pieces into a borrowed Ford Anglia and drove north through the winter darkness, dodging police roadblocks. Scotland was quietly thrilled. England was furious. Police launched the biggest manhunt in British history.`,
  },
  {
    text: `For months, nobody found it. A Glasgow stonemason named Robert Gray secretly repaired the two halves. Then on April 11, 1951, the Stone turned up draped in Scotland's flag on the altar of Arbroath Abbey — the spot where, in 1320, Scottish nobles signed a famous declaration telling the Pope that Scotland would never bow to England. The location was a message all its own. The students were identified but never charged — the government feared a trial would only make them heroes.`,
  },
  {
    text: `The Stone went back to London, and for another 45 years it sat in Westminster — a quiet, constant wound. Then on November 30, 1996 — St. Andrew's Day, Scotland's national holiday — the British government officially returned the Stone of Destiny to Scotland. It was placed in Edinburgh Castle alongside the Scottish Crown Jewels. There was one condition: it would travel back to London for future coronations.`,
  },
  {
    text: `That promise was kept on May 6, 2023, when the Stone traveled south for the coronation of King Charles III — the first in seventy years. Charles sat above the Stone of Destiny, exactly as Edward I had planned seven centuries earlier. But this time, Scotland sent it willingly. A rock stolen as a weapon of conquest came home as something else entirely — proof that symbols outlast the empires that try to own them. Some things simply refuse to stay taken.`,
  },
];

const subtitle =
  "A slab of sandstone that's been crowning kings for over a thousand years";

const excerpt =
  "There's a block of rough red sandstone sitting in Edinburgh Castle right now. It weighs about 152 kilograms — nothing special to look at. But for over a thousand years, this rock has decided who gets to call themselves king.";

const moralOrLesson =
  "You can steal a symbol, but you can't steal what it means — the people who believe in it will always find a way to take it back";

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
    siteId: "westminster-abbey",
    langStoryId: "en#coronation-stone-stone-of-destiny",
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
