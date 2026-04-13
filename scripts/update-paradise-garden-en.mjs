import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client);

const paragraphs = [
  {
    text: `In 1272, a Venetian merchant named Marco Polo traveled through the mountains of northern Persia. He never set foot in Alamut Castle \u2014 the Mongols had destroyed it sixteen years earlier. But in the markets along the Silk Road, he heard a story so wild it would survive for eight centuries. A hidden valley between two mountains, turned into the most beautiful garden ever made \u2014 golden pavilions, streams of wine and honey, and the most beautiful women in the world.`
  },
  {
    text: `Here\u2019s how the legend went. Hassan-i Sabbah \u2014 the leader the Crusaders called \u201Cthe Old Man of the Mountain\u201D \u2014 would pick young men from nearby villages, drug them unconscious, and carry them into this garden. When they woke up, they thought they\u2019d literally entered Paradise. Beautiful women, endless feasts, every pleasure imaginable. Days later, they\u2019d be drugged again and pulled out. Then Hassan would tell them: only I can send you back. Obey me \u2014 even if it means dying \u2014 and it\u2019s yours forever.`
  },
  {
    text: `That\u2019s how, according to the legend, he built the most fearless killers the medieval world had ever seen. Men who didn\u2019t just accept death \u2014 they ran toward it, believing one last mission would buy them eternity. Crusaders watched as these agents slipped into royal courts disguised as monks or soldiers, struck with a single dagger in broad daylight, and never tried to escape. Their rivals called them hashishin \u2014 a slur meaning \u201Chasshish users.\u201D When that word reached Europe, it became \u201Cassassin.\u201D`
  },
  {
    text: `Here\u2019s the thing: none of it was true. Historian Farhad Daftary, whose 1994 book became the definitive study of these myths, proved the garden never existed. No source from Hassan\u2019s own people mentions it. No Muslim writer of the era mentions drug use. When the Mongol historian Juvayni personally inspected Alamut after capturing it in 1256, he found storage rooms, workshops, and a library \u2014 but no golden pavilions, no wine, no garden. Polo was repeating bazaar gossip about a place he never saw.`
  },
  {
    text: `The real Hassan-i Sabbah was nothing like the legend. He was a fiercely disciplined scholar who executed his own son for drinking wine. He took Alamut \u2014 a fortress on a sheer cliff in northern Iran \u2014 in 1090, reportedly without a drop of blood. He spent thirty-four years inside without ever leaving, building one of the great libraries of the Islamic world. His followers weren\u2019t drugged zombies. They were educated men who learned languages, studied diplomacy, and acted from genuine religious conviction.`
  },
  {
    text: `The real \u201Cgardens\u201D of Alamut? Agricultural terraces, irrigated by hand-carved water channels and cisterns cut deep into limestone cliffs. Not pavilions of gold. Not streams of honey. Just brilliant engineering that fed a community of scholars, soldiers, and families in one of the most remote valleys on earth. Some of those cisterns still hold water today, almost a thousand years later.`
  },
  {
    text: `And yet Marco Polo won. His story \u2014 told by a man who was never there, about events that never happened, dictated to a novelist in a prison cell \u2014 gave English the word \u201Cassassin.\u201D It inspired Assassin\u2019s Creed, bringing millions of players into a world still shaped by that fantasy. The real Hassan \u2014 a scholar who took a fortress without bloodshed and never left for thirty-four years \u2014 is almost unknown. The most dangerous weapon in history was never a dagger. It was a story no one bothered to check.`
  }
];

// Validate constraints before pushing
let totalChars = 0;
let valid = true;
paragraphs.forEach((p, i) => {
  const chars = p.text.length;
  const words = p.text.split(/\s+/).length;
  totalChars += chars;
  console.log(`P${i + 1}: ${chars} chars, ${words} words`);
  if (chars > 520) {
    console.error(`  WARNING: P${i + 1} exceeds 500 char soft limit (${chars})`);
  }
  if (words > 100) {
    console.error(`  ERROR: P${i + 1} exceeds 100 word limit (${words})`);
    valid = false;
  }
});
console.log(`\nTotal: ${totalChars} chars, ${paragraphs.length} paragraphs`);
console.log(`Target: ~3000 chars ±20% (2400-3600)`);

if (!valid) {
  console.error("\nValidation FAILED. Aborting.");
  process.exit(1);
}

if (totalChars < 2400 || totalChars > 3600) {
  console.warn(`\nWARNING: Total chars (${totalChars}) outside ±20% range of 3000`);
}

const now = Math.floor(Date.now() / 1000);

const command = new UpdateCommand({
  TableName: "Story",
  Key: {
    siteId: "alamut-castle",
    langStoryId: "en#paradise-garden-legend"
  },
  UpdateExpression: "SET paragraphs = :p, readingTimeMinutes = :r, updatedAt = :u",
  ExpressionAttributeValues: {
    ":p": paragraphs,
    ":r": 3,
    ":u": now
  },
  ReturnValues: "ALL_NEW"
});

try {
  const result = await docClient.send(command);
  console.log("\nUpdate successful!");
  console.log(`Updated at: ${now}`);
  console.log(`Paragraphs count: ${result.Attributes.paragraphs.length}`);
  console.log(`Reading time: ${result.Attributes.readingTimeMinutes} min`);

  // Verify fields were NOT changed
  console.log(`\nVerification (unchanged fields):`);
  console.log(`  title: ${result.Attributes.title}`);
  console.log(`  subtitle: ${result.Attributes.subtitle?.substring(0, 60)}...`);
  console.log(`  storyCategory: ${result.Attributes.storyCategory}`);
  console.log(`  tier: ${result.Attributes.tier}`);
  console.log(`  icon: ${result.Attributes.icon}`);
  console.log(`  lang: ${result.Attributes.lang}`);
  console.log(`  source: ${result.Attributes.source?.substring(0, 60)}...`);
} catch (err) {
  console.error("Update failed:", err);
  process.exit(1);
}
