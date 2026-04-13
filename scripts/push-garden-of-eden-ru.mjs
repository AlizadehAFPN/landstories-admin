import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

// ─── Russian story: recreated, not translated ─────────────────────────────────
//
// Proverb used (subverted): «Бог дал — Бог взял»
// Subversion: «Бог дал — Бог взял. Но рай у нас никто не отбирал. Мы ушли сами.»
//
// Register: modern Russian oral storytelling — popular nonfiction / podcast voice
// ───────────────────────────────────────────────────────────────────────────────

const paragraphs = [
  {
    text: `Вот вам история, от которой мурашки по коже. В середине девяностых немецкий археолог Клаус Шмидт начал раскопки на холме в юго-восточной Турции — и нашёл то, чего быть не должно. Гёбекли-Тепе: каменный храм, построенный около 9600 года до нашей эры — на семь тысяч лет старше египетских пирамид. Но Шмидта поразило другое: храм стоит именно там, где Библия помещает Эдемский сад — у истоков рек Тигр и Евфрат.`,
  },
  {
    text: `Одиннадцать тысяч лет назад это место выглядело совсем иначе. Холмы вокруг Гёбекли-Тепе утопали в дикой пшенице, ячмене и виноградных лозах. Повсюду бродили стада диких животных. Для охотников и собирателей, живших здесь, это был шведский стол от самой природы — без пахоты, без каторжного труда. Просто выходишь наружу — и мир тебя кормит. Если это не рай, то что тогда вообще рай?`,
  },
  {
    text: `А потом случился, возможно, главный перелом в истории человечества. Люди в этом самом регионе начали сажать зерно, держать скот, строить постоянные деревни. Они придумали земледелие. И вот что интересно: в Книге Бытия грехопадение — это изгнание из сада, а наказание — трудиться «в поте лица своего». Шмидт считал, что это не совпадение. История об Эдеме — возможно, древнейшая память о моменте, когда мы променяли рай на плуг.`,
  },
  {
    text: `Дальше — страннее. Около 8000 года до нашей эры строители Гёбекли-Тепе сделали нечто необъяснимое. Они засыпали весь храмовый комплекс тоннами земли — намеренно, аккуратно, словно запечатывали его навечно. Время совпадает пугающе точно: именно тогда земледелие окончательно поглотило регион. Будто они закрывали дверь в старый мир. Последнее прощание с жизнью, которую оставляли позади.`,
  },
  {
    text: `А совпадения всё не кончаются. Массивные Т-образные каменные столбы храма могут изображать деревья — а в каждом кольце два центральных столба возвышаются над остальными. Некоторые исследователи сравнивают их с двумя знаменитыми деревьями Эдема: Древом Жизни и Древом Познания. Десятки высеченных на камне животных — лисы, змеи, скорпионы, грифы — словно каталог существ из исчезнувшего мира. Всё здесь дышит ритуалом, словно люди приходили сюда, чтобы прикоснуться к чему-то большему, чем они сами.`,
  },
  {
    text: `Был ли Гёбекли-Тепе буквально Эдемским садом? Вряд ли — Эдем это миф, а не точка на карте. Но суть не в этом. Вопрос в другом: а что если одна из древнейших историй человечества — это эхо чего-то настоящего? Момента, когда мы перестали жить заодно с природой и начали перекраивать мир под себя. Говорят, Бог дал — Бог взял. Но рай у нас никто не отбирал. Мы ушли сами.`,
  },
  {
    text: `Люди, поставившие эти камни, не знали ни письменности, ни металла, ни колеса. Они жили до всего, что мы называем «цивилизацией». И всё же двенадцать тысяч лет назад, стоя в том храме, они, возможно, видели, как мир, который они любили, начинает исчезать — и каким-то образом передали эту потерю через сотню поколений. Пока она не превратилась в историю о саде, о падении и о мире, который уже никогда не будет прежним.`,
  },
];

// ─── Validation ────────────────────────────────────────────────────────────────

let totalChars = 0;
let totalWords = 0;
let valid = true;

paragraphs.forEach((p, i) => {
  const chars = p.text.length;
  // Russian word splitting — split on whitespace
  const words = p.text.split(/\s+/).filter(Boolean).length;
  totalChars += chars;
  totalWords += words;

  if (chars > 500) {
    console.error(`  ❌ P${i + 1}: ${chars} chars (max 500)`);
    valid = false;
  } else {
    console.log(`  ✓ P${i + 1}: ${chars} chars, ${words} words`);
  }
  if (words > 100) {
    console.error(`  ❌ P${i + 1}: ${words} words (max 100)`);
    valid = false;
  }
});

