#!/usr/bin/env python3
"""
Push Cloud Maidens story translations (ar, fa, tr) to DynamoDB.
Each version is a cultural recreation, not a translation.
"""

import boto3
import time
import json
import sys
from decimal import Decimal

# ─── AWS Config ───────────────────────────────────────────────────────────────
session = boto3.Session(region_name='eu-north-1')
dynamodb = session.resource('dynamodb')
table = dynamodb.Table('Story')
timestamp = int(time.time())

# ─── Shared Fields (unchanged from English) ───────────────────────────────────
COMMON = {
    'siteId': 'sigiriya',
    'storyId': 'cloud-maidens',
    'icon': '🎨',
    'tier': 'A',
    'source': (
        'Paranavitana, Senarath. The Significance of the Paintings of Sigiriya, '
        'Artibus Asiae, 1950; Coomaraswamy, Ananda K. Mediaeval Sinhalese Art, 1908; '
        'Bell, H.C.P. Report on the Sigiriya Excavations, Archaeological Survey of Ceylon, 1904; '
        'Bandaranayake, Senake. Sigiriya: City, Palace and Royal Gardens, 2005; '
        'UNESCO World Heritage File 202'
    ),
    'characters': [
        'King Kashyapa I (patron of the frescoes)',
        'The unnamed master painter and his workshop',
        'Dr. Ananda Coomaraswamy (art historian, apsara theory)',
        'Dr. Senarath Paranavitana (archaeologist, cloud-lightning theory)',
        'H.C.P. Bell (British archaeologist who documented the site)',
    ],
    'era': 'c. 480 CE (painted); 1875 (European rediscovery); 1967 (vandalism)',
    'readingTimeMinutes': 3,
    'image': '',
    'disabled': False,
    'thumbnail': '',
    'coordinates': {'lat': Decimal('7.957'), 'lng': Decimal('80.7603')},
    'hasAudio': False,
    'isFree': True,
    'storyCategory': 'riddles_past',
    'updatedAt': timestamp,
}


# ═══════════════════════════════════════════════════════════════════════════════
#  ARABIC — بَناتُ الغَيم
#  Proverb: الثالثةُ ثابتة (The third time's the charm) — subverted
#  Register: Engaging modern MSA storytelling
# ═══════════════════════════════════════════════════════════════════════════════

