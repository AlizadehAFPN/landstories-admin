import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const item = {
  siteId: "sigiriya",
  langStoryId: "ru#lion-gate-sky-fortress",
  lang: "ru",
  storyId: "lion-gate-sky-fortress",

  title: "В пасти льва",
  subtitle:
    "Царь-отцеубийца возвёл на скале исполинского льва — и заставил каждого гостя пройти через его пасть, чтобы подняться в небесный дворец",
  excerpt:
    "Чтобы попасть к царю, который правил с вершины скалы, нужно было войти в разинутую пасть льва — настолько огромного, что его кирпичное тело возвышалось на двадцать метров над утёсом — и подняться по лестнице через его глотку.",
  moralOrLesson:
    "Строители Сигирии понимали то, что современные архитекторы давно забыли: здание — это не просто конструкция, а переживание, история, рассказанная камнем, пространством, страхом и восторгом. Львиные врата были не дверью. Они были превращением: ты входил как смертный, поднимался сквозь тело зверя и выходил в царство бога.",

  paragraphs: [
    {
      text: "Представьте. Шри-Ланка, пятый век. Вы карабкаетесь по гранитной скале, которая на двести метров торчит из джунглей, как кулак из земли. На полпути лестница обрывается — и дальше только один путь: в разинутую пасть льва. Огромного. Тридцать пять метров кирпича, штукатурки и чистой наглости короля по имени Кашьяпа. Этот лев не был украшением. Он был входной дверью.",
    },
    {
      text: "У Кашьяпы руки были в крови. Около 477 года он захватил трон, убив собственного отца — короля Дхатусену. Сводный брат Моггаллана, законный наследник, сбежал в южную Индию и начал собирать армию. Кашьяпа понимал: месть придёт. И он бросил старую столицу, увёл весь двор на вершину отвесной скалы Сигирия — посреди непроходимых джунглей. Когда верность купить нельзя, строишь крепость, на которую не залезет ни одна армия.",
    },
    {
      text: "Но лев — это не просто военная инженерия. Это политический манифест из кирпича. Сингальский народ ведёт свой род от настоящего льва. По легенде, принц Виджая — первый поселенец острова — был внуком льва. Само слово «сингала» означает «люди льва». И когда Кашьяпа водрузил на скалу колоссального льва, послание было яснее любого указа: я — истинный наследник львиной крови. Мой трон законен.",
    },
    {
      text: "Масштаб сносил крышу. Судя по уцелевшим лапам и отметинам на скале, лев вымахивал на тридцать пять метров в высоту и двадцать один в ширину — кирпич и штукатурка на каркасе из дерева и железа, вбитого прямо в гранит. Между лап — каждая в несколько метров, с вылепленными когтями — шла лестница прямо в разинутую пасть. Ты входил через челюсти, поднимался через горло и выходил на вершину. Мимо льва пройти было нельзя. Только сквозь.",
    },
    {
      text: "Волков бояться — в лес не ходить. А львов бояться — к царю не попадёшь. Каждый посол, каждый генерал, каждый проситель — все должны были войти в пасть хищника. На уровне инстинкта это будило что-то первобытное: страх быть проглоченным. Символически — тебя пожирали и рождали заново: обычный человек входил снизу, а наверх выходил уже преображённым, в небесный дворец. А в политическом смысле всё ещё проще: ты — добыча. Царь — хищник.",
    },
    {
      text: "Лев был лишь витриной. Вся скала — боевая машина, переодетая в рай. Ров — по слухам, с крокодилами — окружал водные сады, где изящные бассейны работали как водохранилища, а открытые газоны превращались в зоны поражения. Единственный путь наверх — тропа, вырубленная в скале, шириной на двоих. Цистерны с водой, высеченные в камне, позволяли пережить любую осаду. Каждая деталь служила двум хозяевам: красоте и выживанию.",
    },
    {
      text: "В 1898 году британский археолог Белл раскопал вековые завалы на львиной террасе — и обнаружил две огромные лапы. Кирпич на резном камне, проработанный до мельчайших деталей — видны даже втянутые когти. Над ними скала хранила следы: крепёжные отверстия, выцветшую штукатурку, призрак чего-то невозможно большого. Тело исчезло — дерево сгнило, штукатурка осыпалась, кладку за полторы тысячи лет разбили тропические ливни.",
    },
    {
      text: "Сегодня к вершине ведёт металлическая лестница, привинченная к скале там, где когда-то высилось тело льва. Туристы хватаются за перила, ветер бьёт в лицо, внизу — джунгли до горизонта. Но лапы на месте. Две массивные, терпеливые, кошачьи лапы лежат на террасе так спокойно, будто лев просто прилёг вздремнуть, а остальное тело спрятано внутри скалы. Полторы тысячи лет спустя на вершину по-прежнему нельзя попасть, не пройдя между ними. Кашьяпа построил дверь, которая пережила его царство.",
    },
  ],

  // Preserved fields from English record
  characters: [
    "King Kashyapa I (the builder)",
    "Prince Vijaya (legendary founder of the Sinhalese people, born from a lion)",
    "H.C.P. Bell (British archaeologist who excavated the lion paws in 1898)",
    "The unnamed engineers and laborers who built the fortress",
  ],
  coordinates: { lat: 7.957, lng: 80.7603 },
  disabled: false,
  era: "477-495 CE (construction); 1898 (Bell's excavation)",
  hasAudio: false,
  icon: "🦁",
  image: "",
  isFree: true,
  readingTimeMinutes: 3,
  source:
    "Bell, H.C.P. Report on the Sigiriya Excavations, Archaeological Survey of Ceylon Annual Reports 1896-1904; Bandaranayake, Senake. Sigiriya: City, Palace and Royal Gardens, 2005; Mahavamsa, chapter 6 (Vijaya legend); Culavamsa, chapters 38-39; UNESCO World Heritage Nomination File 202; Paranavitana, Senarath. History of Ceylon, vol. 1, 1959",
  storyCategory: "builders_wonders",
  thumbnail: "",
  tier: "A",
  updatedAt: Math.floor(Date.now() / 1000),
};

