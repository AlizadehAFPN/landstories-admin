import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const docClient = DynamoDBDocumentClient.from(client);

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ═══════════════════════════════════════════════════════════════
// TURKISH (tr) — Ölüme İnat
// Proverb: "Sabır taşı bile çatlar" — subverted (their will didn't crack)
// Register: modern Turkish storytelling, popular nonfiction / podcast
// ═══════════════════════════════════════════════════════════════
const tr = {
  siteId: "auschwitz-birkenau",
  storyId: "sonderkommando-uprising",
  lang: "tr",
  langStoryId: "tr#sonderkommando-uprising",

  title: "Ölüme İnat",
  subtitle: "Ölüme yazılmış adamların isyanı — ve bunu mümkün kılan dört kadın",

  excerpt:
    "Auschwitz'te herkes ölüme yakındı ama bir grubun kaderi herkesinkinden karanlıktı: Sonderkommando. Nazi SS'inin en korkunç işe zorladığı Yahudi mahkumlar — soydaşlarını gaz odalarına yönlendirmek, cesetleri taşımak, ölülerin ağızlarından altın dişleri sökmek, kalanları fırınlara sürmek. SS onları tok tutuyordu; merhametten değil, ölüm makinesinin çarkları dönsün diye. Her biri anlaşmayı biliyordu: gördüklerini bilen adam, fazla yaşamazdı.",

  moralOrLesson:
    "Ölüm kaçınılmazken bile direnmek — savaşmak, sessizce gitmemek, celladına son zaferi çok görmek — insanın sahip olduğu en büyük özgürlüktür.",

  paragraphs: [
    {
      text: "Auschwitz'te herkes ölüme yakındı ama bir grubun kaderi herkesinkinden karanlıktı: Sonderkommando. Nazi SS'inin en korkunç işe zorladığı Yahudi mahkumlar — soydaşlarını gaz odalarına yönlendirmek, cesetleri taşımak, ölülerin ağızlarından altın dişleri sökmek, kalanları fırınlara sürmek. SS onları tok tutuyordu; merhametten değil, ölüm makinesinin çarkları dönsün diye. Her biri anlaşmayı biliyordu: gördüklerini bilen adam, fazla yaşamazdı.",
    },
    {
      text: "1944 sonbaharı geldiğinde savaş Almanya'nın aleyhine dönmüştü. Sovyet ordusu doğudan yaklaşıyor, SS soykırımın izlerini silmeye çalışıyordu — gaz odaları söküldü, belgeler yakıldı. Sonderkommando'daki adamlar işaretleri okuyabiliyordu: sıra kendilerine geliyordu. Aylardır küçük bir grup sessizce imkânsız bir şey planlıyordu. Kaçış değildi. Kurtarılma umudu hiç değildi. Ölüme yazılmış adamların son hamlesi olacaktı: isyan.",
    },
    {
      text: "Planın kalbi baruta bağlıydı. Dört genç Yahudi kadın — Ala Gertner, Roza Robota, Regina Safirsztajn ve Estera Wajcblum — kampın bitişiğindeki cephane fabrikasında çalışıyordu. Aylarca avuç avuç barut kaçırdılar: elbiselerinin kıvrımlarına saklayarak, çift dipli yemek kaplarına gizleyerek, mahkumdan mahkuma elden ele ileterek. Hepsi yirmili yaşlarındaydı. Yakalanmanın bedeli işkence ve ölümdü. Yine de her gün devam ettiler.",
    },
    {
      text: "7 Ekim 1944. Krematoryum IV'teki Sonderkommando'ya haber ulaştı: bugün öldürüleceklerdi. Beklemediler — ilk hamleyi onlar yaptı. Kaçırılan barutla, konserve kutularından yapılan el bombalarıyla ve ellerine ne geçtiyse onunla SS gardiyanlarına saldırdılar. Üç SS'ciyi öldürdüler ve Krematoryum IV'ü ateşe verdiler. Alevler ve kapkara duman Birkenau'nun üzerinde yükseldi — kampın her köşesinden görünüyordu.",
    },
    {
      text: "Krematoryum II'deki mahkumlar da isyana katıldı. Bazıları dikenli telleri keserek kırsala kaçtı. Ama SS hızla takviye yığdı — askerler, köpekler, ezici ateş gücü. Kaçanlar tek tek avlandı. Saatler içinde her şey bitmişti. Dört yüz elli bir Sonderkommando hayatını kaybetti. Bir kısmı savaşarak düştü. Çoğu teslim olduktan sonra kurşuna dizildi.",
    },
    {
      text: "SS, barutun izini fabrikaya kadar sürdü ve dört kadına ulaştı. Ala, Roza, Regina ve Estera tutuklandı. Haftalarca işkence gördüler. SS isim istiyordu — kaçırma zincirindeki her mahkumun adını. Sabır taşı bile çatlar derler — ama SS'in işkencesi bu dört kadının iradesini çatlatamadı. Tek bir isim vermediler. Tek bir kişiyi daha tehlikeye atmadılar.",
    },
    {
      text: "6 Ocak 1945 — Sovyet askerlerinin Auschwitz'i özgürleştirmesine tam yirmi bir gün kala — dört kadın bütün mahkumların gözü önünde idam edildi. İpi boynuna geçirirlerken Roza Robota son nefesiyle haykırdı. İbranice iki kelime: \"Hazak v'amatz.\" Güçlü ol ve cesur ol.",
    },
    {
      text: "Auschwitz'te idam edilen son mahkumlar arasındaydılar. Üç hafta sonra kamp özgürdü. Ateşe verdikleri krematoryum bir daha asla inşa edilmedi.",
    },
  ],

  // Unchanged fields from English
  characters: [
    "Ala Gertner",
    "Roza Robota",
    "Regina Safirsztajn",
    "Estera Wajcblum",
    "Sonderkommando mahkumları",
  ],
  coordinates: { lat: 50.034, lng: 19.1775 },
  disabled: false,
  era: "World War II (October 7, 1944)",
  hasAudio: false,
  icon: "🔥",
  image: "",
  isFree: true,
  readingTimeMinutes: 3,
  source:
    "Auschwitz-Birkenau Memorial archives; Sonderkommando testimonies; Yad Vashem documentation",
  storyCategory: "crowns_conquests",
  thumbnail: "",
  tier: "A",
  updatedAt: now,
};

async function push(item) {
  const cmd = new PutCommand({ TableName: TABLE, Item: item });
  const res = await docClient.send(cmd);
  console.log(
    `✅  ${item.lang}#${item.storyId}  → HTTP ${res.$metadata.httpStatusCode}`
  );
}

push(tr).catch((err) => {
  console.error("❌  Push failed:", err);
  process.exit(1);
});
