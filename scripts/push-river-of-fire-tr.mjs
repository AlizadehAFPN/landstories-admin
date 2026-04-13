import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

// ── Turkish Recreation v2: "The River of Fire" ─────────────
// Proverb (subverted): "Sabreden derviş muradına ermiş"
// — The patient dervish achieved his wish... but the wish itself had turned to ash.
// Register: Skilled modern storyteller. Popular nonfiction / high-quality podcast.

const paragraphs = [
  {
    text: `Yıl 1686. Tuna'ya tepeden bakan bir kale var: Budin. Macaristan'ın kadim başkenti — ama tam 145 yıldır Osmanlı toprağı. O yaz, Avrupa'nın sabrı tükendi. Avusturya önde, ardında Bavyera, Brandenburg ve düzinelerce devletin askerleri Tuna kıyısına yığıldı. Tek hedef: şehri geri almak. Ama Budin kolay lokma değildi. Önlerinde 78 günlük bir cehennem vardı — ve o cehennemi yaşayanlar, Tuna'nın alev alev yandığını ömür boyu unutamayacaktı.`,
  },
  {
    text: `Kuşatma haziran ortasında başladı ve beraberinde kıyameti getirdi. İki tarafın topları gece gündüz susmadı — öyle aralıksız ki haftalar içinde askerler birbirini duyamaz oldu. Surlar yıkıldıkça saldırganlar gediklerden içeri daldı. Ama Osmanlı askerleri bu şehri karış karış biliyordu: her dar sokağı, her kör noktayı, nereden ateş açılıp nereye sığınılacağını. Kale, Tuna'nın üzerinde sarp bir kayalığın tepesindeydi. Yaklaşmak bile zordu. İçeride hayatta kalmak — o bambaşka bir hikâyeydi.`,
  },
  {
    text: `Ağustos geldiğinde sahnede yeni bir düşman vardı — kılıçtan sessiz ama kılıçtan acımasız: salgın hastalık. Siperler açık mezarlara dönmüştü. Sargı bezi tükenince cerrahlar ölülerin üniformalarını söküp onunla yara sardı. Komutan Lorraine Dükü Charles, ordusunun her gün biraz daha eridiğini görüyordu. Denklem acıydı: Budin kıştan önce düşmezse, bu ordu kendiliğinden çözülecekti. Düşmanla değil, zamanla yarışıyorlardı — ve zaman kazanıyordu.`,
  },
  {
    text: `2 Eylül sabahı Charles ya hep ya hiç dedi. Elinde ne kaldıysa son hamleye yatırdı. Öğleden sonra askerler dört bir yandan saldırıya geçti — yıkıntıların üzerinden tırmanarak, birbirlerinin omuzlarına basarak. Savaş sokak sokak, kapı kapı ilerledi. İki tarafta da merhamet kalmamıştı. Dış şehir saatler içinde düştü. Ama kale — yanan şehrin tepesinde kayalığa kök salmış gibi duran o kale — düşmeyi reddediyordu.`,
  },
  {
    text: `Sonunda kale surları da çöktü. Son hücumu Macar askerleri yönetti — burası onların başkentiydi, tam 145 yıldır bu anı bekliyorlardı. Karşı tarafta Osmanlı Valisi Abdurrahman Abdi Paşa bir tercih yaptı. Teslim olabilirdi. Teslim olsa belki canını kurtarırdı. Ama o kılıcını çekti. Savunmaya yemin ettiği kaleyi son nefesine kadar korudu — ve öyle düştü, ayakta, elinde kılıcıyla. Budin'i tutan on bin Osmanlı askerinden beş yüzden azı o günün sonunu gördü.`,
  },
  {
    text: `Peki zafer neye benziyordu? Yirmi binden fazla kuşatmacı siperlerde ve yıkıntılar arasında can vermişti. Şehrin kendisi tanınmaz haldeydi — sokaklarda yürüyecek yer bile bulmak zordu. İki yüzyıl önce Macar krallarının kurduğu Corvina Kütüphanesi — zamanında Avrupa'nın en zengin kitap koleksiyonlarından biri — bir avuç küle dönmüştü. Bir şehir kurtardıklarını sandılar. Devraldıkları şey bir mezarlıktı.`,
  },
  {
    text: `Sabreden derviş muradına ermiş derler. Macarlar tam 145 yıl sabretti — ama muratlarına erdiklerinde, muradın kendisi küle dönmüştü. Yine de 2 Eylül 1686 Macar tarihinin en kutlu günlerinden biri oldu. Haber ulaştığında ülkenin dört yanında kilise çanları çaldı. Bir buçuk asır sonra Budin yeniden Macar toprağıydı. Bedeli mi? Şehrin sahip olduğu her şey. Ama özgürlüğün ne demek olduğunu unutmamış bir halk için yıkıntılar bile başkasının sarayından değerliydi.`,
  },
];

