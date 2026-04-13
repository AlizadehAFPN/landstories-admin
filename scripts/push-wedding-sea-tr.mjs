import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "venice-st-marks-doges" },
  langStoryId: { S: "tr#wedding-of-the-sea" },
  lang: { S: "tr" },
  storyId: { S: "wedding-of-the-sea" },
  title: { S: "Denizle Evlenen Şehir" },
  subtitle: { S: "Sekiz yüz yıl boyunca denizle nikâhlı kalan cumhuriyet" },
  excerpt: {
    S: "Tarihte hiçbir hükümdar bunu denemedi — ama Venedik'in seçilmiş lideri Doğe, sekiz yüz yıl boyunca her sene denize altın yüzük attı.",
  },
  moralOrLesson: {
    S: "Egemenlik bir kere kazanılıp rafa kaldırılmaz. Her yıl yenilenen bir yemin, her gün yeniden seçilen bir kararlılıktır.",
  },
  icon: { S: "💍" },
  tier: { S: "A" },
  source: {
    S: 'Da Canal, Martin. Les Estoires de Venise (13th c.); Muir, Edward. Civic Ritual in Renaissance Venice, 1981; Lane, Frederic. Venice: A Maritime Republic, 1973',
  },
  characters: {
    L: [
      { S: "Doğe Pietro II Orseolo" },
      { S: "Papa III. Alexander" },
      { S: "İmparator Friedrich Barbarossa" },
      { S: "Napolyon Bonapart" },
      { S: "Venedik Doğeleri" },
    ],
  },
  era: { S: "Ortaçağ'dan Modern Döneme (1000-günümüz)" },
  readingTimeMinutes: { N: "3" },
  image: { S: "" },
  updatedAt: { N: "1773602154" },
  disabled: { BOOL: false },
  thumbnail: { S: "" },
  coordinates: {
    M: {
      lng: { N: "12.3388" },
      lat: { N: "45.4343" },
    },
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "crowns_conquests" },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "Tarihte hiçbir hükümdar bunu denemedi — ama Venedik'in seçilmiş lideri Doğe, yaklaşık sekiz yüz yıl boyunca her sene aynı şeyi yaptı. Kocaman altın bir tekneye bindi, açık denize çıktı, parmağından altın yüzüğü çıkarıp dalgalara bıraktı. \"Seninle evleniyoruz, ey Deniz — gerçek ve sürekli hâkimiyetimizin simgesi olarak.\" Şaka değildi. Mecaz hiç değildi. Devletin resmî eylemi, kıyılmış bir nikâhtı. Denize düşen yılana sarılır derler ya — Venedik düşmedi, denizle evlendi.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Hikâye 1000 yılı civarında başlıyor. Venedik o zamanlar bir lagünde kazıklar üstüne kurulmuş genç bir şehir. Bugünkü Hırvatistan kıyılarından gelen korsanlar ticaret yollarını tıkıyor. Doğe Pietro Orseolo bütün donanmayı topladı, Adriyatik'i geçti, korsanları ezdi, kıyıları ele geçirdi. Hristiyanların önemli bayramı Yükseliş Günü'nde zaferle döndü — ve açık denize çıkıp denizi Venedik'in mülkü ilan etti. Ondan sonraki her Doğe aynı yemini, aynı gün, her yıl tekrarladı.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Tören 1177'de bambaşka bir boyut kazandı. Avrupa'nın en güçlü adamı Kutsal Roma İmparatoru Friedrich Barbarossa, Papa III. Alexander'ı kovalıyordu. Papa canını kurtarmak için Venedik'e sığındı; Venedik araya girdi, barış anlaşması sağladı. Minnettar Papa, Doğe'ye altın bir yüzük uzatıp ilan etti: Venedik'in her yıl Adriyatik'le nikâh kıyma hakkı artık Tanrı'nın onayını taşıyordu. Buna Sposalizio del Mare — Denizin Düğünü — dediler. Artık sadece güç gösterisi değildi; kutsal bir ritüeldi.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Asıl göz kamaştıran şey Bucintoro'ydu — Doğe'nin tören gemisi. Son hali 1729'da yapıldı: otuz beş metre uzunluğunda, baştan aşağı altın varakla kaplı, kırmızı ipeklerle süslü, yüz altmış sekiz kürekçinin çektiği bir dev. Yabancı diplomatlar ülkelerine mektup üstüne mektup yazıyordu: Avrupa'da hiçbir taç giyme töreni, Versay'ın şaşaası bile bu altın geminin suda süzülüşüyle yarışamazdı. Arkasında yüzlerce tekne, en önde Doğe — düğüne yürüyen bir damat gibi.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Son gerçek tören 1797'de aynı bayram günü yapıldı. On iki gün sonra Napolyon'un ordusu şehre girdi. Cumhuriyet kendini feshetti — bin yüz yıllık kesintisiz özyönetim sona erdi. Napolyon ne yapacağını çok iyi biliyordu. Bucintoro'nun altınlarını söktürüp eritti, kalanını ateşe verdi. Tarihin gördüğü en görkemli geminin külleri, bir zamanlar zaferle süzüldüğü sulara döküldü. Napolyon sadece Venedik'i fethetmedi. Gelinliğini yaktı.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Tören 1900'lerde geri getirildi ve hâlâ her yıl yapılıyor — artık yüzüğü atan bir Doğe değil, belediye başkanı. Ama şunu bir düşünün: Venedik kıyılarının açığında, Adriyatik'in dibinde, çamurun içinde yaklaşık sekiz yüz yıllık altın yüzük yatıyor. Bir cumhuriyetin denizle evli kalmak için her yıl ödediği bedel. Bin yıl boyunca Venedik nikâhına sadık kaldı — ta ki birisi gelip düğün salonunu ateşe verene kadar.",
          },
        },
      },
    ],
  },
};

async function push() {
  try {
    const command = new PutItemCommand({
      TableName: "Story",
      Item: item,
    });
    const result = await client.send(command);
    console.log("SUCCESS: Turkish story pushed to DynamoDB");
    console.log("HTTP Status:", result.$metadata.httpStatusCode);
  } catch (error) {
    console.error("FAILED:", error.message);
    process.exit(1);
  }
}

push();