AR = {
    **COMMON,
    'lang': 'ar',
    'langStoryId': 'ar#cloud-maidens',

    'title': 'بَناتُ الغَيم',

    'subtitle': (
        'خَمسُمئة امرأة زيَّنَت جُرفاً في أدغال سريلانكا'
        ' — لم يَبقَ منهنّ سوى تسعَ عشرة، ولا أحد يعرف من هنّ'
    ),

    'excerpt': (
        'في مُنتصَف صخرةٍ ترتفع مئتَي متر في أدغال سريلانكا،'
        ' تسعَ عشرةَ امرأةً مرسومة على الحجر تُحدِّق في الزائرين'
        ' منذ ألفٍ وخمسمئة عام. لا أحد يعرف من هنّ.'
    ),

    'paragraphs': [
        {'text': (
            'في قَلب أدغال سريلانكا، صَخرةٌ هائلة ترتفع مئتَي متر فوق الغابة.'
            ' في مُنتصَفها، داخل تَجويفٍ يحميه الجُرف من الأمطار،'
            ' تسعَ عشرةَ امرأةً مرسوماتٍ على الحجر العاري.'
            ' بَشَرَتُهنّ ذهبيّة، صدورُهنّ مكشوفة، وأعناقُهنّ مُثقَلة باللؤلؤ والذهب.'
            ' سُحُبٌ ملوّنة تلتفّ حول خُصورهنّ وتَبتلِع كلَّ ما تحتها.'
            ' بعضُهنّ يَحمِلن زهوراً وبعضُهنّ قرابين'
            ' — وكلُّهنّ يبتسِمن الابتسامةَ ذاتَها:'
            ' نِصفُها دعوة ونِصفُها صَدّ.'
            ' ألفٌ وخمسمئة سنة مرّت. لا أحد يعرف من هنّ.'
        )},
        {'text': (
            'والأغربُ أنّ هؤلاء التسعَ عشرةَ هنّ كلُّ ما تبقّى.'
            ' الرسم الأصلي غطّى الواجهةَ الغربيّة بأكملها'
            ' — أكثرُ من خمسة آلاف متر مربّع —'
            ' بما يزيد عن خَمسِمئة امرأة.'
            ' تخيَّل: مئات النساء الذهبيّات يَطفُون في سُحُبٍ ملوّنة'
            ' من سفح الصخرة حتّى بوّابات القلعة في الأعلى.'
            ' هذا كان صَنيعَ المَلِك كاشيابا الأوّل،'
            ' الذي انتزعَ عرشَ سريلانكا من أبيه حوالَي عام ٤٧٧ ميلاديّاً'
            ' وحوّل هذه الصخرة إلى عاصِمته المَلَكيّة.'
            ' خَمسُمئة امرأة على جُرفٍ صخريّ. اليوم لم يَبقَ منهنّ إلّا تسعَ عشرة.'
        )},
        {'text': (
            'فَمَن هؤلاء النساء؟ ظلّ العلماء يتجادلون منذ قرن كامل.'
            ' النظريّة الأولى: نساءٌ حقيقيّات من بلاط كاشيابا'
            ' — مَلِكات وجَوارٍ وحاشية —'
            ' يَحمِلن قرابينَ إلى مَعبَدٍ قريب.'
            ' هذا يُفسِّر الصَواني لكنّه لا يُفسِّر السُّحُب.'
            ' لماذا تَطفو نساءٌ حقيقيّات في الغيوم؟'
            ' النظريّة الثانية: كائناتٌ سماويّة من الأساطير الهندوسيّة والبوذيّة،'
            ' تسكنُ بين السُّحُب وتُمطِر الأرضَ بالأزهار.'
            ' هذا التفسير بدا مِثاليّاً'
            ' — ومنه وُلد الاسم الذي عرفه العالَم: بَناتُ الغَيم.'
        )},
        {'text': (
            'لكنّ الإجابة الأجرأ جاءت من أعظم عالِم آثارٍ عرفَته سريلانكا:'
            ' سيناراث بارانافيتانا.'
            ' أمضى عُقوداً يدرس الموقع، ثمّ خرج باستنتاجٍ لم يتوقّعه أحد:'
            ' هؤلاء لَسنَ نساءً ولَسنَ آلهة — إنّهنّ الطَقسُ نفسه.'
            ' الداكِناتُ منهنّ سُحُبُ المطر، والفاتِحاتُ بُروقُه.'
            ' معاً، يُمثِّلنَ العاصفة الاستوائيّة'
            ' التي تدور حول الصخرة كلَّ مَوسِم رياحٍ موسميّة.'
            ' كاشيابا لم يَبنِ قلعةً على الصخرة فحسب'
            ' — بل رسمَ سماءَه الخاصّة عليها.'
        )},
        {'text': (
            'صمدت هذه اللوحات ألفاً وخمسمئة عامٍ أمام الرياح الموسميّة الاستوائيّة.'
            ' البنّاؤون الأصليّون نَحَتوا قنواتِ تصريفٍ في الصخر لتحويل مياه الأمطار'
            ' — ولا تزال تعمل حتّى اليوم.'
            ' لكنّ الطبيعة لم تكن العدوَّ الأخطر.'
            ' في عام ١٩٦٧، هاجَم مُخرِّبون اللوحاتِ'
            ' فحطّموا أجزاءً من رَسمتَين ولطّخوا خمسَ عشرةَ أخرى بطلاءٍ أخضر.'
            ' ضررٌ لا يُصلَح.'
            ' من أكثرَ من خمسمئة امرأة، لم يَبقَ سوى تسعَ عشرةَ'
            ' في تَجويفِهنّ الصغير، ألوانُهنّ دافئة بعد خمسةَ عشرَ قرناً.'
        )},
        {'text': (
            'يقولون "الثالثةُ ثابتة"'
            ' — لكنّ حتّى النظريّة الثالثة لم تَحسِم شيئاً.'
            ' هُنّ هناك: يَطفُون في سُحُبهنّ المرسومة، مُحمَّلاتٍ بالذهب،'
            ' ينظرنَ إليك بابتسامةٍ لا تُعطي ولا تَعِد.'
            ' وجد علماء الآثار تماثيلَ طينيّة صغيرة لهنّ عند سفح الصخرة'
            ' — تَذكاراتٌ كانت تُباع للزوّار منذ القرن السادس الميلادي.'
            ' ألفٌ وخمسمئة عامٍ والناسُ يصعَدون هذه الصخرة'
            ' ويعودون بأسئلةٍ أكثرَ ممّا حملوا.'
            ' بَناتُ الغَيم يحفَظنَ سرَّهنّ. هكذا كُنَّ دائماً.'
        )},
    ],

    'moralOrLesson': (
        'الفنُّ العظيم لا يُجيب عن الأسئلة — بل يطرَحُها.'
        ' ألفٌ وخمسمئة عامٍ والزوّار يقفون أمام هؤلاء النساء'
        ' ويُسقِطون عليهنّ رغَباتِهم وأحزانَهم ومُعتقَداتِهم'
        ' — وبَناتُ الغَيم يُرَدِّدنَ الابتسامة ذاتَها الهادئة،'
        ' يحفَظنَ سرَّهنّ، ويَبقَينَ أطولَ عُمراً من كلِّ نظريّةٍ وكلِّ إمبراطوريّة.'
    ),
}


