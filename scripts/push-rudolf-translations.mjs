import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ── Shared fields (unchanged from English) ──────────────────────────
const base = {
  siteId: "prague-castle",
  storyId: "rudolf-alchemists",
  icon: "\u2697\uFE0F",
  storyCategory: "riddles_past",
  era: "1583-1612 (Rudolf II\u2019s Prague court)",
  tier: "A",
  isFree: true,
  isFeatured: false,
  hasAudio: false,
  characters: [
    "Emperor Rudolf II",
    "Edward Kelley",
    "John Dee",
    "Tycho Brahe",
    "Johannes Kepler",
  ],
  coordinates: { lat: 50.0912, lng: 14.4043 },
  thumbnail: "",
  image: "",
  readingTimeMinutes: 3,
  source:
    'Imperial court records; R.J.W. Evans "Rudolf II and His World"; alchemical manuscripts',
  updatedAt: now,
  disabled: false,
};

// =====================================================================
// ARABIC (ar)
// Proverb: \u00ABالصَّبرُ مِفتاحُ الفَرَج\u00BB — subverted in \u00A75
// =====================================================================
const ar = {
  ...base,
  lang: "ar",
  langStoryId: "ar#rudolf-alchemists",
  title: "رودولف الثاني وبلاطُ الخيميائيّين",
  subtitle:
    "حينَ حوَّلَ إمبراطورٌ مَهووسٌ قلعةَ براغ إلى أعظمِ مُختبَرٍ في أوروبا",
  excerpt:
    "أغلبُ الأباطرة كانوا يحلمونَ بجيوشٍ أكبر. رودولف الثاني كانَ يحلمُ بتحويلِ الرصاصِ إلى ذهب. في عام ١٥٨٣، فعلَ ما لم يتوقَّعهُ أحد — نقلَ عاصمةَ الإمبراطوريّةِ الرومانيّةِ المُقدَّسة من فيينّا إلى براغ.",
  moralOrLesson:
    "السعيُ وراءَ المعرفةِ المُستحيلة قد يُغيِّرُ مدينةً بأكملها، حتّى لو ظلَّت تلكَ المعرفة بعيدةَ المنالِ إلى الأبد.",
  paragraphs: [
    {
      text: "أغلبُ الأباطرة كانوا يحلمونَ بجيوشٍ أكبر. أمّا رودولف الثاني، فكانَ يحلمُ بتحويلِ الرصاصِ إلى ذهب. في عام ١٥٨٣، فاجأَ الجميعَ بقرارٍ لم يتوقَّعهُ أحد: نقلَ عاصمةَ الإمبراطوريّةِ الرومانيّةِ المُقدَّسة من فيينّا إلى براغ. ليسَ لأسبابٍ سياسيّة. ليسَ استعداداً لحرب. أرادَ أن يَبنيَ أعظمَ مُختبَرٍ عرفَتهُ أوروبا، داخلَ أسوارِ قلعةِ براغ.",
    },
    {
      text: "كانَ رودولف ذكيّاً، ربّما غيرَ مُستقرٍّ نفسيّاً، ومُستهلَكاً بالكاملِ في هوسِ الخيمياء — ذلكَ الاعتقادُ القديمُ بأنَّ المعادنَ الرخيصةَ يُمكنُ أن تتحوَّلَ إلى ذهبٍ إذا وجدتَ التركيبةَ الصحيحة. كانَ يُطاردُ حُلمَين: حَجَرَ الفلاسفة الذي يُحقِّقُ هذا التحوُّل، وإكسيرَ الحياة الذي يَعِدُ بالخُلود. أنفقَ ثرواتٍ لا تُحصى ليستقطبَ كلَّ خيميائيٍّ وفلكيٍّ ومُتصوِّفٍ في أوروبا.",
    },
    {
      text: "أوّلُ الأسماءِ الكبيرة كانَ إدوارد كيلي، إنجليزيٌّ بماضٍ مشبوهٍ وادّعاءٍ جريء: يملكُ مسحوقاً أحمرَ غامضاً يُحوِّلُ الزِئبقَ إلى ذهب. منحَهُ رودولف بُرجاً في القلعة وميزانيّةً مفتوحة. بل إنَّ كيلي أجرى عرضاً حيّاً أمامَ البلاط — ونجحَ بطريقةٍ ما. لكن حينَ عجِزَ عن تكرارِ الخدعة، ألقاهُ رودولف في السجن. ماتَ كيلي وهو يُحاوِلُ الهرب، سقطَ من نافذةِ بُرج.",
    },
    {
      text: "لكن لم يكن كلُّ مَن في البلاطِ دجّالاً. جون دي، أحدُ ألمعِ عقولِ إنجلترا، جاءَ ليُناقشَ الرياضيّاتِ والبصريّات وما ادَّعى أنّهُ تواصلٌ مع الملائكة. وتيخو براهي، الفلكيُّ الدنماركيُّ الذي فقدَ جزءاً من أنفِهِ في مُبارزةٍ بالسيف فاستبدلَهُ بأنفٍ معدنيّ، أصبحَ عالِمَ الفلكِ الإمبراطوريّ. خرائطُ النجومِ التي رسمَها في القلعة ساعدَت مُساعدَهُ يوهانس كبلر على اكتشافِ كيفَ تتحرَّكُ الكواكبُ فعلاً — من أعظمِ الاكتشافاتِ العلميّة.",
    },
    {
      text: "وجذبَتِ القلعةُ مئاتٍ غيرَهم. زُقاقُ الذهب — صفٌّ من بيوتٍ صغيرةٍ ملوَّنةٍ أسفلَ أسوارِ القلعة — كانَ يعجُّ بخيميائيّينَ يعملونَ ليلَ نهار. أفرانٌ تتوهَّجُ حتّى الفجر، خلائطُ غريبةٌ تفورُ في أوانٍ من الطين، والهواءُ مُشبَعٌ برائحةِ الكبريتِ والزِئبق. يقولونَ «الصَّبرُ مِفتاحُ الفَرَج» — لكنَّ هؤلاء صبَروا ثلاثينَ عاماً على بابٍ بلا قُفل.",
    },
    {
      text: "وجمعَ رودولف واحدةً من أكثرِ المجموعاتِ الخاصّةِ إبهاراً في أوروبا. لوحاتٌ لعمالقةٍ مثل دورر وبروغل. «خزائنُ عجائب» — تخيَّلها كمتاحفَ مُصغَّرة — مليئةٌ بما قيلَ إنّهُ قرونُ وحيدِ القَرن، وأحجارٌ يُعتقَدُ أنّها تُبطِلُ السُموم، ونباتاتٌ نادرةٌ من أراضٍ بعيدة. صارَت قلعةُ براغ مكاناً يجتمعُ فيهِ الفنُّ والعلمُ والسحرُ والهوسُ تحتَ سقفٍ واحد.",
    },
    {
      text: "لكنَّ الهوسَ أكلَهُ حيّاً. تملَّكَهُ جنونُ الارتياب، وتيقَّنَ أنَّ أعداءَهُ يُحاصرونَه. أخوهُ ماتياس أجبرَهُ على التنازلِ عن العرش. ماتَ رودولف عام ١٦١٢ وحيداً في القلعةِ التي حوَّلَها إلى أعجوبة — مُحاطاً بمجموعاتِهِ لكن مهجوراً من كلِّ إنسان. لم يجدْ حجرَ الفلاسفة. لم يجدْهُ أحدٌ قطّ. لكنَّ هوسَهُ منحَ براغ شيئاً باقياً: سُمعةُ المدينةِ التي ذابَ فيها الحدُّ بينَ العبقريّةِ والجنون.",
    },
  ],
};

