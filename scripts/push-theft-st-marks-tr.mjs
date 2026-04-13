import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const ddb = DynamoDBDocumentClient.from(client);

const item = {
  siteId: "venice-st-marks-doges",
  langStoryId: "tr#theft-of-st-marks-body",
  storyId: "theft-of-st-marks-body",
  lang: "tr",
  title: "Kutsal Soygun",
  subtitle: "İki tüccar, bir sepet domuz eti ve bir şehrin kaderi",
  excerpt:
    "Venedik, 828. Şehir ticaretten zenginleşiyor, donanma kuruyor, Akdeniz'de adını duyurmaya başlıyor. Ama bir eksik var: koruyucu azizi kimsenin tanımadığı bir Yunan asker. Büyüklerle aynı masaya oturacaksan büyük bir isim lazım.",
  icon: "\u{1F9A1}",
  tier: "A",
  storyCategory: "tricksters_folk_tales",
  era: "9. yüzyıl (828)",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 3,
  characters: [
    "Buono da Malamocco",
    "Rustico da Torcello",
    "Aziz Markos",
    "Stauracio (Rum keşiş)",
    "Teodoro (Rum keşiş)",
    "Doge Giustiniano Partecipazio",
  ],
  moralOrLesson:
    "Tek bir cesur hamle bir şehrin kaderini sonsuza dek belirleyebilir — ve geçmişine dair anlattığın hikâye, geleceğini de şekillendirir.",
  coordinates: { lat: 45.4345, lng: 12.3396 },
  thumbnail: "",
  image: "",
  source:
    "Translatio Sancti Marci (9th century account); Norwich, John Julius. A History of Venice, 1982; Brown, Patricia Fortini. Venice and Antiquity, 1996",
  disabled: false,
  updatedAt: Math.floor(Date.now() / 1000),
  paragraphs: [
    {
      text: "Venedik, 828. Şehir ticaretten zenginleşiyor, donanma kuruyor, Akdeniz'de adını duyurmaya başlıyor. Ama bir eksik var: koruyucu azizi Theodoros — kilise çevreleri dışında kimsenin tanımadığı bir Yunan asker-aziz. Roma'nın Petrus'u var, Konstantinopolis'in Andreas'ı. Venedik'in elinde ne var? Hiç. Büyüklerle aynı masaya oturacaksan büyük bir isim lazım. Ve İskenderiye'de ticaret yapan iki Venedikli — Buono da Malamocco ile Rustico da Torcello — o ismi nereden bulacaklarını gayet iyi biliyor.",
    },
    {
      text: "Hedefleri sıradan biri değil: Aziz Markos. Dört İncil yazarından biri, İskenderiye Kilisesi'nin kurucusu, Hristiyanlığın en saygın isimlerinden. Naaşı yüzyıllardır şehirdeki bir kilisede yatıyor. Bu iki tüccar oraya dua etmeye gelmedi. Bir azizi çalacaklar, deniz aşırı kaçıracaklar ve Venedik'e yeni koruyucu olarak sunacaklar. Kulağa deli işi gibi geliyor, değil mi? Asıl çılgınlık, işi nasıl yaptıkları.",
    },
    {
      text: "İskenderiye o dönemde Abbasi Halifeliği'nin kontrolünde. Müslüman yönetim Hristiyan kalıntılarını sıkı takipte tutuyor — Avrupalıların bunlara ulaşmak için her şeyi göze alacağını biliyor. Ama tüccarlar kilisede iki müttefik buluyor: azizin mezarını koruyan Rum keşişler Stauracio ve Teodoro. Keşişlerin kendi korkusu var — Halife Hristiyan kiliselerini yıktırıp mermerlerini başka yapılarda kullandırıyor ve sıranın Markos'un kilisesine gelmesinden korkuyorlar. Korku garip ortaklıklar doğurur.",
    },
    {
      text: "Gece yarısı lahit açılıyor. Markos'un naaşı çıkıp yerine daha az bilinen Azize Claudia'nın bedeni konuyor. Sonra planın dahice kısmı geliyor: Markos'un bedenini kocaman bir sepetin dibine koyup üstünü domuz eti ve lahanayla örtüyorlar. Gümrükte Müslüman memurlar gemiye çıkınca tüccarlar sepeti açıp \"Hınzır! Hınzır!\" diye bağırıyor — Arapçada \"Domuz!\" Memurlar iğrenerek geri çekilip gemiyi aramadan geçiriyor. Derler ya, korkak bezirgan ne kâr eder ne ziyan. Bu iki bezirgan hiç mi hiç korkak değildi — ve ele geçirdikleri kâr, bir azizin ta kendisiydi.",
    },
    {
      text: "Hristiyanlığın en kutsal emanetlerinden biri böylece Mısır'dan çıkıyor — koruyucularının kendi inançları gereği el süremeyeceği bir etin altında. Naaş Venedik'e ulaşınca şehir bayram yerine dönüyor. Venedik'in yöneticisi Doge Giustiniano Partecipazio hemen bir bazilika yaptırıyor; ilki 832'de tamamlanıyor. Bugün ayakta duran muhteşem San Marco Bazilikası ise 1063 ile 1094 arasında inşa ediliyor. Aziz Markos'un simgesi kanatlı aslan Venedik'in arması oluyor — bayraklara, duvarlara, savaş gemilerine işleniyor.",
    },
    {
      text: "İşin en çarpıcı yanı şu: bugün bazilikayı ziyaret ederseniz, en soldaki girişin üzerindeki mozaiğe bakın. 1200'lerden kalma bu sahne kaçırma operasyonunu bütün ayrıntısıyla gösteriyor — sepeti taşıyan tüccarlar, tiksintiyle geri dönen memurlar, yasak etin altına gizlenmiş aziz. Dünyada ön kapısında gururla bir hırsızlık sahnesini sergileyen başka bir kilise gösterebilir misiniz?",
    },
    {
      text: "Venedik buna hiçbir zaman hırsızlık demedi. \"Translatio\" dediler, yani kutsal nakil. Ve bunun Tanrı'nın iradesiyle gerçekleştiğini öne sürdüler. Efsaneye göre yüzyıllar öncesinde Markos Venedik lagününden geçerken bir melek belirip fısıldamış: \"Sana selam olsun Markos. Bedenin burada huzur bulacak.\" 828'deki olay mı? Hırsızlık filan değilmiş — asırlık bir kehanetin gerçekleşmesiymiş. Ve açıkçası bin yıllık Venedik ihtişamı tam olarak bu hikâyenin üzerine kuruldu.",
    },
  ],
};

