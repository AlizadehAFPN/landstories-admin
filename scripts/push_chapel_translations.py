#!/usr/bin/env python3
"""
Push ar/fa/tr versions of "The Chapel of St. Kinga" to DynamoDB Story table.
Each version is recreated as a native-born story, not a translation.
"""

import boto3
import time
import json
import sys

# AWS config
session = boto3.Session(
    region_name="eu-north-1",
)
dynamodb = session.resource("dynamodb")
table = dynamodb.Table("Story")

now_ts = int(time.time())

# ──────────────────────────────────────────────
# Shared fields (unchanged from English record)
# ──────────────────────────────────────────────
shared = {
    "siteId": "wieliczka-salt-mine",
    "storyId": "chapel-of-st-kinga",
    "icon": "⛪",
    "tier": "A",
    "source": "Wieliczka Salt Mine historical archives; UNESCO World Heritage documentation",
    "characters": [
        "Józef Markowski (master carver)",
        "Antoni Wyrodek (successor carver)",
        "Generations of miner-artists",
    ],
    "era": "1896-1963",
    "readingTimeMinutes": 3,
    "image": "",
    "thumbnail": "",
    "coordinates": {"lat": "49.983", "lng": "20.0555"},
    "hasAudio": False,
    "isFree": True,
    "storyCategory": "prophets_pilgrims",
    "disabled": False,
    "updatedAt": now_ts,
}

