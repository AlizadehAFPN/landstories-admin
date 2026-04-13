import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client);

const paragraphs = [
  {
    text: `The most famous tragedy ever written started with a simple question. Laius, king of the Greek city of Thebes, traveled to Delphi — the holiest site in ancient Greece — to ask the Oracle if he'd have an heir. The answer destroyed him. Yes, he'd have a son. But that son would grow up to kill him and marry his own mother. Terrified, Laius had the newborn's ankles pinned together and ordered a servant to leave the baby on a mountainside to die. The name Oedipus literally means "swollen foot."`,
  },
  {
    text: `But the servant couldn't go through with it. He handed the baby to a passing shepherd, who carried him to the king and queen of Corinth — a couple with no children of their own. They raised Oedipus as their son, and he never questioned it. He grew up a prince, loved and confident, with no idea that his entire life was built on a lie.`,
  },
  {
    text: `Then one night at a feast, a drunk guest blurted out that Oedipus wasn't really his parents' child. Shaken, Oedipus went straight to Delphi to get answers. But the Oracle didn't address his question. Instead, she delivered something far worse — the same prophecy his birth parents had heard: he would kill his father and marry his mother.`,
  },
  {
    text: `Oedipus made the most logical decision possible — and it was the worst one. To protect the parents he loved in Corinth, he swore never to go back. Instead, he headed the other way, toward Thebes. Straight into the arms of the fate he was running from. Every step away from the prophecy was a step closer to it.`,
  },
  {
    text: `On a narrow road, he got into a fight with an older man in a chariot who tried to force him off the path. Oedipus killed him in a rage. He had no way of knowing — that man was Laius. His real father. The prophecy was already half-fulfilled, and Oedipus didn't have a clue.`,
  },
  {
    text: `When he reached Thebes, the city was being terrorized by the Sphinx — a monster with the body of a lion and the face of a woman who killed anyone who couldn't solve her riddle. "What walks on four legs in the morning, two at noon, and three in the evening?" Oedipus answered without hesitation: a human being. The Sphinx threw herself off a cliff. The grateful people of Thebes crowned him king and gave him the widowed queen as his bride. Her name was Jocasta. She was his mother.`,
  },
  {
    text: `For years, Oedipus ruled well. He and Jocasta had children together. Life was good. Then a devastating plague hit the city, and the Oracle declared that Thebes was cursed because the killer of the former king Laius had never been caught. Oedipus launched a full investigation, swearing he'd find the murderer no matter what. He did. The killer was himself.`,
  },
  {
    text: `When the full truth came out — who he really was, who he'd married, what he'd done — Jocasta hanged herself. Oedipus, unable to bear what he now saw, took the pins from her dress and drove them into his own eyes. He left Thebes blind and broken, led by his daughter Antigone, a man who had done everything right and still lost everything. The harder he ran from his fate, the faster he ran toward it.`,
  },
];

const excerpt = `The most famous tragedy ever written started with a simple question. Laius, king of the Greek city of Thebes, traveled to Delphi — the holiest site in ancient Greece — to ask the Oracle if he'd have an heir.`;

// ── Validate constraints ──────────────────────────────────────────
console.log("=== VALIDATION ===\n");

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
    `P${i + 1}: ${chars} chars, ${words} words ${charOk && wordOk ? "✓" : "✗"}`
  );

  if (!charOk) {
    console.log(`   ⚠ Exceeds 500 char limit!`);
    allValid = false;
  }
  if (!wordOk) {
    console.log(`   ⚠ Exceeds 100 word limit!`);
    allValid = false;
  }
}

console.log(`\nTotal: ${totalChars} chars, ${paragraphs.length} paragraphs`);
console.log(
  `Target: ~3000 chars (±20% = 2400–3600). ${totalChars >= 2400 && totalChars <= 3600 ? "✓" : "✗"}`
);
console.log(
  `Paragraphs: 6-10 range. ${paragraphs.length >= 6 && paragraphs.length <= 10 ? "✓" : "✗"}`
);

if (!allValid) {
  console.error("\n❌ Validation failed. Aborting.");
  process.exit(1);
}

// ── Push to DynamoDB ──────────────────────────────────────────────
console.log("\n=== PUSHING TO DYNAMODB ===\n");

const result = await doc.send(
  new UpdateCommand({
    TableName: "Story",
    Key: {
      siteId: "delphi",
      langStoryId: "en#oedipus-prophecy",
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

console.log("✅ Updated successfully!");
console.log(`   siteId:      ${result.Attributes.siteId}`);
console.log(`   langStoryId: ${result.Attributes.langStoryId}`);
console.log(`   title:       ${result.Attributes.title}`);
console.log(`   paragraphs:  ${result.Attributes.paragraphs.length}`);
console.log(`   excerpt:     ${result.Attributes.excerpt.substring(0, 80)}...`);
console.log(`   updatedAt:   ${result.Attributes.updatedAt}`);
