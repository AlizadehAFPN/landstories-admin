import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const ddb = DynamoDBDocumentClient.from(client);

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

const tr = {
  siteId: "alamut-castle",
  storyId: "paradise-garden-legend",
  langStoryId: "tr#paradise-garden-legend",
  lang: "tr",
  icon: "\u{1F33F}",
  storyCategory: "tricksters_folk_tales",
  era: "1090\u20131256 (Nizari \u0130smaili d\u00f6nemi); 1272 (Marco Polo\u2019nun \u0130ran yolculu\u011fu)",
  tier: "S",
  isFree: true,
  isFeatured: false,
  hasAudio: false,
  characters: [
    "Hasan Sabbah (\u2018Da\u011f\u0131n Ya\u015fl\u0131 Adam\u0131\u2019)",
    "Marco Polo (efsaneyi d\u00fcnyaya yayan Venedikli gezgin)",
    "Rustichello da Pisa (Polo\u2019nun anlat\u0131m\u0131n\u0131 kaleme alan yazar)",
    "Re\u015fid\u00fcddin Sinan (Suriyeli \u2018Da\u011f\u0131n Ya\u015fl\u0131 Adam\u0131\u2019)",
    "Ferhad Daftary (efsaneleri \u00e7\u00fcr\u00fcten \u00e7a\u011fda\u015f tarih\u00e7i)",
  ],
  coordinates: { lat: 36.4447, lng: 50.5861 },
  thumbnail: "",
  image: "",
  readingTimeMinutes: 3,
  source:
    "Marco Polo, The Travels of Marco Polo (Yule-Cordier translation, Book 1, Ch. 24); Farhad Daftary, The Assassin Legends: Myths of the Isma\u2019ilis (I.B. Tauris, 1994); Bernard Lewis, The Assassins: A Radical Sect in Islam (Weidenfeld & Nicolson, 1967); Ata-Malik Juvayni, Tarikh-i Jahangushay (c.1260); Sylvestre de Sacy, Academy of Inscriptions lecture, 1809; Encyclopaedia Iranica, \u2018HASAN SABBAH\u2019",
  updatedAt: now,
  disabled: false,

  title: "Kimsenin G\u00f6rmedi\u011fi Cennet",

  subtitle:
    "Ha\u015fha\u015f\u00eeler hakk\u0131nda anlat\u0131lm\u0131\u015f en b\u00fcy\u00fck yalan \u2014 ve sekiz y\u00fcz y\u0131ld\u0131r g\u00f6m\u00fcl\u00fc kalan ger\u00e7ek",

  excerpt:
    "\u0130ki da\u011f\u0131n aras\u0131nda, Da\u011f\u0131n Ya\u015fl\u0131 Adam\u0131 d\u00fcnyan\u0131n gelmi\u015f ge\u00e7mi\u015f en b\u00fcy\u00fck ve en g\u00fczel bah\u00e7esini yapt\u0131rm\u0131\u015ft\u0131. \u0130\u00e7inde alt\u0131n kapl\u0131 k\u00f6\u015fkler, \u015farap, s\u00fct ve bal akan dereler ve d\u00fcnyan\u0131n en g\u00fczel kad\u0131nlar\u0131 vard\u0131.",

  moralOrLesson:
    "Bir topluluk hakk\u0131nda en uzun ya\u015fayan hik\u00e2yeler her zaman en do\u011fru olanlar de\u011fildir \u2014 korku, \u00f6nyarg\u0131 ve d\u0131\u015far\u0131dan bakanlar\u0131n hayal g\u00fcc\u00fcnden do\u011fan efsaneler, y\u00fczy\u0131llarca s\u00fcren bilgi birikimini, adanm\u0131\u015fl\u0131\u011f\u0131 ve ger\u00e7ek ba\u015far\u0131lar\u0131 g\u00f6lgede b\u0131rakabilir; ta ki efsane, yerini ald\u0131\u011f\u0131 tarihten daha ger\u00e7ek hale gelene kadar.",

  paragraphs: [
    {
      text: "1272 y\u0131l\u0131. Venedikli t\u00fcccar Marco Polo, \u0130ran\u2019\u0131n kuzeyindeki da\u011flardan ge\u00e7iyor. Alamut Kalesi\u2019ne hi\u00e7 ayak basmad\u0131 \u2014 Mo\u011follar on alt\u0131 y\u0131l \u00f6nce yerle bir etmi\u015fti zaten. Ama \u0130pek Yolu \u00fczerindeki pazarlarda \u00f6yle bir hik\u00e2ye duydu ki, sekiz y\u00fcz y\u0131l boyunca dilden d\u00fc\u015fmeyecekti. \u0130ki da\u011f aras\u0131na gizlenmi\u015f bir vadi. D\u00fcnyan\u0131n en g\u00fczel bah\u00e7esi. Alt\u0131n kapl\u0131 k\u00f6\u015fkler, \u015farap ve bal akan dereler, g\u00f6zleri kama\u015ft\u0131ran kad\u0131nlar.",
    },
    {
      text: "Efsaneye g\u00f6re Hasan Sabbah \u2014 Ha\u00e7l\u0131lar\u0131n \u201cDa\u011f\u0131n Ya\u015fl\u0131 Adam\u0131\u201d dedi\u011fi adam \u2014 \u00e7evre k\u00f6ylerden gen\u00e7 delikanl\u0131lar se\u00e7er, onlar\u0131 uyu\u015fturarak bu bah\u00e7eye ta\u015f\u0131rm\u0131\u015f. Delikanl\u0131lar uyand\u0131\u011f\u0131nda kendilerini ger\u00e7ekten cennette san\u0131rlarm\u0131\u015f. Bitmeyen \u015f\u00f6lenler, hayal edilemeyecek zevkler. G\u00fcnler sonra yeniden uyu\u015fturulup d\u0131\u015far\u0131 \u00e7\u0131kar\u0131l\u0131rlarm\u0131\u015f. Sonra Hasan\u2019\u0131n mesaj\u0131 \u00e7ok netti: \u201cSeni oraya geri g\u00f6nderecek tek ki\u015fi benim. Emrimi dinle \u2014 \u00f6l\u00fcm\u00fcne. Cennet kap\u0131s\u0131n\u0131 sana ben a\u00e7ar\u0131m.\u201d",
    },
    {
      text: "Efsaneye g\u00f6re tarihte e\u015fi g\u00f6r\u00fclmemi\u015f bir \u00f6rg\u00fct b\u00f6yle do\u011fmu\u015ftu. Bu adamlar \u00f6l\u00fcmden ka\u00e7m\u0131yordu \u2014 ko\u015farak gidiyordu. Son bir g\u00f6rev onlara sonsuzlu\u011fu kazand\u0131racakt\u0131. Ke\u015fi\u015f ya da asker k\u0131l\u0131\u011f\u0131na girip saraylara s\u0131z\u0131yor, g\u00fcpeg\u00fcnd\u00fcz tek han\u00e7er darbesiyle vuruyorlard\u0131. Ka\u00e7maya bile \u00e7al\u0131\u015fm\u0131yorlard\u0131. D\u00fc\u015fmanlar\u0131 onlara ha\u015fha\u015f\u00een dedi \u2014 \u201cesrarke\u015f\u201d anlam\u0131nda bir hakaret. Bu kelime Avrupa\u2019ya ula\u015ft\u0131\u011f\u0131nda \u201cassassin\u201d oldu. \u0130ngilizce\u2019de \u201csuikast\u00e7\u0131\u201d kelimesinin k\u00f6keni budur.",
    },
    {
      text: "Ama i\u015fin asl\u0131na bakarsan\u0131z hi\u00e7biri ger\u00e7ek de\u011fildi. Tarih\u00e7i Ferhad Daftary 1994\u2019te yay\u0131mlad\u0131\u011f\u0131 kitapta bah\u00e7enin var olmad\u0131\u011f\u0131n\u0131 kan\u0131tlad\u0131. Hasan\u2019\u0131n kendi cemaatinden tek bir kaynak bu bah\u00e7eden s\u00f6z etmiyor. D\u00f6nemin M\u00fcsl\u00fcman yazarlar\u0131nda uyu\u015fturucu diye bir \u015fey yok. Mo\u011fol tarih\u00e7i C\u00fcveyn\u00ee, Alamut\u2019u 1256\u2019da ele ge\u00e7irdikten sonra kaleyi bizzat gezdi. Buldu\u011fu: depolar, at\u00f6lyeler ve devasa bir k\u00fct\u00fcphane. Alt\u0131n k\u00f6\u015fk yok. Bal akan dere yok. Polo, ayak bile basmad\u0131\u011f\u0131 bir yer hakk\u0131nda pazar dedikodusunu tekrarl\u0131yordu.",
    },
    {
      text: "Ger\u00e7ek Hasan Sabbah efsanedeki adama hi\u00e7 benzemiyordu. \u015earap i\u00e7ti\u011fi i\u00e7in kendi o\u011flunu idam ettiren, ac\u0131mas\u0131zca disiplinli bir \u00e2limdi. 1090\u2019da \u0130ran\u2019\u0131n kuzeyinde, dik kayal\u0131klar\u0131n \u00fczerindeki Alamut Kalesi\u2019ni ele ge\u00e7irdi \u2014 rivayete g\u00f6re tek damla kan d\u00f6k\u00fclmeden. Otuz d\u00f6rt y\u0131l boyunca kaleden bir kez bile d\u0131\u015far\u0131 \u00e7\u0131kmad\u0131. \u0130slam d\u00fcnyas\u0131n\u0131n en b\u00fcy\u00fck k\u00fct\u00fcphanelerinden birini kurdu. Adamlar\u0131 uyu\u015fturulmu\u015f zombiler de\u011fildi. Dil \u00f6\u011frenen, diplomasi bilen, inan\u00e7lar\u0131 u\u011fruna hareket eden e\u011fitimli insanlard\u0131.",
    },
    {
      text: "Alamut\u2019un ger\u00e7ek \u201cbah\u00e7eleri\u201d mi? Kire\u00e7ta\u015f\u0131 kayal\u0131klara oyulmu\u015f sarn\u0131\u00e7larla ve elle a\u00e7\u0131lm\u0131\u015f su kanallar\u0131yla sulanan tar\u0131m teraslar\u0131yd\u0131. Alt\u0131n k\u00f6\u015fk de\u011fil. Bal akan dere de\u011fil. D\u00fcnyan\u0131n en \u00fccra vadilerinden birinde bir toplulu\u011fu doyuran, dahiyane bir m\u00fchendislik harikas\u0131. O sarn\u0131\u00e7lar\u0131n baz\u0131lar\u0131 neredeyse bin y\u0131l sonra bug\u00fcn h\u00e2l\u00e2 su tutuyor.",
    },
    {
      text: "Yalanc\u0131n\u0131n mumu yats\u0131ya kadar yanarm\u0131\u015f derler. Marco Polo\u2019nunki sekiz y\u00fcz y\u0131ld\u0131r s\u00f6nmedi. Orada bulunmam\u0131\u015f bir adam\u0131n, olmam\u0131\u015f olaylar hakk\u0131nda anlatt\u0131\u011f\u0131 \u2014 \u00fcstelik hapishane h\u00fccresinde bir romanc\u0131ya dikte ettirdi\u011fi \u2014 hik\u00e2ye, \u0130ngilizce\u2019ye \u201cassassin\u201d kelimesini kazand\u0131rd\u0131. Assassin\u2019s Creed sayesinde milyonlarca insan h\u00e2l\u00e2 o uydurma d\u00fcnyada dola\u015f\u0131yor. Ger\u00e7ek Hasan\u2019\u0131 ise neredeyse kimse tan\u0131m\u0131yor. Tarihin en tehlikeli silah\u0131 han\u00e7er de\u011fildi. Kimsenin do\u011frulamaya zahmet etmedi\u011fi bir hik\u00e2yeydi.",
    },
  ],
};

