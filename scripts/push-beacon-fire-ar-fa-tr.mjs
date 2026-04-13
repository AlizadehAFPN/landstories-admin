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
  siteId: 'great-wall-of-china',
  storyId: 'beacon-fire-prank',
  icon: '🔥',
  tier: 'A',
  source: "Sima Qian, Records of the Grand Historian (Shiji, ~100 BC); Bamboo Annals; Lü Buwei's Spring and Autumn Annals",
  characters: [
    'King You of Zhou — the foolish king',
    'Bao Si — the concubine who never smiled',
    'Guo Shifu — the reckless minister',
    'The Quanrong — barbarian invaders',
  ],
  era: '8th century BC — Western Zhou Dynasty',
  readingTimeMinutes: 2,
  image: '',
  disabled: false,
  thumbnail: '',
  coordinates: { lng: 116.5704, lat: 40.4319 },
  hasAudio: false,
  isFree: true,
  storyCategory: 'lost_found',
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════
//  ARABIC — "ابتسامةٌ أسقطَت مملكة"
//  Proverb: "مَن كذبَ مرّةً لم يُصدَّق ولو صَدَق"
//    (He who lies once won't be believed, even when truthful)
//  Subversion: This king didn't lie once — he set his country's
//    sky ablaze with lies again and again, until no one believed the fire.
//  Register: Gripping modern MSA storyteller — Ahmed Khaled Tawfiq energy
// ═══════════════════════════════════════════════════════════
const ar = {
  lang: 'ar',
  langStoryId: 'ar#beacon-fire-prank',

  title: 'ابتسامةٌ أسقطَت مملكة',

  subtitle: 'حين أشعلَ ملِكٌ سماءَ بلادِه ليُرضيَ امرأة',

  excerpt: 'حَوالي عام ٧٨٠ قبل الميلاد، أضاعَ ملِكُ الصين عرشَه وسلالتَه لأنّه أراد أن يرى امرأةً تبتسم. سلاحُه؟ نظامُ الطوارئ الذي كان يحمي المملكة بأكملها.',

  moralOrLesson: 'الثقة هي السور الحقيقي الذي يحمي الأمم. إذا انهار، لن تنفعَكَ كلّ حجارة الدنيا.',

  paragraphs: [
    {
      text: 'حَوالي عام ٧٨٠ قبل الميلاد، جلسَ على عرش الصين ملِكٌ اسمُه يُو، من أسرة تشُو الغربيّة — واحدة من أقوى السُّلالات في تاريخ الصين. كان يملك كلّ شيء: جيوشًا وقلاعًا وأمراءَ يطيعون بلا سؤال. لكنّ شيئًا واحدًا كان يسلبُه النوم: محظيّتُه، باو سي. كانت من أجمل نساء زمانها، لكنّها لم تبتسم قطّ. لا لهديّة، ولا لعيد، ولا حتّى لنكتة. وجهُها جميلٌ كالرُّخام — وباردٌ مثله.',
    },
    {
      text: 'أعلنَ الملك مكافأةً خياليّة: ألفُ قطعة ذهب لمن يستطيع أن يرسمَ ابتسامةً على وجه باو سي. تسابقَ الجميع. المهرّجون حاولوا. الموسيقيّون عزفوا أجمل ما عندهم. البهلوانيّون أتوا بحركاتٍ لم يرَها أحدٌ من قبل. لا شيء. ثمّ جاءَ وزيرُه قُوو شيفو بفكرةٍ بدَت جنونًا خالصًا: أشعِلوا نيرانَ المنارات — نظام الإنذار الذي لا يُشعَل إلّا حين تكون المملكة على شفير الهاوية.',
    },
    {
      text: 'لفهمِ حجم هذا الجنون، تخيّلوا سلسلةً من أبراج النار ممتدّة على طول حدود المملكة لمئات الكيلومترات. إذا هاجمَ عدوّ، يُشعَل أقرب برج. يراه البرج التالي فيُشعِل ناره، ثمّ الذي بعده، وهكذا — حتّى تصل الرسالة في ساعات إلى كلّ أمير في البلاد. فيركب كلّ أمير بجيشه كاملًا نحو العاصمة. هذا النظام كان يعني شيئًا واحدًا فقط: البلاد تسقط، أرسلوا كلّ من تملكون.',
    },
    {
      text: 'أشعلَ الملك يُو المنارات. ومن كلّ اتّجاه، اندفع الأمراء بجيوشهم — خيولٌ تلهث، جنودٌ مستعدّون للموت، راياتٌ ترفرف في الريح. وصلوا إلى العاصمة يتوقّعون غزوًا شاملًا. فوجدوا الملك وباو سي يُطِلّان عليهم من أعلى البرج. لا عدوّ. لا خطر. مجرّد ملكٍ يستعرض أمام امرأة. ونظرَت باو سي إلى كلّ هؤلاء الرجال الأقوياء — مُرتبكين، مُنهَكين، مُهانين — وابتسمَت. أخيرًا... ابتسمَت.',
    },
    {
      text: 'فرحَ الملك كطفلٍ وجدَ لعبته المفضّلة. فأعادَها. ثمّ أعادَها. في كلّ مرّة، يأتي عددٌ أقلّ من الأمراء. في كلّ مرّة، يزداد غضبهم. في كلّ مرّة، يتصدّع النظام الذي بُنيَ ليحمي أمّةً بأكملها. يقولون: «مَن كذبَ مرّةً لم يُصدَّق ولو صَدَق.» لكنّ هذا الملك لم يكذب مرّةً واحدة — بل أشعلَ سماءَ بلاده بالكذب مرّةً تلوَ مرّة، حتّى لم يبقَ أحدٌ يُصدّقُ النار.',
    },
    {
      text: 'ثمّ في عام ٧٧١ قبل الميلاد، جاءَ ما كان الجميع يخشاه. قبائل تشوانرونغ — شعبٌ بدويّ شرس من الغرب — غزَت فعلًا. أشعلَ الملك يُو المنارات للمرّة الحقيقيّة. لم يأتِ أحد. لم يتحرّك أميرٌ واحد. اجتاح تشوانرونغ العاصمة هاوجينغ، قتلوا الملك، وأسروا باو سي. سُلالة تشُو الغربيّة — التي حكمَت الصين ٢٧٥ عامًا — انتهت. كلّ ذلك لأنّ ملِكًا واحدًا ظنّ أنّ ثقة الناس وقودٌ لا ينفد.',
    },
    {
      text: 'بعدها بسبعة قرون، سجّلَ المؤرّخ الصيني الكبير سيما تشيان هذه القصّة في كتابه «سجلّات المؤرّخ الكبير» — الكتاب الذي يُعدّ حجر الأساس في التاريخ الصيني. ومنذ ذلك الحين، يسمعها كلّ طفل صيني، وكلّ جيلٍ يخرج بنفس العبرة: أقوى نظام حماية في العالم لا يساوي شيئًا، لحظةَ أن يُثبتَ مَن بيده السلطة أنّه لا يستحقّ الثقة.',
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  PERSIAN — "لبخندی که سلسله‌ای را خاکستر کرد"
//  Proverb: "از ماست که بر ماست"
//    (What befalls us comes from ourselves)
//  Subversion: The enemy hadn't even arrived yet, but King You was
//    already burning his kingdom with his own hands.
//  Register: Natural modern Persian prose — intimate, reflective storyteller
// ═══════════════════════════════════════════════════════════
const fa = {
  lang: 'fa',
  langStoryId: 'fa#beacon-fire-prank',

  title: 'لبخندی که سلسله‌ای را خاکستر کرد',

  subtitle: 'پادشاهی که آسمانِ سرزمینش را آتش زد تا زنی لبخند بزند',

  excerpt: 'حدود ۷۸۰ سال پیش از میلاد، پادشاهی چینی تاج و تختش را باخت فقط چون می‌خواست لبخندی بر لب زنی ببیند. ابزارش؟ سامانه‌ی هشداری که قرار بود از کل سرزمین نگهبانی کند.',

  moralOrLesson: 'اعتماد، دیواری‌ست که واقعاً از یک ملت نگهبانی می‌کند. وقتی فرو بریزد، هیچ سنگ و باروی دیگری نجاتت نمی‌دهد.',

  paragraphs: [
    {
      text: 'حدود ۷۸۰ سال پیش از میلاد، مردی به نام یُو بر تخت سلسله‌ی جُو غربی نشسته بود — یکی از نیرومندترین دودمان‌های چین باستان. لشکر داشت، دژ داشت، و زنجیره‌ای از برج‌های آتش که می‌توانست در چند ساعت هر فرمانروایی را در سرزمین به پایتخت فرابخوانَد. اما ذهن شاه جای دیگری بود. دلباخته‌ی زنی شده بود به نام باو سی. زنی به زیبایی ماه و به سردی سنگ. هرگز لبخند نمی‌زد. نه برای هدیه، نه برای جشن، نه برای هیچ‌کس.',
    },
    {
      text: 'شاه یُو جایزه‌ای اعلام کرد: هزار سکه‌ی طلا برای هر کسی که بتوانَد لبخندی بر لب باو سی بنشانَد. دلقک‌ها آمدند و رفتند. نوازنده‌ها بهترین‌هایشان را زدند. بندبازها شگفتی آفریدند. هیچ‌کدام کارگر نیفتاد. تا اینکه یکی از وزیران — گُوئو شیفو — پیشنهادی داد که از دیوانگی هم رد کرده بود: آتش‌های هشدار را روشن کنید. همان آتش‌هایی که فقط وقتی روشن می‌شوند که سرزمین در آستانه‌ی سقوط باشد.',
    },
    {
      text: 'بگذارید بگویم چرا این کار دیوانگی بود. سامانه‌ی آتش هشدار، زنجیره‌ای از برج‌ها بود که صدها کیلومتر در امتداد مرزها کشیده شده بود. وقتی دشمن حمله می‌کرد، نزدیک‌ترین برج آتش می‌زد. برج بعدی می‌دید و آتش خودش را روشن می‌کرد، و همین‌طور تا آخر — تا ظرف چند ساعت، هر فرمانروایی با تمام لشکرش به سوی پایتخت بتازد. این آتش‌ها فقط یک معنا داشتند: کشور دارد سقوط می‌کند، همه بیایید.',
    },
    {
      text: 'شاه یُو آتش‌ها را روشن کرد. از هر گوشه‌ای، فرمانروایان با لشکرهایشان تاختند — اسب‌ها خیس عرق، سربازان آماده‌ی جنگ، پرچم‌ها در باد. وقتی به پایتخت رسیدند، منتظر حمله‌ی بزرگ بودند. اما در عوض، شاه یُو و باو سی را دیدند که از بالای برج تماشایشان می‌کنند. نه دشمنی بود، نه خطری. فقط پادشاهی بود که می‌خواست جلوی زنی خودنمایی کند. و باو سی وقتی آن همه مرد قدرتمند را دید — سردرگم، خسته، خُرد شده — بالاخره لبخند زد.',
    },
    {
      text: 'شاه ذوق‌زده شد. و دوباره آتش‌ها را روشن کرد. و باز دوباره. هر بار فرمانروایان کمتری آمدند. هر بار خشمشان بیشتر شد. هر بار نظامی که برای نگهبانی از یک ملت ساخته شده بود، ترکی تازه برداشت. از ماست که بر ماست — دشمن هنوز نیامده بود، اما شاه یُو داشت با دست‌های خودش سرزمینش را آتش می‌زد. نه با شمشیر دشمن، که با سوزاندن اعتمادی که بازگشتی نداشت.',
    },
    {
      text: 'سال ۷۷۱ پیش از میلاد. قوم چوانرُونگ — بیابانگردهای جنگاور از غرب — واقعاً حمله کردند. شاه یُو آتش‌ها را روشن کرد. این بار واقعی بود. هیچ‌کس نیامد. حتی یک نفر. چوانرُونگ مثل سیل به پایتخت هائوجینگ ریختند، شاه را کشتند و باو سی را به اسارت بردند. سلسله‌ی جُو غربی — که ۲۷۵ سال بر چین فرمان رانده بود — تمام شد. همه‌چیز تمام شد. به خاطر پادشاهی که فکر می‌کرد اعتماد مردم چیزی‌ست که هرچقدر بسوزانی، تمام نمی‌شود.',
    },
    {
      text: 'حدود هفتصد سال بعد، مورخ بزرگ چین، سیما چیان، این داستان را در شاهکارش «یادنامه‌های مورخ بزرگ» ثبت کرد — کتابی که سنگ بنای تاریخ‌نگاری چینی شد. از آن روز تا امروز، هر بچه‌ی چینی این قصه را می‌شنود و هر نسلی همان درس را می‌گیرد: نیرومندترین سامانه‌ی دفاعی دنیا بی‌ارزش می‌شود، همان لحظه‌ای که صاحبان قدرت ثابت کنند لایق اعتماد نیستند.',
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  TURKISH — "Bir Gülümseme Uğruna"
//  Proverb: "Yalancının mumu yatsıya kadar yanar"
//    (A liar's candle burns only until bedtime)
//  Subversion: King You didn't light a candle — he lit an empire's
//    beacon fires. But the proverb held: when true darkness fell,
//    not a single answering flame remained.
//  Register: Engaging modern Turkish — podcast narrator / popular nonfiction
// ═══════════════════════════════════════════════════════════
const tr = {
  lang: 'tr',
  langStoryId: 'tr#beacon-fire-prank',

  title: 'Bir Gülümseme Uğruna',

  subtitle: 'Bir kadını güldürmek için ülkesinin savunma sistemini ateşe veren kral',

  excerpt: 'MÖ 780\'de bir Çin kralı, gözdesi gülsün diye ülkenin tüm acil savunma ağını sahte alarm olarak kullandı. Bedeli? Tahtı, canı ve 275 yıllık bir hanedan.',

  moralOrLesson: 'Bir ulusu gerçekten koruyan şey güvendir. Güven bir kere kırıldı mı, hiçbir taş duvar sizi kurtaramaz.',

  paragraphs: [
    {
      text: 'Milattan önce 780 civarı. Çin\'in en güçlü hanedanlarından biri olan Batı Zhou\'nun tahtında You adında bir kral oturuyordu. Orduları vardı, kaleleri vardı, sınır boyunca uzanan ve düşman saldırısında tüm ülkeyi ayağa kaldırabilen bir işaret ateşi sistemi vardı. Ama kralın aklı başka yerdeydi. Bao Si adında bir kadına çılgınca âşıktı. Sarayın en güzel kadınıydı, kralın gözdesi. Ama tek bir sorunu vardı: asla gülmüyordu. Hiçbir şeye. Hediye, şölen, gösteri — hiçbir şeye. Yüzü mermer kadar güzel, mermer kadar soğuktu.',
    },
    {
      text: 'Kral büyük bir ödül açıkladı: Bao Si\'yi güldürene bin altın sikke. Sarayın soytarıları denedi — olmadı. Müzisyenler en güzel ezgilerini çaldı — yüzü kıpırdamadı. Cambazlar akıl almaz numaralar sergiledi — hiç. Sonra vezirlerinden biri, Guo Shifu, öyle çılgın bir fikir ortaya attı ki herkes şaka sandı: sınır boyundaki işaret ateşlerini yakın. Yani o ateşleri — sadece ülke düşman istilasıyla yüz yüzeyken yakılması gereken o ateşleri.',
    },
    {
      text: 'Bu ateşlerin ne anlama geldiğini anlamak lazım. İşaret ateşi sistemi, sınır boyunca yüzlerce kilometre uzanan bir gözetleme kulesi zinciriydi. Düşman saldırdığında en yakın kule ateş yakardı. Onu gören bir sonraki kule kendi ateşini yakardı, sonra bir sonraki... Saatler içinde ülkedeki her bey tüm ordusuyla başkente koşardı. Bu sistemin tek bir anlamı vardı: ülke düşüyor, elinizde ne var ne yok gönderin.',
    },
    {
      text: 'Kral You ateşleri yaktırdı. Her yönden beyler ordularıyla akın akın geldi — atlar ter içinde, askerler savaşa hazır, sancaklar rüzgârda dalgalanıyor. Başkente vardıklarında büyük bir savaş bekliyorlardı. Buldukları bambaşkaydı: Kral You ve Bao Si bir kulenin tepesinden onları seyrediyordu. Ne düşman vardı, ne tehlike. Sadece bir kadını etkilemeye çalışan bir kral. Ve Bao Si o güçlü adamların hepsine baktı — şaşkın, bitkin, aşağılanmış — ve hayatında ilk kez güldü.',
    },
    {
      text: 'Kral çılgına döndü sevinçten. Ve aynı şeyi bir daha yaptı. Bir daha. Her seferinde daha az bey geldi. Her seferinde öfkeleri biraz daha kabardı. Her seferinde koca bir milleti korumak için kurulmuş sistem biraz daha çatırdadı. Derler ki yalancının mumu yatsıya kadar yanar. Kral You mum yakmıyordu — koca bir imparatorluğun işaret ateşlerini yakıyordu. Ama atasözü yine haklı çıktı: gerçek karanlık bastırdığında, cevap veren tek bir alev bile kalmamıştı.',
    },
    {
      text: 'Milattan önce 771. Quanrong — batıdan gelen savaşçı bir göçebe halk — gerçekten saldırdı. Kral You ateşleri yaktırdı. Bu sefer gerçekti. Kimse gelmedi. Tek bir bey bile kılını kıpırdatmadı. Quanrong başkent Haojing\'e sel gibi aktı, Kral You\'yu öldürdü, Bao Si\'yi esir aldı. İki yüz yetmiş beş yıldır Çin\'i yöneten Batı Zhou hanedanlığı sona erdi. Her şey bitti. Çünkü bir kral, halkının güvenini odun niyetine ateşe atmıştı.',
    },
    {
      text: 'Bu hikâyeyi yaklaşık yedi yüz yıl sonra Çin\'in en büyük tarihçisi Sima Qian, başyapıtı «Büyük Tarihçinin Kayıtları»na yazdı — Çin tarih yazımının temel taşı sayılan eser. O günden bu yana her Çinli çocuk bu hikâyeyi duyar ve her nesil aynı dersi çıkarır: dünyanın en güçlü savunma sistemi, onu yönetenlerin güvenilmez olduğu anlaşıldığı an hiçbir işe yaramaz.',
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
    console.log(`✓ ${label} pushed successfully (langStoryId: ${story.langStoryId})\n`);
  } catch (err) {
    if (err.name === 'ConditionalCheckFailedException') {
      console.log(`  ${label} record exists, safe to overwrite (not English)...`);
      await docClient.send(
        new PutCommand({ TableName: TABLE, Item: item })
      );
      console.log(`✓ ${label} overwritten successfully (langStoryId: ${story.langStoryId})\n`);
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
