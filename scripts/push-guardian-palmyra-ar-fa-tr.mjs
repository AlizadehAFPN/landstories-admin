import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client);
const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English) ───
const base = {
  siteId: "palmyra",
  storyId: "guardian-of-palmyra",
  icon: "📜",
  tier: "S",
  source:
    "UNESCO statements, August 18-20, 2015; Abdulkarim, Maamoun, interviews on Syrian heritage evacuation efforts; The Guardian, New York Times, BBC reporting, August 2015; Gawlikowski, Michał, tributes and interviews; ASOR Cultural Heritage Initiatives documentation of Palmyra destruction; UNOSAT satellite imagery analysis, 2015-2017",
  era: "1963-2015 (al-Asaad's career); May-August 2015 (ISIS occupation and his martyrdom)",
  readingTimeMinutes: 2,
  image: "",
  disabled: false,
  thumbnail: "",
  coordinates: { lng: 38.2684, lat: 34.5505 },
  hasAudio: false,
  isFree: true,
  storyCategory: "prophets_pilgrims",
  updatedAt: now,
};

// ═══════════════════════════════════════════════
// ARABIC — حارِسُ تَدمُر
// Proverb: الرِّجالُ مَواقِف (Men are defined by their stands)
// ═══════════════════════════════════════════════
const arabic = {
  ...base,
  lang: "ar",
  langStoryId: "ar#guardian-of-palmyra",
  title: "حارِسُ تَدمُر",
  subtitle:
    "عالِمُ آثارٍ في الثالثة والثمانين قضى خمسين عاماً يحمي أطلال تَدمُر — واختار الموت على أن يَخون ما حَفِظَه طوال عُمره",
  excerpt:
    "خمسون سنة وهو يمشي بين الأعمدة. يعرف كلّ نقش، كلّ مدفن، كلّ عمود مكسور باسمه. حين جاء المسلّحون، توسّل إليه زملاؤه أن يرحل. رَفَض.",
  characters: [
    "خالِد الأسعَد (مدير الآثار، ١٩٦٣–٢٠٠٣)",
    "مأمون عبد الكريم (المدير العام للآثار والمتاحف في سوريا)",
    "ميخائيل غافليكوفسكي (عالِم آثار بولندي)",
    "إيرينا بوكوفا (المديرة العامة لليونسكو)",
  ],
  moralOrLesson:
    "هناك مَن يُدمِّر لأنّه يخاف ممّا يكشفه الماضي عن اتّساع الإمكان البشري — وهناك من يموت ولا يَخونه. الحجارة قد تُعاد أو لا تُعاد، لكنّ موقف رجل عجوز بنظّاراته، صامتاً أمام جلّاديه، نُصبٌ لا يمسّه متفجِّر.",
  paragraphs: [
    {
      text: "خَمسون سنة. كلّ يوم. الأعمِدة نفسُها، الطريق نفسُه، الحِجارة نفسُها. خالِد الأسعَد وُلِد سنة ١٩٣٢ في تَدمُر — ليس بجانب الآثار، بل بينها. دَرَس التاريخ في دِمَشق وعاد كأنّه لم يُغادر أصلاً. عام ١٩٦٣ صار مُدير آثار تَدمُر. أربعون عاماً في المنصب. تقاعد سنة ٢٠٠٣ ولم يتغيّر شيء — ظلّ يَصِل كلّ صباح. سَمّى ابنته زَنوبيا، على اسم ملكة تَدمُر. الآثار لم تكن عمله. كانت هو.",
    },
    {
      text: "كلّ فريقٍ دَوليّ حفر في تَدمُر — بولندي، ألماني، فرنسي، ياباني، أمريكي — مرّ من عنده. أدار حَفريّات مَعبَد بِل ووادي المَدافِن. تَرجَم آلاف النُّقوش بالآراميّة التَدمُريّة، المِفتاح الوحيد لقراءة تاريخ هذه المدينة. سمّوه \"السيّد تَدمُر.\" يمشي مع أيّ زائر — أستاذ جامعة أو سائح — يروي خمسين سنة من الحكايات. لم يكن يَدرُس التاريخ. كان الجِسر الحيّ إليه.",
    },
    {
      text: "في ربيع ٢٠١٥، كان تنظيم داعش يقترب. كانوا قد حطّموا تماثيل متحف المَوصِل أمام الكاميرات وجرفوا مُدناً آشوريّة بالأرض. الجميع فَهِم ماذا يعني سقوط تَدمُر. الأسعد ومأمون عبد الكريم — مدير الآثار السوري — نظّما عمليّة إنقاذ مَحمومة: تماثيل، نقوش، لوحات جنائزيّة — كلّها على شاحنات نحو دمشق. حين ضاق الوقت، الأسعد هو من قرّر ماذا يَخرُج أوّلاً. كان يعرف كلّ قطعة باسمها.",
    },
    {
      text: "سقطت تَدمُر في العشرين من أيّار ٢٠١٥. البلدة فرغت. زملاؤه توسّلوا إليه أن يُغادر — ثلاثٌ وثمانون سنة، فعل كلّ ما يستطيع، أولاده ينتظرون. رَفَض. حياته كلّها هنا. اعتقله داعش فوراً. شهرٌ كامل من الاستجواب والتعذيب. أرادوا شيئَين: ذهباً يظنّون أنّه مدفون تحت الأنقاض، ومكان القِطَع المُهرَّبة. لم يُعطِهم شيئاً. ولا كلمة.",
    },
    {
      text: "في الثامن عشر من آب ٢٠١٥، قطع داعش رأس خالد الأسعد علناً في بلدته. علّقوا جثّته على عمود، النظّارة ما زالت على وجهه — عَلامة العالِم حوّلوها إهانة. لافتة على صدره تعدّد \"جرائمه\": حضور مؤتمرات دوليّة، التعامل مع حكومات أجنبيّة، إدارة \"الأصنام.\" كلّ قطعة أنقذها، كلّ نقشٍ ترجمه، كلّ زميلٍ أجنبيّ رحّب به — عَمَل عُمره كان الدليل ضدّه.",
    },
    {
      text: "ثمّ فعل داعش ما خاف منه الجميع. فجّروا معبد بَعلشَمين. فجّروا معبد بِل — مبنى من سنة ٣٢ ميلاديّة صمد ألفَي سنة عبر حروب وإمبراطوريّات وأديان. دمّروا قوس النَّصر. أسقطوا الأبراج الجنائزيّة. حطّموا أسد اللّات. حوّلوا المسرح الروماني إلى ساحة إعدام. كانوا يحاولون محو تَدمُر من الوجود.",
    },
    {
      text: "حين استعادت القوّات السوريّة تَدمُر في آذار ٢٠١٦، كان شارع الأعمدة الكبير والمسرح الروماني لا يزالان واقفَين. في دمشق، كلّ قطعة أنقذها الأسعد — وجوه جنائزيّة ونقوش عُمرها ألفا سنة — كانت حيث أرسلها. سالمة. الفريق البولندي الذي عمل إلى جانبه عقوداً عاد وأعاد تجميع أسد اللّات من شَظاياه. أوركسترا روسيّة عزفت في المسرح المُهدَّم. الحِجارة تذكّرت.",
    },
    {
      text: "قالوا \"الرِّجالُ مَواقِف.\" خالد الأسعد لم يقف موقفاً — عاش موقفاً خمسين سنة. كان عند داعش سلاح ومتفجّرات وشهرٌ كامل لكسر رجل عجوز أسير. وعالِم آثار بنظّاراته — لم يحمل سلاحاً في حياته — هزمهم. القِطَع ما زالت سالمة. الكنوز التي طالبوا بها لم تُوجَد. لم يحمِ أطلالاً فقط. أثبت أنّ الذين يَحفظون أصعب في الكسر ممّا يَحفظون.",
    },
  ],
};

