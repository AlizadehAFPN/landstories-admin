import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "varanasi" },
  langStoryId: { S: "tr#oldest-living-city" },
  lang: { S: "tr" },
  storyId: { S: "oldest-living-city" },
  title: { S: "Ölmeyen Şehir" },
  subtitle: {
    S: "Tarihten eski, efsaneden eski \u2014 üç bin yıldır aynı nehir kıyısında dua eden ve ölülerini yakan şehir",
  },
  excerpt: {
    S: "Mark Twain bu şehir için \"tarihten eski, gelenekten eski, efsaneden bile eski\" demişti. Abartmıyordu.",
  },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "Mark Twain 1896\u2019da Ganj Nehri\u2019nde bir tekneye bindiğinde gördükleri karşısında donup kaldı. \"Tarihten eski, gelenekten eski, efsaneden bile eski\" diye yazdı, \"ve hepsinin toplamından iki kat daha yaşlı görünüyor.\" Nehre inen yüzlerce taş basamak, üst üste yığılmış tapınaklar, yüzyıllardır hiç sönmemiş cenaze ateşleri. Hepsi Twain\u2019den binlerce yıl önce de oradaydı. Dünyanın en eski şehri olduğunu iddia eden çok yer var. Ama Varanasi başka bir şey söylüyor: o hiçbir zaman kendisi olmayı bırakmadı.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Arkeologlar iki nehrin kavuştuğu noktada kazı yaptıklarında, MÖ 1800\u2019lere ait çanak çömlek buldular. O katmanın altında hiçbir şey yok. Üstünde ise katman üstüne katman \u2014 Hint tarihinin her dönemi, topraktan ve taştan bir zaman çizelgesi gibi üst üste dizilmiş. Arada boşluk yok. Terk edilme yok. Sessizlik yok. İnsanlığın en eski kutsal metinlerinden Rigveda, bu yere \"Kaşi\" diyor \u2014 Işık Şehri. Başka kadim şehirler terk edilip yüzyıllar sonra yeniden keşfedilirken, Kaşi hiç sönmedi.",
          },
        },
      },
      {
        M: {
          text: {
            S: "MÖ 528 civarında Buda, Varanasi\u2019nin hemen dışındaki Sarnath\u2019a yürüyerek geldi ve ilk vaazını burada verdi. Yeri rastgele seçmemişti \u2014 Varanasi o çağda bilinen dünyanın düşünce başkentiydi. Karşısında, kendisinden çoktan umudunu kesmiş beş öğrencisi vardı. Onlara Asya\u2019nın yarısını değiştirecek fikirleri anlattı: Orta Yol, Dört Yüce Gerçek, acıyı sona erdirmenin yolu. Şehir, Budizm\u2019in doğuşuna tanıklık ettiğinde zaten bin yaşındaydı.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Fatihler Varanasi\u2019ye defalarca geldi. 1194\u2019te istilacılar yaklaşık bin tapınağı yerle bir etti. 1669\u2019da Babür İmparatoru Evrengzib, Hindistan\u2019ın en kutsal Şiva tapınağını yıktırıp temelleri üzerine cami diktirdi. Şehrin adını bile değiştirdi. Kimse yeni adı kullanmadı. Sonra 1780\u2019de Ahilyabai Holkar adında bir savaşçı kraliçe, hemen yanına yepyeni bir tapınak inşa ettirdi. Bir Sih kralı da kubbesini altınla kaplattı. Hindu kraliçe dikti, Sih kral taçlandırdı. Şehir her seferinde ayağa kalktı \u2014 her seferinde daha parlak.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Varanasi\u2019yi asıl farklı kılan şey şu: Hindu kutsal metinlerine göre şehir, Şiva\u2019nın üç dişli mızrağının ucunda asılı duruyor \u2014 yer ile gök arasında. Evren yok edildiğinde Şiva şehri suyun üstüne kaldıracak. Kutsal olan binalar değil, toprağın kendisi. \"Ateş düştüğü yeri yakar\" derler ya \u2014 ateş bu şehre bin kere düştü ama yakamadı. Tapınağı yıkabilirsin, ama üzerinde durduğu toprağı yok edemezsin. Varanasi\u2019nin sırrı bu.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Ama Varanasi bir müze değil. Öyle dar sokaklarda yürürsünüz ki iki kişi zor geçer \u2014 ve aynı anda inekler, motosikletler, cenaze alayları ve okula koşan çocuklarla karşılaşırsınız. Burası dünyaya Kabir\u2019i veren şehir: sözleri yüzyıllar sonra hâlâ Hindular, Müslümanlar ve Sihler tarafından tekrarlanan isyankâr ozan. Burası, Bismillah Khan\u2019ın yetmiş yıl boyunca her şafakta Ganj kıyısında müzik çaldığı ve \"Nehrimden ve Tanrımdan asla ayrılamam\" dediği yer.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Her akşam Daşaşvamedh Ghat\u2019ta \u2014 nehre inen o devasa taş basamaklarda \u2014 rahipler karanlığın içinde kocaman pirinç kandilleri sallar; binlerce kişi basamaklardan ve suyun üzerindeki teknelerden izler. Her sabah, güneş karşı kıyıdan yükselmeden, insanlar alacakaranlıkta nehre iner. Ve şehir, üç bin yıldır her gün yaptığı şeyi yapar: yüzünü suya döner, dua eder, ölülerini yakar ve yaşar.",
          },
        },
      },
    ],
  },
  moralOrLesson: {
    S: "Bir şehir üç bin yıl boyunca duvarlarıyla ya da ordularıyla ayakta kalmaz \u2014 insanların ruhunda ne anlama geldiğiyle kalır. En uzun yaşayan yerler taştan yapılanlar değil, her neslin kendi iradesiyle yeniden kurmayı seçtiği bir fikrin üzerine inşa edilenlerdir.",
  },
  icon: { S: "\uD83D\uDD49\uFE0F" },
  tier: { S: "S" },
  source: {
    S: "Twain, Mark. Following the Equator, 1897, Ch. LVIII; Eck, Diana L. Banaras: City of Light, Princeton University Press, 1982; Narain, A.K. and Roy, T.N. Excavations at Rajghat, Banaras Hindu University, 1976; Skanda Purana, Kashi Khanda (12th-14th century CE); Dhammacakkappavattana Sutta (Samyutta Nikaya 56.11); Xuanzang, Da Tang Xiyu Ji (Great Tang Records on the Western Regions, 7th century CE)",
  },
  characters: {
    L: [
      { S: "Mark Twain (American author who visited in 1896)" },
      { S: "The Buddha (Siddhartha Gautama, who preached at nearby Sarnath)" },
      { S: "Xuanzang (Chinese Buddhist pilgrim, 7th century CE)" },
      { S: "Ustad Bismillah Khan (shehnai maestro, 1916-2006)" },
      { S: "Kabir (mystic poet-weaver, c. 1398-1518)" },
      { S: "Tulsidas (author of the Ramcharitmanas, c. 1532-1623)" },
    ],
  },
  era: {
    S: "c. 1800 BCE – present (over 3,000 years of continuous habitation)",
  },
  readingTimeMinutes: { N: "3" },
  image: { S: "" },
  updatedAt: { N: "1773433406" },
  disabled: { BOOL: false },
  thumbnail: { S: "" },
  coordinates: {
    M: {
      lat: { N: "25.3109" },
      lng: { N: "83.0107" },
    },
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "place_names" },
};

async function push() {
  try {
    const cmd = new PutItemCommand({
      TableName: "Story",
      Item: item,
      ConditionExpression: "attribute_not_exists(siteId)",
    });
    const result = await client.send(cmd);
    console.log("SUCCESS: Turkish story pushed to DynamoDB");
    console.log("HTTP Status:", result.$metadata.httpStatusCode);
    console.log("Key: siteId=varanasi, langStoryId=tr#oldest-living-city");
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.error("ERROR: Record already exists! Aborting to avoid overwrite.");
    } else {
      console.error("ERROR:", err.message);
    }
    process.exit(1);
  }
}

push();
