import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

// ─── TURKISH VERSION: Ayna Duvarın Şairleri ────────────────────────────────
//
// RECREATION NOTES:
//   - NOT a translation. Retold from scratch in natural Turkish register.
//   - Register: modern Turkish storyteller — quality podcast / popular nonfiction.
//   - Cultural proverb subverted: "Söz uçar, yazı kalır" → "burada ayna uçtu,
//     yazı kaldı" — every Turk knows this proverb, the subversion lands perfectly.
//   - Turkish-native expressions: "tokat gibi çarpıyor", "gün yüzüne çıkardı",
//     "kendilerinden geçti", "dize gelen", "ceylan gözlü", "falan değildi".
//   - "pekmez" instead of "molasses" — culturally resonant Turkish staple.
//

const story = {
  // ── Keys & metadata (unchanged from English) ──
  siteId: "sigiriya",
  langStoryId: "tr#mirror-wall-poets",
  storyId: "mirror-wall-poets",
  lang: "tr",
  icon: "✍️",
  tier: "A",
  storyCategory: "living_heritage",
  image: "",
  thumbnail: "",
  hasAudio: false,
  isFree: true,
  disabled: false,
  readingTimeMinutes: 4,
  coordinates: { lat: 7.957, lng: 80.7603 },
  era: "6th-14th century CE (graffiti period); 1956 (Paranavitana's publication)",
  source:
    "Paranavitana, Senarath. Sigiri Graffiti: Being Sinhalese Verses of the Eighth, Ninth, and Tenth Centuries, 2 vols., Oxford University Press, 1956; Bandaranayake, Senake. Sigiriya: City, Palace and Royal Gardens, 2005; MAP Academy, 'Desires, Reactions, Interpretations: Murals and Inscriptions from Sigiriya'; Bell, H.C.P. Archaeological Survey of Ceylon, Annual Reports 1896-1904",
  updatedAt: Math.floor(Date.now() / 1000),

  // ── Turkish text fields ──

  title: "Ayna Duvarın Şairleri",

  subtitle:
    "Sekiz yüzyıl boyunca insanlar bir kayaya tırmandı, boyalı kadınlara baktı ve cilalı bir duvara şiirler kazıdı — bilinen en eski Sinhala şiir derlemesini oluşturarak",

  excerpt:
    "Boyalı kadınların hemen altında, üstündeki resimleri yansıtacak kadar pürüzsüz cilalanmış bir duvar vardı. Ve sekiz yüz yıl boyunca ziyaretçiler durdu, başını kaldırıp baktı ve kimsenin beklemediği bir şey yaptı — şiir yazdı.",

  characters: [
    "Kiti (arzuya karşı uyaran Budist keşiş)",
    "Deva, Mahamata'nın karısı (boyalı kadınları kıskanan kadın)",
    "İsimsiz bir kadın ziyaretçi (erkek şairlerle dalga geçen)",
    "Senarath Paranavitana (685 şiiri çözen arkeolog)",
    "Sekiz yüzyıl boyunca yüzlerce isimsiz ziyaretçi",
  ],

  paragraphs: [
    {
      text: `Beşinci yüzyılda Sri Lankalı kral Kashyapa, ormanın içinden yükselen dev kaya Sigiriya'nın tepesine kale kurdu. Kayanın yarısında uçuruma altın kadınlar çizdirdi — bulutlar arasında süzülen figürler. Bulut Kızları deniyor bunlara. Altlarına da öyle bir duvar yaptırdı ki: kireç, yumurta akı, yaban balı, balmumu — ayna gibi parlıyordu. Önünden geçince yukarıdaki kadınlar yanınızda beliriyordu — asılları tepede, yansımaları göz hizasında. Bir kralın keyfi için yapılmıştı. Ama herkesin olacaktı.`,
    },
    {
      text: `Kashyapa 495'te düştü — tahtını geri almaya gelen öz kardeşi onu savaşta öldürdü. Kale bir Budist manastırına dönüştü. Bulut Kızları artık bir kralın özel hazinesi değildi. Keşişler, hacılar, askerler, tüccarlar, çiftçiler — kayaya tırmanan herkes onları görebiliyordu. Ve sonra kimsenin planlamadığı bir şey oldu. Ziyaretçiler, gördükleri karşısında kendilerinden geçti; sivri aletler çıkarıp duygularını o cilalı yüzeye kazıdılar. Bir aynayı deftere çevirdiler.`,
    },
    {
      text: `Sekiz yüz yıl boyunca — 500'lerden 1300'lere kadar — ziyaretçiler Ayna Duvar'a bin sekiz yüzden fazla yazıt kazıdı. Aşk şiirleri, hayat üzerine düşünceler, Budist uyarıları, espriler ve "ben buradaydım"dan öteye gitmeyen notlar. Hepsi Sinhala, Sanskritçe ve Tamilce. Planlı bir edebiyat projesi falan değildi bu. Saf insani içgüdüydü — güzel bir şey gör, bir şeyler söyle. Bu kazınmış dizeler, bilinen en eski Sinhala şiir derlemelerinden biri oldu.`,
    },
    {
      text: `Şairlerin çoğu erkekti ve konuları tek bir şeydi: arzu. "Altın tenli kız zihnimi ve gözlerimi büyüledi," diye yazmış biri. Bir başkası boyalı kadınların onu fiziksel olarak sarstığını itiraf etmiş: "Yan bakışlarıyla vuruldum, yere yığıldım." Bunlar sıradan gezginler değildi. Güzellik karşısında gerçekten dize gelen adamlardı — dar bir geçitte dikilip bulutların arasındaki altın kadınlara bakarken, kelimelerin yetmeyeceğini anlıyorlardı.`,
    },
    {
      text: `Ama kadın ziyaretçilerin bakışı bambaşkaydı. Deva — sadece "Mahamata'nın karısı" olarak tanımlanan bir kadın — kıskançlıkla dolu bir dize bırakmış: "Uçurumdaki o ceylan gözlü kadın beni çıldırtıyor. İncilerini sallayıp kocamla flört ediyor." Ve isimsiz bir kadın, duvarın en keskin satırını yazmış: "Bir kadın olarak boyalı kızlara acıyorum. Siz aptal erkekler, onca şiir yazmaya çalışıyorsunuz. Hiçbiriniz bize rom ve pekmez getirmedi." On beş asırlık bir söz, hâlâ tokat gibi çarpıyor.`,
    },
    {
      text: `Bir de keşiş Kiti vardı — aşıkların göremediğini gören adam. Yazdığı şey sıradaki ziyaretçiye bir uyarıydı: "Burada oyalanıyorsan kalbini kaptırma. Haz acıya çıkar. Acı hazza benzer." Bulut Kızları'nın dersin ta kendisi olduğunu anlamıştı: güzel, çekici, tamamen ulaşılmaz. Yarattıkları özlem zaten mesajın kendisiydi. O resimlerin altındaki duvar mı? Tam olarak o özlemin bin sekiz yüz kez kazındığı taş.`,
    },
    {
      text: `1956'da arkeolog Senarath Paranavitana bu yazıtlardan 685'inin çevirisini yayımladı — bin yılı aşkın süredir susmuş sesleri gün yüzüne çıkardı. Ve işte hikâyenin asıl çarpıcı noktası: Ayna Duvar güzelliği yansıtmak için yapılmıştı. Ama zaman aynayı bulandırdı. Yansıma çoktan yok oldu. Geriye kalan, o yansımanın önünde durup gördüklerini anlatmaya çalışan insanların sözleri oldu. Söz uçar, yazı kalır derler ya — burada ayna uçtu, yazı kaldı.`,
    },
  ],

  moralOrLesson:
    "İz bırakmak çağımıza özgü bir şey sanırız — yorumlar, paylaşımlar, bir yere adını kazımak. Ama Ayna Duvar bunun tam tersini kanıtlıyor. Bin beş yüz yıl önce insanlar güzel bir şey gördü ve bugün bizim hissettiğimiz dürtünün aynısını hissetti: bir şey söyle, yaz, kalıcı kıl. İnsan kalbi değişmemiş. Hâlâ görsellere kapılıyoruz, hâlâ kimsenin okumayacağı şeyler yazıyoruz ve hâlâ duygularımızı yazıya dökmekle onları ölümsüz kılacağımıza inanıyoruz.",
};