// Validate constraints
console.log("=== VALIDATION ===\n");
let totalChars = 0;
let allPass = true;
for (let i = 0; i < item.paragraphs.length; i++) {
  const p = item.paragraphs[i];
  const chars = p.text.length;
  const words = p.text.split(/\s+/).length;
  totalChars += chars;
  console.log(`P${i + 1}: ${chars} chars, ${words} words`);
  if (chars > 500) {
    console.warn(`  ⚠️  P${i + 1} exceeds 500 char limit!`);
    allPass = false;
  }
  if (words > 100) {
    console.warn(`  ⚠️  P${i + 1} exceeds 100 word limit!`);
    allPass = false;
  }
}
console.log(`\nTotal: ${totalChars} chars, ${item.paragraphs.length} paragraphs`);
const charPass = totalChars >= 2400 && totalChars <= 3600;
console.log(
  `Target: ~3000 chars (±20% = 2400-3600). ${charPass ? "✅ PASS" : "❌ FAIL"}`
);
if (!charPass) allPass = false;

const paraPass = item.paragraphs.length >= 6 && item.paragraphs.length <= 10;
console.log(
  `Paragraphs: ${item.paragraphs.length} (target 6-10). ${paraPass ? "✅ PASS" : "❌ FAIL"}`
);
if (!paraPass) allPass = false;

if (!allPass) {
  console.error("\n❌ Validation failed. Aborting.");
  process.exit(1);
}

// Push to DynamoDB
console.log("\n=== PUSHING TO DYNAMODB ===\n");
const command = new PutCommand({
  TableName: "Story",
  Item: item,
  ConditionExpression: "attribute_not_exists(siteId)",
});

try {
  await docClient.send(command);
  console.log("✅ Russian story pushed successfully!");
  console.log(`   siteId: ${item.siteId}`);
  console.log(`   langStoryId: ${item.langStoryId}`);
  console.log(`   title: ${item.title}`);
  console.log(`   paragraphs: ${item.paragraphs.length}`);
  console.log(`   updatedAt: ${new Date(item.updatedAt * 1000).toISOString()}`);
} catch (err) {
  if (err.name === "ConditionalCheckFailedException") {
    console.error("❌ Record already exists! Use UpdateCommand to modify.");
  } else {
    console.error("❌ Push failed:", err);
  }
  process.exit(1);
}
