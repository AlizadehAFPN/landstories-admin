import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

// ─── Russian story: recreated, not translated ─────────────────────────────────
//
// Proverb used (subverted): «Бог троицу любит»
// Subversion: «Бог троицу любит: выдуманный сад, выдуманный наркотик,
//              выдуманные гурии — и из трёх лжей родилось слово,
//              вошедшее в каждый язык мира.»
//
// Register: modern Russian oral storytelling — popular nonfiction / podcast voice
// ───────────────────────────────────────────────────────────────────────────────

const paragraphs = [
  {
    text: `1272 год. Венецианский купец Марко Поло пробирается через горы северной Персии. В самом Аламуте он никогда не бывал — монголы разрушили крепость шестнадцатью годами раньше. Но на базарах Шёлкового пути до него доходит история настолько дикая, что ей суждено пережить восемь столетий. Скрытая долина меж двух гор, превращённая в прекраснейший сад на земле: золотые павильоны, ручьи из вина и мёда и самые красивые женщины мира.`,
  },
  {
    text: `Легенда рассказывала вот что. Хасан ибн Саббах — тот самый, кого крестоносцы прозвали «Старцем Горы», — набирал молодых парней из окрестных деревень, опаивал их до беспамятства и переносил в этот сад. Те просыпались — и верили, что попали в настоящий рай. Красавицы, бесконечные пиры, любое наслаждение. Через несколько дней их снова усыпляли и выносили обратно. А потом Хасан говорил: вернуть тебя могу только я. Повинуйся мне — хоть ценой жизни — и рай твой навеки.`,
  },
  {
    text: `Так он якобы и создал самых бесстрашных убийц Средневековья. Людей, которые не просто принимали смерть — они бежали ей навстречу, веря, что последнее задание купит им вечность. Крестоносцы в ужасе наблюдали, как те проникали в королевские дворы под видом монахов или солдат, наносили удар кинжалом средь бела дня и даже не пытались скрыться. Враги звали их «хашишийин» — мол, обкуренные гашишем. Когда это слово доползло до Европы, оно превратилось в «ассасин».`,
  },
  {
    text: `Только вот ничего этого не было. Историк Фархад Дафтари в книге 1994 года доказал: сад — выдумка от начала до конца. Ни один источник самих исмаилитов его не упоминает. Ни один мусульманский автор эпохи не пишет о наркотиках. Когда монгольский летописец Джувейни лично осмотрел Аламут после захвата в 1256 году, он нашёл склады, мастерские и библиотеку — но ни золотых павильонов, ни вина, ни сада. Поло пересказывал базарные слухи о месте, которого никогда не видел.`,
  },
  {
    text: `Настоящий Хасан ибн Саббах ничуть не походил на легенду. Это был человек железной воли — учёный, казнивший собственного сына за то, что тот выпил вина. В 1090 году он захватил Аламут — крепость на отвесной скале на севере Ирана — по преданию, не пролив ни капли крови. Тридцать четыре года он не выходил за её стены, собирая одну из великих библиотек исламского мира. Его последователи не были одурманенными марионетками — они знали языки, изучали дипломатию и действовали по глубокому убеждению.`,
  },
  {
    text: `Настоящие «сады» Аламута — земледельческие террасы. Вода шла по каналам, вырубленным вручную в известняке, и собиралась в цистернах глубоко в скале. Никаких золотых павильонов. Никаких медовых ручьёв. Просто блестящая инженерия, которая кормила общину учёных, воинов и их семей в одной из самых труднодоступных долин на планете. Некоторые из этих цистерн держат воду до сих пор — спустя почти тысячу лет.`,
  },
  {
    text: `И всё-таки Марко Поло победил. Бог троицу любит: выдуманный сад, выдуманный наркотик, выдуманные гурии — и из трёх лжей родилось слово, вошедшее в каждый язык мира. Его рассказ — от человека, который там не бывал, о событиях, которых не случалось, надиктованный романисту в тюремной камере — подарил миру слово «ассасин» и вдохновил Assassin's Creed, затянувшую миллионы игроков в ту самую выдумку.`,
  },
  {
    text: `А настоящий Хасан — учёный, взявший крепость без крови и не покидавший её тридцать четыре года, — почти никому не известен. Восемь столетий базарная сплетня оказалась сильнее правды. Самое опасное оружие в истории — не кинжал. А история, которую никто не удосужился проверить.`,
  },
];