# ═══════════════════════════════════════════════════════════════════════════════
#  PERSIAN — دخترانِ ابر
#  Proverb: رازی که عیان است چه حاجت به بیان است (Saadi) — subverted
#  Register: Natural modern Persian literary journalism
# ═══════════════════════════════════════════════════════════════════════════════

FA = {
    **COMMON,
    'lang': 'fa',
    'langStoryId': 'fa#cloud-maidens',

    'title': 'دخترانِ ابر',

    'subtitle': (
        'پانصد زن آسمانی روزی سراسر صخره‌ای در جنگل سریلانکا را پوشانده بودند'
        ' — فقط نوزده‌تا باقی مانده‌اند و هیچ‌کس نمی‌داند چه کسی‌اند'
    ),

    'excerpt': (
        'در نیمه‌ی صخره‌ای دویست‌متری در جنگل‌های سریلانکا،'
        ' نوزده زن نقاشی‌شده از هزار و پانصد سال پیش'
        ' به بازدیدکنندگان خیره مانده‌اند. هیچ‌کس نمی‌داند چه کسی‌اند.'
    ),

    'paragraphs': [
        {'text': (
            'در دل جنگل‌های سریلانکا، صخره‌ای دویست‌متری از زمین بیرون زده'
            ' — انگار مشتی از خاک بالا آمده باشد.'
            ' در نیمه‌ی این صخره، در گودالی سنگی که سقفی طبیعی ساخته،'
            ' نوزده زن مستقیم روی سنگ نقاشی شده‌اند.'
            ' پوستشان طلایی‌ست، از کمر به بالا برهنه‌اند'
            ' و گردنشان زیر بار مروارید و طلا خم شده.'
            ' ابرهای رنگی دور کمرشان پیچیده و هرچه پایین‌تر است را پنهان کرده.'
            ' بعضی‌شان گل در دست دارند، بعضی نَذری.'
            ' و همه‌شان با یک لبخند نصفه نگاهت می‌کنند'
            ' — لبخندی که هم دعوتت می‌کند هم دورت نگه می‌دارد.'
            ' هزار و پانصد سال گذشته. هیچ‌کس نمی‌داند کی‌اند.'
        )},
        {'text': (
            'عجیب‌تر اینکه این نوزده نفر تمام چیزی‌ست که مانده.'
            ' نقاشی اصلی کل دیواره‌ی غربی صخره را پوشانده بود'
            ' — بیش از پنج‌هزار مترمربع — با بیش از پانصد زن.'
            ' تصور کن: صدها زن طلاپوش در ابرهای رنگی،'
            ' از باغ‌های پای صخره تا دروازه‌ی قلعه‌ی بالا.'
            ' این کارِ شاه کاشیَپای اول بود'
            ' که تاج‌وتخت سریلانکا را حدود سال ۴۷۷ میلادی از پدرش گرفت'
            ' و این صخره را پایتختش کرد.'
            ' پانصد زن روی یک صخره. حالا نوزده‌تا مانده.'
        )},
        {'text': (
            'خُب، این زن‌ها کی‌اند؟ محققان یک قرن است دارند سر همین بحث می‌کنند.'
            ' نظریه‌ی اول: زنان واقعی دربار کاشیَپا'
            ' — ملکه‌ها، معشوقه‌ها، ندیمه‌ها —'
            ' در حال بردن نَذری به معبدی نزدیک.'
            ' سینی‌های دستشان را توضیح می‌دهد، ولی ابرها را نه.'
            ' زنان واقعی چرا باید وسط ابر شناور باشند؟'
            ' نظریه‌ی دوم: موجودات آسمانی از اسطوره‌های هندو و بودایی'
            ' که در ابرها زندگی می‌کنند و از آسمان گل می‌بارانند.'
            ' این تفسیر درست جور بود'
            ' — و همین نام معروفشان را ساخت: دختران ابر.'
        )},
        {'text': (
            'ولی خلاقانه‌ترین جواب از بزرگ‌ترین باستان‌شناس سریلانکا آمد:'
            ' سِنارات پاراناویتانا.'
            ' دهه‌ها این مکان را بررسی کرد'
            ' و سرانجام نتیجه‌ای گرفت که کسی انتظارش را نداشت:'
            ' این‌ها نه زنند و نه الهه — این‌ها خودِ آب‌وهوا هستند.'
            ' تیره‌پوست‌ها ابرهای باران‌اند. روشن‌پوست‌ها رعدوبرق.'
            ' با هم، طوفان گرمسیری‌اند'
            ' که هر فصل باران دور صخره می‌پیچد.'
            ' کاشیَپا فقط قلعه نساخت روی این صخره'
            ' — آسمانِ خودش را هم نقاشی کرد.'
        )},
        {'text': (
            'این نقاشی‌ها هزار و پانصد سال باد و باران گرمسیری را تاب آورده‌اند.'
            ' معماران اصلی کانال‌هایی در سنگ تراشیده بودند'
            ' تا آب باران را منحرف کنند — و هنوز کار می‌کنند.'
            ' ولی طبیعت بدترین دشمنشان نبود.'
            ' سال ۱۹۶۷، خرابکارانی به نقاشی‌ها حمله کردند'
            ' — بخش‌هایی از دو نقاشی را کَندند'
            ' و پانزده‌تای دیگر را با رنگ سبز لکه‌دار کردند.'
            ' خسارتی که هیچ‌وقت درست نشد.'
            ' از بیش از پانصد زن، فقط نوزده نفر در گودالشان مانده‌اند'
            ' — رنگ‌هایشان بعد از پانزده قرن هنوز گرم.'
        )},
        {'text': (
            'می‌گویند رازی که عیان است، چه حاجت به بیان'
            ' — ولی رازی که عیان نیست،'
            ' هزار و پانصد سال بیان هم گرهی از کارش باز نکرده.'
            ' آن‌ها همان‌جایند: شناور در ابرهای نقاشی‌شان، غرق در طلا،'
            ' با لبخند نصفه‌ای که نه چیزی می‌دهد نه وعده‌ای.'
            ' باستان‌شناسان مجسمه‌های کوچک گِلی‌شان را پای صخره پیدا کرده‌اند'
            ' — سوغاتی‌هایی که از قرن ششم میلادی به بازدیدکنندگان فروخته می‌شده.'
            ' هزار و پانصد سال است آدم‌ها از این صخره بالا می‌روند'
            ' و با سؤال‌هایی بیشتر از وقتی که رفته بودند برمی‌گردند.'
            ' دختران ابر رازشان را نگه می‌دارند. همیشه همین‌طور بوده.'
        )},
    ],

    'moralOrLesson': (
        'هنر بزرگ جواب نمی‌دهد — سؤال می‌کند.'
        ' هزار و پانصد سال است بازدیدکنندگان جلوی این زنان می‌ایستند'
        ' و آرزوها و غم‌ها و باورهای خودشان را بر آن‌ها می‌تابانند'
        ' — و دختران ابر با همان لبخند آرام نگاهشان می‌کنند،'
        ' رازشان را نگه می‌دارند'
        ' و از هر نظریه و هر امپراتوری بیشتر عمر می‌کنند.'
    ),
}


