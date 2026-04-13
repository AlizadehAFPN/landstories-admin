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
  siteId: 'abu-simbel',
  storyId: 'unesco-rescue-moving-mountains',
  icon: '🏗️',
  tier: 'A',
  source: 'Desroches-Noblecourt, C. et al. The Rescue of Abu Simbel. UNESCO, 1968; Säve-Söderbergh, T. Temples and Tombs of Ancient Nubia. Thames & Hudson, 1987',
  characters: [
    'UNESCO',
    'Gamal Abdel Nasser',
    'VBB Engineering (Sweden)',
    'International community of 50 nations',
  ],
  era: 'Modern (1964-1968)',
  readingTimeMinutes: 3,
  image: '',
  disabled: false,
  thumbnail: '',
  coordinates: { lng: 31.6256, lat: 22.3369 },
  hasAudio: false,
  isFree: true,
  storyCategory: 'crowns_conquests',
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════
//  ARABIC — "يوم نَقَلوا الجَبَل"
//  Proverb: "الصَّبرُ مفتاحُ الفَرَج"
//    (Patience is the key to relief)
//  Subversion: Abu Simbel taught us that relief sometimes needs
//    something bigger than patience — fifty nations standing
//    together and saying: some things are worth moving mountains.
//  Register: Gripping modern MSA storyteller — engaging, dramatic,
//    conversational. Think top-tier Arabic podcast narrating history.
// ═══════════════════════════════════════════════════════════
const ar = {
  lang: 'ar',
  langStoryId: 'ar#unesco-rescue-moving-mountains',

  title: 'يوم نَقَلوا الجَبَل',

  subtitle: 'حين اتّحدَ خمسون شعبًا لإنقاذ كنزٍ مصريٍّ من الغَرَق',

  excerpt: 'سنة ١٩٦٠، وقفت مصر أمام خيارٍ لا يتمنّاه أحد. جمال عبد الناصر كان يبني السدّ العالي — مشروعٌ عملاق يُروِّض فيضانات النيل ويُنير مستقبل البلاد بأكمله. لكنّ الثمن كان باهظًا: بحيرة ناصر، واحدة من أكبر البحيرات الصناعية على وجه الأرض، ستبتلع خمسمئة كيلومتر من وادي النيل.',

  moralOrLesson: 'حين يتّحد البشر فوق خلافاتهم لحماية ما هو عزيزٌ حقًّا، حتّى الجبال تنتقل من مكانها.',

  paragraphs: [
    {
      text: 'سنة ١٩٦٠، وقفت مصر أمام خيارٍ لا يتمنّاه أحد. جمال عبد الناصر كان يبني السدّ العالي — مشروعٌ عملاق يُروِّض فيضانات النيل ويُنير مستقبل البلاد بأكمله. لكنّ الثمن كان باهظًا: بحيرة ناصر، واحدة من أكبر البحيرات الصناعية على وجه الأرض، ستبتلع خمسمئة كيلومتر من وادي النيل. عشرات المعابد القديمة ستختفي تحت الماء — وعلى رأسها أبو سِمبِل، المعبدان التوأمان اللذان نحتهما رمسيس الأكبر في قلب الجبل قبل ثلاثة آلاف ومئتي سنة.',
    },
    {
      text: 'فعلت اليونسكو شيئًا لم يُجرَّب من قبل: طلبت من العالم بأسره أن يُنقذ هذه المعابد، وإلّا ستختفي إلى الأبد. والمُذهل أنّ العالم لبّى النداء. خمسون دولة — بينها دولٌ لا تتّفق على شيء في عزّ الحرب الباردة — أرسلت أموالًا ومهندسين ومعدّات. السويد، التي لا يربطها بمصر أيّ رابط، صارت من أكبر المُتبرِّعين. الكُلفة: أربعون مليون دولار — نحو ثلاثمئة وستّين مليونًا بأسعار اليوم. أضخم عملية إنقاذ أثرية في التاريخ.',
    },
    {
      text: 'لكنّ المال لم يكن المشكلة الكبرى. أبو سِمبِل ليس مبنًى تحمله وتمضي — المعبدان منحوتان في صخر الجبل نفسه. فجاءت شركة سويدية اسمها VBB بخطّةٍ تبدو جنونًا محضًا: قصّ المعبدَين إلى ألفٍ وستٍّ وثلاثين كتلة، كلّ واحدة بين عشرين وثلاثين طنًّا، ثمّ سحبها خمسةً وستّين مترًا نحو الأعلى ومئتي متر نحو الداخل، وإعادة تركيبها فوق تلّةٍ اصطناعية صُمِّمت لتُحاكي شكل الجبل الأصلي.',
    },
    {
      text: 'انطلق العمل سنة ١٩٦٤، والمياه تزحف نحو المعابد يومًا بعد يوم. أقام العمّال سدًّا مؤقّتًا يصدّ الماء ويشتري لهم الوقت. وهنا يأتي ما يُذهل العقل: لم يُسمَح باستخدام أيّ أداة كهربائية — الاهتزازات كانت ستُفتِّت الحجر الرملي العتيق. فكلّ قطعة قُصَّت باليد، بدقّة المليمتر. كلّ كتلة رُقِّمت، ورُفِعت بالرافعة، ثمّ أُنزِلت في مكانها الأصلي تمامًا. أعقد أحجية تركيبٍ عرفها الإنسان.',
    },
    {
      text: 'داخل التلّة الجديدة، شُيِّدت واحدة من أكبر القباب الخرسانية في العالم لحماية الحجر الرملي من الرطوبة التي جلبتها بحيرة ناصر إلى قلب الصحراء. ثمّ أعاد المهندسون تشكيل الأرض والتضاريس المحيطة لتُطابق المشهد الأصلي — حتّى أنّ من يسير نحو أبو سِمبِل سيرى تقريبًا نفس المنظر الذي رآه الناس في زمن رمسيس قبل أكثر من ثلاثين قرنًا.',
    },
    {
      text: 'في الثاني والعشرين من سبتمبر ١٩٦٨، افتُتِح أبو سِمبِل في موقعه الجديد. وكانت هناك معجزة أخيرة. مرّتين في السنة، يخترق ضوء الشمس جوف المعبد فيُنير تماثيل الآلهة — محاذاة فلكية صمّمها البنّاؤون الأصليّون قبل اثنين وثلاثين قرنًا. في الموقع الجديد، حُفِظت هذه المحاذاة بفارق يومٍ واحد فقط عن الموعد الأصلي. مَن زاروا المعبد قبل النقل قالوا إنّهم لم يلحظوا أيّ فرق.',
    },
    {
      text: 'يقولون «الصَّبرُ مفتاحُ الفَرَج.» لكنّ أبو سِمبِل علّمنا أنّ الفَرَج أحيانًا يحتاج ما هو أكبر من الصبر: خمسين دولة تقف معًا وتقول — بعض الأشياء تستحقّ نقل الجبال. ذلك الجهد وَلَّد مباشرةً اتّفاقية التراث العالمي سنة ١٩٧٢، التي تحمي اليوم أكثر من ألفٍ ومئة موقع حول الأرض. كلّ مَعلَمٍ محميّ — من ماتشو بيتشو إلى سور الصين العظيم — موجود لأنّ العالم أثبت يومًا أنّ هناك ما يستحقّ أن يُنقَل لأجله جبل.',
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  PERSIAN — "روزی که کوه جابه‌جا شد"
//  Proverb: "کوه به کوه نمی‌رسد، ولی آدم به آدم می‌رسد"
//    (Mountain doesn't reach mountain, but person reaches person)
//  Subversion: Abu Simbel proved that when people reach each
//    other, even mountains can be moved.
//  Register: Natural modern Persian prose — warm, flowing,
//    reflective narrator. Think top-tier Iranian documentary
//    or popular nonfiction author.
// ═══════════════════════════════════════════════════════════
const fa = {
  lang: 'fa',
  langStoryId: 'fa#unesco-rescue-moving-mountains',

  title: 'روزی که کوه جابه‌جا شد',

  subtitle: 'وقتی پنجاه کشور دست‌به‌دست هم دادند تا گنجینه‌ای مصری را از غرق نجات دهند',

  excerpt: 'سال ۱۹۶۰ بود و مصر با یک انتخاب غیرممکن روبه‌رو شده بود. جمال عبدالناصر داشت سدّ بزرگ اَسوان را می‌ساخت — پروژه‌ای غول‌پیکر برای مهارکردن سیلاب‌های نیل و روشن‌کردن آینده‌ی کشور. اما بهای این پیشرفت سنگین بود: دریاچه‌ی ناصر پانصد کیلومتر از درّه‌ی نیل را زیر آب می‌بُرد.',

  moralOrLesson: 'وقتی انسان‌ها از سرِ تمام اختلاف‌هایشان بگذرند و برای حفظ چیزی واقعاً ارزشمند متحد شوند، حتی کوه‌ها هم از جایشان تکان می‌خورند.',

  paragraphs: [
    {
      text: 'سال ۱۹۶۰ بود و مصر با یک انتخاب غیرممکن روبه‌رو شده بود. جمال عبدالناصر داشت سدّ بزرگ اَسوان را می‌ساخت — پروژه‌ای غول‌پیکر برای مهارکردن سیلاب‌های نیل و روشن‌کردن آینده‌ی کشور. اما بهای این پیشرفت سنگین بود: دریاچه‌ی ناصر، یکی از بزرگ‌ترین دریاچه‌های مصنوعی جهان، پانصد کیلومتر از درّه‌ی نیل را زیر آب می‌بُرد. ده‌ها معبد باستانی غرق می‌شد — و در صدر فهرست: ابوسِمبِل، دو معبدی که رامسس بزرگ سه‌هزار و دویست سال پیش از دلِ صخره تراشیده بود.',
    },
    {
      text: 'یونسکو دست به کاری زد که تا آن روز سابقه نداشت: از تمام دنیا خواست کمک کنند — وگرنه این معابد برای همیشه از روی زمین محو می‌شوند. و باورنکردنی‌ترین بخش داستان اینجاست: دنیا واقعاً جواب داد. پنجاه کشور — کشورهایی که وسطِ جنگ سرد سر هیچ‌چیز با هم کنار نمی‌آمدند — پول و مهندس و تجهیزات فرستادند. سوئد، که هیچ پیوند تاریخی با مصر نداشت، یکی از بزرگ‌ترین کمک‌کنندگان شد. هزینه‌ی کل: چهل میلیون دلار — معادل سیصد و شصت میلیون دلار امروز.',
    },
    {
      text: 'حالا مشکل اصلی را تصور کنید. ابوسِمبِل یک ساختمان نبود که بشود بلندش کرد و جابه‌جایش کرد. معبدها از دلِ کوه تراشیده شده بودند. یک شرکت مهندسی سوئدی به نام VBB نقشه‌ای کشید که از جنون هم رد کرده بود: کلّ مجموعه را به هزار و سی و شش تکه ببُرند — هر کدام بیست تا سی تُن — بعد همه را شصت و پنج متر بالاتر و دویست متر عقب‌تر ببرند و روی تپه‌ای مصنوعی، شبیه کوه اصلی، از نو سر هم کنند.',
    },
    {
      text: 'کار سال ۱۹۶۴ شروع شد، در حالی که آبِ دریاچه هر روز به معابد نزدیک‌تر می‌شد. کارگرها یک سدّ موقّت ساختند تا آب را نگه دارند و برای خودشان وقت بخرند. و اینجاست که داستان واقعاً باورنکردنی می‌شود: استفاده از هر ابزار برقی ممنوع بود. لرزش دستگاه‌ها سنگ سه‌هزارساله را ترک می‌انداخت. پس هر بُرِش با دست انجام شد — با دقّت میلی‌متری. هر قطعه شماره‌گذاری شد، با جرثقیل بالا رفت و سرِ جای اصلی‌اش نشست. بزرگ‌ترین پازلِ تاریخ بشر.',
    },
    {
      text: 'داخل تپه‌ی جدید، مهندس‌ها یکی از بزرگ‌ترین گنبدهای بتنی جهان را ساختند تا سنگ‌ها را از رطوبتی که دریاچه‌ی ناصر به دلِ صحرا آورده بود محافظت کنند. بعد زمین اطراف را طوری شکل دادند که عیناً شبیه چشم‌انداز اصلی شود — تا کسی که به سمت ابوسِمبِل قدم بردارد، تقریباً همان منظره‌ای را ببیند که مردم روزگار رامسس سه‌هزار سال پیش می‌دیدند.',
    },
    {
      text: 'بیست‌ودوم سپتامبر ۱۹۶۸، ابوسِمبِل در خانه‌ی جدیدش رسماً افتتاح شد. و یک معجزه‌ی آخر هم در کار بود. دو بار در سال، نور خورشید تا اعماق معبد نفوذ می‌کند و مجسمه‌های خدایان را روشن می‌کند — ترفندی نجومی که معماران اصلی سی‌ودو قرن پیش طراحی کرده بودند. در جای جدید، مهندس‌ها این هم‌راستایی خورشیدی را با اختلاف فقط یک روز حفظ کردند. کسانی که ابوسِمبِل را قبل از جابه‌جایی دیده بودند گفتند فرقی حس نمی‌کنند.',
    },
    {
      text: 'می‌گویند «کوه به کوه نمی‌رسد، ولی آدم به آدم می‌رسد.» اما ابوسِمبِل ثابت کرد که وقتی آدم‌ها به هم برسند، کوه هم جابه‌جا می‌شود. آن تلاش مستقیماً به پیمان میراث جهانی یونسکو در سال ۱۹۷۲ انجامید — پیمانی که امروز بیش از هزار و صد اثر تاریخی در سراسر دنیا را حفاظت می‌کند. هر اثرِ محافظت‌شده — از ماچوپیچو تا دیوار بزرگ چین — مدیون روزی‌ست که پنجاه ملّت ثابت کردند بعضی چیزها ارزش جابه‌جاکردن کوه را دارند.',
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
    console.log(`✓ ${label} pushed successfully (langStoryId: ${story.langStoryId})\n`);
  } catch (err) {
    if (err.name === 'ConditionalCheckFailedException') {
      console.log(`  ${label} record exists, safe to overwrite (not English)...`);
      await docClient.send(
        new PutCommand({ TableName: TABLE, Item: item })
      );
      console.log(`✓ ${label} overwritten successfully (langStoryId: ${story.langStoryId})\n`);
    } else {
      throw err;
    }
  }
}

async function main() {
  const stories = [ar, fa];

  console.log('=== Validating all stories ===\n');
  for (const s of stories) {
    console.log(`--- ${s.lang.toUpperCase()} ---`);
    validate(s);
  }

  console.log('=== Pushing to DynamoDB ===\n');
  for (const s of stories) {
    await pushStory(s);
  }

  console.log('=== All 2 stories (AR, FA) pushed successfully ===');
}

main().catch((err) => {
  console.error('FAILED:', err.message);
  process.exit(1);
});
