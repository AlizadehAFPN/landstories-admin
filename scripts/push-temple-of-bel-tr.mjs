import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client);
const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English) ───
const base = {
  siteId: "palmyra",
  storyId: "temple-of-bel",
  icon: "\u{1F3DB}\uFE0F",
  tier: "S",
  source:
    "Seyrig, Henri; Amy, Robert; Will, Ernest. Le Temple de Bel a Palmyre, 1968/1975; Teixidor, Javier. The Pantheon of Palmyra, 1979; UNOSAT satellite imagery analysis, August-September 2015; UNESCO World Heritage Site inscription, 1980; Gawlikowski, Micha\u0142, excavation reports on the Temple of Bel; Browning, Iain. Palmyra, 1979",
  readingTimeMinutes: 3,
  image: "",
  disabled: false,
  thumbnail: "",
  coordinates: { lng: 38.2684, lat: 34.5505 },
  hasAudio: false,
  isFree: true,
  storyCategory: "gods_monsters",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════
// TURKISH — Bel Tapınağı — Tanrılar Gitti, Toz Kaldı
// Proverb: "Sabrın sonu selamettir"
//          (The end of patience is salvation)
// Subverted: The temple was patient for 2,000 years.
//            But what awaited it at the end was not salvation.
// ═══════════════════════════════════════════════════════════════
const turkish = {
  ...base,
  lang: "tr",
  langStoryId: "tr#temple-of-bel",
  title: "Bel Tapınağı \u2014 Tanrılar Gitti, Toz Kaldı",
  subtitle:
    "Suriye \u00E7\u00F6l\u00FCndeki tap\u0131nak iki bin y\u0131l boyunca her imparatorlu\u011Fa, her istilaya, her d\u00F6n\u00FC\u015F\u00FCme g\u00F6\u011F\u00FCs gerip ayakta kald\u0131 \u2014 ta ki yirmi birinci y\u00FCzy\u0131l\u0131n bir \u00F6\u011Fleden sonras\u0131nda birka\u00E7 kilo patlay\u0131c\u0131 her \u015Feyi de\u011Fi\u015Ftirene kadar",
  excerpt:
    "Roma\u2019n\u0131n \u00E7\u00F6k\u00FC\u015F\u00FCne dayand\u0131, Arap fethine dayand\u0131, Ha\u00E7l\u0131 Seferlerine dayand\u0131, Mo\u011Fol istilas\u0131na dayand\u0131, iki d\u00FCnya sava\u015F\u0131na dayand\u0131. Y\u0131k\u0131lmas\u0131 i\u00E7in yirmi birinci y\u00FCzy\u0131ldan bir ideoloji laz\u0131md\u0131 \u2014 ta\u015Flar\u0131n kendisini d\u00FC\u015Fman ilan eden bir ideoloji.",
  era: "MS 32 (kutsanmas\u0131) \u2013 30 A\u011Fustos 2015 (I\u015E\u0130D taraf\u0131ndan y\u0131k\u0131lmas\u0131); 1.983 y\u0131l ayakta kald\u0131",
  characters: [
    "Bel (Palmira\u2019n\u0131n ba\u015F tanr\u0131s\u0131, Babil\u2019in Marduk\u2019unun kar\u015F\u0131l\u0131\u011F\u0131)",
    "Yarhibol (Palmira \u00FC\u00E7l\u00FCs\u00FCn\u00FCn g\u00FCne\u015F tanr\u0131s\u0131)",
    "Aglibol (Palmira \u00FC\u00E7l\u00FCs\u00FCn\u00FCn ay tanr\u0131s\u0131)",
    "Palmira rahipleri ve kutsal ziyafet birlikleri",
    "I\u015E\u0130D militanlar\u0131 (y\u0131k\u0131c\u0131lar, A\u011Fustos 2015)",
  ],
  moralOrLesson:
    "\u0130ki bin y\u0131l boyunca fethe, d\u00F6n\u00FC\u015F\u00FCme ve ihmale direnen bir yap\u0131y\u0131 g\u00FCzellikten nefret edenler de\u011Fil, g\u00FCzelli\u011Fin a\u00E7\u0131\u011Fa vurdu\u011Fu \u015Feyden korkanlar y\u0131kt\u0131 \u2014 onlar\u0131n kesinliklerinden \u00F6nce ba\u015Fka kesinliklerin de var oldu\u011Fu ger\u00E7e\u011Finden. \u0130nsan\u0131n hayret etme yetisi, hakikati tek ba\u015F\u0131na sahiplenme iddias\u0131ndan \u00E7ok daha eski ve \u00E7ok daha kal\u0131c\u0131d\u0131r.",
  paragraphs: [
    {
      text: "Milattan sonra 32 y\u0131l\u0131. \u0130sa\u2019n\u0131n Kud\u00FCs surlar\u0131n\u0131n d\u0131\u015F\u0131nda \u00E7arm\u0131ha gerildi\u011Fi on y\u0131l\u0131n tam ortas\u0131. Suriye \u00E7\u00F6l\u00FCn\u00FCn kalbindeki Palmira\u2019da rahipler, o g\u00FCne kadar g\u00F6r\u00FClm\u00FC\u015F en g\u00F6rkemli tap\u0131na\u011F\u0131 bitirdiler. Ad\u0131n\u0131 Bel\u2019e adad\u0131lar: Evrenin Efendisi. Babil\u2019in Marduk\u2019undan g\u00FC\u00E7 alm\u0131\u015F, Yunan\u2019\u0131n Zeus\u2019undan heybet alm\u0131\u015F ama ikisine de benzemeyen bir tanr\u0131. \u00DCstelik tek ba\u015F\u0131na h\u00FCkmetmiyordu. G\u00FCne\u015F tanr\u0131s\u0131 sa\u011F\u0131nda, ay tanr\u0131s\u0131 solunda duruyordu. \u00DC\u00E7\u00FC birlikte g\u00F6ky\u00FCz\u00FCn\u00FCn sahibiydi.",
    },
    {
      text: "D\u0131\u015Far\u0131dan bak\u0131nca s\u0131radan bir Yunan tap\u0131na\u011F\u0131yd\u0131: alt\u0131n rengi devasa s\u00FCtunlar, klasik bir cephe, her \u015Fey kitab\u0131na uygun. Ama kap\u0131dan bir ad\u0131m at\u0131nca b\u00FCt\u00FCn kurallar alt \u00FCst oluyordu. Giri\u015F yanl\u0131\u015F taraftayd\u0131. Tavan kubbe de\u011Fil d\u00FCmd\u00FCzd\u00FC. Pencerelerden i\u00E7eri \u0131\u015F\u0131k ak\u0131yordu \u2014 neredeyse hi\u00E7bir antik tap\u0131na\u011F\u0131n cesaret edemedi\u011Fi bir \u015Fey. Ana suna\u011F\u0131n tam \u00FCst\u00FCnde, devasa bir ta\u015F blo\u011Fa d\u00FCnyan\u0131n en eski bur\u00E7 haritalar\u0131ndan biri kaz\u0131nm\u0131\u015Ft\u0131. Tap\u0131nak, Palmira\u2019n\u0131n ta kendisiydi ta\u015Fa d\u00F6k\u00FClm\u00FC\u015F h\u00E2liyle: Do\u011Fu ile Bat\u0131 aras\u0131nda durup taraf tutmay\u0131 reddeden bir \u015Fehir.",
    },
    {
      text: "Buras\u0131 sadece dua edilen bir yer de\u011Fildi \u2014 burada ziyafet verilirdi. Devasa avlunun \u00E7evresine yemek salonlar\u0131 dizilmi\u015Fti; y\u00FCzlerce ki\u015Fi kutsal sofralar i\u00E7in bir araya gelirdi. Koyun, ke\u00E7i, hatta deve eti yenirdi. \u015Earap elden ele dola\u015F\u0131r, t\u00FCts\u00FC t\u00FCterdi, rahipler her \u015Feye g\u00F6z kulak olurdu. Zengin yurtta\u015Flar bu \u015F\u00F6lenlerin masraf\u0131n\u0131 kar\u015F\u0131lar, adlar\u0131n\u0131 duvarlara kaz\u0131t\u0131rd\u0131 \u2014 unutulmas\u0131nlar diye. Kal\u0131nt\u0131lar\u0131n aras\u0131ndan binlerce k\u00FC\u00E7\u00FCk pi\u015Fmi\u015F toprak jeton \u00E7\u0131kt\u0131: giri\u015F biletleri. Her birini bir zamanlar k\u0131zarm\u0131\u015F etin kokusunu takip eden biri tutmu\u015Ftu \u2014 tanr\u0131lar\u0131yla ayn\u0131 sofraya oturmak \u00FCzere.",
    },
    {
      text: "Tap\u0131nak, tarihin \u00FCst\u00FCne ne f\u0131rlatt\u0131ysa hepsine g\u00F6\u011F\u00FCs gerdi. Roma H\u0131ristiyan olup pagan ibadeti yasaklay\u0131nca onu kiliseye \u00E7evirdiler \u2014 bu can\u0131n\u0131 kurtard\u0131. Araplar yedinci y\u00FCzy\u0131lda Suriye\u2019yi fethedince kiliseyi camiye \u00E7evirdiler \u2014 bu da can\u0131n\u0131 kurtard\u0131. Duvarlar\u0131n\u0131n i\u00E7inde zamanla koca bir k\u00F6y kuruldu. \u0130ki binli y\u0131llara gelindi\u011Finde d\u00FCnyan\u0131n en iyi korunmu\u015F antik tap\u0131naklar\u0131ndan biriydi. Roma \u0130mparatorlu\u011Fu y\u0131k\u0131ld\u0131, Ha\u00E7l\u0131 Seferleri ge\u00E7ti, Mo\u011Follar geldi gitti, iki d\u00FCnya sava\u015F\u0131 bitti \u2014 tap\u0131nak ayaktayd\u0131. \u2018Sabr\u0131n sonu selamettir\u2019 derler. \u0130ki bin y\u0131l sabretti. Ama onu bekleyen selamet de\u011Fildi.",
    },
    {
      text: "30 A\u011Fustos 2015. I\u015E\u0130D\u2019in Halid el-Esad\u2019\u0131 infaz etmesinin \u00FCzerinden hen\u00FCz on iki g\u00FCn ge\u00E7mi\u015Fti \u2014 tap\u0131na\u011F\u0131n elli y\u0131ll\u0131k bek\u00E7isi, seksen \u00FC\u00E7 ya\u015F\u0131ndaki arkeolog. Militanlar binay\u0131 patlay\u0131c\u0131larla doldurup havaya u\u00E7urdu. Uydu g\u00F6r\u00FCnt\u00FCleri d\u00FCnyan\u0131n korktu\u011Funu do\u011Frulad\u0131: i\u00E7 tap\u0131nak yerle bir edilmi\u015Fti. \u0130mparator Tiberius hen\u00FCz hayattayken kaz\u0131lan bur\u00E7 tavan\u0131 toz olmu\u015Ftu. S\u00FCtunlar, oymalar, tanr\u0131lar\u0131n ta\u015Fa i\u015Flenmi\u015F y\u00FCzleri \u2014 hi\u00E7biri kalmam\u0131\u015Ft\u0131. Tek bir \u015Fey ayaktayd\u0131: ana kap\u0131. Y\u0131k\u0131nt\u0131n\u0131n ortas\u0131nda yapayaln\u0131z dikiliyordu. Art\u0131k arkas\u0131nda bo\u015F g\u00F6ky\u00FCz\u00FCnden ba\u015Fka hi\u00E7bir \u015Fey yoktu.",
    },
    {
      text: "O kap\u0131, y\u00FCzy\u0131l\u0131m\u0131z\u0131n en y\u00FCrek burkan g\u00F6r\u00FCnt\u00FClerinden biri oldu \u2014 arkas\u0131nda hi\u00E7bir \u015Fey olmayan bir giri\u015F. Bel Tap\u0131na\u011F\u0131\u2019n\u0131n var oldu\u011Fu d\u00FCnya ile art\u0131k olmad\u0131\u011F\u0131 d\u00FCnya aras\u0131nda bir e\u015Fik. Ziyafet jetonlar\u0131 \u015Fimdi m\u00FCzelerin vitrinlerinde. Palmira\u2019n\u0131n \u00F6l\u00FCleri Paris ve Londra\u2019daki camek\u00E2nlardan bak\u0131yor. Ama her \u015Feyin bir araya geldi\u011Fi o yer \u2014 rahiplerin t\u00FCts\u00FC yakt\u0131\u011F\u0131, t\u00FCccarlar\u0131n tanr\u0131lar\u0131yla sofra kurdu\u011Fu, Do\u011Fu\u2019yla Bat\u0131\u2019n\u0131n her s\u00FCtunda bulu\u015Ftu\u011Fu yer \u2014 Suriye \u00E7\u00F6l\u00FCnde bir moloz y\u0131\u011F\u0131n\u0131. \u0130ki bin y\u0131l boyunca her \u015Feye dayand\u0131. Ta\u015Flar\u0131n ne anlama geldi\u011Finden korkan adamlar\u0131n bir \u00F6\u011Fleden sonras\u0131na dayanamad\u0131.",
    },
  ],
};

// ─── Validation ───
console.log("═".repeat(55));
console.log("  Bel Tapınağı — Turkish (tr) validation & push  ");
console.log("═".repeat(55));

let totalChars = 0;
let valid = true;
for (let i = 0; i < turkish.paragraphs.length; i++) {
  const text = turkish.paragraphs[i].text;
  const charCount = text.length;
  const wordCount = text.split(/\s+/).length;
  totalChars += charCount;
  console.log(`P${i + 1}: ${charCount} chars, ${wordCount} words`);
  if (charCount > 600) {
    console.error(`  ⚠ WARNING: Paragraph ${i + 1} exceeds 600 chars`);
    valid = false;
  }
  if (wordCount > 120) {
    console.error(`  ⚠ WARNING: Paragraph ${i + 1} exceeds 120 words`);
    valid = false;
  }
}
console.log(`\nTotal: ${totalChars} chars, ${turkish.paragraphs.length} paragraphs`);
console.log(`Target: ~3000 chars (±20% = 2400-3600), 6-8 paragraphs\n`);

if (totalChars < 2400 || totalChars > 3600) {
  console.error(`⚠ Total character count ${totalChars} is outside acceptable range.`);
  valid = false;
}

// Validate JSON integrity
const json = JSON.stringify(turkish);
JSON.parse(json);
console.log(`✓ JSON valid (${json.length} bytes)`);

if (!valid) {
  console.error("\n✗ Validation failed. Aborting push.");
  process.exit(1);
}

// ─── Push ───
console.log(`\n⏳ Pushing Turkish (tr)...`);
try {
  await docClient.send(
    new PutCommand({
      TableName: TABLE,
      Item: turkish,
      ConditionExpression:
        "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
    })
  );
  console.log("✅ Turkish (tr) pushed successfully (new record).");
} catch (err) {
  if (err.name === "ConditionalCheckFailedException") {
    console.log("⚠️  Turkish version already exists. Overwriting with updated version...");
    await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: turkish,
      })
    );
    console.log("✅ Turkish (tr) overwritten successfully.");
  } else {
    console.error("✗ Push FAILED:", err.message);
    throw err;
  }
}

console.log(`   siteId: ${turkish.siteId}`);
console.log(`   langStoryId: ${turkish.langStoryId}`);
console.log(`   paragraphs: ${turkish.paragraphs.length}`);
console.log(`   updatedAt: ${turkish.updatedAt}`);
console.log("\n" + "═".repeat(55));
console.log("  Done!  ");
console.log("═".repeat(55));
