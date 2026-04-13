const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const TABLE = "Story";
const NOW = Math.floor(Date.now() / 1000).toString();

// ─── Shared fields (unchanged from English original) ───
const shared = {
  siteId: { S: "valley-of-the-kings" },
  storyId: { S: "boy-king-murder-mystery" },
  icon: { S: "\u{1F5E1}\uFE0F" },
  tier: { S: "A" },
  source: {
    S: 'Hawass, Z. et al. "Ancestry and Pathology in King Tutankhamun\'s Family," JAMA 303:7 (2010); Hittite archives, Bogazkoy',
  },
  characters: {
    L: [
      { S: "Tutankhamun" },
      { S: "Ankhesenamun (Queen)" },
      { S: "Ay (Vizier)" },
      { S: "Horemheb (General)" },
      { S: "Prince Zannanza (Hittite)" },
      { S: "Suppiluliuma I (Hittite King)" },
    ],
  },
  era: { S: "New Kingdom (c. 1323 BC)" },
  readingTimeMinutes: { N: "3" },
  image: { S: "" },
  disabled: { BOOL: false },
  thumbnail: { S: "" },
  coordinates: {
    M: {
      lng: { N: "32.6014" },
      lat: { N: "25.7402" },
    },
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "ghosts_curses" },
  updatedAt: { N: NOW },
};

function makeParagraphs(texts) {
  return {
    L: texts.map((t) => ({ M: { text: { S: t } } })),
  };
}

