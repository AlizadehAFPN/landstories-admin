import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const docClient = DynamoDBDocumentClient.from(client);

// ─── TURKISH STORY: GECE YOLCULUĞU ─────────────────────────────────────────
// Proverb woven in: "Allah bir kapıyı kapatırsa bin kapı açar"
// Subverted: "O gece bin kapı değil, yedi kat gök açıldı."
// Register: modern Turkish storyteller — educated, vivid, conversational

const title = "Gece Yolculuğu";

const subtitle =
  "Kederli bir peygamber, kanatlı bir binek ve yedi kat göğe uzanan bir gece";

const excerpt =
  "619 yılı — Hüzün Yılı. Hz. Muhammed, Mekke'nin düzenini tehdit eden bir inancı yaydığı için zaten ölüm listesindeydi ve haftalar içinde onu ayakta tutan iki insanı kaybetti.";

const moralOrLesson =
  "En derin vahiyler zafer anlarında değil, çaresizliğin dibinde gelir. Hz. Muhammed'e gökler, galip geldiğinde değil her şeyini kaybettiğinde açıldı — dünya onu alkışlarken değil, ayaklarının altına taş atarken. Miraç bize şunu öğretir: imanla taşınan acı, sonsuzluğun kapısı olabilir.";

const paragraphs = [
  {
    text: `619 yılı — Hüzün Yılı. Hz. Muhammed, Mekke'nin düzenini tehdit eden bir inancı yaydığı için zaten ölüm listesindeydi ve haftalar içinde onu ayakta tutan iki insanı kaybetti. Amcası Ebu Talip: Müslüman olmadığı hâlde on yıldır onu koruyan, bunu sırf kan bağı için yapan adam. Sonra eşi Hz. Hatice: ilk vahiy geldiğinde ona koşup "Allah seni asla yalnız bırakmaz" diyen kadın. Amca gidince kalkan kalmadı. Eş gidince sığınak. Taif'e gidip destek aradı. Taşladılar. Kan sandaletlerinden akana kadar.`,
  },
  {
    text: `Hayatının en dip noktasıydı. Ve tam o anda — yaralı, kanlı, elli yaşında — Cebrail, ufku tek adımda aşan kanatlı bir binek olan Burak'la geldi. Bir anda 1.200 kilometre çölü geçtiler, Kudüs'e indiler. Mescid-i Aksa — Hz. İbrahim'in oğluna bıçak kaldırdığı, Hz. Süleyman'ın mabedini diktiği tepe. İçeride, Allah'ın yeryüzüne gönderdiği bütün peygamberler bekliyordu. Cebrail namaz kıldırmasını söyledi. Son peygamber, ilk peygambere imam oldu.`,
  },
  {
    text: `Kutsal Kaya'dan — Yahudilerin en kutsal mabedinin yükseldiği aynı kayadan — Hz. Muhammed yedi kat göğe çıktı. Her katta bir peygamber bekliyordu. Birincide Hz. Âdem, kayıp ruhlar için ağlıyordu. İkincide Hz. İsa ve Hz. Yahya. Üçüncüde Hz. Yusuf — rivayete göre güzelliğin yarısı ona verilmişti. Altıncıda Hz. Musa, Muhammed ümmetinin kendi ümmetinden kalabalık olacağı için ağlıyordu. Yedinci katta Hz. İbrahim — üç dinin atası — gökteki Kâbe'ye yaslanmış, tebessüm ediyordu.`,
  },
  {
    text: `Hz. Muhammed tek başına devam etti. Cebrail bile gidemiyordu — "Bir adım daha atsam yanarım." Sidretü'l-Münteha'ya ulaştı, yaratılışın son sınırına. Orada Allah'ın huzuruna çıktı. Emir: günde elli vakit namaz. Kabul etti. Ama dönüşte Hz. Musa durdurdu. "Ümmetin kaldıramaz — ben İsrailoğulları'yla denedim." Geri döndü. Kırk. Musa başını salladı. Otuz. Yirmi. On. Sonunda beş, her biri on sevabıyla. Musa yine dene dedi. Hz. Muhammed: "Rabbimden o kadar istedim ki utanıyorum. Kabul ediyorum."`,
  },
  {
    text: `Şafak sökmeden Mekke'ye döndü. Yatağı hâlâ sıcaktı. Kentin ileri gelenleri güldü — bir gecede Kudüs'e gidip gelmek mi? Hiç görmediği şehri tarif etmesini istediler. Allah, Kudüs'ü gözünün önüne serdi; kapılarını, surlarını, binalarını eksiksiz anlattı. Çoğu yine inanmadı. Ama en yakın dostu Ebu Bekir tereddüt bile etmedi: "O söylüyorsa doğrudur." O günden sonra Ebu Bekir'in lakabı Sıddık oldu — Doğrulayan. İmparatorluklar yıkıldı, o isim hâlâ duruyor.`,
  },
  {
    text: `Yetmiş yıl sonra Emevi Halifesi Abdülmelik, Hz. Muhammed'in yükseldiği kayanın üstüne altın Kubbetü's-Sahra'yı dikti. Tepenin batı duvarına Yahudiler Ağlama Duvarı, Müslümanlar Burak Duvarı der. O gece pazarlık edilen beş vakit namaz bugün iki milyar insanın ibadeti. Bir gece yolculuğu Kudüs'ü İslam'ın üçüncü kutsal şehri yaptı. Derler ki Allah bir kapıyı kapatırsa bin kapı açar. O gece bin kapı değil, yedi kat gök açıldı. Tek bir kaya. Üç din. Aynı kadim, bitmek bilmeyen göğe uzanış.`,
  },
];

