import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client);

// ── Fetch the English original to copy non-text fields ──────────────────
const enRecord = await docClient.send(
  new GetCommand({
    TableName: "Story",
    Key: {
      siteId: "persepolis",
      langStoryId: "en#king-who-conquered-the-lie",
    },
  })
);

if (!enRecord.Item) {
  console.error("✗ English record not found!");
  process.exit(1);
}

console.log("✓ English record fetched\n");

// ── Russian story content ───────────────────────────────────────────────

const title = "Царь, который победил Ложь";

const subtitle =
  "Человек, который сделал Правду главным законом империи, возможно, построил её на величайшей лжи в истории";

const excerpt =
  "В 522 году до нашей эры семеро персидских дворян ворвались в крепость и убили человека на троне величайшей империи мира. Убийца, вышедший из залитой кровью спальни, построит Персеполь — и высечет в камне самую изощрённую ложь в истории, чтобы оправдать содеянное.";

const moralOrLesson =
  "Человек, сделавший «Правду» высшим принципом своей империи, возможно, построил её на самой удачной лжи в истории. Цивилизация, основанная на этом парадоксе, просуществовала два века, связала дорогами континенты, платила работникам справедливо и создала искусство потрясающей красоты. Иногда величайшая правда рождается из самой дерзкой лжи.";

const paragraphs = [
  {
    text: "522 год до нашей эры. Персидская империя — крупнейшая в истории — тянется от Ливии до Индии. На троне Бардия, сын Кира Великого, основателя империи. Он только что отменил налоги по всей империи на три года. Народ его обожает. Но однажды ночью семеро знатных персов врываются в крепость. В темноте один хватает царя, а Дарий стоит рядом с клинком — боится задеть своего. Тот, кто держит царя, кричит: «Бей, даже если попадёшь в нас обоих!» Дарий бьёт. Наутро толпе показывают отрубленную голову.",
  },
  {
    text: "Дарий не был наследником — мелкий дворянин из боковой ветви рода, о котором никто и не думал. Но дальше он делает то, чего до него не делал ни один правитель. На отвесной скале в горах Загроса, в ста метрах над древней дорогой, он высекает огромную царскую надпись на трёх языках. И в ней переписывает реальность. Убитый царь? Не настоящий Бардия. Настоящего принца тайно убили месяцами ранее. Трон занял жрец-двойник по имени Гаумата. А Дарий, избранник бога, просто восстановил правду.",
  },
  {
    text: "Проблема в том, что почти ни один современный историк ему не верит. Дарий — единственный источник своей версии. Вся империя, включая людей, лично знавших Бардию, признавала царя настоящим. Отмена налогов куда больше похожа на реформу законного правителя, чем на жест самозванца. А после переворота Дарий женился на дочери Кира и дочери Бардии — так поступают, когда нужно присвоить чужую кровь, а не защитить свою. Историки говорят прямо: он убил законного царя и задним числом сочинил оправдание.",
  },
  {
    text: "Империя тоже не поверила. За один год — девятнадцать восстаний по всем крупным провинциям. Второй человек объявил себя Бардией — что многое говорит о том, сколько персов считали Дария лжецом. Он раздавил их всех. Одному мятежнику отрезали нос, уши и язык, выкололи глаз, а потом посадили на кол прилюдно. Каждая казнь шла под одним лозунгом: эти люди следовали за «Ложью» — вселенским врагом Правды в персидской вере. Против Дария — значит против бога.",
  },
  {
    text: "А потом — добыв трон кровью и пропагандой — Дарий построил одну из самых развитых цивилизаций в истории. В Персеполе рабочим из десятков народов платили, а не держали в цепях. Женщины получали равную плату. Беременным давали дополнительный паёк. Дороги работали так быстро, что Геродот написал: «Ни снег, ни дождь, ни жара, ни тьма ночная» не остановят его гонцов — через двадцать четыре века эту фразу возьмёт девизом почтовая служба США. Лжец построил нечто, во что стоило поверить.",
  },
  {
    text: "Надпись на скале оставалась нечитаемой две тысячи лет — пока в 1835 году британский офицер Генри Роулинсон не начал подъём. Он копировал древние знаки одной рукой, вися на лестнице, прижатой к скале. Для самых труднодоступных участков спускал на верёвках курдского мальчишку. Работа заняла двенадцать лет. Когда Роулинсон расшифровал текст, это открыло письменность древней Месопотамии — тот же прорыв, что Розеттский камень для иероглифов. Спустя два тысячелетия молчания Дарий заговорил снова.",
  },
  {
    text: "Он и сегодня стоит на той скале — нога на спине врага, девять мятежных царей в цепях перед ним. Персеполь по-прежнему поднимается над равнинами Ирана. А парадокс так и не разрешён. Говорят, Бог правду видит, да не скоро скажет — но что, если правда в том, что величайшую империю мира построил человек, который потом всю жизнь превращал свою ложь в правду?",
  },
];

// ── Validate constraints ────────────────────────────────────────────────
let totalChars = 0;
let allValid = true;
for (let i = 0; i < paragraphs.length; i++) {
  const text = paragraphs[i].text;
  const charCount = [...text].length; // proper Unicode char count
  const wordCount = text.split(/\s+/).length;
  totalChars += charCount;
  const ok = charCount <= 500 && wordCount <= 100;
  console.log(
    `P${i + 1}: ${charCount} chars, ${wordCount} words ${ok ? "✓" : "✗ OVER LIMIT"}`
  );
  if (!ok) allValid = false;
}
console.log(`\nTotal: ${totalChars} chars, ${paragraphs.length} paragraphs`);
console.log(
  `Target: ~3000 chars (±20% = 2400–3600). ${totalChars >= 2400 && totalChars <= 3600 ? "✓ IN RANGE" : "✗ OUT OF RANGE"}`
);

if (!allValid) {
  console.error("\n✗ Some paragraphs exceed limits. Aborting.");
  process.exit(1);
}

// ── Build the Russian record ────────────────────────────────────────────
const en = enRecord.Item;
const now = Math.floor(Date.now() / 1000);

const ruRecord = {
  // Keys
  siteId: en.siteId,
  langStoryId: "ru#king-who-conquered-the-lie",
  storyId: en.storyId,
  lang: "ru",

  // Russian text fields
  title,
  subtitle,
  excerpt,
  moralOrLesson,
  paragraphs,

  // Preserved non-text fields from English
  characters: en.characters,
  coordinates: en.coordinates,
  disabled: en.disabled,
  era: en.era,
  hasAudio: false,
  icon: en.icon,
  image: en.image,
  isFree: en.isFree,
  readingTimeMinutes: 4,
  source: en.source,
  storyCategory: en.storyCategory,
  thumbnail: en.thumbnail,
  tier: en.tier,
  updatedAt: now,
};

// ── Push to DynamoDB ────────────────────────────────────────────────────
const result = await docClient.send(
  new PutCommand({
    TableName: "Story",
    Item: ruRecord,
    ConditionExpression: "attribute_not_exists(siteId)", // safety: don't overwrite
  })
);

console.log("\n✓ Russian story created successfully!");
console.log(`  siteId: ${ruRecord.siteId}`);
console.log(`  langStoryId: ${ruRecord.langStoryId}`);
console.log(`  title: ${ruRecord.title}`);
console.log(`  lang: ${ruRecord.lang}`);
console.log(`  updatedAt: ${now}`);
console.log(`  paragraphs: ${ruRecord.paragraphs.length}`);
console.log(`  totalChars: ${totalChars}`);
