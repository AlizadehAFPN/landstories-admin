import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const item = {
  // Keys
  siteId: "acropolis-athens",
  langStoryId: "ru#elgin-marbles",

  // Identity
  storyId: "elgin-marbles",
  lang: "ru",

  // Classification (unchanged)
  storyCategory: "lost_found",
  tier: "A",
  icon: "\u{1F3FA}",
  image: "",
  thumbnail: "",
  isFree: true,
  disabled: false,
  hasAudio: false,
  readingTimeMinutes: 2,

  // Geo & metadata (unchanged)
  coordinates: { lat: 37.9715, lng: 23.7267 },
  era: "1801-1812 (removal), debate ongoing",
  source:
    "House of Commons Select Committee Report (1816), modern scholarly analysis, British Museum and Greek government statements",
  characters: [
    "Thomas Bruce, 7th Earl of Elgin",
    "Giovanni Battista Lusieri (Elgin's agent)",
    "Ottoman authorities",
    "Greek witnesses",
  ],

  // === RUSSIAN TEXT ===

  title: "Мрамор раздора",

  subtitle: "Скульптуры, которые уехали и, может быть, вернутся",

  excerpt:
    "Представьте: 1801 год, Грецией правят не греки. Шотландский аристократ приезжает с разрешением зарисовать скульптуры Парфенона. То, что он сделает дальше, превратится в спор, который не утих до сих пор.",

  moralOrLesson:
    "Кому принадлежит прошлое? Спор о скульптурах Парфенона ставит вопрос ребром: культурные сокровища \u2014 достояние народа, который их создал, или того, у кого хватило силы их забрать?",

  paragraphs: [
    {
      text: "Представьте: на дворе 1801 год, и Грецией правят не греки. Уже больше трёхсот пятидесяти лет страна принадлежит Османской империи \u2014 государству, из которого потом вырастет современная Турция. И вот в Афины приезжает шотландский аристократ Томас Брюс, граф Элгин \u2014 свежеиспечённый посол Британии при османском дворе. В кармане \u2014 разрешение зарисовывать и делать гипсовые слепки со скульптур Парфенона. Но то, что он сделает дальше, превратится в спор, который не утих до сих пор.",
    },
    {
      text: "Элгин не стал ограничиваться набросками. Он привёз бригады рабочих, которые пилили мрамор, поддевали статуи ломами и отправляли всё на кораблях в Англию. Масштаб поражает: 75 метров резного фриза, 15 панелей с батальными сценами, 17 статуй выше человеческого роста \u2014 прямо с фронтонов храма. Прихватили даже кариатиду \u2014 одну из знаменитых колонн в облике девушки \u2014 из соседнего здания на Акрополе.",
    },
    {
      text: "Греки под османским сапогом не могли этому помешать, но молчать не стали. Рабочие ломали древние швы, куски мрамора падали и бились при демонтаже. Один очевидец оставил фразу, которая режет до сих пор: \u00ABТурки не плакали, а мы плакали\u00BB. А в самой Британии поэт лорд Байрон пришёл в ярость \u2014 назвал Элгина грабителем и написал целую поэму, проклиная его за то, что тот лишил Афины души.",
    },
    {
      text: "Элгин переправил всё в Лондон и выставил скульптуры у себя дома. Но эта затея его чуть не разорила, и в 1816 году он продал коллекцию британскому правительству. Парламент спорил, нравственно ли это, \u2014 и всё равно проголосовал \u00ABза\u00BB. С тех пор скульптуры стоят в Британском музее, каждый год на них приходят смотреть миллионы. А Греция требует их назад почти с самого дня своей независимости \u2014 с 1832 года.",
    },
    {
      text: "Позиция Британского музея проста: мы их спасли. Не забери Элгин скульптуры \u2014 их уничтожили бы войны, смог или обычное безразличие. Зато в Лондоне их видит бесплатно весь мир. Греция отвечает жёстко: вы забрали их, пока чужая империя хозяйничала на нашей земле. Ни одно греческое правительство на это согласия не давало. Им место на Парфеноне \u2014 храме, для которого их создали две с половиной тысячи лет назад. Правы обе стороны. Уступать никто не собирается.",
    },
    {
      text: "В 2009 году Греция сделала свой самый мощный ход \u2014 не в суде, а в архитектуре. У подножия Парфенона открылся новый Музей Акрополя \u2014 потрясающее здание из стекла и света. Внутри \u2014 зал, выстроенный точно по размерам древнего храма. Скульптуры, оставшиеся у Греции, стоят на своих местах. А там, где должны быть лондонские фрагменты, \u2014 пустота. Ни табличек, ни пояснений не нужно. Пустые места говорят сами за себя.",
    },
    {
      text: "Бог троицу любит, говорят у нас. У этого мрамора и правда три жизни: на фронтоне Парфенона, в руках шотландского лорда и за стеклом музея в Лондоне. Вот только четвёртой \u2014 возвращения домой \u2014 всё никак не случится. Даже имя \u2014 поле боя. Скажешь \u00ABмраморы Элгина\u00BB \u2014 и ты уже признал хозяина. Скажешь \u00ABскульптуры Парфенона\u00BB \u2014 и вернул их Афинам.",
    },
    {
      text: "Этим камням две с половиной тысячи лет. Когда-то на них высекали богов и героев. Теперь они рассказывают совсем другую историю \u2014 об империи, о собственности и о вопросе, на который так никто и не ответил: если ты забрал красоту у покорённого народа, можешь ли ты когда-нибудь назвать её своей?",
    },
  ],

  updatedAt: Math.floor(Date.now() / 1000),
};

