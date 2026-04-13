/**
 * Push "The Birth of Democracy on the Sacred Rock" — Arabic, Persian, Turkish
 * Each version recreated from scratch as a native-born story.
 *
 * Proverbs:
 *   Arabic:  "الثالثة ثابتة" (the third is decisive) — subverted
 *   Persian: "تا سه نشه بازی نشه" (until there's three, it's no game) — subverted
 *   Turkish: "Bir elin nesi var, iki elin sesi var" (one hand has nothing, two hands make a sound) — subverted
 *
 * Usage: node scripts/push-birth-democracy-ar-fa-tr.mjs
 */

import { readFileSync } from "fs";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

// Load .env.local
const envFile = readFileSync(new URL("../.env.local", import.meta.url), "utf-8");
for (const line of envFile.split("\n")) {
  const match = line.match(/^(\w+)\s*=\s*(.+)$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
}

const client = new DynamoDBClient({ region: process.env.AWS_REGION || "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});
const TABLE = process.env.DYNAMO_TABLE_STORY || "Story";
const TIMESTAMP = Math.floor(Date.now() / 1000);

// Shared fields (unchanged from English)
const shared = {
  siteId: "acropolis-athens",
  storyId: "birth-democracy",
  characters: [
    "Cleisthenes",
    "Isagoras",
    "King Cleomenes of Sparta",
    "The Athenian demos",
  ],
  coordinates: { lat: 37.9715, lng: 23.7267 },
  disabled: false,
  era: "508 BCE",
  hasAudio: false,
  icon: "\u2694\uFE0F",
  image: "",
  isFree: true,
  readingTimeMinutes: 2,
  source: "Herodotus\u2019s Histories (Book 5), Aristotle\u2019s Constitution of the Athenians, Thucydides\u2019s History",
  storyCategory: "crowns_conquests",
  thumbnail: "",
  tier: "A",
  updatedAt: TIMESTAMP,
};

function makeParagraphs(texts) {
  return texts.map((text) => ({ text }));
}

// ──────────────────────────────────────────────
// ARABIC (ar)
// Register: Modern storyteller — engaging MSA, not news-broadcast stiff
// Proverb: "الثالثة ثابتة" (the third is decisive / third time's the charm)
// Subversion: what was "proven firm" on the third day was the people's unbreakable will
// ──────────────────────────────────────────────
const arabic = {
  ...shared,
  lang: "ar",
  langStoryId: "ar#birth-democracy",

  title: "حِينَ قالَ الشَّعبُ كَلِمَتَهُ",

  subtitle: "كَيفَ وُلِدَتِ الدِّيمُقراطِيَّةُ فَوقَ صَخرَةٍ مُقَدَّسَةٍ في أَثينا",

  excerpt:
    "السَّنَةُ 508 قَبلَ الميلاد. أثينا عَلى وَشكِ أَن تُطلِقَ أَخطَرَ فِكرَةٍ في تاريخِ البَشَرِيَّة: أَنَّ النّاسَ العادِيِّينَ يَستَطيعونَ أَن يَحكُموا أَنفُسَهُم. لكِنَّ هذِهِ الفِكرَةَ لَم تُولَد في قاعَةِ اجتِماعاتٍ هادِئَة.",

  paragraphs: makeParagraphs([
    "السَّنَةُ 508 قَبلَ الميلاد. أثينا عَلى وَشكِ أَن تُطلِقَ أَخطَرَ فِكرَةٍ في تاريخِ البَشَرِيَّة: أَنَّ النّاسَ العادِيِّينَ يَستَطيعونَ أَن يَحكُموا أَنفُسَهُم. لكِنَّ هذِهِ الفِكرَةَ لَم تُولَد في قاعَةِ اجتِماعاتٍ هادِئَة. وُلِدَت فَوقَ تَلَّةٍ صَخرِيَّةٍ مُحاصَرَة، حينَ وَقَفَ أُناسٌ عادِيُّونَ في وَجهِ أَعتى جُنودِ العالَمِ القَديم.",

    "لِعُقودٍ طَويلَة، حَكَمَ أثينا طُغاةٌ يَفرِضونَ إِرادَتَهُم بِالقُوَّة لا بِالرِّضا. وحينَ أُطيحَ بِآخِرِهِم \u2014 هيبياس \u2014 عامَ 510 قَبلَ الميلاد، لَم يَأتِ الهُدوء. انشَقَّتِ المَدينَةُ بَينَ رَجُلَين: إيساغوراس، الثَّرِيُّ الَّذي أَرادَ أَن يَبقى الحُكمُ لِلأَغنِياء، وكليسثينيس، النَّبيلُ الَّذي راهَنَ رِهانًا لَم يَسبِقهُ إِلَيهِ أَحَد \u2014 أَعطى صَوتًا حَقيقِيًّا لِلفَلّاحينَ والصَّيّادينَ والحِرَفِيِّين.",

    "لَم يَقبَل إيساغوراس بِالهَزيمَة. استَعانَ بِإسبَرطة \u2014 أَقوى دَولَةٍ عَسكَرِيَّةٍ في اليونان \u2014 فَدَخَلَ المَلِكُ كلِيومِينِيس أثينا بِحامِيَةٍ مِنَ الجُنود. حَلّوا مَجلِسَ المَدينَة، ونَفَوا كليسثينيس مَعَ سَبعِمِئَةِ عائِلَة، ثُمَّ احتَلّوا الأَكروبوليس \u2014 التَّلَّةَ المُقَدَّسَةَ الَّتي يُتَوِّجُها مَعبَدُ أَثينا، حارِسَةِ المَدينَة. كانَتِ الرِّسالَةُ واضِحَة: اجلِسوا واسمَعوا الكَلام.",

    "فَفَعَلَ أَهلُ أثينا عَكسَ ذلِكَ تَمامًا. في لَحظَةٍ لا تَزالُ تُحَيِّرُ المُؤَرِّخين، خَرَجَ المَواطِنونَ العادِيُّونَ \u2014 بِلا قائِد، بِلا خُطَّة، بِلا سِلاح \u2014 وَحاصَروا الأَكروبوليس. تَخَيَّل: خَبّازونَ وصُنّاعٌ وبائِعو سَمَكٍ يُحاصِرونَ أَمهَرَ مُحارِبي العالَمِ القَديم. صَمَدوا يَومَين كامِلَين. وفي اليَومِ الثّالِث \u2014 والثّالِثَةُ ثابِتَة كَما يَقولون \u2014 ثَبَتَ أَنَّ هذا الشَّعبَ لَن يَنكَسِر: استَسلَمَ الإسبَرطِيُّونَ وخَرَجوا مِنَ المَدينَة، وهَرَبَ إيساغوراس مَعَهُم وَلَم يَعُد أَبَدًا.",

    "عادَ كليسثينيس إِلى مَدينَةٍ مُختَلِفَة. الشَّعبُ ذاقَ طَعمَ قُوَّتِهِ ولَن يَتَنازَلَ عَنها. فَأَعطاهُم نِظامًا يَليقُ بِما فَعَلوه: مَجلِسٌ مِن خَمسِمِئَةِ مُواطِنٍ يُختارونَ بِالقُرعَة \u2014 لا بِالمالِ ولا بِاسمِ العائِلَة \u2014 وَجَمعِيَّةٌ مَفتوحَةٌ يَقِفُ فيها أَيُّ مُواطِنٍ لِيَتَكَلَّمَ وَيُصَوِّت. سَمّاها اليونانِيُّونَ \"دِيمُقراطِيا\" \u2014 أَي حَرفِيًّا: حُكمُ الشَّعب. لِأَوَّلِ مَرَّةٍ في التّاريخ، يَحكُمُ الكَثيرونَ لا القِلَّة.",

    "في العُقودِ التّالِيَة، أَصبَحَ الأَكروبوليس نَفسُهُ دَليلًا على ما يَصنَعُهُ الشَّعبُ حينَ يَملِكُ قَرارَه. المَعابِدُ الَّتي ارتَفَعَت هُناكَ \u2014 وَعَلى رَأسِها البارثينون الَّذي لا يَزالُ واقِفًا \u2014 أَقَرَّها تَصويتٌ شَعبِيٌّ وَمَوَّلَتها خَزينَةُ المَدينَة. لا مَلِكٌ أَمَرَ بِبِنائِها، ولا طاغِيَةٌ نَقَشَ اسمَهُ عَلَيها. كُلُّ عَمودٍ تَراهُ هُناكَ هُوَ نَصبٌ تِذكارِيٌّ لِفِكرَةٍ بَسيطَة: أَنَّ النّاسَ العادِيِّين، حينَ يَملِكونَ حُرِّيَّتَهُم، يَبنونَ أَشياءَ استِثنائِيَّة.",

    "الدِّيمُقراطِيَّةُ لَم تَبدَأ بِخُطبَةٍ ولا بِوَثيقَةٍ مُوَقَّعَة. بَدَأَت بِأُناسٍ عادِيِّينَ نَظَروا إِلى تَلَّةٍ يَحتَلُّها الجُنودُ والطُّغاة وقالوا: هذِهِ لَنا. مَضى عَلى ذلِكَ خَمسَةٌ وعِشرونَ قَرنًا، وَلا نَزالُ نَتَجادَلُ حَولَ ما بَدَأوه. لكِنَّ شَيئًا واحِدًا مُؤَكَّد: فِكرَةُ أَنَّ الشَّعبَ يَجِبُ أَن يَحكُمَ نَفسَهُ لَم تَأتِ مِنَ الأَقوِياء \u2014 انتَزَعَها الضُّعَفاء، فَوقَ صَخرَةٍ مُقَدَّسَةٍ في أثينا، في ثَلاثَةِ أَيّامٍ غَيَّرَت وَجهَ العالَم.",
  ]),

  moralOrLesson:
    "الدِّيمُقراطِيَّةُ لَم تَأتِ مِنَ الأَقوِياء \u2014 انتَزَعَها مَواطِنونَ عادِيُّون. حينَ احتَلَّ الجُنودُ صَخرَتَهُمُ المُقَدَّسَة، حاصَرَهُمُ الأَثينِيُّونَ واستَرَدُّوها في ثَلاثَةِ أَيّام.",
};

// ──────────────────────────────────────────────
// PERSIAN (fa)
// Register: Natural modern Persian prose — engaging, not literary-heavy
// Proverb: "تا سه نشه بازی نشه" (until there's three, it's no game / third time's the charm)
// Subversion: the "game" ended on the third day — but the real game (democracy) was just beginning
// ──────────────────────────────────────────────
const persian = {
  ...shared,
  lang: "fa",
  langStoryId: "fa#birth-democracy",

  title: "سه روزی که تاریخ عوض شد",

  subtitle: "داستانِ زایشِ مردم\u200Cسالاری بر فرازِ آکروپولیس",

  excerpt:
    "سال ۵۰۸ پیش از میلاد. آتن در آستانه\u200Cی آن است که خطرناک\u200Cترین ایده\u200Cی تاریخ بشر را به دنیا معرفی کند: اینکه مردم عادی می\u200Cتوانند خودشان بر خودشان حکومت کنند. اما این ایده در یک سالن آرام متولد نشد.",

  paragraphs: makeParagraphs([
    "سال ۵۰۸ پیش از میلاد. آتن در آستانه\u200Cی آن است که خطرناک\u200Cترین ایده\u200Cی تاریخ بشر را به دنیا معرفی کند: اینکه مردم عادی می\u200Cتوانند خودشان بر خودشان حکومت کنند. اما این ایده در یک سالن آرام و پشت درهای بسته متولد نشد. روی یک تپه\u200Cی سنگی، وسطِ یک محاصره، وقتی مردم کوچه و بازار جلوی ترسناک\u200Cترین ارتش دنیای باستان ایستادند.",

    "دهه\u200Cها بود که آتن زیر دست جبّاران بود \u2014 حاکمانی که با زور فرمان می\u200Cراندند، نه با رضایت مردم. وقتی آخرین\u200Cشان \u2014 هیپیاس \u2014 در سال ۵۱۰ پیش از میلاد سرنگون شد، آرامش نیامد. شهر بین دو مرد از هم دوپاره شد: ایساگوراس، اشراف\u200Cزاده\u200Cای که می\u200Cخواست قدرت دست ثروتمندان بماند، و کلیستِنِس، نجیب\u200Cزاده\u200Cای که یک شرط\u200Cبندی بی\u200Cسابقه کرد \u2014 رفت سراغ کوزه\u200Cگرها، ماهیگیرها و کشاورزها و بهشان گفت: صدای شما هم باید شنیده بشود.",

    "ایساگوراس تسلیم نشد. از اسپارت \u2014 قوی\u200Cترین قدرت نظامی یونان \u2014 کمک خواست. شاه کلئومِنِس با لشکری از سربازان وارد آتن شد. شورای شهر را منحل کردند، کلیستِنِس را با هفتصد خانواده تبعید کردند، و آکروپولیس \u2014 تپه\u200Cی مقدّسی که معبد آتِنا، الهه\u200Cی نگهبان شهر، بر فرازش بود \u2014 را تصرّف کردند. پیام\u200Cشان روشن بود: بنشینید و اطاعت کنید.",

    "مردم آتن دقیقاً برعکسش را انجام دادند. در لحظه\u200Cای که هنوز مورّخان را متحیّر می\u200Cکند، شهروندان عادی \u2014 بدون رهبر، بدون نقشه، بدون اسلحه \u2014 آکروپولیس را محاصره کردند. یک لحظه تصوّر کن: نانوا و کفاش و ماهی\u200Cفروش، جلوی جنگاورترین سربازان دنیای باستان صف کشیده\u200Cاند. دو روز دوام آوردند. و روز سوم \u2014 می\u200Cگویند تا سه نشه بازی نشه \u2014 بازی تمام شد: اسپارتی\u200Cها تسلیم شدند و از شهر بیرون رفتند. ایساگوراس هم با آن\u200Cها فرار کرد و دیگر برنگشت.",

    "کلیستِنِس به شهری دیگر بازگشت. مردم مزه\u200Cی قدرت خودشان را چشیده بودند و حاضر نبودند پسش بدهند. پس ساختاری ساخت هم\u200Cشأن کاری که کرده بودند: شورایی از پانصد شهروند که با قرعه\u200Cکشی انتخاب می\u200Cشدند \u2014 نه با پول، نه با نام خانوادگی \u2014 و مجلسی باز که هر شهروندی می\u200Cتوانست در آن بایستد، حرف بزند و رأی بدهد. یونانی\u200Cها اسمش را گذاشتند \u00ABدموکراتیا\u00BB \u2014 یعنی حکومتِ مردم. برای نخستین بار در تاریخ، اکثریت حکم می\u200Cراند، نه اقلیت.",

    "در دهه\u200Cهای بعد، خودِ آکروپولیس گواهی شد بر آنچه مردم آزاد می\u200Cتوانند بسازند. معبدهایی که بالای آن تپه قد کشیدند \u2014 از جمله پارتنون که هنوز سرپاست \u2014 با رأی مردم تصویب شدند و از خزانه\u200Cی عمومی شهر ساخته شدند. نه پادشاهی دستور ساختشان را داد، نه جبّاری نامش را رویشان حک کرد. هر ستونی که آنجا می\u200Cبینی، یادبودی\u200Cست برای یک ایده\u200Cی ساده: وقتی آدم\u200Cهای معمولی آزادی واقعی داشته باشند، چیزهای فوق\u200Cالعاده می\u200Cسازند.",

    "مردم\u200Cسالاری نه با یک سخنرانی شروع شد و نه با یک سند امضاشده. با مردم عادی\u200Cای شروع شد که به تپه\u200Cای نگاه کردند که سربازان و جبّاران اشغالش کرده بودند و گفتند: اینجا مالِ ماست. بیست\u200Cوپنج قرن از آن روز گذشته و ما هنوز داریم درباره\u200Cی آنچه شروع کردند بحث می\u200Cکنیم. اما یک چیز روشن است: ایده\u200Cی اینکه مردم باید خودشان بر خودشان حکومت کنند، از زورمندان نیامد \u2014 ضعیفان آن را گرفتند، بالای صخره\u200Cای مقدّس در آتن، در سه روزی که دنیا را عوض کرد.",
  ]),

  moralOrLesson:
    "مردم\u200Cسالاری از قدرتمندان نیامد \u2014 شهروندان عادی آن را گرفتند. وقتی سربازان صخره\u200Cی مقدّسشان را اشغال کردند، آتنی\u200Cها محاصره\u200Cشان کردند و در سه روز پسش گرفتند.",
};

// ──────────────────────────────────────────────
// TURKISH (tr)
// Register: Natural modern Turkish — engaging documentary narrator
// Proverb: "Bir elin nesi var, iki elin sesi var" (one hand has nothing, two hands make a sound)
// Subversion: a whole city's hands came together, and the "sound" brought Sparta to its knees
// ──────────────────────────────────────────────
const turkish = {
  ...shared,
  lang: "tr",
  langStoryId: "tr#birth-democracy",

  title: "Demokrasi B\u00F6yle Do\u011Fdu",

  subtitle: "S\u0131radan vatanda\u015Flar\u0131n Atina\u2019da tiranl\u0131\u011F\u0131 devirdikleri g\u00FCn",

  excerpt:
    "Y\u0131l, milattan \u00F6nce 508. Atina, insanl\u0131k tarihinin en tehlikeli fikrini d\u00FCnyaya sunmak \u00FCzere: s\u0131radan insanlar\u0131n kendi kendilerini y\u00F6netebilece\u011Fi fikri. Ama bu fikir sessiz bir toplant\u0131 salonunda do\u011Fmad\u0131.",

  paragraphs: makeParagraphs([
    "Y\u0131l, milattan \u00F6nce 508. Atina, insanl\u0131k tarihinin en tehlikeli fikrini d\u00FCnyaya sunmak \u00FCzere: s\u0131radan insanlar\u0131n kendi kendilerini y\u00F6netebilece\u011Fi fikri. Ama bu fikir sessiz bir toplant\u0131 salonunda do\u011Fmad\u0131. Kayal\u0131k bir tepenin \u00FCst\u00FCnde, ku\u015Fatman\u0131n ortas\u0131nda do\u011Fdu \u2014 sade vatanda\u015Flar, antik d\u00FCnyan\u0131n en korkulan askerlerinin kar\u015F\u0131s\u0131na dikildi\u011Finde.",

    "Onlarca y\u0131l boyunca Atina\u2019y\u0131 zorla h\u00FCkmeden tiranlar y\u00F6netmi\u015Fti. Sonuncusu Hippias milattan \u00F6nce 510\u2019da devrilince huzur gelmedi, tam aksine \u015Fehir ikiye b\u00F6l\u00FCnd\u00FC. Bir tarafta \u0130sagoras \u2014 g\u00FCc\u00FCn zenginlerde kalmas\u0131n\u0131 isteyen soylulardan biri. Di\u011Fer tarafta Kleisthenes \u2014 hi\u00E7 kimsenin cesaret edemedi\u011Fi bir hamle yapan asil: \u00E7\u00F6mlek\u00E7ilere, bal\u0131k\u00E7\u0131lara, \u00E7ift\u00E7ilere gitti ve onlara ger\u00E7ek bir s\u00F6z hakk\u0131 vaat etti.",

    "\u0130sagoras buna boyun e\u011Fmedi. Yunanistan\u2019\u0131n en g\u00FC\u00E7l\u00FC askeri devleti Sparta\u2019dan yard\u0131m istedi. Kral Kleomenes bir garnizonla Atina\u2019ya girdi. \u015Eehrin meclisini da\u011F\u0131tt\u0131lar, Kleisthenes\u2019i yedi y\u00FCz aileyle birlikte s\u00FCrg\u00FCne g\u00F6nderdiler ve Akropolis\u2019i ele ge\u00E7irdiler \u2014 \u015Fehrin kalbindeki kutsal tepe, koruyucu tanr\u0131\u00E7a Athena\u2019n\u0131n tap\u0131na\u011F\u0131n\u0131n ta\u00E7land\u0131rd\u0131\u011F\u0131 o y\u00FCkseklik. Mesaj a\u00E7\u0131kt\u0131: oturun ve itaat edin.",

    "Atinal\u0131lar tam tersini yapt\u0131. Tarih\u00E7ileri bug\u00FCn bile \u015Fa\u015F\u0131rtan bir anda, s\u0131radan vatanda\u015Flar \u2014 komutans\u0131z, plans\u0131z, silahs\u0131z \u2014 Akropolis\u2019i ku\u015Fatt\u0131. Bir d\u00FC\u015F\u00FCn: f\u0131r\u0131nc\u0131lar, kundurac\u0131lar, pazar esnaf\u0131; kar\u015F\u0131lar\u0131nda antik d\u00FCnyan\u0131n en keskin sava\u015F\u00E7\u0131lar\u0131. \u0130ki g\u00FCn dayand\u0131lar. \u00DC\u00E7\u00FCnc\u00FC g\u00FCn, bir elin nesi var iki elin sesi var derler ya \u2014 o g\u00FCn b\u00FCt\u00FCn Atina\u2019n\u0131n elleri bir araya geldi ve \u00E7\u0131kan ses Spartal\u0131lar\u0131 dize getirdi. Teslim oldular ve \u015Fehirden \u00E7\u0131kt\u0131lar. \u0130sagoras da onlarla birlikte ka\u00E7t\u0131, bir daha da d\u00F6nmedi.",

    "Kleisthenes bamba\u015Fka bir \u015Fehre d\u00F6nd\u00FC. Halk kendi g\u00FCc\u00FCn\u00FCn tad\u0131n\u0131 alm\u0131\u015Ft\u0131 ve geri vermeyecekti. O da halka yapt\u0131klar\u0131na yak\u0131\u015F\u0131r bir d\u00FCzen kurdu: servetle ya da soyadiyla de\u011Fil, kurayla se\u00E7ilen be\u015F y\u00FCz ki\u015Filik bir meclis ve her vatanda\u015F\u0131n aya\u011Fa kalk\u0131p konu\u015Fup oy kullanabildi\u011Fi a\u00E7\u0131k bir halk meclisi. Yunanl\u0131lar buna \u201Cdemokratia\u201D dediler \u2014 kelime anlam\u0131yla \u201Chalk\u0131n g\u00FCc\u00FC.\u201D Tarihte ilk kez \u00E7o\u011Funluk y\u00F6netecekti, az\u0131nl\u0131k de\u011Fil.",

    "Sonraki on y\u0131llarda Akropolis\u2019in kendisi, \u00F6zg\u00FCr bir halk\u0131n neler ba\u015Farabilece\u011Finin kan\u0131t\u0131 oldu. O tepenin \u00FCst\u00FCnde y\u00FCkselen tap\u0131naklar \u2014 ba\u015Fta bug\u00FCn h\u00E2l\u00E2 ayakta duran Parthenon \u2014 halk oylamas\u0131yla kabul edilip kamu hazinesinden in\u015Fa edildi. Hi\u00E7bir kral emrini vermedi, hi\u00E7bir tiran ad\u0131n\u0131 kaz\u0131mad\u0131. Orada g\u00F6rd\u00FC\u011F\u00FCn her s\u00FCtun, bir h\u00FCk\u00FCmdara de\u011Fil bir fikre dikilen an\u0131t: s\u0131radan insanlar ger\u00E7ek bir g\u00FCce sahip olunca ola\u011Fan\u00FCst\u00FC \u015Feyler in\u015Fa eder.",

    "Demokrasi bir nutkla ya da imzalanm\u0131\u015F bir belgeyle ba\u015Flamad\u0131. Tepelerindeki kayal\u0131\u011Fa \u2014 askerlerin ve tiranlar\u0131n i\u015Fgal etti\u011Fi o kutsal yere \u2014 bak\u0131p \u201CBuras\u0131 bizim\u201D diyen s\u0131radan insanlarla ba\u015Flad\u0131. Aradan yirmi be\u015F y\u00FCzy\u0131l ge\u00E7ti, onlar\u0131n ba\u015Flatt\u0131\u011F\u0131 \u015Feyi h\u00E2l\u00E2 tart\u0131\u015F\u0131yoruz. Ama bir \u015Fey kesin: halk\u0131n kendi kendini y\u00F6netmesi gerekti\u011Fi fikri g\u00FC\u00E7l\u00FClerden gelmedi \u2014 g\u00FC\u00E7s\u00FCzler ald\u0131 onu, Atina\u2019daki kutsal bir kayan\u0131n \u00FCst\u00FCnde, d\u00FCnyay\u0131 de\u011Fi\u015Ftiren \u00FC\u00E7 g\u00FCnde.",
  ]),

  moralOrLesson:
    "Demokrasi g\u00FC\u00E7l\u00FClerden gelmedi \u2014 g\u00FC\u00E7s\u00FCzler ald\u0131. Askerler kutsal kayalar\u0131n\u0131 i\u015Fgal edince, s\u0131radan Atinal\u0131lar onlar\u0131 ku\u015Fatt\u0131 ve \u00FC\u00E7 g\u00FCnde geri kazand\u0131.",
};

// ──────────────────────────────────────────────
// VALIDATION
// ──────────────────────────────────────────────

function validate(item, label) {
  const errors = [];

  if (!item.siteId) errors.push("missing siteId");
  if (!item.langStoryId) errors.push("missing langStoryId");
  if (!item.lang) errors.push("missing lang");
  if (!item.title) errors.push("missing title");
  if (!item.subtitle) errors.push("missing subtitle");
  if (!item.excerpt) errors.push("missing excerpt");
  if (!item.moralOrLesson) errors.push("missing moralOrLesson");
  if (!item.storyId) errors.push("missing storyId");
  if (!item.paragraphs || item.paragraphs.length === 0) errors.push("missing paragraphs");

  // Check langStoryId format
  if (!item.langStoryId.startsWith(item.lang + "#")) {
    errors.push(`langStoryId "${item.langStoryId}" doesn't start with "${item.lang}#"`);
  }

  // Check paragraph count (6-10 acceptable)
  if (item.paragraphs && (item.paragraphs.length < 6 || item.paragraphs.length > 10)) {
    errors.push(`paragraph count ${item.paragraphs.length} outside 6-10 range`);
  }

  // Check paragraph structure
  for (let i = 0; i < (item.paragraphs || []).length; i++) {
    const p = item.paragraphs[i];
    if (!p.text || typeof p.text !== "string") {
      errors.push(`paragraph ${i} missing or invalid text`);
    } else {
      if (p.text.length > 600) {
        errors.push(`paragraph ${i} too long: ${p.text.length} chars (max 500, soft limit 600)`);
      }
    }
  }

  // Check total character count
  const totalChars = (item.paragraphs || []).reduce((sum, p) => sum + (p.text?.length || 0), 0);
  if (totalChars < 2000 || totalChars > 4500) {
    errors.push(`total paragraph chars ${totalChars} outside acceptable range (2000-4500)`);
  }

  if (errors.length > 0) {
    console.error(`\n  VALIDATION FAILED for ${label}:`);
    errors.forEach((e) => console.error(`    - ${e}`));
    return false;
  }

  console.log(`  ${label}: ${item.paragraphs.length} paragraphs, ${totalChars} total chars \u2714`);
  return true;
}

// ──────────────────────────────────────────────
// VERIFY ENGLISH RECORD EXISTS (safety check)
// ──────────────────────────────────────────────

console.log("\n\uD83D\uDD0D Verifying English source record exists...");
const englishCheck = await docClient.send(
  new GetCommand({
    TableName: TABLE,
    Key: { siteId: "acropolis-athens", langStoryId: "en#birth-democracy" },
    ProjectionExpression: "siteId, langStoryId, title, lang",
  })
);

if (!englishCheck.Item) {
  console.error("\u274C English source record not found! Aborting.");
  process.exit(1);
}
console.log(`  English record confirmed: "${englishCheck.Item.title}" \u2714\n`);

// ──────────────────────────────────────────────
// VALIDATE ALL
// ──────────────────────────────────────────────

console.log("\uD83E\uDDEA Validating JSON records...");
const items = [
  { label: "Arabic (ar)", item: arabic },
  { label: "Persian (fa)", item: persian },
  { label: "Turkish (tr)", item: turkish },
];

let allValid = true;
for (const { label, item } of items) {
  if (!validate(item, label)) allValid = false;
}

if (!allValid) {
  console.error("\n\u274C Validation failed. Fix errors above before pushing.");
  process.exit(1);
}

console.log("\n\u2705 All records valid.\n");

// ──────────────────────────────────────────────
// PUSH TO DYNAMODB
// ──────────────────────────────────────────────

for (const { label, item } of items) {
  console.log(`Pushing ${label}...`);
  try {
    await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: item,
      })
    );
    console.log(`  \u2705 ${label} pushed successfully: "${item.title}"`);
  } catch (err) {
    console.error(`  \u274C FAILED for ${label}: ${err.message}`);
    console.error(`     Full error:`, err);
    process.exit(1);
  }
}

console.log("\n\uD83C\uDFC1 All three language versions pushed successfully.");
console.log(`   Updated at: ${TIMESTAMP} (${new Date(TIMESTAMP * 1000).toISOString()})`);
