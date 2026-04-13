import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const TIMESTAMP = Math.floor(Date.now() / 1000).toString();

// Shared fields (unchanged from English)
const shared = {
  siteId: { S: "wawel-castle" },
  storyId: { S: "smok-wawelski" },
  icon: { S: "🐉" },
  tier: { S: "A" },
  source: {
    S: "Wincenty Kadłubek, Chronica seu originale regum et principum Poloniae (c. 1200); Polish oral tradition",
  },
  readingTimeMinutes: { N: "4" },
  image: { S: "" },
  disabled: { BOOL: false },
  thumbnail: { S: "" },
  coordinates: { M: { lng: { N: "19.9345" }, lat: { N: "50.0535" } } },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "gods_monsters" },
  updatedAt: { N: TIMESTAMP },
};

function makeParagraphs(texts) {
  return { L: texts.map((t) => ({ M: { text: { S: t } } })) };
}

// ──────────────────────────────────────────────
// ARABIC (ar)
// ──────────────────────────────────────────────
const arabic = {
  ...shared,
  lang: { S: "ar" },
  langStoryId: { S: "ar#smok-wawelski" },

  title: { S: "تِنِّينُ فافِل" },

  subtitle: {
    S: "الوحشُ الذي أرعَبَ كراكوف والإسكافيُّ الذي هَزَمَهُ بحيلة",
  },

  excerpt: {
    S: "قبل أن تصير كراكوف عاصمة، وقبل أن يُبنى أوّل جدار في قلعة فافِل، كان في كهفٍ تحت التلّة وحشٌ لا يُشبه شيئاً عرفه البشر. البولنديون أسمَوه سموك فافِلسكي — تنّين فافِل.",
  },

  characters: {
    L: [
      { S: "تنّين فافِل (سموك فافِلسكي)" },
      { S: "سكوبا، صبيّ الإسكافيّ" },
      { S: "الملك كراكوس" },
      { S: "الأميرة" },
    ],
  },

  era: { S: "ما قبل التاريخ الأسطوري لكراكوف" },

  paragraphs: makeParagraphs([
    "قبل أن تصير كراكوف عاصمة، وقبل أن يُبنى أوّل جدار في قلعة فافِل، كان في كهفٍ تحت التلّة وحشٌ لا يُشبه شيئاً عرفه البشر. تنّين بحَراشِف أصلب من الحديد، وفكَّين يبتلعان حصاناً كاملاً، ونَفَسٍ يُحيل القرى رماداً. أوّل ما ظهر، أكل الماشية — بقراً وغنماً وكلّ ما تطاله مخالبه. ولمّا نفدت الحيوانات، طلب ما هو أفظع: فتيات يُتركن عند باب الكهف كقرابين لوحشٍ لا يعرف سوى الجوع.",

    "الملك كراكوس — الذي يقول البولنديون إنه أسّس المدينة وأعطاها اسمه — ضاقت به السُّبُل. كلّ أسبوع، تُقاد فتاةٌ إلى الكهف عند الغروب. وفي الصباح، لا يبقى إلا أرضٌ محروقة وصمتٌ ثقيل. فأعلن: من يقتل التنّين فله نصف المملكة ويد ابنتي. جاء الفرسان من كلّ مكان — ألمان وفرنسيون ومجريّون — دخلوا الكهف واحداً تلو الآخر بأفضل ما عندهم من سلاح. لم يخرج منهم أحد.",

    "وهنا تقدّم شابّ اسمه سكوبا. لم يكن فارساً ولا محارباً — كان صبيّاً عند إسكافيّ، يخيط الأحذية لكسب عيشه. وخطّته بدت سخيفة: طلب من الملك خروفاً ميتاً وكومة كِبريت وخيطاً متيناً. القصر كلّه ضحك. إسكافيّ ضدّ تنّين؟ لكنّ كراكوس كان قد شاهد أبطال أوروبا يدخلون الكهف ولا يعودون، فقال: ما الذي سنخسره؟ دعوه يجرّب.",

    "عمل سكوبا طوال الليل. فرّغ الخروف من أحشائه، حشاه بالكِبريت حتى آخره، ثم خاطه بإبرة الإسكافيّ وخيطه المتين — غُرَزٌ مُحكمة حتى تحسب أنّ الخروف لم يُمَسّ. قبل الفجر بقليل، وضع الخروف أمام باب الكهف. ثم تراجع... وانتظر.",

    "خرج التنّين مع أوّل ضوء. رأسه يتأرجح ومِنخراه مفتوحان. شمّ الخروف، التقطه بلقمة واحدة، وابتلعه كاملاً. لحظة صمت — ثم اشتعل الكِبريت في جوف الوحش. أطلق التنّين زئيراً هزّ جدران تلّة فافِل وطيّر كلّ عصفور على ضفاف نهر فيستولا — أكبر أنهار بولندا. كان يحترق من الداخل، ولم يكن أمامه إلا شيء واحد: أن يركض نحو النهر ويشرب.",

    "شرب. ثم شرب. ثم شرب. ابتلع من ماء النهر ما جعل مستوى فيستولا ينخفض أمام العيون. لكنّ هذه هي المسألة مع الكِبريت — الماء لا يُطفئه. كلّما شرب التنّين أكثر، زاد الأمر سوءاً. انتفخ بطنه حتى بدأت الحَراشِف تتشقّق. وهناك، على ضفّة النهر، انفجر تنّين فافِل. حَراشِف وعظام في كلّ اتجاه. الوحش الذي عجزت عنه جيوش أوروبا قتله خروف ميّت وكيس كِبريت. رُبَّ حيلةٍ أنفعُ من قبيلة.",

    "تحرّرت كراكوف. وتزوّج سكوبا الأميرة — لا لأنه كان الأقوى أو الأشجع، بل لأنه كان الأذكى. اليوم، يقف تمثال تنّين من البرونز عند سفح تلّة فافِل، وأجمل ما في الأمر أنه ينفث ناراً حقيقية كلّ بضع دقائق والسيّاح يلتقطون الصور حوله. وكهف التنّين — سموتشا ياما كما يسمّيه البولنديون — لا يزال مفتوحاً. انزل الدرج الحلزوني إلى العتمة الباردة، ويُقسم لك أهل كراكوف أنك في الليالي الهادئة ستشمّ أثراً خفيفاً من الكِبريت في الهواء.",
  ]),

  moralOrLesson: {
    S: "الذكاء والحيلة يهزمان ما يعجز عنه القوّة الغاشمة — أمضى سلاح يملكه الإنسان هو عقله.",
  },
};

