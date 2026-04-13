#!/usr/bin/env python3
"""
Generate and push Arabic, Persian, and Turkish versions of
"The Betrayal of Ephialtes" to DynamoDB Story table.
"""

import json
import os
import subprocess
import time
import sys

TIMESTAMP = str(int(time.time()))
TABLE = "Story"
REGION = "eu-north-1"

# ─── Shared fields (unchanged from English) ───────────────────────────────────

BASE = {
    "siteId":              {"S": "thermopylae"},
    "storyId":             {"S": "ephialtes-betrayal"},
    "coordinates":         {"M": {"lng": {"N": "22.5367"}, "lat": {"N": "38.7967"}}},
    "disabled":            {"BOOL": False},
    "era":                 {"S": "480 BCE"},
    "hasAudio":            {"BOOL": False},
    "icon":                {"S": "\U0001f40d"},
    "image":               {"S": ""},
    "isFree":              {"BOOL": True},
    "readingTimeMinutes":  {"N": "2"},
    "source":              {"S": "Herodotus\u2019s Histories (Book 7, chapters 213-218), Plutarch\u2019s Moralia"},
    "storyCategory":       {"S": "ghosts_curses"},
    "thumbnail":           {"S": ""},
    "tier":                {"S": "A"},
}

def paragraphs(texts):
    return {"L": [{"M": {"text": {"S": t}}} for t in texts]}

def characters(names):
    return {"L": [{"S": n} for n in names]}


# ══════════════════════════════════════════════════════════════════════════════
#  ARABIC  —  خيانة إفيالتيس
#  Proverb: الثالثة ثابتة  (The third is definitive)
#  Register: Engaging modern MSA, storyteller voice
# ══════════════════════════════════════════════════════════════════════════════

