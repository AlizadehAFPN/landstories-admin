import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "alamut-castle" },
  langStoryId: { S: "tr#library-burned-seven-days" },
  storyId: { S: "library-burned-seven-days" },
  lang: { S: "tr" },
  title: { S: "Yedi G\u00fcn Yedi Gece Yanan K\u00fct\u00fcphane" },
  subtitle: {
    S: "D\u00f6rt y\u00fcz bin kitap, yedi g\u00fcn s\u00fcren bir yang\u0131n ve sonsuza dek yitip giden bilgi",
  },
  excerpt: {
    S: "Bir tarih\u00e7i, Elbruz Da\u011flar\u0131\u2019ndaki en b\u00fcy\u00fck k\u00fct\u00fcphanenin i\u00e7inde y\u00fcr\u00fcd\u00fc ve neyi kurtaraca\u011f\u0131na karar verdi. Kuranlar\u0131 ay\u0131rd\u0131. Astronomi aletlerini ay\u0131rd\u0131. Sonra gerisini ate\u015fe verdi. Alamut\u2019un k\u00fct\u00fcphanesi yedi g\u00fcn yedi gece yand\u0131.",
  },
  moralOrLesson: {
    S: "Duvarlar\u0131 yeniden \u00f6rersin. Kaleleri yeniden kurars\u0131n. Ama bir kez yanan kitab\u0131 geri getiremezsin. Alamut\u2019un as\u0131l trajedisi kaybedilenler de\u011fil \u2014 neyin kaybedildi\u011fini asla bilemeyecek olmam\u0131z.",
  },
  icon: { S: "\uD83D\uDD25" },
  era: { S: "November-December 1256 CE (Mongol destruction of Alamut)" },
  tier: { S: "S" },
  storyCategory: { S: "lost_found" },
  source: {
    S: "Ata-Malik Juvayni, Tarikh-i Jahangushay (c.1260); Rashid al-Din Hamadani, Jami al-Tawarikh (c.1310); Farhad Daftary, The Isma'ilis: Their History and Doctrines (Cambridge, 2007); Peter Willey, Eagle's Nest: Ismaili Castles in Iran and Syria (I.B. Tauris, 2005); Encyclopaedia Iranica; Hamideh Chubak, Alamut archaeological reports (2004)",
  },
  readingTimeMinutes: { N: "7" },
  isFree: { BOOL: true },
  hasAudio: { BOOL: false },
  disabled: { BOOL: false },
  image: { S: "" },
  thumbnail: { S: "" },
  updatedAt: { N: String(Math.floor(Date.now() / 1000)) },
  coordinates: {
    M: {
      lat: { N: "36.4447" },
      lng: { N: "50.5861" },
    },
  },
  characters: {
    L: [
      { S: "Nasir al-Din al-Tusi (polymath who survived the destruction)" },
      { S: "Hulagu Khan (Mongol commander who ordered the destruction)" },
      { S: "Ata-Malik Juvayni (historian who burned the library)" },
      { S: "Rukn al-Din Khurshah (last lord of Alamut)" },
      { S: "Hassan-i Sabbah (founder who built the library)" },
    ],
  },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "1090 y\u0131l\u0131nda bir adam, orta\u00e7a\u011f\u0131n en korkusuz hamlelerinden birini yapt\u0131. Hasan Sabbah, \u0130ran\u2019\u0131n kuzeyindeki Elbruz Da\u011flar\u0131\u2019nda bir kayan\u0131n \u00fcst\u00fcne kurulmu\u015f Alamut Kalesi\u2019ni tek damla kan d\u00f6kmeden ele ge\u00e7irdi. Sonra kap\u0131lar\u0131 kapatt\u0131 \u2014 ve otuz d\u00f6rt y\u0131l boyunca neredeyse hi\u00e7 d\u0131\u015far\u0131 ad\u0131m atmad\u0131. Ne yapt\u0131 bu adam otuz d\u00f6rt y\u0131l boyunca? Okudu. Toplad\u0131. Yazd\u0131rd\u0131. \u0130slam d\u00fcnyas\u0131n\u0131n en etkileyici k\u00fct\u00fcphanelerinden birini s\u0131f\u0131rdan kurdu.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Hasan Sabbah\u2019\u0131n ard\u0131ndan gelen her lider bu koleksiyona ekledi. Y\u00fcz altm\u0131\u015f y\u0131l\u0131 a\u015fk\u0131n bir s\u00fcre boyunca, her yeni el yazmas\u0131 o da\u011f\u0131n tepesine ta\u015f\u0131nd\u0131. 1250\u2019lere gelindi\u011finde k\u00fct\u00fcphanede yakla\u015f\u0131k d\u00f6rt y\u00fcz bin cilt vard\u0131 \u2014 felsefe, astronomi, t\u0131p, \u015fiir, din bilimleri. \u0130slam d\u00fcnyas\u0131n\u0131n d\u00f6rt bir yan\u0131ndan alimler, s\u0131rf bu k\u00fct\u00fcphane i\u00e7in o \u00fccra da\u011f vadisine kadar geliyordu. Bu bir kitap raf\u0131 de\u011fildi. D\u00fcnyan\u0131n en b\u00fcy\u00fck bilgi hazinelerinden biriydi.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Bu alimlerin aras\u0131nda bir isim vard\u0131 ki tarihin seyrini de\u011fi\u015ftirecekti: Nas\u00eer\u00fcddin T\u00fbs\u00ee. On \u00fc\u00e7\u00fcnc\u00fc y\u00fczy\u0131l \u0130slam d\u00fcnyas\u0131n\u0131n belki de en parlak bilim insan\u0131. Otuz y\u0131ldan fazla Alamut\u2019ta ya\u015fad\u0131 ve bu s\u00fcrede astronomi \u00fczerine \u00f6yle \u00e7al\u0131\u015fmalar yapt\u0131 ki, y\u00fczy\u0131llar sonra Avrupa\u2019da Kopernik\u2019in eline ula\u015facakt\u0131. K\u00fct\u00fcphaneyi ancak bir dahinin yapabilece\u011fi \u015fekilde kulland\u0131 \u2014 sadece okumad\u0131, farkl\u0131 alanlar\u0131 birbirine ba\u011flad\u0131, bilinen her s\u0131n\u0131r\u0131 zorlad\u0131.",
          },
        },
      },
      {
        M: {
          text: {
            S: "1256\u2019da Mo\u011follar geldi. Cengiz Han\u2019\u0131n torunu H\u00fcl\u00e2g\u00fc Han, y\u00fcz bini a\u015fk\u0131n askeriyle da\u011flara y\u00fcr\u00fcd\u00fc. Tek bir hedefi vard\u0131: yakla\u015f\u0131k iki y\u00fczy\u0131ld\u0131r Alamut\u2019u elinde tutan toplulu\u011fu yery\u00fcz\u00fcnden silmek. Son lider R\u00fckneddin H\u00fcr\u015fah gen\u00e7 bir adamd\u0131; pazarl\u0131k etmeye \u00e7al\u0131\u015ft\u0131. Teslim olaca\u011f\u0131n\u0131 g\u00f6stermek i\u00e7in kendi kale surlar\u0131n\u0131 y\u0131kmaya bile ba\u015flad\u0131. Hi\u00e7bir faydas\u0131 olmad\u0131. H\u00fcl\u00e2g\u00fc\u2019n\u00fcn istedi\u011fi \u015fey mutlak y\u0131k\u0131md\u0131.",
          },
        },
      },
      {
        M: {
          text: {
            S: "\u0130\u015fte as\u0131l ac\u0131 veren k\u0131s\u0131m bu. Yang\u0131n ba\u015flamadan \u00f6nce, Mo\u011fol ordusunun yan\u0131nda gelen tarih\u00e7i C\u00fcveyn\u00ee, k\u00fct\u00fcphanenin i\u00e7inde gezme izni ald\u0131. E\u011fitimli bir adamd\u0131; \u00f6n\u00fcnde ne durdu\u011funu gayet iyi biliyordu. Kuran n\u00fcshalar\u0131n\u0131 ay\u0131rd\u0131, kurtard\u0131. Astronomi aletlerini ay\u0131rd\u0131, kurtard\u0131. Hasan Sabbah\u2019\u0131n kendi eliyle yazd\u0131\u011f\u0131 otobiyografiyi bile okudu \u2014 Alamut\u2019un kurulu\u015f hik\u00e2yesini anlatan tek birinci elden kaynak. Sonra gerisini ate\u015fe verdi. K\u00fct\u00fcphane yedi g\u00fcn yedi gece yand\u0131.",
          },
        },
      },
      {
        M: {
          text: {
            S: "T\u00fbs\u00ee hayatta kald\u0131. Taraf de\u011fi\u015ftirdi \u2014 ihanet miydi, hayatta kalma i\u00e7g\u00fcd\u00fcs\u00fc m\u00fcyd\u00fc, bunu kimse tam olarak bilmiyor. H\u00fcl\u00e2g\u00fc Han\u2019\u0131n ba\u015f bilim dan\u0131\u015fman\u0131 oldu. Onu \u0130ran\u2019\u0131n Meraga \u015fehrinde bir g\u00f6zlemevi kurmaya ikna etti ve oraya fethedilen \u015fehirlerden toplanan d\u00f6rt y\u00fcz bin kitap ta\u015f\u0131nd\u0131 \u2014 Alamut\u2019takiyle ayn\u0131 say\u0131. Orada \u00fcretilen \u00e7al\u0131\u015fmalar y\u00fczy\u0131llar sonra Kopernik\u2019e ula\u015ft\u0131. T\u00fbs\u00ee\u2019nin zihninde ta\u015f\u0131d\u0131\u011f\u0131 \u015feylerin bir k\u0131sm\u0131 o yang\u0131ndan kurtuldu. Ama sadece bir k\u0131sm\u0131.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Bug\u00fcn Alamut\u2019tan geriye, o ayn\u0131 kayan\u0131n \u00fczerinde harabeye d\u00f6nm\u00fc\u015f duvarlardan ba\u015fka bir \u015fey kalmad\u0131. Arkeologlar sekiz y\u00fcz y\u0131l sonra h\u00e2l\u00e2 su ta\u015f\u0131yan kanallar buldu. Mo\u011follar \u00e7ekildikten sonra insanlar geri d\u00f6nd\u00fc \u2014 her zaman d\u00f6nerler. Ama k\u00fct\u00fcphane geri d\u00f6nmedi. D\u00f6rt y\u00fcz bin cilt. Y\u00fczy\u0131llar\u0131n d\u00fc\u015f\u00fcncesi, \u015fiiri, bilgisi \u2014 tek bir haftada k\u00fcle d\u00f6nd\u00fc. Ate\u015f d\u00fc\u015ft\u00fc\u011f\u00fc yeri yakar, derler. Alamut\u2019ta d\u00fc\u015fen ate\u015f \u00f6yle bir yakt\u0131 ki, neyin yand\u0131\u011f\u0131n\u0131 bile asla bilemeyece\u011fiz.",
          },
        },
      },
    ],
  },
};

async function push() {
  try {
    await client.send(
      new PutItemCommand({
        TableName: "Story",
        Item: item,
      })
    );
    console.log("SUCCESS: tr#library-burned-seven-days pushed to DynamoDB");
  } catch (err) {
    console.error("FAILED:", err.message);
    process.exit(1);
  }
}

push();
