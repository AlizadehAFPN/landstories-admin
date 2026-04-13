#!/usr/bin/env python3
"""Generate DynamoDB JSON items for Socrates story in ar, fa, tr and write to files."""

import json
import time
import os

TIMESTAMP = str(int(time.time()))

# Shared fields (unchanged from English)
SHARED = {
    "siteId": {"S": "delphi"},
    "storyId": {"S": "socrates-wisest"},
    "icon": {"S": "\U0001f9e0"},
    "tier": {"S": "A"},
    "source": {"S": "Plato's Apology (20e-23c), Xenophon's Apology, Diogenes Laertius's Lives of Eminent Philosophers"},
    "era": {"S": "430 BCE"},
    "readingTimeMinutes": {"N": "3"},
    "image": {"S": ""},
    "thumbnail": {"S": ""},
    "disabled": {"BOOL": False},
    "coordinates": {"M": {"lng": {"N": "22.501"}, "lat": {"N": "38.4824"}}},
    "hasAudio": {"BOOL": False},
    "isFree": {"BOOL": True},
    "storyCategory": {"S": "prophets_pilgrims"},
    "updatedAt": {"N": TIMESTAMP},
}

# ── ARABIC ──────────────────────────────────────────────────────────────────

AR = {
    "lang": "ar",
    "langStoryId": "ar#socrates-wisest",
    "title": "سُقراط — أحكمُ البشر",
    "subtitle": "النُّبوءة التي أطلقَت الفلسفة",
    "characters": ["سُقراط", "خَيرِيفون", "البيثِيا", "أبولُّو", "مواطنو أثينا"],
    "moralOrLesson": "الحكمةُ الحقيقيّة تبدأ بالاعتراف بالجهل. مَن يدّعي المعرفة وهو جاهل يخدعُ نفسَه قبل أن يخدعَ غيره. أشجعُ ما قاله إنسانٌ عبر التاريخ كلمتان: «لا أعلم.»",
    "paragraphs": [
        "حوالَيْ عام 430 قبل الميلاد، قرَّرَ خَيرِيفون — أقرب أصدقاء سُقراط — أن يفعلَ شيئًا لم يجرؤ عليه أحد. سافرَ إلى مَعبد دِلفي، أقدس مكانٍ في اليونان القديمة، حيث كانت كاهنةٌ تُدعى «البيثِيا» تنطِقُ بكلامِ الإله أبولُّو. سألها سؤالًا واحدًا جريئًا: «هل هناك أحدٌ أحكمُ من سُقراط؟» فجاءَ الجوابُ قاطعًا كنصلِ سيف: «لا أحد.»",

        "حين وصلَ الخبرُ إلى أثينا، لم يحتفل سُقراط. لم يبتسم حتّى. وقفَ في حيرةٍ حقيقيّة: هو يعرف نفسَه جيّدًا — رجلٌ حافي القدمَين يتجوَّلُ في الأسواق ويطرحُ أسئلةً تُزعج الناس وتُقلق راحتَهم. لا مالَ عنده، لا منصبَ، لا كتابًا واحدًا باسمِه. كلُّ ما يملكُه فضولٌ لا ينتهي وقدرةٌ غريبة على إحراجِ المتكلِّمين. فكيف يقولُ أعظمُ معبدٍ في اليونان إنّه أحكمُ إنسانٍ على قيدِ الحياة؟",

        "فعلَ سُقراط ما يفعلُه دائمًا: ذهبَ يبحثُ عن الحقيقة بنفسِه. توجَّهَ إلى مَن تُشيرُ إليهم أثينا بالحُكماء — السياسيّين أوّلًا، ثمّ الشعراء، ثمّ الحِرَفيّين المَهَرة — وجلسَ مع كلٍّ منهم وبدأ يسألُ أسئلتَه المُزعجة: ما العدالة؟ ما الشجاعة؟ ما الخير؟ ماذا تعرفون فعلًا، وكيف تعرفونه؟",

        "يقولون «الثالثةُ ثابتة» — وقد ثبتَت. السياسيّون تكلَّموا عن العدالة لكنّهم عجزوا عن تعريفها. الشعراء كتبوا أبياتًا تخطفُ الأنفاس لكنّهم لم يستطيعوا شرحَ ما تعنيه. والحِرَفيّون — وهم الثالثةُ الثابتة — أتقنوا صنعتَهم فظنّوا أنّ ذلك يجعلُهم خُبراءَ في كلّ شيء. ثلاثُ فئاتٍ، ثلاثُ خيبات، ونتيجةٌ واحدة: لا أحدَ منهم يعرفُ شيئًا حقيقيًّا.",

        "وهنا فهِمَ سُقراط ما قصدَهُ المعبد. الفرقُ بينه وبين كلّ هؤلاء لم يكن في كمّيّة المعرفة — فالجميعُ جاهلون أمام الأسئلة الكُبرى. الفرقُ الوحيد: هم ظنّوا أنّهم يعرفون، وسُقراط كان يعرفُ أنّه لا يعرف. تلك الفجوةُ الصغيرة — الشجاعة أن تقولَ «لا أعلم» — كانت كلَّ ما يفصلُ بين الحكمة والوَهم.",

        "قالها سُقراط بنفسِه: «أنا أحكمُ من هذا الرجل. كلانا لا يعرفُ شيئًا يستحقّ المعرفة، لكنّه يظنّ أنّه يعرفُ وهو لا يعرف. أمّا أنا، فأعرفُ على الأقلّ أنّني لا أعرف.» ربّما تكون هذه أهمّ فكرةٍ خطرَت على بالِ إنسان — وخُلاصتُها: أذكى شخصٍ في الغرفة هو مَن يعرفُ حدودَ ما لا يعرفُه.",

        "تلك النُّبوءة رسمَت مسارَ حياتِه — وحُكمَ إعدامِه. أمضى ثلاثين سنةً يسألُ أهلَ أثينا ويكشفُ زيفَ ثقتهم ويتحدّاهم أن يُفكِّروا فعلًا. صار بطلًا عند بعضهم وخطرًا لا يُحتمَل عند آخرين. في عام 399 قبل الميلاد، حاكمَته أثينا بتهمة «إفساد الشباب» وحكمَت عليه بالموت. عُرض عليه الهرب — أصدقاؤه رشَوا الحرّاس وجهَّزوا سفينة — لكنّه رفض. عاشَ حياتَه كلَّها تحت قوانين أثينا، ولم يكن ليخونَها في آخرِ أيّامه.",

        "فوق مدخل معبد دِلفي، نُقشَت كلمتان في الحجر: «اعرِف نفسَك.» آلافُ الناس قرأوا تلك العبارة ومَضَوا في طريقهم. سُقراط وحده أخذها على مَحمَل الجِدّ وبنى حياتَه كلَّها حولها. مرَّ خمسةٌ وعشرون قرنًا، ونحن لا نزال نحاولُ اللحاق به.",
    ],
}