// =====================================================================
// PERSIAN (fa)
// Proverb: \u00ABهر که طاووس خواهد، جور هندوستان کشد\u00BB — subverted in \u00A77
// =====================================================================
const fa = {
  ...base,
  lang: "fa",
  langStoryId: "fa#rudolf-alchemists",
  title: "رودولف دوم و دربار کیمیاگران",
  subtitle:
    "وقتی یک امپراتور وسواسی قلعه\u200Cی پراگ را به بزرگ\u200Cترین آزمایشگاه اروپا تبدیل کرد",
  excerpt:
    "بیشتر امپراتورها خواب ارتش بزرگ\u200Cتر می\u200Cدیدند. رودولف دوم خوابش فرق داشت: تبدیل سرب به طلا. سال ۱۵۸۳ کاری کرد که هیچ\u200Cکس انتظارش را نداشت — پایتخت امپراتوری مقدس روم را از وین به پراگ منتقل کرد.",
  moralOrLesson:
    "گاهی دنبال کردن دانشی که دست\u200Cنیافتنی\u200Cست می\u200Cتواند یک شهر را برای همیشه دگرگون کند — حتی اگر خودِ آن دانش هرگز به دست نیاید.",
  paragraphs: [
    {
      text: "بیشتر امپراتورها خواب ارتش بزرگ\u200Cتر می\u200Cدیدند. رودولف دوم خوابش فرق داشت: تبدیل سرب به طلا. سال ۱۵۸۳ کاری کرد که هیچ\u200Cکس باورش نمی\u200Cشد — پایتخت امپراتوری مقدس روم را از وین به پراگ منتقل کرد. نه به\u200Cخاطر سیاست، نه برای جنگ. می\u200Cخواست بزرگ\u200Cترین آزمایشگاهی که اروپا به خودش دیده بود را درست وسط قلعه\u200Cی پراگ بسازد.",
    },
    {
      text: "رودولف باهوش بود، شاید کمی ناپایدار، و تا مغز استخوان غرق در کیمیاگری — آن باور کهن که می\u200Cشود فلزات ارزان را با فرمول درست به طلای ناب تبدیل کرد. دنبال دو چیز می\u200Cگشت: سنگ فیلسوف که این دگرگونی را ممکن می\u200Cکرد، و اکسیر حیات که جاودانگی می\u200Cبخشید. پول\u200Cهایی که خرج کرد تا هر کیمیاگر و ستاره\u200Cشناس و جادوگری را از سراسر اروپا بکشاند به پراگ، سرسام\u200Cآور بود.",
    },
    {
      text: "اولین نام بزرگ ادوارد کِلی بود — یک انگلیسی با گذشته\u200Cای تاریک و ادعایی بلندپروازانه: صاحب پودر سرخ رازآلودی که جیوه را به طلا بدل می\u200Cکند. رودولف یک برج در قلعه و بودجه\u200Cی نامحدود بهش داد. کِلی حتی یک نمایش زنده جلوی درباریان اجرا کرد — و یک\u200Cجوری کارش گرفت. ولی وقتی نتوانست دوباره تکرارش کند، رودولف انداختش سیاهچال. کِلی موقع فرار از پنجره\u200Cی برج سقوط کرد و جان داد.",
    },
    {
      text: "اما همه\u200Cی اهالی دربار شیاد نبودند. جان دی، یکی از تیزترین ذهن\u200Cهای انگلستان، آمده بود درباره\u200Cی ریاضیات و نورشناسی حرف بزند — و از چیزی بگوید که اسمش را گذاشته بود ارتباط با فرشتگان. تیخو براهه، ستاره\u200Cشناس دانمارکی که تکه\u200Cای از بینی\u200Cاش را در دوئل شمشیر از دست داده و جایش بینی فلزی گذاشته بود، ریاضی\u200Cدان دربار شد. نقشه\u200Cهای ستاره\u200Cای که در قلعه ثبت کرد بعدها دستیارش یوهانس کپلر را به یکی از بزرگ\u200Cترین کشفیات علمی رساند: فهمیدن اینکه سیاره\u200Cها واقعاً چطور حرکت می\u200Cکنند.",
    },
    {
      text: "قلعه صدها نفر دیگر را هم جذب کرد. کوچه\u200Cی طلایی — ردیفی از خانه\u200Cهای ریز رنگارنگ زیر دیوارهای قلعه — پُر بود از کیمیاگرهایی که شبانه\u200Cروز کار می\u200Cکردند. کوره\u200Cها تا صبح می\u200Cسوختند، مخلوط\u200Cهای عجیب در ظرف\u200Cهای سفالی قُل\u200Cقُل می\u200Cزدند، و بوی گوگرد و جیوه همه\u200Cجا پیچیده بود. انفجار هم چیز عادی بود. نصفش آزمایشگاه بود، نصفش زمین بازی دانشمندان دیوانه.",
    },
    {
      text: "رودولف یکی از چشمگیرترین مجموعه\u200Cهای شخصی اروپا را هم جمع کرد. تابلوهایی از استادهایی مثل دورر و بروگل. «اتاق\u200Cهای شگفتی» — چیزی شبیه نسخه\u200Cی اولیه\u200Cی موزه — پُر از شاخ\u200Cهایی که می\u200Cگفتند مال تک\u200Cشاخ است، سنگ\u200Cهایی که فکر می\u200Cکردند پادزهرند، و گیاهان کمیاب از سرزمین\u200Cهای دور. قلعه\u200Cی پراگ جایی شد که هنر و دانش و جادو و وسواس زیر یک سقف زندگی می\u200Cکردند.",
    },
    {
      text: "ولی وسواس زنده\u200Cزنده خوردش. بدبینی و توهم از هر طرف ریشه دواند. برادرش ماتیاس مجبورش کرد تاج را زمین بگذارد. رودولف سال ۱۶۱۲ تنها مُرد — وسط قلعه\u200Cای که تبدیلش کرده بود به سرزمین عجایب، غرق در گنجینه\u200Cهایش اما رها شده از همه. می\u200Cگویند «هر که طاووس خواهد، جور هندوستان کشد.» رودولف جور هندوستان را کشید — اما طاووسی در کار نبود. سنگ فیلسوف پیدا نشد، نه به دست او، نه هیچ\u200Cکس دیگر. ولی وسواسش به پراگ هویتی داد که هنوز زنده است: شهر مرز باریک نبوغ و جنون.",
    },
  ],
};

