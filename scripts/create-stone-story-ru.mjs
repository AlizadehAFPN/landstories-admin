import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const docClient = DynamoDBDocumentClient.from(client);

// ─── STEP 1: Fetch the English record to carry over non-text fields ─────────

const englishItem = await docClient.send(
  new GetCommand({
    TableName: "Story",
    Key: {
      siteId: "westminster-abbey",
      langStoryId: "en#coronation-stone-stone-of-destiny",
    },
  })
);

if (!englishItem.Item) {
  console.error("✗ English record not found.");
  process.exit(1);
}

const en = englishItem.Item;
console.log("✓ English record fetched.");

// ─── STEP 2: Russian story — native retelling, not translation ──────────────
//
// Proverb chosen: «Терпение и труд всё перетрут»
//   — One of the best-known Russian proverbs (patience and labor grind through
//     everything). Subverted in the closing line: "Но есть камни, которые не
//     перетереть" (But there are stones you cannot grind down). The double
//     meaning — literal stone + metaphorical resilience — lands perfectly.
//
// Register: modern popular nonfiction / quality podcast narrator.
//   Not Tolstoy, not Soviet bureaucratic, not slang. A skilled storyteller
//   at a dinner table.

const paragraphs = [
  {
    text: `В Эдинбургском замке лежит грубый кусок красного песчаника. Весит примерно 152 килограмма — на вид ничего особенного. Но больше тысячи лет именно этот камень решал, кому быть королём. Шотландских правителей короновали на нём в древнем аббатстве Скун в Пертшире. По легенде, камень кричал под настоящим королём и молчал как мёртвый под самозванцем. Его называют Камнем Судьбы. И у него за плечами — одна из самых невероятных историй борьбы за власть.`,
  },
  {
    text: `В 1296 году Эдуард I — настолько жестокий, что прозвали его Молотом Шотландии — вторгся в Шотландию и забрал Камень. Он не просто тащил булыжник — он отбирал у народа право короновать своих королей. Эдуард приказал вмонтировать Камень в дубовый трон в Вестминстерском аббатстве: каждый будущий английский король сидел на главной святыне Шотландии. Смысл был прост: ваше королевство — моё, а ваш камень — у меня под ногами. С 1308 года все британские монархи коронуются в этом кресле.`,
  },
  {
    text: `Но корни Камня уходят глубже, чем вражда Англии и Шотландии. Средневековые хронисты прослеживали его до Библии — до Книги Бытия, где Иаков заснул на камне в месте под названием Вефиль и увидел во сне лестницу от земли до неба. Бог обещал Иакову эту землю, а Иаков объявил камень священным. По легенде, камень потом побывал в Египте, Испании, Ирландии — где лежал на холме Тара как коронационный камень верховных королей — и к 500 году оказался в Шотландии.`,
  },
  {
    text: `А теперь — самое интересное. Рождество, 1950 год. Четверо шотландских студентов во главе с 25-летним юристом Иэном Гамильтоном ночью проникли в Вестминстерское аббатство и выдрали Камень из-под коронационного трона. Он раскололся надвое. Обломки погрузили в чужой Ford Anglia и рванули на север сквозь зимнюю ночь, уходя от полицейских постов. Шотландия тихо ликовала. Англия кипела. Полиция объявила крупнейший розыск в истории Британии.`,
  },
  {
    text: `Несколько месяцев Камень не могли найти. Глазговский каменотёс Роберт Грей тайно склеил обе половины. А 11 апреля 1951 года Камень обнаружили на алтаре аббатства Арброт — завёрнутый в шотландский флаг. Место было выбрано не случайно: именно здесь в 1320 году шотландские дворяне подписали декларацию, заявив Папе Римскому, что Шотландия никогда не покорится Англии. Студентов вычислили, но судить не стали — побоялись, что суд только сделает из них героев.`,
  },
  {
    text: `Камень вернули в Лондон, и ещё 45 лет он пролежал в Вестминстере — тихая, незаживающая рана. Но 30 ноября 1996 года — в День святого Андрея, национальный праздник Шотландии — правительство Британии официально вернуло Камень Судьбы домой. Его поместили в Эдинбургский замок рядом с шотландскими королевскими регалиями. Условие было одно: на будущие коронации камень будет возвращаться в Лондон.`,
  },
  {
    text: `Обещание сдержали 6 мая 2023 года: Камень привезли на коронацию Карла III — первую за семьдесят лет. Карл сел над Камнем Судьбы — ровно так, как задумал Эдуард семь веков назад. Только на этот раз Шотландия отдала его добровольно. Камень, украденный как орудие завоевания, вернулся домой совсем другим — доказательством того, что символы переживают империи. Говорят, терпение и труд всё перетрут. Но есть камни, которые не перетереть.`,
  },
];