// ═══════════════════════════════════════════════════════
// ARABIC — لُغز الفرعون الصغير
// ═══════════════════════════════════════════════════════
const arabic = {
  ...shared,
  lang: { S: "ar" },
  langStoryId: { S: "ar#boy-king-murder-mystery" },

  title: { S: "لُغز الفرعون الصغير" },

  subtitle: {
    S: "مَن قتلَ توت عنخ آمون... ومَن أسكتَ أرملتَهُ إلى الأبد؟",
  },

  excerpt: {
    S: "تسعة عشر عامًا فقط عاشها على هذه الأرض. فرعونٌ مراهق، يُفترَض أنّه ظلّ الآلهة بين البشر، لكنّه ماتَ قبل أن تكتمل ملامح الرجولة في وجهه. لثلاثة آلاف سنة لم يعرف أحدٌ لماذا — حتّى فتحَ العلمُ التابوتَ مرّة أخرى.",
  },

  moralOrLesson: {
    S: "القوّة تُسكِت مَن لا حيلةَ له، ورسائل ملكةٍ يائسة تصلُ إلينا عبر آلاف السنين شاهدةً على وحشيّة السياسة.",
  },

  paragraphs: makeParagraphs([
    // P1 — The hook
    "تِسعةَ عَشَرَ عامًا فقط عاشها توت عنخ آمون. فرعونٌ بالكاد خرجَ من طفولته، يُفترَض أنّه ظلّ الآلهة على الأرض، لكنّه رحلَ قبل أن تكتمل ملامح الرجولة في وجهه. حوالي ١٣٢٣ قبل الميلاد، في ذروة عظمة مصر القديمة، أُغلِقَ تابوته الذهبيّ وأُغلِقَ معه السؤال: لماذا مات؟ لثلاثة آلاف سنة لم يجد أحدٌ الجواب — حتّى جاء العِلمُ الحديث وفتحَ القبرَ من جديد.",

    // P2 — The skull, the suspects
    "عام ١٩٦٨، كشفت الأشعّة السينيّة عن شظايا عظميّة داخل جمجمة توت وأثرِ ما يشبه ضربةً في مؤخّرة الرأس — أثرٌ لا تتركه إلّا أداةٌ ثقيلة في يدٍ لا ترحم. الخبر انتشرَ كالنار. وقائمة المشتبه بهم كتبت نفسَها: أبوه أخناتون كان قد زلزلَ مصر حين ألغى آلهتها القديمة كلَّها وفرضَ عبادة إلهٍ واحد — قرص الشمس، آتون. وحين ورثَ الطفل توت العرشَ وهو ابنُ تسع سنين، ورثَ معه أعداءً لهم كلّ الأسباب ليتخلّصوا منه.",

    // P3 — Ay and Horemheb
    "اسمان تصدّرا قائمة المتّهمين. الأوّل: آي، كبير مستشاري الفرعون — ثعلبٌ سياسيّ عجوز، ويا للصُّدفة، هو نفسُه من جلسَ على العرش لحظة دُفِنَ توت. والثاني: حور مْحِب، قائد الجيش الأعلى، الذي خلفَ آي ثمّ محا بدمٍ بارد أسماءَ توت وآي وأخناتون من كلّ معبدٍ وكلّ نَصْبٍ في البلاد. كلاهما ملكَ الوسيلة، والدافع، والقُربَ من الضحيّة.",

    // P4 — Ankhesenamun's letter
    "لكنّ أشدّ فصول القصّة ألمًا ليس عن الملك — بل عن أرملته. بعد موت توت، وجدت الملكة الشابّة عَنْخْ إِسِنْ آمون نفسَها مُجبرةً على الزواج من آي، الرجل الذي ربّما دبّرَ مقتل زوجها. ففعلت ما لم تفعله ملكةٌ مصريّة من قَبل: كتبت إلى ملك أعتى أعداء مصر، الحيثيّ شوبّيلوليوما، تتوسّل إليه أن يُرسل لها ابنًا تتزوّجه. كلماتُها الحقيقيّة وصلتنا عبرَ الزمن: «زوجي ماتَ وليسَ لي وَلَد. لن أختارَ عبدًا من عبيدي وأجعله زوجي. أنا خائفة.»",

    // P5 — The second letter, the murdered prince
    "الملك الحيثيّ لم يصدِّق — ظنّها مَصيدة. أرسلَ مبعوثًا يتحقّق. فكتبت مرّة ثانية بنبرة من لم يبقَ لديها ما تخسره: «لو كانَ لي ابنٌ، أكنتُ أكتبُ عن عاري وعار بلادي لأرضٍ أجنبيّة؟» اقتنع. أرسلَ ابنَه الأمير زَنَّنزا جنوبًا نحو مصر. الأمير قُتِلَ عند الحدود. لم يصل إلى عروسه قطّ.",

    // P6 — Science overturns the theory
    "ثمّ انقلبت القصة رأسًا على عَقِب. في ٢٠٠٥، أجرى الباحثون تصويرًا مقطعيًّا شاملًا للمومياء، وجاءت النتائج مُغايِرة لكلّ التوقّعات. شظايا الجمجمة؟ على الأرجح من عمليّة التحنيط، لا من ضربة. ما كشفه الفحص: كسرٌ شديد في ساقه اليسرى تحوّلَ إلى التهابٍ خطير، وآثار ملاريا في حمضه النوويّ. أفضلُ إجابة يملكها العلم اليوم: توت لم تقتله يدٌ بشريّة — بل مزيجٌ من كسرٍ ملتهب، ووباء، وأمراض وراثيّة من أجيال زواج الأقارب في الأسرة الملكيّة. والداه كانا أخًا وأختًا.",

    // P7 — The cover-up + proverb (الثالثة ثابتة)
    "لكن حتّى لو كان المرض هو القاتل، فالتآمر السياسيّ لا يُنكَر. أحدُهم اعترضَ رسالة الأرملة. أحدُهم أمرَ بقتل الأمير على الحدود. وأحدُهم أجبرَ الملكة على الزواج ممّن جنى الثمرة الأكبر من موت زوجها. يقولون «الثالثةُ ثابتة» — وهنا ثَبَتَ شيءٌ واحد: أنّ السلطة حين تريد إسكاتَك، لا تكتفي بقتلك — بل تمحو أثرَك. بعد زواجها من آي، اختفت عنخ إسن آمون من التاريخ كأنّها لم تكن. لا قبر. لا سجلّ. نُحِتَ اسمُها من كلّ حجر — وكأنّها لم تُولَد قطّ.",
  ]),
};

