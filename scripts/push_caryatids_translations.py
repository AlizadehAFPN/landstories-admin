#!/usr/bin/env python3
"""
Push Arabic, Persian, and Turkish versions of the Caryatids story to DynamoDB.
Each version is a native recreation — not a translation.
"""

import json
import os
import subprocess
import sys
import time

TABLE_NAME = "Story"
REGION = "eu-north-1"
TIMESTAMP = str(int(time.time()))

# ─────────────────────────────────────────────
# Shared fields (unchanged from English record)
# ─────────────────────────────────────────────
SHARED = {
    "siteId": {"S": "acropolis-athens"},
    "storyId": {"S": "caryatids"},
    "icon": {"S": "\U0001f469"},
    "tier": {"S": "A"},
    "source": {"S": "Vitruvius\u2019s De Architectura, Pausanias\u2019s Description of Greece, modern archaeological analysis"},
    "characters": {"L": [
        {"S": "The Six Caryatids"},
        {"S": "The women of Caryae"},
        {"S": "Alkamenes (possible sculptor)"}
    ]},
    "era": {"S": "421-406 BCE (Erechtheion construction)"},
    "readingTimeMinutes": {"N": "3"},
    "image": {"S": ""},
    "updatedAt": {"N": TIMESTAMP},
    "disabled": {"BOOL": False},
    "thumbnail": {"S": ""},
    "coordinates": {"M": {
        "lng": {"N": "23.7263"},
        "lat": {"N": "37.9722"}
    }},
    "hasAudio": {"BOOL": False},
    "isFree": {"BOOL": True},
    "storyCategory": {"S": "lost_found"},
}


def make_paragraphs(texts):
    return {"L": [{"M": {"text": {"S": t}}} for t in texts]}


# ══════════════════════════════════════════════
# ARABIC (ar)
# ══════════════════════════════════════════════
# Proverb: رُبَّ ضارّةٍ نافِعَة (Sometimes what harms you benefits you)
# Subverted in final paragraph: the Caryatids proved something deeper —
# beauty doesn't just survive punishment, it makes you forget
# punishment was ever the point.

ar_title = "حامِلاتُ السَّماء"
ar_subtitle = "نِساءُ كارياي اللَّواتي صِرنَ حَجَرًا"
ar_excerpt = (
    "فوقَ هضبةِ الأكروبوليس في أثينا، تقفُ ستُّ نساءٍ منذ خمسةٍ وعشرينَ قرنًا."
    " لسنَ تماثيلَ تُزيِّن ركنًا في متحف — بل أعمدةٌ حقيقيّة تحملُ سقفَ معبدٍ"
    " على رؤوسهنّ. أجسادُهنّ هي البناءُ ذاته."
)
ar_moral = (
    "الجمالُ قادرٌ على أن يُحوِّلَ العقوبةَ إلى نِعمَة."
    " نُحِتَت الكارياتيد لتخليدِ العار، فصِرنَ رمزًا أبديًّا للقوّة والرَّشاقة."
)

