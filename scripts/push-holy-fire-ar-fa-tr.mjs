// Push Arabic, Persian, and Turkish recreations of "The Holy Fire"
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
  siteId: "jerusalem-old-city",
  storyId: "holy-fire-miracle",
  icon: "\u{1F525}",
  storyCategory: "prophets_pilgrims",
  tier: "S",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 5,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 31.7784, lng: 35.2296 },
  source:
    "Egeria, Itinerarium Egeriae (c. 385 CE); Bernard the Monk, Itinerarium (c. 870 CE); William of Tyre, Historia (12th century); Skarlakidis, Haris, Holy Fire: The Miracle of the Light of the Resurrection at the Tomb of Christ, 2011; Cohen, Raymond, Saving the Holy Sepulchre, 2008; Cust, L.G.A., The Status Quo in the Holy Places, 1929; Greek Orthodox Patriarchate of Jerusalem, church chronicles; Nusseibeh, Sari, Once Upon a Country, 2007",
  characters: [
    "Greek Orthodox Patriarch of Jerusalem",
    "Empress Helena (church founder)",
    "The Nusseibeh family (Muslim key-keepers since 637 CE)",
    "Tunom (Ottoman-era Muslim convert and martyr)",
    "Caliph Umar ibn al-Khattab",
    "Pilgrims across seventeen centuries",
  ],
  era: "4th century \u2013 present (annual ceremony since at least 385 CE)",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// ARABIC (ar)
// ═══════════════════════════════════════════════════════════════════════════════
// Register: Modern Standard Arabic — warm, gripping, oral storytelling.
// Think skilled podcast narrator or popular nonfiction.
// Proverb: «ما بعدَ الثالثةِ إلّا النّار» (After the third time, only fire)
// — Subverted: the "fire" here is the miracle, not punishment.
// ═══════════════════════════════════════════════════════════════════════════════

