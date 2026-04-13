#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Push Arabic, Persian, and Turkish versions of 'The Blinded Architects'
to the Story DynamoDB table as NEW records.
"""

import boto3
import time
import json
import sys

# --- Configuration ---
TABLE_NAME = "Story"
REGION = "eu-north-1"
SITE_ID = "saint-basils-cathedral"
STORY_ID = "blinded-architects"
TIMESTAMP = int(time.time())

# --- Shared fields (unchanged from English) ---
SHARED = {
    "coordinates": {"M": {
        "lng": {"N": "37.6231"},
        "lat": {"N": "55.7525"},
    }},
    "disabled": {"BOOL": False},
    "era": {"S": "1561"},
    "hasAudio": {"BOOL": False},
    "icon": {"S": "\U0001f441\ufe0f"},
    "image": {"S": ""},
    "isFree": {"BOOL": True},
    "readingTimeMinutes": {"N": "2"},
    "siteId": {"S": SITE_ID},
    "source": {"S": "Russian folk tradition, first recorded in the 17th century, disputed by some historians"},
    "storyCategory": {"S": "ghosts_curses"},
    "storyId": {"S": STORY_ID},
    "thumbnail": {"S": ""},
    "tier": {"S": "A"},
    "updatedAt": {"N": str(TIMESTAMP)},
}


def make_paragraphs(texts):
    return {"L": [{"M": {"text": {"S": t}}} for t in texts]}


def build_item(lang, title, subtitle, excerpt, moral, characters, paragraphs):
    item = dict(SHARED)
    item["lang"] = {"S": lang}
    item["langStoryId"] = {"S": f"{lang}#{STORY_ID}"}
    item["title"] = {"S": title}
    item["subtitle"] = {"S": subtitle}
    item["excerpt"] = {"S": excerpt}
    item["moralOrLesson"] = {"S": moral}
    item["characters"] = {"L": [{"S": c} for c in characters]}
    item["paragraphs"] = make_paragraphs(paragraphs)
    return item


# ============================================================
# ARABIC (ar)
# ============================================================
# Proverb: "الظُّلمُ ظُلُماتٌ يومَ القيامة" (Injustice is darkness on Judgment Day)
# Subverted: Ivan didn't wait for Judgment Day — he extinguished the light
# in the eyes of those who created beauty for him.

AR = build_item(
    lang="ar",
    title="ثَمَنُ الجَمَال",
    subtitle="كاتدرائيّةٌ أبهَرَتِ الدُّنيا... وكَلَّفَت بانِيَيها أبصارَهُما",
    excerpt=(
        "\u00ab""هل تَستطيعانِ بناءَ شيءٍ أجمَل؟""\u00bb أجابا: نَعَم. "
        "لم يَتغيَّر شيءٌ في وجهِ إيفان: "
        "\u00ab""إذَن سأتأكَّدُ أنّكُما لن تَفعَلا ذلكَ أبدًا.""\u00bb "
        "أمَرَ بإطفاءِ أعيُنِهِما — حديدٌ مُحَمًّى على البَصَر — "
        "لِيَعجِزا عن تَصميمِ ما يُنافِسُ كاتدرائيّتَه."
    ),
    moral="الطُّغاةُ يُدمِّرونَ ما لا يَقدِرونَ على امتلاكِه، لكنَّ الفنَّ يَعيشُ أطوَلَ مِن ظالِميه",
    characters=["إيفان الرَّهيب", "بوستنيك ياكوفليف", "بارما"],
    paragraphs=[
        # P1 — Ivan conquers Kazan, demands a monument
        (
            "في عامِ ١٥٥٥، كانَ على عَرشِ موسكو رَجُلٌ لا يَعرِفُ الرَّحمة: "
            "إيفان الرابع، الذي سَيُلقِّبُهُ التاريخُ بإيفان الرَّهيب. "
            "كانَ قد سَحَقَ للتَّوِّ مدينةَ قازان، وأنهى قُرونًا مِن هَيمَنةِ "
            "فُلولِ الإمبراطوريّةِ المَغوليّة على روسيا. لم يكُن هذا انتصارًا "
            "عاديًّا — كانَت اللَّحظةَ التي أعلَنَت فيها روسيا عن نَفسِها "
            "قوّةً عُظمى. وأرادَ إيفان بناءً يكونُ بحَجمِ هذا الطُّموح."
        ),
        # P2 — The architects build the impossible
        (
            "استَدعى مِعماريَّيْنِ اثنَيْن — بوستنيك ياكوفليف وبارما — "
            "وأعطاهُما أمرًا واحدًا: ابنِيا ما لم يَبنِهِ أحَدٌ قَبلَكُما. "
            "وعلى مَدى سِتِّ سنوات، فَعَلا ذلكَ بالضَّبط. ما ارتَفَعَ على "
            "حافّةِ الميدانِ الأحمرِ كانَ أشبَهَ بحُلمٍ مَنحوتٍ في الحَجَر: "
            "تِسعُ كنائسَ مُنصَهِرةٍ في بناءٍ واحدٍ جامح، كُلُّ واحدةٍ بقُبّةٍ "
            "لا تُشبِهُ أُختَها. لم يكُن مبنًى بقَدرِ ما كانَ رُؤيا تَمشي على الأرض."
        ),
        # P3 — The fateful question
        (
            "حينَ وقَفَ إيفان أمامَ كاتدرائيّةِ القدّيسِ باسيل المُكتمِلةِ "
            "عامَ ١٥٦١، تقولُ الأُسطورةُ إنّهُ وَقَفَ صامتًا لا يَنطِق. "
            "ثُمَّ التَفَتَ إلى بوستنيك وبارما وسألَهُما سُؤالًا واحدًا: "
            "\u00abهل تَستطيعانِ بناءَ شيءٍ أجمَلَ مِن هذا؟\u00bb "
            "فأجابا — بحَماقةٍ أو بصِدقٍ، مَن يَدري — نَعَم. "
            "لم يَتغيَّر شيءٌ في مَلامِحِ إيفان: "
            "\u00abإذَن سأتأكَّدُ أنّكُما لن تَفعَلا ذلكَ أبدًا.\u00bb"
        ),
        # P4 — The blinding
        (
            "أمَرَ بإطفاءِ أعيُنِهِما. حديدٌ مُحَمًّى يُكوى بهِ البَصَر — "
            "لِيَعجِزا عن تَصميمِ ما يُنافِسُ كاتدرائيّتَهُ، لأيِّ شخصٍ، "
            "في أيِّ زمان. الإنسانانِ الوحيدانِ على وجهِ الأرضِ القادرانِ "
            "على صُنعِ ذلكَ الجَمال، حُرِما مِن رُؤيتِهِ إلى الأبد. "
            "وتقولُ الأُسطورةُ إنّهُما أمضَيا ما تَبقّى مِن حياتِهما "
            "يَتسوَّلانِ في ظِلِّ تُحفتِهِما، يَسمعانِ أنفاسَ الذُّهولِ "
            "مِن زُوّارٍ يَرَونَ ما لم يَعُد بإمكانِهِما إلّا تَذَكُّرَه."
        ),
        # P5 — Historical doubt
        (
            "لكنّ ما يُغيِّرُ كُلَّ شيء: هذا على الأرجَحِ لم يَحدُث. "
            "عَثَرَ المُؤرِّخونَ على وثائقَ تُثبِتُ أنَّ بوستنيك ياكوفليف "
            "عَمِلَ على مشاريعَ أُخرى بعدَ إتمامِ الكاتدرائيّة — وهذا "
            "مُستحيلٌ لو كانَ قد فَقَدَ بَصَرَه. بل يَعتقِدُ بعضُ الباحثينَ "
            "أنَّ \u00abبوستنيك\u00bb و\u00abبارما\u00bb لم يكونا شَخصَيْنِ "
            "أصلًا، بل كانا اسمَيْنِ لِمِعماريٍّ واحد."
        ),
        # P6 — Why the legend persists
        (
            "ومع ذلك، صَمَدَت هذهِ الحكايةُ قُرابةَ خمسِمئةِ عام لأنّها "
            "تَمَسُّ عَصَبًا حقيقيًّا. هذا قَيصَرٌ قَتَلَ ابنَهُ بيَدِهِ "
            "في لحظةِ غَضَب. حاكمٌ أسَّسَ شُرطةً سرّيّة، ومَحا مُدنًا "
            "بكامِلِها، وتَنقَّلَ بينَ الصَّلاةِ والوحشيّةِ دونَ أن يَرمُش. "
            "قصّةُ إعماءِ المِعماريَّيْنِ تَعلَقُ بالذّاكرةِ لأنّها — بكُلِّ "
            "بساطة — مِن نَوعِ الأشياءِ التي كانَ إيفان يَفعلُها فِعلًا."
        ),
        # P7 — Proverb subversion + art outlasts the monster
        (
            "يقولونَ \u00abالظُّلمُ ظُلُماتٌ يومَ القيامة\u00bb — "
            "لكنَّ إيفان لم يَنتظِرِ القيامةَ: أطفَأَ النّورَ في عُيونِ مَن "
            "صَنعوا لهُ أجمَلَ ما على الأرض. وبَعدَ كُلِّ شيء، لا تزالُ "
            "الكاتدرائيّةُ واقفةً في الميدانِ الأحمر: جامحة، مُستحيلة، "
            "لا شبيهَ لها. ملايينُ يزورونَها كُلَّ عام. لا أحدَ يَذكُرُ مَن "
            "هَزَمَ إيفان ولا مَن سَحَق. لكنَّ الجميعَ يَعرفُ البناءَ الذي "
            "صَنَعَهُ مِعماريّان — البناءَ الذي كانَ أجمَلَ مِن أن يَحتمِلَهُ "
            "طاغية. الفنُّ يَبقى بعدَ الوَحش. دائمًا."
        ),
    ],
)


# ============================================================
# PERSIAN (fa)
# ============================================================
# Proverb: Sa'di — "چراغی که ایزد برافروزد، هر آن‌کس پُف کند ریشش بسوزد"
# (A lamp that God has lit — whoever blows on it, their beard will burn)
# Subverted: Ivan thought blinding the architects extinguished their light,
# but the cathedral — that divine lamp — still shines.

FA = build_item(
    lang="fa",
    title="تاوانِ زیبایی",
    subtitle="کلیسایی که دنیا را مبهوت کرد... و چشمِ سازندگانش را گرفت",
    excerpt=(
        "\u00abمی\u200cتوانید از این زیباتر بسازید؟\u00bb "
        "معماران گفتند بله. صورتِ ایوان تکان نخورد: "
        "\u00abپس باید خیالم راحت شود که هرگز نخواهید ساخت.\u00bb "
        "دستور داد چشمانشان را کور کنند — آهنِ تفتیده روی چشم — "
        "تا هرگز رقیبی برایِ کلیسایش نسازند."
    ),
    moral="ستمگران آنچه را نمی\u200cتوانند در اختیار بگیرند نابود می\u200cکنند، امّا هنر همیشه از ظالمش بیشتر عمر می\u200cکند",
    characters=["ایوانِ مخوف", "پوستنیکِ یاکوولِف", "بارما"],
    paragraphs=[
        # P1 — Ivan conquers Kazan, demands a monument
        (
            "سالِ ۱۵۵۵ میلادی. مسکو را مردی اداره می\u200cکرد "
            "که تاریخ لقبِ \u00abایوانِ مخوف\u00bb را برایش کنار گذاشته: "
            "ایوانِ چهارم. تازه شهرِ قازان را فتح کرده بود و قرن\u200cها "
            "سلطه\u200cی بقایایِ امپراتوریِ مغول بر روسیه را یکجا تمام "
            "کرده بود. این یک پیروزیِ نظامیِ معمولی نبود — لحظه\u200cای "
            "بود که روسیه داشت به دنیا اعلام می\u200cکرد: ما یک قدرتِ "
            "جهانی هستیم. و ایوان بنایی می\u200cخواست هم\u200cقدِّ این ادّعا."
        ),
        # P2 — The architects build the impossible
        (
            "دو معمار فراخواند — پوستنیکِ یاکوولِف و بارما — "
            "و فقط یک کلمه گفت: غیرممکن بسازید. شش سالِ تمام، "
            "دقیقاً همین کار را کردند. آنچه در لبه\u200cی میدانِ سرخ "
            "از زمین سر برآورد، رؤیایی بود تراشیده از سنگ: نُه نمازخانه "
            "ذوب\u200cشده در یک بنایِ واحد، هرکدام با گنبدی که شبیهِ "
            "هیچ\u200cکدامِ دیگر نبود. این ساختمان نبود — معجزه بود. "
            "پیش از آن ندیده بودند و بعد از آن هم ندیدند."
        ),
        # P3 — The fateful question
        (
            "وقتی سالِ ۱۵۶۱ ایوان جلوِ کلیسایِ جامعِ واسیلیِ مقدّس "
            "ایستاد، افسانه می\u200cگوید خشکش زد. بعد رو کرد به "
            "پوستنیک و بارما و فقط یک سؤال پرسید: "
            "\u00abمی\u200cتوانید از این زیباتر بسازید؟\u00bb "
            "معماران — از سرِ ساده\u200cلوحی یا شاید از سرِ "
            "راستگویی — گفتند بله. هیچ\u200cچیز در صورتِ ایوان "
            "تکان نخورد: \u00abپس باید خیالم راحت شود که هرگز "
            "نخواهید ساخت.\u00bb"
        ),
        # P4 — The blinding
        (
            "دستور داد چشمانشان را کور کنند. آهنِ تفتیده روی "
            "چشم — تا هرگز برایِ هیچ\u200cکس، در هیچ زمانی، رقیبی "
            "برایِ کلیسایش نسازند. تنها دو نفر روی زمین که توانِ آفریدنِ "
            "آن زیبایی را داشتند، برای همیشه از دیدنش محروم شدند. "
            "افسانه می\u200cگوید بقیّه\u200cی عمرشان را در سایه\u200cی "
            "شاهکارِ خودشان گدایی کردند — صدایِ نفسِ حیرتِ "
            "بازدیدکنندگانی را می\u200cشنیدند که آنچه را آن\u200cها فقط "
            "می\u200cتوانستند به یاد بیاورند، با چشمِ باز تماشا می\u200cکردند."
        ),
        # P5 — Historical doubt
        (
            "امّا یک مشکل هست: احتمالاً هیچ\u200cوقت اتّفاق نیفتاد. "
            "مورّخان سندهایی پیدا کرده\u200cاند که نشان می\u200cدهد "
            "پوستنیکِ یاکوولِف بعد از تمامِ کلیسا رویِ پروژه\u200cهایِ "
            "دیگری کار کرده — اگر کورش کرده بودند، محال بود بتواند. "
            "بعضی پژوهشگران حتّی فکر می\u200cکنند \u00abپوستنیک\u00bb "
            "و \u00abبارما\u00bb اصلاً دو نفر نبودند، بلکه دو اسم بودند "
            "برایِ یک معمارِ واحد."
        ),
        # P6 — Why the legend persists
        (
            "با این حال، این داستان نزدیکِ پانصد سال عمر کرده، "
            "و دلیلش ساده است: حقیقتی عمیق درباره\u200cی روسیه\u200cی "
            "ایوان را بازتاب می\u200cدهد. این تزاری بود که پسرِ خودش "
            "را در حمله\u200cی عصبانیّت با دستِ خود کشت. حاکمی که "
            "پلیسِ مخفی ساخت، شهرها را از روی نقشه پاک کرد، و "
            "بدونِ پلک زدن بینِ نماز و خشونت رفت\u200cوآمد می\u200cکرد. "
            "این داستان یادِ آدم\u200cها می\u200cماند چون دقیقاً همان "
            "کاری\u200cست که ایوان ازش برمی\u200cآمد."
        ),
        # P7 — Sa'di proverb subversion + art outlasts the monster
        (
            "سعدی گفته: \u00abچراغی که ایزد بَرافروزد، هر آن\u200cکس "
            "پُف کند ریشش بسوزد.\u00bb ایوان خیال کرد با کور کردنِ "
            "آن دو معمار، چراغِ هنرشان را خاموش کرده. امّا کلیسا — "
            "همان چراغی که خدا روشنش کرده بود — هنوز در میدانِ سرخ "
            "می\u200cدرخشد. هر سال میلیون\u200cها نفر می\u200cآیند "
            "تماشایش. هیچ\u200cکس یادش نیست ایوان کجا را فتح کرد "
            "یا چه کسی را نابود کرد. امّا همه آن بنا را می\u200cشناسند — "
            "بنایی آن\u200cقدر زیبا که ظالمی چشمِ سازندگانش را سوزاند "
            "تا مالکِ ابدی\u200cاش باشد. هنر از هیولا بیشتر عمر "
            "می\u200cکند. همیشه."
        ),
    ],
)


# ============================================================
# TURKISH (tr)
# ============================================================
# Proverb: "Zalimin mumu yatsıya kadar yanar"
# (The tyrant's candle burns only until bedtime)
# Subverted: Ivan's candle went out long ago, but the light his
# architects carved in stone still burns on Red Square.

TR = build_item(
    lang="tr",
    title="K\u00f6r Mimarlar",
    subtitle="\u00d6yle g\u00fczel bir yap\u0131 ki, mimarlar\u0131 g\u00f6zleriyle \u00f6dedi",
    excerpt=(
        "\u201cBundan daha g\u00fczelini yapabilir misiniz?\u201d "
        "Mimarlar evet dedi. \u0130van\u2019\u0131n surat\u0131nda tek bir kas oynamad\u0131: "
        "\u201c\u00d6yleyse bir daha asla yapamayaca\u011f\u0131n\u0131zdan emin olmal\u0131y\u0131m.\u201d "
        "\u0130kisinin de g\u00f6zlerini k\u00f6r ettirdi \u2014 k\u0131zg\u0131n demirle \u2014 "
        "katedralinin rakibi olabilecek bir \u015fey asla \u00e7izemeyeceklerinden emin olmak i\u00e7in."
    ),
    moral="Zalimler kontrol edemediklerini yok eder, ama sanat her zaman zaliminden uzun ya\u015far",
    characters=["Korkun\u00e7 \u0130van", "Postnik Yakovlev", "Barma"],
    paragraphs=[
        # P1 — Ivan conquers Kazan, demands a monument
        (
            "1555 y\u0131l\u0131. Moskova\u2019n\u0131n taht\u0131nda tarihin "
            "\u201cKorkun\u00e7 \u0130van\u201d diye anaca\u011f\u0131 bir adam "
            "oturuyor: IV. \u0130van. Az \u00f6nce Kazan \u015fehrini ele ge\u00e7irmi\u015f, "
            "Rusya\u2019y\u0131 y\u00fczy\u0131llard\u0131r boyunduruk alt\u0131nda tutan "
            "Mo\u011fol \u0130mparatorlu\u011fu\u2019nun son kal\u0131nt\u0131lar\u0131n\u0131 "
            "yerle bir etmi\u015fti. Bu s\u0131radan bir sava\u015f zaferi de\u011fildi \u2014 "
            "Rusya\u2019n\u0131n d\u00fcnya sahnesine \u00e7\u0131k\u0131p "
            "\u201cBen buraday\u0131m\u201d dedi\u011fi and\u0131. "
            "Ve \u0130van, bu ana yak\u0131\u015f\u0131r bir yap\u0131 istiyordu."
        ),
        # P2 — The architects build the impossible
        (
            "\u0130ki mimar \u00e7a\u011f\u0131rtt\u0131: Postnik Yakovlev ve Barma. "
            "Tek bir emir verdi \u2014 imk\u00e2ns\u0131z\u0131 in\u015fa edin. "
            "Alt\u0131 y\u0131l boyunca tam olarak bunu yapt\u0131lar. "
            "K\u0131z\u0131l Meydan\u2019\u0131n kenar\u0131nda y\u00fckselen \u015fey "
            "ta\u015ftan oyulmu\u015f bir r\u00fcyaya benziyordu: dokuz k\u00fc\u00e7\u00fck "
            "kilise tek bir \u00e7\u0131lg\u0131n yap\u0131da kayna\u015fm\u0131\u015f, "
            "her birinin tepesinde \u00f6tekine benzemeyen bir kubbe. "
            "Bu bir bina de\u011fildi \u2014 bir hayaldi. "
            "Ne ondan \u00f6nce ne ondan sonra benzeri yap\u0131ld\u0131."
        ),
        # P3 — The fateful question
        (
            "1561\u2019de \u0130van, tamamlanm\u0131\u015f Aziz Vasil Katedrali\u2019nin "
            "kar\u015f\u0131s\u0131nda durdu\u011funda efsane der ki dilini yuttu. "
            "Sonra Postnik\u2019e ve Barma\u2019ya d\u00f6nd\u00fc, tek bir soru sordu: "
            "\u201cBundan daha g\u00fczelini yapabilir misiniz?\u201d "
            "Mimarlar \u2014 ahmakl\u0131ktan m\u0131, d\u00fcr\u00fcstl\u00fckten mi "
            "belli de\u011fil \u2014 evet dediler. "
            "\u0130van\u2019\u0131n surat\u0131nda tek bir kas oynamad\u0131: "
            "\u201c\u00d6yleyse bir daha asla yapamayaca\u011f\u0131n\u0131zdan "
            "emin olmal\u0131y\u0131m.\u201d"
        ),
        # P4 — The blinding
        (
            "\u0130kisinin de g\u00f6zlerini k\u00f6r ettirdi. K\u0131zg\u0131n "
            "demirle \u2014 katedralinin rakibi olabilecek bir \u015feyi kimse i\u00e7in, "
            "hi\u00e7bir zaman \u00e7izemeyeceklerinden emin olmak i\u00e7in. "
            "D\u00fcnyada g\u00fczellik yaratmaya en yetenekli iki insan, "
            "yaratt\u0131klar\u0131 g\u00fczelli\u011fi bir daha g\u00f6remeyecekleri "
            "\u015fekilde cezaland\u0131r\u0131ld\u0131. Efsaneye g\u00f6re "
            "hayatlar\u0131n\u0131n geri kalan\u0131n\u0131 kendi ba\u015fyap\u0131tlar\u0131n\u0131n "
            "g\u00f6lgesinde dilenerek ge\u00e7irdiler \u2014 g\u00f6remedikleri eseri "
            "hayranl\u0131kla seyreden ziyaret\u00e7ilerin nefes kesilen seslerini dinleyerek."
        ),
        # P5 — Historical doubt
        (
            "Ama i\u015fin ger\u00e7e\u011fi \u015fu: muhtemelen hi\u00e7 ya\u015fanmad\u0131. "
            "Tarih\u00e7iler, Aziz Vasil bittikten sonra Postnik Yakovlev\u2019in "
            "ba\u015fka projelerde \u00e7al\u0131\u015ft\u0131\u011f\u0131na dair belgeler "
            "buldu \u2014 g\u00f6zleri k\u00f6r edilmi\u015f olsa bu m\u00fcmk\u00fcn "
            "olmazd\u0131. Hatta baz\u0131 ara\u015ft\u0131rmac\u0131lara g\u00f6re "
            "\u201cPostnik\u201d ve \u201cBarma\u201d iki ayr\u0131 ki\u015fi bile "
            "de\u011fildi; ayn\u0131 mimar\u0131n iki farkl\u0131 ad\u0131yd\u0131."
        ),
        # P6 — Why the legend persists
        (
            "Ama bu hik\u00e2ye neredeyse be\u015f y\u00fcz y\u0131ld\u0131r dilden "
            "d\u00fc\u015fmedi. \u00c7\u00fcnk\u00fc \u0130van\u2019\u0131n "
            "Rusya\u2019s\u0131 hakk\u0131nda \u00e7ok derin bir ger\u00e7e\u011fi "
            "anlat\u0131yor. Bu, \u00f6fke n\u00f6betinde \u00f6z o\u011flunu "
            "\u00f6ld\u00fcren bir \u00e7ard\u0131. Gizli polis kuran, \u015fehirleri "
            "haritadan silip ge\u00e7en, namaz ile vah\u015fet aras\u0131nda g\u00f6z "
            "k\u0131rpmadan gidip gelen bir h\u00fck\u00fcmdar. "
            "Hik\u00e2ye haf\u0131zalardan silinmiyor \u00e7\u00fcnk\u00fc tam olarak "
            "\u0130van\u2019\u0131n yapaca\u011f\u0131 cinsten bir \u015fey."
        ),
        # P7 — Proverb subversion + art outlasts the monster
        (
            "\u201cZalimin mumu yats\u0131ya kadar yanar\u201d derler. "
            "\u0130van\u2019\u0131n mumu \u00e7oktan s\u00f6nd\u00fc \u2014 ama o iki "
            "mimar\u0131n ta\u015fa i\u015fledi\u011fi \u0131\u015f\u0131k h\u00e2l\u00e2 "
            "K\u0131z\u0131l Meydan\u2019da yan\u0131yor. Her y\u0131l milyonlarca "
            "ki\u015fi g\u00f6rmeye geliyor. Kimse \u0130van\u2019\u0131n neyi "
            "fethetti\u011fini, kimi ezdi\u011fini hat\u0131rlam\u0131yor. "
            "Ama herkes iki mimar\u0131n elinden \u00e7\u0131kan o yap\u0131y\u0131 "
            "biliyor \u2014 bir zalimin g\u00f6zlerini da\u011flatt\u0131\u011f\u0131 "
            "o e\u015fsiz katedrali. Sanat canavardan uzun ya\u015far. "
            "Her zaman ya\u015far."
        ),
    ],
)


# ============================================================
# PUSH TO DYNAMODB
# ============================================================

def main():
    client = boto3.client("dynamodb", region_name=REGION)

    stories = [
        ("ar", "Arabic", AR),
        ("fa", "Persian", FA),
        ("tr", "Turkish", TR),
    ]

    # First validate all items by printing a summary
    for lang, name, item in stories:
        print(f"\n{'='*60}")
        print(f"  {name} ({lang})")
        print(f"{'='*60}")
        print(f"  Title:       {item['title']['S']}")
        print(f"  Subtitle:    {item['subtitle']['S']}")
        print(f"  langStoryId: {item['langStoryId']['S']}")
        print(f"  Paragraphs:  {len(item['paragraphs']['L'])}")
        total_chars = sum(len(p['M']['text']['S']) for p in item['paragraphs']['L'])
        print(f"  Total chars: {total_chars}")
        for i, p in enumerate(item['paragraphs']['L'], 1):
            text = p['M']['text']['S']
            words = len(text.split())
            print(f"    P{i}: {len(text)} chars, {words} words")

    # Validate JSON serialization
    for lang, name, item in stories:
        try:
            json.dumps(item, ensure_ascii=False)
            print(f"\n  [OK] {name} JSON valid")
        except Exception as e:
            print(f"\n  [FAIL] {name} JSON error: {e}")
            sys.exit(1)

    # Push each record
    for lang, name, item in stories:
        print(f"\n  Pushing {name} ({lang})...", end=" ", flush=True)
        try:
            response = client.put_item(
                TableName=TABLE_NAME,
                Item=item,
                ConditionExpression="attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
            )
            http_code = response["ResponseMetadata"]["HTTPStatusCode"]
            print(f"SUCCESS (HTTP {http_code})")
        except client.exceptions.ConditionalCheckFailedException:
            print("already exists, overwriting...", end=" ", flush=True)
            response = client.put_item(
                TableName=TABLE_NAME,
                Item=item,
            )
            http_code = response["ResponseMetadata"]["HTTPStatusCode"]
            print(f"OVERWRITTEN (HTTP {http_code})")
        except Exception as e:
            print(f"FAILED: {e}")
            sys.exit(1)

    print(f"\n{'='*60}")
    print(f"  All 3 stories pushed successfully!")
    print(f"  Timestamp: {TIMESTAMP}")
    print(f"{'='*60}\n")


if __name__ == "__main__":
    main()
