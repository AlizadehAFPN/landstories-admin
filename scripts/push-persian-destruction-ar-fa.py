#!/usr/bin/env python3
"""
Push Arabic and Persian versions of "The Persian Destruction and the Oath"
to the Story DynamoDB table.

Arabic proverb subversion: يُمهِلُ ولا يُهمِل (He gives respite but doesn't neglect)
→ Athens gave itself respite but never neglected its wounds.

Persian proverb subversion: صبر تلخ است ولی بَرش شیرین (Patience is bitter but its fruit is sweet)
→ The Athenians tasted 30 years of ash's bitterness — but what a fruit came from it.
"""

import boto3
import json
import time
import sys

dynamodb = boto3.client('dynamodb', region_name='eu-north-1')
timestamp = str(int(time.time()))

# ─────────────────────────────────────────────
# Shared fields (unchanged from English record)
# ─────────────────────────────────────────────
shared = {
    "characters": {"L": [
        {"S": "Xerxes"},
        {"S": "Themistocles"},
        {"S": "Athenian priests and defenders"},
        {"S": "The Persian army"}
    ]},
    "coordinates": {"M": {
        "lng": {"N": "23.7267"},
        "lat": {"N": "37.9715"}
    }},
    "disabled": {"BOOL": False},
    "era": {"S": "480 BCE"},
    "hasAudio": {"BOOL": False},
    "icon": {"S": "\U0001f525"},
    "image": {"S": ""},
    "isFree": {"BOOL": True},
    "readingTimeMinutes": {"N": "3"},
    "siteId": {"S": "acropolis-athens"},
    "source": {"S": "Herodotus\u2019s Histories (Books 8-9), Thucydides\u2019s History, Isocrates\u2019s Panegyricus, Diodorus Siculus\u2019s Bibliotheca Historica"},
    "storyCategory": {"S": "lost_found"},
    "storyId": {"S": "persian-destruction"},
    "thumbnail": {"S": ""},
    "tier": {"S": "A"},
    "updatedAt": {"N": timestamp},
}

# ─────────────────────────────────────────────
# ARABIC VERSION
# ─────────────────────────────────────────────

ar_title = "ثلاثون عامًا في الرماد"
ar_subtitle = "حريقُ أثينا الذي صنع البارثينون"

ar_excerpt = (
    "في خريف عام ٤٨٠ قبل الميلاد، وقف أقوى رجلٍ على وجه الأرض فوق تلّةٍ في قلب أثينا، "
    "وراقبها وهي تحترق. خَشَايارشا — ملكُ فارس — جاء بجيشٍ لم يشهد العالم القديم مثله: "
    "ربّما ثلاثمئة ألف جندي اجتاحوا اليونان كالسَّيل."
)

ar_moral = "ما يُحرَق يمكن أن يُعاد بناؤه أقوى. الفُرسُ دمّروا أثينا — وصنعوا البارثينون دون أن يدروا."

