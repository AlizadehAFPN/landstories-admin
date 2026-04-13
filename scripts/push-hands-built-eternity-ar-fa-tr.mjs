import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English) ───
const shared = {
  siteId: { S: "taj-mahal" },
  storyId: { S: "hands-that-built-eternity" },
  icon: { S: "✋" },
  tier: { S: "A" },
  source: {
    S: "Abdul Hamid Lahori, Padshahnama (c. 1648); Lutfullah Muhandis, Diwan-i-Muhandis (manuscript, Mahmud Banglori collection, Bangalore); Ebba Koch, The Complete Taj Mahal and the Riverfront Gardens of Agra (2006); Stith Thompson, Motif-Index of Folk-Literature (1955-58), motifs W181.2 and S165.7; S. Irfan Habib, Jawaharlal Nehru University; Rana Safvi, 'The Architect of the Taj Mahal' (2019)",
  },
  characters: {
    L: [
      { S: "Shah Jahan (Emperor)" },
      { S: "Ustad Ahmad Lahori (chief architect, 'Wonder of the Age')" },
      { S: "Amanat Khan Shirazi (master calligrapher, born Abd ul-Haq)" },
      {
        S: "Lutfullah Muhandis (Ahmad Lahori's son, poet and mathematician)",
      },
      {
        S: "Ataullah Rashidi (Ahmad Lahori's son, architect of Bibi Ka Maqbara)",
      },
      { S: "Ebba Koch (art historian, University of Vienna)" },
    ],
  },
  era: {
    S: "1632–1653 (construction of the Taj Mahal); myth origins uncertain, popularized 19th–20th century",
  },
  readingTimeMinutes: { N: "8" },
  image: { S: "" },
  updatedAt: { N: String(now) },
  disabled: { BOOL: false },
  thumbnail: { S: "" },
  coordinates: {
    M: {
      lng: { N: "78.0421" },
      lat: { N: "27.1751" },
    },
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "builders_wonders" },
};

