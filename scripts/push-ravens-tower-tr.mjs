import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "tower-of-london" },
  langStoryId: { S: "tr#ravens-of-the-tower" },
  lang: { S: "tr" },
  storyId: { S: "ravens-of-the-tower" },
  title: { S: "Kale'nin Kuzgunları" },
  subtitle: { S: "Bir krallığı kuşlarına bağlayan kehanet" },
  excerpt: {
    S: "Şu an, Fatih William'ın yaklaşık bin yıl önce inşa ettirdiği devasa kalenin bahçesinde altı simsiyah kuzgun oturuyor — sanki oranın sahibi onlar. Bir bakıma öyle de.",
  },
  moralOrLesson: {
    S: "Bazı hikâyeler mantıktan güçlüdür — sembollere inanmayı bıraktığın an, temsil ettikleri şeyi de kaybedersin",
  },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "Şu an, Fatih William'ın yaklaşık bin yıl önce inşa ettirdiği devasa kalenin bahçesinde altı simsiyah kuzgun oturuyor — sanki oranın sahibi onlar. Bir bakıma öyle de. Kimsenin tam olarak ne zaman ortaya çıktığını bilmediği eski bir kehanet var: kuzgunlar Kale'den ayrılırsa taç düşer, İngiltere yıkılır. Kulağa saçma geliyor, değil mi? Ama İngiliz hükümeti üç yüz yılı aşkın süredir bu riski almayı reddediyor.",
          },
        },
      },
      {
        M: {
          text: {
            S: "İlk sınav 1670'lerde geldi. Kral II. Charles'ın Baş Astronomu John Flamsteed, Kale'nin içine teleskobunu kurmuştu ama kuzgunlar hayatı zindan ediyordu. Aletlerin üstüne pisliyor, gürültüden çalışmayı imkânsız kılıyorlardı. Flamsteed kuşların gitmesini istedi. Ama Charles kehaneti duyunca tarihe geçecek bir karar verdi: kuzgunlar kaldı, astronom taşındı. Flamsteed Greenwich'e gönderildi. Bugün hâlâ ayakta olan Kraliyet Gözlemevi'nin yeri, bir avuç gürültücü kuş yüzünden belirlenmişti.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Ondan sonra kuzgunlar bir daha sorgulanmadı. Yüzyıllar boyunca Kale'ye özel bakıcılar atandı; eski bir batıl inanç, resmi devlet politikasına dönüştü. İri, simsiyah, parlak tüylü kuşlar o avluda üç yüz yıldan fazla yaşadı. Krallar değişti, savaşlar geldi geçti, İngiliz İmparatorluğu kuruldu ve çöktü. Kuzgunlar hepsinden uzun ömürlü çıktı. Kehanet artık \"inanıyor musun\" sorusu olmaktan çıkmıştı. İşin bir parçasıydı, o kadar.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Kehanetin gerçek sınavı İkinci Dünya Savaşı'nda geldi. 1940-41'de Londra'yı yerle bir eden Alman bombardımanı — tarihe \"Blitz\" olarak geçen o korkunç hava saldırıları — Kale'yi de vurdu. Kuzgunlar ya kaçtı ya öldü. Savaş bittiğinde ayakta tek kuş kalmıştı: Grip. Öyle sarsılmıştı ki bulunduğu yerden kıpırdamıyordu. Churchill durumu öğrenince emri anında verdi: derhal yenilerini getirin. Çok iyi biliyordu — kehanetin gerçekleşmesine göz yumarsan, bombaların asla kıramayacağı bir şeyi kırarsın.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Bugün Kale'de tam yedi kuzgun yaşıyor — altısı kehanet gereği, biri yedek. Her kuşun bir adı, bir karakteri ve kendine has hayran kitlesi var. Jubilee ve Harris gibi belalılar, ziyaretçilerin elindeki sandviçleri kapıp kaçmakla ünlüydü. Bir de Merlina vardı — asi, bağımsız, kurallara uymayan bir kuzgun. 2021'in başında ortadan kaybolduğunda ülke adeta yas tuttu. Bu kuşlar isimlerine cevap veriyor, oyun oynuyor; bazıları turistlere \"hello\" demeyi bile öğrenmiş.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Hepsinin sorumlusu tek bir kişi: Kuzgun Ustası. Kale'nin tören muhafızlarından özel olarak görevlendirilmiş bir Yeoman Warder. Kuşları çiğ et, kana batırılmış bisküvi ve arada bir yumurtayla besliyor. Uçuş tüylerini kesiyor ki etrafta süzülebilsinler ama kaçamasınlar. Her kuşun karakterini, tuhaf alışkanlıklarını ve hayat hikâyesini onlarca yıl geriye giden bir deftere kaydediyor. Bu bir resmi belge değil. Daha çok kuzgun mürekkebiyle yazılmış bir aile hatıra defteri.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Ve belki de mesele tam olarak bu. Kimse bir avuç kuşun İngiliz tahtını ayakta tuttuğuna gerçekten inanmıyor. Ama kimse de denemeye cesaret edemiyor. Ateş olmayan yerden duman çıkmaz, derler bizde. İngilizler bir adım öteye geçti: duman çıkmasın diye ateşin başına bekçi koydular. Çünkü bin yıllık geleneğin üzerine kurulmuş bir ülke şunu çok iyi bilir — sembollere inanmayı bıraktığın an, temsil ettikleri şeyi de kaybedersin.",
          },
        },
      },
    ],
  },
  characters: {
    L: [
      { S: "II. Charles - Astronomi yerine kuzgunları seçen kral" },
      { S: "John Flamsteed - Kuşlar yüzünden taşınan ilk Baş Astronom" },
      {
        S: "Winston Churchill - Savaş sırasında kuzgunların yenilenmesini emreden başbakan",
      },
      { S: "Grip - Blitz'den sağ kurtulan tek kuzgun" },
      { S: "Merlina - 2021'de ortadan kaybolan sevilen kuzgun" },
      { S: "Kuzgun Ustası - Kuşlara adanmış özel muhafız" },
    ],
  },
  icon: { S: "🐦‍⬛" },
  tier: { S: "A" },
  source: {
    S: "Tower of London official history, Ravenmaster Christopher Skaife's memoir \"The Ravenmaster\", Historic Royal Palaces archives, Churchill war cabinet records",
  },
  era: { S: "Ancient prophecy - Present day" },
  readingTimeMinutes: { N: "3" },
  image: { S: "" },
  updatedAt: { N: "1773494787" },
  disabled: { BOOL: false },
  thumbnail: { S: "" },
  coordinates: {
    M: {
      lng: { N: "-0.0763" },
      lat: { N: "51.5085" },
    },
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "gods_monsters" },
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
    console.log("langStoryId: tr#ravens-of-the-tower");
    console.log("siteId: tower-of-london");
  } catch (error) {
    console.error("FAILED:", error.message);
    process.exit(1);
  }
}

push();
