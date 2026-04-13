#!/usr/bin/env python3
"""Generate DynamoDB JSON items for Hamlet story in ar, fa, tr."""
import json
import time

TIMESTAMP = str(int(time.time()))

# Shared fields (copied from English record, unchanged)
SHARED = {
    "siteId": {"S": "kronborg-castle"},
    "storyId": {"S": "shakespeares-hamlet"},
    "characters": {"L": [
        {"S": "Prince Hamlet"}, {"S": "King Claudius"}, {"S": "Queen Gertrude"},
        {"S": "The Ghost of King Hamlet"}, {"S": "Ophelia"}, {"S": "Horatio"},
        {"S": "William Shakespeare"}
    ]},
    "coordinates": {"M": {"lng": {"N": "12.6217"}, "lat": {"N": "56.0389"}}},
    "disabled": {"BOOL": False},
    "era": {"S": "Elizabethan England (c. 1600-1601), set in medieval Denmark"},
    "hasAudio": {"BOOL": False},
    "icon": {"S": "\U0001f480"},
    "image": {"S": ""},
    "isFree": {"BOOL": True},
    "readingTimeMinutes": {"N": "3"},
    "source": {"S": "Shakespeare, William. The Tragedy of Hamlet, Prince of Denmark (c. 1601); Saxo Grammaticus, Gesta Danorum (c. 1200); Belleforest, Histoires Tragiques (1570)"},
    "storyCategory": {"S": "lost_found"},
    "thumbnail": {"S": ""},
    "tier": {"S": "S"},
    "updatedAt": {"N": TIMESTAMP},
}

