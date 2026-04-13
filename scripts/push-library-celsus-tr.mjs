import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

const item = {
  siteId: { S: "ephesus" },
  langStoryId: { S: "tr#library-celsus" },
  storyId: { S: "library-celsus" },
  lang: { S: "tr" },
  title: { S: "Celsus K\u00fct\u00fcphanesi \u2014 Bir O\u011fulun Yas\u0131ndan Do\u011fan \u015eaheser" },
  subtitle: { S: "Bir baban\u0131n an\u0131s\u0131, antik d\u00fcnyan\u0131n en g\u00fczel binas\u0131na nas\u0131l d\u00f6n\u00fc\u015ft\u00fc?" },
  excerpt: {
    S: "Milattan sonra 114 y\u0131l\u0131nda, bug\u00fcnk\u00fc T\u00fcrkiye\u2019nin bat\u0131 k\u0131y\u0131s\u0131ndaki Efes\u2019te Celsus ad\u0131nda bir adam \u00f6ld\u00fc. Roma \u0130mparatorlu\u011fu\u2019nun en \u00fcst kademelerine kadar y\u00fckselmi\u015fti \u2014 senat\u00f6r, kons\u00fcl, hatta t\u00fcm Asya eyaletinin valisi olmu\u015ftu. O\u011flu Aquila, babas\u0131n\u0131n an\u0131s\u0131na bir heykel ya da kitabe dikebilirdi. Ama o hi\u00e7 kimsenin beklemedi\u011fi bir \u015fey yapt\u0131: babas\u0131na d\u00fcnyan\u0131n g\u00f6rd\u00fc\u011f\u00fc en g\u00fczel k\u00fct\u00fcphaneyi in\u015fa etti.",
  },
  moralOrLesson: {
    S: "En b\u00fcy\u00fck eserler \u00e7o\u011fu zaman sevgiden ve kay\u0131ptan do\u011far. \u00d6lenlerin ard\u0131ndan ne in\u015fa etti\u011fimiz, asl\u0131nda ya\u015fayanlar olarak kim oldu\u011fumuzu anlat\u0131r.",
  },
  icon: { S: "\ud83d\udcda" },
  era: { S: "117-125 AD" },
  tier: { S: "A" },
  storyCategory: { S: "crowns_conquests" },
  source: {
    S: "Archaeological excavations; dedicatory inscriptions; Austrian Archaeological Institute records",
  },
  readingTimeMinutes: { N: "2" },
  isFree: { BOOL: true },
  hasAudio: { BOOL: false },
  disabled: { BOOL: false },
  image: { S: "" },
  thumbnail: { S: "" },
  updatedAt: { N: String(Math.floor(Date.now() / 1000)) },
  coordinates: {
    M: {
      lat: { N: "37.9394" },
      lng: { N: "27.3403" },
    },
  },
  characters: {
    L: [
      { S: "Tiberius Julius Celsus Polemaeanus" },
      { S: "Gaius Julius Aquila" },
      { S: "Sophia" },
      { S: "Episteme" },
      { S: "Ennoia" },
      { S: "Arete" },
    ],
  },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "Milattan sonra 114 y\u0131l\u0131nda, bug\u00fcnk\u00fc T\u00fcrkiye\u2019nin bat\u0131 k\u0131y\u0131s\u0131ndaki Efes\u2019te Celsus ad\u0131nda bir adam \u00f6ld\u00fc. Roma \u0130mparatorlu\u011fu\u2019nun en \u00fcst kademelerine kadar y\u00fckselmi\u015fti \u2014 senat\u00f6r, kons\u00fcl, hatta t\u00fcm Asya eyaletinin valisi olmu\u015ftu. O\u011flu Aquila, babas\u0131n\u0131n an\u0131s\u0131na bir heykel ya da kitabe dikebilirdi. Ama o hi\u00e7 kimsenin beklemedi\u011fi bir \u015fey yapt\u0131: babas\u0131na d\u00fcnyan\u0131n g\u00f6rd\u00fc\u011f\u00fc en g\u00fczel k\u00fct\u00fcphaneyi in\u015fa etti.",
          },
        },
      },
      {
        M: {
          text: {
            S: "\u0130n\u015faat yakla\u015f\u0131k on y\u0131l s\u00fcrd\u00fc ve 125 y\u0131l\u0131 civar\u0131nda tamamland\u0131. Celsus K\u00fct\u00fcphanesi s\u0131radan bir yap\u0131 de\u011fildi \u2014 yakla\u015f\u0131k on iki bin rulo bar\u0131nd\u0131r\u0131yordu. Bu say\u0131 onu antik d\u00fcnyan\u0131n \u00fc\u00e7\u00fcnc\u00fc b\u00fcy\u00fck k\u00fct\u00fcphanesi yap\u0131yordu; yaln\u0131zca M\u0131s\u0131r\u2019daki efsanevi \u0130skenderiye K\u00fct\u00fcphanesi ve rakip Bergama koleksiyonu onun \u00f6n\u00fcndeydi. Ama onu \u00f6zel k\u0131lan b\u00fcy\u00fckl\u00fc\u011f\u00fc de\u011fil, g\u00fczelli\u011fiydi. \u0130ki katl\u0131 cephesinde d\u0131\u015f s\u00fctunlar ortadakilerden biraz daha k\u0131sayd\u0131 \u2014 bu optik hile, binay\u0131 oldu\u011fundan bile g\u00f6rkemli g\u00f6steriyordu.",
          },
        },
      },
      {
        M: {
          text: {
            S: "\u0130\u00e7eride mimarlar, say\u0131s\u0131z antik metni yok eden bir d\u00fc\u015fman\u0131 alt etmi\u015flerdi: nemi. Aras\u0131nda hava bo\u015flu\u011fu b\u0131rak\u0131lan \u00e7ift duvar sistemi \u2014 asl\u0131nda antik \u00e7a\u011f\u0131n iklimlendirmesi \u2014 rulolar\u0131 rutubetten koruyordu. Giri\u015fte d\u00f6rt heykel duruyordu: Bilgelik, Bilgi, Anlay\u0131\u015f ve Erdem. Bunlar s\u0131radan s\u00fcs de\u011fildi. Aquila\u2019n\u0131n babas\u0131n\u0131 anlama bi\u00e7imiydi \u2014 \u2018Babam i\u015fte buydu\u2019 diyen bir o\u011fulun sessiz bildirisi.",
          },
        },
      },
      {
        M: {
          text: {
            S: "As\u0131l hik\u00e2ye burada ki\u015fiselle\u015fiyor. Aquila, babas\u0131n\u0131n mermer lahitini k\u00fct\u00fcphanenin zeminine yerle\u015ftirdi. Bu, Roma\u2019n\u0131n en kat\u0131 kurallar\u0131ndan birini \u00e7i\u011fnemek demekti \u2014 sur i\u00e7ine g\u00f6m\u00fc kesinlikle yasakt\u0131. Buna ra\u011fmen istisna tan\u0131nd\u0131\u011f\u0131n\u0131 d\u00fc\u015f\u00fcn\u00fcn: Efes halk\u0131n\u0131n Celsus\u2019a duydu\u011fu sayg\u0131 bu kadar derindi. Yani bina sadece bir k\u00fct\u00fcphane de\u011fildi. Ayn\u0131 zamanda bir t\u00fcrbeydi. Bir o\u011ful, yas\u0131n\u0131 b\u00fct\u00fcn bir \u015fehre arma\u011fana \u00e7evirmi\u015fti.",
          },
        },
      },
      {
        M: {
          text: {
            S: "K\u00fct\u00fcphane y\u00fcz y\u0131l\u0131 a\u015fk\u0131n bir s\u00fcre ayakta kald\u0131. Derler ya, \u2018ta\u015f yerinde a\u011f\u0131rd\u0131r\u2019 \u2014 ama kader bazen ta\u015f\u0131 da yerinden eder. 262 y\u0131l\u0131nda kuzeyden gelen Got ak\u0131nc\u0131lar\u0131 Efes\u2019e sald\u0131r\u0131p k\u00fct\u00fcphanenin i\u00e7ini ate\u015fe verdi. On iki bin rulo bir gecede k\u00fcl oldu. Sonraki y\u00fczy\u0131llarda depremler, alevlerin b\u0131rakt\u0131\u011f\u0131n\u0131 da y\u0131kt\u0131. Antik d\u00fcnyan\u0131n en g\u00fczel binalar\u0131ndan biri, bin y\u0131l\u0131 a\u015fk\u0131n bir s\u00fcre toprak ve moloz alt\u0131nda kald\u0131.",
          },
        },
      },
      {
        M: {
          text: {
            S: "1903\u2019te Avusturyal\u0131 arkeologlar kaz\u0131 yapmaya ba\u015flad\u0131. Topraktan s\u00fctun par\u00e7alar\u0131, kabartmalar ve o d\u00f6rt heykelin kal\u0131nt\u0131lar\u0131 \u00e7\u0131kt\u0131. 1970\u2019te bir ekip devasa bir yapboz gibi ta\u015flar\u0131 tek tek yerine koymaya ba\u015flad\u0131. 1978\u2019e gelindi\u011finde cephe yeniden ayaktayd\u0131. Bir kopya de\u011fil \u2014 neredeyse iki bin y\u0131l \u00f6nce ayn\u0131 yerde durmu\u015f orijinal ta\u015flar, ayn\u0131 pozisyonlar\u0131na geri d\u00f6nm\u00fc\u015ft\u00fc.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Bug\u00fcn Celsus K\u00fct\u00fcphanesi Efes\u2019in simgesidir \u2014 herkesin g\u00f6rmeye geldi\u011fi yap\u0131. Her y\u0131l milyonlarca ki\u015fi o cepheyi foto\u011fral\u0131yor; \u00e7o\u011fu muhtemelen arkas\u0131nda tarihinin en etkileyici baba-o\u011ful hik\u00e2yelerinden birinin yatt\u0131\u011f\u0131ndan habersiz. Bu bina ne bir imparatora yaran\u0131lmak ne de siyasi g\u00fc\u00e7 g\u00f6sterisi i\u00e7in yap\u0131lm\u0131\u015ft\u0131. Yas\u0131 tutan bir o\u011ful, babas\u0131n\u0131 onurland\u0131rman\u0131n en iyi yolunun d\u00fcnyaya \u00f6\u011frenecek bir yer b\u0131rakmak oldu\u011funa karar verdi. \u0130ki bin y\u0131l sonra h\u00e2l\u00e2 i\u015fe yar\u0131yor.",
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
    console.log("SUCCESS: tr#library-celsus pushed to DynamoDB");
  } catch (err) {
    console.error("FAILED:", err.message);
    process.exit(1);
  }
}

push();