// ═══════════════════════════════════════════════
// PERSIAN — نگهبان پالمیرا
// Proverb: سنگ صبور (The patience stone — deeply Persian concept)
// ═══════════════════════════════════════════════
const persian = {
  ...base,
  lang: "fa",
  langStoryId: "fa#guardian-of-palmyra",
  title: "نگهبان پالمیرا",
  subtitle:
    "باستان‌شناس ۸۳ ساله‌ای که پنجاه سال از ویرانه‌های پالمیرا نگهبانی کرد — و مرگ را بر خیانت به آن‌ها ترجیح داد",
  excerpt:
    "پنجاه سال بود که بین ستون‌ها قدم می‌زد. هر کتیبه، هر مقبره، هر ستون شکسته‌ای را به اسم می‌شناخت. وقتی مردان مسلح آمدند، همکارانش التماس کردند که برود. قبول نکرد.",
  characters: [
    "خالد الاسعد (مدیر میراث باستانی، ۱۹۶۳–۲۰۰۳)",
    "مأمون عبدالکریم (مدیرکل میراث فرهنگی سوریه)",
    "میخائیل گاولیکوفسکی (باستان‌شناس لهستانی)",
    "ایرینا بوکووا (مدیرکل یونسکو)",
  ],
  moralOrLesson:
    "کسانی هستند که ویران می‌کنند چون از آنچه گذشته درباره‌ی وسعت توان انسانی آشکار می‌کند می‌ترسند — و کسانی هستند که می‌میرند اما به آن خیانت نمی‌کنند. سنگ‌ها شاید بازسازی شوند یا نشوند، اما ایستادن پیرمردی با عینکش، ساکت در برابر جلادانش، یادبودی است که هیچ انفجاری به آن نمی‌رسد.",
  paragraphs: [
    {
      text: "پنجاه سال. هر روز. همان ستون‌ها، همان مسیر، همان سنگ‌ها. خالد الاسعد سال ۱۹۳۲ در تَدمُر به دنیا آمد — شهرکی در سوریه، درست کنار ویرانه‌های باستانی پالمیرا. بزرگ شد و ستون‌ها حیاط خانه‌اش بودند. تاریخ خواند در دمشق، برگشت، و سال ۱۹۶۳ مدیر میراث باستانی پالمیرا شد. چهل سال در همین سِمَت. وقتی سال ۲۰۰۳ بازنشسته شد هیچ چیز عوض نشد — هر صبح می‌آمد. اسم دخترش را گذاشت زَنوبیا، به نام ملکه‌ی جنگاور پالمیرا. این ویرانه‌ها محل کارش نبودند. خودِ او بودند.",
    },
    {
      text: "هر تیم بین‌المللی که در پالمیرا کاوش کرد — لهستانی، آلمانی، فرانسوی، ژاپنی، آمریکایی — از دست او رد شد. حفاری‌های معبد بِل و دره‌ی مقبره‌ها را اداره کرد. هزاران کتیبه‌ی آرامی تَدمُری را رمزگشایی کرد — تنها کلید شناخت گذشته‌ی شهر. همه صدایش می‌کردند «آقای پالمیرا.» با هر کسی راه می‌افتاد — استاد دانشگاه یا گردشگر — و پنجاه سال خاطره تعریف می‌کرد. تاریخ نمی‌خواند. پُلِ زنده‌ی تاریخ بود.",
    },
    {
      text: "بهار ۲۰۱۵، داعش داشت نزدیک می‌شد. پیش‌تر آثار موزه‌ی موصل را جلوی دوربین خُرد کرده بودند و شهرهای باستانی آشوری را با خاک یکسان. همه می‌دانستند سقوط پالمیرا یعنی چه. الاسعد و مأمون عبدالکریم — مدیرکل میراث فرهنگی سوریه — یک عملیات نجات دیوانه‌وار ترتیب دادند: مجسمه‌ها، سنگ‌نگاره‌ها، نقش‌برجسته‌های تدفینی — همه سوار کامیون، مقصد دمشق. وقتی وقت تمام شد، الاسعد بود که تصمیم گرفت چه چیزی اول برود. هر تکه را به اسم می‌شناخت.",
    },
    {
      text: "پالمیرا بیستم مه ۲۰۱۵ سقوط کرد. شهر خالی شد. همکارانش التماس کردند که برود — هشتاد و سه ساله بود، هر کاری از دستش برمی‌آمد کرده بود، بچه‌هایش منتظرش بودند. قبول نکرد. تمام عمرش اینجا گذشته بود. داعش تقریباً بلافاصله دستگیرش کرد. یک ماه تمام بازجویی و شکنجه. دو چیز می‌خواستند: طلایی که خیال می‌کردند زیر ویرانه‌ها پنهان است، و محل آثاری که به دمشق رفته بود. هیچ نگفت. یک کلمه هم نه.",
    },
    {
      text: "هجدهم اوت ۲۰۱۵، داعش خالد الاسعد را در ملأعام، در زادگاهش سر بُرید. جسدش را از تیرکی آویختند — عینک هنوز روی صورتش بود. نشانِ دانشمند را تبدیل به تحقیر کرده بودند. تابلویی روی سینه‌اش «جرم‌ها»یش را فهرست کرده بود: شرکت در کنفرانس‌های بین‌المللی، همکاری با دولت‌های خارجی، «سرپرستی بُت‌ها.» هر اثری که نجات داده بود، هر کتیبه‌ای که خوانده بود، هر همکار خارجی‌ای که استقبال کرده بود — کار تمام عمرش مدرک جرمش بود.",
    },
    {
      text: "بعد داعش دقیقاً همان کاری را کرد که همه ازش وحشت داشتند. معبد بَعلشَمین را منفجر کرد. معبد بِل را منفجر کرد — بنایی از سال ۳۲ میلادی که دو هزار سال جنگ و امپراتوری و تغییر دین را تاب آورده بود. طاق پیروزی را ویران کرد. برج‌های مقبره را سرنگون کرد. مجسمه‌ی شیر اللّات را خُرد کرد. تئاتر رومی را تبدیل به میدان اعدام کرد. داشتند پالمیرا را از صفحه‌ی روزگار پاک می‌کردند.",
    },
    {
      text: "وقتی نیروهای سوری مارس ۲۰۱۶ پالمیرا را پس گرفتند، خیابان ستون‌ها و تئاتر رومی هنوز سرپا بودند. در دمشق، هر اثری که الاسعد نجات داده بود — چهره‌های تدفینی، کتیبه‌ها، سنگ‌تراشی‌هایی با قدمت دو هزار ساله — همان‌جایی بود که فرستاده بودشان. سالم. تیم لهستانی که ده‌ها سال کنارش کار کرده بود برگشت و شیر اللّات را از تکه‌هایش بازسازی کرد. ارکستری روسی در تئاتر ویران نواخت. سنگ‌ها یادشان بود.",
    },
    {
      text: "می‌گویند هرکسی سنگِ صبوری دارد که آخرش می‌شکند. داعش یک ماه تمام تلاش کرد سنگ صبور خالد الاسعد را بشکند — اسلحه داشتند، مواد منفجره داشتند، اختیار مطلق یک پیرمرد اسیر را داشتند. و یک باستان‌شناس هشتاد و سه ساله با عینکش — که عمری اسلحه دست نگرفته بود — شکستشان داد. آثار هنوز سالم‌اند. گنجی که می‌خواستند هرگز پیدا نشد. سنگ صبور نشکست. فقط ویرانه‌ها را نگهبانی نکرد. ثابت کرد آن‌ها که نگهبانی می‌کنند، سخت‌تر از چیزی‌اند که نگهبانش هستند.",
    },
  ],
};

