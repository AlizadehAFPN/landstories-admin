import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const item = {
  // Keys
  siteId: "sigiriya",
  langStoryId: "fr#mirror-wall-poets",

  // Identity
  storyId: "mirror-wall-poets",
  lang: "fr",

  // Classification (unchanged from English)
  storyCategory: "living_heritage",
  tier: "A",
  icon: "\u270D\uFE0F",
  image: "",
  thumbnail: "",
  isFree: true,
  disabled: false,
  hasAudio: false,
  readingTimeMinutes: 4,

  // Geo & metadata (unchanged)
  coordinates: { lat: 7.957, lng: 80.7603 },
  era: "6th-14th century CE (graffiti period); 1956 (Paranavitana's publication)",
  source:
    "Paranavitana, Senarath. Sigiri Graffiti: Being Sinhalese Verses of the Eighth, Ninth, and Tenth Centuries, 2 vols., Oxford University Press, 1956; Bandaranayake, Senake. Sigiriya: City, Palace and Royal Gardens, 2005; MAP Academy, 'Desires, Reactions, Interpretations: Murals and Inscriptions from Sigiriya'; Bell, H.C.P. Archaeological Survey of Ceylon, Annual Reports 1896-1904",
  characters: [
    "Kiti (moine bouddhiste qui mettait en garde contre le d\u00E9sir)",
    "Deva, \u00E9pouse de Mahamata (jalouse des femmes peintes)",
    "Une visiteuse anonyme (qui se moquait des po\u00E8tes)",
    "Senarath Paranavitana (arch\u00E9ologue qui a d\u00E9chiffr\u00E9 685 vers)",
    "Des centaines de visiteurs anonymes sur huit si\u00E8cles",
  ],

  // === FRENCH TEXT ===

  title: "Les po\u00E8tes du mur miroir",

  subtitle:
    "Pendant huit cents ans, des visiteurs ont gravi un rocher au Sri Lanka, contempl\u00E9 des femmes peintes dans les nuages et grav\u00E9 des po\u00E8mes d'amour sur un mur poli \u2014 cr\u00E9ant la plus ancienne collection de po\u00E9sie cinghalaise jamais d\u00E9couverte",

  excerpt:
    "Sous les femmes peintes, un mur avait \u00E9t\u00E9 poli comme un miroir pour refl\u00E9ter leur beaut\u00E9. Et pendant huit cents ans, les visiteurs ont fait quelque chose que personne n'avait pr\u00E9vu : \u00E9crire de la po\u00E9sie.",

  moralOrLesson:
    "On croit que laisser sa trace est une invention moderne \u2014 commentaires, posts, tags. Mais le mur miroir prouve le contraire. Il y a quinze si\u00E8cles, des gens ont regard\u00E9 quelque chose de beau et ont ressenti exactement ce que nous ressentons aujourd'hui : l'envie de dire quelque chose, de l'\u00E9crire, de le fixer pour toujours. Le c\u0153ur humain n'a pas chang\u00E9. On tombe toujours sous le charme des images, on \u00E9crit toujours des mots que personne ne lira peut-\u00EAtre, et on croit toujours que mettre nos \u00E9motions par \u00E9crit les rendra, d'une certaine fa\u00E7on, permanentes.",

  paragraphs: [
    {
      text: "Au Ve si\u00E8cle, un roi sri-lankais nomm\u00E9 Kashyapa fit polir un mur comme un miroir sur Sigiriya, une forteresse de roc surgissant de la jungle. Le mur longeait le passage sous les Demoiselles des Nuages \u2014 des femmes peintes en or, flottant parmi les nu\u00E9es. La recette \u00E9tait improbable : chaux, blancs d'\u0153ufs, miel sauvage, le tout poli \u00E0 la cire d'abeille. En marchant le long du mur, les femmes apparaissaient \u00E0 vos c\u00F4t\u00E9s \u2014 r\u00E9elles au-dessus, refl\u00E9t\u00E9es en dessous. Un caprice de roi. Qui est devenu le tr\u00E9sor de tous.",
    },
    {
      text: "Quand Kashyapa tomba en 495 \u2014 tu\u00E9 au combat par son propre fr\u00E8re venu reprendre le tr\u00F4ne \u2014 la forteresse devint un monast\u00E8re bouddhiste. Les Demoiselles des Nuages cess\u00E8rent d'\u00EAtre le plaisir priv\u00E9 d'un roi. Moines, p\u00E8lerins, soldats, marchands, paysans : quiconque grimpait le rocher pouvait les voir. Et l\u00E0, quelque chose d'impr\u00E9vu se produisit. Les visiteurs, boulevers\u00E9s par ce qu'ils d\u00E9couvraient, sortirent des outils pointus et grav\u00E8rent leurs \u00E9motions dans la surface polie. Ils transform\u00E8rent un miroir en carnet.",
    },
    {
      text: "Pendant huit cents ans \u2014 du VIe au XIVe si\u00E8cle \u2014 les visiteurs grav\u00E8rent plus de mille huit cents inscriptions dans le mur. Po\u00E8mes d'amour, r\u00E9flexions, mises en garde bouddhistes, plaisanteries, simples notes disant 'j'\u00E9tais l\u00E0.' En cinghalais, sanskrit et tamoul. Ce n'\u00E9tait pas un projet litt\u00E9raire. C'\u00E9tait l'instinct humain \u00E0 l'\u00E9tat pur : voir quelque chose de beau et avoir besoin d'en parler. Ces vers grav\u00E9s dans la pierre sont devenus la plus ancienne collection de po\u00E9sie cinghalaise connue.",
    },
    {
      text: "La plupart des po\u00E8tes \u00E9taient des hommes, et leur sujet \u00E9tait le d\u00E9sir. 'La fille \u00E0 la peau dor\u00E9e a ensorcel\u00E9 mon esprit et mes yeux,' \u00E9crivit l'un d'eux. Un autre avoua que les femmes peintes l'avaient laiss\u00E9 tremblant : 'Touch\u00E9 par leur regard en coin, je me suis \u00E9croul\u00E9.' Ce n'\u00E9taient pas des touristes distraits. C'\u00E9taient des hommes d\u00E9faits par la beaut\u00E9 \u2014 debout sur un passage \u00E9troit, levant les yeux vers des femmes dor\u00E9es dans des nuages peints, cherchant des mots \u00E0 la hauteur de ce qu'ils ressentaient.",
    },
    {
      text: "Mais les femmes avaient un autre regard. Deva \u2014 identifi\u00E9e seulement comme 'l'\u00E9pouse de Mahamata' \u2014 laissa un vers charg\u00E9 de jalousie : 'Cette biche aux yeux de velours sur la falaise me rend folle. Elle exhibe ses perles et flirte avec mon mari.' Et une femme anonyme grava la r\u00E9plique la plus ac\u00E9r\u00E9e du mur : 'En tant que femme, j'ai piti\u00E9 des peintes. Vous, hommes idiots, \u00E0 vouloir \u00E9crire des chansons. Aucun ne nous a apport\u00E9 du rhum et de la m\u00E9lasse.' Quinze si\u00E8cles plus tard, \u00E7a pique encore.",
    },
    {
      text: "Puis il y avait le moine Kiti, qui voyait ce que les amoureux ne pouvaient voir. Son inscription est un avertissement : 'Si tu t'attardes ici, ne perds pas ton c\u0153ur. Le plaisir m\u00E8ne \u00E0 la douleur. La douleur ressemble au plaisir.' Kiti avait compris : les Demoiselles des Nuages \u00E9taient la le\u00E7on \u2014 belles, d\u00E9sirables, inaccessibles. On dit que les paroles s'envolent et que les \u00E9crits restent. Sous ces peintures, mille huit cents inscriptions de d\u00E9sir grav\u00E9es dans la pierre le confirment.",
    },
    {
      text: "En 1956, l'arch\u00E9ologue Senarath Paranavitana publia la traduction de 685 de ces vers \u2014 rendant leur voix \u00E0 des inconnus muets depuis plus de mille ans. Et voici le retournement final : le mur miroir avait \u00E9t\u00E9 construit pour refl\u00E9ter la beaut\u00E9. Mais le temps a brouill\u00E9 le miroir. Le reflet a disparu. Ce qui a surv\u00E9cu, ce sont les mots de ceux qui se tenaient l\u00E0 o\u00F9 le reflet avait \u00E9t\u00E9 et qui ont tent\u00E9 de d\u00E9crire ce qu'ils voyaient. Le miroir s'est effac\u00E9. Les mots sont rest\u00E9s.",
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
console.log("subtitle:", item.subtitle.length, "chars");
console.log("paragraphs:", item.paragraphs.length);

let totalChars = 0;
let totalWords = 0;
item.paragraphs.forEach((p, i) => {
  const chars = p.text.length;
  const words = p.text.split(/\s+/).length;
  totalChars += chars;
  totalWords += words;
  console.log(`  P${i + 1}: ${chars} chars, ${words} words`);
  if (chars > 500) console.warn(`  \u26A0 P${i + 1} exceeds 500 char limit!`);
  if (words > 100) console.warn(`  \u26A0 P${i + 1} exceeds 100 word limit!`);
});
console.log(
  `  TOTAL: ${totalChars} chars, ${totalWords} words across ${item.paragraphs.length} paragraphs`
);
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

// Push to DynamoDB
console.log("\n=== PUSHING TO DYNAMODB ===");
try {
  const result = await doc.send(
    new PutCommand({
      TableName: "Story",
      Item: item,
    })
  );
  console.log("SUCCESS! French story pushed.");
  console.log("HTTP status:", result.$metadata.httpStatusCode);
} catch (err) {
  console.error("PUSH FAILED:", err.message);
  console.error(err);
  process.exit(1);
}

// Verify by reading back
console.log("\n=== VERIFICATION READ ===");
try {
  const verify = await doc.send(
    new GetCommand({
      TableName: "Story",
      Key: { siteId: "sigiriya", langStoryId: "fr#mirror-wall-poets" },
    })
  );
  if (verify.Item) {
    console.log("VERIFIED! Record exists in DynamoDB.");
    console.log("  title:", verify.Item.title);
    console.log("  lang:", verify.Item.lang);
    console.log("  langStoryId:", verify.Item.langStoryId);
    console.log("  paragraphs:", verify.Item.paragraphs.length);
    console.log("  updatedAt:", verify.Item.updatedAt);
  } else {
    console.error("VERIFICATION FAILED: Record not found after push!");
    process.exit(1);
  }
} catch (err) {
  console.error("VERIFICATION READ FAILED:", err.message);
  process.exit(1);
}
