import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

// First, read the English item to copy metadata
console.log("=== READING ENGLISH ITEM FOR METADATA ===");
const enItem = await doc.send(new GetCommand({
  TableName: "Story",
  Key: { siteId: "hadrians-wall", langStoryId: "en#lost-ninth-legion" },
}));

if (!enItem.Item) {
  console.error("❌ English item not found! Cannot copy metadata.");
  process.exit(1);
}

const en = enItem.Item;
console.log("✅ English item found. Copying metadata...");
console.log("  storyCategory:", en.storyCategory);
console.log("  tier:", en.tier);
console.log("  icon:", en.icon);
console.log("  era:", en.era);

const item = {
  // Keys
  siteId: "hadrians-wall",
  langStoryId: "de#lost-ninth-legion",

  // Identity
  storyId: "lost-ninth-legion",
  lang: "de",

  // Classification (from English item)
  storyCategory: en.storyCategory,
  tier: en.tier,
  icon: en.icon,
  image: en.image || "",
  thumbnail: en.thumbnail || "",
  isFree: en.isFree ?? true,
  disabled: false,
  hasAudio: false,
  readingTimeMinutes: 3,

  // Geo & metadata (from English item)
  coordinates: en.coordinates,
  era: en.era,
  source: en.source,
  characters: en.characters,

  // === GERMAN TEXT ===

  title: "Die Legion, die niemand fand",

  subtitle: "Fünftausend römische Soldaten marschierten in den Nebel — und kamen nie zurück",

  excerpt:
    "Die Neunte Legion — Legio IX Hispana — war keine gewöhnliche Truppe. Diese Männer kämpften schon unter Julius Cäsar bei der Eroberung Galliens.",

  moralOrLesson:
    "Selbst das mächtigste Imperium hat Grenzen. Manchmal marschieren fünftausend Mann über diese Grenzen hinaus — und das Einzige, was zurückkommt, ist Stille.",

  paragraphs: [
    {
      text: "Die Neunte Legion \u2014 Legio IX Hispana \u2014 war keine gewöhnliche Truppe. Diese Männer kämpften unter Julius Cäsar bei der Eroberung Galliens in den 50ern vor Christus. Sie folgten ihm in den Bürgerkrieg, der die Republik zerstörte und das Kaiserreich erschuf. Als Kaiser Claudius sie 43 n.\u00A0Chr. zur Invasion Britanniens schickte, hatte die Neunte über hundert Jahre Krieg hinter sich. Fünftausend Veteranen, stationiert in York \u2014 Nordenglands Militärhauptstadt \u2014 an Roms gefährlichster Grenze.",
    },
    {
      text: "Und dann waren sie weg.",
    },
    {
      text: "Der letzte Beweis für die Neunte ist eine Inschrift in York, Jahr 108. Danach \u2014 nichts. Keine Versetzungsbefehle, keine Grabsteine, kein Wort in den besessen genauen Militärakten Roms. Als Kaiser Hadrian 122 nach Britannien kam, um seinen Wall zu bauen, war die Neunte verschwunden. Eine Ersatzlegion wurde aus Germanien geschickt \u2014 aus der Nachbarschaft. Rom verfolgte jede Einheit über drei Kontinente. Dass eine ganze Legion aus den Akten verschwindet? Da ist etwas gründlich schiefgelaufen.",
    },
    {
      text: "Die berühmteste Theorie ist auch die grausamste. Die Neunte marschierte nach Kaledonien \u2014 das heutige Schottland \u2014 um die Pikten zu schlagen, wilde Krieger, die die Römer \u201Edie Bemalten\u201C nannten. Stell dir fünftausend Mann im Hochland vor: nebelverhangene Berge, dichter Wald, endlose Moore. Ein Albtraum für Soldaten, trainiert für flaches Gelände. Die Pikten kannten jeden Pfad, überfielen die Kolonne, schnitten den Nachschub ab \u2014 und vernichteten sie. Fünftausend Mann, verschluckt vom Nebel.",
    },
    {
      text: "Aber die Geschichte hat einen Haken. In den 1950ern fanden Archäologen in Nijmegen \u2014 direkt an der deutschen Grenze \u2014 Ziegel mit dem Stempel der Neunten. Beweis, dass Teile der Legion nach 108 das Festland erreichten. Manche Historiker glauben, die Neunte wurde gar nicht in Schottland vernichtet, sondern verlegt und anderswo ausgelöscht \u2014 vielleicht im jüdischen Aufstand in Judäa um 132, wo Rom ganze Einheiten verlor. Ein Rätsel ersetzt das andere. Die Stille in den Akten bleibt genauso laut.",
    },
    {
      text: "Dieses ungeklärte Verschwinden wurde zur britischen Legende. Rosemary Sutcliff machte 1954 daraus den Roman \u201EDer Adler der Neunten\u201C \u2014 die Geschichte eines jungen römischen Offiziers, der jenseits des Hadrianswalls nach der verlorenen Legion seines Vaters sucht. Generationen britischer Kinder wuchsen damit auf. 2011 wurde daraus der Film \u201EThe Eagle\u201C. Sutcliffs Version \u2014 die Neunte im letzten Gefecht gegen piktische Krieger im Hochland \u2014 ist das Bild, das die meisten im Kopf tragen.",
    },
    {
      text: "Man sagt: Hochmut kommt vor dem Fall. Aber bei der Neunten kam nicht mal ein Fall — es kam einfach gar nichts mehr. Hadrian baute seinen Wall, weil im Norden etwas katastrophal schiefgegangen war. Ob die Neunte unter schottischem Heidekraut liegt oder unter dem Sand des Nahen Ostens — ihr Verschwinden zog diese Linie quer durch Britannien für immer. Das mächtigste Imperium der Antike verlor fünftausend Mann. Und fand nie heraus, wie.",
    },
  ],

  updatedAt: Math.floor(Date.now() / 1000),
};

