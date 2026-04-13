// Push French recreation of "The Treasury Carved by Djinn" (Le Trésor taillé par les djinns)
// to the Story DynamoDB table.
//
// French proverb subverted: «Tout ce qui brille n'est pas or»
//   → Here, what DIDN'T shine was far more precious than any gold

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const now = Math.floor(Date.now() / 1000);

// ═══════════════════════════════════════════════════════════════════
//  FRENCH — Le Trésor taillé par les djinns
//  Proverb subverted: «Tout ce qui brille n'est pas or»
//  Register: Modern French storyteller — quality podcast tone.
//  Told, not read.
// ═══════════════════════════════════════════════════════════════════
const fr = {
  siteId: "petra",
  storyId: "treasury-carved-by-djinn",
  lang: "fr",
  langStoryId: "fr#treasury-carved-by-djinn",
  icon: "\u{1F3DB}\uFE0F",
  tier: "S",
  readingTimeMinutes: 7,
  image: "",
  disabled: false,
  thumbnail: "",
  coordinates: { lat: 30.3216, lng: 35.4513 },
  hasAudio: false,
  isFree: true,
  isFeatured: false,
  storyCategory: "gods_monsters",
  updatedAt: now,

  title: "Le Tr\u00e9sor taill\u00e9 par les djinns",
  subtitle:
    "Comment une falaise de gr\u00e8s est devenue la plus belle l\u00e9gende du d\u00e9sert",
  excerpt:
    "Les B\u00e9douins juraient qu\u2019aucune main humaine n\u2019avait sculpt\u00e9 cette fa\u00e7ade de quarante m\u00e8tres. C\u2019\u00e9tait l\u2019\u0153uvre des djinns \u2014 et l\u2019or du Pharaon \u00e9tait cach\u00e9 tout en haut.",
  moralOrLesson:
    "Les hommes ont cribl\u00e9 de balles une urne de pierre pendant des si\u00e8cles. Parfois, ce n\u2019est pas l\u2019or qu\u2019on cherche \u2014 c\u2019est le droit de croire \u00e0 l\u2019impossible.",
  source:
    "Burckhardt, Johann Ludwig. Travels in Syria and the Holy Land, 1822; Farajat, Suleiman. Fouilles d\u2019al-Khazneh (2003); Diodore de Sicile, Bibliotheca Historica XIX.94-95; McKenzie, Judith. The Architecture of Petra, 1990; Joukowsky, Martha Sharp. Petra Great Temple, fouilles de Brown University; Madain Project, documentation de la crypte d\u2019al-Khazneh",
  characters: [
    "Le Pharaon (l\u00e9gendaire)",
    "Les Djinns (b\u00e2tisseurs surnaturels)",
    "Roi Ar\u00e9tas IV",
    "Johann Ludwig Burckhardt (Sheikh Ibrahim)",
    "Roi Salomon (ma\u00eetre des djinns)",
  ],
  era: "Ier si\u00e8cle av. J.-C. \u2013 Ier si\u00e8cle apr. J.-C. (construction) ; 1812 (red\u00e9couverte par Burckhardt)",

  paragraphs: [
    {
      text: "Les B\u00e9douins n\u2019ont jamais appel\u00e9 \u00e7a un tombeau. Pour eux, c\u2019\u00e9tait Khaznat al-Firaoun \u2014 le Tr\u00e9sor du Pharaon. La l\u00e9gende raconte que le Pharaon n\u2019est pas mort en poursuivant Mo\u00efse \u00e0 travers la mer Rouge. Il a surv\u00e9cu, il a traqu\u00e9 Mo\u00efse vers le sud, dans les montagnes, avec des chariots remplis d\u2019or vol\u00e9. Quand la gorge est devenue trop \u00e9troite pour ses chars, il a fait ce que tout roi-sorcier aurait fait. Il a appel\u00e9 les djinns.",
    },
    {
      text: "Les djinns, dans la tradition islamique, sont des \u00eatres faits de feu sans fum\u00e9e \u2014 des esprits puissants entre le monde des hommes et celui de Dieu. Le Coran dit que le roi Salomon les avait d\u00e9j\u00e0 command\u00e9s pour b\u00e2tir son temple \u00e0 J\u00e9rusalem. Le Pharaon a invoqu\u00e9 cette m\u00eame force. Et les djinns ont r\u00e9pondu. En une seule nuit, ils ont taill\u00e9 dans la falaise une fa\u00e7ade de quarante m\u00e8tres. Colonnes, statues, salles secr\u00e8tes \u2014 tout dans la roche. Au sommet, ils ont scell\u00e9 l\u2019or dans une urne de pierre. Puis ils ont disparu.",
    },
    {
      text: "Pendant des si\u00e8cles, les B\u00e9douins ont cru que l\u2019or \u00e9tait vraiment l\u00e0-haut. Et ce n\u2019\u00e9tait pas juste des histoires autour du feu \u2014 ils tiraient dessus. Les voyageurs des ann\u00e9es 1700 et 1800 ont trouv\u00e9 l\u2019urne cribl\u00e9e de centaines d\u2019impacts de balles, tir\u00e9es par des g\u00e9n\u00e9rations de guerriers qui voulaient la faire \u00e9clater. Le probl\u00e8me : l\u2019urne est un bloc de pierre massif, sculpt\u00e9 directement dans la falaise. Il n\u2019y a jamais rien eu \u00e0 l\u2019int\u00e9rieur. Mais les traces sont toujours l\u00e0 \u2014 un monument \u00e0 ceux qui voulaient trop que la l\u00e9gende soit vraie.",
    },
    {
      text: "Les vrais b\u00e2tisseurs \u00e9taient plus impressionnants que n\u2019importe quel esprit. Au premier si\u00e8cle, les Nabat\u00e9ens \u2014 des nomades arabes devenus les marchands les plus riches du Moyen-Orient \u2014 ont sculpt\u00e9 ce tombeau royal pour leur plus grand roi, Ar\u00e9tas IV. La fa\u00e7ade est une d\u00e9monstration de puissance : colonnes \u00e0 la grecque, statues de dieux gardiens, aigles pour porter les \u00e2mes vers le ciel. Elle \u00e9tait plac\u00e9e pile pour que chaque voyageur entrant dans P\u00e9tra par le canyon \u00e9troit la voie en premier \u2014 et sache dans quel royaume il venait de mettre les pieds.",
    },
    {
      text: "Aucun Europ\u00e9en ne l\u2019avait vue depuis mille ans. En 1812, l\u2019explorateur suisse Johann Ludwig Burckhardt s\u2019est gliss\u00e9 \u00e0 l\u2019int\u00e9rieur d\u00e9guis\u00e9 en Sheikh Ibrahim. Il avait pass\u00e9 trois ans \u00e0 apprendre l\u2019arabe et le Coran pour ce moment. Son pr\u00e9texte : sacrifier une ch\u00e8vre sur la tombe du proph\u00e8te Aaron. Son guide l\u2019a men\u00e9 \u00e0 travers un canyon de quatre-vingt-dix m\u00e8tres de profondeur. Quand ils en sont sortis, le Tr\u00e9sor a rempli tout son champ de vision. \u00ab\u202fJe vois que tu es un infid\u00e8le\u202f\u00bb, a dit le guide. Burckhardt a recul\u00e9 \u2014 mais il venait de retrouver une des plus grandes cit\u00e9s perdues du monde.",
    },
    {
      text: "En 2003, des arch\u00e9ologues ont creus\u00e9 sous le Tr\u00e9sor et trouv\u00e9 ce que la l\u00e9gende avait toujours cach\u00e9. Pas de l\u2019or \u2014 des tombes. \u00c0 six m\u00e8tres sous terre, des chambres avec les restes d\u2019au moins onze personnes, des vases et de l\u2019encens \u00e0 c\u00f4t\u00e9 d\u2019eux. En 2024, une autre \u00e9quipe a d\u00e9couvert douze squelettes de plus, intacts depuis deux mille ans. On dit que tout ce qui brille n\u2019est pas or \u2014 ici, tout ce qui ne brillait pas \u00e9tait bien plus pr\u00e9cieux. Le Tr\u00e9sor n\u2019a jamais \u00e9t\u00e9 un coffre-fort. Depuis le d\u00e9but, c\u2019\u00e9tait un tombeau.",
    },
    {
      text: "La l\u00e9gende refuse de mourir. Steven Spielberg a transform\u00e9 le Tr\u00e9sor en cachette du Saint-Graal dans Indiana Jones et la Derni\u00e8re Croisade. Les vraies salles derri\u00e8re la fa\u00e7ade\u202f? Petites, nues, sans rien \u2014 rien \u00e0 voir avec le film. Mais \u00e7a ne change rien. Il y a quelque chose dans la fa\u00e7on dont la lumi\u00e8re de l\u2019aube frappe ce gr\u00e8s et le transforme en feu vivant qui arr\u00eate m\u00eame le plus sceptique des voyageurs. Peut-\u00eatre que les djinns \u00e9taient r\u00e9els. Peut-\u00eatre que l\u2019or est toujours l\u00e0, plus profond que personne n\u2019a jamais creus\u00e9.",
    },
  ],
};

