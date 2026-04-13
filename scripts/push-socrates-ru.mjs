#!/usr/bin/env node
/**
 * Push Russian version of "Socrates — Wisest of Men" to DynamoDB Story table.
 */
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const paragraphs = [
  "Около 430 года до нашей эры лучший друг Сократа — Херефонт — сделал то, что навсегда изменило историю мысли. Он отправился в Дельфы, самое священное место древней Греции, где жрица по имени Пифия говорила от лица бога Аполлона. Вопрос был один, простой и дерзкий: «Есть ли кто мудрее Сократа?» Пифия ответила коротко, как отрезала: «Нет. Никого.»",

  "Когда весть дошла до Афин, Сократ не обрадовался. Даже не улыбнулся. Он был искренне озадачен. Посудите сами: босой человек, который бродит по рыночной площади и задаёт прохожим вопросы, от которых у тех портится настроение. Ни денег, ни должности, ни единой написанной строчки. Только неугомонное любопытство и странный талант ставить собеседника в тупик. И вот самый главный храм Греции называет его мудрейшим из живущих?",

  "Сократ поступил как всегда — пошёл разбираться сам. Он обошёл тех, кого Афины считали мудрецами: сначала политиков, потом поэтов, потом ремесленников — и каждому стал задавать свои неудобные вопросы. Что такое справедливость? Что такое мужество? Что вы действительно знаете — и откуда вы это знаете?",

  "Говорят, Бог троицу любит. Сократ проверил троицу — и троица провалилась. Политики рассуждали о справедливости, но не могли её определить. Поэты писали строки, от которых перехватывало дыхание, но сами не понимали, о чём пишут. Ремесленники блестяще владели своим делом — и были уверены, что это делает их знатоками во всём остальном. Три группы, три провала, один итог: никто из них ничего по-настоящему не знал.",

  "И тут Сократ понял, что имел в виду оракул. Разница между ним и остальными была не в объёме знаний — перед большими вопросами все оказались одинаково беспомощны. Разница была в одном: те были уверены, что знают, а Сократ знал, что не знает. Эта крошечная щель — смелость сказать «я не знаю» — и была всем, что отделяло мудрость от самообмана.",

  "Он сам сказал об этом так: «Я мудрее этого человека. Ни он, ни я не знаем ничего стоящего, но он думает, что знает, хотя не знает. А я по крайней мере знаю, что не знаю.» Возможно, это самая важная мысль, которая когда-либо приходила человеку в голову. И суть её проста: самый умный в комнате — тот, кто понимает границы собственного незнания.",

  "Это пророчество определило всю его жизнь — и стало его приговором. Тридцать лет Сократ ходил по Афинам, разоблачал ложную уверенность и заставлял людей думать по-настоящему. Для одних он стал героем, для других — невыносимой угрозой. В 399 году до нашей эры его судили за «развращение молодёжи» и приговорили к смерти. Друзья подкупили стражу и подготовили побег — он отказался. Всю жизнь прожил по законам Афин и не собирался предавать их в последние дни.",

  "Над входом в храм Аполлона в Дельфах в камне были высечены два слова: «Познай себя». Тысячи людей читали эту надпись и шли дальше. Сократ единственный отнёсся к ней всерьёз — и выстроил вокруг неё всю свою жизнь. Прошло двадцать пять веков. Мы до сих пор пытаемся его догнать.",
];

const item = {
  siteId:             { S: "delphi" },
  langStoryId:        { S: "ru#socrates-wisest" },
  storyId:            { S: "socrates-wisest" },
  lang:               { S: "ru" },
  title:              { S: "Сократ — мудрейший из смертных" },
  subtitle:           { S: "Пророчество, с которого началась философия" },
  excerpt:            { S: paragraphs[0] },
  icon:               { S: "🧠" },
  tier:               { S: "A" },
  source:             { S: "Plato's Apology (20e-23c), Xenophon's Apology, Diogenes Laertius's Lives of Eminent Philosophers" },
  era:                { S: "430 BCE" },
  readingTimeMinutes: { N: "3" },
  image:              { S: "" },
  thumbnail:          { S: "" },
  disabled:           { BOOL: false },
  coordinates:        { M: { lng: { N: "22.501" }, lat: { N: "38.4824" } } },
  hasAudio:           { BOOL: false },
  isFree:             { BOOL: true },
  storyCategory:      { S: "prophets_pilgrims" },
  updatedAt:          { N: String(Math.floor(Date.now() / 1000)) },
  characters:         { L: [
    { S: "Сократ" },
    { S: "Херефонт" },
    { S: "Пифия" },
    { S: "Аполлон" },
    { S: "Жители Афин" },
  ]},
  moralOrLesson:      { S: "Настоящая мудрость начинается не с того, что ты знаешь, а с честного признания того, чего не знаешь. Кто уверен в своих знаниях, не имея их, обманывает прежде всего себя. Самые смелые слова в истории — всего два: «Не знаю.»" },
  paragraphs:         { L: paragraphs.map(text => ({ M: { text: { S: text } } })) },
};

// ── Validation ──────────────────────────────────────────────────────────────
console.log("\n═══ PRE-FLIGHT VALIDATION ═══\n");

let valid = true;

// Check paragraph constraints
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

// Validate JSON round-trip
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
    ConditionExpression: "attribute_not_exists(siteId)",  // safety: don't overwrite
  }));
  console.log("  ✓ Successfully pushed ru#socrates-wisest to Story table");
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
  Key: { siteId: { S: "delphi" }, langStoryId: { S: "ru#socrates-wisest" } },
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