// ═══════════════════════════════════════════════
// TURKISH — Palmira'nın Bekçisi
// Proverb: Söz gümüşse sükût altındır (If speech is silver, silence is gold)
// ═══════════════════════════════════════════════
const turkish = {
  ...base,
  lang: "tr",
  langStoryId: "tr#guardian-of-palmyra",
  title: "Palmira'nın Bekçisi",
  subtitle:
    "Palmira'nın harabelerini elli yıl koruyan 83 yaşındaki arkeolog — ve her şeyi yok etmeye gelen adamlara onları teslim etmektense ölümü seçen adam",
  excerpt:
    "Elli yıl boyunca sütunların arasında yürüdü. Her yazıtı, her mezarı, her kırık sütunu adıyla bilirdi. Silahlı adamlar geldiğinde meslektaşları gitmesi için yalvardı. Gitmedi.",
  characters: [
    "Khaled el-Esad (antik kalıntılar müdürü, 1963–2003)",
    "Mamun Abdülkerim (Suriye Genel Antikalar Müdürü)",
    "Michał Gawlikowski (Polonyalı arkeolog)",
    "Irina Bokova (UNESCO Genel Müdürü)",
  ],
  moralOrLesson:
    "Bazıları yıkar, çünkü geçmişin insanlığın ne denli geniş bir ufka sahip olduğunu göstermesinden korkar — bazıları ise geçmişe ihanet etmektense ölür. Taşlar yeniden dikilir ya da dikilmez, ama gözlüklü yaşlı bir adamın cellatlarının karşısında sessizce dikilişi, hiçbir patlayıcının dokunamayacağı bir anıttır.",
  paragraphs: [
    {
      text: "Elli yıl. Her gün. Aynı sütunlar, aynı yol, aynı taşlar. Khaled el-Esad 1932'de Tedmür'de doğdu — Suriye'nin göbeğinde, antik Palmira'nın hemen yanı başında küçük bir kasaba. Sütunların arasında büyüdü; onlar arka bahçesiydi. Şam'da tarih okudu, döndü ve 1963'te Palmira Antik Kalıntılar Müdürü oldu. Kırk yıl aynı görevde. 2003'te emekli oldu ama hiçbir şey değişmedi — her sabah gelmeye devam etti. Kızının adını Zenobia koydu, Palmira'nın savaşçı kraliçesinin adını. Bu harabeler onun işyeri değildi. Kendisiydi.",
    },
    {
      text: "Palmira'da kazı yapan her uluslararası ekip — Polonyalı, Alman, Fransız, Japon, Amerikalı — onun elinden geçti. Bel Tapınağı'nda ve Mezar Vadisi'nde kazıları o yönetti. Binlerce Palmira Aramicesi yazıtını çözdü — şehrin geçmişine açılan tek kapı buydu. Herkes ona \"Bay Palmira\" derdi. Profesör olsun turist olsun, herkesle yürür, elli yılın hikâyelerini anlatırdı. Tarihi çalışmıyordu. Tarihe açılan canlı bir köprüydü.",
    },
    {
      text: "2015 baharında IŞİD yaklaşıyordu. Musul Müzesi'ndeki eserleri kamera karşısında parçalamışlar, kadim Asur şehirlerini yerle bir etmişlerdi zaten. Palmira düşerse ne olacağını herkes biliyordu. El-Esad ve Suriye Kültürel Miras Genel Müdürü Mamun Abdülkerim çılgınca bir kurtarma operasyonu düzenledi: heykeller, kabartmalar, cenaze portreleri — hepsi kamyonlara yüklendi, hedef Şam. Zaman tükenince neyin önce çıkacağına el-Esad karar verdi. Her parçayı adıyla tanıyordu.",
    },
    {
      text: "Palmira 20 Mayıs 2015'te düştü. Kasaba boşaldı. Meslektaşları yalvardı: Seksen üç yaşındasın, yapabileceğin her şeyi yaptın, çocukların bekliyor. Gitmedi. Bütün ömrü burada geçmişti. IŞİD onu neredeyse hemen yakaladı. Tam bir ay sorguladılar, işkence ettiler. İki şey istiyorlardı: harabelerin altında saklı olduğuna inandıkları altınlar ve Şam'a taşınan eserlerin yeri. Tek bir şey söylemedi. Tek bir kelime.",
    },
    {
      text: "18 Ağustos 2015. IŞİD, Khaled el-Esad'ın başını kendi memleketinde herkesin gözü önünde kesti. Cesedini bir direğe astılar — gözlükleri hâlâ yüzündeydi. Bir bilim insanının simgesini aşağılama aracına çevirmişlerdi. Göğsündeki tabela \"suçlarını\" sıralıyordu: uluslararası konferanslara katılmak, yabancı hükümetlerle çalışmak, \"putların müdürlüğü.\" Kurtardığı her eser, çözdüğü her yazıt, ağırladığı her yabancı meslektaş — ömrünün eseri, aleyhindeki delil olmuştu.",
    },
    {
      text: "Sonra IŞİD tam da herkesin korktuğu şeyi yaptı. Baalşamin Tapınağı'nı havaya uçurdu. Bel Tapınağı'nı havaya uçurdu — milattan sonra 32'den beri iki bin yıl boyunca savaşlara, imparatorluklara, din değişikliklerine dayanan bir yapı. Zafer Takı'nı yıktı. Kule mezarları devirdi. Allat Aslanı heykelini parçaladı. Roma tiyatrosunu toplu infaz alanına çevirdi. Palmira'yı tarihten silmeye çalışıyorlardı.",
    },
    {
      text: "Suriye kuvvetleri Mart 2016'da Palmira'yı geri aldığında Büyük Sütunlu Cadde ve Roma tiyatrosu hâlâ ayaktaydı. Şam'da el-Esad'ın kurtardığı her eser — iki bin yıllık cenaze büstleri, yazıtlar, yontulmuş yüzler — tam da gönderdiği yerde duruyordu. Sapasağlam. Onlarca yıl yanında çalışan Polonyalı ekip geri geldi ve parçalanmış Allat Aslanı'nı kırıklarından yeniden birleştirdi. Harap tiyatroda bir Rus orkestrası çaldı. Taşlar hatırladı.",
    },
    {
      text: "\"Söz gümüşse sükût altındır\" derler. Khaled el-Esad'ın sükûtu altından değerli değildi — paha biçilmezdi. IŞİD'in elinde silah vardı, patlayıcı vardı, esir bir yaşlı adam üzerinde mutlak güç vardı. Onu kırmak için bir ayları oldu. Ve seksen üç yaşında gözlüklü bir arkeolog — ömründe silah tutmamış bir adam — hepsini yendi. Eserler hâlâ güvende. İstedikleri hazine asla bulunamadı. O sadece harabeleri korumadı. Hatırlayanların, hatırladıkları şeylerden daha yıkılmaz olduğunu kanıtladı.",
    },
  ],
};

