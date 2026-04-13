/**
 * Push Arabic and Persian versions of "The Solstice Alignment and Druid Mysteries"
 * Overwrites existing ar/fa records for stonehenge — solstice-druid-mysteries
 *
 * Arabic proverb (subverted): رُبَّ خطأٍ أجملُ أثرًا من ألف حقيقة
 *   — from the classic رُبَّ ضارَّةٍ نافِعة (perhaps a harm is a benefit)
 *   — Stukeley's wrong theory planted a living tradition
 *
 * Persian proverb (subverted): سنگ صبور آخرش می‌ترکد
 *   — sang-e saboor: the patient stone you tell sorrows to until it cracks
 *   — these stones have listened 5000 years and still stand
 */

import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { readFileSync } from "fs";

// ── Load env ────────────────────────────────────────────────────────────
const envFile = readFileSync("/Users/wallex/landstories-admin/.env.local", "utf-8");
for (const line of envFile.split("\n")) {
  const match = line.match(/^(\w+)\s*=\s*(.+)$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
}

const client = new DynamoDBClient({ region: process.env.AWS_REGION || "eu-north-1" });
const TABLE = "Story";
const now = String(Math.floor(Date.now() / 1000));

// ── Shared (unchanged) fields ───────────────────────────────────────────
const shared = {
  siteId: { S: "stonehenge" },
  storyId: { S: "solstice-druid-mysteries" },
  icon: { S: "☀️" },
  tier: { S: "A" },
  source: {
    S: `William Stukeley, "Stonehenge: A Temple Restor'd to the British Druids" (1740); Gerald Hawkins, "Stonehenge Decoded" (1965); Andy Worthington, "Stonehenge: Celebration and Subversion" (2004); Christopher Chippindale, "Stonehenge Complete" (4th ed., 2012)`,
  },
  characters: {
    L: [
      { S: "William Stukeley" },
      { S: "Gerald Hawkins" },
      { S: "The Ancient Order of Druids" },
      { S: "The New Age travelers of the 1980s" },
      { S: "Modern solstice celebrants" },
    ],
  },
  era: { S: "Neolithic origins (c. 3000 BC) to modern revival (18th century - present)" },
  readingTimeMinutes: { N: "3" },
  image: { S: "" },
  disabled: { BOOL: false },
  thumbnail: { S: "" },
  coordinates: { M: { lng: { N: "-1.8262" }, lat: { N: "51.1789" } } },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: "prophets_pilgrims" },
  updatedAt: { N: now },
};

// ═══════════════════════════════════════════════════════════════════════
//  ARABIC — «حجارة على موعدٍ مع الشمس»
//  Register: Modern engaging MSA — skilled storyteller, not stiff broadcast
//  Proverb: رُبَّ خطأٍ أجملُ أثرًا من ألف حقيقة (P7)
// ═══════════════════════════════════════════════════════════════════════

