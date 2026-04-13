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
  siteId: "alhambra",
  storyId: "massacre-of-the-abencerrajes",
  icon: "\u2694\uFE0F",
  tier: "S",
  source:
    "Perez de Hita, Gines. Guerras civiles de Granada (Historia de los bandos de los Zegries y Abencerrajes), 1595-1619; Irving, Washington. Tales of the Alhambra, 1832; Anonymous. El Abencerraje y la hermosa Jarifa, c. 1561-1565 (ed. Antonio de Villegas, Inventario, 1565); Hernando de Baeza. Historia de los Reyes Moros de Granada, early 16th c.; Chateaubriand, Francois-Rene de. Les Aventures du dernier Abencerage, 1826; Ibn Zamrak, epigraphic poems of the Alhambra; Fortuny, Mariano. La matanza de los Abencerrajes, c. 1870 (Museu Nacional d\u2019Art de Catalunya)",
  era: "c. 1462-1482 (historical conflicts); legend set during the final decades of the Nasrid dynasty",
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  coordinates: { lat: 37.1761, lng: -3.5881 },
  hasAudio: false,
  isFree: true,
  disabled: false,
  storyCategory: "crowns_conquests",
  characters: [
    "The Abencerrajes (Banu Sarraj) -- the doomed noble family",
    "The Sultan (Abu'l-Hasan Ali or an earlier Nasrid ruler)",
    "The Zenetes/Zegries -- the rival family who orchestrated the conspiracy",
    "The unnamed Abencerraje knight -- accused of an affair with the sultana",
    "Gines Perez de Hita -- the chronicler who immortalized the legend",
  ],
  updatedAt: NOW,
};

