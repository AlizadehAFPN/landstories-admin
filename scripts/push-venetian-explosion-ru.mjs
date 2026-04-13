import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const item = {
  // Keys
  siteId: "acropolis-athens",
  langStoryId: "ru#venetian-explosion",

  // Identity
  storyId: "venetian-explosion",
  lang: "ru",

  // Classification (unchanged from English)
  storyCategory: "lost_found",
  tier: "A",
  icon: "\u{1F622}",
  image: "",
  thumbnail: "",
  isFree: true,
  disabled: false,
  hasAudio: false,
  readingTimeMinutes: 2,

  // Geo & metadata (unchanged)
  coordinates: { lat: 37.9715, lng: 23.7267 },
  era: "September 26, 1687",
  source:
    "Contemporary accounts by Venetian officers, Cristoforo Ivanovich\u2019s Historia della Lega Santa, modern archaeological analysis",
  characters: [
    "Francesco Morosini",
    "Count K\u00f6nigsmark",
    "Ottoman defenders",
    "The 300 victims",
  ],

  // === RUSSIAN TEXT ===

  title: "Порох в Парфеноне",

  subtitle: "Вечер, который перечеркнул двадцать веков",

  excerpt:
    "Парфенон простоял больше двух тысяч лет. Землетрясения \u2014 выстоял. Пожары \u2014 выстоял. Армии полдюжины империй \u2014 выстоял.",

  moralOrLesson:
    "Война уничтожает то, что не может уничтожить время. Парфенон простоял больше двух тысяч лет \u2014 и был разнесён за один вечер. То, что досталось нам в наследство, бесценно. И куда более хрупко, чем кажется.",

  paragraphs: [
    {
      text: "Парфенон простоял больше двух тысяч лет. Землетрясения \u2014 выстоял. Пожары \u2014 выстоял. Армии полдюжины империй \u2014 выстоял. Его превращали из греческого храма в христианскую церковь, из церкви \u2014 в мечеть. Обдирали, перестраивали, лишали статуй и красок \u2014 а он стоял. Каркас уцелел. А потом, вечером 26 сентября 1687 года, одна-единственная бомба поставила на всём этом крест.",
    },
    {
      text: "А дело было так. Венеция и Османская империя схлестнулись за восточное Средиземноморье \u2014 острова, порты, торговые пути. Две сверхдержавы, ни одна не собиралась уступать. Венецианский флот под командованием генерала Франческо Морозини подошёл к Греции и взял Афины в осаду. Османский гарнизон, безнадёжно уступавший числом, отступил на Акрополь \u2014 древнюю крепость на скалистом холме, самую неприступную точку города.",
    },
    {
      text: "И тут османский командир принял решение, от которого историки до сих пор хватаются за голову. Весь запас пороха \u2014 бочку за бочкой \u2014 он перенёс внутрь Парфенона. Логика была не лишена смысла: веками здание уважали как христианскую святыню, и ни одна армия его не трогала. Ставка была на то, что венецианцы, сами христиане, не решатся стрелять по бывшей церкви. Говорят, Бог троицу любит \u2014 храм, церковь, мечеть. Но когда Парфенон стал четвёртым \u2014 пороховым складом \u2014 любовь кончилась.",
    },
    {
      text: "Шведский офицер на венецианской службе, граф фон Кёнигсмарк, навёл пушки прямо на вершину холма. Три дня, начиная с 23 сентября, ядра крушили древние стены и храмы Акрополя. А вечером 26 сентября, около семи часов, один снаряд перелетел через укрепления, пробил крышу Парфенона \u2014 и угодил прямо в порох.",
    },
    {
      text: "Взрыв убил триста человек на месте \u2014 солдат, женщин, детей, прятавшихся внутри. Середину здания разнесло. Восемь колонн с южной стороны \u2014 нет их. Шесть с северной \u2014 нет. Весь внутренний зал \u2014 в руинах. Скульптуры, которые создавали ещё при Перикле \u2014 V век до нашей эры, золотой век Афин \u2014 раскидало на сотни метров. Многотонные мраморные блоки разлетелись по холму, словно кости, брошенные великаном.",
    },
    {
      text: "А дальше начался фарс. Морозини вошёл в руины и решил забрать трофей \u2014 массивных каменных коней, украшавших крышу. Рабочие обвязали их канатами и начали спускать. Канаты лопнули. Кони рухнули и разбились вдребезги. Венецианцы продержались в Афинах меньше года, а потом бросили город. Итог великого похода: руина, которую сами создали, и трофей, который не сумели даже украсть.",
    },
    {
      text: "Когда вы увидите фотографию Парфенона \u2014 знаменитый силуэт, ряд колонн, провалы на месте крыши \u2014 знайте: вы смотрите на шрам одного вечера. Каждый пустой постамент, каждая обломанная колонна, каждый кусок стены, обрывающийся в пустоту \u2014 это 26 сентября 1687 года. Война за один вечер разрушила то, что пережило двадцать веков.",
    },
  ],

  updatedAt: Math.floor(Date.now() / 1000),
};

