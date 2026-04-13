import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "delphi" },
  langStoryId: { S: "tr#last-prophecy" },
  lang: { S: "tr" },
  storyId: { S: "last-prophecy" },
  title: { S: "Son Kehanet — Tanrı Sustu" },
  subtitle: { S: "Apollon'un sesinin sonsuza dek kesildiği gün" },
  excerpt: {
    S: "Bin yıldan fazla, Yunanistan'ın tam ortasında bir dağ tapınağında bir kadın konuştu — ve dünya durdu, dinledi. Delfi Kâhini, antik çağın en güçlü sesiydi. Krallar, komutanlar, sıradan insanlar; hepsi bu ücra tapınağa tırmandı, geleceğini sormak için.",
  },
  moralOrLesson: {
    S: "Her şeyin bir sonu var — tanrıların sesinin bile. Ama bilgelik bir kez söylendi mi, sonsuza dek yankılanır. Kâhin sustu; öğrettikleri hâlâ konuşuyor.",
  },
  icon: { S: "🌑" },
  tier: { S: "A" },
  era: { S: "MS 393" },
  readingTimeMinutes: { N: "3" },
  image: { S: "" },
  thumbnail: { S: "" },
  disabled: { BOOL: false },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "lost_found" },
  coordinates: {
    M: {
      lat: { N: "38.4824" },
      lng: { N: "22.501" },
    },
  },
  source: {
    S: "Philostorgius'un Kilise Tarihi (Photius alıntısı), Cedrenus'un Tarih Özeti, Sozomen'in Kilise Tarihi",
  },
  characters: {
    L: [
      { S: "Son Pythia" },
      { S: "İmparator I. Theodosius" },
      { S: "Apollon" },
    ],
  },
  updatedAt: { N: String(Math.floor(Date.now() / 1000)) },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "Bin yıldan fazla, Yunanistan'ın tam ortasında bir dağ tapınağında bir kadın konuştu — ve dünya durdu, dinledi. Delfi Kâhini, antik çağın en güçlü sesiydi. Krallar, komutanlar, sıradan insanlar; hepsi bu ücra tapınağa tırmandı, geleceğini sormak için. Pythia denen rahibe tanrı Apollon'un sesi olurdu: tapınağın altındaki yarıktan yükselen dumanları soluyor, kendinden geçiyor ve savaşların, kolonilerin, bütün uygarlıkların kaderini değiştiren kehanetler veriyordu. Sonra, milattan sonra 393'te, son kez konuştu.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Onu susturan kişi İmparator I. Theodosius'tu — Hristiyanlığı Roma'nın tek resmi dini ilan eden ilk hükümdar. Milattan sonra 391'de pagan ibadetini imparatorluğun dört bir yanında yasakladı. Her kurbanı, her ritüeli, her tapınağı. Askerler Mısır'dan Britanya'ya kadar kutsal mekânları mühürledi. Rahipler dağıtıldı. Hazineler eritildi ya da yağmalandı. Yüzyıllardır zaten ağır ağır sönen Delfi, onu ayakta tutan son şeyi — kehanet geleneğini — de kaybetmek üzereydi.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Anlatılanlara göre Theodosius, Kâhin'e son bir elçi gönderdi. Niyeti neydi — can çekişen eski dinle dalga mı geçmek, yoksa tanrıların artık sustuğunu resmen teyit mi ettirmek — kimse kesin bilmiyor. Son Pythia, tapınağın altındaki karanlık odaya son kez indi. Kutsal üçayağa oturdu, topraktan yükselen buharı ciğerlerine çekti. Ve konuştu.",
          },
        },
      },
      {
        M: {
          text: {
            S: "\u201cKrala söyleyin: görkemli tapınak yerle bir oldu. Apollon'un ne sığınağı kaldı, ne kutsal defnesi, ne konuşan pınarı. Kehanet suyu kurudu.\u201d",
          },
        },
      },
      {
        M: {
          text: {
            S: "Bu kadardı. Bilmece yok. Gizli anlam yok. Bir tanrı, son rahibesinin ağzından, her şeyin bittiğini kabul ediyordu — o kadar. Kutsal ateşler söndürüldü. Tapınak kapıları son kez kapandı. Bin yıldır tapınağı saran defne koruları yavaşça soldu, kurudu, öldü.",
          },
        },
      },
      {
        M: {
          text: {
            S: "\u201cSöz gümüşse sükut altındır\u201d derler ya — Apollon'un suskunluğu altın falan değildi. Bir dünyanın çöküşüydü, o kadar. Sonraki yüzyıllarda birkaç kişi Kâhin'i diriltmeye çalıştı, nafile. Eski Yunanlıların dünyanın tam merkezi olduğuna inandığı, \u201cDünyanın Göbeği\u201d dedikleri Delfi, artık bir dağ yamacında sıradan bir harabe oldu. Hacıların yerini turistler, duaların yerini fotoğraflar aldı.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Ama geriye bir şey kaldı — belki de asıl önemli olan şey. Tapınağın girişine kazınmış iki söz — \u201cKendini Bil\u201d ve \u201cAşırıya Kaçma\u201d — Batı felsefesinin temel taşlarına dönüştü; iki bin yılı aşkın süredir dillerden düşmüyor. Hayatın en büyük sorularını sorabileceğin bir yer olması gerektiği fikri — bu dürtü her inançta, her anlam arayışında, gecenin köründe \u201cbunun anlamı ne ki?\u201d diye sorulan her sohbette hâlâ yaşıyor.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Tanrı sustu. Ama insanların onun kapısına taşıdığı sorular — kader nedir, özgür irade var mı, sonra ne olacak — o sorular hiçbir zaman susmadı. Hâlâ aynı soruları soruyoruz.",
          },
        },
      },
    ],
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
    console.log("SUCCESS: tr#last-prophecy pushed to DynamoDB");
  } catch (err) {
    console.error("FAILED:", err.message);
    process.exit(1);
  }
}

push();
