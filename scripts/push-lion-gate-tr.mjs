import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

// ──────────────────────────────────────────────
// Turkish recreation of "The Lion Gate"
// Proverb used: "Aslan yattığı yerden belli olur"
// (A lion is known by where it lies) — subverted in P8
// ──────────────────────────────────────────────

const paragraphs = [
  {
    text: `Gözünde canlandır. Beşinci yüzyıl, Sri Lanka. Ormanın ortasından iki yüz metre dikine fırlayan bir granit kayanın yamacını tırmanıyorsun. Yarı yolda merdivenler bitiyor — ve tek çıkış yolu, kaya yüzünde otuz beş metre yükselen devasa bir aslanın açık ağzından geçmek. Malzemesi tuğla, sıva ve Kaşyapa adlı bir kralın sınır tanımaz cesareti. O aslan süs değildi. Giriş kapısıydı.`,
  },
  {
    text: `Kaşyapa'nın ellerinde kan vardı. 477 yılında babası Kral Dhatusena'yı öldürerek Sri Lanka tahtını ele geçirdi. Üvey kardeşi Moggallana — asıl taht varisi — güney Hindistan'a kaçıp ordu toplamaya başladı. Kaşyapa intikamın geleceğini biliyordu. Eski başkenti terk etti ve sarayını ormanın derinliklerindeki Sigiriya kayasının tepesine taşıdı. Sadakat kazanamıyorsan, hiçbir ordunun tırmanamayacağı bir kale inşa edersin.`,
  },
  {
    text: `Ama o aslan sadece askeri bir başarı değildi — tuğlayla yazılmış siyasi bir manifestoydu. Sinhala halkı kökenini gerçek bir aslana dayandırır. Kuruluş efsanesine göre adanın ilk yerleşimcisi Prens Vijaya, bir aslanın torunuydu. "Sinhala" kelimesi tam olarak "aslan insanları" demek. Kaşyapa uçuruma devasa bir aslan inşa ettiğinde mesaj gayet netti: aslan soyunun gerçek varisi benim. Tahtım meşrudur.`,
  },
  {
    text: `Boyutları akıl almazdı. Kalan pençelere ve kayadaki izlere bakılırsa aslan kabaca otuz beş metre yüksekliğinde, yirmi bir metre genişliğindeydi — granit kayaya demir ve ahşap iskeletle tutturulmuş tuğla ve sıvadan bir dev. Pençelerin arasından — her biri birkaç metre, parmakları tek tek işlenmiş — bir merdiven doğruca aslanın açık ağzına giriyordu. Çenelerden içeri giriyordun, boğazından tırmanıyordun ve zirveye çıkıyordun. Aslanın yanından değil, içinden geçiyordun.`,
  },
  {
    text: `Etki tam da Kaşyapa'nın istediği gibiydi. Her elçi, her general, her ziyaretçi bir yırtıcının ağzına yürümek zorundaydı. En ilkel düzeyde, insanın en derin korkusunu tetikliyordu — canlı canlı yutulma korkusu. Simgesel düzeyde bir yeniden doğuştu: sıradan biri olarak giriyordun, gökyüzü sarayına bambaşka biri olarak çıkıyordun. Politik açıdan mesaj basitti. Sen avsın. Kral avcı.`,
  },
  {
    text: `Aslan sadece vitrin parçasıydı. Kayanın tamamı cennet kılığına girmiş bir savaş makinesiydi. Dipte, timsahlarla dolu olduğu söylenen bir hendek zarif su bahçelerini çevreliyordu — süs havuzları aynı zamanda su deposuydu, açık çimenlikler birer pusu alanıydı. Yukarı çıkan tek yol kayaya oyulmuş dar bir patikadaydı; ancak iki kişi yan yana yürüyebiliyordu. Kayaya oyulmuş su tankları kuşatmaya dayanabilirdi. Her detay iki efendiye hizmet ediyordu: güzellik ve hayatta kalma.`,
  },
  {
    text: `1898'de İngiliz arkeolog H.C.P. Bell, aslan terasındaki yüzyıllık enkazı kazarak iki devasa pençe buldu — oyma taş kaideler üzerinde tuğla pençeler, geri çekilmiş tırnakları gösterecek kadar detaylı. Üstlerinde kaya hâlâ izler taşıyordu: tutturma delikleri, solmuş sıva kalıntıları, inanılmaz büyüklükte bir şeyin hayaleti. Gövde çoktan yok olmuştu — ahşap çürümüş, sıva dökülmüş, tuğla on beş yüzyıllık tropikal fırtınalara yenilmişti.`,
  },
  {
    text: `Bugün, kayaya çakılmış metal bir merdiven seni aslanın gövdesinin durduğu yere taşıyor. Turistler rüzgârda tırabzanlara tutunuyor, aşağıdaki ormana bakıyor. Ama pençeler hâlâ orada — devasa, sabırlı; sanki aslan bir anlığına uzanmış da geri kalanı kayanın içinde gizlenmiş. Aslan yattığı yerden belli olur derler. Bin beş yüz yıl geçti, gövde çoktan yok oldu — ama pençelerin arasından geçmeden zirveye hâlâ çıkamazsın. Kaşyapa krallığından uzun yaşayan bir kapı inşa etti.`,
  },
];