console.log(`\n  Total: ${totalChars} chars, ${totalWords} words, ${paragraphs.length} paragraphs`);
console.log(`  Target: ~3000 chars (±20% = 2400–3600)\n`);

if (totalChars < 2400 || totalChars > 3600) {
  console.error(`  ❌ Total chars ${totalChars} outside range (2400–3600)`);
  valid = false;
}
if (paragraphs.length < 6 || paragraphs.length > 10) {
  console.error(`  ❌ Paragraph count ${paragraphs.length} outside range (6–10)`);
  valid = false;
}

if (!valid) {
  console.error("\n❌ Validation failed. Aborting.");
  process.exit(1);
}
console.log("✅ All constraints pass.\n");

// ─── Build the full Russian record ────────────────────────────────────────────

const ruRecord = {
  // Keys
  siteId: "gobeklitepe",
  langStoryId: "ru#garden-of-eden",
  storyId: "garden-of-eden",
  lang: "ru",

  // Russian text fields
  title: "Гипотеза райского сада",
  subtitle: "Что если Гёбекли-Тепе — и есть Эдем?",
  excerpt:
    "В середине девяностых немецкий археолог Клаус Шмидт начал раскопки на холме в юго-восточной Турции — и нашёл то, чего быть не должно.",
  paragraphs,
  moralOrLesson:
    "Миф об Эдеме — возможно, древнейшая память о величайшем повороте в истории: когда человечество перешло от охоты и собирательства к земледелию и навсегда покинуло свой рай.",
  characters: [
    "Клаус Шмидт",
    "Строители Гёбекли-Тепе",
    "Адам и Ева (мифологические)",
  ],

  // Unchanged structural fields (copied from English record)
  icon: "🌳",
  storyCategory: "gods_monsters",
  era: "~9600-8000 BC",
  tier: "A",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 2,
  image: "",
  thumbnail: "",
  coordinates: { lat: 37.2233, lng: 38.9224 },
  source:
    "Klaus Schmidt's writings and interviews, Biblical Book of Genesis, scholarly analyses by David Lewis-Williams and others",
  disabled: false,

  // Timestamp
  updatedAt: Math.floor(Date.now() / 1000),
};

// ─── Push to DynamoDB ──────────────────────────────────────────────────────────

// Safety check: don't overwrite English record
if (ruRecord.langStoryId === "en#garden-of-eden") {
  console.error("❌ SAFETY: Refusing to overwrite English record!");
  process.exit(1);
}

try {
  await docClient.send(
    new PutCommand({
      TableName: "Story",
      Item: ruRecord,
    })
  );

  // Verify the write
  const verify = await docClient.send(
    new GetCommand({
      TableName: "Story",
      Key: {
        siteId: "gobeklitepe",
        langStoryId: "ru#garden-of-eden",
      },
    })
  );

  if (!verify.Item) {
    console.error("❌ Verification failed — item not found after write!");
    process.exit(1);
  }

  console.log("✅ Russian story pushed to DynamoDB successfully.\n");
  console.log(`   siteId:       ${verify.Item.siteId}`);
  console.log(`   langStoryId:  ${verify.Item.langStoryId}`);
  console.log(`   lang:         ${verify.Item.lang}`);
  console.log(`   title:        ${verify.Item.title}`);
  console.log(`   subtitle:     ${verify.Item.subtitle}`);
  console.log(`   paragraphs:   ${verify.Item.paragraphs.length} paragraphs`);
  console.log(`   excerpt:      ${verify.Item.excerpt.substring(0, 60)}…`);
  console.log(`   moralOrLesson: ${verify.Item.moralOrLesson.substring(0, 60)}…`);
  console.log(`   updatedAt:    ${verify.Item.updatedAt}`);
  console.log(`\n   Structural fields preserved: icon, storyCategory, era, tier, isFree, hasAudio, coordinates, source, disabled`);

  // Confirm English record is untouched
  const enCheck = await docClient.send(
    new GetCommand({
      TableName: "Story",
      Key: {
        siteId: "gobeklitepe",
        langStoryId: "en#garden-of-eden",
      },
    })
  );
  if (enCheck.Item && enCheck.Item.lang === "en") {
    console.log(`\n   ✅ English record verified untouched (lang=${enCheck.Item.lang}, title="${enCheck.Item.title}")`);
  }
} catch (err) {
  console.error("❌ DynamoDB push failed:", err.message);
  console.error(err);
  process.exit(1);
}