// ═══════════════════════════════════════════════════════════════════
//  ARABIC (ar)
// ═══════════════════════════════════════════════════════════════════
const ar = {
  ...shared,
  lang: { S: "ar" },
  langStoryId: { S: "ar#hands-that-built-eternity" },
  title: { S: "أيادي الخُلود" },
  subtitle: {
    S: "الأسطورة المُظلمة عن تشويه بُناة تاج مَحَل، والخُرافة العالميّة عن مُعاقبة المُبدِع، وحقيقة الأيدي التي صنعت الأبد",
  },
  excerpt: {
    S: "في ظلّ تاج مَحَل تُروى حكايةٌ يعرفها الجميع: أنّ الإمبراطور شاه جَهان أمر بقطع أيدي كلّ عامل حتّى لا يُعاد بناء شيء بهذا الجمال. إنّها من أشهر الأساطير في العالم. وهي مكذوبة بالكامل.",
  },
  moralOrLesson: {
    S: "الحقيقة أجمل من الأسطورة: تاج مَحَل لم يُبنَ بالقهر والمعاناة، بل بأيدٍ حُرّة مأجورة تركت توقيعها بفخر في الحجر — لأنّ الجمال لا يحتاج إلى القسوة، بل إلى الحرّيّة.",
  },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "في مدينة أَغْرا الهنديّة، في ظلّ تاج مَحَل، تُروى حكايةٌ يعرفها كلُّ من وقف أمام ذلك الصَّرح الأبيض. يُقال إنّ الإمبراطور شاه جَهان حين اكتمل بناء ضريح زوجته عام ١٦٥٣، أمر بقطع أيدي عشرين ألف عامل — حتّى لا يبنيَ أحدٌ منهم شيئاً بهذا الجمال مرّةً أخرى. بعض الروايات تُضيف أنّه سَمَل أعينهم أيضاً. أسطورةٌ مشهورة. ومكذوبةٌ من أوّلها إلى آخرها.",
          },
        },
      },
      {
        M: {
          text: {
            S: "والطريف أنّها ليست حتّى كِذبةً أصليّة. نفس الحكاية تُروى عن كاتدرائيّة القدّيس باسيل في موسكو — أنّ إيفان الرهيب أعمى المعماريّين. وتُروى عن جامع الفاتح في إسطنبول — أنّ السلطان محمّد قطع يد المهندس. يقول المَثَل \"الكَذِبُ حَبْلُهُ قصير\"، لكنّ هذه الكِذبة بالذات حبلُها طويلٌ جدّاً — امتدّ عبر قارّاتٍ وقرون، لأنّ الناس يُحبّون أن يُصدّقوا أنّ الجمال المستحيل لا بدّ أن يكون ثمنه فادحاً.",
          },
        },
      },
      {
        M: {
          text: {
            S: "لكنّ المغول كانوا مَهووسين بالتوثيق. كتاب «بادشاه‌نامَه» — السجلّ الرسمي لبلاط شاه جَهان — يمتدّ مئات الصفحات، يُسجّل كلَّ أَجْرٍ وكلَّ عَقْد مَحاجر وكلَّ شحنة رخام. لا يذكر عقوبةً واحدة. ولا سطراً واحداً. قطعُ أربعين ألف يدٍ عن عشرين ألف عامل كان سيكون كارثةً إداريّة — خسارة مفاجئة لأمهر حِرَفيّي آسيا. إمبراطوريّة وثّقت كلّ شيء لم توثّق هذا. لأنّه ببساطة لم يحدث.",
          },
        },
      },
      {
        M: {
          text: {
            S: "بل فعل شاه جَهان العكسَ تماماً. في عام ١٦٤١، وسطَ البناء، حظر السُّخرة في أنحاء إمبراطوريّته. نقشٌ في قلعة أَغْرا يسجّل إنفاق أحدَ عشرَ مليون دام من الخزينة الملكيّة أُجوراً للعمّال. والأجمل: عثر علماء الآثار على نحو ٦٧٠ اسماً محفوراً في حجر تاج مَحَل الرملي — بالعربيّة والفارسيّة، بجانب رموز هندوسيّة وإسلاميّة معاً. لم تكن خدوش سجناء. كانت تواقيعَ فخر.",
          },
        },
      },
      {
        M: {
          text: {
            S: "المعماري الأوّل، أُستاذ أحمد اللّاهوري — عالم رياضيّات درس إقليدس ولُقِّبَ بـ\"أُعجوبة العصر\" — لم يختفِ بعد تاج مَحَل. انتقل مباشرةً إلى مشروعه التالي: تصميم القلعة الحمراء في دلهي، عاصمة شاه جَهان الجديدة. توفّي بأسباب طبيعيّة نحو عام ١٦٤٩، ويداه سالمتان. وبنى ابنه لاحقاً نسخةً مقصودة من تاج مَحَل بتكليفٍ من الإمبراطور أَوْرَنْكزيب نفسه. لم يكن هناك حظرٌ على التكرار قطّ.",
          },
        },
      },
      {
        M: {
          text: {
            S: "ثمّ هناك الخطّاط عبد الحقّ، الذي جاء من إيران ليخطّ آيات القرآن على كلّ قوس. صمّم الحروف بحيث تكبُر كلّما ارتفعت على الجدار، حتّى تبدوَ متساوية من الأرض — خدعةٌ بصريّة ما زالت تعمل بعد أربعة قرون. منحه شاه جَهان لقب \"أمانت خان\" وأراضيَ وثروةً مدى الحياة. الشخص الوحيد الذي وقّع تاج مَحَل باسمه مات ثريّاً — وبنى بأرباحه داراً لإيواء المسافرين.",
          },
        },
      },
      {
        M: {
          text: {
            S: "فلماذا تعيش الأسطورة؟ جزئيّاً لأنّ حكايات المستعمرين البريطانيّين عن \"الطغاة الشرقيّين القساة\" ساعدت في تبرير احتلال الهند. لكنّ السبب الأعمق: حين تقف أمام تاج مَحَل والرخام يملأ بصرك والزهور المنحوتة تبدو كأنّك تستطيع قطفها — يحتاج عقلُك إلى تفسيرٍ يوازي هذا الجمال. أربعون ألف يدٍ مقطوعة، بفظاعتها، إجابةٌ كبيرة بما يكفي لسؤالٍ كبير.",
          },
        },
      },
      {
        M: {
          text: {
            S: "لكنّ الحقيقة أجمل. عشرون ألف عامل من أديان مختلفة، بقيادة معماريّ عبقري، يتقاضون أُجورهم من الخزينة، بنوا اثنتين وعشرين سنة تحت إمبراطور حظر السُّخرة. حفروا أسماءهم في الجدران. علّموا أبناءهم، فبنى أولئك الأبناء لأباطرة لم يُولَدوا بعد. الأيدي التي بنت تاج مَحَل لم تُقطَع قطّ. لم يكن الجمال لعنة. كان هِبَةً — قُدِّمت بحرّيّة.",
          },
        },
      },
    ],
  },
};

