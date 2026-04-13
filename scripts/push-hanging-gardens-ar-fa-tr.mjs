import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English) ───
const base = {
  siteId: "babylon",
  storyId: "hanging-gardens",
  icon: "\u{1F33F}",
  tier: "S",
  readingTimeMinutes: 3,
  image: "",
  disabled: false,
  thumbnail: "",
  coordinates: { lat: 32.5363, lng: 44.4209 },
  hasAudio: false,
  isFree: true,
  storyCategory: "love_heartbreak",
  source:
    "Josephus, Contra Apionem I.19 (quoting Berossus, Babyloniaca c. 290 BCE); Diodorus Siculus, Bibliotheca Historica II.10; Strabo, Geography XVI.1.5; Philo of Byzantium, De Septem Orbis Spectaculis; Dalley, Stephanie. The Mystery of the Hanging Garden of Babylon, Oxford University Press, 2013; Koldewey, Robert. The Excavations at Babylon, 1914; Finkel, Irving. The Ark Before Noah, Hodder & Stoughton, 2014; Reade, Julian. 'Alexander the Great and the Hanging Gardens of Babylon,' Iraq 62, 2000",
  era: "c. 600 BCE (traditional date); first written accounts c. 290 BCE; archaeological debate ongoing",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════
//  ARABIC — حدائقُ الهَواء
//  Proverb subverted: «ما بُنِيَ على باطلٍ فهو باطل»
//  (What is built on falsehood is falsehood —
//   subverted: a story built on gardens that might be a mirage
//   has survived twenty-six centuries)
// ═══════════════════════════════════════════════════════════════════
const ar = {
  ...base,
  lang: "ar",
  langStoryId: "ar#hanging-gardens",
  title: "حدائقُ الهَواء",
  subtitle:
    "الأُعجوبة الوحيدة في التاريخ القديم التي بُنِيَت من أجل الحُبّ — والوحيدة التي ربّما لم توجَد أصلاً",
  excerpt:
    "مِن بين عجائب الدنيا السبع القديمة، سِتٌّ حُسِمَ أمرُها. الهرم الأكبر لا يزال واقفاً. أطلال البقيّة عُثِرَ عليها. لكنّ حدائق بابل المُعلَّقة — الأُعجوبة الوحيدة التي يُقال إنّها بُنِيَت لا لإلهٍ ولا لمجدٍ، بل لامرأة — لم يُعثَر لها على أثر قَطّ.",
  moralOrLesson:
    "أجمل حديقة في التاريخ ربّما لم تكُن موجودة — أو ربّما كانت في مكان آخر تماماً، بناها ملك مختلف لأسباب لا علاقة لها بالحبّ. لكنّ القصة بقيت لأنها تُجيب عن سؤال أعمق ممّا يبلغه علم الآثار: هل يستطيع الحبّ أن يُزهر المستحيل؟ سواء كانت المُدرَّجات في بابل أو نينوى، سواء كانت أَميتيس حقيقية أو اختراع قرون لاحقة، تبقى الحدائق المُعلَّقة أقدم شاهد على أنّ الإنسان حين يُحبّ حقّاً لا يبني لنفسه — بل لمن لا يحتمل أن يراه حزيناً.",
  characters: [
    "نَبوخَذنَصَّر الثاني — الملك الذي يُقال إنه بنى الحدائق من أجل الحبّ",
    "أَميتيس الميدية — زوجته التي اشتاقت لجبال وطنها الخضراء",
    "بيروسوس — كاهن بابلي كتب أقدم رواية معروفة عن الحدائق (حوالي 290 ق.م)",
    "ستيفاني دالي — عالمة آشوريات من أكسفورد طرحت نظرية أنّ الحدائق كانت في نينوى",
    "روبرت كولدِفاي — عالم الآثار الذي اعتقد أنه عثر على أساسات الحدائق عام 1899",
  ],
  paragraphs: [
    {
      text: "مِن بين عجائب الدنيا السبع القديمة، سِتٌّ حُسِمَ أمرُها. الهرم الأكبر لا يزال واقفاً. أطلال البقيّة عُثِرَ عليها واحدةً تلو الأخرى. لكنّ حدائق بابل المُعلَّقة — الأُعجوبة الوحيدة التي يُقال إنّها لم تُبنَ لإلهٍ ولا لمجدٍ، بل لامرأةٍ أحبَّها مَلِك — لم يُعثَر لها على أثر. لا أساسات. لا جذور. لا حجرٌ واحد. أشهرُ حديقةٍ في تاريخ البشرية... قد لا تكون وُجِدَت أصلاً.",
    },
    {
      text: "الحكاية تبدأ حوالي عام 600 قبل الميلاد. نَبوخَذنَصَّر الثاني — أقوى ملوك الأرض آنذاك — تزوَّج أَميتيس، أميرةً من جبال ميديا في إيران اليوم. نشأت بين جداولَ باردة ووِديانٍ تشتعل خُضرةً بعد المطر. ثم انتقلت إلى بابل: سهلٌ مُنبسِط، حرارة خمسين درجة صيفاً، لا شيء إلّا نخيل وقنوات. اشتاقت لبلادها. فقرّر زوجُها — الرجل الذي أحرق هيكل القُدس ودمَّر ممالك — أن يبني لها جبلاً.",
    },
    {
      text: "تنافس الكُتّاب القدماء في وصفها. المؤرِّخ ديودوروس — الذي كتب بعد قرون — قال إنّ الحدائق امتدّت مئةً وعشرين متراً من كلّ جانب، وتصاعدت شُرفاتٍ يبلغ ارتفاعها عشرين متراً. كلّ طبقة مُعزَّلة بالقصب والطوب والرصاص، ثم مملوءة بتربة تكفي لأشجار كاملة النمو. المياه تُضَخّ من الفرات إلى القمة بنوعٍ من اللوالب، ثم تتدفّق عبر قنوات. كاتبٌ قديم وصفها: «ربيعٌ أبديّ، مُعلَّقٌ فوق رؤوس المارّين.»",
    },
    {
      text: "لكنّ المشكلة أنّ لا شيء من هذا يصمد أمام التدقيق. نَبوخَذنَصَّر ترك مئات النقوش عن مشاريعه: أسوار، بوّابات، معابد، قصور. لم يذكر حديقةً. ولا مرّة. المؤرِّخ هيرودوت زار بابل بعد قرنٍ ووصف المدينة بالتفصيل — لا أثر لحدائق. أقدم رواية كُتِبَت بعد وفاته بثلاثمئة سنة. وعالِمُ آثارٍ ألمانيّ حَفَرَ في بابل ثمانية عشر عاماً بدءاً من 1899 ولم يجد شيئاً. أشهرُ حديقة في التاريخ لم تترك أيّ أثر مادّي.",
    },
    {
      text: "في عام 2013، فجَّرت الباحثة البريطانية ستيفاني دالي مفاجأة. الحدائق كانت حقيقية — لكن ليست في بابل. كانت في نينوى، على بُعد 450 كيلومتراً شمالاً، بناها المَلِك الآشوريّ سَنحاريب قبل نَبوخَذنَصَّر بقرن. نقوشه تصف حدائق مُدرَّجة تُغذّيها لوالب مائية برونزية وقناة بطول ثمانين كيلومتراً من الجبال. ونقشٌ من قصره — محفوظ اليوم في المتحف البريطاني — يُظهر حدائق على أعمدة تُطابق الوصف القديم تماماً. الكُتّاب القدماء خلطوا بين المدينتين، هذا كلُّ ما في الأمر.",
    },
    {
      text: "حتى الاسم مُضلِّل. كلمة «مُعلَّقة» جاءت من اليونانية kremastos التي لا تعني مُتدلّية من سلاسل — بل مُتراكِبة، شُرفةٌ تنسكب فوق التي تحتها. تخيَّل تلالاً مُتدرِّجة من الأشجار والأزهار، كلّ طبقة تَسكُب خُضرتَها على حافة ما تحتها، والكلّ يرتفع من صحراء مُنبسِطة كأنه شيء لا ينبغي أن يكون. ليست حديقة في السماء. بل غابة تتنكَّر في هيئة جبل.",
    },
    {
      text: "يقولون: ما بُنِيَ على باطلٍ فهو باطل. لكنّ قصةً بُنِيَت على حدائقَ ربّما لم تكُن سوى سراب... صمدت ستةً وعشرين قرناً. ربّما الحدائق مدفونة تحت منسوب مياه بابل حيث لا يستطيع أحدٌ الحفر. ربّما في نينوى. ربّما لُفِّقَت من حكايات مسافرين ولم تكُن يوماً في مكان واحد. لكنّ ما لم يذبُل هو حكاية ملكٍ نظر إلى أعظم مدينة على الأرض وقال: هي حزينة — فحاول أن يرفع لها جبلاً. الحدائق اختفت. الحبّ لم يختفِ. وربّما تلك هي الأُعجوبة الحقيقية.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
//  PERSIAN — باغ‌هایی که گُم شدند
//  Proverb subverted: «این نیز بگذرد»
//  (This too shall pass — subverted: everything passed,
//   gardens, Babylon, empires. But the king's story?
//   Twenty-six centuries and counting.)
// ═══════════════════════════════════════════════════════════════════
const fa = {
  ...base,
  lang: "fa",
  langStoryId: "fa#hanging-gardens",
  title: "باغ\u200cهایی که گُم شدند",
  subtitle:
    "تنها عجایبی که می\u200cگویند برای عشق ساخته شد — و تنها عجایبی که شاید اصلاً وجود نداشته",
  excerpt:
    "از هفت عجایبِ دنیای باستان، شش\u200cتا تکلیفشان روشن است. هرمِ بزرگ سرپاست. ویرانه\u200cهای بقیه پیدا شده. اما باغ\u200cهای معلّقِ بابِل — تنها عجایبی که نه برای خدایی ساخته شد و نه برای شکوه، بلکه برای عشق — هرگز پیدا نشد. حتی یک آجر هم نه.",
  moralOrLesson:
    "زیباترین باغ تاریخ شاید هرگز وجود نداشته — یا شاید جایِ دیگری بوده، ساخته\u200cی پادشاهی دیگر به دلایلی که ربطی به عشق نداشته. اما داستانش مانده چون به پرسشی عمیق\u200cتر از دسترسِ باستان\u200cشناسی پاسخ می\u200cدهد: آیا عشق می\u200cتواند محال را به شکوفه بنشاند؟ چه تراس\u200cها در بابل بوده باشند چه در نینوا، چه ملکه آمیتیس واقعی بوده چه ساخته\u200cی ذهنِ قرن\u200cهای بعد، باغ\u200cهای معلّق قدیمی\u200cترین گواه این ایده\u200cاند که آدمی وقتی واقعاً عاشق باشد، بزرگ\u200cترین شاهکارش را نه برای خودش، بلکه برای کسی می\u200cسازد که تابِ غمش را ندارد.",
  characters: [
    "نَبوکَدنَصَّرِ دوم — پادشاهی که می\u200cگویند باغ\u200cها را از روی عشق ساخت",
    "آمیتیسِ مادی — همسرش که دلتنگِ کوه\u200cهای سبزِ وطنش بود",
    "بِروسوس — کاهنِ بابلی که قدیمی\u200cترین روایتِ شناخته\u200cشده را نوشت (حدود ۲۹۰ پیش از میلاد)",
    "استفانی دَلی — آشورشناسِ آکسفورد که نظریه داد باغ\u200cها در نینوا بوده\u200cاند",
    "روبرت کُلدوی — باستان\u200cشناسی که باور داشت در ۱۸۹۹ پِیِ باغ\u200cها را پیدا کرده",
  ],
  paragraphs: [
    {
      text: "از هفت عجایبِ دنیای باستان، شش\u200cتا تکلیفشان روشن است. هرمِ بزرگ هنوز سرپاست. ویرانه\u200cهای بقیه هم پیدا شده\u200cاند. اما باغ\u200cهای معلّقِ بابِل — تنها عجایبی که می\u200cگویند نه برای خدایی ساخته شد و نه برای شکوه، بلکه برای عشق — هرگز پیدا نشد. نه پِیِ بنایی. نه ریشه\u200cای. نه حتی یک آجر. مشهورترین باغ تاریخِ بشر... شاید اصلاً وجود نداشته.",
    },
    {
      text: "داستان از حوالی ۶۰۰ پیش از میلاد شروع می\u200cشود. نَبوکَدنَصَّرِ دوم — قدرتمندترین پادشاهِ روی زمین — با آمیتیس ازدواج کرد، شاهدختی از کوه\u200cهای ماد در غربِ ایرانِ امروز. آمیتیس بینِ چشمه\u200cهای خنک و دره\u200cهایی بزرگ شده بود که بعد از باران سبزِ سبز می\u200cشدند. بعد آمد بابِل: دشتِ صاف، گرمای پنجاه درجه، فقط نخل و کانال. دلتنگِ وطن شد. و شوهرش — مردی که معبدِ اورشلیم را آتش زده بود — تصمیم گرفت برایش یک کوه بسازد.",
    },
    {
      text: "نویسندگانِ باستان از هم سبقت می\u200cگرفتند در توصیفش. مورّخی به نامِ دیودوروس — که قرن\u200cها بعد می\u200cنوشت — گفت باغ\u200cها صد و بیست متر در صد و بیست متر بودند و پلّه\u200cپلّه تا بیست متر بالا می\u200cرفتند. هر طبقه با نی و آجر و سرب آب\u200cبندی شده بود و بعد پُر از خاک برای درختانِ کامل. آب از رودِ فرات با نوعی مارپیچ بالا فرستاده می\u200cشد و از کانال\u200cها سرازیر می\u200cشد. یکی نوشته بود: «بهاری جاودان، معلّق بالای سرِ رهگذران.»",
    },
    {
      text: "اما مشکل اینجاست: هیچ\u200cکدام ثابت نمی\u200cشود. نَبوکَدنَصَّر صدها کتیبه از پروژه\u200cهایش به جا گذاشت — دیوار، دروازه، معبد، کاخ. از باغ حرفی نزد. حتی یک بار. هرودوت یک قرن بعد به بابل رفت و شهر را با جزئیات توصیف کرد — از باغ خبری نبود. قدیمی\u200cترین روایت سیصد سال بعد از مرگش نوشته شد. و یک باستان\u200cشناسِ آلمانی هجده سال تمام در بابل حفاری کرد و هیچ پیدا نکرد. مشهورترین باغِ تاریخ، بدونِ یک رَدِّ فیزیکی.",
    },
    {
      text: "سالِ ۲۰۱۳، پژوهشگرِ بریتانیایی استفانی دَلی بمبش را ترکاند. باغ\u200cها واقعی بودند — فقط در بابل نبودند. در نینوا بودند، ۴۵۰ کیلومتر شمال\u200cتر، ساخته\u200cی سَنحاریبِ آشوری یک قرن پیش از نَبوکَدنَصَّر. کتیبه\u200cهایش باغ\u200cهایِ پلّکانی را توصیف می\u200cکنند که با مارپیچ\u200cهای برنزی و آبراهه\u200cای هشتاد کیلومتری از کوه\u200cها آبیاری می\u200cشدند. و یک نقشِ برجسته از کاخش — الان در موزه\u200cی بریتانیا — باغ\u200cهایی روی ستون نشان می\u200cدهد که با توصیفاتِ باستانی کاملاً جور درمی\u200cآید. نویسندگانِ قدیم فقط شهرها را قاطی کرده بودند.",
    },
    {
      text: "حتی اسمش گمراه\u200cکننده است. «معلّق» از کلمه\u200cی یونانیِ kremast\u00f3s آمده که یعنی آویزان از زنجیر نیست — یعنی سرریز، مثل پلّه\u200cای که روی پلّه\u200cی بعدی سرریز شود. یک تپّه\u200cی پلّکانی تصوّر کن پُر از درخت و گل، هر طبقه سبزی\u200cاش از لبه سرریز می\u200cشود روی طبقه\u200cی پایین\u200cتر، و همه\u200cاش از دلِ بیابانِ صاف بالا آمده، انگار چیزی که حقّ نداشته وجود داشته باشد. نه باغی در آسمان. بلکه جنگلی که ادایِ کوه را درمی\u200cآورد.",
    },
    {
      text: "می\u200cگویند این نیز بگذرد. باغ\u200cها گذشتند. بابل گذشت. امپراتوری\u200cها گذشتند. اما قصه\u200cی آن پادشاه؟ بیست و شش قرن است که نمی\u200cگذرد. شاید باغ\u200cها زیرِ آب\u200cهای زیرزمینیِ بابل مدفون\u200cاند، جایی که کسی نمی\u200cتواند حفاری کند. شاید در نینوا بودند. شاید از داستان\u200cهای مسافران سرِهم شده\u200cاند و هرگز در یک جا نبوده\u200cاند. اما چیزی که پژمرده نشده این است: داستانِ پادشاهی که به قدرتمندترین شهرِ روی زمین نگاه کرد و گفت — او غمگین است — و بعد سعی کرد برایش کوه بسازد. باغ\u200cها رفتند. قصه ماند. شاید عجایبِ واقعی همین باشد.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
//  TURKISH — Havada Kalan Bahçeler
//  Proverb subverted: «Bir fincan kahvenin kırk yıl hatırı vardır»
//  (A cup of coffee is remembered for forty years —
//   subverted: these gardens have been remembered
//   for twenty-six centuries.)
// ═══════════════════════════════════════════════════════════════════
const tr = {
  ...base,
  lang: "tr",
  langStoryId: "tr#hanging-gardens",
  title: "Havada Kalan Bah\u00e7eler",
  subtitle:
    "Antik d\u00fcnyan\u0131n a\u015fk u\u011fruna yap\u0131lan tek harikas\u0131 \u2014 ve belki de hi\u00e7 var olmam\u0131\u015f tek harikas\u0131",
  excerpt:
    "Antik d\u00fcnyan\u0131n yedi harikas\u0131ndan alt\u0131s\u0131n\u0131n hesab\u0131 belli. B\u00fcy\u00fck Piramit h\u00e2l\u00e2 ayakta. Di\u011ferlerinin kal\u0131nt\u0131lar\u0131 bulundu. Ama Babil\u2019in Asma Bah\u00e7eleri \u2014 ne bir tanr\u0131 ne de \u015fan i\u00e7in, s\u0131rf a\u015fk i\u00e7in yap\u0131ld\u0131\u011f\u0131 s\u00f6ylenen tek harika \u2014 hi\u00e7 bulunamad\u0131. Tek bir tu\u011fla bile yok.",
  moralOrLesson:
    "Tarihin en g\u00fczel bah\u00e7esi belki hi\u00e7 var olmad\u0131 \u2014 ya da bamba\u015fka bir yerde, ba\u015fka bir kral taraf\u0131ndan, a\u015fkla alakas\u0131 olmayan nedenlerle yap\u0131ld\u0131. Ama hik\u00e2ye ayakta kalmaya devam ediyor \u00e7\u00fcnk\u00fc arkeolojinin ula\u015famayaca\u011f\u0131 bir soruya cevap veriyor: A\u015fk, imk\u00e2ns\u0131z\u0131 bile \u00e7i\u00e7ek a\u00e7t\u0131rabilir mi? Teraslar Babil\u2019de miydi Ninova\u2019da m\u0131, Krali\u00e7e Amitis ger\u00e7ek miydi y\u00fczy\u0131llar sonra uydurulmu\u015f biri mi \u2014 fark etmez. Asma Bah\u00e7eler, insanl\u0131\u011f\u0131n en b\u00fcy\u00fck eserlerini kendileri i\u00e7in de\u011fil, mutsuz g\u00f6rmekten dayanamad\u0131klar\u0131 insanlar i\u00e7in yaratt\u0131\u011f\u0131 inanc\u0131n\u0131n en eski kan\u0131t\u0131 olmaya devam ediyor.",
  characters: [
    "Nebukadnezar II \u2014 bah\u00e7eleri a\u015fk\u0131 u\u011fruna yapt\u0131rd\u0131\u011f\u0131 s\u00f6ylenen kral",
    "Amitis \u2014 memleket hasreti \u00e7eken ve vatan\u0131n\u0131n ye\u015fil da\u011flar\u0131n\u0131 \u00f6zleyen krali\u00e7e",
    "Berossos \u2014 bilinen en eski kayd\u0131 yazan Babilli rahip (y. M\u00d6 290)",
    "Stephanie Dalley \u2014 bah\u00e7elerin asl\u0131nda Ninova\u2019da oldu\u011funu savunan Oxford Asurbilimci",
    "Robert Koldewey \u2014 1899\u2019da bah\u00e7elerin temelini buldu\u011funa inanan arkeolog",
  ],
  paragraphs: [
    {
      text: "Antik d\u00fcnyan\u0131n yedi harikas\u0131ndan alt\u0131s\u0131n\u0131n hesab\u0131 belli. B\u00fcy\u00fck Piramit h\u00e2l\u00e2 ayakta. Di\u011ferlerinin kal\u0131nt\u0131lar\u0131 tek tek bulundu. Ama Babil\u2019in Asma Bah\u00e7eleri \u2014 rivayete g\u00f6re ne bir tanr\u0131 i\u00e7in ne de \u015fan i\u00e7in, s\u0131rf a\u015fk i\u00e7in yap\u0131lan tek harika \u2014 hi\u00e7 bulunamad\u0131. Temel yok. K\u00f6k yok. Tek bir tu\u011fla bile yok. \u0130nsanl\u0131k tarihinin en \u00fcnl\u00fc bah\u00e7esi... belki de hi\u00e7 var olmad\u0131.",
    },
    {
      text: "Hik\u00e2ye \u015f\u00f6yle ba\u015fl\u0131yor. Milattan \u00f6nce 600 civar\u0131nda d\u00fcnyan\u0131n en g\u00fc\u00e7l\u00fc h\u00fck\u00fcmdar\u0131 Nebukadnezar, Medya da\u011flar\u0131ndan \u2014 bug\u00fcnk\u00fc \u0130ran\u2019dan \u2014 gelen Prenses Amitis\u2019le evlendi. Amitis serin dereler ve ya\u011fmurdan sonra yemye\u015file d\u00f6nen vadiler aras\u0131nda b\u00fcy\u00fcm\u00fc\u015ft\u00fc. Sonra Babil\u2019e geldi: d\u00fcmd\u00fcz ova, elli derecelik yazlar, hurma a\u011fa\u00e7lar\u0131ndan ve kanallardan ba\u015fka bir \u015fey yok. Memleket hasretine d\u00fc\u015ft\u00fc. Ve kocas\u0131 \u2014 uluslar\u0131 dize getirmi\u015f, Kud\u00fcs Tap\u0131na\u011f\u0131\u2019n\u0131 yakm\u0131\u015f bir adam \u2014 bunu \u00e7\u00f6zmeye karar verdi. Kar\u0131s\u0131na bir da\u011f in\u015fa edecekti.",
    },
    {
      text: "Antik yazarlar bu bah\u00e7eleri anlatmak i\u00e7in birbirleriyle yar\u0131\u015ft\u0131. Y\u00fczy\u0131llar sonra yazan tarih\u00e7i Diodoros, bah\u00e7elerin her kenar\u0131n\u0131n y\u00fcz yirmi metre oldu\u011funu ve yirmi metre y\u00fckselen teraslardan olu\u015ftu\u011funu s\u00f6yledi. Her katman saz, tu\u011fla ve kur\u015funla su ge\u00e7irmez h\u00e2le getirilmi\u015f, sonra yeti\u015fkin a\u011fa\u00e7lara yetecek toprakla doldurulmu\u015ftu. Su, F\u0131rat Nehri\u2019nden bir t\u00fcr vida d\u00fczene\u011fiyle tepeye \u00e7\u0131kar\u0131l\u0131yor ve kanallardan a\u015fa\u011f\u0131ya ak\u0131yordu. Bir yazar \u015f\u00f6yle demi\u015f: \u201cAlt\u0131ndan ge\u00e7enlerin ba\u015f\u0131n\u0131n \u00fcst\u00fcnde as\u0131l\u0131 duran sonsuz bir bahar.\u201d",
    },
    {
      text: "Sorun \u015fu: hi\u00e7biri tutmuyor. Nebukadnezar in\u015faat projelerini anlatan y\u00fczlerce yaz\u0131t b\u0131rakt\u0131 \u2014 surlar, kap\u0131lar, tap\u0131naklar, saraylar. Bah\u00e7eden tek kelime etmedi. Bir kez bile. Tarih\u00e7i Herodotos bir as\u0131r sonra Babil\u2019i ziyaret edip \u015fehri ayr\u0131nt\u0131s\u0131yla anlatt\u0131 \u2014 bah\u00e7elerden eser yok. En eski kay\u0131t, kral\u0131n \u00f6l\u00fcm\u00fcnden \u00fc\u00e7 y\u00fcz y\u0131l sonra yaz\u0131lm\u0131\u015f. Bir Alman arkeolog 1899\u2019dan itibaren on sekiz y\u0131l boyunca Babil\u2019i kazd\u0131 ve hi\u00e7bir \u015fey bulamad\u0131. Tarihin en \u00fcnl\u00fc bah\u00e7esi, tek bir fiziksel iz b\u0131rakmadan kaybolmu\u015f.",
    },
    {
      text: "2013\u2019te Oxford\u2019dan ara\u015ft\u0131rmac\u0131 Stephanie Dalley bombas\u0131n\u0131 patlatt\u0131. Bah\u00e7eler ger\u00e7ekmi\u015f \u2014 ama Babil\u2019de de\u011filmi\u015f. 450 kilometre kuzeyde, Ninova\u2019daym\u0131\u015f; Nebukadnezar\u2019dan bir as\u0131r \u00f6nce Asur Kral\u0131 Sanherib taraf\u0131ndan yapt\u0131r\u0131lm\u0131\u015f. Sanherib\u2019in yaz\u0131tlar\u0131, bronz su vidalar\u0131yla ve da\u011flardan gelen seksen kilometrelik bir su kemeriyle beslenen terasl\u0131 bah\u00e7eleri anlat\u0131yor. Saray\u0131ndan \u00e7\u0131kan bir kabartma \u2014 \u015fimdi British Museum\u2019da \u2014 s\u00fctunlar \u00fcst\u00fcnde bah\u00e7eler g\u00f6steriyor ve antik betimlemelerle birebir \u00f6rt\u00fc\u015f\u00fcyor. Dalley\u2019e g\u00f6re eski yazarlar \u015fehirleri kar\u0131\u015ft\u0131rm\u0131\u015f, hepsi bu.",
    },
    {
      text: "\u0130smi bile yan\u0131lt\u0131c\u0131. \u201cAsma\u201d s\u00f6zc\u00fc\u011f\u00fc Yunanca kremast\u00f3s\u2019tan geliyor ve zincirlerden sarkan anlam\u0131na de\u011fil, bir teras\u0131n di\u011ferinin \u00fcst\u00fcne ta\u015fmas\u0131 demek. D\u00fc\u015f\u00fcn\u00fcn: a\u011fa\u00e7lar ve \u00e7i\u00e7eklerle dolu basamakl\u0131 bir tepe, her kat\u0131n ye\u015filli\u011fi bir alt\u0131ndakinin kenar\u0131ndan ta\u015f\u0131yor, hepsi d\u00fcmd\u00fcz \u00e7\u00f6l\u00fcn ortas\u0131ndan var olmamas\u0131 gereken bir \u015fey gibi y\u00fckseliyor. G\u00f6kte s\u00fcz\u00fclen bir bah\u00e7e de\u011fil. Da\u011f taklidi yapan bir orman.",
    },
    {
      text: "Derler ki bir fincan kahvenin k\u0131rk y\u0131l hat\u0131r\u0131 vard\u0131r. Bu bah\u00e7elerin hat\u0131r\u0131 yirmi alt\u0131 y\u00fczy\u0131ld\u0131r s\u00fcr\u00fcyor. Belki Babil\u2019in yeralt\u0131 sular\u0131n\u0131n alt\u0131nda, kaz\u0131lamayacak bir yerde g\u00f6m\u00fcl\u00fcd\u00fcr. Belki Ninova\u2019dad\u0131r. Belki gezginlerin anlatt\u0131klar\u0131ndan derlenmi\u015f ve hi\u00e7bir zaman tek bir yerde var olmam\u0131\u015ft\u0131r. Ama yirmi alt\u0131 as\u0131rd\u0131r solmayan \u015fey, d\u00fcnyan\u0131n en g\u00fc\u00e7l\u00fc \u015fehrine bakan bir kral\u0131n \u201cO mutsuz\u201d deyip kar\u0131s\u0131 i\u00e7in da\u011f dikmeye kalkmas\u0131d\u0131r. Bah\u00e7eler kayboldu. A\u015fk hik\u00e2yesi kaybolmad\u0131. Belki de as\u0131l harika budur.",
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

  // Validate required fields
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
      console.error(`  \u274c ${label}: Record already exists! Skipping.`);
    } else {
      console.error(`  \u274c ${label} FAILED:`, err.message);
      throw err;
    }
  }
}

async function main() {
  console.log("\u2550".repeat(55));
  console.log("Hanging Gardens \u2014 ar / fa / tr push");
  console.log(`Timestamp: ${now}`);
  console.log("\u2550".repeat(55));

  await pushStory(ar, "ARABIC \u2014 \u062d\u062f\u0627\u0626\u0642\u064f \u0627\u0644\u0647\u064e\u0648\u0627\u0621");
  await pushStory(fa, "PERSIAN \u2014 \u0628\u0627\u063a\u200c\u0647\u0627\u06cc\u06cc \u06a9\u0647 \u06af\u064f\u0645 \u0634\u062f\u0646\u062f");
  await pushStory(tr, "TURKISH \u2014 Havada Kalan Bah\u00e7eler");

  console.log("\n\u2705 All three languages pushed successfully.");
}

main().catch((err) => {
  console.error("\n\ud83d\udca5 Fatal error:", err.message);
  process.exit(1);
});