ar_paragraphs = [
    # 1 — Hook
    (
        "فوقَ هضبةِ الأكروبوليس في أثينا، تقفُ ستُّ نساءٍ منذ خمسةٍ وعشرينَ قرنًا."
        " لسنَ تماثيلَ تُزيِّن ركنًا في متحف — بل أعمدةٌ حقيقيّة تحملُ سقفَ معبدٍ"
        " على رؤوسهنّ. أجسادُهنّ هي البناءُ ذاته. يسمّونهنّ «الكارياتيد»، وهنّ"
        " أشهرُ منحوتاتِ معبدِ الإرِكثيون. كيف انتهى بهنّ الأمرُ هنا؟"
        " تلك قصّةُ حربٍ وخيانة — وجمالٍ وُلِدَ من رَحِمِ العار."
    ),
    # 2 — Punishment origin (Vitruvius)
    (
        "في عامِ ٤٨٠ قبل الميلاد، غزا الجيشُ الفارسيُّ بلادَ الإغريق."
        " وقفت معظمُ المدن في وجه الغزو، إلّا بلدةً صغيرة اسمُها «كارياي»"
        " في جنوب البلوبونيز — وقفت مع الفُرس. حين انتصرت اليونان، جاء الحساب:"
        " قُتِلَ رجالُ كارياي واستُعبِدَت نساؤها. ثمّ نحتَ الأثينيّون تلك النساءَ"
        " أعمدةً حجريّة — محكومًا عليهنّ بحملِ سقفٍ إلى الأبد."
        " هكذا روى المعماريُّ الرومانيُّ فيتروفيوس القصّة، بعد نحو أربعمئة عام."
    ),
    # 3 — Devotion theory (Arrephoroi)
    (
        "لكنّ هناك روايةً أخرى — تكاد تكون نقيضَها. يرى بعضُ المؤرّخين أنّ"
        " الكارياتيد يُمثّلنَ «الأرِّيفوروي»: فتياتٌ مراهِقات من أعرَقِ عائلات"
        " أثينا، كُنَّ يُختَرنَ للإقامة عامًا كاملًا فوقَ الأكروبوليس لخدمةِ الإلهة"
        " أثينا. مهمّتُهنّ كانت نَسجَ رداءٍ مقدَّسٍ يُقدَّم في أكبرِ احتفالٍ دينيّ"
        " بالمدينة. تأمّل وقفتَهنّ: ظهرٌ مستقيم، هدوءٌ عميق، وقدمٌ متقدّمة كأنّهنّ"
        " يَمشينَ في موكبٍ مهيب. هذا تكريمٌ، لا عقاب."
    ),
    # 4 — Engineering marvel
    (
        "أيًّا كانت الحقيقة، فمن صمّمَ هذه الأعمدة صنعَ شيئًا لم يسبقهُ إليه أحد:"
        " استبدلَ أعمدةَ الحجر الصمّاء بأجسادٍ بشريّة — وجعلها تعملُ فعلًا."
        " كلُّ امرأةٍ تختلف عن أخواتها: مَيلةُ رأسٍ هنا، انحناءةُ وِركٍ هناك،"
        " وثنياتُ رداءٍ لا تتكرّر. لكنّ ضفائرَهنّ السميكة ليست زينةً فحسب —"
        " بل تُقوّي الرقبةَ حيثُ يرتكزُ الثِّقل. وطيّاتُ الثوب تُحاكي أخاديدَ"
        " العمود التقليديّ. يحملنَ سقفًا حقيقيًّا، وكأنّه لا يزنُ شيئًا."
    ),
    # 5 — Modern fate / Lord Elgin
    (
        "اليوم، تقفُ خمسٌ من الكارياتيد الأصليّات في متحف الأكروبوليس، بعيدًا عن"
        " تلوّث أثينا. أمّا السادسة، فأخذها اللورد إلغين عام ١٨٠٣ — دبلوماسيٌّ"
        " بريطانيٌّ شحنَ قِطَعًا ضخمة من الأكروبوليس إلى إنجلترا. منذ ذلك الحين"
        " وهي في المتحف البريطانيّ، تفصلُها عن أخواتِها ألفا كيلومتر وقرنانِ من"
        " الجدل. على شُرفة الإرِكثيون، تقفُ نُسَخٌ بديلة. والمكانُ الفارغ حيث"
        " وقفت السادسة ربّما يكون أبلغَ لافتةِ احتجاجٍ في التاريخ."
    ),
    # 6 — Legacy + proverb (رُبَّ ضارّةٍ نافِعَة)
    (
        "خمسةٌ وعشرون قرنًا من حروبٍ وإمبراطوريّات، من مسيحيّةٍ وحكمٍ عثمانيّ"
        " وتلوّثٍ حديث — وهنّ ما زِلنَ واقفات. نُحِتنَ ليتذكّرَ الناسُ خيانةً"
        " قديمة، لكنّ المعنى انقلبَ في مكانٍ ما على طول الطريق. لا أحدَ يزورُهنّ"
        " اليوم ليفكّر في عار كارياي. يأتون لأنّ ستَّ نساءٍ من حجرٍ يَبدونَ أكثرَ"
        " حياةً من كثيرٍ ممّا هو حيّ. يقولون «رُبَّ ضارّةٍ نافِعَة» — والكارياتيد"
        " أثبتنَ ما هو أبعد: الجمالُ لا ينجو من العقوبة فحسب، بل يجعلُكَ"
        " تنسى أنّ العقوبة كانت يومًا هي القصد."
    ),
]


# ══════════════════════════════════════════════
# PERSIAN (fa)
# ══════════════════════════════════════════════
# Proverb: این نیز بگذرد (This too shall pass) — attributed to Persian origin.
# Subverted: "They said 'this too shall pass' — but these six women refused to pass."

