import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({ region: 'eu-north-1' });

const paragraphs = [
  `Nebuchadnezzar II didn't just rule Babylon \u2014 he rebuilt it from the ground up. Massive double walls wide enough for chariots. The legendary Ishtar Gate. Temples, palaces, canals, a stone bridge over the Euphrates. And on every brick, he stamped his name. Archaeologists have found hundreds of thousands. You can hold one in the British Museum, run your finger over the ancient script: \u201CNebuchadnezzar, king of Babylon.\u201D He wasn't just building a city. He was trying to make his name permanent.`,

  `Then came the dream. A tree so tall it touched the sky, visible from every corner of the earth, giving shelter to every bird and beast. Then a voice from heaven commanded: cut it down. Leave only the stump, bound in iron and bronze. Let its mind become that of an animal. The prophet Daniel \u2014 a Jewish exile serving at the Babylonian court \u2014 was called to interpret. He wished the dream was about someone else. It wasn't. The tree was Nebuchadnezzar himself. And the sentence had already been passed.`,

  `Daniel begged the king: change your ways, show mercy, and maybe God will let this pass. Twelve months went by. Nothing happened. Then one evening, the king walked onto the rooftop of his royal palace \u2014 the same palace whose ruins still stand today \u2014 and looked out over the skyline he had built. \u201CIs not this great Babylon,\u201D he said, \u201Cthat I have built by my mighty power, for the glory of my majesty?\u201D Before the words had left his lips, a voice fell from heaven: the kingdom has departed from you.`,

  `What happened next sounds impossible \u2014 but psychiatrists have documented it in modern patients. The king dropped to all fours. He ate grass like cattle. His hair grew long and matted. His nails curved into claws. For seven years, the most powerful man alive lived as an animal in the open fields. The Bible never explains who ran the empire while he was gone. That silence is deafening \u2014 seven years of nothing, as if someone had erased the king from his own kingdom.`,

  `Here\u2019s where it gets strange. In 1952, a scroll fragment turned up in a cave by the Dead Sea. It told nearly the same story \u2014 a Babylonian king struck mad for seven years, healed by a Jewish holy man \u2014 but named a different king: Nabonidus, who ruled decades after Nebuchadnezzar. And Nabonidus actually did abandon Babylon and vanish into the Arabian desert for ten years. Nobody knows why. Many scholars now believe the madness story was originally his, later pinned on the more famous king.`,

  `After seven years, Daniel says, the king looked up at the sky \u2014 and his mind came back. He praised the God of heaven, his advisors restored him to the throne, and his power grew even greater than before. It reads like a happy ending. It wasn\u2019t. He died in 562 BCE. His son lasted two years before being murdered in a palace coup. Within twenty-three years of the great king\u2019s death, Babylon itself fell to Cyrus of Persia. The man who stamped his name on every brick couldn\u2019t stamp it on time.`,

  `But here\u2019s the final twist. The empire crumbled. The dynasty vanished. The city turned to dust. But those bricks \u2014 hundreds of thousands of them \u2014 are still here. You can walk into the British Museum or the Pergamon Museum in Berlin, hold one in your hand, and read the name Nebuchadnezzar pressed into wet clay twenty-six centuries ago. He wanted to own everything. In the end, he left behind the one thing nobody expected \u2014 not a kingdom, not a dynasty. Just a brick. And somehow, that was enough.`,
];

// ── Validation ──────────────────────────────────────────────
let totalChars = 0;
let valid = true;

paragraphs.forEach((p, i) => {
  const chars = p.length;
  const words = p.split(/\s+/).length;
  totalChars += chars;
  const ok = chars <= 500 && words <= 100;
  console.log(`P${i + 1}: ${chars} chars, ${words} words ${ok ? '✓' : '✗ OVER LIMIT'}`);
  if (!ok) valid = false;
});

console.log(`\nTotal: ${totalChars} chars, ${paragraphs.length} paragraphs`);
console.log(`Target: ~3000 chars (±20% = 2400-3600)`);
console.log(`Within range: ${totalChars >= 2400 && totalChars <= 3600 ? '✓' : '✗'}\n`);

if (!valid) {
  console.error('VALIDATION FAILED — fix paragraphs before pushing.');
  process.exit(1);
}

// ── DynamoDB Update ─────────────────────────────────────────
const command = new UpdateItemCommand({
  TableName: 'Story',
  Key: {
    siteId: { S: 'babylon' },
    langStoryId: { S: 'en#madness-of-the-king' },
  },
  UpdateExpression: 'SET paragraphs = :p, updatedAt = :u, readingTimeMinutes = :r',
  ExpressionAttributeValues: {
    ':p': {
      L: paragraphs.map(text => ({
        M: { text: { S: text } },
      })),
    },
    ':u': { N: String(Math.floor(Date.now() / 1000)) },
    ':r': { N: '3' },
  },
  ReturnValues: 'UPDATED_NEW',
});

try {
  const result = await client.send(command);
  console.log('✅ Story updated successfully.');
  console.log(`   Updated fields: paragraphs (${paragraphs.length}), updatedAt, readingTimeMinutes`);
  console.log(`   readingTimeMinutes: ${result.Attributes?.readingTimeMinutes?.N}`);
} catch (err) {
  console.error('❌ Update failed:', err.message);
  process.exit(1);
}
