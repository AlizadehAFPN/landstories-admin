import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "stonehenge" },
  langStoryId: { S: "tr#solstice-druid-mysteries" },
  lang: { S: "tr" },
  storyId: { S: "solstice-druid-mysteries" },

  title: { S: "Güneşi Yakalayan Taşlar" },
  subtitle: { S: "Stonehenge'de astronomi, Druidler ve bitmek bilmeyen bir arayış" },
  excerpt: {
    S: "Stonehenge'in ana ekseni yaz gündönümünde güneşin doğuşuyla birebir örtüşüyor. Beş bin yıl önce birisi bu hesabı yaptı — ve o günden beri insanlar bu taşların arasında güneşi beklemeye devam ediyor.",
  },

  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "Stonehenge'i oraya rastgele dikmediler. Anıtın ana ekseni yaz gündönümünde güneşin doğuşuyla, kış gündönümünde batışıyla tıpatıp örtüşüyor. Yılın en uzun gününde — 21 Haziran'da — çemberin ortasına geçin ve doğuya bakın. Güneş, \"Topuk Taşı\" denen devasa kayanın tam üzerinden yükselir, ilk ışınlarını dosdoğru anıtın göbeğine yollar. Beş bin yıl öncesinden birileri oturup bunu hesapladı. Bu bir tesadüf değil; bu bir niyet.",
          },
        },
      },
      {
        M: {
          text: {
            S: "1720'lerde William Stukeley adında bir İngiliz doktor alanı didik didik inceledi. Stonehenge'i ölçen, haritasını çıkaran ilk insandı. Gündönümü hizasını görünce aklına bir fikir yapıştı ve bir daha çıkmadı: bu yapıyı Druidler dikmiş olmalıydı. Druidler, Romalı general Sezar'ın \"Britanya'nın ruhani önderleri\" diye tarif ettiği gizemli Kelt rahipleriydi. Stukeley bu fikre öyle kapıldı ki kendine \"Druidlerin Prensi\" unvanını layık gördü.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Sorun şu: Stukeley yanılıyordu. Druidler, Stonehenge'in dikilişinden binlerce yıl sonra yaşamıştı. Ama bir fikir bir kez toprağa düştü mü, onu söküp atamazsınız. 1800'lerde kendilerine Druid diyen topluluklar şafak vakti beyaz cüppeler giyip Stonehenge'de ayin düzenlemeye başladı. 1900'lerin ortasına geldiğimizde yaz gündönümü artık bir hac yolculuğuna dönüşmüştü. Paganlar, mistikler, sırt çantalı gezginler — kadim bir şeye dokunmak isteyen herkes bu taşların çevresinde buluşuyordu.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Derken işler sarpa sardı. 1980'lerin başında \"Stonehenge Özgür Festivali\" kontrolden çıktı — müzik, çadırlar, on binlerce kişi. Yetkililer taşlara zarar geleceğinden korkup festivali yasakladı. 1 Haziran 1985'te polis, alana yürüyen yaklaşık altı yüz gezgini yolda kesti. Sonrası İngiltere'yi sarstı: araç camları parçalandı, aileler otobüslerden çıkarıldı, beş yüz otuz yedi kişi gözaltına alındı — İkinci Dünya Savaşı'ndan bu yana ülkenin en büyük toplu tutuklaması. Tarihe \"Fasulye Tarlası Savaşı\" olarak geçti.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Yıllar süren gerginlikten sonra bir orta yol bulundu. 2000 yılından beri Stonehenge, her gündönümünde kapılarını ücretsiz açıyor. Her yazın en uzun gecesinde yirmi bin ile otuz yedi bin kişi karanlıkta toplanıyor: beyaz cüppeli Druidler, telefonunu kaldırmış turistler, omuzlarında çocuk taşıyan aileler. Hepsi aynı şeyi bekliyor. Güneş Topuk Taşı'nın ardından sıyrılıp çemberi ışığa boğduğu an, kalabalıktan bir çığlık yükseliyor. Aynı güneş, aynı taşlar. Değişen sadece izleyenler.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Stonehenge sadece mistikleri büyülemedi; bilim insanlarını da peşine taktı. 1965'te gökbilimci Gerald Hawkins cesur bir tez ortaya attı: bu anıt, güneş ve ay tutulmalarını önceden hesaplamak için kurulmuş bir tür taş çağı bilgisayarıydı. Hawkins'in her iddiası tutmadı, ama temel keşfi sağlamdı — Stonehenge güneşi ve ayı şaşırtıcı bir doğrulukla takip ediyor. Hatta alanın altındaki doğal kireçtaşı sırtı tam gündönümü güneşinin doğduğu yöne bakıyordu. Sanki toprak, taşlardan önce kendi işaretini koymuştu.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Druidler Stonehenge'i dikmedi — bu konu kapandı. Ama Stukeley bir şeyde haklıydı: burası insanın gökyüzüne en çok yaklaştığı yerlerden biri. \"Taş yerinde ağırdır\" derler ya — Stonehenge'i kuranlar bu taşların yerinin iki yüz kırk kilometre ötede, yıldızlarla aynı hizada olduğuna karar vermiş. Yirmi beş tonluk kayaları sürükleyip gökyüzünün haritasını yere çizmişler. Beş bin yıl sonra biz hâlâ o çemberin içindeyiz, aynı güneşi bekliyoruz — tıpkı onlar gibi.",
          },
        },
      },
    ],
  },

  moralOrLesson: {
    S: "Taşı ve yıldızı aynı hizaya getirme arzusu, insanın en eski dürtüsüne sesleniyor: evrende bir düzen bulmak, zamanın geçişini işaretlemek ve aynı gökyüzünün altında, aynı hayranlığı paylaşmak.",
  },

  icon: { S: "☀️" },
  tier: { S: "A" },
  source: {
    S: 'William Stukeley, "Stonehenge: A Temple Restor\'d to the British Druids" (1740); Gerald Hawkins, "Stonehenge Decoded" (1965); Andy Worthington, "Stonehenge: Celebration and Subversion" (2004); Christopher Chippindale, "Stonehenge Complete" (4th ed., 2012)',
  },
  characters: {
    L: [
      { S: "William Stukeley" },
      { S: "Gerald Hawkins" },
      { S: "The Ancient Order of Druids" },
      { S: "The New Age travelers of the 1980s" },
      { S: "Modern solstice celebrants" },
    ],
  },
  era: {
    S: "Neolithic origins (c. 3000 BC) to modern revival (18th century - present)",
  },
  readingTimeMinutes: { N: "3" },
  image: { S: "" },
  thumbnail: { S: "" },
  coordinates: {
    M: {
      lat: { N: "51.1789" },
      lng: { N: "-1.8262" },
    },
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  disabled: { BOOL: false },
  storyCategory: { S: "prophets_pilgrims" },
  updatedAt: { N: "1773514587" },
};

async function push() {
  try {
    const cmd = new PutItemCommand({
      TableName: "Story",
      Item: item,
    });
    const result = await client.send(cmd);
    console.log("SUCCESS — Turkish story pushed to DynamoDB");
    console.log("HTTP status:", result.$metadata.httpStatusCode);
  } catch (err) {
    console.error("FAILED:", err.message);
    process.exit(1);
  }
}

push();
