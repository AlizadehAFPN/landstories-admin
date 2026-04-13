import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const TIMESTAMP = Math.floor(Date.now() / 1000).toString();

// Shared fields (unchanged from English)
const shared = {
  siteId: { S: "abu-simbel" },
  storyId: { S: "ramesses-nefertari-love" },
  icon: { S: "\u2764\uFE0F" },
  tier: { S: "S" },
  source: { S: "Kitchen, K.A. Pharaoh Triumphant: The Life and Times of Ramesses II. Warminster, 1982; QV66 inscriptions" },
  characters: { L: [{ S: "Ramesses II" }, { S: "Nefertari Merytmut (Great Royal Wife)" }] },
  era: { S: "New Kingdom (c. 1264 BC)" },
  readingTimeMinutes: { N: "3" },
  image: { S: "" },
  disabled: { BOOL: false },
  thumbnail: { S: "" },
  coordinates: { M: { lng: { N: "31.6248" }, lat: { N: "22.3365" } } },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "love_heartbreak" },
  updatedAt: { N: TIMESTAMP },
};

function makeParagraphs(texts) {
  return {
    L: texts.map((t) => ({ M: { text: { S: t } } })),
  };
}

// ──────────────────────────────────────────────
// ARABIC (ar)
// ──────────────────────────────────────────────
const arabic = {
  ...shared,
  lang: { S: "ar" },
  langStoryId: { S: "ar#ramesses-nefertari-love" },

  title: { S: "رَمسيس ونِفِرتاري: حُبٌّ نُحِتَ في الجَبَل" },

  subtitle: { S: "حكاية فِرعَون حوَّل الصَّخرَ إلى رسالة عِشق" },

  excerpt: { S: "في عالمٍ كان الفراعنة فيه يجمعون الزوجات كأدوات سياسية، أحبّ رَمسيس الثاني امرأةً واحدة حُبّاً غيَّر قواعد حضارة بأكملها. نَحَتَ لها معبداً في الصخر، ووجَّه لها الشمس، وكتب لها كلمات لا تزال تُقرَأ بعد اثنين وثلاثين قرناً." },

  paragraphs: makeParagraphs([
    "قبل ثلاثة آلاف سنة، وقع أقوى رجل على وجه الأرض في الحُبّ — ولم يكتفِ بالكلام. نَحَتَ حُبَّه في جبل. رَمسيس الثاني، فِرعَون مصر، كان لديه عشرات الزوجات. الفراعنة كانوا يجمعون الملكات كما يجمع الحُكّام اليوم التحالفات — أدوات سياسة، لا شريكات حياة. لكنّ امرأة واحدة قلبت كلّ شيء. اسمها نِفِرتاري، وأحبّها رَمسيس بطريقة تُحيِّر المؤرّخين حتى اليوم.",

    "نِفِرتاري تزوّجت رَمسيس وهو لا يزال أميراً — قبل التاج وقبل العرش. وحين صار فِرعَوناً، لم يُبعِدها. بل قرَّبها أكثر. وقفت بجانبه في مراسم الدولة. كاتبت ملكات الدول الأخرى بنفسها، من بينهنّ بودوحيبا ملكة الحِثِّيّين — ألدّ أعداء مصر. وأدّت طقوساً دينية كان الفِرعَون وحده يؤدّيها. ألقابها تختصر كلّ شيء: «حُلوَة الحُبّ» و«سيّدة كلّ الأراضي.»",

    "في أبو سِمبِل، جنوب مصر، بنى رَمسيس لنِفِرتاري معبداً مَنحوتاً في صخر الجبل. هذا كان شيئاً لم يحدث تقريباً من قبل — الفراعنة بنوا المعابد للآلهة، لا للزوجات. لكنّ التفصيل الذي يوقفك: تماثيل نِفِرتاري على واجهة المعبد بنفس حجم تماثيل رَمسيس. في الفنّ المصري القديم، الحجم يساوي القوّة. أن يجعلها مُساوية له في الحَجَر كان إعادة كتابة لقوانين حضارة بأكملها.",

    "فوق المدخل، ترك رَمسيس نَقشاً صمد أكثر من ثلاثة آلاف سنة: بنى هذا المعبد «للزوجة المَلَكيّة العُظمى نِفِرتاري — التي تُشرِقُ لها الشَّمس.» ولم يكن هذا مجرّد شِعر. معابد أبو سِمبِل صُمِّمَت بدقّة هندسية لتدخل الشمس إلى أعماق الصخر في أيام محدّدة من السنة. «التي تُشرِقُ لها الشَّمس» كانت رسالة حُبّ ومُخطَّطاً هندسياً في آنٍ واحد. حَرفيّاً — وجَّه الشمس نحوها.",

    "حين ماتت نِفِرتاري — في نحو الأربعين من عمرها — منحها رَمسيس أعظم وداع في تاريخ مصر. مقبرتها في وادي الملكات مُغطّاة بلوحات مُذهِلة سمّاها العلماء «كنيسة سيستين مصر القديمة.» الآلهة تأخذ نِفِرتاري بيدها وتُرافقها إلى العالم الآخر. تتحرّك بين تلك الجدران كأنها واحدة منهنّ — لأنّه في عالَم رَمسيس، كانت كذلك فعلاً.",

    "يقولون «الثّالِثَة ثابِتَة»... لكنّ رَمسيس لم يحتَج إلى ثلاث محاولات. كفَته امرأة واحدة ليُثبِّت اسمه في الأبد. على جدران القبر، ترك ما قد يكون أقدم رسالة حُبّ لا تزال قائمة: «حُبّي فريد — لا أحد يُنافسها. هي أجمل النساء. بمجرّد مرورها، سرقت قلبي.» هذا أقوى رجل في العالم القديم... يتكلّم عن زوجته كمُراهِق وقع في الحُبّ لأوّل مرّة.",

    "عاش رَمسيس حتى التسعين تقريباً. حكم أكثر من أربعين سنة بعد رحيلها. تزوّج ملكات أخريات، وأنجب أكثر من مئة طفل، وبنى آثاراً عبر إمبراطورية من السودان إلى سوريا. لكنّ الذي يتذكّره الناس؟ ليس المعارك ولا الفتوحات. معبدٌ نَحَتَه في جبل في أقاصي الصحراء، لامرأة لم ينسَها يوماً. بعض قصص الحُبّ تدوم عُمراً. هذه دامت اثنين وثلاثين قرناً — ولم تنتهِ بعد."
  ]),

  moralOrLesson: { S: "الحُبّ الحقيقي يتجاوز كلّ سُلطة وكلّ تاج. وأعمق العواطف لا تُعبَّر عنها بالكلمات وحدها، بل بآثار تبقى بعد أن يَمحو الزمن كلّ شيء آخر." },
};

