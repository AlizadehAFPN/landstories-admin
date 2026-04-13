#!/usr/bin/env node
/**
 * Push Russian version of "The Pythia — Voice of Apollo" to DynamoDB Story table.
 * Proverb subversion: "Слово не воробей" — each of the Pythia's words was two sparrows at once.
 */
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const paragraphs = [
  `Больше тысячи лет самым влиятельным человеком античного мира был не царь и не полководец. Это была женщина — одна, на бронзовом треножнике, в тёмной подземной камере, где из трещины в скале поднимались странные пары. Её звали Пифия — оракул Дельф. Когда она говорила, люди верили: это голос самого Аполлона, бога пророчеств. Цари пересекали моря и ждали месяцами ради одного-единственного вопроса.`,

  `Пифией всегда становилась местная жительница Дельф. Сначала выбирали молодых и незамужних — пока один из паломников не напал на жрицу. После этого на роль оракула стали брать только женщин старше пятидесяти, хотя одевали их по-прежнему в белые девичьи одежды. Избранная теряла всё: дом, семью, имя. Она больше не принадлежала себе — только Аполлону. И служила его голосом до последнего вздоха.`,

  `Обряд проходил раз в месяц, на седьмой день — семёрка считалась числом Аполлона. Пифия постилась, омывалась в ледяном горном источнике и спускалась в самую потаённую комнату храма. Там она садилась на треножник прямо над расщелиной в скале. Снизу сочился сладковатый газ — от него кружилась голова и мир начинал плыть. Она жевала лавровые листья, пила воду из священного ключа и медленно соскальзывала в транс.`,

  `То, что случалось дальше, пугало и завораживало. Пифия начинала дрожать и кричать голосом, который очевидцы называли чужим. Слова вырывались бессвязно, разобрать их мог не каждый. Но жрецы рядом ловили каждый звук и превращали поток безумия в выверенные пророчества. Каждое из них — загадка. Оракул никогда не врал. Просто правда всегда имела больше одного смысла.`,

  `Эти загадки меняли ход истории. Крёз, царь Лидии, спросил: нападать ли на Персию? Ответ: «Перейдёшь реку — великое царство падёт». Крёз двинул войска. Рухнуло его собственное царство. Говорят, слово не воробей. У Пифии каждое слово было сразу двумя: поймаешь одного — улетит другой. В 480 году до нашей эры, когда персы шли на Афины, оракул велел «довериться деревянным стенам». Полководец Фемистокл решил: это корабли. Афины поставили всё на флот — и разгромили персов у Саламина.`,

  `А что на самом деле происходило в той камере? В 2001 году геологи обнаружили, что прямо под руинами храма пересекаются два разлома земной коры. Из этих трещин мог выделяться этилен — природный газ, который в малых дозах вызывает именно то, что описывали античные авторы: ощущение невесомости, потерю связи с собственным телом. Может, Пифия просто дышала газом. А может, всё было сложнее. Но одно точно: ей верили — и эта вера двигала армии и рушила царства.`,

  `Конец пришёл в 393 году. Римский император Феодосий — убеждённый христианин, решивший уничтожить всё, что осталось от греческой веры, — отправил посланника в Дельфы: оракулу есть что сказать? Ответ Пифии стал одним из самых пронзительных прощаний в истории: «Передай императору — великий зал рухнул. У Аполлона больше нет крова, нет священного лавра, нет говорящего источника. Даже вода умолкла». После тысячи с лишним лет голос бога затих. И больше не зазвучал.`,
];

