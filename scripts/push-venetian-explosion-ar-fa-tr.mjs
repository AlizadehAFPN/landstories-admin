import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English) ───
const shared = {
  siteId: "acropolis-athens",
  storyId: "venetian-explosion",
  icon: "😢",
  tier: "A",
  source: "Contemporary accounts by Venetian officers, Cristoforo Ivanovich's Historia della Lega Santa, modern archaeological analysis",
  readingTimeMinutes: 2,
  image: "",
  thumbnail: "",
  coordinates: { lng: 23.7267, lat: 37.9715 },
  hasAudio: false,
  isFree: true,
  storyCategory: "lost_found",
  disabled: false,
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════
// ARABIC (ar)
// Proverb subverted: الثالثة ثابتة (Third time's the charm)
// ═══════════════════════════════════════════════════════════════
const arabic = {
  ...shared,
  lang: "ar",
  langStoryId: "ar#venetian-explosion",
  title: "ليلة سقوط البارثينون",
  subtitle: "حين أنهت قنبلةٌ واحدة ما عجز عنه ألفا عام",
  excerpt: "صَمَدَ البارثينون أكثر من ألفَي عام أمام كلّ ما رماه به الزمن. ثم جاءت ليلة واحدة غيّرت كلّ شيء.",
  era: "٢٦ سبتمبر ١٦٨٧",
  characters: [
    "فرانشيسكو موروزيني",
    "الكونت كونيغسمارك",
    "المدافعون العثمانيّون",
    "الضحايا الثلاثمئة",
  ],
  moralOrLesson:
    "الحرب تدمّر ما لا يقدر عليه الزمن. صَمَدَ البارثينون أكثر من ألفَي عام، ثم تمزّق في ليلة واحدة. ما ورثناه ثمين — وأكثر هشاشةً ممّا نظنّ.",
  paragraphs: [
    {
      text: "أكثرُ من ألفَي عامٍ والبارثينون يقف فوق تلّة الأكروبوليس في أثينا، يتحدّى كلَّ ما يُلقيه القَدَر في طريقه. زلازل، حرائق، جيوشٌ من نصف دزّينة إمبراطوريات. تحوّلَ من معبدٍ يونانيّ إلى كنيسة مسيحيّة إلى مسجدٍ عثمانيّ. سُلِبَ من تماثيله وألوانه، لكنّ هيكلَه بقيَ واقفًا يُعاند الزمن. ثم جاء مساءُ السادس والعشرين من سبتمبر ١٦٨٧، وقنبلةٌ واحدة غيّرت كلّ شيء — إلى الأبد.",
    },
    {
      text: "لنعُد إلى البداية. البندقيّة والدولة العثمانية كانتا في حربٍ طاحنة على شرق المتوسّط — جُزُره وموانئه وطُرُق تجارته. أبحرَ الجنرال الإيطالي فرانشيسكو موروزيني بأسطولٍ كامل نحو اليونان وفرضَ حصارًا على أثينا. الحامية العثمانية، وكانت أقلَّ عددًا بكثير، لم تجد أمامها إلّا الانسحاب إلى أعلى نقطة في المدينة: تلّة الأكروبوليس — حيث كان البارثينون لا يزال أقوى حصنٍ في أثينا.",
    },
    {
      text: "هنا اتّخذ القائد العثماني القرارَ الذي سيلاحقه التاريخ. نقلَ كاملَ مخزون البارود — عشرات البراميل — إلى داخل البارثينون. منطقُه لم يكن أحمق: طوال قرون، تجنّبت الجيوش المهاجِمة قصفَ المبنى لأنّه كان كنيسة مسيحيّة. راهنَ على أنّ البنادقة، بصفتهم مسيحيّين، لن يجرؤوا على ضرب مكانٍ مقدّس. كان رهانًا منطقيًّا. وكان خطأً قاتلًا.",
    },
    {
      text: "ضابطٌ سويدي يُدعى الكونت فون كونيغسمارك كان يُقاتل في صفوف البنادقة. وجّهَ مدافعَه مباشرةً نحو التلّة. ثلاثة أيام من القصف المتواصل بدءًا من الثالث والعشرين من سبتمبر — قذائفُ تنهال على جدرانٍ وأعمدةٍ عمرُها ألفا عام. ثم، قرابة السابعة مساءً من يوم السادس والعشرين، رسمَت قذيفةُ هاون قوسًا في السماء، اخترقت سقفَ البارثينون، وسقطت مباشرةً فوق البارود.",
    },
    {
      text: "يُقال: الثالثةُ ثابتة. صَمَدَ البارثينون للزلازل — فنجا. صَمَدَ لتبدُّل الإمبراطوريات — فبقي. لكنّ الثالثة جاءت على شكل قنبلة. الانفجارُ قتلَ ثلاثمئة إنسان في لحظة: جنودًا ونساءً وأطفالًا لجأوا إلى المبنى طلبًا للأمان. انشقَّ قلبُ البارثينون — ثمانية أعمدة من الجنوب اختفت، ستة من الشمال تحطّمت، والغرفة الداخلية بأكملها تلاشت. منحوتاتٌ نُحِتَت في عصر بيريكليس — أي قبل أكثر من ألفَي عام — تحوّلت إلى شظايا تطايرت مئات الأمتار.",
    },
    {
      text: "وكأنّ الدمار لم يكن كافيًا، زاد موروزيني الطينَ بِلّة. دخلَ الأنقاض وقرّر أن يأخذ غنيمة: أحصنةً حجرية ضخمة كانت تزيّن أعلى المبنى. ربطَ عمّاله الحبالَ حولها لإنزالها. انقطعت الحبال. تحطّمت الأحصنة على الأرض. واحتلّ البنادقة أثينا أقلّ من عام قبل أن يتخلّوا عنها. حصيلتُهم الكبرى: خرابٌ صنعوه بأيديهم ولم يستطيعوا حتى نهبَه كما يجب.",
    },
    {
      text: "في المرة القادمة حين ترى صورة البارثينون — تلك الصورة الشهيرة بأعمدتها وفراغاتها حيث كان السقف — اعلم أنّك تنظر إلى ندبة ليلةٍ واحدة. كلّ فراغٍ كان فيه تمثال، كلّ عمود مكسور، كلّ جدار ينقطع في الهواء — ذلك هو مساء السادس والعشرين من سبتمبر ١٦٨٧. ما عجزَ عنه الزمنُ في واحدٍ وعشرين قرنًا، فعلتهُ الحربُ في ليلة.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// PERSIAN (fa)
// Proverb subverted: سنگ صبور (The Patience Stone — shatters
// when it can bear no more)
// ═══════════════════════════════════════════════════════════════
const persian = {
  ...shared,
  lang: "fa",
  langStoryId: "fa#venetian-explosion",
  title: "شبی که سنگِ صبور ترکید",
  subtitle: "وقتی یک گلوله‌ی خمپاره کاری کرد که دو هزار سال نتوانسته بود",
  excerpt:
    "پارتنون بیش از دو هزار سال در برابر همه چیز ایستاده بود. زلزله، آتش، لشکرهای یک‌دوجین امپراتوری. تا اینکه یک شب، همه چیز عوض شد.",
  era: "۲۶ سپتامبر ۱۶۸۷",
  characters: [
    "فرانچسکو موروزینی",
    "کُنت فون کونیگسمارک",
    "مدافعان عثمانی",
    "سیصد قربانی",
  ],
  moralOrLesson:
    "جنگ چیزی را نابود می‌کند که زمان نمی‌تواند. پارتنون بیش از دو هزار سال ایستاد و در یک شب از هم پاشید. آنچه به ارث برده‌ایم گران‌بهاست — و بسیار شکننده‌تر از آنچه فکر می‌کنیم.",
  paragraphs: [
    {
      text: "بیش از دو هزار سال بود که پارتنون بالای تپه‌ی آکروپولیس در آتن ایستاده بود و هر چه روزگار به سمتش پرت می‌کرد تاب می‌آورد. زلزله — تاب آورد. آتش — تاب آورد. لشکر پشت لشکر از امپراتوری‌های مختلف آمدند و رفتند. یونانی‌ها معبدش کردند، مسیحی‌ها کلیسا، عثمانی‌ها مسجد. مجسمه‌هایش را بردند، رنگ‌هایش را پاک کردند، اما استخوان‌بندی‌اش سرِپا ماند. تا شامگاه بیست‌وششم سپتامبر ۱۶۸۷ — شبی که سنگ صبور بالاخره ترکید.",
    },
    {
      text: "ماجرا از یک جنگ بزرگ شروع شد. ونیز و امپراتوری عثمانی سر شرق مدیترانه به جان هم افتاده بودند — جزیره‌ها، بندرها، مسیرهای تجاری. ژنرال ایتالیایی فرانچسکو موروزینی با یک ناوگان کامل به سمت یونان حرکت کرد و آتن را محاصره کرد. نیروهای عثمانی که از نظر تعداد حرفی برای گفتن نداشتند، عقب‌نشینی کردند به بالاترین نقطه‌ی شهر: تپه‌ی آکروپولیس — جایی که پارتنون هنوز محکم‌ترین سنگر آتن بود.",
    },
    {
      text: "و بعد، فرمانده‌ی عثمانی تصمیمی گرفت که تاریخ هرگز فراموشش نکرد. تمام ذخیره‌ی باروت — بشکه پشت بشکه — را برد داخل پارتنون. منطقش هم بی‌پایه نبود: قرن‌ها بود که لشکرهای مهاجم این ساختمان را نشانه نمی‌گرفتند چون کلیسای مسیحی بود. حساب‌وکتابش ساده بود — ونیزی‌ها مسیحی‌اند، کلیسا را نمی‌زنند. حسابش درست بود. اما جواب آخر اشتباه از آب درآمد.",
    },
    {
      text: "یک افسر سوئدی به نام کُنت فون کونیگسمارک که در صف ونیزی‌ها می‌جنگید، توپ‌هایش را مستقیم رو به تپه نشانه گرفت. سه روز توپ‌باران بی‌وقفه از بیست‌وسوم سپتامبر — گلوله پشت گلوله روی دیوارها و ستون‌هایی می‌خورد که دو هزار سال عمر داشتند. بعد، حدود ساعت هفت عصر بیست‌وششم، یک گلوله‌ی خمپاره قوسی در آسمان کشید، از سقف پارتنون رد شد، و درست وسط بشکه‌های باروت فرود آمد.",
    },
    {
      text: "انفجار سیصد نفر را در یک چشم به هم زدن کشت — سرباز، زن، بچه‌هایی که به امیدِ امنیت پناه آورده بودند. قلب پارتنون از هم شکافت. هشت ستون از ضلع جنوبی — غیب شدند. شش ستون از شمالی — نابود. تالار درونی — دود شد و رفت. مجسمه‌هایی که در دوران پریکلِس، بیش از دو هزار سال پیش، تراشیده شده بودند، خُرد شدند یا صدها متر آن‌طرف‌تر پرت شدند. تکه‌سنگ‌های مرمری چندتُنّی مثل تاسِ نرد روی تپه پخش شدند.",
    },
    {
      text: "انگار خرابی کافی نبود. موروزینی وارد ویرانه‌ها شد و هوس سوغاتی به سرش زد — مجسمه‌های اسب سنگی عظیمی که بالای ساختمان بودند. کارگرهایش طناب بستند تا پایین‌شان بیاورند. طناب‌ها پاره شدند. اسب‌ها به زمین کوبیده شدند و تکه‌تکه شدند. ونیزی‌ها کمتر از یک سال آتن را نگه داشتند و بعد ولش کردند و رفتند. دستاورد بزرگ‌شان: ویرانه‌ای که خودشان ساخته بودند و حتی نتوانستند درست غارتش کنند.",
    },
    {
      text: "دفعه‌ی بعد که عکس پارتنون را دیدی — آن نمای معروف با ردیف ستون‌ها و جاهای خالی جایی که سقف بود — بدان که داری جای زخمِ یک شب را نگاه می‌کنی. هر جای خالیِ یک مجسمه، هر ستون شکسته، هر دیواری که وسط هوا قطع می‌شود — مال همان شامگاه است: بیست‌وششم سپتامبر ۱۶۸۷. آنچه زمان در بیست‌ویک قرن نتوانست بکند، جنگ در یک شب کرد.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// TURKISH (tr)
// Proverb subverted: "Sabır taşı bile çatlar"
// (Even the patience stone cracks)
// ═══════════════════════════════════════════════════════════════
const turkish = {
  ...shared,
  lang: "tr",
  langStoryId: "tr#venetian-explosion",
  title: "Sabır Taşının Çatladığı Gece",
  subtitle: "Bir bombanın iki bin yıllık tarihi yerle bir ettiği gece",
  excerpt:
    "Parthenon iki bin yılı aşkın süredir ayaktaydı. Depremler, yangınlar, düzinelerce ordunun saldırısı — hiçbiri yıkamadı. Ta ki tek bir mermi her şeyi değiştirene kadar.",
  era: "26 Eylül 1687",
  characters: [
    "Francesco Morosini",
    "Kont von Königsmark",
    "Osmanlı savunucuları",
    "300 kurban",
  ],
  moralOrLesson:
    "Savaş, zamanın yapamadığını yapar. Parthenon iki bin yılı aşkın süre ayakta kaldı, sonra tek bir gecede paramparça oldu. Miras aldıklarımız çok değerli — ve sandığımızdan çok daha kırılgan.",
  paragraphs: [
    {
      text: "İki bin yılı aşkın bir süredir Parthenon, Atina'daki Akropolis tepesinin üzerinde dimdik duruyordu. Tarih ne attıysa göğüsledi. Depremler — dayandı. Yangınlar — dayandı. Yarım düzine imparatorluğun orduları geldi geçti. Yunan tapınağıydı, Hristiyan kilisesi oldu, Osmanlı camisi oldu. Heykellerini söktüler, boyalarını sildiler ama iskeleti sapasağlam ayaktaydı. Derler ya, sabır taşı bile çatlar. 26 Eylül 1687 akşamı, o taş çatladı.",
    },
    {
      text: "İşin arka planı şuydu: Venedik ile Osmanlı İmparatorluğu, Doğu Akdeniz'in hâkimiyeti için birbirine girmişti — adalar, limanlar, ticaret yolları. Venedikli General Francesco Morosini komutasındaki bir donanma Yunanistan'a yelken açtı ve Atina'yı kuşattı. Sayıca çok geride kalan Osmanlı garnizonu, şehrin en yüksek ve en korunaklı noktasına çekilmekten başka çare bulamadı: Akropolis tepesi — Parthenon'un hâlâ kentin en güçlü kalesi olduğu yer.",
    },
    {
      text: "Tam bu noktada Osmanlı komutanı tarihin unutamayacağı bir karar verdi. Bütün barut stokunu — fıçı fıçı barutu — Parthenon'un içine taşıttı. Mantığı çürük değildi: yüzyıllar boyunca saldıran ordular bu binayı hedef almaktan kaçınmıştı çünkü bir Hristiyan kilisesiydi. Venedikliler de Hristiyandı; kiliseyi bombalamayacaklardı. Mantıklı bir kumardı. Ama sonucu yıkım olacaktı.",
    },
    {
      text: "Venedik saflarında savaşan İsveçli bir subay vardı: Kont von Königsmark. Toplarını doğrudan tepeye çevirdi. 23 Eylül'den itibaren üç gün aralıksız bombardıman — iki bin yıllık duvarlara ve sütunlara mermi üstüne mermi yağdı. Sonra, 26 Eylül akşamı saat yedi sularında, bir havan mermisi gökyüzünde bir yay çizerek Parthenon'un çatısını deldi ve barut fıçılarının tam ortasına düştü.",
    },
    {
      text: "Patlama üç yüz kişiyi bir anda öldürdü — askerler, kadınlar, güvendeyiz diye sığınan çocuklar. Parthenon'un göbeği paramparça oldu. Güney cephesinden sekiz sütun — silindi. Kuzeyden altı sütun — yok oldu. İç salon tamamen havaya uçtu. Perikles döneminde — yani iki bini aşkın yıl önce — yontulmuş heykeller ya tuz buz oldu ya yüzlerce metre öteye fırladı. Tonlarca ağırlığındaki mermer bloklar tepenin üzerine zar gibi saçıldı.",
    },
    {
      text: "Sanki bu yıkım yetmezmiş gibi, Morosini enkazın içine girip ganimet almaya kalktı — binanın tepesini süsleyen devasa taş at heykellerini indirmeye. Adamları halatlarla heykelleri sarkıtmaya çalıştı. Halatlar koptu. Atlar yere çakılıp paramparça oldu. Venedikliler Atina'yı bir yıldan kısa tuttular, sonra bırakıp gittiler. Büyük ganimetleri: kendi elleriyle yarattıkları bir harabe — üstelik onu bile adam akıllı yağmalayamadılar.",
    },
    {
      text: "Bir dahaki sefere Parthenon'un fotoğrafını gördüğünüzde — o meşhur siluet, sütun dizisi, çatının olması gereken yerdeki boşluk — bilin ki tek bir gecenin izine bakıyorsunuz. Her boş heykel yeri, her kırık sütun, her havada yarım kalan duvar — 26 Eylül 1687 akşamının eseri. Yirmi bir yüzyılın yıkamadığını savaş bir gecede yıktı.",
    },
  ],
};

// ─── Push all three ───
async function pushStory(story) {
  const label = `${story.lang} — ${story.title}`;
  console.log(`\nPushing ${label} ...`);
  try {
    await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: story,
        ConditionExpression:
          "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
      })
    );
    console.log(`  ✓ ${label} pushed successfully.`);
    return true;
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(`  ⚠ ${label} already exists. Overwriting...`);
      await docClient.send(
        new PutCommand({ TableName: TABLE, Item: story })
      );
      console.log(`  ✓ ${label} overwritten successfully.`);
      return true;
    }
    console.error(`  ✗ ${label} FAILED:`, err.message);
    return false;
  }
}

// Verify each push by reading back
import { GetCommand } from "@aws-sdk/lib-dynamodb";

async function verifyStory(story) {
  const res = await docClient.send(
    new GetCommand({
      TableName: TABLE,
      Key: { siteId: story.siteId, langStoryId: story.langStoryId },
    })
  );
  if (res.Item && res.Item.title === story.title) {
    console.log(
      `  ✓ Verified ${story.lang}: title="${res.Item.title}", paragraphs=${res.Item.paragraphs.length}`
    );
    return true;
  }
  console.error(`  ✗ Verification FAILED for ${story.lang}`);
  return false;
}

async function main() {
  console.log("═══ Pushing venetian-explosion in ar, fa, tr ═══");
  console.log(`Timestamp: ${now}`);

  // Push sequentially to confirm each before moving on
  for (const story of [arabic, persian, turkish]) {
    const ok = await pushStory(story);
    if (!ok) {
      console.error(`Aborting — failed on ${story.lang}`);
      process.exit(1);
    }
    const verified = await verifyStory(story);
    if (!verified) {
      console.error(`Aborting — verification failed on ${story.lang}`);
      process.exit(1);
    }
  }

  console.log("\n═══ All 3 stories pushed and verified ═══");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
