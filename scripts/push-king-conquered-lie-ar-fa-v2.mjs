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

// ─── Non-text fields (shared across all languages) ───
const base = {
  siteId: 'persepolis',
  storyId: 'king-who-conquered-the-lie',
  icon: '⚔️',
  tier: 'S',
  source:
    "The Behistun Inscription (DB), Old Persian text translated in Kent, R.G., Old Persian: Grammar, Texts, Lexicon (1953); Herodotus, Histories III.61-88; Briant, Pierre, From Cyrus to Alexander (2002); Waters, Matt, Ancient Persia: A Concise History (2014); Hallock, R.T., Persepolis Fortification Tablets (1969)",
  readingTimeMinutes: 4,
  image: '',
  disabled: true,
  thumbnail: '',
  coordinates: { lng: 52.8914, lat: 29.9342 },
  hasAudio: false,
  isFree: true,
  storyCategory: 'crowns_conquests',
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════
//  ARABIC — المَلِكُ الذي قَهَرَ الكَذِب
//
//  Proverb: «حبلُ الكَذِبِ قصير»
//    (The rope of lies is short — every Arab knows this)
//  Subversion: Darius's rope wrapped around an empire's neck.
//
//  Register: Gripping modern MSA storyteller — vivid, dramatic,
//    like a skilled hakawati with a history degree. Not stiff
//    news-broadcast fusha, not dialectal. Think Al Jazeera
//    documentary narration at its best.
// ═══════════════════════════════════════════════════════════════
const ar = {
  lang: 'ar',
  langStoryId: 'ar#king-who-conquered-the-lie',

  title: 'المَلِكُ الذي قَهَرَ الكَذِب',

  subtitle:
    'رَجُلٌ جَعَلَ الحقيقةَ أعلى مبادئ مُلكِه — وربّما بنى ذلك المُلك على أنجحِ كذبةٍ عَرَفها التاريخ',

  excerpt:
    'في عام ٥٢٢ قبل الميلاد، اقتحمَ سبعةٌ من النبلاء الفُرس حِصنًا وقتلوا صاحبَ عرشِ أعظمِ إمبراطوريّة في العالم. القاتل الذي خرج من تلك الغرفة سيبني بِرسِبوليس — ويَنحِتُ أكبرَ كذبة في التاريخ على صخرة.',

  era: '٥٢٢–٥١٨ ق.م (صعود دَاريوش)؛ ١٨٣٥–١٨٤٧ (فكّ رموز بيستون)',

  characters: [
    'دَاريوش الأوّل (الكبير)',
    'غَوْمَاتا / بَرْدِيَا (الملك المُتنازَع عليه)',
    'أُوتانِس، غُوبرِياس، والمتآمرون الستّة',
    'آتُوسّا (ابنة قُورَش الأكبر)',
    'هنري رُولِنسون (مُفكِّك الرموز)',
  ],

  moralOrLesson:
    'الرجلُ الذي جعل «الحقيقة» المبدأَ الأسمى لإمبراطوريّته ربّما بنى تلك الإمبراطوريّة على أنجح كذبةٍ في التاريخ — والحضارة التي أقامها على هذا التناقض صمدت قرنين، ومدّت طرقًا ربطت قارّات، ودفعت لعمّالها بعدل، وأنتجت فنًّا يتجاوز الزمن. أحيانًا تُولَدُ أعظمُ الحقائقِ من أجرأِ الأكاذيب.',

  paragraphs: [
    {
      text: 'في سنة ٥٢٢ قبل الميلاد، كانت الإمبراطوريّة الفارسيّة أكبرَ دولةٍ عَرَفَها العالَم — من صحراء ليبيا إلى سهول الهند. مَلِكُها بَرْدِيَا، ابنُ قُورَش العظيم، ألغى الضرائبَ عن رعيّته فأحبّوه. ثمّ في ليلةٍ واحدة، تسلّلَ سبعةُ نبلاءٍ إلى حصنه. في الظلام، طرَحَ أحدُهم الملكَ أرضًا. وقف دَاريوش بخنجره مُترَدِّدًا — يخشى أن يطعنَ رفيقَه. فصاحَ الرجلُ الذي يُثبِّتُ الملكَ: «اطعَنْ! حتّى لو أصبتَنا كِلَينا!» غرزَ دَاريوش النصلَ. قطعوا رأسَ الملكِ ورفعوه أمام الحشود.',
    },
    {
      text: 'لم يكن دَاريوش وريثًا للعرش — مجرّدُ نبيلٍ صغيرٍ لم يخطُر ببال أحد. لكنّ ما فعلَه بعدها غيَّرَ مجرى التاريخ. على جُرفٍ صخريٍّ في جبال زَاغْرُوس، على ارتفاع مئة متر فوق طريقٍ قديم، نَحَتَ أضخمَ نقشٍ ملكيٍّ رآه العالَم — بثلاث لغات. وفيه أعاد كتابةَ الواقع. ذلك الرجل الذي قتلوه؟ لم يكن بَرْدِيَا الحقيقيّ. الأميرُ الحقيقيّ اغتيلَ سرًّا قبل أشهُر. كاهنٌ مُحتالٌ اسمُه غَوْمَاتا انتحلَ هُويّتَه وسرقَ العرش. أمّا دَاريوش — المُختارُ من الإله — فقد جاء ليُعيدَ الحقَّ إلى نِصابه.',
    },
    {
      text: 'المُشكِلة؟ لا يَكاد مؤرِّخٌ مُعاصِر يُصدِّقه. دَاريوش هو المصدر الوحيد لقصّته. الإمبراطوريّة بأسرها — بمن فيها مَن عرفوا بَرْدِيَا شخصيًّا — قبِلَت به ملكًا حقيقيًّا. إلغاءُ الضرائب قرارُ حاكمٍ واثق، لا تصرُّفُ مُحتالٍ مذعور. وبعد الانقلاب، تزوّج دَاريوش ابنةَ قُورَش وابنةَ بَرْدِيَا — وهذه خطوةُ مَن يبتلعُ سُلالةً حاكمة، لا مَن يستعيدها. كبارُ الباحثين يقولونها بلا مُواربة: قتلَ الملكَ الشرعيّ واختلقَ القصّةَ من أوّلها لآخرها.',
    },
    {
      text: 'يقولون «حَبلُ الكَذِبِ قَصير» — لكنّ حبلَ دَاريوش لفَّ رقبةَ إمبراطوريّةٍ بأكملها. ومع ذلك، الناسُ لم يبتلعوا الرواية. تسعَ عشرةَ ثورةً اشتعلت في سنةٍ واحدة. رجلٌ آخر ادّعى أنّه بَرْدِيَا — وهذا وحدَه يُخبِرُك كم فارسيًّا كان يعلم أنّ دَاريوش كاذب. سحقهم جميعًا بلا رحمة. أحدُ المتمرّدين قُطِعَ أنفُه وأُذُناه ولسانُه، وفُقِئَت عينُه، ثمّ خُوزِقَ حيًّا أمام الملأ. كلُّ عمليّةِ قتلٍ حملت الرسالة ذاتها: هؤلاء اتَّبعوا «الكَذِب» — العدوّ الكونيّ للحقّ في العقيدة الفارسيّة. مَن يُعارِض دَاريوش يُعارِض الإلهَ نفسَه.',
    },
    {
      text: 'ثمّ — بعد أن انتصرَ بالدم والدِّعاية — بنى واحدةً من أرقى حضارات التاريخ. في بِرسِبوليس، كان العمّال من عشرات الأمم يتقاضَون رواتبَ حقيقيّةً — لا عبيد. النساء حصلنَ على أجرٍ مُساوٍ. الحوامل نِلنَ حِصصًا إضافيّة. وطرقُه بلغت من السرعة أنّ هِيرُودُوت كتبَ: «لا ثلجٌ ولا مطرٌ ولا حرٌّ ولا ظلامُ ليلٍ» يعيق رُسُلَه — عبارةٌ اتّخذها البريد الأمريكيّ شعارًا بعد أربعةٍ وعشرين قرنًا. الكاذبُ بنى شيئًا يستحقّ فعلًا أن يؤمنَ به الناس.',
    },
    {
      text: 'النقشُ ظلَّ لُغزًا ألفَي عامٍ — حتّى عام ١٨٣٥، حين بدأ ضابطٌ بريطانيٌّ اسمُه هنري رُولِنسون يتسلّق. نسخ الكتابةَ القديمة بيدٍ واحدة وهو مُتعلِّقٌ بسُلّمٍ على حافّة الهاوية. أنزلَ صبيًّا كرديًّا بالحبال ليصلَ إلى الأجزاء البعيدة. استغرق الأمرُ اثنتَي عشرةَ سنة. وحين فكَّ الشيفرة، انفتحت أبوابُ حضارات بلاد الرافدَين — ما فعله حجر رشيد للهيروغليفيّة فعله نقشُ بيستون للخطّ المسماريّ. بعد ألفَي سنةٍ من الصمت، عاد صوتُ دَاريوش يتكلّم.',
    },
    {
      text: 'واليوم، لا يزال واقفًا هناك — منحوتًا في الصخر، قَدَمُه على ظهر عدوِّه، تسعةُ ملوكٍ مُتمرّدين مُقيَّدون أمامه. وبِرسِبوليس لا تزال تنهض من سهول إيران، أعمدتُها تمتدّ نحو السماء التي قال دَاريوش إنّ إلهَه خلقها. والمُفارقةُ بلا جوابٍ مريح: قاتلٌ نصَّبَ نفسَه حاميَ الحقّ، داعيةٌ بنى ما يستحقّ الإيمانَ به، رجلٌ أسَّسَ أعظمَ إمبراطوريّةٍ في العالم على أكبرِ أكاذيبه — ثمّ قضى عُمرَه يُحوِّلُ تلك الكذبةَ إلى حقيقة.',
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
//  PERSIAN — شاهی که دروغ را شکست داد
//
//  Proverb: «دروغگو کم‌حافظه‌ست»
//    (A liar has a short memory — universally known in Iran)
//  Subversion: Darius carved his lie into a mountain so nobody
//    would EVER forget it. The liar had the longest memory in
//    history.
//
//  Register: Intimate modern Persian storyteller — this is
//    IRAN's own history, so the tone carries personal weight.
//    Quality Iranian podcast. Natural everyday Persian, avoids
//    heavy Arabic loanwords. Colloquial touches like -چی suffix
//    and "از خودش درآورد". Ahura Mazda, not "God".
// ═══════════════════════════════════════════════════════════════
const fa = {
  lang: 'fa',
  langStoryId: 'fa#king-who-conquered-the-lie',

  title: 'شاهی که دروغ را شکست داد',

  subtitle:
    'مردی که «راستی» را بالاترین اصلِ شاهنشاهی‌اش کرد... شاید همان شاهنشاهی را بر بزرگ‌ترین دروغِ تاریخ بنا نهاد',

  excerpt:
    'سال ۵۲۲ پیش از میلاد. هفت سوارِ ایرانی به دژی تاختند و مردی را کشتند که بر تختِ بزرگ‌ترین شاهنشاهیِ جهان نشسته بود. قاتلی که از آن اتاقِ خونین بیرون آمد، تخت جمشید را ساخت — و بزرگ‌ترین دروغِ تاریخ را در سنگ حک کرد.',

  era: '۵۲۲–۵۱۸ پ.م (به قدرت رسیدن داریوش)؛ ۱۸۳۵–۱۸۴۷ (رمزگشایی بیستون)',

  characters: [
    'داریوش یکم (بزرگ)',
    'گَئومات / بَردیا (پادشاهِ مورد مناقشه)',
    'اُتانِس، گُبریاس و شش هم‌پیمان',
    'آتوسا (دختر کوروش بزرگ)',
    'هنری رالینسون (رمزگشا)',
  ],

  moralOrLesson:
    'مردی که «راستی» را بالاترین اصلِ شاهنشاهی‌اش کرد، شاید آن شاهنشاهی را بر موفّق‌ترین دروغِ تاریخ بنا نهاد — و تمدنی که بر این تناقض ساخت، دو سده دوام آورد، جاده‌هایی کشید که قاره‌ها را به هم وصل کرد، به کارگرانش منصفانه مزد داد، و هنری آفرید که از زمان فراتر رفت. گاهی بزرگ‌ترین حقیقت‌ها از جسورانه‌ترین دروغ‌ها زاده می‌شوند.',

  paragraphs: [
    {
      text: 'سال ۵۲۲ پیش از میلاد. شاهنشاهیِ هخامنشی از لیبی تا هندوستان کشیده شده بود — بزرگ‌ترین فرمانروایی‌ای که جهان تا آن روز دیده بود. پادشاهش بَردیا، پسرِ کوروش بزرگ، مالیات‌ها را بخشیده بود و مردم دوستش داشتند. آن‌وقت یک شب، هفت نجیب‌زاده به دژش یورش بردند. در تاریکی یکی‌شان شاه را بر زمین کوبید. داریوش خنجر به دست ایستاده بود ولی جرأت نمی‌کرد بزند — می‌ترسید یارِ خودش را بزند. مردی که شاه را چسبیده بود فریاد زد: «بزن! حتّی اگر هر دومان را بزنی!» داریوش تیغه را فرو کرد. سرِ شاه را بریدند و بالا گرفتند.',
    },
    {
      text: 'داریوش وارثِ تاج نبود — یک نجیب‌زاده‌ی بی‌نام‌ونشان که هیچ‌کس خوابِ پادشاهی‌اش را هم نمی‌دید. اما کاری که بعدش کرد، تاریخ را عوض کرد. بر صخره‌ای سر به فلک‌کشیده در کوه‌های زاگرس، صد متر بالاتر از جاده‌ای باستانی، بزرگ‌ترین کتیبه‌ی شاهانه‌ی تاریخ را به سه زبان تراشید. و در آن... واقعیت را از نو نوشت. آن مردی که کشتند؟ بَردیایِ واقعی نبود. شاهزاده‌ی اصلی ماه‌ها پیش پنهانی کشته شده بود. مُغی حقّه‌باز به نام گَئومات جایش را گرفته بود. و داریوش — برگزیده‌ی اهورامزدا — آمده بود تا راستی را بازگرداند.',
    },
    {
      text: 'مشکل اینجاست: تقریباً هیچ تاریخ‌نگارِ امروزی حرفش را باور ندارد. داریوش تنها منبعِ داستانِ خودش است. کل شاهنشاهی — از جمله کسانی که بَردیا را حضوری می‌شناختند — او را شاهِ واقعی قبول کرده بود. بخشش مالیات از یک فرمانروای مشروع منطقی‌ست، نه از یک شیّادِ ترسیده. بعد از کودتا هم داریوش دخترِ کوروش و دخترِ بَردیا را گرفت — اینها کار کسی‌ست که می‌خواهد دودمانی را ببلعد، نه اینکه بازش گرداند. بزرگ‌ترین پژوهشگران رُک می‌گویند: شاهِ قانونی را کشت و ماجرا را از خودش درآورد.',
    },
    {
      text: 'شاهنشاهی هم قبول نکرد. نوزده شورش در یک سال شعله‌ور شد. مردِ دیگری ادعا کرد بَردیاست — و همین یک چیز نشان می‌دهد چند نفر داریوش را دروغگو می‌دانستند. همه‌شان را درهم شکست. بی‌رحمانه. بینیِ یکی از شورشیان را بریدند، گوش‌ها و زبانش را بریدند، یک چشمش را درآوردند، و زنده جلوِ چشمِ همه بر نیزه نشاندند. پیام هر کُشتاری یکی بود: اینها پیروِ «دروغ» بودند — دشمنِ کیهانیِ «راستی» در آیینِ ایرانی. با داریوش بجنگی، با اهورامزدا جنگیده‌ای.',
    },
    {
      text: 'و بعد — وقتی با خون و تبلیغات پیروز شد — یکی از پیشرفته‌ترین تمدن‌های تاریخ را ساخت. در تخت جمشید، کارگرانی از ده‌ها ملّت دستمزدِ واقعی می‌گرفتند — برده نبودند. زنان مزدِ برابر داشتند. زنانِ باردار جیره‌ی بیشتر می‌گرفتند. جاده‌هایش آن‌قدر تند بودند که هرودوت نوشت: «نه برف، نه باران، نه گرما، نه تاریکیِ شب» پیک‌هایش را کُند نمی‌کند — جمله‌ای که اداره‌ی پستِ آمریکا بیست‌وچهار قرن بعد شعارِ خودش کرد. می‌گویند دروغگو کم‌حافظه‌ست. اما داریوش دروغش را روی کوه تراشید تا هیچ‌کس تا ابد فراموش نکند.',
    },
    {
      text: 'آن کتیبه دو هزار سال ناخوانده ماند — تا ۱۸۳۵ که افسری انگلیسی به نام هنری رالینسون شروع کرد به بالا رفتن. حروفِ باستانی را با یک دست رونویسی می‌کرد، در حالی که از نردبانی بر لبه‌ی پرتگاه آویزان بود. یک پسربچه‌ی کُرد را با طناب پایین فرستاد تا به بخش‌هایی برسد که دستش نمی‌رسید. دوازده سال طول کشید. وقتی رمز را شکست، دروازه‌ی تمدن‌های بین‌النهرین باز شد — همان کاری که سنگِ رُزِتا برای هیروگلیف کرد، کتیبه‌ی بیستون برای خطِ میخی کرد. بعد از دو هزار سال سکوت، داریوش دوباره حرف می‌زد.',
    },
    {
      text: 'و امروز، هنوز آنجا ایستاده — حک‌شده در سنگ، پایش روی پشتِ دشمنش، نُه شاهِ شورشی در بند پیشِ رویش. تخت جمشید هنوز از دشت‌های ایران سر برمی‌آورد، ستون‌هایش رو به آسمانی که داریوش می‌گفت اهورامزدا آفریده. و این تناقض پاسخِ ساده‌ای ندارد: قاتلی که خود را نگهبانِ راستی خواند، تبلیغاتچی‌ای که چیزی ارزشمند ساخت، مردی که بزرگ‌ترین شاهنشاهیِ جهان را بر بزرگ‌ترین دروغش بنا نهاد — و بعد تمامِ عمرش را صرف کرد تا آن دروغ را به حقیقت بدل کند.',
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
      throw new Error(
        `[${label}] P${i + 1}: ${chars} chars exceeds 600 (500 + 20%)`
      );
    }
    if (words > 120) {
      throw new Error(
        `[${label}] P${i + 1}: ${words} words exceeds 120 (100 + 20%)`
      );
    }
    console.log(`  P${i + 1}: ${chars} chars, ${words} words`);
  }

  console.log(`  Total: ${totalChars} chars (target: 2400-3600)`);
  if (totalChars < 2000 || totalChars > 4200) {
    throw new Error(
      `[${label}] Total ${totalChars} chars outside acceptable range`
    );
  }

  // Verify translated fields exist
  if (!story.characters || story.characters.length === 0) {
    throw new Error(`[${label}] Missing translated characters`);
  }
  if (!story.era || story.era.length === 0) {
    throw new Error(`[${label}] Missing translated era`);
  }

  console.log(`  ✓ [${label}] Validation passed.\n`);
}

// ─── Push ────────────────────────────────────────────────
async function pushStory(story) {
  const item = { ...base, ...story };
  const label = story.lang.toUpperCase();

  console.log(`Pushing ${label} to DynamoDB (table: ${TABLE})...`);
  await docClient.send(
    new PutCommand({
      TableName: TABLE,
      Item: item,
    })
  );
  console.log(
    `✓ ${label} pushed successfully (langStoryId: ${story.langStoryId})\n`
  );
}

// ─── Verify ──────────────────────────────────────────────
async function verifyStory(story) {
  const label = story.lang.toUpperCase();
  const { GetCommand } = await import('@aws-sdk/lib-dynamodb');

  const result = await docClient.send(
    new GetCommand({
      TableName: TABLE,
      Key: {
        siteId: base.siteId,
        langStoryId: story.langStoryId,
      },
    })
  );

  if (!result.Item) {
    throw new Error(`[${label}] Verification FAILED — record not found!`);
  }

  if (result.Item.title !== story.title) {
    throw new Error(
      `[${label}] Verification FAILED — title mismatch! Got: ${result.Item.title}`
    );
  }

  const pCount = result.Item.paragraphs?.length ?? 0;
  if (pCount !== story.paragraphs.length) {
    throw new Error(
      `[${label}] Verification FAILED — paragraph count mismatch! Expected ${story.paragraphs.length}, got ${pCount}`
    );
  }

  console.log(
    `✓ ${label} verified — ${pCount} paragraphs, title matches, updatedAt: ${result.Item.updatedAt}\n`
  );
}

// ─── Main ────────────────────────────────────────────────
async function main() {
  const stories = [ar, fa];

  console.log('═══ Validating all stories ═══\n');
  for (const s of stories) {
    console.log(`--- ${s.lang.toUpperCase()} ---`);
    validate(s);
  }

  console.log('═══ Pushing to DynamoDB ═══\n');
  for (const s of stories) {
    await pushStory(s);
  }

  console.log('═══ Verifying records ═══\n');
  for (const s of stories) {
    await verifyStory(s);
  }

  console.log('═══ All 2 stories (AR, FA) pushed and verified successfully ═══');
}

main().catch((err) => {
  console.error('FAILED:', err.message);
  process.exit(1);
});