const item = {
  siteId:             { S: "delphi" },
  langStoryId:        { S: "ru#pythia-oracle" },
  storyId:            { S: "pythia-oracle" },
  lang:               { S: "ru" },
  title:              { S: "Пифия — голос Аполлона" },
  subtitle:           { S: "Жрица, говорившая за бога больше тысячи лет" },
  excerpt:            { S: "Больше тысячи лет самым влиятельным человеком античного мира был не царь и не полководец. Это была женщина — одна, на бронзовом треножнике, в тёмной подземной камере, где из трещины в скале поднимались странные пары." },
  icon:               { S: "🔮" },
  tier:               { S: "S" },
  source:             { S: "Herodotus's Histories, Plutarch's Moralia (On the Pythian Oracles), Pausanias's Description of Greece, Diodorus Siculus's Bibliotheca Historica" },
  era:                { S: "8th century BCE - 393 CE" },
  readingTimeMinutes: { N: "3" },
  image:              { S: "" },
  thumbnail:          { S: "" },
  disabled:           { BOOL: false },
  coordinates:        { M: { lng: { N: "22.501" }, lat: { N: "38.4824" } } },
  hasAudio:           { BOOL: false },
  isFree:             { BOOL: true },
  storyCategory:      { S: "riddles_past" },
  updatedAt:          { N: String(Math.floor(Date.now() / 1000)) },
  characters:         { L: [
    { S: "Пифия" },
    { S: "Аполлон" },
    { S: "Крёз Лидийский" },
    { S: "Фемистокл" },
    { S: "Жрецы Аполлона" },
  ]},
  moralOrLesson:      { S: "Оракул никогда не лгал — просто правда у него всегда была с двойным дном. Чтобы понять ответ Пифии, нужно было то самое, что греки высекли над входом в её храм: «Познай самого себя»." },
  paragraphs:         { L: paragraphs.map(text => ({ M: { text: { S: text } } })) },
};

// ── Validation ──────────────────────────────────────────────────────────────
console.log("\n═══ PRE-FLIGHT VALIDATION ═══\n");

let valid = true;

for (let i = 0; i < paragraphs.length; i++) {
  const chars = paragraphs[i].length;
  const words = paragraphs[i].split(/\s+/).length;
  const status = chars > 500 ? "⚠ OVER" : "✓";
  console.log(`  P${i + 1}: ${chars} chars, ${words} words ${status}`);
  if (chars > 500) { valid = false; }
}

const totalChars = paragraphs.reduce((s, p) => s + p.length, 0);
console.log(`\n  Total: ${totalChars} chars across ${paragraphs.length} paragraphs`);
console.log(`  Title: ${item.title.S}`);
console.log(`  Subtitle: ${item.subtitle.S}`);
console.log(`  langStoryId: ${item.langStoryId.S}`);
console.log(`  lang: ${item.lang.S}`);

try {
  JSON.parse(JSON.stringify(item));
  console.log("  JSON round-trip: ✓");
} catch (e) {
  console.error("  JSON round-trip: ✗", e.message);
  valid = false;
}

if (!valid) {
  console.error("\n✗ Validation failed. Aborting.\n");
  process.exit(1);
}

// ── Push ─────────────────────────────────────────────────────────────────────
console.log("\n═══ PUSHING TO DYNAMODB ═══\n");

try {
  const result = await client.send(new PutItemCommand({
    TableName: "Story",
    Item: item,
    ConditionExpression: "attribute_not_exists(siteId)",
  }));
  console.log("  ✓ Successfully pushed ru#pythia-oracle to Story table");
  console.log(`  HTTP ${result.$metadata.httpStatusCode}`);
} catch (err) {
  if (err.name === "ConditionalCheckFailedException") {
    console.error("  ✗ Record already exists! Aborting to prevent overwrite.");
  } else {
    console.error("  ✗ Push failed:", err.message);
  }
  process.exit(1);
}

// ── Verify ───────────────────────────────────────────────────────────────────
console.log("\n═══ VERIFYING ═══\n");

import { GetItemCommand } from "@aws-sdk/client-dynamodb";

const verify = await client.send(new GetItemCommand({
  TableName: "Story",
  Key: { siteId: { S: "delphi" }, langStoryId: { S: "ru#pythia-oracle" } },
}));

if (verify.Item) {
  console.log("  ✓ Record verified in DynamoDB");
  console.log(`  title: ${verify.Item.title.S}`);
  console.log(`  paragraphs: ${verify.Item.paragraphs.L.length}`);
  console.log(`  updatedAt: ${verify.Item.updatedAt.N}`);
} else {
  console.error("  ✗ Record not found after push!");
  process.exit(1);
}

console.log("\n═══ DONE ═══\n");
