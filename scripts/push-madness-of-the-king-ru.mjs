// Push Russian (ru) native recreation of "The Madness of the King"
// (storyId: madness-of-the-king, siteId: babylon) to the Story DynamoDB table.
// Proverb: «Бог троицу любит» — subverted: three divine warnings, then no more mercy.
// Register: modern Russian oral storytelling — popular nonfiction / high-quality podcast.

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

const ru = {
  siteId: "babylon",
  storyId: "madness-of-the-king",
  lang: "ru",
  langStoryId: "ru#madness-of-the-king",

  icon: "👁️",
  storyCategory: "crowns_conquests",
  tier: "A",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 32.5363, lng: 44.4209 },
  updatedAt: now,

  source:
    "Daniel 4 (biblical account of Nebuchadnezzar's madness); 4Q242 Prayer of Nabonidus (Dead Sea Scrolls, Cave 4, Qumran); The Verse Account of Nabonidus (BM 38299, British Museum); 2 Kings 25:27-30 (Evil-Merodach releases Jehoiachin); Wiseman, D.J. Nebuchadrezzar and Babylon, Oxford University Press, 1985; Collins, John J. Daniel: A Commentary on the Book of Daniel, Hermeneia Series, Fortress Press, 1993; Beaulieu, Paul-Alain. The Reign of Nabonidus, King of Babylon 556-539 B.C., Yale University Press, 1989; Henze, Matthias. The Madness of King Nebuchadnezzar, Brill, 1999",

  title: "Безумие царя",

  subtitle:
    "Самый могущественный правитель на земле потерял рассудок и семь лет жил как зверь \u2014 а свиток с Мёртвого моря, возможно, раскрыл, чья это история на самом деле",

  excerpt:
    "Он сжёг Иерусалим, превратил Вавилон в чудо света и выбил своё имя на каждом кирпиче империи. А потом встал на крышу дворца, окинул взглядом город, который создал, \u2014 и потерял рассудок. Семь лет повелитель Вавилона жил как животное под открытым небом.",

  moralOrLesson:
    "Самое высокое дерево в лесу первым попадает под топор. Безумие Навуходоносора было наказанием не за то, что он строил, \u2014 а за то, что забыл, кто строил вместе с ним. Каждый кирпич Вавилона слеплен из речной глины чужими руками и обожжён чужим трудом, а царь, выбивший на них своё имя, забыл, что глина старше его династии и переживёт её. Лекарство от гордыни \u2014 не унижение, а масштаб: понимание того, что даже величайший строитель в конечном счёте \u2014 лишь ещё одно создание из праха.",

  characters: [
    "Навуходоносор II \u2014 царь Вавилона, величайший строитель древнего мира",
    "Даниил \u2014 иудейский пророк, растолковавший царский сон о великом дереве",
    "Набонид \u2014 более поздний царь, чья загадочная болезнь, возможно, легла в основу этой истории",
    "Амель-Мардук (Эвиль-Меродах) \u2014 сын и наследник Навуходоносора",
  ],

  era: "ок. 570\u2013562 гг. до н.э. (последние годы Навуходоносора); свиток 4Q242 с Мёртвого моря сохранил параллельное предание о Набониде",

  paragraphs: [
    {
      text: "Навуходоносор II не просто правил Вавилоном \u2014 он его заново отстроил. Двойные стены, по которым мчались колесницы. Легендарные ворота Иштар. Храмы, дворцы, каналы, каменный мост через Евфрат. И на каждом кирпиче \u2014 его имя. Археологи нашли сотни тысяч таких кирпичей. Один можно подержать в руках в Британском музее, провести пальцем по клинописи: \u00abНавуходоносор, царь Вавилона\u00bb. Он не просто строил город. Он пытался вырезать своё имя на самом времени.",
    },
    {
      text: "А потом пришёл сон. Дерево \u2014 такое огромное, что касалось неба. Его видно с любого края земли, в его ветвях гнездятся птицы, под ним укрываются звери. И вдруг \u2014 голос с небес: срубить. Оставить только пень, скованный железом и бронзой. И пусть разум его станет звериным. Пророк Даниил \u2014 иудейский пленник при вавилонском дворе \u2014 растолковал сон. Он бы предпочёл, чтобы сон был о ком-то другом. Но дерево \u2014 это сам Навуходоносор. И приговор уже вынесен.",
    },
    {
      text: "Даниил умолял: одумайся, яви милосердие \u2014 может, Бог смягчится. Прошло двенадцать месяцев. Ничего не случилось. Говорят, Бог троицу любит. Навуходоносору он дал три шанса: сон, пророка и год тишины. Больше не дал. Однажды вечером царь вышел на крышу дворца \u2014 того самого, чьи руины стоят до сих пор \u2014 и окинул взглядом город, который сам создал. \u00abВот великий Вавилон, \u2014 произнёс он, \u2014 воздвигнутый моей силой, во славу моего величия\u00bb. Он не договорил. С неба упал голос: царство отнято у тебя.",
    },
    {
      text: "То, что случилось дальше, звучит невероятно \u2014 но психиатры описывали такое у современных пациентов. Царь упал на четвереньки. Ел траву, как скот. Волосы отросли и свалялись. Ногти загнулись, как когти. Семь лет самый могущественный человек на земле жил как животное под открытым небом. Библия ни словом не упоминает, кто правил империей все эти годы. И это молчание оглушает \u2014 семь лет пустоты, словно кто-то стёр царя из его собственного царства.",
    },
    {
      text: "А вот тут начинается самое странное. В 1952 году в пещере у Мёртвого моря нашли фрагмент свитка. В нём \u2014 почти та же история: вавилонский царь, поражённый безумием на семь лет, исцелённый иудейским праведником. Но имя другое \u2014 Набонид, правивший десятилетиями позже. И Набонид действительно бросил Вавилон и исчез в аравийской пустыне на десять лет. Зачем \u2014 никто не знает. Многие учёные считают, что эта история изначально была его, а позже её приписали более знаменитому царю.",
    },
    {
      text: "Через семь лет, говорит Даниил, царь поднял глаза к небу \u2014 и разум вернулся. Он восхвалил Бога, советники вернули ему трон, и могущество его стало больше прежнего. Похоже на счастливый конец. Но это не он. Навуходоносор умер в 562 году до нашей эры. Его сын продержался два года и был убит в дворцовом перевороте. Через двадцать три года после смерти великого царя сам Вавилон пал под натиском Кира Персидского. Тот, кто выбил своё имя на каждом кирпиче, не смог выбить его на времени.",
    },
    {
      text: "Но вот последний поворот. Империя рассыпалась. Династия исчезла. Город стал пылью. А кирпичи \u2014 сотни тысяч кирпичей \u2014 всё ещё здесь. Можно зайти в Британский музей или Пергамский музей в Берлине, взять один в руки и прочитать имя, вдавленное в сырую глину двадцать шесть веков назад. Он хотел владеть всем. А оставил то, чего никто не ждал \u2014 не царство, не династию. Просто кирпич. И почему-то этого оказалось достаточно.",
    },
  ],
};

