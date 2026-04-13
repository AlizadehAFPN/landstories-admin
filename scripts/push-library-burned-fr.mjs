// Push French recreation of "The Library That Burned for Seven Days"
// siteId: alamut-castle, storyId: library-burned-seven-days
// Cultural proverb subverted: "Petit a petit, l'oiseau fait son nid"
//   — the Ismailis built their library over 170 years; the Mongols burned it in 7 days.

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

const fr = {
  siteId: "alamut-castle",
  storyId: "library-burned-seven-days",
  lang: "fr",
  langStoryId: "fr#library-burned-seven-days",

  title: "Sept jours pour effacer deux si\u00e8cles",

  subtitle:
    "Quatre cent mille livres, une forteresse au sommet du monde, et la plus grande biblioth\u00e8que qu\u2019on ne lira jamais",

  excerpt:
    "En 1090, un homme s\u2019enferme dans une forteresse perch\u00e9e sur un rocher en Iran. Il ne fait presque rien d\u2019autre que lire pendant trente-quatre ans. Cent soixante-dix ans plus tard, sa biblioth\u00e8que contient quatre cent mille volumes. Les Mongols mettront sept jours \u00e0 tout r\u00e9duire en cendres.",

  moralOrLesson:
    "On peut reconstruire des murs. On peut relever des royaumes. Mais on ne peut jamais d\u00e9-br\u00fbler un livre. La vraie trag\u00e9die d\u2019Alamut, ce n\u2019est pas ce qu\u2019on a perdu \u2014 c\u2019est qu\u2019on ne saura jamais ce qu\u2019on a perdu.",

  icon: "\uD83D\uDD25",
  storyCategory: "lost_found",
  era: "November-December 1256 CE (Mongol destruction of Alamut)",
  tier: "S",
  isFree: false,
  isFeatured: false,
  hasAudio: false,
  readingTimeMinutes: 3,
  coordinates: { lat: 36.4447, lng: 50.5861 },
  thumbnail: "",
  image: "",
  disabled: false,
  source:
    "Ata-Malik Juvayni, Tarikh-i Jahangushay (c.1260); Rashid al-Din Hamadani, Jami al-Tawarikh (c.1310); Farhad Daftary, The Isma'ilis: Their History and Doctrines (Cambridge, 2007); Peter Willey, Eagle's Nest: Ismaili Castles in Iran and Syria (I.B. Tauris, 2005); Encyclopaedia Iranica; Hamideh Chubak, Alamut archaeological reports (2004)",

  characters: [
    "Hassan-i Sabbah (fondateur d\u2019Alamut et b\u00e2tisseur de la biblioth\u00e8que)",
    "Nasir al-Din al-Tusi (polymathe qui a surv\u00e9cu \u00e0 la destruction)",
    "H\u00fclag\u00fc Khan (chef mongol qui a ordonn\u00e9 la destruction)",
    "Juvayni (historien qui a br\u00fbl\u00e9 la biblioth\u00e8que)",
    "Rukn al-Din Khurshah (dernier seigneur d\u2019Alamut)",
  ],

  paragraphs: [
    {
      text: "En 1090, un certain Hassan-i Sabbah r\u00e9ussit un coup de ma\u00eetre. Il s\u2019empare d\u2019Alamut \u2014 une forteresse pos\u00e9e sur un pic rocheux dans les montagnes de l\u2019Alborz, au nord de l\u2019Iran \u2014 sans verser une seule goutte de sang. Puis il s\u2019enferme. Trente-quatre ans, presque sans sortir. Ce qu\u2019il fait l\u00e0-dedans\u00a0? Il lit. Il rassemble. Il b\u00e2tit, livre apr\u00e8s livre, l\u2019une des plus grandes biblioth\u00e8ques du monde islamique.",
    },
    {
      text: "Petit \u00e0 petit, l\u2019oiseau fait son nid. Pendant cent soixante-dix ans, chaque chef qui succ\u00e8de \u00e0 Hassan ajoute \u00e0 la collection. Au milieu du XIIIe si\u00e8cle, la biblioth\u00e8que compte environ quatre cent mille volumes \u2014 th\u00e9ologie, astronomie, m\u00e9decine, po\u00e9sie. Des savants traversent le monde musulman pour venir \u00e9tudier dans cette vall\u00e9e perdue. Ce n\u2019est plus une collection. C\u2019est l\u2019un des centres du savoir sur terre.",
    },
    {
      text: "Parmi ces savants, il y a Nasir al-Din al-Tusi \u2014 sans doute l\u2019esprit scientifique le plus brillant du XIIIe si\u00e8cle musulman. Il vit \u00e0 Alamut pendant plus de trente ans. Il y \u00e9crit des travaux sur l\u2019astronomie qui finiront par atteindre Copernic dans l\u2019Europe de la Renaissance. Il ne se contente pas de lire\u00a0: il relie les disciplines entre elles, il repousse les limites de ce qu\u2019on croyait possible.",
    },
    {
      text: "En 1256, les Mongols arrivent. H\u00fclag\u00fc Khan \u2014 petit-fils de Gengis Khan \u2014 am\u00e8ne plus de cent mille soldats dans la montagne avec un seul objectif\u00a0: raser ce qui tient l\u00e0 depuis presque deux si\u00e8cles. Le dernier chef, un jeune homme nomm\u00e9 Rukn al-Din, tente de n\u00e9gocier. Il commence m\u00eame \u00e0 d\u00e9molir ses propres murailles pour prouver sa reddition. \u00c7a ne change rien. H\u00fclag\u00fc veut la destruction totale.",
    },
    {
      text: "Et voil\u00e0 ce qui fait vraiment mal. Avant qu\u2019on allume le feu, un historien nomm\u00e9 Juvayni \u2014 qui voyage avec l\u2019arm\u00e9e mongole \u2014 obtient le droit de traverser la biblioth\u00e8que. C\u2019est un homme cultiv\u00e9. Il comprend exactement ce qu\u2019il a sous les yeux. Il sauve les Corans. Il sauve les instruments d\u2019astronomie. Il lit m\u00eame l\u2019autobiographie de Hassan-i Sabbah. Puis il met le feu au reste. La biblioth\u00e8que br\u00fble sept jours et sept nuits.",
    },
    {
      text: "Al-Tusi, lui, survit. Il change de camp \u2014 par trahison ou par instinct de survie, personne ne le sait vraiment \u2014 et devient le conseiller scientifique de H\u00fclag\u00fc. Il le convainc de construire un observatoire \u00e0 Maragha et le remplit de quatre cent mille livres pill\u00e9s dans les villes conquises. Le travail qui en sort finira par nourrir Copernic. Une partie de ce qu\u2019al-Tusi portait dans sa t\u00eate a travers\u00e9 le feu. Mais une partie seulement.",
    },
    {
      text: "Aujourd\u2019hui, un tiers d\u2019Alamut tient encore debout sur son rocher. Les arch\u00e9ologues ont trouv\u00e9 des canaux qui retiennent l\u2019eau depuis huit si\u00e8cles. Les gens sont revenus apr\u00e8s le d\u00e9part des Mongols \u2014 ils reviennent toujours. Mais la biblioth\u00e8que, elle, a disparu. Quatre cent mille volumes. On sait ce qu\u2019un homme de g\u00e9nie a emport\u00e9 dans sa m\u00e9moire. On ne saura jamais ce qui a br\u00fbl\u00e9.",
    },
  ],

  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// VALIDATION
// ═══════════════════════════════════════════════════════════════════════════════

let totalChars = 0;
let allValid = true;

for (let i = 0; i < fr.paragraphs.length; i++) {
  const t = fr.paragraphs[i].text;
  const chars = t.length;
  const words = t.split(/\s+/).length;
  totalChars += chars;

  const charOk = chars <= 500;
  const wordOk = words <= 100;

  console.log(
    `P${i + 1}: ${chars} chars, ${words} words ${charOk ? "\u2713" : "\u2717 OVER 500 CHARS"} ${wordOk ? "\u2713" : "\u2717 OVER 100 WORDS"}`
  );

  if (!charOk || !wordOk) allValid = false;
}

console.log(`\nTotal: ${totalChars} chars across ${fr.paragraphs.length} paragraphs`);
console.log(`Target: ~3000 chars (\u00b120% = 2400\u20133600)`);
console.log(
  `Status: ${totalChars >= 2400 && totalChars <= 3600 ? "\u2713 WITHIN RANGE" : "\u2717 OUT OF RANGE"}`
);

if (!allValid) {
  console.error("\n\u274c Validation failed \u2014 aborting.");
  process.exit(1);
}

if (totalChars < 2400 || totalChars > 3600) {
  console.error("\n\u274c Total character count out of range \u2014 aborting.");
  process.exit(1);
}

// ═══════════════════════════════════════════════════════════════════════════════
// PUSH TO DYNAMODB
// ═══════════════════════════════════════════════════════════════════════════════

async function pushStory(record) {
  const label = `${record.lang}#${record.storyId}`;
  console.log(`\n\u23f3 Pushing ${label} ...`);

  const json = JSON.stringify(record);
  const parsed = JSON.parse(json);
  if (parsed.paragraphs.length !== record.paragraphs.length) {
    throw new Error(`JSON round-trip mismatch for ${label}`);
  }

  try {
    await doc.send(
      new PutCommand({
        TableName: TABLE,
        Item: record,
        ConditionExpression: "attribute_not_exists(langStoryId)",
      })
    );
    console.log(`\u2705 ${label} pushed successfully.`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(
        `\u26a0\ufe0f  ${label} already exists. Overwriting with updated version...`
      );
      await doc.send(
        new PutCommand({ TableName: TABLE, Item: record })
      );
      console.log(`\u2705 ${label} overwritten successfully.`);
    } else {
      console.error(`\u274c Failed to push ${label}:`, err.message);
      throw err;
    }
  }
}

async function main() {
  console.log("=== Pushing Library Burned story (fr) to DynamoDB ===");
  console.log(`Table: ${TABLE}`);
  console.log(`Timestamp: ${now}`);

  await pushStory(fr);

  console.log("\n=== French translation pushed successfully ===");
}

main().catch((err) => {
  console.error("\n Fatal error:", err);
  process.exit(1);
});