// ─── Push each language ───
async function pushStory(item, label) {
  console.log(`\n⏳ Pushing ${label}...`);
  try {
    await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: item,
        ConditionExpression:
          "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
      })
    );
    console.log(`✅ ${label} pushed successfully.`);
    console.log(`   siteId: ${item.siteId}`);
    console.log(`   langStoryId: ${item.langStoryId}`);
    console.log(`   paragraphs: ${item.paragraphs.length}`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(
        `⚠️  ${label} already exists. Overwriting with updated version...`
      );
      await docClient.send(
        new PutCommand({
          TableName: TABLE,
          Item: item,
        })
      );
      console.log(`✅ ${label} overwritten successfully.`);
    } else {
      console.error(`❌ ${label} FAILED:`, err.message);
      throw err;
    }
  }
}

async function main() {
  console.log("═══════════════════════════════════════════");
  console.log("  Guardian of Palmyra — ar / fa / tr push  ");
  console.log("═══════════════════════════════════════════");
  console.log(`Timestamp: ${now}`);

  // Validate JSON integrity before pushing
  for (const [label, item] of [
    ["Arabic", arabic],
    ["Persian", persian],
    ["Turkish", turkish],
  ]) {
    const json = JSON.stringify(item);
    JSON.parse(json); // will throw if malformed
    console.log(`✓ ${label} JSON valid (${json.length} bytes)`);
  }

  // Push sequentially to confirm each before moving on
  await pushStory(arabic, "Arabic (ar)");
  await pushStory(persian, "Persian (fa)");
  await pushStory(turkish, "Turkish (tr)");

  console.log("\n═══════════════════════════════════════════");
  console.log("  All three languages pushed successfully!  ");
  console.log("═══════════════════════════════════════════");
}

main().catch((err) => {
  console.error("\n💥 Fatal error:", err.message);
  process.exit(1);
});
