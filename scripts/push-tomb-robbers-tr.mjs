import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "valley-of-the-kings" },
  langStoryId: { S: "tr#tomb-robbers-trials" },
  lang: { S: "tr" },
  storyId: { S: "tomb-robbers-trials" },
  title: { S: "Kutsal Soygun" },
  subtitle: { S: "\"Mezarları soymaya gittik, her zamanki gibi\"" },
  excerpt: {
    S: "Mısır, milattan önce 1110 civarı. Firavunlar yüzyıllardır ölülerini Krallar Vadisi'ne gömüyor \u2014 yeraltı odalarını altınla, mücevherle, her türlü hazineyle doldurup kapatıyorlar. Ama Ramses IX tahta geçtiğinde devlet çökmüş durumda. Hasatlar berbat, işçilere aylardır para ödenmiyor.",
  },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "Mısır, milattan önce 1110 civarı. Firavunlar yüzyıllardır ölülerini Krallar Vadisi'ne gömüyor \u2014 yeraltı odalarını altınla, mücevherle, tanrı-kralın öbür dünyada lazım olabilecek her şeyle doldurup kapatıyorlar. Ama Ramses IX tahta geçtiğinde devlet çökmüş durumda. Hasatlar berbat, işçilere aylardır para ödenmiyor. Teb şehrinin en yoksul mahallelerinin tam karşısında ise sıradan birinin ömür boyu göremeyeceği kadar altın toprağın altında yatıyor. Olan olacaktı.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Fitili ateşleyen, birbirine düşman iki şehir yöneticisi oldu. Doğu Teb'in yöneticisi Paser, batı yakasındaki \u2014 yani kraliyet mezarlarının bulunduğu \u2014 bölgenin başındaki Pawera'yı suçladı: hırsızlara göz yumuyorsun, hatta belki payını da alıyorsun. Bu sıradan bir siyasi kavga değildi. Eski Mısır'da firavunun mezarı, bugün hayal edemeyeceğimiz kadar kutsaldı. Bir kraliyet mezarını soymak basit hırsızlık değildi \u2014 evrenin düzenine karşı işlenmiş bir suçtu.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Devlet soruşturma heyeti gönderdi. Buldukları manzara korkunçtu. Mezar üstüne mezar kırılmış. Tabutlar parçalanmış. Mumyalar açılıp üzerlerindeki son yüzüğe, son muskaya, son altın parçasına kadar soyulmuş. Sonsuza dek korunması gereken hazineler sokak pazarlarında satılmış. Soruşturma işçi köylerine uzandıkça iş büyüdü. Taş ustaları, rahipler, muhafızlar, hatta bu mezarları korumakla görevli memurlar \u2014 hepsi işin içindeydi.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Ardından gelen davalar, tarihin en çarpıcı mahkeme tutanaklarını geride bıraktı. Bazıları kendi isteğiyle konuştu. Diğerlerinden itirafı zorla aldılar \u2014 konuşana kadar ayak tabanlarına sopayla vuruyorlardı. En ünlü itiraf, Amenpnufer adlı bir taş ustasından geldi. Adam, Firavun Sobekemsaf'ın mezarına girişini öyle sakin anlattı ki sanırsınız sabah ne yediğinden bahsediyor.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Sözleri üç bin yıldır papirüs üzerinde duruyor: \"Mezarları soymaya gittik, her zamanki gibi. Tanrıyı mezar odasının arkasında bulduk. Altınlarını, muskalarını, mücevherlerini topladık. Tabutlarını ateşe verdik.\" Her zamanki gibi. Sanki bakkala ekmek almaya gitmiş gibi anlatıyor. Ekip altını sekize böldü, eşit paylar halinde. Bu çaresiz insanların son hamlesi değildi \u2014 antik dünyanın organize suç örgütüydü.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Elebaşları büyük ihtimalle idam edildi. Ama soygunlar bir gün bile durmadı. Ekonomi çöküyordu ve batı Teb'in aç kalan işçileri için kraliyet altını yaşamla ölüm arasındaki tek fark demekti. Derler ya, sabrın sonu selamettir \u2014 ama o işçiler için sabrın sonu selamet değil, firavunun mezarıydı. Sonunda rahipler pes etti. Mezarları savunmayı bırakıp mumyaları gizlice çıkardılar ve öyle iyi sakladılar ki yaklaşık üç bin yıl boyunca kimse bulamadı.",
          },
        },
      },
      {
        M: {
          text: {
            S: "O gizli depolar 1800'lerde keşfedildiğinde ortaya inanılmaz bir manzara çıktı. Mısır'ın en efsanevi firavunları \u2014 Büyük Ramses, I. Seti, III. Tutmose \u2014 sade tabutlarda üst üste yığılmış halde duruyordu. Hazinelerinden eser yoktu ama bedenleri sapasağlamdı. Rahipler, firavunları kendi halklarından saklayarak tamamen yok olmaktan kurtarmıştı.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Üç bin yıl önce sıradan bir taş ustası dünyanın en kutsal mezarlarına baktı ve omuz silkti: bu altın ölülerin ne işine yarayacak? Mezar Soygunu Papirüsleri bize acı bir gerçeği hatırlatıyor \u2014 hiçbir hazine, ne kadar kutsal olursa olsun, yeterince aç insanlardan güvende kalamaz. Koruyucu ile hırsız arasındaki çizgi ise her zaman sandığımızdan çok daha incedir.",
          },
        },
      },
    ],
  },
  moralOrLesson: {
    S: "Hiçbir hazine, ne kadar kutsal olursa olsun, yeterince aç insanlardan güvende kalamaz \u2014 ve koruyucu ile hırsız arasındaki çizgi, her zaman sandığımızdan çok daha incedir.",
  },
  icon: { S: "\uD83D\uDCDC" },
  tier: { S: "A" },
  source: {
    S: "Peet, T. Eric. The Great Tomb Robberies of the Twentieth Egyptian Dynasty. Oxford, 1930; Papyrus Abbott, British Museum",
  },
  characters: {
    L: [
      { S: "Amenpnufer (Tomb Robber)" },
      { S: "Paser (Mayor of East Thebes)" },
      { S: "Pawera (Mayor of West Thebes)" },
      { S: "Ramesses IX (Pharaoh)" },
    ],
  },
  era: { S: "Late New Kingdom (c. 1110 BC)" },
  readingTimeMinutes: { N: "4" },
  image: { S: "" },
  updatedAt: { N: "1773582279" },
  disabled: { BOOL: false },
  thumbnail: { S: "" },
  coordinates: {
    M: {
      lng: { N: "32.6014" },
      lat: { N: "25.7402" },
    },
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "ghosts_curses" },
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
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log("Record already exists. Overwriting...");
      const cmd2 = new PutItemCommand({
        TableName: "Story",
        Item: item,
      });
      const result2 = await client.send(cmd2);
      console.log("SUCCESS: Turkish story overwritten in DynamoDB");
      console.log("HTTP Status:", result2.$metadata.httpStatusCode);
    } else {
      console.error("FAILED:", err.message);
      process.exit(1);
    }
  }
}

push();