# ── PERSIAN ─────────────────────────────────────────────────────────────────

FA = {
    "lang": "fa",
    "langStoryId": "fa#socrates-wisest",
    "title": "سقراط — فرزانه\u200cترینِ آدمیان",
    "subtitle": "پیشگویی\u200cای که فلسفه را به دنیا آورد",
    "characters": ["سقراط", "خایرِفون", "پوتیا", "آپولون", "شهروندانِ آتن"],
    "moralOrLesson": "خِرَدِ راستین از دانستن آغاز نمی\u200cشود، از پذیرفتنِ ندانستن آغاز می\u200cشود. کسی که ادّعای دانایی کند و نادان باشد، پیش از همه خودش را فریب داده است. شجاع\u200cترین جمله\u200cای که آدمی تا به حال بر زبان آورده، دو کلمه بیشتر نیست: «نمی\u200cدانم.»",
    "paragraphs": [
        "حوالیِ سالِ ۴۳۰ پیش از میلاد، خایرِفون — نزدیک\u200cترین دوستِ سقراط — دست به کاری زد که مسیرِ تاریخِ اندیشه را برای همیشه عوض کرد. راه اُفتاد به سمتِ دلفی، مقدّس\u200cترین پرستشگاهِ یونانِ باستان، جایی که کاهنه\u200cای به نامِ «پوتیا» زبانِ حالِ خدایِ آپولون بود. یک سؤال پرسید، فقط یکی: «آیا کسی داناتر از سقراط هست؟» پاسخِ پوتیا کوتاه بود و تکان\u200cدهنده: «نه. هیچ\u200cکس.»",

        "وقتی خبر به آتن رسید، سقراط جشن نگرفت. حتّی لبخند هم نزد. مات و مبهوت ماند. خودش را می\u200cشناخت — مردی پابرهنه که در کوچه\u200cهای آتن پرسه می\u200cزد و از هر رهگذری سؤالاتِ اعصاب\u200cخُردکن می\u200cپرسید. جوابِ هیچ سؤالی را نداشت. پس چطور مقدّس\u200cترین معبدِ یونان او را فرزانه\u200cترینِ زندگان خوانده بود؟",

        "سقراط کاری کرد که همیشه می\u200cکرد: رفت دنبالِ حقیقت. سراغِ کسانی رفت که آتنی\u200cها حکیم\u200cشان می\u200cدانستند — سیاست\u200cمداران، شاعران، پیشه\u200cوران — و شروع کرد به سؤال\u200cپیچ کردن\u200cشان: عدالت چیست؟ شجاعت یعنی چه؟ واقعاً چه می\u200cدانید و از کجا می\u200cدانید؟",

        "نتیجه ویرانگر بود. سیاست\u200cمداران از عدالت حرف می\u200cزدند ولی نمی\u200cتوانستند تعریفش کنند. شاعران شعرهایی می\u200cسرودند که دل آدم را می\u200cلرزاند، ولی خودشان نمی\u200cفهمیدند چه نوشته\u200cاند. پیشه\u200cوران در کارشان استاد بودند، ولی همین استادی\u200cشان را دلیل می\u200cگرفتند که در همه\u200cچیز صاحب\u200cنظرند. هر سه گروه مطمئن بودند که حکیم\u200cاند. هیچ\u200cکدام نبودند.",

        "می\u200cگویند تا خدا نخواهد، برگی از درخت نمی\u200cاُفتد. خدایِ دلفی خواسته بود — و برگ اُفتاده بود. ولی چیزی که آن زیر پنهان بود تلخ بود: فرقِ سقراط با بقیه دانش نبود. همه در برابرِ پرسش\u200cهای بزرگ به یک اندازه درمانده بودند. فقط آن\u200cها خیال می\u200cکردند جواب را دارند، و سقراط می\u200cدانست که ندارد. همین یک شکافِ کوچک — جرأتِ گفتنِ «نمی\u200cدانم» — تمامِ فاصله\u200cیِ میانِ خِرَد و خودفریبی بود.",

        "خودش این\u200cطور گفت: «من از این مرد داناترم. هیچ\u200cکدام\u200cمان چیزی نمی\u200cدانیم، ولی او گمان می\u200cکند می\u200cداند در حالی که نمی\u200cداند. من دست\u200cکم می\u200cدانم که نمی\u200cدانم.» شاید مهم\u200cترین حرفی باشد که تا به حال انسانی زده — و خلاصه\u200cاش این است: دانایی واقعی از دانستن شروع نمی\u200cشود، از جرأتِ ندانستن شروع می\u200cشود.",

        "آن یک جمله\u200cی کاهنه مسیرِ زندگیِ سقراط را ساخت — و نابودش کرد. سی سال تمام در آتن گشت، اعتمادِ کاذبِ مردم را آشکار کرد، و از همه خواست که واقعاً فکر کنند. برای عدّه\u200cای قهرمان شد و برای بقیه تهدیدی خطرناک. سالِ ۳۹۹ پیش از میلاد، آتن او را به جُرمِ «فاسد کردنِ جوانان» محاکمه کرد و به مرگ محکومش کرد. فرار پیشنهاد شد — دوستانش نگهبان\u200cها را خریده بودند و کشتی آماده بود — ولی سقراط نپذیرفت. تمامِ عمرش زیرِ قوانینِ آتن زیسته بود و حاضر نبود در آخرین روزها خیانتشان کند.",

        "بالای درِ معبدِ دلفی، دو کلمه در سنگ حک شده بود: «خودت را بشناس.» هزاران نفر آن را خواندند و ردّ شدند. سقراط تنها کسی بود که جدّی\u200cاش گرفت و تمامِ عمرش را بر پایه\u200cاش ساخت. بیست\u200cوپنج قرن گذشته، و ما هنوز داریم تلاش می\u200cکنیم به او برسیم.",
    ],
}

