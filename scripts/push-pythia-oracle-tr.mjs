import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

// ─── TURKISH STORY: Pythia — Apollon'un Sesi ──────────────────────────────
//
// Proverb (subverted): "Söz var iş bitirir, söz var baş yitirir"
//   — normally a warning about careless words.
//   — subverted: the Pythia's words did BOTH at once.
//
// Register: modern Turkish storyteller, high-quality podcast / popular nonfiction.
// No calques, no archaic Ottoman, no academic tone.

const paragraphs = [
  {
    text: `Bin yılı aşkın bir süre, antik dünyanın en güçlü insanı ne bir kral ne bir komutandı. Karanlık bir yeraltı odasında, kayalıktan sızan dumanları soluyan tek bir kadındı. Adı Pythia'ydı — Delphi Kâhini. O konuştuğunda, insanlar kehanet tanrısı Apollon'un sesini duyduklarına inanıyordu. Krallar kıtalar aşıp aylarca bekledi, sırf ona tek bir soru sorabilmek için.`,
  },
  {
    text: `Pythia her zaman Delphi'den bir kadın olurdu. Başlarda genç ve bekâr olması şartı vardı — ta ki bir ziyaretçi kâhinlerden birine saldırana dek. Ondan sonra yalnızca elli yaşını geçmiş kadınlar seçildi; yine de genç kız gibi beyaz cüppeler giyerlerdi. Seçilen kadın her şeyini geride bırakırdı: evini, ailesini, adını. Artık Apollon'undu. Öldüğü güne kadar onun sesi olacaktı.`,
  },
  {
    text: `Ritüel ayda bir kez, ayın yedinci günü yapılırdı — yedi, Apollon'un kutsal sayısıydı. Pythia oruç tutar, soğuk bir dağ pınarında yıkanır, sonra tapınağın en derin, en yasak odasına inerdi. Orada, kayanın ortasındaki bir çatlağın üzerine yerleştirilmiş üç ayaklı bir tabureye otururdu. Alttan tatlı kokulu bir gaz yükselir, başını döndürürdü. Defne yaprakları çiğner, kutsal su içer ve yavaş yavaş kendinden geçerdi.`,
  },
  {
    text: `Sonrası hem dehşet verici hem büyüleyiciydi. Pythia titremeye başlar, çığlık atar, tanıkların \u201cbu onun sesi değil\u201d dediği bir tonla konuşurdu. Sözleri çiğ ve karmakarışık çıkardı — çoğu insan tek kelime anlamazdı. Ama yanında bekleyen rahipler her sesi yakalar, bu çılgın patlamaları özenle biçimlenmiş kehanetlere dönüştürürdü. Bu kehanetler hep bilmece gibiydi. Söz var iş bitirir, söz var baş yitirir derler ya — Pythia'nın ağzından çıkan her söz, ikisini birden yapardı.`,
  },
  {
    text: `O bilmeceler dünyayı değiştirdi. Lidya Kralı Krezüs — zamanın en zengin adamı — Perslerle savaşmalı mıyım diye sorduğunda, kâhin şöyle dedi: \u201cNehri geçersen büyük bir imparatorluk yıkılır.\u201d Krezüs güvenle doğuya yürüdü. Yıkılan, kendi imparatorluğuydu. MÖ 480'de Atina devasa bir Pers istilasıyla yüz yüze gelince, kâhin \u201cahşap surlara güvenin\u201d dedi. Komutan Themistokles bunun savaş gemileri olduğunu savundu. Atina her şeyini donanmaya yatırdı — ve Salamis'te Persleri ezdi.`,
  },
  {
    text: `Peki gerçekten ne oluyordu o karanlık odada? 2001'de jeologlar, tapınak kalıntılarının tam altında iki fay hattının kesiştiğini keşfetti. Bu çatlaklardan etilen gazı sızıyor olabilirdi — küçük dozlarda tam da antik kaynakların anlattığı şeyi yapan doğal bir gaz: rüya gibi bir hâl, bedeninizi unuttuğunuz bir süzülme hissi. Belki Pythia sadece gaz soluyordu. Belki de işin içinde başka bir şey vardı. Sonuç değişmezdi: insanlar ona inandı — ve o inanç orduları harekete geçirip krallıkları devirdi.`,
  },
  {
    text: `Son, milattan sonra 393 yılında geldi. Hristiyan Roma İmparatoru Theodosius — eski Yunan dininin her izini silmeye kararlıydı — Delphi'ye bir ulak göndererek kâhine söyleyecek son sözü olup olmadığını sordu. Pythia'nın cevabı, tarihin en yürek burkan vedalarından biri oldu: \u201cİmparatora söyleyin: büyük salon yıkıldı. Apollon'un ne sığınağı kaldı, ne kutsal defnesi, ne konuşan pınarı. Su bile sustu artık.\u201d Bin yılı aşkın sürenin ardından, tanrının sesi kesildi — ve bir daha hiç konuşmadı.`,
  },
];