// ═══════════════════════════════════════════════════════
// PERSIAN — معمّای مرگِ فرعونِ جوان
// ═══════════════════════════════════════════════════════
const persian = {
  ...shared,
  lang: { S: "fa" },
  langStoryId: { S: "fa#boy-king-murder-mystery" },

  title: { S: "معمّای مرگِ فرعونِ جوان" },

  subtitle: {
    S: "چه کسی توت‌عنخ‌آمون را کُشت — و چه کسی ملکه‌اش را برای همیشه خاموش کرد؟",
  },

  excerpt: {
    S: "نوزده سال بیشتر زنده نبود. فرعونی نوجوان که قرار بود سایه‌ی خدایان روی زمین باشد، ولی پیش از آنکه حتّی ریش‌هایش کامل شود از دنیا رفت. سه هزار سال کسی ندانست چرا — تا اینکه دانش، درِ تابوت را دوباره باز کرد.",
  },

  moralOrLesson: {
    S: "قدرت، بی‌پناهان را خاموش می‌کند. ولی نامه‌های ناامیدانه‌ی یک ملکه‌ی جوان از دلِ هزاره‌ها به ما رسیده — شاهدی بر بی‌رحمیِ سیاست.",
  },

  paragraphs: makeParagraphs([
    // P1 — The hook
    "توت‌عنخ‌آمون فقط نوزده سال عمر کرد. حوالی ۱۳۲۳ پیش از میلاد، در اوجِ شکوه مصر باستان، فرعونی نوجوان — که قرار بود نماینده‌ی خدایان روی زمین باشد — مُرد پیش از آنکه حتّی صورتش مردانه شود. تابوتِ طلایی‌اش را بستند و با آن، رازِ مرگش هم بسته شد. سه هزار سال هیچ‌کس جوابی نداشت — تا وقتی که دانشمندانِ قرنِ بیستم مومیایی‌اش را زیر دستگاه‌های اشعه و سی‌تی‌اسکن بردند. آنچه پیدا کردند، یکی از بزرگ‌ترین پرونده‌های جنایی تاریخ را باز کرد.",

    // P2 — The skull, the suspects
    "سال ۱۹۶۸، تصاویر اشعه‌ی ایکس تکه‌های استخوان داخل جمجمه‌ی توت و جای چیزی شبیهِ ضربه در پشتِ سرش را نشان داد — از آن جور ردّی که فقط یک جسمِ سنگین به‌جا می‌گذارد. خبر مثلِ بمب ترکید. فهرستِ مظنونان هم خودش را نوشت: پدرِ توت، اَخِناتون، مصر را زیر و رو کرده بود — تمامِ خدایانِ قدیمی را کنار گذاشته و همه را مجبور به پرستشِ یک خدای تازه کرده بود: آتون، گویِ خورشید. وقتی توتِ نُه‌ساله تاج و تخت را به ارث بُرد، دشمنانِ قدرتمندی هم به ارث بُرد که هزار دلیل داشتند سَر به نیستش کنند.",

    // P3 — Ay and Horemheb
    "دو نام بالای فهرست بودند. اوّلی: آی، مشاورِ ارشدِ فرعون — روباهِ پیرِ سیاست که — چه اتّفاقی! — خودش فرعون شد دقیقاً همان لحظه‌ای که توت را خاک کردند. دومی: هورِمحِب، فرمانده‌ی کلّ ارتش، که بعد از آی به تخت نشست و بعد با دقّتی ترسناک نامِ توت و آی و اَخِناتون را از هر معبد و هر سنگ‌نوشته‌ای در سراسرِ مصر پاک کرد. هر دو انگیزه داشتند، هر دو دسترسی داشتند، و هر دو از مرگ فرعونِ جوان سود بردند.",

    // P4 — Ankhesenamun's letter
    "امّا دردناک‌ترین بخش این داستان درباره‌ی توت نیست — درباره‌ی همسرش است. بعد از مرگ فرعون، ملکه‌ی جوان عنخ‌اِسِن‌آمون قرار بود به زور زنِ آی بشود — همان مردی که شاید شوهرش را کشته بود. پس دست به کاری زد که هیچ ملکه‌ی مصری تا آن روز نکرده بود: نامه‌ای نوشت به پادشاهِ بزرگ‌ترین دشمن مصر، شاهِ هیتی شوپّیلولیوما، و التماس کرد پسری بفرستد تا شوهرش شود. کلماتِ خودش از دلِ تاریخ به ما رسیده: «شوهرم مُرده و پسری ندارم. هرگز بنده‌ای از بندگانم را شوهر نخواهم کرد. من می‌ترسم.»",

    // P5 — The second letter, the murdered prince
    "شاهِ هیتی باورش نشد — فکر کرد دام است. فرستاده‌ای فرستاد تا بررسی کند. عنخ‌اِسِن‌آمون دوباره نوشت، این بار با لحنِ کسی که دیگر چیزی برای از دست دادن ندارد: «اگر پسر داشتم، آیا آبرویِ خودم و کشورم را پیشِ بیگانه می‌ریختم؟» شاه قانع شد. پسرش، شاهزاده زَنَّنزا را به سمتِ مصر فرستاد. شاهزاده در مرز کشته شد. هرگز به عروسش نرسید.",

    // P6 — Science overturns the theory
    "اینجاست که داستان ورق می‌خورد. سال ۲۰۰۵، پژوهشگران سی‌تی‌اسکنِ کاملی از مومیایی گرفتند و نتایج همه چیز را عوض کرد. تکه‌های استخوان در جمجمه؟ به احتمالِ زیاد مالِ فرآیندِ مومیایی‌سازی بود، نه ضربه. آنچه اسکن واقعاً نشان داد: شکستگیِ شدیدِ ساقِ چپ که عفونت کرده بود، به‌علاوه‌ی ردِّ مالاریا در دی‌اِن‌اِی‌اش. بهترین جوابِ دانشِ امروز این است: توت را دستِ انسان نکُشت — ترکیبِ شکستگیِ چرکین، مالاریا، و بیماری‌های ژنتیکی ناشی از ازدواجِ خویشاوندیِ نسل‌ها کُشت. پدر و مادرش خواهر و برادر بودند.",

    // P7 — The cover-up + proverb (تا سه نشه بازی نشه)
    "تا سه نشه، بازی نشه — امّا اینجا هر سه «سه» هولناک است. سه هزار سال سکوت. سه ضربه‌ی سیاسی: نامه‌ی ملکه را سَر راه گرفتند، شاهزاده‌ی هیتی را در مرز کشتند، و عنخ‌اِسِن‌آمون را مجبور به ازدواج با کسی کردند که بیشتر از همه از مرگ شوهرش سود بُرد. حتّی اگر بیماری فرعون را کشته باشد، توطئه‌ی سیاسی انکارناپذیر است. بعد از آن ازدواجِ اجباری با آی، ملکه از تاریخ محو شد. نه مقبره‌ای، نه سندی. نامش را از هر سنگی تراشیدند — انگار هرگز وجود نداشت.",
  ]),
};

