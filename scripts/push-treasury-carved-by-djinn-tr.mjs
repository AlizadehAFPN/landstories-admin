import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const now = Math.floor(Date.now() / 1000);

// ═══════════════════════════════════════════════════════════════════
//  TURKISH — Cinlerin Oyduğu Hazine
//  Proverb subverted: «Sabrın sonu selamettir»
//  (Patience leads to salvation — but centuries of Bedouin patience
//   and bullets only left a rock full of holes. No gold, no salvation.)
//  Register: Modern Turkish storyteller — quality podcast tone.
//  Told, not read.
// ═══════════════════════════════════════════════════════════════════
const tr = {
  siteId: "petra",
  storyId: "treasury-carved-by-djinn",
  lang: "tr",
  langStoryId: "tr#treasury-carved-by-djinn",
  icon: "\uD83C\uDFDB\uFE0F",
  tier: "S",
  readingTimeMinutes: 7,
  image: "",
  disabled: false,
  thumbnail: "",
  coordinates: { lng: 35.4513, lat: 30.3216 },
  hasAudio: false,
  isFree: true,
  storyCategory: "gods_monsters",
  updatedAt: now,

  title: "Cinlerin Oydu\u011fu Hazine",
  subtitle:
    "Petra\u2019n\u0131n imk\u00e2ns\u0131z an\u0131t\u0131n\u0131 tek gecede kayadan oydu\u011fu s\u00f6ylenen cinlerin Bedevi efsanesi",
  excerpt:
    "Bedeviler ona hi\u00e7bir zaman mezar demediler. Ad\u0131 \u201cFiravun\u2019un Hazinesi\u201dydi \u2014 ve insan elinin de\u011fmedi\u011fine yemin ederlerdi.",
  moralOrLesson:
    "\u0130nsan elinden \u00e7\u0131kan en b\u00fcy\u00fck eserler, dilden dile ge\u00e7tik\u00e7e cinlerin ve tanr\u0131lar\u0131n eseri olur. \u00c7\u00fcnk\u00fc \u00e7oktan unutulmu\u015f fanilerin bir zamanlar bizim yapamayaca\u011f\u0131m\u0131z \u015feyleri ba\u015fard\u0131\u011f\u0131n\u0131 kabullenmek bize a\u011f\u0131r gelir.",
  source:
    "Burckhardt, Johann Ludwig. Suriye ve Kutsal Topraklarda Seyahatler, 1822; Farajat, S\u00fcleyman. El-Hazne Kaz\u0131lar\u0131 (2003); Diodorus Siculus, Bibliotheca Historica XIX.94-95; McKenzie, Judith. Petra Mimarisi, 1990; Joukowsky, Martha Sharp. Petra B\u00fcy\u00fck Tap\u0131nak, Brown \u00dcniversitesi Kaz\u0131lar\u0131; Madain Projesi, el-Hazne Mezar Mahzeni belgeleri",
  characters: [
    "Firavun (efsanevi)",
    "Cinler (do\u011fa\u00fcst\u00fc in\u015faat\u00e7\u0131lar)",
    "Kral IV. Aretas",
    "Johann Ludwig Burckhardt (\u015eeyh \u0130brahim)",
    "Hz. S\u00fcleyman (cinlerin efendisi)",
  ],
  era: "M\u00d6 1. y\u00fczy\u0131l \u2013 MS 1. y\u00fczy\u0131l (in\u015fa d\u00f6nemi); 1812 (Burckhardt\u2019\u0131n yeniden ke\u015ffi)",

  paragraphs: [
    {
      text: "Bedeviler ona hi\u00e7bir zaman mezar demediler. Onlar i\u00e7in ad\u0131 \u201cFiravun\u2019un Hazinesi\u201dydi \u2014 ve insan elinin de\u011fmedi\u011fine yemin ederlerdi. Efsaneye g\u00f6re Firavun, K\u0131z\u0131ldeniz\u2019de Musa\u2019y\u0131 kovalarken bo\u011fulmad\u0131. Kurtuldu, izini g\u00fcneye do\u011fru da\u011flar\u0131n aras\u0131ndan s\u00fcrd\u00fc \u2014 arkas\u0131nda \u00e7al\u0131nt\u0131 alt\u0131nlarla y\u00fckl\u00fc arabalar. Vadi arabalara dar gelince, her b\u00fcy\u00fcc\u00fc kral\u0131n yapaca\u011f\u0131 \u015feyi yapt\u0131: cinleri \u00e7a\u011f\u0131rd\u0131.",
    },
    {
      text: "\u0130slam inanc\u0131nda cinler dumans\u0131z ate\u015ften yarat\u0131lm\u0131\u015f varl\u0131klard\u0131r \u2014 insanlarla g\u00f6r\u00fcnmeyen \u00e2lem aras\u0131nda bir yerdeler. Kuran\u2019da S\u00fcleyman Peygamber\u2019in cinleri emri alt\u0131na al\u0131p Kud\u00fcs\u2019teki mabedini yapt\u0131rd\u0131\u011f\u0131 anlat\u0131l\u0131r. Bu sefer Firavun ayn\u0131 g\u00fcce seslenmi\u015fti. Ve cinler geldi. Tek gecede, kaya yamac\u0131ndan k\u0131rk metre y\u00fcksekli\u011finde bir cephe oydular \u2014 s\u00fctunlar, tanr\u0131 heykelleri, gizli odalar \u2014 hepsi tek par\u00e7a kayadan. En tepeye ta\u015ftan bir k\u00fcp koydular, alt\u0131n\u0131 i\u00e7ine m\u00fch\u00fcrlediler ve yok oldular.",
    },
    {
      text: "Y\u00fczy\u0131llar boyunca Bedeviler alt\u0131n\u0131n ger\u00e7ekten orada oldu\u011funa inand\u0131. Bu sadece masal de\u011fildi \u2014 k\u00fcpe t\u00fcfekle ate\u015f a\u00e7\u0131yorlard\u0131. On sekizinci ve on dokuzuncu y\u00fczy\u0131l gezginleri k\u00fcp\u00fc y\u00fczlerce kur\u015fun deli\u011fiyle kapl\u0131 buldu \u2014 nesiller boyu k\u0131rmaya \u00e7al\u0131\u015fm\u0131\u015flard\u0131. \u0130\u015fin asl\u0131: k\u00fcp, u\u00e7urumun kendisinden oyulmu\u015f som ta\u015ft\u0131. \u0130\u00e7inde hi\u00e7bir \u015fey yoktu, hi\u00e7bir zaman da olmam\u0131\u015ft\u0131. \u201cSabr\u0131n sonu selamettir\u201d derler \u2014 ama bu sefer sabr\u0131n sonu kur\u015fun deliklerinden ba\u015fka bir \u015fey vermedi.",
    },
    {
      text: "Ger\u00e7ek ustalar herhangi bir cinden \u00e7ok daha etkileyiciydi. Milattan sonra birinci y\u00fczy\u0131lda Nebatiler \u2014 \u00e7\u00f6l g\u00f6\u00e7ebelerinden Ortado\u011fu\u2019nun en zengin t\u00fcccarlar\u0131na d\u00f6n\u00fc\u015fm\u00fc\u015f Araplar \u2014 bu yap\u0131y\u0131 en b\u00fcy\u00fck krallar\u0131 IV. Aretas i\u00e7in an\u0131t mezar olarak oydular. Cephe ba\u015ftan a\u015fa\u011f\u0131 g\u00fc\u00e7 mesaj\u0131yd\u0131: Yunan tarz\u0131 s\u00fctunlar, \u00f6b\u00fcr d\u00fcnyay\u0131 koruyan tanr\u0131 heykelleri, ruhlar\u0131 g\u00f6\u011fe ta\u015f\u0131yan kartallar. Tam da Petra\u2019ya giren dar kanyondan \u00e7\u0131kan herkesin ilk g\u00f6rece\u011fi yere kondurdular \u2014 ayak bast\u0131\u011f\u0131n toprak kime ait, bilesindi.",
    },
    {
      text: "Bin y\u0131l boyunca hi\u00e7bir Avrupal\u0131 onu g\u00f6rmedi. 1812\u2019de \u0130svi\u00e7reli ka\u015fif Johann Ludwig Burckhardt, \u201c\u015eeyh \u0130brahim\u201d kimli\u011fiyle s\u0131zd\u0131 i\u00e7eri. Bu an i\u00e7in tam \u00fc\u00e7 y\u0131l Arap\u00e7a ve Kuran \u00f6\u011frenmi\u015fti. K\u0131l\u0131f\u0131: Hz. Harun\u2019un makam\u0131nda kurban kesmek. Rehberi onu doksan metre derinli\u011findeki bir kanyondan ge\u00e7irdi. Kanyon a\u00e7\u0131ld\u0131\u011f\u0131nda, Hazine g\u00f6z\u00fcn\u00fcn g\u00f6rd\u00fc\u011f\u00fc her yeri doldurdu. Rehber d\u00f6nd\u00fc: \u201cAnlad\u0131m, sen k\u00e2firsin.\u201d Burckhardt geri \u00e7ekildi \u2014 ama d\u00fcnyan\u0131n en b\u00fcy\u00fck kay\u0131p \u015fehirlerinden birini \u00e7oktan ke\u015ffetmi\u015fti.",
    },
    {
      text: "2003\u2019te arkeologlar Hazine\u2019nin alt\u0131n\u0131 kazd\u0131 ve efsanenin y\u00fczy\u0131llard\u0131r saklad\u0131\u011f\u0131 \u015feyi buldular. Alt\u0131n de\u011fil \u2014 mezar. Alt\u0131 metre derinlikte, en az on bir ki\u015finin kal\u0131nt\u0131lar\u0131n\u0131 bar\u0131nd\u0131ran odalar ortaya \u00e7\u0131kt\u0131; yanlar\u0131nda seramik kaplar ve t\u00fcts\u00fcler vard\u0131. 2024\u2019te ba\u015fka bir ekip yak\u0131nlarda on iki iskelet daha buldu \u2014 iki bin y\u0131ld\u0131r dokunulmam\u0131\u015f. Hazine hi\u00e7bir zaman bir kasa de\u011fildi. En ba\u015f\u0131ndan beri krall\u0131\u011f\u0131n en \u00f6nemli insanlar\u0131n\u0131n g\u00f6m\u00fcld\u00fc\u011f\u00fc bir an\u0131t mezard\u0131 \u2014 tam da \u015fehre giren herkesin \u00f6n\u00fcnden ge\u00e7ece\u011fi yerde.",
    },
    {
      text: "Efsane \u00f6lmeyi reddediyor. Steven Spielberg, Hazine\u2019yi Indiana Jones ve Son Ha\u00e7l\u0131 Seferi\u2019nde Kutsal K\u00e2se\u2019nin sakland\u0131\u011f\u0131 yer yapt\u0131. O g\u00f6rkemli cephenin arkas\u0131ndaki ger\u00e7ek odalar m\u0131? K\u00fc\u00e7\u00fck, \u00e7\u0131plak, sade \u2014 filmle uzaktan yak\u0131ndan alakas\u0131 yok. Ama bunun \u00f6nemi yok. \u015eafak vaktinde g\u00fcne\u015f o kumta\u015f\u0131na vurup onu canl\u0131 ate\u015fin rengine b\u00fcr\u00fcnd\u00fcrd\u00fc\u011f\u00fcnde, d\u00fcnyan\u0131n en \u015f\u00fcpheci insan\u0131 bile durup bak\u0131yor. Belki cinler ger\u00e7ekti. Belki alt\u0131n h\u00e2l\u00e2 orada \u2014 kimsenin hen\u00fcz kazmad\u0131\u011f\u0131 bir derinlikte.",
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
      console.warn(`  \u26a0 Paragraph ${i} is ${t.length} chars (target <500)`);
    } else {
      console.log(`  P${i}: ${t.length} chars \u2713`);
    }
  }

  const totalChars = item.paragraphs.reduce((sum, p) => sum + p.text.length, 0);
  console.log(`  totalChars:  ${totalChars}`);

  // Word count per paragraph
  for (let i = 0; i < item.paragraphs.length; i++) {
    const words = item.paragraphs[i].text.split(/\s+/).length;
    if (words > 100) {
      console.warn(`  \u26a0 Paragraph ${i} has ${words} words (target <100)`);
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
    console.log(`  \u2705 ${label} pushed successfully.`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.error(`  \u274c ${label}: Record already exists! Skipping.`);
    } else {
      console.error(`  \u274c ${label} FAILED:`, err.message);
      throw err;
    }
  }
}

async function main() {
  console.log("\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550");
  console.log("Treasury Carved by Djinn \u2014 Turkish (tr) push");
  console.log(`Timestamp: ${now}`);
  console.log("\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550");

  await pushStory(tr, "TURKISH");

  console.log("\n\u2705 Turkish version pushed successfully.");
}

main().catch((err) => {
  console.error("\n\uD83D\uDCA5 Fatal error:", err.message);
  process.exit(1);
});
