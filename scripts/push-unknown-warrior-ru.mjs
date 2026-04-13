import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const NOW = Math.floor(Date.now() / 1000);

// ─── SHARED FIELDS (unchanged from English) ──────────────────────────────────

const shared = {
  siteId: "westminster-abbey",
  storyId: "the-unknown-warrior",
  icon: "\u{1F396}\uFE0F",
  tier: "A",
  image: "",
  thumbnail: "",
  coordinates: { lat: 51.4993, lng: -0.1273 },
  hasAudio: false,
  isFree: true,
  disabled: false,
  storyCategory: "crowns_conquests",
  readingTimeMinutes: 4,
  source:
    "Westminster Abbey archives, Reverend David Railton\u2019s papers, Michael Gavaghan\u2019s \u201CThe Story of the Unknown Warrior\u201D (1995), Imperial War Museum records, Hansard parliamentary debates (1920)",
  characters: [
    "The Unknown Warrior \u2014 An unidentified British soldier of the Great War",
    "Reverend David Railton \u2014 Army chaplain who conceived the idea after seeing an unmarked grave in Armenti\u00E8res",
    "Brigadier General L.J. Wyatt \u2014 The officer who chose the body from six candidates at midnight",
    "King George V \u2014 Who walked behind the coffin and scattered French soil into the grave",
    "Herbert Ryle \u2014 Dean of Westminster, who championed the proposal and composed the inscription",
    "David Lloyd George \u2014 Prime Minister who gave final approval for the burial",
  ],
  era: "1920 AD \u2014 Aftermath of the Great War",
};

// ─── RUSSIAN (ru) ─────────────────────────────────────────────────────────────