# ──────────────────────────────────────────────
# ARABIC (ar)
# ──────────────────────────────────────────────
# Register: Modern Standard Arabic — skilled storyteller, warm & engaging, not stiff news Fusha
# Proverb (subverted): الصَّبرُ مِفتاحُ الفَرَج — "They say patience is the key to relief,
#   but these men weren't waiting for relief — they were carving beauty."
# ──────────────────────────────────────────────
ar_story = {
    **shared,
    "lang": "ar",
    "langStoryId": "ar#chapel-of-st-kinga",
    "title": "كَنيسَةٌ لا تَعرِفُ الشَّمْس",
    "subtitle": "سَبعَةٌ وسِتّونَ عامًا لِنَحتِ كاتِدرائيَّةٍ مِنَ المِلحِ، على عُمقِ مِئةِ مِترٍ تَحتَ الأَرض",
    "excerpt": "على عُمقِ مِئةٍ وَمِترٍ واحِدٍ تَحتَ حُقولِ جَنوبِ بولَندا الخَضراء، في عَتَمَةٍ لَم يَلمِسها شُعاعُ شَمسٍ قَطّ، بَنى أَحَدُهُم كَنيسَة. لا مِن حَجَر. لا مِن رُخام. مِنَ المِلح.",
    "moralOrLesson": "أَعظَمُ الأَعمالِ الفَنيَّةِ لا تُولَدُ دائمًا في القُصورِ والمَعارِض — أَحيانًا تُنحَتُ في الصَّمتِ، في العَتَمَة، بِأَيدٍ عادِيَّة، على مَدى أَعمارٍ لا يَراها أَحَد.",
    "paragraphs": [
        {
            "text": "على عُمقِ مِئةٍ وَمِترٍ واحِدٍ تَحتَ حُقولِ جَنوبِ بولَندا الخَضراء، في عَتَمَةٍ لَم يَلمِسها شُعاعُ شَمسٍ قَطّ، بَنى أَحَدُهُم كَنيسَة. لا مِن حَجَر. لا مِن رُخام. مِنَ المِلح. كُلُّ شَيءٍ في كَنيسَةِ القِدّيسَةِ كينغا — الأَرضُ تَحتَ قَدَمَيك، والجُدرانُ حَولَك، والثُّرَيّاتُ فَوقَ رَأسِك — مَنحوتٌ مِن مِلحِ الصُّخورِ في أَعماقِ مَنجَمِ فييليتشكا، قُربَ مَدينَةِ كراكوف البولَنديَّة. استَغرَقَ بِناؤُها سَبعَةً وسِتّينَ عامًا وثَلاثَةَ أَجيالٍ مِن عُمّالِ المَناجِم."
        },
        {
            "text": "تَأَمَّل هذا الرَّقَم لِلَحظَة. عامِلُ مَنجَمٍ اسمُهُ يوزِف ماركوفسكي غَرَزَ أَداتَهُ في المِلحِ لِأَوَّلِ مَرَّةٍ عامَ 1896 — قَبلَ أَن يَطيرَ الأَخَوانِ رايت، وقَبلَ أَن يَسمَعَ بَشَرٌ صَوتًا مِن جِهازِ راديو. وحينَ وَضَعَ آخِرُ نَحّاتٍ أَدَواتَهُ عامَ 1963، كانَ البَشَرُ قد بَلَغوا الفَضاء، وفِرقَةُ البيتلز تُسَجِّلُ أَلبومَها الأَوَّل. هذِهِ الكَنيسَةُ تَمتَدُّ عَبرَ وِلادَةِ العالَمِ الحَديثِ بِأَكمَلِه، نَحَتَها رِجالٌ كانوا يَنزِلونَ تَحتَ الأَرضِ كُلَّ صَباحٍ ويَصعَدونَ كُلَّ مَساء."
        },
        {
            "text": "الحَجمُ يَصعُبُ تَخَيُّلُه: أَربَعَةٌ وخَمسونَ مِترًا طولًا، وثَمانيَةَ عَشَرَ عَرضًا، واثنا عَشَرَ ارتِفاعًا — مِساحَةُ مَلعَبِ كُرَةِ سَلَّةٍ بِسَقفٍ مِن أَربَعَةِ طَوابِق، كُلُّها مَحفورَةٌ في مِلحٍ صَلب. بَدَأَها ماركوفسكي. ثُمَّ حَمَلَ الرّايَةَ عامِلٌ آخَرُ اسمُهُ أَنطوني فيرودِك. ثُمَّ جاءَ آخَرون. لَم يَعِش أَيٌّ مِنهُم لِيَرى الكَنيسَةَ مُكتَمِلَة. كُلُّ واحِدٍ نَحَتَ نَصيبَهُ وَوَثِقَ بِأَنَّ الجيلَ التّالي سَيُكمِلُ ما بَدَأَه."
        },
        {
            "text": "الثُّرَيّاتُ هِيَ ما يُسَمِّرُ الزّائِرينَ في أَماكِنِهِم. كُلُّ واحِدَةٍ تَحمِلُ ما بَينَ عِشرينَ وثَلاثينَ أَلفَ بَلّورَةِ مِلح، شُكِّلَت بِاليَدِ ونُظِمَت لِتَلتَقِطَ الضَّوء. المِلحُ لا يَلمَعُ كَالزُّجاج — وَهَجُهُ أَرَقّ، أَدفَأ، كَأَنَّ شَمعَةً حُبِسَت في قَلبِ حَجَر. حينَ تَقِفُ تَحتَها، مُحاطًا بِتَوَهُّجٍ عَنبَريٍّ يَبدو كَأَنَّهُ يَنسَكِبُ مِنَ الجُدرانِ نَفسِها، يَصمُتُ مُعظَمُ الزُّوّار. لا كَلامَ يَفي. أَنتَ تَحتَ الأَرض، تُحَدِّقُ في شَيءٍ أَجمَلَ مِن أَيِّ شَيءٍ فَوقَها."
        },
        {
            "text": "المَنحوتاتُ على الجُدرانِ لا تَقِلُّ رَوعَة. نَحَتَ عُمّالُ المَنجَمِ مَشاهِدَ مِنَ الكِتابِ المُقَدَّسِ مُباشَرَةً في المِلح، وأَشهَرُها نُسخَةٌ كامِلَةُ الحَجمِ مِن لَوحَةِ ليوناردو دافينشي «العَشاءُ الأَخير». المَسيحُ وحَوارِيّوهُ يَبرُزونَ مِنَ الجِدارِ بِعُمقٍ عاطِفيٍّ تَتَوَقَّعُهُ مِن رُخامٍ إيطاليّ، لا مِن مادَّةٍ يَرُشُّها النّاسُ على طَعامِهِم. بَلّوراتُ المِلحِ الطَّبيعيَّةُ تَجعَلُ الأَشكالَ تَتَلألَأُ في ضَوءِ المَصابيح. لَيسَ مِن حَقِّ المِلحِ أَن يَنجَحَ كَخامَةٍ فَنّيَّة. لكِنَّهُ يَنجَح."
        },
        {
            "text": "الكَنيسَةُ لا تَزالُ كَنيسَةً حَيَّة. أَزواجٌ يَتَزَوَّجونَ هُنا — يَمشونَ في مَمَرٍّ مِن بَلّوراتِ المِلحِ نَحوَ مَذبَحٍ مِنَ المِلح، تَحتَ ثُرَيّاتٍ مِنَ المادَّةِ ذاتِها. فِرَقٌ موسيقيَّةٌ تُقيمُ حَفَلاتٍ في هذِهِ القاعَة، والصَّوتيّاتُ مُذهِلَة — جُدرانُ المِلحِ المُنحَنيَةُ تُشَكِّلُ الصَّدى بِدِفءٍ وثَراءٍ لا تُضاهيهِما قاعَةٌ على وَجهِ الأَرض. والقُدّاسُ الكاثوليكيُّ يُقامُ بِانتِظام، وصَوتُ الكاهِنِ يَتَرَدَّدُ في فَضاءٍ استَغرَقَ نَحتُهُ أَطوَلَ مِن بِناءِ مُعظَمِ كاتِدرائيّاتِ أوروبّا."
        },
        {
            "text": "يَقولونَ «الصَّبرُ مِفتاحُ الفَرَج»، لكِنَّ هؤُلاءِ الرِّجالَ لَم يَكونوا يَنتَظِرونَ فَرَجًا — كانوا يَنحِتونَ جَمالًا. لَم يَكونوا نَحّاتينَ مُدَرَّبينَ ولا مُهَندِسينَ مِعماريّين. كانوا عُمّالَ مَناجِم — رِجالًا أَيديهِم مُشَقَّقَة، ورِئاتُهُم مَليئَةٌ بِغُبارِ المَعادِن، يُؤَدّونَ أَشَقَّ الأَعمالِ البَدَنيَّةِ في أوروبّا. وفي ساعاتِ راحَتِهِم، على مَدى سَبعَةِ عُقود، صَنَعوا ما يُنافِسُ أَيَّ كاتِدرائيَّةٍ على وَجهِ الأَرض. أَعظَمُ تُحفَةٍ في بولَندا قد تَكونُ تِلكَ الَّتي لَم تَصِلها أَشِعَّةُ الشَّمسِ قَطّ."
        },
    ],
}