// Validate before push
console.log("=== PRE-PUSH VALIDATION ===");
console.log("siteId:", item.siteId);
console.log("langStoryId:", item.langStoryId);
console.log("lang:", item.lang);
console.log("title:", item.title);
console.log("subtitle:", item.subtitle);
console.log("paragraphs:", item.paragraphs.length);

let totalChars = 0;
let totalWords = 0;
item.paragraphs.forEach((p, i) => {
  const chars = p.text.length;
  const words = p.text.split(/\s+/).length;
  totalChars += chars;
  totalWords += words;
  console.log(`  P${i + 1}: ${chars} chars, ${words} words`);
  if (chars > 500) console.warn(`  ⚠ P${i + 1} exceeds 500 char limit!`);
  if (words > 100) console.warn(`  ⚠ P${i + 1} exceeds 100 word limit!`);
});
console.log(`  TOTAL: ${totalChars} chars, ${totalWords} words across ${item.paragraphs.length} paragraphs`);
console.log("excerpt:", item.excerpt.length, "chars");
console.log("moralOrLesson:", item.moralOrLesson.length, "chars");
console.log("updatedAt:", item.updatedAt);
console.log("");

// Validate JSON serialization
try {
  const json = JSON.stringify(item);
  JSON.parse(json);
  console.log("JSON validation: PASSED (" + json.length + " bytes)");
} catch (e) {
  console.error("JSON validation FAILED:", e.message);
  process.exit(1);
}

// Push to DynamoDB
console.log("\n=== PUSHING TO DYNAMODB ===");
try {
  const result = await doc.send(new PutCommand({
    TableName: "Story",
    Item: item,
  }));
  console.log("SUCCESS! Russian story pushed.");
  console.log("HTTP status:", result.$metadata.httpStatusCode);
} catch (err) {
  console.error("PUSH FAILED:", err.message);
  console.error(err);
  process.exit(1);
}

// Verify by reading back
console.log("\n=== VERIFICATION READ ===");
import { GetCommand } from "@aws-sdk/lib-dynamodb";
try {
  const verify = await doc.send(new GetCommand({
    TableName: "Story",
    Key: { siteId: "acropolis-athens", langStoryId: "ru#elgin-marbles" },
  }));
  if (verify.Item) {
    console.log("VERIFIED! Record exists in DynamoDB.");
    console.log("  title:", verify.Item.title);
    console.log("  lang:", verify.Item.lang);
    console.log("  langStoryId:", verify.Item.langStoryId);
    console.log("  paragraphs:", verify.Item.paragraphs.length);
    console.log("  updatedAt:", verify.Item.updatedAt);
  } else {
    console.error("VERIFICATION FAILED: Record not found after push!");
    process.exit(1);
  }
} catch (err) {
  console.error("VERIFICATION READ FAILED:", err.message);
  process.exit(1);
}