const arItem = {
  ...shared,
  langStoryId: { S: "ar#solstice-druid-mysteries" },
  lang: { S: "ar" },

  title: { S: "حجارة على موعدٍ مع الشمس" },
  subtitle: { S: "حيث يلتقي الفَلَك بالكهانة القديمة وحجّ العصر الحديث" },
  excerpt: {
    S: "ستونهنج لم يُبنَ في مكانه مصادفةً. محوره الرئيسي يتّجه بدقّة مُذهلة نحو شروق أطول يوم في السنة وغروب أقصرها. هذه الدقّة لا تحدث صُدفةً — صمّمها أحدٌ ما قبل خمسة آلاف سنة.",
  },
  moralOrLesson: {
    S: "حين تصطفّ الحجارة مع النجوم، يتجلّى أعمق ما في الإنسان — رغبته في إيجاد نظامٍ وسط الكون، وعدّ نبضات الزمن، والوقوف مع غيره على عتبة الضوء والظلمة في دهشةٍ مشتركة لا يملك لها تفسيرًا.",
  },

  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "ستونهنج لم يُبنَ في مكانه مصادفةً. محوره الرئيسي يتّجه بدقّة مُذهلة نحو نقطة شروق الشمس في أطول يوم من السنة — حوالي الحادي والعشرين من يونيو — ونحو غروبها في أقصر يوم. قِف في قلب الدائرة الحجرية ذلك الصباح: سترى الشمس تطلع من فوق صخرة هائلة تُسمّى «حَجَر الكَعْب»، وتُرسل أوّل أشعّتها الذهبية كسهمٍ يخترق قلبَ النُّصُب. هذه الدقّة ليست مصادفة. شخصٌ ما، قبل خمسة آلاف سنة، صمّم كلّ شيء هنا عن قصد.",
          },
        },
      },
      {
        M: {
          text: {
            S: "في عشرينيات القرن الثامن عشر، قلَبَ طبيبٌ ورجل دين إنجليزي يُدعى ويليام ستيوكلي نظرةَ العالم إلى ستونهنج رأسًا على عَقِب. كان أوّل من قاسَ الموقع بعناية ورسم خرائطه. وحين اكتشف المُحاذاة مع الانقلاب الشمسي، استحوذت عليه فكرة واحدة: لا بدّ أنّ الدرويد — الكَهَنة الذين وصفهم القائد الروماني يوليوس قيصر بالقادة الروحيين لبريطانيا القديمة — هم من شيّدوا هذا الصرح. بل بلغ به الأمر أن لقّب نفسه «أمير الدرويد».",
          },
        },
      },
      {
        M: {
          text: {
            S: "لكنّ ستيوكلي كان مخطئًا. الدرويد عاشوا بعد بناء ستونهنج بآلاف السنين. ومع ذلك، أبَتْ فكرته أن تموت. بحلول القرن التاسع عشر، كانت جماعات تُسمّي نفسها «الدرويد» تُقيم طقوسها عند الأحجار في أثوابٍ بيضاء عند الفجر. وبمنتصف القرن العشرين، تحوّل الانقلاب الصيفي إلى موسم حجّ حقيقي يجذب كلّ من يبحث عن رابطة مع الماضي — من الروحانيين والمتصوّفة إلى المسافرين الذين أرادوا ببساطة أن يلمسوا شيئًا أقدم منهم بكثير.",
          },
        },
      },
      {
        M: {
          text: {
            S: "ثمّ ساءت الأمور. في أوائل الثمانينيات، كان «مهرجان ستونهنج الحرّ» — كرنفال صاخب من الموسيقى والحياة البديلة — يستقطب عشرات الآلاف. حظرته السلطات خوفًا على الأحجار. في الأوّل من يونيو 1985، اعترضت الشرطة نحو ستمئة مسافر في طريقهم إلى الموقع. ما تلا ذلك كان عنيفًا: نوافذ مركبات مُحطَّمة، عائلات مسحوبة من حافلات، واعتقال 537 شخصًا — أكبر اعتقال جماعي في إنجلترا منذ الحرب العالمية الثانية. عُرف ذلك اليوم بـ«معركة حقل الفول».",
          },
        },
      },
      {
        M: {
          text: {
            S: "بعد سنوات من التفاوض، جاء الحلّ الوسط. منذ عام 2000، تُفتَح دائرة ستونهنج مجّانًا في كلّ انقلاب شمسي. كلّ منتصف صيف، يتجمّع بين عشرين ألفًا وسبعة وثلاثين ألفًا في الظلام — كهنة بأثوابٍ بيضاء، سيّاح بهواتفهم، عائلات بأطفالها — وينتظرون الفجر معًا. لحظة أن تعبُرَ الشمسُ حَجَر الكعب وتغمر الدائرة بالضوء، يعلو هتاف واحد من آلاف الحناجر. إنّه الشروق ذاته الذي شاهده الناس هنا قبل خمسة آلاف عام.",
          },
        },
      },
      {
        M: {
          text: {
            S: "هذه المُحاذاة جذبت العلماء أيضًا. عام 1965، نشر عالِم الفلك جيرالد هوكينز كتابه «فكّ شيفرة ستونهنج»، مُحاجِجًا بأنّ النُّصُب عمل كحاسوبٍ بدائي للتنبّؤ بكسوف الشمس وخسوف القمر. بعض أفكاره لم تصمد، لكنّ الجوهر بقي ثابتًا: ستونهنج يتتبّع حركة الشمس والقمر بدقّة مُحيِّرة. حتّى التضاريس كانت شريكة — حافّة طبيعية في طبقة الطباشير أسفل الموقع تُشير مباشرةً نحو شروق الانقلاب، وكأنّ الأرض نفسها وضعت العلامة الأولى قبل أن يأتي أحد.",
          },
        },
      },
      {
        M: {
          text: {
            S: "الدرويد لم يبنوا ستونهنج — هذا أمرٌ محسوم. لكنّ ستيوكلي أصابَ في شيء واحد: هذا مكان لم يكُفّ فيه البشر يومًا عن التطلّع إلى السماء. ورُبَّ خطأٍ أجملُ أثرًا من ألف حقيقة — فنظريّته الخاطئة زرعت تقليدًا حيًّا ما زال ينبض حتّى اللحظة. بعد خمسة آلاف سنة، نقف في الدائرة ذاتها، نرقب الشمس ذاتها، ونُحسّ بالقوّة ذاتها التي دفعت أحدهم لجرّ صخور من مئتين وأربعين كيلومترًا وصفّها في خطّ واحد مع النجوم.",
          },
        },
      },
    ],
  },
};