# ── TURKISH ─────────────────────────────────────────────────────────────────

TR = {
    "lang": "tr",
    "langStoryId": "tr#socrates-wisest",
    "title": "Sokrates \u2014 \u0130nsanlar\u0131n En Bilgesi",
    "subtitle": "Felsefeyi do\u011furan kehanet",
    "characters": ["Sokrates", "Khairephon", "Pythia", "Apollon", "Atinal\u0131 yurtta\u015flar"],
    "moralOrLesson": "Ger\u00e7ek bilgelik bildiklerinle de\u011fil, bilmediklerini kabul etme cesaretiyle ba\u015flar. Bilmedi\u011fi h\u00e2lde bildi\u011fini sanan, herkesten \u00f6nce kendini kand\u0131r\u0131r. Tarih boyunca s\u00f6ylenmi\u015f en cesur s\u00f6z iki kelimedir: \u201cBilmiyorum.\u201d",
    "paragraphs": [
        "Milattan \u00f6nce 430 civar\u0131nda, Sokrates\u2019in en yak\u0131n arkada\u015f\u0131 Khairephon bir \u015fey yapt\u0131 ki d\u00fc\u015f\u00fcnce tarihini sonsuza dek de\u011fi\u015ftirdi. Delfi\u2019ye gitti \u2014 antik Yunan\u2019\u0131n en kutsal tap\u0131na\u011f\u0131na, Apollon tanr\u0131s\u0131n\u0131n sesi say\u0131lan Pythia ad\u0131 bir k\u00e2hinin kehanet verdi\u011fi yere. Tek bir soru sordu: \u201cSokrates\u2019ten daha bilge biri var m\u0131?\u201d Pythia\u2019n\u0131n cevab\u0131 k\u0131sa ve sars\u0131c\u0131yd\u0131: \u201cHay\u0131r. Kimse yok.\u201d",

        "Haber Atina\u2019ya ula\u015ft\u0131\u011f\u0131nda Sokrates sevinmedi. G\u00fclümsemedi bile. Adam d\u00fcped\u00fcz \u015fa\u015fk\u0131nd\u0131. Kendini tan\u0131yordu \u2014 yal\u0131nayak sokaklarda dola\u015fan, kar\u015f\u0131s\u0131na \u00e7\u0131kan herkese sinir bozucu sorular soran, hi\u00e7bir sorunun cevab\u0131n\u0131 bilmeyen bir adam. Yunanistan\u2019\u0131n en kutsal tap\u0131na\u011f\u0131 onu nas\u0131l olur da ya\u015fayan en bilge insan ilan edebilirdi?",

        "Sokrates her zamanki gibi yapt\u0131: ara\u015ft\u0131rmaya koyuldu. Atina\u2019n\u0131n bilge diye sayd\u0131\u011f\u0131 insanlar\u0131 buldu \u2014 siyaset\u00e7ileri, \u015fairleri, zanaatk\u00e2rlar\u0131 \u2014 ve tek tek sorgulamaya ba\u015flad\u0131. Adalet nedir? Cesaret nedir? Ger\u00e7ekten ne biliyorsunuz, nereden biliyorsunuz?",

        "Sonu\u00e7lar y\u0131k\u0131c\u0131yd\u0131. Siyaset\u00e7iler adaletten bol bol bahsediyorlard\u0131 ama tan\u0131mlayam\u0131yorlard\u0131. \u015eairler nefes kesen dizeler yaz\u0131yorlard\u0131 ama ne demek istediklerini a\u00e7\u0131klayam\u0131yorlard\u0131. Zanaatk\u00e2rlar kendi i\u015flerinde ustayd\u0131lar ama bu ustal\u0131\u011f\u0131n kendilerini her konuda otorite yapt\u0131\u011f\u0131n\u0131 san\u0131yorlard\u0131. \u00dc\u00e7\u00fc de bilge oldu\u011fundan emindi. Hi\u00e7biri de\u011fildi.",

        "\u0130\u015fte o an her \u015fey yerine oturdu. Sokrates\u2019le \u00f6tekilerin aras\u0131ndaki fark bilgi de\u011fildi \u2014 d\u00fcr\u00fcstl\u00fckt\u00fc. B\u00fcy\u00fck sorular kar\u015f\u0131s\u0131nda herkes ayn\u0131 \u00f6l\u00e7\u00fcde cahildi. Ama s\u00f6zde bilgeler cevab\u0131 bildiklerini san\u0131yorlard\u0131; Sokrates bilmedi\u011fini biliyordu. \u201cBilmiyorum\u201d diyebilme cesareti \u2014 bu k\u00fc\u00e7\u00fcc\u00fck aral\u0131k \u2014 bilgelikle kendini kand\u0131rma aras\u0131ndaki tek fark buydu.",

        "Kendi s\u00f6zleriyle: \u201cBu adamdan daha bilgeyim. \u0130kimiz de bilmeye de\u011fer bir \u015fey bilmiyoruz, ama o bilmedi\u011fi halde bildi\u011fini san\u0131yor. Ben en az\u0131ndan bilmedi\u011fimi biliyorum.\u201d Belki de bug\u00fcne kadar s\u00f6ylenmi\u015f en \u00f6nemli c\u00fcmle \u2014 ve \u00f6zeti \u015fu: odadaki en ak\u0131ll\u0131 ki\u015fi, bilmedi\u011finin s\u0131n\u0131rlar\u0131n\u0131 bilendir.",

        "Derler ki sabr\u0131n sonu selamettir. Sokrates otuz y\u0131l boyunca sab\u0131rla Atina\u2019y\u0131 sorgulad\u0131 \u2014 sahte g\u00fcvenleri y\u0131kt\u0131, insanlara d\u00fc\u015f\u00fcnmeyi dayatt\u0131. Ama onun sabr\u0131n\u0131n sonu selamet de\u011fil, bald\u0131ran zehri oldu. Milattan \u00f6nce 399\u2019da Atina onu \u201cgen\u00e7li\u011fi yozla\u015ft\u0131rmak\u201dla su\u00e7lad\u0131 ve \u00f6l\u00fcme mahk\u00fbm etti. Yine de belki de hakl\u0131yd\u0131 \u2014 \u00f6l\u00fcm onu Atina\u2019n\u0131n surlar\u0131ndan \u00e7\u0131kar\u0131p tarihin sayfalar\u0131na ta\u015f\u0131d\u0131. Selamet buysa, buldu.",

        "Delfi Tap\u0131na\u011f\u0131\u2019n\u0131n giri\u015finde ta\u015fa kaz\u0131nm\u0131\u015f iki kelime vard\u0131: \u201cKendini Bil.\u201d Binlerce ki\u015fi o yaz\u0131y\u0131 okuyup ge\u00e7ti. Sokrates, onu ciddiye al\u0131p b\u00fct\u00fcn hayat\u0131n\u0131 \u00fczerine kuran tek ki\u015fi oldu. Yirmi be\u015f y\u00fczy\u0131l ge\u00e7ti. H\u00e2l\u00e2 ona yeti\u015fmeye \u00e7al\u0131\u015f\u0131yoruz.",
    ],
}


