import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const now = Math.floor(Date.now() / 1000);

// ═══════════════════════════════════════════════════════════════════
//  RUSSIAN — Крепость в небе
//  Proverb subverted: «Сколько верёвочке ни виться, а конец будет»
//  (No matter how long the rope twists, the end will come)
// ═══════════════════════════════════════════════════════════════════

const item = {
  siteId: "sigiriya",
  langStoryId: "ru#kings-downfall",
  lang: "ru",
  storyId: "kings-downfall",
  title: "Крепость в небе",
  subtitle:
    "Восемнадцать лет он правил с вершины скалы, куда не мог добраться ни один враг. А потом спустился сам \u2014 и потерял всё за считанные минуты",
  excerpt:
    "Царь убил собственного отца и построил дворец на вершине скалы посреди джунглей. Восемнадцать лет ни одна армия не могла до него добраться. Когда брат наконец пришёл \u2014 Кашьяпа сам спустился ему навстречу. Всё рухнуло за минуты.",
  paragraphs: [
    {
      text: `Кашьяпа убил собственного отца. С этого всё начинается. В 477 году нашей эры он сверг царя Дхатусену, правителя Шри-Ланки \u2014 приказал замуровать его заживо в стене \u2014 и забрал трон. Но его брат по отцу Моггаллана, законный наследник, в ту же ночь сбежал. Мальчишка-принц нёсся сквозь темноту к Южной Индии. Кашьяпа понимал: он вернётся. И построил дворец на вершине двухсотметровой скалы посреди джунглей. Крепость, до которой не дотянется ни одна армия.`,
    },
    {
      text: `Восемнадцать лет Кашьяпа правил с неба. Окружил Сигирию рвами, вырубил в скале гигантского льва, который стал его воротами, и расписал стены золотыми богинями. Каждая лестница, каждая бойница, каждый узкий проход \u2014 всё было рассчитано на одно: день, когда брат вернётся с армией. И когда этот день настал \u2014 в 495 году Моггаллана шёл с южноиндийским войском забирать свой трон \u2014 Кашьяпа сделал то, чего не ожидал никто.`,
    },
    {
      text: `Он спустился. Вместо того чтобы укрыться за стенами, которые строил двадцать лет, он вывел армию на открытую равнину. Может, думал \u2014 разобьёт врага за считанные часы. Может, понимал: прятаться \u2014 значит показать слабость. А может \u2014 после восемнадцати лет наедине с тем, что он натворил, \u2014 просто хотел, чтобы всё наконец закончилось. Тот, кто построил крепость в небе, выбрал сражаться на земле.`,
    },
    {
      text: `Армии столкнулись у подножия скалы. Кашьяпа ехал на боевом слоне в самом центре \u2014 на виду у всех. А дальше \u2014 случайность. Слон ступил на болотистую землю и развернулся боком, ища опору. Просто животное обходило грязь. Но солдаты увидели, как их царь разворачивается. Увидели отступление. А Мигара \u2014 тот самый полководец, который помогал Кашьяпе убить отца, \u2014 только этого и ждал. Он крикнул \u00abОтступаем!\u00bb \u2014 и армия рассыпалась. За считанные минуты Кашьяпа остался совершенно один.`,
    },
    {
      text: `То, что случилось дальше, \u2014 самая знаменитая смерть в истории Шри-Ланки. Кашьяпа вытащил из-за пояса кинжал, усыпанный самоцветами, приставил к горлу и полоснул. Но есть деталь, которая не даёт людям покоя уже полторы тысячи лет: перерезав себе горло, он поднял окровавленный клинок над головой \u2014 чтобы видело всё поле боя. А потом медленно вложил его обратно в ножны. И упал. Он убрал клинок, потому что бой был окончен. Счёт закрыт.`,
    },
    {
      text: `Моггаллана занял трон и перенёс столицу обратно в Анурадхапуру \u2014 древний священный город. А Сигирию \u2014 эту невозможную крепость, этот памятник вине и гениальности \u2014 отдали буддийским монахам. Дворец наслаждений отцеубийцы стал монастырём. Золотые богини на стенах теперь смотрели на бритые головы. Фонтаны замолчали. Лев рассыпался. Четырнадцать веков единственными звуками на этой скале были пение монахов да тихий скрип \u2014 посетители выцарапывали любовные стихи на отполированной Зеркальной стене.`,
    },
    {
      text: `Говорят: сколько верёвочке ни виться, а конец будет. Верёвочка Кашьяпы вилась восемнадцать лет. Он был гениален. Его крепость \u2014 настоящее чудо. Но расплата пришла не сквозь стены, которые он возвёл, а через преданность, которую так и не смог заслужить. Армия, которая разбежалась в тот день, никогда по-настоящему не шла за царём, убившим собственного отца. Строй крепость хоть до самого неба. Падение всё равно ждёт.`,
    },
  ],
  moralOrLesson:
    "Кашьяпа построил крепость, чтобы убежать от того, что совершил. Но подвели его не стены \u2014 его подвело само преступление. Армия, которая служит человеку, убившему собственного отца, \u2014 это армия, которая ждёт момента уйти. А в свою последнюю секунду \u2014 перерезав горло и вложив кинжал в ножны \u2014 Кашьяпа доказал: единственное, чем он когда-либо по-настоящему владел, был он сам.",
  characters: [
    "Царь Кашьяпа I (обречённый правитель)",
    "Царь Моггаллана I (брат по отцу, вернувшийся наследник)",
    "Мигара (предатель, перешедший на сторону врага)",
    "Полководец Сулаксмана (командир гарнизона Сигирии)",
  ],
  icon: "\u2694\uFE0F",
  tier: "S",
  source:
    "Culavamsa, chapters 38-39 (Geiger translation, 1929); De Silva, K.M. A History of Sri Lanka, 1981; Bandaranayake, Senake. Sigiriya: City, Palace and Royal Gardens, 2005; Gunawardana, R.A.L.H. Robe and Plough: Monasticism and Economic Interest in Early Medieval Sri Lanka, 1979; UNESCO World Heritage Nomination File 202",
  era: "495 CE",
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  coordinates: { lat: 7.957, lng: 80.7603 },
  hasAudio: false,
  isFree: true,
  storyCategory: "ghosts_curses",
  disabled: false,
  updatedAt: now,
};