// ─── VALIDATION ─────────────────────────────────────────────────────────────

console.log("\n=== TURKISH VERSION — PARAGRAPH VALIDATION ===\n");

let totalChars = 0;
let totalWords = 0;
let allPass = true;

for (let i = 0; i < story.paragraphs.length; i++) {
  const text = story.paragraphs[i].text;
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
  `\nTotal: ${totalChars} chars | ${totalWords} words | ${story.paragraphs.length} paragraphs`
);
console.log(`Target: ~3000 chars (±20% = 2400–3600)`);
console.log(
  `Range: ${totalChars >= 2400 && totalChars <= 3600 ? "✓ WITHIN RANGE" : "✗ OUT OF RANGE"}`
);

console.log(`\nSubtitle: ${story.subtitle.length} chars`);
console.log(`Excerpt: ${story.excerpt.length} chars`);
console.log(`Moral: ${story.moralOrLesson.length} chars`);

if (!allPass) {
  console.error("\n✗ Some paragraphs exceed limits. Aborting.");
  process.exit(1);
}

// ─── PUSH TO DYNAMODB ───────────────────────────────────────────────────────

const command = new PutCommand({
  TableName: "Story",
  Item: story,
});

try {
  await docClient.send(command);
  console.log("\n✓ Turkish story pushed successfully to DynamoDB.");
  console.log(`  siteId: ${story.siteId}`);
  console.log(`  langStoryId: ${story.langStoryId}`);
  console.log(`  title: ${story.title}`);
  console.log(`  updatedAt: ${story.updatedAt}`);
  console.log(`  paragraphs: ${story.paragraphs.length}`);
} catch (err) {
  console.error("\n✗ DynamoDB push failed:", err.message);
  process.exit(1);
}
