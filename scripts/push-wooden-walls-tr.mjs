import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "delphi" },
  langStoryId: { S: "tr#wooden-walls" },
  lang: { S: "tr" },
  storyId: { S: "wooden-walls" },
  title: { S: "Tahta Surlar" },
  subtitle: { S: "Yunanistan\u2019\u0131 Kurtaran Kehanet" },
  excerpt: {
    S: `MÖ 480. Dünyanın gördüğü en büyük ordu Yunanistan\u2019a doğru yürüyordu. Pers Kralı Kserkses o kadar devasa bir kuvvet toplamıştı ki antik yazarlar \u201Cgeçtiği yerde nehirler kurudu\u201D diye yazdı.`,
  },
  moralOrLesson: {
    S: `Aynı kâhin Kroisos\u2019u bir bilmeceyle mahvetti, Atina\u2019yı başka bir bilmeceyle kurtardı. Fark kehanette değildi \u2014 dinleyendeydi.`,
  },
  icon: { S: "\u2693" },
  tier: { S: "A" },
  source: {
    S: "Herodotus\u2019s Histories (Book 7, chapters 140-143), Plutarch\u2019s Life of Themistocles",
  },
  characters: {
    L: [
      { S: "Themistokles" },
      { S: "Pythia" },
      { S: "Kserkses" },
      { S: "Atina Meclisi" },
      { S: "Apollon" },
    ],
  },
  era: { S: "MÖ 480" },
  readingTimeMinutes: { N: "3" },
  image: { S: "" },
  disabled: { BOOL: false },
  thumbnail: { S: "" },
  coordinates: {
    M: {
      lng: { N: "22.501" },
      lat: { N: "38.4824" },
    },
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "crowns_conquests" },
  updatedAt: { N: `${Math.floor(Date.now() / 1000)}` },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: `MÖ 480. Dünyanın gördüğü en büyük ordu Yunanistan\u2019a doğru yürüyordu. Pers Kralı Kserkses o kadar devasa bir kuvvet toplamıştı ki antik yazarlar \u201Cgeçtiği yerde nehirler kurudu\u201D diye yazdı. Babası Darius on yıl önce Maraton\u2019da bozguna uğramıştı. Kserkses sıradan bir sefer planlamıyordu \u2014 bu bir intikam yürüyüşüydü.`,
          },
        },
      },
      {
        M: {
          text: {
            S: `Atina dehşet içindeydi. Yunanlılar büyük kriz anlarında hep aynı şeyi yapardı: Delphi\u2019deki kâhine haber salarlardı. Tanrı Apollon adına konuşan Pythia, antik dünyanın en güvenilen sesiydi. Ama gelen ilk kehanet yıkıcıydı: \u201CKaçın. Dünyanın öbür ucuna gidin. Sizi hiçbir şey kurtaramaz.\u201D Elçiler dönmeyi reddetti. Diz çöküp yalvardılar \u2014 tek bir umut kırıntısı istediler.`,
          },
        },
      },
      {
        M: {
          text: {
            S: `Pythia yeniden konuştu \u2014 bu sefer bir bilmeceyle. \u201CTahta surlar\u201D Atina\u2019yı koruyacaktı ve Salamis adasına \u201Ckutsal\u201D dedi. Yıkım geliyordu, bu kesindi. Ama bilmecenin içinde bir can simidi gizliydi. Atina\u2019nın bütün geleceği tek bir soruya bağlıydı: \u201CTahta surlar\u201D ne demekti?`,
          },
        },
      },
      {
        M: {
          text: {
            S: `Atina Meclisi karıştı. Yaşlı liderler net konuştu: tahta surlar, Akropolis\u2019in \u2014 Atina\u2019nın tepesindeki kale \u2014 çevresindeki ahşap çit demekti. Oraya sığının, gerisini tanrılara bırakın. Ama Themistokles adında bir komutan bu sözleri bambaşka türlü okuyordu. \u201CTahta surlar gemilerdir\u201D diye diretti. Atina zaten yepyeni bir donanma kurmuştu. Kâhin onlara şehri bırakıp denizde savaşmalarını söylüyordu.`,
          },
        },
      },
      {
        M: {
          text: {
            S: `Themistokles\u2019in elinde öldürücü bir koz vardı. Kâhin Salamis\u2019e \u201Ckutsal\u201D demişti \u2014 \u201Cacımasız\u201D değil, \u201Cölümcül\u201D değil. Eğer Yunanlılar orada ölecek olsalardı, çok daha karanlık bir sözcük seçerdi. \u201CKutsal\u201D zafer demekti. Meclis oylamaya gitti. Themistokles kazandı.`,
          },
        },
      },
      {
        M: {
          text: {
            S: `Atina tahliye edildi \u2014 bütün şehir. Kadınlar, çocuklar, yaşlılar, herkes Salamis Adası\u2019na kaçtı. Pers ordusu şehre girdi ve Akropolis\u2019teki kutsal tapınaklar dahil her şeyi ateşe verdi. Tam bir yıkım. Ama Themistokles tuzağını kurmuştu. Pers donanmasını Salamis çevresindeki dar sulara çekti. Koca Pers savaş gemileri orada manevra yapamıyordu. Daha küçük, daha çevik Yunan gemileri onları paramparça etti.`,
          },
        },
      },
      {
        M: {
          text: {
            S: `Tarihin en belirleyici deniz savaşlarından biriydi bu. \u201CTahta surlar\u201D \u2014 yani Atina donanması \u2014 sadece Atina\u2019yı değil, bütün Yunanistan\u2019ı kurtardı. Donanmasız kalan Kserkses ordusunu besleyemedi ve geri çekildi. Bir yıl içinde geride kalan Pers kuvvetleri Plataia Savaşı\u2019nda ezildi. İstila tamamen bitmişti.`,
          },
        },
      },
      {
        M: {
          text: {
            S: `Yıllar önce aynı kâhin Kral Kroisos\u2019a da bir bilmece söylemiş ve hayatını mahvetmişti. Şimdi başka bir bilmeceyle koca bir medeniyeti kurtardı. Fark kehanetin kendisinde değildi \u2014 dinleyendeydi. Kroisos duymak istediğini duydu; Themistokles ise gerçekten söyleneni. Akıl akıldan üstündür derler. Doğru \u2014 ama bazen asıl fark akılda değil, cesarettedir.`,
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
      ConditionExpression:
        "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
    });

    const result = await client.send(command);
    console.log("SUCCESS: Turkish story pushed to DynamoDB");
    console.log("HTTP Status:", result.$metadata.httpStatusCode);
  } catch (error) {
    if (error.name === "ConditionalCheckFailedException") {
      console.error("ERROR: Item already exists! Not overwriting.");
    } else {
      console.error("ERROR:", error.message);
    }
    process.exit(1);
  }
}

pushStory();