// ─── Validation ────────────────────────────────────────────────────────────────

let totalChars = 0;
let totalWords = 0;
let valid = true;

paragraphs.forEach((p, i) => {
  const chars = p.text.length;
  const words = p.text.split(/\s+/).filter(Boolean).length;
  totalChars += chars;
  totalWords += words;

  if (chars > 520) {
    console.error(`  ❌ P${i + 1}: ${chars} chars (max ~500)`);
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
  siteId: "alamut-castle",
  langStoryId: "ru#paradise-garden-legend",
  storyId: "paradise-garden-legend",
  lang: "ru",

  // Russian text fields
  title: "Рай Старца Горы",
  subtitle:
    "Самая знаменитая ложь об ассасинах — и правда, которую она похоронила на восемь веков",
  excerpt:
    "«Меж двух гор Старец повелел разбить величайший и прекраснейший сад, какой только видел свет. Там стояли золочёные павильоны, текли ручьи с вином, молоком и мёдом, и жили красивейшие девы на земле.»",
  paragraphs,
  moralOrLesson:
    "Самые живучие истории о народе — не всегда самые правдивые. Легенды, рождённые страхом и фантазией чужаков, способны затмить века учёности и подлинных свершений — пока миф не станет реальнее правды, которую он подменил.",
  characters: [
    "Хасан ибн Саббах («Старец Горы»)",
    "Марко Поло (венецианский путешественник, распространивший легенду)",
    "Рустикелло да Пиза (записал рассказ Поло)",
    "Рашид ад-Дин Синан (сирийский «Старец Горы»)",
    "Фархад Дафтари (историк, развенчавший мифы)",
  ],

  // Unchanged structural fields (copied from English record)
  icon: "🌿",
  storyCategory: "tricksters_folk_tales",
  era: "1090–1256 н.э. (период низаритов-исмаилитов); 1272 (путешествие Марко Поло через Персию)",
  tier: "S",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  coordinates: { lat: 36.4447, lng: 50.5861 },
  source:
    "Marco Polo, The Travels of Marco Polo (Yule-Cordier translation, Book 1, Ch. 24); Farhad Daftary, The Assassin Legends: Myths of the Isma'ilis (I.B. Tauris, 1994); Bernard Lewis, The Assassins: A Radical Sect in Islam (Weidenfeld & Nicolson, 1967); Ata-Malik Juvayni, Tarikh-i Jahangushay (c.1260); Sylvestre de Sacy, Academy of Inscriptions lecture, 1809; Encyclopaedia Iranica, 'HASAN SABBAH'",
  disabled: false,

  // Timestamp
  updatedAt: Math.floor(Date.now() / 1000),
};

// ─── Push to DynamoDB ──────────────────────────────────────────────────────────

// Safety check: don't overwrite English record
if (ruRecord.langStoryId === "en#paradise-garden-legend") {
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
        siteId: "alamut-castle",
        langStoryId: "ru#paradise-garden-legend",
      },
    })
  );

  if (!verify.Item) {
    console.error("❌ Verification failed — item not found after write!");
    process.exit(1);
  }

  console.log("✅ Russian story pushed to DynamoDB successfully.\n");
  console.log(`   siteId:        ${verify.Item.siteId}`);
  console.log(`   langStoryId:   ${verify.Item.langStoryId}`);
  console.log(`   lang:          ${verify.Item.lang}`);
  console.log(`   title:         ${verify.Item.title}`);
  console.log(`   subtitle:      ${verify.Item.subtitle}`);
  console.log(`   paragraphs:    ${verify.Item.paragraphs.length} paragraphs`);
  console.log(`   excerpt:       ${verify.Item.excerpt.substring(0, 80)}…`);
  console.log(`   moralOrLesson: ${verify.Item.moralOrLesson.substring(0, 80)}…`);
  console.log(`   updatedAt:     ${verify.Item.updatedAt}`);
  console.log(`\n   Structural fields preserved: icon, storyCategory, era, tier, isFree, hasAudio, coordinates, source, disabled`);

  // Confirm English record is untouched
  const enCheck = await docClient.send(
    new GetCommand({
      TableName: "Story",
      Key: {
        siteId: "alamut-castle",
        langStoryId: "en#paradise-garden-legend",
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
