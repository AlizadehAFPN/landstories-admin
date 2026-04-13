import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const item = {
  siteId: "palmyra",
  langStoryId: "ru#temple-of-bel",
  lang: "ru",
  storyId: "temple-of-bel",
  title: "Храм Бела — от богов до пыли",
  subtitle:
    "История величайшего храма на перекрёстке цивилизаций — освящённого при Тиберии, обращённого в церковь, ставшего мечетью и уничтоженного за секунды в 2015 году",
  excerpt:
    "Он пережил падение Рима, арабское завоевание, Крестовые походы, монголов и две мировые войны. Понадобилась идеология XXI века, чтобы решить: камни — тоже враг.",
  paragraphs: [
    {
      text: "В 32 году нашей эры — в то самое десятилетие, когда за стенами Иерусалима распяли Иисуса — жрецы в сирийском городе Пальмира достроили самый дерзкий храм своего времени. Они посвятили его Белу — Владыке Вселенной. Не Зевс, не вавилонский Мардук, хотя от каждого он взял понемногу. Справа от него стоял бог солнца, слева — бог луны. Втроём они владели небом.",
    },
    {
      text: "Снаружи — чистая Греция: высокие колонны, портик, всё по канону. Но внутри все правила летели к чёрту. Вход — не с той стороны. Потолок плоский. Окна заливали зал светом, что для древнего храма — почти ересь. А над главным алтарём в камне был высечен один из самых ранних зодиаков в истории. Весь храм — это Пальмира в камне: город между Востоком и Западом, который наотрез отказывался выбирать сторону.",
    },
    {
      text: "Сюда приходили не только молиться — сюда приходили есть. Огромный двор был уставлен залами для священных пиров. Сотни людей садились за стол — барашек, козлятина, верблюжатина. Вино по кругу, дым благовоний, жрецы ведут обряд. Богатые горожане оплачивали трапезы и высекали свои имена на стенах — чтобы знали, кто накормил людей и богов. Археологи нашли тысячи глиняных жетонов — входные билеты. Каждый когда-то сжимал в руке человек, шедший на запах жареного мяса — ужинать с богами.",
    },
    {
      text: "Бог троицу любит — и храм это доказал. Три веры сменились под его сводами, и каждая его спасла. Рим принял христианство и запретил язычество — храм стал церковью. Это его сохранило. В VII веке пришли арабы — церковь стала мечетью. И это тоже сработало. Внутри древних стен выросла целая деревня. К началу XXI века храм Бела оставался одним из лучше всего сохранившихся античных святилищ на планете. ЮНЕСКО назвала его главным памятником Пальмиры. Он пережил падение Рима, крестоносцев, монголов и две мировые войны.",
    },
    {
      text: "30 августа 2015 года — через двенадцать дней после того, как боевики ИГИЛ казнили Халеда аль-Асаада, 83-летнего археолога, полвека охранявшего этот храм — они начинили здание взрывчаткой и подорвали его. Спутниковые снимки подтвердили худшее. Внутренний храм — стёрт. Зодиак, высеченный ещё при императоре Тиберии, — пыль. Колонны, резьба, каменные лики богов — щебень. Уцелело только одно: главный дверной проём. Он стоял один среди обломков и обрамлял пустое небо.",
    },
    {
      text: "Этот проём стал одним из образов нашего века — вход, за которым ничего нет. Порог между миром, где храм Бела ещё стоял, и миром, где его не стало. Жетоны лежат в музеях. Портреты умерших пальмирцев смотрят из витрин Парижа и Лондона. А место, где всё сходилось — жрецы, купцы, благовония, Восток и Запад в каждой колонне — теперь поле щебня в сирийской пустыне. Бог троицу любит — три веры хранили этот храм две тысячи лет. А потом пришли те, кто не смог стерпеть даже камень с чужим богом.",
    },
  ],
  moralOrLesson:
    "Здание, простоявшее две тысячи лет — через завоевания, обращения и забвение — уничтожили не те, кто ненавидит красоту. Его уничтожили те, кто боится её послания: до их истин существовали другие истины, и способность человека восхищаться миром древнее и прочнее любого притязания на единственную правду.",

  // All non-text fields preserved from English original
  icon: "🏛️",
  tier: "S",
  source:
    "Seyrig, Henri; Amy, Robert; Will, Ernest. Le Temple de Bel a Palmyre, 1968/1975; Teixidor, Javier. The Pantheon of Palmyra, 1979; UNOSAT satellite imagery analysis, August-September 2015; UNESCO World Heritage Site inscription, 1980; Gawlikowski, Michał, excavation reports on the Temple of Bel; Browning, Iain. Palmyra, 1979",
  characters: [
    "Bel (supreme deity of Palmyra, cognate with Babylonian Marduk)",
    "Yarhibol (sun god of the Palmyrene triad)",
    "Aglibol (moon god of the Palmyrene triad)",
    "The Palmyrene priests and their sacred banquet associations",
    "ISIS militants (destroyers, August 2015)",
  ],
  era: "32 AD (consecration) – August 30, 2015 (destruction by ISIS); survived 1,983 years",
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  coordinates: {
    lng: 38.2684,
    lat: 34.5505,
  },
  hasAudio: false,
  isFree: true,
  storyCategory: "gods_monsters",
  disabled: false,
  updatedAt: 1773541735,
};

async function pushStory() {
  try {
    await docClient.send(
      new PutCommand({
        TableName: "Story",
        Item: item,
        ConditionExpression: "attribute_not_exists(siteId)",
      })
    );
    console.log("SUCCESS: Russian story pushed to DynamoDB");
    console.log(`  siteId: ${item.siteId}`);
    console.log(`  langStoryId: ${item.langStoryId}`);
    console.log(`  title: ${item.title}`);
    console.log(`  paragraphs: ${item.paragraphs.length}`);

    // Validate by reading it back
    const { GetCommand } = await import("@aws-sdk/lib-dynamodb");
    const result = await docClient.send(
      new GetCommand({
        TableName: "Story",
        Key: { siteId: "palmyra", langStoryId: "ru#temple-of-bel" },
      })
    );
    if (result.Item && result.Item.lang === "ru") {
      console.log("\nVERIFIED: Read-back successful. Record exists with lang=ru");
      console.log(`  Title in DB: ${result.Item.title}`);
      console.log(`  Paragraphs count: ${result.Item.paragraphs.length}`);
    } else {
      console.error("VERIFICATION FAILED: Could not read back the record");
    }
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.error("ERROR: Record already exists! Will not overwrite.");
    } else {
      console.error("ERROR:", err.message);
    }
    process.exit(1);
  }
}

pushStory();