# ═══════════════════════════════════════════════════════════════════════════════
#  TURKISH — Bulutların Kızları
#  Proverb: Sabreden derviş muradına ermiş — subverted
#  Register: Quality Turkish literary storytelling (Atlas magazine / NTV documentary)
# ═══════════════════════════════════════════════════════════════════════════════

TR = {
    **COMMON,
    'lang': 'tr',
    'langStoryId': 'tr#cloud-maidens',

    'title': 'Bulutların Kızları',

    'subtitle': (
        'Sri Lanka ormanlarında bir kayalığı beş yüz göksel kadın süslüyordu'
        ' — sadece on dokuzu kaldı ve bin beş yüz yıldır kimse kim olduklarını bilmiyor'
    ),

    'excerpt': (
        'Sri Lanka ormanlarının ortasında, iki yüz metrelik bir kayanın yarısında'
        ' on dokuz kadın bin beş yüz yıldır taştan bakıyor.'
        ' Kim olduklarını kimse bilmiyor.'
    ),

    'paragraphs': [
        {'text': (
            'Sri Lanka\'nın ormanlarının tam ortasında,'
            ' iki yüz metre yüksekliğinde devasa bir kaya yükseliyor.'
            ' Kayanın yarısında, yağmurdan korunaklı bir girintinin içinde,'
            ' on dokuz kadın doğrudan taşın üzerine resmedilmiş.'
            ' Tenleri altın rengi, belden yukarısı çıplak,'
            ' boyunları inci ve altından eğilmiş.'
            ' Bel çizgisinden aşağısını renkli bulutlar sarıp gizlemiş.'
            ' Kiminin elinde çiçek var, kiminin sunağında adak.'
            ' Ve hepsi aynı bakışla sana dönük'
            ' — yarım bir gülümsemeyle.'
            ' Hem çağırıyor hem uzak tutuyor.'
            ' Bin beş yüz yıl geçmiş. Kim oldukları hâlâ bilinmiyor.'
        )},
        {'text': (
            'İşin tuhaf tarafı şu:'
            ' bu on dokuz kadın geriye kalan her şey.'
            ' Orijinal resim kayanın batı cephesinin tamamını kaplıyormuş'
            ' — beş bin metrekareden fazla alan, beş yüzü aşkın figür.'
            ' Düşün: yüzlerce altın tenli kadın boyalı bulutların arasında süzülüyor,'
            ' bahçelerden başlayıp kalenin kapılarına kadar uzanıyor.'
            ' Bunu yapan Kral Kaşyapa'
            ' — yaklaşık 477 yılında babasından tahtı zorla alan'
            ' ve bu kayayı başkentine dönüştüren adam.'
            ' Beş yüz kadın bir kayalıkta. Bugün on dokuzu kalmış.'
        )},
        {'text': (
            'Peki bu kadınlar kim?'
            ' Bilim insanları yüz yıldır tartışıyor.'
            ' İlk teori: Kaşyapa\'nın sarayından gerçek kadınlar'
            ' — kraliçeler, gözdeler, nedimeler —'
            ' yakındaki bir tapınağa sunu götürüyorlar.'
            ' Ellerindeki tepsileri açıklıyor ama bulutları açıklamıyor.'
            ' Gerçek kadınlar neden bulutların arasında süzülsün?'
            ' İkinci teori: Hindu ve Budist mitolojisinde'
            ' göklerde yaşayıp yeryüzüne çiçek yağdıran tanrısal varlıklar.'
            ' Bu yorum tam oturdu'
            ' — ve resimlere ünlü adlarını verdi: Bulutların Kızları.'
        )},
        {'text': (
            'Ama en cesur cevap Sri Lanka\'nın en büyük arkeoloğundan geldi:'
            ' Senarath Paranavitana.'
            ' Onlarca yıl bu alanı inceledi'
            ' ve kimsenin beklemediği bir sonuca vardı:'
            ' bunlar ne kadın ne tanrıça'
            ' — bunlar havanın ta kendisi.'
            ' Koyu tenli figürler yağmur bulutları, açık tenliler şimşek.'
            ' Hep birlikte, her muson mevsiminde'
            ' kayanın etrafında dönen tropik fırtınayı temsil ediyorlar.'
            ' Kaşyapa sadece bir kale inşa etmemiş bu kayanın üstüne'
            ' — kendi gökyüzünü de boyamış.'
        )},
        {'text': (
            'Bu resimler bin beş yüz yıl boyunca tropik musonlara dayanmış.'
            ' İlk mimarlar, yağmur suyunu yönlendirmek için'
            ' kayaya drenaj kanalları oydular — bugün hâlâ çalışıyorlar.'
            ' Ama en büyük tehdit doğa değildi.'
            ' 1967\'de vandallar resimlere saldırdı:'
            ' iki figürün parçalarını söktü,'
            ' on beşini yeşil boyayla kirletti.'
            ' Bu hasar bir daha geri alınamadı.'
            ' Beş yüzden fazla figürden yalnızca on dokuzu kaldı'
            ' kayalıktaki girintilerinde'
            ' — renkleri on beş asır sonra hâlâ sıcak.'
        )},
        {'text': (
            'Derler ki sabreden derviş muradına ermiş'
            ' — ama bin beş yüz yıldır sabreden bu kayanın ziyaretçileri'
            ' hâlâ muratlarına eremedi.'
            ' Kadınlar orada, boyalı bulutlarının arasında süzülüyor,'
            ' altınlarla yüklü,'
            ' sana hiçbir şey vermeyen ve hiçbir şey vaat etmeyen'
            ' o yarım gülümsemeyle bakıyorlar.'
            ' Arkeologlar kayanın dibinde onların küçük kilden kopyalarını buldu'
            ' — altıncı yüzyıldan beri ziyaretçilere satılan hediyelik eşyalar.'
            ' İnsanlar bin beş yüz yıldır bu kayaya çıkıyor,'
            ' götürdüklerinden fazla soruyla geri dönüyor.'
            ' Bulutların Kızları sırlarını saklıyor. Hep öyle oldu.'
        )},
    ],

    'moralOrLesson': (
        'Büyük sanat soruları cevaplamaz — sorar.'
        ' Bin beş yüz yıldır ziyaretçiler bu kadınların önünde durup'
        ' kendi arzularını, kendi hüzünlerini, kendi inançlarını onlara yansıtıyor'
        ' — ve Bulutların Kızları hep aynı sakin yarım gülümsemeyle karşılık veriyor,'
        ' sırlarını saklıyor,'
        ' her teoriden ve her imparatorluktan uzun yaşıyor.'
    ),
}