// ═══════════════════════════════════════════════════════════════════════
//  PERSIAN — «پنج هزار سال، همان طلوع»
//  Register: Natural modern Persian prose — engaging storyteller
//  Proverb: سنگ صبور آخرش می‌ترکد (sang-e saboor — the patient stone) (P7)
// ═══════════════════════════════════════════════════════════════════════

const faItem = {
  ...shared,
  langStoryId: { S: "fa#solstice-druid-mysteries" },
  lang: { S: "fa" },

  title: { S: "پنج هزار سال، همان طلوع" },
  subtitle: { S: "جایی که ستاره\u200Cشناسی، کاهنان باستان و زیارتِ امروز به هم گره می\u200Cخورند" },
  excerpt: {
    S: "استون\u200Cهنج بی\u200Cحساب\u200Cوکتاب بنا نشده. محورش دقیقاً با طلوع خورشید در بلندترین روز سال و غروبش در کوتاه\u200Cترین روز هم\u200Cراستاست. این دقت اتفاقی نیست — کسی پنج هزار سال پیش همه\u200Cی این\u200Cها را عمداً طراحی کرده.",
  },
  moralOrLesson: {
    S: "وقتی سنگ و ستاره در یک خط بایستند، ژرف\u200Cترین آرزوی آدمیزاد آشکار می\u200Cشود — یافتنِ نظم در هستی، شمردنِ ضربان زمان، و ایستادن در کنار هم بر آستانه\u200Cی نور و تاریکی با حیرتی مشترک که هیچ\u200Cکس زبان توضیحش را ندارد.",
  },

  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: "استون\u200Cهنج را بی\u200Cحساب\u200Cوکتاب نچیده\u200Cاند. محور اصلی\u200Cاش دقیقاً به نقطه\u200Cی طلوع خورشید در بلندترین روز سال — حوالی بیست\u200Cویکم ژوئن — و غروبش در کوتاه\u200Cترین روز اشاره می\u200Cکند. اگر آن صبح وسط دایره\u200Cی سنگی بایستید، می\u200Cبینید خورشید درست از بالای تخته\u200Cسنگی غول\u200Cپیکر به نام «سنگِ پاشنه» بالا می\u200Cآید و نخستین پرتوهای طلایی\u200Cاش را مثل تیری از قلب بنا عبور می\u200Cدهد. این دقت شانسی نیست. کسی، پنج هزار سال پیش، تمام این نقشه را عمداً کشیده بود.",
          },
        },
      },
      {
        M: {
          text: {
            S: "در دهه\u200Cی ۱۷۲۰ میلادی، پزشک و کشیشی انگلیسی به نام ویلیام استیوکلی نگاه دنیا به استون\u200Cهنج را زیرورو کرد. او نخستین کسی بود که این بنا را با دقت اندازه\u200Cگیری و نقشه\u200Cبرداری کرد. وقتی هم\u200Cراستایی با انقلاب تابستانی را کشف کرد، وسواسِ یک فکر افتاد به جانش: حتماً دروئیدها — کاهنانِ پرقدرتی که ژولیوس سزار آن\u200Cها را رهبران روحانی بریتانیای باستان وصف کرده بود — سازندگان این بنا هستند. حتی لقب «شاهزاده\u200Cی دروئیدها» را برای خودش برداشت.",
          },
        },
      },
      {
        M: {
          text: {
            S: "اما یک مشکل بزرگ وجود داشت: استیوکلی اشتباه می\u200Cکرد. دروئیدها هزاران سال بعد از ساختِ استون\u200Cهنج زندگی می\u200Cکردند. ولی ایده\u200Cاش جان گرفت و دیگر مُردنی نبود. تا قرن نوزدهم، گروه\u200Cهایی که خود را دروئید می\u200Cنامیدند با جامه\u200Cهای سفید سپیده\u200Cدم کنار سنگ\u200Cها آیین برگزار می\u200Cکردند. تا اواسط قرن بیستم، انقلاب تابستانی به زیارتی تمام\u200Cعیار تبدیل شده بود — مقصد عارفان، معنویت\u200Cجویان و مسافرانی که فقط می\u200Cخواستند دستشان به چیزی کهن و واقعی برسد.",
          },
        },
      },
      {
        M: {
          text: {
            S: "بعد ماجرا تلخ شد. اوایل دهه\u200Cی هشتاد، «جشنواره\u200Cی آزاد استون\u200Cهنج» — آمیزه\u200Cای پرهیاهو از موسیقی و زندگی آلترناتیو — ده\u200Cها هزار نفر جذب می\u200Cکرد. مقامات از ترس آسیب به سنگ\u200Cها آن را ممنوع کردند. اول ژوئن ۱۹۸۵، پلیس حدود ششصد مسافرِ عازمِ استون\u200Cهنج را متوقف کرد. آنچه بعد آمد وحشیانه بود: شکستن شیشه\u200Cی ماشین\u200Cها، بیرون کشیدن خانواده\u200Cها از اتوبوس، و بازداشت ۵۳۷ نفر — بزرگ\u200Cترین بازداشت جمعی در انگلستان از زمان جنگ جهانی دوم. اسمش شد «نبرد دشت لوبیا».",
          },
        },
      },
      {
        M: {
          text: {
            S: "بعد از سال\u200Cها گفت\u200Cوگو و کش\u200Cمکش، بالاخره به توافق رسیدند. از سال ۲۰۰۰، دایره\u200Cی سنگی استون\u200Cهنج هر انقلاب خورشیدی رایگان باز می\u200Cشود. هر نیمه\u200Cی تابستان، بین بیست تا سی\u200Cوهفت هزار نفر در تاریکی جمع می\u200Cشوند — دروئیدها با جامه\u200Cهای سفید، گردشگران با گوشی\u200Cهایشان، خانواده\u200Cها با بچه\u200Cهای کوچکشان — و با هم منتظر سپیده\u200Cدم می\u200Cمانند. همین که خورشید از بالای سنگِ پاشنه سر بر می\u200Cآورد و دایره را غرق نور می\u200Cکند، فریاد شادی از جمعیت بلند می\u200Cشود. همان طلوعی\u200Cست که پنج هزار سال پیش هم اینجا تماشایش می\u200Cکردند.",
          },
        },
      },
      {
        M: {
          text: {
            S: "این هم\u200Cراستایی دانشمندانِ جدی را هم به خود کشید. سال ۱۹۶۵، ستاره\u200Cشناسی به نام جرالد هاوکینز کتاب «رمزگشایی استون\u200Cهنج» را منتشر کرد و استدلال کرد این بنا مثل رایانه\u200Cای باستانی برای پیش\u200Cبینی کسوف و خسوف کار می\u200Cکرده. بعضی ادعاهایش دوام نیاورد، ولی ایده\u200Cی اصلی ماندگار شد: استون\u200Cهنج مسیر خورشید و ماه را با دقتی خیره\u200Cکننده ردیابی می\u200Cکند. حتی زمین هم دست\u200Cبه\u200Cیکی کرده بود — برآمدگی طبیعی در لایه\u200Cی گچی زیر بنا درست به سمت طلوع انقلاب اشاره دارد، انگار زمین پیش از آدمیزاد نشانه گذاشته بود.",
          },
        },
      },
      {
        M: {
          text: {
            S: "دروئیدها استون\u200Cهنج را نساختند — این دیگر بحثی ندارد. اما استیوکلی در یک چیز حق داشت: اینجا جایی\u200Cست که آدم\u200Cها از همان ابتدا چشم به آسمان دوخته\u200Cاند. می\u200Cگویند سنگ صبور آخرش می\u200Cترکد — ولی این سنگ\u200Cها پنج هزار سال است که گوش می\u200Cدهند و هنوز سرِ جایشان ایستاده\u200Cاند. ما هنوز همانجا می\u200Cایستیم، همان خورشید را تماشا می\u200Cکنیم، و همان کششی را حس می\u200Cکنیم که کسی را واداشت سنگ\u200Cهایی را از دویست\u200Cوچهل کیلومتری بکشد و در یک خط با ستاره\u200Cها بچیند.",
          },
        },
      },
    ],
  },
};

