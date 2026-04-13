import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "great-pyramids-giza" },
  langStoryId: { S: "tr#workers-village-discovery" },
  lang: { S: "tr" },
  storyId: { S: "workers-village-discovery" },
  title: { S: "2500 Yıllık Yalan" },
  subtitle: { S: "Piramitlerin köle efsanesini yıkan keşif" },
  excerpt: {
    S: "Yüzyıllar boyunca dünya bir yalana inandı. Yunan tarihçi Heredot, Firavun Khufu'nun yüz bin kişiyi köle olarak çalıştırdığını yazmıştı. Herkes yanılıyordu.",
  },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "Yüzyıllar boyunca dünya bir yalana inandı. Büyük Piramit yapıldıktan iki bin yıl sonra yazan Yunan tarihçi Heredot, Firavun Khufu\u2019nun yüz bin kişiyi köle gibi çalıştırdığını iddia etti. Hollywood bu hikâyeye dört elle sarıldı. Zincirlere vurulmuş mahkûmlar, kamçı altında taş çeken figürler... Tevrat\u2019taki Mısır köleliği anlatısı da piramit efsanesine karıştı. Yirminci yüzyıla gelindiğinde piramitlerin acı üzerine kurulduğunu herkes \u201Cbiliyordu.\u201D Herkes yanılıyordu.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Derken 1990\u2019da bir turistin atı tökezledi. Sfenks\u2019in dört yüz metre güneyinde gezen bir Amerikalının atı, kumdan fırlayan alçak bir kerpiç duvara takıldı. Kalıntılarla dolu bir çölde sıradan bir harabe gibi görünüyordu. Ama o küçük tökezleme, dünyanın piramitleri kimin yaptığı hakkında bildiği her şeyi yerle bir edecekti.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Arkeologlar Mark Lehner ve Zahi Hawass kazılara başladı. Ortaya çıkan şey herkesi şaşkına çevirdi: kumun altında gömülü, planlı bir şehir. Yatakhaneler, fırınlar, bira imalathaneleri, balık işleme atölyeleri, bakır dökümhanesi ve ustalıkla tedavi edilmiş yaralanma izleri taşıyan bir hastane. Burası bir köle kampı değildi. Yirmi bin işçiyi barındırmak, karnını doyurmak ve en verimli şekilde çalıştırmak için tasarlanmış gerçek bir kasabaydı.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Bu işçiler sığır eti yiyordu \u2014 antik Mısır\u2019da bir kölenin rüyasında bile göremeyeceği bir lüks. Bol bol ekmek ve bira alıyorlardı; bunlar özgür Mısırlı işçilerin günlük tayınıydı. Yaralananlar gerçek tıbbi bakım görüyordu: kırılan kollar düzgünce sarılıyor, hatta bazı amputasyonlardan sonra yıllarca yaşamaya devam eden işçiler vardı. Kölelere bu kadar emek harcamazsın. Bu masrafı ancak değer verdiğin insanlar için yaparsın.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Ama asıl her şeyi kesinleştiren detay başkaydı. Birçok işçi, piramitlerin hemen yanı başında kendi mezarlarına gömülmüştü \u2014 küçük ama onurlu mezarlar. Antik Mısır\u2019da bir köleyi firavunun kutsal bedeninin yakınına gömmek düşünülemezdi. Üstelik bazı mezarlarda ekip isimleri yazılıydı: \u201CKhufu\u2019nun Dostları,\u201D \u201CFiravun Menkaure\u2019nin Sarhoşları.\u201D Bunlar acı çekenlerin isimleri değil. Dünyanın her yerinde, her çağda iş arkadaşlarının birbirine taktığı o bildiğimiz lakaplar \u2014 gururlu, şakacı, candan.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Gerçek tablo kimsenin beklemediği bir şeydi. Piramitler ulusal bir projeydi \u2014 bir ölüm cezası değil, askerlik benzeri bir görev. İşçiler Mısır\u2019ın dört bir yanından gelip üçer aylık vardiyalarla çalışıyordu; bu bir tür iş vergisiydi. Ekipler arasında yarış vardı, herkes zanaatıyla övünüyordu. Eve döndüklerinde medeniyetlerinin en kutsal yapısını inşa ettiklerini biliyorlardı. Bu bir ceza değildi. Sıradan bir Mısırlı\u2019nın tanrısallığa en çok yaklaşabildiği andı.",
          },
        },
      },
      {
        M: {
          text: {
            S: "\u201CYalanın mumu yatsıya kadar yanar\u201D derler. Bu yalanınki tam iki bin beş yüz yıl yandı \u2014 ta ki bir atın tökezlemesi onu söndürene kadar. Piramitler zulümle değil, inançla, ustalıkla ve akıl almaz bir organizasyonla yükseldi. Milyonlarca insan kamçıyla değil, kendi iradeleriyle taş taşıdı. Kendilerinden büyük bir şeyin parçası olmak için sıraya girdiler \u2014 ve kendilerinden sonra gelen her imparatorluktan daha uzun yaşayacak anıtlar diktiler.",
          },
        },
      },
    ],
  },
  moralOrLesson: {
    S: "Gerçeğin ortaya çıkması bin yıllar alabilir, ama asıl hikâye çoğu zaman yerine geçen efsaneden çok daha ilham vericidir.",
  },
  icon: { S: "⚒️" },
  tier: { S: "A" },
  source: {
    S: "Lehner, Mark. The Complete Pyramids. Thames & Hudson, 1997; Hawass, Zahi. Mountains of the Pharaohs, 2006",
  },
  characters: {
    L: [
      { S: "Mark Lehner (Arkeolog)" },
      { S: "Zahi Hawass (Ejiptolog)" },
      { S: "Piramit İşçileri" },
    ],
  },
  era: { S: "Eski Krallık (1990'da yeniden keşfedildi)" },
  readingTimeMinutes: { N: "3" },
  image: { S: "" },
  updatedAt: { N: String(Math.floor(Date.now() / 1000)) },
  disabled: { BOOL: false },
  thumbnail: { S: "" },
  coordinates: {
    M: {
      lng: { N: "31.135" },
      lat: { N: "29.971" },
    },
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "crowns_conquests" },
};

async function pushStory() {
  try {
    const command = new PutItemCommand({
      TableName: "Story",
      Item: item,
      ConditionExpression: "attribute_not_exists(siteId)",
    });

    const result = await client.send(command);
    console.log("SUCCESS: Turkish story pushed to DynamoDB");
    console.log("HTTP Status:", result.$metadata.httpStatusCode);
    console.log("siteId:", item.siteId.S);
    console.log("langStoryId:", item.langStoryId.S);
    console.log("title:", item.title.S);
  } catch (error) {
    if (error.name === "ConditionalCheckFailedException") {
      console.error("ERROR: Record already exists! Use update instead.");
    } else {
      console.error("ERROR:", error.message);
    }
    process.exit(1);
  }
}

pushStory();