// ── Validation ──────────────────────────────────────────────
let totalChars = 0;
let hasError = false;
for (let i = 0; i < paragraphs.length; i++) {
  const t = paragraphs[i].text;
  const words = t.split(/\s+/).length;
  const chars = t.length;
  totalChars += chars;
  console.log(`P${i + 1}: ${chars} chars, ${words} words`);
  if (chars > 500) {
    console.error(`  ⚠️  P${i + 1} exceeds 500 char limit!`);
    hasError = true;
  }
  if (words > 100) {
    console.error(`  ⚠️  P${i + 1} exceeds 100 word limit!`);
    hasError = true;
  }
}
console.log(`\nTotal: ${totalChars} chars (target ~3000 ±20% = 2400–3600)`);
console.log(`Paragraphs: ${paragraphs.length} (target 6–8)\n`);

if (totalChars < 2400 || totalChars > 3600) {
  console.error("⚠️  Total character count out of range!");
  hasError = true;
}

if (hasError) {
  console.error("❌ Validation failed. Aborting.");
  process.exit(1);
}

// ── Build excerpt ───────────────────────────────────────────
const excerpt = paragraphs[0].text.substring(0, 120).replace(/\s+\S*$/, "");
console.log(`Excerpt: "${excerpt}"\n`);

// ── Push to DynamoDB ────────────────────────────────────────
const now = Math.floor(Date.now() / 1000);

const item = {
  // Keys
  siteId: "buda-castle",
  langStoryId: "tr#great-siege-1686",

  // Turkish text
  lang: "tr",
  title: "Ateşten Nehir",
  subtitle: "145 yıla son veren 78 gün",
  excerpt,
  paragraphs,
  moralOrLesson: "Bazen özgürlüğün bedeli, esaretin kendisinden ağır olur.",

  // Preserved metadata
  storyId: "great-siege-1686",
  storyCategory: "crowns_conquests",
  characters: [
    "Lorraine Dükü Charles",
    "Abdurrahman Abdi Paşa (Osmanlı Valisi)",
    "Savoialı Prens Eugen",
  ],
  era: "18 Haziran – 2 Eylül 1686",
  icon: "⚔️",
  tier: "A",
  isFree: true,
  disabled: false,
  hasAudio: false,
  readingTimeMinutes: 2,
  coordinates: { lat: 47.497, lng: 19.039 },
  source: "Habsburg military archives; Ottoman defteris; European gazettes",
  image: "",
  thumbnail: "",
  updatedAt: now,
};

// Validate JSON round-trip
const json = JSON.stringify(item, null, 2);
console.log("── Item preview ──");
console.log(json);
console.log("");

try {
  JSON.parse(json);
  console.log("✅ JSON validation passed\n");
} catch (e) {
  console.error("❌ JSON validation failed:", e.message);
  process.exit(1);
}

// Push (overwrite existing Turkish record with improved version)
const result = await docClient.send(
  new PutCommand({
    TableName: "Story",
    Item: item,
  })
);

console.log("✅ Successfully pushed Turkish story to DynamoDB!");
console.log(`   siteId: ${item.siteId}`);
console.log(`   langStoryId: ${item.langStoryId}`);
console.log(`   title: ${item.title}`);
console.log(`   paragraphs: ${item.paragraphs.length}`);
console.log(`   updatedAt: ${new Date(item.updatedAt * 1000).toISOString()}`);
