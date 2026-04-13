import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const NOW = Math.floor(Date.now() / 1000);

// ═══════════════════════════════════════════════════════════════════════════════
// RUSSIAN — «Сколько верёвочке ни виться, а конец будет.
//            Эта верёвочка вилась тысячу лет.
//            А оборвала её — одна подпись.»
// ═══════════════════════════════════════════════════════════════════════════════
const ru = {
  siteId: "roman-forum-palatine",
  storyId: "last-vestal-virgin",
  lang: "ru",
  langStoryId: "ru#last-vestal-virgin",

  title: "Последняя весталка",
  subtitle: "Тысяча лет священного огня, погашенного росчерком пера",
  excerpt:
    "Больше тысячи лет шесть женщин хранили священное пламя Рима. Они были неприкосновенны, могущественны, почитаемы \u2014 и любую из них могли похоронить заживо за нарушение единственного обета.",
  moralOrLesson:
    "Даже тысячелетняя традиция может закончиться одной подписью \u2014 а самые великие привилегии всегда требуют самой высокой цены.",

  paragraphs: [
    {
      text: "Представьте себе вакансию в Древнем Риме: шесть женщин, отобранных ещё девочками, с одной-единственной задачей \u2014 поддерживать огонь. Погаснет пламя \u2014 падёт Рим. Всё просто. Всё жестоко. Больше тысячи лет, с 700 года до нашей эры по 394 год нашей эры, весталки хранили священный огонь Весты, богини домашнего очага, в храме в самом сердце Римского форума. Они были самыми могущественными женщинами древнего мира. А ценой этого могущества были их тело, их свобода и иногда \u2014 их жизнь.",
    },
    {
      text: "Отбирали их в возрасте от шести до десяти лет, всегда из самых влиятельных семей Рима. Раз избранная, весталка служила тридцать лет: десять \u2014 училась ритуалам, десять \u2014 исполняла их, десять \u2014 обучала следующее поколение. Всё это время она обязана была хранить девственность. Взамен получала то, чего не было ни у одной другой римлянки: настоящую власть. Весталки могли владеть имуществом, составлять завещание и свидетельствовать в суде без присяги. Если приговорённый к смерти встречал весталку по пути к казни \u2014 его отпускали на месте.",
    },
    {
      text: "На улицах Рима даже высшие чиновники уступали дорогу весталке. Они ездили в особой повозке \u2014 привилегия, которая обычно полагалась только императрице. В Колизее сидели в первом ряду, рядом с самим императором. В обществе, где большинство женщин считались собственностью, весталки были неприкосновенны. И это не фигура речи: за насилие над весталкой полагалась смерть.",
    },
    {
      text: "Но за этой властью стоял чудовищный подвох. Весталку, нарушившую обет, ждало наказание, которое невозможно забыть. Римский закон запрещал проливать кровь весталки \u2014 это оскорбило бы богов. И Рим нашёл лазейку. Обвиняемую одевали в траур, проводили через Форум, которым она когда-то правила, и вели к Campus Sceleratus \u2014 \u00abПолю Злодеяний\u00bb. Там она спускалась в крохотную комнату с лампой, хлебом и водой. Вход заваливали землёй. Рим не убивал их. Рим просто... прятал.",
    },
    {
      text: "За века не менее десяти весталок были похоронены заживо. И обвинения далеко не всегда были настоящими. Когда Рим терпел поражения или страдал от бедствий, правителям нужен был козёл отпущения \u2014 а обвинить весталку в нарушении обета было проще всего, чтобы превратить панику в жертвоприношение. Плутарх писал об этих процессах, не скрывая сомнений. Плиний Младший описал одно захоронение при императоре Домициане \u2014 правителе, прославившемся жестокостью \u2014 с плохо скрытым отвращением.",
    },
    {
      text: "Весталки не исчезли из-за скандала. Они исчезли, потому что мир вокруг них изменился. В 382 году император Грациан \u2014 уже христианин во главе христианской империи \u2014 лишил орден финансирования. Через двенадцать лет Феодосий I упразднил его и приказал погасить священный огонь. Сколько верёвочке ни виться, а конец будет. Эта верёвочка вилась тысячу лет. А оборвала её \u2014 одна подпись.",
    },
    {
      text: "Последней верховной весталкой была, вероятно, женщина по имени Целия Конкордия. Боролась ли она за сохранение ордена или ушла молча \u2014 мы не знаем. Но то, что она оставила, говорит до сих пор. Дом весталок стоит в Римском форуме и сегодня. Его двор обрамлён пьедесталами, на которых когда-то стояли статуи каждой верховной весталки. Некоторые пусты \u2014 разрушены временем или намеренно. На других имена соскоблены, стёрты той самой верой, что пришла им на смену. Тысяча лет служения \u2014 и всё, что осталось: немой камень и тишина.",
    },
  ],

  // Unchanged fields from English
  icon: "\u{1F525}",
  tier: "A",
  source:
    "Plutarch, Life of Numa; Livy, Ab Urbe Condita; Aulus Gellius, Noctes Atticae; Ammianus Marcellinus",
  characters: [
    "The Vestal Virgins",
    "King Numa Pompilius",
    "Emperor Theodosius I",
    "Coelia Concordia (last Chief Vestal)",
    "Emperor Domitian",
  ],
  era: "7th century BC - 394 AD",
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  coordinates: { lat: 41.8917, lng: 12.487 },
  disabled: false,
  hasAudio: false,
  isFree: true,
  storyCategory: "lost_found",
  updatedAt: NOW,
};

