import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English) ───
const shared = {
  siteId: "alamut-castle",
  storyId: "father-who-killed-his-sons",
  icon: "⚖️",
  tier: "A",
  source:
    "Ata-Malik Juvayni, Tarikh-i Jahangushay (c.1260); Rashid al-Din Hamadani, Jami al-Tawarikh (c.1310); Bernard Lewis, The Assassins: A Radical Sect in Islam (1967); Farhad Daftary, The Isma'ilis: Their History and Doctrines (Cambridge, 2007); Marshall Hodgson, The Order of Assassins (1955); Encyclopaedia Iranica, 'HASAN SABBAH'",
  era: "c.1100-1120 CE (during Hassan-i Sabbah's rule of Alamut)",
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  disabled: false,
  hasAudio: false,
  isFree: true,
  storyCategory: "riddles_past",
  coordinates: { lng: 50.5861, lat: 36.4447 },
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// ARABIC (ar)
// Proverb subverted: العدلُ أساسُ المُلك — but nobody told you the cost
// Register: Engaging modern MSA — gripping storyteller, not news anchor
// ═══════════════════════════════════════════════════════════════════════════════
const ar = {
  ...shared,
  lang: "ar",
  langStoryId: "ar#father-who-killed-his-sons",
  title: "الأبُ الذي قَتَلَ وَلَدَيْه",
  subtitle: "سيّدُ أَلَمُوت الذي لم يُعفِ دمَهُ مِن حُكمِه",
  excerpt:
    "حسنُ الصبّاح حَكَمَ عُشَّ النسر بقاعدةٍ واحدة: لا أحدَ فوقَ القانون. ولمّا كَسَرها ابناه، أثبتَ أنّه يعني كلَّ كلمة — بأبشعِ ثمنٍ يدفعُهُ أبٌ على وجهِ الأرض.",
  characters: [
    "حسنُ الصبّاح (سيّد أَلَمُوت الذي أعدمَ ابنَيه)",
    "محمّد (ابن حسن، أُعدِمَ لشربه الخمر)",
    "أُستاذ حسين (ابن حسن، أُعدِمَ بتهمة القتل)",
    "حسين القائني (قائد إسماعيلي اتُّهِمَ أُستاذ حسين بقتله)",
  ],
  moralOrLesson:
    "العدل الحقيقي يُطالِبُ بأغلى الأثمان ممّن يملك أكثر — حاكمٌ يُعفي دمَهُ من قانونه لا يملك قانونًا أصلًا، وثمنُ المبدأ المُطلَق أنّه لا يرحمُ شيئًا، حتّى قلبَ من يُطبِّقُه.",
  paragraphs: [
    {
      text: "في سنة ١٠٩٠، صَعِدَ رجلٌ اسمُهُ حسنُ الصبّاح إلى قلعة أَلَمُوت — حِصنٌ مُعلَّقٌ فوقَ جُرفٍ في شمال فارس، عالٍ حتّى لقَّبوه «عُشَّ النسر.» من هناك بنى واحدةً من أخطرِ الشبكات في تاريخ الشرق: الإسماعيليّين النزاريّين، جماعةً انشقّت عن الشيعة واغتالت أقوى الرجال في الشرق الأوسط. لكنّ حسن ما عاش كأمراء الحرب. ثوبٌ خَشِن، طعامٌ بسيط، وساعاتٌ بلا نهاية في الكتب. وقاعدةٌ واحدة من حديد: لا أحدَ — مهما كان — فوقَ القانون.",
    },
    {
      text: "وأثبتَها من أوّل يوم. مُؤذِّنٌ ضُبِطَ يعزف على الناي — ذنبٌ لا يستحقّ حتّى الذِّكر — فطردَهُ حسن من القلعة إلى الأبد. رجلٌ آخرُ وُجِدَ يشربُ الخمرَ سرًّا، فقَتَلَه. الخمرُ في أَلَمُوت عقوبتُها الموت. لا نفيٌ ولا جَلْد. الموت. كلُّ من عاش داخلَ تلك الأسوار فَهِمَ القاعدة. ما لم يفهمه أحدٌ بعد: إلى أين سيأخذها هذا الرجل.",
    },
    {
      text: "كان لحسنَ ابنان: محمّد وأُستاذ حسين. في أيّ مملكةٍ عاديّة لكانا وريثَيه. لكنّ حسن أصرَّ دائمًا أنّه لا يبني سلالة. قال إنّه مُجرَّدُ أمينٍ على أَلَمُوت حتّى يعود الإمام المُنتظَر — القائدُ الروحي الذي آمنَ النزاريّون بعودته. لو ورَّثَ أبناءه الحُكم، لانهار كلُّ شيءٍ بناه. سيصبح مجرَّد أمير حربٍ يلبس الدينَ قناعًا. أعداؤه كانوا يهمسون بذلك أصلًا.",
    },
    {
      text: "ثمّ كسرَ ابنُهُ محمّد القاعدةَ الوحيدة التي لا تُكسَر. ضُبِطَ يشربُ الخمرَ داخلَ القلعة — نفسُ الجُرم الذي سبقَ أن قَتَلَ بسببه رجلًا. التفاصيل ضاعت مع الزمن: لا سجلَّ لمحاكمة، لا أثرَ لدفاع. الذي سجَّلَته المصادر هو النتيجة فقط. حسنُ الصبّاح أعدمَ ابنَه. الرجل الذي أمرَ باغتيال أقوى مسؤولي العالم الإسلامي حاسَبَ لحمَهُ ودمَهُ بنفسِ المعيار.",
    },
    {
      text: "الضربة الثانية كانت أشدَّ ظلامًا. أُستاذ حسين — ابنُ حسن الوحيد المُتبقّي — اتُّهِمَ بالتورّط في مقتل حسين القائني، قائدٌ إسماعيلي كان يُدير عمليّاتهم في شرق فارس. هل كانت التهمة حقيقيّة أم دسيسةَ مُنافسين؟ لا أحدَ يعرف بيقين. المؤرّخ بِرنارد لويس درسَ كلَّ ما وصلنا وقال إنّ الرواية «على الأرجح صحيحة.» أيًّا كان الحقّ، النتيجة واحدة: حسن أعدمَ ابنَهُ الثاني. الوريثان. انتهيا.",
    },
    {
      text: "يقولون «العدلُ أساسُ المُلك» — لكنّ أحدًا لم يُخبِرْك كم يُكلِّفُ الأساس. ما فعلَه حسن لم يحدث قبلَهُ في العالم الإسلامي. لا حاكمٌ قتلَ ابنَيه معًا — لا بتهمة الخيانة، لا بتهمة التمرّد، وبالتأكيد ليس بسبب كأسِ خمر. يمكنك أن تقرأها بطريقتَين: إمّا أنّ حسن كان وحشًا بلا مشاعر، أو أنّه كان مستعدًّا لتدمير ما يحبّ ليُثبتَ أنّ مبادئه حقيقيّة. أعداؤه اختاروا القراءة الأولى. أتباعه اختاروا الثانية.",
    },
    {
      text: "وحين كان يحتضرُ في يونيو ١١٢٤، لم يُسمِّ ابنَ أخٍ ولا قريبًا. استدعى أربعةً من أوثقِ قادته وعيَّنَ كِيا بُزُرْك أُمّيد — جنديٌّ مُخلص لا تربطه به قرابة — سيّدًا جديدًا على أَلَمُوت. وصيّته الأخيرة: «اخدموا معًا حتّى يأتيَ الإمامُ ليأخذَ مملكتَه.» كان قد تأكَّد، بأغلى ثمنٍ يدفعه أب، ألّا يسمّيَها أحدٌ أبدًا مشروعًا عائليًّا.",
    },
    {
      text: "مات وحيدًا في غرفته، في ظلِّ عُشِّ النسر — رجلٌ تخلّى عن راحته وسلالته وربّما إنسانيّته من أجل فكرةٍ واحدة: لا أحدَ فوقَ القانون. لا جنودك. لا حلفاؤك. لا أبناؤك.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// PERSIAN (fa)
// Proverb subverted: هر که بامش بیش، برفش بیشتر — but the snow was his sons' blood
// Register: Intimate modern Persian — a Persian telling their own history
// ═══════════════════════════════════════════════════════════════════════════════
const fa = {
  ...shared,
  lang: "fa",
  langStoryId: "fa#father-who-killed-his-sons",
  title: "پدری که پسرانش را کُشت",
  subtitle: "سرورِ الموت که خونِ خودش را هم از قانون مستثنا نکرد",
  excerpt:
    "حسنِ صبّاح از عُقاب\u200Cنشین با یک قانون حکومت کرد: هیچ\u200Cکس بالاتر از قانون نیست. وقتی دو پسرش آن قانون را شکستند، ثابت کرد که تا آخرین کلمه\u200Cاش جدّی بوده — به سنگین\u200Cترین بهایی که یک پدر می\u200Cتواند بپردازد.",
  characters: [
    "حسنِ صبّاح (سرورِ الموت که پسرانش را اعدام کرد)",
    "محمد (پسر حسن، به جرم شراب\u200Cخواری اعدام شد)",
    "اُستاد حسین (پسر حسن، به اتّهام قتل اعدام شد)",
    "حسین قائنی (فرمانده\u200Cی اسماعیلی که اُستاد حسین متّهم به قتلش شد)",
  ],
  moralOrLesson:
    "عدالتِ واقعی بیشترین بها را از صاحبِ بیشترین قدرت می\u200Cخواهد — حاکمی که خونِ خودش را از قانون مستثنا کند اصلاً قانونی ندارد، و بهایِ اصولِ مطلق این است که هیچ\u200Cچیز را رحم نمی\u200Cکند، حتّی قلبِ کسی که اجرایش می\u200Cکند.",
  paragraphs: [
    {
      text: "سال ۱۰۹۰ میلادی، مردی به نام حسنِ صبّاح قلعه\u200Cی الموت را تصرّف کرد — دژی بر لبه\u200Cی پرتگاهی در شمال ایران، آن\u200Cقدر بلند که لقبش شده بود «عُقاب\u200Cنشین.» از آنجا یکی از مَخوف\u200Cترین شبکه\u200Cهای جهان قرون وسطا را بنا کرد: نزاریان اسماعیلی، شاخه\u200Cای جداشده از اسلام شیعی که قوی\u200Cترین مردان خاورمیانه را ترور می\u200Cکردند. اما خودِ حسن مثل سرداران جنگ زندگی نمی\u200Cکرد. لباسِ ساده، غذای ساده، روزهای بی\u200Cانتها پای کتاب. و یک قانون آهنین: هیچ\u200Cکس — هیچ\u200Cکس — بالاتر از قانون نیست.",
    },
    {
      text: "و همان اول ثابتش کرد. مؤذّنی که نِی می\u200Cزد — حتّی خلاف بزرگی هم نبود — برای همیشه از قلعه اخراج شد. مردی دیگر که پنهانی شراب نوشیده بود، کشته شد. شراب در الموت مجازاتش مرگ بود. نه تبعید. نه شلّاق. مرگ. هرکسی پشت آن دیوارها زندگی می\u200Cکرد، معامله را فهمیده بود. چیزی که هنوز کسی نفهمیده بود این بود: این مرد تا کجا حاضر است پیش برود.",
    },
    {
      text: "حسن دو پسر داشت: محمد و اُستاد حسین. در هر حکومت عادی، وارثانش بودند. اما حسن همیشه تأکید داشت که سلسله نمی\u200Cسازد. می\u200Cگفت او فقط امانت\u200Cدارِ الموت است تا روزی که امامِ غایب بازگردد — رهبرِ روحانی\u200Cای که نزاریان به بازگشتش ایمان داشتند. اگر قدرت را به پسرانش می\u200Cداد، تمام آنچه ساخته بود فرو می\u200Cریخت. فقط یک جنگ\u200Cسالار دیگر می\u200Cشد که دین را پوشش منافع شخصی کرده. دشمنانش دقیقاً همین را زمزمه می\u200Cکردند.",
    },
    {
      text: "و بعد پسرش محمد آن یک قانونی را شکست که شکستنش ممکن نبود. در قلعه شراب نوشیده بود — همان جُرمی که پدرش پیش\u200Cتر به\u200Cخاطرش مردی را کشته بود. جزئیات در تاریخ گم شده: نه سندی از محاکمه مانده، نه ردّی از دفاع. تنها چیزی که منابع ثبت کرده\u200Cاند، نتیجه است. حسنِ صبّاح پسرِ خودش را اعدام کرد. مردی که فرمانِ قتلِ قدرتمندترین مقاماتِ جهان اسلام را داده بود، گوشت و خونِ خودش را به همان معیار سنجید.",
    },
    {
      text: "ضربه\u200Cی دوم تاریک\u200Cتر بود. اُستاد حسین — تنها پسرِ باقی\u200Cمانده\u200Cی حسن — متّهم شد به دست داشتن در قتلِ حسین قائنی، فرمانده\u200Cای اسماعیلی که عملیات شرق ایران را اداره می\u200Cکرد. اتّهام واقعی بود یا نقشه\u200Cی رقیبان؟ هیچ\u200Cکس با قطعیت نمی\u200Cداند. مورّخ برنارد لوئیس بعد از بررسیِ تمام منابع باقی\u200Cمانده، روایت را «به احتمال زیاد واقعی» خواند. نتیجه در هر صورت یکی بود: حسن دومین پسرش را هم کشت. هر دو وارث. تمام.",
    },
    {
      text: "می\u200Cگویند «هر که بامش بیش، برفش بیشتر» — اما کسی نگفته بود که برفِ بامِ حسن، خونِ پسرانش خواهد بود. کاری که او کرد در جهان اسلام بی\u200Cسابقه بود. هیچ حاکمی هر دو پسرش را نکشته بود — نه به جرمِ خیانت، نه به جرمِ شورش، و قطعاً نه به خاطر یک جام شراب. دو جور می\u200Cشود خواندش: یا حسن هیولایی بود بی\u200Cاحساس، یا حاضر بود عزیزترین چیزش را نابود کند تا ثابت کند اصولش واقعی\u200Cست. دشمنانش خوانشِ اول را برداشتند. پیروانش خوانشِ دوم را.",
    },
    {
      text: "و وقتی در ژوئن ۱۱۲۴ داشت جان می\u200Cداد، نه برادرزاده\u200Cای نام بُرد و نه خویشاوندی. چهار تن از مورداعتمادترین فرماندهانش را خواست و کیا بُزُرگ\u200Cاُمّید را — سربازی وفادار بدون هیچ نسبتِ خانوادگی — سرورِ جدید الموت کرد. آخرین سفارشش: «با هم خدمت کنید تا امام بیاید و مُلکش را تحویل بگیرد.» مطمئن شده بود — به گران\u200Cترین بهایی که یک پدر می\u200Cتواند بپردازد — که هیچ\u200Cکس هیچ\u200Cوقت اسمش را کسب\u200Cوکار خانوادگی نگذارد.",
    },
    {
      text: "در اتاقِ مطالعه\u200Cاش، در سایه\u200Cی عُقاب\u200Cنشین، تنها مُرد — مردی که آسایشش را داد، خاندانش را داد، و شاید انسانیتش را، برای یک ایده: هیچ\u200Cکس بالاتر از قانون نیست. نه سربازانت. نه متّحدانت. نه پسرانت.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// TURKISH (tr)
// Proverb subverted: Adalet mülkün temelidir — but nobody asks the price
// Register: Modern Turkish documentary narrator — clear-eyed, pragmatic
// ═══════════════════════════════════════════════════════════════════════════════
const tr = {
  ...shared,
  lang: "tr",
  langStoryId: "tr#father-who-killed-his-sons",
  title: "Oğullarını Öldüren Baba",
  subtitle:
    "Kendi kanını bile yasanın üstünde tutmayan Alamut'un efendisi",
  excerpt:
    "Hasan Sabbah, Kartal Yuvası'nı tek bir kuralla yönetti: kimse yasanın üstünde değildir. İki oğlu bu kuralı çiğnediğinde, her kelimesini kastettiğini kanıtladı — bir babanın ödeyebileceği en ağır bedelle.",
  characters: [
    "Hasan Sabbah (oğullarını idam ettiren Alamut'un efendisi)",
    "Muhammed (Hasan'ın oğlu, şarap içtiği için idam edildi)",
    "Üstat Hüseyin (Hasan'ın oğlu, cinayet suçlamasıyla idam edildi)",
    "Hüseyin Kaini (Üstat Hüseyin tarafından öldürüldüğü iddia edilen İsmaili komutan)",
  ],
  moralOrLesson:
    "Gerçek adalet en ağır bedeli en çok güce sahip olandan ister — kendi kanını yasadan muaf tutan bir yöneticinin yasası yoktur, ve mutlak ilkenin bedeli hiçbir şeyi esirgememesidir, onu uygulayan kişinin yüreğini bile.",
  paragraphs: [
    {
      text: "1090 yılında Hasan Sabbah adında bir adam, kuzey İran'da bir uçurumun tepesindeki kaleyi ele geçirdi — o kadar yüksekteydi ki adına \"Kartal Yuvası\" diyorlardı. Oradan ortaçağ dünyasının en korkulan örgütlerinden birini kurdu: Şii İslam'dan kopmuş bir mezhep olan Nizari İsmaililer. Orta Doğu'nun en güçlü adamlarını suikastle ortadan kaldırdılar. Ama Hasan bir savaş ağası gibi yaşamadı. Sade giysiler, yalın yemekler, kitaplarla geçen saatler. Ve tek bir demir kural: kimse — kim olursa olsun — yasanın üstünde değildir.",
    },
    {
      text: "Bunu daha en başından ispat etti. Ney çalan bir müezzin — ciddi bile sayılmayacak bir suç — kaleden ömür boyu kovuldu. Gizlice şarap içtiği ortaya çıkan bir adam öldürüldü. Alamut'ta şarabın cezası ölümdü. Sürgün değil. Dayak değil. Ölüm. O surların içinde yaşayan herkes kuralı anlamıştı. Henüz kimsenin anlayamadığı şey, bu adamın nereye kadar gidebileceğiydi.",
    },
    {
      text: "Hasan'ın iki oğlu vardı: Muhammed ve Üstat Hüseyin. Normal bir hükümdarlıkta ikisi de veliaht olurdu. Ama Hasan hep ısrar etti: hanedan kurmuyorum. Alamut'u sadece gizli İmam adına koruyorum — Nizarilerin bir gün döneceğine inandığı ruhani lider. Eğer iktidarı oğullarına devrederse, inşa ettiği her şey çökerdi. Dini kişisel çıkarına alet eden sıradan bir savaş ağası olurdu. Düşmanları zaten tam bunu fısıldıyordu.",
    },
    {
      text: "Sonra oğlu Muhammed, çiğnenmesi mümkün olmayan tek kuralı çiğnedi. Kalenin içinde şarap içerken yakalandı — babasının daha önce bir adamı öldürttüğü aynı suç. Ayrıntılar tarihin karanlığında kaybolmuş: ne bir yargılama kaydı var, ne bir savunma izi. Kaynakların kaydettiği tek şey sonuç. Hasan Sabbah kendi öz oğlunu idam ettirdi. İslam dünyasının en güçlü yöneticilerine suikast emri veren adam, kendi kanını da aynı terazide tarttı.",
    },
    {
      text: "İkinci darbe daha karanlıktı. Hasan'ın hayatta kalan tek oğlu Üstat Hüseyin, doğu İran'daki operasyonları yöneten İsmaili komutan Hüseyin Kaini'nin öldürülmesine yardım etmekle suçlandı. Suçlama gerçek miydi, yoksa saray rakiplerinin oyunu mu? Kesin olarak asla bilemeyeceğiz. Tarihçi Bernard Lewis, ulaşılabilen tüm kaynakları inceledikten sonra hikâyeyi \"büyük olasılıkla doğru\" diye niteledi. Sonuç her halükârda aynıydı: Hasan ikinci oğlunu da öldürttü. İki varis. İkisi de gitti.",
    },
    {
      text: "\"Adalet mülkün temelidir\" derler — ama temelin bedelini kimse sormaz. Hasan'ın yaptığı İslam dünyasında emsalsizdi. Hiçbir hükümdar iki oğlunu birden öldürmemişti — ne ihanet suçlamasıyla, ne isyan yüzünden, kesinlikle bir kadeh şarap için hiç. İki şekilde okunabilir: ya Hasan hiçbir şey hissetmeyen bir canavardı, ya da ilkelerinin gerçek olduğunu kanıtlamak için en çok sevdiği şeyi yok etmeye hazırdı. Düşmanları birinci okumayı seçti. Takipçileri ikinciyi.",
    },
    {
      text: "Haziran 1124'te can çekişirken ne bir yeğen ne bir kuzen adını andı. En güvendiği dört komutanı çağırıp Kiya Büzürg Ümmid'i — hiçbir kan bağı olmayan sadık bir askeri — Alamut'un yeni efendisi olarak atadı. Son vasiyeti: \"İmam gelip mülkünü teslim alana dek birlikte hizmet edin.\" Bir babanın ödeyebileceği en ağır bedelle, kimsenin buna asla aile şirketi demeyeceğinden emin olmuştu.",
    },
    {
      text: "Kartal Yuvası'nın gölgesinde, çalışma odasında yalnız öldü — rahatını, soyunu ve belki insanlığını tek bir fikre feda etmiş bir adam: Kimse yasanın üstünde değildir. Askerlerin değil. Müttefiklerin değil. Oğulların değil.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// PUSH
// ═══════════════════════════════════════════════════════════════════════════════
async function push(item, label) {
  console.log(`\n━━━ Pushing ${label} ━━━`);
  console.log(`  siteId:      ${item.siteId}`);
  console.log(`  langStoryId: ${item.langStoryId}`);
  console.log(`  title:       ${item.title}`);
  console.log(`  paragraphs:  ${item.paragraphs.length}`);

  // Validate before pushing
  if (!item.siteId || !item.langStoryId || !item.lang) {
    throw new Error(`${label}: Missing required key fields`);
  }
  if (!item.title || !item.subtitle || !item.excerpt) {
    throw new Error(`${label}: Missing title/subtitle/excerpt`);
  }
  if (!item.paragraphs || item.paragraphs.length < 6) {
    throw new Error(`${label}: Too few paragraphs (${item.paragraphs?.length})`);
  }
  for (let i = 0; i < item.paragraphs.length; i++) {
    const t = item.paragraphs[i].text;
    if (!t || t.length === 0) {
      throw new Error(`${label}: Empty paragraph at index ${i}`);
    }
    if (t.length > 600) {
      console.warn(`  ⚠ Paragraph ${i + 1} is ${t.length} chars (limit ~500)`);
    }
  }

  try {
    await doc.send(new PutCommand({ TableName: TABLE, Item: item }));
    console.log(`  ✓ ${label} pushed successfully`);
  } catch (err) {
    console.error(`  ✗ ${label} FAILED:`, err.message);
    throw err;
  }
}

(async () => {
  console.log(`Timestamp: ${now}`);
  console.log(`Table:     ${TABLE}`);

  await push(ar, "Arabic (ar)");
  await push(fa, "Persian (fa)");
  await push(tr, "Turkish (tr)");

  console.log("\n═══ All 3 stories pushed successfully ═══\n");
})();