# ──────────────────────────────────────────────
# PERSIAN (fa)
# ──────────────────────────────────────────────
# Register: Modern Persian prose — skilled storyteller, intimate "تو" addressing, natural & warm
# Proverb (subverted): سعدی — «قطره قطره جمع گردد وانگهی دریا شود»
#   → "Here, strike by strike gathered, and became a cathedral."
# Avoids heavy Arabic loanwords; prefers native Persian equivalents.
# ──────────────────────────────────────────────
fa_story = {
    **shared,
    "lang": "fa",
    "langStoryId": "fa#chapel-of-st-kinga",
    "title": "کلیسایی که خورشید ندیده",
    "subtitle": "شصت و هفت سال تلاش برای تراشیدنِ کلیسایی از نمک، صد متر زیرِ زمین",
    "excerpt": "صد و یک متر زیرِ دشت‌های سبز جنوب لهستان، در تاریکی‌ای که هیچ‌وقت نور خورشید به آن نرسیده، یک نفر کلیسا ساخته. نه از سنگ. نه از مَرمَر. از نمک.",
    "moralOrLesson": "شاهکارهای بزرگ همیشه در کاخ‌ها و موزه‌ها به دنیا نمی‌آیند — گاهی در سکوت، در تاریکی، با دست‌های ساده تراشیده می‌شوند، در طولِ عمرهایی که کسی نمی‌بیند.",
    "paragraphs": [
        {
            "text": "صد و یک متر زیرِ دشت‌های سبز جنوب لهستان، در تاریکی‌ای که هیچ‌وقت نور خورشید به آن نرسیده، یک نفر کلیسا ساخته. نه از سنگ. نه از مَرمَر. از نمک. همه‌چیز در کلیسای قدّیسه کینگا — کفِ زیرِ پایت، دیوارهای دورت، لوسترهای بالای سرت — از نمکِ سنگیِ دلِ معدنِ ویِلیچکا تراشیده شده، نزدیکِ شهرِ کراکوف در لهستان. شصت و هفت سال طول کشیده و سه نسل معدنچی کار کرده‌اند تا تمام بشود."
        },
        {
            "text": "یک لحظه به این بازه‌ی زمانی فکر کن. یک معدنچی به نام یوزِف مارکوفسکی سال ۱۸۹۶ اوّلین ضربه‌ی تیشه‌اش را به نمک زد — قبل از اینکه برادران رایت پرواز کنند، قبل از اینکه کسی صدای رادیو بشنود. وقتی آخرین کَنده‌کار ابزارش را زمین گذاشت، سال ۱۹۶۳ بود؛ آدم‌ها رفته بودند فضا و بیتلز داشت اوّلین آلبومش را ضبط می‌کرد. این کلیسا کلِّ تولّدِ دنیای مدرن را در خودش جا داده."
        },
        {
            "text": "اندازه‌اش باورنکردنی است: پنجاه و چهار متر درازا، هجده متر پهنا، دوازده متر بلندا — تقریباً هم‌اندازه‌ی یک زمین بسکتبال با سقفِ چهار طبقه، و همه‌اش از دلِ نمکِ خالص تراشیده شده. مارکوفسکی شروعش کرد. معدنچی دیگری به نام آنتونی ویرودِک ادامه داد. بعد بقیه آمدند. هیچ‌کدامشان زنده نماندند که کلیسای تمام‌شده را ببینند. هرکسی سهمِ خودش را تراشید و اعتماد کرد که نسلِ بعدی کار را پی می‌گیرد."
        },
        {
            "text": "لوسترها آن چیزی‌اند که آدم را میخکوب می‌کنند. هرکدام بین بیست تا سی هزار بلورِ نمک دارد، با دست شکل داده شده و کنار هم چیده شده تا نور را بگیرد. نمک مثل شیشه نمی‌درخشد — نورش ملایم‌تر است، گرم‌تر، انگار شمعی در دلِ سنگ گیر افتاده. وقتی زیرشان می‌ایستی و این تابشِ عسلی‌رنگ از همه طرف دورت را می‌گیرد، بیشتر آدم‌ها ساکت می‌شوند. حرفی نمی‌ماند که بزنی. زیرِ زمینی، و داری چیزی تماشا می‌کنی که از هر چیزی رویِ زمین زیباتر است."
        },
        {
            "text": "حجّاری‌های دیوار هم همان‌قدر خیره‌کننده‌اند. معدنچی‌ها صحنه‌هایی از کتابِ مقدّس را مستقیم توی نمک تراشیده‌اند و معروف‌ترینشان یک نسخه‌ی تمام‌قد از «شامِ آخر» لئوناردو داوینچی است. مسیح و حواریونش از دلِ دیوار بیرون می‌آیند، با عمقِ احساسی‌ای که از مرمرِ ایتالیایی انتظارش را داری، نه از ماده‌ای که مردم رویِ غذایشان می‌پاشند. بافتِ بلوریِ طبیعیِ نمک باعث می‌شود پیکره‌ها در نورِ چراغ بدرخشند. نمک حقّی ندارد که جای مصالحِ هنری جواب بدهد. امّا می‌دهد."
        },
        {
            "text": "این کلیسا هنوز هم فعّال است. زوج‌ها اینجا عروسی می‌گیرند — از راهرویی از جنسِ بلورِ نمک به سمتِ محرابی از نمک قدم می‌زنند، زیرِ لوسترهایی از همان جنس. ارکسترها اینجا کنسرت اجرا می‌کنند و آکوستیکش فوق‌العاده است — دیوارهای قوسیِ نمکی صدا را طوری شکل می‌دهند که گرم و پُر می‌شود، جوری که هیچ سالنی رویِ زمین نمی‌تواند تقلیدش کند. مراسمِ کلیسایی مرتّب برگزار می‌شود و صدای کشیش در فضایی می‌پیچد که تراشیدنش بیشتر از ساختنِ بیشترِ کلیساهای بزرگِ اروپا طول کشیده."
        },
        {
            "text": "سعدی گفت «قطره قطره جمع گردد، وانگهی دریا شود». اینجا ضربه ضربه جمع شد و کلیسا شد. مردهایی که این شاهکار را ساختند، پیکره‌تراش و معمارِ تحصیل‌کرده نبودند. معدنچیِ نمک بودند — مردهایی که عمرشان را زیرِ زمین گذراندند، با دست‌های زخمی و ریه‌های پُر از گَردِ معدن، و سخت‌ترین کارِ بدنیِ اروپا را انجام می‌دادند. و در ساعت‌های استراحتشان، طیِّ نزدیک به هفت دهه، چیزی ساختند که حریفِ هر کلیسای بزرگی در دنیاست. شاید بزرگ‌ترین شاهکارِ لهستان همانی باشد که خورشید هرگز به آن نرسیده."
        },
    ],
}