const title = "Pythia — Apollon'un Sesi";

const subtitle = "Bin yıl boyunca bir tanrının ağzından konuşan kadın";

const excerpt =
  "Bin yılı aşkın bir süre, antik dünyanın en güçlü insanı ne bir kral ne bir komutandı. Karanlık bir yeraltı odasında, kayalıktan sızan dumanları soluyan tek bir kadındı. Adı Pythia'ydı — Delphi Kâhini.";

const moralOrLesson =
  "Kâhin asla yalan söylemedi — sadece hakikatin birden fazla yüzü olmasını sağladı. Onu anlamak, Yunanlıların tapınak kapısına kazıdığı şeyi gerektiriyordu: Kendini Bil.";

// ─── VALIDATION ─────────────────────────────────────────────────────────────

console.log("\n=== PARAGRAPH VALIDATION ===\n");

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

// ─── DYNAMODB PUSH ──────────────────────────────────────────────────────────

const item = {
  siteId: { S: "delphi" },
  langStoryId: { S: "tr#pythia-oracle" },
  lang: { S: "tr" },
  storyId: { S: "pythia-oracle" },
  title: { S: title },
  subtitle: { S: subtitle },
  excerpt: { S: excerpt },
  moralOrLesson: { S: moralOrLesson },
  icon: { S: "🔮" },
  tier: { S: "S" },
  era: { S: "MÖ 8. yüzyıl – MS 393" },
  readingTimeMinutes: { N: "3" },
  image: { S: "" },
  thumbnail: { S: "" },
  disabled: { BOOL: false },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "riddles_past" },
  coordinates: {
    M: {
      lat: { N: "38.4824" },
      lng: { N: "22.501" },
    },
  },
  source: {
    S: "Herodotos — Tarih, Plutarkhos — Moralia (Pythia Kehanetleri Üzerine), Pausanias — Yunanistan'ın Tasviri, Diodoros Siculus — Bibliotheca Historica",
  },
  characters: {
    L: [
      { S: "Pythia" },
      { S: "Apollon" },
      { S: "Lidya Kralı Krezüs" },
      { S: "Themistokles" },
      { S: "Apollon Rahipleri" },
    ],
  },
  updatedAt: { N: String(Math.floor(Date.now() / 1000)) },
  paragraphs: {
    L: paragraphs.map((p) => ({
      M: {
        text: { S: p.text },
      },
    })),
  },
};

async function push() {
  try {
    await client.send(
      new PutItemCommand({
        TableName: "Story",
        Item: item,
      })
    );
    console.log("\n✓ SUCCESS: tr#pythia-oracle pushed to DynamoDB");
    console.log(`  title: ${title}`);
    console.log(`  subtitle: ${subtitle}`);
    console.log(`  paragraphs: ${paragraphs.length}`);
    console.log(`  excerpt: ${excerpt.substring(0, 80)}...`);
    console.log(`  moralOrLesson: ${moralOrLesson.substring(0, 80)}...`);
  } catch (err) {
    console.error("\n✗ FAILED:", err.message);
    process.exit(1);
  }
}

push();
