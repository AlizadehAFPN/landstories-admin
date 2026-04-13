import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "buda-castle" },
  langStoryId: { S: "tr#raven-king" },
  lang: { S: "tr" },
  storyId: { S: "raven-king" },
  title: { S: "Kral Yapan Kuzgun" },
  subtitle: { S: "Bir beşik, bir yüzük ve Macaristan'ın kaderi" },
  excerpt: {
    S: "1440'ların Macaristan'ında herkesin tanıdığı ama kimsenin düşman etmek istemediği bir adam vardı: János Hunyadi. Osmanlı ordularını Orta Avrupa'nın kapısında durduran komutan — zamanının en korkulan savaşçısı.",
  },
  moralOrLesson: {
    S: "Bazen kader, en beklenmedik habercilerle gelir.",
  },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "1440'ların Macaristan'ında herkesin tanıdığı ama kimsenin düşman etmek istemediği bir adam vardı: János Hunyadi. Osmanlı ordularını Orta Avrupa'nın kapısında durduran komutan — zamanının en korkulan savaşçısı. Ama bu kadar güç, bu kadar şöhret insanı yalnızlaştırır. Sarayda komplocular, karanlıkta suikastçılar, her köşede bir tuzak. 1443'te yeni bir sefere çıkarken küçük bir karar verdi. O an için sıradan görünen, ama tarihin en garip efsanelerinden birini başlatacak bir karar.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Sefere çıkmadan önce János, hamile karısı Erzsébet Szilágyi'ye mühür yüzüğünü bıraktı. Bu sıradan bir yüzük değildi. Antlaşmalar bu yüzükle imzalanır, ordulara bu yüzükle emir verilir, yazılı buyrukların gerçekliği bu yüzükle kanıtlanırdı. Yüzük bir süs değildi — gücün ta kendisiydi. Sahte bir mektubun savaş başlatabildiği, tek bir imzanın kader değiştirebildiği bir çağda, o yüzüğü kaybetmek felaket demekti.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Haftalar sonra Erzsébet bir oğlan çocuğu dünyaya getirdi: Mátyás. Hunyad Kalesi'nde bir sabah, bebeğiyle ilgilenirken mühür yüzüğünü beşiğin kenarına bıraktı. Bir anlık dalgınlık. Ve tam o an — açık pencereden kapkara bir kuzgun süzüldü, altın yüzüğü gagasına kaptı ve yüksek bir kuleye uçtu. Saniyeler içinde Hunyadi ailesinin en değerli varlığı, savaş meydanlarında ordu yöneten o mühür, havaya karışmıştı.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Erzsébet'in yüreği ağzına geldi. O yüzük düşman eline geçerse kocasının mührüyle sahte emirler yazılabilir, askerleri bile ona karşı döndürülebilirdi. Ama sonra kimsenin açıklayamadığı bir şey oldu. Henüz birkaç haftalık bebek Mátyás, kuledeki kuzguna gözlerini dikti. Kırpmadan, kıpırdamadan — dondurucu, tuhaf bir bakış. Dakikalar geçti. Kuzgun yavaş yavaş aşağı indi, beşiğin kenarına kondu ve yüzüğü usulca bebeğin örtüsüne bıraktı.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Hikâye Macaristan'ı yangın gibi sardı. \"Kuzgunlar onu tanıdı,\" diye fısıldaştı halk. \"Bu çocuk kader tarafından işaretlendi.\" Kuşun eğitimli mi yoksa vahşi mi olduğu, hikâyenin sonradan uydurulup uydurulmadığı kimseyi ilgilendirmedi. Kısmet insanı arar derler — ama Mátyás'ın kısmeti beşiğine kadar geldi, gagasında altın yüzükle. On beşinci yüzyıl Macaristan'ında böyle bir inanç, herhangi bir ordudan daha hızlı yayılır ve daha sert vururdu.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Ve inananlar haklı çıktı. 1458'de, henüz on beş yaşındaki Mátyás Macaristan Kralı seçildi — daha zengin, daha güçlü rakiplerin önüne geçerek. Çünkü halk onu istedi. Kuzgunu kişisel simgesi yaptı ve tarihe Matthias Corvinus olarak geçti. Corvinus, Latince \"kuzgun\" demek. Armasında siyah bir kuzgun, gagasında altın bir yüzük vardı. Aynı kuzgun. Aynı yüzük. Aynı hikâye.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Bugün o kuzgun hâlâ Macaristan'ı izliyor — taşa kazınmış, anıtlara işlenmiş, bir milletin kimliğine dokunmuş. Beşiğinde vahşi bir kuşla göz göze gelen o bebek, büyüyünce Osmanlı'yla göz göze geldi. Avrupa'nın en parlak Rönesans saraylarından birini kurdu ve Macaristan'ın yetiştirdiği en büyük kral oldu. Efsane gerçek miydi? Artık bunun bir önemi yok. Bazı hikâyeler büyüklüğü anlatmaz — büyüklüğü yaratır.",
          },
        },
      },
    ],
  },
  icon: { S: "🦅" },
  tier: { S: "A" },
  source: {
    S: "János Thuróczy's Chronica Hungarorum; Hungarian folk tradition",
  },
  characters: {
    L: [
      { S: "Matthias Corvinus (infant)" },
      { S: "Erzsébet Szilágyi" },
      { S: "János Hunyadi" },
      { S: "The Raven" },
    ],
  },
  era: { S: "1443" },
  readingTimeMinutes: { N: "2" },
  image: { S: "" },
  updatedAt: { N: String(Math.floor(Date.now() / 1000)) },
  disabled: { BOOL: false },
  thumbnail: { S: "" },
  coordinates: {
    M: {
      lng: { N: "19.0398" },
      lat: { N: "47.4961" },
    },
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "crowns_conquests" },
  storyId: { S: "raven-king" },
};

async function push() {
  try {
    const cmd = new PutItemCommand({
      TableName: "Story",
      Item: item,
    });
    const result = await client.send(cmd);
    console.log("SUCCESS: Turkish raven-king pushed to DynamoDB");
    console.log("HTTP Status:", result.$metadata.httpStatusCode);
  } catch (err) {
    console.error("FAILED:", err.message);
    process.exit(1);
  }
}

push();
