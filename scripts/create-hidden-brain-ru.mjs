import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

// ─── 1. Fetch the English version to copy non-translated fields ───
const { Item: en } = await docClient.send(
  new GetCommand({
    TableName: "Story",
    Key: {
      siteId: "vatican-st-peters",
      langStoryId: "en#hidden-brain-creation-adam",
    },
  })
);

if (!en) {
  console.error("❌ English version not found. Aborting.");
  process.exit(1);
}

console.log("✅ English version fetched.");

// ─── 2. Russian story content ───

const title = "Скрытый мозг в «Сотворении Адама»";

const subtitle =
  "Тайна, которая пятьсот лет пряталась в самой известной картине мира";

const moralOrLesson =
  "Настоящий гений прячет в своих работах смыслы, которые переживают века и открываются только тем, кто готов их увидеть";

const paragraphs = [
  {
    text: "Почти пятьсот лет люди приходили в Сикстинскую капеллу, задирали головы и видели ровно то, что Микеланджело хотел им показать. Или думали, что видели. «Сотворение Адама» — Бог тянет руку к Адаму, вокруг ангелы, красный плащ развевается. Вы точно знаете эту картину: она на постерах, чехлах для телефонов, в мемах. Все её знают. Но никто — пятьсот лет — не замечал того, что было спрятано прямо на виду.",
  },
  {
    text: "В 1990 году американский врач по имени Фрэнк Мешбергер опубликовал статью в Journal of the American Medical Association — одном из самых авторитетных медицинских журналов мира — и перевернул всё. Его утверждение звучало невероятно: форма, окружающая Бога и ангелов на фреске, — это не просто плащ. Это анатомически точный срез человеческого мозга.",
  },
  {
    text: "Совпадения поражают. Красный плащ повторяет контур коры головного мозга. Ангел под рукой Бога точно ложится на ствол мозга — ту часть, которая отвечает за дыхание и сердцебиение. Зелёный шарф, свисающий вниз, идёт по траектории крупной артерии, питающей мозг. Маленькая фигура у левой ноги Бога расположена ровно там, где находится ключевая железа. Деталь за деталью — анатомия совпадает с точностью, которая не может быть случайной.",
  },
  {
    text: "И у Микеланджело точно хватало для этого знаний. В молодости, во Флоренции, он годами вскрывал тела умерших в церкви Санто-Спирито — настоятель разрешал ему изучать трупы в обмен на деревянное распятие, которое Микеланджело вырезал своими руками. К тридцати годам он разбирался в анатомии человека лучше большинства врачей своего времени.",
  },
  {
    text: "И вот главный вопрос: что он хотел этим сказать? Самая красивая версия звучит так: Бог даёт Адаму не просто жизнь — он даёт ему разум. Мозг на фреске означает, что истинный божественный дар — это не тело и не пульс. Это сознание. Мысль. Способность задаться вопросом, зачем ты вообще существуешь. В этой трактовке Бог живёт внутри самого человеческого разума.",
  },
  {
    text: "Но есть и куда более опасная версия. Микеланджело ненавидел эту работу. Папа Юлий II — больше полководец, чем священник — фактически заставил его расписывать потолок, и они враждовали всё время. А что, если смысл обратный? Если Бог изображён внутри мозга, может быть, Микеланджело говорил, что Бог — создание человеческого разума, а не наоборот. Это была бы самая опасная идея в истории — нарисованная прямо над головой Папы Римского.",
  },
  {
    text: "Бог, как известно, троицу любит. В 2010 году исследователи Иэн Сук и Рафаэль Тамарго опубликовали статью в журнале Neurosurgery и обнаружили на том же потолке второй скрытый урок анатомии. На фреске, где Бог отделяет свет от тьмы, его горло и грудь складываются в точное изображение ствола мозга и спинного мозга. Микеланджело проделал этот трюк не один раз — и если троицу любит не только Бог, третий секрет, возможно, ещё ждёт своего часа.",
  },
  {
    text: "Никто не знает наверняка, что имел в виду Микеланджело. Славил сознание как высший дар Бога? Тихо бунтовал против Папы, которого терпеть не мог? Или просто не мог удержаться и прятал свои знания в собственном искусстве? Пятьсот лет спустя самый знаменитый потолок в мире всё ещё выдаёт тайны, о которых никто не догадывался спросить.",
  },
];