// =====================================================================
// TURKISH (tr)
// Proverb: «Sabrın sonu selamettir» — subverted in §7
// =====================================================================
const tr = {
  ...base,
  lang: "tr",
  langStoryId: "tr#rudolf-alchemists",
  title: "II. Rudolf ve Simyacılar Sarayı",
  subtitle:
    "Kutsal Roma İmparatoru\u2019nun Prag Kalesi\u2019nde Felsefe Taşı\u2019nı aradığı yıllar",
  excerpt:
    "Çoğu imparator daha büyük ordular hayal etti. II. Rudolf\u2019un hayali başkaydı: kurşunu altına çevirmek. 1583\u2019te hiç kimsenin beklemediği bir adım attı \u2014 Kutsal Roma İmparatorluğu\u2019nun başkentini Viyana\u2019dan Prag\u2019a taşıdı.",
  moralOrLesson:
    "İmkânsız bilginin peşinden koşmak bir şehri sonsuza dek değiştirebilir \u2014 o bilginin kendisi sonsuza dek ulaşılmaz kalsa bile.",
  paragraphs: [
    {
      text: "Çoğu imparator daha büyük ordular hayal etti. II. Rudolf\u2019un hayali başkaydı: kurşunu altına çevirmek. 1583\u2019te kimsenin beklemediği bir adım attı \u2014 Kutsal Roma İmparatorluğu\u2019nun başkentini Viyana\u2019dan Prag\u2019a taşıdı. Siyaset yüzünden değil, savaş hazırlığı hiç değil. Avrupa\u2019nın o güne kadar gördüğü en büyük laboratuvarı Prag Kalesi\u2019nin tam göbeğine kurmak istiyordu.",
    },
    {
      text: "Rudolf zekiydi, belki biraz dengesiz ve simyaya tamamen batmıştı \u2014 ucuz metalleri doğru formülle saf altına dönüştürebileceğinize dair o kadim inanç. İki şeyin peşindeydi: bu dönüşümü mümkün kılacak efsanevi Felsefe Taşı ve ölümsüzlük vaat eden Hayat İksiri. Avrupa\u2019nın dört bir yanından her simyacıyı, gökbilimciyi ve gizemciyi Prag\u2019a çekmek için akıl almaz paralar döktü.",
    },
    {
      text: "Gelen ilk büyük isim Edward Kelley\u2019di \u2014 karanlık bir geçmişi ve cesur bir iddiası olan bir İngiliz: cıvayı altına çeviren gizemli bir kırmızı toz. Rudolf ona kalede bir kule ve sınırsız bütçe verdi. Kelley saray huzurunda canlı gösteri bile yaptı \u2014 ve bir şekilde başardı. Ama numarayı bir daha tekrarlayamayınca Rudolf onu zindana attırdı. Kelley kaçmaya çalışırken kule penceresinden düşerek can verdi.",
    },
    {
      text: "Ama saraydakilerin hepsi sahtekar değildi. İngiltere\u2019nin en keskin zihinlerinden John Dee, matematik ve optik konuşmaya \u2014 bir de meleklerle iletişim kurduğunu söylediği şeyi anlatmaya \u2014 gelmişti. Bir kılıç düellosunda burnunun bir kısmını kaybedip yerine metal burun takan Danimarkalı gökbilimci Tycho Brahe, İmparatorluk Matematikçisi oldu. Kalede çizdiği yıldız haritaları, asistanı Johannes Kepler\u2019in gezegenlerin gerçekte nasıl hareket ettiğini keşfetmesini sağladı \u2014 bilim tarihinin dönüm noktalarından biri.",
    },
    {
      text: "Kale yüzlerce isimsiz kahramana da kapılarını açtı. Altın Sokak \u2014 kale surlarının dibinde dizili minicik, rengârenk evler \u2014 gece gündüz çalışan simyacılarla dolup taşıyordu. Fırınlar sabaha kadar yanıyor, tuhaf karışımlar toprak kaplarda fokurduyordu. Havada kükürt ve cıva kokusu eksik olmuyordu. Patlamalar olağan sayılırdı. Yarı araştırma kampüsü, yarı çılgın bilim insanının oyun bahçesi.",
    },
    {
      text: "Rudolf bir yandan da Avrupa\u2019nın en göz kamaştırıcı özel koleksiyonlarından birini topladı. Dürer ve Bruegel gibi ustaların tabloları. \u00ABNadire kabineleri\u00BB \u2014 ilk müzelerin atası gibi düşünün \u2014 tek boynuzlu at boynuzu denilen şeylerle, zehre karşı koruduğuna inanılan taşlarla ve uzak diyarlardan getirilen nadir bitkilerle doluydu. Prag Kalesi; sanat, bilim, büyü ve takıntının aynı çatı altında buluştuğu bir yer hâline geldi.",
    },
    {
      text: "Ama takıntı onu canlı canlı yedi. Paranoya sardı, düşmanlarının kapıya dayandığına ikna oldu. Kardeşi Matthias tahttan indirdi. Rudolf 1612\u2019de harikalar diyarına çevirdiği kalede yapayalnız öldü \u2014 koleksiyonlarıyla çevrili ama herkes tarafından terk edilmiş. \u00ABSabrın sonu selamettir\u00BB derler. Ama Rudolf\u2019un sabrının sonu selamet değil, yalnızlıktı. Felsefe Taşı\u2019nı bulamadı \u2014 kimse bulamadı. Ama takıntısı Prag\u2019a silinmez bir miras bıraktı: deha ile delilik arasındaki çizginin hep güzelce bulanık kaldığı bir şehir.",
    },
  ],
};