fa_title = "شش زن، یک آسمان"
fa_subtitle = "زنانِ کاریای که ستونِ آسمان شدند"
fa_excerpt = (
    "بالای تپه\u200cی آکروپولیس در آتن، شش زن ایستاده\u200cاند — بیست\u200cوپنج قرن"
    " است که تکان نخورده\u200cاند. مجسمه\u200cی تزئینی نیستند؛ ستونِ واقعی\u200cاند."
    " سرشان سقف را نگه داشته. بدنشان خودِ معماری است."
)
fa_moral = (
    "زیبایی این توان را دارد که تنبیه را به لطف تبدیل کند."
    " کاریاتیدها تراشیده شدند تا نشانِ شرمساری باشند، اما به نمادی ابدی"
    " از قدرت و ظرافت تبدیل شدند."
)

fa_paragraphs = [
    # 1 — Hook
    (
        "بالای تپه\u200cی آکروپولیس در آتن، شش زن ایستاده\u200cاند — بیست\u200cوپنج"
        " قرن است که تکان نخورده\u200cاند. مجسمه\u200cی تزئینی نیستند؛ ستونِ واقعی\u200cاند."
        " سرشان سقف را نگه داشته. بدنشان خودِ معماری است. اسمشان «کاریاتید» است،"
        " ستون\u200cهای معبد اِرِکتئیون در آکروپولیس. و داستانشان، داستانِ جنگ و"
        " خیانت است — و زیبایی\u200cای که از دلِ شرمساری زاده شد."
    ),
    # 2 — Punishment origin
    (
        "سال ۴۸۰ پیش از میلاد. سپاهِ ایران به یونان حمله کرد. بیشترِ شهرها مقاومت"
        " کردند، اما شهرِ کوچکِ «کاریای» در جنوبِ پِلوپونِز طرفِ ایرانی\u200cها را"
        " گرفت. وقتی یونانی\u200cها پیروز شدند، وقتِ حساب\u200cوکتاب رسید: مردانِ"
        " کاریای کشته شدند و زنانشان به بردگی رفتند. اما مجازات همین\u200cجا تمام"
        " نشد. آتنی\u200cها تصویرِ آن زنان را به شکلِ ستون تراشیدند — محکوم به"
        " نگه\u200c\u200cداشتنِ سقفی ابدی. این روایتِ «ویتروویوس»، معمارِ رومی،"
        " است که حدودِ چهارصد سال بعد نوشته شد."
    ),
    # 3 — Devotion theory
    (
        "اما یک روایتِ دیگر هم هست، تقریباً برعکسِ اولی. بعضی مورّخان می\u200cگویند"
        " کاریاتیدها نمادِ «آرِفوروی» هستند: دخترانِ نوجوانی از خانواده\u200cهای"
        " بزرگِ آتن که یک سالِ تمام روی تپه\u200cی آکروپولیس زندگی می\u200cکردند و"
        " در خدمتِ الهه\u200cی آتِنا بودند. کارشان بافتنِ ردایی مقدّس بود که در"
        " بزرگ\u200cترین جشنِ مذهبیِ شهر تقدیم می\u200cشد. به ایستادنشان نگاه کن:"
        " کمرِ صاف، آرامشِ عمیق، یک پا جلوتر — انگار در مراسمی باشکوه قدم"
        " برمی\u200cدارند. این تکریم است، نه تنبیه."
    ),
    # 4 — Engineering
    (
        "هرکسی که این ستون\u200cها را طراحی کرد، کاری کرد که تا آن روز سابقه"
        " نداشت: ستون\u200cهای ساده\u200cی سنگی را برداشت و جایشان پیکرِ انسان"
        " گذاشت — و واقعاً هم کار می\u200cکنند. هر زن با بقیه فرق دارد: یکی سرش"
        " را کمی کج کرده، یکی لگنش جابه\u200cجا شده، چین\u200cهای لباسش با"
        " هیچ\u200cکدام یکی نیست. اما آن موهای بافته\u200cشده فقط مُد نیست — گردن"
        " را دقیقاً جایی که وزن می\u200cنشیند تقویت می\u200cکند. و چین\u200cهای"
        " پارچه شیارهای ستونِ معمولی را تقلید می\u200cکنند. بارِ واقعی حمل"
        " می\u200cکنند — اما انگار هیچ زحمتی نیست."
    ),
    # 5 — Modern fate / Elgin
    (
        "امروز پنج\u200cتا از شش کاریاتیدِ اصلی در موزه\u200cی آکروپولیس هستند،"
        " دور از آلودگیِ هوای آتن. ششمی را سال ۱۸۰۳ لُرد اِلگین — یک دیپلماتِ"
        " بریتانیایی — بُرد. تکّه\u200cهای بزرگی از آکروپولیس را بار کشتی کرد و"
        " فرستاد لندن. آن خواهرِ ششم از آن روز تا حالا در موزه\u200cی بریتانیا"
        " مانده — دوهزار و پانصد کیلومتر و دو قرن جَدَل از بقیه فاصله دارد. روی"
        " ایوانِ اِرِکتئیون حالا کُپی\u200cها ایستاده\u200cاند. و جایِ خالیِ آن"
        " خواهرِ غایب، شاید باشکوه\u200cترین اعتراضِ بی\u200cصدای دنیا باشد."
    ),
    # 6 — Legacy + proverb (این نیز بگذرد)
    (
        "بیست\u200cوپنج قرن جنگ و امپراتوری، مسیحیت و حکومتِ عثمانی و آلودگیِ"
        " دنیای مدرن — و هنوز سرِ پا هستند. می\u200cگویند «این نیز بگذرد» — اما"
        " این شش زن نگذشتند. تراشیده شدند تا یادآورِ خیانت باشند، اما جایی در"
        " مسیرِ تاریخ معنایشان زیرورو شد. دیگر کسی برایِ فکر کردن به شرمساریِ"
        " کاریای سراغشان نمی\u200cرود. مردم می\u200cآیند چون شش زنِ سنگی، زنده\u200cتر"
        " از هر چیزِ زنده\u200cای به نظر می\u200cرسند. کاریاتیدها چیزی ثابت کردند"
        " که زمان نمی\u200cتواند پاکش کند: زیبایی فقط از تنبیه جان سالم به در"
        " نمی\u200cبَرَد — بلکه کاری می\u200cکند یادت برود تنبیه اصلاً برای چه بوده."
    ),
]


