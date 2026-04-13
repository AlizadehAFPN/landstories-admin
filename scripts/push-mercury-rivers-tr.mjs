// Push Turkish recreation of "The Mercury Rivers of the Underworld"
// to the Story DynamoDB table.

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (identical to English original) ───────────────────────────
const shared = {
  siteId: "terracotta-army",
  storyId: "mercury-rivers-underworld",
  icon: "🌊",
  storyCategory: "riddles_past",
  tier: "A",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 34.3812, lng: 109.2541 },
  source:
    'Sima Qian, "Shiji"; 2003 Chinese Academy of Sciences mercury survey; Archaeological Institute of Shaanxi Province',
  updatedAt: now,
};

// ═════════════════════════════════════════════════════════════════════════════
// TURKISH (tr)
// Proverb subverted: "Doğru söyleyeni dokuz köyden kovarlar"
// (They chase the truth-teller from nine villages)
// → Sima Qian was chased not from nine villages but from twenty centuries
// ═════════════════════════════════════════════════════════════════════════════

const tr = {
  ...shared,
  lang: "tr",
  langStoryId: "tr#mercury-rivers-underworld",
  title: "Yeraltının Cıva Nehirleri",
  subtitle: "Yeraltına evren inşa eden imparator",
  excerpt:
    "Milattan önce birinci yüzyılda, Çinli tarihçi Sima Qian öyle bir iddia ortaya attı ki, duyan herkes gülüp geçti. Çin'in ilk imparatorunun mezarında gerçek cıva nehirleri aktığını yazdı. Mecaz falan değil. Gerçek cıva — ülkenin nehirlerini birebir taklit eden kanallardan pompalanan sıvı metal.",
  moralOrLesson:
    "Binlerce yıl masal diye geçiştirilen gerçekler, bazen her kurgudan daha akıl almaz çıkar.",
  era: "MÖ 210 — Qin Hanedanı",
  characters: [
    "Qin Shi Huang — yeraltına evren inşa ettiren imparator",
    "Sima Qian — bunu tarihe kaydeden tarihçi",
    "Cıvayı doğrulayan modern bilim insanları",
  ],
  paragraphs: [
    {
      text: "Milattan önce birinci yüzyılda, Çinli tarihçi Sima Qian öyle bir iddia ortaya attı ki, duyan herkes gülüp geçti. Çin'in ilk imparatoru Qin Shi Huang'ın — Büyük Çin Seddi'ni yaptıran, Terrakotta Ordusu'nu gömdüren adamın — mezarında gerçek cıva nehirleri aktığını yazdı. Mecaz falan değil. Gerçek cıva. Ülkenin nehirlerini birebir taklit eden kanallardan pompalanan, gümüş renginde akan sıvı metal.",
    },
    {
      text: "Sima Qian bunu Shiji'de yazdı — Çin'in bugüne ulaşan en kapsamlı tarih kitabı. \u201CCıva ile yüz nehir, Yangtze ve Sarı Irmak taklit edildi; mekanik düzeneklerle akıtıldı\u201D diyor. Tavanı mücevherlerle kaplıydı, gece göğünü canlandırmak için. Zemin, imparatorluğun ölçekli haritasıydı. Yukarıda yıldızlar, aşağıda nehirler. Tek bir ölünün sonsuza dek hükmedeceği, yerin altına gömülmüş özel bir evren.",
    },
    {
      text: "İki bin yıl boyunca kimse inanmadı. Cıvadan nehirler mi? Yeraltı takımyıldızları mı? Masal gibi geliyordu, tarih gibi değil. Mezar zaten hep oradaydı — Xi'an şehri yakınlarında, nar ağaçlarıyla kaplı yetmiş altı metrelik bir tepe — ama içini açmadan neyin yattığını kanıtlamanın yolu yoktu. Derler ya, \u201Cdoğru söyleyeni dokuz köyden kovarlar.\u201D Sima Qian'ı ise dokuz köyden değil, yirmi asırlık tarihten kovmuşlardı.",
    },
    {
      text: "Ta ki 2003'e kadar. Çinli bilim insanları mezarın tam üstündeki toprakta cıva testi yaptı. Sonuçlar akıl almaz çıktı: mezar odasının üzerindeki cıva seviyesi, çevresine kıyasla yüz kata kadar yüksekti. Üstelik cıva rastgele dağılmamıştı. Çin'in büyük nehirlerinin haritadaki konumlarıyla birebir örtüşen bir desen çiziyordu. İki bin yıllık \u201Cmasal,\u201D bir gecede belgelenmiş gerçeğe dönüştü.",
    },
    {
      text: "Sima Qian abartmıyormuş. Kelimesi kelimesine doğru söylemiş. Qin Shi Huang toprağın altına koca bir evren inşa ettirmiş — cıva nehirleri imparatorluğun su yollarını takip ediyor, tavanda mücevherden takımyıldızlar parlıyor, ok tuzakları hayalet askerler gibi nöbet tutuyor. Yetmiş altı metre toprağın altında, nehirlerin hiç kurumadığı, yıldızların hiç batmadığı ve imparatorun sonsuza dek hükmettiği bir Çin yaratmıştı.",
    },
    {
      text: "Ama asıl çarpıcı kısım şu: Çin hâlâ mezarı açmıyor. Cıva bakterileri öldürür, çürümeyi durdurur — doğanın en güçlü koruyucularından biri. İçerideki her ne varsa, iki bin iki yüz yılı aşkın süredir cıva buharıyla mühürlü duruyor. Bilim insanları, mezarı açmanın her şeyi dakikalar içinde yok edebileceğinden korkuyor. Dünyanın en büyük arkeolojik gizemi gözümüzün önünde duruyor. Ve kimse dokunamıyor.",
    },
    {
      text: "Bazı araştırmacılar, mezarın içinde Çin tarihini yeniden yazabilecek el yazmaları olduğuna inanıyor. Qin Shi Huang Çin yazısının kendisini standartlaştıran adam — öbür dünyaya kitapsız gider mi hiç? Eğer oradalarsa, iki bin yıldır karanlıkta, cıva buharının içinde kusursuzca korunuyorlar. Ve biz onlara dokunamıyoruz.",
    },
    {
      text: "Mezar bugün hâlâ orada. Herkesin gözü önünde. Her yıl yüz binlerce turist ziyarete geliyor. Terrakotta savaşçıların fotoğrafını çekiyorlar, hediyelik eşya alıyorlar, sonra o sessiz yeşil tepenin yanından düşünmeden geçip gidiyorlar. Oysa ayaklarının altında, karanlıkta, Çin'in ilk imparatorunun cıva nehirleri belki de hâlâ akıyor.",
    },
  ],
};

// ─── Push ─────────────────────────────────────────────────────────────────────

async function push(item, label) {
  console.log(`Pushing ${label}...`);
  const res = await doc.send(new PutCommand({ TableName: TABLE, Item: item }));
  console.log(`  ✓ ${label} — HTTP ${res.$metadata.httpStatusCode}`);
}

async function main() {
  await push(tr, "tr#mercury-rivers-underworld");
  console.log("\nDone.");
}

main().catch((err) => {
  console.error("FAILED:", err);
  process.exit(1);
});