# ═══════════════════════════════════════════════════════════════════════════════
#  VALIDATION & PUSH
# ═══════════════════════════════════════════════════════════════════════════════

def validate_record(record, lang_label):
    """Validate a record before pushing."""
    errors = []

    # Required text fields
    for field in ['title', 'subtitle', 'excerpt', 'moralOrLesson']:
        if not record.get(field):
            errors.append(f"Missing {field}")

    # Paragraphs
    paragraphs = record.get('paragraphs', [])
    if not (6 <= len(paragraphs) <= 10):
        errors.append(f"Paragraph count {len(paragraphs)} outside 6-10 range")

    total_chars = 0
    for i, p in enumerate(paragraphs):
        text = p.get('text', '')
        char_count = len(text)
        total_chars += char_count
        if char_count > 600:  # 500 + 20% tolerance
            errors.append(f"P{i+1} has {char_count} chars (max 600)")
        if not text:
            errors.append(f"P{i+1} is empty")

    if total_chars > 4200:  # 3000 + ~40% tolerance for RTL with diacritics
        errors.append(f"Total chars {total_chars} exceeds limit")

    # Key fields
    if record.get('lang') != lang_label:
        errors.append(f"lang mismatch: {record.get('lang')} != {lang_label}")
    if not record.get('langStoryId', '').startswith(f'{lang_label}#'):
        errors.append(f"langStoryId doesn't start with {lang_label}#")

    # JSON serialization test
    try:
        json.dumps(record, ensure_ascii=False, default=str)
    except Exception as e:
        errors.append(f"JSON serialization failed: {e}")

    return errors


