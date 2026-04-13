import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "palmyra" },
  langStoryId: { S: "tr#zenobia-queen-who-defied-rome" },
  lang: { S: "tr" },
  storyId: { S: "zenobia-queen-who-defied-rome" },
  title: { S: "Roma\u2019ya Diz \u00c7\u00f6kmeyen Krali\u00e7e" },
  subtitle: {
    S: "Bir Palmira krali\u00e7esi Roma \u0130mparatorlu\u011fu\u2019nun \u00fc\u00e7te birini fethetti, z\u0131rh ku\u015fan\u0131p sava\u015fa at s\u00fcrd\u00fc \u2014 ve onu yenen imparator bile sayg\u0131yla s\u00f6z etmek zorunda kald\u0131",
  },
  excerpt: {
    S: "Y\u0131l 267. Emesa\u2019n\u0131n ziyafet salonlar\u0131nda bir kral ve b\u00fcy\u00fck o\u011flu katledildi. O kan\u0131n g\u00f6lgesinden bir kad\u0131n \u00e7\u0131kt\u0131 \u2014 ve Nil\u2019den Anadolu\u2019ya uzanan bir imparatorluk kuracakt\u0131.",
  },
  icon: { S: "\ud83d\udc51" },
  tier: { S: "S" },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "Y\u0131l 267, yer Suriye\u2019deki Emesa \u015fehri. Bir ziyafet sofras\u0131nda Roma\u2019n\u0131n Do\u011fu\u2019daki en g\u00fc\u00e7l\u00fc adam\u0131 katledildi. Sava\u015f\u00e7\u0131 kral Septimius Odaenathus, b\u00fcy\u00fck o\u011fluyla birlikte kendi ye\u011feninin b\u0131\u00e7a\u011f\u0131na kurban gitti \u2014 sebebi mi? Kaynaklara g\u00f6re s\u0131radan bir kin. Ama hik\u00e2yenin as\u0131l ba\u015flad\u0131\u011f\u0131 yer, o kan banyosundan sapasa\u011flam \u00e7\u0131kan kad\u0131n. Ad\u0131 Zenobia. Ve antik d\u00fcnyan\u0131n tan\u0131d\u0131\u011f\u0131 en tehlikeli kad\u0131n olmak \u00fczereydi.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Antik kaynaklar\u0131n hepsinde ayn\u0131 \u015fa\u015fk\u0131nl\u0131k var \u2014 sanki b\u00f6yle bir kad\u0131n var olmamal\u0131yd\u0131. D\u00f6rt dil biliyordu. D\u00f6nemin en b\u00fcy\u00fck d\u00fc\u015f\u00fcn\u00fcrlerinden biriyle felsefe okumu\u015ftu. Ordusunun \u00f6n\u00fcnde at s\u00fcrer, askerleriyle kilometrelerce y\u00fcr\u00fcr, sofrada Pers krallar\u0131n\u0131 i\u00e7kide masan\u0131n alt\u0131na yollard\u0131. Soyunu Kleopatra\u2019ya dayand\u0131r\u0131yordu. Kocas\u0131 \u00f6ld\u00fc\u011f\u00fcnde tahtta bebe\u011fi oturuyordu \u2014 ama y\u00f6neten, kararlar\u0131 alan, g\u00fcc\u00fc elinde tutan Zenobia\u2019yd\u0131.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Sonra kimsenin beklemedi\u011fi hamleyi yapt\u0131. 270 y\u0131l\u0131nda yetmi\u015f bin askerini g\u00fcneye, M\u0131s\u0131r\u2019a s\u00fcrd\u00fc \u2014 Roma \u015fehrini besleyen tah\u0131l\u0131n geldi\u011fi topraklara. Roma kuvvetlerini ezdi ge\u00e7ti, antik d\u00fcnyan\u0131n en zengin eyaletini eline ald\u0131. Ayn\u0131 anda ordular\u0131 kuzeyde Suriye\u2019yi a\u015f\u0131p bug\u00fcnk\u00fc T\u00fcrkiye topraklar\u0131n\u0131n derinliklerine kadar yay\u0131ld\u0131. Zirvedeyken imparatorlu\u011fu Roma\u2019n\u0131n \u00fc\u00e7te birini kapl\u0131yordu. Paralara kendi y\u00fcz\u00fcn\u00fc bast\u0131rd\u0131, imparatorunkini kald\u0131rd\u0131. Bu h\u0131rs de\u011fildi. Bu sava\u015f ilan\u0131yd\u0131.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Roma\u2019n\u0131n cevab\u0131 a\u011f\u0131r oldu. \u0130mparator Aurelianus \u2014 imparatorlu\u011fun bat\u0131s\u0131n\u0131 tek ba\u015f\u0131na toparlayan ac\u0131mas\u0131z bir asker \u2014 272\u2019de do\u011fuya y\u00fcr\u00fcd\u00fc. Zenobia tarihin en cesur mektuplar\u0131ndan birini g\u00f6nderdi: \u2018Teslim olmam\u0131 istiyorsun \u2014 sanki Kleopatra\u2019n\u0131n ya\u015famaktansa krali\u00e7e olarak \u00f6lmeyi se\u00e7ti\u011finden haberin yokmu\u015f gibi.\u2019 Aurelianus ald\u0131rmad\u0131. Z\u0131rhl\u0131 s\u00fcvarilerini hafif atl\u0131lar\u0131n\u0131n pe\u015fine tak\u0131p Suriye g\u00fcne\u015finde ko\u015fturdu \u2014 s\u0131cak, k\u0131l\u0131\u00e7lar\u0131n yapamad\u0131\u011f\u0131n\u0131 yapt\u0131. Ordu parampar\u00e7a oldu. Zenobia Palmira\u2019ya ka\u00e7t\u0131.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Aurelianus Palmira\u2019y\u0131 ku\u015fat\u0131p bekledi. Surlar\u0131n i\u00e7inde yiyecek t\u00fckendi. Zenobia\u2019n\u0131n bel ba\u011flad\u0131\u011f\u0131 Pers takviye kuvvetleri asla gelmedi. \u0130\u015fin bitti\u011fini anlay\u0131nca bir gece karanl\u0131\u011f\u0131nda, \u00e7\u00f6l\u00fcn en h\u0131zl\u0131 hayvan\u0131 bir yar\u0131\u015f devesinin s\u0131rt\u0131nda F\u0131rat Nehri\u2019ne do\u011fru s\u00fcrd\u00fc \u2014 nehrin \u00f6tesinde Pers topraklar\u0131 ve \u00f6zg\u00fcrl\u00fck vard\u0131. Roma s\u00fcvarileri onu tam k\u0131y\u0131da, bir tekneye binerken yakalad\u0131. Bir aya\u011f\u0131 suda, di\u011feri tarihte \u2014 \u00f6yle yakaland\u0131.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Sonras\u0131 m\u0131? Kime sordu\u011funa ba\u011fl\u0131. Bir Roma kayna\u011f\u0131na g\u00f6re alt\u0131n zincirlerle Roma sokaklar\u0131nda gezdirildi \u2014 zincirler \u00f6yle m\u00fccevherlerle doluydu ki hizmet\u00e7iler ta\u015f\u0131mas\u0131na yard\u0131m etmek zorunda kald\u0131. Sonra bir k\u00f6\u015fkte, senat\u00f6r kar\u0131s\u0131 olarak sessizce ya\u015fad\u0131. Ba\u015fka bir kaynak, yolda kendini a\u00e7 b\u0131rakarak \u00f6ld\u00fc\u011f\u00fcn\u00fc s\u00f6yler \u2014 t\u0131pk\u0131 soyundan geldi\u011fini iddia etti\u011fi Kleopatra gibi. Arap gelene\u011fi ona en g\u00fczel \u00e7\u0131k\u0131\u015f\u0131 verir: y\u00fcz\u00fc\u011f\u00fcndeki zehri \u0131s\u0131rd\u0131 ve dedi ki, \u2018Kendi elimle \u2014 d\u00fc\u015fman\u0131m\u0131n eliyle de\u011fil.\u2019",
          },
        },
      },
      {
        M: {
          text: {
            S: "Roma senat\u00f6rleri Aurelianus\u2019u bir kad\u0131n u\u011fruna lejyonlar\u0131n\u0131 harcamakla alay etti\u011finde, cevab\u0131 keskin oldu: \u2018Beni ele\u015ftirenler, onun nas\u0131l bir kad\u0131n oldu\u011funu bilselerdi \u00f6vg\u00fc ya\u011fd\u0131r\u0131rlard\u0131.\u2019 Yi\u011fidi \u00f6ld\u00fcr ama hakk\u0131n\u0131 yeme derler \u2014 Roma onu yendi ama hakk\u0131n\u0131 yiyemedi. Bug\u00fcn heykeli \u015eam\u2019da dikilir, y\u00fcz\u00fc Suriye paras\u0131ndad\u0131r. Ve Palmira\u2019n\u0131n harabeleri \u2014 y\u00fczy\u0131llar\u0131n ve sava\u015flar\u0131n yonttu\u011fu \u00e7\u00f6l ba\u015fkenti \u2014 h\u00e2l\u00e2 kumlardan y\u00fckselir. Diz \u00e7\u00f6kmeyi reddeden bir \u015feyin kemikleri gibi.",
          },
        },
      },
    ],
  },
  moralOrLesson: {
    S: "\u0130mparatorluklar\u0131 sadece sarayda do\u011fanlar kurmaz \u2014 bazen en tehlikeli taht, d\u00fcnyan\u0131n k\u00fc\u00e7\u00fcmsedi\u011fi bir kad\u0131n\u0131n ele ge\u00e7irdi\u011fi taht\u0131r. Ve meydan okuman\u0131n as\u0131l \u00f6l\u00e7\u00fcs\u00fc kazan\u0131p kazanmaman de\u011fil, d\u00fc\u015fman\u0131n\u0131n bile senin hakk\u0131n\u0131 yemekten ka\u00e7\u0131n\u0131p ka\u00e7\u0131nmad\u0131\u011f\u0131d\u0131r.",
  },
  source: {
    S: "Historia Augusta, 'The Thirty Pretenders' (Trebellius Pollio); Zosimus, New History; al-Tabari, History of the Prophets and Kings; Edward Gibbon, The Decline and Fall of the Roman Empire; Pat Southern, Empress Zenobia: Palmyra\u2019s Rebel Queen; Alaric Watson, Aurelian and the Third Century",
  },
  characters: {
    L: [
      { S: "Krali\u00e7e Zenobia (Septimia Zenobia / Bat-Zabbai / ez-Zebba)" },
      { S: "\u0130mparator Aurelianus (Lucius Domitius Aurelianus)" },
      { S: "Cassius Longinus (filozof ve dan\u0131\u015fman)" },
      { S: "General Zabdas" },
      { S: "Vaballathus (Zenobia\u2019n\u0131n o\u011flu)" },
      { S: "Odaenathus (Zenobia\u2019n\u0131n kocas\u0131)" },
    ],
  },
  era: {
    S: "MS 267-274 (Zenobia\u2019n\u0131n naipli\u011fi, fetihleri ve Aurelianus taraf\u0131ndan yenilgisi)",
  },
  readingTimeMinutes: { N: "3" },
  image: { S: "" },
  updatedAt: { N: "1773492882" },
  disabled: { BOOL: false },
  thumbnail: { S: "" },
  coordinates: {
    M: {
      lng: { N: "38.2684" },
      lat: { N: "34.5505" },
    },
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "crowns_conquests" },
};

async function push() {
  try {
    const cmd = new PutItemCommand({
      TableName: "Story",
      Item: item,
      ConditionExpression:
        "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
    });
    const result = await client.send(cmd);
    console.log("SUCCESS: Turkish story pushed to DynamoDB");
    console.log("HTTP Status:", result.$metadata.httpStatusCode);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.error("ERROR: Turkish version already exists! Use update instead.");
    } else {
      console.error("ERROR:", err.message);
    }
    process.exit(1);
  }
}

push();