const title = "Коронационный камень — Камень Судьбы";

const subtitle =
  "Камень, который больше тысячи лет решает, кому быть королём";

const excerpt =
  "В Эдинбургском замке лежит грубый кусок красного песчаника. Весит примерно 152 килограмма — на вид ничего особенного. Но больше тысячи лет именно этот камень решал, кому быть королём.";

const moralOrLesson =
  "Символ можно украсть, но нельзя украсть то, что он значит — народ, который в него верит, всегда найдёт способ вернуть его домой";

// ─── STEP 3: Validate constraints ──────────────────────────────────────────

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
    `P${i + 1}: ${chars} chars ${charOk ? "✓" : "✗ OVER"} | ${words} words ${wordOk ? "✓" : "✗ OVER"}`
  );
}

console.log(
  `\nTotal: ${totalChars} chars | ${totalWords} words | ${paragraphs.length} paragraphs`
);
console.log(`Target: ~3000 chars (±20% = 2400–3600)`);
console.log(
  `Range check: ${totalChars >= 2400 && totalChars <= 3600 ? "✓ WITHIN RANGE" : "✗ OUT OF RANGE"}`
);

if (!allPass) {
  console.error("\n✗ Some paragraphs exceed limits. Aborting.");
  process.exit(1);
}

// ─── STEP 4: Build the Russian record ───────────────────────────────────────

const now = Math.floor(Date.now() / 1000);

const russianItem = {
  // Keys
  siteId: en.siteId,
  langStoryId: "ru#coronation-stone-stone-of-destiny",

  // Russian text fields
  lang: "ru",
  title,
  subtitle,
  excerpt,
  paragraphs,
  moralOrLesson,

  // Unchanged fields carried from English
  storyId: en.storyId,
  icon: en.icon,
  tier: en.tier,
  era: en.era,
  readingTimeMinutes: 3,
  image: en.image,
  thumbnail: en.thumbnail,
  disabled: en.disabled,
  hasAudio: en.hasAudio,
  coordinates: en.coordinates,
  isFree: en.isFree,
  storyCategory: en.storyCategory,
  source: en.source,
  characters: en.characters,

  // Timestamp
  updatedAt: now,
};

// ─── STEP 5: Push to DynamoDB ───────────────────────────────────────────────

try {
  await docClient.send(
    new PutCommand({
      TableName: "Story",
      Item: russianItem,
      ConditionExpression: "attribute_not_exists(siteId)",
    })
  );

  console.log("\n✓ Russian story created successfully in DynamoDB.");
  console.log(`  siteId:       ${russianItem.siteId}`);
  console.log(`  langStoryId:  ${russianItem.langStoryId}`);
  console.log(`  lang:         ${russianItem.lang}`);
  console.log(`  title:        ${russianItem.title}`);
  console.log(`  subtitle:     ${russianItem.subtitle}`);
  console.log(`  paragraphs:   ${russianItem.paragraphs.length}`);
  console.log(`  updatedAt:    ${russianItem.updatedAt}`);
} catch (err) {
  if (err.name === "ConditionalCheckFailedException") {
    console.error(
      "\n✗ Russian record already exists. Use UpdateCommand to modify it."
    );
  } else {
    console.error("\n✗ DynamoDB put failed:", err.message);
  }
  process.exit(1);
}
