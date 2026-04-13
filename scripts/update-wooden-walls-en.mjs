import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: `In 480 BCE, the most powerful empire on Earth came for Greece. King Xerxes of Persia brought an army so massive that ancient writers claimed it drank entire rivers dry. His father Darius had tried to conquer Greece ten years earlier and lost at the Battle of Marathon. Xerxes wasn't just invading — he was coming for revenge.`,
  },
  {
    text: `Athens was terrified. They did what Greeks always did in a crisis — sent messengers to the Oracle at Delphi, the most trusted voice of prophecy in the ancient world. But the Oracle's first answer was devastating: flee. Run to the ends of the earth. Nothing can save you. The messengers refused to leave and begged for something — anything — more hopeful.`,
  },
  {
    text: `The Oracle spoke again, this time in a riddle. She said that "wooden walls" would keep Athens safe, and she called the island of Salamis "divine." Destruction was coming — that much was clear. But hidden inside the riddle was a lifeline. The entire future of Athens now hung on a single question: what did "wooden walls" mean?`,
  },
  {
    text: `The Athenian Assembly erupted. Older leaders said it was obvious — "wooden walls" meant the wooden fence around the Acropolis, Athens's hilltop fortress. Barricade yourselves in and pray. But a general named Themistocles had a completely different reading. The "wooden walls," he insisted, were ships. Athens had just built a massive new fleet. The Oracle was telling them to abandon the city and fight at sea.`,
  },
  {
    text: `Themistocles had one killer argument. The Oracle called Salamis "divine" — not "cruel," not "deadly." If Greeks were fated to die there, she would have chosen a darker word. "Divine" meant victory. The Assembly voted. Themistocles won.`,
  },
  {
    text: `Athens evacuated — the entire city. Women, children, the elderly, everyone fled to the island of Salamis while the Persian army marched in and burned everything, including the sacred temples on the Acropolis. It looked like total defeat. But Themistocles had set a trap. He lured the Persian fleet into the narrow waters around Salamis, where their massive warships couldn't turn. The smaller, faster Greek ships rammed them to pieces.`,
  },
  {
    text: `It was one of the most decisive naval battles ever fought. The "wooden walls" — the Athenian fleet — didn't just save Athens. They saved all of Greece. Without a navy to keep his army supplied, Xerxes pulled back. Within a year, the remaining Persian forces were crushed at the Battle of Plataea, and the invasion was over for good.`,
  },
  {
    text: `The same Oracle that had ruined King Croesus with a riddle years earlier now saved an entire civilization with another one. The difference wasn't the prophecy — it was who was listening. Croesus heard what he wanted to hear. Themistocles heard what was actually being said. Sometimes the answer is right in front of you — but only if you're brave enough to read it differently than everyone else.`,
  },
];

const excerpt =
  "In 480 BCE, the most powerful empire on Earth came for Greece. King Xerxes of Persia brought an army so massive that ancient writers claimed it drank entire rivers dry.";

const moralOrLesson =
  "The same Oracle that ruined King Croesus saved Athens. The difference wasn't the riddle — it was who was listening.";

const now = Math.floor(Date.now() / 1000);

const cmd = new UpdateCommand({
  TableName: "Story",
  Key: {
    siteId: "delphi",
    langStoryId: "en#wooden-walls",
  },
  UpdateExpression:
    "SET paragraphs = :p, excerpt = :e, moralOrLesson = :m, updatedAt = :u",
  ExpressionAttributeValues: {
    ":p": paragraphs,
    ":e": excerpt,
    ":m": moralOrLesson,
    ":u": now,
  },
  ReturnValues: "ALL_NEW",
});

try {
  const result = await doc.send(cmd);
  console.log("Updated successfully!");
  console.log("Title:", result.Attributes.title);
  console.log("Paragraphs:", result.Attributes.paragraphs.length);
  console.log("Excerpt:", result.Attributes.excerpt);
  console.log("Moral:", result.Attributes.moralOrLesson);

  // Verify constraints
  let totalChars = 0;
  result.Attributes.paragraphs.forEach((p, i) => {
    const chars = p.text.length;
    const words = p.text.split(/\s+/).length;
    totalChars += chars;
    const status =
      chars > 500 ? "OVER LIMIT" : words > 100 ? "OVER WORDS" : "OK";
    console.log(
      `  P${i + 1}: ${chars} chars, ${words} words — ${status}`
    );
  });
  console.log(`  TOTAL: ${totalChars} chars, ${result.Attributes.paragraphs.length} paragraphs`);
} catch (err) {
  console.error("Update failed:", err);
  process.exit(1);
}
