import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English) ───
const base = {
  siteId: "alamut-castle",
  storyId: "eagles-teaching",
  icon: "\u{1F985}",
  tier: "A",
  readingTimeMinutes: 2,
  image: "",
  disabled: false,
  thumbnail: "",
  coordinates: { lng: 50.5861, lat: 36.4447 },
  hasAudio: false,
  isFree: true,
  storyCategory: "lost_found",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════
//  ARABIC — درسُ النَّسْر
//  Register: Modern MSA storyteller — warm, gripping, not stiff
//  Proverb subverted: «إذا أرادَ اللهُ أمرًا هيَّأَ أسبابَه»
//  (When God wills something, He prepares its means)
// ═══════════════════════════════════════════════════════════════════
const ar = {
  ...base,
  lang: "ar",
  langStoryId: "ar#eagles-teaching",
  title: "درسُ النَّسْر",
  subtitle:
    "حينَ اختارَ نسرٌ صخرةً، وحمَلَ اسمٌ موعدَ قَدَرِه، وأعادت امرأةٌ على ظهرِ بغلٍ اكتشافَ كلِّ شيء",
  excerpt:
    "كانَ حاكمٌ يصطادُ في الجبال حين رأى نسرًا ينقَضُّ من السماء ويحطُّ على صخرةٍ ترتفعُ مِئتَيْ مترٍ فوقَ أرضِ الوادي. في تلك اللحظة، فَهِمَ ما كانَ النسرُ يُعلِّمُه.",
  moralOrLesson:
    "أعظمُ الدروسِ لا تأتي دائمًا من العلماء. أحيانًا تأتي من نسرٍ يختارُ أين يحطّ، ومن اسمٍ يحملُ في حروفه موعدَ قَدَرِه، ومن وادٍ أخفى نفسَهُ بإتقانٍ احتاجَ العالَمُ سبعةَ قرونٍ ليعثُرَ عليه من جديد.",
  source:
    "ابن الأثير، الكامل في التاريخ؛ عطا ملك جويني، تاريخ جهانگشاي (حوالي ١٢٦٠)؛ فريا ستارك، أودية الحشّاشين (١٩٣٤)؛ بيتر ويلي، عشّ النسور (٢٠٠٥)؛ قائمة التراث العالمي المؤقتة لليونسكو؛ الموسوعة الإيرانية",
  characters: [
    "وَهْسودان بن مَرزُبان (الحاكم الجُستاني الذي بنى القلعة)",
    "النسر (الذي اختار الموقع بتحليقه)",
    "فْرِيا ستارك (المستكشفة البريطانية التي أعادت اكتشاف الوادي عام ١٩٣٠)",
    "حسن الصبّاح (الذي حقَّق نبوءة الاسم)",
  ],
  era: "حوالي ٨٤٠م (تأسيس القلعة)؛ ١٠٩٠م (استيلاء حسن الصبّاح)؛ ١٩٣٠ (رحلة ستارك)",
  paragraphs: [
    {
      text: "حوالَيْ عام ٨٤٠ ميلادي، كانَ حاكمٌ يُدعى وَهْسودان يصطادُ في جبالٍ وَعِرة جنوبَ بحرِ قَزْوين — منطقةٌ في شمال إيران بالغةُ الصعوبة حتّى إنَّ الجيوشَ العربيّةَ نفسَها لم تتمكَّن من اختراقِها. وفجأةً، هبطَ نسرٌ ضخمٌ من عَنانِ السماء وحطَّ على صخرةٍ تُشبِهُ نَصْلَ سيف، ترتفعُ مِئتَيْ مترٍ فوقَ قاعِ الوادي. تأمَّلَها وَهْسودان: مُنحدَراتٌ شاهقةٌ من ثلاثِ جهات، مَمَرٌّ وحيدٌ ضيِّقٌ للوصول، ونهرٌ يحرسُ الأسفل. لم يحتج لمَن يُفسِّرَ له المشهد. النسرُ اختارَ لهُ موقعَ حصنٍ لا يُقهَر.",
    },
    {
      text: "بنى حِصنَهُ وسمّاهُ تَيَمُّنًا بالدَّرس. في لهجةِ الدَّيْلَم المحلّيّة، «ألوه» تعني النَّسر، و«آموخت» تعني التعليم. ألوه آموخت — درسُ النَّسر. ردِّدها بسرعة، على آلافِ الألسنة وعبرَ مِئاتِ السنين، وستصبحُ كلمةً واحدة: ألَموت. ظلَّ الحصنُ جاثِمًا على صخرتِهِ قرنَين ونصفًا يتداولُهُ حُكّامٌ محلّيّون — قلعةٌ لا تُضاهى في وادٍ سرّيّ لا يكادُ أحدٌ يعرفُ بوجوده.",
    },
    {
      text: "ثمَّ جاءَ عامُ ١٠٩٠ وتغيَّرَ كلُّ شيء. داعيةٌ مُطارَدٌ اسمُهُ حسن الصبّاح — قائدُ فرعٍ ثوريّ من الإسماعيليّةِ الشيعيّة — تسلَّلَ إلى الوادي واستولى على القلعة بلا قطرةِ دمٍ واحدة. حوَّلَ ألَموت إلى قاعدةٍ لحركةٍ زَلزَلَت العالَمَ الإسلاميَّ قُرابةَ قرنَين من الزمن. لكنَّ أغربَ ما في الحكاية لم يأتِ بعد.",
    },
    {
      text: "في حسابِ الجُمَّل — حيثُ لكلِّ حرفٍ عربيّ قيمةٌ رقميَّة — وجدَ العلماءُ أنَّ مجموعَ حروفِ الاسم الدَّيلميّ القديم «ألوه آموخت» يُساوي ٤٨٣. والعامُ الذي استولى فيهِ حسن على ألَموت؟ ٤٨٣ هِجْري. يقولون: إذا أرادَ اللهُ أمرًا هيَّأَ أسبابَه. لكن مَن كانَ يتخيَّلُ أنَّهُ قد يُخبِّئُ الموعدَ في حروفِ اسمٍ قبلَ الحدَثِ بمِئتَين وخمسينَ سنة؟ سواءٌ سمَّيتَها مُصادَفةً أو قَدَرًا، فالإسماعيليّون لم يكن لديهم أدنى شكّ.",
    },
    {
      text: "عام ١٢٥٦، وصلَ المغول. هدَّموا الأسوار، وأحرقوا المكتبةَ التي كانت تضمُّ نَفائسَ لا تُقدَّرُ بثمن، وأبادوا حامِيَةَ القلعة. عادَ الوادي — المَحبوسُ أصلًا بين جبالٍ شاهقة ومَضيقٍ يُغرِقُهُ الفيضانُ نصفَ السنة — إلى عُزلتِه. لقُرابةِ سبعةِ قرون، لم تعُد ألَموتُ سوى اسمٍ في الأساطير: خلفيّةً لحكاياتِ ماركو بولو المثيرة عن قَتَلَةٍ مُخدَّرين وحدائقَ تُشبِهُ الجنّة، اسمًا على ألسنةِ كُتّابٍ أوروبيّين لم يَرَوا المكانَ ولا كانوا يعرفون أين يقع.",
    },
    {
      text: "عام ١٩٣٠، غادرت سيِّدةٌ إنجليزيَّةٌ في السابعة والثلاثين اسمُها فْرِيا ستارك مدينةَ بغداد على ظهرِ بغل — معها سريرُ مُخيَّم وناموسيَّة وإصرارٌ على العثور على وادي الحشّاشين. كانت رسّامةَ خرائطَ عَصاميَّة، سبقَ أن استكشفَت مناطقَ في الشرقِ الأوسط كانَ معظمُ الأوروبيّين يخشَون الاقتراب منها. عبرَت ممرّاتٍ جبليّة وهي نصفُ مريضةٍ بالمَلاريا، معتمدةً على مُرشدين محلّيّين كلُّ واحدٍ يُسمّي التلَّة الواحدة باسمٍ مختلف. حين وصلَت الصخرة، اكتشفَت أنَّ الخرائطَ الرسميَّة مغلوطةٌ تمامًا — فصحَّحَتها بنفسِها. كتابُها أعادَ ألَموتَ إلى الوجود.",
    },
    {
      text: "اليوم، نحو ثلاثينَ بالمئة من الحصنِ الأصليّ لا يزالُ صامدًا فوقَ صخرتِه. يصعدُ الزوّارُ مِئتَيْ درجةٍ شديدةِ الانحدار ليجدوا بقايا أسوارٍ وورشًا مُهدَّمة وقناةَ مياهٍ نحتَها مُهندسو حسن في الصخر ولا تزالُ تعملُ بعدَ ألفِ سنة. لكنَّ ما يُمسِكُ أنفاسَكَ فوقَ القمّة ليسَ الأطلال — بل النسورُ الذهبيَّة. لا تزالُ هناك، تركبُ الرِّياحَ فوقَ القِمَم، تحومُ في الوادي ذاتِهِ الذي اصطادَ فيهِ وَهْسودان قبلَ اثنَيْ عشرَ قرنًا. النسرُ اختارَ جيِّدًا. والدرسُ باقٍ.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
//  PERSIAN — درس عقاب
//  Register: Modern Persian storyteller — intimate, this is THEIR land
//  Proverb subverted: «آنچه بر پیشانی نوشته شده، چشم باید ببیند»
//  (What's written on the forehead, the eye must see — destiny is inescapable)
// ═══════════════════════════════════════════════════════════════════
const fa = {
  ...base,
  lang: "fa",
  langStoryId: "fa#eagles-teaching",
  title: "درس عقاب",
  subtitle:
    "داستان عقابی که صخره\u200Cاش را انتخاب کرد، نامی که سرنوشت خودش را پنهان کرده بود، و زنی سوار بر قاطر که همه\u200Cچیز را از نو کشف کرد",
  excerpt:
    "حاکمی در کوه\u200Cها مشغول شکار بود که عقابی از آسمان فرود آمد و روی صخره\u200Cای نشست که دویست متر از کف درّه بالاتر بود. همان لحظه فهمید عقاب چه درسی برایش دارد.",
  moralOrLesson:
    "بزرگ\u200Cترین درس\u200Cها همیشه از دانشمندان نمی\u200Cآیند. گاهی از عقابی می\u200Cآیند که تصمیم می\u200Cگیرد کجا فرود بیاید، از نامی که تاریخ سرنوشتش را در حروفش پنهان کرده، و از درّه\u200Cای که آنقدر خوب پنهان شده بود که دنیا هفت قرن طول کشید تا دوباره پیدایش کند.",
  source:
    "ابن\u200Cاثیر، الکامل فی\u200Cالتاریخ؛ عطاملک جوینی، تاریخ جهانگشای (حدود ۱۲۶۰)؛ فریا استارک، درّه\u200Cهای حشّاشین (۱۹۳۴)؛ پیتر ویلی، آشیانه\u200Cی عقاب (۲۰۰۵)؛ فهرست موقت میراث جهانی یونسکو؛ دانشنامه\u200Cی ایرانیکا",
  characters: [
    "وَهسودان بن مرزبان (حاکم جُستانی که قلعه را بنا کرد)",
    "عقاب (که با فرودش مکان را انتخاب کرد)",
    "فِریا استارک (کاشف بریتانیایی که درّه را در ۱۹۳۰ بازکشف کرد)",
    "حسن صبّاح (که پیشگویی نام را محقق کرد)",
  ],
  era: "حدود ۸۴۰ میلادی (بنای قلعه)؛ ۱۰۹۰ میلادی (تصرف حسن صبّاح)؛ ۱۹۳۰ (سفر استارک)",
  paragraphs: [
    {
      text: "حدود سال ۸۴۰ میلادی، حاکمی به نام وَهسودان در کوه\u200Cهای البرز، جنوب دریای خزر مشغول شکار بود \u2014 منطقه\u200Cای آنقدر صعب\u200Cالعبور که حتی لشکرهای عرب هم نتوانسته بودند به دلش نفوذ کنند. ناگهان عقاب بزرگی از آسمان شیرجه رفت و روی تیغه\u200Cی یک صخره نشست؛ صخره\u200Cای که دویست متر از کف درّه بالاتر بود. وهسودان نگاه کرد: سه طرف پرتگاه محض، فقط یک مسیر باریک برای رسیدن، و رودخانه\u200Cای در پایین. به هیچ مشاوری نیاز نداشت. عقاب نشانش داده بود کجا قلعه\u200Cای بسازد که شکست\u200Cناپذیر باشد.",
    },
    {
      text: "قلعه را ساخت و نامش را از همان درس گرفت. در گویش محلی دیلمی، \u00ABاَلوه\u00BB یعنی عقاب و \u00ABآموخت\u00BB یعنی تعلیم. الوه آموخت \u2014 درسِ عقاب. این نام را چند صد سال روی زبان\u200Cها بچرخانید تا بشود یک کلمه: اَلَموت. قلعه دو قرن و نیم روی صخره\u200Cاش نشست و دست\u200Cبه\u200Cدست بین حاکمان محلی چرخید \u2014 دژی بی\u200Cنقص در درّه\u200Cای پنهان که تقریباً هیچ\u200Cکس از وجودش خبر نداشت.",
    },
    {
      text: "تا اینکه سال ۱۰۹۰ میلادی همه\u200Cچیز زیر و رو شد. مبلّغی فراری به نام حسن صبّاح \u2014 رهبر شاخه\u200Cای انقلابی از اسماعیلیان شیعه \u2014 بی\u200Cسر و صدا وارد درّه شد و قلعه را بدون یک قطره خونریزی تصرف کرد. اَلَموت را تبدیل کرد به مقر جنبشی که نزدیک به دو قرن دنیای قرون وسطی را به لرزه درآورد. ولی عجیب\u200Cترین بخش ماجرا این نیست.",
    },
    {
      text: "در حساب ابجد \u2014 که هر حرف عربی یک ارزش عددی دارد \u2014 دانشمندان قرون وسطی کشف کردند که مجموع حروف نام دیلمی قدیم \u00ABالوه آموخت\u00BB می\u200Cشود ۴۸۳. سالی که حسن صبّاح اَلَموت را گرفت؟ ۴۸۳ هجری قمری. می\u200Cگویند آنچه بر پیشانی نوشته شده، چشم باید ببیند. ولی اینجا سرنوشت روی پیشانی هیچ\u200Cکس نوشته نشده بود \u2014 پنهانش کرده بودند لای حروف یک نام، دویست و پنجاه سال قبل از آنکه کسی بیاید و بخوانَدَش.",
    },
    {
      text: "سال ۱۲۵۶ میلادی، مغول\u200Cها رسیدند. دیوارها را ویران کردند، کتابخانه\u200Cی افسانه\u200Cای را که هزاران نسخه\u200Cی خطی داشت آتش زدند، و مدافعان قلعه را قتل\u200Cعام کردند. درّه \u2014 که از اول هم پشت کوه\u200Cهای بلند و تنگه\u200Cای که نیمی از سال سیل می\u200Cبندد پنهان بود \u2014 دوباره به سکوت فرو رفت. نزدیک به هفت قرن، اَلَموت فقط یک افسانه بود: بهانه\u200Cی داستان\u200Cهای مارکو پولو درباره\u200Cی قاتلان مست و باغ\u200Cهای بهشتی، نامی بر زبان نویسندگان اروپایی که نه مکانش را دیده بودند و نه می\u200Cدانستند کجای نقشه باید دنبالش بگردند.",
    },
    {
      text: "سال ۱۹۳۰، زنی انگلیسی سی و هفت ساله به نام فِریا استارک از بغداد راه افتاد \u2014 سوار بر قاطر، با یک تخت صحرایی، پشه\u200Cبند، و اراده\u200Cای برای پیدا کردن درّه\u200Cی حشّاشین. نقشه\u200Cکش خودآموخته\u200Cای بود که پیش از این مناطقی از خاورمیانه را کاوش کرده بود که بیشتر مردان اروپایی جرأت نزدیک شدن بهشان را نداشتند. از گردنه\u200Cهای کوهستانی گذشت در حالی که نیمه\u200Cتب مالاریا داشت، و به راهنماهای محلی تکیه می\u200Cکرد که هر کدامشان برای یک تپه اسم متفاوتی داشتند. وقتی به صخره رسید، فهمید نقشه\u200Cهای رسمی کاملاً غلط\u200Cاند \u2014 و خودش اصلاحشان کرد. کتابش اَلَموت را به دنیا بازگرداند.",
    },
    {
      text: "امروز حدود سی درصد از قلعه\u200Cی اصلی هنوز روی صخره\u200Cاش سر پاست. بازدیدکنندگان دویست متر پلّه\u200Cی سرازیر را بالا می\u200Cروند تا به بقایای دیوارها، کارگاه\u200Cهای ویران، و کانال آبی برسند که مهندسان حسن صبّاح در دل صخره تراشیده\u200Cاند و بعد از نزدیک هزار سال هنوز کار می\u200Cکند. ولی آنچه واقعاً توجهتان را جلب می\u200Cکند، وقتی بالای قله ایستاده\u200Cاید، خرابه\u200Cها نیست. عقاب\u200Cهای طلایی هستند. هنوز آنجایند، سوار بر باد بالای قله\u200Cها، دور همان درّه\u200Cای می\u200Cچرخند که وهسودان دوازده قرن پیش در آن شکار می\u200Cکرد. عقاب خوب انتخاب کرد. و درسش هنوز پابرجاست.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
//  TURKISH — Kartalın Dersi
//  Register: Warm Turkish documentary narrator — grounded, vivid
//  Proverb subverted: «Olacağa çare bulunmaz»
//  (There's no cure for what's destined to happen)
// ═══════════════════════════════════════════════════════════════════
const tr = {
  ...base,
  lang: "tr",
  langStoryId: "tr#eagles-teaching",
  title: "Kartal\u0131n Dersi",
  subtitle:
    "Bir kartal\u0131n se\u00e7ti\u011fi kaya, kendi kaderini ta\u015f\u0131yan isim ve kat\u0131r s\u0131rt\u0131nda her \u015feyi yeniden ke\u015ffeden kad\u0131n\u0131n hik\u00e2yesi",
  excerpt:
    "Bir h\u00fck\u00fcmdar da\u011flarda avlan\u0131rken bir kartal\u0131n g\u00f6kten s\u00fcz\u00fcl\u00fcp vadinin iki y\u00fcz metre \u00fczerindeki bir kaya s\u0131rt\u0131na kondu\u011funu g\u00f6rd\u00fc. O an, kartal\u0131n ona ne \u00f6\u011fretti\u011fini anlad\u0131.",
  moralOrLesson:
    "En b\u00fcy\u00fck dersler her zaman \u00e2limlerden gelmez. Bazen bir kartal\u0131n nereye konaca\u011f\u0131n\u0131 se\u00e7mesinden gelir, harflerinin aras\u0131na kendi kaderinin tarihini gizlemi\u015f bir isimden, ve d\u00fcnyadan \u00f6yle iyi saklanm\u0131\u015f bir vadiden ki insanl\u0131\u011f\u0131n onu yeniden bulmas\u0131 yedi y\u00fczy\u0131l s\u00fcrer.",
  source:
    "\u0130bn\u00fcl-Es\u00eer, el-K\u00e2mil fi't-T\u00e2r\u00eeh; Ata Melik C\u00fcveyn\u00ee, T\u00e2r\u00eeh-i Cih\u00e2ng\u00fc\u015f\u00e2 (y. 1260); Freya Stark, Ha\u015fha\u015f\u00een Vadileri (1934); Peter Willey, Kartal Yuvas\u0131 (2005); UNESCO Ge\u00e7ici D\u00fcnya Miras\u0131 Listesi; Encyclopaedia Iranica",
  characters: [
    "Vahsudan bin Merzuban (kaleyi kuran C\u00fcstan\u00ee h\u00fck\u00fcmdar\u0131)",
    "Kartal (konu\u015fuyla yeri se\u00e7en)",
    "Freya Stark (1930\u2019da vadiyi yeniden ke\u015ffeden \u0130ngiliz ka\u015fif)",
    "Hasan Sabbah (ismin kehanetini ger\u00e7ekle\u015ftiren)",
  ],
  era: "y. 840 (kalenin kurulu\u015fu); 1090 (Hasan\u2019\u0131n fethi); 1930 (Stark\u2019\u0131n ke\u015fif gezisi)",
  paragraphs: [
    {
      text: "840 y\u0131l\u0131 civar\u0131nda, Hazar Denizi\u2019nin g\u00fcneyindeki sarp da\u011flarda Vahsudan ad\u0131nda bir h\u00fck\u00fcmdar avlan\u0131yordu. Buras\u0131 \u0130ran\u2019\u0131n \u00f6yle ge\u00e7it vermez bir k\u00f6\u015fesiydi ki Arap ordular\u0131 bile i\u00e7ine girmeyi ba\u015faramam\u0131\u015ft\u0131. Tam o s\u0131rada devasa bir kartal g\u00f6kten s\u00fcz\u00fcld\u00fc ve vadinin taban\u0131ndan iki y\u00fcz metre y\u00fckselen bir kaya s\u0131rt\u0131na kondu. Vahsudan kayaya bakt\u0131: \u00fc\u00e7 taraf\u0131 dimdik u\u00e7urum, ula\u015fmak i\u00e7in tek bir dar patika, a\u015fa\u011f\u0131da bir nehir. Ba\u015fka birinin anlamas\u0131na gerek yoktu. Ku\u015f ona, a\u015f\u0131lmaz bir kale nereye kurulur, g\u00f6stermi\u015fti.",
    },
    {
      text: "Kalesini in\u015fa etti ve ad\u0131n\u0131 o dersten ald\u0131. Yerel Deylemi dilinde \u201caluh\u201d kartal, \u201cam\u00fbht\u201d ise \u00f6\u011freti demekti. Aluh am\u00fbht \u2014 kartal\u0131n dersi. Bu ismi y\u00fczlerce y\u0131l boyunca binlerce a\u011f\u0131zda h\u0131zl\u0131ca tekrarlay\u0131n; tek bir kelimeye d\u00f6n\u00fc\u015f\u00fcr: Alamut. Kale, kayas\u0131n\u0131n \u00fczerinde iki bu\u00e7uk y\u00fczy\u0131l boyunca el de\u011fi\u015ftirdi \u2014 gizli bir vadide, neredeyse kimsenin bilmedi\u011fi kusursuz bir s\u0131\u011f\u0131nak.",
    },
    {
      text: "Sonra 1090 y\u0131l\u0131 geldi ve her \u015fey alt \u00fcst oldu. \u015eii \u0130slam\u2019\u0131n devrimci bir kolu olan \u0130smail\u00eelerin lideri Hasan Sabbah \u2014 pe\u015finde d\u00fc\u015fmanlar\u0131yla ka\u00e7ak bir vaiz \u2014 vadiye s\u0131z\u0131p kaleyi tek damla kan d\u00f6kmeden ele ge\u00e7irdi. Alamut\u2019u, orta\u00e7a\u011f d\u00fcnyas\u0131n\u0131 yakla\u015f\u0131k iki y\u00fczy\u0131l boyunca titreten bir hareketin karar\u0131g\u00e2h\u0131na \u00e7evirdi. Ama hik\u00e2yenin en tuhaf k\u0131sm\u0131 bu de\u011fil.",
    },
    {
      text: "\u0130slam gelene\u011findeki ebced hesab\u0131nda her Arap\u00e7a harfin bir say\u0131sal de\u011feri vard\u0131r. Orta\u00e7a\u011f \u00e2limleri, eski Deylemi isim olan \u201caluh am\u00fbht\u201dun harflerini toplad\u0131\u011f\u0131nda 483 buldu. Hasan\u2019\u0131n Alamut\u2019u ele ge\u00e7irdi\u011fi y\u0131l m\u0131? Hicr\u00ee 483. Derler ki olaca\u011fa \u00e7are bulunmaz. Ama burada kader sadece olmu\u015f de\u011fil \u2014 iki y\u00fcz elli y\u0131l \u00f6ncesinden imzas\u0131n\u0131 atm\u0131\u015f, tarihi eski bir dilin harflerinin aras\u0131na gizlemi\u015f. Buna tesad\u00fcf m\u00fc dersiniz, kader mi? \u0130smail\u00eelerin akl\u0131nda en ufak bir soru i\u015fareti yoktu.",
    },
    {
      text: "1256\u2019da Mo\u011follar geldi. Surlar\u0131 y\u0131kt\u0131lar, paha bi\u00e7ilmez el yazmalar\u0131yla dolu efsanevi k\u00fct\u00fcphaneyi ate\u015fe verdiler, garnizonu k\u0131l\u0131\u00e7tan ge\u00e7irdiler. Zaten y\u00fcksek da\u011flar ve y\u0131l\u0131n yar\u0131s\u0131 sel basan bir bo\u011fazla d\u00fcnyadan kopuk olan vadi, yeniden sessizli\u011fe g\u00f6m\u00fcld\u00fc. Yakla\u015f\u0131k yedi y\u00fcz y\u0131l boyunca Alamut sadece bir efsane olarak var oldu: Marco Polo\u2019nun uyu\u015fturulmu\u015f suikast\u00e7\u0131lar ve cennet bah\u00e7eleri hakk\u0131ndaki uydurma hik\u00e2yelerinin dekoru, oray\u0131 hi\u00e7 g\u00f6rmemi\u015f ve nerede oldu\u011funu bilmeyen Avrupal\u0131 yazarlar\u0131n dilindeki bir isim.",
    },
    {
      text: "1930\u2019da, otuz yedi ya\u015f\u0131nda \u0130ngiliz bir kad\u0131n \u2014 Freya Stark \u2014 Ba\u011fdat\u2019tan bir kat\u0131r\u0131n s\u0131rt\u0131nda yola \u00e7\u0131kt\u0131. Yan\u0131nda bir kamp yata\u011f\u0131, bir cibinlik ve Ha\u015fha\u015f\u00een Vadisi\u2019ni bulma kararl\u0131l\u0131\u011f\u0131 vard\u0131. Kendi kendini yeti\u015ftirmi\u015f bir haritac\u0131yd\u0131; daha \u00f6nce Ortado\u011fu\u2019nun Avrupal\u0131 erkeklerin \u00e7o\u011funun yakla\u015fmaya cesaret edemedi\u011fi b\u00f6lgelerini ke\u015ffetmi\u015fti. S\u0131tmadan yar\u0131 hasta h\u00e2lde da\u011f ge\u00e7itlerini a\u015ft\u0131; her biri ayn\u0131 tepeye farkl\u0131 isim veren yerel k\u0131lavuzlara g\u00fcvenerek ilerledi. Kayaya ula\u015ft\u0131\u011f\u0131nda, resm\u00ee haritalar\u0131n tamamen yanl\u0131\u015f oldu\u011funu g\u00f6rd\u00fc \u2014 ve onlar\u0131 kendi elleriyle d\u00fczeltti. Yazd\u0131\u011f\u0131 kitap Alamut\u2019u d\u00fcnyaya geri getirdi.",
    },
    {
      text: "Bug\u00fcn \u00f6zg\u00fcn kalenin yakla\u015f\u0131k y\u00fczde otuzu, kayas\u0131n\u0131n \u00fczerinde h\u00e2l\u00e2 ayakta. Ziyaret\u00e7iler iki y\u00fcz metre dik merdiven t\u0131rmanarak sur kal\u0131nt\u0131lar\u0131na, y\u0131k\u0131lm\u0131\u015f at\u00f6lyelere ve Hasan\u2019\u0131n m\u00fchendislerinin kayaya oydu\u011fu \u2014 bin y\u0131la yak\u0131n bir s\u00fcre sonra h\u00e2l\u00e2 \u00e7al\u0131\u015fan \u2014 bir su kanal\u0131na ula\u015f\u0131yor. Ama zirveye \u00e7\u0131kt\u0131\u011f\u0131n\u0131zda g\u00f6z\u00fcn\u00fcze \u00e7arpan \u015fey harabeler de\u011fil. Alt\u0131n kartallar. H\u00e2l\u00e2 oradalar, r\u00fczg\u00e2r\u0131n \u00fczerinde s\u00fcz\u00fcl\u00fcyor, on iki y\u00fczy\u0131l \u00f6nce Vahsudan\u2019\u0131n avland\u0131\u011f\u0131 vadinin \u00fczerinde daireler \u00e7iziyorlar. Kartal iyi se\u00e7mi\u015f. Ders h\u00e2l\u00e2 duruyor.",
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
  console.log("\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550");
  console.log("Eagle's Teaching \u2014 ar / fa / tr push");
  console.log(`Timestamp: ${now}`);
  console.log("\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550");

  await pushStory(ar, "ARABIC");
  await pushStory(fa, "PERSIAN");
  await pushStory(tr, "TURKISH");

  console.log("\n\u2705 All three languages pushed successfully.");
}

main().catch((err) => {
  console.error("\n\ud83d\udca5 Fatal error:", err.message);
  process.exit(1);
});
