#!/usr/bin/env python3
"""
Push Arabic and Persian versions of "The Reed Flute" story to DynamoDB.
"""

import json
import subprocess
import sys
import time

REGION = "eu-north-1"
TABLE = "Story"
SITE_ID = "mevlana-museum"
STORY_ID = "reed-flute"
NOW_TS = int(time.time())

# ─────────────────────────────────────────────
# ARABIC VERSION
# ─────────────────────────────────────────────
ar_story = {
    "siteId": {"S": SITE_ID},
    "langStoryId": {"S": "ar#reed-flute"},
    "lang": {"S": "ar"},
    "storyId": {"S": STORY_ID},
    "title": {"S": "أنينُ النّاي"},
    "subtitle": {"S": "القصيدة التي صارت روح التصوّف"},
    "excerpt": {"S": "في سنة 1258، في مدينة قونية التركية، جلس شاعرٌ مُحطَّمُ القلب وكتب أوّل أبيات ما سيصبح أشهر قصيدة في تاريخ الأدب الفارسي. اسمه جلال الدين الرومي."},
    "moralOrLesson": {"S": "كلّ حنينٍ في داخلنا هو الروح تتذكّر أصلها — وأعمقُ أحزاننا ليس إلّا شوقاً إلى وطنٍ نسيناه."},
    "icon": {"S": "🎵"},
    "tier": {"S": "A"},
    "paragraphs": {"L": [
        {"M": {"text": {"S":
            "في سنة 1258، في مدينة قونية التركية، جلس شاعرٌ مُحطَّمُ القلب وكتب أوّل أبيات ما سيصبح أشهر قصيدة في تاريخ الأدب الفارسي. اسمه جَلالُ الدِّينِ الرُّومِيّ. لم يبدأ بحكمة ولا بفلسفة. بدأ بصوت — أنين ناي."
        }}},
        {"M": {"text": {"S":
            "«اسمَعْ إلى النّايِ كيفَ يَحكي» — هكذا افتتح الرُّومِيّ ملحمته. النّاي مصنوعٌ من قصبةٍ مُجوَّفة تُقطَع من ضفّة نهر. لحظةَ قطعها، تنتهي حياتها الأولى إلى غير رجعة. وكلّ نغمةٍ تخرج منها ليست موسيقى — بل نُواح. القصبة لا تَعزِف. القصبة تبكي."
        }}},
        {"M": {"text": {"S":
            "والمجاز واضحٌ كالشّمس: القصبة هي الرّوح البشريّة. وضفّة النّهر هي الأصل الإلهيّ الذي جِئنا منه. كلّ مرّةٍ يضربك حزنٌ لا تفهم سببه، كلّ مرّةٍ تشعر بشوقٍ إلى مكانٍ لا تعرف اسمه — تلك هي القصبة بداخلك. تلك روحُك تتذكّر وطناً سُلِبَت منه."
        }}},
        {"M": {"text": {"S":
            "لكنّ الرُّومِيّ لم يأتِ بهذا من فراغ. قبل كتابة المَثنَوِيّ، عاش خسارةً حطَّمته. مُتصوِّفٌ جوّال اسمه شَمسُ الدِّينِ التِّبريزِيّ دخل حياته وقلب كلّ شيء رأساً على عقب. لم يكن شمس معلّماً عادياً — كان يتحدّى الرُّومِيّ، يستفزّه، ينزع عنه كلّ ما ظنّ أنّه يعرفه عن الله والحبّ. ثمّ اختفى شمس. ربّما قُتِل. لم يَرَهُ الرُّومِيّ ثانيةً."
        }}},
        {"M": {"text": {"S":
            "ذلك الفقدان شقّ الرُّومِيّ نصفَين. تحوّل من عالِمِ دينٍ مُحترَمٍ تقليديّ إلى واحدٍ من أعظم الشعراء في تاريخ البشريّة. صار ألمُ فراق شمس وقودَ كلّ بيتٍ كتبه. وحين جلس ليكتب المَثنَوِيّ — ملحمةً في ستّة أجزاء يُلقِّبُها أتباعُ التّصوّف بـ«القرآن بالفارسيّة» — افتتحها بالنّاي. لأنّ أعمقَ حقيقةٍ عن الإنسان ليست السّعادة. إنّها الشَّوق. وكما يُقال: لا يَعرِفُ الشَّوقَ إلّا مَن يُكابِدُه."
        }}},
        {"M": {"text": {"S":
            "تلك القصيدة أسّست طريقةً روحيّةً كاملة. أتباع الرُّومِيّ صاروا يُعرَفون بالمَوْلَوِيَّة — الدّراويش الدوّارون الذين ربّما رأيتَهم في صور، يدورون بأثوابهم البيضاء. في مجالس السَّماع، يبدأ عازفُ النّاي أوّلاً. النّغمات الأولى خشنةٌ وحزينة عن قصد، صدىً لصرخة القصبة حين قُطِعَت. ثمّ يبدأ الدّراويش بالدّوران — كفٌّ نحو السّماء وكفٌّ نحو الأرض — لا يؤدّون عرضاً، بل يُصلّون بأجسادهم."
        }}},
        {"M": {"text": {"S":
            "اليوم، بعد نحو ثمانية قرون، الرُّومِيّ هو الشّاعر الأكثر مبيعاً في أمريكا. كلماته تظهر على أكواب القهوة والوشوم ومنشورات إنستغرام. لكنّ تلك الصّورة الأولى — النّاي يبكي لأنّه يتذكّر من أين جاء — تبقى الأكثر إيلاماً. لا يهمّ ما تؤمن به. كلّنا شعرنا بذلك الألم، ذلك الشدّ نحو شيءٍ لا نستطيع تسميته."
        }}},
        {"M": {"text": {"S":
            "عبقريّة الرُّومِيّ أنّه اختزل كلّ هذا في أبياتٍ قليلة عن قطعةِ قصبٍ مُجوَّفة. كلّنا مشتاقون إلى وطنٍ لا نتذكّره تماماً — والنّاي هو صوتُ ذلك الاشتياق، حين يجدُ لنفسه صوتاً."
        }}},
    ]},
    "source": {"S": "Rumi, Masnavi-ye-Ma'navi, Book I; Franklin Lewis, Rumi: Past and Present, East and West"},
    "characters": {"L": [
        {"S": "مولانا جلال الدين الرومي"},
        {"S": "شمس الدين التبريزي"},
        {"S": "الناي (ney)"},
        {"S": "الدراويش المولوية"},
    ]},
    "era": {"S": "العصر السلجوقي (حوالي 1258 م)"},
    "readingTimeMinutes": {"N": "2"},
    "image": {"S": ""},
    "updatedAt": {"N": str(NOW_TS)},
    "disabled": {"BOOL": False},
    "thumbnail": {"S": ""},
    "coordinates": {"M": {
        "lng": {"N": "32.5047"},
        "lat": {"N": "37.8719"},
    }},
    "hasAudio": {"BOOL": False},
    "isFree": {"BOOL": True},
    "storyCategory": {"S": "love_heartbreak"},
}

