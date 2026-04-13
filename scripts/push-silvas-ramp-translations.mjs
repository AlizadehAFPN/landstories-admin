import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const docClient = DynamoDBDocumentClient.from(client);

const now = Math.floor(Date.now() / 1000);

// Shared fields (identical to English record)
const shared = {
  siteId: "masada",
  storyId: "silvas-ramp",
  storyCategory: "crowns_conquests",
  icon: "🛡️",
  tier: "A",
  image: "",
  thumbnail: "",
  disabled: false,
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 8,
  coordinates: { lat: 31.3156, lng: 35.3536 },
  era: "73 or 74 CE -- the siege lasted approximately two to seven months",
  source: "Josephus, Flavius. Bellum Judaicum, Book VII, chapters 275-406; Yadin, Yigael. Masada: Herod's Fortress and the Zealots' Last Stand, 1966; Richmond, I.A. 'The Roman Siege-Works of Masada, Israel,' Journal of Roman Studies 52, 1962; Roth, Jonathan. 'The Length of the Siege of Masada,' Scripta Classica Israelica 14, 1995; UNESCO World Heritage Nomination Dossier #1040, 2001",
  characters: [
    "Lucius Flavius Silva Nonius Bassus -- Roman governor of Judaea and commander of the siege",
    "Legio X Fretensis -- the Tenth Legion 'of the Strait,' Rome's instrument of destruction",
    "Eleazar ben Ya'ir -- leader of the Jewish defenders watching from the summit",
    "Thousands of Jewish prisoners of war -- forced to carry water and build the ramp",
  ],
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════
// ARABIC (ar)
// Proverb: الصَّبرُ مِفتاحُ الفَرَج (Patience is the key to relief)
// Subverted: صبر روما كان مِفتاح الهَلاك (Rome's patience was the key to ruin)
// ═══════════════════════════════════════════════════════════════
const arabic = {
  ...shared,
  lang: "ar",
  langStoryId: "ar#silvas-ramp",
  title: "حِصارُ الصَّبر",
  subtitle: "حين بَنَت روما أضخمَ مُنحَدَرٍ حربيٍّ في التاريخ لتَصِلَ إلى 960 شخصاً فوق جُرف — ولم تَجِد هناك سوى الصَّمت",
  excerpt: "لتَصِلَ إلى 960 متمرّداً على قمّةٍ مَنيعة، نَشَرَت روما فَيلَقَها الأقوى، وبَنَت ثمانية معسكرات، وأحاطت القلعةَ بسورٍ طولُهُ خمسة كيلومترات، وشيَّدت مُنحَدَراً حربيّاً ضخماً لا يزال قائماً بعد ألفَي سنة.",
  paragraphs: [
    {
      text: "في شتاء عام 73 ميلاديّاً، وَقَفَ قائدٌ رومانيٌّ اسمُهُ فلافيوس سيلفا عند سَفح صخرةٍ في صحراء يَهوذا ورَفَعَ رأسَهُ إلى الأعلى. فوقَهُ بأربعمئة متر، على هَضَبَةٍ مُسطَّحة اسمها مَسَعَدَة، تَحَصَّنَ تسعمئةٍ وستّون متمرّداً يهوديّاً في آخر قلعة لم تسقُط أمام روما. القُدسُ سَقَطَت قبل ثلاث سنوات. الهيكلُ الثاني — قلبُ العبادة اليهوديّة — احتَرَقَ حتّى لم يَبقَ منه شيء. كلُّ حِصنٍ آخرَ استَسلَم. إلّا هذه الصخرة.",
    },
    {
      text: "سيلفا لم يَستَعجِل. كان جنديّاً مُحترِفاً سيُصبِحُ لاحقاً قُنصُلاً — من أعلى المناصب في روما — وأدارَ هذا الحصار بصبرٍ مُرعِب. أوّلَ ما فَعَل: أغلَقَ الجبل. أمَرَ رجالَهُ ببناء سورٍ يُحيطُ بالقاعدة بأكملها، طولُهُ خمسة كيلومترات تقريباً، مع أبراج مراقبة وثمانية معسكرات مُحصَّنة. لا أحد يَدخُل ولا أحد يَخرُج. تلك المعسكرات لا تزال مرئيّةً من قمّة مَسَعَدَة اليوم — خطوطٌ محفورة في أرض الصحراء كأنّها جيشُ أشباحٍ تَجَمَّدَ في الحَجَر.",
    },
    {
      text: "ثمّ جاءَ السؤال الحقيقي: كيف تُصعِدُ جيشاً على جُرفٍ ارتفاعُهُ أربعمئة متر؟ الممرُّ الشرقيّ كان أضيَقَ من أن يَمُرَّ منه جنود. لكن على الجانب الغربيّ، كانت هناك حافّةٌ صخريّة طبيعيّة تبرُزُ على بُعد مئة متر تحت القمّة. قرَّرَ مهندسو سيلفا بناءَ مُنحَدَرٍ من تلك الحافّة حتّى السور — خمسةٌ وسبعون متراً من التراب المَدكوك والحجارة المَسحوقة والأخشاب، عريضاً بما يكفي لكَبش حصار. كان أحدَ أجرأ مشاريع البناء في تاريخ روما.",
    },
    {
      text: "هنا تَصيرُ القصّةُ مُظلِمة. العُمّالُ الذين كانوا يَسحَبون الحجارة على ذلك المُنحَدَر لم يكونوا جنوداً فقط — كانوا أسرى حرب يهوداً أُسِروا في معارك سابقة، ثمّ أُجبِروا على بناء السلاح الذي سيَقتُلُ بني جِلدَتِهم. المُدافعون كانوا يَرَونَهم من القمّة. وروما كانت تعرِفُ ذلك. بوضع العمّال اليهود في أكثر المواقع انكشافاً، ضَمِنَت ألّا يردَّ أحدٌ في الأعلى دون أن يَقتُلَ أبناء شعبِهِ. قسوةٌ مَحسوبة تَتَنَكَّر بزيّ الهندسة.",
    },
    {
      text: "على مدى أشهُر، زَحَفَ المُنحَدَر إلى الأعلى. في حرارة صحراء تتجاوزُ الأربعين درجة، والماءُ يُجلَبُ من ينابيعَ تبعُدُ عشرة كيلومترات، لم يتوقّف العمل يوماً واحداً. المُدافعون لم يملِكوا إلّا أن يُراقبوا. كلَّ صباحٍ المُنحَدَرُ أقرَب. كلَّ مساءٍ مُستقبَلُهم أقصَر. لا نجدةَ قادمة. فقط يقينٌ بطيءٌ طاحِنٌ بأنّ روما ستَصِل — لا بالسرعة ولا بالمُباغَتة، بل بالصبر المُرعِب. يقولون الصَّبرُ مِفتاحُ الفَرَج — لكنّ صبرَ روما كان مِفتاحَ الهَلاك.",
    },
    {
      text: "حين بَلَغَ المُنحَدَرُ السورَ، دَفَعَ سيلفا بُرجَ حصارٍ مُغلَّفاً بالحديد لصدّ السهام المُشتعِلة، وبدأ كَبشُ الحصار يَضرِب. السورُ الخارجيّ تَشقَّقَ وانهارَ. خلفَهُ كان المُدافعون قد حَشَوا تراباً بين أخشاب لتَمتصَّ ما لا يَمتصُّهُ الحَجَر. الكَبشُ ارتَدَّ. فأشعَلَ سيلفا النار. الريحُ تَحوَّلَت مرّةً نحو الرومان، ثمّ عادَت، فالتَهَمَت النيرانُ آخرَ حاجز. مع حلول الليل لم يَبقَ بين روما ومَسَعَدَة إلّا الهواء.",
    },
    {
      text: "عند الفجر اقتَحَمَ الفَيلَقُ العاشِرُ الثغرة. وَجَدوا صمتاً. حسبَ المؤرّخ يوسيفوس، اختارَ المُدافعون التسعمئة والستّون الموتَ بأيديهم على أن يَستَسلِموا لروما. سيلفا قَضى أشهُراً يَبني أحدَ أعظم أعمال الحصار في التاريخ، ونَشَرَ فَيلَقاً كاملاً، ونَقَلَ عشرات الآلاف من الأطنان — ليَصِلَ إلى أقلَّ من ألف شخص. وحين أوصَلَهُ المُنحَدَرُ إلى القمّة، لم يَجِد أحداً ليَغزوَه.",
    },
    {
      text: "ذلك المُنحَدَرُ لا يزالُ قائماً. ألفا سنةٍ من الرياح والسيول والزلازل لم تُسقِطهُ. مع المعسكرات وسور الحصار، يُشكِّلُ أكملَ منظومة حصار رومانيّة عُثِرَ عليها — أفضلَ حفظاً حتّى من أعمال قيصر الشهيرة في أَلِيزيا بفرنسا. تستطيعُ أن تمشيَ بجانبِهِ اليوم وتنظُرَ من القمّة وتَرى هَوَسَ إمبراطوريّة لا يزال محفوراً في أرض الصحراء. روما أنفَقَت لتُثبِتَ نقطةً أكثرَ ممّا كانت النقطةُ تستحقّ.",
    },
  ],
  moralOrLesson: "قوّةُ الإمبراطوريّة لا تُقاسُ فقط بما تستطيع تدميرَهُ، بل بالمدى الذي تذهبُ إليه لتَصِلَ إلى ما يتحدّاها. كان بإمكان روما أن تُدير ظهرَها لصخرةٍ في الصحراء. لكنّها بدلاً من ذلك نَقَلَت جبلاً لتُثبِتَ أنّ لا شيء — لا الجغرافيا ولا العزيمة ولا إرادة رجالٍ يائسين على حافّة جُرف — يمكن أن يبقى خارج قبضتِها. المُنحَدَر لا يزال هناك، شاهداً على أنّ الإمبراطوريّات تُنفِقُ لإثبات نقطةٍ أكثرَ ممّا تستحقُّهُ تلك النقطة.",
};

// ═══════════════════════════════════════════════════════════════
// PERSIAN (fa)
// Proverb: صبر تلخ است ولی بَرَش شیرین (Patience is bitter but its fruit is sweet)
// Subverted: صبر رُم تلخ بود و بارش تلخ‌تر (Rome's patience was bitter, its fruit more bitter still)
// ═══════════════════════════════════════════════════════════════
const persian = {
  ...shared,
  lang: "fa",
  langStoryId: "fa#silvas-ramp",
  title: "صبری که کوه شد",
  subtitle: "رُم برای رسیدن به ۹۶۰ نفر بالای یک صخره، بزرگ‌ترین سازه‌ی محاصره‌ی تاریخ را ساخت — و بالا که رسید، کسی منتظرش نبود",
  excerpt: "برای رسیدن به ۹۶۰ شورشی روی قلّه‌ای صعب‌العبور، رُم قوی‌ترین لشکرش را فرستاد، هشت پادگان ساخت، قلعه را با دیواری پنج کیلومتری محاصره کرد و رَمپی ساخت که هنوز پابرجاست.",
  paragraphs: [
    {
      text: "زمستان سال ۷۳ میلادی. یک ژنرال رومی به نام فلاویوس سیلوا پای صخره‌ای در بیابان یهودیه ایستاده بود و سر بالا کرده بود. چهارصد متر بالاتر، روی تخته‌سنگی صاف به نام مَسادا، ۹۶۰ شورشی یهودی آخرین دژی را نگه داشته بودند که هنوز جلوی رُم سر خم نکرده بود. اورشلیم سه سال پیش سقوط کرده بود. معبد دوم — قلب آیین یهود — تا خاکستر سوخته بود. هر پایگاه دیگری تسلیم شده بود. فقط این صخره مانده بود.",
    },
    {
      text: "سیلوا عجله‌ای نداشت. سرباز کارکشته‌ای بود که بعدها کنسول رُم شد — یکی از بالاترین مقام‌ها — و این محاصره را با صبری وحشتناک اداره کرد. اول از همه کوه را قفل کرد. دستور داد دیواری دور تا دور پایه‌ی صخره بکشند، تقریباً پنج کیلومتر، با برج‌های دیده‌بانی و هشت پادگان سنگربندی‌شده. نه کسی می‌توانست وارد شود، نه کسی بیرون برود. آن پادگان‌ها هنوز از بالای مَسادا پیدایند — خطوطی فشرده در خاک بیابان، انگار لشکر ارواحی که در سنگ یخ زده‌اند.",
    },
    {
      text: "حالا سؤال اصلی: چطور یک لشکر را از صخره‌ای چهارصدمتری بالا ببری؟ راه شرقی آن‌قدر باریک بود که سرباز از آن رد نمی‌شد. اما در سمت غربی یک لبه‌ی سنگی طبیعی بود که صد متر پایین‌تر از قلّه بیرون زده بود. مهندسان سیلوا تصمیم گرفتند از همان‌جا تا دیوار بالا رَمپ بزنند — هفتادوپنج متر خاک کوبیده، سنگ خُردشده و تیرچوب، آن‌قدر پهن که یک دیوارکوب از رویش رد بشود. یکی از بلندپروازانه‌ترین پروژه‌هایی بود که رُم تا آن روز به خودش دیده بود.",
    },
    {
      text: "اینجاست که داستان تیره می‌شود. کارگرهایی که سنگ بالا می‌بردند فقط سرباز نبودند — اسیران جنگی یهودی بودند که در نبردهای پیشین گرفتار شده بودند و حالا مجبورشان کرده بودند همان سلاحی را بسازند که هم‌کیشانشان را می‌کُشت. مدافعان از بالا تماشایشان می‌کردند. و رُم این را خوب می‌دانست. کارگران یهودی را در بی‌پناه‌ترین نقاط گذاشته بود تا مطمئن شود هیچ‌کس بالا نمی‌تواند جواب بدهد بی‌آنکه خودی‌هایش را بزند. بی‌رحمی حساب‌شده بود؛ فقط لباس مهندسی تنش بود.",
    },
    {
      text: "ماه‌ها گذشت و رَمپ بالا رفت. در گرمای بیابان که از چهل درجه رد می‌شد، با آبی که از ده کیلومتر آن‌طرف‌تر می‌آوردند، کار یک روز هم نایستاد. مدافعان فقط می‌توانستند نگاه کنند. هر صبح رَمپ یک ذرّه نزدیک‌تر. هر شب آینده‌شان یک ذرّه کوتاه‌تر. کمکی در راه نبود. فقط یقین سنگین و خُردکننده‌ای که رُم می‌رسد — نه با سرعت، نه با غافلگیری، بلکه با صبر محض. می‌گویند صبر تلخ است ولی بَرَش شیرین — صبر رُم اما تلخ بود و بارش از آن هم تلخ‌تر.",
    },
    {
      text: "وقتی رَمپ به دیوار رسید، سیلوا برج محاصره‌ای آهن‌پوش را جلو فرستاد تا تیرهای آتشین کارش نکند، و دیوارکوب شروع کرد به کوبیدن. دیوار بیرونی ترک برداشت و ریخت. پشتش مدافعان خاک را لای تیرچوب‌ها چپانده بودند تا ضربه را بخورد. دیوارکوب پس زده شد. سیلوا آتش زد. باد یک‌بار به سمت رومی‌ها چرخید. بعد برگشت — و آخرین سد سوخت و هیچ شد. وقتی شب رسید بین رُم و مَسادا فقط هوا مانده بود.",
    },
    {
      text: "سپیده‌دم، لشکر دهم از شکاف ریخت تو. سکوت بود. به روایت یوسِفوس تاریخ‌نگار، هر ۹۶۰ مدافع ترجیح داده بودند با دست خودشان بمیرند تا تسلیم رُم شوند. سیلوا ماه‌ها وقت صرف کرده بود، یکی از بزرگ‌ترین سازه‌های محاصره تاریخ را بالا برده بود، یک لشکر کامل را به کار گرفته بود، ده‌ها هزار تُن سنگ و خاک جابه‌جا کرده بود — همه برای کمتر از هزار نفر. و وقتی رَمپ او را به قلّه رساند، کسی نبود که فتح کند.",
    },
    {
      text: "آن رَمپ هنوز سر جایش ایستاده. دو هزار سال باد و سیل و زلزله نتوانسته خرابش کند. با پادگان‌ها و دیوار محاصره، کامل‌ترین مجموعه‌ی محاصره‌ی رومی است که تا امروز پیدا شده — حتی سالم‌تر از آثار سزار در آلِزیای فرانسه. امروز می‌توانی کنارش راه بروی، از قلّه پایین را نگاه کنی و وسواس یک امپراتوری را ببینی که در خاک بیابان حک شده. رُم برای اثبات یک حرف بیشتر خرج کرد از آنچه آن حرف می‌ارزید.",
    },
  ],
  moralOrLesson: "قدرت یک امپراتوری فقط به آنچه نابود می‌کند سنجیده نمی‌شود، بلکه به مسافتی که طی می‌کند تا به چیزی برسد که سر خم نکرده. رُم می‌توانست به صخره‌ای در بیابان پشت کند و برود. در عوض کوهی جابه‌جا کرد تا ثابت کند هیچ‌چیز — نه زمین، نه اراده، نه سرسختی آدم‌هایی که لب پرتگاه ایستاده‌اند — از دسترسش بیرون نیست. رَمپ هنوز آنجاست، گواه اینکه امپراتوری‌ها برای اثبات یک نکته بیشتر خرج می‌کنند از آنچه آن نکته ارزش دارد.",
};

// ═══════════════════════════════════════════════════════════════
// TURKISH (tr)
// Proverb: Sabreden derviş muradına ermiş (The patient dervish achieved his desire)
// Subverted: Roma sabretti — ama tepede murad değil, sessizlik bekliyordu
// ═══════════════════════════════════════════════════════════════
const turkish = {
  ...shared,
  lang: "tr",
  langStoryId: "tr#silvas-ramp",
  title: "Sabrın Bedeli",
  subtitle: "Roma, bir uçurumun tepesindeki 960 kişiye ulaşmak için tarihin en büyük kuşatma rampasını inşa etti — ve zirveye vardığında yalnızca sessizlik buldu",
  excerpt: "Sarp bir kayanın tepesindeki 960 isyancıya ulaşmak için Roma en güçlü lejyonunu gönderdi, sekiz kamp kurdu, kaleyi beş kilometrelik bir surla çevirdi ve iki bin yıl sonra hâlâ ayakta duran devasa bir kuşatma rampası inşa etti.",
  paragraphs: [
    {
      text: "Milattan sonra 73 yılının kışı. Flavius Silva adında bir Roma generali Yahudiye Çölü'ndeki bir uçurumun dibinde durmuş yukarı bakıyordu. Dört yüz metre tepesinde, Masada denilen düz tepeli bir kayanın üstünde 960 Yahudi isyancı Roma'ya boyun eğmeyen son kaleyi tutuyordu. Kudüs üç yıl önce düşmüştü. İkinci Tapınak — Yahudi ibadetinin kalbi — kül olmuştu. Her karargâh teslim olmuştu. Yalnız çöldeki bu kaya direniyordu.",
    },
    {
      text: "Silva acele etmedi. İleride konsül olacak — Roma'nın en üst makamlarından biri — deneyimli bir askerdi ve bu kuşatmayı ürkütücü bir sabırla yürüttü. İlk iş olarak dağı mühürledi. Askerlerine kayanın tabanını tamamen çevreleyen bir sur yaptırdı: yaklaşık beş kilometre uzunluğunda, gözetleme kuleleri ve sekiz tahkimli kampla donatılmış. Ne giren vardı ne çıkan. O kamplar bugün bile Masada'nın tepesinden görülüyor — çöl zeminine basılmış izler, sanki taşa dönmüş bir hayalet ordusu.",
    },
    {
      text: "Asıl sorun şuydu: dört yüz metrelik bir uçurumdan orduyu nasıl çıkarırsın? Doğu patikası asker geçiremeyecek kadar dardı. Ama batı tarafında, zirvenin yüz metre altında doğal bir kaya çıkıntısı vardı. Silva'nın mühendisleri oradan surlara kadar bir rampa yapmaya karar verdi — yetmiş beş metre sıkıştırılmış toprak, kırılmış taş ve kereste, bir koçbaşının geçebileceği genişlikte. Roma'nın o güne dek giriştiği en iddialı yapılardan biriydi.",
    },
    {
      text: "Hikâye tam burada karanlıklaşıyor. O yamacı tırmanan işçiler sadece asker değildi. Önceki savaşlarda ele geçirilmiş Yahudi savaş esirleriydi — kendi soydaşlarını öldürecek silahı elleriyle inşa etmeye zorlanmış insanlar. Tepedeki savunucular onları görüyordu. Roma da bunu gayet iyi biliyordu. Yahudi işçileri en açık, en korunaksız noktalara yerleştirerek yukarıdakilerin soydaşlarını öldürmeden karşılık veremeyeceğini garanti altına almıştı. Hesaplanmış bir vahşetti; üstüne mühendislik maskesi geçirilmişti.",
    },
    {
      text: "Aylar boyunca rampa yükseldi. Kırk dereceyi aşan çöl sıcağında, on kilometre ötedeki kaynaklardan su taşınarak iş bir gün bile durmadı. Savunucuların yapabileceği tek şey seyretmekti. Her sabah rampa biraz daha yakın. Her akşam gelecekleri biraz daha kısa. Yardım gelmeyecekti. Sadece Roma'nın er ya da geç ulaşacağının ağır, öğütücü kesinliği vardı — hızla değil, baskınla değil, sırf o korkunç sabırla. Sabreden derviş muradına ermiş, derler. Roma sabretti — ama tepede onu bekleyen murad değil, sessizlikti.",
    },
    {
      text: "Rampa surlara ulaşınca Silva ateşli okları savuşturmak için demirle kaplı kuşatma kulesini ileri sürdü; koçbaşı duvarı dövmeye başladı. Dış sur çatladı, yıkıldı. Arkasında savunucular taşın tutamayacağını bilerek keresteler arasına toprak sıkıştırmıştı. Koçbaşı geri sekti. Bunun üzerine Silva ateşe verdi. Rüzgâr bir an Romalılara doğru döndü. Sonra geri döndü — ve alevler son engeli yuttu. Gece çöktüğünde Roma ile Masada arasında havadan başka bir şey kalmamıştı.",
    },
    {
      text: "Şafakta Onuncu Lejyon gedikten içeri daldı. Sessizlik. Tarihçi Josephus'a göre 960 savunucu Roma'ya teslim olmaktansa kendi canlarına kıymayı seçmişti. Silva aylarca didinmişti. Tarihin en büyük kuşatma yapılarından birini dikmişti. Koskoca bir lejyonu seferber etmişti. On binlerce ton toprak ve taş taşıtmıştı — bin kişiden az bir grup için. Rampa onu zirveye taşıdığında fethedecek kimse kalmamıştı.",
    },
    {
      text: "O rampa hâlâ ayakta. İki bin yıllık rüzgâr, sel ve deprem onu yıkamadı. Kamplar ve kuşatma suruyla birlikte bugüne kadar bulunan en eksiksiz Roma kuşatma sistemi — hatta Fransa'daki Alesia'da Sezar'ın ünlü yapılarından bile daha iyi korunmuş. Bugün yanından yürüyebilir, zirveden aşağı bakabilir ve bir imparatorluğun takıntısını çöl toprağına kazınmış hâlde görebilirsiniz. Roma bir noktayı kanıtlamak için o noktanın değerinden çok daha fazlasını harcadı.",
    },
  ],
  moralOrLesson: "Bir imparatorluğun gücü yalnızca yıkabildiğiyle değil, kendisine kafa tutana ulaşmak için ne kadar ileri gideceğiyle ölçülür. Roma çöldeki bir kayaya sırtını dönüp gidebilirdi. Bunun yerine bir dağ taşıdı — ne coğrafyanın, ne kararlılığın, ne de bir uçurumun kenarında ölümüne direnen insanların iradesinin erişemeyeceği bir yer olmadığını kanıtlamak için. Rampa hâlâ orada; imparatorlukların bir mesaj vermek uğruna o mesajın değerinden fazlasını harcadığının kanıtı olarak.",
};

// ═══════════════════════════════════════════════════════════════
// PUSH TO DYNAMODB
// ═══════════════════════════════════════════════════════════════
async function pushStory(item, langLabel) {
  try {
    await docClient.send(
      new PutCommand({
        TableName: "Story",
        Item: item,
        ConditionExpression: "attribute_not_exists(siteId) OR lang = :lang",
        ExpressionAttributeValues: { ":lang": item.lang },
      })
    );
    console.log(`✓ ${langLabel} pushed successfully (langStoryId: ${item.langStoryId})`);
    return true;
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      // Record already exists with a different lang — shouldn't happen with our keys
      console.error(`✗ ${langLabel} FAILED: record already exists with different lang`);
    } else {
      console.error(`✗ ${langLabel} FAILED:`, err.message);
    }
    return false;
  }
}