ar_paragraphs = [
    (
        "في خريف عام ٤٨٠ قبل الميلاد، وقف أقوى رجلٍ على وجه الأرض فوق تلّةٍ في قلب أثينا، "
        "وراقبها تحترق. خَشَايارشا — ملكُ فارس — جاء بجيشٍ لم يشهد العالم القديم مثله: ربّما "
        "ثلاثمئة ألف جندي اجتاحوا اليونان كالسَّيل. حاول الإسبرطيّون إيقافه عند ممرّ ثِرموبيلاي "
        "الجبلي، وقاتلوا حتى آخر رجلٍ فيهم. لم ينجحوا إلّا في إبطائه. أمّا أثينا، فكانت فارغة "
        "— أهلها راهنوا على أسطولهم البحري ورحلوا."
    ),
    (
        "لكنّ حفنةً رفضت الرحيل. مجموعة صغيرة من الكهنة والمقاتلين تحصّنت فوق الأكروبوليس "
        "— التلّة المقدّسة — خلف أسوارٍ خشبية. كانوا يؤمنون أنّ نبوءة الكاهنة الشهيرة عن "
        "\u00ab\u200fالجدران الخشبية\u200f\u00bb التي ستُنقِذ أثينا تعنيهم هم. لم تكن تعنيهم. وجد الفُرسُ ممرًّا "
        "سرّيًّا في الجُرف الصخري، تسلّقوا خلف المدافعين، وقتلوهم جميعًا — عند المذابح ذاتها "
        "التي ركعوا يصلّون أمامها. ثمّ أشعلوا النار في كلّ شيء."
    ),
    (
        "في ذلك اليوم، صعد اللهيب وابتلع تاريخًا عمرُه قرون. المعبد الكبير للإلهة أثينا — بأعمدته "
        "الملوّنة ونقوشه وقرابينه — انهار رُكامًا. كان الكهنة قد نجحوا في تهريب أقدس ما في "
        "المدينة: تمثال خشبي عتيق للإلهة، منحوتٌ من خشب الزيتون. لكنّ كلّ شيءٍ سواه — كلّ "
        "تحفةٍ وكلّ عمودٍ مزخرف وكلّ ما قدّمته الأجيال لآلهتها — تحوّل إلى رماد. خَشَايارشا "
        "لم يُحرِق مبانيَ فحسب؛ بل اقتلع روحَ أثينا."
    ),
    (
        "لم يَطُل انتصاره. قائد أثيني اسمه ثيميستوكليس — من أذكى العقول العسكرية في التاريخ "
        "— استدرج الأسطول الفارسي الضخم إلى مياهٍ ضيّقة قرب جزيرة سَلاميس. كان فخًّا مُحكمًا. "
        "سُفن الفُرس العملاقة لم تستطع حتى أن تستدير. مزّقتها السفن اليونانية الأصغر والأسرع. "
        "جلس خَشَايارشا على عرشٍ فوق الشاطئ يشاهد أسطوله يتحطّم أمام عينيه، ثمّ هرب عائدًا "
        "إلى فارس. والجيش الذي تركه وراءه سُحِقَ في العام التالي."
    ),
    (
        "ثمّ جاء القَسَم. أقسم اليونانيون ألّا يُعيدوا بناء شيء. كلّ معبدٍ محترق، كلّ عمودٍ محطّم، "
        "كلّ كومة أنقاض — ستبقى في مكانها تمامًا كما سقطت، شاهدةً أبديّةً على ما فعلته فارس. "
        "وقد صدقوا. ثلاثون عامًا كاملة ظلّت الأطلال فوق تلك التلّة دون أن يمسّها أحد. جيلٌ "
        "كاملٌ من أبناء أثينا كبِر وهو يمرّ كلّ يوم أمام حُطام أقدس أماكنه."
    ),
    (
        "يقولون: \u00ab\u200fيُمهِلُ ولا يُهمِل\u200f\u00bb. أمهلت أثينا نفسَها ثلاثين عامًا — لكنّها لم تُهمِل "
        "جراحَها قطّ. في عام ٤٤٩ قبل الميلاد، وُقِّعت معاهدة سلام مع فارس، ووقف زعيمٌ اسمه "
        "بِريكليس وقال ما معناه: لقد وفَّينا بالقَسَم، حان الوقت لنبنيَ ما لم يرَه العالم من قبل. "
        "فقام البارثينون من الموضع ذاته الذي احترق فيه المعبد القديم — وكلّ منحوتةٍ فيه كانت تحكي "
        "القصة نفسها: النظام ينتصر على الفوضى. كانت رسالة أثينا: أحرقتمونا... فانظروا ماذا بنَينا."
    ),
    (
        "والجزء الذي يَقشعرّ له البدن: حين حفر علماء الآثار في الأكروبوليس في القرن التاسع عشر، "
        "وجدوا أنقاض حريق خَشَايارشا في المكان نفسه الذي دفنها فيه الأثينيون القدماء — تماثيل "
        "محروقة، نقوش محطّمة، حجارة اسودّت من شدّة النار. بعد ألفين وخمسمئة سنة، كان الدليل "
        "على أسوأ يومٍ في تاريخ أثينا لا يزال هناك، محفوظًا عن قصد. كأنّ المدينة نفسَها أرادت "
        "ألّا ينسى أحد. أبدًا."
    ),
]

