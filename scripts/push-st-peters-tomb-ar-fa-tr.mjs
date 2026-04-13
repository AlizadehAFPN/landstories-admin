import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English record) ───
const shared = {
  siteId: "vatican-st-peters",
  storyId: "st-peters-tomb-discovery",
  icon: "⛏️",
  tier: "A",
  source:
    "Guarducci, Margherita. The Tomb of St. Peter, 1960; Toynbee and Ward-Perkins, The Shrine of St. Peter, 1956; Walsh, John Evangelist. The Bones of St. Peter, 1982",
  era: "1939-1968",
  readingTimeMinutes: 3,
  image: "",
  disabled: false,
  thumbnail: "",
  coordinates: { lng: 12.4536, lat: 41.9022 },
  hasAudio: false,
  isFree: true,
  storyCategory: "prophets_pilgrims",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════
//  ARABIC (ar)
//  Voice: Confident, warm narrator — quality Arabic documentary.
//  Proverb subverted: «ثلاثةٌ لا تُخفى: الشَّمسُ والقَمَر والحَقّ»
//  → But this truth stayed buried for sixteen centuries.
// ═══════════════════════════════════════════════════════════════════
const ar = {
  ...shared,
  lang: "ar",
  langStoryId: "ar#st-peters-tomb-discovery",
  title: "سِرٌّ تحتَ المَذبَح",
  subtitle:
    "كيفَ كشفَ حَفرٌ روتينيٌّ عن سِرٍّ عُمرُهُ ألفا عامٍ تحتَ أعظمِ كنائسِ العالَم",
  excerpt:
    "في عامِ ١٩٣٩، اختَرقَ عُمّالُ الفاتيكان أرضيّةً رُخاميّةً تحتَ كاتدرائيّةِ القِدّيسِ بُطرُس وسقطوا في ظلامٍ لم يَرَهُ أحدٌ منذُ ستّةَ عشرَ قرنًا.",
  characters: [
    "البابا بيوس الثاني عشر",
    "البابا بولس السادس",
    "مارغريتا غواردوتشي",
    "أنطونيو فيروا",
    "الإمبراطور قسطنطين",
  ],
  moralOrLesson:
    "الإيمانُ وعِلمُ الآثار قد يَلتقيانِ على الحقيقةِ ذاتِها، حتّى لو سَلكا طريقَينِ مُختلفَين",
  paragraphs: [
    {
      text: "في عامِ ١٩٣٩، كانَ عُمّالٌ في الفاتيكان يَحفِرونَ تحتَ كاتدرائيّةِ القِدّيسِ بُطرُس — أكبرِ كنيسةٍ على وَجهِ الأرض — لتَجهيزِ مَدفَنٍ بابويٍّ جديد. لم يكُن في الأمرِ ما يَستَدعي الدَّهشة، إلى أن انهارتِ الأرضيّةُ الرُّخاميّةُ تحتَ أقدامِهم فجأة. سقطوا في ظلامٍ مُطبِق. ولمّا انقشعَ الغُبار، وجدوا أنفسَهم في فراغٍ لم يَدخُلهُ إنسانٌ منذُ ستّةَ عشرَ قرنًا — وأمامَ سِرٍّ قادرٍ على أن يُثبِتَ، أو يَنسِفَ، السَّببَ الذي بُنِيَت لأجلِهِ هذهِ الكنيسة.",
    },
    {
      text: "ما وقعوا فيهِ كانَ مدينةً كاملةً لِلمَوتى — مَقبَرةً رومانيّةً مَختومةً منذُ نحوِ عامِ ٣٢٠ للميلاد. الإمبراطورُ قُسطَنطين، أوَّلُ إمبراطورٍ رومانيٍّ يَعتَنِقُ المَسيحيّة، كانَ قد أمرَ بردمِ هذهِ المَقبَرةِ بالكامل — قبورُ النُّبلاءِ والعَبيدِ المُحرَّرين، الغنيِّ والفقير — ودفنِها تحتَ أطنانِ التُّراب، لسَببٍ واحد: أرادَ أن يَبنيَ كنيستَهُ فوقَ قبرٍ واحدٍ بعَينِه، آمنَ أنّهُ أهمُّ من كلِّ هذهِ القبورِ مُجتمِعة.",
    },
    {
      text: "يُقالُ إنَّ ثلاثةً لا تُخفى: الشَّمسُ، والقَمَر، والحَقّ. لكنَّ هذا الحقَّ ظلَّ مَدفونًا ستّةَ عشرَ قرنًا — إلى أن قرَّرَ البابا بيوس الثاني عشر أن يَكشِفَه. هذا الرّجلُ الذي قادَ الكنيسةَ في أحلَكِ سَنواتِ الحربِ العالميّةِ الثّانية، أَذِنَ سِرًّا بعمليّةِ تَنقيبٍ تحتَ الكاتدرائيّة. لِعَشرِ سَنواتٍ كاملة، زَحفَ فريقٌ صغيرٌ من عُلماءِ الآثارِ في أَنفاقٍ ضيّقة، يكشفونَ قبرًا تِلوَ قبر: رسومًا جِداريّةً قديمة، وفُسَيفِساء، ونقوشًا لاتينيّةً من القرنِ الأوّلِ الميلاديّ.",
    },
    {
      text: "كلّما تقدَّموا غَربًا — نحوَ النُّقطةِ الواقعةِ تمامًا تحتَ المَذبحِ الرئيسيّ — صارتِ القبورُ أبسَط، وأفقَر، وأقدَم. كانوا يَتوغّلونَ في رُقعةٍ من تلّةِ الفاتيكان استُخدِمَت قديمًا لدفنِ عامّةِ النّاسِ والمَحكومينَ بالإعدام. بالضَّبطِ المكانُ الذي سينتهي إليهِ صيّادُ سَمَكٍ مَصلوبٌ من بلدةٍ صغيرةٍ في الجَليل.",
    },
    {
      text: "تحتَ المَذبحِ البابويِّ مباشرةً، عَثروا على ما أذهلَهم: مَزارٌ حَجَريٌّ صغيرٌ بُنيَ حوالَي عامِ ١٦٠ للميلاد. هذا المَزارُ طابقَ وصفًا مكتوبًا تركَهُ كاهنٌ رومانيٌّ اسمُهُ غايوس، كَتبَ نحوَ عامِ ٢٠٠ للميلاد أنّ بإمكانِهِ أن يُريَ الزُّوّارَ «نَصبَ» الرّسولِ بُطرُس على تلّةِ الفاتيكان. كانَ المَزارُ مُستنِدًا إلى جدارٍ مطليٍّ مُغطّىً بصلواتٍ مسيحيّةٍ محفورة. وبينَها عبارةٌ اخترقَتِ القرون: «بِتروس إني» — أي: بُطرُسُ هنا.",
    },
    {
      text: "خلفَ ذلكَ الجدار، داخلَ فراغٍ مَكسوٍّ بالرُّخام، وجدوا عظامًا بَشريّةً ملفوفةً في قُماشٍ أُرجُوانيٍّ مَنسوجٍ بخيوطٍ من ذَهَب — نوعٌ من القماشِ لا يُستخدَمُ إلّا للملوكِ أو لأعلى مَراتبِ التَّقديسِ الدّينيّ. خبيرُ تَشريحٍ فحصَ العظامَ وقرَّرَ أنّها تعودُ لرجلٍ قويِّ البُنية، ماتَ بينَ السّتّينَ والسّبعينَ من عُمرِه. الوَصفُ يتطابقُ بشكلٍ لافتٍ مع ما نعرفُهُ عن الرّسولِ بُطرُس.",
    },
    {
      text: "لكنَّ الاكتشافَ فجَّرَ جَدلًا حادًّا. كبيرُ المُنقِّبين، أنطونيو فيروا، كانَ قد وجدَ عظامًا أخرى في التُّربةِ مباشرةً تحتَ المَزار — وكانَ مُقتنِعًا أنّها الرُّفاتُ الحقيقيّ. لكنَّ مارغَريتا غواردوتشي، المُتخصِّصةَ في النُّقوشِ القديمة، هي التي دافعَت عن عظامِ الجدار. تتبَّعَت تاريخَها في سجلّاتِ الفاتيكان، وبرهنَت أنّها نُقِلَت بهدوءٍ لحمايتِها أثناءَ أعمالِ بناءٍ سابقة.",
    },
    {
      text: "في عامِ ١٩٦٨، خرجَ البابا بولسُ السّادسُ على العالَمِ بكلماتٍ مَوزونةٍ بعناية: «رُفاتُ القدّيسِ بُطرُس تمَّ تحديدُها بطريقةٍ نعتقدُ أنّها مُقنِعة». لكنّهُ توقَّفَ خُطوةً واحدةً قبلَ أن يجعلَها عقيدةً كَنَسيّةً رسميّة — وحتّى اليوم، لا يُطالَبُ أيُّ مسيحيٍّ كاثوليكيٍّ بأن يُؤمنَ أنَّ تلكَ العظامَ تخصُّ بُطرُس.",
    },
    {
      text: "هل تلكَ العظامُ حقًّا لصيّادِ السَّمكِ الذي جاءَ من الجليلِ ومشى مع يسوع؟ رُبّما لن نعرفَ أبدًا. لكنَّ ما لا يمكنُ إنكارُهُ هو هذا: من قبرٍ بسيطٍ في القرنِ الأوّل، إلى مَزارٍ في القرنِ الثّاني، إلى كنيسةِ قُسطَنطين، إلى التُّحفةِ المِعماريّةِ التي تقفُ اليوم — ألفا عامٍ من الإيمان، كلُّها تُشيرُ إلى الأمتارِ المُربَّعةِ ذاتِها من ترابِ روما. ليسَ هذا مُجرَّدَ إيمان. هذهِ علامةٌ على الخريطةِ لم تتحرَّك منذُ ألفَي عام.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
//  PERSIAN (fa)
//  Voice: Warm, contemplative — Persian documentary with a sense
//  of wonder. Conversational but not casual.
//  Proverb subverted: «گر صبر کنی ز غوره حلوا سازی»
//  → But nobody said the halva was buried under the world's
//    greatest church.
// ═══════════════════════════════════════════════════════════════════
const fa = {
  ...shared,
  lang: "fa",
  langStoryId: "fa#st-peters-tomb-discovery",
  title: "رازی زیرِ محراب",
  subtitle:
    "چطور یک حفاری معمولی، رازی دوهزارساله را از زیرِ بزرگ‌ترین کلیسای جهان بیرون کشید",
  excerpt:
    "سال ۱۹۳۹ بود که کارگران واتیکان کفِ سنگی کلیسای سنت پیتر را شکافتند و در تاریکی فرو رفتند — تاریکی‌ای که شانزده قرن هیچ چشمی ندیده بودش.",
  characters: [
    "پاپ پیوس دوازدهم",
    "پاپ پل ششم",
    "مارگریتا گواردوچی",
    "آنتونیو فِروا",
    "امپراتور کنستانتین",
  ],
  moralOrLesson:
    "ایمان و باستان‌شناسی ممکن است از دو مسیر متفاوت حرکت کنند، اما گاهی به یک حقیقت می‌رسند",
  paragraphs: [
    {
      text: "سال ۱۹۳۹ بود. کارگرانی در واتیکان داشتند زیر کلیسای سنت پیتر — بزرگ‌ترین کلیسای جهان — جا باز می‌کردند برای یک مقبرهٔ جدیدِ پاپ. کار معمولی بود، تا اینکه کفِ مرمری زیر پایشان شکست و پرت شدند توی تاریکیِ مطلق. وقتی گرد و خاک نشست، فهمیدند جایی ایستاده‌اند که شانزده قرن است هیچ آدمی پا نگذاشته — و دری باز کرده‌اند به رازی که می‌توانست دلیل ساختِ این کلیسا را ثابت کند یا از بیخ خراب.",
    },
    {
      text: "توی چیزی افتاده بودند شبیه یک شهر زیرزمینیِ مُردگان — یک گورستان رومی که از حدود سال ۳۲۰ میلادی مُهر و موم شده بود. امپراتور کنستانتین، اولین فرمانروای رومی که مسیحیت را پذیرفت، دستور داده بود کل این گورستان را با خاک پُر کنند و صافش کنند — قبرهای اشراف و بردگانِ آزادشده، همه را — فقط به یک دلیل: می‌خواست کلیسایش را دقیقاً بالای یک قبرِ خاص بسازد. قبری که به نظرش از همه مهم‌تر بود.",
    },
    {
      text: "می‌گویند «گر صبر کنی ز غوره حلوا سازی» — ولی کسی نگفته بود حلوایش زیرِ بزرگ‌ترین کلیسای دنیا خاک می‌خورَد. پاپ پیوس دوازدهم — همان مردی که کلیسا را از میان جنگ جهانی دوم عبور داده بود — مخفیانه دستورِ یک کاوش باستان‌شناسی داد. ده سال تمام، یک تیم کوچک در تونل‌های تنگ زیر کلیسا سینه‌خیز رفتند و قبر پشت قبر کشف کردند: نقاشی‌های دیواریِ کهن، موزاییک، کتیبه‌های لاتین از قرن اول میلادی.",
    },
    {
      text: "هر چه به سمت غرب پیش می‌رفتند — به سمت نقطه‌ای درست زیر محراب اصلی — قبرها ساده‌تر، فقیرتر و قدیمی‌تر می‌شدند. داشتند واردِ بخشی از تپهٔ واتیکان می‌شدند که قدیم‌ها جای دفن مردم عادی و اعدامی‌ها بود. دقیقاً همان جایی که یک ماهیگیرِ مصلوب‌شده از یک روستای کوچک در جلیل، به خاک سپرده می‌شد.",
    },
    {
      text: "درست زیر محرابِ پاپ، چیز شگفت‌انگیزی پیدا کردند: یک زیارتگاه سنگیِ کوچک که حدود سال ۱۶۰ میلادی ساخته شده بود. این زیارتگاه دقیقاً با توصیفی جور درمی‌آمد که یک کشیش رومی به نام گایوس حدود سال ۲۰۰ میلادی نوشته بود — اینکه می‌تواند «نشانهٔ» حواریِ پطرس را روی تپهٔ واتیکان به زائران نشان بدهد. دیوار پشت زیارتگاه پُر بود از دعاهای مسیحی که رویش خراشیده بودند. و یک عبارت از میان قرن‌ها فریاد می‌زد: «پتروس اِنی» — پطرس اینجاست.",
    },
    {
      text: "پشت آن دیوار، داخل فضایی که با سنگ مرمر پوشانده شده بود، استخوان‌های انسانی پیدا کردند پیچیده در پارچهٔ ارغوانی بافته‌شده با نخ طلا — جنسی از پارچه که فقط برای شاهان یا بالاترین مقام‌های مقدس استفاده می‌شد. یک کالبدشناس تشخیص داد که استخوان‌ها متعلق به مردی تنومند است که بین شصت تا هفتاد سالگی مرده. مشخصاتی که به‌طرز چشمگیری با آنچه از حواریِ پطرس می‌دانیم همخوانی داشت.",
    },
    {
      text: "اما این کشف جنجال به پا کرد. سرپرست حفاری، آنتونیو فِروا، مجموعهٔ دیگری از استخوان‌ها را در خاک درست زیر زیارتگاه پیدا کرده بود و مطمئن بود آن‌ها بقایای واقعی هستند. اما این مارگریتا گواردوچی بود — متخصص کتیبه‌های باستانی — که از استخوان‌های پشت دیوار دفاع کرد. او ردِّ آن‌ها را در اسناد واتیکان دنبال کرد و نشان داد که برای حفاظت، بی‌سروصدا جابه‌جایشان کرده بودند.",
    },
    {
      text: "سال ۱۹۶۸، پاپ پل ششم با کلماتی حساب‌شده رو به جهان اعلام کرد: «بقایای سنت پیتر به شیوه‌ای شناسایی شده که به نظر ما قانع‌کننده است.» اما یک قدم مانده به اینکه آن را آموزهٔ رسمی کلیسا اعلام کند، ایستاد — و تا همین امروز، هیچ مسیحی کاتولیکی موظف نیست باور کند آن استخوان‌ها متعلق به پطرس است.",
    },
    {
      text: "آیا واقعاً آن استخوان‌ها مال همان ماهیگیری است که از جلیل آمد و همراه عیسی راه رفت؟ شاید هیچ‌وقت نفهمیم. اما چیزی هست که انکارش ممکن نیست: از یک گورِ ساده در قرن اول، به زیارتگاهی در قرن دوم، به کلیسای کنستانتین، تا شاهکار معماری‌ای که امروز سر پا ایستاده — دو هزار سال ایمان، همه‌اش به همان چند متر مربع خاکِ روم اشاره می‌کند. این فقط ایمان نیست. این یک نشانه روی نقشه است که دو هزار سال از جایش تکان نخورده.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
//  TURKISH (tr)
//  Voice: Direct, dramatic, vivid — Turkish documentary narrator
//  who keeps you gripped. Shorter sentences for impact.
//  Proverb subverted: «Sabreden derviş muradına ermiş»
//  → But nobody imagined a dervish crawling through underground
//    tunnels for ten years.
// ═══════════════════════════════════════════════════════════════════
const tr = {
  ...shared,
  lang: "tr",
  langStoryId: "tr#st-peters-tomb-discovery",
  title: "Mihrabın Altındaki Sır",
  subtitle:
    "Sıradan bir kazı, dünyanın en büyük kilisesinin altında iki bin yıllık bir sırrı nasıl gün yüzüne çıkardı",
  excerpt:
    "1939'da Vatikan işçileri Aziz Petrus Bazilikası'nın mermer zeminini delip karanlığa düştüler — on altı yüzyıldır kimsenin görmediği bir karanlığa.",
  characters: [
    "Papa XII. Pius",
    "Papa VI. Paulus",
    "Margherita Guarducci",
    "Antonio Ferrua",
    "İmparator Konstantin",
  ],
  moralOrLesson:
    "İnanç ve arkeoloji, farklı yollardan yürüseler bile bazen aynı gerçeğe ulaşabilir",
  paragraphs: [
    {
      text: "1939 yılı. Vatikan'da bir grup işçi, Aziz Petrus Bazilikası'nın — dünyanın en büyük kilisesinin — altında yeni bir papa mezarı için yer açıyordu. Sıradan bir iş gibi görünüyordu. Sonra mermer zemin ayaklarının altında çöktü ve zifiri karanlığa düştüler. Toz bulutu dağıldığında, on altı yüzyıldır hiçbir insanın adım atmadığı bir yerde durduklarını fark ettiler. Ve bu kilisenin var oluş nedenini kanıtlayabilecek ya da yerle bir edebilecek bir sırra kapı açmışlardı.",
    },
    {
      text: "Düştükleri yer, tam anlamıyla bir ölüler şehriydi — yaklaşık 320 yılından beri mühürlü kalmış bir Roma mezarlığı. Hristiyanlığı benimseyen ilk Roma imparatoru Konstantin, bu mezarlığın tamamını toprakla doldurtup düzletmişti. Soyluların, azat edilmiş kölelerin mezarları — hepsi gömüldü. Tek bir amaç için: kilisesini, diğer tüm mezarlardan daha kıymetli olduğuna inandığı tek bir kabrin tam üstüne inşa etmek.",
    },
    {
      text: "\"Sabreden derviş muradına ermiş\" derler — ama on yıl boyunca yeraltı tünellerinde sürünerek sabretmek zorunda kalacak bir derviş kimsenin aklına gelmemişti. Papa XII. Pius — Kilise'yi İkinci Dünya Savaşı'nın en karanlık yıllarından geçiren adam — gizlice bir arkeolojik kazı başlattı. Tam on yıl, küçük bir arkeolog ekibi bazilikanın altındaki dar tünellerde ilerleyerek mezar üstüne mezar ortaya çıkardı: antik duvar resimleri, mozaikler, birinci yüzyıla ait Latince yazıtlar.",
    },
    {
      text: "Batıya, ana mihrabın tam altındaki noktaya doğru ilerledikçe mezarlar sadeleşti, yoksullaştı, yaşlandı. Vatikan Tepesi'nin bir zamanlar sıradan insanların ve idam edilenlerin gömüldüğü bölgesine giriyorlardı. Celile'den gelmiş, çarmıha gerilmiş bir balıkçının gömüleceği tam da böyle bir yer olurdu.",
    },
    {
      text: "Papa mihrabının tam altında şaşırtıcı bir şey buldular: yaklaşık 160 yılında inşa edilmiş küçük bir taş türbe. Bu türbe, Gaius adlı Romalı bir rahibin yaklaşık 200 yılında yazdığı bir metinle birebir örtüşüyordu — Gaius, ziyaretçilere Vatikan Tepesi'nde havari Petrus'un \"anıtını\" gösterebileceğini yazmıştı. Türbenin dayandığı sıvalı duvar, kazınmış Hristiyan dualarıyla kaplıydı. Ve bir yazı yüzyılları aşarak haykırıyordu: \"Petros eni\" — Petrus burada.",
    },
    {
      text: "O duvarın arkasında, mermerle kaplı bir boşlukta, altın iplikle dokunmuş mor kumaşa sarılmış insan kemikleri buldular. Bu türden kumaş yalnızca kraliyet ailesi ya da en yüce dinî makamlar için kullanılırdı. Bir anatomist kemiklerin güçlü yapılı, altmış ile yetmiş yaşları arasında ölmüş bir erkeğe ait olduğunu belirledi. Bu profil, havari Petrus hakkında bildiklerimizle çarpıcı biçimde örtüşüyordu.",
    },
    {
      text: "Ama bu keşif kıyasıya bir tartışma başlattı. Kazının başındaki arkeolog Antonio Ferrua, türbenin hemen altındaki toprakta başka kemikler bulmuştu ve gerçek kalıntıların bunlar olduğuna emindi. Oysa antik yazıtlar uzmanı Margherita Guarducci, duvardaki kemiklerin savunucusu oldu. Vatikan arşivlerinde iz sürerek kemiklerin daha önceki bir inşaat sırasında koruma amacıyla sessizce taşındığını ortaya koydu.",
    },
    {
      text: "1968'de Papa VI. Paulus, dikkatle tartılmış kelimelerle dünyaya seslendi: \"Aziz Petrus'un kalıntıları, ikna edici olduğuna inandığımız bir şekilde teşhis edilmiştir.\" Ama bunu resmî bir kilise öğretisi ilan etmenin bir adım gerisinde durdu — ve bugün hâlâ hiçbir Katolik, o kemiklerin Petrus'a ait olduğuna inanmak zorunda değil.",
    },
    {
      text: "O kemikler gerçekten Celile'den gelip İsa ile yürüyen balıkçıya mı ait? Belki asla kesin olarak bilemeyeceğiz. Ama inkâr edilemeyecek bir şey var: birinci yüzyıldaki basit bir mezardan ikinci yüzyıldaki türbeye, Konstantin'in bazilikasından bugün ayakta duran Rönesans şaheserine kadar — iki bin yıllık inanç, hep aynı birkaç metrekare Roma toprağına işaret ediyor. Bu sadece inanç değil. Bu, iki bin yıldır yerinden kıpırdamamış bir harita işareti.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
//  VALIDATION & PUSH
// ═══════════════════════════════════════════════════════════════════
function validate(item, label) {
  const errors = [];
  if (!item.siteId) errors.push("Missing siteId");
  if (!item.langStoryId) errors.push("Missing langStoryId");
  if (!item.lang) errors.push("Missing lang");
  if (!item.title) errors.push("Missing title");
  if (!item.subtitle) errors.push("Missing subtitle");
  if (!item.excerpt) errors.push("Missing excerpt");
  if (!item.moralOrLesson) errors.push("Missing moralOrLesson");
  if (!item.paragraphs || item.paragraphs.length < 6)
    errors.push(`Too few paragraphs: ${item.paragraphs?.length}`);
  if (item.paragraphs?.length > 12)
    errors.push(`Too many paragraphs: ${item.paragraphs.length}`);

  let totalChars = 0;
  item.paragraphs?.forEach((p, i) => {
    if (!p.text) {
      errors.push(`Paragraph ${i}: empty text`);
      return;
    }
    totalChars += p.text.length;
    if (p.text.length > 550) {
      errors.push(`Paragraph ${i}: ${p.text.length} chars (max ~500)`);
    }
  });

  // JSON round-trip test
  try {
    const json = JSON.stringify(item);
    JSON.parse(json);
  } catch (e) {
    errors.push(`JSON serialization failed: ${e.message}`);
  }

  console.log(`\n[${label}] Validation:`);
  console.log(`  Title:       ${item.title}`);
  console.log(`  Paragraphs:  ${item.paragraphs?.length}`);
  console.log(`  Total chars: ${totalChars}`);
  if (errors.length > 0) {
    errors.forEach((e) => console.error(`  ERROR: ${e}`));
    return false;
  }
  console.log(`  Status:      PASSED`);
  return true;
}

async function push(item, label) {
  console.log(`  Pushing to DynamoDB...`);
  try {
    await docClient.send(
      new PutCommand({ TableName: TABLE, Item: item })
    );
    console.log(`  SUCCESS: ${label} pushed (langStoryId: ${item.langStoryId})`);
    return true;
  } catch (err) {
    console.error(`  FAILED: ${err.message}`);
    return false;
  }
}

async function main() {
  console.log("═══════════════════════════════════════════════════");
  console.log("  St. Peter's Tomb — ar / fa / tr push");
  console.log(`  Timestamp: ${now}`);
  console.log("═══════════════════════════════════════════════════");

  // Validate all three before pushing any
  const arOk = validate(ar, "ARABIC");
  const faOk = validate(fa, "PERSIAN");
  const trOk = validate(tr, "TURKISH");

  if (!arOk || !faOk || !trOk) {
    console.error("\nValidation failed. Aborting push.");
    process.exit(1);
  }

  console.log("\n--- All validations passed. Pushing... ---\n");

  // Push sequentially, confirm each
  const r1 = await push(ar, "ARABIC");
  if (!r1) { process.exit(1); }

  const r2 = await push(fa, "PERSIAN");
  if (!r2) { process.exit(1); }

  const r3 = await push(tr, "TURKISH");
  if (!r3) { process.exit(1); }

  console.log("\n All 3 languages pushed successfully.");
}

main().catch((err) => {
  console.error("\nFatal error:", err.message);
  process.exit(1);
});