// Validate before push
console.log("\n=== PRE-PUSH VALIDATION (GERMAN) ===");
console.log("siteId:", item.siteId);
console.log("langStoryId:", item.langStoryId);
console.log("lang:", item.lang);
console.log("title:", item.title);
console.log("subtitle:", item.subtitle);
console.log("paragraphs:", item.paragraphs.length);

let totalChars = 0;
let totalWords = 0;
let valid = true;
item.paragraphs.forEach((p, i) => {
  const chars = p.text.length;
  const words = p.text.split(/\s+/).length;
  totalChars += chars;
  totalWords += words;
  const charOk = chars <= 500 ? "✅" : "❌";
  const wordOk = words <= 100 ? "✅" : "❌";
  console.log(`  P${i + 1}: ${chars} chars ${charOk}  ${words} words ${wordOk}`);
  if (chars > 500) { console.warn(`  ⚠ P${i + 1} exceeds 500 char limit!`); valid = false; }
  if (words > 100) { console.warn(`  ⚠ P${i + 1} exceeds 100 word limit!`); valid = false; }
});
console.log(`  TOTAL: ${totalChars} chars, ${totalWords} words across ${item.paragraphs.length} paragraphs`);
console.log(`  Target: ~3000 chars (±20% = 2400–3600)`);
console.log("excerpt:", item.excerpt.length, "chars");
console.log("moralOrLesson:", item.moralOrLesson.length, "chars");

// Validate JSON serialization
try {
  const json = JSON.stringify(item);
  JSON.parse(json);
  console.log("JSON validation: PASSED (" + json.length + " bytes)");
} catch (e) {
  console.error("JSON validation FAILED:", e.message);
  process.exit(1);
}

if (!valid) {
  console.error("\n❌ Validation failed — fix paragraph lengths before pushing.");
  process.exit(1);
}

if (totalChars < 2400 || totalChars > 3600) {
  console.error(`\n❌ Total chars ${totalChars} outside acceptable range (2400–3600). Aborting.`);
  process.exit(1);
}

console.log("\n✅ All constraints passed.");

// Push to DynamoDB
console.log("\n=== PUSHING TO DYNAMODB ===");
try {
  const result = await doc.send(new PutCommand({
    TableName: "Story",
    Item: item,
  }));
  console.log("✅ SUCCESS! German story pushed.");
  console.log("HTTP status:", result.$metadata.httpStatusCode);
} catch (err) {
  console.error("❌ PUSH FAILED:", err.message);
  console.error(err);
  process.exit(1);
}

// Verify by reading back
console.log("\n=== VERIFICATION READ ===");
try {
  const verify = await doc.send(new GetCommand({
    TableName: "Story",
    Key: { siteId: "hadrians-wall", langStoryId: "de#lost-ninth-legion" },
  }));
  if (verify.Item) {
    console.log("✅ VERIFIED! Record exists in DynamoDB.");
    console.log("  title:", verify.Item.title);
    console.log("  lang:", verify.Item.lang);
    console.log("  langStoryId:", verify.Item.langStoryId);
    console.log("  paragraphs:", verify.Item.paragraphs.length);
    console.log("  storyCategory:", verify.Item.storyCategory);
    console.log("  tier:", verify.Item.tier);
    console.log("  updatedAt:", verify.Item.updatedAt);
  } else {
    console.error("❌ VERIFICATION FAILED: Record not found after push!");
    process.exit(1);
  }
} catch (err) {
  console.error("❌ VERIFICATION READ FAILED:", err.message);
  process.exit(1);
}