AR = {
    **BASE,
    "lang":        {"S": "ar"},
    "langStoryId": {"S": "ar#ephialtes-betrayal"},
    "updatedAt":   {"N": TIMESTAMP},

    "title":    {"S": "خِيانَةُ إفيالتيس"},
    "subtitle": {"S": "الرَّجُلُ الَّذي باعَ اليونانَ بِذَهَبِ فارِس"},
    "excerpt":  {"S": "يقولون «الثّالِثَةُ ثابِتَة.» في معركة ترموبيل، جاءت الثالثة فعلًا — لكنّها لم تكن نصرًا. كانت خيانة. ثلاثمئة إسبرطيّ صدّوا إمبراطوريّةً بأكملها، ولم يهزمهم جيش — بل رجلٌ واحد يعرف دربًا سرّيًّا في الجبال."},

    "moralOrLesson": {"S": "الخِيانةُ أشدُّ فَتكًا من أيّ جيش — ضربة واحدة من الداخل تهدم ما بناه شجاعة ثلاثمئة رجل."},

    "characters": characters([
        "إفيالتيس التراخيسيّ",
        "زِركسيس",
        "الخالِدون الفُرس",
        "حرّاس فوكيس",
        "الملك ليونيداس",
    ]),

    "paragraphs": paragraphs([

        # P1 — Opening + proverb subversion
        "يقولون «الثّالِثَةُ ثابِتَة.» في مَعركةِ ترموبيل، أشهر "
        "موقفٍ أخير في التاريخ، جاءت الثالثة فعلًا — لكنّها لم تكن "
        "نصرًا. كانت خيانة. ثلاثمئة مقاتلٍ من إسبرطة وبضعة آلافٍ من "
        "حلفائهم اليونانيّين سدّوا ممرًّا ساحليًّا ضيّقًا في وجه "
        "الإمبراطوريّة الفارسيّة بأكملها، والفُرسُ عجزوا عن اختراقهم. "
        "ما أنهى كلّ شيء لم يكن جيشًا أقوى — بل رجلٌ واحدٌ اسمه "
        "إفيالتيس، يعرف دربًا سرّيًّا في الجبال.",

        # P2 — Two days of battle
        "على مدار يومَين في صيف عام 480 قبل الميلاد، جعل اليونانيّون "
        "الفُرسَ يدفعون ثمنَ كلّ شبرٍ من ذلك الممرّ. الملك زِركسيس "
        "جاء بجيشٍ يقول المؤرّخون القدماء إنّه كان يُجفِّف الأنهارَ "
        "إذا شرب. لكنّ كلّ ذلك لم ينفع في ترموبيل. الممرّ كان ضيّقًا "
        "لدرجة أنّ حفنةً فقط تستطيع القتال في آنٍ واحد — والإسبرطيّون "
        "في المقدّمة كانوا أمهرَ مقاتلي العالم القديم.",

        # P3 — Xerxes desperate, Immortals fail, Ephialtes appears
        "يئسَ زِركسيس. حتّى نُخبتُه، «الخالِدون» — عشرة آلاف مقاتلٍ "
        "مُختارٍ سُمّوا بهذا لأنّ كلّ مَن يسقط منهم يُستبدَل فورًا — "
        "اندفعوا نحو الخطّ اليونانيّ وارتدّوا مهزومين. عندها ظهر "
        "إفيالتيس في المعسكر الفارسيّ. رجلٌ من أهل المنطقة يعرف كلّ "
        "مسالك تلك الجبال، ومعه شيءٌ يبيعه: موقع دربٍ خفيّ يلتفّ خلف "
        "اليونانيّين. الثمن؟ ذهب. كثيرٌ من الذهب.",

        # P4 — Night march, Phocian failure
        "لم يتردّد زِركسيس لحظة. في تلك الليلة، أرسل الخالِدين — "
        "عشرة آلاف بأكملهم — يتبعون إفيالتيس عبر الدرب الخفيّ. "
        "الإسبرطيّون لم يكونوا غافلين تمامًا: الملك ليونيداس كان قد "
        "نشرَ ألف جنديّ من منطقة فوكيس لحراسة ذلك المسلك. لكن حين "
        "ظهر الخالدون من بين الأشجار مع الفجر، أصابَ الذُّعرُ أولئك "
        "الحرّاس. تسلّقوا تلّةً قريبة لإنقاذ أنفسهم، وتركوا الطريقَ "
        "مفتوحًا على مِصراعَيه.",

        # P5 — Leonidas' decision
        "مع شروق الشمس، أدرك ليونيداس أنّ اللعبة انتهت. الفُرس "
        "سيكونون خلفه قريبًا، وقوّته الصغيرة ستُحاصَر. فاتّخذ القرار "
        "الذي حوّل هذه المعركة إلى أسطورة: أمر معظمَ الجيش اليونانيّ "
        "بالانسحاب نحو النجاة، وبقيَ هو مع ثلاثمئة إسبرطيّ وسبعمئة "
        "متطوّعٍ من مدينة ثيسبيا اليونانيّة. مهمّتهم كانت بسيطة "
        "ومستحيلة: الصمود حتّى يفرّ الباقون.",

        # P6 — The last stand
        "وصمدوا. قاتلوا حتّى تكسّرت رماحُهم، ثمّ بسيوفهم، ثمّ "
        "بأيديهم المُجرَّدة. سقطوا جميعًا حتّى آخر رجل. لكنّ "
        "تضحيتهم نجحت — الجيش اليونانيّ المنسحب نجا وأعادَ تنظيم "
        "صفوفه، وهزمَ الفُرس في المعارك التي تلت خلال العام التالي. "
        "ماتَ الثلاثمئة لتحيا اليونان.",

        # P7 — Ephialtes' fate
        "وإفيالتيس؟ وضع اليونانيّون على رأسه مكافأةً ضخمة حتّى قضى "
        "بقيّة عمره هاربًا. فرّ شمالًا إلى ثيساليا، لكنّك لا تستطيع "
        "الاختباء من بلادٍ بأكملها تطلب رأسك. يقول المؤرّخ هيرودوتس "
        "إنّ إفيالتيس قُتِلَ في النهاية — ليس حتّى بسبب خيانته، بل في "
        "خلافٍ شخصيّ لا علاقة له بالأمر. فأعطى الإسبرطيّون قاتلَه "
        "المكافأة. العدالة عدالة، حتّى لو جاءت بالصُّدفة.",

        # P8 — Legacy + proverb callback
        "مرّت ألفان وخمسمئة سنة، واسم إفيالتيس لم يتعافَ. في "
        "اليونانيّة المعاصرة، «إفيالتيس» تعني حرفيًّا: «كابوس.» هذا "
        "هو الثمن الحقيقيّ لبَيع مَن وقفوا وقاتلوا من أجلك. ثلاثمئة "
        "إسبرطيّ صاروا خالدين. والرجل الذي باعهم صارَ اسمًا للشيء "
        "الذي يوقظك من نومك وأنت تصرخ. الثالثة ثابتة فعلًا — لكنّ ما "
        "ثبتَ هنا لم يكن المجد. كان العار.",
    ]),
}


