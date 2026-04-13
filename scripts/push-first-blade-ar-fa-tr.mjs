import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const NOW = Math.floor(Date.now() / 1000);

// ── Shared fields (unchanged from English) ──────────────────────────
const shared = {
  siteId: "alamut-castle",
  storyId: "murder-of-nizam-al-mulk",
  icon: "🗡️",
  tier: "A",
  storyCategory: "crowns_conquests",
  era: "October 14, 1092 CE (10 Ramadan 485 AH)",
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  coordinates: { lat: 36.4447, lng: 50.5861 },
  hasAudio: false,
  isFree: true,
  disabled: false,
  source:
    "Ata-Malik Juvayni, Tarikh-i Jahangushay (c.1260); Nizam al-Mulk, Siyasatnama (Book of Government, c.1091); Rashid al-Din Hamadani, Jami al-Tawarikh (c.1310); Bernard Lewis, The Assassins: A Radical Sect in Islam (1967); Farhad Daftary, The Isma'ilis: Their History and Doctrines (Cambridge, 2007); World History Encyclopedia",
  characters: [
    "Hassan-i Sabbah (master of Alamut who ordered the killing)",
    "Nizam al-Mulk (Abu Ali al-Hasan ibn Ali al-Tusi, Seljuq vizier)",
    "Abu Tahir Arrani (the fidai who carried out the assassination)",
    "Sultan Malik-Shah I (Seljuq sultan, died 35 days later)",
    "Sultan Alp Arslan (Malik-Shah's father, whom Nizam also served)",
  ],
  updatedAt: NOW,
};

