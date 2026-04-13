import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const NOW = Math.floor(Date.now() / 1000);

// ─── Shared fields (unchanged from English) ───
const shared = {
  siteId: "delphi",
  storyId: "oedipus-prophecy",
  icon: "\u{1F441}\uFE0F",
  tier: "A",
  source: "Sophocles\u2019s Oedipus Rex and Oedipus at Colonus, Apollodorus\u2019s Bibliotheca, Pausanias\u2019s Description of Greece",
  era: "Mythological Era (Theban Cycle)",
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  coordinates: { lng: 22.501, lat: 38.4824 },
  hasAudio: false,
  isFree: true,
  disabled: false,
  storyCategory: "lost_found",
  updatedAt: NOW,
};

// ═══════════════════════════════════════════════════════════════
// ARABIC — مصير أوديب
// ═══════════════════════════════════════════════════════════════
const arabic = {
  ...shared,
  lang: "ar",
  langStoryId: "ar#oedipus-prophecy",
  title: "مصير أوديب",
  subtitle: "النُّبوءة التي لا مَفَرَّ منها",
  excerpt: "كلُّ شيء بدأ بسؤالٍ واحد. لايُوس، ملك مدينة طيبة اليونانيّة، سافر إلى دِلفي — أقدس بقعة في اليونان القديمة — ليسأل العرّافة: هل سيُرزَق بوريث؟",
  moralOrLesson: "القَدَر لا يُهزَم بالفرار منه — في كثيرٍ من الأحيان، محاولة الهروب ذاتها هي ما يُحقِّق النبوءة. الحكمة الحقيقيّة ليست في تجنُّب المصير، بل في قبوله.",
  characters: ["أوديب", "يوكاستا", "لايُوس", "عرّافة دِلفي", "سفِنكس", "أنتيغوني"],
  paragraphs: [
    {
      text: "كلُّ شيء بدأ بسؤالٍ واحد. لايُوس، ملك مدينة طيبة اليونانيّة، سافر إلى دِلفي — أقدس بقعة في اليونان القديمة — ليسأل العرّافة: هل سيُرزَق بوريث؟ الجواب جاءه كالصاعقة. نعم، سيُولَد لك ابن. لكنّه سيكبر ليقتل أباه ويتزوّج أمّه. لم يتردّد لايُوس لحظة. أمر بثَقب كاحِلَي الرضيع وربطهما، ثمّ سلّمه لخادمٍ ليتركه فوق جبلٍ يموت وحيداً. اسم «أوديبوس» في اليونانيّة يعني حرفيّاً: القَدَم المُتورِّمة.",
    },
    {
      text: "لكنّ الخادم لم يَقدِر. نظر في عينَي الرضيع فانكسر قلبه. سلّمه لراعٍ كان يعبر من هناك، وذاك الراعي حمله إلى مدينة كورنثوس — حيث كان يحكمها ملكٌ وملكة بلا أولاد. تبنّياه وأحبّاه كأنّه ابنهما بالفعل. كبر أوديب أميراً محبوباً، واثقاً بنفسه، لا يدور بخَلَده أنّ حياته كلّها قائمة على كذبة.",
    },
    {
      text: "ثمّ جاءت الليلة التي غيّرت كلّ شيء. في وليمة، صرخ رجلٌ سكران بأنّ أوديب ليس ابناً حقيقيّاً لوالدَيه. اهتزّ أوديب حتّى النُّخاع. ذهب مباشرة إلى عرّافة دِلفي يطلب الحقيقة. لكنّ العرّافة لم تُجِب عن سؤاله. بدلاً من ذلك، رمَت في وجهه نبوءةً أشدّ هولاً — نفسها التي سمعها لايُوس قبل سنين: ستقتل أباك وتتزوّج أمّك.",
    },
    {
      text: "فعل أوديب أذكى ما يمكن لإنسانٍ أن يفعله — وكان ذلك بالضبط ما أهلكه. قرّر ألّا يعود إلى كورنثوس أبداً. قال: سأحمي أبي وأمّي بالابتعاد عنهما. واتّجه إلى الطريق المعاكس... نحو طيبة. كلّ خطوة ظنَّ أنّها تُبعده عن القَدَر كانت تُقرِّبه منه. كان يهرب من مصيره، وما كان يدري أنّه يركض في اتّجاهه تماماً.",
    },
    {
      text: "على طريقٍ ضيّق، صادفَ عربةً يقودها رجلٌ مسنّ حاول أن يُزيحَه بالقوّة. غلى دم أوديب وقتل الرجل في لحظة غضب. لم يكن يعلم — ولم يكن بإمكانه أن يعلم — أنّ ذلك الرجل كان لايُوس. أبوه الحقيقي. ملك طيبة الذي أراد التخلّص منه وهو طفل. نصف النبوءة تحقّق، وأوديب لا يملك أدنى فكرة.",
    },
    {
      text: "حين وصل إلى طيبة، وجد المدينة ترتعد من وحشٍ اسمه سفِنكس — مخلوق بجسد أسدٍ ووجه امرأة — يطرح لُغزاً على كلّ من يمرّ ويقتل من يعجز عن حلّه: «ما الذي يمشي على أربعٍ في الصباح، واثنتين في الظهيرة، وثلاثٍ في المساء؟» أجاب أوديب دون تردّد: الإنسان. ألقى سفِنكس بنفسه من الجُرف. أهل طيبة توّجوه ملكاً وزوّجوه الملكة الأرملة. اسمها يوكاستا. كانت أمّه.",
    },
    {
      text: "حكم أوديب سنواتٍ بعدلٍ وحكمة. أنجب أطفالاً من يوكاستا. كانت الحياة كريمة. ثمّ ضرب المدينةَ وباءٌ لا يرحم. أعلنت العرّافة أنّ لعنةً تُثقِل طيبة لأنّ قاتل الملك السابق لايُوس لم يُكشَف بعد. أوديب أقسم أنّه سيجد القاتل مهما كلّف الأمر. فتح تحقيقاً لا هوادة فيه. ووجد القاتل أخيراً. كان هو نفسه.",
    },
    {
      text: "حين انكشف كلّ شيء — مَن يكون حقّاً، ومَن تزوّج، وماذا فعل — شنقت يوكاستا نفسها. أمّا أوديب، فانتزع الدبابيس من ثوبها وغرسها في عينيه. يقولون «المكتوب على الجبين لازم تشوفه العين» — لكنّ أوديب رأى كلّ شيء... فقرّر ألّا يرى بعدها شيئاً. خرج من طيبة أعمى مُحطَّماً، تقوده ابنته أنتيغوني. رجلٌ فعل كلّ شيءٍ صواب، وخسر كلّ شيء. كلّما أسرع في الفرار من قَدَره، أسرع قَدَره في الإمساك به.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// PERSIAN — سرنوشت اُدیپ
// ═══════════════════════════════════════════════════════════════
const persian = {
  ...shared,
  lang: "fa",
  langStoryId: "fa#oedipus-prophecy",
  title: "سرنوشت اُدیپ",
  subtitle: "پیشگویی\u200cای که گریزی از آن نبود",
  excerpt: "همه\u200cچیز با یک پرسش ساده شروع شد. لائیوس، پادشاهِ شهرِ یونانیِ تِبس، به دِلفی رفت — مقدّس\u200cترین جای یونانِ باستان — تا از کاهنه بپرسد: آیا روزی صاحبِ فرزند خواهد شد؟",
  moralOrLesson: "از سرنوشت نمی\u200cشود با فرار گریخت — بیشترِ وقت\u200cها، خودِ تلاش برای فرار است که پیشگویی را به واقعیّت بدل می\u200cکند. خِرَدِ راستین نه در گریز از تقدیر، که در پذیرفتنِ آن است.",
  characters: ["اُدیپ", "یوکاستا", "لائیوس", "کاهنه\u200cی دِلفی", "اِسفنکس", "آنتیگونه"],
  paragraphs: [
    {
      text: "همه\u200cچیز با یک پرسش ساده شروع شد. لائیوس، پادشاهِ شهرِ یونانیِ تِبس، به دِلفی رفت — مقدّس\u200cترین جای یونانِ باستان — تا از کاهنه بپرسد: آیا روزی صاحبِ فرزند خواهد شد؟ جوابی که شنید دنیایش را ویران کرد. آری، پسری به دنیا خواهد آمد. امّا همین پسر روزی پدرش را خواهد کشت و با مادرش ازدواج خواهد کرد. لائیوسِ وحشت\u200cزده دستور داد مچِ پاهای نوزاد را سوراخ کنند و ببندند، و بچه را در کوه رها کنند تا بمیرد. نامِ «اُدیپوس» در یونانی یعنی «پای متورّم».",
    },
    {
      text: "امّا خادم دلش نیامد. وقتی صورتِ آن نوزاد را دید، نتوانست. بچه را به چوپانی سپرد که از آن حوالی رد می\u200cشد، و چوپان او را به شهرِ کورینت بُرد — پیشِ پادشاه و ملکه\u200cای که فرزندی نداشتند. آن\u200cها اُدیپ را مثلِ پسرِ خودشان بزرگ کردند. اُدیپ شاهزاده\u200cای شد پُراعتمادبه\u200cنفس و محبوبِ همه، بی\u200cخبر از اینکه تمامِ زندگی\u200cاش روی دروغ بنا شده بود.",
    },
    {
      text: "تا اینکه یک شب همه\u200cچیز عوض شد. سرِ یک مهمانی، مستی فریاد زد که اُدیپ پسرِ واقعیِ پدر و مادرش نیست. اُدیپ تا مغزِ استخوان تکان خورد. یک\u200cراست رفت دِلفی تا حقیقت را از زبانِ کاهنه بشنود. امّا کاهنه جوابِ سؤالش را نداد. به\u200cجایش چیزِ به\u200cمراتب وحشتناک\u200cتری گفت — همان پیشگویی\u200cای که سال\u200cها پیش به لائیوس گفته بود: پدرت را خواهی کشت و با مادرت ازدواج خواهی کرد.",
    },
    {
      text: "اُدیپ عاقلانه\u200cترین تصمیمِ ممکن را گرفت — و دقیقاً همین تصمیم نابودش کرد. با خودش عهد بست: هرگز به کورینت برنمی\u200cگردم. پدر و مادرم را از دور حفظ می\u200cکنم. و راهِ مخالف را پیش گرفت... مستقیم به سمتِ تِبس. هر قدمی که خیال می\u200cکرد از سرنوشتش دورتر می\u200cشود، یک قدم به آن نزدیک\u200cتر بود. داشت فرار می\u200cکرد، بی\u200cآنکه بداند درست به سمتِ همان چیزی می\u200cدود که از آن می\u200cگریخت.",
    },
    {
      text: "در یک جاده\u200cی تنگ، سرِ راهش مردی مسن سوار بر ارّابه پیدا شد که خواست با زور اُدیپ را کنار بزند. خونِ اُدیپ به جوش آمد و مرد را در دَمی کشت. نمی\u200cدانست — و نمی\u200cتوانست بداند — آن مرد لائیوس بود. پدرِ واقعی\u200cاش. پادشاهِ تِبس. نیمی از پیشگویی محقّق شده بود و اُدیپ کوچک\u200cترین خبری نداشت.",
    },
    {
      text: "وقتی به تِبس رسید، شهر در چنگالِ هیولایی بود به نامِ اِسفنکس — موجودی با بدنِ شیر و چهره\u200cی زن — که هرکس نمی\u200cتوانست معمایش را حل کند، می\u200cکشت: «چه چیزی صبح با چهار پا راه می\u200cرود، ظهر با دو پا، و شب با سه پا؟» اُدیپ بی\u200cلحظه\u200cای درنگ جواب داد: انسان. اِسفنکس خود را از بالای صخره به پایین پرت کرد. مردمِ شادمانِ تِبس اُدیپ را پادشاه کردند و ملکه\u200cی بیوه را به همسری\u200cاش دادند. نامش یوکاستا بود. مادرِ خودِ اُدیپ.",
    },
    {
      text: "سال\u200cها گذشت و اُدیپ با دادگری حکومت کرد. با یوکاستا صاحبِ فرزندانی شد. زندگی خوب بود. تا اینکه طاعونی هولناک بر شهر چنگ انداخت. کاهنه اعلام کرد تِبس نفرین شده، چون قاتلِ شاهِ پیشین — لائیوس — هنوز پیدا نشده. اُدیپ با همان اعتمادبه\u200cنفسِ همیشگی\u200cاش سوگند خورد قاتل را پیدا کند، هرکه باشد. تحقیقی بی\u200cامان آغاز کرد. و قاتل را یافت. خودش بود.",
    },
    {
      text: "وقتی تمامِ حقیقت بیرون ریخت — که کیست، با چه کسی ازدواج کرده، چه کرده — یوکاستا خود را حلق\u200cآویز کرد. اُدیپ سنجاق\u200cهای جامه\u200cی او را کَند و در چشمانش فرو بُرد. می\u200cگویند «از ماست که بر ماست»، امّا بلایی که سرِ اُدیپ آمد از عقلش بود، از مهربانی\u200cاش، از تلاشش برای درست زیستن. از تِبس رفت — کور، شکسته، دستش در دستِ دخترش آنتیگونه — مردی که هرچه کرد درست کرد و هرچه داشت از دست داد. هرچه تندتر از سرنوشتش گریخت، سرنوشتش تندتر او را به دام انداخت.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// TURKISH — Oidipus'un Kaderi
// ═══════════════════════════════════════════════════════════════
const turkish = {
  ...shared,
  lang: "tr",
  langStoryId: "tr#oedipus-prophecy",
  title: "Oidipus'un Kaderi",
  subtitle: "Ka\u00e7\u0131lamayan kehanet",
  excerpt: "Her \u015fey tek bir soruyla ba\u015flad\u0131. Yunan \u015fehri Thebai'nin kral\u0131 Laios, antik Yunanistan'\u0131n en kutsal yeri Delfi'ye gitti \u2014 k\u00e2hinden tek bir \u015fey \u00f6\u011frenmek istiyordu: Bir o\u011flu olacak m\u0131yd\u0131?",
  moralOrLesson: "Kaderden ka\u00e7arak kurtulunmaz \u2014 \u00e7o\u011fu zaman ka\u00e7ma \u00e7abas\u0131 kehanetin ger\u00e7ekle\u015fmesini sa\u011flar. Ger\u00e7ek bilgelik kaderden ka\u00e7\u0131nmakta de\u011fil, onu kabul etmektedir.",
  characters: ["Oidipus", "\u0130okaste", "Laios", "Delfi K\u00e2hini", "Sfenks", "Antigone"],
  paragraphs: [
    {
      text: "Her \u015fey tek bir soruyla ba\u015flad\u0131. Yunan \u015fehri Thebai'nin kral\u0131 Laios, antik Yunanistan'\u0131n en kutsal yeri Delfi'ye gitti \u2014 k\u00e2hinden tek bir \u015fey \u00f6\u011frenmek istiyordu: Bir o\u011flu olacak m\u0131yd\u0131? Ald\u0131\u011f\u0131 cevap hayat\u0131n\u0131 parampar\u00e7a etti. Evet, bir o\u011flun olacak. Ama bu \u00e7ocuk b\u00fcy\u00fcy\u00fcp babas\u0131n\u0131 \u00f6ld\u00fcrecek ve annesiyle evlenecek. Deh\u015fete kap\u0131lan Laios, bebe\u011fin ayak bileklerini deldirip ba\u011flatt\u0131 ve bir hizmetk\u00e2r\u0131na verdi \u2014 da\u011fda b\u0131raks\u0131n, \u00f6ls\u00fcn diye. \u201cOidipus\u201d zaten Yunancada \u201c\u015fi\u015f ayak\u201d demek.",
    },
    {
      text: "Ama hizmetk\u00e2r yapamad\u0131. Bebe\u011fin y\u00fcz\u00fcne bakt\u0131, i\u00e7i par\u00e7aland\u0131. \u00c7ocu\u011fu yoldan ge\u00e7en bir \u00e7obana verdi; \u00e7oban da onu Korinthos'a g\u00f6t\u00fcrd\u00fc \u2014 \u00e7ocu\u011fu olmayan bir kral ve krali\u00e7enin yan\u0131na. Oidipus'u \u00f6z o\u011fullar\u0131 gibi b\u00fcy\u00fctt\u00fcler, sevdiler. O da kendinden emin, herkes taraf\u0131ndan sevilen bir prens oldu. B\u00fct\u00fcn hayat\u0131n\u0131n bir yalan \u00fczerine kurulu oldu\u011fundan habersiz.",
    },
    {
      text: "Ta ki bir gece her \u015fey alt \u00fcst olana kadar. Bir \u015f\u00f6lende sarho\u015fun biri ba\u011f\u0131rd\u0131: \u201cSen ger\u00e7ek o\u011fullar\u0131 de\u011filsin!\u201d Oidipus'un y\u00fcre\u011fi yerinden oynad\u0131. Do\u011fruca Delfi'ye gidip k\u00e2hine sordu. Ama k\u00e2hin onun sorusuna cevap vermedi. Bunun yerine \u00e7ok daha korkun\u00e7 bir \u015fey s\u00f6yledi \u2014 y\u0131llar \u00f6nce Laios'a verilen kehanetin ayn\u0131s\u0131: Baban\u0131 \u00f6ld\u00fcreceksin ve annenle evleneceksin.",
    },
    {
      text: "Oidipus yap\u0131labilecek en ak\u0131ll\u0131ca \u015feyi yapt\u0131 \u2014 ki tam da bu onu mahvetti. \u201cKorinthos'a asla d\u00f6nmeyece\u011fim,\u201d diye yemin etti. \u201cAnnemi babam\u0131 korumak i\u00e7in kendimi onlardan uzak tutaca\u011f\u0131m.\u201d Ve tam ters y\u00f6ne y\u00fcr\u00fcd\u00fc\u2026 Do\u011fruca Thebai'ye do\u011fru. Kaderinden ka\u00e7t\u0131\u011f\u0131n\u0131 sand\u0131\u011f\u0131 her ad\u0131m, asl\u0131nda onu kaderine bir ad\u0131m daha yakla\u015ft\u0131r\u0131yordu. Ka\u00e7\u0131yordu \u2014 ama nereye ka\u00e7t\u0131\u011f\u0131n\u0131 bilmiyordu.",
    },
    {
      text: "Dar bir yolda ya\u015fl\u0131 bir adam\u0131n arabas\u0131yla kar\u015f\u0131la\u015ft\u0131. Adam onu zorla yoldan \u00e7\u0131karmaya \u00e7al\u0131\u015ft\u0131. Oidipus'un kan\u0131 beynine s\u0131\u00e7rad\u0131; \u00f6fkeyle adam\u0131 \u00f6ld\u00fcrd\u00fc. Kim oldu\u011funu bilmiyordu \u2014 bilemezdi. O adam Laios'tu. \u00d6z babas\u0131. Thebai'nin eski kral\u0131. Kehanetin yar\u0131s\u0131 \u00e7oktan ger\u00e7ekle\u015fmi\u015fti ve Oidipus'un bundan zerre kadar haberi yoktu.",
    },
    {
      text: "Thebai'ye vard\u0131\u011f\u0131nda \u015fehir korku i\u00e7indeydi. Sfenks denen bir canavar \u2014 aslan g\u00f6vdeli, kad\u0131n y\u00fczl\u00fc \u2014 \u015fehrin kap\u0131s\u0131nda dikilip bilmecesini \u00e7\u00f6zemeyeni \u00f6ld\u00fcr\u00fcyordu: \u201cSabahleyin d\u00f6rt ayakla, \u00f6\u011flen iki ayakla, ak\u015fam \u00fc\u00e7 ayakla y\u00fcr\u00fcyen nedir?\u201d Oidipus g\u00f6z k\u0131rpmadan cevaplad\u0131: \u0130nsan. Sfenks kendini u\u00e7urumdan a\u015fa\u011f\u0131 att\u0131. Minnettar halk Oidipus'u kral ilan etti, dul krali\u00e7eyi de e\u015f olarak verdi. Ad\u0131 \u0130okaste'ydi. Oidipus'un \u00f6z annesiydi.",
    },
    {
      text: "Y\u0131llar ge\u00e7ti, Oidipus adil bir kral oldu. \u0130okaste'yle \u00e7ocuklar\u0131 oldu. Hayat g\u00fczeldi. Derken korkun\u00e7 bir veba \u015fehri kas\u0131p kavurdu. K\u00e2hin a\u00e7\u0131klad\u0131: Thebai lanetli \u00e7\u00fcnk\u00fc eski kral Laios'un katili h\u00e2l\u00e2 yakalanmad\u0131. Oidipus her zamanki \u00f6zg\u00fcveniyle ant i\u00e7ti \u2014 katili bulaca\u011f\u0131m, kim olursa olsun. Ac\u0131mas\u0131z bir soru\u015fturma ba\u015flatt\u0131. Ve katili buldu. Kendisiydi.",
    },
    {
      text: "Ger\u00e7e\u011fin tamam\u0131 g\u00fcn y\u00fcz\u00fcne \u00e7\u0131kt\u0131\u011f\u0131nda \u2014 kim oldu\u011fu, kiminle evlendi\u011fi, ne yapt\u0131\u011f\u0131 \u2014 \u0130okaste kendini ast\u0131. Oidipus onun elbisesindeki i\u011fneleri \u00e7ekip g\u00f6zlerine saplad\u0131. \u201cSabr\u0131n sonu selamettir\u201d derler ya \u2014 Oidipus da sabretmi\u015fti, y\u0131llarca sabretmi\u015fti. Ama sabr\u0131 t\u00fckenip ger\u00e7e\u011fi aramaya \u00e7\u0131kt\u0131\u011f\u0131nda, sonunda selamet de\u011fil, y\u0131k\u0131m vard\u0131. Thebai'den k\u00f6r ve parampar\u00e7a ayr\u0131ld\u0131, k\u0131z\u0131 Antigone'nin kolunda \u2014 her \u015feyi do\u011fru yap\u0131p her \u015feyi kaybetmi\u015f bir adam. Kaderinden ne kadar h\u0131zl\u0131 ka\u00e7t\u0131ysa, kaderi de o kadar h\u0131zl\u0131 yakalad\u0131.",
    },
  ],
};

// ─── Push all three ───
async function pushStory(item, label) {
  try {
    await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: item,
        ConditionExpression: "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
      })
    );
    console.log(`✓ ${label} pushed successfully (${item.langStoryId})`);
    return true;
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      // Record already exists — overwrite it
      console.log(`  ${label} already exists, overwriting...`);
      await docClient.send(
        new PutCommand({ TableName: TABLE, Item: item })
      );
      console.log(`✓ ${label} overwritten successfully (${item.langStoryId})`);
      return true;
    }
    console.error(`✗ ${label} FAILED:`, err.message);
    return false;
  }
}

async function main() {
  console.log(`Pushing 3 stories to table "${TABLE}" at ${new Date().toISOString()}...\n`);

  const arOk = await pushStory(arabic, "Arabic (ar)");
  const faOk = await pushStory(persian, "Persian (fa)");
  const trOk = await pushStory(turkish, "Turkish (tr)");

  console.log("\n─── Summary ───");
  console.log(`Arabic:  ${arOk ? "✓" : "✗"}`);
  console.log(`Persian: ${faOk ? "✓" : "✗"}`);
  console.log(`Turkish: ${trOk ? "✓" : "✗"}`);

  if (!arOk || !faOk || !trOk) process.exit(1);
}

main();
