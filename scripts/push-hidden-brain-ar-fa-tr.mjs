import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local
const envContent = readFileSync(join(__dirname, '..', '.env.local'), 'utf8');
for (const line of envContent.split('\n')) {
  const match = line.match(/^([^#=\s]+)\s*=\s*(.+)$/);
  if (match) process.env[match[1]] = match[2].trim();
}

const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const TABLE = 'Story';
const now = String(Math.floor(Date.now() / 1000));

const shared = {
  siteId: { S: 'vatican-st-peters' },
  storyId: { S: 'hidden-brain-creation-adam' },
  icon: { S: '\u{1F9E0}' },
  tier: { S: 'A' },
  source: { S: `Meshberger, Frank. "An Interpretation of Michelangelo's Creation of Adam Based on Neuroanatomy," JAMA 264:14, 1990; Suk and Tamargo, Neurosurgery, 2010` },
  characters: { L: [
    { S: 'Michelangelo Buonarroti' },
    { S: 'Frank Meshberger' },
    { S: 'Ian Suk' },
    { S: 'Rafael Tamargo' },
  ]},
  era: { S: '1508-1512 (discovered 1990)' },
  readingTimeMinutes: { N: '3' },
  image: { S: '' },
  thumbnail: { S: '' },
  disabled: { BOOL: false },
  coordinates: { M: { lat: { N: '41.9022' }, lng: { N: '12.4539' } } },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: 'riddles_past' },
  updatedAt: { N: now },
};

function makeParagraphs(texts) {
  return { L: texts.map(t => ({ M: { text: { S: t } } })) };
}

// ====================================================================
//  ARABIC — العربيّة
//  Proverb: الحقيقة لا تُحجَب بغِربال (Truth can't be hidden by a sieve)
//  Subversion: Michelangelo hid it not with a sieve, but with genius itself
//  Register: Modern engaging MSA — skilled storyteller, not news anchor
// ====================================================================

const arTexts = [
  `خمسمئة سنة. نصف ألفيّة. والملايين يدخلون كنيسة السّيستين في الفاتيكان، يرفعون رؤوسهم نحو السّقف، ويظنّون أنّهم يرون كلَّ ما فيه. لوحة «خَلق آدم» — الله يمدّ يده نحو آدم، الملائكة من حوله، وعباءة حمراء تلتفّ حول المشهد. أشهر لوحة في تاريخ البشريّة. رأيتَها على أغلفة الكتب وشاشات الهواتف والميمز. لكنّ أحدًا — لا فنّان ولا عالِم ولا رجل دين — لم يلاحظ ما كان مَخبوءًا أمام عينيه مباشرة.`,

  `في عام ١٩٩٠، نشر طبيبٌ أمريكيّ اسمه فرانك مِشبِرغَر بحثًا في مجلّة الجمعيّة الطبّيّة الأمريكيّة — واحدة من أعرَق المجلّات الطبّيّة في العالم — وقَلَبَ كلَّ شيء رأسًا على عَقِب. ادّعاؤه كان صادمًا: الشكل المُحيط بالله والملائكة ليس مجرّد عباءة. إنّه مَقطَعٌ تشريحيٌّ دقيق للدِّماغ البشريّ.`,

  `التطابق مُذهِل. العباءة الحمراء ترسم السطح الخارجيّ للدّماغ. الملاك المُختبئ تحت ذراع الله يقع بالضبط مكان جِذع الدّماغ. وِشاحٌ أخضر يتدلّى خلف المشهد يتتبّع مسار شِريانٍ رئيسيّ يُغذّي الدِّماغ. وشخصيّة صغيرة عند قدم الله اليسرى تجلس في الموضع الدّقيق لغُدّة هُرمونيّة حيويّة. نقطة بعد نقطة — تطابقٌ بدقّةٍ لا يمكن أن تكون مُصادفة.`,

  `ومايكل أنجلو كان يملك المعرفة لفعل هذا تمامًا. حين كان شابًّا في فلورنسا، أمضى سنوات يُشرِّح جُثَثًا في كنيسة سانتو سبيريتو — رئيس الرُّهبان سمح له بدراسة الأجساد مقابل صليبٍ خشبيّ نحته مايكل أنجلو بيديه. قبل أن يبلغ الثلاثين، كان يفهم جسم الإنسان أفضل من معظم أطبّاء عصره.`,

  `فما الرسالة؟ القراءة الأقوى تقول: الله لا يمنح آدم مجرّد الحياة — بل يمنحه العَقل. شكل الدِّماغ يعني أنّ الهديّة الإلهيّة الحقيقيّة ليست نبض القلب ولا الجسد، بل الوَعي. التفكير. القدرة على أن تسأل: لماذا أنا موجود؟ في هذه القراءة، الله يسكن داخل الذكاء البشريّ نفسه.`,

  `لكنّ هناك قراءة أخطر بكثير. مايكل أنجلو كان يكره هذا المشروع. البابا يوليوس الثاني — رجلٌ أقرب للقائد العسكريّ منه لرجل الدين — أجبره على رسم السّقف. يقولون الحقيقة لا تُحجَب بغِربال — لكنّ مايكل أنجلو أخفاها بالعبقريّة ذاتها. إن كان الله مرسومًا داخل دِماغ، فربّما كان يقول: الله من صُنع العقل البشريّ، لا العكس. وهذه من أجرأ الأفكار في التاريخ — مرسومة مباشرة فوق رأس البابا.`,

  `القصّة لم تنتهِ هنا. في عام ٢٠١٠، نشر الباحثان إيان سَك ورافائيل تامارغو دراسةً في مجلّة جراحة الأعصاب كشفت درسًا تشريحيًّا ثانيًا مَخبوءًا في السّقف نفسه. في اللوحة التي يفصل فيها الله النّورَ عن الظّلام، يُشكِّل عنقه وصدره صورةً دقيقة لجِذع الدّماغ والحبل الشَّوكيّ. مايكل أنجلو فعلها أكثر من مرّة.`,

  `لا أحد يعرف يقينًا ما الذي قصَدَه. هل كان يحتفي بالوَعي باعتباره أعظم هِبَة إلهيّة؟ هل كان يتمرّد بصمتٍ على بابا يحتقره؟ أم أنّه ببساطة عبقريٌّ لم يستطع أن يمنع نفسه من إخفاء أسراره في فنّه؟ بعد خمسة قرون، أشهر سقفٍ في العالم لا يزال يكشف أسرارًا لم يخطر لأحد أن يبحث عنها.`,
];

// ====================================================================
//  PERSIAN — فارسی
//  Proverb: آب زیر کاه (water under the straw — a secret schemer)
//  Subversion: Michelangelo was water under straw — but his straw was
//              the ceiling of the pope's own church
//  Register: Natural modern Persian, favoring native words over Arabic
// ====================================================================

const faTexts = [
  `پانصد سال. نیم‌هزاره. میلیون‌ها آدم وارد کلیسای سیستین در واتیکان شدند، سرشان را بالا گرفتند و خیال کردند همه‌چیز را دیده‌اند. نقاشیِ «آفرینش آدم» — خدا دستش را به سمت آدم دراز کرده، فرشته‌ها دورش حلقه زده‌اند و ردای قرمزی دور کلّ صحنه پیچیده. احتمالاً شناخته‌شده‌ترین تصویر در تاریخ بشر. روی جلد کتاب‌ها دیده‌ایدش، روی صفحه‌ی گوشی، حتّی توی میم‌ها. ولی هیچ‌کس — نه هنرمندی، نه کشیشی، نه دانشمندی — نفهمید چیزی درست جلوی چشمش پنهان بوده.`,

  `سال ۱۹۹۰، پزشکی آمریکایی به نام فرانک مِشبِرگر مقاله‌ای در مجله‌ی انجمن پزشکی آمریکا منتشر کرد — یکی از معتبرترین مجلّات پزشکی دنیا — و همه‌چیز را زیرورو کرد. ادّعایش باورنکردنی بود: آن شکلی که دورِ خدا و فرشته‌ها را گرفته فقط یک ردا نیست. برشی دقیق از آناتومی مغز انسان است.`,

  `هم‌خوانی‌ها حیرت‌آور است. ردای قرمز، سطح بیرونی مغز را ترسیم می‌کند. فرشته‌ای که زیر بازوی خدا جا خوش کرده، دقیقاً روی ساقه‌ی مغز می‌نشیند. شالی سبز که پشت صحنه آویزان است، مسیر یک شریان اصلیِ تغذیه‌کننده‌ی مغز را دنبال می‌کند. شخصیّتی کوچک کنار پای چپ خدا درست جایی نشسته که یک غدّه‌ی هورمونیِ حیاتی قرار دارد. نقطه‌به‌نقطه — آناتومی با دقّتی جور درمی‌آید که تصادفی بودنش ممکن نیست.`,

  `و میکل‌آنژ دقیقاً دانشِ لازم برای این کار را داشت. وقتی هنرمند جوانی در فلورانس بود، سال‌ها در کلیسای سانتو اسپیریتو جسد تشریح کرد — رئیس راهبان در ازای صلیبِ چوبی‌ای که میکل‌آنژ با دست تراشیده بود، اجازه داده بود اجساد را مطالعه کند. پیش از سی‌سالگی، بدن انسان را بهتر از بیشترِ پزشکان هم‌عصرش می‌شناخت.`,

  `پس پیام چه بود؟ قوی‌ترین خوانش این است: خدا به آدم فقط زندگی نمی‌دهد — خِرَد می‌دهد. شکل مغز یعنی هدیه‌ی واقعی الهی ضربان قلب یا جسم نیست، بلکه آگاهی است. توانایی فکر کردن. پرسیدنِ «چرا من وجود دارم؟» در این خوانش، خداوند درونِ هوشِ انسان زندگی می‌کند.`,

  `ولی یک خوانش بسیار خطرناک‌تر هم هست. میکل‌آنژ از این پروژه بیزار بود. پاپ ژولیوس دوم — مردی که فرمانده‌ی جنگ بود بیشتر از آنکه روحانی باشد — مجبورش کرده بود سقف را نقاشی کند. می‌گویند آبِ زیرِ کاه خطرناک‌ترین آب است — حالا تصوّر کنید این آب زیر سقفِ کلیسای پاپ باشد. اگر خدا درون یک مغز نقاشی شده، شاید میکل‌آنژ داشت می‌گفت خدا ساخته‌ی ذهن انسان است، نه برعکس. و این پیام را درست بالای سرِ پاپ نقاشی کرد.`,

  `ماجرا به همین‌جا تمام نشد. سال ۲۰۱۰، دو پژوهشگر به نام‌های ایان سَک و رافائل تامارگو مقاله‌ای در مجله‌ی جرّاحی مغز و اعصاب منتشر کردند که درسِ آناتومیِ پنهانِ دیگری را در همان سقف فاش کرد. در تابلویی که خدا نور را از تاریکی جدا می‌کند، گلو و سینه‌اش تصویری دقیق از ساقه‌ی مغز و نخاع شکل می‌دهد. میکل‌آنژ این کار را بیش از یک‌بار انجام داده بود.`,

  `هیچ‌کس با قطعیّت نمی‌داند منظورش چه بوده. آیا آگاهی را به‌عنوان بزرگ‌ترین هدیه‌ی خدا جشن می‌گرفت؟ در سکوت علیه پاپی که ازش بیزار بود شورش می‌کرد؟ یا صرفاً نابغه‌ای بود که نمی‌توانست خودش را از پنهان کردن رازها در دلِ هنرش باز دارد؟ پانصد سال بعد، مشهورترین سقف دنیا هنوز رازهایی رو می‌کند که کسی فکرش را هم نمی‌کرد دنبالشان بگردد.`,
];

// ====================================================================
//  TURKISH — Türkçe
//  Proverb: Görünen köy kılavuz istemez (A visible village needs no guide)
//  Subversion: This village stood before everyone's eyes for 500 years
//              and no one truly saw it
//  Register: Skilled modern Turkish storyteller, natural word order
// ====================================================================

const trTexts = [
  `Beş yüz yıl. Tam yarım binyıl boyunca milyonlarca insan Vatikan'daki Sistine Şapeli'ne girdi, başını kaldırıp tavana baktı ve her şeyi gördüğünü sandı. Adem'in Yaratılışı — Tanrı elini uzatıp Adem'in parmağına dokunuyor, etrafında melekler, üzerinde kırmızı bir pelerin. Muhtemelen insanlık tarihinin en çok tanınan resmi. Kitap kapaklarında, telefon ekranlarında, memelerde gördünüz. Herkes bu resmi bilir. Ama kimse — beş yüz yıl boyunca — gözünün önündeki sırrı fark edemedi.`,

  `1990 yılında Frank Meshberger adında bir Amerikalı doktor, dünyanın en saygın tıp dergilerinden biri olan Amerikan Tıp Birliği Dergisi'nde bir makale yayımladı ve bilinen her şeyi altüst etti. İddiası sarsıcıydı: Tanrı'yı ve melekleri saran şekil sıradan bir pelerin değil. İnsan beyninin anatomik olarak kusursuz bir kesiti.`,

  `Örtüşmeler akıl almaz. Kırmızı pelerin beynin dış yüzeyini çiziyor. Tanrı'nın kolunun altına sığınmış melek tam olarak beyin sapının bulunduğu yere denk geliyor. Arkada sarkan yeşil bir şal, beyni besleyen ana atardamarın güzergâhını takip ediyor. Tanrı'nın sol ayağının yanındaki küçük figür tam da kritik bir hormon bezinin olması gereken yerde oturuyor. Nokta nokta — anatomi, tesadüf olamayacak bir hassasiyetle örtüşüyor.`,

  `Michelangelo tam da bunu yapabilecek donanıma sahipti. Floransa'da genç bir sanatçıyken Santo Spirito kilisesinde yıllarca kadavra inceledi — baş rahip, Michelangelo'nun kendi elleriyle oyduğu ahşap bir haç karşılığında cesetleri çalışmasına izin vermişti. Daha otuzuna varmadan insan vücudunu çağdaşı doktorların çoğundan iyi tanıyordu.`,

  `Peki mesaj neydi? En güçlü yorum şöyle: Tanrı, Adem'e sadece hayat vermiyor — akıl veriyor. Beyin biçimi, gerçek ilahi armağanın kalp atışı ya da beden değil, bilinç olduğunu söylüyor. Düşünebilme yetisi. "Neden varım?" diye sorabilme gücü. Bu yorumda Tanrı, insan zekâsının ta kendisinin içinde yaşıyor.`,

  `Ama çok daha tehlikeli bir yorum daha var. Michelangelo bu işten nefret ediyordu. Papa II. Julius — rahipten çok komutan olan bir adam — onu bu tavana boyamaya zorlamıştı. Görünen köy kılavuz istemez derler — ama bu köy beş yüz yıl herkesin gözü önünde durdu ve kimse onu gerçekten göremedi. Eğer Tanrı bir beynin içinde resmedildiyse, belki Michelangelo şunu söylüyordu: Tanrı insan zihninin eseri, tersi değil. Ve bunu doğrudan Papa'nın başının üstüne çizdi.`,

  `Hikâye burada bitmedi. 2010'da Ian Suk ve Rafael Tamargo adlı iki araştırmacı, Neurosurgery dergisinde yayımladıkları bir çalışmayla aynı tavandaki ikinci gizli anatomi dersini ortaya koydu. Tanrı'nın ışığı karanlıktan ayırdığı panelde boğaz ve göğüs bölgesi, beyin sapı ile omuriliğin hassas bir görüntüsünü oluşturuyor. Michelangelo bunu birden fazla kez yapmıştı.`,

  `Michelangelo'nun gerçekte ne kastettiğini kesin olarak kimse bilmiyor. Bilinci Tanrı'nın en büyük hediyesi olarak mı yüceltiyordu? Hor gördüğü bir papaya sessizce mi başkaldırıyordu? Yoksa bildiklerini sanatının içine saklamaktan kendini alamayan bir dahi miydi? Beş yüz yıl sonra dünyanın en ünlü tavanı, kimsenin aramayı akıl edemediği sırlar vermeye devam ediyor.`,
];

// ====================================================================
//  BUILD ITEMS
// ====================================================================

const items = [
  {
    ...shared,
    lang: { S: 'ar' },
    langStoryId: { S: 'ar#hidden-brain-creation-adam' },
    title: { S: 'العَقلُ الخَفِيُّ في خَلقِ آدَم' },
    subtitle: { S: 'رسالةٌ سرِّيَّة ظلَّت مدفونةً خمسةَ قرونٍ في أشهرِ لوحةٍ على وجهِ الأرض' },
    excerpt: { S: arTexts[0] },
    moralOrLesson: { S: 'العبقريّة الحقيقيّة تدفن طبقاتٍ من المعنى تعيش قرونًا ولا تكشف نفسها إلّا لمن استعدّ لرؤيتها' },
    paragraphs: makeParagraphs(arTexts),
  },
  {
    ...shared,
    lang: { S: 'fa' },
    langStoryId: { S: 'fa#hidden-brain-creation-adam' },
    title: { S: 'مغزِ پنهان در آفرینشِ آدم' },
    subtitle: { S: 'پیامی مخفی که پانصد سال در مشهورترین نقاشیِ جهان دفن بود' },
    excerpt: { S: faTexts[0] },
    moralOrLesson: { S: 'نبوغ واقعی لایه‌هایی از معنا را پنهان می‌کند که قرن‌ها دوام می‌آورند و فقط برای کسانی آشکار می‌شوند که آماده‌ی دیدنشان باشند' },
    paragraphs: makeParagraphs(faTexts),
  },
  {
    ...shared,
    lang: { S: 'tr' },
    langStoryId: { S: 'tr#hidden-brain-creation-adam' },
    title: { S: "Adem'in Yaratılışındaki Gizli Beyin" },
    subtitle: { S: "Dünyanın en ünlü tablosunda beş yüz yıl boyunca kimsenin fark etmediği gizli mesaj" },
    excerpt: { S: trTexts[0] },
    moralOrLesson: { S: 'Gerçek deha, yüzyıllar boyunca saklı kalan ve kendini yalnızca görmeye hazır olanlara açan anlam katmanları gömer' },
    paragraphs: makeParagraphs(trTexts),
  },
];

// ====================================================================
//  PUSH TO DYNAMODB
// ====================================================================

async function push() {
  console.log(`Pushing 3 language versions to ${TABLE}...`);
  console.log(`Timestamp: ${now}\n`);

  for (const item of items) {
    const lang = item.lang.S;
    const langStoryId = item.langStoryId.S;
    console.log(`Pushing ${lang} (${langStoryId})...`);

    try {
      await client.send(new PutItemCommand({
        TableName: TABLE,
        Item: item,
      }));
      console.log(`  -> SUCCESS\n`);
    } catch (err) {
      console.error(`  -> FAILED: ${err.message}\n`);
      process.exit(1);
    }
  }

  console.log('All 3 items pushed successfully!');
}

push();