# ══════════════════════════════════════════════════════════════════════════════
#  PERSIAN  —  خیانت افیالتیس
#  Proverb: تا سه نشه، بازی نشه  (Things aren't settled until the third round)
#  Register: Modern literary Persian, quality podcast voice
#  Note: Uses خشایارشا (the Persian name for Xerxes)
# ══════════════════════════════════════════════════════════════════════════════

FA = {
    **BASE,
    "lang":        {"S": "fa"},
    "langStoryId": {"S": "fa#ephialtes-betrayal"},
    "updatedAt":   {"N": TIMESTAMP},

    "title":    {"S": "خیانتِ اِفیالتیس"},
    "subtitle": {"S": "مردی که یونان را به زَرِ پارس فروخت"},
    "excerpt":  {"S": "می\u200cگویند «تا سه نشه، بازی نشه.» در نبرد تِرموپیل، سه بار آزموده شد — اما آنچه بازی را تمام کرد شمشیر نبود. خیانت بود. یک مرد محلی که راه پنهانی در کوه\u200cها می\u200cشناخت، تمام معادلات را عوض کرد."},

    "moralOrLesson": {"S": "خیانت ویرانگرتر از هر لشکری\u200cست — یک ضربه از درون، کاری را خراب می\u200cکند که شجاعت سیصد مرد ساخته بود."},

    "characters": characters([
        "اِفیالتیسِ تراخیسی",
        "خشایارشا",
        "جاویدانِ پارسی",
        "نگهبانان فوکیس",
        "شاه لِئونیداس",
    ]),

    "paragraphs": paragraphs([

        # P1 — Opening + proverb subversion
        "می\u200cگویند «تا سه نشه، بازی نشه.» در نبرد تِرموپیل، سه بار "
        "آزموده شد — اما آنچه بازی را تمام کرد شمشیر نبود. خیانت بود. "
        "سیصد جنگاور اسپارتی با چند هزار متحد یونانی، گذرگاهی تنگ در "
        "ساحل یونان را سد کردند و تمام لشکر شاهنشاهی ایران نتوانست از "
        "آن\u200cها بگذرد. آنچه همه\u200cچیز را عوض کرد یک نفر بود — مردی "
        "محلی به نام اِفیالتیس که راه پنهانی در کوه\u200cها می\u200cشناخت.",

        # P2 — Two days of battle
        "دو روز تمام در تابستان ۴۸۰ پیش از میلاد، یونانی\u200cها بهای "
        "سنگینی از پارسیان گرفتند. خشایارشا — شاهنشاه ایران — با "
        "لشکری آمده بود که تاریخ\u200cنویسان باستان می\u200cگفتند وقتی آب "
        "می\u200cخورد، رودخانه\u200cها خشک می\u200cشوند. اما هیچ\u200cکدام این\u200cها در "
        "تِرموپیل اهمیتی نداشت. گذرگاه آن\u200cقدر باریک بود که هر بار "
        "فقط مشتی جنگجو می\u200cتوانستند رودرروی هم بایستند — و "
        "اسپارتی\u200cهایی که خط مقدم را گرفته بودند، ورزیده\u200cترین سربازان "
        "جهان باستان بودند.",

        # P3 — Xerxes desperate, Immortals fail, Ephialtes appears
        "خشایارشا درمانده شده بود. حتی «جاویدان» — ده\u200cهزار جنگجوی "
        "برگزیده که چون هر کشته\u200cای فوری جایگزین می\u200cشد این نام را "
        "داشتند — به خط یونانی\u200cها یورش برده و پس زده شده بودند. "
        "درست همان\u200cجا بود که اِفیالتیس سر و کله\u200cاش در اردوگاه "
        "پارسیان پیدا شد. مردی محلی که هر کوره\u200cراهی در آن کوه\u200cها "
        "را مثل کف دستش بلد بود، و چیزی برای فروش داشت: جای "
        "گذرگاهی پنهان که پشت سر یونانی\u200cها درمی\u200cآمد. بهایش؟ طلا. "
        "آن\u200cهم کُلّی طلا.",

        # P4 — Night march, Phocian failure
        "خشایارشا یک لحظه هم درنگ نکرد. همان شب، ده\u200cهزار جاویدان "
        "را فرستاد تا پشت سر اِفیالتیس از آن راه پنهانی بروند. "
        "اسپارتی\u200cها کاملاً غافلگیر نشدند: لِئونیداس، فرمانده\u200cشان، "
        "هزار سرباز از ناحیه فوکیس را برای نگهبانی آن مسیر گمارده "
        "بود. اما وقتی جاویدان سپیده\u200cدم از میان درختان بیرون آمدند، "
        "آن نگهبان\u200cها وحشت\u200cزده شدند. به تپه\u200cای بالا گریختند تا جان "
        "خودشان را نجات بدهند و راه را کاملاً باز گذاشتند.",

        # P5 — Leonidas' decision
        "با طلوع آفتاب، لِئونیداس فهمید که تمام شده. پارسیان "
        "به\u200cزودی پشت سرش می\u200cرسیدند و نیروی کوچکش محاصره می\u200cشد. "
        "پس تصمیمی گرفت که این نبرد را به افسانه تبدیل کرد: بیشتر "
        "لشکر یونانی را فرستاد تا جان سالم به در ببرند، و خودش "
        "ماند — با سیصد اسپارتی و هفتصد داوطلب از شهر تِسپیا. "
        "کارشان ساده و محال بود: آن\u200cقدر بایستند تا بقیه فرار کنند.",

        # P6 — The last stand
        "و ایستادند. جنگیدند تا نیزه\u200cهایشان شکست. بعد با شمشیر "
        "جنگیدند. بعد با دست خالی. تا آخرین نفر افتادند. اما "
        "فداکاری\u200cشان جواب داد — لشکر یونانی\u200cای که عقب\u200cنشینی کرده "
        "بود نجات یافت، دوباره سازمان گرفت، و طی جنگ\u200cهای سال بعد "
        "پارسیان را شکست داد. سیصد نفر مُردند تا یونان زنده بماند.",

        # P7 — Ephialtes' fate
        "و اِفیالتیس؟ یونانی\u200cها چنان جایزه\u200cای روی سرش گذاشتند "
        "که تا آخر عمر فراری زندگی کرد. به شمال، به تِسالی گریخت — "
        "اما وقتی کل یک ملت دنبالت باشد، جای پنهان شدن نیست. "
        "هِرودوت، تاریخ\u200cنگار باستان، می\u200cنویسد اِفیالتیس سرانجام "
        "کشته شد — نه حتی به خاطر خیانتش، بلکه در یک دعوای شخصی "
        "بی\u200cربط. اسپارتی\u200cها با این حال جایزه را به قاتلش دادند. "
        "عدالت، عدالت است — حتی اگر تصادفی سر برسد.",

        # P8 — Legacy + proverb callback
        "دو هزار و پانصد سال گذشته و نام اِفیالتیس هنوز پاک نشده. "
        "در یونانی امروزی، «اِفیالتیس» یعنی «کابوس» — همین یک "
        "کلمه. این بهای واقعی فروختن کسانی\u200cست که ایستادند و برایت "
        "جنگیدند. سیصد اسپارتی جاودانه شدند. و مردی که فروختشان شد "
        "نامی برای چیزی که نیمه\u200cشب از خواب بیدارت می\u200cکند. تا سه "
        "نشه، بازی نشه — اما اینجا بازی سوم نه با شمشیر تمام شد، "
        "نه با دلاوری. با خیانت تمام شد.",
    ]),
}