def push_record(record, lang_label):
    """Validate and push a single record to DynamoDB."""
    print(f"\n{'='*60}")
    print(f"  {lang_label.upper()} — {record['title']}")
    print(f"{'='*60}")

    # Validate
    errors = validate_record(record, lang_label)
    if errors:
        print(f"  ❌ VALIDATION FAILED:")
        for e in errors:
            print(f"     • {e}")
        return False

    # Show stats
    paragraphs = record['paragraphs']
    total_chars = sum(len(p['text']) for p in paragraphs)
    print(f"  Paragraphs: {len(paragraphs)}")
    print(f"  Total chars: {total_chars}")
    for i, p in enumerate(paragraphs):
        print(f"    P{i+1}: {len(p['text'])} chars")
    print(f"  langStoryId: {record['langStoryId']}")
    print(f"  updatedAt: {record['updatedAt']}")

    # Push
    try:
        table.put_item(Item=record)
        print(f"  ✅ PUSHED SUCCESSFULLY")
        return True
    except Exception as e:
        print(f"  ❌ PUSH FAILED: {e}")
        return False


def verify_record(lang_code):
    """Verify the record exists in DynamoDB after push."""
    try:
        response = table.get_item(
            Key={
                'siteId': 'sigiriya',
                'langStoryId': f'{lang_code}#cloud-maidens',
            }
        )
        item = response.get('Item')
        if item:
            print(f"  ✅ VERIFIED: {item['title']} (lang={item['lang']})")
            return True
        else:
            print(f"  ❌ VERIFY FAILED: Record not found")
            return False
    except Exception as e:
        print(f"  ❌ VERIFY FAILED: {e}")
        return False


if __name__ == '__main__':
    print("╔══════════════════════════════════════════════════════════════╗")
    print("║  Cloud Maidens — Pushing AR / FA / TR translations         ║")
    print("╚══════════════════════════════════════════════════════════════╝")

    results = {}
    for record, label in [(AR, 'ar'), (FA, 'fa'), (TR, 'tr')]:
        success = push_record(record, label)
        if success:
            verify_record(label)
        results[label] = success

    print(f"\n{'='*60}")
    print("  SUMMARY")
    print(f"{'='*60}")
    all_ok = True
    for lang, ok in results.items():
        status = "✅ SUCCESS" if ok else "❌ FAILED"
        print(f"  {lang}: {status}")
        if not ok:
            all_ok = False

    if all_ok:
        print("\n  All three records pushed and verified. ✅")
    else:
        print("\n  Some records failed. Check errors above. ❌")
        sys.exit(1)
