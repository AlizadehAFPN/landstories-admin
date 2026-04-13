import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const item = {
  // Keys
  siteId: "acropolis-athens",
  langStoryId: "de#elgin-marbles",

  // Identity
  storyId: "elgin-marbles",
  lang: "de",

  // Classification (unchanged)
  storyCategory: "lost_found",
  tier: "A",
  icon: "\u{1F3FA}",
  image: "",
  thumbnail: "",
  isFree: true,
  disabled: false,
  hasAudio: false,
  readingTimeMinutes: 2,

  // Geo & metadata (unchanged)
  coordinates: { lat: 37.9715, lng: 23.7267 },
  era: "1801-1812 (removal), debate ongoing",
  source:
    "House of Commons Select Committee Report (1816), modern scholarly analysis, British Museum and Greek government statements",
  characters: [
    "Thomas Bruce, 7th Earl of Elgin",
    "Giovanni Battista Lusieri (Elgin's agent)",
    "Ottoman authorities",
    "Greek witnesses",
  ],

  // === GERMAN TEXT ===

  title: "Rettung oder Raub?",

  subtitle: "Die Skulpturen, die gingen und vielleicht zur\u00FCckkehren",

  excerpt:
    "Stell dir vor: Es ist 1801, und Griechenland geh\u00F6rt nicht den Griechen. Ein schottischer Adliger kommt mit einer Genehmigung, den Parthenon zu zeichnen. Was er dann tut, l\u00F6st einen Streit aus, der bis heute tobt.",

  moralOrLesson:
    "Wem geh\u00F6rt die Vergangenheit wirklich? Die Debatte um die Parthenon-Skulpturen stellt die Frage, ob Kultursch\u00E4tze den Nationen geh\u00F6ren, die sie geschaffen haben \u2014 oder denen, die die Macht hatten, sie mitzunehmen.",

  paragraphs: [
    {
      text: "Stell dir vor: Es ist 1801, und Griechenland geh\u00F6rt nicht den Griechen. Das Osmanische Reich \u2014 der Vorg\u00E4nger der heutigen T\u00FCrkei \u2014 herrscht dort seit \u00FCber 350\u00A0Jahren. In diese Lage platzt Thomas Bruce, der Earl of Elgin, ein schottischer Adliger und frisch ernannter britischer Botschafter am osmanischen Hof. Er kommt nach Athen mit einer Genehmigung, die Skulpturen des Parthenon zu zeichnen und abzuformen. Was er dann tats\u00E4chlich tut, l\u00F6st einen Streit aus, der bis heute tobt.",
    },
    {
      text: "Elgin hat nicht einfach gezeichnet. Er brachte ganze Arbeitstrupps mit, die den Marmor zers\u00E4gten, Statuen mit Brechstangen losrissen und rund die H\u00E4lfte der noch erhaltenen Skulpturen nach England verschifften. Wir reden von 75\u00A0Metern kunstvoll gemei\u00DFeltem Fries, 15\u00A0Kampfszenen und 17\u00A0\u00FCberlebensgro\u00DFen Figuren vom Dach des Tempels. Sie nahmen sogar eine Karyatide mit \u2014 eine der ber\u00FChmten S\u00E4ulen in Gestalt einer jungen Frau \u2014 aus dem Geb\u00E4ude nebenan.",
    },
    {
      text: "Die Griechen, unter osmanischer Besatzung, konnten es nicht verhindern \u2014 aber sie schwiegen nicht. Arbeiter brachen jahrtausendealte Fugen auf, St\u00FCcke st\u00FCrzten beim Abbau zu Boden. Ein griechischer Zeuge hinterlie\u00DF einen Satz, der bis heute nachhallt: \u00ABDie T\u00FCrken weinten nicht, aber wir weinten.\u00BB Selbst in England war der Dichter Lord Byron au\u00DFer sich \u2014 er nannte Elgin einen Pl\u00FCnderer und schrieb ein ganzes Gedicht, das ihn verfluchte, Athen die Seele geraubt zu haben.",
    },
    {
      text: "Elgin lie\u00DF alles nach London bringen und stellte die Skulpturen in seinem Haus aus. Aber die Aktion hatte ihn fast ruiniert, also verkaufte er die Sammlung 1816 an die britische Regierung. Das Parlament diskutierte, ob der Kauf moralisch vertretbar sei \u2014 und stimmte trotzdem daf\u00FCr. Seitdem stehen die Skulpturen im British Museum, wo sie jedes Jahr Millionen Besucher anziehen. Griechenland fordert sie zur\u00FCck, praktisch seit es 1832 seine Unabh\u00E4ngigkeit erlangte.",
    },
    {
      text: "Das Argument des British Museum: Wir haben sie gerettet. Ohne Elgin h\u00E4tten Kriege oder Verfall sie zerst\u00F6rt \u2014 und in London kann sie jeder gratis sehen. Griechenland h\u00E4lt dagegen: Ihr habt sie unter fremder Besatzung genommen. Keine griechische Regierung hat je zugestimmt. Sie geh\u00F6ren an den Parthenon, f\u00FCr den sie vor 2\u00A0500\u00A0Jahren geschaffen wurden. Gibst du dem Teufel den kleinen Finger, nimmt er die ganze Hand \u2014 Elgin bekam eine Erlaubnis zum Zeichnen und ging mit dem halben Tempel.",
    },
    {
      text: "2009 spielte Griechenland seinen st\u00E4rksten Trumpf aus \u2014 nicht mit Anw\u00E4lten, sondern mit Architektur. Athen er\u00F6ffnete das neue Akropolismuseum, einen atemberaubenden Glasbau direkt am Fu\u00DF des Parthenon. Drinnen gibt es einen Saal, der exakt die Ma\u00DFe des antiken Tempels hat. Die Skulpturen, die Griechenland noch besitzt, stehen an ihren Originalpl\u00E4tzen. Dort, wo die Londoner St\u00FCcke hingeh\u00F6ren, klaffen leere L\u00FCcken. Keine Schilder n\u00F6tig. Die Leerstellen sagen alles.",
    },
    {
      text: "Selbst der Name ist ein Schlachtfeld. Sag \u00ABElgin Marbles\u00BB und du stellst einen britischen Lord als rechtm\u00E4\u00DFigen Besitzer dar. Sag \u00ABParthenon-Skulpturen\u00BB und du gibst sie Athen zur\u00FCck. Diese 2\u00A0500\u00A0Jahre alten Figuren wurden geschaffen, um von G\u00F6ttern und Helden zu erz\u00E4hlen. Heute erz\u00E4hlen sie eine andere Geschichte \u2014 \u00FCber Imperien, Besitz und eine Frage, die niemand beantwortet hat: Wenn man einem eroberten Volk etwas Sch\u00F6nes wegnimmt, kann man es dann jemals sein Eigen nennen?",
    },
  ],

  updatedAt: Math.floor(Date.now() / 1000),
};