// ═══════════════════════════════════════════════════════════════════
//  PERSIAN (fa)
// ═══════════════════════════════════════════════════════════════════
const fa = {
  ...shared,
  lang: { S: "fa" },
  langStoryId: { S: "fa#hands-that-built-eternity" },
  title: { S: "دست\u200Cهایی که ابدیّت ساختند" },
  subtitle: {
    S: "افسانه\u200Cی تاریکِ کارگرانِ بریده\u200Cدست، اسطوره\u200Cی جهانیِ مجازاتِ سازنده، و حقیقتِ استادکارانِ تاج\u200Cمحل",
  },
  excerpt: {
    S: "در آگرا می\u200Cگویند وقتی تاج\u200Cمحل تمام شد، شاه\u200Cجهان دستِ تمام کارگرها را بُرید تا دیگر هیچ\u200Cکس بنایی به این زیبایی نسازد. یکی از مشهورترین افسانه\u200Cهای دنیاست. و از اوّل تا آخرش ساختگی\u200Cست.",
  },
  moralOrLesson: {
    S: "حقیقتِ تاج\u200Cمحل این نیست که زیبایی بهای سنگینی دارد — بلکه این است که زیبایی به آزادی نیاز دارد. بزرگ\u200Cترین یادبود عشق روی زمین را نه بردگان ساختند و نه زندانیان، بلکه دست\u200Cهای آزادی ساختند که مُزدشان را گرفتند، با افتخار امضا کردند، و هنرشان را به فرزندانشان سپردند.",
  },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "در شهر آگرا، هندوستان — درست زیر سایه\u200Cی تاج\u200Cمحل — داستانی هست که همه می\u200Cشنوند. می\u200Cگویند وقتی شاه\u200Cجهان شاهکارش را در سال ۱۶۵۳ تمام کرد، فرمان داد دستِ بیست هزار کارگر را ببُرند. تا هیچ\u200Cکس دیگر نتواند بنایی به این زیبایی بسازد. بعضی\u200Cها می\u200Cگویند چشم\u200Cهایشان را هم کور کرد. یکی از مشهورترین افسانه\u200Cهای دنیاست. و از اوّل تا آخرش ساختگی\u200Cست.",
          },
        },
      },
      {
        M: {
          text: {
            S: "و جالبش اینجاست که حتّی دروغِ دست\u200Cاوّلی هم نیست. همین حکایت را درباره\u200Cی کلیسای سنت باسیل مسکو هم می\u200Cگویند — که ایوانِ مخوف چشمِ معمارها را کور کرد. درباره\u200Cی مسجدِ فاتحِ استانبول هم — که سلطان محمّد دستِ مهندس را بُرید. می\u200Cگویند تا سه نشه، بازی نشه — خب، این دروغ سه بار در سه قارّه تکرار شد، ولی تکرارِ یک دروغ بازی\u200Cاش نمی\u200Cکند. هر جا آدم\u200Cها چیزی ناممکن ساخته\u200Cاند، خودشان باور کرده\u200Cاند که سازنده\u200Cاش تاوانش را پس داده.",
          },
        },
      },
      {
        M: {
          text: {
            S: "امّا مُغول\u200Cها وسواسی\u200Cترین ثبت\u200Cکنندگانِ تاریخ بودند. «پادشاه\u200Cنامه» — تاریخ رسمیِ دربارِ شاه\u200Cجهان — صدها صفحه\u200Cست و هر مُزد، هر قراردادِ معدن، و هر محموله\u200Cی سنگ مرمر را ثبت کرده. از مجازات خبری نیست. حتّی یک خط. بریدنِ چهل هزار دست از بیست هزار کارگر فاجعه\u200Cای اداری می\u200Cشد — از دست دادنِ ناگهانیِ ماهرترین صنعتگرانِ آسیا. امپراتوری\u200Cای که همه\u200Cچیز را ثبت کرده، این را ثبت نکرده. چون اتّفاق نیفتاده.",
          },
        },
      },
      {
        M: {
          text: {
            S: "شاه\u200Cجهان درست برعکسش را کرد. در ۱۶۴۱، وسطِ ساخت\u200Cوساز، بیگاری را در سرتاسر قلمروش ممنوع کرد. کتیبه\u200Cای در قلعه\u200Cی آگرا یازده میلیون «دام» از خزانه\u200Cی سلطنتی برای دستمزد کارگران ثبت کرده. و باستان\u200Cشناسان بعدها نزدیک ۶۷۰ اسم حکّاکی\u200Cشده روی سنگ\u200Cهای ماسه\u200Cای تاج\u200Cمحل پیدا کردند — به خطّ عربی و فارسی، با نمادهای هندو و اسلامی کنارِ هم. این\u200Cها خط\u200Cخطیِ زندانی نبود. امضای آدم\u200Cهایی بود که به کارشان افتخار می\u200Cکردند.",
          },
        },
      },
      {
        M: {
          text: {
            S: "معمار اصلی، استاد احمد لاهوری — ریاضی\u200Cدانی که اقلیدس خوانده بود و لقب «اعجوبه\u200Cی عصر» داشت — بعد از تاج\u200Cمحل غیبش نزد. رفت سراغ پروژه\u200Cی بعدی\u200Cاش: طرّاحیِ قلعه\u200Cی سرخِ دهلی، پایتختِ جدیدِ شاه\u200Cجهان. حدود ۱۶۴۹ به مرگ طبیعی درگذشت، دست\u200Cهایش سالم. پسرش بعدها یک کپیِ عمدی از تاج\u200Cمحل ساخت — به سفارش خودِ اورنگ\u200Cزیب، پسر شاه\u200Cجهان. هیچ ممنوعیّتی برای تکرار وجود نداشت.",
          },
        },
      },
      {
        M: {
          text: {
            S: "و امّا خوشنویس — عبدالحقّ، ایرانی\u200Cای که از ایران آمده بود تا آیات قرآن را بر هر طاق و قوسی بنویسد. حروف را طوری طرّاحی کرد که هرچه بالاتر می\u200Cرفتند بزرگ\u200Cتر می\u200Cشدند — تا از پایین یکدست به نظر برسند. ترفندِ بصری\u200Cای که بعد از چهار قرن هنوز کار می\u200Cکند. شاه\u200Cجهان لقبِ «امانت\u200Cخان» بهش داد، با زمین و ثروتِ مادام\u200Cالعمر. تنها کسی که تاج\u200Cمحل را به نامش امضا کرد، ثروتمند از دنیا رفت — و با درآمدش کاروان\u200Cسرایی برای مسافران ساخت.",
          },
        },
      },
      {
        M: {
          text: {
            S: "پس چرا این افسانه عمر می\u200Cکند؟ بخشی\u200Cاش به خاطر داستان\u200Cهای استعمارگرانِ بریتانیایی\u200Cست — «امپراتورهای خونریز شرقی» بهانه\u200Cی خوبی بود برای حکومت بر هند. ولی دلیلِ اصلی عمیق\u200Cتر است: وقتی جلوی تاج\u200Cمحل می\u200Cایستی و سنگ مرمر تمام میدان دیدت را پُر می\u200Cکند و گل\u200Cهای حکّاکی\u200Cشده آن\u200Cقدر واقعی\u200Cاند که انگار می\u200Cشود چیدشان — مغزت دنبال توضیحی می\u200Cگردد هم\u200Cاندازه\u200Cی آن زیبایی. چهل هزار دست بریده، با تمام وحشتش، جوابی\u200Cست به اندازه\u200Cی سؤال.",
          },
        },
      },
      {
        M: {
          text: {
            S: "ولی حقیقت قشنگ\u200Cتر است. بیست هزار کارگر از دین\u200Cهای مختلف، به رهبریِ یک معمارِ نابغه، با پولِ خزانه، بیست\u200Cودو سال تمام ساختند — زیر فرمانِ امپراتوری که بیگاری را ممنوع کرده بود. اسم\u200Cهایشان را در دیوارها کَندند. به پسرهایشان یاد دادند، و آن پسرها برای امپراتورهایی ساختند که هنوز به دنیا نیامده بودند. دست\u200Cهای سازندگانِ تاج\u200Cمحل هرگز بریده نشد. آن زیبایی نفرین نبود. هدیه بود — هدیه\u200Cای که آزادانه داده شد.",
          },
        },
      },
    ],
  },
};