async function push() {
  console.log("Pushing Turkish story: paradise-garden-legend");
  console.log("Title:", tr.title);
  console.log("langStoryId:", tr.langStoryId);
  console.log("siteId:", tr.siteId);
  console.log("updatedAt:", tr.updatedAt);
  console.log("Paragraphs:", tr.paragraphs.length);

  // Validate
  if (!tr.siteId || !tr.langStoryId || !tr.lang || !tr.title) {
    throw new Error("Missing required fields");
  }
  if (tr.paragraphs.length < 6 || tr.paragraphs.length > 10) {
    throw new Error(`Unexpected paragraph count: ${tr.paragraphs.length}`);
  }
  for (let i = 0; i < tr.paragraphs.length; i++) {
    const t = tr.paragraphs[i].text;
    if (t.length > 600) {
      console.warn(`WARNING: Paragraph ${i + 1} is ${t.length} chars`);
    }
    console.log(`  P${i + 1}: ${t.length} chars`);
  }

  await ddb.send(
    new PutCommand({
      TableName: TABLE,
      Item: tr,
      ConditionExpression:
        "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
    })
  );
  console.log("\n\u2713 Turkish story pushed successfully!");
}

push().catch((err) => {
  if (err.name === "ConditionalCheckFailedException") {
    console.error(
      "ERROR: Record already exists. Use UpdateCommand or remove ConditionExpression to overwrite."
    );
  } else {
    console.error("ERROR:", err);
  }
  process.exit(1);
});