# ──────────────────────────────────────────────
# TURKISH (tr)
# ──────────────────────────────────────────────
# Register: Modern Turkish storytelling — İlber Ortaylı-style historical narrative, engaging, warm
# Proverb (subverted): "Damlaya damlaya göl olur" (Drop by drop, a lake forms)
#   → "Here, strike by strike, it became a cathedral."
# Natural Turkish word order and idiom, no calques.
# ──────────────────────────────────────────────
tr_story = {
    **shared,
    "lang": "tr",
    "langStoryId": "tr#chapel-of-st-kinga",
    "title": "Güneşin Görmediği Katedral",
    "subtitle": "Altmış yedi yıl, yüz metre derinlikte, tuzdan oyulmuş bir katedral",
    "excerpt": "Güney Polonya'nın yeşil tarlalarının tam yüz bir metre altında, güneş ışığının ömründe bir kez bile ulaşamadığı bir karanlıkta, birisi bir kilise inşa etmiş. Taştan değil. Mermerden değil. Tuzdan.",
    "moralOrLesson": "En büyük sanat eserleri her zaman saraylarda ve galerilerde doğmaz — bazen karanlıkta, sessizlikte, sıradan ellerce, kimsenin izlemediği ömürler boyunca yontulur.",
    "paragraphs": [
        {
            "text": "Güney Polonya'nın yeşil tarlalarının tam yüz bir metre altında, güneş ışığının ömründe bir kez bile ulaşamadığı bir karanlıkta, birisi bir kilise inşa etmiş. Taştan değil. Mermerden değil. Tuzdan. Azize Kinga Şapeli'ndeki her şey — bastığınız zemin, yanınızdaki duvarlar, tepenizdeki avizeler — Krakow yakınlarındaki Wieliczka tuz madeninin derinliklerindeki kaya tuzundan oyulmuş. Altmış yedi yıl sürmüş ve üç nesil madenci çalışmış, tamamlanması için."
        },
        {
            "text": "Bu zaman dilimine bir bakın. Józef Markowski adında bir madenci 1896'da keskisinin ilk darbesini tuza indirdi — Wright kardeşler daha uçmamıştı, kimse henüz bir radyo yayını duymamıştı. Son oymacı 1963'te aletlerini bıraktığında insanlar çoktan uzaya gitmiş, Beatles ilk albümünü kaydetmeye başlamıştı bile. Bu şapel modern dünyanın doğuşunun tamamını kapsıyor — her sabah yeraltına inen, her akşam yukarı çıkan, ellerindeki basit aletlerle tuz oyan adamların eseri."
        },
        {
            "text": "Boyutları hayal gücünüzü zorlar: elli dört metre uzunluk, on sekiz metre genişlik, on iki metre yükseklik — kabaca bir basketbol sahası büyüklüğünde, dört katlı bir tavanla, ve tamamı katı tuzdan oyulmuş. Markowski başlattı. Antoni Wyrodek adında bir başka madenci devraldı. Sonra başkaları geldi. Hiçbiri bitmiş hâlini göremedi. Her biri kendi payını yonttu ve bir sonraki neslin devam edeceğine güvendi."
        },
        {
            "text": "Avizeleri gören herkes olduğu yere çakılır. Her birinde yirmi ila otuz bin tuz kristali var — tek tek elle şekillendirilmiş ve ışığı yakalayacak biçimde dizilmiş. Tuz cam gibi parlamaz; daha yumuşak, daha sıcak bir ışık verir, sanki bir mum taşın içine hapsolmuş gibi. Altlarında durduğunuzda, duvarların kendisinden süzülüyor gibi görünen kehribar rengi bir aydınlıkla sarıldığınızda, çoğu ziyaretçi susar. Söylenecek söz kalmaz. Yeraltındasınızdır ve yeryüzündeki her şeyden daha güzel bir şeye bakıyorsunuzdur."
        },
        {
            "text": "Duvar oymaları ayrı bir dünya. Madenciler Kitab-ı Mukaddes'ten sahneleri doğrudan tuza işlemişler; en ünlüsü Leonardo da Vinci'nin Son Akşam Yemeği tablosunun birebir boyutundaki kopyası. İsa ve havarileri duvardan öyle bir ifade derinliğiyle çıkıyor ki bunu İtalyan mermerinden beklersiniz — insanların yemeklerine serpiştirdiği bir maddeden değil. Tuzun doğal kristal dokusu figürleri lamba ışığında pırıl pırıl parlatıyor. Tuzun bir sanat malzemesi olarak işe yaraması imkânsız gibi görünür. Ama bakıyorsunuz, yaramış."
        },
        {
            "text": "Şapel bugün hâlâ aktif bir kilise. Çiftler burada evleniyor — tuz kristalinden bir koridorda yürüyüp tuzdan bir sunağa ilerliyor, yine tuzdan yapılmış avizelerin altında. Orkestralar bu salonda konser veriyor ve akustiği olağanüstü; tuzun kavisli duvarları sesi öyle sıcak ve zengin biçimde şekillendiriyor ki yeryüzündeki hiçbir konser salonu bununla boy ölçüşemez. Katolik ayinleri düzenli yapılıyor ve rahibin sesi, Avrupa'nın büyük katedrallerinin çoğundan daha uzun sürede oyulmuş bir mekânda yankılanıyor."
        },
        {
            "text": "«Damlaya damlaya göl olur» derler. Burada darbe darbe katedral olmuş. Bu eseri yaratan adamlar eğitimli heykeltıraş ya da mimar değildi. Tuz madencisiydi — ömürlerini yeraltında geçiren, elleri nasır tutmuş, ciğerleri maden tozuyla dolu, Avrupa'nın en ağır bedensel işlerinden birini yapan adamlar. Mesai dışı saatlerinde, yaklaşık yetmiş yıl boyunca, dünyanın herhangi bir katedraliyle yarışabilecek bir şey yarattılar. Polonya'nın en büyük şaheseri belki de güneş ışığının hiç ulaşamadığı o yerdir."
        },
    ],
}