// ─── Validation & Push ────────────────────────────────────────────────────────

async function push(label, item) {
  console.log(`\n⏳ Pushing ${label}...`);

  // 1. Validate JSON round-trip
  const json = JSON.stringify(item);
  JSON.parse(json);
  console.log(`   ✅ JSON valid (${json.length} bytes)`);

  // 2. Validate paragraph constraints
  for (let i = 0; i < item.paragraphs.length; i++) {
    const t = item.paragraphs[i].text;
    const words = t.split(/\s+/).length;
    if (t.length > 500) {
      console.warn(`   ⚠️  Paragraph ${i + 1}: ${t.length} chars (max 500)`);
    }
    if (words > 100) {
      console.warn(`   ⚠️  Paragraph ${i + 1}: ${words} words (max 100)`);
    }
    console.log(`   📄 P${i + 1}: ${t.length} chars, ~${words} words`);
  }

  const allText = item.paragraphs.map((p) => p.text).join("");
  console.log(`   📏 Total paragraph text: ${allText.length} characters`);

  // 3. Push to DynamoDB
  await doc.send(
    new PutCommand({
      TableName: TABLE,
      Item: item,
      })
  );

  console.log(`   ✅ ${label} pushed successfully!`);
}

async function main() {
  try {
    await push("ru (Russian) — Безумие царя", ru);
    console.log("\n🎉 Done. Russian story pushed to DynamoDB.\n");
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.error(
        "\n❌ Record already exists! Remove ConditionExpression to overwrite."
      );
    } else {
      console.error("\n❌ Error:", err.message);
    }
    process.exit(1);
  }
}

main();
