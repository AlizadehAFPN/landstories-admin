import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client);
const TABLE = "Story";
const NOW = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English) ───
const shared = {
  siteId: "acropolis-athens",
  storyId: "elgin-marbles",
  icon: "🏺",
  tier: "A",
  source:
    "House of Commons Select Committee Report (1816), modern scholarly analysis, British Museum and Greek government statements",
  characters: [
    "Thomas Bruce, 7th Earl of Elgin",
    "Giovanni Battista Lusieri (Elgin's agent)",
    "Ottoman authorities",
    "Greek witnesses",
  ],
  era: "1801-1812 (removal), debate ongoing",
  readingTimeMinutes: 2,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lng: 23.7267, lat: 37.9715 },
  hasAudio: false,
  isFree: true,
  storyCategory: "lost_found",
  updatedAt: NOW,
};

// ═══════════════════════════════════════════════════════════════════
// ARABIC (ar)
// Proverb: ما ضاعَ حَقٌّ وراءَهُ مُطالِب
// (No right is lost as long as someone demands it)
// ═══════════════════════════════════════════════════════════════════
const ar = {
  ...shared,
  lang: "ar",
  langStoryId: "ar#elgin-marbles",
  title: "رُخامُ البارثينون — إنقاذٌ أم سَرِقة؟",
  subtitle: "المنحوتاتُ التي رحلت... وقد تعود",
  excerpt:
    "تخيَّل المشهد: أثينا، عام ١٨٠١. اليونانُ تحت الحكم العثمانيّ، ولوردٌ اسكتلنديّ يصلُ بتصريحٍ لرسم منحوتات البارثينون. ما فعلَهُ بعد ذلك أشعلَ خلافًا لم ينطفئ منذ قرنَين.",
  moralOrLesson:
    "مَن يملكُ الماضيَ حقًّا؟ جدلُ منحوتات البارثينون يطرحُ سؤالًا جوهريًّا: هل الكنوزُ الثقافيّة مُلكٌ للشعوب التي صنعَتها — أم لمن امتلكَ القوّة لأخذها؟",
  paragraphs: [
    {
      text: "تخيَّل المشهد: أثينا، عام ١٨٠١. اليونانُ تحت الحكم العثمانيّ منذ أكثرَ من ثلاثمئة وخمسين سنة. يَصِلُ إلى المدينة رجلٌ اسكتلنديّ يُدعى توماس بروس — لقبُهُ «اللورد إلجِن» — وقد عُيِّنَ للتوّ سفيرًا لبريطانيا لدى الباب العالي. في يده تصريحٌ رسميّ: ارسم المنحوتات، وخُذ قوالبَ جِبصيّة. لكنّ ما فعلَهُ بعد ذلك أشعلَ خِلافًا لم يَنطفئ منذ قرنَين.",
    },
    {
      text: "إلجِن لم يَرسم شيئًا. أحضرَ فِرَقًا من العمّال نَشَروا الرُّخامَ بالمناشير، وخَلَعوا التماثيلَ بالعَتَلات، وشَحَنوا نصفَ ما تبقّى من منحوتات البارثينون إلى إنجلترا. نتكلّمُ عن خمسةٍ وسبعين مترًا من الإفريز المنقوش، وخمسَ عشرةَ لوحةً تصوّر معاركَ أسطوريّة، وسبعةَ عشرَ تمثالًا بالحجم الطبيعيّ. بل أخذوا حتّى إحدى الكارياتيد — تلك الأعمدة على شكل فتيات — من المبنى المجاور.",
    },
    {
      text: "اليونانيّون تحت الاحتلال لم يستطيعوا إيقافَه، لكنّهم لم يَصمُتوا. العمّالُ كسَروا وَصَلاتٍ عمرُها ألفا سنة، وقِطَعٌ تحطّمت وهي تسقط. شاهدٌ يونانيّ ترك جملةً لا تزال تقطعُ القلب: «الأتراكُ لم يبكوا، لكنّنا نحن بكَينا.» وحتّى في بريطانيا نفسها، جُنَّ جنونُ الشاعر اللورد بايرون — سمّى إلجِن ناهِبًا وكتبَ قصيدةً كاملةً يلعنُهُ فيها لتجريد أثينا من رُوحها.",
    },
    {
      text: "شَحَنَ إلجِن كلَّ شيءٍ إلى لندن وعَرَضَ المنحوتاتِ في منزله. لكنّ العمليّة كادت تُفلِسُه، فباعَ المجموعة للحكومة البريطانيّة عام ١٨١٦. البرلمانُ ناقشَ أخلاقيّة الصفقة... ثمّ صوَّتَ بالموافقة. منذ ذلك الحين والمنحوتاتُ في المتحف البريطانيّ يزورها الملايينُ سنويًّا. واليونانُ تطالبُ باستعادتها منذ نالت استقلالَها عام ١٨٣٢ — أي ما يقاربُ المئتَي عام.",
    },
    {
      text: "حُجّةُ المتحف البريطانيّ واضحة: نحنُ أنقذنا هذه المنحوتات. لو لم يأخذها إلجِن لربّما دمَّرَها التلوُّث أو الحروب أو الإهمال — وهنا في لندن يراها أيُّ إنسانٍ على وجه الأرض مجّانًا. اليونانُ تَرُدّ: أخذتموها بينما إمبراطوريّةٌ أجنبيّة تحتلّ أرضَنا. لم تُعطِ أيّ حكومة يونانيّة إذنًا بذلك قطّ. مكانُها على البارثينون — المبنى الذي نُحِتَت من أجله قبل ألفَين وخمسمئة عام.",
    },
    {
      text: "عام ٢٠٠٩، لعبت اليونانُ ورقتَها الأقوى — لا بالمحامين، بل بالعِمارة. افتُتِحَ متحفُ الأكروبوليس الجديد، مبنًى زجاجيّ مُذهِل عند سفح البارثينون. في داخله قاعةٌ بُنِيَت بأبعاد المعبد الأصليّ تمامًا. المنحوتاتُ التي لا تزالُ لدى اليونان في أماكنها الصحيحة. وحيثُ يجب أن تكون القطعُ المحتجَزة في لندن — فراغات. لا لافتاتٍ ولا شروحات. الفراغُ وحدَهُ يقولُ كلَّ شيء.",
    },
    {
      text: "حتّى الاسمُ ساحةُ معركة. قُل «رُخام إلجِن» وكأنّك تُقِرُّ بأنّ لوردًا بريطانيًّا يَملِكُها. قُل «منحوتات البارثينون» وكأنّك تقولُ إنّها مُلكُ أثينا. هذه المنحوتاتُ نُحِتَت قبل ألفَين وخمسمئة سنة لتروي قصصَ الآلهة والأبطال. اليومَ تروي قصّةً مختلفة — عن الإمبراطوريّات والمُلكيّة وسؤالٍ لم يُجَب عنه بعد: حين تأخذُ شيئًا جميلًا من شعبٍ مَقهور، هل يحقُّ لك أن تسمّيَهُ مُلكَك؟ لكنّ العربَ يقولون: ما ضاعَ حَقٌّ وراءَهُ مُطالِب. واليونانُ لم تتوقّف عن المطالبة يومًا واحدًا.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
// PERSIAN (fa)
// Proverb: چراغی که به خانه رواست، به مسجد حرام است
// (A lamp that belongs at home shouldn't be taken to the mosque)
// ═══════════════════════════════════════════════════════════════════
const fa = {
  ...shared,
  lang: "fa",
  langStoryId: "fa#elgin-marbles",
  title: "پارتِنون — نجات یا غارت؟",
  subtitle: "پیکره‌هایی که رفتند... و شاید برگردند",
  excerpt:
    "سال ۱۸۰۱، یونان مالِ یونانی‌ها نیست. یک اشراف‌زادهٔ اسکاتلندی با مجوزِ طراحی از پیکره‌های پارتنون وارد آتن می‌شود. کاری که بعدش کرد، جنگی راه انداخت که هنوز تمام نشده.",
  moralOrLesson:
    "گذشته واقعاً مالِ کیست؟ ماجرای پیکره‌های پارتنون این پرسش را مطرح می‌کند: آیا گنجینه‌های فرهنگی به ملّتی تعلّق دارند که آن‌ها را آفریده، یا به هرکسی که زورِ بردنشان را داشت؟",
  paragraphs: [
    {
      text: "این‌طور تصوّرش کن: سال ۱۸۰۱ میلادی، یونان مالِ یونانی‌ها نیست. بیش از سیصد و پنجاه سال است که امپراتوری عثمانی اینجا را در دست دارد. وسطِ این آشفتگی، یک اشراف‌زادهٔ اسکاتلندی به نام توماس بروس — معروف به «لُرد اِلگین» — به‌عنوان سفیر جدید بریتانیا وارد آتن می‌شود. مجوّزش از عثمانی‌ها ساده است: از پیکره‌های پارتنون طرح بکش و قالبِ گَچی بردار. ولی کاری که بعدش کرد، جنگی راه انداخت که هنوز تمام نشده.",
    },
    {
      text: "اِلگین طرح نکشید. دسته‌دسته کارگر آورد که مَرمَرها را با ارّه بُریدند، پیکره‌ها را با دیلَم از جا کَندند، و تقریباً نصفِ آنچه از تزئینات پارتنون مانده بود را سوار کشتی کردند و فرستادند انگلستان. هفتاد و پنج متر کَنده‌کاری، پانزده صحنهٔ نبردِ حماسی، و هفده تندیس به اندازهٔ آدمِ واقعی. حتّی یکی از کاریاتیدها — آن ستون‌های به شکل دختر — را هم از ساختمانِ بغلی کَندند و بردند.",
    },
    {
      text: "یونانی‌ها زیر سلطهٔ عثمانی قدرتِ جلوگیری نداشتند، ولی ساکت نماندند. کارگرها اتّصالاتِ دوهزارساله را شکستند و تکه‌هایی موقعِ جدا شدن به زمین افتاد و خُرد شد. یک شاهدِ یونانی جمله‌ای گفته که هنوز دلِ آدم را می‌سوزاند: «تُرک‌ها گریه نکردند، ولی ما گریه کردیم.» حتّی در خودِ بریتانیا، شاعرِ معروف لُرد بایرون از خشم منفجر شد — اِلگین را غارتگر خواند و شعری نوشت که در آن لعنتش کرد بابتِ کَندنِ روحِ آتن.",
    },
    {
      text: "اِلگین همه‌چیز را فرستاد لندن و در خانه‌اش به نمایش گذاشت. امّا کلِّ این ماجرا تقریباً وَرشِکَستش کرده بود، پس سال ۱۸۱۶ مجموعه را به دولت بریتانیا فروخت. پارلمان بحث کرد که آیا این معامله اخلاقی هست یا نه... و بعد رأی مثبت داد. از آن روز تا امروز، این پیکره‌ها در موزهٔ بریتانیا هستند و سالی میلیون‌ها بازدیدکننده دارند. یونان هم از وقتی سال ۱۸۳۲ استقلال گرفت — یعنی نزدیکِ دویست سال — بی‌وقفه خواستارِ پس گرفتنشان بوده.",
    },
    {
      text: "استدلالِ موزهٔ بریتانیا این است: ما نجاتشان دادیم. اگر اِلگین نمی‌بردشان، شاید آلودگیِ هوا یا جنگ یا بی‌توجّهی نابودشان می‌کرد — و اینجا در لندن هر انسانی روی کرهٔ زمین می‌تواند رایگان ببیندشان. یونان جواب می‌دهد: شما اینها را وقتی بردید که یک امپراتوریِ بیگانه سرزمین ما را اشغال کرده بود. هیچ دولتِ یونانی هرگز اجازه نداد. جای این پیکره‌ها روی پارتنون است — همان بنایی که دو هزار و پانصد سال پیش برایش ساخته شدند.",
    },
    {
      text: "سال ۲۰۰۹، یونان قوی‌ترین حرکتش را زد — نه با وکیل، بلکه با معماری. موزهٔ نوِ آکروپولیس افتتاح شد: ساختمانی شیشه‌ای و خیره‌کننده درست در دامنهٔ پارتنون. داخلش تالاری ساختند با اندازه‌های دقیقِ معبدِ اصلی. پیکره‌هایی که یونان هنوز دارد، سرِ جای خودشان نشسته‌اند. و جایی که قطعه‌های لندن باید باشند؟ خالی. نه تابلویی، نه توضیحی. خالی بودنِ آن فضاها خودش همه‌چیز را می‌گوید.",
    },
    {
      text: "حتّی اسمشان میدانِ جنگ است. بگو «مَرمَرهای اِلگین» و انگار قبول کرده‌ای که یک لُرد انگلیسی صاحبشان است. بگو «پیکره‌های پارتنون» و انگار گفته‌ای مالِ آتن‌اند. این کَنده‌کاری‌ها دو هزار و پانصد سال پیش ساخته شدند تا داستانِ خدایان و پهلوانان را بگویند. حالا داستانِ دیگری می‌گویند — دربارهٔ امپراتوری، مالکیّت، و پرسشی بی‌جواب: وقتی چیزِ زیبایی را از ملّتی زیرِ اشغال می‌بری، می‌توانی اسمش را بگذاری «مالِ من»؟ ما فارسی‌ها ضرب‌المثلی داریم: چراغی که به خانه رواست، به مسجد حرام است. این پیکره‌ها چراغِ خانهٔ آتن‌اند — و جایشان هم خانه است.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
// TURKISH (tr)
// Proverb: Bal tutan parmağını yalar
// (He who touches honey licks his fingers)
// ═══════════════════════════════════════════════════════════════════
const tr = {
  ...shared,
  lang: "tr",
  langStoryId: "tr#elgin-marbles",
  title: "Parthenon Heykelleri — Kurtarma mı, Yağma mı?",
  subtitle: "Giden heykeller... ve belki dönecek olanlar",
  excerpt:
    "1801 yılı, Yunanistan Yunanlara ait değil. İskoç bir soylu, Parthenon'daki heykellerin çizimini yapmaya geliyor. Ama sonra yaptığı şey iki yüz yılı aşkın süren bir kavga başlattı.",
  moralOrLesson:
    "Geçmişin gerçek sahibi kim? Parthenon heykelleri tartışması temel bir soru soruyor: kültürel hazineler onları yaratan halklara mı aittir, yoksa onları alma gücüne sahip olana mı?",
  paragraphs: [
    {
      text: "Şöyle düşün: 1801 yılı, Yunanistan Yunanlara ait değil. Osmanlı İmparatorluğu üç yüz elli yılı aşkın süredir bu toprakları yönetiyor. Tam bu dönemde Thomas Bruce adında bir İskoç soylusu — lakabı \"Lord Elgin\" — İstanbul'daki Osmanlı sarayına İngiliz büyükelçisi olarak atanıyor. Cebinde bir ferman var: Parthenon'daki heykellerin çizimlerini yap, alçı kalıplar al. Ama onun bundan sonra yaptığı şey, iki yüz yılı aşkın süredir bitmemiş bir kavga başlattı.",
    },
    {
      text: "Elgin çizim falan yapmadı. Yanına işçi ekipleri getirdi; mermerler testereyle biçildi, heykeller levyeyle sökülüp yerinden koparıldı. Parthenon'un ayakta kalan süslemelerinin neredeyse yarısı gemilere yüklenip İngiltere'ye gönderildi. Yetmiş beş metre işlemeli friz, on beş tane savaş kabartması ve on yedi tane gerçek insan boyutunda heykel. Hatta yan binadaki Karyatid'lerden birini bile söktüler — şu kadın şeklindeki ünlü sütunlardan.",
    },
    {
      text: "Osmanlı yönetimi altındaki Yunanlılar bunu durduracak güçte değildi ama sessiz de kalmadı. İşçiler iki bin yıllık bağlantı noktalarını kırdı, söküm sırasında parçalar yere düşüp paramparça oldu. Bir Yunan görgü tanığının sözü hâlâ yürek burkuyor: \"Türkler ağlamadı, ama biz ağladık.\" İngiltere'de bile şair Lord Byron çılgına döndü — Elgin'i yağmacı ilan etti ve Atina'nın ruhunu sökmekle suçladığı uzun bir şiir yazdı.",
    },
    {
      text: "Elgin her şeyi Londra'ya gönderdi ve evinde sergiledi. Ama tüm bu operasyon onu neredeyse iflas ettirmişti; 1816'da koleksiyonu İngiliz hükümetine sattı. Parlamento bu alışverişin ahlaki olup olmadığını tartıştı… sonra da \"evet\" oyu verdi. O günden bu yana heykeller British Museum'da, yılda milyonlarca ziyaretçi çekiyor. Yunanistan ise 1832'de bağımsızlığını kazandığı andan itibaren — yani yaklaşık iki yüz yıldır — geri istemeyi bir gün bile bırakmadı.",
    },
    {
      text: "British Museum'un savunması şu: biz bu heykelleri kurtardık. Elgin almasaydı, hava kirliliği, savaş ya da ihmal belki de onları yok ederdi — üstelik Londra'da dünyanın her yerinden gelen herkes bedavaya görebiliyor. Yunanistan'ın cevabı ise keskin: siz bunları yabancı bir imparatorluk toprağımızı işgal ederken aldınız. Hiçbir Yunan hükümeti buna izin vermedi. Bu heykellerin yeri Parthenon — iki bin beş yüz yıl önce tam olarak onun için yontulmuş oldukları yapı.",
    },
    {
      text: "2009'da Yunanistan en güçlü hamlesini yaptı — avukatlarla değil, mimariyle. Atina'da, Parthenon'un hemen eteğinde yeni Akropolis Müzesi açıldı: cam ve çelikten, nefes kesici bir yapı. İçinde orijinal tapınağın birebir ölçülerinde inşa edilmiş bir galeri var. Yunanistan'ın elindeki heykeller orijinal yerlerinde duruyor. Londra'daki parçaların olması gereken yerlerde ise boşluk var. Tabela yok, açıklama yok. O boşluklar her şeyi anlatıyor.",
    },
    {
      text: "Adları bile bir savaş alanı. \"Elgin Mermerleri\" de, bir İngiliz lordunu sahipleri olarak kabul etmiş olursun. \"Parthenon Heykelleri\" de, Atina'nın malı olduklarını söylemiş olursun. Bu kabartmalar iki bin beş yüz yıl önce tanrıların ve kahramanların hikâyelerini anlatmak için yapıldı. Şimdi bambaşka bir hikâye anlatıyorlar — imparatorluk, mülkiyet ve cevaplanmamış bir soru hakkında: fethedilmiş bir halktan güzel bir şey aldığında, ona gerçekten \"benim\" diyebilir misin? Derler ya, bal tutan parmağını yalar. Elgin sadece balı tatmaya gelmişti — ama peteği komple götürdü.",
    },
  ],
};

// ─── Push helper ───
async function pushStory(item) {
  const label = `${item.lang}#${item.storyId}`;
  console.log(`\n⏳ Pushing ${label}...`);

  // Validate essential fields before push
  const required = [
    "siteId",
    "langStoryId",
    "lang",
    "title",
    "subtitle",
    "excerpt",
    "moralOrLesson",
    "paragraphs",
  ];
  for (const field of required) {
    if (!item[field]) throw new Error(`Missing field: ${field} in ${label}`);
  }
  if (!Array.isArray(item.paragraphs) || item.paragraphs.length < 6) {
    throw new Error(
      `Paragraphs count too low (${item.paragraphs?.length}) in ${label}`
    );
  }
  for (let i = 0; i < item.paragraphs.length; i++) {
    const p = item.paragraphs[i];
    if (!p.text || p.text.length === 0) {
      throw new Error(`Empty paragraph ${i} in ${label}`);
    }
    if (p.text.length > 600) {
      console.warn(
        `  ⚠️  Paragraph ${i} is ${p.text.length} chars (limit ~500, +20% OK)`
      );
    }
  }

  try {
    await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: item,
        ConditionExpression:
          "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
      })
    );
    console.log(`✅ ${label} pushed successfully!`);
    return true;
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.error(
        `❌ ${label} already exists! Skipping to avoid overwrite.`
      );
      return false;
    }
    throw err;
  }
}

// ─── Main ───
async function main() {
  console.log("═══════════════════════════════════════════");
  console.log("  Elgin Marbles — ar / fa / tr push");
  console.log(`  Timestamp: ${NOW}`);
  console.log("═══════════════════════════════════════════");

  const results = {};

  for (const item of [ar, fa, tr]) {
    try {
      results[item.lang] = await pushStory(item);
    } catch (err) {
      console.error(`❌ FATAL for ${item.lang}: ${err.message}`);
      results[item.lang] = false;
    }
  }

  console.log("\n═══════════════════════════════════════════");
  console.log("  RESULTS");
  console.log("═══════════════════════════════════════════");
  for (const [lang, ok] of Object.entries(results)) {
    console.log(`  ${lang}: ${ok ? "✅ SUCCESS" : "❌ FAILED"}`);
  }

  const allOk = Object.values(results).every(Boolean);
  if (!allOk) process.exit(1);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
