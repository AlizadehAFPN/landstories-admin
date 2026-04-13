// Push Arabic, Persian, and Turkish recreations of "The Emperor Who Turned to Stone"
// (Shah Jahan / Taj Mahal story) to the Story DynamoDB table.

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (identical to English record) ─────────────────────────────
const shared = {
  siteId: "taj-mahal",
  storyId: "shah-jahans-tears",
  icon: "\u{1F494}",
  storyCategory: "love_heartbreak",
  tier: "S",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 8,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 27.1751, lng: 78.0421 },
  source:
    "Abdul Hamid Lahori, Padshahnama (c. 1648); Muhammad Amin Qazwini, Padshahnama (c. 1638); Peter Mundy, Travels in Europe and Asia, Vol. II (1632\u201333); Jean-Baptiste Tavernier, Les Six Voyages (1676); Ebba Koch, The Complete Taj Mahal and the Riverfront Gardens of Agra (2006); R. Nath, The Taj Mahal and Its Incarnation (1985)",
  characters: [
    "Shah Jahan (Emperor, born Prince Khurram)",
    "Mumtaz Mahal (Arjumand Banu Begum)",
    "Jahanara Begum (eldest daughter)",
    "Aurangzeb (third son, usurper)",
    "Ustad Ahmad Lahori (chief architect)",
    "Amanat Khan Shirazi (master calligrapher)",
  ],
  era: "1607\u20131666 (from first meeting at Meena Bazaar to Shah Jahan\u2019s death in captivity)",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// ARABIC (ar) — "دموعٌ من رُخام"
// Proverb: "الثالثة ثابتة" (The third one is permanent) — subverted: all
// three promises held, but the first is the one still standing today.
// Register: Modern Arabic storyteller — warm, authoritative, gripping.
// ═══════════════════════════════════════════════════════════════════════════════

