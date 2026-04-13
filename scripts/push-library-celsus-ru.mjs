/**
 * Push Library of Celsus story — Russian (ru) recreation
 *
 * NOT a translation — a cultural recreation for native Russian speakers.
 * Proverb subversion: "Бог троицу любит" — applied to three lives of the library.
 *
 * Usage: node scripts/push-library-celsus-ru.mjs
 */

import { readFileSync } from "fs";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

// Load .env.local
const envFile = readFileSync(
  new URL("../.env.local", import.meta.url),
  "utf-8"
);
for (const line of envFile.split("\n")) {
  const match = line.match(/^(\w+)\s*=\s*(.+)$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
}

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "eu-north-1",
});
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = process.env.DYNAMO_TABLE_STORY || "Story";
const now = Math.floor(Date.now() / 1000);

// ═══════════════════════════════════════════════════════════════════════════
// RUSSIAN STORY — CULTURAL RECREATION
// ═══════════════════════════════════════════════════════════════════════════

const paragraphs = [
  {
    text: `114 год нашей эры. В Эфесе \u2014 одном из крупнейших городов древнего мира, на западном побережье нынешней Турции \u2014 умирает человек по имени Цельс. Он прош\u0451л путь от сенатора до консула, а затем стал наместником всей провинции Азия. Его сын Аквила мог бы почтить память отца статуей или мемориальной доской \u2014 как делали все. Но он поступил иначе. Он решил построить отцу самую красивую библиотеку, какую видел мир.`,
  },
  {
    text: `Строительство заняло около десяти лет и завершилось примерно в 125 году. Библиотека Цельса вмещала двенадцать тысяч свитков \u2014 трет\u044Cе по величине собрание в древнем мире, после легендарной Александрийской библиотеки и пергамской коллекции. Но славу ей прин\u0451с не размер, а красота. Двухэтажный фасад был спроектирован с хитростью: крайние колонны чуть ниже центральных \u2014 и здание казалось ещ\u0451 величественнее, чем было на самом деле.`,
  },
  {
    text: `Внутри архитекторы решили задачу, которая погубила бессч\u0451тное множество древних текстов: влажность. Между внешней и внутренней стеной оставили воздушный зазор \u2014 по сути, античный кондиционер, \u2014 чтобы сырость не добралась до свитков в каменных нишах. А у входа поставили четыре статуи \u2014 Мудрость, Знание, Разум и Добродетель. Это не было украшением. Так сын говорил всему городу: вот каким был мой отец.`,
  },
  {
    text: `А теперь \u2014 самое главное. Под полом библиотеки Аквила установил мраморный саркофаг отца. Это нарушало один из древнейших римских законов: хоронить людей внутри городских стен было строжайше запрещено. Но для Цельса сделали исключение \u2014 настолько его уважали в Эфесе. Здание оказалось одновременно библиотекой и усыпальницей. Сын превратил сво\u0451 горе в подарок целому городу.`,
  },
  {
    text: `Больше века библиотека процветала. Потом, в 262 году, на Эфес напали готы \u2014 германские воины с севера, которые позже помогут обрушить сам Рим. Они подожгли библиотеку изнутри. Двенадцать тысяч свитков исчезли навсегда. Землетрясения следующих веков довершили то, что не доделал огонь, и постепенно здание превратилось в руины. Больше тысячи лет одно из величайших зданий древности лежало под земл\u0451й и обломками.`,
  },
  {
    text: `В 1903 году австрийские археологи начали раскопки. В земле обнаружились фрагменты фасада \u2014 колонны, резьба, осколки тех самых четыр\u0451х статуй. С 1970 года команда реставраторов стала собирать вс\u0451 обратно, камень за камнем, как гигантский античный пазл. К 1978 году фасад снова стоял. Не копия \u2014 те самые камни, вернувшиеся на те самые позиции, которые они занимали почти две тысячи лет назад.`,
  },
  {
    text: `Говорят, Бог троицу любит. Эта библиотека прожила ровно три жизни: одну \u2014 во славе, вторую \u2014 в забвении, третью \u2014 в бессмертии. Каждый раз кто-то отказывался мириться с пустотой: сначала \u2014 сын, потерявший отца, потом \u2014 уч\u0451ные, нашедшие в земле осколки чуда.`,
  },
  {
    text: `Сегодня библиотека Цельса \u2014 главный символ Эфеса, то, ради чего сюда приезжают. Миллионы людей фотографируют этот фасад каждый год, и почти никто не знает, что за ним \u2014 одна из самых пронзительных историй любви отца и сына. Аквила не строил ради императора и не гнался за властью. Скорбящий сын решил, что лучший способ помнить отца \u2014 подарить миру место, где можно учиться. Почти две тысячи лет спустя это вс\u0451 ещ\u0451 работает.`,
  },
];