// ═══════════════════════════════════════════════════════════════════════════════
// VALIDATE & PUSH
// ═══════════════════════════════════════════════════════════════════════════════
console.log("────────────────────────────────────────");
console.log("RUSSIAN — Последняя весталка");
console.log("────────────────────────────────────────\n");

// JSON validation
const jsonStr = JSON.stringify(ru);
try {
  JSON.parse(jsonStr);
  console.log(`JSON valid (${jsonStr.length} bytes)`);
} catch (e) {
  console.error(`JSON INVALID: ${e.message}`);
  process.exit(1);
}

// Paragraph validation
console.log(`Paragraphs: ${ru.paragraphs.length}`);
let totalChars = 0;
for (let i = 0; i < ru.paragraphs.length; i++) {
  const len = ru.paragraphs[i].text.length;
  const words = ru.paragraphs[i].text.split(/\s+/).length;
  totalChars += len;
  const flag = len > 600 ? " ❌ OVER 600!" : len > 500 ? " ⚠" : " ✓";
  console.log(`  P${i + 1}: ${len} chars, ~${words} words${flag}`);
}
console.log(`Total story chars: ${totalChars}`);
console.log(`Title: ${ru.title}`);
console.log(`Subtitle: ${ru.subtitle}`);
console.log(`Excerpt (${ru.excerpt.length} chars): ${ru.excerpt.substring(0, 80)}...`);
console.log(`Moral (${ru.moralOrLesson.length} chars): ${ru.moralOrLesson.substring(0, 80)}...`);

// Cyrillic sanity check — make sure no mojibake
const cyrillicTest = /[а-яА-ЯёЁ]/.test(ru.title);
console.log(`\nCyrillic encoding OK: ${cyrillicTest}`);

// Push
console.log("\nPushing to DynamoDB...");
try {
  await docClient.send(
    new PutCommand({
      TableName: TABLE,
      Item: ru,
      ConditionExpression:
        "attribute_not_exists(siteId) OR langStoryId = :lsi",
      ExpressionAttributeValues: { ":lsi": ru.langStoryId },
    })
  );
  console.log("✅ RUSSIAN pushed successfully.\n");
} catch (err) {
  console.error(`❌ FAILED: ${err.message}`);
  process.exit(1);
}

console.log("════════════════════════════════════════");
console.log("Done. ru#last-vestal-virgin is live.");
console.log("════════════════════════════════════════\n");