// ═══════════════════════════════════════════════════════
// TURKISH — Çocuk Firavunun Ölüm Sırrı
// ═══════════════════════════════════════════════════════
const turkish = {
  ...shared,
  lang: { S: "tr" },
  langStoryId: { S: "tr#boy-king-murder-mystery" },

  title: { S: "Çocuk Firavunun Ölüm Sırrı" },

  subtitle: {
    S: "Tutankhamun'u kim öldürdü — ve karısını kim sonsuza dek susturdu?",
  },

  excerpt: {
    S: "On dokuz yıl yaşadı, o kadar. Tanrıların yeryüzündeki gölgesi olması gereken genç bir firavun — sakalı bile çıkmadan öldü. Üç bin yıl kimse nedenini bilemedi; ta ki bilim tabutu bir kez daha açana kadar.",
  },

  moralOrLesson: {
    S: "İktidar güçsüzü susturur. Ama genç bir kraliçenin çaresiz mektupları binlerce yılı aşarak bize ulaştı — siyasetin acımasızlığına tanıklık olarak.",
  },

  paragraphs: makeParagraphs([
    // P1 — The hook
    "Tutankhamun sadece on dokuz yıl yaşadı. Milattan önce 1323 civarında, Antik Mısır'ın gücünün doruğunda, tanrıların yeryüzündeki temsilcisi sayılan genç firavun, yüzünde erkeklik belirtileri bile tam oturmadan hayata gözlerini yumdu. Altın lahdi kapandı; onunla birlikte ölüm nedeninin sırrı da kapandı. Üç bin yıl boyunca kimse bir cevap bulamadı — ta ki yirminci yüzyılda bilim insanları mumyasını röntgen ve tomografi cihazlarına sokana dek. Buldukları şey, tarihin en büyük cinayet soruşturmalarından birini başlattı.",

    // P2 — The skull, the suspects
    "1968'de çekilen röntgenlerde Tut'un kafatasının içinde kemik parçaları ve başının arkasında ağır bir darbeyi andıran bir iz ortaya çıktı — ancak acımasız bir elin savurduğu ağır bir cismin bırakacağı türden. Haber bomba etkisi yarattı. Şüpheli listesi de kendini yazdı: babası Akhenaton, Mısır'ı yerinden oynatmıştı — eski tanrıların hepsini kaldırıp herkesi tek bir tanrıya, güneş diski Aton'a tapmaya zorlamıştı. Dokuz yaşındaki Tut tahtı devraldığında, onunla birlikte onu ortadan kaldırmak için bin bir sebebi olan güçlü düşmanları da devraldı.",

    // P3 — Ay and Horemheb
    "İki isim listenin başındaydı. Birincisi: Ay — firavunun baş danışmanı, kurnaz bir siyaset tilkisi ve ne tesadüf, Tut gömüldüğü an tahta oturan adam. İkincisi: Horemheb — ordunun başkomutanı; Ay'dan sonra tahta geçti ve ardından buz gibi bir soğukkanlılıkla Tut'un, Ay'ın ve Akhenaton'un adını ülkedeki her tapınaktan, her anıttan kazıyıp sildi. İkisinin de aracı vardı, gerekçesi vardı, kurbana erişimi vardı.",

    // P4 — Ankhesenamun's letter
    "Ama bu hikâyenin en yürek burkan bölümü Tut'la değil, karısıyla ilgili. Firavunun ölümünden sonra genç kraliçe Ankhesenamun, kocasını öldürmüş olabileceğinden şüphelendiği adam Ay ile zorla evlendirilecekti. Bunun üzerine hiçbir Mısırlı kraliçenin yapmadığını yaptı: Mısır'ın en büyük düşmanı Hitit kralı Şuppiluliuma'ya mektup yazıp oğullarından birini koca olarak göndermesi için yalvardı. Kendi sözleri tarihin içinden bize ulaştı: «Kocam öldü, oğlum yok. Kullarımdan birini alıp kocam yapmayacağım. Korkuyorum.»",

    // P5 — The second letter, the murdered prince
    "Hitit kralı inanamadı — tuzak olduğunu düşündü. Durumu araştırmak için bir elçi gönderdi. Ankhesenamun bir kez daha yazdı; bu sefer kaybedecek hiçbir şeyi kalmamış birinin çaresizliğiyle: «Oğlum olsaydı, kendi onurumu ve ülkemin onurunu yabancı bir diyara yazar mıydım?» Kral ikna oldu. Oğlu Prens Zannanza'yı güneye, Mısır'a yolladı. Prens sınırda öldürüldü. Gelininin yüzünü hiç göremedi.",

    // P6 — Science overturns the theory
    "İşte tam burada hikâye tersine döner. 2005'te araştırmacılar mumyanın eksiksiz bir tomografisini çekti ve sonuçlar her şeyi alt üst etti. Kafatasındaki kemik parçaları? Büyük olasılıkla mumyalama işleminden kalmış, darbeden değil. Taramanın asıl ortaya çıkardığı şey: enfeksiyon kapmış ağır bir sol bacak kırığı ve DNA'sında sıtma izleri. Bilimin bugünkü en güçlü yanıtı şu: Tut'u insan eli öldürmedi — iltihaplı bir kırık, sıtma ve nesillerdir süren akraba evliliklerinin biriktirdiği genetik bozuklukların bir araya gelmesi öldürdü. Annesiyle babası kardeşti.",

    // P7 — The cover-up + proverb (Sabrın sonu selamettir)
    "«Sabrın sonu selamettir» derler. Ama Ankhesenamun için sabrın sonu selamet değil, sessizlik oldu. Birisi kraliçenin çığlığını yolda durdurdu. Birisi Hitit prensini sınırda öldürttü. Ve birisi Ankhesenamun'u, kocasının ölümünden en çok yararlanan adamla evlenmeye zorladı. Hastalık firavunu öldürmüş olabilir — ama siyasi örtbas tartışılmaz. Ay ile evlendikten sonra Ankhesenamun tarihten tamamen silindi. Mezarı yok. Kaydı yok. Adı her anıttan kazındı — sanki hiç var olmamış gibi.",
  ]),
};

