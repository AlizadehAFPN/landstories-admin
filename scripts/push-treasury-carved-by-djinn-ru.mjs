// Push Russian recreation of "The Treasury Carved by Djinn"
// to the Story DynamoDB table.
//
// Russian proverb subverted: «Бог троицу любит» (God loves the trinity / things come in threes)
//   → Subverted: «Говорят, Бог троицу любит — но джиннам хватило одной ночи.»
//   (They say God loves things in threes — but the djinn needed just one night.)
//
// Register: Modern Russian oral storytelling — popular nonfiction / quality podcast.
// Think Parfyonov's style meets Akunin's accessibility. Conversational, vivid, punchy.

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

const ru = {
  siteId: "petra",
  storyId: "treasury-carved-by-djinn",
  lang: "ru",
  langStoryId: "ru#treasury-carved-by-djinn",

  icon: "\u{1F3DB}\uFE0F",
  storyCategory: "gods_monsters",
  tier: "S",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 7,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 30.3216, lng: 35.4513 },
  source:
    "Burckhardt, Johann Ludwig. Travels in Syria and the Holy Land, 1822; Farajat, Suleiman. Excavations at al-Khazneh (2003); Diodorus Siculus, Bibliotheca Historica XIX.94-95; McKenzie, Judith. The Architecture of Petra, 1990; Joukowsky, Martha Sharp. Petra Great Temple, Brown University Excavations; Madain Project, al-Khazneh Burial Crypt documentation",
  updatedAt: now,

  title: "Сокровищница джиннов",

  subtitle:
    "Бедуинская легенда о духах огня, которые за одну ночь высекли в скале невозможный дворец",

  excerpt:
    "Бедуины никогда не называли это гробницей. Они называли это Хазнат аль-Фираун — Сокровищница Фараона — и говорили, что ни одна человеческая рука к ней не прикасалась.",

  moralOrLesson:
    "Самые поразительные творения человеческого гения со временем приписывают богам и духам — потому что мы не в силах поверить, что давно забытые смертные когда-то умели то, чего мы повторить уже не можем.",

  characters: [
    "Фараон (легендарный)",
    "Джинны (сверхъестественные строители)",
    "Царь Арета IV Филопатор",
    "Иоганн Людвиг Буркхардт (шейх Ибрагим)",
    "Царь Соломон (Сулейман, повелитель джиннов)",
  ],

  era: "ок. I в. до н. э. — I в. н. э. (строительство); 1812 (открытие Буркхардтом)",

  paragraphs: [
    {
      text: "Бедуины никогда не называли это гробницей. У них было другое имя — Хазнат аль-Фираун, Сокровищница Фараона. И они клялись: ни одна человеческая рука к ней не прикасалась. Легенда была такая. Фараон не утонул, когда гнался за Моисеем через Красное море. Он выжил, пошёл за ним на юг, в горы, волоча за собой обозы с награбленным золотом. Когда ущелье стало слишком узким для колесниц, он сделал то, что делает любой царь-колдун. Он призвал джиннов.",
    },
    {
      text: "Джинны в исламской традиции — существа из бездымного огня. Не ангелы, не демоны — что-то между мирами. Коран говорит, что сам царь Соломон заставил их строить храм в Иерусалиме. И вот фараон призвал ту же силу. Говорят, Бог троицу любит — но джиннам хватило одной ночи. За одну ночь они вырезали из скалы фасад высотой в сорок метров. Колонны, статуи богов, тайные комнаты — всё из цельного камня. На самом верху поставили каменную урну и запечатали в ней золото. А потом исчезли.",
    },
    {
      text: "Столетиями бедуины верили, что золото действительно там, наверху. И это были не просто разговоры у костра — они стреляли по урне. Путешественники XVIII–XIX веков находили на ней сотни следов от пуль. Поколение за поколением пытались расколоть. Вот только урна — цельный камень, вырезанный прямо из скалы. Внутри никогда ничего не было. Но следы от пуль остались до сих пор — памятник тому, как отчаянно люди хотели, чтобы легенда оказалась правдой.",
    },
    {
      text: "А настоящие строители были поразительнее любых духов. Примерно в I веке нашей эры набатейцы — арабские кочевники, ставшие богатейшими торговцами Ближнего Востока — вырезали этот фасад как царскую гробницу для своего великого правителя Ареты IV. Греческие колонны, скульптуры богов-хранителей загробного мира, орлы, уносящие души на небо. И расположили так, чтобы каждый, кто входил в Петру через узкое ущелье, увидел это первым — и сразу понял, в чьё царство он только что вошёл.",
    },
    {
      text: "Тысячу лет ни один европеец этого не видел. В 1812 году швейцарский путешественник Иоганн Людвиг Буркхардт пробрался сюда под именем шейха Ибрагима. Он три года учил арабский и Коран — ради этого момента. Его прикрытие: жертвоприношение козла на могиле пророка Аарона. Проводник вёл его через каньон глубиной в девяносто метров. Когда стены расступились, Сокровищница заполнила всё поле зрения. «Я вижу, ты неверный», — сказал проводник. Буркхардт отступил. Но он только что нашёл один из величайших потерянных городов на Земле.",
    },
    {
      text: "В 2003 году археологи раскопали землю под Сокровищницей и нашли то, что легенда всегда прятала. Не золото — могилы. На глубине шести метров обнаружились камеры с останками как минимум одиннадцати человек, керамические сосуды, благовония рядом. В 2024-м другая команда нашла ещё двенадцать скелетов поблизости — нетронутых две тысячи лет. Сокровищница никогда не была хранилищем. С самого начала это была гробница для самых важных людей царства — прямо там, где каждый входящий в город не мог её не увидеть.",
    },
    {
      text: "Легенда не хочет умирать. Стивен Спилберг превратил Сокровищницу в тайник Святого Грааля в «Индиане Джонсе». Настоящие комнаты за фасадом? Маленькие, голые, пустые — ничего общего с фильмом. Но это не важно. Есть что-то в том, как рассветный свет ложится на этот песчаник и превращает его в цвет живого огня, что заставляет остановиться даже самого закоренелого скептика. Может, джинны и правда были. Может, золото всё ещё там — глубже, чем кто-либо когда-либо копал.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// VALIDATION & PUSH
// ═══════════════════════════════════════════════════════════════════════════════

async function main() {
  // Validate
  if (!ru.title || !ru.paragraphs?.length || !ru.moralOrLesson) {
    console.error("❌ Validation failed: missing required fields");
    process.exit(1);
  }

  // Check paragraph constraints
  for (let i = 0; i < ru.paragraphs.length; i++) {
    const p = ru.paragraphs[i];
    const chars = p.text.length;
    const words = p.text.split(/\s+/).length;
    console.log(`  P${i + 1}: ${chars} chars, ~${words} words`);
    if (chars > 600) {
      console.error(`  ⚠️  P${i + 1} exceeds 600 chars (${chars})`);
    }
  }

  const totalChars = ru.paragraphs.reduce((s, p) => s + p.text.length, 0);
  console.log(`\n  Total: ${totalChars} chars across ${ru.paragraphs.length} paragraphs`);
  console.log(`  Title: "${ru.title}"`);
  console.log(`  langStoryId: ${ru.langStoryId}`);

  // Push
  console.log("\n⏳ Pushing Russian (ru) version...");
  try {
    await doc.send(new PutCommand({ TableName: TABLE, Item: ru }));
    console.log(`✅ Russian (ru) pushed successfully (langStoryId: ${ru.langStoryId})`);
  } catch (err) {
    console.error("❌ Push FAILED:", err);
    process.exit(1);
  }

  console.log("\n🎉 Done!");
}

main();
