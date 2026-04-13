import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const now = Math.floor(Date.now() / 1000);

// ── Shared non-text fields (from English record) ───────────────────────
const shared = {
  siteId: "terracotta-army",
  storyId: "quest-for-immortality",
  icon: "\u2697\uFE0F",
  storyCategory: "crowns_conquests",
  era: "246-210 BC \u2014 Qin Dynasty",
  tier: "S",
  isFree: true,
  hasAudio: false,
  characters: [
    "Qin Shi Huang \u2014 First Emperor of China",
    "Xu Fu \u2014 the alchemist who sailed east",
    "Li Si \u2014 the chief minister who concealed the death",
    "Zhao Gao \u2014 the eunuch conspirator",
  ],
  coordinates: { lat: 34.3841, lng: 109.2785 },
  source:
    'Sima Qian, "Records of the Grand Historian" (Shiji), ~100 BC; Ban Gu, "Book of Han"',
  thumbnail: "",
  image: "",
  readingTimeMinutes: 2,
  disabled: false,
};

// ═══════════════════════════════════════════════════════════════════════
// ARABIC (ar)
// Cultural proverb: «مَن جَدَّ وَجَد» (Who strives, finds)
// Subverted: He strived for immortality until he found death.
// Register: Engaging modern MSA — quality podcast storytelling voice.
// ═══════════════════════════════════════════════════════════════════════

