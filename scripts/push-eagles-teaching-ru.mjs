// Push Russian version of "The Eagle's Teaching" → Story table
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

const item = {
  siteId: "alamut-castle",
  langStoryId: "ru#eagles-teaching",
  storyId: "eagles-teaching",
  lang: "ru",
  title: "Урок орла",
  subtitle: "Как орёл выбрал скалу, имя предсказало её судьбу, а англичанка на муле нашла её заново",
  excerpt: "Правитель охотился в горах, когда увидел, как огромный орёл камнем упал с неба и сел на скалу, торчащую на двести метров над долиной. В этот миг правитель понял, чему его учит птица.",
  icon: "🦅",
  storyCategory: "lost_found",
  era: "ок. 840 н.э. (основание крепости); 1090 н.э. (захват Хасаном); 1930 (экспедиция Старк)",
  tier: "A",
  isFree: true,
  isFeatured: false,
  hasAudio: false,
  readingTimeMinutes: 2,
  image: "",
  thumbnail: "",
  coordinates: { lat: 36.4447, lng: 50.5861 },
  disabled: false,
  source: "Ibn al-Athir, al-Kamil fi'l-Tarikh; Ata-Malik Juvayni, Tarikh-i Jahangushay (c.1260); Freya Stark, The Valleys of the Assassins and Other Persian Travels (1934); Peter Willey, Eagle's Nest: Ismaili Castles in Iran and Syria (I.B. Tauris, 2005); UNESCO World Heritage Tentative List, 'Cultural Landscape of Alamout' (2007); Hamideh Chubak, Alamut archaeological reports (2004); Encyclopaedia Iranica, 'ALAMUT'",
  characters: [
    "Вахсудан ибн Марзубан (правитель Дайлама, основавший крепость)",
    "Орёл (чей полёт указал место для крепости)",
    "Фрейя Старк (британская путешественница, заново открывшая долину в 1930 году)",
    "Хасан ибн Саббах (исполнивший пророчество, заключённое в имени)",
  ],
  moralOrLesson: "Самые важные уроки не всегда приходят от мудрецов. Иногда их преподаёт орёл, выбравший, куда сесть, имя, хранящее дату собственной судьбы, и долина, спрятанная так надёжно, что мир искал её семь столетий.",
  updatedAt: now,
  paragraphs: [
    {
      text: "Около 840 года правитель по имени Вахсудан охотился в горах к югу от Каспия — в таких диких краях Ирана, что даже арабские армии не смогли их покорить. И тут он увидел то, что изменило всё. Огромный орёл сорвался с неба и сел на острие скалы, торчавшей на двести метров над долиной. Вахсудан поглядел на эту скалу — отвесные обрывы с трёх сторон, единственный узкий подход, внизу река — и всё понял. Птица только что показала ему, где строить неприступную крепость.",
    },
    {
      text: "Он её построил. И назвал в честь урока. На местном дайламитском наречии «алух» значило «орёл», а «амухт» — «учение». Алух амухт — Урок орла. Произнеси это быстро, несколько сотен раз за несколько столетий — и получится одно слово: Аламут. Крепость простояла на своей скале два с половиной века, переходя из рук в руки местных правителей — идеальная твердыня в потаённой долине, о которой мало кто знал.",
    },
    {
      text: "А потом, в 1090 году, всё перевернулось. Беглый проповедник по имени Хасан ибн Саббах — лидер революционного исмаилитского движения внутри шиитского ислама — проник в долину и захватил замок, не пролив ни капли крови. Он превратил Аламут в штаб движения, которое будет наводить ужас на весь средневековый мир почти двести лет. Но самое поразительное в этой истории — впереди.",
    },
    {
      text: "В исламской нумерологии каждая арабская буква несёт числовое значение. Средневековые учёные подсчитали: сложи буквы старого названия «Алух амухт» — получишь 483. Год, когда Хасан захватил Аламут? 483-й по исламскому календарю. Имя, данное крепости за четверть тысячелетия до рождения Хасана, хранило точную дату события, которое сделает её легендой. Совпадение или судьба — решайте сами. Исмаилиты не сомневались. Что написано пером — не вырубишь топором. Даже если перо — орлиное.",
    },
    {
      text: "В 1256 году пришли монголы. Снесли стены, сожгли знаменитую библиотеку, перебили гарнизон. Долина — и без того отрезанная от мира горами и ущельем, которое заливает водой полгода — снова погрузилась в тишину. Почти семь столетий Аламут существовал только как легенда: декорация для диких россказней Марко Поло об одурманенных убийцах и райских садах, имя, которое европейские авторы повторяли, понятия не имея, где это место на самом деле.",
    },
    {
      text: "В 1930 году тридцатисемилетняя англичанка Фрейя Старк выехала из Багдада верхом на муле — с походной кроватью, москитной сеткой и решимостью найти Долину ассасинов. Картограф-самоучка, она уже побывала в уголках Ближнего Востока, куда боялись соваться мужчины. Пересекала перевалы в лихорадке от малярии, полагаясь на проводников, каждый из которых называл одну и ту же гору по-своему. Добравшись до скалы, обнаружила: официальные карты врут — и исправила их сама. Её книга вернула Аламут миру.",
    },
    {
      text: "Сегодня на скале над долиной сохранилось около трети крепости. Туристы поднимаются по двумстам метрам крутых ступеней и находят фрагменты стен, руины мастерских и водовод, вырубленный в скале инженерами Хасана, — он работает до сих пор, спустя почти тысячу лет. Но на вершине замечаешь не руины. Замечаешь беркутов. Они всё так же кружат над хребтами, над той самой долиной, где охотился Вахсудан двенадцать веков назад. Орёл выбрал верно. Урок живёт.",
    },
  ],
};

