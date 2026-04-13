import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const docClient = DynamoDBDocumentClient.from(client);

// ─── RUSSIAN RECREATION ─────────────────────────────────────────────────────
// Proverb used (subverted): "Не было бы счастья, да несчастье помогло"
// Register: modern educated Russian storyteller, oral rhythm, podcast-quality

const title = "Крестьянин, который откопал империю";

const subtitle = "Как обычный колодец привёл к величайшей находке в истории";

const paragraphs = [
  {
    text: `Март 1974 года, глухая деревня под Сианем в центральном Китае. Крестьянин по имени Ян Чжифа и двое соседей копают колодец \u2014 страшная засуха убивает урожай, без воды не выжить. На глубине четырёх метров лопата бьёт по чему-то твёрдому. Камень, думает Ян. Но это не камень.`,
  },
  {
    text: `Из земли он вытаскивает кусок обожжённой глины. Потом ещё один. А потом \u2014 голову. Человеческую голову с закрытыми глазами, едва заметной улыбкой и тщательно вылепленными волосами. Терракота. Крестьяне каменеют. По китайским поверьям, тревожить захороненные фигуры \u2014 значит выпускать на волю злых духов. Всё внутри кричит: брось это и уходи.`,
  },
  {
    text: `Но любопытство \u2014 и крестьянская практичность \u2014 берут верх. Ян грузит осколки на тачку и везёт на местный пункт приёма культурных ценностей. Его награда? Десять юаней. Полтора доллара. Столько стоила \u2014 как потом выяснится \u2014 величайшая археологическая находка двадцатого века.`,
  },
  {
    text: `Через несколько недель приезжают археологи и начинают копать. Через несколько месяцев масштаб становится ясен: под сухими пшеничными полями прячется целая подземная армия. Больше восьми тысяч солдат в натуральную величину, лошади, боевые колесницы \u2014 всё создано более двух тысяч лет назад, чтобы охранять гробницу Цинь Шихуанди, первого императора, объединившего Китай в единое государство.`,
  },
  {
    text: `Находка перевернула всё. Тихая деревня Яна стала одним из самых посещаемых памятников на планете. Сиань из забытого провинциального города превратился в мировую туристическую столицу. А Китай получил национальный символ, равный Великой стене \u2014 живое доказательство того, что его древняя цивилизация способна поразить современный мир.`,
  },
  {
    text: `Но вот о чём обычно молчат. У семьи Яна забрали землю под раскопки \u2014 почти без компенсации. Местные чиновники попытались вычеркнуть его из истории и приписать находку себе. Человек, который буквально выкопал армию императора, не мог доказать, что он вообще при этом был.`,
  },
  {
    text: `Спустя годы музей наконец дал ему работу \u2014 подписывать книги для туристов в сувенирной лавке. Представьте: старый крестьянин за семьдесят, лицо, иссушенное десятилетиями на солнце, сидит за маленьким столом и выводит: \u00abЯн Чжифа \u2014 первооткрыватель Терракотовых воинов\u00bb. А за стеной, в безмолвном строю, стоят восемь тысяч бессмертных солдат.`,
  },
  {
    text: `Ян Чжифа умер в 2024 году. Ему был девяносто один. Он так и не разбогател, не прославился дальше музейной лавки. Не было бы счастья, да несчастье помогло \u2014 засуха привела мир к великому открытию. Вот только счастье досталось всем, кроме того, кто его откопал. Когда туристы спрашивали, как он нашёл целую империю, Ян просто пожимал плечами: \u00abКопал колодец. Пить хотелось\u00bb.`,
  },
];

const excerpt =
  "Март 1974 года, глухая деревня под Сианем в центральном Китае. Крестьянин по имени Ян Чжифа и двое соседей копают колодец \u2014 страшная засуха убивает урожай, без воды не выжить.";

const moralOrLesson =
  "Величайшие открытия достаются не тем, кто ищет, а тем, кому просто хочется пить.";

const characters = [
  "Ян Чжифа \u2014 крестьянин, изменивший историю",
  "Ян Цюаньи и Ян Пэйянь \u2014 односельчане",
  "Юань Чжунъи \u2014 археолог, руководивший раскопками",
];

const era = "1974 г. н.э. \u2014 Современное открытие";

const source =
  'Интервью Ян Чжифа, отчёты Шэньсийского провинциального института, \u00abТерракотовые воины\u00bb Джона Мэна';

// ─── VALIDATION ─────────────────────────────────────────────────────────────

console.log("\n=== PARAGRAPH VALIDATION ===\n");

let totalChars = 0;
let totalWords = 0;
let allPass = true;

for (let i = 0; i < paragraphs.length; i++) {
  const text = paragraphs[i].text;
  const chars = text.length;
  const words = text.split(/\s+/).length;
  totalChars += chars;
  totalWords += words;

  const charOk = chars <= 500;
  const wordOk = words <= 100;

  if (!charOk || !wordOk) allPass = false;

  console.log(
    `P${i + 1}: ${chars} chars ${charOk ? "\u2713" : "\u2717 OVER"} | ${words} words ${wordOk ? "\u2713" : "\u2717 OVER"}`
  );
}

console.log(
  `\nTotal: ${totalChars} chars | ${totalWords} words | ${paragraphs.length} paragraphs`
);
console.log(`Target: ~3000 chars (\u00b120% = 2400\u20133600)`);
console.log(
  `Status: ${totalChars >= 2400 && totalChars <= 3600 ? "\u2713 WITHIN RANGE" : "\u2717 OUT OF RANGE"}`
);

if (!allPass) {
  console.error("\n\u2717 Some paragraphs exceed limits. Aborting.");
  process.exit(1);
}

if (totalChars < 2400 || totalChars > 3600) {
  console.error("\n\u2717 Total character count out of range. Aborting.");
  process.exit(1);
}

// ─── DYNAMODB PUT (NEW RECORD) ─────────────────────────────────────────────

const now = Math.floor(Date.now() / 1000);

const item = {
  // Keys
  siteId: "terracotta-army",
  langStoryId: "ru#farmer-discovery",
  storyId: "farmer-discovery",
  lang: "ru",

  // Russian text fields
  title,
  subtitle,
  paragraphs,
  excerpt,
  moralOrLesson,
  characters,
  era,
  source,

  // Unchanged metadata (copied from English record)
  icon: "\uD83D\uDD73\uFE0F",
  tier: "A",
  storyCategory: "tricksters_folk_tales",
  isFree: true,
  disabled: false,
  hasAudio: false,
  readingTimeMinutes: 2,
  image: "",
  thumbnail: "",
  coordinates: {
    lat: 34.3841,
    lng: 109.2785,
  },

  // Timestamp
  updatedAt: now,
};

const command = new PutCommand({
  TableName: "Story",
  Item: item,
  ConditionExpression:
    "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
});

try {
  await docClient.send(command);
  console.log("\n\u2713 Russian story created successfully in DynamoDB.");
  console.log(`  siteId: ${item.siteId}`);
  console.log(`  langStoryId: ${item.langStoryId}`);
  console.log(`  title: ${item.title}`);
  console.log(`  paragraphs: ${item.paragraphs.length}`);
  console.log(`  updatedAt: ${now}`);
} catch (err) {
  if (err.name === "ConditionalCheckFailedException") {
    console.error(
      "\n\u2717 Russian record already exists! Use UpdateCommand to modify it."
    );
  } else {
    console.error("\n\u2717 DynamoDB put failed:", err.message);
  }
  process.exit(1);
}