// ─── Push each version ───
async function pushItem(label, item) {
  console.log(`\n⏳ Pushing ${label}...`);

  // Validate: check all required string fields are non-empty
  const requiredFields = [
    "title",
    "subtitle",
    "excerpt",
    "moralOrLesson",
    "lang",
    "langStoryId",
  ];
  for (const f of requiredFields) {
    if (!item[f] || !item[f].S || item[f].S.trim() === "") {
      throw new Error(`Validation failed: ${f} is empty for ${label}`);
    }
  }
  // Validate paragraphs
  const paras = item.paragraphs.L;
  if (paras.length < 6 || paras.length > 10) {
    throw new Error(
      `Validation failed: ${label} has ${paras.length} paragraphs (expected 6-10)`
    );
  }
  for (let i = 0; i < paras.length; i++) {
    const text = paras[i].M.text.S;
    if (!text || text.trim() === "") {
      throw new Error(
        `Validation failed: paragraph ${i + 1} is empty for ${label}`
      );
    }
    if (text.length > 600) {
      console.warn(
        `  ⚠️  Paragraph ${i + 1} is ${text.length} chars (limit ~500, tolerance 600)`
      );
    }
  }

  // Validate JSON round-trip
  const json = JSON.stringify(item);
  JSON.parse(json); // will throw if malformed
  console.log(
    `  ✓ JSON valid (${json.length} bytes, ${paras.length} paragraphs)`
  );

  const cmd = new PutItemCommand({ TableName: TABLE, Item: item });
  const result = await client.send(cmd);
  console.log(
    `  ✅ ${label} pushed successfully (HTTP ${result.$metadata.httpStatusCode})`
  );
  return result;
}

async function main() {
  console.log("═══════════════════════════════════════════════");
  console.log("  Pushing story translations to DynamoDB");
  console.log(`  Table: ${TABLE}`);
  console.log(`  Timestamp: ${NOW}`);
  console.log("═══════════════════════════════════════════════");

  try {
    await pushItem("Arabic (ar)", arabic);
    await pushItem("Persian (fa)", persian);
    await pushItem("Turkish (tr)", turkish);

    console.log("\n═══════════════════════════════════════════════");
    console.log("  ✅ All 3 translations pushed successfully!");
    console.log("═══════════════════════════════════════════════\n");
  } catch (err) {
    console.error("\n❌ Error:", err.message);
    process.exit(1);
  }
}

main();