# ══════════════════════════════════════════════════════════════════════════════
#  TURKISH  —  Ephialtes'in İhaneti
#  Proverb: Sabrın sonu selamettir  (The end of patience is salvation)
#  Register: Direct modern Turkish storytelling, punchy and gripping
# ══════════════════════════════════════════════════════════════════════════════

TR = {
    **BASE,
    "lang":        {"S": "tr"},
    "langStoryId": {"S": "tr#ephialtes-betrayal"},
    "updatedAt":   {"N": TIMESTAMP},

    "title":    {"S": "Ephialtes\u2019in \u0130haneti"},
    "subtitle": {"S": "Yunanistan\u2019\u0131 Pers alt\u0131n\u0131na satan adam"},
    "excerpt":  {"S": "\u00abSabr\u0131n sonu selamettir\u00bb derler. Thermopylae\u2019de Pers Kral\u0131 Kserkses\u2019in sabr\u0131 t\u00fckendi ve selamete kavu\u015ftu \u2014 ama o selamet bir hainin elinden geldi. \u00dc\u00e7 y\u00fcz Spartal\u0131\u2019n\u0131n durdurdu\u011fu koca imparatorlu\u011fu, da\u011flardaki gizli bir patikay\u0131 bilen tek bir adam y\u0131kt\u0131."},

    "moralOrLesson": {"S": "\u0130hanet sava\u015f meydanlar\u0131n\u0131n en y\u0131k\u0131c\u0131 silah\u0131d\u0131r \u2014 \u00fc\u00e7 y\u00fcz Spartal\u0131\u2019n\u0131n cesaretinin ba\u015fard\u0131\u011f\u0131n\u0131 tek bir hain geri ald\u0131."},

    "characters": characters([
        "Trachisli Ephialtes",
        "Kral Kserkses",
        "Pers \u00d6l\u00fcms\u00fczleri",
        "Fokis muhaf\u0131zlar\u0131",
        "Kral Leonidas",
    ]),

    "paragraphs": paragraphs([

        # P1 — Opening + proverb subversion
        "\u00abSabr\u0131n sonu selamettir\u00bb derler. Thermopylae\u2019de Pers "
        "Kral\u0131 Kserkses\u2019in sabr\u0131n\u0131n sonu ger\u00e7ekten selamet oldu "
        "\u2014 ama o selamet kahramanl\u0131kla de\u011fil, ihanetle geldi. "
        "Tarihin en \u00fcnl\u00fc son direni\u015finde \u00fc\u00e7 y\u00fcz Spartal\u0131 ve "
        "birka\u00e7 bin Yunan m\u00fcttefiki, dar bir sahil ge\u00e7idinde koca "
        "Pers \u0130mparatorlu\u011fu\u2019nu durdurmu\u015ftu. Onlar\u0131 yenen daha "
        "g\u00fc\u00e7l\u00fc bir ordu de\u011fildi. B\u00f6lgeyi avucunun i\u00e7i gibi bilen "
        "Ephialtes ad\u0131nda bir adamd\u0131 \u2014 da\u011flarda gizli bir patika "
        "biliyordu ve satmaya karar vermi\u015fti.",

        # P2 — Two days of battle
        "M\u00d6 480 yaz\u0131n\u0131n son g\u00fcnlerinde Yunanl\u0131lar iki g\u00fcn boyunca "
        "Perslere o dar ge\u00e7idin her kar\u0131\u015f\u0131n\u0131 kan pahas\u0131na \u00f6detti. "
        "Pers Kral\u0131 Kserkses \u00f6yle b\u00fcy\u00fck bir orduyla gelmi\u015fti ki "
        "antik tarih\u00e7iler ordunun su i\u00e7ti\u011finde nehirleri kuruttu\u011funu "
        "yaz\u0131yordu. Ama Thermopylae\u2019de bunlar\u0131n hi\u00e7biri i\u015fe "
        "yaramad\u0131. Ge\u00e7it o kadar dard\u0131 ki ayn\u0131 anda sadece bir "
        "avu\u00e7 asker d\u00f6v\u00fc\u015febiliyordu \u2014 ve en \u00f6nde duran "
        "Spartal\u0131lar antik d\u00fcnyan\u0131n en iyi e\u011fitimli "
        "sava\u015f\u00e7\u0131lar\u0131yd\u0131.",

        # P3 — Immortals fail, Ephialtes appears
        "Kserkses \u00e7aresiz kalm\u0131\u015ft\u0131. Se\u00e7kin birli\u011fi "
        "\u00d6l\u00fcms\u00fczler \u2014 d\u00fc\u015fen her askerin an\u0131nda yerine yenisi "
        "kondu\u011fu i\u00e7in bu ad\u0131 alan on bin ki\u015filik \u00f6zel kuvvet \u2014 "
        "Yunan savunma hatt\u0131na sald\u0131rm\u0131\u015f ve geri "
        "p\u00fcsk\u00fcrt\u00fclm\u00fc\u015ft\u00fc. Tam o s\u0131rada Ephialtes Pers "
        "ordug\u00e2h\u0131na \u00e7\u0131kageldi. B\u00f6lgenin her ta\u015f\u0131n\u0131 tan\u0131yan "
        "bir yerliydi ve satacak bir \u015feyi vard\u0131: Yunanlar\u0131n "
        "arkas\u0131na dola\u015fan gizli bir da\u011f yolunun yeri. Fiyat\u0131 "
        "m\u0131? Alt\u0131n. Bol miktarda alt\u0131n.",

        # P4 — Night march, Phocian failure
        "Kserkses bir an bile teredd\u00fct etmedi. O gece "
        "\u00d6l\u00fcms\u00fczlerin tamam\u0131n\u0131 \u2014 on bin ki\u015fiyi \u2014 "
        "Ephialtes\u2019in pe\u015finden gizli patikaya yollad\u0131. "
        "Spartal\u0131lar tamamen haz\u0131rl\u0131ks\u0131z de\u011fildi: Kral Leonidas, "
        "Fokis b\u00f6lgesinden bin askeri o yolu korumakla "
        "g\u00f6revlendirmi\u015fti. Ama \u00d6l\u00fcms\u00fczler \u015fafakla birlikte "
        "a\u011fa\u00e7lar\u0131n aras\u0131ndan belirdi\u011finde n\u00f6bet\u00e7iler pani\u011fe "
        "kap\u0131ld\u0131. Yak\u0131ndaki bir tepeye t\u0131rmanarak canlar\u0131n\u0131 "
        "kurtard\u0131lar ve yolu ard\u0131na kadar a\u00e7\u0131k b\u0131rakt\u0131lar.",

        # P5 — Leonidas' decision
        "G\u00fcne\u015f do\u011fdu\u011funda Leonidas sonun geldi\u011fini anlad\u0131. "
        "Persler yak\u0131nda arkas\u0131na ge\u00e7ecek, k\u00fc\u00e7\u00fck kuvveti "
        "ku\u015fat\u0131lacakt\u0131. O an tarihi efsaneye \u00e7eviren karar\u0131 "
        "verdi: Yunan ordusunun b\u00fcy\u00fck b\u00f6l\u00fcm\u00fcn\u00fc g\u00fcneye, "
        "g\u00fcvenli\u011fe g\u00f6nderdi. Kendisi geride kald\u0131 \u2014 \u00fc\u00e7 y\u00fcz "
        "Spartal\u0131s\u0131 ve Thespiai \u015fehrinden gelen yedi y\u00fcz "
        "g\u00f6n\u00fcll\u00fcyle birlikte. G\u00f6revleri basit ve imk\u00e2ns\u0131zd\u0131: "
        "geridekiler ka\u00e7ana kadar dayanmak.",

        # P6 — The last stand
        "Ve dayand\u0131lar. M\u0131zraklar\u0131 k\u0131r\u0131lana dek sava\u015ft\u0131lar, "
        "sonra k\u0131l\u0131\u00e7lar\u0131yla, sonra yal\u0131n elleriyle. Son "
        "nefeslerine kadar d\u00f6v\u00fc\u015ft\u00fcler ve hepsi \u00f6ld\u00fc. Ama "
        "fedak\u00e2rl\u0131klar\u0131 bo\u015fa gitmedi \u2014 \u00e7ekilen Yunan ordusu "
        "kurtuldu, yeniden topland\u0131 ve ertesi y\u0131l boyunca verilen "
        "sava\u015flarda Persleri yenilgiye u\u011fratt\u0131. \u00dc\u00e7 y\u00fcz ki\u015fi "
        "\u00f6ld\u00fc ki Yunanistan ya\u015fas\u0131n.",

        # P7 — Ephialtes' fate
        "Ya Ephialtes? Yunanl\u0131lar ba\u015f\u0131na \u00f6yle b\u00fcy\u00fck bir \u00f6d\u00fcl "
        "koydu ki hayat\u0131n\u0131n geri kalan\u0131n\u0131 ka\u00e7arak ge\u00e7irdi. "
        "Kuzeye, Teselya\u2019ya s\u0131\u011f\u0131nd\u0131 \u2014 ama b\u00fct\u00fcn bir "
        "uygarl\u0131k seni ararken saklanacak yer yoktur. Antik "
        "tarih\u00e7i Herodotos\u2019a g\u00f6re Ephialtes sonunda \u00f6ld\u00fcr\u00fcld\u00fc "
        "\u2014 ihanetiyle bile alakas\u0131 olmayan s\u0131radan bir ki\u015fisel "
        "kavgada. Spartal\u0131lar katilini yine de \u00f6d\u00fcllendirdi. "
        "Adalet adalettir \u2014 tesad\u00fcfen gelse bile.",

        # P8 — Legacy + proverb callback
        "\u0130ki bu\u00e7uk bin y\u0131l ge\u00e7ti ve Ephialtes ad\u0131 h\u00e2l\u00e2 "
        "lekelidir. Modern Yunancada \u00abEphialtes\u00bb kelimesi tam "
        "anlam\u0131yla \u00abk\u00e2bus\u00bb demek. Senin i\u00e7in sava\u015fanlar\u0131 "
        "satman\u0131n ger\u00e7ek bedeli i\u015fte budur. \u00dc\u00e7 y\u00fcz Spartal\u0131 "
        "\u00f6l\u00fcms\u00fczle\u015fti. Onlara ihanet eden adam ise gecenin "
        "karanl\u0131\u011f\u0131nda insan\u0131 \u00e7\u0131\u011fl\u0131k \u00e7\u0131\u011fl\u0131\u011fa uyand\u0131ran \u015feyin "
        "ad\u0131 oldu. Sabr\u0131n sonu selamet olabilir \u2014 ama "
        "Kserkses\u2019e gelen selamet bir hainin elinden geldi. Ve "
        "tarih sabredeni de\u011fil, sava\u015fanlar\u0131 hat\u0131rlad\u0131.",
    ]),
}