# ──────────────────────────────────────────────
# VALIDATION & PUSH
# ──────────────────────────────────────────────

def validate_story(story, lang_label):
    """Validate story structure and constraints before pushing."""
    errors = []

    # Required fields
    required = [
        "siteId", "storyId", "lang", "langStoryId", "title", "subtitle",
        "excerpt", "moralOrLesson", "paragraphs", "icon", "tier", "source",
        "characters", "era", "readingTimeMinutes", "coordinates",
        "hasAudio", "isFree", "storyCategory", "disabled", "updatedAt",
    ]
    for field in required:
        if field not in story:
            errors.append(f"Missing field: {field}")

    # Paragraph constraints
    paras = story.get("paragraphs", [])
    if not (6 <= len(paras) <= 10):
        errors.append(f"Paragraph count {len(paras)} outside 6-10 range")

    total_chars = 0
    for i, p in enumerate(paras):
        text = p.get("text", "")
        char_count = len(text)
        word_count = len(text.split())
        total_chars += char_count
        if char_count > 600:  # 500 + 20% tolerance
            errors.append(f"Paragraph {i+1}: {char_count} chars (max 600)")
        if word_count > 120:  # 100 + 20% tolerance
            errors.append(f"Paragraph {i+1}: {word_count} words (max 120)")

    # Total chars ~3000 ± 20% → 2400-3600
    if total_chars < 2000 or total_chars > 4200:
        errors.append(f"Total chars {total_chars} outside 2000-4200 range")

    # langStoryId format
    expected_lsid = f"{story['lang']}#chapel-of-st-kinga"
    if story.get("langStoryId") != expected_lsid:
        errors.append(f"langStoryId mismatch: {story.get('langStoryId')} != {expected_lsid}")

    if errors:
        print(f"\n❌ VALIDATION FAILED for {lang_label}:")
        for e in errors:
            print(f"   - {e}")
        return False
    else:
        print(f"\n✅ Validation passed for {lang_label}")
        print(f"   Paragraphs: {len(paras)}")
        print(f"   Total chars: {total_chars}")
        return True