ar_item = {**shared}
ar_item["lang"] = {"S": "ar"}
ar_item["langStoryId"] = {"S": "ar#persian-destruction"}
ar_item["title"] = {"S": ar_title}
ar_item["subtitle"] = {"S": ar_subtitle}
ar_item["excerpt"] = {"S": ar_excerpt}
ar_item["moralOrLesson"] = {"S": ar_moral}
ar_item["paragraphs"] = {"L": [{"M": {"text": {"S": p}}} for p in ar_paragraphs]}

# ─────────────────────────────────────────────
# PERSIAN VERSION
# ─────────────────────────────────────────────

fa_title = "سوگند بر ویرانه\u200cها"
fa_subtitle = "آتشی که پارتنون از آن زاده شد"

fa_excerpt = (
    "پاییز ۴۸۰ پیش از میلاد بود. قدرتمندترین مرد جهان بالای تپّه\u200cای ایستاده بود و شهر آتن "
    "را تماشا می\u200cکرد که می\u200cسوخت. خشایارشا — شاه شاهان پارس — بزرگ\u200cترین لشکری را "
    "که دنیای باستان به خود دیده بود با خودش آورده بود."
)

fa_moral = "آنچه بسوزد، می\u200cتواند نیرومندتر از نو ساخته شود. پارسیان آتن را ویران کردند — و ناخواسته پارتنون را آفریدند."

