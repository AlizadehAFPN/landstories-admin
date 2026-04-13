import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const record = {
  // ─── Keys & identifiers (unchanged except lang) ───
  siteId: "babylon",
  langStoryId: "tr#code-of-hammurabi",
  storyId: "code-of-hammurabi",
  lang: "tr",

  // ─── Turkish text fields ───
  title: "Ta\u015Fa Kaz\u0131nan Adalet",
  subtitle:
    "Bir Babil kral\u0131 282 yasay\u0131 kara ta\u015Fa kaz\u0131d\u0131 \u2014 ve adaletin anlam\u0131n\u0131 sonsuza dek de\u011Fi\u015Ftirdi",
  excerpt:
    "Yakla\u015F\u0131k d\u00F6rt bin y\u0131l \u00F6nce Babil\u2019de bir kral, 282 yasay\u0131 kara ta\u015Ftan bir s\u00FCtuna kaz\u0131tt\u0131 ve bir tap\u0131na\u011Fa dikti \u2014 herkesin g\u00F6rmesi i\u00E7in. O yasalar\u0131n aras\u0131nda tarihteki her hukuk sistemine yank\u0131lanacak bir ilke vard\u0131: g\u00F6ze g\u00F6z, di\u015Fe di\u015F.",

  paragraphs: [
    {
      text: "Milattan \u00F6nce 1755 civar\u0131nda, Babil\u2019de bir kral al\u0131\u015F\u0131lmad\u0131k bir \u015Fey yapt\u0131. Hammurabi, cinayet, h\u0131rs\u0131zl\u0131k, bo\u015Fanma, hatta bozuk in\u015Faat gibi konular\u0131 kapsayan 282 yasay\u0131, i\u015Flenmesi neredeyse imk\u00E2ns\u0131z olan siyah bir ta\u015F s\u00FCtuna kaz\u0131tt\u0131. Sonra bu s\u00FCtunu bir tap\u0131na\u011Fa dikti \u2014 herkesin g\u00F6rebilece\u011Fi bir yere. Mesaj a\u00E7\u0131kt\u0131: yasa art\u0131k saray\u0131n s\u0131rr\u0131 de\u011Fil. Yasa halka ait.",
    },
    {
      text: "S\u00FCtunun tepesinde her \u015Feyi anlatan bir kabartma var. Hammurabi, Babil\u2019in g\u00FCne\u015F tanr\u0131s\u0131 \u015Eama\u015F\u2019\u0131n kar\u015F\u0131s\u0131nda duruyor \u2014 her \u015Feyi g\u00F6ren, hi\u00E7bir yalan\u0131n saklanamad\u0131\u011F\u0131 tanr\u0131. \u015Eama\u015F ona asa ve halka uzat\u0131yor; ilahi otoritenin simgeleri. Ta\u015Fa kaz\u0131nan yasalar bir kral\u0131n kafas\u0131ndan \u00E7\u0131kmad\u0131, g\u00F6klerin emriyle yaz\u0131ld\u0131. Kabartman\u0131n alt\u0131nda k\u0131rk dokuz s\u00FCtun \u00E7ivi yaz\u0131s\u0131, hayat\u0131n her k\u00F6\u015Fesini d\u00FCzenleyen kurallar\u0131 s\u0131ral\u0131yor.",
    },
    {
      text: "Hammurabi bir d\u00FC\u015F\u00FCn\u00FCr de\u011Fildi. Bir fatihti. M\u00D6 1792\u2019de tahta \u00E7\u0131kt\u0131\u011F\u0131nda Babil, rakiplerle \u00E7evrili k\u00FC\u00E7\u00FCk bir krall\u0131kt\u0131. Otuz y\u0131l i\u00E7inde hepsini dize getirdi \u2014 g\u00FCneydeki Larsa\u2019y\u0131 da, F\u0131rat k\u0131y\u0131s\u0131ndaki zengin ticaret kenti Mari\u2019yi de. G\u00FCn\u00FCm\u00FCze ula\u015Fan mektuplar\u0131, sulama kavgalar\u0131n\u0131 bizzat \u00E7\u00F6zen, yolsuz memurlar\u0131 tek tek takip eden bir kral\u0131 g\u00F6zler \u00F6n\u00FCne seriyor. Yasa, bu kontrol delisinin ba\u015Fyap\u0131t\u0131yd\u0131.",
    },
    {
      text: "En bilinen yasa 196. madde: bir \u00F6zg\u00FCr adam\u0131n g\u00F6z\u00FCn\u00FC \u00E7\u0131kar\u0131rsan, senin de g\u00F6z\u00FCn \u00E7\u0131kar\u0131l\u0131r. G\u00F6ze g\u00F6z, di\u015Fe di\u015F. Bu ilke Tevrat\u2019a, Kur\u2019an\u2019a ve d\u00FCnyan\u0131n her mahkemesine uzand\u0131. Ama insanlar\u0131n unuttu\u011Fu bir \u015Fey var: Babil\u2019de adalet s\u0131n\u0131fa g\u00F6re i\u015Fliyordu. Soyluyu k\u00F6r edersen g\u00F6z\u00FCn\u00FC kaybedersin. S\u0131radan birini k\u00F6r edersen para \u00F6dersin. K\u00F6leyi k\u00F6r edersen sahibine tazminat \u00F6dersin. Yasa herkesin g\u00F6rmesi i\u00E7in yaz\u0131lm\u0131\u015Ft\u0131. Herkese e\u015Fit uygulanmas\u0131 i\u00E7in de\u011Fil.",
    },
    {
      text: "Baz\u0131 yasalar \u015Fa\u015F\u0131rt\u0131c\u0131 derecede \u00E7a\u011Fda\u015Ft\u0131. \u0130n\u015Faat\u00E7\u0131n\u0131n \u00F6zensiz i\u015Fi y\u00FCz\u00FCnden ev \u00E7\u00F6k\u00FCp sahibi \u00F6l\u00FCrse, in\u015Faat\u00E7\u0131 idam edilirdi. Kocan sava\u015Fta esir d\u00FC\u015Ferse yeniden evlenebilirdin \u2014 kocan geri d\u00F6nerse hangi kocayla kalaca\u011F\u0131na sen karar verirdin. Kocas\u0131n\u0131n kendisini s\u00FCrekli a\u015Fa\u011F\u0131lad\u0131\u011F\u0131n\u0131 kan\u0131tlayan kad\u0131n paras\u0131n\u0131 al\u0131p gidebilirdi. D\u00F6rt bin y\u0131l \u00F6nce Babil\u2019de kad\u0131nlar\u0131n duygusal istismara kar\u015F\u0131 yasal g\u00FCvencesi vard\u0131.",
    },
    {
      text: "S\u00FCtun, dikti\u011Fi tap\u0131nakta alt\u0131 y\u00FCz y\u0131l ayakta kald\u0131. Sonra M\u00D6 1158 civar\u0131nda, bug\u00FCnk\u00FC g\u00FCneybat\u0131 \u0130ran\u2019dan gelen Elam Kral\u0131 \u015Eutruk-Nahhunte Sippar\u2019\u0131 ya\u011Fmalad\u0131 ve ta\u015F\u0131 sava\u015F ganimeti olarak ba\u015Fkentine ta\u015F\u0131d\u0131. Hammurabi\u2019nin ad\u0131n\u0131 silip kendi ad\u0131n\u0131 kaz\u0131maya ba\u015Flad\u0131 \u2014 ama bitiremedi. Ta\u015F, \u00FC\u00E7 bin y\u0131l\u0131 a\u015Fk\u0131n s\u00FCre y\u0131k\u0131nt\u0131lar\u0131n alt\u0131nda kald\u0131; \u00FCzerinden uygarl\u0131klar geldi ge\u00E7ti, hi\u00E7biri onun orada oldu\u011Funu bilmedi.",
    },
    {
      text: "Frans\u0131z arkeolog Jacques de Morgan, Aral\u0131k 1901\u2019de bug\u00FCnk\u00FC \u0130ran\u2019\u0131n \u015Eu\u015F kentinde ta\u015F\u0131 topraktan \u00E7\u0131kard\u0131. Ke\u015Fif bomba etkisi yaratt\u0131. Bilgin Jean-Vincent Scheil ertesi y\u0131l metni \u00E7evirdi\u011Finde, Hammurabi\u2019nin yasalar\u0131yla Tevrat \u2014 \u00F6zellikle \u00C7\u0131k\u0131\u015F Kitab\u0131 \u2014 aras\u0131ndaki benzerlikler g\u00F6rmezden gelinemezdi. Musa\u2019n\u0131n yasalar\u0131n\u0131n tamamen \u00F6zg\u00FCn oldu\u011Funa inanan akademisyenler, bin y\u0131l\u0131 a\u015Fk\u0131n s\u00FCre \u00F6nce benzer kurallar yazm\u0131\u015F bir Babil kral\u0131yla y\u00FCzle\u015Fmek zorunda kald\u0131.",
    },
    {
      text: "Adalet m\u00FClk\u00FCn temelidir derler. Hammurabi bunu ta\u015Fa kaz\u0131d\u0131 \u2014 hem de zaman\u0131n a\u015F\u0131nd\u0131ramayaca\u011F\u0131 bir ta\u015Fa. Bug\u00FCn o s\u00FCtun Paris\u2019teki Louvre M\u00FCzesi\u2019nde, h\u00E2l\u00E2 g\u00F6\u011Fe uzan\u0131yor. Yasalar\u0131 g\u00FCn\u00FCm\u00FCz \u00F6l\u00E7\u00FCleriyle adil de\u011Fildi; zengini kay\u0131r\u0131yordu, kabul edemeyece\u011Fimiz ac\u0131mas\u0131zl\u0131klar i\u00E7eriyordu. Ama Hammurabi d\u00FCnyaya her imparatorluktan uzun ya\u015Fayan bir fikir b\u0131rakt\u0131: yasa su\u00E7tan \u00F6nce var olmal\u0131, ceza su\u00E7la orant\u0131l\u0131 olmal\u0131 ve bir kral bile kendinden b\u00FCy\u00FCk bir \u015Feye hesap vermeli. D\u00F6rt bin y\u0131l ge\u00E7ti. O fikri h\u00E2l\u00E2 ge\u00E7emedik.",
    },
  ],

  moralOrLesson:
    "Hammurabi\u2019den \u00F6nce adalet, g\u00FC\u00E7l\u00FCn\u00FCn zay\u0131fa dayatt\u0131\u011F\u0131 \u015Feydi. Hammurabi\u2019den sonra adalet \u2014 en az\u0131ndan ilke olarak \u2014 yaz\u0131l\u0131, g\u00F6r\u00FCn\u00FCr ve herkese uygulanabilir hale geldi. Yasalar bug\u00FCnk\u00FC \u00F6l\u00E7\u00FClerle adil de\u011Fildi; s\u0131n\u0131flar aras\u0131nda ayr\u0131m yap\u0131yor, yoksullar\u0131 daha sert cezaland\u0131r\u0131yor ve kabul edemeyece\u011Fimiz uygulamalar i\u00E7eriyordu. Ama devrim niteli\u011Finde bir fikri temele oturttu: yasa su\u00E7tan \u00F6nce var olmal\u0131, ceza orant\u0131l\u0131 olmal\u0131 ve kral bile kendi iradesinden b\u00FCy\u00FCk bir \u015Feye ba\u011Fl\u0131 olmal\u0131. \u00DC\u00E7 bin y\u0131l boyunca kimsenin okuyamad\u0131\u011F\u0131 bir dilde kara ta\u015Fa kaz\u0131nan bu fikir, y\u0131k\u0131lmaz \u00E7\u0131kt\u0131.",

  // ─── Preserved fields from English record ───
  icon: "\u2696\uFE0F",
  storyCategory: "crowns_conquests",
  era: "c. 1755-1750 BCE (code\u2019s promulgation); discovered at Susa, Iran, in 1901-1902",
  tier: "A",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 4,
  image: "",
  thumbnail: "",
  coordinates: { lat: 32.5363, lng: 44.4209 },
  characters: [
    "Hammurabi -- sixth king of the First Babylonian Dynasty (r. 1792-1750 BCE)",
    "Shamash -- the sun god of justice, depicted handing Hammurabi the rod and ring of kingship",
    "Shutruk-Nahhunte -- Elamite king who looted the stele as war booty around 1158 BCE",
    "Jacques de Morgan -- French archaeologist who discovered the stele at Susa in 1901-1902",
    "Jean-Vincent Scheil -- Dominican friar who translated the code and revealed it to the modern world",
  ],
  source:
    "The Code of Hammurabi (Louvre, Sb 8); Scheil, Jean-Vincent. M\u00E9moires de la D\u00E9l\u00E9gation en Perse, vol. 4, 1902 (first translation); Roth, Martha T. Law Collections from Mesopotamia and Asia Minor, Scholars Press, 1995; Van De Mieroop, Marc. King Hammurabi of Babylon: A Biography, Blackwell, 2005; Richardson, Seth. \u2018On Seeing and Believing: Liver Divination and the Era of Warring States,\u2019 in Divination and Interpretation of Signs in the Ancient World, Oriental Institute, 2010; Driver, G.R. and Miles, John C. The Babylonian Laws, 2 vols., Oxford, 1952-1955; Charpin, Dominique. Hammurabi of Babylon, I.B. Tauris, 2012; Laws of Ur-Nammu (c. 2100 BCE); Laws of Eshnunna (c. 1930 BCE)",
  disabled: false,
  updatedAt: Math.floor(Date.now() / 1000),
};

async function main() {
  await doc.send(
    new PutCommand({
      TableName: "Story",
      Item: record,
      ConditionExpression: "attribute_not_exists(siteId)",
    })
  );

  console.log("Turkish version created successfully!");
  console.log(`  siteId: ${record.siteId}`);
  console.log(`  langStoryId: ${record.langStoryId}`);
  console.log(`  title: ${record.title}`);

  let totalChars = 0;
  record.paragraphs.forEach((p, i) => {
    const chars = p.text.length;
    const words = p.text.split(/\s+/).length;
    totalChars += chars;
    console.log(`  P${i + 1}: ${chars} chars, ${words} words`);
  });
  console.log(`  Total: ${totalChars} chars`);
}

main().catch((err) => {
  if (err.name === "ConditionalCheckFailedException") {
    console.error("ERROR: Turkish record already exists! Aborting to prevent overwrite.");
  } else {
    console.error("ERROR:", err.message);
  }
  process.exit(1);
});
