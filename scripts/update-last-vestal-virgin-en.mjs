// Update "The Last Vestal Virgin" (en) — editorial rewrite
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: `Here's a job posting from ancient Rome: six women, chosen as young girls, tasked with keeping a single flame alive — and if that flame went out, Rome itself would fall. For over a thousand years, from around 700 BC to 394 AD, the Vestal Virgins guarded the sacred fire of Vesta, goddess of the hearth, in a temple at the heart of the Roman Forum. They were the most powerful women in the ancient world. And the price of that power was their bodies, their freedom, and sometimes their lives.`,
  },
  {
    text: `Girls were chosen between six and ten, pulled from Rome's most powerful families. Once selected, a Vestal served thirty years: ten learning the rituals, ten performing them, ten teaching the next generation. During all of it, she had to stay a virgin. In return, she got something no other Roman woman had — real power. Vestals could own property, make a will, and testify in court without an oath. If a condemned prisoner crossed a Vestal's path heading to execution, he could be freed on the spot.`,
  },
  {
    text: `On Rome's streets, even top officials had to step aside when a Vestal passed. They rode in a special carriage — a privilege normally reserved for the empress. At the Colosseum, they sat front row, right next to the emperor himself. In a society that treated most women as property, the Vestals were untouchable — and that's not a figure of speech. Assaulting one was a crime punishable by death.`,
  },
  {
    text: `But that power had a terrifying catch. A Vestal who broke her vow faced a punishment designed to haunt. Roman law forbade spilling a Vestal's blood — that would offend the gods. So they found a loophole. The accused was put in funeral robes, paraded through the Forum she once ruled, and brought to the Campus Sceleratus — "The Field of Wickedness." She climbed into a tiny room with a lamp, bread, and water. The entrance was sealed with earth. Rome hadn't killed her. They'd just... put her away.`,
  },
  {
    text: `At least ten Vestals were buried alive across the centuries. And the charges weren't always real. When Rome lost battles or suffered disasters, leaders needed someone to blame — and accusing a Vestal of breaking her vow was an easy way to turn public panic into a sacrifice. The historian Plutarch wrote about these trials with open doubt. Pliny the Younger described one burial under Emperor Domitian — a ruler famous for cruelty — with barely hidden disgust.`,
  },
  {
    text: `The Vestals didn't end in scandal. They ended because the world changed around them. In 382 AD, Emperor Gratian — now a Christian ruler of a Christian empire — cut off the order's funding. Twelve years later, Emperor Theodosius the First shut it down for good and ordered the sacred flame put out. After burning without a break for over a thousand years, the fire of Vesta went dark. Just like that. One of the longest-running traditions in human history, finished by an emperor's signature.`,
  },
  {
    text: `The last Chief Vestal was likely a woman named Coelia Concordia. We don't know if she fought the decision or quietly walked away. But what she left behind still speaks. The House of the Vestals stands in the Roman Forum today, its courtyard lined with pedestals that once held statues of every Chief Vestal. Some are empty — smashed by time or on purpose. Others have names scraped off, erased by the very faith that replaced them. A thousand years of devotion, reduced to blank stone and silence.`,
  },
];

// Validate constraints before pushing
let totalChars = 0;
for (let i = 0; i < paragraphs.length; i++) {
  const t = paragraphs[i].text;
  const chars = t.length;
  const words = t.split(/\s+/).length;
  totalChars += chars;
  console.log(`P${i + 1}: ${chars} chars, ${words} words`);
  if (chars > 500) console.warn(`  ⚠ P${i + 1} exceeds 500-char limit!`);
  if (words > 100) console.warn(`  ⚠ P${i + 1} exceeds 100-word limit!`);
}
console.log(`\nTotal: ${totalChars} chars, ${paragraphs.length} paragraphs`);
console.log(
  `Target: ~3000 chars (±20% = 2400-3600). ${totalChars >= 2400 && totalChars <= 3600 ? "✅ PASS" : "❌ FAIL"}`
);

const subtitle =
  "A thousand years of sacred flame, snuffed out by an emperor's signature";

const excerpt =
  "For over a thousand years, six women guarded Rome's sacred flame. They were untouchable, powerful, honored — and any one of them could be buried alive for breaking a single vow.";

const moralOrLesson =
  "Even a thousand years of tradition can be ended with a single signature — and the greatest privileges always come with the greatest costs.";

const res = await doc.send(
  new UpdateCommand({
    TableName: "Story",
    Key: {
      siteId: "roman-forum-palatine",
      langStoryId: "en#last-vestal-virgin",
    },
    UpdateExpression:
      "SET paragraphs = :p, subtitle = :sub, excerpt = :exc, moralOrLesson = :mol, updatedAt = :ts",
    ExpressionAttributeValues: {
      ":p": paragraphs,
      ":sub": subtitle,
      ":exc": excerpt,
      ":mol": moralOrLesson,
      ":ts": Math.floor(Date.now() / 1000),
    },
    ReturnValues: "ALL_NEW",
  })
);

console.log("\n✅ Story updated successfully!");
console.log(`   Title: ${res.Attributes.title}`);
console.log(`   Subtitle: ${res.Attributes.subtitle}`);
console.log(`   Paragraphs: ${res.Attributes.paragraphs.length}`);
console.log(`   Updated at: ${new Date(res.Attributes.updatedAt * 1000).toISOString()}`);