const arabic = {
  lang: "ar",
  langStoryId: "ar#quest-for-immortality",
  title: "الإمبراطور وهَوَس الخُلود",
  subtitle: "الرجل الذي غَزا العالَم ولم يستطِع أن يَغزو الموت",
  excerpt:
    "في القَرن الثالث قبل الميلاد، فَعَلَ رجلٌ واحد ما عَجَزَ عنه كلُّ مَن سَبَقَه. تشين شي هوانغ سَحَقَ ستَّ ممالكَ متحاربة وصَهَرَها في إمبراطوريّة واحدة — الصين.",
  moralOrLesson:
    "السَّعي لِقَهر الموت كثيراً ما يُعجِّل بقدومه. الخلود الحقيقيّ ليس في إكسير — بل في الأثر الذي نتركه خلفنا.",
  paragraphs: [
    {
      text: "في القَرن الثالث قبل الميلاد، فَعَلَ رجلٌ واحد ما عَجَزَ عنه كلُّ مَن سَبَقَه. تشين شي هوانغ سَحَقَ ستَّ ممالكَ متحاربة وصَهَرَها في إمبراطوريّة واحدة — الصين، التي حَمَلَت اسمه. بنى سوراً عظيماً يَشُقُّ الجبال. وحَّدَ الكتابة والعُملة وحتّى عَرْض محاور العربات. هذا الرجل لم يَحكُم بلداً — بل اختَرَعَه من العَدَم. لكنّ شيئاً واحداً كان يُقِضُّ مَضجَعَه ليلَ نهار: الموت.",
    },
    {
      text: "فبدأ يبحثُ عن علاج. أخبره كيميائيّو بلاطه أنّ الزِّئبَق — ذلك المعدن السائل الغريب — يحمل سرَّ الحياة الأبديّة. فصار الإمبراطور يبتلع حبوب الزئبق كلَّ يوم، مُقتنِعاً أنّها تمنحه الخلود. والحقيقة؟ كانت تُدمِّر جسده من الداخل ببطء. الشيء الذي ظنَّ أنّه سيُنقِذه كان يقتله، جُرعةً بعد جُرعة.",
    },
    {
      text: "لكنّ أجرأ محاولاته كانت حملةً بحريّة كاملة. في عام ٢١٩ قبل الميلاد، أمَرَ كيميائيّاً اسمه شو فو بالإبحار شرقاً بستّين سفينة وثلاثة آلاف شابّ وشابّة — بحثاً عن جُزُرٍ أسطوريّة يُقال إنّ الخالدين يعيشون فيها وإكسير الحياة ينبُت على أشجارها. كانت من أضخم الرحلات البحريّة في العالَم القديم، وأبحَرَت مباشرةً نحو المجهول.",
    },
    {
      text: "شو فو لم يَعُد. لا بالإكسير، ولا بأسطوله، ولا بِرُكّابه الثلاثة آلاف. تقول الأسطورة الصينيّة إنّه وَصَلَ اليابان واستقرَّ فيها وصار جَدّاً لأجيال من شعبها. حتّى اليوم، مُدُنٌ على الساحل اليابانيّ تدّعي أنّها مكان رُسُوِّه، ومعابد تحمل اسمه لا تزال قائمة. أُرسِلَ ليجد الخلود — وبطريقةٍ ما، قصّته هي التي خَلَدَت.",
    },
    {
      text: "في عام ٢١٠ قبل الميلاد، مات تشين شي هوانغ وهو في طريقه — لا يزال يبحث عن معجزته. وما حدثَ بعدها يكاد لا يُصَدَّق. وزيره الأوّل لي سي ورجل البلاط القويّ تشاو غاو قرّرا إخفاء موت الإمبراطور لأشهر. ولتغطية رائحة الجثّة المتحلِّلة، أحاطوا عربته بعرباتٍ محمّلة بالسمك. أقوى رجل في العالَم أُعيدَ إلى عاصمته مُتخفّياً خلف نَتانة السمك الفاسد.",
    },
    {
      text: "لكنّ الإمبراطور كان قد جهَّز خطّةً بديلة. إن لم يستطع أن يعيش إلى الأبد، فسيحكم إلى الأبد تحت الأرض. قبره بُنِيَ ليكون إمبراطوريّة كاملة بالمُصغَّر: أنهارٌ من الزئبق السائل ترسم مَجرى أنهار الصين العظيمة، وسقفٌ من النحاس والجواهر يرسم خريطة النجوم، وجيشٌ من ثمانية آلاف جنديّ من الطين بالحجم الطبيعيّ يحرسونه إلى الأبد. بل نَصَبَ أفخاخاً بالأقواس لقتل أيّ دخيل.",
    },
    {
      text: "والمُفارقة التي تهزُّك: الزئبق الذي سمَّمه — نفس المادّة التي ابتلعها سنوات ظانّاً أنّها ستُخلِّده — هو نفسه الزئبق الذي يجري في أنهار قبره. الشيء الذي قتله صار قلبَ مملكته الأخيرة. يقولون «مَن جَدَّ وَجَد» — وهذا الرجل جَدَّ في طلب الخلود حتّى وَجَدَ الموت. لكنّه بنى أعظم قبرٍ على وجه الأرض، وبعد ألفَي سنة، لا نزال نروي حكايته.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// PERSIAN (fa)
// Cultural proverb: «هر که طاووس خواهد، جور هندوستان کشد»
//   (Whoever wants a peacock must endure India)
// Subverted: He wanted the peacock of immortality and endured its poison.
// Register: Natural modern Persian prose — quality documentary narrator.
// ═══════════════════════════════════════════════════════════════════════

const persian = {
  lang: "fa",
  langStoryId: "fa#quest-for-immortality",
  title: "امپراتور در جست\u200Cوجوی جاودانگی",
  subtitle: "مردی که دنیا را فتح کرد، اما مرگ را نتوانست",
  excerpt:
    "در قرن سوم پیش از میلاد، مردی تنها کاری کرد که هیچ\u200Cکس پیش از او نتوانسته بود. چین شی هوانگ شش پادشاهی رقیب را یکی پس از دیگری شکست داد و همه را در یک امپراتوری واحد ذوب کرد — کشور چین.",
  moralOrLesson:
    "تلاش برای شکست مرگ گاهی خودش مرگ را نزدیک\u200Cتر می\u200Cکند. جاودانگی واقعی در اکسیر نیست — در ردپایی است که از خودمان به جا می\u200Cگذاریم.",
  paragraphs: [
    {
      text: "در قرن سوم پیش از میلاد، مردی تنها کاری کرد که هیچ\u200Cکس پیش از او نتوانسته بود. چین شی هوانگ شش پادشاهی رقیب را یکی پس از دیگری شکست داد و همه را در یک امپراتوری واحد ذوب کرد — کشور چین، که نامش را از او گرفت. دیوار بزرگ چین را ساخت. خط و پول و حتی عرض چرخ\u200Cهای ارابه\u200Cها را یکسان کرد. این مرد عملاً یک کشور اختراع کرد. ولی هیچ\u200Cکدام کافی نبود. چون یک دشمن وجود داشت که هیچ ارتشی جلوش بند نبود: مرگ.",
    },
    {
      text: "پس رفت دنبال چاره. کیمیاگران دربارش گفتند جیوه — آن فلز مایعِ عجیب — رمز عمر ابدی است. امپراتور هر روز قرص\u200Cهای جیوه می\u200Cخورد، مطمئن که دارد جاودانه می\u200Cشود. اما حقیقت این بود که جیوه داشت آرام\u200Cآرام بدنش را از درون می\u200Cخورد. همان چیزی که باور داشت نجاتش می\u200Cدهد، داشت ذره\u200Cذره جانش را می\u200Cگرفت.",
    },
    {
      text: "اما دیوانه\u200Cوارترین تلاشش یک لشکرکشی دریایی تمام\u200Cعیار بود. سال ۲۱۹ پیش از میلاد، به کیمیاگری به نام شو فو دستور داد با شصت کشتی و سه\u200Cهزار مرد و زن جوان به سمت شرق حرکت کند — به دنبال جزایری افسانه\u200Cای که گویا جاودانگان در آن زندگی می\u200Cکردند و اکسیر حیات روی درختانش می\u200Cرویید. یکی از بزرگ\u200Cترین سفرهای دریایی دنیای باستان بود، و مستقیم به دل ناشناخته\u200Cها رفت.",
    },
    {
      text: "شو فو هرگز برنگشت. نه با اکسیر، نه با ناوگانش، نه با سه\u200Cهزار سرنشینش. افسانه\u200Cهای چینی می\u200Cگویند به ژاپن رسید و همان\u200Cجا ماندگار شد و نیای نسل\u200Cهایی از مردم ژاپن شد. تا همین امروز، شهرهایی در ساحل ژاپن ادعا دارند محل پیاده شدن او هستند، و زیارتگاه\u200Cهایی به نام او هنوز پابرجاست. فرستاده شده بود تا جاودانگی بیاورد — و به شکلی عجیب، خودِ داستانش جاودانه شد.",
    },
    {
      text: "سال ۲۱۰ پیش از میلاد، چین شی هوانگ در سفر جان داد — هنوز در جست\u200Cوجوی معجزه\u200Cاش. و ماجرای بعدش آن\u200Cقدر عجیب است که باورش سخت است. صدراعظمش لی سی و مقام قدرتمند دربار ژائو گائو تصمیم گرفتند مرگ امپراتور را ماه\u200Cها پنهان نگه دارند. برای پوشاندن بوی جسد در حال تجزیه، گاری\u200Cهای پُر از ماهی دور کالسکه\u200Cاش چیدند. قدرتمندترین مرد جهان را بوی ماهی گندیده به پایتخت برگرداند.",
    },
    {
      text: "اما امپراتور نقشه\u200Cی جایگزین داشت. اگر نمی\u200Cتوانست تا ابد زنده بماند، تا ابد زیر زمین حکومت می\u200Cکرد. مقبره\u200Cاش را ساختند تا یک امپراتوری کامل در مینیاتور باشد: رودهایی از جیوه\u200Cی مایع که مسیر رودخانه\u200Cهای بزرگ چین را دنبال می\u200Cکردند، سقفی از مس و جواهر که نقشه\u200Cی آسمان شب بود، و لشکری از هشت\u200Cهزار سرباز سفالی هم\u200Cقد آدم که تا ابد نگهبانی می\u200Cدادند. حتی تله\u200Cهای کمانی گذاشته بود تا هر مزاحمی را از پا درآورد.",
    },
    {
      text: "و حالا نکته\u200Cای که آدم را تکان می\u200Cدهد. جیوه\u200Cای که مسمومش کرد — همان ماده\u200Cای که سال\u200Cها خورد با این خیال که جاودانه\u200Cاش می\u200Cکند — همان جیوه\u200Cای است که در رودهای مقبره\u200Cاش جاری است. چیزی که کشتش، قلب تپنده\u200Cی سرزمین مردگانش شد. می\u200Cگویند «هر که طاووس خواهد، جور هندوستان کشد» — او طاووسِ جاودانگی را خواست و جور زهرش را کشید. جاودانه نشد. اما باشکوه\u200Cترین آرامگاه روی زمین را ساخت، و بعد از دوهزار سال، هنوز داستانش را تعریف می\u200Cکنیم.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// TURKISH (tr)
// Cultural proverb: «Ölüm hak» (Death is a right/truth)
// Subverted: Everyone knows death is truth — but he refused to accept it,
//   and the more he chased immortality, the closer he got to death.
// Register: Natural modern Turkish — quality documentary storytelling.
// ═══════════════════════════════════════════════════════════════════════

const turkish = {
  lang: "tr",
  langStoryId: "tr#quest-for-immortality",
  title: "\u0130mparatorun \u00D6l\u00FCms\u00FCzl\u00FCk Aray\u0131\u015F\u0131",
  subtitle:
    "D\u00FCnyay\u0131 fetheden ama \u00F6l\u00FCm\u00FC fethedemeyen adam",
  excerpt:
    "Milattan \u00F6nce \u00FC\u00E7\u00FCnc\u00FC y\u00FCzy\u0131lda bir adam, kendinden \u00F6nce kimsenin ba\u015Faramad\u0131\u011F\u0131n\u0131 ba\u015Fard\u0131. \u00C7in \u015Ei Huang, birbiriyle sava\u015Fan alt\u0131 krall\u0131\u011F\u0131 tek tek y\u0131kt\u0131 ve hepsini tek bir imparatorluk alt\u0131nda birle\u015Ftirdi \u2014 \u00C7in \u0130mparatorlu\u011Fu.",
  moralOrLesson:
    "\u00D6l\u00FCm\u00FC yenmeye \u00E7al\u0131\u015Fmak \u00E7o\u011Fu zaman onu h\u0131zland\u0131r\u0131r. Ger\u00E7ek \u00F6l\u00FCms\u00FCzl\u00FCk iksirde de\u011Fil, geride b\u0131rakt\u0131\u011F\u0131m\u0131z izde gizlidir.",
  paragraphs: [
    {
      text: "Milattan \u00F6nce \u00FC\u00E7\u00FCnc\u00FC y\u00FCzy\u0131lda bir adam, kendinden \u00F6nce kimsenin ba\u015Faramad\u0131\u011F\u0131n\u0131 ba\u015Fard\u0131. \u00C7in \u015Ei Huang, birbiriyle sava\u015Fan alt\u0131 krall\u0131\u011F\u0131 tek tek y\u0131kt\u0131 ve hepsini tek bir imparatorluk alt\u0131nda birle\u015Ftirdi \u2014 ad\u0131n\u0131 da kendisinden alan \u00C7in \u0130mparatorlu\u011Fu. \u00C7in Seddi\u2019ni in\u015Fa etti. Yaz\u0131y\u0131, paray\u0131, hatta araba dingil geni\u015Fliklerini bile standartla\u015Ft\u0131rd\u0131. Bu adam bir \u00FClke icat etmi\u015Fti. Ama bunlar\u0131n hi\u00E7biri yetmiyordu. \u00C7\u00FCnk\u00FC hi\u00E7bir ordunun yenemeyece\u011Fi tek bir d\u00FC\u015Fman vard\u0131: \u00F6l\u00FCm.",
    },
    {
      text: "Ve \u00E7areyi aramaya ba\u015Flad\u0131. Saray simyac\u0131lar\u0131 ona c\u0131va denen o tuhaf, s\u0131v\u0131 metalin sonsuz ya\u015Fam\u0131n s\u0131rr\u0131n\u0131 bar\u0131nd\u0131rd\u0131\u011F\u0131n\u0131 s\u00F6ylediler. \u0130mparator her g\u00FCn c\u0131va haplar\u0131 yutmaya ba\u015Flad\u0131 \u2014 \u00F6l\u00FCms\u00FCzle\u015Fti\u011Fine inanarak. Ger\u00E7ekteyse c\u0131va, v\u00FCcudunu i\u00E7eriden yava\u015F yava\u015F yok ediyordu. Onu kurtaraca\u011F\u0131n\u0131 sand\u0131\u011F\u0131 \u015Fey, her dozda biraz daha \u00F6ld\u00FCr\u00FCyordu.",
    },
    {
      text: "En \u00E7\u0131lg\u0131n denemesi ise tam kapsaml\u0131 bir deniz seferi oldu. M\u00D6 219\u2019da \u015Eu Fu ad\u0131nda bir simyac\u0131ya altm\u0131\u015F gemi ve \u00FC\u00E7 bin gen\u00E7 erkek ile kad\u0131nla birlikte do\u011Fuya yelken a\u00E7mas\u0131n\u0131 emretti \u2014 \u00F6l\u00FCms\u00FCzlerin ya\u015Fad\u0131\u011F\u0131 ve a\u011Fa\u00E7lar\u0131nda hayat iksirinin yeti\u015Fti\u011Fi efsanevi adalar\u0131 bulmak i\u00E7in. Antik d\u00FCnyan\u0131n en b\u00FCy\u00FCk deniz seferlerinden biriydi ve do\u011Fruca bilinmeyene do\u011Fru yelken a\u00E7t\u0131.",
    },
    {
      text: "\u015Eu Fu geri d\u00F6nmedi. \u0130ksirle de\u011Fil, filosuyla de\u011Fil, \u00FC\u00E7 bin yolcusuyla de\u011Fil. \u00C7in efsanelerine g\u00F6re Japonya\u2019ya ula\u015F\u0131p orada yerle\u015Fti ve Japon halk\u0131n\u0131n atalar\u0131ndan biri oldu. Bug\u00FCn bile Japonya k\u0131y\u0131s\u0131ndaki kasabalar onun karaya \u00E7\u0131kt\u0131\u011F\u0131 yer oldu\u011Funu iddia eder, ad\u0131na dikilmi\u015F tap\u0131naklar h\u00E2l\u00E2 ayaktad\u0131r. \u00D6l\u00FCms\u00FCzl\u00FC\u011F\u00FC bulmak i\u00E7in g\u00F6nderilmi\u015Fti \u2014 ve bir bak\u0131ma, hik\u00E2yesinin kendisi \u00F6l\u00FCms\u00FCz oldu.",
    },
    {
      text: "M\u00D6 210\u2019da \u00C7in \u015Ei Huang bir yolculuk s\u0131ras\u0131nda \u00F6ld\u00FC \u2014 h\u00E2l\u00E2 mucizesini ar\u0131yordu. Ve sonra olan \u015Fey neredeyse inan\u0131lmaz. Ba\u015Fbakan\u0131 Li Si ve saray\u0131n g\u00FC\u00E7l\u00FC adam\u0131 Zhao Gao, imparatorun \u00F6l\u00FCm\u00FCn\u00FC aylarca gizlemeye karar verdiler. \u00C7\u00FCr\u00FCyen cesedin kokusunu bast\u0131rmak i\u00E7in arabas\u0131n\u0131n etraf\u0131na bal\u0131k dolu arabalar dizdiler. D\u00FCnyan\u0131n en g\u00FC\u00E7l\u00FC adam\u0131 ba\u015Fkentine \u00E7\u00FCr\u00FCk bal\u0131k kokusunun arkas\u0131na saklanarak d\u00F6nd\u00FC.",
    },
    {
      text: "Ama imparatorun bir yedek plan\u0131 vard\u0131. Sonsuza kadar ya\u015Fayamayacaksa, sonsuza kadar yeralt\u0131nda h\u00FCk\u00FCm s\u00FCrerekti. Mezar\u0131, minyat\u00FCr bir imparatorluk olarak in\u015Fa edilmi\u015Fti: \u00C7in\u2019in b\u00FCy\u00FCk nehirlerinin yolunu \u00E7izen s\u0131v\u0131 c\u0131va \u0131rmaklar\u0131, y\u0131ld\u0131z haritas\u0131n\u0131 g\u00F6steren bak\u0131r ve m\u00FCcevher kapl\u0131 bir tavan ve sonsuza kadar n\u00F6bet tutan sekiz bin ger\u00E7ek boyutlu pi\u015Fmi\u015F toprak asker. Hatta girmeye \u00E7al\u0131\u015Fan herkesi \u00F6ld\u00FCrmek i\u00E7in tuzak kurulmu\u015F tatar yaylar\u0131 bile yerle\u015Ftirmi\u015Fti.",
    },
    {
      text: "Ve i\u015Fte as\u0131l insan\u0131 vuran nokta. Onu zehirleyen c\u0131va \u2014 y\u0131llarca \u00F6l\u00FCms\u00FCzle\u015Fece\u011Fini sanarak yuttu\u011Fu o madde \u2014 mezar\u0131n\u0131n nehirlerinde akan c\u0131van\u0131n ta kendisi. Onu \u00F6ld\u00FCren \u015Fey, \u00F6l\u00FCler \u00FClkesinin kalbi oldu. Herkes bilir: \u201C\u00D6l\u00FCm hak.\u201D Ama bu adam bunu kabul etmedi \u2014 ve \u00F6l\u00FCms\u00FCzl\u00FC\u011F\u00FC kovalad\u0131k\u00E7a \u00F6l\u00FCme yakla\u015Ft\u0131. Sonunda \u00F6l\u00FCms\u00FCzl\u00FC\u011F\u00FC bulamad\u0131. Ama yery\u00FCz\u00FCn\u00FCn en g\u00F6rkemli mezar\u0131n\u0131 in\u015Fa etti ve iki bin y\u0131l sonra h\u00E2l\u00E2 onun hik\u00E2yesini anlat\u0131yoruz.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// PUSH TO DYNAMODB
// ═══════════════════════════════════════════════════════════════════════

const stories = [arabic, persian, turkish];

async function pushStory(story) {
  const record = { ...shared, ...story, updatedAt: now };

  const cmd = new PutCommand({ TableName: "Story", Item: record });
  await docClient.send(cmd);

  console.log(`\u2705 ${story.lang.toUpperCase()} pushed successfully`);
  console.log(`   title: ${story.title}`);
  console.log(`   langStoryId: ${story.langStoryId}`);
  console.log(`   paragraphs: ${story.paragraphs.length}`);
  console.log(
    `   excerpt: ${story.excerpt.substring(0, 60)}...`
  );
  console.log(`   updatedAt: ${now}`);
  console.log();
}

for (const story of stories) {
  try {
    await pushStory(story);
  } catch (err) {
    console.error(`\u274C Failed to push ${story.lang}:`, err);
    process.exit(1);
  }
}

console.log("\u2705 All 3 languages pushed successfully!");