// ═══════════════════════════════════════════════════════════════════════
// ARABIC (ar)
// ═══════════════════════════════════════════════════════════════════════
const ar = {
  ...shared,
  lang: "ar",
  langStoryId: "ar#murder-of-nizam-al-mulk",
  title: "النَّصلُ الأَوَّل",
  subtitle:
    "الطَّعنَةُ الَّتي هَزَّت عَرشَ السَّلاجِقة وأَعلَنَت ميلادَ الحَشّاشين",
  excerpt:
    "على الطَّريقِ بينَ أَصفَهانَ وبَغداد، قُربَ بَلدَةِ نَهاوَنْد، اقتَرَبَ رجلٌ بِثيابِ دَرويشٍ مُتَهالِكَة مِن هَودَجِ أقوى رجلٍ في الدَّولةِ السَّلجوقيَّة. لم يكُنْ يَحمِلُ عَريضَة. كانَ يَحمِلُ خِنجَرًا.",
  moralOrLesson:
    "نَصلٌ واحِدٌ في يَدِ مُؤمنٍ حقيقيٍّ يُحقِّقُ ما يَعجَزُ عنهُ جَيشٌ مِن مئةِ ألف — والأقوياءُ الذينَ يَظنّونَ أنفسَهُم فَوقَ المَوتِ يكتَشِفون، بعدَ فَواتِ الأوان، أنَّ لا سورَ مِنَ الجنودِ يَحمي رجُلًا مِن فِكرةٍ حانَ وقتُها.",
  paragraphs: [
    {
      text: "في عامِ ٤٨٥ للهِجرة، لم يكُنْ في العالَمِ الإسلاميِّ رجلٌ أقوى من نِظامِ المُلك. ثلاثونَ سنةً قضاها وَزيرًا أعظَمَ لِدولةِ السَّلاجِقة — خَدَمَ فيها السُّلطانَ ألب أَرسَلان ثمَّ ابنَهُ مَلِكشاه. دولةٌ تمتدُّ مِن تُخومِ الصِّينِ إلى شَواطِئِ المُتوسِّط. بنى المَدارِسَ النِّظامِيَّةَ لمُحاربةِ الإسماعيليِّين، وألَّفَ كِتابًا في الحُكمِ لا يزالُ يُقرأُ اليوم. لكنَّ رَجُلًا في حِصنِ أَلَموت، فَوقَ الغُيوم، قَرَّرَ أنَّ كُلَّ هذا يَجِبُ أن يَنتهي.",
    },
    {
      text: "ذلكَ الرَّجُلُ هوَ حَسَنُ الصَّبّاح، سيِّدُ أَلَموت وقائدُ الإسماعيليِّينَ النِّزاريِّين. فَلسَفَتُهُ بسيطةٌ وقاسية: بَدَلَ أن تُرسِلَ آلافَ الجنودِ ليموتوا في حربٍ مفتوحة، اقتُلْ طاغِيَةً واحِدًا يَقهَرُ الملايين. أدواتُهُ كانوا الفِدائيِّين — «المُتَفانون» — رِجالٌ تدرَّبوا سنواتٍ على القِتالِ والتَّنَكُّرِ وآدابِ البِلاط. سِلاحُهُم دائمًا الخِنجَر. ضَربَتُهُم دائمًا أمامَ المَلأ. ولم يكونوا يَنتَظرونَ النَّجاة. المُهِمَّةُ ذَهابٌ بِلا إيّاب، يَعتَنِقونَها كقُربان.",
    },
    {
      text: "الرّابعَ عَشَرَ مِن أُكتوبر ١٠٩٢ — العاشِرُ مِن رَمضان. قافِلةُ الوَزيرِ تَسيرُ مِن أَصفَهانَ نَحوَ بَغداد، قُربَ بَلدَةِ نَهاوَنْد. نِظامُ المُلك، وقد جاوَزَ السَّبعين، أنهى لِلتَّوِّ إفطارَه. اقتَرَبَ منهُ رجلٌ بِثيابٍ رَثَّة — يبدو كَدَرويشٍ مُتَجَوِّل — ونادى أنَّ مَعَهُ عَريضَة. الوَزيرُ كانَ مَعروفًا بأنَّهُ يَستَقبِلُ أمثالَ هؤلاء. مالَ نَحوَه. اسمُ الرَّجلِ أبو طاهِرٍ الأرّاني. لم يكُنْ يَحمِلُ عَريضَة. كانَ يَحمِلُ خِنجَرًا.",
    },
    {
      text: "طَعنةٌ واحِدة. سَقطَ أقوى رجلٍ في الإمبراطوريَّة. حاوَلَ أبو طاهرٍ الفِرار، لكنَّ قَدَمَهُ تَعثَّرَت بِحَبلِ خَيمة. قَتَلَهُ الحُرّاسُ في ثَوانٍ — بعدَ لَحَظاتٍ مِن سُقوطِ هَدَفِه. ماتَ كما ماتَ كلُّ فِدائيٍّ قبلَهُ وبَعدَه: يَعرِفُ أنَّها رِحلةٌ بِلا عَودة. كلُّ شَيءٍ حَدَثَ في أقلَّ مِن دقيقة. لكنَّ ما تَبِعَها غَيَّرَ وَجهَ الشَّرقِ لأكثرَ مِن قَرن.",
    },
    {
      text: "بعدَ خمسةٍ وثلاثينَ يَومًا، ماتَ السُّلطانُ مَلِكشاه نَفسُهُ — في ظُروفٍ مُريبةٍ جَعَلَت كثيرًا مِنَ المُؤرِّخينَ يُرَجِّحونَ أنَّهُ اغتِيلَ هوَ أيضًا. بِغيابِ الوَزيرِ والسُّلطان معًا، انفَجَرَت دولةُ السَّلاجِقةِ في حَربٍ أهليَّةٍ بينَ أبناءِ مَلِكشاه، كلٌّ منهُم يتنازَعُ العَرش. لم يَبقَ لأحدٍ مِنهُم جَيشٌ يُرسِلُهُ لِحِصارِ قِلاعِ الجَبَل. هذا بالضَّبطِ ما حَسَبَ لهُ حَسَنُ الصَّبّاح: إزالةُ رَجلٍ واحِد — رُبَّما اثنَين — عَطَّلَتْ أكبرَ تهديدٍ عسكريٍّ لِقَومِهِ ومنحَتهُم عُقودًا لِلنُّموّ.",
    },
    {
      text: "يقولُ القُرآنُ الكريم: «كَم مِن فِئَةٍ قَلِيلَةٍ غَلَبَتْ فِئَةً كَثِيرَةً بِإِذنِ اللَّهِ». لكنَّ حَسَنَ الصَّبّاح لم يَحتَجْ حتّى إلى فِئةٍ قليلة — احتاجَ إلى رجلٍ واحد. بعدَ مَقتَلِ نِظامِ المُلك، فَهِمَ كلُّ حاكمٍ في المِنطقةِ الرِّسالة: لا جِدارَ حُرّاسٍ يَحميكَ مِمَّن قَرَّرَ أن يموت. السُّلطانُ سَنجَر — أحدُ أبناءِ مَلِكشاه — استيقظَ ذاتَ صَباحٍ لِيَجِدَ خِنجَرًا مَغروزًا في الأرضِ بِجوارِ فِراشِه، ورِسالةً مِن حَسَن: «لَو أنَّ هذا النَّصلَ في صَدرِكَ بَدَلَ التُّراب، ما كانَ أحدٌ لِيُنقِذَك.» لم يَقتَرِبْ سَنجَر، أعظمُ مُحاربي السَّلاجِقة، مِنَ الإسماعيليِّينَ بَعدَها أبدًا.",
    },
    {
      text: "النَّصلُ الذي سَقَطَ على نِظامِ المُلكِ في طَريقِ بَغداد لم يُنهِ حياةَ رجلٍ فحسب. أثبَتَ مَبدأً لا يزالُ يَتَرَدَّدُ صَداهُ: الاستعدادُ لِبَذلِ كلِّ شَيء — الرّاحة، الأمان، الحياةَ ذاتَها — يُمكِنُ أن يُركِعَ أعتى إمبراطوريَّةٍ على وَجهِ الأرض.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// PERSIAN (fa)
// ═══════════════════════════════════════════════════════════════════════
const fa = {
  ...shared,
  lang: "fa",
  langStoryId: "fa#murder-of-nizam-al-mulk",
  title: "نخستین تیغ",
  subtitle:
    "ترورِ نظام‌الملک؛ ضربه‌ای که سلجوقیان را از پا درآورد و نامِ حشّاشین را جاودانه کرد",
  excerpt:
    "در مسیرِ اصفهان به بغداد، نزدیکِ نهاوند، مردی با جامه‌ی ژنده‌ی درویشی به کجاوه‌ی قدرتمندترین مردِ امپراتوریِ سلجوقی نزدیک شد. عریضه‌ای نداشت. خنجری داشت.",
  moralOrLesson:
    "یک تیغ در دستِ کسی که به‌راستی باور دارد، کاری می‌کند که از صدهزار سرباز برنمی‌آید — و آنان که خود را شکست‌ناپذیر می‌پندارند، دیر یا زود درمی‌یابند که هیچ حصاری از لشکر، مردی را از اندیشه‌ای که وقتش رسیده محافظت نمی‌کند.",
  paragraphs: [
    {
      text: "سالِ ۴۸۵ هجری. نظام‌الملک سی سال تمام وزیرِ اعظمِ سلجوقیان بود — نخست در خدمتِ آلپ‌ارسلان، سپس پسرش ملکشاه. سرزمینی زیرِ فرمانش بود که از مرزهای چین تا کرانه‌های مدیترانه کشیده می‌شد. مدرسه‌های نظامیه را بنا کرد تا اسماعیلیان را از میدان به‌در کند. «سیاست‌نامه» نوشت — کتابی در هنرِ فرمانروایی که هنوز خوانده می‌شود. اما در قلعه‌ای بر فرازِ ابرها به نامِ الموت، مردی تصمیم گرفته بود که تمامِ این قدرت باید فرو بریزد.",
    },
    {
      text: "آن مرد حسنِ صبّاح بود. رهبرِ اسماعیلیانِ نزاری و خداوندگارِ الموت. فلسفه‌اش بُرّنده و بی‌رحمانه بود: به جای آن‌که هزاران سرباز را به کشتارگاهِ جنگ بفرستی، یک ستمگر را بکُش — همان که بر گرده‌ی میلیون‌ها تن سوار است. ابزارش فداییان بودند: مردانی که سال‌ها در رزم و تغییرِ چهره و آدابِ دربار پرورده شده بودند. سلاحشان همیشه خنجر. حمله‌شان همیشه در ملأِ عام. و هرگز قصدِ بازگشت نداشتند. مأموریت، راهی بود بی‌بازگشت — و با جان و دل می‌پذیرفتندش.",
    },
    {
      text: "چهاردهمِ اکتبرِ ۱۰۹۲ — دهمِ رمضان. کاروانِ وزیر از اصفهان به سوی بغداد می‌رفت و به نزدیکیِ نهاوند رسیده بود. نظام‌الملک، مردی هفتادوچند ساله، تازه افطار کرده بود. مردی ژنده‌پوش — به هیئتِ درویشی سرگردان — به کجاوه نزدیک شد و بانگ زد که عریضه‌ای دارد. وزیر به پذیرشِ چنین کسانی عادت داشت. به جلو خم شد. نامِ آن مرد ابوطاهرِ ارّانی بود. عریضه‌ای نداشت. خنجری داشت.",
    },
    {
      text: "یک ضربه. قدرتمندترین مردِ امپراتوری بر زمین افتاد. ابوطاهر خواست بگریزد اما پایش به طنابِ چادری گیر کرد. نگهبانان ظرفِ چند ثانیه کارش را تمام کردند — لحظه‌ای پس از سقوطِ هدفش. درست همان‌گونه جان داد که هر فدایی انتظارش را داشت. همه‌چیز در کمتر از یک دقیقه تمام شد. اما آنچه در پی آمد، سرنوشتِ خاورمیانه را بیش از یک سده دگرگون کرد.",
    },
    {
      text: "سی‌وپنج روز بعد، خودِ ملکشاه هم مُرد — آن‌قدر مشکوک که بسیاری از تاریخ‌نگاران باور دارند او نیز ترور شد. بدونِ وزیر و سلطان، امپراتوریِ سلجوقی از هم پاشید. پسرانِ ملکشاه به جانِ هم افتادند و هرکدام ادعای تاج‌وتخت داشت. دیگر لشکری برای حمله به دژهای کوهستانی نمانده بود. حسنِ صبّاح دقیقاً همین را پیش‌بینی کرده بود: حذفِ یک نفر — شاید دو نفر — بزرگ‌ترین تهدیدِ نظامی علیه قومش را خنثی کرد و ده‌ها سال فرصت خرید.",
    },
    {
      text: "ناصرخسرو — خودش اسماعیلی و هم‌روزگارِ این ماجرا — سروده بود: «از ماست که بر ماست.» نظام‌الملک مدرسه ساخت تا اسماعیلیان را ریشه‌کن کند، اما همان رسمش — پذیرفتنِ عریضه‌ها با آغوشِ باز — دروازه‌ی مرگش شد. پس از قتلش، هر فرمانروایی فهمید: هیچ دیواری از نگهبان، تو را از کسی که از مرگ نمی‌هراسد نگه نمی‌دارد. سلطان سنجر صبحی از خواب بیدار شد و خنجری دید در خاکِ کنارِ بالینش فرورفته، با پیامی از حسن: «اگر این تیغ به جای خاک در سینه‌ات بود، هیچ‌کس نجاتت نمی‌داد.» سنجر — نیرومندترین جنگاورِ سلجوقی — دیگر هرگز دست به اسماعیلیان نزد.",
    },
    {
      text: "خنجری که در راهِ بغداد بر نظام‌الملک فرود آمد، تنها جانِ یک مرد را نگرفت. اصلی را ثابت کرد که هنوز طنینش باقی‌ست: آمادگی برای از دست دادنِ همه‌چیز — آسایش، امنیت، خودِ زندگی — می‌تواند نیرومندترین امپراتوریِ روی زمین را به زانو درآورد.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// TURKISH (tr)
// ═══════════════════════════════════════════════════════════════════════
const tr = {
  ...shared,
  lang: "tr",
  langStoryId: "tr#murder-of-nizam-al-mulk",
  title: "İlk Hançer",
  subtitle:
    "Nizâmülmülk suikastı: Selçuklu'yu dize getiren ve Haşhaşîleri dünyaya tanıtan tek bıçak darbesi",
  excerpt:
    "Isfahan'dan Bağdat'a giden yolda, Nihâvend kasabası yakınlarında, derviş kılığında bir adam Selçuklu İmparatorluğu'nun en güçlü insanının tahtırevanına yaklaştı. Elinde dilekçe yoktu. Bir hançer vardı.",
  moralOrLesson:
    "İnancına gerçekten bağlı bir insanın elindeki tek bir bıçak, yüz bin kişilik ordunun başaramadığını başarabilir — ve kendini dokunulmaz sanan güçlüler er geç öğrenir ki hiçbir asker duvarı, vakti gelmiş bir fikirden kimseyi koruyamaz.",
  paragraphs: [
    {
      text: "1092 yılı, Hicri 485. Nizâmülmülk, İslam dünyasının en güçlü insanıydı. Otuz yıl boyunca Büyük Selçuklu Devleti'nin veziriâzamı olarak hüküm sürmüştü — önce Sultan Alparslan'ın, sonra oğlu Melikşah'ın yanında. Otoritesi Çin sınırlarından Akdeniz kıyılarına uzanıyordu. İsmailîleri bastırmak için Nizamiye medreselerini kurdu. Devlet yönetimi üzerine bir kitap yazdı ki bugün hâlâ okunuyor. Ama dağların doruğunda, Alamut denen bir kalede, tek bir adam bu devasa gücün artık sona ermesi gerektiğine karar vermişti.",
    },
    {
      text: "O adam Hasan Sabbah'tı. Nizarî İsmailîlerin önderi, Alamut Kalesi'nin efendisi. Felsefesi acımasızca basitti: milyonlara zulmeden bir tiranı öldürmek, binlerce askeri açık savaşta ölüme yollamaktan daha etkilidir. Silahları fedaîlerdi — \"kendini adayanlar\" — yıllarca dövüş, kılık değiştirme ve saray adabı eğitimi almış adamlar. Her zaman hançer kullanırlardı. Her zaman herkesin gözü önünde vururlardı. Ve asla kaçmayı düşünmezlerdi. Görev dönüşü olmayan bir yolculuktu ve bunu bir adak gibi kucaklarlardı.",
    },
    {
      text: "14 Ekim 1092 — Ramazan'ın onuncu günü. Vezirin kafilesi Isfahan'dan Bağdat'a doğru yol alıyordu, Nihâvend yakınlarındaydı. Yetmişini geçkin Nizâmülmülk, iftarını yeni bitirmişti. Paçavra giysiler içinde bir adam — gezgin bir derviş kılığında — tahtırevana yaklaşıp elinde dilekçe olduğunu söyledi. Vezir bu tür ziyaretçileri kabul etmesiyle bilinirdi. Öne doğru eğildi. Adamın adı Ebu Tâhir Arrânî'ydi. Elinde dilekçe yoktu. Bir hançer vardı.",
    },
    {
      text: "Tek bir darbe. İmparatorluğun en güçlü adamı yere yığıldı. Ebu Tâhir kaçmayı denedi ama ayağı bir çadır ipine takıldı. Muhafızlar onu saniyeler içinde öldürdü — hedefi düştükten birkaç nefes sonra. Her fedaînin beklediği şekilde can verdi. Her şey bir dakikadan kısa sürdü. Ama ardından gelenler, Ortadoğu'nun kaderini yüz yılı aşkın süre boyunca yeniden yazacaktı.",
    },
    {
      text: "Otuz beş gün sonra Sultan Melikşah da öldü — koşullar öylesine şüpheliydi ki pek çok tarihçi onun da suikaste kurban gittiğini düşünüyor. Vezir ve sultan birden sahneden silinince, Selçuklu İmparatorluğu iç savaşa sürüklendi. Melikşah'ın oğulları taht kavgasına tutuştu, her biri tacı kendine istiyordu. Artık hiçbirinin dağ kalelerine saldıracak askeri kalmamıştı. Hasan Sabbah tam olarak bunu hesaplamıştı: bir kişiyi — belki iki kişiyi — ortadan kaldırarak halkına yönelik en büyük tehdidi etkisiz hale getirdi ve onlarca yıl nefes alma alanı kazandı.",
    },
    {
      text: "Türkler \"bir kıvılcım koca ormanı yakar\" der. Ama Nizâmülmülk suikastında orman, çağının en büyük imparatorluğuydu — kıvılcım ise tek bir adam ve tek bir hançer. Onun ölümünden sonra bölgedeki her hükümdar aynı dersi aldı: canını hiçe saymış birinin önünde hiçbir muhafız duvarı seni koruyamaz. Sultan Sencer — Melikşah'ın oğullarından biri — bir sabah uyandığında yastığının yanında toprağa saplanmış bir hançer ve Hasan'dan bir not buldu: \"Bu bıçak toprağa değil göğsüne saplansaydı, seni kimse kurtaramazdı.\" Selçukluların en yaman savaşçısı Sencer, bir daha asla İsmailîlere dokunmadı.",
    },
    {
      text: "Bağdat yolunda Nizâmülmülk'ü deviren o hançer, yalnızca bir adamın hayatına son vermedi. Yankısı bugün bile duyulan bir ilkeyi kanıtladı: her şeyden — rahattan, güvenlikten, hayatın kendisinden — vazgeçmeye hazır olmak, yeryüzünün en kudretli imparatorluğunu bile dize getirebilir.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// Push all three
// ═══════════════════════════════════════════════════════════════════════
async function pushRecord(record) {
  const label = `${record.lang}#${record.storyId}`;
  console.log(`\n── Pushing ${label} ──`);

  // Validate JSON structure
  if (!record.siteId || !record.langStoryId || !record.lang) {
    throw new Error(`${label}: missing required keys`);
  }
  if (!Array.isArray(record.paragraphs) || record.paragraphs.length < 6) {
    throw new Error(`${label}: paragraphs must have >= 6 items`);
  }
  for (const [i, p] of record.paragraphs.entries()) {
    if (!p.text || typeof p.text !== "string") {
      throw new Error(`${label}: paragraph[${i}].text is invalid`);
    }
    if (p.text.length > 600) {
      console.warn(
        `  ⚠ paragraph[${i}] is ${p.text.length} chars (limit 500, +20% = 600)`
      );
    }
  }

  const totalChars = record.paragraphs.reduce((s, p) => s + p.text.length, 0);
  console.log(
    `  paragraphs: ${record.paragraphs.length}, total chars: ${totalChars}`
  );

  await docClient.send(
    new PutCommand({
      TableName: TABLE,
      Item: record,
      ConditionExpression:
        "attribute_not_exists(siteId) OR attribute_not_exists(langStoryId)",
    })
  );
  console.log(`  ✓ ${label} pushed successfully`);
}

async function main() {
  try {
    await pushRecord(ar);
    await pushRecord(fa);
    await pushRecord(tr);
    console.log("\n══ All 3 records pushed successfully ══\n");
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.error(
        "\n✗ Record already exists. Use update or delete first.\n"
      );
      console.error("Failing langStoryId:", err.$metadata);
    } else {
      console.error("\n✗ Error:", err.message);
    }
    process.exit(1);
  }
}

main();