const ar = {
  ...shared,
  lang: "ar",
  langStoryId: "ar#shah-jahans-tears",

  title: "دموعٌ من رُخام",

  subtitle:
    "كيف حوَّل موتُ امرأةٍ واحدة أغنى إمبراطوريةٍ في الأرض إلى نُصبٍ أبديٍّ من الحزن أسكتَ العالم",

  excerpt:
    "في عام ١٦٠٧، في سوقٍ مزدحمة داخل قصرٍ مغوليّ، رأى أميرٌ في الخامسة عشرة فتاةً في الرابعة عشرة — وأقسم أن يتزوَّجها. بعد أربعةٍ وعشرين عامًا ماتت بين ذراعيه، فبنى لها أجمل ضريحٍ عرفته الأرض.",

  moralOrLesson:
    "مقياس الحبّ ليس ما نقوله في حضرة من نحبّ، بل ما نبنيه في غيابهم — وأجمل ما على الأرض لم يُولَد من السعادة، بل من رفض الحزن أن يظلّ صامتًا.",

  paragraphs: [
    {
      text: "في عام ١٦٠٧، كان أميرٌ مغوليٌّ اسمه خُرَّم في الخامسة عشرة من عمره حين مرَّ بسوقٍ داخل قصر أبيه فوقف كأنَّ الأرض سُمِّرت تحت قدميه. أمام أحد الأكشاك وقفت فتاةٌ في الرابعة عشرة: أَرْجُمَنْد بانو بيغم، ابنة أحد أقوى النبلاء الفُرس في البلاط. ذهب إلى أبيه الإمبراطور جَهانْغير وأخبره أنّه سيتزوَّجها. اختار المنجِّمون موعدًا بعد خمس سنوات. انتظر كلَّ يومٍ منها. تزوَّجا عام ١٦١٢، وأعطاها اسمًا جديدًا: مُمتاز محل — جوهرة القصر.",
    },
    {
      text: "لم يكن هذا زواجَ بلاطٍ شكليًّا. شاه جهان — الاسم الذي حمله خُرَّم بعد اعتلائه العرش — سلَّم ممتاز الخَتْمَ الإمبراطوريّ، فصارت الشخص الوحيد بجانبه الذي يحقُّ له التوقيع على وثائق الدولة. رافقته في كلّ حملةٍ عسكرية، حاملًا في أغلب الأحيان، عبر غبار الهند وأمطارها الموسمية. في تسعة عشر عامًا أنجبت أربعة عشر طفلًا. من الناجين: جَهان‌آرا التي ستصبح أقوى نساء الإمبراطورية، وأَوْرَنْغزيب الذي سيصبح أقسى حكّامها.",
    },
    {
      text: "عام ١٦٣١، خلال حملةٍ في وسط الهند، دخلت ممتاز في مخاض طفلها الرابع عشر. بعد ثلاثين ساعة كانت تنزف حتى الموت. أخذت من شاه جهان ثلاثة وعود: ابنِ لي ضريحًا أجمل من أيّ شيءٍ على الأرض. لا تتزوَّج بعدي. واعتنِ بأطفالنا. في السابع عشر من يونيو، عن ثمانيةٍ وثلاثين عامًا، رحلت جوهرة القصر. نجا المولود. خرج شاه جهان من الخيمة رجلًا آخر. في أسابيع ابيضَّت لحيته، وبكى حتّى كاد يفقد بصره.",
    },
    {
      text: "يقولون «الثالثةُ ثابتة»، لكنّ شاه جهان أعطى ثلاثة وعودٍ ثبتت كلُّها — لم يتزوَّج ثانيةً قطّ، ورعى أبناءه، أمّا الأوّل فلا يزال واقفًا حتّى اليوم. صبَّ ثروة أغنى إمبراطوريةٍ في الأرض لبنائه. عشرون ألف عامل. ألف فيل. اثنان وعشرون عامًا. رخامٌ أبيض من راجستان يتورَّد مع الفجر ويتحوَّل فضّيًّا تحت القمر. أحجارٌ كريمة من أقاصي الدنيا مرصَّعة بدقّة تجعل البناء يبدو متوهِّجًا من داخله. التكلفة: اثنان وثلاثون مليون روبية — نحو ثمانمئة مليون دولار بأسعار اليوم.",
    },
    {
      text: "عام ١٦٥٧ مرض شاه جهان، فاشتعلت حربٌ بين أبنائه الأربعة على العرش. انتصر أَوْرَنْغزيب — أقساهم. أعدم أخاه الأكبر دارا شِكُوه، وأخفى الباقين، ثمّ حبس أباه في برجٍ بقلعة آغرا. من خلال نوافذ حجريّة مشغولة، كان شاه جهان يرى تاج محلّ عبر النهر — ورديًّا عند الفجر، ناصعًا عند الظهيرة، فضّيًّا عند الغروب. ثمانية أعوام جلس هناك يحدِّق. اختارت ابنته جَهان‌آرا السِّجن معه، رافضةً أن يواجه أبوها النهاية وحيدًا.",
    },
    {
      text: "في الثاني والعشرين من يناير ١٦٦٦، مات شاه جهان عن أربعةٍ وسبعين عامًا، عيناه مثبَّتتان على القبّة البيضاء خلف النهر. رفض أَوْرَنْغزيب أن تُقام جنازة رسميّة. غُسِّل الجثمان، وُضع في تابوت، وحُمل في قاربٍ إلى تاج محلّ. دُفن بجانب ممتاز في السِّرداب — مكان الدفن الحقيقيّ تحت الضريحين اللذين يراهما الزوّار. قبره منزاحٌ قليلًا عن المركز — الشائبة الوحيدة في تناظر البناء — لأنّ كلّ شيءٍ صُمِّم من البداية لشخصٍ واحد. ذلك الانزياح يقول كلَّ شيء.",
    },
    {
      text: "اليوم، بعد نحو أربعمئة عام، يزور تاج محلّ ثمانية ملايين إنسان كلَّ سنة. أغلبهم يعرف الخطوط العريضة: رجلٌ أحبّ امرأة، ماتت، فبنى لها أجمل بناءٍ على وجه الأرض. ما لا يعرفونه هو الخاتمة — أنّه قضى سنواته الثمانيَ الأخيرة سجينًا في برج، يحدّق بالوعد الوحيد الذي استطاع الوفاء به، ينتظر أن يُحمَل عبر النهر ويُوضَع بجانبها في العتمة. تاج محلّ ليس مبنًى. إنّه شكل الحزن حين يملك ميزانية إمبراطورية.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// PERSIAN / FARSI (fa) — "سه قول"
// Proverb: "سه چیز را نمی‌شود پنهان کرد" (Three things cannot be hidden:
// love, a sneeze, a cough) — subverted: love, grief, and a building born
// from the heart of both.
// Register: Intimate modern Persian storyteller — warm, personal, unhurried.
// ═══════════════════════════════════════════════════════════════════════════════

const fa = {
  ...shared,
  lang: "fa",
  langStoryId: "fa#shah-jahans-tears",

  title: "سه قول",

  subtitle:
    "وقتی مرگ یک زن ثروت بزرگ\u200Cترین امپراتوری روی زمین را تبدیل به بنایی از غم کرد — بنایی که دنیا را ساکت کرد",

  excerpt:
    "سال ۱۶۰۷، در بازاری شلوغ در قصر مغولی، شاهزاده\u200Cای پانزده\u200Cساله دختری چهارده\u200Cساله را دید و قسم خورد با او ازدواج کند. بیست\u200Cوچهار سال بعد، آن زن در آغوشش جان داد — و او زیباترین آرامگاه تاریخ را برایش ساخت.",

  moralOrLesson:
    "اندازه\u200Cی عشق به حرف\u200Cهایی نیست که در حضور عزیزت می\u200Cزنی، بلکه به آنچه در غیابش می\u200Cسازی — و زیباترین چیزهای روی زمین از شادی زاده نشده\u200Cاند، بلکه از نپذیرفتن اینکه غم خاموش بماند.",

  paragraphs: [
    {
      text: "سال ۱۶۰۷ بود. شاهزاده خُرَّم، پسر پانزده\u200Cساله\u200Cی امپراتور جَهانگیر، داشت از بازار داخل کاخ رد می\u200Cشد که خشکش زد. دختری چهارده\u200Cساله جلوی یکی از غرفه\u200Cها ایستاده بود: اَرجُمَند بانو بیگم، دختر یکی از قدرتمندترین اشراف ایرانی\u200Cتبار دربار. خُرَّم رفت پیش پدرش و گفت می\u200Cخواهم با این دختر ازدواج کنم. ستاره\u200Cشناس\u200Cها تاریخی انتخاب کردند — پنج سال بعد. تک\u200Cتک آن روزها را صبر کرد. سال ۱۶۱۲ ازدواج کردند و خُرَّم نام تازه\u200Cای به او داد: ممتاز محل، گوهر کاخ.",
    },
    {
      text: "این ازدواج تشریفاتی نبود. شاه\u200Cجهان — همان خُرَّم بعد از رسیدن به تخت — مُهر امپراتوری را به ممتاز سپرد. غیر از خودش، تنها کسی که حق تأیید اسناد رسمی را داشت، او بود. در هر لشکرکشی همراهش بود، بیشتر وقت\u200Cها باردار، زیر آفتاب سوزان و بارش\u200Cهای سیل\u200Cآسای هند. در نوزده سال چهارده فرزند به دنیا آورد. از بازماندگان: جهان\u200Cآرا که قدرتمندترین زن امپراتوری شد، و اورنگ\u200Cزیب که بی\u200Cرحم\u200Cترین فرمانروایش.",
    },
    {
      text: "سال ۱۶۳۱، وسط یک لشکرکشی در مرکز هند، ممتاز برای چهاردهمین بار درد زایمان گرفت. سی ساعت بعد داشت از خونریزی می\u200Cمرد. از شاه\u200Cجهان سه قول گرفت: برایم آرامگاهی بساز زیباتر از هر چیزی روی زمین. هرگز دوباره زن نگیر. و مواظب بچه\u200Cهایمان باش. هفدهم ژوئن، در سی\u200Cوهشت\u200Cسالگی، گوهر کاخ رفت. بچه زنده ماند. شاه\u200Cجهان از آن چادر بیرون آمد، مردی که دیگر آن مرد قبلی نبود. ظرف چند هفته ریشش سفید شد و آن\u200Cقدر گریست که چشمانش تار شد.",
    },
    {
      text: "می\u200Cگویند سه چیز را نمی\u200Cشود پنهان کرد: عشق، غم، و بنایی که از دل هردوشان برخاسته باشد. شاه\u200Cجهان ثروت غنی\u200Cترین امپراتوری جهان را ریخت پای همان سه قول. بیست هزار کارگر. هزار فیل. بیست\u200Cودو سال. مرمر سفید از راجستان که سپیده\u200Cدم گلگون می\u200Cشود و زیر مهتاب نقره\u200Cای. سنگ\u200Cهای گرانبها از چهارگوشه\u200Cی دنیا — لاجورد، یشم، فیروزه، یاقوت — آن\u200Cقدر ظریف در مرمر نشانده که انگار بنا از درون نور می\u200Cدهد. بها: سی\u200Cودو میلیون روپیه — حدود هشتصد میلیون دلار به پول امروز.",
    },
    {
      text: "سال ۱۶۵۷ شاه\u200Cجهان بیمار شد و چهار پسرش جنگ تاج\u200Cوتخت را شروع کردند. اورنگ\u200Cزیب — بی\u200Cرحم\u200Cترینشان — پیروز شد. برادر بزرگش دارا شکوه را اعدام کرد، بقیه را از سر راه برداشت، و پدر خودش را در برجی از قلعه\u200Cی آگرا زندانی کرد. از پشت پنجره\u200Cهای مشبّک سنگی، شاه\u200Cجهان تاج\u200Cمحل را آن\u200Cسوی رودخانه می\u200Cدید — صورتی در سپیده، سفید در نیمروز، نقره\u200Cای در غروب. هشت سال آنجا نشست. دخترش جهان\u200Cآرا زندان را با او تقسیم کرد — نگذاشت پدرش تنها بمیرد.",
    },
    {
      text: "بیست\u200Cودوم ژانویه ۱۶۶۶، شاه\u200Cجهان در هفتادوچهارسالگی چشم از دنیا بست. تا آخرین لحظه نگاهش به گنبد سفید آن\u200Cسوی رود بود. اورنگ\u200Cزیب مراسم رسمی نگذاشت. جسد را شستند، در تابوت گذاشتند و با قایق به تاج\u200Cمحل بردند. کنار ممتاز، در سرداب زیرین دفنش کردند — همان\u200Cجا که گور واقعی است، زیر آرامگاه\u200Cهایی که بازدیدکنندگان می\u200Cبینند. مزار او اندکی از مرکز جابه\u200Cجاست — تنها نقص در تقارن بی\u200Cنقص بنا، چون همه\u200Cچیز برای یک نفر طراحی شده بود. همین نقص تمام حرف\u200Cها را می\u200Cزند.",
    },
    {
      text: "امروز، نزدیک به چهارصد سال بعد، هر سال هشت میلیون نفر به تاج\u200Cمحل سر می\u200Cزنند. بیشترشان داستان را بلدند: مردی زنی را عاشقانه دوست داشت، زن مُرد، مرد زیباترین بنای روی کره\u200Cی زمین را ساخت. آنچه نمی\u200Cدانند آخر ماجراست — که هشت سال آخر عمرش را اسیر برجی بود، خیره به تنها قولی که توانست نگهش دارد، منتظر روزی که با قایق از رود رد شود و در تاریکی کنار او بخوابد. تاج\u200Cمحل یک ساختمان نیست. شکل غمی\u200Cست که بودجه\u200Cی یک امپراتوری پشتش باشد.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// TURKISH (tr) — "Taş Kesilen İmparator"
// Proverb: "Üç günlük dünya" (It's a three-day world / Life is short) —
// subverted: Shah Jahan made a promise in that three-day world that has been
// standing for four hundred years.
// Register: Direct, gripping Turkish storyteller — pragmatic warmth.
// ═══════════════════════════════════════════════════════════════════════════════

const tr = {
  ...shared,
  lang: "tr",
  langStoryId: "tr#shah-jahans-tears",

  title: "Taş Kesilen İmparator",

  subtitle:
    "Bir kadının ölümü, dünyanın en zengin imparatorluğunu tarihin en güzel yas anıtına nasıl dönüştürdü",

  excerpt:
    "1607'de, Babür sarayının kalabalık çarşısında on beş yaşında bir şehzade on dört yaşında bir kız gördü ve onunla evleneceğine yemin etti. Yirmi dört yıl sonra kadın kollarında öldü — o da yeryüzünün en güzel türbesini inşa etti.",

  moralOrLesson:
    "Sevginin ölçüsü, sevdiğimizin yanındayken söylediklerimiz değil, yokluğunda inşa ettiklerimizdir — ve dünyadaki en güzel şeyler mutluluktan değil, acının susturulmayı reddetmesinden doğmuştur.",

  paragraphs: [
    {
      text: "1607 yılıydı. On beş yaşındaki Babür şehzadesi Hürrem — ileride Şah Cihan olarak tanınacak — babasının sarayındaki çarşıdan geçerken olduğu yere çakıldı. Tezgâhlardan birinin önünde on dört yaşında bir kız duruyordu: Ercümend Bânû Begüm, saraydaki en güçlü İranlı soyluların birinin kızı. Hürrem doğruca babası İmparator Cihangir'e gitti ve bu kızla evleneceğini söyledi. Müneccimler bir tarih belirledi — beş yıl sonrası. Her bir gününü bekledi. 1612'de evlendiler ve Hürrem ona yeni bir ad verdi: Mümtaz Mahal, Sarayın Mücevheri.",
    },
    {
      text: "Bu, kâğıt üzerinde kalan bir saray nikâhı değildi. Tahtı aldıktan sonra Şah Cihan adını alan Hürrem, imparatorluk mührünü Mümtaz'a teslim etti. Kendisinden başka resmi belgeleri onaylama yetkisine sahip tek kişi oydu. Her sefere birlikte gittiler — Mümtaz çoğu zaman hamile, Hindistan'ın kavurucu sıcağında ve muson yağmurlarında. On dokuz yılda on dört çocuk dünyaya getirdi. Hayatta kalanlar arasında imparatorluğun en güçlü kadını olacak Cihanara ile en acımasız hükümdarı olacak Evrengzib vardı.",
    },
    {
      text: "1631'de, Orta Hindistan'daki bir sefer sırasında Mümtaz on dördüncü çocuğunun doğum sancılarına tutuldu. Otuz saat sonra kan kaybından ölmek üzereydi. Şah Cihan'dan üç söz aldı: Bana dünyadaki her şeyden güzel bir türbe yap. Bir daha asla evlenme. Ve çocuklarımıza sahip çık. 17 Haziran'da, otuz sekiz yaşında, Sarayın Mücevheri gözlerini yumdu. Bebek yaşadı. Şah Cihan o çadırdan yıkılmış bir adam olarak çıktı. Haftalar içinde sakalı bembeyaz oldu; o kadar ağladı ki gözleri görmez hale geldi.",
    },
    {
      text: "\u201CÜç günlük dünya\u201D derler — ama Şah Cihan o üç günlük dünyada dört yüz yıl ayakta kalacak bir söz verdi. Yeryüzünün en zengin imparatorluğunun tüm servetini bu söze döktü. Yirmi bin işçi. Bin fil. Yirmi iki yıl. Şafakta pembeleşen, mehtapta gümüşe dönen Rajasthan mermeri. Dünyanın dört bir yanından getirilen değerli taşlar — lapis lazuli, yeşim, firuze, safir — öyle ince işlenmiş ki bina içinden ışık saçıyor sanırsınız. Bedeli: otuz iki milyon rupi. Bugünün parasıyla yaklaşık sekiz yüz milyon dolar.",
    },
    {
      text: "1657'de Şah Cihan hastalandı ve dört oğlu taht kavgasına tutuştu. En acımasızı Evrengzib kazandı. Ağabeyi Dârâ Şükûh'u idam ettirdi, diğerlerini ortadan kaldırdı ve öz babasını Agra Kalesi'ndeki bir kuleye kapattı. Şah Cihan, oyma taş kafeslerden Tac Mahal'i nehrin karşısında görüyordu — şafakta pembe, öğlende bembeyaz, akşamüstü gümüş. Sekiz yıl orada oturdu. Kızı Cihanara hapsi babasıyla paylaştı; onu sona yalnız bırakmayı reddetti.",
    },
    {
      text: "22 Ocak 1666'da Şah Cihan yetmiş dört yaşında hayata gözlerini yumdu. Son nefesine kadar gözleri nehrin ötesindeki beyaz kubbeye dikiliydi. Evrengzib devlet cenazesi yapılmasını reddetti. Ceset yıkandı, tabuta konuldu ve bir kayıkla Tac Mahal'e götürüldü. Mümtaz'ın yanı başına, alt kattaki asıl mezar odasına defnedildi — ziyaretçilerin bugün gördüğü sandukaların altına. Lahdi merkezden hafifçe kaymış; yapının kusursuz simetrisindeki tek çatlak — çünkü her şey baştan tek bir kişi için tasarlanmıştı. O küçük kayma her şeyi anlatıyor.",
    },
    {
      text: "Bugün, yaklaşık dört yüz yıl sonra, Tac Mahal'i her yıl sekiz milyon kişi ziyaret ediyor. Çoğu ana hikâyeyi bilir: Bir adam bir kadını sevdi, kadın öldü, adam dünyanın en güzel binasını dikti. Bilmedikleri son perdedir — son sekiz yılını bir kulede tutsak, tutabildiği tek sözüne bakarak, nehrin karşısına taşınıp karanlıkta onun yanına konulacağı günü bekleyerek geçirdiği. Tac Mahal bir bina değil. Kederin, arkasına bir imparatorluk hazinesi alınca büründüğü şekil.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// PUSH TO DYNAMODB
// ═══════════════════════════════════════════════════════════════════════════════

async function pushStory(record) {
  const label = `${record.lang}#${record.storyId}`;
  console.log(`\n⏳ Pushing ${label} ...`);

  // JSON round-trip validation
  const json = JSON.stringify(record);
  const parsed = JSON.parse(json);
  if (parsed.paragraphs.length !== record.paragraphs.length) {
    throw new Error(`JSON round-trip mismatch for ${label}`);
  }

  try {
    await doc.send(
      new PutCommand({
        TableName: TABLE,
        Item: record,
        ConditionExpression: "attribute_not_exists(langStoryId)",
      })
    );
    console.log(`✅ ${label} pushed successfully.`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(
        `⚠️  ${label} already exists. Overwriting with updated version...`
      );
      await doc.send(
        new PutCommand({ TableName: TABLE, Item: record })
      );
      console.log(`✅ ${label} overwritten successfully.`);
    } else {
      console.error(`❌ Failed to push ${label}:`, err.message);
      throw err;
    }
  }
}

async function main() {
  console.log("═══ Pushing Shah Jahan's Tears — ar / fa / tr ═══");
  console.log(`Table: ${TABLE}`);
  console.log(`Timestamp: ${now}`);

  // Validate paragraph constraints before pushing
  for (const rec of [ar, fa, tr]) {
    let totalChars = 0;
    for (let i = 0; i < rec.paragraphs.length; i++) {
      const p = rec.paragraphs[i];
      const chars = p.text.length;
      const words = p.text.split(/\s+/).length;
      totalChars += chars;
      if (chars > 600) {
        console.warn(
          `⚠️  ${rec.lang} P${i + 1}: ${chars} chars (over 600 limit)`
        );
      }
      if (words > 120) {
        console.warn(
          `⚠️  ${rec.lang} P${i + 1}: ${words} words (over 120 limit)`
        );
      }
    }
    console.log(
      `\n📊 ${rec.lang}: ${rec.paragraphs.length} paragraphs, ${totalChars} total chars`
    );
  }

  // Push sequentially — confirm each before proceeding
  await pushStory(ar);
  await pushStory(fa);
  await pushStory(tr);

  console.log("\n═══ All three versions pushed successfully ═══");
}

main().catch((err) => {
  console.error("\n💥 Fatal error:", err);
  process.exit(1);
});
