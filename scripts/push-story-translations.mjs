// Push Arabic, Persian, and Turkish recreations of "The City on Shiva's Trident"
// to the Story DynamoDB table.

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (identical across all languages) ──────────────────────────
const shared = {
  siteId: "varanasi",
  storyId: "shiva-trident-city",
  icon: "\u{1F531}",
  storyCategory: "gods_monsters",
  tier: "S",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 25.3109, lng: 83.0107 },
  source:
    "Skanda Purana, Kashi Khanda (12th-14th century CE); Kurma Purana, Avimukta Mahatmya; Jabala Upanishad; Shiva Purana (Jyotirlinga narrative); Eck, Diana L. Banaras: City of Light, Princeton University Press, 1982; Singh, Rana P.B. Banaras: Making of India\u2019s Heritage City, 2009; Maasir-i-Alamgiri (Aurangzeb\u2019s court chronicle, compiled by Saqi Must\u2019ad Khan)",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// ARABIC (ar)
// ═══════════════════════════════════════════════════════════════════════════════

const ar = {
  ...shared,
  lang: "ar",
  langStoryId: "ar#shiva-trident-city",

  title: "مدينةٌ لا تسقُط",

  subtitle:
    "حين ينتهي الكون، مدينةٌ واحدة تنجو — يرفعُها إلهُها فوق طوفان العدم على رأس رُمحِه",

  excerpt:
    "في الهند مدينةٌ يؤمن الهندوس أنّها ستعيش بعد موت الكون نفسه. حين تنطفئ آخر نجمة ويجفّ آخر بحر، يرفع الإله شيفا مدينة فاراناسي فوق الطوفان على رُمحِه. كلُّ شيء يختفي. هذه المدينة وحدها تبقى.",

  moralOrLesson:
    "قصّة مدينة شيفا تعلّمنا أنّ حتّى أكمل حُكمٍ بشريّ لا يستطيع أن يمنح الشيء الوحيد الذي تحتاجه الروح حقًّا — التحرُّر من دورة الوجود — وأنّ الأماكن التي نواجه فيها الموت بأقصى صدق هي الأماكن التي يكون فيها الإله حاضرًا بأقرب ما يكون.",

  characters: [
    "شيفا (سيّد كاشي، الذي يحمل المدينة على رُمحه)",
    "بارفاتي (زوجة شيفا، التي اختارت كاشي بيتًا لهما)",
    "المَلِك ديفوداسا (المَلِك العادل الذي طرد الآلهة)",
    "فيشنو (الذي أقنع ديفوداسا بالتنازل عن المدينة)",
    "كالا بهايرافا (هيئة شيفا الشرسة، حارس كاشي الإلهيّ)",
    "ماهاراني أهيليابائي هولكار (التي أعادت بناء معبد فيشواناث سنة ١٧٨٠)",
  ],

  era: "أصول أسطوريّة (قبل الخلق نفسه)؛ تاريخ المعبد يمتدّ من الألفيّة الثانية قبل الميلاد حتّى اليوم",

  paragraphs: [
    {
      text: "في الهند مدينةٌ يؤمن أكثر من مليار إنسانٍ أنّها أقدمُ من الزمن نفسه. اسمها فاراناسي. الكُتُب الهندوسيّة المقدّسة تقول إنّه حين يأتي يومُ النهاية — حين تنطفئ آخر نجمة ويبتلع العدمُ كلّ ما هو موجود — يأتي الإله شيفا، أعظمُ آلهتهم، فيغرسُ رُمحَه ذا الرؤوس الثلاثة تحت هذه المدينة ويرفعُها وحدها فوق طوفان الفناء. الكونُ يزول بأكمله. مدينةٌ واحدة تطفو على سلاح إله.",
    },
    {
      text: "القصّة تبدأ هكذا: شيفا وزوجته بارفاتي — أقوى ثنائيّ في المُعتقَد الهندوسيّ — بحثا في الكون كلّه عن بيت. السماءُ سهلة، والعالمُ السُّفليّ مُظلِم، وكلّ مدينة على الأرض فيها خلل. إلى أن وصلا لمُنعطَفٍ في نهر الغانج حيث ينحني الماءُ شمالًا، وكأنّه يتسلّق عائدًا نحو السماء. وقف شيفا وقال: «هذا المكانُ عزيزٌ عليَّ مثل قلبي.» سمّاه «التي لا تُهجَر» وأقسمَ ألّا يغادر — ولو انتهى الزمن.",
    },
    {
      text: "لكنّ أغرب ما في هذه القصّة ليس وصول شيفا — بل اللحظة التي عجز فيها عن العودة. في زمنٍ ما، هبطت المدينةُ فغادرها شيفا. في غيابه، تولّى مَلِكٌ بشريّ اسمه ديفوداسا الحُكم — وحكمَ بكمالٍ لم يرَهُ أحد. لا مرض، لا جريمة، لا جوع. رعاياه لم يعُد لديهم ما يطلبونه من السماء، فتوقّفوا عن الصلاة. لماذا يصلّون وكلّ شيء متوفّر؟ بشريٌّ واحد جعل الآلهة كلّها بلا عمل.",
    },
    {
      text: "أراد شيفا مدينته. فأرسل الآلهة واحدًا تلوَ الآخر ليجدوا خللًا في مملكة ديفوداسا. جاء إله الشمس في اثني عشر شكلًا — لم يجد شيئًا، فأحبّ المدينة وبقي. جاء غانيشا — الإله ذو رأس الفيل — في ستّة وخمسين هيئة كجواسيس عند كلّ مفترق وباب. لم يجد ما يُبلِّغ عنه، فبقي هو أيضًا. إلهة الثروة لم تجد فقرًا. إلهة العلم وجدت الثقافة كاملة. يقولون «الثالثةُ ثابتة» — لكنّ شيفا أرسل عشرةً وما ثبتَ شيء.",
    },
    {
      text: "في النهاية ذهب فيشنو — إله الحِفظ وربّما أذكى عقل في الأساطير الهندوسيّة. لم يبحث عن عيوب. ذهب مباشرةً إلى الحقيقة العميقة. قال لديفوداسا: مهما بلغ كمالُ مملكتك، شعبُك لا يزال يشيخ ويتألّم ويموت ثمّ يُولَد من جديد. المملكة الكاملة تمنحك كلّ شيء إلّا الشيء الوحيد المهمّ — التحرُّر من دورة الموت والولادة. وحده شيفا يملكُ هذا. ديفوداسا — الحكيمُ بما يكفي ليفهم — تنازلَ عن عرشه.",
    },
    {
      text: "عاد شيفا. ووجد مدينته أغنى ممّا تركها — مليئةً بمعابد بناها الجواسيس الإلهيّون وهم يفشلون في مهمّتهم. على الدرجات النهريّة المُسمّاة «داشاشواميد غات» احتفل بْراهما — إله الخلق — بعودة شيفا. الكهنة لا يزالون يقيمون طقسَ النار في البقعة ذاتها كلّ مساء حتّى اليوم. وفي قلب المدينة يقف معبد «كاشي فيشواناث» — «سيّد الكون» — في الموضع الذي كشف فيه شيفا عن نفسه عمودًا لا نهائيًّا من النور.",
    },
    {
      text: "هُدِم ذلك المعبد وأُعيد بناؤه مرّات. أشدّها كان سنة ١٦٦٩ حين هدمه الإمبراطور المغوليّ أورنجزيب وبنى مسجدًا فوق أنقاضه. الجدار الأصليّ المنقوش لا يزال ظاهرًا داخل المسجد حتّى اليوم. لكنّ المعبد عاد. الذي يقف الآن بُنِيَ سنة ١٧٨٠ وتُوِّج بالذهب سنة ١٨٣٥. وهذا بالضبط معنى أن تكون مدينةً على رُمح إله — يمكنك هدمُها، لكن لا يمكنك أن تُبقيَها أنقاضًا.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// PERSIAN / FARSI (fa)
// ═══════════════════════════════════════════════════════════════════════════════

const fa = {
  ...shared,
  lang: "fa",
  langStoryId: "fa#shiva-trident-city",

  title: "شهر بر نوکِ نیزه",

  subtitle:
    "وقتی جهان نابود می\u200Cشود، یک شهر زنده می\u200Cماند — شیوا آن را بر نوک نیزه\u200Cاش بالای سیل نیستی نگه می\u200Cدارد",

  excerpt:
    "در هند شهری هست که هندوها باور دارند از عمر کیهان هم بیشتر خواهد ماند. وقتی آخرین ستاره خاموش شود و آخرین اقیانوس بخشکد، شیوا شهر واراناسی را بر نیزه\u200Cاش بالای سیل بلند می\u200Cکند. همه\u200Cچیز محو می\u200Cشود. فقط این شهر می\u200Cماند.",

  moralOrLesson:
    "داستان شهر شیوا می\u200Cآموزد که حتی بی\u200Cنقص\u200Cترین فرمانروایی انسانی هم نمی\u200Cتواند آنچه را روح سرانجام نیاز دارد — رهایی از چرخه\u200Cی هستی — فراهم کند، و جاهایی که صادقانه\u200Cتر با مرگ رویاروی می\u200Cشویم، همان\u200Cجاهایی\u200Cست که خداوند نزدیک\u200Cتر از هر جای دیگر حضور دارد.",

  characters: [
    "شیوا (خداوندگار کاشی، که شهر را بر نیزه\u200Cاش حمل می\u200Cکند)",
    "پارواتی (همسر شیوا، که کاشی را به\u200Cعنوان خانه\u200Cشان برگزید)",
    "شاه دیوُداسا (پادشاه دادگر که خدایان را بیرون راند)",
    "ویشنو (که دیوُداسا را به واگذاری شهر ترغیب کرد)",
    "کالا بَهایراوا (هیئت خشمگین شیوا، نگهبان الهی کاشی)",
    "مَهارانی اَهیلیابای هولکار (که پرستشگاه ویشواناته را در سال ۱۷۸۰ بازسازی کرد)",
  ],

  era: "ریشه\u200Cهای اساطیری (پیش از آفرینش)؛ تاریخ پرستشگاه از هزاره\u200Cی دوم پیش از میلاد تا امروز",

  paragraphs: [
    {
      text: "در هند شهری هست که بیش از یک میلیارد نفر باور دارند از خودِ زمان قدیمی\u200Cتر است. نامش واراناسی\u200Cست. متن\u200Cهای مقدس هندو می\u200Cگویند روزی که پایان می\u200Cرسد — آخرین ستاره خاموش، آخرین اقیانوس خشک — خدای شیوا، بزرگ\u200Cترین خدایانشان، نیزه\u200Cی سه\u200Cشاخه\u200Cاش را زیر این شهر فرو می\u200Cکند و آن را تنها بالای سیل نیستی بلند می\u200Cکند. جهان نابود می\u200Cشود. یک شهر، روی سلاح یک خدا، شناور می\u200Cماند.",
    },
    {
      text: "داستان این\u200Cطور شروع می\u200Cشود: شیوا و همسرش پارواتی — نیرومندترین زوج در باور هندو — تمام هستی را گشتند تا خانه\u200Cای بیابند. بهشت آسان\u200Cتر از حدّ لازم بود. جهان زیرین تاریک. هر شهر زمینی عیبی داشت. تا رسیدند به پیچی در رود گَنگ که آب به سمت شمال خم می\u200Cشد، انگار می\u200Cخواست به آسمان برگردد. شیوا ایستاد و گفت: «این\u200Cجا به اندازه\u200Cی قلبم برایم عزیز است.» نامش را «هرگز رها نشده» گذاشت و سوگند خورد که حتی اگر زمان تمام شود، نرود.",
    },
    {
      text: "اما شگفت\u200Cترین بخش این داستان آمدنِ شیوا نیست — لحظه\u200Cای\u200Cست که نتوانست برگردد. زمانی، شهر رو به ویرانی رفت و شیوا رفت. در نبودش، پادشاهی انسانی به نام دیوُداسا تاج و تخت را گرفت و چنان بی\u200Cعیب فرمان راند که بهشت عملاً روی زمین پیاده شد. نه بیماری، نه جنایت، نه گرسنگی. مردمش آن\u200Cقدر خرسند بودند که دست از نیایش برداشتند. چرا دعا کنند وقتی هیچ کمبودی ندارند؟ یک آدمیزاد خدایان را بیکار کرده بود.",
    },
    {
      text: "شیوا شهرش را می\u200Cخواست. پس خدایان را یکی\u200Cیکی فرستاد تا عیبی در فرمانروایی دیوُداسا پیدا کنند. خدای خورشید در دوازده هیئت آمد — عیبی ندید، دل به شهر باخت و ماند. گَنِشا، خدای فیل\u200Cسَر، در پنجاه\u200Cوشش کالبد آمد و سر هر چهارراه و دروازه\u200Cای نشست — چیزی نیافت و او هم ماند. الهه\u200Cی ثروت فقری ندید. الهه\u200Cی دانش فرهنگ را بی\u200Cنقص یافت. می\u200Cگویند هر که طاووس خواهد جور هندوستان کَشَد — اما این\u200Cبار حتی خدایان هم از جور هندوستان سربلند درنیامدند.",
    },
    {
      text: "سرانجام ویشنو رفت — خدای نگاهبانی و شاید تیزبین\u200Cترین ذهن در اساطیر هندو. دنبال عیب نگشت. یکراست سراغ حقیقت رفت. به دیوُداسا گفت: فرمانروایی\u200Cات هرقدر هم بی\u200Cنقص باشد، مردمت هنوز پیر می\u200Cشوند، رنج می\u200Cکشند، می\u200Cمیرند و دوباره زاده می\u200Cشوند. یک پادشاهی کامل همه\u200Cچیز می\u200Cدهد جز یک چیز — رهایی از چرخه\u200Cی مرگ و زایش. این را فقط شیوا می\u200Cتواند بدهد. دیوُداسا — آن\u200Cقدر فرزانه که بفهمد — از تخت کنار رفت.",
    },
    {
      text: "شیوا بازگشت. و شهر را از آنچه ترک کرده بود پربارتر یافت — پُر از پرستشگاه\u200Cهایی که جاسوسان الهی هنگام شکست در مأموریتشان ساخته بودند. بر پلکان ساحلی «داشاشوامِد گات» خدای آفرینش، بْرَهما، بازگشت شیوا را جشن گرفت. کاهنان هنوز هر غروب در همان نقطه آیین آتش برپا می\u200Cکنند. و در دل شهر، پرستشگاه «کاشی ویشواناتْه» — «خداوندگارِ جهان» — در جایی ایستاده که شیوا خود را به شکل ستونی بی\u200Cپایان از روشنایی آشکار کرد.",
    },
    {
      text: "آن پرستشگاه بارها ویران و بازسازی شده. سخت\u200Cترین ضربه سال ۱۶۶۹ بود، وقتی اورنگ\u200Cزیب — فرمانروای مغولی که بر بیشتر هند حکم می\u200Cراند — آن را با خاک یکسان کرد و مسجدی روی ویرانه\u200Cها بنا کرد. دیوارِ اصلی با کنده\u200Cکاری\u200Cهایش هنوز درون آن مسجد پیداست. اما پرستشگاه بازگشت. آنچه امروز سرپاست سال ۱۷۸۰ ساخته شد و سال ۱۸۳۵ زرین\u200Cپوش گردید. حرف آخر داستان همین است — شهری که بر نوک نیزه\u200Cی خداست خراب می\u200Cشود، اما خراب نمی\u200Cمانَد.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// TURKISH (tr)
// ═══════════════════════════════════════════════════════════════════════════════

const tr = {
  ...shared,
  lang: "tr",
  langStoryId: "tr#shiva-trident-city",

  title: "M\u0131zra\u011F\u0131n Ucundaki \u015Eehir",

  subtitle:
    "Evren yok oldu\u011Funda tek bir \u015Fehir ayakta kal\u0131r \u2014 Tanr\u0131 \u015Eiva onu \u00FC\u00E7 u\u00E7lu m\u0131zra\u011F\u0131yla tufan\u0131n \u00FCst\u00FCnde tutar",

  excerpt:
    "Hindistan\u2019da bir \u015Fehir var ki Hindular onun evrenden bile uzun ya\u015Fayaca\u011F\u0131na inan\u0131yor. Son y\u0131ld\u0131z s\u00F6nd\u00FC\u011F\u00FCnde, son okyanus kurudu\u011Funda Tanr\u0131 \u015Eiva Varanasi\u2019yi m\u0131zra\u011F\u0131n\u0131n ucunda tufan\u0131n \u00FCst\u00FCne kald\u0131r\u0131r. Her \u015Fey yok olur. Sadece bu \u015Fehir kal\u0131r.",

  moralOrLesson:
    "\u015Eiva\u2019n\u0131n \u015Fehrinin hik\u00E2yesi \u015Funu \u00F6\u011Fretir: En kusursuz d\u00FCnyevi y\u00F6netim bile insan ruhunun nihayetinde ihtiya\u00E7 duydu\u011Fu tek \u015Feyi \u2014 varolu\u015F d\u00F6ng\u00FCs\u00FCnden kurtulu\u015Fu \u2014 veremez; ve \u00F6l\u00FCmle en d\u00FCr\u00FCst\u00E7e y\u00FCzle\u015Fti\u011Fimiz yerler, Tanr\u0131\u2019n\u0131n en yak\u0131ndan var oldu\u011Fu yerlerdir.",

  characters: [
    "\u015Eiva (Ka\u015Fi\u2019nin efendisi, \u015Fehri m\u0131zra\u011F\u0131nda ta\u015F\u0131yan tanr\u0131)",
    "Parvati (\u015Eiva\u2019n\u0131n e\u015Fi, Ka\u015Fi\u2019yi yuvalar\u0131 olarak se\u00E7en tanr\u0131\u00E7a)",
    "Kral Divodasa (tanr\u0131lar\u0131 gereksiz k\u0131lan adil kral)",
    "Vishnu (Divodasa\u2019y\u0131 \u015Fehri b\u0131rakmaya ikna eden tanr\u0131)",
    "Kala Bhairava (\u015Eiva\u2019n\u0131n korkun\u00E7 bek\u00E7i formu, Ka\u015Fi\u2019nin ilahi muhaf\u0131z\u0131)",
    "Maharani Ahilyabai Holkar (Vi\u015Fvanat Tap\u0131na\u011F\u0131\u2019n\u0131 1780\u2019de yeniden in\u015Fa eden krali\u00E7e)",
  ],

  era: "Mitolojik k\u00F6kenler (yarat\u0131l\u0131\u015F\u0131n kendisinden \u00F6nce); tap\u0131nak tarihi M\u00D6 2. biny\u0131ldan g\u00FCn\u00FCm\u00FCze uzan\u0131r",

  paragraphs: [
    {
      text: "Hindistan\u2019da bir \u015Fehir var ve bir milyardan fazla insan onun evrenden bile uzun ya\u015Fayaca\u011F\u0131na inan\u0131yor. Ad\u0131 Varanasi. Hindu kutsal metinlerine g\u00F6re k\u0131yamet g\u00FCn\u00FC geldi\u011Finde \u2014 son y\u0131ld\u0131z s\u00F6nd\u00FC\u011F\u00FCnde, son okyanus kurudu\u011Funda \u2014 tanr\u0131lar\u0131n en b\u00FCy\u00FC\u011F\u00FC \u015Eiva \u00FC\u00E7 u\u00E7lu m\u0131zra\u011F\u0131n\u0131 bu \u015Fehrin alt\u0131na saplar ve onu tufan\u0131n \u00FCst\u00FCne tek ba\u015F\u0131na kald\u0131r\u0131r. Evren yok olur. Bir tek \u015Fehir, bir tanr\u0131n\u0131n silah\u0131n\u0131n ucunda s\u00FCz\u00FClmeye devam eder.",
    },
    {
      text: "Hik\u00E2ye \u015F\u00F6yle ba\u015Flar: \u015Eiva ve kar\u0131s\u0131 Parvati \u2014 Hindu inanc\u0131n\u0131n en g\u00FC\u00E7l\u00FC \u00E7ifti \u2014 b\u00FCt\u00FCn evreni dola\u015F\u0131p kendilerine bir yuva arad\u0131lar. Cennet fazla kolayd\u0131. Yeralt\u0131 d\u00FCnyas\u0131 fazla karanl\u0131k. Her d\u00FCnya \u015Fehrinin bir kusuru vard\u0131. Derken Ganj Nehri\u2019nde suyun kuzeye d\u00F6nd\u00FC\u011F\u00FC bir k\u0131vr\u0131ma vard\u0131lar \u2014 sanki nehir g\u00F6ky\u00FCz\u00FCne geri t\u0131rmanmaya \u00E7al\u0131\u015F\u0131yordu. \u015Eiva durdu ve dedi ki: \u201CBuras\u0131 bana kalbim kadar de\u011Ferli.\u201D \u015Eehre \u201Casla terk edilmeyen\u201D ad\u0131n\u0131 verdi ve k\u0131yamet kopsa bile gitmeyece\u011Fine yemin etti.",
    },
    {
      text: "Ama bu hik\u00E2yenin en tuhaf b\u00F6l\u00FCm\u00FC \u015Eiva\u2019n\u0131n geli\u015Fi de\u011Fil \u2014 geri d\u00F6nemedi\u011Fi an. Bir d\u00F6nem \u015Fehir \u00E7\u00F6k\u00FC\u015Fe ge\u00E7ti ve \u015Eiva b\u0131rak\u0131p gitti. O yokken Divodasa ad\u0131nda bir insan kral tahta oturdu \u2014 ve \u00F6yle kusursuz h\u00FCkmetti ki cennet neredeyse yery\u00FCz\u00FCne indi. Hastal\u0131k yok, su\u00E7 yok, a\u00E7l\u0131k yok. Halk\u0131 o kadar mutluydu ki dua etmeyi b\u0131rakt\u0131lar. Ne dua edecekler ki? Her \u015Feyleri var. Tanr\u0131lar bir anda i\u015Fsiz kald\u0131. Bir \u00F6l\u00FCml\u00FC, tanr\u0131lar\u0131 gereksiz k\u0131lm\u0131\u015Ft\u0131.",
    },
    {
      text: "\u015Eiva \u015Fehrini geri istiyordu. Di\u011Fer tanr\u0131lar\u0131 tek tek g\u00F6nderdi: Divodasa\u2019n\u0131n krall\u0131\u011F\u0131nda bir kusur bulun. G\u00FCne\u015F tanr\u0131s\u0131 on iki farkl\u0131 bi\u00E7imde geldi \u2014 bir sorun bulamad\u0131, \u015Fehre \u00E2\u015F\u0131k oldu, kald\u0131. Fil ba\u015Fl\u0131 tanr\u0131 Gane\u015Fa elli alt\u0131 k\u0131l\u0131kta geldi, her kav\u015Fa\u011Fa ve kap\u0131ya casus olarak yerle\u015Fti \u2014 rapor edecek bir \u015Fey bulamad\u0131, o da kald\u0131. Zenginlik tanr\u0131\u00E7as\u0131 yoksulluk bulamad\u0131. Bilgi tanr\u0131\u00E7as\u0131 k\u00FClt\u00FCr\u00FC zaten m\u00FCkemmel buldu. \u015Eiva ne kadar casus g\u00F6nderdiyse hepsi \u015Fehre g\u00F6nl\u00FCn\u00FC kapt\u0131rd\u0131.",
    },
    {
      text: "Sonunda Vishnu gitti \u2014 koruyucu tanr\u0131, Hindu mitolojisinin en keskin zek\u00E2s\u0131. Kusur aramad\u0131, do\u011Frudan \u00F6z\u00FCne gitti. Divodasa\u2019ya dedi ki: Krall\u0131\u011F\u0131n ne denli kusursuz olsa da halk\u0131n ya\u015Flan\u0131yor, ac\u0131 \u00E7ekiyor, \u00F6l\u00FCyor ve yeniden do\u011Fuyor. Kusursuz krall\u0131k her \u015Feyi verir, bir \u015Fey hari\u00E7 \u2014 \u00F6l\u00FCm-do\u011Fum d\u00F6ng\u00FCs\u00FCnden kurtulu\u015F. Bunu yaln\u0131zca \u015Eiva verebilir. Derler ki sabr\u0131n sonu selamettir \u2014 \u015Eiva\u2019n\u0131n sabr\u0131 t\u00FCkenmi\u015Fti ama selamet Vishnu\u2019nun dilinden geldi. Divodasa taht\u0131n\u0131 b\u0131rakt\u0131.",
    },
    {
      text: "\u015Eiva eve d\u00F6nd\u00FC. \u015Eehrini eskisinden zengin buldu \u2014 ilahi casuslar\u0131n g\u00F6revlerinde ba\u015Far\u0131s\u0131z olurken in\u015Fa ettikleri tap\u0131naklarla doluydu. Nehir k\u0131y\u0131s\u0131ndaki Da\u015Fa\u015Fvamedh Ghat basamaklar\u0131nda yarat\u0131l\u0131\u015F tanr\u0131s\u0131 Brahma, \u015Eiva\u2019n\u0131n d\u00F6n\u00FC\u015F\u00FCn\u00FC kutlad\u0131. Rahipler bug\u00FCn bile her ak\u015Fam ayn\u0131 noktada ate\u015F ayini yap\u0131yor. Ve \u015Fehrin tam kalbinde Ka\u015Fi Vi\u015Fvanat Tap\u0131na\u011F\u0131 y\u00FCkseliyor \u2014 \u201CEvrenin Efendisi\u201D tap\u0131na\u011F\u0131 \u2014 \u015Eiva\u2019n\u0131n kendini sonsuz bir \u0131\u015F\u0131k s\u00FCtunu olarak g\u00F6sterdi\u011Fi yerde.",
    },
    {
      text: "O tap\u0131nak defalarca y\u0131k\u0131l\u0131p yeniden yap\u0131ld\u0131. En a\u011F\u0131r darbe 1669\u2019da geldi: Hindistan\u2019\u0131n b\u00FCy\u00FCk b\u00F6l\u00FCm\u00FCne h\u00FCkmeden imparator Evrengzib tap\u0131na\u011F\u0131 yerle bir edip kal\u0131nt\u0131lar\u0131n\u0131n \u00FCst\u00FCne bir cami yapt\u0131rd\u0131. Orijinal i\u015Flemeli duvar bug\u00FCn h\u00E2l\u00E2 caminin i\u00E7inde g\u00F6r\u00FClebiliyor. Ama tap\u0131nak geri geldi. \u015Eu an ayakta duran\u0131 1780\u2019de in\u015Fa edildi ve 1835\u2019te alt\u0131nla ta\u00E7land\u0131r\u0131ld\u0131. Bir tanr\u0131n\u0131n m\u0131zra\u011F\u0131n\u0131n ucundaki \u015Fehrin b\u00FCt\u00FCn hik\u00E2yesi bu \u2014 onu y\u0131kabilirsin ama y\u0131k\u0131k b\u0131rakamazs\u0131n.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// PUSH TO DYNAMODB
// ═══════════════════════════════════════════════════════════════════════════════

async function pushStory(record) {
  const label = `${record.lang}#${record.storyId}`;
  console.log(`\n⏳ Pushing ${label} ...`);

  // Quick JSON validation: make sure it round-trips cleanly
  const json = JSON.stringify(record);
  const parsed = JSON.parse(json);
  if (parsed.paragraphs.length !== record.paragraphs.length) {
    throw new Error(`JSON round-trip mismatch for ${label}`);
  }

  try {
    await doc.send(
      new PutCommand({
        TableName: TABLE,
        Item: record,
        // Safety: only write if this langStoryId does NOT already exist
        ConditionExpression: "attribute_not_exists(langStoryId)",
      })
    );
    console.log(`✅ ${label} pushed successfully.`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(
        `⚠️  ${label} already exists. Overwriting with updated version...`
      );
      await doc.send(
        new PutCommand({ TableName: TABLE, Item: record })
      );
      console.log(`✅ ${label} overwritten successfully.`);
    } else {
      console.error(`❌ Failed to push ${label}:`, err.message);
      throw err;
    }
  }
}

async function main() {
  console.log("═══ Pushing story translations to DynamoDB ═══");
  console.log(`Table: ${TABLE}`);
  console.log(`Timestamp: ${now}`);

  // Validate paragraph constraints before pushing
  for (const rec of [ar, fa, tr]) {
    let totalChars = 0;
    for (let i = 0; i < rec.paragraphs.length; i++) {
      const p = rec.paragraphs[i];
      const chars = p.text.length;
      totalChars += chars;
      if (chars > 500) {
        console.warn(
          `⚠️  ${rec.lang} paragraph ${i + 1}: ${chars} chars (over 500 limit)`
        );
      }
    }
    console.log(
      `\n📊 ${rec.lang}: ${rec.paragraphs.length} paragraphs, ${totalChars} total characters`
    );
  }

  // Push sequentially to confirm each before proceeding
  await pushStory(ar);
  await pushStory(fa);
  await pushStory(tr);

  console.log("\n═══ All three translations pushed successfully ═══");
}

main().catch((err) => {
  console.error("\n💥 Fatal error:", err);
  process.exit(1);
});
