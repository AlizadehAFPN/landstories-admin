/**
 * Push "The Desert Lion Who Saved Rome" — Arabic, Persian, Turkish
 * Each version is recreated as a native-born story, NOT translated.
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client);

const TABLE = "Story";
const NOW = Math.floor(Date.now() / 1000);

// ── Shared fields (unchanged from English) ──────────────────────────────────

const shared = {
  siteId: "palmyra",
  storyId: "desert-lion-who-saved-rome",
  icon: "⚔️",
  tier: "S",
  source:
    "Historia Augusta, 'Life of Gallienus' and 'The Thirty Pretenders'; Zosimus, New History; Peter the Patrician, fragments; Shapur I, Res Gestae Divi Saporis (SKZ inscription, Naqsh-e Rostam); Lactantius, De Mortibus Persecutorum; Fergus Millar, The Roman Near East; Dodgeon and Lieu, The Roman Eastern Frontier and the Persian Wars (AD 226-363); Watson, Alaric, Aurelian and the Third Century",
  era: "260-267 AD (Crisis of the Third Century; Valerian's capture through Odaenathus's assassination)",
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  coordinates: { lat: 34.5505, lng: 38.2684 },
  hasAudio: false,
  disabled: false,
  isFree: true,
  storyCategory: "crowns_conquests",
  updatedAt: NOW,
};

// ═══════════════════════════════════════════════════════════════════════════════
// ARABIC (ar)
// ═══════════════════════════════════════════════════════════════════════════════

const ar = {
  ...shared,
  lang: "ar",
  langStoryId: "ar#desert-lion-who-saved-rome",

  title: "أسَدُ الصَّحراءِ الَّذي أنقَذَ روما",

  subtitle:
    "حِينَ أسَرَت فارِسُ إمبراطورَ روما حَيًّا وبَدَأَ نِصفُ الإمبراطوريَّةِ يَنهار، نَهَضَ أميرٌ عَرَبيٌّ مِن صَحراءِ سوريا وزَحَفَ حتّى أبوابِ عاصِمَةِ الفُرس — لِتُدَمِّرَهُ الإمبراطوريَّةُ الَّتي أنقَذَها",

  excerpt:
    "حِينَ رَمى شابورُ هَداياهُ في الفُرات وأمَرَهُ بالزَّحفِ على رُكبَتَيه، فَعَلَ أُذَينةُ أمرًا لَم يَتَوقَّعهُ أحَد: جَهَّزَ جَيشًا وسارَ إلى أبوابِ المَدائِن. مَرَّتَين.",

  characters: [
    "سبتيموس أُذَينة (حاكِمُ تَدمُرَ، مَلِكُ المُلوك)",
    "الإمبراطورُ فاليريانوس (أسَرَتهُ فارِسُ سَنَةَ ٢٦٠ م)",
    "شابورُ الأوَّل (الشاهَنشاه الساسانيّ)",
    "الإمبراطورُ غالينوس (مَنَحَ أُذَينةَ السُّلطَةَ على الشَّرق)",
    "حَيران (ابنُ أُذَينةَ البِكر، اغتيلَ مَعَه)",
    "مَعنيوس (القاتِل، ابنُ أخي أُذَينة)",
  ],

  paragraphs: [
    {
      text: "في سَنَةِ ٢٦٠ للميلاد، عاشَت روما أسوَأَ يَومٍ في ثَمانِمِئَةِ سَنَةٍ مِن عُمرِها. الإمبراطورُ فاليريانوس خَرَجَ بِجَيشِهِ شَرقًا لِيُواجِهَ شابورَ الأوَّلَ مَلِكَ الفُرس، فخَسِرَ المَعرَكَةَ وخَسِرَ نَفسَهُ. أُسِرَ حَيًّا قُربَ مَدينَةِ الرُّها — وهُوَ الإمبراطورُ الرومانيُّ الوَحيدُ الَّذي سَقَطَ أسيرًا بِيَدِ عَدُوٍّ أجنَبيّ. تَقولُ الرِّواياتُ إنَّ شابورَ كانَ يَصعَدُ على ظَهرِهِ كُلَّما أرادَ رُكوبَ حِصانِه. في تِلكَ اللَّحظَة، انكَشَفَ النِّصفُ الشَّرقيُّ بالكامِل، وبَدَأت أعظَمُ قُوَّةٍ عَرَفَها العالَمُ تَتَفكَّك.",
    },
    {
      text: "هُنا يَدخُلُ أُذَينة — واسمُهُ بالآراميَّة يَعني «الأُذُنُ الصَّغيرة». كانَ سَيِّدَ تَدمُرَ، تِلكَ المَدينَةِ الأُسطوريَّةِ في قَلبِ الصَّحراءِ السوريَّة، الجالِسَةِ على طُرُقِ التِّجارَةِ بَينَ روما وفارِس. لَم يَكُن قائِدًا رومانيًّا ولا والِيًا — بَل مَلِكًا عَرَبيًّا حَليفًا لِروما. لَكِنَّ فُرسانَهُ التَّدمُريّينَ — رُماةٌ على ظُهورِ الخَيلِ وفُرسانٌ مُدَرَّعون — كانوا مِن أشرَسِ مُقاتِلي العالَمِ القَديم. وكانَ على وَشكِ أن يُراهِنَ بِكُلِّ شَيءٍ يَملِكُه.",
    },
    {
      text: "جَرَّبَ أُذَينةُ الدبلوماسيَّةَ أوَّلًا. أرسَلَ إلى شابورَ قافِلَةً مُحَمَّلَةً بالذَّهَبِ والفِضَّةِ والتُّحَف — عَرضٌ واضِحٌ لِلحِوار. رَدُّ شابورَ كانَ غُرورًا خالِصًا: «مَن هَذا الأُذَينة الَّذي يَجرُؤُ أن يَكتُبَ لِسَيِّدِه؟ لِيَزحَف إلَيَّ مَكتوفَ اليَدَين!» ثُمَّ أمَرَ بإلقاءِ الهَدايا في نَهرِ الفُرات. كانَ خَطَأً مِن النَّوعِ الَّذي يُغَيِّرُ مَجرى التاريخ: بَدَلَ أن يُحَيِّدَ الرَّجُلَ الوَحيدَ القادِرَ على مُواجَهَتِه، صَنَعَ شابورُ ألَدَّ أعدائِه.",
    },
    {
      text: "فذَهَبَ أُذَينةُ إلى الحَرب. سَحَقَ أوَّلًا مُتَمَرِّدَينِ رومانِيَّينِ استَغَلّا الفَوضى واستَولَيا على السُّلطَة، لِيُثبِتَ وَلاءَهُ لِلإمبراطورِ الشَّرعيّ. ثُمَّ التَفَتَ شَرقًا بِفُرسانِ تَدمُرَ وحُلَفائِه، وفَعَلَ ما ظَنَّهُ الجَميعُ مُستَحيلًا: عَبَرَ الفُراتَ وزَحَفَ حتّى أسوارِ المَدائِن — عاصِمَةِ الفُرسِ قُربَ بَغدادَ اليَوم. وَصَلَ إلى أبوابِها، حَرَقَ ما حَولَها، وعادَ مُحَمَّلًا بالغَنائِم. ثُمَّ فَعَلَها مَرَّةً ثانِيَة.",
    },
    {
      text: "إمبراطورُ روما غالينوس، الغارِقُ في حُروبِهِ في الغَرب، فَعَلَ الشَّيءَ الذَّكِيّ: مَنَحَ أُذَينةَ لَقَبَ «حاكِمِ الشَّرقِ الرومانيِّ بِأكمَلِه». بَينَ لَيلَةٍ وضُحاها، أصبَحَ سَيِّدُ القَوافِلِ يَحكُمُ نِصفَ الإمبراطوريَّةِ رَسميًّا. لَكِنَّ اللَّقَبَ الَّذي مَنَحَهُ أُذَينةُ لِنَفسِهِ كانَ أجرَأ — نُقوشُ تَدمُرَ تُسَمّيهِ «مَلِكَ المُلوك»، وهُوَ اللَّقَبُ ذاتُهُ الَّذي حَمَلَهُ أباطِرَةُ فارِسَ مُنذُ كورُشَ الكَبير. الرَّجُلُ الَّذي أمَرَهُ شابورُ بالزَّحفِ صارَ يَدَّعي تاجَ شابورَ نَفسِه.",
    },
    {
      text: "انتَهى كُلُّ شَيءٍ في وَليمَةٍ سَنَةَ ٢٦٧. اغتيلَ أُذَينةُ وابنُهُ البِكرُ حَيران على يَدِ ابنِ أخيهِ مَعنيوس — الرِّوايَةُ الرَّسميَّة: خِلافٌ أثناءَ الصَّيد. لَكِنَّ السُّؤالَ الحَقيقيَّ: مَن المُستَفيدُ مِن مَقتَلِ الأبِ والوَريثِ في لَيلَةٍ واحِدَة؟ الجَوابُ: زَنوبيا، زَوجَةُ أُذَينةَ الثانِيَة، مَلِكَةٌ ذَكيَّةٌ ادَّعَت أنَّها مِن سُلالَةِ كليوباترا. بِرَحيلِ حَيران، صارَ طِفلُها الرَّضيعُ مَلِكًا وصارَت هِيَ الحاكِمَةُ الفِعليَّة. أمّا مَعنيوس فقُتِلَ فَورًا بَعدَها — ولَم يَسألهُ أحَدٌ قَطّ مَن أعطاهُ الأمر.",
    },
    {
      text: "هُنا ما يَبقى في الذاكِرَة. أُذَينةُ أفنى حَياتَهُ في إنقاذِ الإمبراطوريَّةِ الرومانيَّة. طَرَدَ الفُرسَ، حَمى الحُدودَ الشَّرقيَّة حِينَ عَجَزَ عَنها كُلُّ مَن سِواه، وكافَأتهُ روما بِكُلِّ لَقَبٍ وشَرَفٍ تَملِكُه. وبَعدَ عَقدٍ مِن مَوتِه، دَخَلَ جَيشٌ رومانيٌّ تَدمُرَ ودَمَّرَها تَدميرًا لَم تَقُم مِنهُ أبَدًا. يَقولونَ «اتَّقِ شَرَّ مَن أحسَنتَ إليه» — لَكِنَّ أحَدًا لَم يُخبِر أُذَينةَ أنَّ «مَن أحسَنتَ إليه» قَد تَكونُ إمبراطوريَّةً بِأكمَلِها. هَذا هُوَ العَقدُ الَّذي يَعرِضُهُ الأقوياءُ على مَن يَحتاجونَهم: امتِنانٌ بِتاريخِ صَلاحِيَّة.",
    },
  ],

  moralOrLesson:
    "مَن يُنقِذُ الإمبراطوريَّةَ لَيسَ دائِمًا الإمبراطور — أحيانًا يَكونُ أميرَ صَحراءَ اسمُهُ مَكتوبٌ بِحُروفٍ لا تَقرَؤها روما. وجَزاءُ مَن يُنقِذُ إمبراطوريَّةً أن تُدَمِّرَ تلكَ الإمبراطوريَّةُ مَدينَتَهُ في اللَّحظَةِ الَّتي لَم تَعُد تَحتاجُه.",
};

// ═══════════════════════════════════════════════════════════════════════════════
// PERSIAN (fa)
// ═══════════════════════════════════════════════════════════════════════════════

const fa = {
  ...shared,
  lang: "fa",
  langStoryId: "fa#desert-lion-who-saved-rome",

  title: "شیرِ بیابانی که روم را نجات داد",

  subtitle:
    "وقتی شاپورِ اول امپراتورِ روم را زنده اسیر کرد، شاهزاده‌ای از دلِ بیابانِ سوریه تا دروازه‌های تیسفون پیش رفت — اما امپراتوری‌ای که نجاتش داد، شهرش را ویران کرد",

  excerpt:
    "وقتی شاهِ ایران هدایایش را به فرات ریخت و گفت دست‌بسته بخزد، امیرِ تَدمُر کاری کرد که هیچ‌کس انتظارش را نداشت: لشکری جمع کرد و تا دروازه‌های پایتختِ ساسانی پیش رفت. دو بار.",

  characters: [
    "سِپتیمیوس اُذَینه (فرمانروای تَدمُر، شاهنشاه)",
    "امپراتور والِریان (اسیرِ ایران، ۲۶۰ میلادی)",
    "شاپورِ اول (شاهنشاهِ ساسانی)",
    "امپراتور گالینوس (که قدرتِ شرق را به اُذَینه سپرد)",
    "حَیران (پسرِ بزرگِ اُذَینه، در کنارِ او ترور شد)",
    "مَعنیوس (قاتل، برادرزادۀ اُذَینه)",
  ],

  paragraphs: [
    {
      text: "سالِ ۲۶۰ میلادی، روم ذلیل‌کننده‌ترین روزِ هشتصد سالۀ تاریخش را تجربه کرد. امپراتور والِریان به شرق لشکرکشی کرد تا با شاپورِ اول — شاهنشاهِ ساسانی — بجنگد. نه‌تنها جنگ را باخت، بلکه خودش هم اسیر شد. نزدیکِ اِدِسا در جنوبِ ترکیۀ امروز، تنها امپراتورِ رومیِ تاریخ بود که زنده به دستِ دشمن افتاد. روایت‌ها می‌گویند شاپور هر بار که سوارِ اسب می‌شد، پا روی پشتِ او می‌گذاشت. مرزهای شرقیِ روم بی‌دفاع مانده بود و بزرگ‌ترین امپراتوریِ جهان داشت از هم می‌پاشید.",
    },
    {
      text: "اینجاست که اُذَینه واردِ ماجرا می‌شود — اسمش به آرامی یعنی «گوشِ کوچک». سَروَرِ تَدمُر بود؛ شهری افسانه‌ای و سرشار از ثروت در دلِ بیابانِ سوریه، درست سرِ راهِ تجارتِ میانِ روم و ایران. نه فرماندۀ رومی بود، نه والی. یک شاهِ عربِ متحدِ روم بود که سواره‌نظامِ زره‌پوش و کمانداران سوارۀ تَدمُری‌اش از مرگبارترین جنگاورانِ دنیای باستان بودند. و داشت بزرگ‌ترین قمارِ زندگی‌اش را می‌زد.",
    },
    {
      text: "اُذَینه اول راهِ گفت‌وگو را امتحان کرد. کاروانی پُر از طلا و نقره و هدایای گران‌بها برای شاپور فرستاد — عملاً پیشنهادِ صلح. جوابِ شاپور تکبّرِ محض بود: «اُذَینه کیست که جرئت می‌کند برای سرورش نامه بنویسد؟ دست‌بسته بخزد و بیاید!» بعد دستور داد هدایا را به فرات بریزند. از آن اشتباهاتی بود که مسیرِ تاریخ را عوض می‌کند — به‌جای اینکه تنها مردی را که می‌توانست جلویش بایستد خنثی کند، شاپور بدترین دشمنش را با دستِ خودش ساخت.",
    },
    {
      text: "پس اُذَینه به جنگ رفت. اول دو شورشیِ رومی را که از هرج‌ومرج سوءاستفاده کرده بودند در هم کوبید تا وفاداری‌اش به امپراتورِ قانونی را ثابت کند. بعد رو به شرق چرخید، سواره‌نظامِ تَدمُر و متحدانش را جمع کرد، و کاری کرد که همه محال می‌دانستند: از فرات گذشت و تا دروازه‌های تیسفون — پایتختِ ساسانی نزدیکِ بغدادِ امروز — پیش رفت. رسید، اطراف را ویران کرد، و پُر از غنیمت برگشت. بعد یک بار دیگر همین کار را تکرار کرد.",
    },
    {
      text: "گالینوس، امپراتورِ روم که گرفتارِ جنگ‌های خودش در غرب بود، کارِ عاقلانه‌ای کرد: به اُذَینه لقبِ «فرمانروای تمامِ شرقِ روم» داد. یک‌شبه، سَروَرِ کاروان‌های بیابانی رسماً نصفِ امپراتوریِ روم را اداره می‌کرد. اما لقبی که اُذَینه به خودش داد از این هم جسورانه‌تر بود — کتیبه‌های تَدمُر او را «شاهنشاه» می‌خوانند. همان لقبی که از زمانِ کوروشِ بزرگ بر تاجِ شاهانِ ایران نشسته بود. مردی که شاپور گفته بود بخزد، حالا ادعای تاجِ خودِ شاپور را داشت.",
    },
    {
      text: "همه‌چیز سرِ یک ضیافت در سالِ ۲۶۷ تمام شد. اُذَینه و پسرِ بزرگش حَیران به دستِ برادرزاده‌شان مَعنیوس کشته شدند — ظاهراً به‌خاطرِ دعوایی سرِ شکار. اما سؤالِ واقعی این است: چه کسی از کشته‌شدنِ پدر و وارث در یک شب سود بُرد؟ جواب: زنوبیا. همسرِ دومِ اُذَینه، ملکه‌ای تیزهوش که ادعا داشت از نسلِ کلئوپاترا است. با رفتنِ حَیران، پسرِ شیرخواره‌اش پادشاه شد و قدرتِ واقعی به دستِ زنوبیا افتاد. مَعنیوس بلافاصله بعدش کشته شد. هیچ‌کس فرصت نکرد ازش بپرسد دستور را چه کسی داده بود.",
    },
    {
      text: "و حالا آنچه از این داستان در ذهن می‌ماند. اُذَینه عمرش را صرفِ نجاتِ امپراتوریِ روم کرد. ایران را عقب راند، مرزِ شرقی را نگه داشت وقتی هیچ‌کسِ دیگر توانش را نداشت، و روم هر لقب و افتخاری که در چنته داشت نثارش کرد. کمتر از ده سال بعد از مرگش، لشکرِ روم واردِ تَدمُر شد و شهر را چنان ویران کرد که دیگر هرگز سر بلند نکرد. می‌گویند «نمک بخوری و نمکدان بشکنی» بدترین ناسپاسی است — روم نمکِ تَدمُر را خورد و بعد نه نمکدان، بلکه تمامِ شهر را با خاک یکسان کرد. قدرتمندان به کسانی که به‌شان نیاز دارند همیشه یک جور معامله پیشنهاد می‌دهند: سپاسگزاری با تاریخِ انقضا.",
    },
  ],

  moralOrLesson:
    "کسی که امپراتوری را نجات می‌دهد همیشه امپراتور نیست — گاهی شاهزاده‌ای بیابانی است که نامش به خطی نوشته شده که روم نمی‌تواند بخواند. و پاداشِ نجاتِ یک امپراتوری این است که همان امپراتوری شهرت را لحظه‌ای که دیگر بهش نیاز نداشته باشد ویران کند.",
};

// ═══════════════════════════════════════════════════════════════════════════════
// TURKISH (tr)
// ═══════════════════════════════════════════════════════════════════════════════

const tr = {
  ...shared,
  lang: "tr",
  langStoryId: "tr#desert-lion-who-saved-rome",

  title: "Roma'yı Kurtaran Çöl Aslanı",

  subtitle:
    "Pers Kralı Roma imparatorunu canlı esir aldığında, Suriye çölünün ortasından bir Arap prensi çıktı ve Pers başkentinin kapılarına kadar ilerledi — ama kurtardığı imparatorluk, onun şehrini yerle bir etti",

  excerpt:
    "Pers kralı hediyelerini Fırat'a attırıp «Ellerini bağlayıp önümde sürünsün» dediğinde, Palmira'nın efendisi kimsenin beklemediği bir şey yaptı: bir ordu toplayıp Pers başkentinin kapılarına yürüdü. İki kez.",

  characters: [
    "Septimius Odaenathus (Palmira hâkimi, Kralların Kralı)",
    "İmparator Valerianus (Persler tarafından esir alındı, MS 260)",
    "I. Şapur (Sasani Şahlar Şahı)",
    "İmparator Gallienus (Odaenathus'a Doğu üzerinde yetki verdi)",
    "Hairan (Odaenathus'un büyük oğlu, babasıyla birlikte öldürüldü)",
    "Maeonius (suikastçi, Odaenathus'un yeğeni)",
  ],

  paragraphs: [
    {
      text: "Milattan sonra 260 yılında Roma, sekiz yüz yıllık tarihinin en utanç verici anını yaşadı. İmparator Valerianus ordusuyla doğuya yürüdü — Pers Kralı I. Şapur'la savaşacaktı. Savaşı kaybetmekle kalmadı, kendini de kaybetti. Bugünkü Şanlıurfa yakınlarındaki Edessa'da canlı esir düştü; tarihte düşman eline canlı geçen tek Roma imparatoruydu. Rivayete göre Şapur her ata binerken onun sırtına basıyordu. O an, imparatorluğun doğu yarısı savunmasız kaldı ve dünyanın en büyük gücü parçalanmaya başladı.",
    },
    {
      text: "İşte tam burada sahneye Odaenathus çıkıyor — Aramice adı Udhayna, «küçük kulak» demek. Palmira'nın hâkimiydi: Suriye çölünün ortasında, Roma ile Pers toprakları arasındaki ticaret yollarının tam üzerinde oturan, masallardaki gibi zengin bir kervan şehri. Ne Romalı bir generaldi ne bir vali. Roma'yla müttefik bir Arap kralıydı; ama Palmira'nın zırhlı süvarileri ve atlı okçuları antik dünyanın en ölümcül savaşçıları arasındaydı. Ve hayatının en büyük kumarını oynamak üzereydi.",
    },
    {
      text: "Odaenathus önce diplomasiyi denedi. Şapur'a altın, gümüş ve değerli hediyelerle dolu bir kervan gönderdi — açıkça bir diyalog teklifi. Şapur'un cevabı saf kibirdi: «Bu Odaenathus da kim oluyor ki efendisine yazmaya cüret ediyor? Elleri bağlı önümde sürünsün!» Ardından hediyelerin Fırat'a atılmasını emretti. Bu, tarihin akışını değiştiren türden bir hataydı. Karşısında durabilecek tek adamı etkisiz hale getirmek yerine, Şapur en amansız düşmanını kendi elleriyle yaratmıştı.",
    },
    {
      text: "Bunun üzerine Odaenathus savaşa girdi. Önce kaostan faydalanıp iktidarı ele geçiren iki Romalı isyancıyı ezdi — Roma'daki meşru imparatora bağlılığını kanıtladı. Sonra doğuya döndü, Palmira süvarilerini ve müttefik savaşçılarını topladı ve herkesin imkânsız dediği şeyi yaptı: Fırat'ı geçip bugünkü Bağdat yakınlarındaki Pers başkenti Ktesifon'a kadar ilerledi. Kapılara dayandı, etrafı yakıp yıktı, ganimetlerle geri döndü. Sonra aynı şeyi bir kez daha yaptı.",
    },
    {
      text: "Roma İmparatoru Gallienus batıda kendi savaşlarıyla boğuşurken akıllıca olanı yaptı: Odaenathus'a «Tüm Roma Doğusu'nun Valisi» unvanını verdi. Bir gecede, çöl kervanlarının efendisi resmen Roma İmparatorluğu'nun yarısını yönetiyordu. Ama Odaenathus'un kendine verdiği unvan daha da cesurdu — Palmira yazıtlarında «Kralların Kralı» olarak geçiyor; Büyük Kiros'tan beri Pers imparatorlarının taşıdığı unvanın ta kendisi. Şapur'un «Sürünsün» dediği adam, artık Şapur'un tacını talep ediyordu.",
    },
    {
      text: "Her şey 267 yılında bir ziyafette bitti. Odaenathus ve büyük oğlu Hairan, yeğeni Maeonius tarafından öldürüldü — resmi gerekçe, bir av sırasında çıkan tartışmaydı. Ama asıl soru şu: baba ve varisin aynı gece öldürülmesinden kim kârlı çıktı? Cevap: Zenobia. Odaenathus'un ikinci karısı, Kleopatra soyundan geldiğini iddia eden keskin zekalı bir kraliçe. Hairan aradan çıkınca bebek oğlu kral oldu ve gerçek iktidar Zenobia'nın eline geçti. Maeonius hemen ardından öldürüldü. Kimse ona emri kimin verdiğini soramadı.",
    },
    {
      text: "Ve işte bu hikâyede insanın aklından çıkmayan kısım: Odaenathus hayatını Roma İmparatorluğu'nu kurtarmaya adadı. Persleri geri sürdü, başka kimsenin tutamadığı doğu sınırını ayakta tuttu ve Roma ona verebileceği her unvanı, her onuru verdi. Ölümünden on yıl bile geçmeden bir Roma ordusu Palmira'ya girdi ve şehri bir daha asla toparlanamayacağı biçimde harabeye çevirdi. «Besle kargayı, oysun gözünü» derler — ama buradaki karga sadece göz oymakla kalmadı, bütün bir şehri yuttu. Güçlülerin işine yarayanlara sunduğu anlaşma hep aynıdır: son kullanma tarihi olan bir minnettarlık.",
    },
  ],

  moralOrLesson:
    "İmparatorluğu kurtaran her zaman imparator değildir — bazen Roma'nın okuyamadığı bir yazıyla adını yazan bir çöl prensidir. Ve bir imparatorluğu kurtarmanın ödülü, o imparatorluğun sana ihtiyacı kalmadığı an şehrini yerle bir etmesidir.",
};

// ═══════════════════════════════════════════════════════════════════════════════
// PUSH
// ═══════════════════════════════════════════════════════════════════════════════

async function pushStory(story, label) {
  // Transform paragraphs to DynamoDB format
  const item = {
    ...story,
    paragraphs: story.paragraphs.map((p) => ({ text: p.text })),
  };

  console.log(`\n━━━ Pushing ${label} ━━━`);
  console.log(`  langStoryId: ${story.langStoryId}`);
  console.log(`  title: ${story.title}`);
  console.log(`  paragraphs: ${story.paragraphs.length}`);
  console.log(`  updatedAt: ${story.updatedAt}`);

  // Validate: no undefined/null in text fields
  const textFields = ["title", "subtitle", "excerpt", "moralOrLesson"];
  for (const f of textFields) {
    if (!story[f]) throw new Error(`Missing ${f} in ${label}`);
  }
  for (let i = 0; i < story.paragraphs.length; i++) {
    if (!story.paragraphs[i].text)
      throw new Error(`Empty paragraph ${i} in ${label}`);
  }

  // Validate JSON serialization (catches encoding issues)
  const json = JSON.stringify(item);
  JSON.parse(json); // will throw if invalid
  console.log(`  JSON valid ✓  (${json.length} bytes)`);

  await docClient.send(
    new PutCommand({
      TableName: TABLE,
      Item: item,
      ConditionExpression:
        "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
    })
  );

  console.log(`  ✅ ${label} pushed successfully!`);
}

async function main() {
  console.log("Desert Lion Who Saved Rome — ar/fa/tr push");
  console.log(`Timestamp: ${NOW}`);

  try {
    await pushStory(ar, "Arabic (ar)");
    await pushStory(fa, "Persian (fa)");
    await pushStory(tr, "Turkish (tr)");
    console.log("\n✅ All 3 languages pushed successfully!");
  } catch (err) {
    console.error("\n❌ Error:", err.message);
    if (err.name === "ConditionalCheckFailedException") {
      console.error("   Record already exists. Use a different langStoryId or delete the existing record first.");
    }
    process.exit(1);
  }
}

main();