// === PRE-PUSH VALIDATION ===
console.log("=== PRE-PUSH VALIDATION ===");
console.log("siteId:", item.siteId);
console.log("langStoryId:", item.langStoryId);
console.log("lang:", item.lang);
console.log("title:", item.title);
console.log("subtitle:", item.subtitle);
console.log("");

let totalChars = 0;
let totalWords = 0;
item.paragraphs.forEach((p, i) => {
  const chars = p.text.length;
  const words = p.text.split(/\s+/).length;
  totalChars += chars;
  totalWords += words;
  const status = chars > 500 ? " OVER LIMIT" : " OK";
  console.log(`  P${i + 1}: ${chars} chars, ${words} words${status}`);
  if (chars > 500) console.warn(`  \u26a0 P${i + 1} exceeds 500 char limit!`);
  if (words > 100) console.warn(`  \u26a0 P${i + 1} exceeds 100 word limit!`);
});
console.log(
  `\n  TOTAL: ${totalChars} chars, ${totalWords} words across ${item.paragraphs.length} paragraphs`
);
console.log("excerpt:", item.excerpt.length, "chars");
console.log("moralOrLesson:", item.moralOrLesson.length, "chars");
console.log("updatedAt:", item.updatedAt);
console.log("");

// Validate JSON serialization (catches encoding issues)
try {
  const json = JSON.stringify(item);
  JSON.parse(json);
  console.log("JSON validation: PASSED (" + json.length + " bytes)\n");
} catch (e) {
  console.error("JSON validation FAILED:", e.message);
  process.exit(1);
}

// === PUSH TO DYNAMODB ===
console.log("=== PUSHING TO DYNAMODB ===");
try {
  const result = await doc.send(
    new PutCommand({
      TableName: "Story",
      Item: item,
    })
  );
  console.log("SUCCESS! Russian story pushed.");
  console.log("HTTP status:", result.$metadata.httpStatusCode);
} catch (err) {
  console.error("PUSH FAILED:", err.message);
  console.error(err);
  process.exit(1);
}

// === VERIFY BY READING BACK ===
console.log("\n=== VERIFICATION READ ===");
try {
  const verify = await doc.send(
    new GetCommand({
      TableName: "Story",
      Key: { siteId: "acropolis-athens", langStoryId: "ru#venetian-explosion" },
    })
  );
  if (verify.Item) {
    console.log("VERIFIED! Record exists in DynamoDB.");
    console.log("  title:", verify.Item.title);
    console.log("  lang:", verify.Item.lang);
    console.log("  langStoryId:", verify.Item.langStoryId);
    console.log("  paragraphs:", verify.Item.paragraphs.length);
    console.log("  updatedAt:", verify.Item.updatedAt);
    console.log("\n--- FULL STORY ---");
    verify.Item.paragraphs.forEach((p, i) => {
      console.log(`\n[P${i + 1}]`);
      console.log(p.text);
    });
  } else {
    console.error("VERIFICATION FAILED: Record not found after push!");
    process.exit(1);
  }
} catch (err) {
  console.error("VERIFICATION READ FAILED:", err.message);
  process.exit(1);
}