const ru = {
  ...shared,
  lang: "ru",
  langStoryId: "ru#the-unknown-warrior",
  updatedAt: NOW,

  title: "Солдат без имени",

  subtitle:
    "Самая почитаемая могила Британии принадлежит тому, чьё имя не узнает никто и никогда",

  excerpt:
    "На крышку гроба положили меч крестоносца из Тауэра. Оружие из эпохи рыцарей \u2014 на груди солдата из эпохи пулемётов. А потом гроб запечатали навсегда.",

  moralOrLesson:
    "Величие не нуждается в имени. Иногда один безымянный человек значит больше, чем тысяча имён на граните.",

  paragraphs: [
    {
      text: "Франция, 1916 год. Британский военный капеллан Дэвид Рейлтон идёт через наспех устроенное кладбище за линией фронта у Арментьера. Первая мировая идёт второй год. Мёртвых больше, чем живые успевают хоронить. Один крест останавливает его как вкопанного. Надпись: \u00ABНеизвестный британский солдат\u00BB. Без имени. Без звания. Без родного города. Просто человек, который отдал всё \u2014 и растворился в грязи. Эта картина врезалась Рейлтону в память намертво. Через несколько лет она изменит то, как целая страна чтит своих погибших.",
    },
    {
      text: "Когда в 1918 году война наконец закончилась, цифры были чудовищные. Почти миллион британских солдат погибли. Ещё сотни тысяч просто исчезли \u2014 разорваны снарядами, поглощены грязью окопов, пропали без следа. Тысячи семей остались без тела, без могилы, без возможности попрощаться. И тогда Рейлтон написал настоятелю Вестминстерского аббатства письмо с дерзкой идеей: привезти одного неопознанного солдата домой и похоронить его с высшими почестями, какие может дать страна. Среди королей.",
    },
    {
      text: "В ночь на 7 ноября 1920 года шесть безымянных тел тихо подняли из земли на полях сражений во Франции и Бельгии. Каждое уложили в одинаковый мешок и доставили в часовню в городке Сен-Поль. В полночь генерал Уайатт вошёл туда один. Молча указал на одного. Говорят, Бог троицу любит \u2014 но в ту ночь Ему хватило одного. Остальных пятерых с почестями вернули в землю. С той минуты никто на свете не мог знать, кого именно он выбрал. В том и был весь замысел.",
    },
    {
      text: "Гроб сделали из дуба Хэмптон-Корта \u2014 королевского дворца. Дерево королей для человека без имени. На крышку положили меч крестоносца из лондонского Тауэра. Оружие из эпохи рыцарей \u2014 на груди солдата из эпохи пулемётов. На железном щите выгравировали: \u00ABБританский воин, павший в Великой войне 1914\u20131918, за Короля и Отечество\u00BB. Потом гроб запечатали. Навсегда. Его имя, возраст, бой, в котором он погиб \u2014 всё осталось по ту сторону крышки.",
    },
    {
      text: "11 ноября 1920 года \u2014 ровно через два года после того, как смолкли пушки \u2014 гроб повезли через Лондон на артиллерийском лафете, запряжённом шестью вороными. Король Георг V шёл за ним пешком. Сотни тысяч людей стояли вдоль улиц в молчании. Многие плакали. Кто-то сжимал в руках фотографии собственных сыновей, не вернувшихся с войны. У Вестминстерского аббатства кавалеры Креста Виктории \u2014 высшей военной награды Британии за храбрость \u2014 внесли гроб через Западные врата.",
    },
    {
      text: "Король бросил горсть французской земли в открытую могилу. Её засыпали землёй из ста мешков, собранной на полях сражений Франции и Бельгии \u2014 чтобы Неизвестный Воин покоился в той самой земле, защищая которую он погиб. Сверху легла плита чёрного бельгийского мрамора с надписью, которую с тех пор знает каждый британец: \u00ABЕго погребли среди королей, ибо он делал добро пред Богом и пред домом Его\u00BB.",
    },
    {
      text: "Эта могила стала самым священным местом Британии. Единственная в аббатстве, на которую никому нельзя наступать \u2014 ни туристам, ни священникам, ни даже королю. В 1923 году леди Элизабет Боуз-Лайон, выходя замуж за будущего Георга VI, положила свой свадебный букет на эту плиту \u2014 в память о брате, погибшем в окопах. С тех пор каждая королевская невеста делает то же самое. Соединённые Штаты вручили ему свою высшую награду \u2014 Медаль Почёта. Человек без имени стал одним из самых награждённых солдат в истории.",
    },
    {
      text: "В Вестминстерском аббатстве покоятся короли и королевы, учёные и поэты \u2014 столетия британского величия под одной крышей. Но самое почётное место принадлежит тому, чьё имя не узнает никто и никогда. Может, он был рабочим. Может, сельским учителем. Может, сыном фермера. Именно в этом и смысл. Его чтят не за то, кем он был. А за всех, за кого он здесь лежит \u2014 за каждую оборванную жизнь, за каждое имя, поглощённое грязью, за каждую семью, которая так и не смогла попрощаться.",
    },
  ],
};

// ─── PUSH ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`Timestamp: ${NOW}`);

  // Check if already exists
  const existing = await docClient.send(
    new GetCommand({
      TableName: TABLE,
      Key: { siteId: "westminster-abbey", langStoryId: "ru#the-unknown-warrior" },
    })
  );

  if (existing.Item) {
    console.error(
      "\u26A0\uFE0F  RU version already exists \u2014 aborting to avoid overwrite"
    );
    process.exit(1);
  }

  await docClient.send(
    new PutCommand({
      TableName: TABLE,
      Item: ru,
    })
  );

  console.log("\u2705 RU (Russian) pushed successfully");

  // Verify
  const verify = await docClient.send(
    new GetCommand({
      TableName: TABLE,
      Key: { siteId: "westminster-abbey", langStoryId: "ru#the-unknown-warrior" },
    })
  );

  if (verify.Item) {
    console.log("\u2705 Verified: record exists in DynamoDB");
    console.log(`   title: ${verify.Item.title}`);
    console.log(`   lang: ${verify.Item.lang}`);
    console.log(`   paragraphs: ${verify.Item.paragraphs.length}`);
  } else {
    console.error("\u274C Verification FAILED \u2014 record not found after push");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("\u274C Fatal error:", err.message);
  process.exit(1);
});