// ──────────────────────────────────────────────
// PERSIAN (fa)
// ──────────────────────────────────────────────
const persian = {
  ...shared,
  lang: { S: "fa" },
  langStoryId: { S: "fa#ramesses-nefertari-love" },

  title: { S: "رامسس و نفرتاری: عشقی که در کوه حک شد" },

  subtitle: { S: "داستان فرعونی که خورشید را هدیه\u200Cی یک زن کرد" },

  excerpt: { S: "در تمدنی که فرعون\u200Cها ده\u200Cها همسر داشتند و هر ازدواج یک معامله\u200Cی سیاسی بود، رامسس دوم یک زن را آن\u200Cقدر عمیق دوست داشت که برایش معبد ساخت، خورشید را به سمتش هدایت کرد، و نامه\u200Cی عاشقانه\u200Cای نوشت که سی\u200Cودو قرن بعد هنوز خوانده می\u200Cشود." },

  paragraphs: makeParagraphs([
    "سه\u200Cهزار سال پیش، قدرتمندترین مرد روی زمین عاشق شد — و به حرف زدن اکتفا نکرد. عشقش را در دل کوه حَک کرد. رامسس دوم، فرعون مصر، ده\u200Cها همسر داشت. فرعون\u200Cها ملکه جمع می\u200Cکردند مثل سیاستمدارهای امروز که متحد جمع می\u200Cکنند — ابزار سیاسی، نه شریک زندگی. ولی یک زن همه\u200Cچیز را عوض کرد. اسمش نفرتاری بود، و رامسس طوری عاشقش شد که تاریخ\u200Cنویس\u200Cها هنوز مات\u200Cومبهوت\u200Cاند.",

    "نفرتاری وقتی با رامسس ازدواج کرد که او هنوز شاهزاده بود — قبل از تاج، قبل از تخت، قبل از همه\u200Cچیز. و وقتی فرعون شد، کنارش نزد. برعکس، نزدیک\u200Cترش کرد. در مراسم رسمی کنارش می\u200Cایستاد. با ملکه\u200Cهای کشورهای دیگر نامه\u200Cنگاری می\u200Cکرد — از جمله پودوحیپا، ملکه\u200Cی هیتی\u200Cها، بزرگ\u200Cترین دشمن مصر. مراسم مذهبی انجام می\u200Cداد که فقط فرعون حق انجامشان را داشت. لقب\u200Cهایش گویای همه\u200Cچیزند: «شیرینِ عشق» و «بانوی همه\u200Cی سرزمین\u200Cها.»",

    "در ابوسمبل، جنوب مصر، رامسس برای نفرتاری معبدی ساخت — تراشیده مستقیم از دل صخره. این تقریباً بی\u200Cسابقه بود. فرعون\u200Cها معبد برای خدایان می\u200Cساختند، نه همسرانشان. ولی نکته\u200Cای که آدم را سر جایش میخکوب می\u200Cکند: مجسمه\u200Cهای نفرتاری جلوی معبد هم\u200Cاندازه\u200Cی مجسمه\u200Cهای خود رامسس\u200Cاند. در هنر مصر باستان، اندازه یعنی قدرت. اینکه نفرتاری را در سنگ با خودش برابر کرد، یعنی قوانین یک تمدن کامل را بازنویسی کرد.",

    "بالای ورودی معبد، رامسس کتیبه\u200Cای گذاشت که بیش از سه\u200Cهزار سال دوام آورده. این معبد را ساخته بود برای «همسر بزرگ شاهانه نفرتاری — آن\u200Cکه خورشید برایش می\u200Cتابد.» و این فقط شعر نبود. معابد ابوسمبل طوری طراحی شده\u200Cاند که در روزهای خاصی از سال، نور خورشید تا عمق صخره نفوذ کند. «آن\u200Cکه خورشید برایش می\u200Cتابد» هم عاشقانه بود، هم نقشه\u200Cی مهندسی. به معنای واقعی کلمه — خورشید را به سمت او نشانه رفت.",

    "وقتی نفرتاری رفت — حدود چهل\u200Cسالگی، بیست\u200Cوچهار سال بعد از آغاز پادشاهی رامسس — خیره\u200Cکننده\u200Cترین بدرقه\u200Cی تاریخ مصر نصیبش شد. مقبره\u200Cاش در درّه\u200Cی ملکه\u200Cها سراسر با نقاشی\u200Cهایی پوشیده که پژوهشگران آن را «سیستینِ مصر باستان» می\u200Cنامند. الهه\u200Cها دست نفرتاری را می\u200Cگیرند و به جهان دیگر همراهیش می\u200Cکنند. انگار جایش میان خدایان بوده — چون در دنیای رامسس، واقعاً همین\u200Cطور بود.",

    "می\u200Cگویند «تا سه نشه، بازی نشه.» ولی رامسس به سه بار احتیاج نداشت. یک نفرتاری کافی بود تا بازیِ عمرش معنا پیدا کند. روی دیوارهای مقبره نوشت: «عشق من بی\u200Cهمتاست — کسی حریف او نیست. زیباترین زن جهان است. فقط با رد شدن از کنارم، قلبم را ربود.» این قدرتمندترین مرد دنیای باستان است — که مثل نوجوانی دلباخته از همسرش حرف می\u200Cزند.",

    "رامسس تا حدود نود سالگی زنده ماند. بیش از چهل سال بعد از مرگ نفرتاری حکومت کرد. همسران دیگر گرفت، بیش از صد فرزند به دنیا آورد، و بناهایی ساخت در سرزمینی از سودان تا سوریه. ولی چیزی که مردم به یاد می\u200Cآورند؟ نه جنگ\u200Cها، نه فتوحات. معبدی که در دل کوهی در اعماق صحرا تراشید، برای زنی که هرگز فراموشش نکرد. بعضی عشق\u200Cها یک عمر دوام می\u200Cآورند. این یکی سی\u200Cودو قرن دوام آورده — و هنوز تمام نشده."
  ]),

  moralOrLesson: { S: "عشق واقعی از هر قدرت و تاجی فراتر می\u200Cرود. عمیق\u200Cترین دلبستگی فقط با واژه\u200Cها بیان نمی\u200Cشود — بلکه با یادمان\u200Cهایی که حتی از ابدیت هم بیشتر دوام می\u200Cآورند." },
};