// ──────────────────────────────────────────────
// PERSIAN (fa)
// ──────────────────────────────────────────────
const persian = {
  ...shared,
  lang: { S: "fa" },
  langStoryId: { S: "fa#smok-wawelski" },

  title: { S: "اژدهای واوِل" },

  subtitle: {
    S: "هیولایی که کراکوف را به وحشت انداخت و پینه‌دوزی که با نیرنگ شکستش داد",
  },

  excerpt: {
    S: "پیش از آنکه کراکوف پایتخت شود، پیش از آنکه اولین سنگ قلعهٔ واوِل گذاشته شود، چیزی در غاری زیر تپه زندگی می‌کرد. لهستانی‌ها اسمش را گذاشته بودند اسموک واوِلسکی — اژدهای واوِل.",
  },

  characters: {
    L: [
      { S: "اژدهای واوِل (اسموک واوِلسکی)" },
      { S: "اسکوبا، شاگرد پینه‌دوز" },
      { S: "شاه کراکوس" },
      { S: "شاهزاده‌خانم" },
    ],
  },

  era: { S: "دوران افسانه‌ای پیش از تاریخ کراکوف" },

  paragraphs: makeParagraphs([
    "پیش از آنکه کراکوف پایتخت شود، پیش از آنکه اولین سنگ قلعهٔ واوِل گذاشته شود، چیزی در غاری زیر تپه زندگی می‌کرد. لهستانی‌ها اسمش را گذاشته بودند اسموک واوِلسکی — اژدهای واوِل. پولک‌هایی سخت‌تر از آهن، آرواره‌ای که یک اسب را یکجا می‌بلعید، و نَفَسی که دهکده‌ها را خاکستر می‌کرد. اول گله‌ها را می‌خورد — گاو، گوسفند، هرچه دم دستش بود. اما وقتی حیوان‌ها تمام شدند، چیز بدتری خواست: دخترهایی که جلوی دهانهٔ غار بگذارند، مثل قربانی برای موجودی که فقط گرسنگی می‌فهمید.",

    "شاه کراکوس — همان که می‌گویند شهر را بنا کرد و نامش را از او گرفت — دیگر درمانده شده بود. هر هفته دختری را دم غروب به غار می‌بردند. صبح که می‌شد، فقط زمین سوخته بود و سکوت. شاه اعلام کرد: هرکس اژدها را بکشد، نصف مملکت و دست دخترم مال او. جنگاوران از همه‌جا آمدند — شمشیرزن‌های آلمانی، شوالیه‌های فرانسوی، مزدوران مجار. یکی یکی با بهترین سلاح‌هایشان رفتند توی غار. هیچ‌کدام برنگشتند.",

    "بعد یک جوان به نام اسکوبا جلو آمد. سرباز نبود — شاگرد پینه‌دوز بود و کفش می‌دوخت. نقشه‌اش هم مسخره به نظر می‌رسید: از شاه یک گوسفند مرده خواست، یک عالمه گوگرد، و نخ محکم. کل دربار خندید. پینه‌دوز جلوی اژدها؟ اما کراکوس دیده بود که قهرمان‌های اروپا یکی یکی رفته‌اند و برنگشته‌اند. گفت: بگذارید امتحان کند. چه چیزی داریم از دست بدهیم؟",

    "اسکوبا تمام شب کار کرد. گوسفند را خالی کرد، تا خرخره پُرش کرد از گوگرد، و با سوزن و نخ پینه‌دوزیش دوختش — آنقدر ریز و محکم که انگار حیوان دست‌نخورده است. درست پیش از سپیده‌دم، گوسفند را جلوی دهانهٔ غار گذاشت. بعد عقب رفت... و صبر کرد.",

    "اژدها با اولین نور بیرون آمد. سرش تاب می‌خورد و سوراخ‌های دماغش باز بود. گوسفند را دید، با یک گاز قاپید و یکجا قورت داد. یک لحظه هیچ‌چیز نشد — بعد گوگرد توی شکم هیولا آتش گرفت. اژدها نعره‌ای کشید که دیوارهای تپهٔ واوِل لرزید و هر پرنده‌ای کنار رود ویستولا — بزرگ‌ترین رود لهستان — پرید هوا. از درون می‌سوخت و فقط یک راه داشت: بدود سمت رودخانه و آب بخورد.",

    "خورد. باز خورد. باز هم خورد. آنقدر آب بلعید که سطح ویستولا پایین افتاد. اما مشکل گوگرد همین است — آب خاموشش نمی‌کند. هرچه بیشتر می‌خورد، بدتر می‌شد. شکمش باد کرد تا جایی که پولک‌هایش شروع کردند به ترکیدن. و همان‌جا، لب رودخانه، اژدهای واوِل منفجر شد. پولک و استخوان به هر طرف پراکنده شد. هیولایی که هیچ لشکری نتوانسته بود شکستش بدهد، با یک گوسفند مرده و یک کیسه گوگرد از پا درآمد. نترس از آن که های و هوی دارد — بترس از آن که سوزن و نخ دارد.",

    "کراکوف آزاد شد. اسکوبا با شاهزاده‌خانم ازدواج کرد — نه به خاطر زور بازویش، نه به خاطر شجاعتش، بلکه چون باهوش‌ترین آدم آنجا بود. امروز یک مجسمهٔ برنزی اژدها پایین تپهٔ واوِل ایستاده، و بهترین قسمتش این است که هر چند دقیقه یک‌بار آتش واقعی از دهانش بیرون می‌زند و توریست‌ها سلفی می‌گیرند. غار اژدها — اسموچا یاما — هنوز باز است. از پله‌های مارپیچ برو پایین توی تاریکی خنک، و اهالی شهر قسم می‌خورند که شب‌های ساکت هنوز بوی گوگرد توی هوا می‌پیچد.",
  ]),

  moralOrLesson: {
    S: "زیرکی و چاره‌اندیشی چیزی را شکست می‌دهند که زور از پسش برنمی‌آید — تیزترین سلاحِ آدمی عقل اوست.",
  },
};

