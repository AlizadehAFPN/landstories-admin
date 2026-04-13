import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const paragraphs = [
  {
    text: `In the ruins of Persepolis — the ceremonial capital of the Persian Empire in what is now southern Iran — there's a carved staircase that changed how we think about power. On it, twenty-three groups of people from across the largest empire the world had ever seen walk in a stone procession toward their king. Each group wears its own clothes, carries its own gifts, keeps its own identity. Nobody is kneeling. Nobody is in chains. In the ancient world, that was unheard of.`,
  },
  {
    text: `The details are unreal. Elamites from southwestern Iran carry a lioness with two cubs — you can count the muscles under her skin. Armenians lead a horse so finely carved you can see the tassels on its bridle. Babylonians bring textiles with every tassel chiseled individually into the stone, plus a humped bull. Lydians — from the land of Croesus, whose rivers ran with gold — offer golden bracelets and a miniature chariot. Ethiopians bring elephant tusks. Each nation looks exactly like itself.`,
  },
  {
    text: `Here's why this matters. Before Persia, the Assyrians — the dominant power in the Middle East for centuries — decorated their palaces with enemies being impaled, beheaded, and skinned alive. That was how empires showed strength: through terror. The Persepolis carvings contain not a single act of violence against a person. Not one. Every foreigner walks upright, carrying gifts instead of chains. The Persians had conquered Babylon and seen that brutal tradition up close. They chose the opposite.`,
  },
  {
    text: `And the Persians didn't just carve this idea — they built it. Darius the Great buried gold and silver tablets under the building's foundations, and on them he listed who made it: "The stone-cutters were Greeks and Lydians. The goldsmiths were Medes and Egyptians. The brickworkers were Babylonians." The greatest building in the empire was made by people from every corner of it. The monument to diversity was itself diverse.`,
  },
  {
    text: `At the center sits the King of Kings — almost certainly Darius I — holding a lotus and a scepter, with his son Xerxes standing behind him at equal height: a promise that the line would hold. But the most mysterious image is on the opposite staircase: a lion sinking its teeth into a bull. Scholars believe it's a star map — Leo overtaking Taurus at the exact moment of the spring equinox. This was Nowruz, the Persian New Year. The entire procession is a calendar carved in stone.`,
  },
  {
    text: `Was any of it real? Historians have debated this for decades. The "gifts" were actually taxes. The "willing participation" was backed by an army. The smiles were propaganda. But even the skeptics admit the Persians were genuinely different. The empire's founder, Cyrus the Great, issued a famous decree letting conquered peoples keep their gods and customs — one of history's first acts of religious tolerance. The art exaggerates, sure. But it exaggerates something that was actually there.`,
  },
  {
    text: `When Alexander the Great burned Persepolis in 330 BCE — possibly drunk, definitely making a point — the rubble actually preserved the eastern staircase by burying it. Thirteen of the original seventy-two columns still stand today. And every spring, three hundred million people across the Persian-speaking world celebrate Nowruz — performing a ritual carved on these stairs two and a half thousand years ago. The procession is still walking. It hasn't arrived yet. It never will. That's the point.`,
  },
];

// Validate constraints before pushing
let totalChars = 0;
for (let i = 0; i < paragraphs.length; i++) {
  const chars = paragraphs[i].text.length;
  const words = paragraphs[i].text.split(/\s+/).length;
  totalChars += chars;
  console.log(`P${i + 1}: ${chars} chars, ${words} words${chars > 500 ? " ⚠️ OVER 500 CHARS" : " ✓"}${words > 100 ? " ⚠️ OVER 100 WORDS" : ""}`);
}
console.log(`\nTotal: ${totalChars} chars, ${paragraphs.length} paragraphs`);
console.log(`Target: ~3000 chars (±20% = 2400–3600)`);
console.log(`Status: ${totalChars >= 2400 && totalChars <= 3600 ? "✓ Within range" : "⚠️ OUT OF RANGE"}\n`);

const now = Math.floor(Date.now() / 1000);

const cmd = new UpdateCommand({
  TableName: "Story",
  Key: {
    siteId: "persepolis",
    langStoryId: "en#twenty-three-nations",
  },
  UpdateExpression: "SET paragraphs = :p, updatedAt = :u, readingTimeMinutes = :r",
  ExpressionAttributeValues: {
    ":p": paragraphs,
    ":u": now,
    ":r": 4,
  },
  ReturnValues: "ALL_NEW",
});

try {
  const result = await docClient.send(cmd);
  console.log("✅ Story updated successfully!");
  console.log(`   siteId: ${result.Attributes.siteId}`);
  console.log(`   langStoryId: ${result.Attributes.langStoryId}`);
  console.log(`   title: ${result.Attributes.title}`);
  console.log(`   paragraphs: ${result.Attributes.paragraphs.length} paragraphs`);
  console.log(`   readingTimeMinutes: ${result.Attributes.readingTimeMinutes}`);
  console.log(`   updatedAt: ${result.Attributes.updatedAt}`);
} catch (err) {
  console.error("❌ Failed to update story:", err.message);
  process.exit(1);
}