# ── ARABIC ──────────────────────────────────────────────────────────────────────
ar = {
    **SHARED,
    "lang": {"S": "ar"},
    "langStoryId": {"S": "ar#shakespeares-hamlet"},
    "title": {"S": "شَبَحُ إلسينور"},
    "subtitle": {"S": "عن الأسوار التي سَكَنَها شَبَحٌ وعن أعظم مسرحية كُتِبَت"},
    "excerpt": {"S": (
        "«ثَمَّةَ شيءٌ يتعفَّنُ في مملكة الدنمارك.» "
        "بهذه الكلمات، المنطوقة على أسوار قلعة إلسينور في ليلةٍ عاصفة، "
        "أعلنَ شكسبير أنَّ الفساد قد نَخَرَ قلبَ مملكةٍ بأسرها — "
        "وكتبَ أشهر مأساةٍ في تاريخ الأدب العالمي."
    )},
    "moralOrLesson": {"S": (
        "الأماكن التي تُروى فيها القصص العظيمة تتحوَّل من مجرَّد مواقع "
        "إلى أوعية تحمل أسئلة الوجود الكبرى، "
        "ولا يوجد بناءٌ في العالم يحمل ثِقَلَ المعنى "
        "مثلما تحمله القلعة التي اختارها شكسبير لأعظم مسرحيّاته."
    )},
    "paragraphs": {"L": [
        {"M": {"text": {"S": (
            "«ثَمَّةَ شيءٌ يتعفَّنُ في مملكة الدنمارك.» "
            "هذه الجملة، التي نُطِقَت على أسوار قلعةٍ اسمها إلسينور في ليلةٍ متجمِّدة، "
            "هي من أشهر ما قيل على خشبة المسرح في التاريخ. "
            "المسرحية هي هاملت. والقلعة حقيقية — "
            "إنّها كرونبورغ، حصنٌ ضخم على الساحل الدنماركي، "
            "عند أضيق نقطة بين الدنمارك والسويد. "
            "كتبها شكسبير حوالي عام ١٦٠٠، "
            "وبقلمه حوَّلَ قلعةً عسكرية إلى أشهر قلعة في العالم."
        )}}},
        {"M": {"text": {"S": (
            "والأغرب من ذلك أنَّ شكسبير على الأرجح لم يَطَأ كرونبورغ في حياته. "
            "لم يكن بحاجةٍ لذلك. "
            "في عام ١٥٨٥، دعا ملك الدنمارك فريدريك الثاني ممثّلين إنجليز لتقديم عروضهم في القلعة، "
            "وبعضهم انضمَّ لاحقاً إلى فرقة شكسبير المسرحية — أكبر فرقة في لندن آنذاك. "
            "عادوا بحكاياتٍ عن رياحٍ قارسة، وجدرانٍ حجرية هائلة، "
            "وضبابٍ يزحف من البحر ويجعل المكان كأنّه مسكونٌ بالأشباح. "
            "استمعَ شكسبير. ثمّ جلس يكتب."
        )}}},
        {"M": {"text": {"S": (
            "ولم يخترع القصّة من فراغ أيضاً. "
            "حوالي عام ١٢٠٠، دوَّنَ مؤرِّخٌ دنماركي اسمه ساكسو غراماتيكوس أسطورة أمْلِث — "
            "أميرٌ قتلَ عمُّه أباه، وتزوَّجَ أمَّه، وسرقَ العرش. "
            "نجا أمْلِث بأن تظاهَرَ بالجنون حتى حانت ساعة الانتقام. "
            "تنقَّلَت الحكاية عبر أوروبا قروناً، "
            "حتى وصلت إلى شكسبير من خلال رواية فرنسية عام ١٥٧٠. "
            "الهيكل نفسه. لكنَّ الروح مختلفة تماماً."
        )}}},
        {"M": {"text": {"S": (
            "ما بناه شكسبير من تلك الأسطورة القديمة كان من عالمٍ آخر. "
            "أضاف شَبَحاً — الملك المقتول يظهر عند منتصف الليل فوق الأسوار مطالباً بالثأر. "
            "وابتكرَ «مصيدة الفئران»، مسرحيةً داخل المسرحية يُخرِجها هاملت ليختبر ذنب عمِّه. "
            "ومنحنا أوفيليا، التي يُحطِّم جنونُها وحزنُها قلوبَنا حتى اليوم. "
            "والأهم: أعطى هاملت صفته الخالدة — "
            "أميرٌ يُفرِط في التفكير، ويغرق في المشاعر، ويعجز عن الفعل."
        )}}},
        {"M": {"text": {"S": (
            "«أكون أو لا أكون — ذلك هو السؤال.» "
            "هذه الجملة ليست مسرحاً فحسب. "
            "إنّها اللحظة التي وضعَ فيها أحدُهم أخيراً كلماتٍ على ما يشعر به كلُّ إنسان: "
            "ثِقَل أن تكون حيّاً حين تؤلمك الحياة. "
            "يقولون «في التَّأنّي السلامة وفي العَجَلة الندامة» — "
            "لكنَّ تأنّي هاملت لم يجلب سلامةً لأحد، بل أهلكَ مملكةً بأسرها. "
            "كتبها شكسبير قبل أربعة قرون، "
            "ولا يزال الناس يتمسَّكون بها في أحلك لحظاتهم."
        )}}},
        {"M": {"text": {"S": (
            "ثمَّ الجمجمة. "
            "يرفع هاملت جمجمة يوريك — مهرِّج البلاط الذي أضحكه وهو طفل — ويُحدِّثها. "
            "إنّها اللحظة التي يتوقّف فيها الموت عن كونه فكرةً مجرَّدة ويصبح شخصيّاً. "
            "شخصٌ أحبَّه صارَ عظاماً في يده. "
            "تلك الصورة — رجلٌ يمسك جمجمةً ويواجه حقيقة أنَّ كلَّ من عرفهم سينتهي بنفس الطريقة — "
            "من أكثر الصور شهرةً في تاريخ الفن. "
            "أربعة قرون، ولا تزال تهزُّنا."
        )}}},
        {"M": {"text": {"S": (
            "اليوم، تستضيف قلعة كرونبورغ عروضاً حيّة لهاملت على أرضها. "
            "لورانس أوليفييه وكينيث براناه وجود لو — "
            "كلُّهم أدَّوا دور الأمير هنا، "
            "يُلقون كلمات شكسبير على الأسوار الحقيقية، فوق البحر الحقيقي. "
            "تشابكت القلعة والمسرحية حتى لم يَعُد ممكناً التفكير في إحداهما دون الأخرى. "
            "امشِ على تلك الأسوار في ليلةٍ ضبابية، وقُل لي إنّك لا تشعر بالشَبَح."
        )}}},
        {"M": {"text": {"S": (
            "شكسبير لم يَزُر كرونبورغ قط. "
            "كتبَ عن أميرٍ متخيَّل في قلعة حقيقية، "
            "وبعد أربعة قرون، يبدو ذلك الأمير أكثر حياةً من معظم الشخصيات التاريخية الحقيقية. "
            "الحجارة دنماركية. والقصة إنجليزية. "
            "لكنَّ الأسئلة التي طرحها هاملت — "
            "عن العدالة، وعن الحزن، "
            "وعن إن كان فعلُ الصواب ممكناً أصلاً حين لا تقوى على النهوض من سريرك — "
            "تلك أسئلةٌ تخصُّنا جميعاً."
        )}}},
    ]},
}