// ─── Validation & Push ───
async function pushStory(item, label) {
  console.log(`\nPushing ${label}...`);
  console.log(`  siteId:      ${item.siteId}`);
  console.log(`  langStoryId: ${item.langStoryId}`);
  console.log(`  title:       ${item.title}`);
  console.log(`  paragraphs:  ${item.paragraphs.length}`);

  // Field validation
  if (!item.siteId || !item.langStoryId || !item.lang || !item.title) {
    throw new Error(`${label}: Missing required fields`);
  }
  if (item.paragraphs.length < 6 || item.paragraphs.length > 10) {
    throw new Error(
      `${label}: Paragraph count ${item.paragraphs.length} out of range`
    );
  }

  // Per-paragraph validation
  for (let i = 0; i < item.paragraphs.length; i++) {
    const t = item.paragraphs[i].text;
    if (!t || t.length === 0) {
      throw new Error(`${label}: Paragraph ${i} is empty`);
    }
    if (t.length > 600) {
      console.warn(`  ⚠ Paragraph ${i} is ${t.length} chars (target <500)`);
    } else {
      console.log(`  P${i}: ${t.length} chars ✓`);
    }
  }

  const totalChars = item.paragraphs.reduce((sum, p) => sum + p.text.length, 0);
  console.log(`  totalChars:  ${totalChars}`);

  // Word count per paragraph
  for (let i = 0; i < item.paragraphs.length; i++) {
    const words = item.paragraphs[i].text.split(/\s+/).length;
    if (words > 100) {
      console.warn(`  ⚠ Paragraph ${i} has ${words} words (target <100)`);
    }
  }

  try {
    await docClient.send(
      new PutCommand({
        TableName: "Story",
        Item: item,
        ConditionExpression:
          "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
      })
    );
    console.log(`  ✅ ${label} pushed successfully.`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.error(`  ❌ ${label}: Record already exists! Skipping.`);
    } else {
      console.error(`  ❌ ${label} FAILED:`, err.message);
      throw err;
    }
  }
}

async function main() {
  console.log("═══════════════════════════════════════════════════");
  console.log("Treasury Carved by Djinn — French (fr) push");
  console.log(`Timestamp: ${now}`);
  console.log("═══════════════════════════════════════════════════");

  await pushStory(fr, "FRENCH");

  console.log("\n✅ French version pushed successfully.");
}

main().catch((err) => {
  console.error("\n💥 Fatal error:", err.message);
  process.exit(1);
});