// ═══════════════════════════════════════════════════════════════
// ARABIC — وليمة الدم
// Proverb: أُكِلتُ يومَ أُكِلَ الثَّورُ الأبيَض
// (I was devoured the day the white bull was devoured)
// ═══════════════════════════════════════════════════════════════
const arabic = {
  ...shared,
  lang: "ar",
  langStoryId: "ar#massacre-of-the-abencerrajes",
  title: "وليمة الدم",
  subtitle:
    "ستّةٌ وثلاثون فارسًا دُعوا إلى مأدُبة تحت أجمل سقفٍ في العالم \u2014 حيث لا تزال نافورة الرخام تحمل دماءهم",
  excerpt:
    "تحتَ أعظم سقفٍ نَحَتَته يدُ إنسان، دُعيَ ستّةٌ وثلاثون فارسًا إلى وليمة. دخلوا واحدًا تلو الآخر. لم يخرج أحدٌ منهم حيًّا.",
  moralOrLesson:
    "أجملُ الجمال وأبشعُ الوحشيّة قد يسكنان الغرفة ذاتها. الدمُ يُمحى من الرُّخام، لكنّه لا يُمحى من الذاكرة \u2014 والحضارات التي تُبيد أنبلَ عائلاتها من الداخل تكون قد كتبت تاريخ فنائها بيدها.",
  paragraphs: [
    {
      text: "بَنو سَرّاج كانوا أقوى عائلة في آخر مملكة إسلاميّة بقيت على أرض أوروبا. في غرناطة، في القرن الخامس عشر \u2014 بينما كانت بقيّة إسبانيا قد سقطت واحدةً تلو الأخرى في أيدي الجيوش المسيحيّة \u2014 هذه العائلة ذات الأصول المغاربيّة كانت تُحرِّك كلّ شيء من وراء الستار. هم من يختارون السلطان، وهم من يُسقِطونه. صُنّاع ملوك بالمعنى الحرفيّ. لا أحد يجلس على عرش غرناطة دون مبارَكتهم. وكان هناك من يريد رؤوسَهم.",
    },
    {
      text: "خصومهم \u2014 عشيرة تُسمّى الزِّغْريّين \u2014 صنعوا كذبةً من كلمتين، لكنّها كانت كافية لإشعال حريق. همسوا للسلطان أنّ واحدًا من فرسان بَني سَرّاج يُقيم علاقة سرّيّة مع زوجته \u2014 السلطانة نفسها. لا أحد يعرف إن كان الأمر صحيحًا أو مُختلَقًا. لكن في بلاطٍ يقوم على الشرف، التُّهمة وحدها حُكمُ إعدام. السلطان \u2014 الذي التهمَته الغَيرة وأعماه الرُّعب \u2014 اتّخذ قرارًا واحدًا: يمحو العائلة بأكملها. في ليلة واحدة.",
    },
    {
      text: "أرسل الدعوة: وليمة مَلَكيّة داخل قصر الحمراء. ستّة وثلاثون فارسًا من خيرة بَني سَرّاج لبسوا أفخر ثيابهم وجاؤوا، لأنّ دعوة السلطان في غرناطة كانت أعلى تكريمٍ يمكن أن تحلم به عائلة نبيلة. عبروا صَحن الأُسود \u2014 اثنا عشر أسدًا من الحجر يحملون نافورةً رخاميّة على ظهورهم \u2014 ومرّوا فوق قنوات ماء صُمِّمت لتكون صورة عن أنهار الجنّة الأربعة. لم يعرفوا أنّهم يمشون نحو قبورهم.",
    },
    {
      text: "واحدًا تلو الآخر، قِيدَ كلّ فارس إلى قاعة وقُطِعَ رأسُه فوق حوض نافورة رخاميّ في منتصف الأرضيّة. الماء كان يحمل الدم بعيدًا \u2014 فالضيف التالي لا يرى شيئًا، ولا يشكّ في شيء، حتّى تجد الشفرةُ رقبتَه. أنبَلُ عائلة في غرناطة دخلت أجمل غرفة في القصر... ولم يخرج منها أحد. تلك الغرفة لا تزال تحمل اسمَهم حتّى اليوم: قاعة بني سرّاج.",
    },
    {
      text: "فوق المكان الذي ماتوا فيه، ترتفع واحدة من أعظم تُحَف الفنّ الإسلاميّ على الإطلاق: خمسة آلاف خليّة مُقَرْنَصة تتصاعد على شكل نجمة ثُمانيّة، والضوءُ المتسلِّل من ستّ عشرة نافذة يجعل السقف يبدو وكأنّه يتنفّس. بُنيَ ليبدو مثلَ الجنّة بعينها. وتحته مباشرة، في حوض النافورة الرخاميّ، بقعة حمراء رفضت أن تختفي منذ خمسمئة عام. العلم يقول إنّه أكسيد حديد. لكنّ كلّ من دخل ذلك المكان سمع الحكاية ذاتها \u2014 هذا دمُ الستّة والثلاثين، نَفَذَ في عروق الرُّخام حتّى لم يعُد ماءٌ في الدنيا قادرًا على مَحوه.",
    },
    {
      text: "السلطان دمّر بيده العائلةَ الوحيدة التي كانت تُمسك مملكتَه من السقوط. بدونهم، مزّقت الحروبُ الأهليّة غرناطةَ \u2014 وهذا بالضبط ما كانت جيوش فرديناند وإيزابيلّا تنتظره لتقضي على آخر حِصن للمسلمين في إسبانيا. المثل العربيّ يقول: \u00ABأُكِلتُ يومَ أُكِلَ الثَّورُ الأبيَض.\u00BB وغرناطة أُكِلَت \u2014 بالحرف \u2014 يوم ذُبِحَ بَنو سَرّاج في نافورة قصرهم. في جيل واحد، لم يبقَ من المملكة شيء.",
    },
    {
      text: "اليوم، الملايين يدخلون تلك القاعة كلّ عام. يرفعون رؤوسهم فيرون أدقّ ما نحتته يدٌ بشريّة في التاريخ. يَخفِضون رؤوسهم فيرون البقعة في النافورة. ويُحسّون بالشيء الذي يجعل الحمراء مختلفةً عن كلّ قصر على وجه الأرض: الجمال في الأعلى. الدم في الأسفل. أرقى ما أنتجته حضارة، يحوم مباشرةً فوق البقعة التي دمّرت فيها تلك الحضارةُ نفسَها.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// PERSIAN — شبی که الحمرا سرخ شد
// Proverb: چاه‌کَن همیشه ته چاهه
// (The well-digger always ends up at the bottom of the well)
// ═══════════════════════════════════════════════════════════════
const persian = {
  ...shared,
  lang: "fa",
  langStoryId: "fa#massacre-of-the-abencerrajes",
  title: "شبی که الحمرا سرخ شد",
  subtitle:
    "سی\u200Cوشش شوالیه به ضیافتی زیرِ زیباترین سقفِ جهان دعوت شدند \u2014 جایی که لکه\u200Cی خون هنوز از سنگِ مرمر پاک نشده",
  excerpt:
    "زیرِ شاهکاری که دستِ بشر تراشیده بود، سی\u200Cوشش شوالیه به ضیافت دعوت شدند. یکی\u200Cیکی وارد شدند. هیچ\u200Cکدام زنده بیرون نیامد.",
  moralOrLesson:
    "زیباترین زیبایی و وحشیانه\u200Cترین خشونت می\u200Cتوانند در یک اتاق زندگی کنند. خون از سنگِ مرمر پاک می\u200Cشود، اما از حافظه هرگز \u2014 و تمدنی که شریف\u200Cترین فرزندانش را از درون نابود کند، گواهیِ مرگِ خودش را خودش امضا کرده.",
  paragraphs: [
    {
      text: "بنی\u200Cسَرّاج قدرتمندترین خاندانِ آخرین پادشاهیِ مسلمان در اروپا بودند. در غرناطه\u200Cی قرنِ پانزدهم \u2014 وقتی بقیه\u200Cی اسپانیا یکی پس از دیگری به دست ارتش\u200Cهای مسیحی افتاده بود \u2014 این خاندانِ اشراف\u200Cزاده\u200Cی مغربی پشتِ هر تخت و تاجی دست داشتند. سلطان را آن\u200Cها انتخاب می\u200Cکردند و سلطان را آن\u200Cها کنار می\u200Cزدند. شاه\u200Cساز بودند به تمامِ معنا. هیچ\u200Cکس در غرناطه بدون رضایتِ آن\u200Cها به قدرت نمی\u200Cرسید. و کسی بود که خونشان را می\u200Cخواست.",
    },
    {
      text: "رقیب\u200Cهایشان \u2014 طایفه\u200Cای به نام زِغری\u200Cها \u2014 دروغی ساختند به سادگیِ یک جمله ولی به کُشندگیِ زهر. به سلطان گفتند یکی از شوالیه\u200Cهای بنی\u200Cسرّاج با ملکه \u2014 زنِ خودِ سلطان \u2014 رابطه\u200Cی پنهانی دارد. مهم نبود راست باشد یا دروغ. در دربارِی که بر شرف بنا شده، تهمت به تنهایی حکمِ مرگ بود. سلطان \u2014 که حسادت و وحشت از ته وجودش می\u200Cجوشید \u2014 تصمیمش را گرفت: تمامِ خاندان را نابود کند. در یک شب.",
    },
    {
      text: "دعوت\u200Cنامه فرستاد: ضیافتی شاهانه در کاخِ الحمرا. سی\u200Cوشش شوالیه از بهترین\u200Cهای بنی\u200Cسرّاج بهترین لباس\u200Cهایشان را پوشیدند و آمدند \u2014 چون در غرناطه، دعوتِ سلطان بالاترین افتخاری بود که یک خاندانِ اشرافی می\u200Cتوانست تجربه کند. از حیاطِ شیرها گذشتند \u2014 دوازده شیرِ سنگی که فوّاره\u200Cای مرمری را بر پشت نگه داشته\u200Cاند \u2014 و روی آب\u200Cراهه\u200Cهایی قدم زدند که به تقلید از چهار رودِ بهشت ساخته شده بودند. نمی\u200Cدانستند دارند به سمتِ مرگِ خودشان قدم می\u200Cزنند.",
    },
    {
      text: "یکی\u200Cیکی، هر شوالیه را به تالاری بردند و سرش را بالای حوضِ فوّاره\u200Cای مرمری وسطِ کف زمین بریدند. آب، خون را با خودش می\u200Cبُرد \u2014 طوری که مهمانِ بعدی چیزی نمی\u200Cدید، به چیزی شک نمی\u200Cکرد، تا لحظه\u200Cای که تیغه گردنش را پیدا کند. اصیل\u200Cترین خاندانِ غرناطه وارد زیباترین اتاقِ کاخ شدند... و هیچ\u200Cوقت بیرون نیامدند. آن اتاق هنوز نامِ آن\u200Cها را دارد: تالارِ بنی\u200Cسرّاج.",
    },
    {
      text: "بالای جایی که جان دادند، یکی از شگفت\u200Cانگیزترین شاهکارهای هنرِ اسلامی آویزان است: پنج\u200Cهزار حفره\u200Cی لانه\u200Cزنبوری که به شکلِ ستاره\u200Cی هشت\u200Cپَر بالا می\u200Cروند، و نور شانزده پنجره سقف را زنده نشان می\u200Cدهد. ساخته شده بود تا شبیهِ بهشت باشد. و درست زیرش، در حوضِ مرمری، لکه\u200Cای سُرخ هست که پانصد سال است پاک نشده. علم می\u200Cگوید اکسید آهن. ولی هرکسی که پا به آن تالار گذاشته، همان داستان را شنیده \u2014 این خونِ سی\u200Cوشش شوالیه است که آن\u200Cقدر در رگ\u200Cهای سنگ نفوذ کرده که هیچ آبی در دنیا پاکش نمی\u200Cکند.",
    },
    {
      text: "سلطان تنها خاندانی را نابود کرد که مملکتش را سرپا نگه می\u200Cداشت. بدونِ بنی\u200Cسرّاج، جنگ\u200Cهای داخلی غرناطه را از هم درید \u2014 و این دقیقاً همان ضعفی بود که ارتش\u200Cهای فردیناند و ایزابلا منتظرش بودند تا آخرین سنگرِ مسلمانان در اسپانیا را از بین ببرند. از قدیم گفته\u200Cاند \u00ABچاه\u200Cکَن همیشه ته چاهه.\u00BB سلطان آن شب در آن فوّاره\u200Cی مرمری چاهی کَند \u2014 و ته آن چاه، تمامِ مملکتش دفن شد. یک نسل بعد، از غرناطه چیزی نمانده بود.",
    },
    {
      text: "امروز، هر سال میلیون\u200Cها نفر وارد آن تالار می\u200Cشوند. سرشان را بالا می\u200Cگیرند و ظریف\u200Cترین چیزی را می\u200Cبینند که دستِ انسان تاکنون تراشیده. سرشان را پایین می\u200Cآورند و لکه را در فوّاره می\u200Cبینند. و چیزی حس می\u200Cکنند که الحمرا را از هر کاخِ دیگری روی زمین جدا می\u200Cکند: زیبایی بالا. خون پایین. اوجِ تمدن، آویزان درست بالای جایی که آن تمدن خودش را نابود کرد.",
    },
  ],
};

// ─── Validation ───
function validate(item, label) {
  let totalChars = 0;
  let ok = true;
  console.log(`\n=== ${label} ===`);
  for (let i = 0; i < item.paragraphs.length; i++) {
    const p = item.paragraphs[i];
    const chars = p.text.length;
    const words = p.text.split(/\s+/).length;
    totalChars += chars;
    console.log(`  P${i + 1}: ${chars} chars, ${words} words`);
    if (chars > 500) {
      console.warn(`  \u26A0\uFE0F  P${i + 1} exceeds 500 char limit!`);
      ok = false;
    }
    if (words > 100) {
      console.warn(`  \u26A0\uFE0F  P${i + 1} exceeds 100 word limit!`);
      ok = false;
    }
  }
  console.log(`  Total: ${totalChars} chars, ${item.paragraphs.length} paragraphs`);
  console.log(`  Target: ~3000 chars (\u00B120% = 2400-3600)`);
  if (totalChars < 2000 || totalChars > 4200) {
    console.error(`  \u274C Total character count way out of range!`);
    ok = false;
  }
  return ok;
}

// ─── Push ───
async function pushStory(item, label) {
  try {
    await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: item,
        ConditionExpression:
          "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
      })
    );
    console.log(`\u2713 ${label} pushed successfully (${item.langStoryId})`);
    return true;
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(`  ${label} already exists, overwriting...`);
      await docClient.send(new PutCommand({ TableName: TABLE, Item: item }));
      console.log(`\u2713 ${label} overwritten successfully (${item.langStoryId})`);
      return true;
    }
    console.error(`\u2717 ${label} FAILED:`, err.message);
    return false;
  }
}

async function main() {
  const arOk = validate(arabic, "Arabic (\u0639\u0631\u0628\u064A)");
  const faOk = validate(persian, "Persian (\u0641\u0627\u0631\u0633\u06CC)");

  if (!arOk || !faOk) {
    console.error("\n\u274C Validation failed. Aborting.");
    process.exit(1);
  }

  console.log(
    `\n\u2500\u2500\u2500 Pushing 2 stories to table "${TABLE}" at ${new Date().toISOString()} \u2500\u2500\u2500\n`
  );

  const arPush = await pushStory(arabic, "Arabic (ar)");
  const faPush = await pushStory(persian, "Persian (fa)");

  console.log("\n\u2500\u2500\u2500 Summary \u2500\u2500\u2500");
  console.log(`Arabic:  ${arPush ? "\u2713" : "\u2717"}`);
  console.log(`Persian: ${faPush ? "\u2713" : "\u2717"}`);

  if (!arPush || !faPush) process.exit(1);
}

main();