const ar = {
  ...shared,
  lang: "ar",
  langStoryId: "ar#holy-fire-miracle",

  title: "النّارُ المُقَدَّسَة",

  subtitle:
    "سبعةَ عشرَ قرنًا والنّارُ تعودُ إلى القبر — ولا أحدَ يعرفُ كيف",

  excerpt:
    "عشيّةَ سبتِ النّور، تُطفَأُ كلُّ شمعةٍ في كنيسةِ القيامة بالقدس. كلُّ قنديل، كلُّ فتيلة — تموت. عشرةُ آلافِ حاجٍّ يقفون في ظلامٍ كظلامِ القبر، وفي يدِ كلِّ واحدٍ منهم ثلاثٌ وثلاثون شمعةً مُطفَأة — بعددِ سنواتِ المسيح على الأرض. ينتظرون كما ينتظرُ كلُّ من عرفَ الفقد: لا يملكون سوى ذِكرى النّور، وإيمانٍ عنيدٍ بأنّه سيعود.",

  moralOrLesson:
    "سواءٌ كانت مُعجزةً أو لُغزًا، فالنّارُ المُقدّسة تُجيبُ عن شيءٍ أعمقَ من الدليل. منذُ سبعةَ عشرَ قرنًا، يعودُ الناسُ إلى القبرِ ذاتِه لأنّهم يحملون يقينًا قديمًا: الظلامُ ليسَ الكلمةَ الأخيرة. النّورُ يعود — إن كنّا مستعدّين أن نقفَ معًا في العتمةِ حتّى يصل.",

  paragraphs: [
    {
      text: "عشيّةَ سبتِ النّور، تُطفَأُ كلُّ شمعةٍ في كنيسةِ القيامة بالقدس. كلُّ قنديل، كلُّ فتيلة — تموت. عشرةُ آلافِ حاجٍّ يقفون في ظلامٍ كظلامِ القبر، وفي يدِ كلِّ واحدٍ منهم ثلاثٌ وثلاثون شمعةً مُطفَأة — بعددِ سنواتِ المسيح على الأرض. جاؤوا من أثينا وموسكو، من أديس أبابا وتبليسي. ينتظرون كما ينتظرُ كلُّ من عرفَ الفقد: لا يملكون سوى ذِكرى النّور، وإيمانٍ عنيدٍ بأنّه سيعود.",
    },
    {
      text: "يدخلُ البطريركُ إلى البناءِ الرُّخاميِّ الصغير فوقَ القبر — المكانِ الذي دُفِنَ فيه المسيح، والذي يؤمنُ المسيحيّون أنّه قامَ منه. فُتِّشَ أمامَ الجميع: لا عودَ ثِقاب، لا قدّاحة، لا مصدرَ نارٍ أرضيّ. يُغلَقُ الباب. يسكتُ كلُّ شيء. ثمّ يرتجفُ ضوءٌ خلفَ النوافذِ البيضاويّة. يخرجُ البطريرك حاملًا مِشعَلَين مُتَّقِدَين، وتنفجرُ الكنيسة. تقفزُ النارُ من فتيلةٍ إلى فتيلة، من يدٍ إلى يد، حتّى تبتلعَ عشرةُ آلافِ شعلةٍ الظلامَ بأكمله.",
    },
    {
      text: "يتكرّرُ هذا منذُ سبعةَ عشرَ قرنًا. كتبَت عنه الرحّالةُ الرومانيّة إيجيريا نحوَ عام 385 ميلاديّ. وقبلها بعقود، عثرَت هيلانة — أمُّ الإمبراطور قُسطنطين — على موقعِ الصَّلب تحتَ معبدٍ رومانيّ، فبنى قسطنطين كنيسةً فوقَ القبر. هُدِمَت تلك الكنيسة وأُعيدَ بناؤها — على يدِ الفُرس، ثمّ الفاطميّين، ثمّ الزلازل، ثمّ الزمنِ نفسه. لكن في كلِّ سبتِ نور، عادتِ النار. الحجرُ يُكسَر. لكنّ الطقسَ يبقى بعدَ الحجر.",
    },
    {
      text: "في عام 1579، حصلَ الأرمنُ على إذنٍ عثمانيٍّ بقيادةِ الاحتفال، وأُغلِقَ البابُ في وجهِ البطريركِ اليونانيّ. وقفَ يُصلّي عندَ عمودٍ رخاميٍّ بجانبِ المدخل. في الداخل، انتظرَ الأرمن. لم تأتِ النار. لكن في الخارج — انشقَّ العمودُ بصوتٍ كالرعد، وانفجرَت منه شعلةٌ أمامَ البطريركِ المَنفيّ. ذلك الشَّقُّ ما زالَ هناكَ اليوم، أسودَ محترقًا، يراهُ كلُّ من يدخل. يقولون «ما بعدَ الثالثةِ إلّا النّار» — وفي تلك الليلة، جاءتِ النارُ لِمَن صَبَرَ خارجَ الباب.",
    },
    {
      text: "من شهودِ تلك الليلة ضابطٌ عثمانيٌّ اسمُهُ طُنُم. حين رأى النارَ تنفجرُ من حجر، أعلنَ إيمانَهُ بالمسيح في الحال. فقُبِضَ عليه وأُحرِقَ حيًّا لأنّهُ تركَ دينَه — التهمَتهُ نارُ البشرِ لأنّه آمنَ بنارِ السماء. تُكرِمُهُ الكنيسةُ شهيدًا إلى اليوم. أمّا العثمانيّون، فأعادوا حقَّ القيادةِ إلى اليونانيّين، ولم يَجرُؤ أحدٌ على تحدّي ذلك الحقِّ منذُ أربعةِ قرونٍ ونصف.",
    },
    {
      text: "الكنيسةُ نفسُها حكايةٌ عن الطبيعةِ البشريّة. ستُّ طوائفَ تتقاسمُها بقواعدَ صارمةٍ لدرجةِ أنّ تحريكَ كرسيٍّ قد يُشعِلُ عِراكًا بين الرهبان. سُلَّمٌ خشبيٌّ يتّكئُ على الواجهةِ منذُ عام 1728 — لم يتحرّك، لأنّ لا أحدَ يملكُ صلاحيّةَ تغييرِ أيِّ شيء. ومفتاحُ البابِ الرئيسيّ؟ بيدِ عائلتَين مسلمتَين منذُ عام 637، لأنّ المسيحيّين لم يثقوا ببعضِهم. فقط في القدسِ يمكنُ لترتيبٍ كهذا أن يصمد: عبثيٌّ وجميلٌ وقائمٌ حتّى الآن.",
    },
    {
      text: "اليوم، تحملُ طائراتٌ مُستأجَرة الشعلةَ من القدسِ إلى أثينا وموسكو وبوخارست وأديس أبابا في ساعات. عمّالُ المطاراتِ يستقبلونها بالهتاف. رؤساءُ دولٍ ينتظرونها على المدرج. نارٌ أُشعِلَت في قبرٍ حجريٍّ بعدَ ظهرِ السبت تصلُ أربعَ قارّاتٍ صباحَ الأحد. حُجّاجٌ يمرّرون أيديَهم فوقها ويُقسِمون أنّها لا تَحرِق. مشكّكون يهزّون رؤوسَهم. لكنّ الجميعَ يعودُ كلَّ عامٍ ليقفَ معَ الآخرين في الظلام — لأنّ هذا ما فعلَهُ البشرُ دائمًا.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// PERSIAN / FARSI (fa)
// ═══════════════════════════════════════════════════════════════════════════════
// Register: Modern Persian prose — intimate, flowing, a gifted storyteller
// at a late-night gathering. Avoids heavy Arabic loanwords.
// Proverb: «هر شبی را سحری هست» (Every night has a dawn)
// — Subverted: In Jerusalem, dawn doesn't come from the sky — it comes
//   from inside the stone.
// ═══════════════════════════════════════════════════════════════════════════════

const fa = {
  ...shared,
  lang: "fa",
  langStoryId: "fa#holy-fire-miracle",

  title: "آتش مقدّس",

  subtitle:
    "هفده قرن، یک قبر سنگی، و شعله\u200Cای که هیچ\u200Cکس نتوانسته توضیحش بدهد",

  excerpt:
    "شبِ پیش از عید پاک، آخرین شعله در کلیسای قیامتِ قدس خاموش می\u200Cشود. هر چراغ، هر شمع — می\u200Cمیرد. ده\u200Cهزار زائر در آن سیاهی ایستاده\u200Cاند و هرکدام سی\u200Cوسه شمع خاموش در دست دارند — به شمار سال\u200Cهای مسیح روی زمین. منتظرند؛ مثل هرکس که نوری را از دست داده: با هیچ\u200Cچیز جز خاطره\u200Cی روشنایی، و ایمانی سرسخت به اینکه برمی\u200Cگردد.",

  moralOrLesson:
    "چه معجزه باشد چه رمز، آتش مقدّس پاسخِ چیزی عمیق\u200Cتر از اثبات است. هفده قرن است مردم به همان قبر سنگی برمی\u200Cگردند چون یقینی کهن با خودشان حمل می\u200Cکنند: تاریکی حرف آخر نیست. نور برمی\u200Cگردد — اگر حاضر باشیم کنار هم در تاریکی بایستیم تا برسد.",

  paragraphs: [
    {
      text: "شبِ پیش از عید پاک، آخرین شعله در کلیسای قیامتِ قدس خاموش می\u200Cشود. هر چراغ، هر شمع — می\u200Cمیرد. کلیسا تاریک می\u200Cشود مثل قبری که درش را بسته باشند. ده\u200Cهزار زائر در آن سیاهی ایستاده\u200Cاند و هرکدام سی\u200Cوسه شمع خاموش در دست دارند — به شمار سال\u200Cهای مسیح روی زمین. از آتن و مسکو آمده\u200Cاند، از آدیس\u200Cآبابا و تفلیس. منتظرند؛ مثل هرکس که نوری را از دست داده: با هیچ\u200Cچیز جز خاطره\u200Cی روشنایی، و ایمانی سرسخت به اینکه برمی\u200Cگردد.",
    },
    {
      text: "اسقف اعظم ارتدکس وارد بنای مرمرین کوچکی بالای قبر می\u200Cشود — جایی که مسیح در آن دفن شد و به باور مؤمنان از آن برخاست. پیش چشم همه بازرسی\u200Cاش کرده\u200Cاند: نه کبریت، نه فندک، نه هیچ منبع آتش زمینی. در بسته می\u200Cشود. سکوت می\u200Cافتد. بعد نوری پشت پنجره\u200Cهای بیضی\u200Cشکل قبر می\u200Cلرزد. اسقف بیرون می\u200Cآید با دو مشعل روشن، و کلیسا منفجر می\u200Cشود. آتش از فتیله به فتیله می\u200Cپرد، از دست به دست، تا ده\u200Cهزار شعله تاریکی را یکجا ببلعند.",
    },
    {
      text: "این ماجرا هفده قرن است تکرار می\u200Cشود. جهانگردی رومی به نام اِگِریا حدود سال ۳۸۵ میلادی درباره\u200Cاش نوشت. پیش از او، هِلِنا — مادر امپراتور کنستانتین — محل مصلوب\u200Cشدن را زیر معبدی رومی پیدا کرد و کنستانتین بالای قبر کلیسا ساخت. آن کلیسا ویران شد و دوباره ساخته شد — به دست ایرانیان ساسانی، به دست خلیفه\u200Cی فاطمی، به دست زلزله، به دست خودِ زمان. اما هر سال، شنبه\u200Cی مقدّس، آتش برگشت. سنگ شکست. مراسم از سنگ بادوام\u200Cتر بود.",
    },
    {
      text: "سال ۱۵۷۹، ارمنی\u200Cها از عثمانی\u200Cها اجازه گرفتند مراسم را اداره کنند و در را به روی اسقف یونانی بستند. او جلوی ستونی مرمرین کنار ورودی ایستاد و دعا کرد. داخل کلیسا، ارمنی\u200Cها منتظر ماندند. آتش نیامد. اما بیرون — ستون با صدایی مثل رعد شکافت و شعله از دل سنگ بیرون زد، درست جلوی اسقف تبعیدشده. آن شکاف هنوز آنجاست، سیاه\u200Cسوخته، جلوی چشم هرکس که وارد شود. می\u200Cگویند هر شبی را سحری هست — اما در اورشلیم، سحر از آسمان نمی\u200Cآید؛ از دلِ سنگ می\u200Cآید.",
    },
    {
      text: "یکی از شاهدان آن شب افسری عثمانی به نام طُنُم بود. وقتی دید آتش از سنگ بیرون می\u200Cزند، همان\u200Cجا ایمانش را به مسیح اعلام کرد. گرفتندش و زنده\u200Cزنده سوزاندند چون دینش را عوض کرده بود — آتش زمینی\u200Cاش بلعید چون به آتش آسمانی ایمان آورده بود. کلیسا هنوز او را شهید می\u200Cداند. عثمانی\u200Cها هم تکان خوردند و حق اداره\u200Cی مراسم را به یونانی\u200Cها پس دادند — حقّی که چهار قرن و نیم است کسی جرأت نکرده زیر سؤال ببرد.",
    },
    {
      text: "خودِ کلیسا داستانی است درباره\u200Cی سرشت آدمی. شش فرقه\u200Cی مسیحی آن را با قوانینی آن\u200Cقدر دقیق تقسیم کرده\u200Cاند که جابه\u200Cجا کردن یک صندلی می\u200Cتواند کتک\u200Cکاری راه بیندازد. نردبانی چوبی از سال ۱۷۲۸ به نمای کلیسا تکیه داده — و جابه\u200Cجا نشده، چون هیچ\u200Cکس اختیار تغییر هیچ\u200Cچیز را ندارد. و کلید درِ اصلی؟ از سال ۶۳۷ میلادی دست دو خانواده\u200Cی مسلمان است، چون مسیحی\u200Cها نتوانستند به هم اعتماد کنند. فقط در قدس چنین ترتیبی ممکن است: پوچ، زیبا، و هنوز سرپا.",
    },
    {
      text: "امروز هواپیماهای اختصاصی شعله را ظرف چند ساعت از قدس به آتن و مسکو و بخارست و آدیس\u200Cآبابا می\u200Cبرند. کارکنان فرودگاه با هلهله استقبالش می\u200Cکنند. رئیس\u200Cجمهورها روی باند فرودگاه منتظرش می\u200Cمانند. آتشی که بعدازظهر شنبه در قبری سنگی روشن شده، صبح یکشنبه به چهار قاره می\u200Cرسد. زائرها دستشان را از رویش رد می\u200Cکنند و قسم می\u200Cخورند نمی\u200Cسوزاند. شکّاک\u200Cها سر تکان می\u200Cدهند. ولی همه\u200Cشان هر سال برمی\u200Cگردند تا کنار هم در تاریکی بایستند — چون آدم\u200Cها همیشه همین کار را کرده\u200Cاند.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// TURKISH (tr)
// ═══════════════════════════════════════════════════════════════════════════════
// Register: Modern Turkish — grounded, visceral, a storyteller who trusts
// the listener's intelligence. Like a polished tarihî belgesel narrator.
// Proverb: «Sabrın sonu selamettir» (The end of patience is salvation)
// — Subverted: that night, salvation came to the one waiting outside the door.
// ═══════════════════════════════════════════════════════════════════════════════

const tr = {
  ...shared,
  lang: "tr",
  langStoryId: "tr#holy-fire-miracle",

  title: "Kutsal Ate\u015F",

  subtitle:
    "On yedi y\u00FCzy\u0131ld\u0131r Mesih\u2019in mezar\u0131ndan bir alev beliriyor \u2014 ve kimse nedenini a\u00E7\u0131klayamad\u0131",

  excerpt:
    "Paskalya arifesinde, Kud\u00FCs\u2019teki Kutsal Kabir Kilisesi\u2019ndeki son alev de s\u00F6nd\u00FCr\u00FCl\u00FCr. Her kandil, her mum \u2014 \u00F6l\u00FCr. On bin hac\u0131 zifiri karanl\u0131kta ayakta durur; her birinin elinde otuz \u00FC\u00E7 s\u00F6n\u00FCk mum \u2014 Mesih\u2019in yery\u00FCz\u00FCnde ya\u015Fad\u0131\u011F\u0131 her y\u0131l i\u00E7in bir tane. I\u015F\u0131\u011F\u0131 kaybetmi\u015F herkesin bekledi\u011Fi gibi beklerler: ellerinde yaln\u0131zca ayd\u0131nl\u0131\u011F\u0131n hat\u0131ras\u0131 ve onun geri d\u00F6nece\u011Fine dair inat\u00E7\u0131 bir inan\u00E7.",

  moralOrLesson:
    "\u0130ster mucize olsun ister s\u0131r, Kutsal Ate\u015F kan\u0131ttan daha derin bir \u015Feye cevap veriyor. On yedi y\u00FCzy\u0131ld\u0131r insanlar ayn\u0131 ta\u015F mezara d\u00F6n\u00FCyor, \u00E7\u00FCnk\u00FC kadim bir bilgiyi ta\u015F\u0131yorlar: karanl\u0131k son s\u00F6z de\u011Fildir. I\u015F\u0131k geri d\u00F6ner \u2014 e\u011Fer ona ula\u015Fana kadar birlikte karanl\u0131kta durmaya raz\u0131ysak.",

  paragraphs: [
    {
      text: "Paskalya arifesinde, Kud\u00FCs\u2019teki Kutsal Kabir Kilisesi\u2019ndeki son alev de s\u00F6nd\u00FCr\u00FCl\u00FCr. Her kandil, her mum \u2014 \u00F6l\u00FCr. Kilise, kapa\u011F\u0131 kapat\u0131lm\u0131\u015F bir mezar gibi karanl\u0131\u011Fa g\u00F6m\u00FCl\u00FCr. On bin hac\u0131 o zifiri karanl\u0131kta ayakta durur; her birinin elinde otuz \u00FC\u00E7 s\u00F6n\u00FCk mum \u2014 Mesih\u2019in yery\u00FCz\u00FCnde ya\u015Fad\u0131\u011F\u0131 her y\u0131l i\u00E7in bir tane. Atina\u2019dan ve Moskova\u2019dan, Addis Ababa\u2019dan ve Tiflis\u2019ten gelmi\u015Flerdir. I\u015F\u0131\u011F\u0131 kaybetmi\u015F herkesin bekledi\u011Fi gibi beklerler: ellerinde yaln\u0131zca ayd\u0131nl\u0131\u011F\u0131n hat\u0131ras\u0131 ve onun geri d\u00F6nece\u011Fine dair inat\u00E7\u0131 bir inan\u00E7.",
    },
    {
      text: "Rum Ortodoks Patriği küçük mermer yapıya girer \u2014 Mesih\u2019in gömüldüğü ve inananların inancına göre dirildiği mezarın üzerine kurulmuş bina. Herkesin gözü önünde aranmıştır: kibrit yok, çakmak yok, dünyevi hiçbir ateş kaynağı yok. Kapı mühürlenir. Sessizlik çöker. Sonra mezarın oval pencerelerinin ardında bir ışık titrer. Patrik, elinde yanan iki meşaleyle dışarı çıkar ve kilise patlar. Ateş fitilden fitile, elden ele sıçrar; on bin alev karanlığı bir anda yutar.",
    },
    {
      text: "Bu on yedi yüzyıldır tekrarlanıyor. Romalı bir gezgin olan Egeria, 385 yılı civarında bunu yazdı. Ondan on yıllar önce, İmparator Konstantin\u2019in annesi Helena çarmıha gerilme yerini bir Roma tapınağının altında bulmuş ve Konstantin mezarın üzerine bir bazilika yaptırmıştı. O kilise yıkıldı ve yeniden yapıldı \u2014 Pers istilacıları tarafından, bir Fatımi halifesi tarafından, depremler tarafından, zamanın kendisi tarafından. Ama her Büyük Cumartesi, ateş geri döndü. Taş kırılabilir. Ritüel taştan daha dayanıklıdır.",
    },
    {
      text: "1579\u2019da Ermeniler, töreni yönetme iznini Osmanlı\u2019dan aldı ve Rum Patriği dışarıda bırakıldı. Girişin yanındaki mermer bir sütunun önünde durdu ve dua etti. İçeride Ermeniler bekledi. Ateş gelmedi. Ama dışarıda \u2014 sütun gök gürültüsü gibi bir sesle yarıldı ve çatlaktan bir alev fışkırdı, tam sürgündeki patriğin önünde. O çatlak bugün hâlâ orada; yanık izi simsiyah, giren herkesin görebileceği yerde. Derler ki sabrın sonu selamettir \u2014 o gece selamet, kapının dışında bekleyene geldi.",
    },
    {
      text: "O gecenin tanıklarından biri Tunom adında bir Osmanlı subayıydı. Ateşin taştan fışkırdığını görünce, oracıkta Mesih\u2019e olan inancını ilan etti. Yakalandı ve dininden döndüğü için diri diri yakıldı \u2014 göksel bir ateşe inandığı için dünyevi bir ateşle tüketildi. Kilise onu bugün hâlâ şehit olarak anar. Osmanlılar sarsıldı ve töreni yönetme hakkını Rumlara geri verdi. O hak dört buçuk yüzyıldır sorgulanmadı.",
    },
    {
      text: "Kilisenin kendisi insan doğasının bir özeti gibidir. Altı mezhep onu o kadar ayrıntılı kurallarla paylaşır ki, bir sandalyenin yerini değiştirmek keşişler arasında yumruk yumruğa kavgaya yol açabilir. 1728\u2019den beri cephede duran tahta bir merdiven var \u2014 yerinden kıpırdamamış, çünkü hiç kimsenin herhangi bir şeyi değiştirme yetkisi yok. Peki ana kapının anahtarı? 637 yılından beri iki Müslüman ailenin elinde, çünkü Hristiyanlar birbirlerine güvenemedi. Ancak Kudüs\u2019te böyle bir düzen var olabilir: saçma, güzel ve hâlâ ayakta.",
    },
    {
      text: "Bugün kiralık uçaklar alevi birkaç saat içinde Kudüs\u2019ten Atina\u2019ya, Moskova\u2019ya, Bükreş\u2019e, Addis Ababa\u2019ya taşıyor. Havalimanı çalışanları onu alkışlarla karşılıyor. Cumhurbaşkanları pistte bekliyor. Cumartesi öğleden sonra taştan bir mezarda yakılan ateş, Pazar sabahı dört kıtaya ulaşıyor. Hacılar ellerini alevin üzerinden geçirip yakmadığına yemin ediyor. Şüpheciler başlarını sallıyor. Ama hepsi her yıl geri dönüp karanlıkta yan yana duruyor \u2014 çünkü insanoğlu hep böyle yapmıştır.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// PUSH TO DYNAMODB
// ═══════════════════════════════════════════════════════════════════════════════

async function pushStory(record) {
  const label = `${record.lang}#${record.storyId}`;
  console.log(`\n\u23F3 Pushing ${label} ...`);

  // JSON round-trip validation
  const json = JSON.stringify(record);
  const parsed = JSON.parse(json);
  if (parsed.paragraphs.length !== record.paragraphs.length) {
    throw new Error(`JSON round-trip mismatch for ${label}`);
  }

  // Validate paragraph constraints
  let totalChars = 0;
  for (let i = 0; i < record.paragraphs.length; i++) {
    const chars = record.paragraphs[i].text.length;
    totalChars += chars;
    if (chars > 600) {
      console.warn(
        `\u26A0\uFE0F  ${label} paragraph ${i + 1}: ${chars} chars (over 600)`
      );
    }
  }
  console.log(
    `\uD83D\uDCCA ${label}: ${record.paragraphs.length} paragraphs, ${totalChars} total chars`
  );

  try {
    await doc.send(
      new PutCommand({
        TableName: TABLE,
        Item: record,
        ConditionExpression: "attribute_not_exists(langStoryId)",
      })
    );
    console.log(`\u2705 ${label} pushed successfully (new record).`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(
        `\u26A0\uFE0F  ${label} already exists. Overwriting with updated version...`
      );
      await doc.send(new PutCommand({ TableName: TABLE, Item: record }));
      console.log(`\u2705 ${label} overwritten successfully.`);
    } else {
      console.error(`\u274C Failed to push ${label}:`, err.message);
      throw err;
    }
  }
}

async function main() {
  console.log("\u2550\u2550\u2550 Pushing Holy Fire story translations to DynamoDB \u2550\u2550\u2550");
  console.log(`Table: ${TABLE}`);
  console.log(`Timestamp: ${now}`);

  // Push sequentially — confirm each before proceeding
  await pushStory(ar);
  await pushStory(fa);
  await pushStory(tr);

  console.log(
    "\n\u2550\u2550\u2550 All three translations pushed successfully \u2550\u2550\u2550"
  );
}

main().catch((err) => {
  console.error("\n\uD83D\uDCA5 Fatal error:", err);
  process.exit(1);
});