# ══════════════════════════════════════════════════════════════════════════════
#  VALIDATION + PUSH
# ══════════════════════════════════════════════════════════════════════════════

def validate(label, item):
    """Validate character and paragraph constraints."""
    paras = item["paragraphs"]["L"]
    n = len(paras)
    print(f"\n{'='*60}")
    print(f"  {label}  —  {item['title']['S']}")
    print(f"{'='*60}")
    print(f"  Paragraphs: {n}  (target 6-8)")

    total_chars = 0
    for i, p in enumerate(paras):
        text = p["M"]["text"]["S"]
        chars = len(text)
        words = len(text.split())
        total_chars += chars
        status = "OK" if chars <= 500 else "OVER"
        print(f"  P{i+1}: {chars:>4} chars, {words:>3} words  [{status}]")
        if chars > 500:
            print(f"       *** EXCEEDS 500 char limit by {chars - 500} ***")
        if words > 100:
            print(f"       *** EXCEEDS 100 word limit by {words - 100} ***")

    pct = ((total_chars - 3000) / 3000) * 100
    status = "OK" if abs(pct) <= 20 else "OUT OF RANGE"
    print(f"  Total: {total_chars} chars ({pct:+.1f}% from 3000)  [{status}]")
    return True


def write_and_push(label, item, filename):
    """Write JSON file and push to DynamoDB."""
    filepath = os.path.join(os.path.dirname(__file__), filename)

    # Write JSON file
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(item, f, ensure_ascii=False, indent=2)
    print(f"\n  Written: {filepath}")

    # Validate JSON by re-reading
    with open(filepath, "r", encoding="utf-8") as f:
        reloaded = json.load(f)
    print(f"  JSON validation: OK ({len(json.dumps(reloaded, ensure_ascii=False))} bytes)")

    # Push to DynamoDB
    cmd = [
        "aws", "dynamodb", "put-item",
        "--table-name", TABLE,
        "--region", REGION,
        "--item", f"file://{filepath}",
    ]
    print(f"  Pushing to DynamoDB ({label})...")
    result = subprocess.run(
        cmd,
        capture_output=True,
        text=True,
        env={**os.environ, "AWS_REGION": REGION},
    )

    if result.returncode == 0:
        print(f"  ✓ {label} pushed successfully!")
        return True
    else:
        print(f"  ✗ FAILED: {result.stderr}")
        return False