fa_paragraphs = [
    (
        "پاییز ۴۸۰ پیش از میلاد بود. قدرتمندترین مرد جهان بالای تپّه\u200cای ایستاده بود و شهر "
        "آتن را تماشا می\u200cکرد که می\u200cسوخت. خشایارشا — شاه شاهان پارس — بزرگ\u200cترین "
        "لشکری را که دنیای باستان به خود دیده بود با خودش آورده بود: شاید سیصد هزار سرباز "
        "که مثل سیلاب از یونان رد شده بودند. اسپارتی\u200cها سعی کرده بودند جلویش را در "
        "گذرگاه کوهستانی ترموپیل بگیرند و تا آخرین نفر جنگیده بودند. فقط کُندش کردند. آتن "
        "خالی بود — مردمش همه\u200cچیز را روی ناوگان دریایی\u200cشان شرط بسته بودند و رفته بودند."
    ),
    (
        "امّا چند نفر نرفتند. یک مُشت کاهن و جنگجو خودشان را بالای آکروپولیس — تپّهٔ مقدّس "
        "آتن — پشت دیوارهای چوبی سنگر کرده بودند. باور داشتند که پیشگویی مشهور پیشگوی "
        "معبد دربارهٔ \u00abدیوارهای چوبی\u00bb که آتن را نجات خواهند داد، دربارهٔ خودشان است. نبود. "
        "سربازهای پارسی راهی پنهانی از لبهٔ صخره پیدا کردند، از پشت سر بالا رفتند و "
        "همه\u200cشان را کشتند — درست کنار همان قربانگاه\u200cهایی که زانو زده بودند و دعا "
        "می\u200cکردند. بعد آتش زدند."
    ),
    (
        "آن روز، قرن\u200cها تاریخ مقدّس در آتش سوخت. معبد بزرگ آتِنا — با ستون\u200cهای رنگی و "
        "نقش\u200cبرجسته\u200cها و هدیه\u200cهایی که نسل\u200cها آورده بودند — فرو ریخت. کاهن\u200cها فقط یک "
        "چیز را توانسته بودند نجات بدهند: مقدّس\u200cترین شیء شهر، مجسّمهٔ چوبی کهنسالی از "
        "الهه که از چوب زیتون تراشیده شده بود. ولی هر چیز دیگری — هر گنجینه، هر ستون "
        "نقّاشی\u200cشده، هر اثری که نسل\u200cها به خدایانشان تقدیم کرده بودند — خاکستر شد. "
        "خشایارشا روح آتن را از ریشه کنده بود."
    ),
    (
        "ولی پیروزی\u200cاش دوام نیاورد. فرمانده\u200cای آتنی به نام تمیستوکلس — یکی از "
        "تیزهوش\u200cترین ذهن\u200cهای نظامی تاریخ — ناوگان عظیم پارسی را فریب داد و به آب\u200cهای "
        "تنگ نزدیک جزیرهٔ سالامیس کشاند. تله بود. کشتی\u200cهای بزرگ پارسی حتّی نمی\u200cتوانستند "
        "دور بزنند. ناوهای کوچک و چابک یونانی تکّه\u200cتکّه\u200cشان کردند. خشایارشا روی تختی بالای "
        "ساحل نشسته بود و ناوگانش را نگاه می\u200cکرد که جلوی چشمش خُرد می\u200cشد. بعد فرار "
        "کرد و به پارس برگشت. لشکری هم که جا گذاشت، سال بعد نابود شد."
    ),
    (
        "و بعد، سوگند آمد. یونانی\u200cها قسم خوردند که هیچ\u200cچیز را دوباره نسازند. هر معبد "
        "سوخته، هر ستون شکسته، هر تلّ آوار — همان\u200cجا بماند، دقیقاً همان\u200cطور که افتاده، "
        "یادگار ابدی از کاری که پارس کرده بود. و واقعاً پای حرفشان ماندند. سی سال تمام، "
        "ویرانه\u200cها بالای آن تپّه دست\u200cنخورده ماند. یک نسل کامل از بچّه\u200cهای آتن بزرگ شدند "
        "در حالی که هر روز از کنار خرابه\u200cهای مقدّس\u200cترین مکان\u200cهایشان رد می\u200cشدند."
    ),
    (
        "می\u200cگویند صبر تلخ است ولی بَرش شیرین. آتنی\u200cها سی سال تلخی خاکستر را چشیدند "
        "— ولی چه میوه\u200cای از آن رسید. سال ۴۴۹ پیش از میلاد، بعد از صلح با پارس، رهبری "
        "به نام پریکلس بلند شد و گفت: به سوگندمان وفا کردیم. حالا وقتش است چیزی بسازیم "
        "که دنیا ندیده. پارتنون درست از همان نقطه\u200cای سر بلند کرد که معبد قدیمی سوخته بود. "
        "هر پیکره\u200cاش یک پیام داشت: نظم بر آشوب پیروز شد. آتن داشت به دنیا می\u200cگفت: "
        "ما را سوزاندید — ببینید چه ساختیم."
    ),
    (
        "و حالا بخش عجیب ماجرا. وقتی باستان\u200cشناسان در قرن نوزدهم آکروپولیس را کاویدند، "
        "آوار آتش خشایارشا را پیدا کردند — دقیقاً همان\u200cجایی که آتنی\u200cهای باستان دفنشان "
        "کرده بودند. مجسّمه\u200cهای سوخته. نقش\u200cبرجسته\u200cهای شکسته. سنگ\u200cهایی که هنوز سیاه "
        "بودند. بعد از دو هزار و پانصد سال، یادگار آن بدترین روز تاریخ آتن هنوز آن\u200cجا بود "
        "— عمداً نگهداری\u200cشده. انگار خودِ شهر خواسته بود مطمئن شود که هیچ\u200cکس هرگز "
        "فراموش نکند."
    ),
]

fa_item = {**shared}
fa_item["lang"] = {"S": "fa"}
fa_item["langStoryId"] = {"S": "fa#persian-destruction"}
fa_item["title"] = {"S": fa_title}
fa_item["subtitle"] = {"S": fa_subtitle}
fa_item["excerpt"] = {"S": fa_excerpt}
fa_item["moralOrLesson"] = {"S": fa_moral}
fa_item["paragraphs"] = {"L": [{"M": {"text": {"S": p}}} for p in fa_paragraphs]}


# ─────────────────────────────────────────────
# VALIDATION
# ─────────────────────────────────────────────