const title = "Библиотека Цельса \u2014 памятник сыновней любви";
const subtitle = "Как горе одного сына подарило миру величайшую библиотеку";
const excerpt = paragraphs[0].text;
const moralOrLesson =
  "Самые великие памятники рождаются не из амбиций, а из любви и утраты. То, что мы строим в память об ушедших, говорит не о них \u2014 а о нас.";

const item = {
  // Keys
  siteId: "ephesus",
  langStoryId: "ru#library-celsus",
  lang: "ru",
  storyId: "library-celsus",

  // Russian text
  title,
  subtitle,
  excerpt,
  paragraphs,
  moralOrLesson,

  // Unchanged from English record
  icon: "\uD83D\uDCDA",
  tier: "A",
  era: "117-125 AD",
  readingTimeMinutes: 2,
  image: "",
  thumbnail: "",
  coordinates: { lat: 37.9394, lng: 27.3403 },
  source:
    "Archaeological excavations; dedicatory inscriptions; Austrian Archaeological Institute records",
  characters: [
    "Tiberius Julius Celsus Polemaeanus",
    "Gaius Julius Aquila",
    "Sophia",
    "Episteme",
    "Ennoia",
    "Arete",
  ],
  storyCategory: "crowns_conquests",
  isFree: true,
  hasAudio: false,
  disabled: false,
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════
// VALIDATION & PUSH
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  console.log("\n=== Library of Celsus — Russian (ru) ===\n");

  // Validate paragraphs
  let totalChars = 0;
  let valid = true;

  item.paragraphs.forEach((p, i) => {
    const chars = p.text.length;
    const words = p.text.split(/\s+/).length;
    totalChars += chars;

    const charOk = chars <= 500;
    const wordOk = words <= 100;

    console.log(
      `  P${i + 1}: ${chars} chars, ${words} words ${charOk && wordOk ? "\u2713" : "\u2717 OVER LIMIT"}`
    );

    if (!charOk || !wordOk) valid = false;
  });

  console.log(`\n  Total: ${totalChars} chars across ${item.paragraphs.length} paragraphs`);
  console.log(`  Target: ~3000 chars (\u00B120%), range 2400-3600`);
  console.log(
    `  Status: ${totalChars >= 2400 && totalChars <= 3600 ? "\u2713 In range" : "\u2717 OUT OF RANGE"}`
  );

  if (totalChars < 2400 || totalChars > 3600) valid = false;

  if (!valid) {
    console.error("\n\u274C Validation failed. Aborting.");
    process.exit(1);
  }

  // Validate JSON serialization (Cyrillic safety)
  try {
    const json = JSON.stringify(item);
    JSON.parse(json);
    console.log(`\n  JSON validation: \u2713 (${json.length} bytes)`);
  } catch (err) {
    console.error("\n\u274C JSON validation failed:", err.message);
    process.exit(1);
  }

  // Push to DynamoDB
  console.log("\n  Pushing to DynamoDB...");

  const cmd = new PutCommand({
    TableName: TABLE,
    Item: item,
    ConditionExpression: "attribute_not_exists(siteId)",
  });

  try {
    await doc.send(cmd);
    console.log("  \u2705 Successfully pushed!\n");
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log("  \u26A0\uFE0F  Record already exists. Overwriting...");
      const overwrite = new PutCommand({ TableName: TABLE, Item: item });
      await doc.send(overwrite);
      console.log("  \u2705 Overwritten successfully!\n");
    } else {
      throw err;
    }
  }

  // Verify
  console.log("  Record details:");
  console.log(`    siteId:        ${item.siteId}`);
  console.log(`    langStoryId:   ${item.langStoryId}`);
  console.log(`    lang:          ${item.lang}`);
  console.log(`    title:         ${item.title}`);
  console.log(`    subtitle:      ${item.subtitle}`);
  console.log(`    paragraphs:    ${item.paragraphs.length}`);
  console.log(`    moralOrLesson: ${item.moralOrLesson}`);
  console.log(`    updatedAt:     ${item.updatedAt}`);
  console.log(`    storyCategory: ${item.storyCategory}`);
  console.log(`    isFree:        ${item.isFree}`);
  console.log();
}

main().catch((err) => {
  console.error("\u274C Failed:", err.message);
  process.exit(1);
});
