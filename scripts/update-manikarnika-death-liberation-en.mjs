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
    text: `The fires at Manikarnika Ghat have never gone out. Not once. Every hour of every day, funeral pyres burn on the stone steps above the Ganges in Varanasi — Hinduism's holiest city. Up to twelve bodies at once, hundreds every day. The smoke rises, the ash drifts into the river, and here's what makes this place unlike anywhere else on earth: Hindus believe dying here doesn't just end your life. It ends the entire cycle of death and rebirth. Here, death is the door to total freedom.`,
  },
  {
    text: `The sacred texts explain why. They say Shiva — the god of destruction and transformation in Hinduism — stands beside every burning body here. As the flames rise, he whispers a secret word into the ear of the dying: a mantra that unlocks liberation. It doesn't matter who you were. Rich or poor, saint or sinner, highest caste or lowest — the fire takes the body, the river takes the ashes, and Shiva's whisper carries the soul across. No one gets turned away.`,
  },
  {
    text: `But here's the twist. The most powerful person at this sacred ground isn't a priest or a king. It's the Dom Raja — head of the Dom caste, labeled "untouchable" for thousands of years, the very bottom of India's social ladder. He controls the eternal flame. Every funeral pyre must be lit from his fire. No exceptions. Every grieving family pays him for the spark that frees their loved one. The most despised man in the caste system holds the one thing every soul needs to reach God.`,
  },
  {
    text: `The ritual hasn't changed in centuries. The body arrives through the narrow lanes as relatives chant "Ram Naam Satya Hai" — "Only God's name is true." It's dipped in the Ganges a final time. Wood stacked, body on top. The eldest son lights the pyre with the Dom's flame, circling five times — once for each element: earth, water, fire, air, space. Then he cracks the skull with a bamboo staff, releasing the soul. That sharp crack across the water — that's the sound of someone being set free.`,
  },
  {
    text: `Not everyone gets the fire. Some are too pure to need it. Children under five go straight into the Ganges — their innocence is enough. So do holy men and women who've already died once, symbolically, when they gave up worldly life. And pregnant women, because the unborn child carries no sin to burn away. Their bodies are weighted and placed in the river. Even the rules of the burning ground have exceptions — and every exception reveals what this culture really believes purity means.`,
  },
  {
    text: `Near the burning ground sits Mukti Bhawan — the Liberation House — a hostel where people come to die. Guests get a room, a cot, scripture beside them. Fifteen days — that's all they're given. If death doesn't come, they leave and reapply. There's a waiting list. The manager has watched over twelve thousand people pass. The pattern never changes: those who let go of grudges die in peace. Those who cling to bitterness suffer. A good death isn't one you avoid — it's one you face with open eyes.`,
  },
  {
    text: `But the most radical thing about death in Varanasi came from a man who refused to die there. Kabir, a fifteenth-century poet who questioned every religious rule, left the city on his deathbed. He went to Magahar — where people believed dying meant rebirth as a donkey. He did it to prove God doesn't belong to one city, that real freedom lives in the heart. When followers lifted his shroud, they found only flowers. Death, faced without fear, isn't an ending. It's where the real story begins.`,
  },
];

const excerpt =
  "The fires at Manikarnika Ghat have never gone out. Not once. Every hour of every day, funeral pyres burn on the stone steps above the Ganges in Varanasi — Hinduism's holiest city. Here, death is the door to total freedom.";

const moralOrLesson =
  "Varanasi built its holiest place not around a temple but around a cremation ground — and discovered something the rest of the world spends a lifetime running from: the only way to be truly free is to stop being afraid of the fire.";

const characters = [
  "Shiva (the Hindu god who whispers liberation to the dying)",
  "The Dom Raja (keeper of the eternal flame, from India's lowest caste)",
  "Kabir (the fifteenth-century poet who left Varanasi to die)",
];

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

console.log(
  `\nTotal: ${totalChars} chars | ${totalWords} words | ${paragraphs.length} paragraphs`
);
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
    siteId: "varanasi",
    langStoryId: "en#manikarnika-death-liberation",
  },
  UpdateExpression:
    "SET paragraphs = :p, excerpt = :exc, moralOrLesson = :moral, characters = :chars, updatedAt = :ts, readingTimeMinutes = :rtm",
  ExpressionAttributeValues: {
    ":p": paragraphs,
    ":exc": excerpt,
    ":moral": moralOrLesson,
    ":chars": characters,
    ":ts": now,
    ":rtm": 4,
  },
  ReturnValues: "ALL_NEW",
});

try {
  const result = await docClient.send(command);
  console.log("\n✓ Story updated successfully in DynamoDB.");
  console.log(`  updatedAt: ${now}`);
  console.log(`  paragraphs: ${result.Attributes.paragraphs.length}`);
  console.log(`  readingTimeMinutes: ${result.Attributes.readingTimeMinutes}`);
  console.log(`  excerpt: ${result.Attributes.excerpt.substring(0, 80)}...`);
  console.log(`  characters: ${result.Attributes.characters.length}`);
} catch (err) {
  console.error("\n✗ DynamoDB update failed:", err.message);
  process.exit(1);
}