// ──────────────────────────────────────────────
// TURKISH (tr)
// ──────────────────────────────────────────────
const turkish = {
  ...shared,
  lang: { S: "tr" },
  langStoryId: { S: "tr#ramesses-nefertari-love" },

  title: { S: "Ramses ve Nefertari: Da\u011fa Kaz\u0131nan A\u015fk" },

  subtitle: { S: "G\u00fcne\u015fi bir kad\u0131na hediye eden firavunun hik\u00e2yesi" },

  excerpt: { S: "Firavunlar\u0131n d\u00fczinelerce e\u015fi oldu\u011fu ve her evlili\u011fin siyasi bir hamle say\u0131ld\u0131\u011f\u0131 bir uygarl\u0131kta, II. Ramses tek bir kad\u0131na \u00f6yle \u00e2\u015f\u0131k oldu ki ona tap\u0131nak dikti, g\u00fcne\u015fi ona y\u00f6nlendirdi ve otuz iki as\u0131rd\u0131r h\u00e2l\u00e2 okunan bir a\u015fk mektubu b\u0131rakt\u0131." },

  paragraphs: makeParagraphs([
    "\u00dc\u00e7 bin y\u0131l \u00f6nce, yery\u00fcz\u00fcn\u00fcn en g\u00fc\u00e7l\u00fc adam\u0131 \u00e2\u015f\u0131k oldu \u2014 ve lafta b\u0131rakmad\u0131. A\u015fk\u0131n\u0131 bir da\u011f\u0131n i\u00e7ine kaz\u0131d\u0131. M\u0131s\u0131r firavunu II. Ramses\u2019in d\u00fczinelerce e\u015fi vard\u0131. Firavunlar krali\u00e7e biriktirirdi, t\u0131pk\u0131 bug\u00fcn\u00fcn liderleri m\u00fcttefik biriktirdi\u011fi gibi \u2014 siyasi ara\u00e7, hayat arkada\u015f\u0131 de\u011fil. Ama bir kad\u0131n her \u015feyi de\u011fi\u015ftirdi. Ad\u0131 Nefertari\u2019ydi ve Ramses onu tarih\u00e7ileri h\u00e2l\u00e2 \u015fa\u015fk\u0131na \u00e7eviren bir \u015fekilde sevdi.",

    "Nefertari, Ramses daha \u015fehzadeyken onunla evlendi \u2014 ta\u00e7tan \u00f6nce, tahttan \u00f6nce, her \u015feyden \u00f6nce. Ramses firavun olunca onu bir kenara atmad\u0131. Tam tersine, yan\u0131na daha da \u00e7ekti. Devlet t\u00f6renlerinde yan\u0131 ba\u015f\u0131nda durdu. Yabanc\u0131 krali\u00e7elere bizzat mektuplar yazd\u0131 \u2014 aralar\u0131nda M\u0131s\u0131r\u2019\u0131n en b\u00fcy\u00fck rakibi Hitit \u0130mparatorlu\u011fu\u2019nun krali\u00e7esi Puduhepa da vard\u0131. Normalde yaln\u0131zca firavuna ayr\u0131lm\u0131\u015f dini t\u00f6renleri y\u00fcr\u00fctt\u00fc. Unvanlar\u0131 her \u015feyi anlat\u0131yor: \u201cA\u015fk\u0131n Tatl\u0131s\u0131\u201d ve \u201cB\u00fct\u00fcn Topraklar\u0131n Han\u0131m\u0131.\u201d",

    "M\u0131s\u0131r\u2019\u0131n g\u00fcneyinde, Abu Simbel\u2019de Ramses Nefertari\u2019ye do\u011frudan kayal\u0131\u011fa oyulmu\u015f bir tap\u0131nak yapt\u0131rd\u0131. Bu neredeyse duyulmam\u0131\u015f bir \u015feydi \u2014 firavunlar tap\u0131naklar\u0131 tanr\u0131lar i\u00e7in yapt\u0131r\u0131rd\u0131, e\u015fleri i\u00e7in de\u011fil. Ama as\u0131l sizi durduran detay \u015fu: tap\u0131na\u011f\u0131n cephesindeki Nefertari heykelleri Ramses\u2019inkilerle birebir ayn\u0131 boyutta. M\u0131s\u0131r sanat\u0131nda boyut g\u00fc\u00e7 demekti. Onu ta\u015fta kendisine e\u015fit k\u0131lmak, b\u00fct\u00fcn bir uygarl\u0131\u011f\u0131n kurallar\u0131n\u0131 ba\u015ftan yazmak demekti.",

    "Tap\u0131na\u011f\u0131n giri\u015finin \u00fcst\u00fcne Ramses, \u00fc\u00e7 bin y\u0131l\u0131 a\u015fk\u0131n s\u00fcredir ayakta duran bir yaz\u0131t b\u0131rakt\u0131. Bu tap\u0131na\u011f\u0131 \u201cB\u00fcy\u00fck Kraliyet E\u015fi Nefertari \u2014 g\u00fcne\u015fin kendisi i\u00e7in parlad\u0131\u011f\u0131 kad\u0131n\u201d ad\u0131na yapt\u0131rm\u0131\u015ft\u0131. Ve bu sadece \u015fiir de\u011fildi. Abu Simbel tap\u0131naklar\u0131 \u00f6yle bir hassasiyetle tasarlanm\u0131\u015ft\u0131 ki y\u0131l\u0131n belirli g\u00fcnlerinde g\u00fcne\u015f \u0131\u015f\u0131\u011f\u0131 kayan\u0131n ta derinlerine ula\u015f\u0131yordu. \u201cG\u00fcne\u015fin kendisi i\u00e7in parlad\u0131\u011f\u0131 kad\u0131n\u201d hem a\u015fk mektubu hem m\u00fchendislik harikas\u0131yd\u0131. Adam harfi harfine g\u00fcne\u015fi ona do\u011frultmu\u015ftu.",

    "Nefertari \u00f6ld\u00fc\u011f\u00fcnde \u2014 k\u0131rk ya\u015flar\u0131ndayd\u0131, Ramses\u2019in h\u00fck\u00fcmdarl\u0131\u011f\u0131n\u0131n yirmi d\u00f6rd\u00fcnc\u00fc y\u0131l\u0131yd\u0131 \u2014 ona M\u0131s\u0131r tarihinin en nefes kesici vedas\u0131 sunuldu. Krali\u00e7eler Vadisi\u2019ndeki mezar\u0131 duvardan duvara \u00f6yle ola\u011fan\u00fcst\u00fc resimlerle kapl\u0131d\u0131r ki ara\u015ft\u0131rmac\u0131lar buraya \u201cantik M\u0131s\u0131r\u2019\u0131n Sistine \u015eapeli\u201d der. Tanr\u0131\u00e7alar Nefertari\u2019nin elinden tutup onu \u00f6b\u00fcr d\u00fcnyaya y\u00fcr\u00fct\u00fcr. O resimlerde tanr\u0131lar\u0131n aras\u0131na aitmi\u015f gibi ilerler \u2014 \u00e7\u00fcnk\u00fc Ramses\u2019in g\u00f6z\u00fcnde ger\u00e7ekten de \u00f6yleydi.",

    "\u201cSab\u0131rla koruk helva olur\u201d derler. Ama Ramses\u2019in a\u015fk\u0131 helva olmay\u0131 beklemedi \u2014 kayaya kaz\u0131nd\u0131 ve \u00fc\u00e7 bin y\u0131ld\u0131r tad\u0131n\u0131 hi\u00e7 kaybetmedi. Mezar duvarlar\u0131na belki de h\u00e2l\u00e2 ayakta duran en eski a\u015fk mektubunu b\u0131rakt\u0131: \u201cA\u015fk\u0131m e\u015fsizdir \u2014 kimse onunla boy \u00f6l\u00e7\u00fc\u015femez. Ya\u015fayan en g\u00fczel kad\u0131nd\u0131r. Yan\u0131mdan ge\u00e7mesiyle kalbimi \u00e7ald\u0131.\u201d Antik d\u00fcnyan\u0131n en g\u00fc\u00e7l\u00fc adam\u0131, kar\u0131s\u0131ndan g\u00f6zleri d\u00f6nen bir delikanl\u0131 gibi s\u00f6z ediyor.",

    "Ramses yakla\u015f\u0131k doksan ya\u015f\u0131na kadar ya\u015fad\u0131. Nefertari\u2019den sonra k\u0131rk y\u0131l\u0131 a\u015fk\u0131n h\u00fck\u00fcm s\u00fcrd\u00fc. Ba\u015fka krali\u00e7elerle evlendi, y\u00fczden fazla \u00e7ocuk babas\u0131 oldu, Sudan\u2019dan Suriye\u2019ye uzanan bir imparatorluk boyunca an\u0131tlar dikti. Ama insanlar\u0131n akl\u0131nda kalan ne biliyor musunuz? Sava\u015flar de\u011fil, fetihler de\u011fil. \u00c7\u00f6l\u00fcn ortas\u0131nda bir kayaya oydu\u011fu tap\u0131nak \u2014 hi\u00e7 unutamad\u0131\u011f\u0131 bir kad\u0131n i\u00e7in. Baz\u0131 a\u015fk hik\u00e2yeleri bir \u00f6m\u00fcr s\u00fcrer. Bu otuz iki as\u0131rd\u0131r s\u00fcr\u00fcyor \u2014 ve daha bitmedi."
  ]),

  moralOrLesson: { S: "Ger\u00e7ek a\u015fk g\u00fc\u00e7ten de tahttan da b\u00fcy\u00fckt\u00fcr. En derin sevgi yaln\u0131zca s\u00f6zle anlat\u0131lmaz \u2014 sonsuzlu\u011fu a\u015fan eserlerle hayat bulur." },
};

// ──────────────────────────────────────────────
// PUSH TO DYNAMODB
// ──────────────────────────────────────────────

const items = [
  { label: "Arabic (ar)", item: arabic },
  { label: "Persian (fa)", item: persian },
  { label: "Turkish (tr)", item: turkish },
];

for (const { label, item } of items) {
  console.log(`\nPushing ${label}...`);
  try {
    const cmd = new PutItemCommand({
      TableName: "Story",
      Item: item,
      ConditionExpression: "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
    });
    const result = await client.send(cmd);
    console.log(`  ${label} pushed successfully. HTTP ${result.$metadata.httpStatusCode}`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(`  ${label} record already exists. Overwriting...`);
      const cmd2 = new PutItemCommand({
        TableName: "Story",
        Item: item,
      });
      const result2 = await client.send(cmd2);
      console.log(`  ${label} overwritten successfully. HTTP ${result2.$metadata.httpStatusCode}`);
    } else {
      console.error(`  FAILED for ${label}:`, err.message);
      process.exit(1);
    }
  }
}

console.log("\nAll three language versions pushed successfully.");
