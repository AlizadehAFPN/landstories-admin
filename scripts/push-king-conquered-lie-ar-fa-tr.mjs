import { readFileSync } from 'node:fs';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

// Load .env.local
const env = {};
for (const line of readFileSync('.env.local', 'utf-8').split('\n')) {
  const idx = line.indexOf('=');
  if (idx > 0) env[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
}

const client = new DynamoDBClient({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE = env.DYNAMO_TABLE_STORY || 'Story';
const now = Math.floor(Date.now() / 1000);

// ─── Non-text fields (identical across all languages) ───
const base = {
  siteId: 'persepolis',
  storyId: 'king-who-conquered-the-lie',
  icon: '⚔️',
  tier: 'S',
  source: "The Behistun Inscription (DB), Old Persian text translated in Kent, R.G., Old Persian: Grammar, Texts, Lexicon (1953); Herodotus, Histories III.61-88; Briant, Pierre, From Cyrus to Alexander (2002); Waters, Matt, Ancient Persia: A Concise History (2014); Hallock, R.T., Persepolis Fortification Tablets (1969)",
  characters: [
    'Darius I (the Great)',
    'Gaumata / Bardiya (the disputed king)',
    'Otanes, Gobryas, and the six co-conspirators',
    'Atossa (daughter of Cyrus the Great)',
    'Henry Rawlinson (decipherer)',
  ],
  era: '522–518 BCE (Darius\'s rise); 1835–1847 (decipherment of Behistun)',
  readingTimeMinutes: 4,
  image: '',
  disabled: false,
  thumbnail: '',
  coordinates: { lng: 52.8914, lat: 29.9342 },
  hasAudio: false,
  isFree: true,
  storyCategory: 'crowns_conquests',
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════
//  ARABIC — "المَلِكُ الذي قَهَرَ الكَذِب"
//  Proverb: «حبلُ الكَذِب قصير»
//    (The rope of lies is short)
//  Subversion: Darius's rope was long enough to wrap around
//    the neck of an entire empire.
//  Register: Gripping modern MSA storyteller — vivid, dramatic,
//    like a skilled hakawati with a history degree
// ═══════════════════════════════════════════════════════════════
const ar = {
  lang: 'ar',
  langStoryId: 'ar#king-who-conquered-the-lie',

  title: 'المَلِكُ الذي قَهَرَ الكَذِب',

  subtitle: 'رجلٌ جعلَ الحقيقةَ أعلى مبادئ مُلكِه... وربّما بنى ذلك المُلك على أكبرِ كذبةٍ في التاريخ',

  excerpt: 'في عام ٥٢٢ قبل الميلاد، اقتحم سبعةُ فُرسانٍ فارسيّين حِصنًا وقتلوا الرجل الجالسَ على عرشِ أعظم إمبراطوريّة عرفها العالم. القاتل الذي خرج من تلك الغرفة سيبني بِرسبوليس — ويَنحِتُ في الصخر أكبر كذبةٍ عرفها التاريخ.',

  moralOrLesson: 'الرجلُ الذي جعل «الحقيقة» أعلى مبدأ في إمبراطوريّته ربّما بنى تلك الإمبراطوريّة على أنجح كذبة في التاريخ — والحضارة التي أقامها على هذا التناقض صمدت قرنين، ومدّت طرقًا ربطت قارّات، ودفعت لعمّالها بعدل، وأنتجت فنًّا يتجاوز الزمن. أحيانًا... أعظم الحقائق تولد من أجرأ الأكاذيب.',

  paragraphs: [
    {
      text: 'في سنة ٥٢٢ قبل الميلاد، كانت فارس تحكم العالم — من صحارى ليبيا إلى سهول الهند. أكبر إمبراطوريّة رآها البشر. ملكُها بَرْدِيا، ابنُ قورش الكبير، كان قد ألغى الضرائب عن الجميع، فأحبّه الناس. ثمّ في ليلةٍ واحدة، تسلّل سبعة نبلاءٍ إلى حِصنه. في الظلام، طرح أحدهم الملكَ أرضًا بينما وقف داريوس مُترددًا — يخشى أن يطعنَ رفيقه بالخطأ. صرخ الرجل الذي يُمسك بالملك: «اطعنْ! حتّى لو أصبتَنا معًا!» فغرز داريوس نصلَه. قطعوا رأس الملك ورفعوه للحشود.',
    },
    {
      text: 'لم يكن داريوس وريثًا — مجرّد نبيلٍ صغير لم يخطر ببال أحدٍ للعرش. لكنّ ما فعله بعدها غيّر وجه التاريخ. على جُرفٍ صخريّ في جبال زاغروس، على ارتفاع مئة متر فوق طريقٍ قديم، نَحَتَ أضخمَ نقشٍ ملكيّ عرفه العالم — بثلاث لغات. وفيه... أعاد كتابة الحقيقة. الرجل الذي قتلوه لم يكن بَرْدِيا الحقيقيّ. الأمير الحقيقيّ قُتِل سرًّا قبلها بأشهر. كاهنٌ محتال اسمه غوماتا انتحلَ شخصيّتَه وسرقَ العرش. أمّا داريوس — مُختار الإله — فجاء ليُعيدَ الحقّ إلى نصابه.',
    },
    {
      text: 'المشكلة؟ لا يكاد مؤرّخٌ معاصر يُصدّقه. داريوس هو المصدر الوحيد لقصّته. الإمبراطوريّة بأسرها — بما فيها مَن عرفوا بَرْدِيا شخصيًّا — قبلته ملكًا حقيقيًّا. إلغاء الضرائب منطقيٌّ من حاكمٍ واثق، لا من محتالٍ مذعور. وبعد الانقلاب، تزوّج داريوس ابنةَ قورش وابنةَ بَرْدِيا — وهذه خطوة مَن يبتلع سلالةً حاكمة، لا مَن يُعيدها. كبار المؤرّخين يقولونها صراحةً: قتلَ الملكَ الشرعيّ واختلقَ القصّة من أوّلها.',
    },
    {
      text: 'يقولون «حبلُ الكَذِب قصير» — لكنّ حبلَ داريوس كان طويلًا بما يكفي ليلتفّ حول رقبة إمبراطوريّة بأكملها. الناس لم يبتلعوا الرواية. تسعَ عشرةَ ثورةً اشتعلت في عامٍ واحد. رجلٌ آخر ادّعى أنّه بَرْدِيا — لتعرفَ كم فارسيًّا كان يعلم أنّ داريوس كاذب. سحقهم جميعًا بلا رحمة. أحد المتمرّدين جُدِعَ أنفُه وأُذناه ولسانه، وفُقِئت عينُه، ثمّ خُوزِقَ حيًّا أمام الملأ. والرسالة واحدة: هؤلاء اتّبعوا «الكَذِب» — عدوّ الحقيقة في الدين الفارسيّ. تُعارض داريوس؟ أنت تُعارض الإله.',
    },
    {
      text: 'ثمّ — بعد أن انتصرَ بالدم والدعاية — بنى واحدةً من أرقى الحضارات في التاريخ. في بِرسبوليس، كان العمّال من عشرات الأمم يتقاضَون أجورًا حقيقيّة — لا عبيدًا. النساء حصلن على أجرٍ مُساوٍ. الحوامل نِلنَ حصصًا إضافيّة. طرقُه كانت سريعةً لدرجة أنّ المؤرّخ هيرودوت كتب: «لا ثلجٌ ولا مطرٌ ولا حرٌّ ولا ظلامُ ليلٍ» يُبطئ رُسُلَه. بعد أربعةٍ وعشرين قرنًا، اتّخذ البريد الأمريكيّ هذه العبارة شعارًا له. الكاذبُ بنى شيئًا يستحقّ أن تُؤمنَ به.',
    },
    {
      text: 'ظلّ النقشُ غامضًا ألفَي عام — إلى أن جاء ضابطٌ بريطانيّ اسمه هنري رولينسون عام ١٨٣٥. تسلّق الجُرف ونسخ الرموز بيدٍ واحدة، متدلّيًا من سُلّمٍ على حافة الهاوية. ودلّى صبيًّا كُرديًّا بالحبال ليصل إلى الأجزاء الأبعد. استغرق الأمر اثني عشرَ عامًا. حين فكّ الشيفرة، فُتِحت أبوابُ حضارات ما بين النهرين كلّها — ما فعله حجر رشيد للهيروغليفيّة فعله نقش بيستون للخطّ المسماريّ. بعد ألفَي سنة من الصمت، عاد داريوس يتكلّم.',
    },
    {
      text: 'واليوم، ما زال واقفًا — محفورًا في الصخر، قدمُه على ظهر عدوّه، تسعة ملوكٍ متمرّدين مُقيّدين أمامه. وبِرسبوليس ما زالت تنتصب من سهول إيران، أعمدتُها تمتدّ نحو السماء التي قال داريوس إنّ إلهَه خلقها. والمفارقة بلا جوابٍ نظيف: قاتلٌ نصّب نفسه حاميَ الحقيقة، دعائيٌّ بنى ما يستحقّ الإيمان، رجلٌ أسّس أعظم إمبراطوريّة في العالم على أكبر كذبة — ثمّ قضى عمره يجعل تلك الكذبة حقيقة.',
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
//  PERSIAN — "شاهی که دروغ را شکست داد"
//  Proverb: «دروغِ مصلحت‌آمیز بِه از راستِ فتنه‌انگیز»
//    (A beneficial lie is better than a truth that causes strife — Sa'adi)
//  Subversion: Darius took this principle to the edge of madness.
//  Register: Intimate modern Persian storyteller — this is IRAN's own
//    history, so the tone carries personal weight and national pride
// ═══════════════════════════════════════════════════════════════
const fa = {
  lang: 'fa',
  langStoryId: 'fa#king-who-conquered-the-lie',

  title: 'شاهی که دروغ را شکست داد',

  subtitle: 'مردی که «راستی» را بالاترین اصلِ شاهنشاهی‌اش کرد... شاید همان شاهنشاهی را بر بزرگ‌ترین دروغِ تاریخ بنا نهاد',

  excerpt: 'سال ۵۲۲ پیش از میلاد. هفت سوارِ ایرانی به دژی تاختند و مردی را کشتند که بر تختِ بزرگ‌ترین شاهنشاهیِ جهان نشسته بود. قاتلی که از آن اتاقِ خونین بیرون آمد، تخت جمشید را ساخت — و بزرگ‌ترین دروغِ تاریخ را در سنگ حک کرد.',

  moralOrLesson: 'مردی که «راستی» را بالاترین اصلِ شاهنشاهی‌اش کرد، شاید آن شاهنشاهی را بر موفق‌ترین دروغِ تاریخ بنا نهاد — و تمدنی که بر این تناقض ساخت، دو قرن دوام آورد، جاده‌هایی کشید که قاره‌ها را به هم وصل کرد، به کارگرانش منصفانه مزد داد، و هنری آفرید که از زمان فراتر رفت. گاهی... بزرگ‌ترین حقیقت‌ها از جسورانه‌ترین دروغ‌ها زاده می‌شوند.',

  paragraphs: [
    {
      text: 'سال ۵۲۲ پیش از میلاد، شاهنشاهیِ ایران از لیبی تا هندوستان گسترده بود — بزرگ‌ترین دولتی که تا آن روز بشر دیده بود. پادشاهش بَردیا، پسرِ کوروش بزرگ، مالیات را برای همه لغو کرده بود و مردم دوستش داشتند. آن‌وقت یک شب، هفت نجیب‌زاده به دژش یورش بردند. در تاریکی، یکی‌شان شاه را بر زمین کوبید. داریوش ایستاده بود و جرأت نمی‌کرد خنجر بزند — می‌ترسید یارِ خودش را بزند. مردی که شاه را نگه داشته بود فریاد زد: «بزن! حتی اگر هر دومان را بزنی!» داریوش خنجر را فرو کرد. سرِ شاه را بریدند و بالا گرفتند.',
    },
    {
      text: 'داریوش وارث نبود — یک نجیب‌زادۀ کم‌اهمیت که هیچ‌کس خوابِ پادشاهی‌اش را هم نمی‌دید. اما کاری که بعدش کرد، تاریخ را عوض کرد. بر صخره‌ای سربه‌فلک‌کشیده در کوه‌های زاگرس، صد متر بالاتر از جاده‌ای باستانی، بزرگ‌ترین کتیبۀ شاهانه‌ای را تراشید که جهان دیده بود — به سه زبان. و در آن... واقعیت را از نو نوشت. آن مردی که کشتند؟ بَردیایِ واقعی نبود. شاهزادۀ واقعی ماه‌ها پیش در خفا کشته شده بود. مُغی دروغین به نام گَئوماتا جایش را گرفته و تخت را دزدیده بود. و داریوش — برگزیدۀ اهورامزدا — آمده بود تا راستی را بازگرداند.',
    },
    {
      text: 'مشکل اینجاست: تقریباً هیچ مورخِ امروزی حرفش را باور ندارد. داریوش تنها منبعِ داستانِ خودش است. کل شاهنشاهی — از جمله کسانی که بَردیا را شخصاً می‌شناختند — او را شاهِ واقعی قبول کرده بود. لغو مالیات از یک حاکمِ واقعی منطقی‌ست، نه از یک شیّاد وحشت‌زده. و بعد از کودتا، داریوش دخترِ کوروش و دخترِ بَردیا را به زنی گرفت — این کارِ کسی‌ست که یک دودمان را می‌بلعد، نه کسی که آن را بازمی‌گرداند. بزرگ‌ترین مورّخان رُک می‌گویند: شاهِ واقعی را کشت و داستان را از اول ساخت.',
    },
    {
      text: 'می‌گویند «دروغِ مصلحت‌آمیز بِه از راستِ فتنه‌انگیز» — داریوش این اصل را تا سرحدّ جنون پیش بُرد. مردم باور نکردند. نوزده شورش در یک سال. مردی دیگر ادعا کرد که بَردیاست — که نشان می‌دهد چند ایرانی داریوش را دروغگو می‌دانستند. همه را درهم شکست. بی‌رحمانه. یکی از شورشیان را بینی و گوش و زبانش بریدند، یک چشمش را درآوردند و زنده بر نیزه‌اش کردند — جلوِ چشمِ همه. و پیامش همیشه یکی بود: اینها پیروِ «دروغ»اند — دشمنِ مقدسِ «راستی» در آیینِ زرتشت. با داریوش مخالفی؟ با اهورامزدا مخالفی.',
    },
    {
      text: 'بعد — وقتی با خون و تبلیغات پیروز شد — یکی از پیشرفته‌ترین تمدن‌های تاریخ را ساخت. در تخت جمشید، کارگران از ده‌ها ملت دستمزدِ واقعی می‌گرفتند — برده نبودند. زنان مزدِ برابر داشتند. زنانِ باردار جیرۀ اضافی می‌گرفتند. جاده‌هایش آن‌قدر سریع بودند که هرودوت نوشت: «نه برف، نه باران، نه گرما، نه تاریکیِ شب» پیک‌هایش را کُند نمی‌کند. بیست‌وچهار قرن بعد، ادارۀ پست آمریکا همین جمله را شعارِ خودش کرد. دروغگو چیزی ساخته بود که واقعاً ارزشِ باور کردن داشت.',
    },
    {
      text: 'آن کتیبه دو هزار سال ناخوانده ماند — تا سال ۱۸۳۵ که افسرِ انگلیسی‌ای به نام هنری رالینسون شروع به بالا رفتن کرد. حروفِ باستانی را با یک دست رونویسی می‌کرد، در حالی که از نردبانی بر لبۀ پرتگاه آویزان بود. یک پسربچۀ کُرد را با طناب پایین فرستاد تا بخش‌های دورتر را بخواند. دوازده سال طول کشید. وقتی رمز را شکست، دروازۀ تمدن‌های بین‌النهرین باز شد — همان کاری که سنگِ رُزِتا برای هیروگلیف کرد، کتیبۀ بیستون برای خطِ میخی کرد. بعد از دو هزار سال سکوت، داریوش دوباره حرف می‌زد.',
    },
    {
      text: 'و امروز، هنوز آنجا ایستاده — حک‌شده در سنگ، پایش روی پشتِ دشمنش، نُه شاهِ شورشی در بند پیشِ رویش. تخت جمشید هنوز از دشت‌های ایران سر برمی‌آورد، ستون‌هایش رو به آسمانی که داریوش می‌گفت اهورامزدا آفریده. و این تناقض جوابِ ساده‌ای ندارد: قاتلی که خود را قهرمانِ راستی خواند، تبلیغاتچی‌ای که چیزی ارزشمند ساخت، مردی که بزرگ‌ترین شاهنشاهیِ جهان را بر بزرگ‌ترین دروغش بنا نهاد — و بعد تمامِ عمرش را صرف کرد تا آن دروغ را به حقیقت بدل کند.',
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
//  TURKISH — "Yalanı Fetheden Kral"
//  Proverb: «Yalancının mumu yatsıya kadar yanar»
//    (The liar's candle burns only until evening prayer)
//  Subversion: Darius's candle didn't go out at evening —
//    it burned for two thousand years.
//  Register: Engaging modern Turkish — quality podcast narrator,
//    slightly irreverent, confident, loves dramatic irony
// ═══════════════════════════════════════════════════════════════
const tr = {
  lang: 'tr',
  langStoryId: 'tr#king-who-conquered-the-lie',

  title: 'Yalanı Fetheden Kral',

  subtitle: 'Hakikati imparatorluğunun en yüce ilkesi yapan adam — belki de o imparatorluğu tarihin en büyük yalanı üzerine kurdu',

  excerpt: 'MÖ 522. Yedi Pers soylusu bir kaleye baskın düzenleyip dünyanın en büyük imparatorluğunun tahtında oturan adamı öldürdü. O kanlı odadan çıkan katil, Persepolis\u2019i inşa edecek — ve tarihte görülmüş en büyük yalanı kayalara kazıyacaktı.',

  moralOrLesson: 'Hakikati imparatorluğunun en yüce ilkesi yapan adam, o imparatorluğu tarihin en başarılı yalanı üzerine kurmuş olabilir — ve bu çelişki üzerine kurduğu uygarlık iki yüzyıl ayakta kaldı, kıtaları birbirine bağlayan yollar açtı, işçilerine adil ücret ödedi ve zamansız sanat eserleri üretti. Bazen en büyük hakikatler, en cüretli yalanlardan doğar.',

  paragraphs: [
    {
      text: 'MÖ 522\u2019de Pers İmparatorluğu Libya\u2019dan Hindistan\u2019a uzanıyordu — dünyanın o güne kadar gördüğü en büyük devlet. Tahtında Büyük Kiros\u2019un oğlu Bardiya oturuyordu; vergileri kaldırmıştı, halk onu seviyordu. Sonra bir gece yedi soylu kalesini bastı. Karanlıkta biri kralı yere devirdi; Darius elinde bıçakla duruyordu — kendi adamını bıçaklayacağından korkuyordu. Kralı tutan adam bağırdı: \u00ABSapla! İkimizi birden vursan bile!\u00BB Darius bıçağı sapladı. Kralın başını kesip kalabalığa gösterdiler.',
    },
    {
      text: 'Darius taht varisi falan değildi — kimsenin aklına bile gelmeyecek sıradan bir soylu. Ama sonra yaptığı şey tarihi değiştirdi. Zagros Dağları\u2019nda, kadim bir yolun yüz metre yukarısındaki sarp bir kayalığa, o güne dek görülmüş en büyük kraliyet yazıtını kazıttı — üç dilde. Ve o yazıtta gerçeği baştan yazdı. Öldürdükleri adam gerçek Bardiya değilmiş. Gerçek prens aylar önce gizlice öldürülmüş. Gaumata adında sahte bir rahip onun kılığına girip tahtı çalmış. Darius ise — Tanrı\u2019nın seçtiği adam — hakikati yerine getirmeye gelmiş.',
    },
    {
      text: 'Sorun şu ki neredeyse hiçbir çağdaş tarihçi buna inanmıyor. Darius kendi hikâyesinin tek kaynağı. Tüm imparatorluk — Bardiya\u2019yı bizzat tanıyanlar dâhil — onu gerçek kral olarak kabul etmişti. Vergi indirimi sahte bir taht gasbedicisinden değil, gerçek bir kraldan beklenir. Darbe sonrasında Darius, Büyük Kiros\u2019un kızıyla ve Bardiya\u2019nın kızıyla evlendi — bu bir hanedanı yutma hamlesi, onu geri getirme değil. Tarihçiler açıkça söylüyor: meşru kralı öldürdü ve hikâyeyi uydurdu.',
    },
    {
      text: 'Derler ki \u00AByalancının mumu yatsıya kadar yanar.\u00BB Ama Darius\u2019un mumu yatsıda sönmedi — iki bin yıl yandı. İmparatorluk hikâyeyi yutmadı. Tek bir yılda on dokuz isyan patlak verdi. Bir başkası da kalkıp \u00ABBen Bardiya\u2019yım\u00BB dedi — bu bile kaç kişinin Darius\u2019a inanmadığını gösterir. Hepsini ezdi. Acımasızca. Bir isyancının burnunu, kulaklarını, dilini kestirdi; bir gözünü oydurdu; sonra diri diri kazığa oturttu — herkesin gözü önünde. Mesaj hep aynıydı: bunlar \u00ABYalan\u00BB\u2019ın takipçileri — Pers inancında Hakikat\u2019in kutsal düşmanı. Darius\u2019a karşı çıkmak, Tanrı\u2019ya karşı çıkmaktı.',
    },
    {
      text: 'Sonra — kan ve propagandayla kazandıktan sonra — tarihin en gelişmiş uygarlıklarından birini kurdu. Persepolis\u2019te düzinelerce milletten işçiler gerçek maaş alıyordu; köle değillerdi. Kadınlar eşit ücret alıyordu. Hamile işçilere fazladan erzak veriliyordu. Yolları öylesine hızlıydı ki tarihçi Herodotos şöyle yazdı: \u00ABNe kar, ne yağmur, ne sıcak, ne gecenin karanlığı\u00BB ulakları yavaşlatabilir. Yirmi dört yüzyıl sonra Amerikan Posta Servisi bu cümleyi sloganı yaptı. Yalancı, inanılmaya değer bir şey inşa etmişti.',
    },
    {
      text: 'O yazıt iki bin yıl okunamadan durdu — ta ki 1835\u2019te Henry Rawlinson adında bir İngiliz subay tırmanmaya başlayana dek. Tek eliyle kadim yazıları kopyalıyordu, uçurumun kenarına dayalı bir merdivenin üstünden sarkarak. En zor bölümlere ulaşmak için bir Kürt çocuğunu iple aşağı sarkıttı. On iki yıl sürdü. Şifreyi kırınca antik Mezopotamya\u2019nın yazı sistemi açıldı — Rosetta Taşı hiyeroglifler için ne yaptıysa, Bîsütun Yazıtı çivi yazısı için onu yaptı. İki bin yıllık sessizlikten sonra Darius yeniden konuşuyordu.',
    },
    {
      text: 'Bugün hâlâ orada duruyor — kayaya kazınmış, ayağı düşmanının sırtında, dokuz asi kral önünde zincire vurulmuş. Persepolis hâlâ İran ovalarından yükseliyor, sütunları Darius\u2019un tanrısının yarattığını söylediği göğe uzanıyor. Ve bu çelişkinin kolay bir cevabı yok: Hakikat\u2019in şampiyonluğunu yapan bir katil, inanılmaya değer bir şey inşa eden bir propagandacı, dünyanın en büyük imparatorluğunu en büyük yalanı üzerine kuran — ve sonra ömrünü o yalanı gerçeğe dönüştürmekle geçiren bir adam.',
    },
  ],
};

// ─── Validation ──────────────────────────────────────────
function validate(story) {
  const label = story.lang.toUpperCase();
  let totalChars = 0;
  const pCount = story.paragraphs.length;

  if (pCount < 6 || pCount > 10) {
    throw new Error(`[${label}] Paragraph count ${pCount} out of range (6-10)`);
  }

  for (let i = 0; i < pCount; i++) {
    const text = story.paragraphs[i].text;
    const chars = text.length;
    const words = text.split(/\s+/).length;
    totalChars += chars;

    if (chars > 600) {
      throw new Error(`[${label}] P${i + 1}: ${chars} chars exceeds 600 (500 + 20%)`);
    }
    if (words > 120) {
      throw new Error(`[${label}] P${i + 1}: ${words} words exceeds 120 (100 + 20%)`);
    }
    console.log(`  P${i + 1}: ${chars} chars, ${words} words`);
  }

  console.log(`  Total: ${totalChars} chars (target: 2400-3600)`);
  if (totalChars < 2000 || totalChars > 4200) {
    throw new Error(`[${label}] Total ${totalChars} chars outside acceptable range`);
  }
  console.log(`  [${label}] Validation passed.\n`);
}

// ─── Push ────────────────────────────────────────────────
async function pushStory(story) {
  const item = { ...base, ...story };
  const label = story.lang.toUpperCase();

  console.log(`Pushing ${label} to DynamoDB...`);
  try {
    await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: item,
        ConditionExpression: 'attribute_not_exists(siteId) OR lang <> :en',
        ExpressionAttributeValues: { ':en': 'en' },
      })
    );
    console.log(`\u2713 ${label} pushed successfully (langStoryId: ${story.langStoryId})\n`);
  } catch (err) {
    if (err.name === 'ConditionalCheckFailedException') {
      console.log(`  ${label} record exists, safe to overwrite (not English)...`);
      await docClient.send(
        new PutCommand({ TableName: TABLE, Item: item })
      );
      console.log(`\u2713 ${label} overwritten successfully (langStoryId: ${story.langStoryId})\n`);
    } else {
      throw err;
    }
  }
}

async function main() {
  const stories = [ar, fa, tr];

  console.log('=== Validating all stories ===\n');
  for (const s of stories) {
    console.log(`--- ${s.lang.toUpperCase()} ---`);
    validate(s);
  }

  console.log('=== Pushing to DynamoDB ===\n');
  for (const s of stories) {
    await pushStory(s);
  }

  console.log('=== All 3 stories (AR, FA, TR) pushed successfully ===');
}

main().catch((err) => {
  console.error('FAILED:', err.message);
  process.exit(1);
});
