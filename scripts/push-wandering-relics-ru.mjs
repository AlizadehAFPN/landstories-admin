import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client);

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── RUSSIAN VERSION ─────────────────────────────────────────────────────────
// Proverb used (subverted): "Бог троицу любит" — applied to the three brothers
// of Kratovo who accomplished what tsars and empires could not.
// Register: modern Russian oral storytelling — podcast/popular nonfiction tone.
// ─────────────────────────────────────────────────────────────────────────────

const ru = {
  siteId: "rila-monastery",
  storyId: "wandering-relics",
  lang: "ru",
  langStoryId: "ru#wandering-relics",
  title: "Пять веков без покоя",
  subtitle: "Как останки отшельника стали сердцем целого народа",
  excerpt:
    "946 год. В пещере высоко в Рильских горах, в Болгарии, умирает монах-отшельник по имени Иоанн. Его ученики поднимаются к нему — и замирают: тело не тронуто тленом. Ни следа разложения.",
  moralOrLesson:
    "Святыня переживёт любую империю — иногда останки одного человека способны хранить душу целого народа сквозь века.",
  paragraphs: [
    {
      text: "946 год. В пещере высоко в Рильских горах, в Болгарии, умирает монах-отшельник по имени Иоанн. Его ученики поднимаются к нему — и замирают: тело не тронуто тленом. Ни следа разложения. В православии нетленные мощи — это высшее доказательство святости. Останки бережно сохраняют как священную реликвию. Но покой Иоанна на этом заканчивается. Его костям предстоит путешествие длиной в пятьсот лет — через войны, империи и чужие руки.",
    },
    {
      text: "Около 980 года болгарский царь Самуил оказывается в тисках. Византия — сверхдержава со столицей в Константинополе, нынешнем Стамбуле — давит на Болгарию со всех сторон. А в средневековой политике мощи знаменитого святого — это как печать Божьего благословения. Кто ими владеет, тот и прав. Самуил приказывает перенести останки Иоанна из горной пещеры в свою столицу Средец — нынешнюю Софию. Мёртвый отшельник становится политическим оружием. Куда идут его кости — туда идёт власть.",
    },
    {
      text: "А потом Болгария теряет их. Полностью. Около 1183 года, в разгар войны с Венгерским королевством, мощи Иоанна оказываются в Эстергоме — столице венгерских королей. Военный трофей или часть какой-то сделки — уже неважно. Результат один: самая священная реликвия Болгарии стоит в чужом храме, в чужой стране. Для болгар это было как потерять часть собственной души.",
    },
    {
      text: "Но Болгария не сдаётся. Два брата — Пётр и Асень — поднимают мощное восстание, сбрасывают чужое иго и возрождают Болгарское царство. Около 1195 года они привозят мощи святого в свою новую столицу Тырново под гром торжественной процессии. Люди стоят вдоль дорог, плачут и ликуют одновременно. Вернуть Иоанна — это не просто религиозный жест. Это доказательство: Болгария жива. Кости монаха, мечтавшего лишь о тишине и молитве, стали бьющимся сердцем целого народа.",
    },
    {
      text: "Ненадолго. В 1396 году Османская империя — огромная сила, растущая с территории нынешней Турции — завоёвывает Болгарию целиком. Тырново падает. Церкви разрушены или заброшены. Десятилетиями мощи Иоанна лежат в руинах некогда великой столицы. Ни процессий. Ни праздников. Тишина. Страна раздавлена, а кости святого покрываются пылью вместе с обломками разбитых надежд.",
    },
    {
      text: "И вот тут начинается невероятное. 1469 год — больше семидесяти лет под османским владычеством. Три брата из маленького города Кратово решают: они вернут Иоанна домой, в Рильский монастырь, где он жил и умер. Говорят, Бог троицу любит — и эта троица сделала то, что не удалось ни царям, ни империям. Когда процессия проходит через Софию, тысячи болгар заполняют улицы. Под чужой властью открыто чествовать болгарского святого — это тихий бунт. Это значит: страну у нас отняли, но нас самих — нет.",
    },
    {
      text: "Мощи Иоанна покоятся в Рильском монастыре и сегодня — в тех самых горах, где он больше тысячи лет назад выбрал жить и молиться в одиночестве. Каждый год болгары отмечают день, когда его кости наконец вернулись домой. То, что началось со смерти одинокого отшельника в горной пещере, обернулось одним из самых удивительных путешествий в европейской истории — мёртвое тело, которое пять столетий войн, завоеваний и борьбы за выживание держало целый народ вместе.",
    },
  ],
  icon: "\u26B1\uFE0F",
  tier: "A",
  source:
    "Patriarch Euthymius, Vita; the Rila Charter; Bulgarian medieval chronicles",
  characters: [
    "Saint Ivan of Rila (relics)",
    "Tsar Samuel",
    "Asen dynasty rulers",
    "Three brothers of Kratovo",
  ],
  era: "Medieval Period (946-1469 AD)",
  readingTimeMinutes: 2,
  image: "",
  thumbnail: "",
  coordinates: { lat: 42.1333, lng: 23.34 },
  hasAudio: false,
  isFree: true,
  disabled: false,
  storyCategory: "crowns_conquests",
  updatedAt: now,
};

// ─── VALIDATION ──────────────────────────────────────────────────────────────

console.log("\n=== PARAGRAPH VALIDATION (Russian) ===\n");

let totalChars = 0;
let totalWords = 0;
let allPass = true;

for (let i = 0; i < ru.paragraphs.length; i++) {
  const text = ru.paragraphs[i].text;
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
  `\nTotal: ${totalChars} chars | ${totalWords} words | ${ru.paragraphs.length} paragraphs`
);
console.log(`Target: ~3000 chars (±20% = 2400–3600)`);
console.log(
  `Range: ${totalChars >= 2400 && totalChars <= 3600 ? "✓ WITHIN RANGE" : "✗ OUT OF RANGE"}`
);

if (!allPass) {
  console.error("\n✗ Some paragraphs exceed limits. Aborting.");
  process.exit(1);
}

if (totalChars < 2400 || totalChars > 3600) {
  console.error("\n✗ Total chars out of range. Aborting.");
  process.exit(1);
}

// ─── PUSH TO DYNAMODB ────────────────────────────────────────────────────────

console.log("\nPushing Russian (ru)...");
try {
  await docClient.send(
    new PutCommand({
      TableName: TABLE,
      Item: ru,
      ConditionExpression:
        "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
    })
  );
  console.log("  ✓ Russian pushed successfully (new record).");
} catch (err) {
  if (err.name === "ConditionalCheckFailedException") {
    console.log("  Russian already exists. Overwriting...");
    await docClient.send(new PutCommand({ TableName: TABLE, Item: ru }));
    console.log("  ✓ Russian overwritten successfully.");
  } else {
    console.error("  ✗ FAILED:", err.message);
    process.exit(1);
  }
}

console.log(`\n=== DONE ===`);
console.log(`  langStoryId: ${ru.langStoryId}`);
console.log(`  title: ${ru.title}`);
console.log(`  subtitle: ${ru.subtitle}`);
console.log(`  paragraphs: ${ru.paragraphs.length}`);
console.log(`  updatedAt: ${now}`);
