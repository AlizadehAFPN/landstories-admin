import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English) ───
const base = {
  siteId: "gobeklitepe",
  storyId: "garden-of-eden",
  icon: "\u{1F333}",
  tier: "A",
  readingTimeMinutes: 2,
  image: "",
  disabled: false,
  thumbnail: "",
  coordinates: { lng: 38.9224, lat: 37.2233 },
  hasAudio: false,
  isFree: true,
  storyCategory: "gods_monsters",
  source:
    "Klaus Schmidt's writings and interviews, Biblical Book of Genesis, scholarly analyses by David Lewis-Williams and others",
  characters: [
    "Klaus Schmidt",
    "The builders of Göbekli Tepe",
    "Adam and Eve (mythological)",
  ],
  era: "~9600-8000 BC",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════
//  ARABIC — حينَ دَفَنوا الجنَّة
//  Proverb subverted: ﴿إنَّ اللهَ لا يُغيِّرُ ما بقَومٍ حتَّى يُغيِّروا ما بأنفُسِهم﴾
//  (Quran 13:11 — normally about positive self-change;
//   here subverted: the change they made cost them paradise)
// ═══════════════════════════════════════════════════════════════════
const ar = {
  ...base,
  lang: "ar",
  langStoryId: "ar#garden-of-eden",
  title: "حينَ دَفَنوا الجنَّة",
  subtitle: "هل كان غوبِكلي تبِه جنَّة عدن الحقيقيَّة؟",
  excerpt:
    "في تسعينيّات القرن الماضي، حَفَرَ عالِمُ آثارٍ ألمانيّ في تلَّة بجنوب شرق تركيا — فوَجَدَ ما لم يتخيَّل أحدٌ وجوده.",
  moralOrLesson:
    "قد تحمل أسطورة عدن ذاكرةً لتحوُّل البشريَّة من صيَّادين وجامعي ثمار إلى مزارعين — \"سقوط\" من الفِردَوس إلى عالَم الكدّ والمحراث.",
  paragraphs: [
    {
      text: "في مُنتصَف التسعينيّات، قرَّرَ عالِم الآثار الألمانيّ كلاوس شمِيت أن يحفر في تلَّة مجهولة بجنوب شرق تركيا. ما وَجَده قلَبَ كلَّ ما نعرفه عن الماضي رأساً على عَقِب. غوبِكلي تبِه: مَعبَد حجريّ بُنِيَ حوالي 9600 قبل الميلاد — أي قبل أهرامات مصر بسبعة آلاف سنة. والمفاجأة الأكبر؟ مَوقِعُه. في قلب الهلال الخصيب، تحديداً حيث يضع سِفْر التكوين جنَّة عدن — قُرب مَنابع دِجلة والفُرات.",
    },
    {
      text: "قبل أحد عشر ألف سنة، لم يكن هذا المكان الجافّ الذي تراه اليوم. التلال حول غوبِكلي تبِه كانت تفيض بالقمح البرّيّ والشعير والعنب. حيوانات الصيد في كلّ اتّجاه. بالنسبة للصيَّادين وجامعي الثمار الذين عاشوا هنا، كانت الطبيعة مائدةً مفتوحة لا تنفد — لا زراعة ولا كدّ. تخرج من بيتك فتجد الأرض تُطعمك. إن لم يكن هذا هو الفِردَوس، فما هو؟",
    },
    {
      text: "ثمّ جاءت اللحظة التي غيَّرت كلَّ شيء. في هذه المنطقة بالذات، بدأ البشر يزرعون الحبوب ويُدجِّنون الحيوانات ويستقرّون في قرى دائمة. اخترعوا الزراعة. يقول القرآن: ﴿إنَّ اللهَ لا يُغيِّرُ ما بقَومٍ حتَّى يُغيِّروا ما بأنفُسِهم﴾. لكن ماذا لو كان التغيير هذه المرَّة خسارةً لا مكسباً؟ سِفر التكوين يصف سقوط الإنسان بطَردٍ من جنَّة وحُكمٍ عليه بأن يأكل «بعَرَق جبينه». شمِيت رأى أنَّ هذا ليس مصادفة — بل ذاكرة قديمة للحظة استبدلنا فيها الفِردَوس بالمحراث.",
    },
    {
      text: "والأغرب لم يأتِ بعد. حوالي 8000 قبل الميلاد، فَعَلَ أهل غوبِكلي تبِه شيئاً لا يملك أحد تفسيره الكامل. دَفَنوا المَعبَد بأكمله تحت أطنان من التراب — عمداً، بعناية، كأنَّهم يُغلقون عليه إلى الأبد. التوقيت مُرعِب: يتزامن تقريباً مع سيطرة الزراعة على المنطقة. كأنَّهم كانوا يُغلقون باباً على عالَم قديم. وداعٌ أخير لحياة لن تعود.",
    },
    {
      text: "والرموز لا تتوقَّف عند هذا الحدّ. أعمدة الموقع الحجريَّة العملاقة على شكل حرف T قد تُمثِّل أشجاراً — وفي كلّ حلقة، يقف عمودان أطول في المركز. بعض الباحثين يُشبِّهونهما بشجرتَي عدن الشهيرتَين: شجرة الحياة وشجرة المعرفة. وعشرات المنحوتات — ثعالب وأفاعٍ وعقارب ونسور — تبدو كفهرسٍ لمخلوقات من عالَم مفقود. المكان كلُّه بُنِيَ للطقوس، فضاءٌ أقامه البشر ليلمسوا شيئاً أكبر منهم.",
    },
    {
      text: "هل كان غوبِكلي تبِه حَرفيّاً جنَّة عدن؟ على الأرجح لا — فعدن أسطورة، لا نقطة على خريطة. لكنَّ السؤال الحقيقيّ أعمق: هل تحمل واحدة من أقدم قصص البشريَّة صدى لشيء حدث فعلاً؟ تلك اللحظة التي توقَّفنا فيها عن العيش مع البرّيَّة وبدأنا نُعيد تشكيل العالَم على مقاسنا. خيارٌ مَنَحنا الحضارة — وكلَّفنا الفِردَوس.",
    },
    {
      text: "الذين رَفَعوا هذه الأحجار لم يعرفوا كتابةً ولا أدوات معدنيَّة ولا عجلات. عاشوا قبل كلّ ما نسمّيه «حضارة». لكنَّهم وهم يقفون في مَعبَدهم قبل اثني عشر ألف سنة، ربَّما شاهدوا العالَم الذي أحبُّوه يبدأ بالاختفاء — ثمَّ نقلوا تلك الخسارة جيلاً بعد جيل، عبر مئة جيل، حتَّى صارت قصَّة جنَّة وسقوط وعالَم لن يعود كما كان.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
//  PERSIAN — بهشتی که خاک کردند
//  Proverb subverted: «هر که طاووس خواهد، جور هندوستان کشد»
//  (Whoever wants a peacock must endure India — here subverted:
//   what if "India" IS the paradise you lost?)
// ═══════════════════════════════════════════════════════════════════
const fa = {
  ...base,
  lang: "fa",
  langStoryId: "fa#garden-of-eden",
  title: "بهشتی که خاک کردند",
  subtitle: "آیا گوبِکلی‌تپه همان بهشت واقعی بود؟",
  excerpt:
    "در دهه‌ی نودِ میلادی، یک باستان‌شناس آلمانی در تپه‌ای در جنوب شرقی ترکیه حفاری کرد — و چیزی پیدا کرد که نباید وجود می‌داشت.",
  moralOrLesson:
    "شاید اسطوره‌ی عدن خاطره‌ای از دگرگونیِ بشر از شکارچی-گردآوری به کشاورزی را در خود حفظ کرده باشد — «سقوطی» از بهشت به دنیای رنج و زحمت.",
  paragraphs: [
    {
      text: "اواسط دهه‌ی نودِ میلادی بود که کلاوس شمیت، باستان‌شناس آلمانی، دست به حفاری در تپه‌ای گمنام در جنوب شرقی ترکیه زد. چیزی که از زیر خاک بیرون آمد، همه‌ی معادلات را بر هم زد. گوبِکلی‌تپه: معبدی سنگی که حدود ۹۶۰۰ سال پیش از میلاد ساخته شده بود — هفت هزار سال قبل از اهرام مصر. اما نکته‌ی اصلی جایش بود: درست در قلب هلال حاصلخیز، همان‌جایی که تورات باغ عدن را توصیف می‌کند — نزدیک سرچشمه‌ی دجله و فرات.",
    },
    {
      text: "یازده هزار سال پیش، این‌جا اصلاً شبیه چشم‌اندازِ خشکِ امروز نبود. تپه‌های اطراف گوبِکلی‌تپه پُر بود از گندم و جوی وحشی و انگور. حیوانات شکاری همه‌جا پرسه می‌زدند. برای شکارچی-گردآورهایی که این‌جا زندگی می‌کردند، طبیعت یک سفره‌ی بی‌انتها بود — نه نیازی به کاشتن، نه نیازی به جان کندن. از درِ خانه بیرون می‌آمدی و زمین خودش سیرت می‌کرد. اگر این بهشت نیست، پس بهشت چیست؟",
    },
    {
      text: "بعد آمد لحظه‌ای که همه‌چیز را عوض کرد. درست در همین منطقه، انسان‌ها شروع کردند به کاشتن غلّات، نگهداری حیوانات، و ساختن روستاهای دائمی. کشاورزی را اختراع کردند. می‌گویند «هر که طاووس خواهد، جور هندوستان کشد» — اما اگر هندوستان همان بهشتی باشد که از دستش دادی، چه؟ تورات می‌گوید آدم از باغ بیرون انداخته شد و محکوم شد «با عَرَقِ پیشانی‌اش نان بخورد.» شمیت باور داشت این تصادفی نیست — داستان عدن شاید خاطره‌ای کهن باشد از لحظه‌ای که بشر بهشت را با خیش عوض کرد.",
    },
    {
      text: "داستان عجیب‌تر هم می‌شود. حدود ۸۰۰۰ سال پیش از میلاد، مردم گوبِکلی‌تپه کاری کردند که هنوز هیچ‌کس نتوانسته کاملاً توضیحش بدهد. کلِّ مجموعه‌ی معبد را زیر تُن‌ها خاک دفن کردند — عمداً، با دقّت، انگار که می‌خواستند برای همیشه مُهرش کنند. زمان‌بندی‌اش تکان‌دهنده است: تقریباً دقیقاً هم‌زمان با چیرگی کشاورزی بر منطقه. انگار داشتند دَری را به رویِ دنیای قدیم می‌بستند. آخرین خداحافظی با زندگی‌ای که دیگر برنمی‌گشت.",
    },
    {
      text: "نشانه‌های نمادین هم یکی پس از دیگری ردیف می‌شوند. ستون‌های سنگیِ عظیم به شکل T هستند و شاید نمادِ درخت باشند — و در هر حلقه، دو ستون بلندتر در مرکز ایستاده‌اند. بعضی پژوهشگران آن‌ها را به دو درخت معروف عدن تشبیه می‌کنند: درخت زندگی و درخت دانایی. ده‌ها کَنده‌کاریِ حیوانی — روباه، مار، عقرب، لاشخور — شبیه فهرستی از جانداران یک دنیای گم‌شده. تمام این مکان برای آیین ساخته شده بود؛ جایی که انسان‌ها می‌آمدند تا به چیزی فراتر از خودشان دست بزنند.",
    },
    {
      text: "آیا گوبِکلی‌تپه واقعاً همان باغ عدن بود؟ به احتمال زیاد نه — عدن یک اسطوره است، نه نقطه‌ای روی نقشه. ولی سؤال اصلی این نیست. پرسش واقعی این است: آیا یکی از قدیمی‌ترین داستان‌های بشر، پژواکِ چیزی را حمل می‌کند که واقعاً رخ داده؟ لحظه‌ای که دیگر با طبیعت زندگی نکردیم و شروع کردیم دنیا را به شکل خودمان درآوریم. انتخابی که تمدّن را به ما داد — و بهشت را از ما گرفت.",
    },
    {
      text: "کسانی که این سنگ‌ها را بالا بردند نه خطّی بلد بودند، نه ابزار فلزی داشتند، نه چرخ. پیش از تقریباً هر چیزی زندگی می‌کردند که ما اسمش را «تمدّن» می‌گذاریم. اما دوازده هزار سال پیش، ایستاده در آن معبد، شاید دیدند که دنیایی که دوستش داشتند دارد محو می‌شود — و آن از دست دادن را نسل به نسل رد کردند، صد نسل پشت سر هم، تا شد داستان یک باغ، یک سقوط، و دنیایی که دیگر هیچ‌وقت مثل قبل نشد.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
//  TURKISH — Cennetin Gömüldüğü Tepe
//  Proverb subverted: «Merak etmeseydi Âdem, cennette kalırdı»
//  (If Adam hadn't been curious, he'd have stayed in paradise —
//   here subverted: what if curiosity was inevitable,
//   and paradise was exactly the kind of place you couldn't stay?)
// ═══════════════════════════════════════════════════════════════════
const tr = {
  ...base,
  lang: "tr",
  langStoryId: "tr#garden-of-eden",
  title: "Cennetin G\u00f6m\u00fcld\u00fc\u011f\u00fc Tepe",
  subtitle:
    "G\u00f6beklitepe ger\u00e7ekten Aden Bah\u00e7esi miydi?",
  excerpt:
    "1990\u2019larda bir Alman arkeolog, G\u00fcneydo\u011fu Anadolu\u2019daki bir tepenin alt\u0131n\u0131 kazmaya ba\u015flad\u0131 \u2014 ve var olmamas\u0131 gereken bir \u015fey buldu.",
  moralOrLesson:
    "Aden miti, insanl\u0131\u011f\u0131n avc\u0131-toplay\u0131c\u0131l\u0131ktan \u00e7ift\u00e7ili\u011fe d\u00f6n\u00fc\u015f\u00fcm\u00fcn\u00fcn haf\u0131zas\u0131n\u0131 ta\u015f\u0131yor olabilir \u2014 cennetten tar\u0131msal emek d\u00fcnyas\u0131na bir \u201cd\u00fc\u015f\u00fc\u015f.\u201d",
  paragraphs: [
    {
      text: "1990\u2019lar\u0131n ortas\u0131nda Alman arkeolog Klaus Schmidt, G\u00fcneydo\u011fu Anadolu\u2019daki s\u0131radan g\u00f6r\u00fcn\u00fcml\u00fc bir tepeyi kazmaya ba\u015flad\u0131. Topraktan \u00e7\u0131kan \u015fey, tarih hakk\u0131nda bildi\u011fimiz her \u015feyi alt \u00fcst etti. G\u00f6beklitepe: milattan \u00f6nce 9600 civar\u0131nda in\u015fa edilmi\u015f devasa bir ta\u015f tap\u0131nak \u2014 M\u0131s\u0131r piramitlerinden yedi bin y\u0131l daha eski. Ama as\u0131l \u00e7arp\u0131c\u0131 olan konumuydu. Bereketli Hilal\u2019in tam ortas\u0131nda, Tevrat\u2019\u0131n Aden Bah\u00e7esi\u2019ni yerle\u015ftirdi\u011fi b\u00f6lgede \u2014 Dicle ve F\u0131rat\u2019\u0131n do\u011fdu\u011fu yere yak\u0131n.",
    },
    {
      text: "On bir bin y\u0131l \u00f6nce buras\u0131, bug\u00fcn g\u00f6rd\u00fc\u011f\u00fcn\u00fcz kurak manzaradan bambam ba\u015fkayd\u0131. G\u00f6beklitepe\u2019nin \u00e7evresindeki tepeler yabani bu\u011fday, arpa ve \u00fcz\u00fcmle dolup ta\u015f\u0131yordu. Av hayvanlar\u0131 her yerdeydi. Burada ya\u015fayan avc\u0131-toplay\u0131c\u0131lar i\u00e7in do\u011fa t\u00fckenmez bir sofrayd\u0131 \u2014 ne tarla s\u00fcrmek gerekiyordu, ne al\u0131n teri d\u00f6kmek. Kap\u0131ndan \u00e7\u0131k\u0131yorsun, d\u00fcnya seni doyuruyor. E\u011fer bu cennet de\u011filse, nedir?",
    },
    {
      text: "Sonra insanl\u0131k tarihinin belki de en b\u00fcy\u00fck d\u00f6n\u00fcm noktas\u0131 geldi. Tam da bu b\u00f6lgede insanlar tah\u0131l ekmeye, hayvan evcille\u015ftirmeye ve kal\u0131c\u0131 k\u00f6yler kurmaya ba\u015flad\u0131. Tar\u0131m\u0131 icat ettiler. \u201cMerak etmeseydi \u00c2dem, cennette kal\u0131rd\u0131\u201d derler \u2014 ama ya merak ka\u00e7\u0131n\u0131lmazsa? Ya cennet, tam da orada kalamayaca\u011f\u0131n bir yer olduysa? Tevrat, insan\u0131n d\u00fc\u015f\u00fc\u015f\u00fcn\u00fc bir bah\u00e7eden kovulma olarak anlat\u0131r: \u201cAln\u0131n\u0131n teriyle ekme\u011fini yiyeceksin.\u201d Schmidt\u2019e g\u00f6re bu tesad\u00fcf de\u011fildi \u2014 Aden hik\u00e2yesi, cenneti sabanla takas etti\u011fimiz an\u0131n kadim haf\u0131zas\u0131 olabilirdi.",
    },
    {
      text: "\u0130\u015f daha da tuhafla\u015f\u0131yor. M\u00d6 8000 civar\u0131nda G\u00f6beklitepe halk\u0131, kimsenin tam olarak a\u00e7\u0131klayamad\u0131\u011f\u0131 bir \u015fey yapt\u0131. Tap\u0131nak kompleksinin tamam\u0131n\u0131 tonlarca topra\u011f\u0131n alt\u0131na g\u00f6md\u00fc \u2014 kas\u0131tl\u0131 olarak, b\u00fcy\u00fck bir \u00f6zenle, sanki sonsuza dek m\u00fch\u00fcrl\u00fcyorlarm\u0131\u015f gibi. Zamanlamas\u0131 \u00fcrpertici: tar\u0131m\u0131n b\u00f6lgeye h\u00e2kim olmas\u0131yla neredeyse birebir \u00f6rt\u00fc\u015f\u00fcyor. Sanki eski d\u00fcnyaya a\u00e7\u0131lan bir kap\u0131y\u0131 kapat\u0131yorlard\u0131. Geride b\u0131rakt\u0131klar\u0131 hayata son bir veda.",
    },
    {
      text: "Sembolik ba\u011flant\u0131lar da \u00fcst \u00fcste y\u0131\u011f\u0131l\u0131yor. Alan\u0131n devasa T bi\u00e7imli ta\u015f s\u00fctunlar\u0131 a\u011fa\u00e7lar\u0131 temsil ediyor olabilir \u2014 ve her halkan\u0131n merkezinde iki s\u00fctun di\u011ferlerinden daha y\u00fckse\u011fe uzan\u0131yor. Baz\u0131 ara\u015ft\u0131rmac\u0131lar bunlar\u0131 Aden\u2019in iki \u00fcnl\u00fc a\u011fac\u0131yla kar\u015f\u0131la\u015ft\u0131r\u0131yor: Hayat A\u011fac\u0131 ve Bilgi A\u011fac\u0131. D\u00fczinelerce hayvan kabartmas\u0131 \u2014 tilki, y\u0131lan, akrep, akbaba \u2014 kay\u0131p bir d\u00fcnyan\u0131n canl\u0131 katalo\u011fu gibi. Mek\u00e2n\u0131n tamam\u0131 rit\u00fcel i\u00e7in in\u015fa edilmi\u015f; insanlar\u0131n kendilerinden b\u00fcy\u00fck bir \u015feye dokunmaya geldi\u011fi bir yer.",
    },
    {
      text: "G\u00f6beklitepe ger\u00e7ekten Aden Bah\u00e7esi miydi? Muhtemelen hay\u0131r \u2014 Aden bir mit, haritada i\u015faretleyebilece\u011finiz bir yer de\u011fil. Ama as\u0131l mesele bu de\u011fil. As\u0131l soru \u015fu: insanl\u0131\u011f\u0131n en eski hik\u00e2yelerinden biri, ger\u00e7ekten ya\u015fanm\u0131\u015f bir \u015feyin yanks\u0131n\u0131 m\u0131 ta\u015f\u0131yor? Do\u011fayla i\u00e7 i\u00e7e ya\u015famay\u0131 b\u0131rak\u0131p d\u00fcnyay\u0131 kendi kal\u0131b\u0131m\u0131za d\u00f6kmeye ba\u015flad\u0131\u011f\u0131m\u0131z o an. Bize uygarl\u0131\u011f\u0131 veren \u2014 ama cennete mal olan bir tercih.",
    },
    {
      text: "Bu ta\u015flar\u0131 diken insanlar\u0131n ne yaz\u0131lar\u0131 vard\u0131, ne metal aletleri, ne tekerlekleri. \u201cUygarl\u0131k\u201d dedi\u011fimiz hemen her \u015feyden \u00f6nce ya\u015fad\u0131lar. Ama on iki bin y\u0131l \u00f6nce o tap\u0131nakta dururken, sevdikleri d\u00fcnyan\u0131n g\u00f6zlerinin \u00f6n\u00fcnde erimeye ba\u015flad\u0131\u011f\u0131n\u0131 g\u00f6rm\u00fc\u015f olabilirler \u2014 ve o kayb\u0131 ku\u015faktakan ku\u015fa\u011fa aktard\u0131lar. Y\u00fcz ku\u015fak boyunca, ta ki bir bah\u00e7enin, bir d\u00fc\u015f\u00fc\u015f\u00fcn ve bir daha asla eskisi gibi olamayacak bir d\u00fcnyan\u0131n hik\u00e2yesine d\u00f6n\u00fc\u015fene kadar.",
    },
  ],
};

// ─── Push each language ───
async function pushStory(item, label) {
  console.log(`\nPushing ${label}...`);
  console.log(`  siteId:      ${item.siteId}`);
  console.log(`  langStoryId: ${item.langStoryId}`);
  console.log(`  title:       ${item.title}`);
  console.log(`  paragraphs:  ${item.paragraphs.length}`);

  // Validate
  if (!item.siteId || !item.langStoryId || !item.lang || !item.title) {
    throw new Error(`${label}: Missing required fields`);
  }
  if (item.paragraphs.length < 6 || item.paragraphs.length > 10) {
    throw new Error(
      `${label}: Paragraph count ${item.paragraphs.length} out of range`
    );
  }
  for (let i = 0; i < item.paragraphs.length; i++) {
    const t = item.paragraphs[i].text;
    if (!t || t.length === 0) {
      throw new Error(`${label}: Paragraph ${i} is empty`);
    }
    if (t.length > 600) {
      console.warn(`  \u26a0 Paragraph ${i} is ${t.length} chars (target <500)`);
    }
  }

  const totalChars = item.paragraphs.reduce((sum, p) => sum + p.text.length, 0);
  console.log(`  totalChars:  ${totalChars}`);

  try {
    await docClient.send(
      new PutCommand({
        TableName: "Story",
        Item: item,
        ConditionExpression:
          "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
      })
    );
    console.log(`  \u2705 ${label} pushed successfully.`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.error(`  \u274c ${label}: Record already exists! Skipping.`);
    } else {
      console.error(`  \u274c ${label} FAILED:`, err.message);
      throw err;
    }
  }
}

async function main() {
  console.log("\u2550".repeat(55));
  console.log("Garden of Eden \u2014 ar / fa / tr push");
  console.log(`Timestamp: ${now}`);
  console.log("\u2550".repeat(55));

  await pushStory(ar, "ARABIC");
  await pushStory(fa, "PERSIAN");
  await pushStory(tr, "TURKISH");

  console.log("\n\u2705 All three languages pushed successfully.");
}

main().catch((err) => {
  console.error("\n\ud83d\udca5 Fatal error:", err.message);
  process.exit(1);
});
