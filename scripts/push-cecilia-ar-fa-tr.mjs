import { readFileSync } from 'node:fs';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

// Load .env.local
const env = {};
for (const line of readFileSync('.env.local', 'utf-8').split('\n')) {
  const idx = line.indexOf('=');
  if (idx > 0) env[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
}

const client = new DynamoDBClient({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE = env.DYNAMO_TABLE_STORY || 'Story';
const now = Math.floor(Date.now() / 1000);

// ─── Non-text fields (identical across all languages) ───
const base = {
  siteId: 'catacombs-rome',
  storyId: 'st-cecilias-incorrupt-body',
  icon: '\u{1F3B5}',
  tier: 'A',
  source: "Acta Sanctorum; Maderno's sculpture documentation; De Rossi, Giovanni Battista. Roma Sotterranea, 1864-77",
  characters: [
    'Saint Cecilia',
    'Cardinal Paolo Emilio Sfondrato',
    'Stefano Maderno (sculptor)',
    'Pope Urban I',
    'Pope Paschal I',
  ],
  era: 'Martyrdom c. 230 AD; rediscovery 1599',
  readingTimeMinutes: 3,
  image: '',
  disabled: false,
  thumbnail: '',
  coordinates: { lng: 12.5135, lat: 41.8579 },
  hasAudio: false,
  isFree: true,
  storyCategory: 'prophets_pilgrims',
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════
//  ARABIC — "\u0633\u064A\u0633\u064A\u0644\u064A\u0627: \u062C\u064E\u0633\u064E\u062F\u064C \u0644\u0645 \u064A\u064E\u0631\u0636\u064E\u062E"
//  Proverb: "\u0627\u0644\u062B\u0627\u0644\u062B\u0629 \u062B\u0627\u0628\u062A\u0629" (Third time holds / third time's the charm)
//  Subversion: The "firm" one was Cecilia herself, not the third strike.
// ═══════════════════════════════════════════════════════════
const ar = {
  lang: 'ar',
  langStoryId: 'ar#st-cecilias-incorrupt-body',
  title: 'سيسيليا: جَسَدٌ لم يَرضَخ',
  subtitle: 'شفيعة الموسيقى التي وجدوها بعد ثلاثةَ عشرَ قرنًا وكأنّ الموت لم يمسَّها',
  excerpt: 'في عام ١٥٩٩، فتح عُمّالٌ في روما تابوتًا حجريًّا مُغلَقًا منذ ثمانمئة سنة. ما وجدوه بداخله لم يكن منطقيًّا أبدًا.',
  moralOrLesson: 'بعض القصص ترفض أن تُدفَن. الذين حاولوا إسكات سيسيليا لا يذكرهم أحد، لكنّها لا تزال هنا — في الرُّخام، في الموسيقى، في كلّ قاعة حفلات تحمل اسمها. أحيانًا، أهدأ صوتٍ في الغرفة هو الذي يبقى أطول.',
  paragraphs: [
    {
      text: 'في عام ١٥٩٩، فتح عُمّالٌ في روما تابوتًا حجريًّا مدفونًا تحت كنيسة. كان مُغلَقًا منذ ثمانمئة سنة. ما وجدوه بداخله لم يكن منطقيًّا: فتاةٌ شابّة مُستلقية على جنبها، تبدو وكأنّها غفَت للتوّ. لا هيكلَ عظميّ، لا غبار. بعد ثلاثةَ عشرَ قرنًا، بدا الجسد سليمًا. اسمها سيسيليا — وقصّة وصولها إلى ذلك التابوت من أغرب ما سمعتَ عن روما.',
    },
    {
      text: 'عاشت سيسيليا في روما حوالي سنة ٢٣٠ للميلاد — زمنٌ كان فيه الإيمان بالمسيح جريمةً تُكلِّف الرأس. كانت من عائلة نبيلة، لكنّها اعتنقت المسيحية سرًّا. لم تكتفِ بذلك، بل أقنعت زوجها الوثنيّ فاليريان أن يَدخل الإيمان معها. حين عَلِمَ رجال الإمبراطور، لم يريدوا مجرّد عقابها — أرادوا أن يجعلوا منها عِبرةً لكلّ من تُسوِّل له نفسُه التحدّي.',
    },
    {
      text: 'حبسوها في حمّام بيتها ورفعوا الحرارة حتى حدّ القتل. الفكرة: أن تموت مسلوقةً دون أن يلمسها أحد. بقيت يومًا وليلةً كاملَين — ولم تمت. فأرسلوا جلّادًا. القانون الرومانيّ يسمح بثلاث ضرباتِ سيفٍ فقط. ضرب عُنقها ثلاثًا. يقولون «الثالثةُ ثابتة» — لكنّ الثابتة هنا كانت سيسيليا نفسها. السيف شقَّ رقبتها ثلاثَ شقوقٍ عميقة، لكنّه عَجَزَ أن يفصل رأسها.',
    },
    {
      text: 'انتشر الخبر في روما كالنار: امرأةٌ تحتضر بعد إعدامٍ فاشل — وما زالت تُبشِّر. تدفّق الناس لرؤيتها، ومئاتٌ اعتنقوا المسيحية في مكان موتها. جمعوا دمها في قماشٍ وجِرار كأنّه كنزٌ مقدَّس. بقيت ثلاثة أيام بين الحياة والموت قبل أن تُغمِضَ عينيها أخيرًا. دفنها البابا أُوربان الأول بنفسه في سراديب سان كاليستو، بجوار قبور الباباوات.',
    },
    {
      text: 'ستّة قرون ظلّ جسدها تحت الأرض. في سنة ٨٢١، نقله البابا باسكال الأول إلى كنيسةٍ بُنيَت باسمها — سانتا تشيتشيليا في حيّ تراستيفيري، على الضفّة الأخرى لنهر التيبر في روما. أُغلِقَ التابوت تحت المذبح. وبقي هناك دون أن يمسّه أحد قرابة ثمانمئة سنة — حتى قرّر الكاردينال سفوندراتو ترميم الكنيسة، وفتحَ التابوت.',
    },
    {
      text: 'ما رآه لم يكن عاديًّا بعد ثلاثةَ عشرَ قرنًا. سيسيليا مُستلقية على جنبها الأيمن، ركبتاها مضمومتان، ذراعاها ممدودتان إلى الأمام، ووجهها نحو الأرض — كأنّها نائمة. وعلى رقبتها: ثلاثة جروحٍ عميقة، واضحة كأنّها من الأمس. آثار ضربات السيف التي عجزت عن إسكاتها. استدعى الكاردينالُ النحّاتَ ستيفانو مادِيرنو ليُخلِّد المشهد قبل إغلاق التابوت مجدّدًا.',
    },
    {
      text: 'نحت مادِيرنو تمثالًا بالحجم الطبيعي من الرُّخام: الوضعيّة الهادئة، الوجه المحجوب، الجروح الثلاثة في العُنق. أنهاه سنة ١٦٠٠، ولا يزال تحت المذبح ذاته في تراستيفيري. ليس تمثالًا دراميًّا — لا أيدٍ ممدودة نحو السماء، لا نظرة معاناة. مجرّد جسدٍ مُستلقٍ بسكينة. وهذا بالضبط ما يجعل الناس يقفون أمامه مذهولين منذ أربعة قرون.',
    },
    {
      text: 'والمفارقة؟ قبل أن يجد أحدٌ جسدها، كانت سيسيليا أصلًا واحدةً من أشهر القدّيسين — شفيعة الموسيقى. يوم زفافها القسريّ من فاليريان، بينما عزفت الآلات الرومانية حولها، غنّت لله في قلبها بصمت. تلك الصورة لم تُنسَ أبدًا. اليوم، قاعات حفلات وأكاديميّات موسيقى حول العالم تحمل اسمها. المرأة التي حاولت روما إسكاتها صارت القدّيسة التي يُغنّي لها العالم كلّه.',
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  PERSIAN — "\u0633\u06CC\u0633\u06CC\u0644\u06CC\u0627 \u0648 \u0633\u06CC\u0632\u062F\u0647 \u0642\u0631\u0646 \u062E\u0648\u0627\u0628"
//  Proverb: "\u062A\u0627 \u0633\u0647 \u0646\u0634\u0647 \u0628\u0627\u0632\u06CC \u0646\u0634\u0647" (It's not a game until three)
//  Subversion: Three happened, but the game didn't end the way Rome wanted.
// ═══════════════════════════════════════════════════════════
const fa = {
  lang: 'fa',
  langStoryId: 'fa#st-cecilias-incorrupt-body',
  title: 'سیسیلیا و سیزده قرن خواب',
  subtitle: 'نگهبانِ موسیقی که سیزده قرن بعد از مرگ، انگار فقط خوابیده بود',
  excerpt: 'سال ۱۵۹۹، کارگرهایی در رُم تابوتی هشتصدساله را باز کردند. آنچه داخلش دیدند از هر منطقی به دور بود.',
  moralOrLesson: 'بعضی داستان‌ها زیر خاک نمی‌مانند. کسانی که خواستند سیسیلیا را ساکت کنند، مدت‌هاست فراموش شده‌اند — اما او هنوز اینجاست: در سنگ، در موسیقی، در هر سالن کنسرتی که نامش را یدک می‌کشد. گاهی آرام‌ترین صدای اتاق همان صدایی‌ست که از همه بیشتر می‌ماند.',
  paragraphs: [
    {
      text: 'سال ۱۵۹۹ میلادی. کارگرهایی در رُم درِ تابوتی سنگی را باز کردند که هشتصد سال بسته مانده بود. آنچه دیدند از عقل به دور بود: دختری جوان، به پهلو خوابیده، انگار همین الان چشمانش را بسته. نه اسکلت بود، نه خاک. بعد از سیزده قرن، بدنش سالم بود. نامش سیسیلیا بود — و داستانِ رسیدنش به آن تابوت، یکی از عجیب‌ترین داستان‌هایی‌ست که از رُم شنیده‌اید.',
    },
    {
      text: 'سیسیلیا زنی اشراف‌زاده بود که در حدود سال ۲۳۰ میلادی در رُم زندگی می‌کرد — روزگاری که مسیحی بودن مساوی بود با حکم مرگ. او پنهانی مسیحی شده بود و حتی شوهرِ بُت‌پرستش والِریان را هم به آیینش کشانده بود. وقتی مأموران امپراتور فهمیدند، فقط نمی‌خواستند تنبیهش کنند — می‌خواستند درس عبرتی بسازند که هیچ‌کس جرأت تکرارش را نداشته باشد.',
    },
    {
      text: 'او را در حمّامِ خانه‌اش زندانی کردند و دما را تا سرحدّ مرگ بالا بردند. یک شبانه‌روز تمام دوام آورد — و نمُرد. پس جلّاد فرستادند. قانون رُم فقط سه ضربهٔ شمشیر اجازه می‌داد. جلّاد سه بار به گردنش زد. می‌گویند «تا سه نشه بازی نشه» — سه‌تا شد، اما بازی آن‌طور که رُم می‌خواست تمام نشد. شمشیر سه زخمِ عمیق روی گردنش گذاشت، ولی سرش را نبُرید. سیسیلیا افتاد، خون‌آلود اما زنده.',
    },
    {
      text: 'خبر مثل آتش در رُم پیچید: زنی بعد از اعدامِ ناموفق هنوز زنده است — و دارد موعظه می‌کند. مردم هجوم آوردند و صدها نفر همان‌جا مسیحی شدند. خونش را در پارچه و ظرف جمع کردند، مثل گنجی مقدّس. سه روز بین مرگ و زندگی ماند تا بالاخره چشم بست. پاپ اوربانِ اول خودش او را در دخمه‌های سَن‌کالیستو، کنار آرامگاه پاپ‌ها، به خاک سپرد.',
    },
    {
      text: 'ششصد سال بدنش زیر زمین ماند. سال ۸۲۱، پاپ پاسکالِ اول بقایایش را به کلیسایی بُرد که به نامش ساخته شده بود — سانتا چِچیلیا در محلّهٔ تراستِوِره، آن‌طرف رودِ تیبِر. تابوت زیر محراب مُهر شد و همان‌جا ماند، دست‌نخورده، نزدیک هشتصد سال — تا وقتی کاردینال سفوندراتو تصمیم گرفت کلیسا را بازسازی کند و درِ تابوت را باز کرد.',
    },
    {
      text: 'آنچه دید بعد از سیزده قرن باورنکردنی بود. سیسیلیا به پهلوی راست خوابیده بود، زانوهایش جمع، دست‌هایش رو به جلو دراز، و صورتش رو به زمین. انگار که خوابیده. و روی گردنش: سه زخم عمیق، واضح مثل روز اول — جای همان سه ضربه شمشیری که نتوانسته بود خاموشش کند. کاردینال فوری پیکرتراش استفانو مادِرنو را صدا زد تا پیش از بسته شدن دوبارهٔ تابوت، آن صحنه را جاودانه کند.',
    },
    {
      text: 'مادِرنو پیکره‌ای به اندازهٔ واقعی از سنگ مرمر تراشید: همان حالت آرام، همان صورت برگردانده، همان سه زخم روی گردن. کارش را سال ۱۶۰۰ تمام کرد و هنوز هم زیر همان محراب ایستاده. پیکره‌ای بی‌ادعا — نه دستی به سوی آسمان، نه چهره‌ای پُر از درد. فقط بدنی آرام، خوابیده. و همین سادگی‌ست که بیش از چهارصد سال است مردم را میخکوب می‌کند.',
    },
    {
      text: 'و اینجاست که داستان پیچ می‌خورد. خیلی پیش از پیدا شدن جسدش، سیسیلیا از پیش یکی از محبوب‌ترین قدّیسان مسیحیت بود — نگهبانِ موسیقی. روز عروسیِ اجباری‌اش با والِریان، وقتی سازهای رومی دور و بَرش می‌نواختند، او بی‌صدا در دلش برای خدا سرود خواند. آن تصویر هیچ‌وقت فراموش نشد. امروز، سالن‌های کنسرت و آکادمی‌های موسیقی در سراسر دنیا نام او را یدک می‌کشند. زنی که رُم خواست صدایش را خفه کند، قدّیسه‌ای شد که تمام دنیا برایش می‌خوانَد.',
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  TURKISH — "\u00D6lmeyi Reddeden Kad\u0131n"
//  Proverb: "\u00DC\u00E7 g\u00FCnl\u00FCk d\u00FCnya" (The world is just three days — life is fleeting)
//  Subversion: Cecilia didn't leave this world with those three strikes.
// ═══════════════════════════════════════════════════════════
const tr = {
  lang: 'tr',
  langStoryId: 'tr#st-cecilias-incorrupt-body',
  title: '\u00D6lmeyi Reddeden Kad\u0131n',
  subtitle: 'M\u00FCzi\u011Fin koruyucu azizesi, on \u00FC\u00E7 y\u00FCzy\u0131l sonra bozulmam\u0131\u015F halde bulundu',
  excerpt: '1599\u2019da Roma\u2019da i\u015F\u00E7iler sekiz y\u00FCz y\u0131ll\u0131k bir ta\u015F lahdi a\u00E7t\u0131lar. \u0130\u00E7inde bulduklar\u0131 \u015Fey, her t\u00FCrl\u00FC mant\u0131\u011Fa ayk\u0131r\u0131yd\u0131.',
  moralOrLesson: 'Baz\u0131 hik\u00E2yeler g\u00F6m\u00FClmeyi reddeder. Cecilia\u2019y\u0131 susturmaya \u00E7al\u0131\u015Fanlar \u00E7oktan unutuldu, ama o h\u00E2l\u00E2 burada \u2014 mermerde, m\u00FCzikte, ad\u0131n\u0131 ta\u015F\u0131yan her konser salonunda. Bazen bir odadaki en sessiz ses, en uzun s\u00FCre yankılanan ses olur.',
  paragraphs: [
    {
      text: '1599 y\u0131l\u0131, Roma. \u0130\u015F\u00E7iler bir kilisenin alt\u0131ndaki ta\u015F lahdi a\u00E7t\u0131lar. Sekiz y\u00FCz y\u0131ld\u0131r kapal\u0131yd\u0131. \u0130\u00E7inde g\u00F6rd\u00FCkleri \u015Fey imk\u00E2ns\u0131z olmal\u0131yd\u0131: gen\u00E7 bir kad\u0131n, yan yatm\u0131\u015F, sanki az \u00F6nce uykuya dalm\u0131\u015F gibi. Ne iskelet vard\u0131 ne toz. On \u00FC\u00E7 y\u00FCzy\u0131l\u0131n ard\u0131ndan beden sapasa\u011Flam duruyordu. Ad\u0131 Cecilia\u2019yd\u0131 \u2014 ve oraya nas\u0131l geldi\u011Finin hik\u00E2yesi, Roma\u2019n\u0131n en tuhaf \u00F6yk\u00FClerinden biri.',
    },
    {
      text: 'Cecilia, milattan sonra 230 civar\u0131nda ya\u015Fam\u0131\u015F Romal\u0131 soylu bir kad\u0131nd\u0131. O d\u00F6nemde H\u0131ristiyan olmak kellenizi kaybetmeniz demekti. Cecilia gizlice H\u0131ristiyanl\u0131\u011F\u0131 se\u00E7mi\u015Fti, \u00FCstelik putperest kocas\u0131 Valerianus\u2019u da inanc\u0131na \u00E7ekmi\u015Fti. \u0130mparatorun adamlar\u0131 bunu \u00F6\u011Frendi\u011Finde sadece cezaland\u0131rmak yetmezdi \u2014 kimsenin bir daha cesaret edemeyece\u011Fi bir ibret yaratmak istediler.',
    },
    {
      text: 'Onu kendi evinin hamam odas\u0131na kilitleyip s\u0131cakl\u0131\u011F\u0131 \u00F6ld\u00FCr\u00FCc\u00FC d\u00FCzeye \u00E7\u0131kard\u0131lar. Bir g\u00FCn bir gece dayand\u0131 \u2014 \u00F6lmedi. Cellat g\u00F6nderdiler. Roma hukuku yaln\u0131zca \u00FC\u00E7 k\u0131l\u0131\u00E7 darbesine izin veriyordu. Cellat boynuna \u00FC\u00E7 kez vurdu. \u00AB\u00DC\u00E7 g\u00FCnl\u00FCk d\u00FCnya\u00BB derler ya \u2014 Cecilia o \u00FC\u00E7 darbeyle bu d\u00FCnyadan gitmedi. K\u0131l\u0131\u00E7 boynunda \u00FC\u00E7 derin yara a\u00E7t\u0131 ama ba\u015F\u0131n\u0131 g\u00F6vdesinden ay\u0131ramad\u0131. Cecilia yere y\u0131\u011F\u0131ld\u0131, kan i\u00E7inde ama canl\u0131.',
    },
    {
      text: 'Haber Roma\u2019da ate\u015F gibi yay\u0131ld\u0131: bir kad\u0131n ba\u015Far\u0131s\u0131z bir infazdan sonra h\u00E2l\u00E2 ya\u015F\u0131yor \u2014 ve vaaz vermeye devam ediyor. \u0130nsanlar ak\u0131n ak\u0131n geldi. Y\u00FCzlercesi orac\u0131kta H\u0131ristiyanl\u0131\u011F\u0131 kabul etti. Kan\u0131n\u0131 bezlere ve kaplara toplad\u0131lar, kutsal bir emanet gibi. \u00DC\u00E7 g\u00FCn daha ya\u015Famla \u00F6l\u00FCm aras\u0131nda kald\u0131, sonunda g\u00F6zlerini kapad\u0131. Papa I. Urbanus onu bizzat San Callisto Yeralt\u0131 Mezarlar\u0131\u2019na, papalar\u0131n yan\u0131 ba\u015F\u0131na defnetti.',
    },
    {
      text: 'Alt\u0131 y\u00FCzy\u0131l boyunca bedeni topra\u011F\u0131n alt\u0131nda kald\u0131. 821\u2019de Papa I. Paschalis, kal\u0131nt\u0131lar\u0131n\u0131 onun ad\u0131na in\u015Fa edilmi\u015F bir kiliseye ta\u015F\u0131d\u0131 \u2014 Tiber Nehri\u2019nin kar\u015F\u0131 k\u0131y\u0131s\u0131ndaki Trastevere semtinde, Santa Cecilia Kilisesi\u2019ne. Lahit suna\u011F\u0131n alt\u0131na m\u00FChrlendi ve orada kald\u0131, el de\u011Fmemi\u015F, yakla\u015F\u0131k sekiz y\u00FCz y\u0131l \u2014 ta ki Kardinal Sfondrato kiliseyi restore ettirmeye karar verip lahdi a\u00E7ana dek.',
    },
    {
      text: 'On \u00FC\u00E7 y\u00FCzy\u0131l sonra g\u00F6rd\u00FCkleri ola\u011Fan de\u011Fildi. Cecilia sa\u011F yan\u0131na yatm\u0131\u015Ft\u0131; dizleri biti\u015Fik, kollar\u0131 \u00F6ne do\u011Fru uzanm\u0131\u015F, y\u00FCz\u00FC yere d\u00F6n\u00FCk. Uyuyor gibiydi. Ve boynunda: \u00FC\u00E7 derin yara izi, sanki d\u00FCnden kalm\u0131\u015F \u2014 cellad\u0131n onu susturamayan \u00FC\u00E7 k\u0131l\u0131\u00E7 darbesinin izleri. Kardinal, lahit tekrar kapanmadan \u00F6nce bu manzaray\u0131 \u00F6l\u00FCms\u00FCzle\u015Ftirmesi i\u00E7in heykeltra\u015F Stefano Maderno\u2019yu \u00E7a\u011F\u0131rd\u0131.',
    },
    {
      text: 'Maderno ger\u00E7ek boyutlu bir mermer heykel yonttu: o huzurlu yat\u0131\u015F, \u00E7evrilmi\u015F y\u00FCz, boyundaki \u00FC\u00E7 yara. Eserini 1600\u2019de tamamlad\u0131 ve bug\u00FCn h\u00E2l\u00E2 ayn\u0131 suna\u011F\u0131n alt\u0131nda duruyor. Dramatik bir heykel de\u011Fil \u2014 g\u00F6\u011Fe uzanan eller yok, ac\u0131 dolu bir ifade yok. Sadece sessizce yatan bir beden. Ve tam da bu yal\u0131nl\u0131k, d\u00F6rt y\u00FCzy\u0131l\u0131 a\u015Fk\u0131n s\u00FCredir insanlar\u0131 \u00F6n\u00FCnde \u00E7ak\u0131l\u0131p kalmaya zorluyor.',
    },
    {
      text: '\u0130\u015Fin as\u0131l ilgin\u00E7 yan\u0131 \u015Fu: bedeni bulunmadan \u00E7ok \u00F6nce Cecilia zaten H\u0131ristiyanl\u0131\u011F\u0131n en sevilen azizelerinden biriydi \u2014 m\u00FCzi\u011Fin koruyucu azizesi. Valerianus\u2019la zorla evlendirildi\u011Fi g\u00FCn, etraf\u0131nda Roma \u00E7alg\u0131lar\u0131 \u00E7alarken o kalbinden sessizce Tanr\u0131\u2019ya \u015Fark\u0131 s\u00F6yledi. O g\u00F6r\u00FCnt\u00FC asla unutulmad\u0131. Bug\u00FCn d\u00FCnya genelinde konser salonlar\u0131 ve m\u00FCzik akademileri onun ad\u0131n\u0131 ta\u015F\u0131yor. Roma\u2019n\u0131n susturmaya \u00E7al\u0131\u015Ft\u0131\u011F\u0131 kad\u0131n, b\u00FCt\u00FCn d\u00FCnyan\u0131n ad\u0131na \u015Fark\u0131 s\u00F6yledi\u011Fi azize oldu.',
    },
  ],
};

// ─── Validation ──────────────────────────────────────────
function validate(story) {
  const label = story.lang.toUpperCase();
  let totalChars = 0;
  const pCount = story.paragraphs.length;

  if (pCount < 6 || pCount > 10) {
    throw new Error(`[${label}] Paragraph count ${pCount} out of range (6-10)`);
  }

  for (let i = 0; i < pCount; i++) {
    const text = story.paragraphs[i].text;
    const chars = text.length;
    const words = text.split(/\s+/).length;
    totalChars += chars;

    if (chars > 600) {
      throw new Error(`[${label}] P${i + 1}: ${chars} chars exceeds 600 (500 + 20%)`);
    }
    if (words > 120) {
      throw new Error(`[${label}] P${i + 1}: ${words} words exceeds 120 (100 + 20%)`);
    }
    console.log(`  P${i + 1}: ${chars} chars, ${words} words`);
  }

  console.log(`  Total: ${totalChars} chars (target: 2400-3600)`);
  if (totalChars < 2000 || totalChars > 4200) {
    throw new Error(`[${label}] Total ${totalChars} chars outside acceptable range`);
  }
  console.log(`  [${label}] Validation passed.\n`);
}

// ─── Push ────────────────────────────────────────────────
async function pushStory(story) {
  const item = { ...base, ...story };
  const label = story.lang.toUpperCase();

  console.log(`Pushing ${label} to DynamoDB...`);
  try {
    await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: item,
        ConditionExpression: 'attribute_not_exists(siteId) OR lang <> :en',
        ExpressionAttributeValues: { ':en': 'en' },
      })
    );
    console.log(`\u2713 ${label} pushed successfully (langStoryId: ${story.langStoryId})\n`);
  } catch (err) {
    if (err.name === 'ConditionalCheckFailedException') {
      console.log(`  ${label} record exists, safe to overwrite (not English)...`);
      await docClient.send(
        new PutCommand({ TableName: TABLE, Item: item })
      );
      console.log(`\u2713 ${label} overwritten successfully (langStoryId: ${story.langStoryId})\n`);
    } else {
      throw err;
    }
  }
}

async function main() {
  const stories = [ar, fa, tr];

  console.log('=== Validating all stories ===\n');
  for (const s of stories) {
    console.log(`--- ${s.lang.toUpperCase()} ---`);
    validate(s);
  }

  console.log('=== Pushing to DynamoDB ===\n');
  for (const s of stories) {
    await pushStory(s);
  }

  console.log('=== All 3 stories pushed successfully ===');
}

main().catch((err) => {
  console.error('FAILED:', err.message);
  process.exit(1);
});