// ═══════════════════════════════════════════════════════════════════════
//  VALIDATION & PUSH
// ═══════════════════════════════════════════════════════════════════════

function validate(label, item) {
  const paragraphs = item.paragraphs.L;
  let totalChars = 0;
  let allValid = true;

  console.log(`\n${"═".repeat(60)}`);
  console.log(`  ${label}`);
  console.log(`${"═".repeat(60)}`);
  console.log(`  Title: ${item.title.S}`);
  console.log(`  Subtitle: ${item.subtitle.S}`);
  console.log(`  Paragraphs: ${paragraphs.length}`);
  console.log();

  for (let i = 0; i < paragraphs.length; i++) {
    const t = paragraphs[i].M.text.S;
    const chars = t.length;
    // For Arabic/Persian, split on whitespace
    const words = t.split(/\s+/).filter(Boolean).length;
    totalChars += chars;

    const charOk = chars <= 500;
    const wordOk = words <= 100;
    console.log(
      `  P${i + 1}: ${chars} chars, ${words} words ${charOk && wordOk ? "✓" : "✗"}`
    );
    if (!charOk) {
      console.warn(`    ⚠️  Exceeds 500 char limit!`);
      allValid = false;
    }
    if (!wordOk) {
      console.warn(`    ⚠️  Exceeds 100 word limit!`);
      allValid = false;
    }
  }

  const excerptChars = item.excerpt.S.length;
  const moralChars = item.moralOrLesson.S.length;
  console.log(`\n  Excerpt: ${excerptChars} chars`);
  console.log(`  Moral: ${moralChars} chars`);
  console.log(`  Total paragraphs: ${totalChars} chars (target ~3000 ±20%: 2400-3600)`);

  if (totalChars < 2400 || totalChars > 3600) {
    console.warn(`  ⚠️  Total chars outside ±20% range [2400-3600]`);
    allValid = false;
  }

  return allValid;
}

