import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English) ───
const base = {
  siteId: "terracotta-army",
  storyId: "farmer-discovery",
  icon: "\u{1F573}\uFE0F",
  tier: "A",
  readingTimeMinutes: 2,
  image: "",
  disabled: false,
  thumbnail: "",
  coordinates: { lng: 109.2785, lat: 34.3841 },
  hasAudio: false,
  isFree: true,
  storyCategory: "tricksters_folk_tales",
  source:
    'Yang Zhifa interviews, Shaanxi Provincial Institute reports, "The Terracotta Warriors" by John Man',
  characters: [
    "Yang Zhifa — the farmer who changed history",
    "Yang Quanyi and Yang Peiyan — fellow villagers",
    "Yuan Zhongyi — the archaeologist who led excavation",
  ],
  era: "1974 AD — Modern discovery",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════
//  ARABIC — حَفَرَ بِئرًا... فَوَجَدَ جَيشًا
//  Proverb subverted: «رُبَّ ضارّةٍ نافعة» (Perhaps a misfortune brings benefit)
//  — The "misfortune" was a drought; the "benefit" was an entire empire.
// ═══════════════════════════════════════════════════════════════════
const ar = {
  ...base,
  lang: "ar",
  langStoryId: "ar#farmer-discovery",
  title: "حَفَرَ بِئرًا... فَوَجَدَ جَيشًا",
  subtitle:
    "كيف قادَ العَطَشُ فلّاحًا صينيًّا إلى أعظمِ اكتشافٍ أثريّ في التاريخ",
  excerpt:
    "في آذار ١٩٧٤، في قريةٍ مُغبَرّة قربَ شِيآن في الصين، خرجَ فلّاحٌ اسمُهُ يانغ جِيفا ليحفِرَ بِئرًا. كانَ يبحثُ عن ماء — لا أكثر ولا أقلّ.",
  moralOrLesson:
    "أعظمُ الاكتشافاتِ لا تأتي لِمَن يبحثُ عنها، بل لِمَن يسعى خلفَ أبسطِ ما يحتاجُه.",
  paragraphs: [
    {
      text: "في آذار ١٩٧٤، في قريةٍ مُغبَرّةٍ على أطرافِ مدينةِ شِيآن وسَطَ الصين، خرجَ فلّاحٌ اسمُهُ يانغ جِيفا مع جارَين لحَفرِ بئر. كانَ الجَفافُ يخنُقُ الأرضَ، والمحاصيلُ تموتُ واقِفة. لم يكُن يبحثُ عن كَنزٍ أو مَجد — أرادَ ماءً يسُدّ عَطَشَه، لا أكثر. على عُمقِ أربعةِ أمتار، ارتطمَت مِجرَفتُهُ بشيءٍ صُلب. ظنّهُ حجرًا. لم يكن حجرًا.",
    },
    {
      text: "سحبَ من التُرابِ قِطعةَ طينٍ مَشويّ. ثمّ أخرى. ثمّ ما بدا رأسًا بشريًّا — عينانِ هادئتان، ابتسامةٌ غامضة، وشَعرٌ منحوتٌ بدقّةٍ مُذهلة، كلُّهُ من الصَلصال. تسمّرَ الفلّاحون. في المُعتقَدِ الشعبيّ الصينيّ، مَن يُقلقُ تماثيلَ مدفونةً يُطلقُ لعنةً لا تُرَدّ. كلُّ شيءٍ في داخلِ يانغ صرخ: أَعِدها إلى التُراب واذهَب.",
    },
    {
      text: "لكنّ الفُضولَ غلبَ — ومعَهُ عقليّةُ فلّاحٍ لا يرمي شيئًا قبلَ أن يعرفَ ما هو. حملَ القِطعَ على عربتِهِ وسارَ بها إلى مركزِ الآثارِ المحليّ. مكافأتُه؟ عشرةُ يوانات. دولارٌ ونصف. هذا كانَ ثمنُ أعظمِ اكتشافٍ أثريّ في القرنِ العشرين. يقولون رُبَّ ضارّةٍ نافعة — لكن هل خطرَ لأحدٍ أنّ الضارّةَ جَفاف، والنافعةَ إمبراطوريّةٌ كاملة تحتَ قدمَيك؟",
    },
    {
      text: "في أسابيع، وصلَ علماءُ آثارٍ من معهدِ شانشي الإقليمي وبدأوا الحفر. في أشهُر، تكشّفَت الحقيقةُ المَهولة: تحتَ حقولِ القمحِ الجافّةِ تلك، كانَ يرقُدُ جيشٌ كامل — أكثرُ من ثمانيةِ آلافِ جنديّ بالحجمِ الطبيعيّ، وخيولٌ وعرباتُ حرب، صُنعَت قبلَ ألفَي عام لحراسةِ ضريحِ تشين شي هوانغ، أوّلِ إمبراطورٍ وحّدَ الصينَ في دولةٍ واحدة.",
    },
    {
      text: "تغيّرَ كلُّ شيء. قريةُ يانغ الخامِلة صارَت من أكثرِ المواقعِ الأثريّةِ زيارةً في العالم. شِيآن قفزَت من مدينةٍ منسيّةٍ إلى وِجهةٍ عالميّة. والصينُ كسبَت رمزًا وطنيًّا يقفُ إلى جانبِ سورِها العظيم — دليلًا على أنّ حضارتَها القديمة لا تزالُ قادرةً على إذهالِ العالَم.",
    },
    {
      text: "لكنّ ما لا يُحكى أشدُّ مرارة. يانغ جِيفا خسرَ أرضَه — صادرَتها الدولةُ للتنقيبِ بلا تعويضٍ يُذكَر. المسؤولون حاولوا محوَ اسمِهِ من القصّة ونسبوا الفضلَ لأنفسِهم. الرجلُ الذي أخرجَ جيشَ إمبراطورٍ من التُراب لم يَستطِع حتّى إثباتَ أنّه كانَ هناك.",
    },
    {
      text: "بعدَ سنوات، منحَهُ المتحفُ وظيفةً في متجرِ الهدايا: يوقّعُ كُتبًا عن جيشِ الصلصالِ للسيّاح. تخيّلِ المشهد: رجلٌ في السبعينيّات، وجهُهُ نحتَتهُ عقودٌ من الشمس، يجلسُ خلفَ طاولةٍ صغيرة يكتبُ \"يانغ جِيفا — مُكتشِفُ جيشِ الصلصال\"، وخلفَ الجدارِ ثمانيةُ آلافِ جنديٍّ خالدٍ في صفوفٍ صامتة.",
    },
    {
      text: "رحلَ يانغ عام ٢٠٢٤ عن واحدٍ وتسعينَ عامًا. لم يثرَ. لم يشتهِر خارجَ تلكَ الطاولة. لكنّ كلَّ مَن قابلَهُ يروي الحكايةَ ذاتها: حينَ كانَ الزوّارُ يسألونه كيفَ وجدتَ إمبراطوريّة، كانَ يهُزُّ كتفَيهِ ويقول: \"كنتُ أحفرُ بئرًا. كنتُ عطشان.\"",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
//  PERSIAN — آب نیامد، ارتش درآمد
//  Proverb subverted: «نابُرده رنج، گنج میسّر نمی‌شود» (Saadi)
//  — Yang wasn't after treasure or hardship. He was just thirsty,
//    and the treasure came to him.
// ═══════════════════════════════════════════════════════════════════
const fa = {
  ...base,
  lang: "fa",
  langStoryId: "fa#farmer-discovery",
  title: "آب نیامد، ارتش درآمد",
  subtitle:
    "داستان کشاورزی که در جستجوی آب، بزرگ‌ترین کشف باستان‌شناسی تاریخ را از زیر خاک بیرون آورد",
  excerpt:
    "مارس ۱۹۷۴. روستایی خاک‌آلود نزدیک شهر شیان در مرکز چین. کشاورزی به نام یانگ جیفا دنبال آب می‌گشت — نه گنج، نه شهرت. فقط آب.",
  moralOrLesson:
    "بزرگ‌ترین کشف‌ها سراغ کسی نمی‌رود که دنبالشان بگردد، بلکه سراغ کسی می‌رود که ساده‌ترین نیازش را دنبال کند.",
  paragraphs: [
    {
      text: "مارس ۱۹۷۴. روستایی خاک‌آلود در حاشیه‌ی شهر شیان، در دل چین. کشاورزی به نام یانگ جیفا با دو همسایه‌اش راه افتاد تا چاه بکَنَد. خشکسالیِ بی‌رحمانه‌ای گلوی زمین‌شان را گرفته بود و محصول‌ها داشتند جان می‌دادند. نه دنبال گنج بود، نه دنبال شهرت — فقط آب می‌خواست. در عمق چهار متری، بیلش به چیز سختی خورد. فکر کرد سنگ است. سنگ نبود.",
    },
    {
      text: "یک تکه گِل پخته از خاک بیرون کشید. بعد یکی دیگر. بعد چیزی که شبیه سر انسان بود — دو چشم آرام، لبخندی محو، و موهایی که با دقت باورنکردنی تراشیده شده بودند، همه از جنس سفال. کشاورزها خشکشان زد. در باور عامه‌ی چینی، هر کس مجسمه‌های مدفون را بیدار کند، ارواح شیطانی آزاد می‌شوند. تمام وجود یانگ فریاد می‌زد: بگذارش سر جایش و فرار کن.",
    },
    {
      text: "اما کنجکاوی برنده شد — و آن عقل عملیِ کشاورزی که هیچ‌وقت چیزی را دور نمی‌اندازد تا نفهمد چیست. تکه‌ها را گذاشت توی فرغونش و برد اداره‌ی میراث فرهنگی محلی. پاداشش؟ دَه یوان. حدود یک دلار و نیم. همین بود بهای چیزی که بزرگ‌ترین کشف باستان‌شناسی قرن بیستم از آب درمی‌آمد.",
    },
    {
      text: "ظرف چند هفته، باستان‌شناسان از مؤسسه‌ی استانی شانشی رسیدند و شروع به کَندن کردند. ظرف چند ماه، تصویر کامل شد: زیر آن مزرعه‌های خشک گندم، یک ارتش تمام‌عیار خوابیده بود. بیش از هشت‌هزار سرباز به اندازه‌ی طبیعی، اسب‌ها و ارابه‌های جنگی — ساخته‌شده بیش از دوهزار سال پیش برای نگهبانی آرامگاه چین شی‌هوانگ، نخستین امپراتوری که چین را زیر یک پرچم متحد کرد.",
    },
    {
      text: "یک‌شبه همه‌چیز عوض شد. روستای گمنام یانگ شد یکی از پربازدیدترین مکان‌های باستانی دنیا. شیان از فراموشی پرید وسط نقشه‌ی جهانگردی جهان. و چین نمادی ملّی پیدا کرد هم‌وزن دیوار بزرگ — مُهری زنده بر اینکه تمدن کهنش هنوز قادر است دنیای مدرن را سر جایش میخکوب کند.",
    },
    {
      text: "اما بخشی از ماجرا که کسی تعریف نمی‌کند، تلخ‌تر است. زمین یانگ را برای حفاری مصادره کردند — تقریباً بدون هیچ غرامتی. مسئولان محلی سعی کردند اسمش را از تاریخ پاک کنند و افتخار کشف را به نام خودشان بزنند. مردی که ارتش یک امپراتور را از دل خاک بیرون آورده بود، حتی نمی‌توانست ثابت کند آن روز آنجا بوده.",
    },
    {
      text: "سال‌ها بعد، موزه بالاخره یک کار بهش داد: نشستن توی مغازه‌ی سوغاتی و امضا کردن کتاب برای گردشگران. تصورش کن: مردی هفتادوچندساله، صورتش را ده‌ها سال آفتاب شخم زده، پشت یک میز کوچک نشسته و می‌نویسد «یانگ جیفا — کاشف سربازان سفالی» — و آن‌طرف دیوار، هشت‌هزار سرباز جاودانه در صف‌های خاموش ایستاده‌اند.",
    },
    {
      text: "یانگ جیفا سال ۲۰۲۴ در نود‌ویک‌سالگی رفت. نه پولدار شد، نه معروف — جز پشت همان میز. اما هر کس دیده بودش، یک چیز تعریف می‌کرد: وقتی بازدیدکننده‌ها می‌پرسیدند «چطور یک امپراتوری پیدا کردی؟»، شانه بالا می‌انداخت و می‌گفت: «داشتم چاه می‌کَندم. تشنه‌ام بود.» می‌گویند نابُرده رنج، گنج میسّر نمی‌شود — ولی یانگ نه دنبال گنج بود نه دنبال رنج؛ فقط تشنه بود، و گنج خودش آمد سراغش.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
//  TURKISH — Kuyu Kazdı, Ordu Buldu
//  Proverb subverted: «Su testisi su yolunda kırılır»
//  (The water jug breaks on the way to water)
//  — Sometimes what spills from the broken jug isn't water
//    but an empire.
// ═══════════════════════════════════════════════════════════════════
const tr = {
  ...base,
  lang: "tr",
  langStoryId: "tr#farmer-discovery",
  title: "Kuyu Kazdı, Ordu Buldu",
  subtitle:
    "Susuzluktan kuyu kazmaya çıkan bir Çinli çiftçinin tarihin en büyük arkeolojik keşfini yapma hikâyesi",
  excerpt:
    "Mart 1974. Çin'in ortasında, Xi'an şehrinin kıyısında tozlu bir köy. Yang Zhifa adında bir çiftçi kuyu kazmaya çıktı. Aradığı tek şey suydu — başka hiçbir şey değil.",
  moralOrLesson:
    "En büyük keşifler onları arayanları değil, en basit ihtiyacının peşine düşenleri bulur.",
  paragraphs: [
    {
      text: "Mart 1974, Çin'in tam ortasında, Xi'an şehrinin kenarında tozlu bir köy. Yang Zhifa adında bir çiftçi, iki komşusuyla birlikte kuyu kazmaya çıktı. Amansız bir kuraklık ekinlerini kavuruyordu, toprak çatlayıp susuzluktan yalvarır gibiydi. Hazine peşinde değildi, şöhret peşinde değildi — sadece bir yudum su istiyordu. Dört metre derinlikte küreği sert bir şeye çarptı. Taş sandı. Taş değildi.",
    },
    {
      text: "Topraktan pişmiş bir kil parçası çıkardı. Sonra bir parça daha. Sonra bir insan başına benzeyen bir şey — sakin bakışlı gözler, belli belirsiz bir gülümseme ve özenle yontulmuş saçlar. Hepsi pişmiş topraktan. Çiftçiler olduğu yere çakılıp kaldı. Çin halk inancına göre gömülü heykelleri rahatsız eden kişi kötü ruhları serbest bırakır. Yang'ın her hücresi aynı şeyi haykırıyordu: Geri koy ve uzaklaş.",
    },
    {
      text: "Ama merak galip geldi — bir de o çiftçi inadı; hiçbir şeyi ne olduğunu anlamadan bırakmaz. Parçaları el arabasına yükledi, doğruca yerel kültür varlıkları merkezine götürdü. Ödülü mü? On yuan. Kabaca bir buçuk dolar. Yirminci yüzyılın en büyük arkeolojik keşfinin bedeliydi bu — bir buçuk dolar.",
    },
    {
      text: "Haftalar içinde Shaanxi Eyalet Enstitüsü'nden arkeologlar gelip kazmaya başladı. Aylar içinde tablonun tamamı gözler önüne serildi: o kupkuru buğday tarlalarının altında koca bir ordu yatıyordu. Sekiz binden fazla gerçek boyutlu asker, atlar ve savaş arabaları — iki bin yılı aşkın süre önce Çin'i tek çatı altında birleştiren ilk imparator Qin Shi Huang'ın mezarını korumak için yapılmışlardı.",
    },
    {
      text: "Bir gecede her şey alt üst oldu. Yang'ın sessiz köyü dünyanın en çok ziyaret edilen arkeolojik alanlarından birine dönüştü. Xi'an, unutulmuş bir iç şehirden dünya çapında bir turizm merkezine sıçradı. Çin, Büyük Duvar'la boy ölçüşecek bir ulusal sembol kazandı — kadim medeniyetinin modern dünyayı hâlâ yerinden sarsabileceğinin yaşayan kanıtı.",
    },
    {
      text: "Ama hikâyenin anlatılmayan kısmı daha acı. Yang Zhifa'nın toprakları kazı için el konuldu — tazminat neredeyse hiç. Yerel yetkililer onu hikâyeden silmeye çalıştı, keşfin şerefini kendilerine yazdı. Bir imparatorun ordusunu topraktan çıkaran adam, o gün orada olduğunu bile kanıtlayamıyordu.",
    },
    {
      text: "Yıllar sonra müze ona hediyelik eşya dükkânında bir iş verdi: turistlere Toprak Ordusu kitaplarını imzalamak. Şu sahneyi bir düşün: yetmişlerinde bir çiftçi, yüzünü onlarca yıllık güneş kazımış, küçücük bir masanın arkasında oturmuş, \"Yang Zhifa — Toprak Savaşçılarının Kâşifi\" yazıyor. Duvarın öbür tarafında ise sekiz bin ölümsüz asker sessiz sıralar hâlinde dikiliyor.",
    },
    {
      text: "Yang Zhifa 2024'te doksan bir yaşında hayata gözlerini yumdu. Zengin olmadı. O küçük masanın ötesinde ünlü de olmadı. Ama onu tanıyan herkes aynı şeyi anlatır: Ziyaretçiler \"Bir imparatorluğu nasıl buldunuz?\" diye sorduğunda omuzlarını silker, \"Kuyu kazıyordum,\" derdi. \"Susuzdum, o kadar.\" Derler ki su testisi su yolunda kırılır — ama bazen kırılan testiden su değil, koca bir imparatorluk dökülür.",
    },
  ],
};

// ─── Push ───
async function push(label, item) {
  console.log(`\n⏳  Pushing ${label}...`);
  // Validate critical fields
  if (!item.siteId || !item.langStoryId || !item.lang || !item.title) {
    throw new Error(`${label}: missing required field`);
  }
  if (!item.paragraphs || item.paragraphs.length < 6) {
    throw new Error(
      `${label}: expected 6-8 paragraphs, got ${item.paragraphs?.length}`
    );
  }
  // Validate each paragraph is non-empty
  for (let i = 0; i < item.paragraphs.length; i++) {
    if (!item.paragraphs[i].text || item.paragraphs[i].text.length < 50) {
      throw new Error(`${label}: paragraph ${i} too short or empty`);
    }
  }

  await docClient.send(
    new PutCommand({ TableName: "Story", Item: item })
  );
  console.log(
    `✅  ${label} pushed — langStoryId="${item.langStoryId}", ${item.paragraphs.length} paragraphs`
  );
}

(async () => {
  try {
    await push("Arabic", ar);
    await push("Persian", fa);
    await push("Turkish", tr);
    console.log("\n🎉  All three languages pushed successfully.\n");
  } catch (err) {
    console.error("\n❌  Push failed:", err);
    process.exit(1);
  }
})();
