import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English) ───
const base = {
  siteId: "prague-castle",
  storyId: "defenestration-1618",
  icon: "\u{1F3F0}",
  tier: "S",
  readingTimeMinutes: 2,
  image: "",
  disabled: false,
  thumbnail: "",
  coordinates: { lng: 14.4014, lat: 50.0908 },
  hasAudio: false,
  isFree: true,
  storyCategory: "crowns_conquests",
  updatedAt: now,
  source:
    "Contemporary diplomatic records; Habsburg archives; Czech national histories",
};

// ═══════════════════════════════════════════════════════════════════
//  ARABIC — نافِذَةٌ أَشْعَلَتْ قارَّة
//  Proverb subverted: «القَشَّة تَقْصِمُ ظَهْرَ البَعير»
//  → في بْراغ لَمْ تَكُنْ قَشَّة — كانَتْ نافِذَة.
//    وما انْكَسَرَ لَمْ يَكُنْ ظَهْرَ بَعير — بَلْ قارَّةٌ بِأَكْمَلِها.
// ═══════════════════════════════════════════════════════════════════
const ar = {
  ...base,
  lang: "ar",
  langStoryId: "ar#defenestration-1618",
  title: "نافِذَةٌ أَشْعَلَتْ قارَّة",
  subtitle:
    "نافِذَةٌ سَقَطَ مِنها ثَلاثَةُ رِجال، فَاشْتَعَلَتْ حَرْبٌ الْتَهَمَتْ ثَمانِيَةَ مَلايينِ إنْسان",
  excerpt:
    "في صَباحِ الثّالِثِ وَالعِشرينَ مِن مايو 1618، اقْتَحَمَتْ مَجموعَةٌ مِنَ النُّبَلاءِ البروتِسْتانت قَلْعَةَ بْرَاغ، وقَد بَلَغَ بِهِمُ الغَضَبُ أَقْصاه.",
  moralOrLesson:
    "لَحْظَةُ تَحَدٍّ واحِدَة قَد تُطْلِقُ عَواقِبَ تَتَجاوَزُ كُلَّ حِسابٍ بَشَرِيّ.",
  characters: [
    "فِيلِم سْلَافَاتَا",
    "يَاروسلاف مَارتِينِيتش",
    "فِيلِيب فَابرِيتسيوس",
    "الكونت تورن",
    "نُبَلاء بروتِسْتانت",
  ],
  era: "٢٣ مايو ١٦١٨",
  paragraphs: [
    {
      text: "في صَباحِ الثّالِثِ وَالعِشرينَ مِن مايو 1618، اقْتَحَمَتْ مَجموعَةٌ مِنَ النُّبَلاءِ البروتِسْتانت قَلْعَةَ بْرَاغ، وقَد بَلَغَ بِهِمُ الغَضَبُ أَقْصاه. آلُ هابْسبورغ — أَعتى سُلالَةٍ حاكِمَةٍ في أوروبّا — أَمْضَوْا سَنَواتٍ يَخْنُقونَ حُرِّيّاتِهِمُ الدّينِيَّة. حُكّامٌ كاثوليك باتوا يَتَحَكَّمونَ بِمَصيرِ بوهِيمْيا. وَثيقَةُ الحُقوقِ الدّينِيَّة الَّتي وَقَّعَها المَلِكُ بِيَدِه؟ أَصْبَحَتْ حِبْراً عَلى وَرَق. عَرائِض؟ مُفاوَضات؟ لا شَيْءَ نَفَع. فَاسْتَدْعى النُّبَلاءُ تَقْليداً تشيكيّاً عَريقاً: إذا أَغْلَقَتِ السِّياسَةُ كُلَّ بابٍ، تَبَقّى دائِماً النّافِذَة.",
    },
    {
      text: "لَمْ تَكُنْ هَذِهِ المَرَّةَ الأولى. قَبْلَ مِئَتَيْ عام، في 1419، أَلْقى أَتْباعُ المُصْلِحِ الدّينيِّ يَان هُوس مَسؤولينَ كاثوليك مِنْ نافِذَةِ بَلَدِيَّةِ بْرَاغ، فَاشْتَعَلَتْ حَرْبٌ اسْتَمَرَّتْ خَمْسَ عَشْرَةَ سَنَة. الآنَ التّاريخُ يُعيدُ نَفْسَه. وَجَدَ النُّبَلاءُ الحاكِمَيْنِ المُعَيَّنَيْنِ مِنَ الإمبراطور — سْلَافَاتَا ومَارتِينِيتش — في المَكاتِبِ المَلَكِيَّة، ومَعَهُما سِكْرِتيرُهُما فَابرِيتسيوس. تَعالَتِ الصَّرَخاتُ واتِّهاماتُ الطُّغْيان. ثُمَّ امْتَدَّتِ الأيدي وجَرَّتِ الرِّجالَ الثَّلاثَةَ نَحْوَ النّافِذَة.",
    },
    {
      text: "تَشَبَّثَ سْلَافَاتَا بِإِطارِ النّافِذَةِ بِكُلِّ ما فيهِ مِنْ قُوَّة، يَصْرُخُ مُسْتَغيثاً بِالعَذْراء. مَارتِينِيتش صَمَتَ تَماماً — رُبَّما شَلَّهُ الرُّعْب. والسِّكْرِتيرُ حاوَلَ أَنْ يَخْتَبِئ. لَكِنْ واحِداً تِلْوَ الآخَر، أُمْسِكَ بِالثَّلاثَةِ جَميعاً وأُلْقوا مِنَ النّافِذَة — نَحْوَ عِشْرينَ مِتْراً سُقوطاً حُرّاً نَحْوَ خَنْدَقِ القَلْعَةِ في الأَسْفَل.",
    },
    {
      text: "وهُنا يَأْتي ما يَبْدو مُسْتَحيلاً لَكِنَّهُ حَقيقِيٌّ تَماماً: الثَّلاثَةُ نَجَوْا. الكاثوليك زَعَموا أنَّ العَذْراءَ أَرْسَلَتْ مَلائِكَةً التَقَطَتْهُم في الهَواء. البروتِسْتانت أَشاروا إلى تَفْسيرٍ أَقَلَّ قَداسَة: كَوْمَةُ سَمادٍ هائِلَة تَراكَمَتْ في قاعِ الخَنْدَقِ الجافّ. الحَقيقَةُ عَلى الأَرْجَحِ تَقَعُ في مَنْزِلَةٍ بَيْنَ السَّماءِ وَالسَّماد. لَكِنَّ أَحَداً لَمْ يَكُنْ يَضْحَكُ عَلى ما جاءَ بَعْدَها.",
    },
    {
      text: "لَحْظَةُ غَضَبٍ واحِدَة أَطْلَقَتْ سِلْسِلَةَ أَحْداثٍ لَمْ يَتَخَيَّلْها أَحَد. بوهِيمْيا اشْتَعَلَتْ بِالثَّوْرَة. ثُمَّ امْتَدَّ القِتالُ عَبْرَ الإمبراطورِيَّةِ الرّومانِيَّةِ المُقَدَّسَة — مِئاتُ الدُّوَيْلاتِ في وَسَطِ أوروبّا تَحْتَ مِظَلَّةِ آلِ هابْسبورغ. ما بَدَأَ نِزاعاً دينيّاً صارَ حَرْبَ الثَّلاثينَ عاماً — أَشَدَّ حُروبِ أوروبّا فَتْكاً حَتّى ذَلِكَ الحين. مُدُنٌ أُبيدَتْ عَنْ بِكْرَةِ أَبيها. مَناطِقُ بِأَكْمَلِها فَقَدَتْ نِصْفَ سُكّانِها. وبِحُلولِ 1648، كانَ ثَمانِيَةُ مَلايينِ إنْسانٍ قَدْ قَضَوْا.",
    },
    {
      text: "بْرَاغُ دَفَعَتِ الثَّمَنَ الأَفْدَح. بَعْدَ عامَيْنِ فَقَط مِنْ حادِثَةِ النّافِذَة، سُحِقَتِ القُوّاتُ التشيكِيَّةُ في مَعْرَكَةِ الجَبَلِ الأَبْيَضِ عَلى أَبْوابِ المَدينَة. أُعْدِمَ سَبْعَةٌ وَعِشْرونَ مِن قادَةِ البروتِسْتانت عَلَناً في ساحَةِ البَلْدَةِ القَديمَة. مُنِعَتِ اللُّغَةُ التشيكِيَّةُ مِنَ الاسْتِخْدامِ الرَّسْمي. وَضاعَ اسْتِقلالُ بوهِيمْيا لِثَلاثَةِ قُرونٍ كامِلَة — لَمْ يَعُدْ حَتّى وُلِدَتْ تشيكوسلوفاكيا عامَ 1918.",
    },
    {
      text: "كُلُّ هذا — حَرْبٌ أَغْرَقَتْ قارَّة، مَلايينُ القَتْلى، أُمَّةٌ مُحِيَتْ ثَلاثَةَ قُرون — لِأَنَّ ثَلاثَةَ رِجالٍ أُلْقوا مِنْ نافِذَة. يَقولونَ إنَّ القَشَّةَ تَقْصِمُ ظَهْرَ البَعير. في بْرَاغ لَمْ تَكُنْ قَشَّةً — كانَتْ نافِذَة. وما انْكَسَرَ لَمْ يَكُنْ ظَهْرَ بَعيرٍ — بَلْ قارَّةٌ بِأَكْمَلِها. تِلْكَ النّافِذَةُ لا تَزالُ هُناكَ في القَلْعَة. وإنْ وَقَفْتَ أَمامَها وَنَظَرْتَ إلى الأَسْفَل، سَتُدْرِكُ الدَّرْسَ: لَحْظَةُ تَحَدٍّ واحِدَة قَد تُشْعِلُ ناراً لا يُطْفِئُها أَحَد.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
//  PERSIAN — پنجره‌ای در پراگ
//  Proverb subverted: «هر که بامش بیش، برفش بیشتر»
//  → بامِ هابسبورگ‌ها از همه بلندتر بود — اما برفی که بر سرشان
//    ریخت، تمامِ اروپا را زیر خودش دفن کرد.
// ═══════════════════════════════════════════════════════════════════
const fa = {
  ...base,
  lang: "fa",
  langStoryId: "fa#defenestration-1618",
  title: "پنجره‌ای در پراگ",
  subtitle:
    "داستانِ سه مردی که از پنجره‌ی قلعه پرت شدند و جنگی سی‌ساله به راه انداختند",
  excerpt:
    "صبحِ بیست‌وسومِ مه ۱۶۱۸، گروهی از نجیب‌زادگانِ پروتستان با خشمی مهارنشدنی وارد قلعه‌ی پراگ شدند.",
  moralOrLesson:
    "یک لحظه سرپیچی می‌تواند پیامدهایی داشته باشد که از هر محاسبه‌ی انسانی فراتر می‌رود.",
  characters: [
    "ویلِم اسلاواتا",
    "یاروسلاو مارتینیچ",
    "فیلیپ فابریتسیوس",
    "کنت تورن",
    "نجیب‌زادگان پروتستان",
  ],
  era: "۲۳ مه ۱۶۱۸",
  paragraphs: [
    {
      text: "صبحِ بیست‌وسومِ مه ۱۶۱۸، گروهی از نجیب‌زادگانِ پروتستان با خشمی مهارنشدنی وارد قلعه‌ی پراگ شدند. خاندانِ هابسبورگ — قدرتمندترین خاندانِ سلطنتیِ اروپا — سال‌ها بود که آزادی‌های مذهبی‌شان را زیر پا می‌گذاشتند. فرمانروایانِ کاتولیک اختیارِ بوهِم را به دست گرفته بودند. «منشورِ پادشاهی» که حقوقِ پروتستان‌ها را تضمین می‌کرد؟ حکمش حکمِ کاغذ باطله بود. عریضه نوشتند، مذاکره کردند — هیچ‌کدام به جایی نرسید. پس به سنّتی قدیمی در سرزمینِ چِک رو آوردند: وقتی سیاست جواب نمی‌دهد، پنجره جواب می‌دهد.",
    },
    {
      text: "این اولین بار نبود. دویست سال پیش از آن، در ۱۴۱۹، پیروانِ مصلحِ دینی یان هوس مقاماتِ کاتولیک را از پنجره‌ی شهرداری پراگ به بیرون پرت کرده بودند و آتشِ جنگی پانزده‌ساله را روشن کرده بودند. حالا تاریخ داشت خودش را تکرار می‌کرد. نجیب‌زادگان دو فرماندارِ منصوبِ امپراتور — اسلاواتا و مارتینیچ — را در دفاترِ سلطنتی پیدا کردند، همراه با منشی‌شان فابریتسیوس. فریاد بلند شد، اتهامِ ظلم و استبداد بالا گرفت. و بعد دست‌ها به سوی فرمانداران دراز شد و آن‌ها را به سمتِ پنجره کشاند.",
    },
    {
      text: "اسلاواتا با تمامِ توان به چهارچوبِ پنجره چنگ زد و فریادکشان از حضرتِ مریم کمک خواست. مارتینیچ ساکت ماند — شاید از شدتِ وحشت خشکش زده بود. منشی سعی کرد خودش را قایم کند. اما یکی‌یکی هر سه‌تایشان را گرفتند و از پنجره به بیرون پرت کردند — حدودِ بیست متر سقوطِ آزاد، مستقیم به سمتِ خندقِ قلعه.",
    },
    {
      text: "و اینجاست که داستان شبیهِ افسانه می‌شود، ولی واقعیِ واقعی‌ست: هر سه نفر زنده ماندند. کاتولیک‌ها گفتند حضرتِ مریم فرشتگانی فرستاد تا وسطِ هوا نگهشان دارند. پروتستان‌ها به چیزِ خیلی کمتر آسمانی اشاره کردند — تلِّ عظیمی از کودِ حیوانی که تهِ خندقِ خشک جمع شده بود. حقیقت احتمالاً جایی بینِ آسمان و کود افتاده بود. ولی هیچ‌کس دیگر به بعدش نخندید.",
    },
    {
      text: "آن یک لحظه‌ی خشم، زنجیره‌ای از وقایع را به راه انداخت که هیچ‌کس پیش‌بینی‌اش نمی‌کرد. بوهِم شعله‌ور شد. بعد آتشِ جنگ به امپراتوریِ مقدسِ روم سرایت کرد — مجموعه‌ای از صدها دولت‌شهرِ کوچک در قلبِ اروپا که زیرِ چترِ هابسبورگ‌ها بودند. آنچه به‌عنوانِ درگیریِ مذهبی شروع شد، تبدیل شد به جنگِ سی‌ساله — خونبارترین جنگی که اروپا تا آن زمان به خود دیده بود. شهرها با خاک یکسان شدند. مناطقی نصفِ جمعیتشان را از دست دادند. تا سالِ ۱۶۴۸، حدودِ هشت میلیون نفر جان باخته بودند.",
    },
    {
      text: "پراگ از همه سنگین‌تر تاوان پس داد. فقط دو سال بعد از ماجرای پنجره، نیروهای چِک در نبردِ کوهِ سفید — درست بیرونِ دروازه‌های شهر — له شدند. بیست‌وهفت نفر از رهبرانِ پروتستان در میدانِ شهرِ قدیم در ملأِ عام اعدام شدند. زبانِ چکی از کاربردِ رسمی ممنوع شد. بوهِم استقلالش را از دست داد و تا سیصد سالِ بعد — تا زمانی که چکوسلواکی در ۱۹۱۸ متولد شد — پسش نگرفت.",
    },
    {
      text: "همه‌ی این‌ها — جنگی که یک قاره را بلعید، میلیون‌ها کشته، ملتی که سه قرن از صفحه‌ی روزگار محو شد — چون سه نفر از پنجره پرت شدند. می‌گویند هر که بامش بیش، برفش بیشتر. بامِ هابسبورگ‌ها از همه بلندتر بود — اما برفی که بر سرشان ریخت، تمامِ اروپا را زیرِ خودش دفن کرد. آن پنجره هنوز در قلعه‌ی پراگ هست. اگر جلویش بایستی و به پایین نگاه کنی، چیزی حس می‌کنی که تا مغزِ استخوانت نفوذ می‌کند: یک لحظه سرپیچی می‌تواند آتشی به پا کند که هیچ‌کس قدرتِ خاموش کردنش را ندارد.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
//  TURKISH — Prag'ın Penceresi
//  Proverb subverted: «Sabır taşı çatlar»
//  → Prag'da o taş çatlamadı — pencereden aşağı fırlatıldı.
//    Ve düşerken yanında bir kıtayı da sürükledi.
// ═══════════════════════════════════════════════════════════════════
const tr = {
  ...base,
  lang: "tr",
  langStoryId: "tr#defenestration-1618",
  title: "Prag'\u0131n Penceresi",
  subtitle:
    "\u00DC\u00e7 adam\u0131n pencereden at\u0131lmas\u0131yla ba\u015flayan ve sekiz milyon can alan sava\u015f\u0131n hik\u00e2yesi",
  excerpt:
    "23 May\u0131s 1618 sabah\u0131, bir grup Protestan asil, i\u00e7lerinde biriken \u00f6fkeyi art\u0131k tutamaz h\u00e2lde Prag Kalesi'ne dald\u0131.",
  moralOrLesson:
    "Tek bir isyan an\u0131, hi\u00e7bir insan\u0131n hesaplayamayaca\u011f\u0131 sonu\u00e7lar do\u011furabilir.",
  characters: [
    "Vilem Slavata",
    "Jaroslav Martinic",
    "Philipp Fabricius",
    "Kont Thurn",
    "Protestan asiller",
  ],
  era: "23 May\u0131s 1618",
  paragraphs: [
    {
      text: "23 May\u0131s 1618 sabah\u0131, bir grup Protestan asil, i\u00e7lerinde biriken \u00f6fkeyi art\u0131k tutamaz h\u00e2lde Prag Kalesi'ne dald\u0131. Avrupa'n\u0131n en g\u00fc\u00e7l\u00fc hanedan\u0131 olan Habsburglar, y\u0131llard\u0131r Bohemya'daki Protestanlar\u0131n din \u00f6zg\u00fcrl\u00fcklerini k\u0131s\u0131yordu. Katolik valiler \u00fclkenin ba\u015f\u0131na ge\u00e7mi\u015fti. Protestanlar\u0131n haklar\u0131n\u0131 g\u00fcvence alt\u0131na alan kraliyet ferman\u0131 m\u0131? \u00c7oktan \u00e7\u00f6pe at\u0131lm\u0131\u015ft\u0131. Dilek\u00e7e verdiler, m\u00fczakere ettiler \u2014 nafile. Sonunda asiller eski bir \u00c7ek gelene\u011fine ba\u015fvurdu: Siyaset \u00e7\u00f6z\u00fcm \u00fcretmiyorsa, pencere \u00fcretir.",
    },
    {
      text: "Bu ilk kez olan bir \u015fey de\u011fildi. Bundan iki y\u00fcz y\u0131l \u00f6nce, 1419'da, din reformcusu Jan Hus'un takip\u00e7ileri Katolik yetkilileri Prag belediye binas\u0131n\u0131n penceresinden a\u015fa\u011f\u0131 f\u0131rlatm\u0131\u015f ve on be\u015f y\u0131l s\u00fcrecek bir din sava\u015f\u0131n\u0131 ba\u015flatm\u0131\u015ft\u0131. \u015eimdi tarih tekerr\u00fcr ediyordu. Asiller, imparatorun atad\u0131\u011f\u0131 iki valiyi \u2014 Slavata ve Martinic'i \u2014 saray\u0131n resm\u00ee dairelerinde buldular. Yanlar\u0131nda sekreter Fabricius da vard\u0131. Ba\u011fr\u0131\u015fmalar y\u00fckseldi, tiranl\u0131k su\u00e7lamalar\u0131 havada u\u00e7u\u015ftu. Sonra eller valilere uzand\u0131 ve onlar\u0131 pencereye do\u011fru s\u00fcr\u00fckledi.",
    },
    {
      text: "Slavata pencere pervaz\u0131na var g\u00fcc\u00fcyle yap\u0131\u015ft\u0131, Meryem Ana'ya yalvararak \u00e7\u0131\u011fl\u0131k at\u0131yordu. Martinic sessizdi \u2014 belki de deh\u015fetten donup kalm\u0131\u015ft\u0131. Sekreter saklanmaya \u00e7al\u0131\u015ft\u0131. Ama teker teker \u00fc\u00e7\u00fc de yakaland\u0131 ve pencereden a\u015fa\u011f\u0131 f\u0131rlat\u0131ld\u0131 \u2014 yakla\u015f\u0131k yirmi metrelik bir d\u00fc\u015f\u00fc\u015f, do\u011fruca kalenin hende\u011fine.",
    },
    {
      text: "\u0130\u015fin uydurma gibi g\u00f6r\u00fcnen ama ger\u00e7ek olan k\u0131sm\u0131 \u015fu: \u00fc\u00e7\u00fc de sa\u011f kald\u0131. Katolikler, Meryem Ana'n\u0131n melekler g\u00f6nderip onlar\u0131 havada tuttu\u011funu iddia etti. Protestanlar daha az kutsal bir a\u00e7\u0131klama \u00f6ne s\u00fcrd\u00fc \u2014 kuru hende\u011fin dibinde biriken devasa bir g\u00fcbre y\u0131\u011f\u0131n\u0131. Ger\u00e7ek muhtemelen g\u00f6k ile g\u00fcbre aras\u0131nda bir yerdeydi. Ama kimse as\u0131l bundan sonra olacaklara g\u00fclm\u00fcyordu.",
    },
    {
      text: "O tek anl\u0131k \u00f6fke, kimsenin \u00f6ng\u00f6remeyece\u011fi bir zincirleme reaksiyonu tetikledi. \u00d6nce Bohemya ayakland\u0131. Sonra sava\u015f Kutsal Roma \u0130mparatorlu\u011fu'na \u2014 Avrupa'n\u0131n ortas\u0131nda, Habsburglar\u0131n g\u00f6lgesi alt\u0131ndaki y\u00fczlerce k\u00fc\u00e7\u00fck devletten olu\u015fan devasa bir yap\u0131ya \u2014 s\u0131\u00e7rad\u0131. Din kavgas\u0131 olarak ba\u015flayan \u015fey, Avrupa'n\u0131n o g\u00fcne dek g\u00f6rd\u00fc\u011f\u00fc en y\u0131k\u0131c\u0131 \u00e7at\u0131\u015fmaya, Otuz Y\u0131l Sava\u015flar\u0131'na d\u00f6n\u00fc\u015ft\u00fc. \u015eehirler yerle bir edildi. Baz\u0131 b\u00f6lgeler n\u00fcfusunun yar\u0131s\u0131n\u0131 kaybetti. 1648'e gelindi\u011finde yakla\u015f\u0131k sekiz milyon insan hayat\u0131n\u0131 yitirmi\u015fti.",
    },
    {
      text: "En a\u011f\u0131r bedeli Prag \u00f6dedi. Pencere olay\u0131ndan sadece iki y\u0131l sonra, \u00c7ek kuvvetleri \u015fehrin hemen d\u0131\u015f\u0131ndaki Beyaz Da\u011f Muharebesi'nde ezildi. Yirmi yedi Protestan lider Eski \u015eehir Meydan\u0131'nda halka a\u00e7\u0131k idam edildi. \u00c7ek\u00e7e resm\u00ee kullan\u0131mdan yasakland\u0131. Bohemya ba\u011f\u0131ms\u0131zl\u0131\u011f\u0131n\u0131 yitirdi ve tam \u00fc\u00e7 y\u00fcz y\u0131l boyunca geri alamad\u0131 \u2014 ta ki 1918'de \u00c7ekoslovakya kurulana dek.",
    },
    {
      text: "B\u00fct\u00fcn bunlar \u2014 bir k\u0131tay\u0131 saran sava\u015f, milyonlarca \u00f6l\u00fc, \u00fc\u00e7 y\u00fcz y\u0131l silinen bir ulus \u2014 \u00fc\u00e7 adam\u0131n bir pencereden at\u0131lmas\u0131yla ba\u015flad\u0131. Sab\u0131r ta\u015f\u0131 \u00e7atlar derler. Prag'da o ta\u015f \u00e7atlmad\u0131 \u2014 pencereden a\u015fa\u011f\u0131 f\u0131rlat\u0131ld\u0131. Ve d\u00fc\u015ferken yan\u0131nda bir k\u0131tay\u0131 da s\u00fcr\u00fckledi. O pencere h\u00e2l\u00e2 Prag Kalesi'nde duruyor. \u00d6n\u00fcnde durup a\u015fa\u011f\u0131 bakt\u0131\u011f\u0131nda insan\u0131n i\u00e7ini \u00fcrperten bir \u015fey hissediyorsun: tek bir isyan an\u0131n\u0131n, kimsenin durduramayaca\u011f\u0131 bir yang\u0131na d\u00f6n\u00fc\u015febilece\u011fini.",
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

  await docClient.send(
    new PutCommand({
      TableName: "Story",
      Item: item,
    })
  );
  console.log(`  \u2705 ${label} pushed successfully.`);
}

async function main() {
  console.log("\u2550".repeat(55));
  console.log("Defenestrations of Prague \u2014 ar / fa / tr push");
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
