import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const TABLE = "Story";
const NOW = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English) ───
const shared = {
  siteId: { S: "potala-palace" },
  storyId: { S: "dalai-lama-escape-1959" },
  icon: { S: "🏔️" },
  tier: { S: "A" },
  source: { S: 'Dalai Lama, "Freedom in Exile" (autobiography, 1990); Jamyang Norbu, "Warriors of Tibet"; CIA declassified records' },
  characters: {
    L: [
      { S: "Fourteenth Dalai Lama (Tenzin Gyatso) — the escaped god-king" },
      { S: "Tibetan resistance fighters who protected him" },
      { S: "CIA operatives who may have assisted the escape" },
    ],
  },
  era: { S: "s Republic of China period" },
  readingTimeMinutes: { N: "3" },
  image: { S: "" },
  disabled: { BOOL: false },
  thumbnail: { S: "" },
  coordinates: { M: { lng: { N: "91.1169" }, lat: { N: "29.6575" } } },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "crowns_conquests" },
  updatedAt: { N: String(NOW) },
};

// ════════════════════════════════════════════════
//  ARABIC (ar)
// ════════════════════════════════════════════════

const ar = {
  ...shared,
  lang: { S: "ar" },
  langStoryId: { S: "ar#dalai-lama-escape-1959" },
  title: { S: "الفِرَارُ مِن سَقْفِ العَالَم" },
  subtitle: { S: "هُرُوبُ المَلِكِ المُقَدَّسِ مِن قَصرِهِ في جُنحِ اللَّيل" },
  moralOrLesson: {
    S: "أحيانًا أشجَعُ ما يَفعَلُهُ القائِدُ هُوَ الرَّحِيل — لا لِيَتخَلّى عَن شَعبِه، بَل لِيَضمَنَ أنَّ إيمانَهُم يَبقَى أَطوَلَ عُمرًا مِن كُلِّ ما حاوَلَ تَدمِيرَه.",
  },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "في مارِسَ ١٩٥٩، كانَ مَصِيرُ دِينٍ بِأَكمَلِهِ مُعَلَّقًا بَينَ يَدَي شابٍّ في الثَّالِثَةِ والعِشرِين. اسمُهُ تِنزِن غْيَاتسُو — الدّالاي لاما الرّابِعَ عَشَر، الزَّعيمُ الرُّوحِيُّ لِلتِّبِت — وكانَ الجَيشُ الصِّينيُّ قَد أَحكَمَ الطَّوقَ حَولَ مَدينَةِ لاسا، عاصِمَةِ التِّبِت. طَلَبوا مِنهُ أَن يَحضُرَ وَحدَهُ إلى مُعَسكَرٍ عَسكَرِيٍّ لِحُضورِ ما سَمَّوهُ «عَرضًا ثَقافِيًّا». لَم يُصَدِّقْ أحَدٌ في التِّبِتِ هَذِهِ الكَذِبَة.",
          },
        },
      },
      {
        M: {
          text: {
            S: "ثَلاثونَ أَلفَ تِبِتيٍّ هَبُّوا لِإنقاذِه. تَدَفَّقوا نَحوَ قَصرِ نُوربُولِينكَا الصَّيفيِّ وشَكَّلوا جِدارًا بَشَريًّا حَولَهُ — فَلّاحونَ ورُهبانٌ وأُمَّهاتٌ يَحمِلنَ أَطفالَهُنّ. وَقَفوا كَتِفًا بِكَتِف، يَتَحَدَّونَ جَيشًا بِأَكمَلِهِ بِأَن يَمُرَّ مِن خِلالِهِم. شَجاعَةٌ تَكسِرُ القَلب، لِأنَّ كُلَّ مَن وَقَفَ هُناكَ كانَ يَعرِفُ كَيفَ سَتَنتَهي هَذِهِ المُواجَهَة.",
          },
        },
      },
      {
        M: {
          text: {
            S: "فَفي لَيلَةِ السَّابِعَ عَشَرَ مِن مارِس، اختَفى أَشهَرُ وَجهٍ في التِّبِت. خَلَعَ رِداءَ الرّاهِب، نَزَعَ نَظّارَتَهُ، عَلَّقَ بُندُقِيَّةً على كَتِفِه، وخَرَجَ مُتَنَكِّرًا في زِيِّ جُندِيٍّ عادِيّ. عَبَرَ نَهرَ كْيِتشُو في الظَّلام، ومَرَّ بَينَ الآلافِ الذينَ جاءوا لِحِمايَتِهِ دونَ أَن يَعرِفَهُ أحَد. كَتَبَ لاحِقًا: «كُنتُ أَمشي نَحوَ الحُرِّيَّة، لَكِنَّني شَعَرتُ أنَّني أَترُكُ شَعبي خَلفي.»",
          },
        },
      },
      {
        M: {
          text: {
            S: "ما تَلا ذَلِكَ كانَ أُسبُوعَينِ مِنَ الجَحيم. مَمَرّاتٌ جَبَلِيَّةٌ تَرتَفِعُ فَوقَ خَمسَةِ آلافِ مِتر — أَعلى مِن أَيِّ قِمَّةٍ في أُوروبّا — وَسَطَ عَواصِفَ ثَلجِيَّةٍ وبَردٍ يَنخُرُ العِظام. طائِراتٌ صِينِيَّةٌ تُمَشِّطُ السَّماءَ بَحثًا عَنه. كانَ مَريضًا، مُنهَكًا، بالكادِ يَأكُل. خَمسَةَ عَشَرَ يَومًا عَبرَ أَعلى بُقعَةٍ على وَجهِ الأرض، لا يَعرِفُ إن كانَ الوادي القادِمُ يَحمِلُ الحُرِّيَّةَ أَم فَرقَةَ إعدام.",
          },
        },
      },
      {
        M: {
          text: {
            S: "في الحادي والثَّلاثِينَ مِن مارِس وَطِئَت قَدَماهُ أَرضَ الهِند. مَنَحَهُ رَئيسُ الوُزَراءِ نَهرُو حَقَّ اللُّجوء، فَأَسَّسَ الدّالاي لاما حُكومَةً تِبِتيَّةً في المَنفى بِمَدينَةِ دَرَامسالا، بَلدَةٍ جَبَلِيَّةٍ هادِئَةٍ شَمالَ الهِند — ولا تَزالُ قائِمَةً حَتّى اليَوم، بَعدَ أَكثَرَ مِن سِتِّينَ عامًا. أمّا في التِّبِت، فَقُمِعَتِ الانتِفاضَةُ بِلا رَحمَة. قُتِلَ عَشَراتُ الآلاف، وتَحَوَّلَ قَصرُ بُوتالا إلى مَتحَف، وانتَهَت ثَلاثَةُ قُرونٍ مِن حُكمِ الدّالاي لاما بَينَ لَيلَةٍ وضُحاها.",
          },
        },
      },
      {
        M: {
          text: {
            S: "لَم يَعُدْ قَطّ. اليَومَ، وهُوَ في التِّسعينَ مِن عُمرِه، يُلَمِّحُ إلى أنَّهُ قَد يَكونُ آخِرَ دالاي لاما — أَو أنَّ خَليفَتَهُ قَد يُولَدُ خارِجَ التِّبِت، وربَّما يَكونُ امرَأة. سِلسِلَةٌ مُتَّصِلَةٌ مِنَ الزُّعَماءِ الرُّوحيِّينَ تَمتَدُّ إلى القَرنِ السّابِعَ عَشَر قَد تَنتَهي عِندَ ذَلِكَ الشّابِّ الذي خَرَجَ مِن بَوَّابَةِ قَصرِهِ ذاتَ لَيلَةٍ وعُمرُهُ ثَلاثَةٌ وعِشرونَ عامًا.",
          },
        },
      },
      {
        M: {
          text: {
            S: "ومَعَ ذَلِك، في كُلِّ صَباحٍ يَطوفُ حُجّاجٌ تِبِتيُّونَ حَولَ قَصرِ بُوتالا، يُدِيرونَ عَجَلاتِ الصَّلاةِ ويَهمِسون: «لِيَعُدْ قَداسَتُهُ في هَذِهِ الحَياة.» أَكثَرُ مِن سِتِّينَ عامًا وهُم يُردِّدونَ الدُّعاءَ نَفسَه. يَقولونَ: مَن غابَ عَنِ العَينِ غابَ عَنِ القَلب. لَكِنَّ شَعبًا كامِلًا يُثبِتُ كُلَّ صَباحٍ أنَّ بَعضَ الغِيابِ لا يَزيدُ القَلبَ إلّا تَمَسُّكًا. أحيانًا أشجَعُ ما يَفعَلُهُ القائِدُ أَن يَمضِي — لا لِيَتخَلّى عَن شَعبِه، بَل لِيَضمَنَ أنَّ إيمانَهُم يَعِيشُ أَطوَلَ مِن كُلِّ ما حاوَلَ تَدمِيرَه.",
          },
        },
      },
    ],
  },
};