// ──────────────────────────────────────────────
// TURKISH (tr)
// ──────────────────────────────────────────────
const turkish = {
  ...shared,
  lang: { S: "tr" },
  langStoryId: { S: "tr#smok-wawelski" },

  title: { S: "Vavel Ejderhası" },

  subtitle: {
    S: "Kraków'u dehşete düşüren canavar ve onu alt eden kunduracı çırağı",
  },

  excerpt: {
    S: "Kraków başkent olmadan çok önce, Vavel Kalesi'nin ilk taşı konmadan çok önce, tepenin altındaki mağarada bir şey yaşıyordu. Polonyalılar ona Smok Vavelski diyordu — Vavel Ejderhası.",
  },

  characters: {
    L: [
      { S: "Vavel Ejderhası (Smok Vavelski)" },
      { S: "Skuba, kunduracı çırağı" },
      { S: "Kral Krakus" },
      { S: "Prenses" },
    ],
  },

  era: { S: "Kraków'un efsanevi tarih öncesi" },

  paragraphs: makeParagraphs([
    "Kraków başkent olmadan çok önce, Vavel Kalesi'nin ilk taşı konmadan çok önce, tepenin altındaki mağarada bir şey yaşıyordu. Polonyalılar ona Smok Vavelski diyordu — Vavel Ejderhası. Demirden sert pulları, bir atı bütün yutacak kadar geniş çeneleri ve köyleri küle çeviren nefesi vardı. Önce hayvanları yedi — sığır, koyun, eline ne geçerse. Ama hayvanlar bitince daha korkunç bir şey istemeye başladı: genç kızlar, mağaranın ağzına bırakılacak, sadece açlık tanıyan bir canavara sunulan kurbanlar.",

    "Kral Krakus — efsaneye göre şehri kuran ve adını veren adam — çaresiz kalmıştı. Her hafta bir kız daha gün batımında mağaraya götürülüyordu. Sabah olduğunda geriye yanmış topraktan ve sessizlikten başka bir şey kalmıyordu. Sonunda kral ilan etti: ejderhayı öldürene krallığımın yarısını ve kızımın elini vereceğim. Savaşçılar her yerden geldi — Alman kılıç ustaları, Fransız şövalyeleri, Macar paralı askerleri. Teker teker en iyi silahlarıyla mağaraya girdiler. Hiçbiri çıkamadı.",

    "Derken Skuba adında bir delikanlı öne çıktı. Asker değildi — bir kunduracının çırağıydı, ayakkabı dikerek geçiniyordu. Planı da kulağa saçma geldi: kraldan ölü bir koyun, bir yığın kükürt ve sağlam iplik istedi. Saray kahkahadan yıkıldı. Kunduracı çırağı ejderhaya karşı mı? Ama Krakus, Avrupa'nın en iyi savaşçılarının o mağaraya girip bir daha çıkmadığını kendi gözleriyle görmüştü. \"Bırakın denesin,\" dedi. \"Kaybedecek nemiz kaldı ki?\"",

    "Skuba bütün gece çalıştı. Koyunun içini boşalttı, ağzına kadar kükürt doldurdu ve kunduracı iğnesiyle dikti — o kadar sıkı ve düzgün dikişler ki koyun sanki hiç açılmamış gibiydi. Şafak sökmeden hemen önce doldurulmuş koyunu mağaranın tam ağzına bıraktı. Sonra geri çekildi... ve bekledi.",

    "Ejderha gün ağarırken dışarı çıktı. Başını sallıyor, burun delikleri açılıp kapanıyordu. Koyunu gördü, tek hamlede kaptı ve bütün olarak yuttu. Bir an sessizlik — sonra kükürt canavarın midesindeki ateşle buluştu. Ejderha öyle bir kükredi ki Vavel Tepesi'nin duvarları titredi ve Vistül Nehri boyunca — Polonya'nın en büyük nehri — her kuş göğe savruldu. İçten içe yanıyordu ve yapabileceği tek bir şey vardı: nehre koşup içmek.",

    "İçti. İçti. Bir daha içti. Nehirden o kadar çok su yuttu ki Vistül'ün seviyesi gözle görülür biçimde düştü. Ama kükürdün belası şu — su onu söndürmez. Ejderha ne kadar içtiyse durum o kadar kötüleşti. Karnı şişti, pulları çatırdamaya ve yarılmaya başladı. Ve tam orada, nehir kıyısında, Vavel Ejderhası patladı. Pul ve kemik her yana saçıldı. Hiçbir ordunun baş edemediği canavarı ölü bir koyunla bir torba kükürt yok etti. Her yiğidin bir yoğurt yiyişi varmış — Skuba'nınki kükürtlüymüş.",

    "Kraków özgürdü. Skuba prensesle evlendi — en güçlü ya da en cesur olduğu için değil, odadaki en akıllı kişi olduğu için. Bugün Vavel Tepesi'nin eteklerinde bronz bir ejderha heykeli duruyor ve en güzel tarafı şu: birkaç dakikada bir gerçek ateş püskürtüyor, turistler de çılgınca selfie çekiyor. Ejderha mağarası Smocza Jama hâlâ ziyarete açık. Döner merdivenlerden serin karanlığa inin; Krakovlular yemin eder ki sessiz gecelerde havada hâlâ hafif bir kükürt kokusu duyulur.",
  ]),

  moralOrLesson: {
    S: "Kaba kuvvetin yenemediğini zekâ ve hüner yener — insanın en keskin silahı aklıdır.",
  },
};

// ──────────────────────────────────────────────
// PUSH TO DYNAMODB
// ──────────────────────────────────────────────

const items = [
  { label: "Arabic (ar)", item: arabic },
  { label: "Persian (fa)", item: persian },
  { label: "Turkish (tr)", item: turkish },
];

for (const { label, item } of items) {
  console.log(`\nPushing ${label}...`);
  try {
    const cmd = new PutItemCommand({
      TableName: "Story",
      Item: item,
      ConditionExpression:
        "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
    });
    const result = await client.send(cmd);
    console.log(
      `  ✓ ${label} pushed successfully. HTTP ${result.$metadata.httpStatusCode}`
    );
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(`  ${label} record already exists. Overwriting...`);
      const cmd2 = new PutItemCommand({
        TableName: "Story",
        Item: item,
      });
      const result2 = await client.send(cmd2);
      console.log(
        `  ✓ ${label} overwritten successfully. HTTP ${result2.$metadata.httpStatusCode}`
      );
    } else {
      console.error(`  ✗ FAILED for ${label}:`, err.message);
      process.exit(1);
    }
  }
}

console.log("\n✓ All three language versions pushed successfully.");
console.log(`  Timestamp: ${TIMESTAMP}`);