# ══════════════════════════════════════════════
# TURKISH (tr)
# ══════════════════════════════════════════════
# Proverb: "Her işte bir hayır vardır" (There is good in everything)
# Subverted: the Caryatids proved that beauty doesn't just survive
# punishment — it makes you forget the punishment was ever the point.

tr_title = "Göğü Taşıyan Kadınlar"
tr_subtitle = "Karyai'nin taşa dönüşen kadınları"
tr_excerpt = (
    "Atina'nın Akropolis tepesinde altı kadın duruyor — iki bin beş yüz yıldır"
    " kımıldamadan. Bir müze köşesine konmuş heykel değiller; gerçek birer sütun."
    " Başları çatıyı tutuyor, bedenleri yapının ta kendisi."
)
tr_moral = (
    "Güzellik, cezayı zarafete dönüştürebilir. Karyatidler utancı ölümsüzleştirmek"
    " için yontuldu, ama ebedi gücün ve zarafetin simgesi oldular."
)

tr_paragraphs = [
    # 1 — Hook
    (
        "Atina'nın Akropolis tepesinde altı kadın duruyor — iki bin beş yüz yıldır"
        " kımıldamadan. Bir müze köşesine konmuş heykel değiller; gerçek birer sütun."
        " Başları çatıyı tutuyor, bedenleri yapının ta kendisi. Adları \"Karyatidler,\""
        " Erechtheion tapınağının efsanevi figürleri. Buraya nasıl geldikleri mi?"
        " Bu bir savaş, ihanet ve utancın güzelliğe dönüşme hikâyesi."
    ),
    # 2 — Punishment origin
    (
        "MÖ 480. Pers ordusu Yunanistan'ı işgal ediyor. Şehirlerin çoğu direnirken,"
        " güneyde Peloponnez'deki küçücük Karyai kasabası Perslerin tarafını tutuyor."
        " Yunanlar savaşı kazanınca hesap vakti geldi: Karyai'nin erkekleri öldürüldü,"
        " kadınları köle yapıldı. Ama ceza bununla bitmedi. Atinalı heykeltıraşlar"
        " o kadınları taştan sütunlara dönüştürdü — sonsuza dek bir çatı taşımaya"
        " mahkûm. Bu hikâyeyi yaklaşık dört yüz yıl sonra Romalı mimar Vitruvius anlattı."
    ),
    # 3 — Devotion theory
    (
        "Bir de tam tersi bir teori var. Bazı tarihçilere göre Karyatidler aslında"
        " \"Arreforoi\"yi temsil ediyor — Atina'nın en köklü ailelerinden seçilip bir yıl"
        " boyunca Akropolis'te yaşayan ve tanrıça Athena'ya hizmet eden genç kızlar."
        " Görevleri, şehrin en büyük dini festivalinde sunulan kutsal bir elbise"
        " dokumaktı. Duruşlarına bakın: dik, sakin, bir ayak hafifçe önde — sanki"
        " kutsal bir törende yürüyorlar. Bu adanmışlık, ceza değil."
    ),
    # 4 — Engineering
    (
        "Kim tasarladıysa, daha önce kimsenin başaramadığı bir şey yaptı: sade taş"
        " sütunların yerine insan bedenleri koydu — üstelik bunlar gerçekten taşıyıcı"
        " olarak çalışıyor. Her kadın biraz farklı: birinin başı hafif eğik, öbürünün"
        " kalçası kaymış, elbise kıvrımları hiçbirinde aynı değil. Ama o kalın örgülü"
        " saçlar sadece süs değil — ağırlığın bindiği boynu güçlendiriyor. Dökümlü"
        " kumaşın kıvrımları da klasik sütun yivlerini taklit ediyor. Gerçek bir yapısal"
        " yük taşıyorlar — ama bakarsanız hiç zorlanmıyormuş gibi görünüyorlar."
    ),
    # 5 — Modern fate / Elgin
    (
        "Bugün altı Karyatid'in beşi Akropolis Müzesi'nde, Atina'nın kirli havasından"
        " korunarak. Altıncısını 1803'te Lord Elgin götürdü — Akropolis'ten devasa"
        " parçalar söküp gemiye yükleyerek İngiltere'ye gönderen İngiliz diplomat."
        " O altıncı kız kardeş o günden beri British Museum'da, ablalarından iki bin"
        " beş yüz kilometre ve iki yüz yıllık siyasi tartışma kadar uzakta."
        " Erechtheion'un sundurmasında şimdi kopyalar duruyor. Ve altıncının boş kaldığı"
        " yer, belki de dünyanın en zarif protesto pankartı."
    ),
    # 6 — Legacy + proverb (Her işte bir hayır vardır)
    (
        "Yirmi beş yüzyıl boyunca savaşlar, imparatorluklar, din değişiklikleri, Osmanlı"
        " hâkimiyeti, modern kirlilik — hepsini gördüler ve hâlâ dimdik ayaktalar. Bir"
        " ihaneti hatırlatmak için yontuldular, ama yolun bir yerinde anlam tersine"
        " döndü. Artık kimse Karyai'nin utancını düşünmek için gelmiyor buraya. İnsanlar"
        " geliyor, çünkü taştan altı kadın canlı olan her şeyden daha canlı görünüyor."
        " \"Her işte bir hayır vardır\" derler ya — Karyatidler bunu kanıtladı: güzellik"
        " cezadan sağ çıkmakla kalmaz, cezanın aslında ne amaçla verildiğini de unutturur."
    ),
]