ar.excerpt = { S: ar.paragraphs.L[0].M.text.S };

// ════════════════════════════════════════════════
//  PERSIAN (fa)
// ════════════════════════════════════════════════

const fa = {
  ...shared,
  lang: { S: "fa" },
  langStoryId: { S: "fa#dalai-lama-escape-1959" },
  title: { S: "گریز از بام دنیا" },
  subtitle: { S: "شبی که یک خدای زنده در تاریکی ناپدید شد" },
  moralOrLesson: {
    S: "گاهی شجاعانه‌ترین کارِ یک رهبر رفتن است — نه برای رها کردنِ مردمش، بلکه تا ایمانشان از هر چیزی که خواست نابودش کند، بیشتر عمر کند.",
  },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "مارسِ ۱۹۵۹. سرنوشتِ یک آیین بر شانه‌های جوانی بیست‌وسه‌ساله سنگینی می‌کرد. نامش تِنزین گیاتسو بود — دالایی لامای چهاردهم، رهبر روحانی تبت — و ارتش چین شهرش لَهاسا، پایتخت تبت را در محاصره گرفته بود. از او خواسته بودند تنها به یک پادگان نظامی بیاید، ظاهراً برای تماشای یک «اجرای فرهنگی». هیچ‌کس در تبت این دروغ را باور نکرد.",
          },
        },
      },
      {
        M: {
          text: {
            S: "سی‌هزار تبتی برای نجاتش به پا خاستند. به سوی نوربولینگکا — کاخ تابستانی‌اش — سرازیر شدند و دیواری از جنسِ آدم دورش ساختند: کشاورزان، راهبان، مادرانی با بچه‌هایشان در آغوش. شانه‌به‌شانه ایستادند و به ارتشی تمام‌عیار گفتند جرأت عبور داری، بیا. شجاعتی دل‌خراش بود، چون هر کسی که آنجا ایستاده بود می‌دانست آخرِ این رویارویی چیست.",
          },
        },
      },
      {
        M: {
          text: {
            S: "شبِ هفدهم مارس، شناخته‌شده‌ترین چهرهٔ تبت غیب شد. ردای راهبی‌اش را درآورد، عینکش را برداشت، تفنگی روی شانه انداخت و با لباس یک سرباز گمنام بیرون رفت. در تاریکی از رودخانهٔ کیچو گذشت و از میان هزاران نفری رد شد که برای محافظتش آمده بودند — بدون اینکه حتی یک نفر رهبر روحانی‌اش را بشناسد. بعدها نوشت: «داشتم به سوی آزادی قدم می‌زدم، اما حس می‌کردم مردمم را پشت سر جا می‌گذارم.»",
          },
        },
      },
      {
        M: {
          text: {
            S: "آنچه در پی آمد، دو هفته جهنم بود. گذرگاه‌های کوهستانی بالای پنج‌هزار متر — بلندتر از هر قله‌ای در اروپا — در دلِ کولاک و سرمایی استخوان‌سوز. هواپیماهای نظامی چین آسمان را می‌کاویدند. بیمار بود، از پا درآمده، به‌زور لقمه‌ای می‌خورد. پانزده روز در بلندترین نقطهٔ کرهٔ زمین راه رفت، بی‌آنکه بداند درّهٔ بعدی آزادی دارد یا جوخهٔ تیرباران.",
          },
        },
      },
      {
        M: {
          text: {
            S: "سی‌ویکم مارس پا به خاک هند گذاشت. نهرو، نخست‌وزیر هند، به او پناهندگی داد و دالایی لاما دولتِ تبت در تبعید را در دَرَمسالا — شهرکی کوهستانی در شمال هند — بنیان گذاشت. آن دولت هنوز سرِ پاست، بعد از بیش از شصت سال. اما در تبت، قیام بی‌رحمانه سرکوب شد. ده‌ها هزار نفر کشته شدند، کاخ پوتالا به موزه تبدیل شد، و سه قرن فرمانروایی دالایی لاما یک‌شبه به پایان رسید.",
          },
        },
      },
      {
        M: {
          text: {
            S: "هرگز بازنگشت. حالا نود ساله است و گفته شاید آخرین دالایی لاما باشد — یا شاید جانشینش بیرون از تبت پیدا شود، حتی شاید یک زن. زنجیره‌ای نَشکسته از رهبران روحانی که از قرن هفدهم آغاز شده بود، ممکن است با همان جوانی تمام شود که بیست‌وسه‌ساله از دروازهٔ کاخش بیرون رفت.",
          },
        },
      },
      {
        M: {
          text: {
            S: "و با این همه، هر روز زائران تبتی دورِ کاخ پوتالا در جهت عقربه‌های ساعت می‌چرخند، چرخ‌های دعا را می‌گردانند و زمزمه می‌کنند: «در همین زندگی بازگردد.» بیش از شصت سال همین دعا. می‌گویند «از دل برود هر آنکه از دیده برفت.» اما مردمی هستند که شصت سال تمام ثابت کرده‌اند بعضی نبودن‌ها دل را نه سرد، که سخت‌تر به آتش می‌کشد. گاهی شجاعانه‌ترین کارِ یک رهبر رفتن است — نه برای ترکِ مردمش، بلکه تا ایمانشان از هر چه خواست نابودش کند، بیشتر عمر کند.",
          },
        },
      },
    ],
  },
};

