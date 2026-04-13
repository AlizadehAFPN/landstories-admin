import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

// ── Russian paragraphs ──────────────────────────────────────────────

const paragraphs = [
  {
    text: "Девятый легион \u2014 Legio IX Hispana \u2014 был одной из старейших боевых частей Рима. Эти солдаты воевали ещё под началом Юлия Цезаря во время покорения Галлии (нынешней Франции) в 50-х годах до нашей эры. Они прошли с ним гражданскую войну, которая уничтожила Республику и породила Империю. К 43 году, когда император Клавдий отправил их завоёвывать Британию, Девятый воевал уже больше ста лет. Пять тысяч закалённых ветеранов в крепости Эборак \u2014 нынешний Йорк \u2014 на самом опасном рубеже Рима.",
  },
  {
    text: "А потом они исчезли.",
  },
  {
    text: "Последний след Девятого \u2014 надпись в Йорке, 108 год нашей эры. Дальше \u2014 тишина. Ни приказов о переводе, ни надгробий, ни единого упоминания в дотошных римских военных архивах. Когда император Адриан явился в Британию в 122 году строить свою Стену, Девятого уже не было. На его место из Германии перебросили другой легион. Рим отслеживал каждое подразделение на трёх континентах. Чтобы целый легион просто испарился из документов? Что-то пошло очень, очень не так.",
  },
  {
    text: "Самая известная версия \u2014 она же самая страшная. Девятый двинулся на север, в Каледонию \u2014 нынешнюю Шотландию \u2014 подавлять восстание пиктов, воинов, которых римляне прозвали \u00ABраскрашенными\u00BB за их татуировки. Представьте: пять тысяч солдат входят в Шотландское нагорье \u2014 туманные горы, непролазные леса, бескрайние болота. Кошмар для армии, обученной воевать строем на ровной земле. Пикты знали каждый перевал и каждый брод. Засада, обоз отрезан, колонна уничтожена. Пять тысяч человек сгинули в тумане.",
  },
  {
    text: "Но вот поворот. В 1950-х археологи нашли черепицу с клеймом Девятого на военной базе в Неймегене, Нидерланды \u2014 значит, хотя бы часть легиона добралась до материковой Европы после 108 года. Некоторые историки считают, что Девятый вовсе не погиб в Шотландии, а был переброшен и уничтожен в другой войне \u2014 возможно, во время жестокого иудейского восстания в провинции Иудея около 132 года, где Рим терял целые подразделения. Одна загадка сменяет другую. А тишина в архивах звучит всё так же громко.",
  },
  {
    text: "Эта загадка стала британской легендой. В 1954 году Розмари Сатклифф написала роман \u00ABОрёл Девятого легиона\u00BB \u2014 про молодого римского офицера, отправившегося за Стену Адриана искать потерянный легион своего отца. Книга стала обязательным чтением для поколений британских школьников, а в 2011-м по ней сняли фильм \u00ABОрёл\u00BB. Версия Сатклифф \u2014 последний бой Девятого против пиктов где-то в шотландских горах \u2014 засела в головах у большинства, даже если они понятия не имеют откуда она взялась.",
  },
  {
    text: "Мы, скорее всего, никогда не узнаем правду. Улик ровно столько, чтобы не давать покоя \u2014 и ровно столько, чтобы не отвести глаз. Но одно мы знаем точно: Адриан построил свою Стену, потому что на севере случилось что-то страшное. Лежат ли кости Девятого под шотландским вереском или ближневосточным песком \u2014 их исчезновение навсегда прочертило эту линию через всю Британию. Говорят, Бог троицу любит. Рим потерял пять тысяч \u2014 и даже не узнал за что.",
  },
];

// ── Validate constraints ─────────────────────────────────────────────

let totalChars = 0;
let allValid = true;
for (let i = 0; i < paragraphs.length; i++) {
  const p = paragraphs[i];
  const chars = p.text.length;
  const words = p.text.split(/\s+/).length;
  totalChars += chars;
  const charOk = chars <= 500 ? "\u2705" : "\u274c";
  const wordOk = words <= 100 ? "\u2705" : "\u274c";
  console.log(`P${i + 1}: ${chars} chars ${charOk}  ${words} words ${wordOk}`);
  if (chars > 500 || words > 100) allValid = false;
}
console.log(`\nTotal: ${totalChars} chars, ${paragraphs.length} paragraphs`);
console.log(`Target: ~3000 chars (\u00b120% = 2400\u20133600)`);

if (!allValid) {
  console.error("\n\u274c Some paragraphs exceed limits. Aborting.");
  process.exit(1);
}
if (totalChars < 2400 || totalChars > 3600) {
  console.error(
    `\n\u274c Total chars ${totalChars} outside acceptable range. Aborting.`
  );
  process.exit(1);
}

console.log("\n\u2705 All constraints passed. Pushing to DynamoDB...\n");

// ── Push as NEW record (ru#) — do NOT overwrite English ──────────────