const excerpt = paragraphs[0].text;

// ─── 3. Validate constraints ───

let totalChars = 0;
let valid = true;

for (let i = 0; i < paragraphs.length; i++) {
  const p = paragraphs[i];
  const chars = p.text.length;
  const words = p.text.split(/\s+/).length;
  totalChars += chars;
  console.log(`P${i + 1}: ${chars} chars, ${words} words`);
  if (chars > 500) {
    console.warn(`  ⚠️  P${i + 1} exceeds 500 char limit!`);
    valid = false;
  }
  if (words > 100) {
    console.warn(`  ⚠️  P${i + 1} exceeds 100 word limit!`);
    valid = false;
  }
}

console.log(`\nTotal: ${totalChars} chars, ${paragraphs.length} paragraphs`);
console.log(`Target: ~3000 chars (±20% = 2400–3600)\n`);

if (totalChars < 2400 || totalChars > 3600) {
  console.error("❌ Total character count out of range. Aborting.");
  process.exit(1);
}

if (!valid) {
  console.error("❌ Constraint violations found. Aborting.");
  process.exit(1);
}

// ─── 4. Build Russian record (copy all non-translated fields from English) ───

const ruItem = {
  // Non-translated fields — copied from English
  siteId: en.siteId,
  storyId: en.storyId,
  icon: en.icon,
  tier: en.tier,
  image: en.image,
  thumbnail: en.thumbnail,
  coordinates: en.coordinates,
  isFree: en.isFree,
  disabled: en.disabled,
  hasAudio: en.hasAudio,
  storyCategory: en.storyCategory,
  readingTimeMinutes: en.readingTimeMinutes,
  source: en.source,
  characters: en.characters,
  era: en.era,

  // Translated fields — Russian
  lang: "ru",
  langStoryId: "ru#hidden-brain-creation-adam",
  title,
  subtitle,
  excerpt,
  paragraphs,
  moralOrLesson,
  updatedAt: Math.floor(Date.now() / 1000),
};

// ─── 5. Push to DynamoDB ───

await docClient.send(
  new PutCommand({
    TableName: "Story",
    Item: ruItem,
  })
);

console.log("✅ Russian story pushed successfully!");
console.log(`   siteId: ${ruItem.siteId}`);
console.log(`   langStoryId: ${ruItem.langStoryId}`);
console.log(`   title: ${ruItem.title}`);
console.log(`   paragraphs: ${ruItem.paragraphs.length}`);
console.log(`   excerpt length: ${ruItem.excerpt.length} chars`);
console.log(`   updatedAt: ${ruItem.updatedAt}`);

// ─── 6. Verify by reading back ───

const { Item: verify } = await docClient.send(
  new GetCommand({
    TableName: "Story",
    Key: {
      siteId: "vatican-st-peters",
      langStoryId: "ru#hidden-brain-creation-adam",
    },
  })
);

console.log(`\n--- Verification (read back) ---`);
console.log(`   title: ${verify.title}`);
console.log(`   lang: ${verify.lang}`);
console.log(`   paragraphs: ${verify.paragraphs.length}`);
console.log(`   icon: ${verify.icon}`);
console.log(`   tier: ${verify.tier}`);
console.log(`   storyCategory: ${verify.storyCategory}`);
console.log(`   coordinates: ${JSON.stringify(verify.coordinates)}`);
console.log(`   isFree: ${verify.isFree}`);
console.log(`   hasAudio: ${verify.hasAudio}`);
console.log("\n✅ All verified. Russian story is live.");