// Validate before push
console.log("=== PRE-PUSH VALIDATION (GERMAN) ===");
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
  console.log(`  P${i + 1}: ${chars} chars, ${words} words`);
  if (chars > 500) { console.warn(`  ⚠ P${i + 1} exceeds 500 char limit!`); valid = false; }
  if (words > 100) { console.warn(`  ⚠ P${i + 1} exceeds 100 word limit!`); valid = false; }
});
console.log(`  TOTAL: ${totalChars} chars, ${totalWords} words across ${item.paragraphs.length} paragraphs`);
console.log("excerpt:", item.excerpt.length, "chars");
console.log("moralOrLesson:", item.moralOrLesson.length, "chars");
console.log("updatedAt:", item.updatedAt);
console.log("");

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
    Key: { siteId: "acropolis-athens", langStoryId: "de#elgin-marbles" },
  }));
  if (verify.Item) {
    console.log("✅ VERIFIED! Record exists in DynamoDB.");
    console.log("  title:", verify.Item.title);
    console.log("  lang:", verify.Item.lang);
    console.log("  langStoryId:", verify.Item.langStoryId);
    console.log("  paragraphs:", verify.Item.paragraphs.length);
    console.log("  updatedAt:", verify.Item.updatedAt);
  } else {
    console.error("❌ VERIFICATION FAILED: Record not found after push!");
    process.exit(1);
  }
} catch (err) {
  console.error("❌ VERIFICATION READ FAILED:", err.message);
  process.exit(1);
}