fa.excerpt = { S: fa.paragraphs.L[0].M.text.S };

// ════════════════════════════════════════════════
//  TURKISH (tr)
// ════════════════════════════════════════════════

const tr = {
  ...shared,
  lang: { S: "tr" },
  langStoryId: { S: "tr#dalai-lama-escape-1959" },
  title: { S: "Potala'dan Kaçış" },
  subtitle: { S: "Bir tanrı-kralın kendi sarayından karanlığa yürüyüşü" },
  moralOrLesson: {
    S: "Bazen bir liderin yapabileceği en cesur şey gitmektir — halkını terk etmek için değil, inançlarının onu yok etmeye çalışan her şeyden daha uzun yaşamasını sağlamak için.",
  },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "Mart 1959. Yirmi üç yaşında bir rahip, bütün bir dinin kaderini omuzlarında taşıyordu. Adı Tenzin Gyatso'ydu — on dördüncü Dalai Lama, Tibet'in ruhani lideri — ve Çin ordusu başkent Lhasa'yı çoktan kuşatmıştı. Ondan tek başına bir askeri kampa gelmesini istediler; gerekçe, bir \"kültürel gösteri\" izlemekti. Tibet'te buna inanan tek bir kişi bile çıkmadı.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Otuz bin Tibetli onu kurtarmak için ayağa kalktı. Yazlık sarayı Norbulingka'ya akın ettiler ve etrafında canlı bir duvar ördüler — çiftçiler, rahipler, kucağında çocuk taşıyan anneler. Omuz omuza dizilip koskoca bir orduya meydan okudular: Cesaretiniz varsa gelin, geçin. İnsanın yüreğini parçalayan türden bir cesaretti bu, çünkü orada duran herkes bu çatışmanın nasıl biteceğini biliyordu.",
          },
        },
      },
      {
        M: {
          text: {
            S: "17 Mart gecesi, Tibet'in en tanınan yüzü ortadan kayboldu. Rahip cübbesini çıkardı, gözlüğünü bıraktı, omzuna bir tüfek astı ve sıradan bir asker kılığında karanlığa yürüdü. Kyichu Nehri'ni gece geçti ve onu korumaya gelen binlerce kişinin arasından süzüldü — tek bir kişi ruhani liderini tanıyamadı. Sonradan şöyle yazdı: \"Özgürlüğe doğru yürüyordum ama halkımı arkamda bıraktığımı hissediyordum.\"",
          },
        },
      },
      {
        M: {
          text: {
            S: "Sonraki iki hafta tam bir cehennemdi. Beş bin metrenin üzerinde dağ geçitleri — Avrupa'daki her zirveden yüksek — kör eden kar fırtınalarının ve kemiklere işleyen soğuğun ortasında. Çin askeri uçakları tepelerinde arayıp tarıyordu. Hastaydı, bitap, neredeyse hiçbir şey yiyemiyordu. On beş gün boyunca dünyanın en yüksek coğrafyasını aştı; bir sonraki vadide onu özgürlüğün mü yoksa kurşuna dizilmenin mi beklediğini bilmeden.",
          },
        },
      },
      {
        M: {
          text: {
            S: "31 Mart'ta Hindistan topraklarına adım attı. Başbakan Nehru ona sığınma hakkı tanıdı ve Dalai Lama, kuzey Hindistan'da sakin bir dağ kasabası olan Dharamsala'da sürgündeki Tibet hükümetini kurdu. O hükümet bugün hâlâ ayakta — altmış yılı aşkın süredir. Tibet'te ise ayaklanma acımasızca bastırıldı. On binlerce kişi hayatını kaybetti, Potala Sarayı müzeye çevrildi ve Dalai Lama'nın üç yüz yıllık hâkimiyeti bir gecede sona erdi.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Bir daha asla geri dönmedi. Bugün doksan yaşında ve son Dalai Lama olabileceğini söylüyor — ya da bir sonrakinin Tibet dışında, belki de bir kadın olarak bulunabileceğini. 1600'lerden bu yana kesintisiz süregelen ruhani liderler zinciri, yirmi üç yaşında sarayının kapısından çıkan o gençle sona erebilir.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Ama yine de her gün Tibetli hacılar Potala Sarayı'nın çevresinde yürüyor, dua çarklarını çeviriyor ve hep aynı sözü fısıldıyor: \"Hazretleri bu ömürde geri dönsün.\" Altmış yılı aşkın süredir aynı dua, aynı umut. \"Sabreden derviş muradına ermiş\" derler. Ama bu derviş muradına sabırla değil, gecenin karanlığında sarayından çıkıp dağları aşarak erişti. Bazen bir liderin yapabileceği en cesur şey gitmektir — halkını terk etmek için değil, inançlarının kendisini yok etmeye çalışan her şeyden daha uzun yaşamasını sağlamak için.",
          },
        },
      },
    ],
  },
};

tr.excerpt = { S: tr.paragraphs.L[0].M.text.S };

// ─── Push ───
const items = [
  { lang: "ar", item: ar },
  { lang: "fa", item: fa },
  { lang: "tr", item: tr },
];

for (const { lang, item } of items) {
  try {
    console.log(`\n⏳ Pushing ${lang}...`);
    const cmd = new PutItemCommand({
      TableName: TABLE,
      Item: item,
      ConditionExpression: "attribute_not_exists(siteId)",
    });
    await client.send(cmd);
    console.log(`✅ ${lang} pushed successfully — langStoryId: ${item.langStoryId.S}`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.error(`⚠️  ${lang} already exists — skipping to avoid overwrite.`);
    } else {
      console.error(`❌ ${lang} FAILED:`, err.message);
      process.exit(1);
    }
  }
}

console.log("\n🎉 All done.");