// ─── VALIDATION ─────────────────────────────────────────────────────────────

console.log("\n=== PARAGRAPH VALIDATION (TR) ===\n");

let totalChars = 0;
let totalWords = 0;
let allPass = true;

for (let i = 0; i < paragraphs.length; i++) {
  const text = paragraphs[i].text;
  const chars = text.length;
  const words = text.split(/\s+/).length;
  totalChars += chars;
  totalWords += words;

  const charOk = chars <= 500;
  const wordOk = words <= 100;

  if (!charOk || !wordOk) allPass = false;

  console.log(
    `P${i + 1}: ${chars} chars ${charOk ? "✓" : "✗ OVER"} | ${words} words ${wordOk ? "✓" : "✗ OVER"}`
  );
}

console.log(
  `\nTotal: ${totalChars} chars | ${totalWords} words | ${paragraphs.length} paragraphs`
);
console.log(`Target: ~3000 chars (±20% = 2400–3600)`);
console.log(
  `Status: ${totalChars >= 2400 && totalChars <= 3600 ? "✓ WITHIN RANGE" : "✗ OUT OF RANGE"}`
);

if (!allPass) {
  console.error("\n✗ Some paragraphs exceed limits. Aborting.");
  process.exit(1);
}

// ─── DYNAMODB PUT (new record) ──────────────────────────────────────────────

const now = Math.floor(Date.now() / 1000);

const item = {
  // ── Keys ──
  siteId: "jerusalem-old-city",
  langStoryId: "tr#night-journey-isra-miraj",
  storyId: "night-journey-isra-miraj",
  lang: "tr",

  // ── Translated fields ──
  title,
  subtitle,
  excerpt,
  moralOrLesson,
  paragraphs,

  // ── Preserved fields (from English record) ──
  characters: [
    "Prophet Muhammad",
    "Angel Jibril (Gabriel)",
    "The Buraq (celestial steed)",
    "Prophet Musa (Moses)",
    "Prophet Ibrahim (Abraham)",
    "Abu Bakr al-Siddiq",
  ],
  source:
    "Quran, Surah Al-Isra 17:1; Sahih al-Bukhari, Book of Merits of the Helpers, Hadith 3887 (Night Journey account); Sahih Muslim, Book of Faith, Hadith 162; Ibn Hisham, Al-Sirah al-Nabawiyyah (Life of the Prophet); al-Tabari, Tarikh al-Rusul wa'l-Muluk (History of Prophets and Kings); Creswell, K.A.C., Early Muslim Architecture (Dome of the Rock); Colby, Frederick, Narrating Muhammad's Night Journey, 2008; Vuckovic, Brooke Olson, Heavenly Journeys, Earthly Concerns, 2005",
  era: "c. 621 CE (the Isra and Mi'raj); 691 CE (Dome of the Rock construction)",
  icon: "🌙",
  image: "",
  thumbnail: "",
  tier: "S",
  storyCategory: "prophets_pilgrims",
  coordinates: { lat: 31.7777, lng: 35.2355 },
  readingTimeMinutes: 10,
  isFree: true,
  hasAudio: false,
  disabled: false,
  updatedAt: now,
};

const command = new PutCommand({
  TableName: "Story",
  Item: item,
  ConditionExpression:
    "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
});

try {
  await docClient.send(command);
  console.log("\n✓ Turkish story pushed successfully to DynamoDB.");
  console.log(`  siteId: ${item.siteId}`);
  console.log(`  langStoryId: ${item.langStoryId}`);
  console.log(`  title: ${item.title}`);
  console.log(`  paragraphs: ${item.paragraphs.length}`);
  console.log(`  updatedAt: ${now}`);
} catch (err) {
  if (err.name === "ConditionalCheckFailedException") {
    console.error(
      "\n✗ Turkish record already exists! Use update instead of put."
    );
  } else {
    console.error("\n✗ DynamoDB push failed:", err.message);
  }
  process.exit(1);
}