// ── Push to DynamoDB ─────────────────────────────────────────────────
const stories = [
  { label: "Arabic (ar)", data: ar },
  { label: "Persian (fa)", data: fa },
  { label: "Turkish (tr)", data: tr },
];

async function verifyNotExists(item) {
  const result = await docClient.send(
    new GetCommand({
      TableName: TABLE,
      Key: { siteId: item.siteId, langStoryId: item.langStoryId },
    })
  );
  return !result.Item;
}

async function pushStory(label, item) {
  // Validate JSON structure
  if (!item.siteId || !item.langStoryId || !item.lang || !item.title) {
    throw new Error(`${label}: Missing required fields`);
  }
  if (!Array.isArray(item.paragraphs) || item.paragraphs.length === 0) {
    throw new Error(`${label}: paragraphs must be a non-empty array`);
  }
  for (const [i, p] of item.paragraphs.entries()) {
    if (typeof p.text !== "string" || p.text.length === 0) {
      throw new Error(`${label}: paragraph ${i} has empty text`);
    }
    if (p.text.length > 600) {
      console.warn(
        `  ⚠ ${label} paragraph ${i + 1}: ${p.text.length} chars (over 500 soft limit)`
      );
    }
  }

  console.log(`\n▸ Pushing ${label}...`);
  console.log(`  siteId:      ${item.siteId}`);
  console.log(`  langStoryId: ${item.langStoryId}`);
  console.log(`  title:       ${item.title}`);
  console.log(`  paragraphs:  ${item.paragraphs.length}`);
  console.log(`  updatedAt:   ${item.updatedAt}`);

  await docClient.send(
    new PutCommand({
      TableName: TABLE,
      Item: item,
    })
  );

  // Verify it was written
  const verify = await docClient.send(
    new GetCommand({
      TableName: TABLE,
      Key: { siteId: item.siteId, langStoryId: item.langStoryId },
    })
  );
  if (!verify.Item) {
    throw new Error(`${label}: Verification failed — item not found after put`);
  }
  console.log(`  ✓ ${label} pushed and verified successfully`);
}

async function main() {
  console.log("═══════════════════════════════════════════════════");
  console.log("  Rudolf II Story — Push ar/fa/tr to DynamoDB");
  console.log("═══════════════════════════════════════════════════");
  console.log(`  Table:     ${TABLE}`);
  console.log(`  Timestamp: ${now} (${new Date(now * 1000).toISOString()})`);

  let success = 0;
  let failed = 0;

  for (const { label, data } of stories) {
    try {
      await pushStory(label, data);
      success++;
    } catch (err) {
      console.error(`  ✗ ${label} FAILED: ${err.message}`);
      failed++;
    }
  }

  console.log("\n═══════════════════════════════════════════════════");
  console.log(`  Done. ${success} succeeded, ${failed} failed.`);
  console.log("═══════════════════════════════════════════════════");

  if (failed > 0) process.exit(1);
}

main();