# ── PERSIAN ─────────────────────────────────────────────────────────────────────
fa = {
    **SHARED,
    "lang": {"S": "fa"},
    "langStoryId": {"S": "fa#shakespeares-hamlet"},
    "title": {"S": "شبحِ الزینور"},
    "subtitle": {"S": "روحی بر فرازِ باروها و نامدارترین نمایشنامه‌ی جهان"},
    "excerpt": {"S": (
        "«چیزی در دانمارک دارد می‌گندد.» "
        "با همین جمله، که یک سرباز روی باروهای یخ‌زده‌ی الزینور بر زبان می‌آوَرَد، "
        "شکسپیر فساد یک پادشاهی را فاش کرد — "
        "و نامدارترین تراژدی تاریخ ادبیات جهان را آفرید."
    )},
    "moralOrLesson": {"S": (
        "مکان‌هایی که داستان‌های بزرگ در آن‌ها شکل می‌گیرند، "
        "از مکان صِرف فراتر می‌روند و به ظرفی برای پرسش‌های بنیادین هستی تبدیل می‌شوند — "
        "و هیچ بنایی در جهان بارِ معنایی سنگین‌تری از قلعه‌ای ندارد "
        "که شکسپیر برای بزرگ‌ترین اثرش برگزید."
    )},
    "paragraphs": {"L": [
        {"M": {"text": {"S": (
            "«چیزی در دانمارک دارد می‌گندد.» "
            "این جمله، که روی باروهای یخ‌زده‌ی قلعه‌ای به نام الزینور گفته می‌شود، "
            "یکی از نامدارترین جملات تاریخ تئاتر است. "
            "نمایشنامه، هملت است. و قلعه واقعی‌ست — "
            "کرونبُرگ، دژی سترگ در ساحل دانمارک، "
            "درست همان‌جایی که دریا بین دانمارک و سوئد تنگ می‌شود. "
            "شکسپیر این اثر را حدود سال ۱۶۰۰ نوشت "
            "و یک پادگانِ نظامی را تبدیل کرد به افسانه‌ای‌ترین قلعه‌ی روی زمین."
        )}}},
        {"M": {"text": {"S": (
            "جالب‌ترین بخش ماجرا این است: "
            "شکسپیر به احتمال زیاد هرگز پایش به کرونبُرگ نرسید. لازم هم نبود. "
            "سال ۱۵۸۵، فردریکِ دوم پادشاه دانمارک بازیگران انگلیسی را به قلعه دعوت کرد — "
            "و برخی از آن‌ها بعدتر به گروه تئاتر شکسپیر پیوستند؛ بزرگ‌ترین گروه تئاتر لندن. "
            "آن‌ها با خودشان داستان آوردند: "
            "از بادهای گزنده، از دیوارهای سنگیِ سر به فلک کشیده، "
            "از مهی که از دریا بلند می‌شد و قلعه را خانه‌ی اَرواح جلوه می‌داد. "
            "شکسپیر گوش داد. و بعد نشست و نوشت."
        )}}},
        {"M": {"text": {"S": (
            "داستان را هم از هیچ نساخت. "
            "حدود سال ۱۲۰۰، تاریخ‌نویسی دانمارکی به نام ساکسو گراماتیکوس "
            "افسانه‌ی آملِت را ثبت کرد — "
            "شاهزاده‌ای که عمویش پدرش را کُشت، با مادرش ازدواج کرد و تاج‌وتخت را ربود. "
            "آملِت با دیوانه‌نمایی جان سالم به در بُرد تا روزِ انتقام فرا برسد. "
            "این داستان سده‌ها در اروپا دست‌به‌دست شد، "
            "تا سرانجام از راه بازنویسیِ فرانسوی ۱۵۷۰ به دست شکسپیر رسید. "
            "استخوان‌بندی همان بود. ولی روحِ کار، از زمین تا آسمان فرق داشت."
        )}}},
        {"M": {"text": {"S": (
            "چیزی که شکسپیر از آن افسانه‌ی کهن ساخت، از جنسِ دیگری بود. "
            "یک شبح اضافه کرد — "
            "پادشاهِ کشته‌شده که نیمه‌شب بر فرازِ باروها پدیدار می‌شود و خون‌خواهی می‌طلبد. "
            "«تله‌ی موش» را آفرید: نمایشی درون نمایش که هملت روی صحنه می‌بَرَد "
            "تا ببیند عمویش واقعاً قاتل است یا نه. "
            "اوفلیا را به ما داد — دل‌شکسته و دیوانه، "
            "کسی که چهار سده است تماشاگر را زمین‌گیر می‌کند. "
            "و به هملت هویتِ جاودانه‌اش را بخشید: "
            "شاهزاده‌ای که زیادی فکر می‌کند، زیادی حس می‌کند، و دستش به عمل نمی‌رسد."
        )}}},
        {"M": {"text": {"S": (
            "«بودن یا نبودن — پرسش این است.» "
            "این جمله فقط تئاتر نیست. "
            "لحظه‌ای‌ست که بالاخره کسی آن حسِ کمرشکن را به زبان آورد: "
            "سنگینیِ زنده بودن، وقتی که زندگی درد می‌دهد. "
            "می‌گویند صبر تلخ است اما میوه‌اش شیرین — "
            "هملت صبر کرد، اما میوه‌اش نه شیرینی، که زهر بود "
            "و پادشاهی‌ای را یکجا بلعید. "
            "شکسپیر این را بیش از چهارصد سال پیش نوشت، "
            "و هنوز آدم‌ها در سیاه‌ترین ساعاتشان به آن چنگ می‌زنند."
        )}}},
        {"M": {"text": {"S": (
            "و بعد، جمجمه. "
            "هملت جمجمه‌ی یوریک را بلند می‌کند — "
            "دلقکِ دربار که بچگی‌هایش را پُر از خنده کرده بود — و با او حرف می‌زند. "
            "این لحظه‌ای‌ست که مرگ از یک مفهومِ دوردست تبدیل می‌شود به چیزی شخصی. "
            "کسی که دوستش داشت، حالا فقط استخوانی در مشتش است. "
            "آن تصویر — مردی با جمجمه‌ای در دست، "
            "رودررو با این واقعیت که همه‌ی آدم‌هایی که شناخته همین سرنوشت را دارند — "
            "یکی از ماندگارترین تصاویر تاریخ هنر است."
        )}}},
        {"M": {"text": {"S": (
            "امروز، قلعه‌ی کرونبُرگ میزبان اجراهای زنده‌ی هملت است. "
            "لارنس اُلیویه، کِنِث برانا و جود لا همه این‌جا نقش شاهزاده را بازی کرده‌اند — "
            "کلام شکسپیر را روی باروهای واقعی، بالای دریای واقعی به زبان آورده‌اند. "
            "قلعه و نمایشنامه آن‌قدر در هم تنیده‌اند "
            "که فکر کردن به یکی بدون دیگری دیگر شدنی نیست."
        )}}},
        {"M": {"text": {"S": (
            "شکسپیر هرگز به کرونبُرگ نرفت. "
            "درباره‌ی شاهزاده‌ای خیالی در قلعه‌ای واقعی نوشت، "
            "و بعد از چهار سده، آن شاهزاده از بیشتر شخصیت‌های واقعیِ تاریخ زنده‌تر به نظر می‌رسد. "
            "سنگ‌ها دانمارکی‌اند. داستان انگلیسی‌ست. "
            "اما پرسش‌هایی که هملت مطرح می‌کند — "
            "درباره‌ی عدالت، درباره‌ی اندوه، "
            "درباره‌ی اینکه آیا اصلاً کارِ درست شدنی‌ست "
            "وقتی حتی توانِ بلند شدن از رختخواب را نداری — "
            "آن پرسش‌ها مالِ همه‌ی ماست."
        )}}},
    ]},
}