def build_item(lang_data):
    """Build a complete DynamoDB item from language-specific data + shared fields."""
    item = dict(SHARED)
    item["lang"] = {"S": lang_data["lang"]}
    item["langStoryId"] = {"S": lang_data["langStoryId"]}
    item["title"] = {"S": lang_data["title"]}
    item["subtitle"] = {"S": lang_data["subtitle"]}
    item["excerpt"] = {"S": lang_data["paragraphs"][0]}
    item["moralOrLesson"] = {"S": lang_data["moralOrLesson"]}
    item["characters"] = {"L": [{"S": c} for c in lang_data["characters"]]}
    item["paragraphs"] = {
        "L": [{"M": {"text": {"S": p}}} for p in lang_data["paragraphs"]]
    }
    return item


def main():
    out_dir = os.path.dirname(os.path.abspath(__file__))

    for label, data in [("ar", AR), ("fa", FA), ("tr", TR)]:
        item = build_item(data)
        path = os.path.join(out_dir, f"socrates_{label}.json")
        with open(path, "w", encoding="utf-8") as f:
            json.dump(item, f, ensure_ascii=False, indent=2)
        print(f"[OK] Wrote {path}")

        # Validate: re-parse to ensure valid JSON
        with open(path, "r", encoding="utf-8") as f:
            parsed = json.load(f)
        para_count = len(parsed["paragraphs"]["L"])
        title = parsed["title"]["S"]
        lang_id = parsed["langStoryId"]["S"]
        print(f"     lang={label}  paragraphs={para_count}  title={title}  langStoryId={lang_id}")

        # Character count check
        total_chars = sum(len(p) for p in data["paragraphs"])
        max_para = max(len(p) for p in data["paragraphs"])
        print(f"     totalChars={total_chars}  maxParaChars={max_para}")
        if max_para > 500:
            print(f"     [WARN] Paragraph exceeds 500 chars!")
        print()


if __name__ == "__main__":
    main()
