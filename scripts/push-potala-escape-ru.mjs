import { DynamoDBClient, PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

// ── First, fetch the English record to copy all non-translated fields ──
const getCmd = new GetItemCommand({
  TableName: "Story",
  Key: {
    siteId: { S: "potala-palace" },
    langStoryId: { S: "en#dalai-lama-escape-1959" },
  },
});
const { Item: en } = await client.send(getCmd);
if (!en) { console.error("❌ English record not found"); process.exit(1); }

// ── Russian story — recreated, not translated ──

const title = "Побег из Поталы";
const subtitle = "Ночь, когда живой бог стал беглецом";

const paragraphs = [
  `В марте 1959 года судьба целой религии оказалась в руках двадцатитрёхлетнего монаха. Его звали Тензин Гьяцо — Четырнадцатый Далай-лама, духовный лидер Тибета. Китайская армия окружила его столицу Лхасу. Приказ: явиться в военный лагерь. Одному. Якобы на «культурное мероприятие». Ни один человек в Тибете в это не поверил.`,

  `Тридцать тысяч тибетцев попытались его спасти. Они стекались к Норбулингке — летней резиденции Далай-ламы — и встали живой стеной вокруг дворца. Крестьяне, монахи, матери с детьми на руках — плечом к плечу, лицом к лицу с китайской армией. Это было мужество, от которого сжимается сердце. Потому что все они понимали, чем это кончится.`,

  `И вот в ночь на 17 марта самый узнаваемый человек в Тибете исчез. Снял монашеские одежды, убрал очки, закинул за плечо винтовку — и вышел за ворота, переодетый простым солдатом. Пересёк реку Кьичу в темноте. Прошёл мимо тех самых людей, которые пришли его защитить. Ни один не узнал. Позже он напишет: «Я шёл к свободе, но чувствовал, что оставляю свой народ позади».`,

  `Дальше были две недели ада в Гималаях. Горные перевалы выше пяти тысяч метров — выше любой точки Европы — в слепящих метелях и пронизывающем до костей холоде. Над головой кружили китайские военные самолёты. Далай-лама был болен, измотан, почти не ел. Пятнадцать дней по самым высоким горам планеты, где каждый следующий перевал мог закончиться свободой — или расстрелом.`,

  `31 марта он перешёл границу Индии. Премьер-министр Неру предоставил убежище, и Далай-лама основал тибетское правительство в изгнании в Дхарамсале — тихом горном городке на севере Индии. Оно работает до сих пор — больше шестидесяти лет спустя. А в Тибете восстание подавили. Десятки тысяч тибетцев погибли. Дворец Потала превратили в музей. Триста лет правления Далай-лам закончились в одну ночь.`,

  `Он так и не вернулся. Ему сейчас девяносто, и он допускает, что может оказаться последним Далай-ламой — или что следующего найдут за пределами Тибета, может быть, даже женщину. Непрерывная линия духовных лидеров, тянущаяся с семнадцатого века, может оборваться на том, кто вышел за ворота дворца в двадцать три года и больше не вернулся.`,

  `Бог терпел и нам велел — так говорят, когда надо ждать. Тибетские паломники ждут уже больше шестидесяти лет. Каждый день они обходят дворец Потала по кругу, крутят молитвенные барабаны и шепчут одни и те же слова: «Пусть Его Святейшество вернётся при этой жизни». Шестьдесят лет одна молитва. Шестьдесят лет одна вера. Иногда уйти — не значит сдаться. Иногда уйти — единственный способ сохранить то, ради чего стоило остаться.`,
];

const moralOrLesson = "Иногда уйти — не значит сдаться. Иногда уйти — единственный способ сохранить то, ради чего стоило остаться.";
const excerpt = paragraphs[0];
const now = Math.floor(Date.now() / 1000);

// ── Validate constraints ──
console.log("=== CONSTRAINT VALIDATION ===\n");
let totalChars = 0;
let allPass = true;
for (let i = 0; i < paragraphs.length; i++) {
  const chars = paragraphs[i].length;
  const words = paragraphs[i].split(/\s+/).length;
  totalChars += chars;
  const charOk = chars <= 500;
  const wordOk = words <= 100;
  console.log(`P${i + 1}: ${chars} chars, ${words} words ${charOk && wordOk ? "✓" : "⚠️"}`);
  if (!charOk) { console.warn(`  ⚠️  Exceeds 500 char limit!`); allPass = false; }
  if (!wordOk) { console.warn(`  ⚠️  Exceeds 100 word limit!`); allPass = false; }
}
console.log(`\nTotal: ${totalChars} chars, ${paragraphs.length} paragraphs`);
console.log(`Target: ~3000 chars ±20% (2400–3600)`);
if (totalChars < 2400 || totalChars > 3600) {
  console.warn(`⚠️  Total chars outside acceptable range!`);
  allPass = false;
}
if (!allPass) {
  console.error("\n❌ Constraint validation failed. Aborting.");
  process.exit(1);
}
console.log("✅ All constraints passed.\n");

// ── Build the full DynamoDB item ──
// Copy ALL fields from English, then overwrite translated fields + keys
const item = {
  // Keys
  siteId:        en.siteId,                                    // potala-palace (same)
  langStoryId:   { S: "ru#dalai-lama-escape-1959" },           // Russian key
  storyId:       en.storyId,                                   // dalai-lama-escape-1959 (same)
  lang:          { S: "ru" },                                  // Russian

  // Translated text fields
  title:         { S: title },
  subtitle:      { S: subtitle },
  excerpt:       { S: excerpt },
  moralOrLesson: { S: moralOrLesson },
  paragraphs:    { L: paragraphs.map(text => ({ M: { text: { S: text } } })) },

  // Non-translated fields — copied from English
  storyCategory: en.storyCategory,
  tier:          en.tier,
  era:           en.era,
  icon:          en.icon,
  coordinates:   en.coordinates,
  image:         en.image,
  thumbnail:     en.thumbnail,
  source:        en.source,
  characters:    en.characters,
  isFree:        en.isFree,
  disabled:      en.disabled,
  hasAudio:      en.hasAudio,
  readingTimeMinutes: en.readingTimeMinutes,

  // Timestamp
  updatedAt:     { N: String(now) },
};

// ── Push to DynamoDB ──
const putCmd = new PutItemCommand({
  TableName: "Story",
  Item: item,
  ConditionExpression: "attribute_not_exists(siteId)", // safety: don't overwrite if exists
});

try {
  await client.send(putCmd);
  console.log("✅ Russian story pushed successfully!");
  console.log(`   siteId:      ${item.siteId.S}`);
  console.log(`   langStoryId: ${item.langStoryId.S}`);
  console.log(`   title:       ${item.title.S}`);
  console.log(`   paragraphs:  ${paragraphs.length}`);
  console.log(`   updatedAt:   ${new Date(now * 1000).toISOString()}`);
} catch (err) {
  if (err.name === "ConditionalCheckFailedException") {
    console.error("❌ Russian record already exists! Use update-item to modify it.");
  } else {
    console.error("❌ Push failed:", err.message);
  }
  process.exit(1);
}

// ── Verify by reading back ──
const verifyCmd = new GetItemCommand({
  TableName: "Story",
  Key: {
    siteId: { S: "potala-palace" },
    langStoryId: { S: "ru#dalai-lama-escape-1959" },
  },
});
const { Item: verify } = await client.send(verifyCmd);
if (verify) {
  console.log("\n✅ Verification: record exists in DynamoDB");
  console.log(`   Title: ${verify.title.S}`);
  console.log(`   Lang:  ${verify.lang.S}`);
  console.log(`   Paragraphs: ${verify.paragraphs.L.length}`);
  console.log(`   First line: ${verify.paragraphs.L[0].M.text.S.substring(0, 80)}...`);
} else {
  console.error("\n❌ Verification failed: record not found after push!");
  process.exit(1);
}