# ─────────────────────────────────────────────
# PERSIAN VERSION
# ─────────────────────────────────────────────
fa_story = {
    "siteId": {"S": SITE_ID},
    "langStoryId": {"S": "fa#reed-flute"},
    "lang": {"S": "fa"},
    "storyId": {"S": STORY_ID},
    "title": {"S": "ناله\u200cی نی"},
    "subtitle": {"S": "شعری که جان تصوف شد"},
    "excerpt": {"S": "سال ۱۲۵۸ بود. در شهر قونیه، مردی با قلبی شکسته قلم برداشت و اولین سطرهای شعری را نوشت که قرار بود مشهورترین اثر زبان فارسی شود."},
    "moralOrLesson": {"S": "هر حسرتی که در درونمان می\u200cجوشد، یادآوری روح از سرچشمه\u200cی خویش است — و عمیق\u200cترین غم\u200cهایمان، دلتنگیِ خانه\u200cای\u200cست که از یاد برده\u200cایم."},
    "icon": {"S": "🎵"},
    "tier": {"S": "A"},
    "paragraphs": {"L": [
        {"M": {"text": {"S":
            "سال ۱۲۵۸ بود. در شهر قونیه، مردی با قلبی شکسته قلم برداشت و اولین سطرهای شعری را نوشت که قرار بود مشهورترین اثر زبان فارسی شود. نامش مولانا جلال\u200cالدین بلخی بود. نه با حکمت شروع کرد، نه با فلسفه. با یک صدا شروع کرد — صدای ناله\u200cی یک نی."
        }}},
        {"M": {"text": {"S":
            "«بشنو از نی چون حکایت می\u200cکند» — این نخستین مصراع مثنوی است. نی از نیزار کنار رودخانه بریده می\u200cشود. همین که از ریشه\u200cاش جدا شد، دیگر راه برگشتی نیست. و هر نتی که از درونش بیرون می\u200cآید، موسیقی نیست. ناله است. نی نمی\u200cنوازد. نی گریه می\u200cکند."
        }}},
        {"M": {"text": {"S":
            "استعاره ساده\u200cتر از آنی\u200cست که فکرش را بکنید. نی همان روح آدمی\u200cست. نیزار کنار رود همان سرچشمه\u200cی الهی\u200cست — جایی که پیش از به دنیا آمدن، آنجا بودیم. هر وقت بی\u200cدلیل دلتنگ می\u200cشوید، هر وقت غمی سراغتان می\u200cآید که توضیحی برایش ندارید — آن نیِ درون شماست. روحتان دارد خانه\u200cای را به یاد می\u200cآورد که از آن کَنده شده."
        }}},
        {"M": {"text": {"S":
            "مولانا این ایده را از هوا نگرفت. پیش از نوشتن مثنوی، فقدانی را از سر گذرانده بود که زندگی\u200cاش را زیرورو کرد. درویشی سرگردان به نام شمس تبریزی وارد زندگی\u200cاش شد و همه\u200cچیز را از بنیاد عوض کرد. شمس معلم معمولی نبود — مولانا را به چالش می\u200cکشید، تحریکش می\u200cکرد، هر چه درباره\u200cی خدا و عشق می\u200cدانست از او می\u200cستاند. بعد شمس ناپدید شد. شاید کشته شد. مولانا دیگر هرگز او را ندید."
        }}},
        {"M": {"text": {"S":
            "آن درد مولانا را از هم شکافت. از یک عالِم دینی محترم ولی معمولی، تبدیل شد به یکی از بزرگ\u200cترین شاعران تاریخ بشر. می\u200cگویند «تا نسوزی، نسازی» — مولانا سوخت و از خاکسترش شعری ساخت که هشت قرن است جهان را تکان می\u200cدهد. وقتی نشست تا مثنوی را بنویسد — شاهکاری در شش دفتر که صوفیان «قرآن به زبان پارسی» خوانده\u200cاند — با نی شروع کرد. چون عمیق\u200cترین حقیقت درباره\u200cی آدم بودن، شادی نیست. دلتنگی\u200cست."
        }}},
        {"M": {"text": {"S":
            "آن شعر پایه\u200cی یک آیین روحانی تمام\u200cعیار شد. پیروان مولانا به «مولویه» شناخته شدند — همان درویش\u200cهای سماع\u200cزن که شاید عکسشان را دیده باشید، با جامه\u200cهای سفید می\u200cچرخند. در مراسم سماع، اول از همه نوازنده\u200cی نی شروع می\u200cکند. نت\u200cهای اول عمداً خام و سوزناک\u200cاند، پژواکی از همان ناله\u200cی نخستین. بعد درویش\u200cها شروع به چرخیدن می\u200cکنند — یک کف دست رو به آسمان، یکی رو به زمین — نه اجرا، بلکه نماز با تن."
        }}},
        {"M": {"text": {"S":
            "امروز، نزدیک به هشت قرن بعد، مولانا پرفروش\u200cترین شاعر در آمریکاست. حرف\u200cهایش روی لیوان قهوه و تتو و پست\u200cهای اینستاگرام پیدا می\u200cشود. ولی آن تصویر نخست — نی\u200cای که گریه می\u200cکند چون یادش هست از کجا آمده — هنوز بیشتر از همه به دل می\u200cنشیند. فرقی نمی\u200cکند به چه باور دارید. همه\u200cی ما آن درد را حس کرده\u200cایم، آن کشش به سمت چیزی که نمی\u200cتوانیم اسمش را بگذاریم."
        }}},
        {"M": {"text": {"S":
            "نبوغ مولانا این بود که تمام اینها را در چند بیت درباره\u200cی یک تکه نیِ توخالی خلاصه کرد. همه\u200cی ما دلتنگ خانه\u200cای هستیم که درست یادمان نمی\u200cآید — و نی صدای همان دلتنگی\u200cست، وقتی صدایی پیدا کند."
        }}},
    ]},
    "source": {"S": "Rumi, Masnavi-ye-Ma'navi, Book I; Franklin Lewis, Rumi: Past and Present, East and West"},
    "characters": {"L": [
        {"S": "مولانا جلال\u200cالدین بلخی"},
        {"S": "شمس تبریزی"},
        {"S": "نی (ney)"},
        {"S": "درویش\u200cهای مولویه"},
    ]},
    "era": {"S": "دوره\u200cی سلجوقی (حدود ۱۲۵۸ میلادی)"},
    "readingTimeMinutes": {"N": "2"},
    "image": {"S": ""},
    "updatedAt": {"N": str(NOW_TS)},
    "disabled": {"BOOL": False},
    "thumbnail": {"S": ""},
    "coordinates": {"M": {
        "lng": {"N": "32.5047"},
        "lat": {"N": "37.8719"},
    }},
    "hasAudio": {"BOOL": False},
    "isFree": {"BOOL": True},
    "storyCategory": {"S": "love_heartbreak"},
}