def verify_push(lang_code):
    """Verify the item exists in DynamoDB."""
    cmd = [
        "aws", "dynamodb", "get-item",
        "--table-name", TABLE,
        "--region", REGION,
        "--key", json.dumps({
            "siteId": {"S": "thermopylae"},
            "langStoryId": {"S": f"{lang_code}#ephialtes-betrayal"}
        }),
        "--projection-expression", "lang, title, langStoryId",
    ]
    result = subprocess.run(
        cmd,
        capture_output=True,
        text=True,
        env={**os.environ, "AWS_REGION": REGION},
    )
    if result.returncode == 0 and '"Item"' in result.stdout:
        data = json.loads(result.stdout)
        title = data["Item"]["title"]["S"]
        print(f"  ✓ Verified: {lang_code} → {title}")
        return True
    else:
        print(f"  ✗ Verification failed for {lang_code}")
        return False


if __name__ == "__main__":
    items = [
        ("Arabic (ar)",  AR, "ephialtes_ar.json"),
        ("Persian (fa)", FA, "ephialtes_fa.json"),
        ("Turkish (tr)", TR, "ephialtes_tr.json"),
    ]

    # Validate all
    all_valid = True
    for label, item, _ in items:
        if not validate(label, item):
            all_valid = False

    if not all_valid:
        print("\n*** Validation failed. Fix issues before pushing. ***")
        sys.exit(1)

    print("\n" + "="*60)
    print("  PUSHING TO DYNAMODB")
    print("="*60)

    # Push each
    results = []
    for label, item, filename in items:
        ok = write_and_push(label, item, filename)
        results.append((label, ok))

    # Verify each
    print("\n" + "="*60)
    print("  VERIFICATION")
    print("="*60)
    for lang_code in ["ar", "fa", "tr"]:
        verify_push(lang_code)

    # Summary
    print("\n" + "="*60)
    print("  SUMMARY")
    print("="*60)
    for label, ok in results:
        status = "✓ SUCCESS" if ok else "✗ FAILED"
        print(f"  {label}: {status}")
    print()