// ─── VALIDATION ─────────────────────────────────────────────────────────────

console.log("\n=== PARAGRAPH VALIDATION ===\n");

let totalChars = 0;
let totalWords = 0;
let allPass = true;

for (let i = 0; i < item.paragraphs.length; i++) {
  const text = item.paragraphs[i].text;
  const chars = text.length;
  const words = text.split(/\s+/).length;
  totalChars += chars;
  totalWords += words;

  const charOk = chars <= 500;
  const wordOk = words <= 100;

  if (!charOk || !wordOk) allPass = false;

  console.log(
    `P${i + 1}: ${chars} chars ${charOk ? "\u2713" : "\u2717 OVER"} | ${words} words ${wordOk ? "\u2713" : "\u2717 OVER"}`
  );
}

console.log(
  `\nTotal: ${totalChars} chars | ${totalWords} words | ${item.paragraphs.length} paragraphs`
);
console.log(`Target: ~3000 chars (\u00b120% = 2400\u20133600)`);
console.log(
  `Status: ${totalChars >= 2400 && totalChars <= 3600 ? "\u2713 WITHIN RANGE" : "\u2717 OUT OF RANGE"}`
);

console.log(`\nSubtitle: ${item.subtitle.length} chars (max 200)`);
console.log(`Excerpt: ${item.excerpt.length} chars (max 250)`);

if (!allPass) {
  console.error("\n\u2717 Some paragraphs exceed limits. Aborting.");
  process.exit(1);
}

if (item.subtitle.length > 200) {
  console.error("\n\u2717 Subtitle exceeds 200 chars. Aborting.");
  process.exit(1);
}

if (item.excerpt.length > 250) {
  console.error("\n\u2717 Excerpt exceeds 250 chars. Aborting.");
  process.exit(1);
}

// ─── Validate JSON integrity ────────────────────────────────────────────────
const json = JSON.stringify(item);
JSON.parse(json);
console.log(`\n\u2713 JSON valid (${json.length} bytes)`);

// ─── DYNAMODB PUSH ──────────────────────────────────────────────────────────

async function pushStory() {
  console.log("\n\u23f3 Pushing Russian (ru) King's Downfall...");
  try {
    await docClient.send(
      new PutCommand({
        TableName: "Story",
        Item: item,
        ConditionExpression:
          "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
      })
    );
    console.log("\u2705 Russian story pushed successfully (new item).");
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(
        "\u26a0\ufe0f  Item already exists. Overwriting with updated version..."
      );
      await docClient.send(
        new PutCommand({
          TableName: "Story",
          Item: item,
        })
      );
      console.log("\u2705 Russian story overwritten successfully.");
    } else {
      console.error("\u274c Push FAILED:", err.message);
      throw err;
    }
  }

  console.log(`   siteId: ${item.siteId}`);
  console.log(`   langStoryId: ${item.langStoryId}`);
  console.log(`   paragraphs: ${item.paragraphs.length}`);
  console.log(`   updatedAt: ${item.updatedAt}`);
}

async function main() {
  console.log("\n\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550");
  console.log("  King's Downfall \u2014 Russian (ru) push  ");
  console.log("\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550");
  console.log(`Timestamp: ${now}`);

  await pushStory();

  console.log("\n\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550");
  console.log("  Russian story pushed successfully!  ");
  console.log("\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550");
}

main().catch((err) => {
  console.error("\n\ud83d\udca5 Fatal error:", err.message);
  process.exit(1);
});