// ═══════════════════════════════════════════════════════════════════
//  TURKISH (tr)
// ═══════════════════════════════════════════════════════════════════
const tr = {
  ...shared,
  lang: { S: "tr" },
  langStoryId: { S: "tr#hands-that-built-eternity" },
  title: { S: "Sonsuzlu\u011Fu Kuran Eller" },
  subtitle: {
    S: "Kesilen ellerin karanl\u0131k efsanesi, cezaland\u0131r\u0131lan yarat\u0131c\u0131n\u0131n evrensel miti ve Ta\u00E7 Mahal'\u0131n usta yap\u0131c\u0131lar\u0131n\u0131n ger\u00E7ek hik\u00E2yesi",
  },
  excerpt: {
    S: "Ta\u00E7 Mahal tamamland\u0131\u011F\u0131nda \u015Eah Cihan t\u00FCm i\u015F\u00E7ilerin ellerini kestirmi\u015F \u2014 bir daha kimse bu kadar g\u00FCzel bir \u015Fey yapamas\u0131n diye. D\u00FCnyan\u0131n en bilinen efsanelerinden biri. Ve ba\u015Ftan sona uydurma.",
  },
  moralOrLesson: {
    S: "Ta\u00E7 Mahal'\u0131n ger\u00E7ek hik\u00E2yesi g\u00FCzelli\u011Fin ac\u0131 gerektirdi\u011Fi de\u011Fil, g\u00FCzelli\u011Fin \u00F6zg\u00FCrl\u00FCk gerektirdi\u011Fidir. Yery\u00FCz\u00FCndeki en b\u00FCy\u00FCk a\u015Fk an\u0131t\u0131n\u0131 ne k\u00F6leler ne mahk\u00FBmlar in\u015Fa etti; \u00FCcretini alan, eserini imzalayan ve sanat\u0131n\u0131 o\u011Fullar\u0131na miras b\u0131rakan \u00F6zg\u00FCr eller in\u015Fa etti.",
  },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "Hindistan'\u0131n Agra \u015Fehrinde, Ta\u00E7 Mahal'\u0131n g\u00F6lgesinde anlat\u0131lan bir hik\u00E2ye var. \u015Eah Cihan 1653'te kar\u0131s\u0131n\u0131n t\u00FCrbesini bitirdi\u011Finde yirmi bin i\u015F\u00E7inin ellerini kestirmi\u015F \u2014 bir daha kimse bu kadar g\u00FCzel bir \u015Fey yapamas\u0131n diye. Baz\u0131 anlat\u0131mlarda g\u00F6zlerini de oydurmu\u015F. D\u00FCnyan\u0131n en me\u015Fhur efsanelerinden biri. Ve ba\u015Ftan sona uydurma.",
          },
        },
      },
      {
        M: {
          text: {
            S: "\u00DCstelik \u00F6zg\u00FCn bir yalan bile de\u011Fil. Ayn\u0131 hik\u00E2yeyi Moskova'daki Aziz Vasil Katedrali i\u00E7in de anlat\u0131rlar \u2014 \u0130van, mimarlar\u0131n g\u00F6zlerini k\u00F6r etmi\u015F. Ve biz T\u00FCrkler bu masal\u0131 en iyi biliriz: Fatih Sultan Mehmed, Fatih Camii'nin mimar\u0131n\u0131n elini kestirmi\u015F. \"Yalanc\u0131n\u0131n mumu yats\u0131ya kadar yanar\" derler \u2014 ama bu yalan\u0131n mumu y\u00FCzy\u0131llarca yand\u0131. \u00C7\u00FCnk\u00FC insanlar, imk\u00E2ns\u0131z g\u00FCzellikte bir \u015Fey g\u00F6rd\u00FCklerinde, onu yapanlar\u0131n bedel \u00F6dedi\u011Fine inanmak istiyor.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Ama Bab\u00FCrl\u00FCler kay\u0131t tutma konusunda tak\u0131nt\u0131l\u0131yd\u0131. \u015Eah Cihan'\u0131n resm\u00EE saray tarihi P\u00E2di\u015Fahn\u00E2me \u2014 y\u00FCzlerce sayfa boyunca her \u00FCcreti, her ta\u015F oca\u011F\u0131 s\u00F6zle\u015Fmesini, her mermer sevkiyat\u0131n\u0131 tek tek belgelemi\u015F. Ceza kayd\u0131 yok. Tek bir sat\u0131r yok. K\u0131rk bin eli kesmek idar\u00EE bir fel\u00E2ket olurdu \u2014 Asya'\u0131n en yetenekli i\u015Fg\u00FCc\u00FCn\u00FC bir gecede kaybetmek demekti. Her \u015Feyi belgeleyen bir imparatorluk bunu belgelememi\u015F. \u00C7\u00FCnk\u00FC olmam\u0131\u015F.",
          },
        },
      },
      {
        M: {
          text: {
            S: "\u015Eah Cihan tam tersini yapt\u0131. 1641'de, in\u015Faat s\u00FCrerken, imparatorluk genelinde angarya \u00E7al\u0131\u015Ft\u0131rmay\u0131 yasaklad\u0131. Agra Kalesi'ndeki bir kitabede hazineden i\u015F\u00E7i \u00FCcretlerine on bir milyon dam harcand\u0131\u011F\u0131 yaz\u0131l\u0131. Daha da \u00E7arp\u0131c\u0131s\u0131: arkeologlar Ta\u00E7 Mahal'\u0131n kumta\u015F\u0131na kaz\u0131nm\u0131\u015F yakla\u015F\u0131k 670 isim buldu \u2014 Arap\u00E7a ve Fars\u00E7a, yanlar\u0131nda Hindu ve \u0130slam sembolleri yan yana. Bunlar mahk\u00FBm \u00E7izikleri de\u011Fildi. Yapt\u0131klar\u0131yla gurur duyan insanlar\u0131n imzalar\u0131yd\u0131.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Ba\u015F mimar \u00DCstad Ahmed L\u00E2hur\u00EE \u2014 \u00D6klid okumu\u015F bir matematik\u00E7i, \"\u00C7a\u011F\u0131n Harikas\u0131\" unvanl\u0131 \u2014 Ta\u00E7 Mahal'dan sonra ortadan kaybolmad\u0131. Do\u011Fruca bir sonraki projesine ge\u00E7ti: Delhi'deki K\u0131z\u0131l Kale'nin tasar\u0131m\u0131, \u015Eah Cihan'\u0131n yeni ba\u015Fkenti. 1649 civar\u0131nda do\u011Fal sebeplerle \u00F6ld\u00FC, elleri sapasa\u011Flam. O\u011Flu daha sonra Ta\u00E7 Mahal'\u0131n bilin\u00E7li bir kopyas\u0131n\u0131 in\u015Fa etti \u2014 bizzat \u015Eah Cihan'\u0131n o\u011Flu \u0130mparator Evrengzib'in emriyle. Tekrar yasaklayan bir ferman hi\u00E7 var olmam\u0131\u015Ft\u0131.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Bir de hattat Abd\u00FClhak var. \u0130ran'dan getirilmi\u015Fti; her kemere, her kap\u0131 al\u0131nl\u0131\u011F\u0131na Kur'an ayetleri yazacakt\u0131. Harfleri duvarda yukar\u0131 \u00E7\u0131kt\u0131k\u00E7a b\u00FCy\u00FCtecek \u015Fekilde tasarlad\u0131 \u2014 yerden bak\u0131nca hepsi ayn\u0131 boyutta g\u00F6r\u00FCns\u00FCn diye. D\u00F6rt y\u00FCz y\u0131l sonra h\u00E2l\u00E2 i\u015Fe yarayan bir g\u00F6rsel hile. \u015Eah Cihan ona \"Amanat Han\" unvan\u0131n\u0131, toprak ve \u00F6m\u00FCr boyu zenginlik verdi. Ta\u00E7 Mahal'\u0131 kendi ad\u0131yla imzalayan tek ki\u015Fi varl\u0131kl\u0131 olarak \u00F6ld\u00FC \u2014 ve kazanc\u0131yla yolcular i\u00E7in bir han yapt\u0131rd\u0131.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Peki efsane neden \u00F6lm\u00FCyor? K\u0131smen \u0130ngiliz s\u00F6m\u00FCrgecilerin \"zalim Do\u011Fu h\u00FCk\u00FCmdarlar\u0131\" anlat\u0131s\u0131 Hindistan'\u0131 y\u00F6netmeyi me\u015Fru k\u0131l\u0131yordu. Ama as\u0131l sebep daha derin: Ta\u00E7 Mahal'\u0131n \u00F6n\u00FCnde durdu\u011Funuzda, mermer g\u00F6z\u00FCn\u00FCz\u00FCn g\u00F6rebildi\u011Fi her yeri kaplad\u0131\u011F\u0131nda, ta\u015Fa i\u015Flenmi\u015F \u00E7i\u00E7ekler kopar\u0131labilecekmi\u015F gibi g\u00F6r\u00FCnd\u00FC\u011F\u00FCnde \u2014 beyniniz bu g\u00FCzelli\u011Fe denk bir a\u00E7\u0131klama arar. K\u0131rk bin kesilmi\u015F el, t\u00FCm deh\u015Fetiyle, soruya yetecek b\u00FCy\u00FCkl\u00FCkte bir cevapt\u0131r.",
          },
        },
      },
      {
        M: {
          text: {
            S: "Ama ger\u00E7ek hik\u00E2ye daha g\u00FCzel. Farkl\u0131 inan\u00E7lardan yirmi bin i\u015F\u00E7i, dahi bir mimar\u0131n \u00F6nderli\u011Finde, hazineden maa\u015F alarak yirmi iki y\u0131l boyunca in\u015Fa etti \u2014 angaryay\u0131 yasaklam\u0131\u015F bir h\u00FCk\u00FCmdar\u0131n g\u00F6lgesinde. \u0130simlerini duvarlara kaz\u0131d\u0131lar. O\u011Fullar\u0131na \u00F6\u011Frettiler; o o\u011Fullar hen\u00FCz do\u011Fmam\u0131\u015F h\u00FCk\u00FCmdarlar i\u00E7in yap\u0131lar dikti. Ta\u00E7 Mahal'\u0131 yapan eller asla kesilmedi. O g\u00FCzellik bir lanet de\u011Fildi. Bir arma\u011Fand\u0131 \u2014 \u00F6zg\u00FCrce verilmi\u015F.",
          },
        },
      },
    ],
  },
};