# ─────────────────────────────────────────────
# Build DynamoDB items
# ─────────────────────────────────────────────
def build_item(lang, lang_story_id, title, subtitle, excerpt, moral, paragraphs):
    item = dict(SHARED)
    item["lang"] = {"S": lang}
    item["langStoryId"] = {"S": lang_story_id}
    item["title"] = {"S": title}
    item["subtitle"] = {"S": subtitle}
    item["excerpt"] = {"S": excerpt}
    item["moralOrLesson"] = {"S": moral}
    item["paragraphs"] = make_paragraphs(paragraphs)
    return item


items = [
    ("ar", build_item("ar", "ar#caryatids", ar_title, ar_subtitle, ar_excerpt, ar_moral, ar_paragraphs)),
    ("fa", build_item("fa", "fa#caryatids", fa_title, fa_subtitle, fa_excerpt, fa_moral, fa_paragraphs)),
    ("tr", build_item("tr", "tr#caryatids", tr_title, tr_subtitle, tr_excerpt, tr_moral, tr_paragraphs)),
]


# ─────────────────────────────────────────────
# Validate and push
# ─────────────────────────────────────────────
def validate_item(lang, item):
    """Basic validation: ensure JSON serializes, paragraphs exist, etc."""
    try:
        json_str = json.dumps(item, ensure_ascii=False)
    except Exception as e:
        print(f"  [FAIL] {lang}: JSON serialization error: {e}")
        return False

    # Check required fields
    required = ["siteId", "langStoryId", "lang", "title", "subtitle",
                "excerpt", "moralOrLesson", "paragraphs", "storyId"]
    for field in required:
        if field not in item:
            print(f"  [FAIL] {lang}: Missing field '{field}'")
            return False

    # Check paragraph count
    para_count = len(item["paragraphs"]["L"])
    if para_count < 5 or para_count > 10:
        print(f"  [WARN] {lang}: {para_count} paragraphs (expected 6-8)")

    # Check total character count
    total_chars = sum(len(p["M"]["text"]["S"]) for p in item["paragraphs"]["L"])
    print(f"  {lang}: {para_count} paragraphs, ~{total_chars} chars total")

    # Check individual paragraph lengths
    for i, p in enumerate(item["paragraphs"]["L"]):
        text = p["M"]["text"]["S"]
        if len(text) > 600:
            print(f"  [WARN] {lang} paragraph {i+1}: {len(text)} chars (max ~500)")

    return True