// Validate JSON structure before pushing
function validate(item, label) {
  const errors = [];
  if (!item.siteId) errors.push("missing siteId");
  if (!item.langStoryId) errors.push("missing langStoryId");
  if (!item.lang) errors.push("missing lang");
  if (!item.title) errors.push("missing title");
  if (!item.subtitle) errors.push("missing subtitle");
  if (!item.excerpt) errors.push("missing excerpt");
  if (!item.moralOrLesson) errors.push("missing moralOrLesson");
  if (!item.paragraphs || !Array.isArray(item.paragraphs)) errors.push("missing/invalid paragraphs");
  else {
    item.paragraphs.forEach((p, i) => {
      if (!p.text || typeof p.text !== "string") errors.push(`paragraph ${i}: missing text`);
      if (p.text && p.text.length > 600) errors.push(`paragraph ${i}: text too long (${p.text.length} chars)`);
    });
  }
  if (errors.length > 0) {
    console.error(`✗ ${label} validation FAILED:`, errors.join(", "));
    return false;
  }
  console.log(`✓ ${label} validation passed (${item.paragraphs.length} paragraphs)`);
  return true;
}

async function main() {
  console.log("=== Validating all language versions ===\n");
  const arOk = validate(arabic, "Arabic (ar)");
  const faOk = validate(persian, "Persian (fa)");
  const trOk = validate(turkish, "Turkish (tr)");

  if (!arOk || !faOk || !trOk) {
    console.error("\nValidation failed. Aborting.");
    process.exit(1);
  }

  // Print character stats
  for (const [label, item] of [["Arabic", arabic], ["Persian", persian], ["Turkish", turkish]]) {
    const totalChars = item.paragraphs.reduce((sum, p) => sum + p.text.length, 0);
    console.log(`\n${label}: ${item.paragraphs.length} paragraphs, ${totalChars} total chars`);
    item.paragraphs.forEach((p, i) => {
      const words = p.text.split(/\s+/).length;
      console.log(`  p${i + 1}: ${p.text.length} chars, ~${words} words`);
    });
  }

  console.log("\n=== Pushing to DynamoDB ===\n");

  const arResult = await pushStory(arabic, "Arabic (ar)");
  if (!arResult) { console.error("Arabic push failed. Stopping."); process.exit(1); }

  const faResult = await pushStory(persian, "Persian (fa)");
  if (!faResult) { console.error("Persian push failed. Stopping."); process.exit(1); }

  const trResult = await pushStory(turkish, "Turkish (tr)");
  if (!trResult) { console.error("Turkish push failed. Stopping."); process.exit(1); }

  console.log("\n=== All 3 versions pushed successfully ===");
}

main();