def validate_story(story, lang_label):
    """Validate story structure and content before push."""
    errors = []

    # Check required fields
    required = ["siteId", "langStoryId", "lang", "storyId", "title",
                "subtitle", "excerpt", "moralOrLesson", "paragraphs"]
    for field in required:
        if field not in story:
            errors.append(f"Missing field: {field}")

    # Check paragraphs count
    paras = story.get("paragraphs", {}).get("L", [])
    if not (6 <= len(paras) <= 10):
        errors.append(f"Paragraph count {len(paras)} outside 6-10 range")

    # Check each paragraph length
    for i, p in enumerate(paras):
        text = p.get("M", {}).get("text", {}).get("S", "")
        char_count = len(text)
        word_count = len(text.split())
        if char_count > 500:
            errors.append(f"Para {i+1}: {char_count} chars (max 500)")
        if word_count > 100:
            errors.append(f"Para {i+1}: {word_count} words (max 100)")

    # Total character count
    total_chars = sum(
        len(p.get("M", {}).get("text", {}).get("S", ""))
        for p in paras
    )
    if total_chars < 1800 or total_chars > 4200:
        errors.append(f"Total chars {total_chars} outside 2400-3600 (±20%) range")

    # Validate JSON serialization
    try:
        json.dumps(story, ensure_ascii=False)
    except Exception as e:
        errors.append(f"JSON serialization error: {e}")

    if errors:
        print(f"\n❌ VALIDATION FAILED for {lang_label}:")
        for e in errors:
            print(f"   - {e}")
        return False
    else:
        # Print stats
        print(f"\n✅ VALIDATION PASSED for {lang_label}:")
        print(f"   Paragraphs: {len(paras)}")
        for i, p in enumerate(paras):
            text = p["M"]["text"]["S"]
            print(f"   Para {i+1}: {len(text)} chars, {len(text.split())} words")
        print(f"   Total chars: {total_chars}")
        return True


