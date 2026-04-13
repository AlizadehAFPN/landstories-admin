/**
 * Push "The Dragon's Son in the Labyrinth" (dracula-prisoner) in ar, fa, tr
 * to the Story DynamoDB table.
 *
 * Usage: node scripts/push-dracula-prisoner-ar-fa-tr.mjs
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const NOW = Math.floor(Date.now() / 1000);

// ─── Shared fields (identical to English record) ────────────────────────

const shared = {
  siteId: "buda-castle",
  storyId: "dracula-prisoner",
  icon: "\u{1F9DB}", // 🧛
  storyCategory: "ghosts_curses",
  era: "1462-1474",
  tier: "A",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 2,
  thumbnail: "",
  image: "",
  coordinates: { lat: 47.501, lng: 19.0315 },
  source:
    "Diplomatic correspondence; Papal records; Matthias Corvinus\u2019s court documents",
  disabled: false,
  updatedAt: NOW,
};

// ═══════════════════════════════════════════════════════════════════════════
// ARABIC (ar)
// ═══════════════════════════════════════════════════════════════════════════
//
// Proverb subverted: الطَّبعُ يَغلِبُ التَّطبُّع
// Register: modern MSA storyteller — gripping, direct, not stiff

const ar = {
  ...shared,
  lang: "ar",
  langStoryId: "ar#dracula-prisoner",
  title: "ابنُ التِّنِّين في المَتاهة",
  subtitle: "اثنا عَشَرَ عامًا في قفصٍ مُذَهَّب تحت قلعة بودا",
  excerpt:
    "تحت قلعة بودا في بودابست، متاهةٌ من الكهوف والأنفاق حفرتها أنهارٌ جوفيّة على مدى ملايين السنين. اليوم يتجوّل فيها السيّاح بين إضاءة خافتة وأجواء مريحة. ما لا يعرفه أغلبهم أنّ واحدًا من أشدّ رجال التاريخ رعبًا سكن هذه الأنفاق ذات يوم.",
  moralOrLesson:
    "حتّى أشدّ الرجال بطشًا يمكن حبسهم — لكنّ طبائعهم لا تتبدّل خلف القضبان.",
  characters: [
    "فلاد الثالث (دراكولا)",
    "الملك ماتياش كورفينوس",
    "حرّاس القلعة",
  ],
  paragraphs: [
    {
      text: "تحت قلعة بودا في بودابست، متاهةٌ من الكهوف والأنفاق — حفرتها أنهارٌ جوفيّة على مدى ملايين السنين، ثمّ وسّعها البشر عبر القرون. اليوم، يتجوّل فيها السيّاح بين إضاءة خافتة وأدلّة صوتيّة، يلتقطون الصور ويبتسمون. ما لا يعرفه أغلبهم أنّ واحدًا من أشدّ رجال التاريخ رعبًا سكن هذه الأنفاق ذات يوم.",
    },
    {
      text: "اسمه فلاد الثالث — حاكم والاكيا، إمارةٍ صغيرة في ما يُعرف اليوم بجنوب رومانيا. كان والده قد انضمّ إلى «وِسام التِّنِّين»، تحالفٌ عسكريّ مسيحيّ أُسِّسَ لقتال العثمانيّين. فحَمَلَ لقب «دراكول» — أي التِّنِّين. وهكذا صار الابن «دراكولا»: ابن التِّنِّين. لكنّ العالَم عرفه بلقبٍ أشدّ قتامةً: فلاد الخازوق.",
    },
    {
      text: "في عام ١٤٦٢، قام حليفه نفسه بخيانته — الملك ماتياش كورفينوس، ملك المجر — فاعتقله. لماذا يتخلّى ملكٌ عن أشرس محاربيه في مواجهة العثمانيّين؟ ربّما لأنّ وحشيّة فلاد صارت عبئًا سياسيًّا لا يُطاق. أو ربّما أراد ماتياش حاكمًا أسهل انقيادًا على عرش والاكيا. أيًّا كان السبب، جُرَّ الخازوق إلى بودا وأُلقِيَ تحت القلعة.",
    },
    {
      text: "المفارقة أنّها لم تكن زنزانة. فلاد كان من دم ملكيّ، فمُنِحَ غرفًا مريحة وخَدَمًا وكتبًا. كان يتجوّل بحرّيّة في أجزاء من الأنفاق. لكنّ حرّاسًا مسلّحين وقفوا عند كلّ مَخرَج. اثنا عشر عامًا في قفصٍ مُذَهَّب — لا تعذيب ولا حرّيّة. مجرّد... انتظار.",
    },
    {
      text: "لكنّ فلاد لم يكن من النوع الذي يجلس ساكنًا. بحسب شهود عيان من تلك الفترة، بدأ يصطاد الجرذان ويغرزها في أعوادٍ خشبيّة صغيرة. ثمّ العناكب. ثمّ العصافير التي يجلبها الحرّاس. الرجل الذي أمر بخَوزَقَة عشرات الآلاف لم يستطع أن يتوقّف — حتّى حين تقلّصت مملكته إلى غرفٍ تحت الأرض. يقولون «الطَّبعُ يَغلِبُ التَّطبُّع»، لكنّ طبع هذا الرجل لم يحتج أن يَغلِب شيئًا — لأنّه لم يُهزَم أصلًا.",
    },
    {
      text: "تخيّل ذلك لحظة. اثنا عشر عامًا تحت الأرض. فوق تلك الجدران، تصادمت الإمبراطوريّات. توغّل العثمانيّون أعمق في أوروبا. خاض ماتياش حروبًا ووقّع معاهدات وبنى أحد أرقى بلاطات عصر النهضة — فوق رأس فلاد مباشرةً. وابن التِّنِّين جالسٌ في العتمة، يبري أعوادًا صغيرة. ينتظر أن يحتاج العالم وحشًا من جديد.",
    },
    {
      text: "في النهاية، لعبها فلاد على المدى الطويل. تحوّل من الأرثوذكسيّة إلى الكاثوليكيّة — ثمن الحرّيّة في مجر القرن الخامس عشر. وتزوّج نبيلةً من أقارب الأسرة الحاكمة. بحلول ١٤٧٦، أطلقه ماتياش أخيرًا ودعم عودته إلى عرش والاكيا. استعاده فلاد. أمسكه نحو شهرين. ثمّ قُتِلَ في المعركة. ابن التِّنِّين مات كما عاش — بعنف.",
    },
    {
      text: "تلك الغرف لا تزال هناك، في أعماق قلعة بودا. المرشدون يشيرون إليها ويذكرون ببساطة أنّ «أميرًا من والاكيا» أقام هنا يومًا — يبقونها غامضة عمدًا. لكن إن كنتَ تعرف القصّة كاملة، إن كنتَ تعرف ما فعله فلاد في تلك الغرف بأعواده الصغيرة ومجموعته من الكائنات الميتة، ستشعر أنّ الأنفاق مختلفة. أكثر ظلمة. كأنّ شيئًا هناك في الأسفل لم يغادر قطّ.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// PERSIAN (fa)
// ═══════════════════════════════════════════════════════════════════════════
//
// Proverb subverted: از کوزه همان برون تراود که در اوست
// Register: natural modern Persian prose — engaging, warm, not formal

const fa = {
  ...shared,
  lang: "fa",
  langStoryId: "fa#dracula-prisoner",
  title: "پسرِ اژدها در هزارتو",
  subtitle: "دوازده سال اسارت دراکولا در زیرِ قلعه بودا",
  excerpt:
    "زیر قلعه بودا در بوداپست، هزارتویی از غارها و تونل\u200Cهاست که رودخانه\u200Cهای زیرزمینی میلیون\u200Cها سال تراشیده\u200Cشان. امروز گردشگرها آسوده توش قدم می\u200Cزنند. اما کمتر کسی می\u200Cداند که یکی از وحشتناک\u200Cترین مردان تاریخ روزگاری همین تونل\u200Cها را خانه خودش می\u200Cدانست.",
  moralOrLesson:
    "حتی وحشتناک\u200Cترین آدم\u200Cها را هم می\u200Cشود به بند کشید — اما سرشتشان پشت میله\u200Cها عوض نمی\u200Cشود.",
  characters: [
    "ولاد سوم (دراکولا)",
    "پادشاه ماتیاش کورفینوش",
    "نگهبانان قلعه",
  ],
  paragraphs: [
    {
      text: "زیر قلعه بودا در بوداپست، هزارتویی از غارها و تونل\u200Cها پنهان است — رودخانه\u200Cهای زیرزمینی میلیون\u200Cها سال تراشیده\u200Cشان و بعد آدم\u200Cها قرن به قرن گسترده\u200Cترشان کرده\u200Cاند. امروز گردشگرها با نور ملایم و هدفون راهنما داخلشان قدم می\u200Cزنند و عکس یادگاری می\u200Cگیرند. چیزی که بیشترشان نمی\u200Cدانند این است: یکی از وحشتناک\u200Cترین مردان تاریخ، روزگاری همین تونل\u200Cها را خانه\u200Cاش صدا می\u200Cزد.",
    },
    {
      text: "اسمش ولاد سوم بود — فرمانروای والاکیا، سرزمین کوچکی در جنوب رومانیِ امروزی. پدرش عضو \u00ABنشانِ اژدها\u00BB شده بود، یک اتحادیه نظامیِ مسیحی که برای نبرد با عثمانی\u200Cها ساخته شده بود. همین، لقب \u00ABدراکول\u00BB — یعنی اژدها — را به پدرش چسباند. و ولاد شد \u00ABدراکولا\u00BB: پسرِ اژدها. ولی دنیا او را با نام بسیار تاریک\u200Cتری شناخت — ولاد سیخ\u200Cزَن.",
    },
    {
      text: "سال ۱۴۶۲، خودِ هم\u200Cپیمانش — ماتیاش کورفینوش، پادشاه مجارستان — دستگیرش کرد. آخر چرا یک پادشاه سرسخت\u200Cترین جنگاورش علیه عثمانی\u200Cها را به زندان بیندازد؟ شاید شیوه\u200Cهای خشن ولاد دردسرِ سیاسی شده بود. شاید ماتیاش روی تخت والاکیا کسی رام\u200Cتر می\u200Cخواست. هرچه بود، سیخ\u200Cزن را کشان\u200Cکشان به بودا آوردند و زیر قلعه انداختند.",
    },
    {
      text: "اما عجیبش اینجاست — سیاهچال نبود. ولاد خون شاهانه داشت، پس اتاق\u200Cهای راحت بهش دادند، خدمتکار، حتّی کتاب. می\u200Cتوانست بخش\u200Cهایی از تونل\u200Cها را آزادانه بگردد. ولی سربازان مسلّح دَمِ هر خروجی کشیک می\u200Cدادند. دوازده سال تمام، قفسی از طلا بود. نه شکنجه، نه آزادی. فقط... انتظار.",
    },
    {
      text: "ولی ولاد از آن آدم\u200Cهایی نبود که بنشیند و دست روی دست بگذارد. به روایت شاهدان آن دوره، شروع کرد به شکار موش\u200Cها و سیخ\u200Cزدنشان روی چوب\u200Cهای ریز. بعد عنکبوت\u200Cها. بعد پرنده\u200Cهایی که نگهبان\u200Cها برایش می\u200Cآوردند. مردی که فرمان سیخ\u200Cکوبیِ ده\u200Cها هزار نفر را داده بود، نمی\u200Cتوانست دست بردارد — حتّی وقتی تمام قلمرواش به چند اتاق زیرزمینی خلاصه شده بود. می\u200Cگویند از کوزه همان برون تراوَد که در اوست — و آنچه درون این مرد بود، حتّی در تاریکی زیرزمین هم بیرون می\u200Cتراوید.",
    },
    {
      text: "یک لحظه تصوّرش کن. دوازده سال زیر زمین. بیرون از آن دیوارها، امپراتوری\u200Cها به هم می\u200Cکوبیدند. عثمانی\u200Cها عمیق\u200Cتر توی اروپا پیش می\u200Cرفتند. ماتیاش جنگ می\u200Cکرد، عهدنامه امضا می\u200Cکرد، یکی از باشکوه\u200Cترین دربارهای رنسانس را درست بالای سر ولاد می\u200Cساخت. و پسر اژدها همان\u200Cجا در نیمه\u200Cتاریکی نشسته بود و چوب تیز می\u200Cکرد. منتظر بود دنیا دوباره به یک هیولا احتیاج پیدا کند.",
    },
    {
      text: "آخرش، ولاد بازیِ بلند را انتخاب کرد. از مسیحیت ارتدکس به کاتولیک تغییر مذهب داد — بهای آزادی در مجارستانِ قرن پانزدهم. با زنی اشراف\u200Cزاده از خویشاوندان خاندان سلطنتی ازدواج کرد. تا سال ۱۴۷۶، ماتیاش بالاخره آزادش کرد و از بازگشتش به تخت والاکیا حمایت کرد. ولاد تختش را پس گرفت. حدود دو ماه نگهش داشت. بعد در نبرد کشته شد. پسرِ اژدها همان\u200Cطور مُرد که زیست — با خشونت.",
    },
    {
      text: "آن اتاق\u200Cها هنوز آنجاست، در اعماق قلعه بودا. راهنماهای تور سرسری بهشان اشاره می\u200Cکنند و می\u200Cگویند \u00ABشاهزاده\u200Cای والاکیایی یک\u200Cبار اینجا مانده بوده\u00BB — عمداً مبهم نگهش می\u200Cدارند. ولی اگر قصّه کامل را بدانی، اگر بدانی ولاد در آن اتاق\u200Cها با چوب\u200Cهای ریزش و مجموعه موجودات مرده\u200Cاش چه می\u200Cکرد، تونل\u200Cها حسّ دیگری پیدا می\u200Cکنند. تاریک\u200Cتر. انگار چیزی آن پایین هنوز نرفته.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// TURKISH (tr)
// ═══════════════════════════════════════════════════════════════════════════
//
// Proverb subverted: Can çıkmayınca huy çıkmaz
// Register: vivid modern Turkish — like a quality history podcast
// Cultural note: Turks know Kazıklı Voyvoda from their own history

const tr = {
  ...shared,
  lang: "tr",
  langStoryId: "tr#dracula-prisoner",
  title: "Ejderhan\u0131n O\u011Flu, Labirentte",
  subtitle:
    "Kaz\u0131kl\u0131 Voyvoda\u2019n\u0131n Buda Kalesi alt\u0131nda ge\u00E7en on iki y\u0131l\u0131",
  excerpt:
    "Budape\u015Fte\u2019deki Buda Kalesi\u2019nin alt\u0131nda, milyonlarca y\u0131ll\u0131k yeralt\u0131 nehirlerinin oydu\u011Fu bir ma\u011Fara ve t\u00FCnel labirenti uzan\u0131r. Bug\u00FCn turistler rahat\u00E7a geziniyor. \u00C7o\u011Funun bilmedi\u011Fi \u015Fey: tarihin en korkun\u00E7 adamlar\u0131ndan biri, bir zamanlar bu t\u00FCnelleri ev bellemi\u015F.",
  moralOrLesson:
    "En korkun\u00E7 insanlar bile kafese kapat\u0131labilir \u2014 ama do\u011Falar\u0131 tutsakl\u0131kta de\u011Fi\u015Fmez.",
  characters: [
    "Vlad III (Kaz\u0131kl\u0131 Voyvoda)",
    "Kral Matthias Corvinus",
    "Kale muhaf\u0131zlar\u0131",
  ],
  paragraphs: [
    {
      text: "Budape\u015Fte\u2019deki Buda Kalesi\u2019nin alt\u0131nda bir ma\u011Fara ve t\u00FCnel labirenti uzan\u0131r \u2014 milyonlarca y\u0131l boyunca yeralt\u0131 nehirlerinin oydu\u011Fu, sonra y\u00FCzy\u0131llar boyunca insanlar\u0131n geni\u015Fletti\u011Fi bir a\u011F. Bug\u00FCn turistler ortam \u0131\u015F\u0131\u011F\u0131 ve sesli rehberler e\u015Fli\u011Finde rahat\u00E7a geziniyor, lo\u015F \u0131\u015F\u0131kta selfie \u00E7ekiyor. \u00C7o\u011Funun bilmedi\u011Fi \u015Fey \u015Fu: tarihin en korkun\u00E7 adamlar\u0131ndan biri, bir zamanlar bu t\u00FCnelleri ev bellemi\u015F.",
    },
    {
      text: "Ad\u0131 Vlad\u2019d\u0131 \u2014 Eflak voyvodal\u0131\u011F\u0131n\u0131n h\u00FCk\u00FCmdar\u0131, bug\u00FCnk\u00FC g\u00FCney Romanya\u2019daki k\u00FC\u00E7\u00FCk bir prenslik. Babas\u0131 \u201CEjderha Tarikat\u0131\u201D na kabul edilmi\u015Fti; Osmanl\u0131\u2019ya kar\u015F\u0131 kurulan bir H\u0131ristiyan askeri birlik. Bu y\u00FCzden babas\u0131na Drakul \u2014 yani \u201CEjderha\u201D \u2014 dendi. O\u011Flu da do\u011Fal olarak Drakula oldu: Ejderhan\u0131n O\u011Flu. Ama d\u00FCnya onu ba\u015Fka bir isimle tan\u0131d\u0131. Bizim tarih kitaplar\u0131m\u0131zda o isim \u00E7ok iyi bilinir: Kaz\u0131kl\u0131 Voyvoda.",
    },
    {
      text: "1462\u2019de kendi m\u00FCttefiki \u2014 Macaristan Kral\u0131 Matthias Corvinus \u2014 onu tutuklatt\u0131. Osmanl\u0131\u2019ya kar\u015F\u0131 en az\u0131l\u0131 sava\u015F\u00E7\u0131s\u0131n\u0131 neden hapse atar bir kral? Belki Vlad\u2019\u0131n a\u015F\u0131r\u0131 y\u00F6ntemleri siyasi y\u00FCk haline gelmi\u015Fti. Belki Matthias, Eflak taht\u0131nda daha uysal birini istiyordu. Sebep ne olursa olsun, Kaz\u0131kl\u0131 Voyvoda Buda\u2019ya getirildi ve kalenin alt\u0131na kapat\u0131ld\u0131.",
    },
    {
      text: "\u0130\u015Fin tuhaf yan\u0131 \u2014 buras\u0131 bir zindan de\u011Fildi. Vlad sonu\u00E7ta kraliyet kan\u0131 ta\u015F\u0131yordu; rahat odalar, hizmetk\u00E2rlar, hatta kitaplar verildi. T\u00FCnellerin belirli b\u00F6l\u00FCmlerinde serbest\u00E7e dola\u015Fabiliyordu. Ama her \u00E7\u0131k\u0131\u015Fta silahl\u0131 n\u00F6bet\u00E7iler bekliyordu. On iki y\u0131l boyunca yald\u0131zl\u0131 bir kafesti buras\u0131. Tam olarak i\u015Fkence de\u011Fil. Tam olarak \u00F6zg\u00FCrl\u00FCk de\u011Fil. Sadece... bekleme.",
    },
    {
      text: "Ama Vlad bo\u015F duracak adam de\u011Fildi. D\u00F6nemin tan\u0131klar\u0131na g\u00F6re fareleri yakalay\u0131p minicik tahta \u00E7ubuklara ge\u00E7irmeye ba\u015Flad\u0131. Sonra \u00F6r\u00FCmcekleri. Sonra muhaf\u0131zlar\u0131n getirdi\u011Fi ku\u015Flar\u0131. On binlerce insan\u0131 ger\u00E7ek kaz\u0131klara \u00E7akt\u0131rm\u0131\u015F olan adam, duram\u0131yordu \u2014 t\u00FCm krall\u0131\u011F\u0131 birka\u00E7 yeralt\u0131 odas\u0131na s\u0131\u011Fm\u0131\u015F olsa bile. Derler ya, \u201Ccan \u00E7\u0131kmay\u0131nca huy \u00E7\u0131kmaz.\u201D Kaz\u0131kl\u0131 Voyvoda\u2019da can da vard\u0131, huy da \u2014 ve ikisi de yeralt\u0131nda sapasa\u011Flam duruyordu.",
    },
    {
      text: "Bir an d\u00FC\u015F\u00FCn. On iki y\u0131l yeralt\u0131nda. O duvarlar\u0131n d\u0131\u015F\u0131nda imparatorluklar \u00E7arp\u0131\u015F\u0131yordu. Osmanl\u0131 Avrupa\u2019n\u0131n derinliklerine ilerliyordu. Matthias sava\u015Flar y\u00FCr\u00FCt\u00FCyor, antla\u015Fmalar imzal\u0131yor, Vlad\u2019\u0131n tam tepesinde Avrupa\u2019n\u0131n en g\u00F6rkemli R\u00F6nesans saraylar\u0131ndan birini in\u015Fa ediyordu. Ve Ejderhan\u0131n O\u011Flu karanl\u0131kta oturmu\u015F, \u00E7ubuk yontuyordu. D\u00FCnyan\u0131n tekrar bir canavara ihtiya\u00E7 duymas\u0131n\u0131 bekliyordu.",
    },
    {
      text: "Sonunda Vlad uzun oyunu oynad\u0131. Ortodoksluktan Katolikli\u011Fe ge\u00E7ti \u2014 on be\u015Finci y\u00FCzy\u0131l Macaristan\u2019\u0131nda \u00F6zg\u00FCrl\u00FC\u011F\u00FCn bedeli buydu. Kraliyet ailesiyle ba\u011Flant\u0131l\u0131 soylu bir kad\u0131nla evlendi. 1476\u2019da Matthias nihayet onu serbest b\u0131rakt\u0131 ve Eflak taht\u0131na d\u00F6n\u00FC\u015F\u00FCn\u00FC destekledi. Vlad taht\u0131n\u0131 geri ald\u0131. Yakla\u015F\u0131k iki ay tutabildi. Sonra sava\u015Fta \u00F6ld\u00FCr\u00FCld\u00FC. Ejderhan\u0131n O\u011Flu ya\u015Fad\u0131\u011F\u0131 gibi \u00F6ld\u00FC \u2014 \u015Fiddetle.",
    },
    {
      text: "O odalar h\u00E2l\u00E2 orada, Buda Kalesi\u2019nin derinliklerinde. Tur rehberleri \u201Cburada bir zamanlar bir Eflak prensi kalm\u0131\u015F\u201D deyip ge\u00E7iyor \u2014 bilerek belirsiz b\u0131rak\u0131yorlar. Ama e\u011Fer hik\u00E2yenin tamam\u0131n\u0131 biliyorsan, Vlad\u2019\u0131n o odalarda k\u00FC\u00E7\u00FCk \u00E7ubuklar\u0131yla ve \u00F6l\u00FC \u015Feyler koleksiyonuyla neler yapt\u0131\u011F\u0131n\u0131 biliyorsan, t\u00FCneller farkl\u0131 hissettiriyor. Daha karanl\u0131k. Sanki orada a\u015Fa\u011F\u0131da bir \u015Fey hi\u00E7 gitmemi\u015F gibi.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// PUSH TO DYNAMODB
// ═══════════════════════════════════════════════════════════════════════════

async function pushStory(story) {
  const label = `${story.lang}#${story.storyId}`;
  console.log(`\n📝 Pushing ${label} ...`);

  // Validate paragraph count
  if (story.paragraphs.length < 6 || story.paragraphs.length > 10) {
    throw new Error(
      `${label}: Expected 6-10 paragraphs, got ${story.paragraphs.length}`
    );
  }

  // Validate each paragraph length
  for (let i = 0; i < story.paragraphs.length; i++) {
    const text = story.paragraphs[i].text;
    if (text.length > 600) {
      console.warn(
        `  ⚠️  Paragraph ${i + 1} is ${text.length} chars (max ~500)`
      );
    }
  }

  const totalChars = story.paragraphs.reduce((s, p) => s + p.text.length, 0);
  console.log(
    `  📊 ${story.paragraphs.length} paragraphs, ${totalChars} total chars`
  );

  await doc.send(
    new PutCommand({
      TableName: TABLE,
      Item: story,
      ConditionExpression:
        "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
    })
  );

  console.log(`  ✅ ${label} pushed successfully`);
}

async function main() {
  console.log("═══════════════════════════════════════════════════");
  console.log("  Pushing dracula-prisoner: ar, fa, tr");
  console.log(`  Timestamp: ${NOW}`);
  console.log("═══════════════════════════════════════════════════");

  for (const story of [ar, fa, tr]) {
    await pushStory(story);
  }

  console.log("\n🎉 All three versions pushed successfully!\n");
}

main().catch((err) => {
  console.error("\n❌ Error:", err.message);
  process.exit(1);
});
