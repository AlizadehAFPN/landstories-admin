import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English) ───
const base = {
  siteId: "moscow-kremlin",
  storyId: "ivan-terrible-ghost",
  icon: "\u{1F464}",
  tier: "S",
  readingTimeMinutes: 2,
  image: "",
  disabled: false,
  thumbnail: "",
  coordinates: { lng: 37.6173, lat: 55.7508 },
  hasAudio: false,
  isFree: true,
  storyCategory: "ghosts_curses",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════
//  ARABIC — شَبَحُ إيفان الرَّهيب
//  Register: Vivid modern MSA storytelling — skilled podcast narrator
//  Proverb subverted: «إِنَّ اللهَ يُمْهِلُ وَلا يُهْمِل»
//    (God gives respite but never neglects)
//  → "وَيَبْدُو أَنَّ الكرملينَ أَيْضًا لا يَنْسى"
// ═══════════════════════════════════════════════════════════════════
const ar = {
  ...base,
  lang: "ar",
  langStoryId: "ar#ivan-terrible-ghost",
  title: "شَبَحُ إيفان الرَّهيب",
  subtitle: "قَيْصَرٌ يُطارِدُ قَلْعَتَهُ مُنْذُ أَرْبَعَةِ قُرُون",
  excerpt:
    "لَمْ يُولَدْ إيفانُ وَحْشًا. تُوِّجَ أَوَّلَ قَيْصَرٍ في تاريخِ روسيا عامَ ١٥٤٧، وَلِسَنَواتٍ كانَ حاكِمًا يُبْهِرُ الجَميع — وَسَّعَ الإِمبِراطوريَّةَ شَرْقًا حَتَّى أَعْماقِ سِيبيريا، وَحَدَّثَ قَوانينَ البِلاد، وَبَنى كاتِدرائيَّةَ القِدِّيسِ باسيل الشَّهيرَةَ في قَلْبِ موسكو. ثُمَّ ماتَتْ زَوْجَتُهُ أَناستازيا عامَ ١٥٦٠، فَاقْتَنَعَ أَنَّ عائِلاتِ النُّبَلاءِ الرُّوس — البُويار — هُمْ مَنْ سَمَّمُوها. انْكَسَرَ شَيْءٌ في داخِلِهِ لَمْ يَلْتَئِمْ أَبَدًا. وَما جاءَ بَعْدَها هُوَ ما خَلَّدَ اسْمَهُ لِلأَبَد.",
  moralOrLesson:
    "آثامُ الأَقْوِياءِ تَبْقى تَتَرَدَّدُ في جُدْرانِ الأَماكِنِ الَّتي حَكَمُوا مِنْها",
  source:
    "شَهادات حُرَّاس الكرملين، مَجموعات الفولكلور التاريخيّ الروسيّ، أَدَب الأَشْباح الروسيّ",
  characters: [
    "إيفان الرَّهيب (الشَّبَح)",
    "حُرَّاسُ الكرملين عَبْرَ القُرُون",
  ],
  era: "١٥٨٤ — حتَّى اليوم",
  paragraphs: [
    {
      text: "لَمْ يُولَدْ إيفانُ وَحْشًا. تُوِّجَ أَوَّلَ قَيْصَرٍ في تاريخِ روسيا عامَ ١٥٤٧، وَلِسَنَواتٍ كانَ حاكِمًا يُبْهِرُ الجَميع — وَسَّعَ الإِمبِراطوريَّةَ شَرْقًا حَتَّى أَعْماقِ سِيبيريا، وَحَدَّثَ قَوانينَ البِلاد، وَبَنى كاتِدرائيَّةَ القِدِّيسِ باسيل الشَّهيرَةَ في قَلْبِ موسكو. ثُمَّ ماتَتْ زَوْجَتُهُ أَناستازيا عامَ ١٥٦٠، فَاقْتَنَعَ أَنَّ عائِلاتِ النُّبَلاءِ الرُّوس — البُويار — هُمْ مَنْ سَمَّمُوها. انْكَسَرَ شَيْءٌ في داخِلِهِ لَمْ يَلْتَئِمْ أَبَدًا. وَما جاءَ بَعْدَها هُوَ ما خَلَّدَ اسْمَهُ لِلأَبَد.",
    },
    {
      text: "أَسَّسَ جَيْشًا سِرِّيًّا اسْمُهُ الأُوبريتشنينا — آلافُ الفُرْسانِ بِالسَّوادِ يُعَلِّقُونَ رُؤُوسَ كِلابٍ مَقْطُوعَةً عَلى سُرُوجِهِمْ، عَلامَةً عَلى أَنَّهُمْ «يَشُمُّونَ» رائِحَةَ الخِيانَة. مِنْ قَلْبِ الكرملين، أَطْلَقَ إيفانُ سَنَواتٍ مِنَ الرُّعْب. أَمَرَ بِخَنْقِ رَئيسِ الكَنيسَةِ الأُرثوذُكسيَّة. وَمَحا مَدينَةَ نُوفغُورُود بِأَكْمَلِها في خَمْسَةِ أَسابيعَ مِنَ الدَّم. لَمْ يَسْلَمْ أَحَدٌ: لا كاهِنٌ، لا نَبيلٌ، وَلا حَتَّى دَمُهُ.",
    },
    {
      text: "في نوفمبر ١٥٨١، ضَرَبَ ابْنَهُ وَوَليَّ عَهْدِهِ — الَّذي يَحْمِلُ اسْمَهُ ذاتَهُ — بِعَصًا ذاتِ رَأْسٍ حَديديٍّ وَسَطَ شِجار. قَتَلَهُ. خَلَّدَتْ لَوْحَةٌ روسيَّةٌ شَهيرَةٌ تِلْكَ اللَّحْظَة: أَبٌ بِعُيُونٍ مَجْنُونَةٍ يَحْتَضِنُ ابْنَهُ المُحْتَضَر، وَقَدْ هَبَطَ عَلَيْهِ فَجْأَةً كُلُّ ثِقَلِ ما صَنَعَتْ يَدُه. أَمْضى إيفانُ سَنَواتِهِ الثَّلاثَ الأَخيرَةَ يَتَأَرْجَحُ بَيْنَ نَوَباتِ وَحْشِيَّةٍ وَتَوَسُّلاتِ تَوْبَةٍ يائِسَة، يَزْحَفُ عَلى رُكْبَتَيْهِ في كَنائِسِ الكرملين.",
    },
    {
      text: "في الثَّامِنِ وَالعِشْرينَ مِنْ مارِسَ ١٥٨٤، جَلَسَ إيفانُ لِيَلْعَبَ الشِّطْرَنْج. لَمْ يُنْهِ الجَوْلَة. وَجَدُوهُ جُثَّةً مُتَيَبِّسَة، وَعَلى وَجْهِهِ تَعْبيرٌ قالَ مَنْ شاهَدَهُ إِنَّهُ كانَ «مُرَوِّعًا لا يُحْتَمَل».",
    },
    {
      text: "وَبَدَأَتِ المُطارَدَة.",
    },
    {
      text: "عَلى مَدى أَرْبَعَةِ قُرُون، تَكَرَّرَتِ الشَّهادَةُ نَفْسُها: شَبَحٌ طَويلُ القامَةِ بِثِيابِ راهِبٍ يَسيرُ عَلى أَسْوارِ الكرملين في الظَّلام. حينَ احْتَلَّ نابُلْيُون موسكو عامَ ١٨١٢، أَقْسَمَ جُنودٌ فَرَنْسِيُّونَ أَنَّهُمْ أَحَسُّوا بِوُجُودٍ جَليديٍّ في الأَجْنِحَةِ المَلَكيَّة — شُموعٌ تَنْطَفِئُ وَحْدَها وَأَنْفاسٌ تَتَحَوَّلُ بُخارًا في سِبْتَمْبِر. وَفي الحِقْبَةِ السُّوفييتيَّة، تَناقَلَ مُوَظَّفُو الكرملين هَمْسًا حِكاياتِ خُطُواتٍ في مَمَرَّاتٍ مُغْلَقَةٍ وَأَبْوابٍ تُفْتَحُ وَحْدَها في غُرَفٍ مُقْفَلَةٍ مُنْذُ عُقُود.",
    },
    {
      text: "يُقالُ إِنَّ الشَّبَحَ يَظْهَرُ أَكْثَرَ في نوفمبر — الشَّهْرُ ذاتُهُ الَّذي قَتَلَ فيهِ ابْنَه. مَنْ شَعَرَ بِهِ يَصِفُ مَوْجَةً ساحِقَةً مِنَ الحُزْنِ وَالغَضَب، كَأَنَّكَ ارْتَطَمْتَ بِجِدارٍ مَبْنِيٍّ مِنْ مَشاعِرَ خالِصَة. يَتَحَدَّثُ بَعْضُهُمْ عَنْ يَدٍ بارِدَةٍ تَقْبِضُ عَلى كَتِفِكَ، وَصَوْتٍ يَهْمِسُ بِروسيَّةٍ قَديمَةٍ جِدًّا لا يَفْقَهُها أَحَدٌ مِنَ الأَحْياء.",
    },
    {
      text: "لَسْتَ مُضْطَرًّا لِلإِيمانِ بِالأَشْباحِ لِتَفْهَمَ ما حَدَث. إيفانُ الرَّهيبُ زَرَعَ في تِلْكَ الجُدْرانِ مِنَ الأَلَمِ ما يَكْفي لِيَشْعُرَ بِهِ كُلُّ مَنْ يَمُرُّ، حَتَّى بَعْدَ أَرْبَعَةِ قُرُون. لا يُمْكِنُكَ أَنْ تَمْشِيَ في مَمَرَّاتِ الكرملين دُونَ إِحْساسٍ بِأَنَّ أَحَدًا يَقِفُ خَلْفَكَ تَمامًا. يَقُولُونَ إِنَّ اللهَ يُمْهِلُ وَلا يُهْمِل — وَيَبْدُو أَنَّ الكرملينَ أَيْضًا لا يَنْسى. بَعْضُ الأَماكِنِ لا تَحْفَظُ التَّاريخَ فَحَسْب — بَلْ تَرْفُضُ أَنْ تُطْلِقَ سَراحَه.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
//  PERSIAN — شبحِ ایوانِ مخوف
//  Register: Natural modern Persian prose — quality podcast narrator
//  Proverb subverted: «خدا دیر گیرد ولی سخت گیرد»
//    (God catches late but catches hard)
//  → "کرملین ولی سخت‌تر گرفته: چهارصد سال است و هنوز رها نکرده"
// ═══════════════════════════════════════════════════════════════════
const fa = {
  ...base,
  lang: "fa",
  langStoryId: "fa#ivan-terrible-ghost",
  title: "شبحِ ایوانِ مخوف",
  subtitle: "تزاری که هرگز قلعه‌اش را ترک نکرد",
  excerpt:
    "ایوان هیولا به دنیا نیامد. سال ۱۵۴۷ اولین تزار تاریخ روسیه شد و سال‌ها واقعاً درخشید — امپراتوری را تا اعماق سیبری گسترش داد، قوانین کشور را نو کرد و کلیسای جامع واسیلی مقدس را در مسکو بنا کرد. بعد، سال ۱۵۶۰، همسرش آناستازیا مُرد. ایوان یقین کرد که بویارها — خاندان‌های قدرتمند اشرافی روسیه — او را مسموم کرده‌اند. چیزی در درونش شکست که دیگر هیچ‌وقت جوش نخورد. و آنچه بعد آمد، نامش را برای همیشه در تاریخ حک کرد.",
  moralOrLesson:
    "گناهان قدرتمندان در دیوارهای جایی که حکم راندند طنین می‌اندازد",
  source:
    "شهادات نگهبانان کرملین، مجموعه‌های فولکلور تاریخی روسیه، ادبیات ارواح روسی",
  characters: [
    "ایوان مخوف (شبح)",
    "نگهبانان کرملین در طول قرن‌ها",
  ],
  era: "۱۵۸۴ — تا امروز",
  paragraphs: [
    {
      text: "ایوان هیولا به دنیا نیامد. سال ۱۵۴۷ اولین تزار تاریخ روسیه شد و سال‌ها واقعاً درخشید — امپراتوری را تا اعماق سیبری گسترش داد، قوانین کشور را نو کرد و کلیسای جامع واسیلی مقدس را در مسکو بنا کرد. بعد، سال ۱۵۶۰، همسرش آناستازیا مُرد. ایوان یقین کرد که بویارها — خاندان‌های قدرتمند اشرافی روسیه — او را مسموم کرده‌اند. چیزی در درونش شکست که دیگر هیچ‌وقت جوش نخورد. و آنچه بعد آمد، نامش را برای همیشه در تاریخ حک کرد.",
    },
    {
      text: "ارتش مخفی‌ای ساخت به نام اُوپریچنینا — هزاران سوارکار سیاه‌پوش که سرِ بریده‌ی سگ به زین اسب‌شان می‌بستند، یعنی خائنان را «بو می‌کشند». از دلِ کرملین، ایوان سال‌ها وحشت به پا کرد. رهبر کلیسای ارتدوکس روسیه را خفه کرد. شهر نووگورود در شمال را طی پنج هفته‌ی خونین با خاک یکسان کرد. نه کشیش در امان بود، نه اشراف، نه حتی خونِ خودش.",
    },
    {
      text: "نوامبر ۱۵۸۱. وسط یک دعوا، ایوان عصای آهنی‌اش را بر سرِ پسر و ولیعهدش کوبید — پسری که همان نام پدر را داشت. پسر مُرد. آن لحظه بعدها در یکی از دردناک‌ترین نقاشی‌های تاریخ هنر روسیه ماندگار شد: پدری با چشم‌های دیوانه که فرزند محتضرش را در آغوش گرفته و تازه فهمیده چه بلایی سرش آورده. ایوان سه سال آخر عمرش را میان خشونت و التماس‌های توبه گذراند — روی زانو در کلیساهای کرملین می‌خزید.",
    },
    {
      text: "بیست‌وهشتم مارس ۱۵۸۴. ایوان نشست پای شطرنج. بازی تمام نشد. جسدش را خشک و سرد پیدا کردند، با چهره‌ای که شاهدان گفتند «طاقتِ نگاه‌کردن نداشت.»",
    },
    {
      text: "و بعد از مرگش... ارواح بیدار شدند.",
    },
    {
      text: "بیش از چهارصد سال است که در کرملین یک روایت تکرار می‌شود: سایه‌ای بلندقد با لباس راهب که شب‌ها در امتداد دیوارهای قلعه حرکت می‌کند. وقتی ارتش ناپلئون سال ۱۸۱۲ مسکو را گرفت، سربازان فرانسوی قسم خوردند که در اتاق‌های سلطنتی حضوری یخ‌زده حس کرده‌اند — شمع‌ها خودشان خاموش می‌شدند و نفس‌ها وسط سپتامبر بخار می‌شد. در دوران شوروی هم کارکنان کرملین زیرلبی از صدای پا در راهروهای پلمب‌شده و درهایی حرف می‌زدند که در اتاق‌های قفل‌شده‌ی سال‌ها، خودشان باز می‌شدند.",
    },
    {
      text: "می‌گویند شبح بیشتر در نوامبر پیدایش می‌شود — همان ماهی که پسرش را کشت. کسانی که حسش کرده‌اند از موجی خُردکننده از غم و خشم حرف می‌زنند، انگار سینه‌به‌سینه‌ی دیواری از احساس شده باشی. بعضی‌ها از دستِ سردی می‌گویند که شانه‌ات را می‌چسبد، و صدایی که به روسی‌ای آنقدر کهنه زمزمه می‌کند که هیچ آدم زنده‌ای معنی‌اش را نمی‌فهمد.",
    },
    {
      text: "لازم نیست به ارواح باور داشته باشی تا بفهمی چه شده. ایوان مخوف آنقدر درد در آن دیوارها کاشت که حتی بعد از چهار قرن، نمی‌شود در راهروهای کرملین قدم زد بی‌آنکه حس کنی کسی درست پشت سرت ایستاده. می‌گویند خدا دیر گیرد ولی سخت گیرد — کرملین ولی سخت‌تر گرفته: چهارصد سال است و هنوز رها نکرده. بعضی جاها تاریخ را فقط نگه نمی‌دارند — زندانی‌اش می‌کنند.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
//  TURKISH — Korkunç İvan'ın Hayaleti
//  Register: Natural modern Turkish — skilled journalist / storyteller
//  Proverb subverted: «Zalimin mumu yatsıya kadar yanar»
//    (The oppressor's candle burns only until evening prayer)
//  → "ama İvan'ın mumu bir türlü sönmedi"
// ═══════════════════════════════════════════════════════════════════
const tr = {
  ...base,
  lang: "tr",
  langStoryId: "tr#ivan-terrible-ghost",
  title: "Korkunç İvan'ın Hayaleti",
  subtitle: "Kalesini terk etmeyi reddeden çar",
  excerpt:
    "İvan canavar olarak doğmadı. 1547'de Rusya'nın tarihindeki ilk çar oldu ve yıllarca gerçekten etkileyici bir hükümdardı — imparatorluğu doğuya Sibirya'ya kadar genişletti, yasaları çağdaşlaştırdı, Moskova'da Aziz Vasil Katedrali'ni yaptırdı. Sonra 1560'ta ilk eşi Anastasiya öldü. İvan, Rusya'nın güçlü soylu aileleri olan boyarların onu zehirlediğine ikna oldu. İçinde bir şey kırıldı — ve bir daha asla düzelmedi. Sonra gelenler, adını sonsuza dek tarihe kazıdı.",
  moralOrLesson:
    "Güçlülerin günahları, hüküm sürdükleri yerin taşlarında yankılanır durur",
  source:
    "Kremlin muhafız tanıklıkları, tarihî folklor derlemeleri, Rus hayalet edebiyatı",
  characters: [
    "Korkunç İvan (hayalet)",
    "Yüzyıllar boyunca Kremlin muhafızları",
  ],
  era: "1584 – günümüz",
  paragraphs: [
    {
      text: "İvan canavar olarak doğmadı. 1547'de Rusya'nın tarihindeki ilk çar oldu ve yıllarca gerçekten etkileyici bir hükümdardı — imparatorluğu doğuya Sibirya'ya kadar genişletti, yasaları çağdaşlaştırdı, Moskova'da Aziz Vasil Katedrali'ni yaptırdı. Sonra 1560'ta ilk eşi Anastasiya öldü. İvan, Rusya'nın güçlü soylu aileleri olan boyarların onu zehirlediğine ikna oldu. İçinde bir şey kırıldı — ve bir daha asla düzelmedi. Sonra gelenler, adını sonsuza dek tarihe kazıdı.",
    },
    {
      text: "Opriçnina adında gizli bir ordu kurdu — binlerce siyah cüppeli süvari, eyer kaşlarına kesik köpek başı bağlardı; hainleri \"koklayacaklarının\" işaretiydi. Kremlin'in içinden İvan, yıllarca sürecek bir dehşet dönemi başlattı. Ortodoks Kilisesi'nin en üst liderini boğdurdu. Kuzeydeki Novgorod şehrini beş kanlı haftada yerle bir etti. Ne rahip güvendeydi, ne soylu, ne kendi kanı.",
    },
    {
      text: "Kasım 1581. İvan, veliaht oğluyla — adaşı İvan'la — tartışırken demir uçlu asasını kafasına indirdi. Oğlu öldü. O sahne daha sonra Rus sanatının en yürek burkucu tablolarından birinde ölümsüzleşti: çılgın bakışlı bir baba, can veren oğlunu kucaklamış, ne yaptığının ağırlığı yeni yüzüne çarpmış. Son üç yılını şiddet nöbetleriyle çaresiz tövbeler arasında geçirdi — Kremlin kiliselerinde dizlerinin üstünde sürünerek.",
    },
    {
      text: "28 Mart 1584. İvan satranç oynamaya oturdu. Oyunu bitiremedi. Cesedini kaskatı buldular; yüzündeki ifadeyi gören tanıklar tek bir şey söyledi: \"Bakmaya dayanılmazdı.\"",
    },
    {
      text: "Ve sonra musallat olmaya başladı.",
    },
    {
      text: "Dört yüz yılı aşkın süredir Kremlin'de hep aynı şey anlatılır: geceleri kale surları boyunca süzülen, keşiş cüppeli uzun boylu bir gölge. Napolyon'un ordusu 1812'de Moskova'yı işgal ettiğinde Fransız askerler saray odalarında buz gibi bir varlık hissettiklerine yemin etti — mumlar kendiliğinden sönüyor, nefesleri eylül ayında bile buğuya dönüyordu. Sovyet döneminde de Kremlin çalışanları, mühürlü koridorlardaki ayak seslerini ve onlarca yıldır kilitli odalarda kendiliğinden açılan kapıları fısıltıyla birbirlerine anlatırdı.",
    },
    {
      text: "Hayaletin en çok kasım ayında belirdiği söylenir — oğlunu öldürdüğü ay. Onu hissedenlerin anlattığına göre, insanı ezen bir keder ve öfke dalgası çarpıyor birden; sanki duygulardan örülmüş bir duvara toslamışsın. Bazıları omuzlarına yapışan buz gibi bir elden, hiçbir yaşayan insanın anlayamayacağı kadar eski bir Rusçayla fısıldayan bir sesten söz ediyor.",
    },
    {
      text: "Hayaletlere inanmak zorunda değilsiniz. Ama Korkunç İvan o duvarlara öyle derin bir acı işledi ki, dört yüz yıl sonra bile Kremlin'in koridorlarında yürürken arkanızda birinin dikildiğini hissetmeden edemezsiniz. Derler ki zalimin mumu yatsıya kadar yanar — ama İvan'ın mumu bir türlü sönmedi. Bazı yerler tarihi sadece saklamaz; bırakıp gitmesine izin vermez.",
    },
  ],
};

// ─── Push each language ───
async function pushStory(item, label) {
  console.log(`\nPushing ${label}...`);
  console.log(`  siteId:      ${item.siteId}`);
  console.log(`  langStoryId: ${item.langStoryId}`);
  console.log(`  title:       ${item.title}`);
  console.log(`  paragraphs:  ${item.paragraphs.length}`);

  // Validate
  if (!item.siteId || !item.langStoryId || !item.lang || !item.title) {
    throw new Error(`${label}: Missing required fields`);
  }
  if (item.paragraphs.length < 6 || item.paragraphs.length > 10) {
    throw new Error(
      `${label}: Paragraph count ${item.paragraphs.length} out of range`
    );
  }
  for (let i = 0; i < item.paragraphs.length; i++) {
    const t = item.paragraphs[i].text;
    if (!t || t.length === 0) {
      throw new Error(`${label}: Paragraph ${i} is empty`);
    }
    if (t.length > 600) {
      console.warn(`  \u26A0 Paragraph ${i} is ${t.length} chars (target <500)`);
    }
  }

  const totalChars = item.paragraphs.reduce((sum, p) => sum + p.text.length, 0);
  console.log(`  totalChars:  ${totalChars}`);

  try {
    await docClient.send(
      new PutCommand({
        TableName: "Story",
        Item: item,
        ConditionExpression:
          "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
      })
    );
    console.log(`  \u2705 ${label} pushed successfully.`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.error(`  \u274C ${label}: Record already exists! Skipping.`);
    } else {
      console.error(`  \u274C ${label} FAILED:`, err.message);
      throw err;
    }
  }
}

async function main() {
  console.log("\u2550".repeat(55));
  console.log("  Ghost of Ivan the Terrible \u2014 ar / fa / tr push");
  console.log(`  Timestamp: ${now}`);
  console.log("\u2550".repeat(55));

  await pushStory(ar, "ARABIC");
  await pushStory(fa, "PERSIAN");
  await pushStory(tr, "TURKISH");

  console.log("\n\u2705 All three languages pushed successfully.");
}

main().catch((err) => {
  console.error("\n\uD83D\uDCA5 Fatal error:", err.message);
  process.exit(1);
});
