import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English) ───
const base = {
  siteId: "great-pyramids-giza",
  storyId: "curse-of-the-pharaohs-original",
  icon: "\u{1F441}\u{FE0F}",
  tier: "S",
  readingTimeMinutes: 3,
  image: "",
  disabled: false,
  thumbnail: "",
  coordinates: { lng: 31.1342, lat: 29.9792 },
  hasAudio: false,
  isFree: true,
  storyCategory: "ghosts_curses",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════
//  ARABIC — جِنُّ الأَهرام
//  Register: Modern Arab storyteller — podcast/documentary voice
//  Proverb subverted: «إذا جاءَتِ المَصائِبُ لا تَأتي فُرادى»
//    → "The pharaohs didn't wait for misfortunes — they crafted three
//       with their own hands."
// ═══════════════════════════════════════════════════════════════════
const ar = {
  ...base,
  lang: "ar",
  langStoryId: "ar#curse-of-the-pharaohs-original",
  title: "جِنُّ الأَهرام",
  subtitle: "أَرواحٌ حَبَسَها الفَراعِنَةُ في الحَجَر",
  excerpt:
    "قَبلَ قُرونٍ مِن لَعنَةِ توت عنخ آمون الشَّهيرَة، دَوَّنَ عُلَماءُ العَرَبِ في القاهِرَةِ رِواياتٍ عَن حُرّاسٍ أَقدَمَ بِكَثير — أَرواحٍ مِنَ الجِنِّ رَبَطَها الفَراعِنَةُ بِالحَجَر، تَنتَظِرُ في الظُّلمَةِ كُلَّ مَن يَجرُؤُ عَلى الدُّخول.",
  moralOrLesson:
    "أَدرَكَ القُدَماءُ أنَّ أَعظَمَ الكُنوزِ تَحتاجُ أَشَدَّ الحُرّاسِ رُعبًا — وَلَيسَ كُلُّ حارِسٍ يُرى بِالعَين.",
  source:
    "المَقريزي، الخِطَط والآثار؛ الأدب التاريخي العربي في العصور الوسطى",
  characters: [
    "المَرأَةُ الفاتِنَة",
    "الصَّبِيُّ ذو العُيونِ الذَّهَبِيَّة",
    "روحُ الرَّمل",
    "المَقريزي (مُؤَرِّخ)",
  ],
  era: "العصر العربي الوسيط (يستند إلى تقاليد قديمة)",
  paragraphs: [
    {
      text: "كُلُّنا سَمِعنا بِلَعنَةِ الفَراعِنَة — تِلكَ القِصَّةِ الشَّهيرَةِ عَن مَقبَرَةِ توت عنخ آمون وَمَوتِ مَن فَتَحوها عامَ ١٩٢٢. لكِنَّ ما لا يَعرِفُهُ كَثيرون أنَّ عُلَماءَ العَرَبِ في القاهِرَةِ كَتَبوا، قَبلَ قُرونٍ مِن وُصولِ أيِّ أوروبيٍّ إلى تِلكَ المَقابِر، عَن شَيءٍ أَقدَمَ وأَغرَبَ بِكَثير. لَم يَكتُبوا عَن نُقوشٍ تَحمِلُ لَعَنات. كَتَبوا عَن حُرّاسٍ أَحياء — أَرواحٍ مِنَ الجِنِّ حَبَسَها الفَراعِنَةُ أَنفُسُهُم في الحَجَر، تَنتَظِرُ في الظُّلمَةِ كُلَّ مَن تُسَوِّلُ لَهُ نَفسُهُ الدُّخول.",
    },
    {
      text: "أَدَقُّ ما وَصَلَنا مِن هذِهِ الرِّواياتِ جَمَعَهُ المُؤَرِّخُ المِصريُّ تَقِيُّ الدّينِ المَقريزي في القَرنِ الخامِسَ عَشَر. المَقريزي لَم يَختَرِع شَيئًا — بَل جَمَعَ حِكاياتٍ كانَت قَديمَةً حَتّى في زَمَنِهِ هُوَ، رِواياتٍ شَفَهِيَّةً تَعودُ إلى عَصرِ الفَراعِنَةِ أَنفُسِهِم. وبِحَسَبِ ما دَوَّنَهُ، لَم يَكُنِ المُلوكُ الذينَ بَنَوا الأَهرامَ مُجَرَّدَ بُناةٍ عِظام. كانوا أَسيادَ عِلمٍ آخَر. قَبلَ أَن يُغلِقوا مَقابِرَهُم لِلأَبَد، أَقاموا طُقوسًا استَحضَروا بِها الجِنَّ وَرَبَطوهُم بِالمَكان — حُرّاسًا لا يَشيخونَ وَلا يَموتون.",
    },
    {
      text: "أَشَدُّ هؤُلاءِ الحُرّاسِ رُعبًا كانَت تَظهَرُ في هَيئَةِ امرَأَةٍ فاتِنَةٍ لا مَثيلَ لَها. كانَت تَأتي لِلرِّجالِ الذينَ يَدخُلونَ الهَرَمَ لَيلًا، وَكَفى أَن يَرَوها حَتّى يَتَحَطَّموا. كانوا يَخرُجونَ عاجِزينَ عَنِ الكَلام، لا يَعرِفونَ أَهلَهُم وَلا أَنفُسَهُم. بَعضُهُم هامَ في الصَّحراءِ وَلَم يَعُد أَبَدًا. القِلَّةُ الذينَ نَجَوا لَم يَستَطيعوا إلّا أَن يَقولوا إنَّ جَمالَها كانَ أَبعَدَ مِن أَن يَحتَمِلَهُ عَقلٌ بَشَري — كَالتَّحديقِ في الشَّمس، لكِنَّ الشَّمسَ تُعمي العَينَ فَقَط. هذِهِ كَسَرَت شَيئًا أَعمَق.",
    },
    {
      text: "الحارِسُ الثاني كانَ صَبِيًّا بِجِلدٍ كَلَونِ العَسَل وَعَينَينِ ذَهَبِيَّتَينِ تَتَوَهَّجانِ كَالمَصابيحِ في الظَّلام. هذا الجِنِّيُّ كانَ يَستَهدِفُ لُصوصَ المَقابِرِ تَحديدًا. يَظهَرُ أَمامَهُم في الأَنفاقِ، دائِمًا عَلى بُعدِ خُطُوات — بَعيدًا بِما يَكفي لِيَتبَعوه، قَريبًا بِما يَكفي لِيُغرِيَهُم. يَقودُهُم في مَمَرّاتٍ تَتَبَدَّلُ وَتَنغَلِقُ خَلفَهُم. بَعضُ هؤُلاءِ اللُّصوصِ عُثِرَ عَلَيهِم بَعدَ سَنَوات — مَحبوسينَ في غُرَفٍ لا مَدخَلَ مَرئِيًّا لَها، شُعورُهُم بَيضاءُ تَمامًا، وَعُقولُهُم قَد ذَهَبَت إلى غَيرِ رَجعَة.",
    },
    {
      text: "يَقولُ العَرَبُ «إذا جاءَتِ المَصائِبُ لا تَأتي فُرادى». لكِنَّ الفَراعِنَةَ لَم يَنتَظِروا المَصائِبَ — صَنَعوها ثَلاثًا بِأَيديهِم. الهَرَمُ الثالِثُ، هَرَمُ مَنقَرَع، كانَ لَهُ حارِسُهُ الخاصّ: شَكلٌ مَلفوفٌ في عَمودٍ مِنَ الرَّملِ الدَّوّار. حينَ يَمُرُّ في المَمَرّات تَموتُ كُلُّ شُعلَةٍ في لَحظَة. ظَلامٌ مُطلَق. وَفي ذلِكَ الظَّلام، أَصواتٌ بِلُغَةٍ ماتَت مُنذُ ثَلاثَةِ آلافِ سَنَة. مُستَكشِفو تِلكَ الحِقبَةِ أَخَذوا الأَمرَ بِجِدِّيَّة — كانوا يَقرَؤونَ القُرآنَ قَبلَ الدُّخول، وَيَتَعامَلونَ مَعَ هذِهِ الأَماكِنِ لا كَأَطلالٍ بَل كَشَيءٍ لا يَزالُ حَيًّا.",
    },
    {
      text: "العِلمُ الحَديثُ يَرفُضُ كُلَّ هذا وَيُسَمّيهِ خُرافات. لكِنَّ الناسَ الذينَ يَعيشونَ وَيَعمَلونَ في ظِلِّ الأَهرامِ يَروونَ قِصَّةً مُختَلِفَة. الحُرّاسُ يَتَحَدَّثونَ عَن بُقَعٍ بارِدَةٍ في غُرَفٍ مُغلَقَةٍ لا يَدخُلُها هَواء. العُمّالُ يَسمَعونَ صَوتَ حَجَرٍ يَحتَكُّ بِحَجَرٍ في أَماكِنَ لا يَتَحَرَّكُ فيها شَيء. وَالجَميعُ تَقريبًا يَصِفونَ الإحساسَ نَفسَهُ: ثِقَلٌ لا يُخطِئُهُ أَحَد، شُعورٌ بِأَنَّ شَيئًا قَديمًا وَواعِيًا يُراقِبُك. أَربَعَةُ آلافٍ وَخَمسُمِئَةِ سَنَة مَرَّت، وَلا تَزالُ الأَهرامُ تَحتَفِظُ بِأَسرارِها — وَرُبَّما بِحُرّاسِها أَيضًا.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
//  PERSIAN — نگهبانان اهرام
//  Register: Modern Persian storyteller — natural prose, minimal
//    Arabic loanwords where Persian equivalents exist
//  Proverb subverted: «گنج بی‌مار نمی‌باشد»
//    → "Every treasure has its serpent — but the pharaohs left three,
//       not one."
// ═══════════════════════════════════════════════════════════════════
const fa = {
  ...base,
  lang: "fa",
  langStoryId: "fa#curse-of-the-pharaohs-original",
  title: "نگهبانان اهرام",
  subtitle: "ارواحی که فراعنه در سنگ زندانی کردند",
  excerpt:
    "قرن‌ها پیش از نفرینِ معروفِ توتانخامون، دانشمندانِ عربِ قاهره درباره‌ی نگهبانانی بسیار قدیمی‌تر نوشته بودند — ارواحی از جنسِ جنّ که فراعنه در دلِ سنگ زندانی کرده بودند تا در تاریکی منتظرِ هر کسی بمانند که جرأتِ ورود داشته باشد.",
  moralOrLesson:
    "پیشینیان می‌دانستند که بزرگ‌ترین گنج‌ها ترسناک‌ترین نگهبان‌ها را می‌طلبند — و هر نگهبانی با چشم دیده نمی‌شود.",
  source:
    "مَقریزی، الخِطَط و الآثار؛ متون تاریخی عربی دوره‌ی میانه",
  characters: [
    "زنِ فریبنده",
    "پسرِ چشم‌طلایی",
    "روحِ شن‌وباد",
    "مَقریزی (مورّخ)",
  ],
  era: "دوره‌ی میانه‌ی عربی (برگرفته از سنت‌های باستانی)",
  paragraphs: [
    {
      text: "همه‌ی ما داستانِ «نفرینِ فراعنه» را شنیده‌ایم — همان قصه‌ی معروفِ مقبره‌ی توتانخامون و مرگِ مرموزِ کسانی که در سالِ ۱۹۲۲ بازش کردند. اما چیزی که خیلی‌ها نمی‌دانند این است که قرن‌ها پیش از آنکه پایِ هیچ باستان‌شناسِ اروپایی به اهرام برسد، دانشمندانِ عرب در قاهره‌ی قرونِ وسطی درباره‌ی چیزِ بسیار قدیمی‌تر و عجیب‌تری نوشته بودند. نه نفرین‌هایی حک‌شده روی دیوار — بلکه نگهبانانِ زنده. ارواحی از جنسِ جنّ که فراعنه خودشان در دلِ سنگ زندانی کرده بودند تا در تاریکی منتظرِ هر احمقی بمانند که جرأتِ ورود پیدا کند.",
    },
    {
      text: "دقیق‌ترین روایت از آنِ مورّخِ مصری، تقی‌الدینِ مَقریزی است که در قرنِ پانزدهم می‌نوشت. مَقریزی چیزی از خودش نساخت — حکایت‌هایی را گردآوری کرد که حتی در زمانِ خودش هم کهنه بودند، روایت‌های دهان‌به‌دهانی که ریشه‌شان به عصرِ خودِ فراعنه می‌رسید. بنا بر آنچه ثبت کرد، پادشاهانی که اهرام را ساختند فقط معمارانِ بزرگ نبودند. در دانشی دیگر هم سرآمد بودند. پیش از آنکه مقبره‌هایشان را برای همیشه مُهر و موم کنند، آیین‌هایی برگزار می‌کردند تا جنّیان را فراخوانده و به آن مکان ببندند — نگهبانانی که نه پیر می‌شوند و نه می‌میرند.",
    },
    {
      text: "ترسناک‌ترینِ این نگهبانان به شکلِ زنی خیره‌کننده ظاهر می‌شد — زیبایی‌ای فراتر از هر چیزِ انسانی. شب‌ها سراغِ مردانی می‌آمد که واردِ هَرَم شده بودند، و همین‌که چشمشان به او می‌افتاد، تمام می‌شدند. بیرون می‌آمدند بدونِ توانِ حرف زدن، بدونِ شناختنِ خانواده‌شان. بعضی‌ها سرگردانِ صحرا شدند و هرگز برنگشتند. آن معدود کسانی که تا حدی به خود آمدند فقط توانستند بگویند زیبایی‌اش چیزی بود که مغزِ آدم طاقتش را نداشت — مثلِ خیره شدن به خورشید، اما بدتر. خورشید چشمت را کور می‌کند. این زن چیزِ عمیق‌تری را در تو می‌شکست.",
    },
    {
      text: "نگهبانِ دوم پسربچه‌ای بود با پوستی به رنگِ عسل و چشمانی طلایی که در تاریکی مثلِ فانوس می‌درخشیدند. این جنّی مخصوصِ دزدانِ مقبره بود. جلوِ آن‌ها در تونل‌ها ظاهر می‌شد، همیشه چند قدم جلوتر — به‌اندازه‌ای دور که دنبالش کنند، به‌اندازه‌ای نزدیک که وسوسه‌شان کند. آن‌ها را به راهروهایی می‌کشاند که پشتِ سرشان جابه‌جا می‌شدند و بسته می‌شدند. بعضی از این دزدها را سال‌ها بعد پیدا کردند — محبوس در اتاق‌هایی بدونِ هیچ درِ پیدایی، موهایشان یکسره سفید و عقلشان از دست رفته.",
    },
    {
      text: "در فارسی می‌گویند «گنج بی‌مار نمی‌باشد.» اما فراعنه سه مار گذاشتند، نه یکی. هَرَمِ سوم — هَرَمِ مَنکورَع، کوچک‌ترینِ سه هَرَمِ جیزه — نگهبانِ خودش را داشت: هیکلی پیچیده در ستونی چرخان از شن. وقتی در راهروها حرکت می‌کرد، هر مشعلی در یک لحظه خاموش می‌شد. تاریکیِ مطلق. و در آن تاریکی، صداهایی به زبانی که سه هزار سال بود مرده بود. کاوشگرانِ عربِ آن دوره موضوع را جدی می‌گرفتند. پیش از ورود قرآن می‌خواندند و با این مکان‌ها نه مثلِ ویرانه، بلکه مثلِ چیزی زنده رفتار می‌کردند.",
    },
    {
      text: "دانشِ امروز همه‌ی این‌ها را افسانه می‌داند و تمام. اما مردمی که در سایه‌ی اهرام زندگی و کار می‌کنند، حرفِ دیگری دارند. نگهبانان از نقطه‌های سردِ بی‌دلیل در اتاق‌هایِ مُهر و مومِ بدونِ کوران حرف می‌زنند. کارگرها صدایِ سایشِ سنگ بر سنگ را در جاهایی می‌شنوند که هیچ‌چیز تکان نمی‌خورد. و تقریباً همه یک چیزِ مشترک را توصیف می‌کنند: احساسی سنگین و انکارناپذیر که چیزی باستانی و هوشیار دارد نگاهت می‌کند. چهار هزار و پانصد سال گذشته، و اهرام هنوز رازهایشان را نگه داشته‌اند — و شاید نگهبانانشان را هم.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
//  TURKISH — Piramitlerin Bekçileri
//  Register: Modern Turkish storyteller — natural word order,
//    genuine Turkish idiom, no calques
//  Proverb subverted: «Sabrın sonu selamettir»
//    → "Patience leads to salvation, they say. But the patience of these
//       guardians brought not salvation — but disaster."
// ═══════════════════════════════════════════════════════════════════
const tr = {
  ...base,
  lang: "tr",
  langStoryId: "tr#curse-of-the-pharaohs-original",
  title: "Piramitlerin Bekçileri",
  subtitle: "Firavunlar\u0131n ta\u015Fa zincirledi\u011Fi ruhlar",
  excerpt:
    "Tutankamon\u2019un \u00FCnl\u00FC lanetinden y\u00FCzy\u0131llar \u00F6nce, Kahire\u2019deki Arap \u00E2limler \u00E7ok daha kadim bek\u00E7iler hakk\u0131nda yazm\u0131\u015Flard\u0131 \u2014 firavunlar\u0131n ta\u015F\u0131n i\u00E7ine hapsetti\u011Fi cinler, karanl\u0131kta, i\u00E7eri girmeye c\u00FCret eden herkesi sab\u0131rla bekleyen varl\u0131klar.",
  moralOrLesson:
    "Kadim insanlar biliyordu ki en b\u00FCy\u00FCk hazineler en korkun\u00E7 muhaf\u0131zlar\u0131 gerektirir \u2014 ve her bek\u00E7i g\u00F6zle g\u00F6r\u00FClmez.",
  source:
    "Makr\u00EEz\u00EE, el-H\u0131tat ve\u2019l-\u00C2s\u00E2r; Ortaça\u011F Arap tarih yaz\u0131n\u0131",
  characters: [
    "B\u00FCy\u00FCleyici Kad\u0131n",
    "Alt\u0131n G\u00F6zl\u00FC \u00C7ocuk",
    "Kum F\u0131rt\u0131nas\u0131 Ruhu",
    "Makr\u00EEz\u00EE (tarih\u00E7i)",
  ],
  era: "Ortaça\u011F Arap d\u00F6nemi (kadim geleneklere dayanan)",
  paragraphs: [
    {
      text: "\u201CFiravunlar\u0131n laneti\u201D deyince herkesin akl\u0131na ayn\u0131 \u015Fey gelir: 1922\u2019de Tutankamon\u2019un mezar\u0131 a\u00E7\u0131ld\u0131, sonra insanlar gizemli \u015Fekilde \u00F6lmeye ba\u015Flad\u0131. Ama y\u00FCzy\u0131llar \u00F6nce, herhangi bir Avrupal\u0131 arkeolog piramitlerin yak\u0131n\u0131na bile gelmeden, Kahire\u2019deki Arap \u00E2limler \u00E7ok daha eski ve \u00E7ok daha tuhaf bir \u015Fey hakk\u0131nda yazm\u0131\u015Flard\u0131. Duvarlara kaz\u0131nm\u0131\u015F lanetlerden bahsetmiyorlard\u0131. Canl\u0131 bek\u00E7ilerden bahsediyorlard\u0131 \u2014 firavunlar\u0131n bizzat kendilerinin ta\u015F\u0131n i\u00E7ine hapsetti\u011Fi cinlerden. Karanl\u0131kta bekleyen, i\u00E7eri girmeye c\u00FCret edecek her zavall\u0131y\u0131 sab\u0131rla kollayan varl\u0131klardan.",
    },
    {
      text: "Bu anlat\u0131lar\u0131n en ayr\u0131nt\u0131l\u0131s\u0131, 15. y\u00FCzy\u0131lda ya\u015Fam\u0131\u015F M\u0131s\u0131rl\u0131 tarih\u00E7i Tak\u0131yy\u00FCddin el-Makr\u00EEz\u00EE\u2019den gelir. Makr\u00EEz\u00EE bunlar\u0131 uydurmad\u0131 \u2014 kendi zaman\u0131nda bile \u00E7oktan kadim say\u0131lan hik\u00E2yeleri bir araya getirdi; firavunlar \u00E7a\u011F\u0131na kadar uzanan s\u00F6zl\u00FC gelenekleri kayda ge\u00E7irdi. Onun aktard\u0131\u011F\u0131na g\u00F6re piramitleri in\u015Fa eden krallar sadece b\u00FCy\u00FCk mimarlar de\u011Fildi. Bambam\u015Fka bir ilmin de ustalar\u0131yd\u0131. Mezarlar\u0131n\u0131 sonsuza dek m\u00FCh\u00FCrlemeden \u00F6nce rit\u00FCeller d\u00FCzenleyerek cinleri \u00E7a\u011F\u0131r\u0131yor ve onlar\u0131 o mek\u00E2na ba\u011Fl\u0131yorlard\u0131 \u2014 ne ya\u015Flanan ne de \u00F6len muhaf\u0131zlar olarak.",
    },
    {
      text: "Bu bek\u00E7ilerin en korkuncu, insan\u00FCst\u00FC g\u00FCzellikte bir kad\u0131n k\u0131l\u0131\u011F\u0131nda g\u00F6r\u00FCn\u00FCrd\u00FC. Geceleri piramide giren erkeklerin kar\u015F\u0131s\u0131na \u00E7\u0131kard\u0131 ve onu g\u00F6ren herkes parampar\u00E7a olurdu. D\u0131\u015Far\u0131 sendeleyerek \u00E7\u0131karlard\u0131 \u2014 konu\u015Famaz, ailelerini tan\u0131yamaz h\u00E2lde. Baz\u0131lar\u0131 \u00E7\u00F6le dald\u0131, bir daha geri d\u00F6nmedi. K\u0131smen iyile\u015Febilen birka\u00E7 ki\u015Fi ancak \u015Funu s\u00F6yleyebildi: onun g\u00FCzelli\u011Fi insan akl\u0131n\u0131n kald\u0131ramayaca\u011F\u0131 bir \u015Feydi \u2014 g\u00FCne\u015Fe bakmak gibi, ama daha beter. G\u00FCne\u015F g\u00F6z\u00FCn\u00FC k\u00F6r eder. Bu kad\u0131n i\u00E7indeki bir \u015Feyi k\u0131rard\u0131.",
    },
    {
      text: "\u0130kinci bek\u00E7i, bal rengi tenli ve karanl\u0131kta fener gibi parlayan alt\u0131n g\u00F6zl\u00FC bir o\u011Flan \u00E7ocu\u011Fuydu. Bu cin \u00F6zellikle mezar h\u0131rs\u0131zlar\u0131n\u0131 hedef al\u0131rd\u0131. T\u00FCnellerde hep birka\u00E7 ad\u0131m ilerilerinde belirir, takip etmelerine yetecek kadar yak\u0131n ama asla ula\u015Famayacaklar\u0131 kadar uzakta dururdu. Onlar\u0131 arkalar\u0131nda kapanan ve yer de\u011Fi\u015Ftiren koridorlara do\u011Fru \u00E7ekerdi. Bu h\u0131rs\u0131zlar\u0131n baz\u0131lar\u0131 y\u0131llar sonra bulundu \u2014 g\u00F6zle g\u00F6r\u00FCl\u00FCr bir giri\u015Fi olmayan odalara kapat\u0131lm\u0131\u015F, sa\u00E7lar\u0131 bembeyaz, ak\u0131llar\u0131 tamamen gitmi\u015F h\u00E2lde.",
    },
    {
      text: "\u201CSabr\u0131n sonu selamettir\u201D derler. Ama bu bek\u00E7ilerin sabr\u0131n\u0131n sonu selamet de\u011Fil, felaketti. \u00DC\u00E7\u00FCnc\u00FC piramidin \u2014 Giza\u2019daki \u00FC\u00E7 piramidin en k\u00FC\u00E7\u00FC\u011F\u00FC olan Menkaure piramidinin \u2014 kendine ait bir koruyucusu vard\u0131: d\u00F6nen bir kum s\u00FCtununa sar\u0131lm\u0131\u015F bir fig\u00FCr. Koridorlarda hareket etti\u011Finde her me\u015Fale bir anda s\u00F6n\u00FCverirdi. Mutlak karanl\u0131k. Ve o karanl\u0131kta sesler \u2014 \u00FC\u00E7 bin y\u0131ld\u0131r \u00F6l\u00FC olan bir dilde konu\u015Fan sesler. O d\u00F6nemin Arap k\u00E2\u015Fifleri bunu ciddiye al\u0131rd\u0131. \u0130\u00E7eri ad\u0131m atmadan \u00F6nce Kur\u2019an okurlar, bu yerlere bir harabe olarak de\u011Fil, h\u00E2l\u00E2 canl\u0131 bir \u015Fey olarak yakla\u015F\u0131rlard\u0131.",
    },
    {
      text: "Modern bilim bunlar\u0131n hepsini folklor diye bir kenara koyar. Ama piramitlerin g\u00F6lgesinde ya\u015Fayan ve \u00E7al\u0131\u015Fan insanlar farkl\u0131 bir hik\u00E2ye anlat\u0131r. G\u00FCvenlik g\u00F6revlileri, hava ak\u0131m\u0131 olmayan m\u00FChrl\u00FC odalarda a\u00E7\u0131klanamaz so\u011Fuk noktalardan s\u00F6z eder. \u0130\u015F\u00E7iler, hi\u00E7bir \u015Feyin k\u0131p\u0131rdamad\u0131\u011F\u0131 yerlerde ta\u015F\u0131n ta\u015Fa s\u00FCrt\u00FCnme sesini duyar. Ve neredeyse herkes ayn\u0131 \u015Feyi tarif eder: kadim ve uyan\u0131k bir \u015Feyin sizi izledi\u011Fine dair a\u011F\u0131r, yan\u0131lmaz bir his. D\u00F6rt bu\u00E7uk bin y\u0131l ge\u00E7ti, piramitler h\u00E2l\u00E2 s\u0131rlar\u0131n\u0131 sakl\u0131yor \u2014 ve belki bek\u00E7ilerini de.",
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
      console.warn(`  ⚠ Paragraph ${i} is ${t.length} chars (target <500)`);
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
    console.log(`  ✅ ${label} pushed successfully.`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.error(`  ❌ ${label}: Record already exists! Skipping.`);
    } else {
      console.error(`  ❌ ${label} FAILED:`, err.message);
      throw err;
    }
  }
}

async function main() {
  console.log("═══════════════════════════════════════════════");
  console.log("Curse of the Pharaohs (Original) — ar / fa / tr push");
  console.log(`Timestamp: ${now}`);
  console.log("═══════════════════════════════════════════════");

  await pushStory(ar, "ARABIC");
  await pushStory(fa, "PERSIAN");
  await pushStory(tr, "TURKISH");

  console.log("\n✅ All three languages pushed successfully.");
}

main().catch((err) => {
  console.error("\n💥 Fatal error:", err.message);
  process.exit(1);
});
