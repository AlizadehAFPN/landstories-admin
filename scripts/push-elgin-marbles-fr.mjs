import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const item = {
  // Keys
  siteId: "acropolis-athens",
  langStoryId: "fr#elgin-marbles",

  // Identity
  storyId: "elgin-marbles",
  lang: "fr",

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

  // === FRENCH TEXT ===

  title: "Sauvetage ou pillage\u00A0?",

  subtitle: "Les sculptures qui sont parties et n'en finissent pas de revenir",

  excerpt:
    "Nous sommes en 1801. La Gr\u00E8ce n'appartient pas aux Grecs. Un aristocrate \u00E9cossais d\u00E9barque avec un permis pour dessiner le Parth\u00E9non. Ce qu'il fait ensuite d\u00E9clenchera un conflit qui dure encore aujourd'hui.",

  moralOrLesson:
    "\u00C0 qui appartient r\u00E9ellement le pass\u00E9\u00A0? Le d\u00E9bat sur les sculptures du Parth\u00E9non pose la question\u00A0: les tr\u00E9sors culturels appartiennent-ils aux nations qui les ont cr\u00E9\u00E9s \u2014 ou \u00E0 ceux qui ont eu le pouvoir de les prendre\u00A0?",

  paragraphs: [
    {
      text: "Nous sommes en 1801. La Gr\u00E8ce n\u2019appartient pas aux Grecs \u2014 l\u2019Empire ottoman la tient sous sa botte depuis plus de 350\u00A0ans. C\u2019est dans ce contexte que d\u00E9barque Thomas Bruce, aristocrate \u00E9cossais plus connu sous le titre de comte d\u2019Elgin, tout juste nomm\u00E9 ambassadeur de Grande-Bretagne aupr\u00E8s de la cour ottomane. Il arrive \u00E0 Ath\u00E8nes avec un permis pour dessiner et mouler les sculptures du Parth\u00E9non. Ce qu\u2019il fait ensuite d\u00E9clenchera un conflit qui dure encore aujourd\u2019hui.",
    },
    {
      text: "Elgin ne s\u2019est pas content\u00E9 de dessiner. Il a fait venir des \u00E9quipes d\u2019ouvriers qui ont sci\u00E9 le marbre, arrach\u00E9 les statues \u00E0 coups de pieds-de-biche et exp\u00E9di\u00E9 vers l\u2019Angleterre pr\u00E8s de la moiti\u00E9 des sculptures encore en place. On parle de 75\u00A0m\u00E8tres de frise sculpt\u00E9e, 15\u00A0panneaux de bataille et 17\u00A0figures plus grandes que nature, arrach\u00E9es aux frontons du temple. Ils ont m\u00EAme emport\u00E9 une Cariatide \u2014 ces fameuses colonnes en forme de jeune femme \u2014 du b\u00E2timent voisin.",
    },
    {
      text: "Les Grecs, \u00E9cras\u00E9s sous l\u2019occupation ottomane, n\u2019ont pas pu l\u2019emp\u00EAcher. Mais ils n\u2019ont pas accept\u00E9 en silence. Les ouvriers fendaient des joints vieux de deux mill\u00E9naires, et des morceaux se fracassaient au sol pendant le d\u00E9montage. Un t\u00E9moin grec a laiss\u00E9 une phrase qui coupe encore\u00A0: \u00AB\u00A0Les Turcs n\u2019ont pas pleur\u00E9, mais nous, nous avons pleur\u00E9.\u00A0\u00BB En Angleterre, Lord Byron \u00E9tait hors de lui \u2014 il a trait\u00E9 Elgin de pillard et lui a d\u00E9di\u00E9 un po\u00E8me entier pour avoir vol\u00E9 l\u2019\u00E2me d\u2019Ath\u00E8nes.",
    },
    {
      text: "Elgin a tout exp\u00E9di\u00E9 \u00E0 Londres et expos\u00E9 les sculptures chez lui. Mais l\u2019op\u00E9ration l\u2019avait presque ruin\u00E9, alors en 1816, il a vendu la collection au gouvernement britannique. Le Parlement a d\u00E9battu de la moralit\u00E9 de l\u2019achat\u2026 et vot\u00E9 oui quand m\u00EAme. Depuis, les sculptures sont au British Museum, o\u00F9 des millions de visiteurs les admirent chaque ann\u00E9e. La Gr\u00E8ce les r\u00E9clame pratiquement depuis son ind\u00E9pendance, acquise en 1832.",
    },
    {
      text: "L\u2019argument du British Museum est simple\u00A0: nous les avons sauv\u00E9es. Sans Elgin, la pollution ou les guerres les auraient d\u00E9truites \u2014 et \u00E0 Londres, tout le monde peut les voir gratis. La Gr\u00E8ce r\u00E9pond\u00A0: vous les avez prises sous occupation \u00E9trang\u00E8re. Aucun gouvernement grec n\u2019a donn\u00E9 son accord. Elles appartiennent au Parth\u00E9non, pour lequel elles ont \u00E9t\u00E9 sculpt\u00E9es il y a 2\u00A0500\u00A0ans. Qui vole un \u0153uf vole un b\u0153uf\u00A0: Elgin est venu pour des croquis, il est reparti avec la moiti\u00E9 du temple.",
    },
    {
      text: "En 2009, la Gr\u00E8ce a frapp\u00E9 un grand coup \u2014 pas avec des avocats, mais avec de l\u2019architecture. Ath\u00E8nes a inaugur\u00E9 le nouveau mus\u00E9e de l\u2019Acropole, un b\u00E2timent de verre spectaculaire au pied m\u00EAme du Parth\u00E9non. \u00C0 l\u2019int\u00E9rieur, une galerie reproduit les dimensions exactes du temple original. Les sculptures que la Gr\u00E8ce poss\u00E8de encore sont \u00E0 leur place d\u2019origine. L\u00E0 o\u00F9 devraient se trouver les pi\u00E8ces de Londres, il n\u2019y a que du vide. Pas besoin d\u2019\u00E9tiquettes. Les absences parlent d\u2019elles-m\u00EAmes.",
    },
    {
      text: "M\u00EAme le nom est un champ de bataille. Dites \u00AB\u00A0marbres d\u2019Elgin\u00A0\u00BB et vous d\u00E9signez un lord britannique comme leur propri\u00E9taire. Dites \u00AB\u00A0sculptures du Parth\u00E9non\u00A0\u00BB et vous les rendez \u00E0 Ath\u00E8nes. Ces sculptures de 2\u00A0500\u00A0ans racontaient les exploits des dieux et des h\u00E9ros. Aujourd\u2019hui, elles racontent une tout autre histoire \u2014 celle des empires, de la possession et d\u2019une question sans r\u00E9ponse\u00A0: quand on arrache quelque chose de beau \u00E0 un peuple conquis, peut-on vraiment appeler \u00E7a le sien\u00A0?",
    },
  ],

  updatedAt: Math.floor(Date.now() / 1000),
};

// Validate before push
console.log("=== PRE-PUSH VALIDATION (FRENCH) ===");
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
  console.log("✅ SUCCESS! French story pushed.");
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
    Key: { siteId: "acropolis-athens", langStoryId: "fr#elgin-marbles" },
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