const item = {
  // Keys
  siteId: "hadrians-wall",
  langStoryId: "ru#lost-ninth-legion",
  lang: "ru",
  storyId: "lost-ninth-legion",

  // Russian text fields
  title: "\u041f\u0440\u043e\u043f\u0430\u0432\u0448\u0438\u0439 \u0414\u0435\u0432\u044f\u0442\u044b\u0439 \u043b\u0435\u0433\u0438\u043e\u043d",
  subtitle:
    "\u041f\u044f\u0442\u044c \u0442\u044b\u0441\u044f\u0447 \u0440\u0438\u043c\u0441\u043a\u0438\u0445 \u0441\u043e\u043b\u0434\u0430\u0442 \u0443\u0448\u043b\u0438 \u043d\u0430 \u0441\u0435\u0432\u0435\u0440, \u0432 \u0442\u0443\u043c\u0430\u043d \u2014 \u0438 \u0431\u043e\u043b\u044c\u0448\u0435 \u0438\u0445 \u043d\u0438\u043a\u0442\u043e \u043d\u0435 \u0432\u0438\u0434\u0435\u043b",
  excerpt:
    "\u0414\u0435\u0432\u044f\u0442\u044b\u0439 \u043b\u0435\u0433\u0438\u043e\u043d \u2014 Legio IX Hispana \u2014 \u0431\u044b\u043b \u043e\u0434\u043d\u043e\u0439 \u0438\u0437 \u0441\u0442\u0430\u0440\u0435\u0439\u0448\u0438\u0445 \u0431\u043e\u0435\u0432\u044b\u0445 \u0447\u0430\u0441\u0442\u0435\u0439 \u0420\u0438\u043c\u0430. \u042d\u0442\u0438 \u0441\u043e\u043b\u0434\u0430\u0442\u044b \u0432\u043e\u0435\u0432\u0430\u043b\u0438 \u0435\u0449\u0451 \u043f\u043e\u0434 \u043d\u0430\u0447\u0430\u043b\u043e\u043c \u042e\u043b\u0438\u044f \u0426\u0435\u0437\u0430\u0440\u044f \u0432\u043e \u0432\u0440\u0435\u043c\u044f \u043f\u043e\u043a\u043e\u0440\u0435\u043d\u0438\u044f \u0413\u0430\u043b\u043b\u0438\u0438.",
  moralOrLesson:
    "\u0414\u0430\u0436\u0435 \u0443 \u0432\u0435\u043b\u0438\u0447\u0430\u0439\u0448\u0438\u0445 \u0438\u043c\u043f\u0435\u0440\u0438\u0439 \u0435\u0441\u0442\u044c \u043f\u0440\u0435\u0434\u0435\u043b\u044b. \u0418\u043d\u043e\u0433\u0434\u0430 \u043f\u044f\u0442\u044c \u0442\u044b\u0441\u044f\u0447 \u0447\u0435\u043b\u043e\u0432\u0435\u043a \u0443\u0445\u043e\u0434\u044f\u0442 \u0437\u0430 \u044d\u0442\u0438 \u043f\u0440\u0435\u0434\u0435\u043b\u044b \u2014 \u0438 \u0435\u0434\u0438\u043d\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0435, \u0447\u0442\u043e \u0432\u043e\u0437\u0432\u0440\u0430\u0449\u0430\u0435\u0442\u0441\u044f, \u044d\u0442\u043e \u0442\u0438\u0448\u0438\u043d\u0430.",
  paragraphs,

  // Non-text fields — copied exactly from English record
  icon: "\u2694\ufe0f",
  tier: "A",
  source:
    'Rosemary Sutcliff, "The Eagle of the Ninth" (1954); Cassius Dio, "Roman History"; Duncan B. Campbell, "The Fate of the Ninth" (2018); Miles Russell, "The Lost Legions of Fromelles" (2019); Film: "The Eagle" (2011, dir. Kevin Macdonald)',
  characters: [
    "Legio IX Hispana",
    "Emperor Hadrian",
    "The Picts of Caledonia",
    "Marcus Flavius Aquila (fictional, Sutcliff)",
    "Rosemary Sutcliff",
  ],
  era: "Early 2nd century AD (c. AD 108-120)",
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  disabled: false,
  hasAudio: false,
  isFree: true,
  storyCategory: "riddles_past",
  coordinates: { lat: 55.0265, lng: -2.3615 },
  updatedAt: Math.floor(Date.now() / 1000),
};

// ── Push to DynamoDB ─────────────────────────────────────────────────

const result = await docClient.send(
  new PutCommand({
    TableName: "Story",
    Item: item,
    ConditionExpression: "attribute_not_exists(siteId)",
  })
);

console.log("\u2705 Russian story created successfully!");
console.log(`   siteId:      ${item.siteId}`);
console.log(`   langStoryId: ${item.langStoryId}`);
console.log(`   title:       ${item.title}`);
console.log(`   subtitle:    ${item.subtitle}`);
console.log(`   paragraphs:  ${item.paragraphs.length}`);
console.log(`   reading:     ${item.readingTimeMinutes} min`);
console.log(
  `   updatedAt:   ${new Date(item.updatedAt * 1000).toISOString()}`
);

// ── Verify by reading back ───────────────────────────────────────────

import { GetCommand } from "@aws-sdk/lib-dynamodb";
const verify = await docClient.send(
  new GetCommand({
    TableName: "Story",
    Key: { siteId: "hadrians-wall", langStoryId: "ru#lost-ninth-legion" },
  })
);

if (verify.Item && verify.Item.lang === "ru") {
  console.log("\n\u2705 Verified: Russian record exists in DynamoDB.");
  console.log(`   Paragraphs stored: ${verify.Item.paragraphs.length}`);
  console.log(`   First paragraph starts: "${verify.Item.paragraphs[0].text.substring(0, 60)}..."`);
} else {
  console.error("\n\u274c Verification failed!");
}