async function push() {
  console.log("Pushing Turkish story: theft-of-st-marks-body");
  console.log("siteId:", item.siteId);
  console.log("langStoryId:", item.langStoryId);
  console.log("title:", item.title);
  console.log("updatedAt:", item.updatedAt);
  console.log("paragraphs:", item.paragraphs.length);

  // Validate paragraph constraints
  for (let i = 0; i < item.paragraphs.length; i++) {
    const p = item.paragraphs[i];
    const charCount = p.text.length;
    const wordCount = p.text.split(/\s+/).length;
    console.log(`  P${i + 1}: ${charCount} chars, ${wordCount} words`);
    if (charCount > 600) {
      console.warn(`  ⚠ P${i + 1} exceeds 500 chars (with tolerance)`);
    }
    if (wordCount > 120) {
      console.warn(`  ⚠ P${i + 1} exceeds 100 words (with tolerance)`);
    }
  }

  const totalChars = item.paragraphs.reduce((s, p) => s + p.text.length, 0);
  console.log(`Total: ${totalChars} chars`);

  await ddb.send(
    new PutCommand({
      TableName: "Story",
      Item: item,
    })
  );

  console.log("\n✅ Successfully pushed Turkish version!");
}

push().catch((err) => {
  console.error("❌ Push failed:", err);
  process.exit(1);
});