def validate_item(item, lang_label):
    """Validate the DynamoDB item before pushing."""
    errors = []

    # Check required fields
    required = [
        "siteId", "langStoryId", "lang", "title", "subtitle",
        "excerpt", "moralOrLesson", "paragraphs", "storyId",
        "storyCategory", "era", "icon", "tier", "updatedAt"
    ]
    for field in required:
        if field not in item:
            errors.append(f"Missing field: {field}")

    # Validate paragraphs
    paragraphs = item.get("paragraphs", {}).get("L", [])
    if not paragraphs:
        errors.append("No paragraphs found")
    else:
        for i, p in enumerate(paragraphs):
            text = p.get("M", {}).get("text", {}).get("S", "")
            if not text:
                errors.append(f"Paragraph {i+1}: empty text")
            if len(text) > 500:
                errors.append(f"Paragraph {i+1}: {len(text)} chars (max 500)")
            words = text.split()
            if len(words) > 100:
                errors.append(f"Paragraph {i+1}: {len(words)} words (max 100)")

    # Count total characters
    total_chars = sum(
        len(p.get("M", {}).get("text", {}).get("S", ""))
        for p in paragraphs
    )
    if total_chars < 2000:
        errors.append(f"Total chars too low: {total_chars} (min ~2400)")
    if total_chars > 4200:
        errors.append(f"Total chars too high: {total_chars} (max ~3600)")

    # Check paragraph count
    if len(paragraphs) < 6 or len(paragraphs) > 10:
        errors.append(f"Paragraph count: {len(paragraphs)} (expected 6-10)")

    # Validate JSON serialization
    try:
        json.dumps(item, ensure_ascii=False)
    except Exception as e:
        errors.append(f"JSON serialization failed: {e}")

    if errors:
        print(f"\n{'='*50}")
        print(f"VALIDATION FAILED for {lang_label}:")
        for e in errors:
            print(f"  - {e}")
        print(f"{'='*50}")
        return False
    else:
        print(f"\n[OK] {lang_label} validation passed")
        print(f"     Title: {item['title']['S']}")
        print(f"     Paragraphs: {len(paragraphs)}")
        print(f"     Total chars: {total_chars}")
        for i, p in enumerate(paragraphs):
            text = p['M']['text']['S']
            print(f"     P{i+1}: {len(text)} chars, {len(text.split())} words")
        return True


# ─────────────────────────────────────────────
# PUSH TO DYNAMODB
# ─────────────────────────────────────────────

def push_item(item, lang_label):
    """Push a single item to DynamoDB with verification."""
    try:
        dynamodb.put_item(TableName='Story', Item=item)
        print(f"\n[PUSHED] {lang_label} successfully written to DynamoDB")

        # Verify by reading back
        response = dynamodb.get_item(
            TableName='Story',
            Key={
                'siteId': item['siteId'],
                'langStoryId': item['langStoryId']
            }
        )
        if 'Item' in response:
            stored_title = response['Item'].get('title', {}).get('S', '')
            stored_paras = len(response['Item'].get('paragraphs', {}).get('L', []))
            print(f"[VERIFIED] Read back: title=\"{stored_title}\", paragraphs={stored_paras}")
            return True
        else:
            print(f"[WARNING] Could not read back {lang_label} after push")
            return False
    except Exception as e:
        print(f"\n[ERROR] Failed to push {lang_label}: {e}")
        return False


# ─────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────

print("=" * 60)
print("Persian Destruction — Arabic & Persian Push Script")
print(f"Timestamp: {timestamp}")
print("=" * 60)

# Validate both
ar_valid = validate_item(ar_item, "Arabic (ar)")
fa_valid = validate_item(fa_item, "Persian (fa)")

if not ar_valid or not fa_valid:
    print("\n[ABORT] Validation failed. Fix errors before pushing.")
    sys.exit(1)

print("\n" + "-" * 60)
print("Validation passed. Pushing to DynamoDB...")
print("-" * 60)

# Push Arabic
ar_ok = push_item(ar_item, "Arabic (ar)")

# Push Persian
fa_ok = push_item(fa_item, "Persian (fa)")

print("\n" + "=" * 60)
if ar_ok and fa_ok:
    print("ALL DONE. Both records pushed and verified successfully.")
else:
    failed = []
    if not ar_ok:
        failed.append("Arabic")
    if not fa_ok:
        failed.append("Persian")
    print(f"PARTIAL FAILURE: {', '.join(failed)} failed.")
print("=" * 60)
