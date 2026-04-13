import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "auschwitz-birkenau" },
  langStoryId: { S: "tr#last-letters" },
  lang: { S: "tr" },
  storyId: { S: "last-letters" },
  title: { S: "Son Mektuplar" },
  subtitle: { S: "Karanlığın içinden süzülen sesler \u2014 geri dönmeyeceklerini bilenlerin son sözleri" },
  excerpt: { S: "Naziler Auschwitz\u2019i yalnızca öldürmek için kurmadı. Asıl hedef çok daha karanlıktı: insanları dünyadan silmek. Tamamen. Her mahkumun adı bir numarayla değiştirildi. Her ceset yakıldı, küller rüzg\u00e2ra savuruldu. Ne mezar kaldı, ne işaret, ne iz. \u201cNihai Çözüm\u201d sadece bir soykırım değildi. Hedef, dünyanın bu insanların var olduğunu bile unutmasıydı." },
  icon: { S: "📝" },
  tier: { S: "A" },
  era: { S: "World War II (1940-1945)" },
  readingTimeMinutes: { N: "3" },
  image: { S: "" },
  thumbnail: { S: "" },
  disabled: { BOOL: false },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "lost_found" },
  source: { S: "Auschwitz-Birkenau Memorial archives; Yad Vashem; United States Holocaust Memorial Museum; Polish Underground State archives" },
  coordinates: {
    M: {
      lng: { N: "19.1783" },
      lat: { N: "50.0343" },
    },
  },
  characters: {
    L: [
      { S: "Anonymous prisoners" },
      { S: "Zalmen Gradowski" },
      { S: "Lejb Langfus" },
      { S: "Zalmen Lewental" },
      { S: "Polish resistance couriers" },
    ],
  },
  updatedAt: { N: "1772115808" },
  moralOrLesson: { S: "Söz, yok edilmeye karşı en güçlü silahtır. Tek bir mektup, bir duvara kazınan isim, küllerin arasına gömülen bir tanıklık \u2014 tarihin en büyük ölüm makinesinden bile uzun yaşayabilir." },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "Naziler Auschwitz\u2019i yalnızca öldürmek için kurmadı. Asıl hedef çok daha karanlıktı: insanları dünyadan silmek. Tamamen. Her mahkumun adı bir numarayla değiştirildi. Her ceset yakıldı, küller rüzg\u00e2ra savuruldu. Ne mezar kaldı, ne işaret, ne iz. \u201cNihai Çözüm\u201d \u2014 Nazilerin Avrupa Yahudilerini yok etme planı \u2014 sadece bir soykırım değildi. Hedef, dünyanın bu insanların var olduğunu bile unutmasıydı.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Ama mahkumlar teslim olmadı. Ellerindeki tek silahla savaştılar: kelimelerle. 1940\u2019tan 1945\u2019e kadar Auschwitz\u2019ten mektuplar ve notlar gizlice dışarı çıkarıldı. Sivil işçiler, Polonyalı aileler, yeraltı direniş savaşçıları \u2014 hepsi bu ağın parçasıydı. Mesajlar yemek kaplarının içine saklandı, çamaşırlara dikildi, dikenli tellerin arasından sızdırıldı. Yakalanan herkesin cezası ölümdü. Ama her mektup, Nazilerin sonsuza dek susturmak istediği bir sesin son nefesiydi.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Günümüze ulaşan mektuplar Avrupa\u2019nın her dilinde yazılmış: Lehçe, Yidiş, Macarca, Fransızca, Yunanca, Felemenkçe, Çekçe. Bazıları yırtık k\u00e2ğıt parçalarına aceleyle karalanmış. Bazılarıysa sakin, düşünülmüş vedalar \u2014 başlarına gelecekleri bilen insanların, son saatlerini tek bir amaç için harcadığı satırlar: bir yerlerde biri burada ne olduğunu bilsin, öğrensin, unutmasın diye.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Bir annenin mektubu Polonya direniş ağı aracılığıyla dışarı çıkarılmış. Şöyle yazıyor: \u201cCanım yavrularım, dönüşü olmayan bir yere gidiyorum. Birbirinize iyi davranın. Babanıza sahip çıkın. Annenizin sizi hayattan çok sevdiğini unutmayın. Cesur olun yavrularım. Benim için ağlamayın. Ben cennetten size bakacağım.\u201d Annenin adını kimse bilmiyor. Mektubu, sürgün treninden atılan bir k\u00e2ğıt parçası olarak bir Polonyalı demiryolcu bulmuş ve yeraltına ulaştırmış.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Bir baba kardeşine yazıyor: \u201cBizi doğuya götürüyorlar. Doğunun ne demek olduğunu biliyoruz. Saatimi bir gardiyana verdim, bu mektubu postalayacağına söz verdi \u2014 büyük ihtimalle yapmayacak. Ama mucize eseri bu satırları okursan, çocuklarıma söyle: babaları dik durarak öldü.\u201d On altı yaşında bir kız, ekmek k\u00e2ğıdının arkasına yazmış: \u201cBugün doğum günüm. Pasta yok, mum yok, şarkı yok. Bunu bulan her kimse, lütfen bilin: adım Hannah\u2019ydı. Ben gerçektim. Ben vardım.\u201d",
          },
        },
      },
      {
        M: {
          text: {
            S: "En yürek parçalayan tanıklıklar Sonderkommando\u2019lardan geldi \u2014 yani Nazilerin gaz odalarında ve krematoryumlarda çalışmaya zorladığı mahkumlardan. Zalmen Gradowski, Lejb Langfus, Zalmen Lewental gibi isimler yaşadıklarını Yidiş dilinde kaleme aldı ve cam kavanozlara koyup krematoryumların yakınına gömdü. Yakında öldürüleceklerini biliyorlardı. Sözlerini ölülerin külleri arasına sakladılar \u2014 ve bir gün birilerinin bulacağını umut ettiler. Savaştan sonra birkaçı topraktan çıkarıldı.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Bu mektuplar sadece birer veda değildi. Birçoğu katliamın ayrıntılı görgü tanığı anlatımlarını içeriyordu: tren platformundaki seçimler, gaz odaları, krematoryumlar. Müttefik hükümetler raporlara inanmayı reddederken, bu satırlar soykırımın ink\u00e2r edilemez kanıtını oluşturdu. Polonya direniş örgütü belgeleri Londra\u2019ya ulaştırdı ve Holokost\u2019u ink\u00e2r etmeyi imk\u00e2nsız kılan kanıt dosyası böyle inşa edildi.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Bugün hayatta kalan mektuplar Auschwitz-Birkenau Anıt Alanı\u2019nda, Kudüs\u2019teki Yad Vaşem\u2019de ve Washington\u2019daki Holokost Müzesi\u2019nde camların ardında duruyor. K\u00e2ğıtlar sararmış. Mürekkep soluyor. Ama sesler h\u00e2l\u00e2 orada \u2014 kırılmamış, susturulamamış. Derler ya, yazılmışsa bozulmaz. Naziler kaderi değil k\u00e2ğıdı yok etmeye çalıştı \u2014 ama başaramadı. Kurbanlarının her izini silmek için kurulan bu yerde, birkaç parça k\u00e2ğıt bütün bir ölüm makinesinin yapamadığını yaptı: ölüleri insan olarak yaşattı.",
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
      ConditionExpression: "attribute_not_exists(siteId)",
    });
    const result = await client.send(command);
    console.log("SUCCESS: Turkish story pushed to DynamoDB");
    console.log("HTTP Status:", result.$metadata.httpStatusCode);
  } catch (error) {
    if (error.name === "ConditionalCheckFailedException") {
      console.error("ERROR: Record already exists for tr#last-letters");
    } else {
      console.error("ERROR:", error.message);
    }
    process.exit(1);
  }
}

pushStory();
