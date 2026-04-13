#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Push Arabic (ar), Persian (fa), and Turkish (tr) versions of
"The Black Taj Mahal" to DynamoDB Story table.

Each version is recreated natively with a culturally embedded proverb:
  - Arabic:  "الثالثةُ ثابتة" (The third one settles it)
  - Persian: "تا سه نشه، بازی نشه" (Until it's three, it's not a game)
  - Turkish: "Yalancının mumu yatsıya kadar yanar" (The liar's candle burns till evening)
"""

import boto3
import time
import json
import sys
from decimal import Decimal

# --- CONFIG ---
TABLE_NAME = "Story"
REGION = "eu-north-1"
SITE_ID = "taj-mahal"
STORY_ID = "black-taj-moonlight-twin"
NOW = int(time.time())

session = boto3.Session(region_name=REGION)
table = session.resource("dynamodb").Table(TABLE_NAME)

# --- SHARED (unchanged) FIELDS ---
SHARED = dict(
    siteId=SITE_ID,
    storyId=STORY_ID,
    icon="\U0001f319",  # 🌙
    tier="A",
    source=(
        "Jean-Baptiste Tavernier, Les Six Voyages (1676, trans. V. Ball 1889); "
        "A.C.L. Carlleyle, Archaeological Survey of India Reports (1871); "
        "Elizabeth B. Moynihan et al., The Moonlight Garden: New Discoveries "
        "at the Taj Mahal, Smithsonian/University of Washington Press (2000); "
        "Ebba Koch, The Complete Taj Mahal and the Riverfront Gardens of Agra "
        "(2006); R. Nath, The Taj Mahal and Its Incarnation (1985); Wayne E. "
        "Begley, \u2018The Myth of the Taj Mahal and a New Theory of its "
        "Symbolic Meaning,\u2019 The Art Bulletin Vol. 61 No. 1 (1979)"
    ),
    characters=[
        "Jean-Baptiste Tavernier (French gem merchant)",
        "Shah Jahan (Emperor)",
        "A.C.L. Carlleyle (British archaeologist)",
        "Aurangzeb (son and usurper)",
        "Ebba Koch (art historian, University of Vienna)",
    ],
    era=(
        "1665 (Tavernier\u2019s visit); 1871 (Carlleyle\u2019s excavation); "
        "1994\u20132006 (archaeological debunking)"
    ),
    readingTimeMinutes=3,
    image="",
    disabled=False,
    thumbnail="",
    coordinates={"lng": Decimal("78.0421"), "lat": Decimal("27.1751")},
    hasAudio=False,
    isFree=True,
    storyCategory="riddles_past",
    updatedAt=NOW,
)


# ═══════════════════════════════════════════════════════════════
# ARABIC (ar)
# Proverb: "الثالثةُ ثابتة" — subverted in paragraph 4
# Register: Modern Arabic storyteller — vivid, direct, warm MSA
# ═══════════════════════════════════════════════════════════════

AR = dict(
    lang="ar",
    langStoryId="ar#black-taj-moonlight-twin",

    title="تاجُ مَحَلّ الأسوَد",

    subtitle="حكايةُ أجمَلِ أُسطورةٍ مِعماريّةٍ لم تكُن يومًا حقيقة",

    excerpt=(
        "في ليلةٍ ساكنةٍ عامَ ١٦٦٥، وقفَ تاجرُ أحجارٍ كريمةٍ فرنسيّ على ضِفافِ نهرِ"
        " يامونا وسَمِعَ حكايةً ستسكُنُ الخيالَ أربعةَ قرون: أنّ شاه جَهان"
        " خطّطَ لبناءِ تاج مَحَلّ ثانٍ — من الرُّخامِ الأسوَد."
    ),

    moralOrLesson=(
        "أكثرُ الأساطيرِ خلودًا ليست تلك التي صَدَقَت، بل تلك التي كانت أجملَ"
        " من أن نتخلّى عنها — وأحيانًا يكونُ انعكاسُ تُحفةٍ في ماءٍ مُعتِم،"
        " مُرتجِفًا وهشًّا، أشدَّ سِحرًا من أيّ صرحٍ تبنيهِ يدُ إنسان."
    ),

    paragraphs=[
        {"text": (
            "في عامِ ١٦٦٥، كانَ رجلٌ فرنسيّ اسمُهُ جان باتيست تافيرنييه يقفُ على"
            " ضِفّةِ نهرِ يامونا في أَغرا. تاجرُ أحجارٍ كريمةٍ طافَ العالَمَ ستّ"
            " مرّاتٍ بحثًا عن الألماس، وشقَّ طريقَهُ إلى بلاطِ المغول بفضلِ لسانِهِ"
            " وجرأتِه. هناك سمعَ ما سيُطاردُ العالَمَ قرونًا: الإمبراطورُ شاه جَهان"
            " لم يبنِ تاجَ مَحَلّ الأبيضَ لزوجتِهِ الراحلةِ فحسب — بل خطّطَ لنسخةٍ"
            " ثانيةٍ مُطابقة، من رُخامٍ أسوَدَ بالكامل، على الضِّفّةِ المُقابلة،"
            " تكونُ ضريحَهُ هو."
        )},
        {"text": (
            "نشرَ تافيرنييه ذلك في مُذكّراتِهِ عامَ ١٦٧٦، لكنّ المُفاجأة أنّهُ لم"
            " يذكُرِ الرُّخامَ الأسوَدَ قطّ. كلُّ ما كتبَهُ جُملةٌ واحدة: شاه"
            " جَهان بدأَ ببناءِ ضريحِهِ على الضِّفّةِ الأخرى، لكنّ حربًا بين أبنائِهِ"
            " أوقفَته. هذا كلُّ شيء. على مدى ثلاثةِ قرون، أضافَ الكُتّابُ تفاصيلَ"
            " من خيالِهم: الحَجَرُ الأسوَد، تصميمٌ مِرآويّ، جِسرٌ من فِضّةٍ يصلُ بينَ"
            " الضريحَين. الأسطورةُ صارت أجملَ من أن يجرُؤَ أحدٌ على الشكّ فيها."
        )},
        {"text": (
            "ثمّ في عامِ ١٨٧١، بدا أنّ عالِمَ الآثارِ البريطانيّ كارلايل أثبتَها."
            " كان ينقّبُ في حديقةٍ مهجورةٍ اسمُها 'مِهتاب باغ' — أي 'حديقةُ ضوءِ"
            " القمر' — تقعُ مُباشرةً قبالةَ تاج مَحَلّ عبرَ النهر. تحت طبقاتٍ من"
            " الوحلِ تعودُ لقرون، وجدَ أحجارًا مُسوَدّةً وأساساتٍ تُشبِهُ قاعدةَ"
            " بناءٍ هائل. أعلنَ أنّهُ اكتشفَ تاج مَحَلّ الأسوَد. لقرنٍ كامل، لم"
            " يُراجِعهُ أحد."
        )},
        {"text": (
            "الثالثةُ ثابتة، يقولون — وقد ثبتَت، لكن ليسَ كما توقّعَ أحد. في"
            " التسعينيات، قرّرَ عُلماءُ الآثارِ الهنود أن يَختبِروا الأسطورةَ"
            " بالعِلم. ستُّ سنواتٍ من الحفر، وتسعونَ ألفَ مترٍ مكعّبٍ من التراب."
            " النتيجة؟ تلكَ 'الأحجارُ السوداء' لم تكن سوى رُخامٍ أبيض — الحجرُ"
            " ذاتُهُ الذي بُنيَ منه تاج مَحَلّ — أظلمَتهُ قرونٌ من الفيضاناتِ"
            " والطحالب. لا نُفاياتِ مَحاجِر، لا أنقاض. لا شيءَ يدلُّ على بناءٍ بهذا"
            " الحجم."
        )},
        {"text": (
            "والتاريخُ يُؤكّدُ ذلك. مُؤرّخو بلاطِ شاه جَهان سجّلوا كلَّ صغيرةٍ"
            " وكبيرةٍ بهوَس: الموادّ، الأجور، أعدادُ العمّال. سِجلُّهم الرسميّ"
            " 'بادشاه نامَه' لا يذكرُ ضريحًا ثانيًا بكلمةٍ واحدة. والتوقيتُ مُستحيل:"
            " تاج مَحَلّ لم يكتمِل حتّى نحوِ عام ١٦٥٣، ومَرِضَ شاه جَهان سنةَ"
            " ١٦٥٧، ثمّ انقلبَ عليهِ ابنُهُ أورنكزيب. أربعُ سنواتٍ — لصرحٍ استغرقَ"
            " بناؤُهُ اثنتَين وعشرينَ سنة."
        )},
        {"text": (
            "لكنّ ما كشفَتهُ الحفريّاتُ فعلًا أجملُ من أيّ أسطورة. الحديقةُ بناها"
            " بابُر، مُؤسِّسُ سُلالةِ المغول، وأعادَ شاه جَهان ترميمَها كشُرفةٍ"
            " لتأمّلِ تاج مَحَلّ في ضوءِ القمر. حوضٌ مُثمَّنُ الأضلاع بخمسٍ"
            " وعشرينَ نافورة، تُحيطُ بهِ أزهارٌ لا تتفتّحُ إلّا في الليل. عامَ"
            " ٢٠٠٦، ملأَ الباحثونَ الحوضَ وانتظروا الظلام. ظهرَ تاج مَحَلّ مُنعكِسًا"
            " على صفحةِ الماء — توأمٌ مُرتجِفٌ لا مادّةَ لهُ سوى ضوءِ القمر."
        )},
        {"text": (
            "فلماذا تأبى هذهِ الأسطورةُ أن تموت؟ لأنّنا نُريدُها أن تعيش. قصّةُ"
            " حبٍّ تنتهي بإمبراطورٍ مكسورِ القلبِ يُحدّقُ من نافذةِ سجنِهِ في ضريحٍ"
            " أبيض — تبدو ناقصة. التاجُ الأسوَدُ يُكمِلُ الحكاية: حُبُّهُ كان"
            " أوسعَ من أن يتّسعَ لهُ صرحٌ واحد، ولم يُوقِفهُ إلّا خيانةُ ابنِه."
            " الناسُ يحتاجونَ هذهِ الرواية، لأنّها تُحوّلُ تاج مَحَلّ من نُصبٍ"
            " للفَقدِ إلى نُصبٍ للطموحِ المُستحيل."
        )},
        {"text": (
            "لكنّ الحقيقةَ أجمَل. في لَيالي القمر، كان شاه جَهان — حتّى من سِجنِهِ"
            " في قلعةِ أَغرا — يرى نهرَ يامونا يحوّلُ التاجَ الأبيضَ إلى انعكاسٍ"
            " مُعتِم. شيءٌ لا يُلمَس، ولا يُدخَل، ولا يُمسَك. يظهرُ حين يسكُنُ"
            " الماء ويتلاشى مع أوّلِ موجة. ربّما هذا أصدقُ نُصُبِ الحُزنِ — ليسَ"
            " خالدًا، بل مُرتجِفًا وحيًّا. تاجُ مَحَلّ الأسوَد لم يُبنَ قطّ، لأنّهُ"
            " لم يكُن بحاجةٍ لأن يُبنى. النهرُ كانَ يبنيهِ كلَّ ليلة."
        )},
    ],
)


# ═══════════════════════════════════════════════════════════════
# PERSIAN (fa)
# Proverb: "تا سه نشه، بازی نشه" — subverted in paragraph 4
# Register: Modern Persian storyteller — flowing, engaging, natural
# ═══════════════════════════════════════════════════════════════

FA = dict(
    lang="fa",
    langStoryId="fa#black-taj-moonlight-twin",

    title="تاجِ مَحَلِّ سیاه",

    subtitle="یک جواهرفروشِ فرانسوی، یک باستان\u200cشناسِ انگلیسی، و افسانه\u200cای معماری که هرگز واقعیت نداشت",

    excerpt=(
        "شبی ساکت در سالِ ۱۶۶۵، جواهرفروشی فرانسوی کنارِ رودِ یامونا ایستاد و"
        " داستانی شنید که چهار قرن ذهنِ دنیا را درگیر کرد: شاه\u200cجهان نقشه\u200cی تاجِ"
        " مَحَلِّ دومی داشت — از مرمرِ سیاه."
    ),

    moralOrLesson=(
        "ماندگارترین افسانه\u200cها آن\u200cهایی نیستند که راست بودند، بلکه آن\u200cهایی\u200cاند"
        " که زیباتر از آن بودند که رهایشان کنیم — و گاهی انعکاسِ یک شاهکار"
        " در آبِ تاریک، لرزان و شکننده، جادویی\u200cتر از هر بنایی است که دستِ انسان"
        " بسازد."
    ),

    paragraphs=[
        {"text": (
            "سالِ ۱۶۶۵ میلادی. مردی فرانسوی به نامِ ژان باتیست تاوِرنیه کنارِ رودِ"
            " یامونا در آگرا ایستاده بود — جواهرفروشی که شش بار دورِ دنیا گشته بود"
            " دنبالِ الماس و با زبان\u200cبازی راهش را به دربارِ مغول باز کرده بود. آنجا"
            " چیزی شنید که قرن\u200cها ذهنِ دنیا را مشغول کرد: شاه\u200cجهان فقط تاجِ محلِ"
            " سفید را برای همسرِ از دست رفته\u200cاش نساخته بود. نقشه\u200cی یک نسخه\u200cی دوم هم"
            " داشت — عینِ اولی، ولی از مرمرِ سیاه — برای آرامگاهِ خودش، آن سویِ"
            " رودخانه."
        )},
        {"text": (
            "تاوِرنیه این را سالِ ۱۶۷۶ در خاطراتش نوشت، ولی نکته\u200cی جالب اینجاست:"
            " از مرمرِ سیاه یک کلمه هم نگفت. تمامِ حرفش یک جمله بود: شاه\u200cجهان ساختِ"
            " آرامگاهِ خودش را آن طرفِ رود شروع کرده بود، ولی جنگِ بینِ پسرهایش"
            " همه\u200cچیز را متوقف کرد. همین. طیِّ سه قرن، نویسنده\u200cها ذرّه\u200cذرّه چیز"
            " اضافه کردند: سنگِ سیاه، طراحیِ آینه\u200cای، پُلی از نقره بینِ دو آرامگاه."
            " افسانه آن\u200cقدر قشنگ شد که دیگر کسی زحمتِ شک کردن به خودش نداد."
        )},
        {"text": (
            "بعد سالِ ۱۸۷۱، یک باستان\u200cشناسِ انگلیسی به نامِ کارلایل انگار مُهرِ"
            " تأیید را زد. داشت در باغی ویرانه به نامِ مَهتاب باغ — یعنی «باغِ"
            " مهتاب» — حفّاری می\u200cکرد، درست روبه\u200cرویِ تاجِ محل، آن طرفِ رود. زیرِ"
            " قرن\u200cها گِل\u200cولای، سنگ\u200cهای سیاه\u200cشده و پایه\u200cهای بنایی عظیم پیدا کرد."
            " اعلام کرد تاجِ محلِ سیاه را کشف کرده. یک قرنِ تمام، کسی حرفش را زیرِ"
            " سؤال نبرد."
        )},
        {"text": (
            "می\u200cگویند تا سه نشه، بازی نشه. خُب، سه شد: تاوِرنیه شایعه را ساخت،"
            " نویسنده\u200cها رنگ\u200cولعابش دادند، کارلایل «ثابتش» کرد. ولی در دهه\u200cی نودِ"
            " میلادی، باستان\u200cشناسانِ هندی بازیِ واقعی را شروع کردند. شش سال حفّاری،"
            " نود هزار مترمکعّبِ خاک. و نتیجه؟ آن «سنگ\u200cهای سیاه» مرمرِ سفید بودند"
            " — همان سنگِ خودِ تاجِ محل — که قرن\u200cها سیل و خزه سیاهشان کرده بود. نه"
            " ضایعاتِ معدن، نه آوار، نه هیچ\u200cچیزی که از بنایی به آن عظمت انتظار برود."
        )},
        {"text": (
            "سَندهای تاریخی هم همین را می\u200cگویند. تاریخ\u200cنویس\u200cهای دربارِ شاه\u200cجهان با"
            " وسواس همه\u200cچیز را ثبت می\u200cکردند: مصالح، دستمزد، تعدادِ کارگرها. کتابِ"
            " «پادشاه\u200cنامه» — سَندِ رسمی\u200cشان — یک کلمه درباره\u200cی آرامگاهِ دوم ندارد."
            " زمان\u200cبندی هم محال بود: تاجِ محل تا حدودِ ۱۶۵۳ تمام نشد، شاه\u200cجهان سالِ"
            " ۱۶۵۷ بیمار شد، و بلافاصله پسرش اورنگ\u200cزیب کودتا کرد. چهار سال مانده"
            " بود — برای بنایی که ساختنش بیست\u200cودو سال طول کشیده بود."
        )},
        {"text": (
            "ولی آنچه واقعاً در مَهتاب باغ پیدا شد، از هر افسانه\u200cای شاعرانه\u200cتر بود."
            " باغ را بابُر — بنیان\u200cگذارِ سلسله\u200cی مغول — ساخته بود و شاه\u200cجهان"
            " بازسازی\u200cاش کرده بود: سکّویی برای تماشای تاجِ محل در نورِ ماه. حوضی"
            " هشت\u200cضلعی با بیست\u200cوپنج فوّاره، و دورتادورش پُر از گل\u200cهایی که فقط شب باز"
            " می\u200cشدند. سالِ ۲۰۰۶، محقّقان حوض را پُر از آب کردند و صبر کردند تا هوا"
            " تاریک شود. تاجِ محل در آبِ ساکن ظاهر شد — یک همزادِ لرزان، ساخته\u200cشده"
            " از هیچ\u200cچیز جز نورِ ماه."
        )},
        {"text": (
            "پس چرا این افسانه حاضر نیست بمیرد؟ چون ما بهش احتیاج داریم. داستانِ"
            " عاشقانه\u200cای که با امپراتوری دل\u200cشکسته تمام شود — که از پنجره\u200cی زندانش به"
            " آرامگاهی سفید خیره مانده باشد — انگار ناتمام است. تاجِ محلِ سیاه قصّه"
            " را کامل می\u200cکند: عشقش آن\u200cقدر بزرگ بود که در یک بنا جا نمی\u200cشد، و فقط"
            " خیانتِ پسرش جلوش را گرفت. آدم\u200cها به این روایت نیاز دارند — چون تاجِ"
            " محل را از یادبودِ فقدان به یادبودِ جاه\u200cطلبیِ محال تبدیل می\u200cکند."
        )},
        {"text": (
            "ولی حقیقت قشنگ\u200cتر است. شب\u200cهای مهتابی، شاه\u200cجهان — حتّی از زندانش در"
            " قلعه\u200cی آگرا — می\u200cتوانست ببیند که رودِ یامونا تاجِ سفید را به انعکاسی"
            " تاریک بدل می\u200cکند. چیزی که نمی\u200cشود لمسش کرد، واردش شد، نگهش داشت."
            " وقتی آب آرام است پیدا می\u200cشود، با اوّلین موج محو می\u200cشود. شاید صادق\u200cترین"
            " یادبودِ غم همین باشد — نه ابدی، بلکه لرزان و زنده. تاجِ محلِ سیاه"
            " ساخته نشد، چون نیازی به ساختنش نبود. رودخانه هر شب می\u200cساختش."
        )},
    ],
)


# ═══════════════════════════════════════════════════════════════
# TURKISH (tr)
# Proverb: "Yalancının mumu yatsıya kadar yanar" — subverted in paragraph 4
# Register: Modern Turkish storyteller — clean, vivid, natural word order
# ═══════════════════════════════════════════════════════════════

TR = dict(
    lang="tr",
    langStoryId="tr#black-taj-moonlight-twin",

    title="Kara Tac Mahal",

    subtitle=(
        "Bir Frans\u0131z m\u00fccevhercinin dedikodusu, bir \u0130ngiliz "
        "arkeolo\u011fun yan\u0131lg\u0131s\u0131 ve mimarl\u0131k tarihinin "
        "en g\u00fczel yalan\u0131"
    ),

    excerpt=(
        "1665\u2019te durgun bir gecede, Frans\u0131z bir m\u00fccevher"
        " t\u00fcccari Yamuna Nehri k\u0131y\u0131s\u0131nda durdu ve d\u00f6rt"
        " y\u00fczy\u0131l boyunca d\u00fcnyay\u0131 pe\u015finden"
        " s\u00fcr\u00fckleyecek bir hik\u00e2ye duydu: \u015eah Cihan, ikinci"
        " bir Tac Mahal yapmay\u0131 planlam\u0131\u015ft\u0131 \u2014 kara"
        " mermerden."
    ),

    moralOrLesson=(
        "En kal\u0131c\u0131 efsaneler ger\u00e7ek olanlar de\u011fil,"
        " vazge\u00e7ilemeyecek kadar g\u00fczel olanlard\u0131r \u2014 ve"
        " bazen bir \u015faheserin karanl\u0131k suda titreyen yans\u0131mas\u0131,"
        " insan elinin in\u015fa edebilece\u011fi her yap\u0131dan daha"
        " b\u00fcy\u00fcleyicidir."
    ),

    paragraphs=[
        {"text": (
            "Y\u0131l 1665. Jean-Baptiste Tavernier ad\u0131nda Frans\u0131z"
            " bir m\u00fccevher t\u00fcccar\u0131, Agra\u2019da Yamuna Nehri"
            " k\u0131y\u0131s\u0131nda duruyordu. Alt\u0131 kez d\u00fcnyay\u0131"
            " dola\u015fm\u0131\u015f, elmas pe\u015finde k\u0131talar"
            " a\u015fm\u0131\u015f, diliyle Bab\u00fcr saray\u0131n\u0131n"
            " kap\u0131lar\u0131n\u0131 a\u00e7m\u0131\u015f bir adamd\u0131."
            " \u0130\u015fte orada, y\u00fczy\u0131llarca s\u00fcrecek bir"
            " hik\u00e2yeyi ilk kez duydu: \u0130mparator \u015eah Cihan,"
            " \u00f6len kar\u0131s\u0131 i\u00e7in yapt\u0131rd\u0131\u011f\u0131"
            " beyaz mermer Tac Mahal\u2019le yetinmemi\u015fti. Nehrin kar\u015f\u0131"
            " k\u0131y\u0131s\u0131na, tamamen kara mermerden, kendi t\u00fcrbesi"
            " olacak ikinci bir Tac Mahal daha planl\u0131yordu."
        )},
        {"text": (
            "Tavernier bunu 1676\u2019da yay\u0131mlad\u0131\u011f\u0131"
            " hat\u0131rat\u0131na yazd\u0131 \u2014 ama as\u0131l mesele"
            " \u015fu: kara mermerden tek kelime etmedi. Yazd\u0131\u011f\u0131"
            " her \u015fey tek bir c\u00fcmleydi: \u015eah Cihan nehrin"
            " kar\u015f\u0131s\u0131nda kendi t\u00fcrbesini in\u015fa etmeye"
            " ba\u015flam\u0131\u015ft\u0131, o\u011fullar\u0131"
            " aras\u0131ndaki sava\u015f her \u015feyi durdurmu\u015ftu."
            " Hepsi bu kadar. \u00dc\u00e7 y\u00fcz y\u0131l boyunca yazarlar"
            " olmayan detaylar\u0131 bir bir ekledi: kara ta\u015f, ayna"
            " simetrisiyle bir tasar\u0131m, iki t\u00fcrbeyi birle\u015ftiren"
            " g\u00fcm\u00fc\u015f bir k\u00f6pr\u00fc. Efsane o kadar"
            " g\u00fczelle\u015fti ki kimse sorgulamay\u0131 ak\u0131l edemedi."
        )},
        {"text": (
            "Derken 1871\u2019de \u0130ngiliz arkeolog Carlleyle efsaneyi"
            " kan\u0131tlam\u0131\u015f gibi g\u00f6r\u00fcnd\u00fc. Tac"
            " Mahal\u2019in tam kar\u015f\u0131s\u0131nda, nehrin \u00f6b\u00fcr"
            " yakas\u0131nda \u2018Mehtab Ba\u011f\u2019 \u2014 yani \u2018Ay"
            " I\u015f\u0131\u011f\u0131 Bah\u00e7esi\u2019 \u2014 adl\u0131"
            " harap bir bah\u00e7ede kaz\u0131 yap\u0131yordu."
            " Y\u00fczy\u0131ll\u0131k \u00e7amurun alt\u0131ndan"
            " kararm\u0131\u015f ta\u015flar ve devasa bir yap\u0131n\u0131n"
            " temelleri \u00e7\u0131kt\u0131. Kara Tac Mahal\u2019i"
            " buldu\u011funu ilan etti. Tam bir as\u0131r boyunca kimse buna"
            " itiraz etmedi."
        )},
        {"text": (
            "Yalanc\u0131n\u0131n mumu yats\u0131ya kadar yanar, derler"
            " \u2014 ama bu efsanenin mumu tam \u00fc\u00e7 y\u00fczy\u0131l"
            " yand\u0131. 1990\u2019larda Hindistan Arkeoloji Kurumu nihayet"
            " efsaneyi s\u0131nad\u0131. Alt\u0131 y\u0131l kazd\u0131lar,"
            " doksan bin metrek\u00fcp toprak kald\u0131rd\u0131lar. Sonu\u00e7"
            " efsaneyi yerle bir etti: o \u2018kara ta\u015flar\u2019 asl\u0131nda"
            " beyaz mermerdi \u2014 Tac Mahal\u2019in kendi ta\u015f\u0131n\u0131n"
            " ayn\u0131s\u0131 \u2014 y\u00fczy\u0131llarca sel ve yosunla"
            " kararm\u0131\u015ft\u0131. Laboratuvar testleri do\u011frulad\u0131."
            " Ne ta\u015f oca\u011f\u0131 at\u0131\u011f\u0131 vard\u0131 ne"
            " moloz. O b\u00fcy\u00fckl\u00fckte bir yap\u0131dan beklenen"
            " hi\u00e7bir \u015fey yoktu."
        )},
        {"text": (
            "Tarih\u00ee kay\u0131tlar da bunu destekliyordu. \u015eah"
            " Cihan\u2019\u0131n saray tarih\u00e7ileri her \u015feyi"
            " tak\u0131nt\u0131l\u0131 bir titizlikle not etmi\u015flerdi:"
            " malzemeler, \u00fccretler, i\u015f\u00e7i say\u0131lar\u0131."
            " Resm\u00ee kay\u0131tlar\u0131 olan Padi\u015fahname\u2019de"
            " ikinci bir t\u00fcrbeden tek s\u00f6z edilmiyordu. Zamanlama da"
            " zaten imk\u00e2ns\u0131zd\u0131: Tac Mahal ancak 1653"
            " civar\u0131nda bitmi\u015fti, \u015eah Cihan 1657\u2019de"
            " hastaland\u0131, hemen ard\u0131ndan o\u011flu Evrengzib"
            " taht\u0131 ele ge\u00e7irdi. Geriye d\u00f6rt y\u0131l"
            " kal\u0131yordu \u2014 yirmi iki y\u0131lda tamamlanm\u0131\u015f"
            " bir an\u0131t i\u00e7in."
        )},
        {"text": (
            "Ama Mehtab Ba\u011f\u2019da ger\u00e7ekte bulunan \u015fey her"
            " efsaneden daha \u015fiirseldi. Bah\u00e7eyi Bab\u00fcr"
            " \u0130mparatorlu\u011fu\u2019nun kurucusu Bab\u00fcr"
            " yapt\u0131rm\u0131\u015f, \u015eah Cihan onu ay"
            " \u0131\u015f\u0131\u011f\u0131nda Tac Mahal\u2019i seyretmek"
            " i\u00e7in yeniden d\u00fczenletmi\u015fti. Sekizgen bir havuz,"
            " yirmi be\u015f f\u0131skiye ve yaln\u0131zca geceleri a\u00e7an"
            " \u00e7i\u00e7eklerle \u00e7evriliydi. 2006\u2019da"
            " ara\u015ft\u0131rmac\u0131lar havuzu doldurup"
            " karanl\u0131\u011f\u0131 bekledi. Tac Mahal durgun suda belirdi"
            " \u2014 ay \u0131\u015f\u0131\u011f\u0131ndan yap\u0131lm\u0131\u015f,"
            " titreyen bir ikiz."
        )},
        {"text": (
            "Peki efsane neden h\u00e2l\u00e2 \u00f6lm\u00fcyor?"
            " \u00c7\u00fcnk\u00fc ona ihtiyac\u0131m\u0131z var. Kalbi"
            " k\u0131r\u0131k bir imparatorun hapishane penceresinden beyaz bir"
            " t\u00fcrbeye bakt\u0131\u011f\u0131 bir a\u015fk hik\u00e2yesi"
            " eksik hissettiriyor. Kara Tac Mahal hik\u00e2yeyi"
            " tamaml\u0131yor: a\u015fk\u0131 tek bir an\u0131ta"
            " s\u0131\u011fmayacak kadar b\u00fcy\u00fckt\u00fc, ancak"
            " o\u011flunun ihaneti onu durdurabildi. \u0130nsanlar bu"
            " anlat\u0131ya ihtiya\u00e7 duyuyor \u2014 \u00e7\u00fcnk\u00fc"
            " Tac Mahal\u2019i bir kay\u0131p an\u0131t\u0131ndan"
            " imk\u00e2ns\u0131z bir tutkunun simgesine"
            " d\u00f6n\u00fc\u015ft\u00fcr\u00fcyor."
        )},
        {"text": (
            "Ama ger\u00e7ek daha g\u00fczel. Mehtapl\u0131 gecelerde"
            " \u015eah Cihan \u2014 Agra Kalesi\u2019ndeki h\u00fccresinden"
            " bile \u2014 Yamuna\u2019n\u0131n beyaz Tac Mahal\u2019i"
            " karanl\u0131k bir yans\u0131maya"
            " d\u00f6n\u00fc\u015ft\u00fcrd\u00fc\u011f\u00fcn\u00fc"
            " izleyebiliyordu. Dokunamazs\u0131n, giremezsin, tutamazs\u0131n."
            " Su durgunken belirir, ilk dalgayla kaybolur. Belki de yas\u0131n"
            " en ger\u00e7ek an\u0131t\u0131 budur \u2014 kal\u0131c\u0131"
            " de\u011fil, titreyen ve canl\u0131. Kara Tac Mahal hi\u00e7"
            " yap\u0131lmad\u0131, \u00e7\u00fcnk\u00fc"
            " yap\u0131lmas\u0131na hi\u00e7 gerek yoktu. Onu her gece nehir"
            " in\u015fa ediyordu."
        )},
    ],
)


# ═══════════════════════════════════════════════════════════════
# VALIDATION & PUSH
# ═══════════════════════════════════════════════════════════════

def validate_story(story: dict, lang: str) -> list[str]:
    """Validate constraints before pushing."""
    errors = []
    for field in ("title", "subtitle", "excerpt", "moralOrLesson"):
        if not story.get(field):
            errors.append(f"[{lang}] Missing field: {field}")

    paragraphs = story.get("paragraphs", [])
    if not (6 <= len(paragraphs) <= 10):
        errors.append(f"[{lang}] Paragraph count {len(paragraphs)} outside 6-10 range")

    total_chars = 0
    for i, p in enumerate(paragraphs):
        text = p["text"]
        char_count = len(text)
        word_count = len(text.split())
        total_chars += char_count
        if char_count > 600:
            errors.append(f"[{lang}] P{i+1}: {char_count} chars exceeds 600 limit")
        if word_count > 120:
            errors.append(f"[{lang}] P{i+1}: {word_count} words exceeds 120 limit")

    if total_chars < 1800 or total_chars > 4500:
        errors.append(f"[{lang}] Total chars {total_chars} outside acceptable range")

    return errors


def build_item(story_data: dict) -> dict:
    """Merge story-specific data with shared fields into a DynamoDB item."""
    item = dict(SHARED)
    item.update(story_data)
    return item


def main():
    stories = [
        ("ar", "Arabic", AR),
        ("fa", "Persian", FA),
        ("tr", "Turkish", TR),
    ]

    # Validation pass
    all_errors = []
    for lang, name, data in stories:
        print(f"\n{'='*60}")
        print(f"VALIDATING {name} ({lang})")
        print(f"{'='*60}")

        paragraphs = data["paragraphs"]
        total_chars = 0
        for i, p in enumerate(paragraphs):
            text = p["text"]
            cc = len(text)
            wc = len(text.split())
            total_chars += cc
            print(f"  P{i+1}: {cc} chars, {wc} words")

        print(f"  TOTAL: {total_chars} chars, {len(paragraphs)} paragraphs")
        print(f"  Title: {data['title']}")
        print(f"  Proverb line present: ", end="")
        p4 = data["paragraphs"][3]["text"]
        if lang == "ar":
            print("YES" if "\u0627\u0644\u062b\u0627\u0644\u062b\u0629" in p4 else "NO")
        elif lang == "fa":
            print("YES" if "\u0633\u0647 \u0646\u0634\u0647" in p4 else "NO")
        elif lang == "tr":
            yalanc = "Yalanc\u0131n\u0131n mumu"
            print("YES" if yalanc in p4 else "NO")

        errors = validate_story(data, lang)
        if errors:
            all_errors.extend(errors)
            for e in errors:
                print(f"  ERROR: {e}")
        else:
            print(f"  ALL VALIDATIONS PASSED")

    if all_errors:
        print(f"\n{'='*60}")
        print(f"VALIDATION FAILED - {len(all_errors)} error(s)")
        for e in all_errors:
            print(f"  {e}")
        sys.exit(1)

    # JSON serialization test
    print(f"\n{'='*60}")
    print("JSON SERIALIZATION TEST")
    print(f"{'='*60}")
    for lang, name, data in stories:
        try:
            item = build_item(data)
            json.dumps(item, ensure_ascii=False, default=str)
            print(f"  {name} JSON valid")
        except Exception as e:
            print(f"  {name} JSON error: {e}")
            sys.exit(1)

    # Push to DynamoDB
    for lang, name, data in stories:
        print(f"\n{'='*60}")
        print(f"PUSHING {name} ({lang})")
        print(f"{'='*60}")
        item = build_item(data)
        try:
            response = table.put_item(Item=item)
            http_code = response["ResponseMetadata"]["HTTPStatusCode"]
            if http_code == 200:
                print(f"  {name} pushed successfully (HTTP {http_code})")
                print(f"    langStoryId: {data['langStoryId']}")
            else:
                print(f"  {name} unexpected status: HTTP {http_code}")
                print(f"    Response: {json.dumps(response, default=str)}")
                sys.exit(1)
        except Exception as e:
            print(f"  {name} push FAILED: {e}")
            sys.exit(1)

    # Verify all records exist
    print(f"\n{'='*60}")
    print("VERIFICATION - Reading back all records")
    print(f"{'='*60}")
    for lang, name, data in stories:
        try:
            resp = table.get_item(
                Key={"siteId": SITE_ID, "langStoryId": data["langStoryId"]}
            )
            if "Item" in resp:
                item = resp["Item"]
                print(f"  {name}: title=\"{item['title']}\", paragraphs={len(item['paragraphs'])}")
            else:
                print(f"  {name}: Record NOT FOUND after push!")
                sys.exit(1)
        except Exception as e:
            print(f"  {name} verification failed: {e}")
            sys.exit(1)

    print(f"\n{'='*60}")
    print("ALL DONE - 3 stories pushed and verified successfully")
    print(f"  updatedAt: {NOW}")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