def push_item(lang, item):
    """Push a single item to DynamoDB."""
    json_str = json.dumps(item, ensure_ascii=False)

    # Write to temp file to avoid shell escaping issues
    tmp_file = f"/tmp/caryatids_{lang}.json"
    with open(tmp_file, "w", encoding="utf-8") as f:
        json.dump(item, f, ensure_ascii=False)

    cmd = [
        "aws", "dynamodb", "put-item",
        "--table-name", TABLE_NAME,
        "--region", REGION,
        "--item", f"file://{tmp_file}",
        "--return-consumed-capacity", "TOTAL"
    ]

    result = subprocess.run(
        cmd,
        capture_output=True,
        text=True,
        env={**os.environ, "AWS_REGION": REGION},
    )

    if result.returncode != 0:
        print(f"  [FAIL] {lang}: {result.stderr.strip()}")
        return False
    else:
        print(f"  [OK] {lang}: pushed successfully")
        if result.stdout.strip():
            print(f"       {result.stdout.strip()}")
        return True


def verify_item(lang):
    """Verify the item exists in DynamoDB."""
    cmd = [
        "aws", "dynamodb", "get-item",
        "--table-name", TABLE_NAME,
        "--region", REGION,
        "--key", json.dumps({
            "siteId": {"S": "acropolis-athens"},
            "langStoryId": {"S": f"{lang}#caryatids"}
        }),
        "--projection-expression", "lang, title, langStoryId"
    ]

    result = subprocess.run(
        cmd,
        capture_output=True,
        text=True,
        env={**os.environ, "AWS_REGION": REGION},
    )

    if result.returncode != 0:
        print(f"  [FAIL] Verify {lang}: {result.stderr.strip()}")
        return False

    data = json.loads(result.stdout)
    if "Item" in data:
        title = data["Item"]["title"]["S"]
        print(f"  [VERIFIED] {lang}: \"{title}\"")
        return True
    else:
        print(f"  [FAIL] Verify {lang}: Item not found")
        return False


# ─────────────────────────────────────────────
# Main
# ─────────────────────────────────────────────
if __name__ == "__main__":
    print("=" * 60)
    print("CARYATIDS STORY — 3 LANGUAGE PUSH")
    print(f"Timestamp: {TIMESTAMP}")
    print("=" * 60)

    # Step 1: Validate all
    print("\n--- VALIDATION ---")
    all_valid = True
    for lang, item in items:
        if not validate_item(lang, item):
            all_valid = False

    if not all_valid:
        print("\n[ABORT] Validation failed. Fix errors before pushing.")
        sys.exit(1)

    print("\nAll items validated.")

    # Step 2: Push each
    print("\n--- PUSHING TO DYNAMODB ---")
    all_pushed = True
    for lang, item in items:
        print(f"\nPushing {lang}...")
        if not push_item(lang, item):
            all_pushed = False
            print(f"[STOP] Failed on {lang}. Halting.")
            sys.exit(1)

    # Step 3: Verify each
    print("\n--- VERIFICATION ---")
    for lang, _ in items:
        verify_item(lang)

    print("\n" + "=" * 60)
    print("ALL DONE")
    print("=" * 60)