// ═══════════════════════════════════════════════════════════════════
//  PUSH TO DYNAMODB
// ═══════════════════════════════════════════════════════════════════
async function pushStory(label, item) {
  console.log(`\n⏳ Pushing ${label}...`);
  try {
    await client.send(
      new PutItemCommand({
        TableName: TABLE,
        Item: item,
        ConditionExpression:
          "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
      })
    );
    console.log(`✅ ${label} pushed successfully.`);
    return true;
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(
        `⚠️  ${label} already exists. Overwriting with updated version...`
      );
      await client.send(
        new PutItemCommand({
          TableName: TABLE,
          Item: item,
        })
      );
      console.log(`✅ ${label} overwritten successfully.`);
      return true;
    }
    console.error(`❌ ${label} FAILED:`, err.message);
    return false;
  }
}

async function main() {
  console.log("═══════════════════════════════════════");
  console.log("  Pushing: The Hands That Built Eternity");
  console.log("  Languages: ar, fa, tr");
  console.log(`  Timestamp: ${now}`);
  console.log("═══════════════════════════════════════");

  const results = [];
  results.push(await pushStory("Arabic (ar)", ar));
  results.push(await pushStory("Persian (fa)", fa));
  results.push(await pushStory("Turkish (tr)", tr));

  console.log("\n═══════════════════════════════════════");
  if (results.every(Boolean)) {
    console.log("  ✅ ALL THREE LANGUAGES PUSHED SUCCESSFULLY");
  } else {
    console.log("  ⚠️  SOME PUSHES FAILED — see errors above");
  }
  console.log("═══════════════════════════════════════");
}

main();
