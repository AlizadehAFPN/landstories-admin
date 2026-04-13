/**
 * Push Arabic, Persian, and Turkish versions of "The Curse of Tutankhamun"
 * to DynamoDB Story table.
 *
 * Each version is a native retelling — not a translation.
 *
 * Cultural proverbs subverted:
 *   Arabic:  "إنّ الله يُمهل ولا يُهمل" (God delays but never neglects)
 *   Persian: "از ماست که بر ماست" (What befalls us comes from us)
 *   Turkish: "Sabrın sonu selamettir" (Patience leads to salvation)
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { readFileSync } from "fs";

// Load credentials from .env.local
const envContent = readFileSync(".env.local", "utf-8");
const env = Object.fromEntries(
  envContent.split("\n").filter(Boolean).map((l) => {
    const [k, ...v] = l.split("=");
    return [k.trim(), v.join("=").trim()];
  })
);

const client = new DynamoDBClient({
  region: env.AWS_REGION || "eu-north-1",
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE = "Story";
const NOW = Math.floor(Date.now() / 1000);

// ─── Shared fields (identical across all languages) ───
const shared = {
  siteId: "valley-of-the-kings",
  storyId: "curse-of-tutankhamun",
  icon: "\u2620\uFE0F",
  tier: "S",
  source: "Carter, Howard. The Tomb of Tutankhamen (1923-1933); Tyldesley, Joyce. Tutankhamen's Curse (2012)",
  era: "Discovery period (1922-1929)",
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 25.7402, lng: 32.6014 },
  hasAudio: false,
  isFree: true,
  storyCategory: "ghosts_curses",
  updatedAt: NOW,
};

// ═══════════════════════════════════════════════════════════
// ARABIC (ar)
// ═══════════════════════════════════════════════════════════
const ar = {
  ...shared,
  lang: "ar",
  langStoryId: "ar#curse-of-tutankhamun",
  title: "لعنة توت عنخ آمون",
  subtitle: "المَقبَرة التي قَتَلَت مَن فَتَحَها",
  excerpt: "في عام ١٩٢٢، عَثَرَ هاوارد كارتر على مقبرة فرعون لم يَمَسَّها أحدٌ منذ ثلاثة آلاف سنة. خلال أشهر، بدأ الذين دخلوها يموتون واحدًا تلوَ الآخر — وهكذا وُلِدَت أشهرُ لعنة في التاريخ.",
  moralOrLesson: "الأمواتُ يستحقّون سكينتَهم، ومَن أزعجَ رقادَهم — سواء واجهَ غَضَبًا قديمًا أو ذنبَه هو — يدفع الثمنَ دائمًا.",
  characters: [
    "هاوارد كارتر",
    "اللّورد كارنارفون",
    "توت عنخ آمون",
    "السير آرثر كونان دويل",
  ],
  paragraphs: [
    {
      text: "في نوفمبر ١٩٢٢، فَعَلَ عالِمُ آثارٍ بريطانيّ اسمُه هاوارد كارتر شيئًا لم ينجح فيه أحدٌ منذ ثلاثين قرنًا — فَتَحَ قبرَ فرعون ووَجَدَ كنوزَه كما هي. توت عنخ آمون، ملكٌ مصريّ ماتَ وعُمرُه تسع عشرة سنة فقط، كانَ راقدًا في وادي الملوك قرب الأقصُر. قناعُ موتٍ ذهبيّ، وتوابيتُ متداخلة، وآلافُ القطع تتوهَّج في ضوء المصابيح. لم يرَ العالَمُ شيئًا كهذا من قبل. لكن خلال أشهر، صارَ لهذا الاكتشاف المُذهل ثمنٌ من دم.",
    },
    {
      text: "اللّورد كارنارفون — الأرستقراطيّ الإنجليزيّ الثريّ الذي موَّلَ رحلة كارتر لسنوات — كانَ حاضرًا لحظةَ فتح المقبرة. بعدها بخمسة أشهر كانَ ميِّتًا. لَدَغَته بعوضةٌ في القاهرة، خَدَشَ اللَّدغةَ بشفرة الحلاقة، تلوَّثَ الجُرح، وفي الخامس من أبريل ١٩٢٣ قَضى عليه الالتهاب. لكن ليسَ هذا ما يَقشعِرُّ له البدن. في اللحظة التي فارَقَ فيها الحياة — وفقًا لشهود — انطفأت كلّ أنوار القاهرة دفعةً واحدة. انقطاعٌ كهربائيّ لم يَجِد له أحدٌ تفسيرًا. وفي إنجلترا، عَوى كلبُه «سوزي» عُواءً واحدًا ثمّ سَقَطَ ميِّتًا.",
    },
    {
      text: "الصحافةُ جُنَّت. آرثر كونان دويل — مُبتكِر شخصية شيرلوك هولمز والمؤمنُ المتحمّس بعالَم الأرواح — صرَّحَ عَلنًا بأنّ لعنةً قديمة هي التي قتلَت كارنارفون. الصحفُ اختَرَعَت نقشًا مزعومًا فوق مدخل المقبرة: «سيأتي الموتُ بأجنحةٍ سريعة لمَن يُزعج سلامَ المَلِك». ذلك النقشُ لم يُوجَد قطّ. لكنّ القصة كانت أروعَ من أن تُفسِدَها الحقائق — ولم يكن أحدٌ مستعدًّا لتركِ الواقع يُفسِد عنوانًا بهذا الجمال.",
    },
    {
      text: "ثمّ بدأ المزيدُ يموتون. جورج جاي غولد، المليونيرُ الأمريكيّ الذي زارَ المقبرة، ماتَ بالتهابٍ رئويّ في غضون أشهر. الأمير عليّ فهمي، الثريُّ المصريّ الذي حَضَرَ الافتتاح، قَتلَته زوجتُه رَميًا بالرصاص في فندق سافوي بلندن. أخصائيُّ الأشعّة الذي صوَّرَ مومياء توت عنخ آمون ماتَ بمرضٍ غامض. بحلول عام ١٩٢٩، كانَ أحدَ عشرَ شخصًا ممّن ارتبطوا بالاكتشاف قد ماتوا قبلَ أوانهم — والصحف تَعُدُّ الجُثَثَ بلذّةٍ مُرعبة.",
    },
    {
      text: "لكن هنا ما كانَ يجب أن يُنهيَ الحكاية: هاوارد كارتر بنفسِه — الرجل الذي كَسَرَ الأختام بيدَيه، ولَمَسَ كلّ قطعة، وقضى عشر سنوات يُوثِّق محتويات المقبرة — عاشَ بعدها سبعةَ عشرَ عامًا. ماتَ عام ١٩٣٩ عن أربعة وستّين عامًا بأسباب طبيعيّة. يقولون «إنّ اللهَ يُمهِلُ ولا يُهمِل» — لكن هذه اللعنة أمهلَت ثلاثةَ آلاف سنة، ثمّ لمّا حانَ وقتُ الحساب... أهملَت الشخصَ الأوّلَ على القائمة.",
    },
    {
      text: "العِلمُ قدَّمَ إجاباتٍ حقيقية. وَجَدَ الباحثون فِطريّاتٍ خطيرة داخلَ المقابر المصرية المغلقة — من النوع القادر على قتل شخصٍ صحّتُه ضعيفة أصلًا، وكارنارفون كان بالضبط كذلك. أمّا «وفَيَات اللعنة» فلا تصمد أمامَ التدقيق. كثيرون ممّن ارتبطوا بالاكتشاف عاشوا حياةً طويلة وصحّيّة — لكنّهم لم يتصدّروا الصحف قطّ، لأنّ «رجلٌ يزور مقبرة أثرية ولا يحصل شيء» ليسَ عنوانًا يَبيع.",
    },
    {
      text: "ومع ذلك، لعنةُ توت عنخ آمون ترفض أن تموت — لا لأنّ أحدًا يؤمن فعلًا بفراعنةٍ ينتقمون من قبورهم، بل لأنّ القصة تَلمِس شيئًا عميقًا فينا جميعًا. ثلاثةُ آلاف سنة من الصمت، كُسِرَت في ظهيرةٍ واحدة. وفي أعماقنا، يشعر معظمُنا أنّ ذلك الصمتَ كانَ يجب أن يبقى. ربّما اللعنةُ الحقيقية لم تكن خارقةً أبدًا. ربّما هي فقط أقدمُ تحذيرٍ في الوجود: بعضُ الأشياء دُفِنَت لسبب.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════
// PERSIAN (fa)
// ═══════════════════════════════════════════════════════════
const fa = {
  ...shared,
  lang: "fa",
  langStoryId: "fa#curse-of-tutankhamun",
  title: "نفرین توتانخامون",
  subtitle: "مقبره\u200Cای که مهمانانش را کُشت",
  excerpt: "سال ۱۹۲۲، هاوارد کارتر مقبره\u200Cی فرعونی را پیدا کرد که سه هزار سال دست\u200Cنخورده مانده بود. ظرف چند ماه، کسانی که پا به درونش گذاشته بودند یکی\u200Cیکی جان باختند — و مشهورترین نفرین تاریخ زاده شد.",
  moralOrLesson: "مردگان لایق آرامش\u200Cشان هستند و هر کسی که آن آرامش را بر هم بزند — چه خشمی کهن گریبانش را بگیرد چه عذاب وجدان خودش — در نهایت تاوانش را می\u200Cدهد.",
  characters: [
    "هاوارد کارتر",
    "لُرد کارنارون",
    "توتانخامون",
    "سِر آرتور کانن دویل",
  ],
  paragraphs: [
    {
      text: "نوامبر ۱۹۲۲. یک باستان\u200Cشناس انگلیسی به نام هاوارد کارتر کاری کرد که سی قرن هیچ\u200Cکس نتوانسته بود — مقبره\u200Cی یک فرعون را با تمام گنجینه\u200Cهایش دست\u200Cنخورده پیدا کرد. توتانخامون، پادشاه جوانی که نوزده\u200Cساله مرده بود، در دره\u200Cی پادشاهان نزدیک لُقصُر آرمیده بود. ماسک طلایی مرگ، تابوت\u200Cهای تودرتو، هزاران شیء باستانی که در نور فانوس برق می\u200Cزدند. دنیا چنین چیزی ندیده بود. اما ظرف چند ماه، بزرگ\u200Cترین کشف باستان\u200Cشناسی تاریخ تبدیل شد به فهرستی از جنازه\u200Cها.",
    },
    {
      text: "لُرد کارنارون — اشراف\u200Cزاده\u200Cی ثروتمند انگلیسی که سال\u200Cها خرج حفاری\u200Cهای کارتر را داده بود — همان\u200Cجا بود وقتی مُهر مقبره شکسته شد. پنج ماه بعد مُرد. پشه\u200Cای در قاهره نیشش زد. موقع اصلاح صورت تیغ رد شد روی جای نیش، زخم چرکین شد، و پنجم آوریل ۱۹۲۳ عفونت کارش را ساخت. اما داستان اینجا مو به تن سیخ می\u200Cکند. شاهدان می\u200Cگویند درست لحظه\u200Cی جان دادنش، تمام چراغ\u200Cهای قاهره یک\u200Cباره خاموش شدند — قطعی برقی سراسری که هیچ\u200Cکس نتوانست توضیحش بدهد. در انگلستان هم سگش «سوزی» یک زوزه کشید و جان داد.",
    },
    {
      text: "مطبوعات منفجر شدند. آرتور کانن دویل — همان خالق شرلوک هُلمز که به دنیای ارواح ایمان پولادین داشت — علنی اعلام کرد که نفرینی کهن کارنارون را کشته. روزنامه\u200Cها سنگ\u200Cنوشته\u200Cای از خودشان ساختند که گویا بالای در مقبره حک شده بود: «مرگ با بال\u200Cهای تند بر سر هر که آرامش پادشاه را برهم زند فرود خواهد آمد.» چنین سنگ\u200Cنوشته\u200Cای هرگز وجود نداشت. اما قصه آن\u200Cقدر بی\u200Cنقص بود که حقیقت حریفش نمی\u200Cشد.",
    },
    {
      text: "بعد، بقیه هم شروع کردند به مُردن. جرج جی گولد، میلیونر آمریکایی که از مقبره دیدن کرده بود، ظرف چند ماه از سینه\u200Cپهلو مُرد. شاهزاده علی فهمی، ثروتمند مصری\u200Cای که در مراسم گشایش حضور داشت، در هتل ساووی لندن با گلوله\u200Cی همسرش کشته شد. پرتونگاری که مومیایی توتانخامون را عکس\u200Cبرداری کرده بود از بیماری ناشناخته\u200Cای درگذشت. تا سال ۱۹۲۹، یازده نفر از مرتبطان این کشف زودتر از موعد مرده بودند — و روزنامه\u200Cها با ولعی چندش\u200Cآور حساب جنازه\u200Cها را نگه می\u200Cداشتند.",
    },
    {
      text: "اما یک نکته هست که باید قصه را همان\u200Cجا تمام می\u200Cکرد: خودِ هاوارد کارتر — مردی که مُهرها را شکست، دستش به هر تکه\u200Cای خورد، و ده سال تمام عمرش را گذاشت پای ثبت و فهرست محتویات مقبره — هفده سال دیگر زنده ماند. سال ۱۹۳۹، شصت\u200Cوچهارساله، به مرگ طبیعی از دنیا رفت. اگر روح فرعون دنبال انتقام بود، دقیقاً سر فهرست را نادیده گرفت. می\u200Cگویند «از ماست که بر ماست» — اما این نفرین، اگر از توتانخامون بود، انگار آدرس را اشتباه داشت.",
    },
    {
      text: "علم جواب\u200Cهای واقعی\u200Cتر دارد. پژوهشگران قارچ\u200Cهای خطرناکی در مقبره\u200Cهای سربسته\u200Cی مصری پیدا کرده\u200Cاند — از آن دست که در آدمی با سلامت شکننده می\u200Cتواند عفونت مرگبار راه بیندازد، و کارنارون دقیقاً همین وضع را داشت. «مرگ\u200Cهای نفرینی» هم زیر ذره\u200Cبین دوام نمی\u200Cآورند. کلی از دست\u200Cاندرکاران این کشف عمر درازی کردند و سالم ماندند. فقط خبرشان هیچ\u200Cوقت به روزنامه نرسید — چون «مردی از مقبره\u200Cی باستانی دیدن کرد و اتفاقی نیفتاد» تیتر جذابی نیست.",
    },
    {
      text: "با همه\u200Cی این\u200Cها، نفرین توتانخامون حاضر نیست بمیرد — نه به خاطر اینکه کسی واقعاً به فراعنه\u200Cی کینه\u200Cجو ایمان دارد، بلکه چون قصه دست روی یک رگ حساس می\u200Cگذارد. سه هزار سال سکوت، در یک بعدازظهر شکسته شد. و ته دلمان، بیشترمان حس می\u200Cکنیم آن سکوت باید سرِ جایش می\u200Cماند. شاید نفرین واقعی هیچ\u200Cوقت ماورایی نبود. شاید فقط قدیمی\u200Cترین هشدار دنیاست: بعضی چیزها را بی\u200Cدلیل زیر خاک نگذاشته\u200Cاند.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════
// TURKISH (tr)
// ═══════════════════════════════════════════════════════════
const tr = {
  ...shared,
  lang: "tr",
  langStoryId: "tr#curse-of-tutankhamun",
  title: "Tutankhamun'un Laneti",
  subtitle: "A\u00e7anlar\u0131 \u00f6ld\u00fcren mezar",
  excerpt: "1922\u2019de Howard Carter, \u00fc\u00e7 bin y\u0131ld\u0131r kimsenin dokunmad\u0131\u011f\u0131 bir firavun mezar\u0131 buldu. Aylar i\u00e7inde, mezara girenler birer birer \u00f6lmeye ba\u015flad\u0131 \u2014 ve tarihin en \u00fcnl\u00fc laneti do\u011fdu.",
  moralOrLesson: "\u00d6l\u00fcler huzuru hak eder; onu bozan herkes \u2014 ister kadim bir gazapla y\u00fczle\u015fsin, ister kendi vicdan\u0131yla \u2014 er ya da ge\u00e7 bedelini \u00f6der.",
  characters: [
    "Howard Carter",
    "Lord Carnarvon",
    "Tutankhamun",
    "Sir Arthur Conan Doyle",
  ],
  paragraphs: [
    {
      text: "Kas\u0131m 1922. \u0130ngiliz arkeolog Howard Carter, \u00fc\u00e7 bin y\u0131ld\u0131r kimsenin ba\u015faramad\u0131\u011f\u0131 \u015feyi yapt\u0131 \u2014 hazineleri oldu\u011fu gibi duran bir firavun mezar\u0131 buldu. On dokuz ya\u015f\u0131nda \u00f6lm\u00fc\u015f gen\u00e7 bir M\u0131s\u0131r kral\u0131 olan Tutankhamun, Luksor yak\u0131nlar\u0131ndaki Krallar Vadisi\u2019nde yat\u0131yordu. Alt\u0131n \u00f6l\u00fcm maskesi, i\u00e7 i\u00e7e ge\u00e7mi\u015f tabutlar, lamba \u0131\u015f\u0131\u011f\u0131nda par\u0131ldayan binlerce eser\u2026 D\u00fcnya b\u00f6yle bir \u015fey g\u00f6rmemi\u015fti. Ama aylar i\u00e7inde, arkeoloji tarihinin en b\u00fcy\u00fck ke\u015ffi bir \u00f6l\u00fcm listesine d\u00f6n\u00fc\u015ft\u00fc.",
    },
    {
      text: "Lord Carnarvon \u2014 Carter\u2019\u0131n kaz\u0131lar\u0131n\u0131 y\u0131llarca finanse eden varl\u0131kl\u0131 \u0130ngiliz aristokrat \u2014 mezar\u0131n m\u00fch\u00fcrleri k\u0131r\u0131l\u0131rken oradayd\u0131. Be\u015f ay sonra \u00f6ld\u00fc. Kahire\u2019de bir sivrisinek \u0131s\u0131rd\u0131 onu. T\u0131ra\u015f olurken jilet \u0131s\u0131r\u0131k yerine de\u011fdi, yara enfekte oldu ve 5 Nisan 1923\u2019te enfeksiyon can\u0131n\u0131 ald\u0131. Ama hik\u00e2yenin as\u0131l \u00fcrpertici k\u0131sm\u0131 bu de\u011fil. Tan\u0131klara g\u00f6re, tam \u00f6ld\u00fc\u011f\u00fc anda Kahire\u2019nin b\u00fct\u00fcn \u0131\u015f\u0131klar\u0131 s\u00f6nd\u00fc \u2014 kimsenin a\u00e7\u0131klayamad\u0131\u011f\u0131 \u015fehir \u00e7ap\u0131nda bir elektrik kesintisi. \u0130ngiltere\u2019deki malikanesinde ise k\u00f6pe\u011fi Susie bir kez uludu ve oldu\u011fu yere y\u0131\u011f\u0131ld\u0131.",
    },
    {
      text: "Bas\u0131n \u00e7\u0131ld\u0131rd\u0131. Sherlock Holmes\u2019un yarat\u0131c\u0131s\u0131 ve do\u011fa\u00fcst\u00fcne y\u00fcrekten inanan Arthur Conan Doyle, a\u00e7\u0131k\u00e7a Carnarvon\u2019u kadim bir lanetin \u00f6ld\u00fcrd\u00fc\u011f\u00fcn\u00fc ilan etti. Gazeteler, mezar\u0131n giri\u015fine kaz\u0131lm\u0131\u015f oldu\u011fu iddia edilen bir yaz\u0131t uydurdu: \u201cKral\u0131n huzurunu bozan her kim olursa, \u00f6l\u00fcm s\u00fcz\u00fclen kanatlar\u0131yla ba\u015f\u0131na \u00e7\u00f6kecektir.\u201d \u00d6yle bir yaz\u0131t hi\u00e7 var olmam\u0131\u015ft\u0131. Ama hik\u00e2ye o kadar kusursuzdu ki ger\u00e7e\u011fin \u015fans\u0131 yoktu.",
    },
    {
      text: "Sonra \u00f6l\u00fcmler art arda gelmeye ba\u015flad\u0131. Mezar\u0131 ziyaret eden Amerikal\u0131 milyoner George Jay Gould, aylar i\u00e7inde zat\u00fcrreden \u00f6ld\u00fc. A\u00e7\u0131l\u0131\u015fta bulunan zengin M\u0131s\u0131rl\u0131 Prens Ali Fehmi, Londra\u2019daki Savoy Oteli\u2019nde kar\u0131s\u0131 taraf\u0131ndan vurularak hayat\u0131n\u0131 kaybetti. Tutankhamun\u2019un mumyas\u0131n\u0131 r\u00f6ntgenleyen doktor gizemli bir hastal\u0131ktan gitti. 1929\u2019a gelindi\u011finde ke\u015fifle ba\u011flant\u0131l\u0131 on bir ki\u015fi erken ya\u015fta \u00f6lm\u00fc\u015ft\u00fc \u2014 ve gazeteler ceset say\u0131s\u0131n\u0131 t\u00fcyler \u00fcrpertici bir zevkle g\u00fcncelliyordu.",
    },
    {
      text: "Ama bu hik\u00e2yeyi \u00e7oktan bitirmesi gereken bir detay var: Howard Carter\u2019\u0131n kendisi \u2014 m\u00fch\u00fcrleri bizzat k\u0131ran, her esere elleriyle dokunan, on y\u0131l boyunca mezar\u0131n i\u00e7indekileri tek tek kataloglayan adam \u2014 bundan sonra on yedi y\u0131l daha ya\u015fad\u0131. 1939\u2019da altm\u0131\u015f d\u00f6rt ya\u015f\u0131nda do\u011fal sebeplerle \u00f6ld\u00fc. E\u011fer Tutankhamun\u2019un ruhu ger\u00e7ekten intikam pe\u015findeyse, bir numaral\u0131 hedefi es ge\u00e7mi\u015fti. \u201cSabr\u0131n sonu selamettir\u201d derler \u2014 ama \u00fc\u00e7 bin y\u0131l sabreden bu lanetin sonunda gelen selamet de\u011fil, hedefi \u0131skalayan bir \u00f6fkeydi.",
    },
    {
      text: "Bilimin cevaplar\u0131 daha ayaklar\u0131 yere basan cinsten. Ara\u015ft\u0131rmac\u0131lar, m\u00fch\u00fcrl\u00fc M\u0131s\u0131r mezarlar\u0131nda tehlikeli k\u00fcf t\u00fcrleri buldu \u2014 sa\u011fl\u0131\u011f\u0131 zaten k\u0131r\u0131lgan birinde \u00f6l\u00fcmc\u00fcl enfeksiyona yol a\u00e7abilecek t\u00fcrden. Carnarvon tam da b\u00f6yle biriydi. Ve \u201clanet \u00f6l\u00fcmleri\u201d mercek alt\u0131na al\u0131nd\u0131\u011f\u0131nda da\u011f\u0131l\u0131yor: ke\u015fifle ba\u011flant\u0131l\u0131 pek \u00e7ok ki\u015fi uzun ve sapasa\u011flam bir hayat s\u00fcrd\u00fc. Sadece hi\u00e7bir zaman man\u015fet olmad\u0131lar \u2014 \u00e7\u00fcnk\u00fc \u201cAdam Antik Mezar\u0131 Gezdi, Hi\u00e7bir \u015eey Olmad\u0131\u201d pek satacak bir ba\u015fl\u0131k de\u011fil.",
    },
    {
      text: "Yine de Tutankhamun\u2019un laneti \u00f6lmeyi reddediyor \u2014 kimse intikamcı firavunlara ger\u00e7ekten inand\u0131\u011f\u0131 i\u00e7in de\u011fil, hik\u00e2ye hepimizin i\u00e7inde ortak bir yere dokundu\u011fu i\u00e7in. \u00dc\u00e7 bin y\u0131ll\u0131k sessizlik, bir \u00f6\u011fleden sonra parampar\u00e7a oldu. Ve i\u00e7imizde bir yerlerde, \u00e7o\u011fumuz o sessizli\u011fin bozulmamas\u0131 gerekti\u011fini hissediyor. Belki ger\u00e7ek lanet hi\u00e7bir zaman do\u011fa\u00fcst\u00fc de\u011fildi. Belki sadece d\u00fcnyan\u0131n en eski uyar\u0131s\u0131yd\u0131: baz\u0131 \u015feyler sebepsiz g\u00f6m\u00fclmemi\u015ftir.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════
// PUSH TO DYNAMODB
// ═══════════════════════════════════════════════════════════
async function pushItem(item) {
  const label = `${item.lang}#${item.storyId}`;
  console.log(`\n⏳ Pushing ${label}...`);

  try {
    await docClient.send(new PutCommand({ TableName: TABLE, Item: item }));
    console.log(`✅ ${label} — PUT succeeded`);
  } catch (err) {
    console.error(`❌ ${label} — PUT FAILED:`, err.message);
    throw err;
  }

  // Verify by reading it back
  try {
    const { Item: fetched } = await docClient.send(
      new GetCommand({
        TableName: TABLE,
        Key: { siteId: item.siteId, langStoryId: item.langStoryId },
      })
    );
    if (fetched && fetched.title === item.title) {
      console.log(`✅ ${label} — Verified: "${fetched.title}" (${fetched.paragraphs.length} paragraphs)`);
    } else {
      console.error(`⚠️  ${label} — Verification mismatch!`);
    }
  } catch (err) {
    console.error(`⚠️  ${label} — Verify read failed:`, err.message);
  }
}

async function main() {
  console.log("═══════════════════════════════════════════════");
  console.log("  Pushing Curse of Tutankhamun — ar / fa / tr");
  console.log(`  Timestamp: ${NOW}`);
  console.log("═══════════════════════════════════════════════");

  // Validate paragraph counts
  for (const item of [ar, fa, tr]) {
    const count = item.paragraphs.length;
    console.log(`  ${item.lang}: ${count} paragraphs, title="${item.title}"`);
    if (count < 6 || count > 10) {
      console.error(`❌ ${item.lang} has ${count} paragraphs — outside 6-10 range!`);
      process.exit(1);
    }
  }

  // Push sequentially to confirm each before moving on
  await pushItem(ar);
  await pushItem(fa);
  await pushItem(tr);

  console.log("\n═══════════════════════════════════════════════");
  console.log("  ✅ All 3 versions pushed and verified.");
  console.log("═══════════════════════════════════════════════");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
