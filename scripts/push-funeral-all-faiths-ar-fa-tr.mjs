import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English) ───
const base = {
  siteId: "mevlana-museum",
  storyId: "funeral-all-faiths",
  icon: "\u{1F91D}",
  tier: "A",
  readingTimeMinutes: 2,
  image: "",
  disabled: false,
  thumbnail: "",
  coordinates: { lng: 32.5047, lat: 37.8719 },
  hasAudio: false,
  isFree: true,
  storyCategory: "prophets_pilgrims",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════
//  ARABIC — يَومَ بَكَتْهُ كُلُّ الأَديان
//  Proverb subverted: الأرواحُ جنودٌ مُجنَّدة، ما تعارَفَ منها ائتَلَف
//  (Souls are conscripted soldiers; those that recognise each other unite)
// ═══════════════════════════════════════════════════════════════════
const ar = {
  ...base,
  lang: "ar",
  langStoryId: "ar#funeral-all-faiths",
  title: "يَومَ بَكَتْهُ كُلُّ الأَديان",
  subtitle: "حينَ مَشى المُسلِمونَ والمَسيحيّونَ واليَهودُ والمَجوسُ في جَنازةٍ واحِدة",
  excerpt: "في السابعَ عشرَ من ديسمبر سنة 1273، شَهِدَت قُونية مشهدًا لم تعرفه مدينةٌ من قبل: جنازة رجلٍ واحد بكاهُ العالمُ بأسرِه.",
  moralOrLesson: "الروحانيَّةُ الحقيقيَّة تتجاوزُ حدودَ الأديان. المحبَّةُ لغةٌ يفهمُها كلُّ قلب، مهما اختلفَ الطريق.",
  source: "رِوايات تاريخيَّة، أحمد الأفلاكي",
  characters: [
    "جَلالُ الدِّينِ الرُّومي",
    "المُعزُّون المُسلِمون",
    "المُعزُّون المَسيحيّون",
    "المُعزُّون اليَهود",
    "المُعزُّون المَجوس",
  ],
  era: "١٧ ديسمبر ١٢٧٣",
  paragraphs: [
    {
      text: "في السابعَ عشرَ من ديسمبر سنةَ 1273، خرجت قُونية عن بِكْرَة أبيها. لم يكن الموتُ غريبًا على مدينةٍ رأتِ الحروبَ والأوبئة، لكنَّ هذا الموتَ كان مختلفًا. جَلالُ الدِّينِ الرُّومي رحلَ، والخبرُ انتشرَ في الأزقَّة كأنَّه نارٌ في هشيم. الشوارعُ امتلأت بوجوهٍ لا تجتمعُ عادةً في مكانٍ واحد: مسلمون ومسيحيّون ويهودٌ ومجوس، كلُّهم يمشون معًا، كلُّهم يبكون.",
    },
    {
      text: "لم يكن المشهدُ عاديًّا حتى بمقاييس ذلك الزمان. مسلمون يتلون القرآنَ بصوتٍ خاشع، وإلى جانبهم مسيحيّون يُرتِّلون المزاميرَ بألحانهم، ويهودٌ يهمسون بصلواتِهم العِبريّة، ومجوسٌ يحملون رموزَهم ويمشون بصمتٍ مَهيب. كأنَّ المدينةَ قرَّرت أن تنسى لساعاتٍ أنَّ بين هؤلاءِ الناسِ حدودًا وأسوارًا. الكلُّ سارَ خلفَ نَعشٍ واحد.",
    },
    {
      text: "سألَ قسٌّ مسيحيٌّ عالِمًا مسلمًا في المَوكِب: \"لماذا تبكونه؟ أليسَ وَلِيًّا من أوليائكم أنتم؟\" فأجابه المسلم: \"بل هو رجلٌ أرانا أنَّ كلَّ الطُرُقِ تنتهي عندَ الحقيقة ذاتِها.\" وحينَ سُئلَ حاخامٌ يهوديّ السؤالَ نفسَه، قال ببساطة: \"علَّمنا أنَّ المحبَّةَ أكبرُ من أيِّ دين. كانَ مُعلِّمَنا نحنُ أيضًا.\"",
    },
    {
      text: "أمّا حينَ سألَ الناسُ غيرَ المسلمين مباشرةً — لماذا جئتم؟ — كان جوابُهم واحدًا لا يتغيَّر: \"كان شَمسَنا نحنُ أيضًا. تعلَّمنا منه عن كُتُبنا المُقدَّسة أكثرَ ممّا تعلَّمنا من رجالِ ديننا أنفسِهم. رأينا فيه علاماتِ نبيٍّ وصِفاتِ وَلِيّ.\" كلماتٌ لا يقولها إنسانٌ عن مُعلِّمٍ عابر، بل عمَّن غيَّرَ نظرتَه لنفسِه وللعالم.",
    },
    {
      text: "في المَوكِب سارَ حاملو الأعلامِ ومَباخِرُ البُخور وصناديقُ المَصاحِف، والجُثمانُ في كَفَنِه الأبيض على نَعشٍ مُزيَّن. لكن بجانبِ كلِّ ذلك، كانت هناك صُلبانٌ مسيحيَّة ترتفعُ بين الأيدي، وصلواتٌ يهوديَّة تُسمَعُ في الهواء، ورموزٌ مجوسيَّة تُحمَلُ بإجلال. في يومٍ واحد، في مدينةٍ واحدة، ذابتِ الحدودُ بين الأديان — لا بالسيفِ ولا بالدعوة، بل بالحبِّ وحدَه.",
    },
    {
      text: "يقولُ الحديثُ الشريف: \"الأرواحُ جنودٌ مُجنَّدة، ما تعارَفَ منها ائتَلَف.\" وفي ذلك اليوم، تعارفَت أرواحٌ لم يَجمَعها مسجدٌ ولا كنيسةٌ ولا كنيس — جمعَها رجلٌ واحد علَّمَهم أن ينظروا في المرآةِ ذاتِها فيَجِدوا الوجهَ ذاته.",
    },
    {
      text: "هذا هو جوهرُ ما عاشَه الرُّوميُّ وما ماتَ عليه. قال: \"نظرتُ بالعَينِ ذاتِها إلى المسلمِ واليهوديِّ والمسيحيّ.\" حبُّه لم يبقَ كلامًا في كتاب. صارَ جنازةً يمشي فيها العالمُ كلُّه — شاهدةً على أنَّ الرُّوحَ حينَ تَصدُق، لا تعرفُ حدودًا ولا أسوارًا ولا أسماء.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
//  PERSIAN — تشییعی که مرزها را برداشت
//  Proverb subverted: «دل به دل راه دارد»
//  (Heart has a path to heart)
// ═══════════════════════════════════════════════════════════════════
const fa = {
  ...base,
  lang: "fa",
  langStoryId: "fa#funeral-all-faiths",
  title: "تشییعی که مرزها را برداشت",
  subtitle: "وقتی مسلمان و مسیحی و یهودی و زرتشتی، شانه\u200Cبه\u200Cشانه مولانا را بدرقه کردند",
  excerpt: "هفدهم دسامبر ۱۲۷۳ — قونیه شاهد صحنه\u200Cای شد که هیچ شهری تا آن روز ندیده بود: تشییع مردی که همه\u200Cی ادیان او را از خودشان می\u200Cدانستند.",
  moralOrLesson: "عرفان راستین از مرز ادیان فراتر می\u200Cرود. عشق زبانی\u200Cست که هر دلی آن را می\u200Cفهمد، فرقی نمی\u200Cکند از کدام راه آمده باشد.",
  source: "روایات تاریخی، احمد افلاکی",
  characters: [
    "مولانا جلال\u200Cالدین",
    "عزاداران مسلمان",
    "عزاداران مسیحی",
    "عزاداران یهودی",
    "عزاداران زرتشتی",
  ],
  era: "۱۷ دسامبر ۱۲۷۳",
  paragraphs: [
    {
      text: "هفدهم دسامبر سال ۱۲۷۳ بود. قونیه چیزی دید که هیچ شهری در آناتولی ندیده بود. مولانا جلال\u200Cالدین از دنیا رفته بود و خبرش مثل آتش در شهر پیچید. خیابان\u200Cها پُر شد از آدم\u200Cهایی که در روزهای عادی هرگز کنار هم نمی\u200Cایستادند: مسلمانانی که قرآن می\u200Cخواندند، مسیحیانی که سرودهای مذهبی زمزمه می\u200Cکردند، یهودیانی که دعاهایشان را زیر لب می\u200Cگفتند، و زرتشتیانی که نمادهایشان را در دست داشتند. همه آمده بودند برای یک نفر.",
    },
    {
      text: "صحنه حتی برای آن روزگار هم عجیب بود. موکب تشییع مثل رودخانه\u200Cای بود که از همه جا سرچشمه گرفته بود: از مسجد و کلیسا و کنیسه و آتشکده. صدای قرائت قرآن با زمزمه\u200Cی سرودهای مسیحی قاطی شده بود. نیایش\u200Cهای عبری با سکوت مهیبِ زرتشتیان در هم آمیخته بود. انگار شهر تصمیم گرفته بود برای چند ساعت فراموش کند که بین این آدم\u200Cها دیواری هست.",
    },
    {
      text: "یک کشیش مسیحی در میان جمعیت از عالِمی مسلمان پرسید: \u00ABچرا اینجایید؟ او یکی از اولیای شما بود.\u00BB عالِم جواب داد: \u00ABاو مردی بود که به ما نشان داد همه راه\u200Cها به یک حقیقت ختم می\u200Cشوند.\u00BB از یک خاخام یهودی هم همین سؤال را پرسیدند. گفت: \u00ABبه ما یاد داد که عشق از هر دینی بزرگ\u200Cتر است. او استاد ما هم بود.\u00BB",
    },
    {
      text: "وقتی از عزاداران غیرمسلمان مستقیم پرسیدند چرا آمده\u200Cاید، همه یک جواب داشتند: \u00ABاو خورشیدِ ما هم بود. از کتاب\u200Cهای مقدس خودمان، از زبانِ او بیشتر فهمیدیم تا از روحانیون خودمان. در او نشانه\u200Cهای یک پیامبر و یک ولی دیدیم.\u00BB این حرف\u200Cها را آدم درباره\u200Cی یک آشنای معمولی نمی\u200Cزند — درباره\u200Cی کسی می\u200Cزند که زندگی\u200Cاش را زیر و رو کرده باشد.",
    },
    {
      text: "موکب تشییع باشکوه بود: پرچم\u200Cداران جلو می\u200Cرفتند، عودسوزها بخور می\u200Cدادند، صندوق\u200Cهای قرآن حمل می\u200Cشد، و پیکر مولانا در کفن سفید روی تابوتی آراسته قرار داشت. اما چیزی که هر ناظری را حیرت\u200Cزده می\u200Cکرد این بود: در همان موکب، صلیب\u200Cهای مسیحی بالا رفته بود، دعاهای یهودی شنیده می\u200Cشد، و نمادهای زرتشتی هم حضور داشتند. یک روز، یک شهر — و دیوار بین ادیان فرو ریخت. نه با شمشیر، نه با تبلیغ؛ فقط با عشق.",
    },
    {
      text: "ضرب\u200Cالمثلی هست که می\u200Cگوید \u00ABدل به دل راه دارد.\u00BB آن روز این حرف معنای تازه\u200Cای پیدا کرد: دلِ مسلمان و مسیحی و یهودی و زرتشتی، بدون اینکه خودشان بخواهند، همه راهشان را به یک نقطه پیدا کرده بودند — قلبِ مردی که هرگز کسی را بیگانه ندید.",
    },
    {
      text: "این جوهر تمام زندگی و مرگ مولانا بود. خودش گفته بود: \u00ABبه مسلمان و یهودی و مسیحی، با یک چشم نگاه کردم.\u00BB عشقش حرفِ کتاب نماند — تبدیل شد به تشییعی که تمام دنیا در آن قدم برداشت. گواهی زنده بر اینکه وقتی روح صادق باشد، نه مرز می\u200Cشناسد، نه زبان، نه اسم.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
//  TURKISH — Tüm Dinleri Birleştiren Cenaze
//  Proverb subverted: «Gel, ne olursan ol, yine gel» (Come, whoever you are, come again)
//  — Rumi's most famous saying in Turkish culture
// ═══════════════════════════════════════════════════════════════════
const tr = {
  ...base,
  lang: "tr",
  langStoryId: "tr#funeral-all-faiths",
  title: "T\u00FCm Dinleri Birle\u015Ftiren Cenaze",
  subtitle: "M\u00FCsl\u00FCman, Hristiyan, Yahudi ve Zerd\u00FC\u015Ftlerin birlikte y\u00FCr\u00FCd\u00FC\u011F\u00FC g\u00FCn",
  excerpt: "17 Aral\u0131k 1273 \u2014 Konya, tarihinin en s\u0131ra d\u0131\u015F\u0131 cenaze t\u00F6renine tan\u0131kl\u0131k etti. Bir adam \u00F6ld\u00FC; yas tutan ise b\u00FCt\u00FCn dinlerdi.",
  moralOrLesson: "Ger\u00E7ek maneviyat din s\u0131n\u0131rlar\u0131n\u0131 a\u015Far. Sevgi evrensel bir dildir; hangi yoldan gelirsen gel, ayn\u0131 kalbe ula\u015F\u0131r.",
  source: "Tarih\u00EE kaynaklari, Ahmed Efl\u00E2k\u00EE",
  characters: [
    "Mevlana Celaleddin-i Rumi",
    "M\u00FCsl\u00FCman yasl\u0131lar",
    "Hristiyan yasl\u0131lar",
    "Yahudi yasl\u0131lar",
    "Zerd\u00FC\u015Ft yasl\u0131lar",
  ],
  era: "17 Aral\u0131k 1273",
  paragraphs: [
    {
      text: "17 Aral\u0131k 1273. Konya o g\u00FCne dek b\u00F6yle bir manzara g\u00F6rmemi\u015Fti. Mevlana Celaleddin-i Rumi vefat etmi\u015Fti ve haber \u015Fehri bir anda ba\u015Ftan a\u015Fa\u011F\u0131 sarst\u0131. Sokaklar, normalde yan yana durmas\u0131 hayal bile edilemeyecek insanlarla dolup ta\u015Ft\u0131: Kur\u2019an okuyan M\u00FCsl\u00FCmanlar, ilahiler s\u00F6yleyen Hristiyanlar, dualar\u0131n\u0131 m\u0131r\u0131ldanan Yahudiler ve sembollerini ta\u015F\u0131yan Zerd\u00FC\u015Ftler. Hepsi tek bir adam i\u00E7in gelmi\u015Fti.",
    },
    {
      text: "Manzara o \u00E7a\u011F\u0131n \u00F6l\u00E7\u00FCleriyle bile s\u0131ra d\u0131\u015F\u0131yd\u0131. Cenaze alay\u0131, kayna\u011F\u0131n\u0131 her yerden alan bir nehre benziyordu: camiden, kiliseden, havradan, ate\u015Fgededen. Kur\u2019an tilavetinin yank\u0131lar\u0131 Hristiyan ilahileriyle i\u00E7 i\u00E7e ge\u00E7mi\u015Fti. \u0130branice dualar, Zerd\u00FC\u015Ftlerin vakur sessizli\u011Fiyle kayna\u015Fm\u0131\u015Ft\u0131. Sanki \u015Fehir birka\u00E7 saatli\u011Fine bu insanlar aras\u0131nda bir s\u0131n\u0131r oldu\u011Funu unutmaya karar vermi\u015Fti.",
    },
    {
      text: "Kortejde bir Hristiyan rahip, M\u00FCsl\u00FCman bir \u00E2lime sordu: \u201CSiz neden burada a\u011Fl\u0131yorsunuz? O sizin evliyan\u0131zd\u0131.\u201D \u00C2lim \u015F\u00F6yle cevap verdi: \u201CO, bize t\u00FCm yollar\u0131n ayn\u0131 ger\u00E7e\u011Fe \u00E7\u0131kt\u0131\u011F\u0131n\u0131 g\u00F6steren bir insand\u0131.\u201D Ayn\u0131 soru bir Yahudi hahama da soruldu. Haham dedi ki: \u201CBize sevginin her dinden b\u00FCy\u00FCk oldu\u011Funu \u00F6\u011Fretti. O bizim de hocam\u0131zd\u0131.\u201D",
    },
    {
      text: "M\u00FCsl\u00FCman olmayan yasl\u0131lara do\u011Frudan \u201CNeden geldiniz?\u201D diye soruldu\u011Funda hepsi ayn\u0131 \u015Feyi s\u00F6yledi: \u201CO bizim de g\u00FCne\u015Fimizdi. Kendi kutsal kitaplar\u0131m\u0131z\u0131, kendi din adamlar\u0131m\u0131zdan de\u011Fil ondan \u00F6\u011Frendik. Onda bir peygamberin ve bir velinin i\u015Faretlerini g\u00F6rd\u00FCk.\u201D Bu s\u00F6zler s\u0131radan bir tan\u0131d\u0131k i\u00E7in s\u00F6ylenmez \u2014 ancak hayat\u0131n\u0131z\u0131 de\u011Fi\u015Ftirmi\u015F biri i\u00E7in s\u00F6ylenir.",
    },
    {
      text: "Cenaze alay\u0131nda sancaklar, buhurdanl\u0131klar ve Kur\u2019an sand\u0131klar\u0131 ta\u015F\u0131n\u0131yordu. Mevlana\u2019n\u0131n naa\u015F\u0131 beyaz kefen i\u00E7inde s\u00FCsl\u00FC bir tabut \u00FCzerinde ilerliyordu. Ama as\u0131l \u015Fa\u015F\u0131rt\u0131c\u0131 olan, ayn\u0131 alayda Hristiyan ha\u00E7lar\u0131n\u0131n y\u00FCkseldi\u011Fini, Yahudi dualar\u0131n\u0131n duyuldu\u011Funu ve Zerd\u00FC\u015Ft sembollerinin sayg\u0131yla ta\u015F\u0131nd\u0131\u011F\u0131n\u0131 g\u00F6rmekti. Tek bir g\u00FCn, tek bir \u015Fehir \u2014 ve dinler aras\u0131ndaki t\u00FCm s\u0131n\u0131rlar eriyip gitti. K\u0131l\u0131\u00E7la de\u011Fil, zorla de\u011Fil; yaln\u0131zca sevgiyle.",
    },
    {
      text: "Mevlana \u201CGel, ne olursan ol, yine gel\u201D demi\u015Fti. \u0130\u015Fte o g\u00FCn herkes geldi. M\u00FCsl\u00FCman\u0131, Hristiyan\u0131, Yahudisi, Zerd\u00FC\u015Ft\u00FC \u2014 hepsi geldi. \u00C7\u00FCnk\u00FC o hayattayken kimseyi kap\u0131da b\u0131rakmam\u0131\u015Ft\u0131; \u00F6l\u00FCm\u00FCnde de kimse onu yaln\u0131z b\u0131rakmad\u0131. Bu bir tesad\u00FCf de\u011Fildi. Bu, bir \u00F6m\u00FCr boyunca ekilen sevginin hasad\u0131yd\u0131.",
    },
    {
      text: "Mevlana\u2019n\u0131n b\u00FCt\u00FCn hayat\u0131 tek bir c\u00FCmlede gizliydi: \u201CM\u00FCsl\u00FCmana, Yahudiye ve Hristiyana ayn\u0131 g\u00F6zle bakt\u0131m.\u201D Sevgisi kitap sayfalar\u0131nda kalmad\u0131 \u2014 b\u00FCt\u00FCn d\u00FCnyan\u0131n omuz omuza y\u00FCr\u00FCd\u00FC\u011F\u00FC bir cenaze alay\u0131na d\u00F6n\u00FC\u015Ft\u00FC. Ruhun s\u0131n\u0131r tan\u0131mad\u0131\u011F\u0131n\u0131n, inanc\u0131n dil bilmedi\u011Finin, sevginin isim sormad\u0131\u011F\u0131n\u0131n canl\u0131 bir kan\u0131t\u0131 olarak tarihe ge\u00E7ti.",
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
      console.warn(`  \u26A0 Paragraph ${i} is ${t.length} chars (target <500)`);
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
      console.error(`  \u274C ${label}: Record already exists! Skipping.`);
    } else {
      console.error(`  \u274C ${label} FAILED:`, err.message);
      throw err;
    }
  }
}

async function main() {
  console.log("\u2550".repeat(50));
  console.log("Funeral That United All Faiths \u2014 ar / fa / tr push");
  console.log(`Timestamp: ${now}`);
  console.log("\u2550".repeat(50));

  await pushStory(ar, "ARABIC");
  await pushStory(fa, "PERSIAN");
  await pushStory(tr, "TURKISH");

  console.log("\n\u2705 All three languages pushed successfully.");
}

main().catch((err) => {
  console.error("\n\uD83D\uDCA5 Fatal error:", err.message);
  process.exit(1);
});