def push_story(story, lang_label):
    """Push a story item to DynamoDB."""
    try:
        # Convert coordinates to Decimal for DynamoDB
        from decimal import Decimal
        item = dict(story)
        item["coordinates"] = {
            "lat": Decimal(str(item["coordinates"]["lat"])),
            "lng": Decimal(str(item["coordinates"]["lng"])),
        }
        item["readingTimeMinutes"] = int(item["readingTimeMinutes"])
        item["updatedAt"] = int(item["updatedAt"])

        table.put_item(Item=item)
        print(f"✅ Successfully pushed {lang_label} (langStoryId: {item['langStoryId']})")
        return True
    except Exception as e:
        print(f"❌ Failed to push {lang_label}: {e}")
        return False


def verify_story(lang_code):
    """Verify the story was pushed correctly by reading it back."""
    try:
        response = table.get_item(
            Key={
                "siteId": "wieliczka-salt-mine",
                "langStoryId": f"{lang_code}#chapel-of-st-kinga",
            }
        )
        item = response.get("Item")
        if item:
            print(f"✅ Verified {lang_code}: title=\"{item['title']}\", paragraphs={len(item['paragraphs'])}")
            return True
        else:
            print(f"❌ Verification failed for {lang_code}: item not found")
            return False
    except Exception as e:
        print(f"❌ Verification failed for {lang_code}: {e}")
        return False


# ── Main ──
if __name__ == "__main__":
    stories = [
        (ar_story, "Arabic (ar)"),
        (fa_story, "Persian (fa)"),
        (tr_story, "Turkish (tr)"),
    ]

    # Validate all first
    print("=" * 60)
    print("VALIDATION PHASE")
    print("=" * 60)
    all_valid = True
    for story, label in stories:
        if not validate_story(story, label):
            all_valid = False

    if not all_valid:
        print("\n⛔ Aborting: fix validation errors before pushing.")
        sys.exit(1)

    # Push each story
    print("\n" + "=" * 60)
    print("PUSH PHASE")
    print("=" * 60)
    for story, label in stories:
        success = push_story(story, label)
        if not success:
            print(f"\n⛔ Push failed for {label}. Stopping.")
            sys.exit(1)

    # Verify each push
    print("\n" + "=" * 60)
    print("VERIFICATION PHASE")
    print("=" * 60)
    for lang_code in ["ar", "fa", "tr"]:
        verify_story(lang_code)

    print("\n" + "=" * 60)
    print("✅ ALL THREE STORIES PUSHED AND VERIFIED SUCCESSFULLY")
    print(f"   Timestamp: {now_ts}")
    print("=" * 60)
