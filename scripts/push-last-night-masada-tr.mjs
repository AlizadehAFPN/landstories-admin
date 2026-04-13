import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "masada" },
  langStoryId: { S: "tr#last-night-on-masada" },
  storyId: { S: "last-night-on-masada" },
  lang: { S: "tr" },
  title: { S: "Masada'nın Son Gecesi" },
  subtitle: {
    S: "960 Yahudi savunucu Roma'ya diz çökmektense ölümü seçti — kura ile birbirlerinin hayatına son vererek tarihin en unutulmaz son direnişini yazdı",
  },
  excerpt: {
    S: "Son gece surlar çoktan düşmüştü, Roma'nın rampası işini görmüştü. Dokuz yüz altmış kişinin lideri ayağa kalkıp konuşmaya başladı. Söyledikleri iki bin yıl boyunca yankılanacaktı.",
  },
  icon: { S: "⚔️" },
  tier: { S: "S" },
  era: { S: "MS 73 veya 74 — Birinci Yahudi-Roma Savaşı'nın son perdesi" },
  storyCategory: { S: "crowns_conquests" },
  readingTimeMinutes: { N: "3" },
  isFree: { BOOL: true },
  disabled: { BOOL: false },
  hasAudio: { BOOL: false },
  image: { S: "" },
  thumbnail: { S: "" },
  updatedAt: { N: String(Math.floor(Date.now() / 1000)) },
  coordinates: {
    M: {
      lng: { N: "35.3536" },
      lat: { N: "31.3156" },
    },
  },
  moralOrLesson: {
    S: "Özgürlük sadece zincirlerin olmaması değildir — her yol karanlığa çıksa bile kendi kaderini seçme hakkıdır. Bir halkın ölçüsü ayakta kalıp kalmadığı değil, ayakta kalmayı anlamlı kılan şeyi teslim etmeyi reddetmesidir.",
  },
  source: {
    S: "Josephus, Flavius. Bellum Judaicum (The Jewish War), Book VII, chapters 252-406; Yadin, Yigael. Masada: Herod's Fortress and the Zealots' Last Stand, 1966; Magness, Jodi. Masada: From Jewish Revolt to Modern Myth, Princeton University Press, 2019; Cohen, Shaye J.D. 'Masada: Literary Tradition, Archaeological Remains, and the Credibility of Josephus,' Journal of Jewish Studies 33, 1982",
  },
  characters: {
    L: [
      { S: "Eleazar ben Ya'ir — leader of the Sicarii defenders" },
      {
        S: "Flavius Josephus — Jewish-Roman historian, sole source of the account",
      },
      {
        S: "Two unnamed women — survivors who hid in a cistern with five children",
      },
      {
        S: "Lucius Flavius Silva — Roman commander of the besieging Tenth Legion",
      },
      {
        S: "The 960 defenders — men, women, and children of the last Jewish stronghold",
      },
    ],
  },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "MS 73 baharı. Roma'nın Onuncu Lejyonu aylardır kayalığın yamacına rampa inşa ediyordu. Sonunda surların dibine ulaştılar. Koçbaşıyla dış duvarı yardılar. Savunucular arkaya toprak doldurulmuş ahşap bir barikat dikti. Roma onu da ateşe verdi. Rüzgâr bir an alevleri Romalıların kendi kulesine savurdu — bir anlık umut. Sonra döndü. Gün batarken barikat kül olmuştu. Herkes şafakta ne olacağını biliyordu: on bin asker, açık gedikten içeri. Artık duvar yoktu. Geriye sadece bir seçim kalmıştı.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Bunlar sıradan mülteciler değildi. Sicarii'ydiler — 'hançerciler' — Yahudi isyanının en sert kanadı. Yedi yıl önce Roma askerleri Kudüs Tapınağı'nı yağmalamış, sivilleri katletmişti. Yahudiye ayaklandı. İsyancılar ilk savaşlarda kazandı, tam bir lejyonu imha ettiler. Roma altmış bin asker gönderdi. Her kale teker teker düştü. Kudüs yandı. Tapınak yıkıldı. Masada son kaleydi — Lut Gölü'nün üzerinde bir kayalıkta 960 kişi, Kral Hirodes'in yüz yıl önce bıraktığı erzakla hayatta kalıyordu.",
          },
        },
      },
      {
        M: {
          text: {
            S: "O gece liderleri Elazar ben Yair herkesi Hirodes'in sarayında topladı. Bunu tek bir kaynaktan biliyoruz: Roma tarafına geçmiş Yahudi komutan Josephus. Elazar iki konuşma yaptı diyor Josephus. Onları bekleyen kaderi anlattı — erkekler Roma madenlerinde ve arenalarda ölecekti, kadınlara tecavüz edilecekti, çocuklar köle olarak büyütülecekti. 'Karılarımız dokunulmadan ölsün,' dedi. 'Çocuklarımız köleliğin ne olduğunu bilmeden.' Teslim olmayı değil, ellerindeki son özgür kararı kullanmayı istiyordu.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Erkekler ağladı. Bazıları eşlerini kucaklayıp bırakamadı. Ama Elazar pes etmedi. Etrafınıza bakın, dedi — yanan barikat, dağın eteklerini ilmik gibi saran Roma karargâhları. Pazarlık edecek bir şey yoktu. Roma isyancılara merhamet değil ibret verirdi. Kudüs düştükten sonra o kadar çok kişiyi çarmıha gerdiler ki ağaç kalmamıştı. Derler ki ölümden öte köy yok — ama o gece dokuz yüz altmış kişi, köyün zaten bu tarafta kalmadığına karar verdi. Gözyaşları içinde, hep birlikte kabul ettiler.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Olan biten bir panik değildi, bir plandı. Yahudi hukuku intihara izin vermez, bunu biliyorlardı. Tek bir kişinin kendi canına kıyacağı bir yöntem tasarladılar. Her erkek ailesinin yanına gitti, onları son kez kucakladı ve öldürdü. Eşyalarını yaktılar ama erzağa dokunmadılar — Roma'ya mesajdı: açlıktan ölmedik, biz seçtik. Kura çektiler. On kişi diğerlerini öldürmek için seçildi. O on kişi kendi aralarında tekrar kura çekti. Son kalan adam sarayı ateşe verdi ve kılıcını kendine sapladı.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Şafakta askerler gedikten daldı — kalkanlar kenetli, kılıçlar çekilmiş, hayatlarının en kanlı savaşına hazır. Onları sessizlik karşıladı. Saraydan yükselen alevler, dört bir yanda ürpertici bir ıssızlık. Bağırdılar. Kılıçlarını kalkanlara vurdular. Karşılık gelmedi. Sonra bir sarnıçtan iki kadın ve beş çocuk sürünerek çıktı. Kadınlardan biri Elazar'ın akrabasıydı. Her şeyi anlattı. Kudüs Tapınağı'nı ateşe vermiş gaziler — dünyanın en sert askerleri — ölülerin karşısında donup kaldı.",
          },
        },
      },
      {
        M: {
          text: {
            S: "İşin tuhafı şu: iki bin yıl boyunca Yahudiliği şekillendiren hahamlar Masada'dan tek kelime etmedi. Başka bir kahraman seçtiler — kuşatma altındaki Kudüs'ten konuşarak çıkmayı başaran, tapınak da vatan da yokken ayakta kalacak bir öğrenme geleneği kuran bir bilgin. Masada'nın kılıçları ve ateşi, reddettikleri şeydi. Ama hikâye hayatta kaldı. Romalıların o şafakta bulduğu sessizlik — diz çökmektense ölümü seçmiş insanların sessizliği — iki bin yıldır o yaylada yankılanıyor. Cevapsız ve mutlak.",
          },
        },
      },
    ],
  },
};

async function pushStory() {
  try {
    const command = new PutItemCommand({
      TableName: "Story",
      Item: item,
    });
    const result = await client.send(command);
    console.log("SUCCESS: Turkish story pushed to DynamoDB");
    console.log("  siteId: masada");
    console.log("  langStoryId: tr#last-night-on-masada");
    console.log("  HTTP status:", result.$metadata.httpStatusCode);
  } catch (err) {
    console.error("FAILED to push Turkish story:", err.message);
    process.exit(1);
  }
}

pushStory();
