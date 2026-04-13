import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const ddb = DynamoDBDocumentClient.from(client);

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

const item = {
  siteId: "sigiriya",
  langStoryId: "tr#patricide-king",
  storyId: "patricide-king",
  lang: "tr",
  title: "Baba Katili Kral",
  subtitle:
    "Babasını öldüren bir prens gökyüzüne saray kurar — ama hiçbir kale, insanı içindeki mahkûmiyetten kurtaramaz",
  excerpt:
    "Beşinci yüzyılda, asla kral olamayacak bir prens öz babasını öldürdü — sonra da tanrıların bile başını kaldırıp bakması gereken bir kayalığın tepesine tahtını kurdu.",
  moralOrLesson:
    "Babasının kanıyla ele geçirilen taht, taht değildir — gökyüzündeki bir zindandır. Hiçbir kale, ne kadar yüksek olursa olsun, insanı içinde çoktan yaşamaya başlamış yargıdan koruyamaz.",
  paragraphs: [
    {
      text: "Milattan sonra 473\u2019te bir prens öz babasını öldürdü. Sonra da vicdanından kaçmak için tahtını gökyüzüne kurdu. Babası Kral Dhatusena, Sri Lanka\u2019nın kadim başkenti Anuradhapura\u2019yı yönetiyordu. Halkına devasa bir baraj yaptırmıştı — Kala Wewa. Ülkenin pirinç tarlalarını ayakta tutan, binlerce dönümlük bir su deposu. Ama oğlu Kashyapa\u2019nın annesi alt kasttan bir kadındı. Bu yüzden taht, kraliçenin oğlu Moggallana\u2019ya — yani küçük üvey kardeşe — vaat edilmişti.",
    },
    {
      text: "Kashyapa\u2019nın öfkesi yalnız kalmadı. Kralın yeğeni ve ordu komutanı Migara da intikam peşindeydi — annesi, Dhatusena\u2019nın emriyle idam edilmişti. İkisi birlikte orduyu ayaklandırdı ve kralı devirdi. Dhatusena zincire vuruldu. Sonra tarihin unutamadığı an geldi. Kashyapa babasını Kala Wewa\u2019nın kıyısına sürükledi ve hazinenin yerini sordu. Yaşlı kral dizlerinin üstüne çöktü, zincirli elleriyle sudan bir avuç aldı ve dedi ki: \u201CSahip olduğum tek servet budur.\u201D",
    },
    {
      text: "Bu, gerçek mirasının altın değil su olduğunu bilen bir kralın son onur gösterisiydi. Kashyapa aldırmadı. Migara intikamını aldı. Yaşlı kralı soyup zincirlediler ve diri diri bir tuğla duvarın içine ördüler. Dhatusena — hayat vermek için barajlar kuran adam — kendi halkına inşa etmeyi öğrettiği duvarların arasında, karanlıkta, yavaş yavaş can verdi.",
    },
    {
      text: "Budist inancında babanı öldürmek, bir insanın işleyebileceği en büyük günahtır — hiçbir dua, hiçbir hayırlı iş onu silemez. Anuradhapura\u2019nın rahipleri Kashyapa\u2019yı kral olarak tanımayı reddetti. Halk ona \u201CBaba Katili Kashyapa\u201D demeye başladı. Üvey kardeşi Moggallana denizi geçip Güney Hindistan\u2019a kaçtı ve tahtı geri almak için ordu toplamaya koyuldu. Kashyapa\u2019nın başında taç vardı ama o tacın ne değeri kalmıştı ne onuru.",
    },
    {
      text: "Sonra hiçbir kralın yapmadığı şeyi yaptı. Kutsal başkenti tamamen terk etti ve krallığını akıl almaz bir yere taşıdı: dümdüz ormanın ortasından yüz seksen metre dik yükselen devasa bir granit kayalık. Tepesi ancak iki futbol sahası büyüklüğünde. Budist keşişler yüzyıllardır eteklerindeki mağaralarda meditasyon yapıyordu ama kimse bu kayanın tepesinde yaşamayı aklından bile geçirmemişti. Kashyapa o kayaya baktı ve hiçbir ordunun ulaşamayacağı, hiçbir rahibin yargılayamayacağı bir taht gördü.",
    },
    {
      text: "On sekiz yılda ortaya çıkan yapı dudak uçuklatıyordu. Etekte, bin beş yüz yıl sonra hâlâ çalışan fıskiyeleriyle su bahçeleri. Tırmanış boyunca, kaya yüzüne işlenmiş göksel kadın freskleri ve ayna gibi parlatılmış bir duvar. Zirveye ulaşmak için yirmi metre boyunda devasa bir taş aslanın açık ağzından geçmek gerekiyordu. Tepedeyse kayadan oyulmuş, olimpik havuz büyüklüğünde bir havuzu olan tam donanımlı bir saray vardı.",
    },
    {
      text: "Kashyapa kendini tanrı-kral ilan etti. Altın sikkeler bastırdı, ticaret limanları açtı, onu reddeden rahiplere bile bir manastır bağışladı. Her freskindeki tanrıça, her imkânsız fıskiye aynı şeyi haykırıyordu: Ben buna layığım. Ben bunu hak ediyorum. Ama tarihçiler gerçeği çoktan görmüştü. Derler ya, sabrın sonu selamettir. Kashyapa\u2019nın sabırsızlığının sonu ise dünyanın en güzel hapishanesi oldu. Hiçbir kale, ne kadar yüksek olursa olsun, insanı zaten içinde yaşayan yargıdan koruyamaz.",
    },
  ],
  characters: [
    "Kral I. Kashyapa (baba katili kral)",
    "Kral Dhatusena (babası)",
    "Prens Moggallana (üvey kardeşi, meşru varis)",
    "Migara (Dhatusena\u2019nın yeğeni, ordu komutanı ve suç ortağı)",
  ],
  coordinates: { lat: 7.957, lng: 80.7603 },
  era: "473-495",
  icon: "\u{1F451}",
  image: "",
  thumbnail: "",
  isFree: true,
  hasAudio: false,
  disabled: false,
  readingTimeMinutes: 3,
  storyCategory: "crowns_conquests",
  tier: "S",
  source:
    "Culavamsa (chapters 38-39); Geiger, Wilhelm, trans. Culavamsa: Being the More Recent Part of the Mahavamsa, 1929; Bandaranayake, Senake. Sigiriya: City, Palace and Royal Gardens, 2005; De Silva, K.M. A History of Sri Lanka, 1981; UNESCO World Heritage Nomination File 202",
  updatedAt: now,
};

async function push() {
  try {
    await ddb.send(new PutCommand({ TableName: TABLE, Item: item }));
    console.log("✅ Successfully pushed: tr#patricide-king");

    // Verify
    const { GetCommand } = await import("@aws-sdk/lib-dynamodb");
    const result = await ddb.send(
      new GetCommand({
        TableName: TABLE,
        Key: { siteId: "sigiriya", langStoryId: "tr#patricide-king" },
      })
    );
    console.log("✅ Verified — title:", result.Item.title);
    console.log("   paragraphs:", result.Item.paragraphs.length);
    console.log("   lang:", result.Item.lang);
    console.log("   updatedAt:", result.Item.updatedAt);
  } catch (err) {
    console.error("❌ Push failed:", err);
    process.exit(1);
  }
}

push();