async function push(label, item) {
  try {
    const cmd = new PutItemCommand({ TableName: TABLE, Item: item });
    const result = await client.send(cmd);
    console.log(
      `\n  ✓ ${label} pushed successfully (HTTP ${result.$metadata.httpStatusCode})`
    );
    console.log(`    siteId: ${item.siteId.S}`);
    console.log(`    langStoryId: ${item.langStoryId.S}`);
    return true;
  } catch (err) {
    console.error(`\n  ✗ ${label} FAILED: ${err.message}`);
    return false;
  }
}

async function main() {
  // Validate both
  const arOk = validate("ARABIC (ar)", arItem);
  const faOk = validate("PERSIAN (fa)", faItem);

  if (!arOk || !faOk) {
    console.error("\n✗ Validation failed. Fix issues before pushing.");
    process.exit(1);
  }

  console.log("\n" + "─".repeat(60));
  console.log("  All validations passed. Pushing to DynamoDB...");
  console.log("─".repeat(60));

  // Push Arabic
  const arSuccess = await push("Arabic", arItem);
  if (!arSuccess) process.exit(1);

  // Push Persian
  const faSuccess = await push("Persian", faItem);
  if (!faSuccess) process.exit(1);

  console.log("\n" + "═".repeat(60));
  console.log("  ✓ Both languages pushed successfully");
  console.log("═".repeat(60));
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