// ── Validate constraints ──
let totalChars = 0;
let allPass = true;
for (let i = 0; i < paragraphs.length; i++) {
  const chars = paragraphs[i].text.length;
  const words = paragraphs[i].text.split(/\s+/).length;
  totalChars += chars;
  const charOk = chars <= 500;
  const wordOk = words <= 100;
  if (!charOk || !wordOk) allPass = false;
  console.log(
    `P${i + 1}: ${chars} chars ${charOk ? "✅" : "❌"}, ${words} words ${wordOk ? "✅" : "❌"}`
  );
}
console.log(`\nTotal: ${totalChars} chars, ${paragraphs.length} paragraphs`);
const inRange = totalChars >= 2400 && totalChars <= 3600;
console.log(
  `Target: ~3000 (±20% = 2400-3600). ${inRange ? "✅ PASS" : "❌ FAIL"}`
);
if (!allPass || !inRange) {
  console.error("\n❌ Constraint violation — aborting push.");
  process.exit(1);
}

// ── Build the full record (copy non-translatable fields from English) ──
const now = Math.floor(Date.now() / 1000);

const record = {
  // Keys
  siteId: "sigiriya",
  langStoryId: "tr#lion-gate-sky-fortress",
  lang: "tr",
  storyId: "lion-gate-sky-fortress",

  // Translated fields
  title: "Aslan Kapısı",
  subtitle:
    "Baba katili bir kral, uçurumun yüzüne devasa bir aslan inşa etti — ve gökyüzündeki sarayına ulaşmak isteyen herkesi aslanın çenelerinden geçmeye zorladı",
  excerpt:
    "Gökyüzünden hükmeden krala ulaşmak için önce devasa bir aslanın açık ağzına girmen gerekiyordu — tuğla ve sıvadan gövdesi kaya yüzünde yirmi metre yükselirken sen boğazından geçen bir merdiveni tırmanıyordun.",
  paragraphs,
  moralOrLesson:
    "Sigiriya'nın mimarları modern mimarların çoktan unuttuğu bir şeyi biliyordu — bir bina sadece yapı değil, bir deneyimdir; taştan, mekândan, korkudan ve hayretten anlatılan bir hikâyedir. Aslan Kapısı bir kapı değildi. Bir dönüşümdü: bir ölümlü olarak giriyordun, bir canavarın bedeninden tırmanıyordun ve bir tanrının diyarına çıkıyordun.",
  characters: [
    "Kral I. Kaşyapa (inşa ettiren)",
    "Prens Vijaya (bir aslandan doğan Sinhala halkının efsanevi kurucusu)",
    "H.C.P. Bell (1898'de aslan pençelerini ortaya çıkaran İngiliz arkeolog)",
    "Kaleyi inşa eden isimsiz mühendisler ve işçiler",
  ],
  era: "477-495 (inşaat); 1898 (Bell'in kazısı)",

  // Non-translatable fields (copied from English)
  icon: "🦁",
  tier: "A",
  source:
    "Bell, H.C.P. Report on the Sigiriya Excavations, Archaeological Survey of Ceylon Annual Reports 1896-1904; Bandaranayake, Senake. Sigiriya: City, Palace and Royal Gardens, 2005; Mahavamsa, chapter 6 (Vijaya legend); Culavamsa, chapters 38-39; UNESCO World Heritage Nomination File 202; Paranavitana, Senarath. History of Ceylon, vol. 1, 1959",
  image: "",
  thumbnail: "",
  disabled: false,
  hasAudio: false,
  isFree: true,
  storyCategory: "builders_wonders",
  coordinates: { lat: 7.957, lng: 80.7603 },
  readingTimeMinutes: 3,
  updatedAt: now,
};

// ── Push to DynamoDB ──
try {
  await docClient.send(
    new PutCommand({
      TableName: "Story",
      Item: record,
      ConditionExpression: "attribute_not_exists(siteId)",
    })
  );
  console.log("\n✅ Turkish story pushed successfully!");
  console.log(`   siteId: ${record.siteId}`);
  console.log(`   langStoryId: ${record.langStoryId}`);
  console.log(`   title: ${record.title}`);
  console.log(`   updatedAt: ${new Date(now * 1000).toISOString()}`);
  console.log(`   paragraphs: ${record.paragraphs.length}`);
} catch (err) {
  if (err.name === "ConditionalCheckFailedException") {
    console.log(
      "\n⚠️  Record already exists. Updating with PUT (overwrite)..."
    );
    await docClient.send(
      new PutCommand({
        TableName: "Story",
        Item: record,
      })
    );
    console.log("✅ Turkish story updated (overwritten) successfully!");
    console.log(`   langStoryId: ${record.langStoryId}`);
  } else {
    console.error("❌ Push failed:", err);
    process.exit(1);
  }
}