def push_story(story, lang_label):
    """Push a story to DynamoDB via AWS CLI."""
    # Write to temp file for clean JSON handling
    json_str = json.dumps(story, ensure_ascii=False)
    tmp_file = f"/tmp/reed-flute-{lang_label}.json"
    with open(tmp_file, "w", encoding="utf-8") as f:
        f.write(json_str)

    cmd = [
        "aws", "dynamodb", "put-item",
        "--table-name", TABLE,
        "--item", f"file://{tmp_file}",
        "--region", REGION,
        "--output", "json"
    ]

    print(f"\n🚀 Pushing {lang_label} version...")
    result = subprocess.run(cmd, capture_output=True, text=True)

    if result.returncode == 0:
        print(f"✅ {lang_label} pushed successfully!")
        return True
    else:
        print(f"❌ {lang_label} push FAILED:")
        print(f"   stderr: {result.stderr}")
        return False


def verify_story(lang_code):
    """Verify the story was written correctly."""
    cmd = [
        "aws", "dynamodb", "get-item",
        "--table-name", TABLE,
        "--key", json.dumps({
            "siteId": {"S": SITE_ID},
            "langStoryId": {"S": f"{lang_code}#reed-flute"}
        }),
        "--region", REGION,
        "--output", "json"
    ]

    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode == 0:
        data = json.loads(result.stdout)
        if "Item" in data:
            item = data["Item"]
            title = item.get("title", {}).get("S", "")
            para_count = len(item.get("paragraphs", {}).get("L", []))
            print(f"✅ Verified {lang_code}: title=\"{title}\", {para_count} paragraphs")
            return True
        else:
            print(f"❌ Verify {lang_code}: Item not found!")
            return False
    else:
        print(f"❌ Verify {lang_code} failed: {result.stderr}")
        return False


if __name__ == "__main__":
    print("=" * 60)
    print("REED FLUTE — Arabic & Persian Push Script")
    print("=" * 60)

    # Validate both
    ar_ok = validate_story(ar_story, "Arabic (ar)")
    fa_ok = validate_story(fa_story, "Persian (fa)")

    if not (ar_ok and fa_ok):
        print("\n⛔ Validation failed. Aborting.")
        sys.exit(1)

    # Push Arabic
    if not push_story(ar_story, "Arabic (ar)"):
        print("\n⛔ Arabic push failed. Aborting.")
        sys.exit(1)

    # Verify Arabic
    if not verify_story("ar"):
        print("\n⛔ Arabic verification failed.")
        sys.exit(1)

    # Push Persian
    if not push_story(fa_story, "Persian (fa)"):
        print("\n⛔ Persian push failed. Aborting.")
        sys.exit(1)

    # Verify Persian
    if not verify_story("fa"):
        print("\n⛔ Persian verification failed.")
        sys.exit(1)

    print("\n" + "=" * 60)
    print("✅ ALL DONE — Both versions pushed and verified!")
    print("=" * 60)