async function main() {
  // 1. Verify English original exists
  const en = await doc.send(
    new GetCommand({
      TableName: TABLE,
      Key: { siteId: "alamut-castle", langStoryId: "en#eagles-teaching" },
    })
  );
  if (!en.Item) {
    console.error("ERROR: English original not found!");
    process.exit(1);
  }
  console.log("✓ English original verified (siteId:", en.Item.siteId, ")");

  // 2. Check if Russian version already exists
  const existing = await doc.send(
    new GetCommand({
      TableName: TABLE,
      Key: { siteId: "alamut-castle", langStoryId: "ru#eagles-teaching" },
    })
  );
  if (existing.Item) {
    console.log("⚠ Russian version already exists — will overwrite with new version");
  }

  // 3. Validate paragraphs
  for (let i = 0; i < item.paragraphs.length; i++) {
    const p = item.paragraphs[i];
    const charCount = p.text.length;
    const wordCount = p.text.split(/\s+/).length;
    console.log(`  P${i + 1}: ${charCount} chars, ${wordCount} words`);
    if (charCount > 500) {
      console.error(`  ERROR: Paragraph ${i + 1} exceeds 500 chars (${charCount})`);
      process.exit(1);
    }
    if (wordCount > 100) {
      console.error(`  ERROR: Paragraph ${i + 1} exceeds 100 words (${wordCount})`);
      process.exit(1);
    }
  }

  const totalChars = item.paragraphs.reduce((s, p) => s + p.text.length, 0);
  console.log(`\n  Total: ${totalChars} chars across ${item.paragraphs.length} paragraphs`);

  // 4. Push to DynamoDB
  await doc.send(new PutCommand({ TableName: TABLE, Item: item }));
  console.log("\n✓ Russian story pushed successfully!");
  console.log("  siteId:      ", item.siteId);
  console.log("  langStoryId: ", item.langStoryId);
  console.log("  title:       ", item.title);
  console.log("  updatedAt:   ", item.updatedAt);

  // 5. Verify by reading back
  const verify = await doc.send(
    new GetCommand({
      TableName: TABLE,
      Key: { siteId: "alamut-castle", langStoryId: "ru#eagles-teaching" },
    })
  );
  if (verify.Item && verify.Item.title === "Урок орла") {
    console.log("\n✓ Verification passed — record reads back correctly");
    console.log("  Title:    ", verify.Item.title);
    console.log("  Lang:     ", verify.Item.lang);
    console.log("  Paragraphs:", verify.Item.paragraphs.length);
  } else {
    console.error("\n✗ Verification FAILED — record not found or title mismatch");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Push failed:", err);
  process.exit(1);
});