# ── TURKISH ─────────────────────────────────────────────────────────────────────
tr = {
    **SHARED,
    "lang": {"S": "tr"},
    "langStoryId": {"S": "tr#shakespeares-hamlet"},
    "title": {"S": "Elsinore'un Hayaleti"},
    "subtitle": {"S": "Surların üzerindeki hayalet ve gelmiş geçmiş en ünlü oyun"},
    "excerpt": {"S": (
        "\"Danimarka'da bir şeyler çürüyor.\" "
        "Bu sözler, Elsinore surlarında buz gibi bir gecede söylendiğinde, "
        "Shakespeare bir krallığın kalbindeki çürümüşlüğü ilan etti — "
        "ve dünya edebiyat tarihinin en ünlü trajedisini yarattı."
    )},
    "moralOrLesson": {"S": (
        "Büyük hikâyelerin geçtiği mekânlar, sıradan birer yer olmaktan çıkıp "
        "insanlığın en derin sorularını taşıyan sembollere dönüşür — "
        "ve dünyada hiçbir yapı, Shakespeare'in en büyük oyunu için seçtiği kalenin "
        "taşıdığı anlam yükünü taşımaz."
    )},
    "paragraphs": {"L": [
        {"M": {"text": {"S": (
            "\"Danimarka'da bir şeyler çürüyor.\" "
            "Bu cümle, Elsinore denen bir kalenin buz kesen surlarında söylenir "
            "ve tiyatro tarihinin en ünlü repliklerinden biridir. "
            "Oyun, Hamlet'tir. Kale de gerçektir — "
            "Kronborg, Danimarka kıyısında, denizin Danimarka ile İsveç arasında "
            "en çok daraldığı noktada yükselen devasa bir kale. "
            "Shakespeare bu eseri 1600 civarında yazdı "
            "ve sıradan bir askerî kaleyi dünyanın en efsanevi yapısına dönüştürdü."
        )}}},
        {"M": {"text": {"S": (
            "İşin şaşırtıcı tarafı şu: "
            "Shakespeare büyük ihtimalle Kronborg'a hayatında hiç ayak basmadı. "
            "Gerek de yoktu. "
            "1585'te Danimarka Kralı II. Frederik, İngiliz oyuncuları kaleye davet etti — "
            "bu oyuncuların bazıları daha sonra Shakespeare'in Londra'daki kumpanyasına katıldı; "
            "şehrin en büyük tiyatro topluluğuna. "
            "Yanlarında hikâyeler getirdiler: "
            "kemiklere işleyen rüzgârları, göğe uzanan taş duvarları, "
            "denizden yükselen sisi ve kalenin perili gibi görünen havasını anlattılar. "
            "Shakespeare dinledi. Sonra yazdı."
        )}}},
        {"M": {"text": {"S": (
            "Hikâyeyi sıfırdan da uydurmadı. "
            "1200 civarında Saxo Grammaticus adlı Danimarkalı bir tarihçi, "
            "Amleth efsanesini kaleme aldı — "
            "amcası tarafından babası öldürülen, annesi amcasıyla evlendirilen, "
            "tahtı çalınan bir prens. "
            "Amleth intikam gününe kadar deli taklidi yaparak hayatta kaldı. "
            "Hikâye yüzyıllar boyunca Avrupa'da elden ele dolaştı "
            "ve 1570'teki bir Fransız uyarlamasıyla Shakespeare'e ulaştı. "
            "İskelet aynıydı. Ama ruh bambaşka."
        )}}},
        {"M": {"text": {"S": (
            "Shakespeare o eski efsaneden yepyeni bir şey çıkardı. "
            "Bir hayalet ekledi — öldürülen kral, gece yarısı surların üzerinde belirerek intikam istiyor. "
            "\"Fare Kapanı\"nı yarattı: "
            "Hamlet'in amcasının suçunu sınamak için sahneye koyduğu oyun içinde oyun. "
            "Bize Ophelia'yı verdi — kalbi paramparça, aklı gitmiş, "
            "dört yüz yıldır seyirciyi derinden sarsan bir karakter. "
            "Ve Hamlet'e onu ölümsüz kılan özelliğini bahşetti: "
            "çok düşünen, çok hisseden, ama bir türlü harekete geçemeyen bir prens."
        )}}},
        {"M": {"text": {"S": (
            "\"Olmak ya da olmamak — bütün mesele bu.\" "
            "Bu cümle sadece tiyatro değil. "
            "Birinin nihayet her insanın içinde taşıdığı o ağırlığı kelimeye döktüğü an: "
            "yaşamak acı verirken hayatta olmanın dayanılmaz yükü. "
            "Sabreden derviş muradına ermiş derler — "
            "ama Hamlet sabrettikçe muradına değil, felakete yaklaştı "
            "ve koca bir krallığı yıkıma sürükledi. "
            "Shakespeare bunu dört yüz küsur yıl önce yazdı "
            "ve insanlar hâlâ en karanlık anlarında bu cümleye sığınıyor."
        )}}},
        {"M": {"text": {"S": (
            "Bir de kafatası var. "
            "Hamlet, Yorick'in kafatasını eline alır — "
            "çocukken onu kahkahaya boğan saray soytarısının kafatasını. "
            "Ve onunla konuşur. "
            "Ölüm, o an soyut bir kavram olmaktan çıkıp kişisel bir şeye dönüşür. "
            "Sevdiği biri artık avucundaki bir kemik parçasıdır. "
            "O görüntü — elinde kafatası tutan bir adam, "
            "tanıdığı herkesin aynı sona varacağını kabullenen bir bakış — "
            "sanat tarihinin en tanınmış imgelerinden biri. "
            "Dört yüz yıl geçti, hâlâ yürek burkuyor."
        )}}},
        {"M": {"text": {"S": (
            "Bugün Kronborg Kalesi, Hamlet'in bizzat sahnelendiği canlı gösterilere ev sahipliği yapıyor. "
            "Laurence Olivier, Kenneth Branagh ve Jude Law — "
            "hepsi burada prens rolünü üstlendi, "
            "Shakespeare'in sözlerini gerçek surların üzerinde, gerçek denizin kıyısında seslendirdi. "
            "Kale ve oyun birbirine öyle dolanmış ki "
            "birini düşünüp diğerini anmamak artık mümkün değil. "
            "Sisli bir gecede o surların üstünde yürüyün — "
            "hayaleti hissetmediğinizi iddia edemezsiniz."
        )}}},
        {"M": {"text": {"S": (
            "Shakespeare, Kronborg'u hiç görmedi. "
            "Gerçek bir kalede hayali bir prens yarattı "
            "ve dört yüz yıl sonra o prens, tarih kitaplarındaki gerçek krallardan daha canlı. "
            "Taşlar Danimarkalı. Hikâye İngiliz. "
            "Ama Hamlet'in sorduğu sorular — "
            "adalet hakkında, keder hakkında, "
            "yataktan kalkacak mecalin yokken doğru olanı yapmanın "
            "mümkün olup olmadığı hakkında — "
            "o sorular hepimize ait."
        )}}},
    ]},
}


def write_item(lang_code, item, filename):
    """Write a DynamoDB item to a JSON file."""
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(item, f, ensure_ascii=False, indent=2)
    # Validate by re-reading
    with open(filename, 'r', encoding='utf-8') as f:
        parsed = json.load(f)
    # Count paragraphs
    paras = parsed["paragraphs"]["L"]
    total_chars = sum(len(p["M"]["text"]["S"]) for p in paras)
    print(f"[{lang_code}] {len(paras)} paragraphs, ~{total_chars} total chars — JSON valid ✓")
    for i, p in enumerate(paras):
        text = p["M"]["text"]["S"]
        print(f"  P{i+1}: {len(text)} chars")


write_item("ar", ar, "/tmp/hamlet_ar.json")
write_item("fa", fa, "/tmp/hamlet_fa.json")
write_item("tr", tr, "/tmp/hamlet_tr.json")

print("\nAll 3 JSON files written and validated.")
