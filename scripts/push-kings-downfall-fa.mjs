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

// ─── Non-text fields (from English original) ────────────
const base = {
  siteId: 'sigiriya',
  storyId: 'kings-downfall',
  icon: '⚔️',
  tier: 'S',
  source: 'Culavamsa, chapters 38-39 (Geiger translation, 1929); De Silva, K.M. A History of Sri Lanka, 1981; Bandaranayake, Senake. Sigiriya: City, Palace and Royal Gardens, 2005; Gunawardana, R.A.L.H. Robe and Plough: Monasticism and Economic Interest in Early Medieval Sri Lanka, 1979; UNESCO World Heritage Nomination File 202',
  era: '495 CE',
  readingTimeMinutes: 3,
  image: '',
  disabled: false,
  thumbnail: '',
  coordinates: { lat: 7.957, lng: 80.7603 },
  hasAudio: false,
  isFree: true,
  storyCategory: 'ghosts_curses',
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════
//  PERSIAN — «دژی در آسمان، سقوطی بر زمین»
//  Proverb: «تا نباشد چیزکی، مردم نگویند چیزها»
//    — subverted into: the army's betrayal wasn't baseless;
//    where there's smoke there's fire, and Kashyapa's crime
//    was the fire that had been burning for eighteen years.
//  Register: Gripping modern Persian storyteller — think quality
//    podcast or popular nonfiction. Natural, punchy, vivid.
//    NOT classical pastiche, NOT academic.
// ═══════════════════════════════════════════════════════════════
const fa = {
  lang: 'fa',
  langStoryId: 'fa#kings-downfall',

  title: 'دژی در آسمان، سقوطی بر زمین',

  subtitle: 'شاهی که پدرش را کشت، هجده سال در قلعه‌ای بر فراز ابرها پنهان شد — و وقتی پایین آمد، همه‌چیز در چند دقیقه از هم پاشید',

  excerpt: 'کاشیاپا پدرش را کشت و بالای صخره‌ای دویست‌متری قصر ساخت. هجده سال آنجا پادشاهی کرد. وقتی برادرش با لشکر برگشت، از آسمان پایین آمد تا بجنگد. همه‌چیز در چند دقیقه تمام شد.',

  moralOrLesson: `کاشیاپا دژش را ساخت تا از کاری که کرده بود فرار کند. اما دیوارها نبودند که شکست خوردند — خودِ جنایت بود. لشکری که به فرمان پدرکُشی می‌جنگد، لشکری‌ست که منتظرِ رفتن است. و در آخرین لحظه‌اش، وقتی خنجر را به گلویش کشید و دوباره در غلاف گذاشت، کاشیاپا ثابت کرد تنها چیزی که واقعاً بر آن فرمان راند، خودش بود.`,

  characters: [
    'شاه کاشیاپای یکم (شاه محکوم به سقوط)',
    'شاه موگَلّانای یکم (برادر ناتنی، وارث بازگشته)',
    'میگارا (فرمانده‌ی خائن که وفاداریش را عوض کرد)',
    'سردار سولاکسمانا (فرمانده‌ی پادگان سیگیریا)',
  ],

  paragraphs: [
    {
      // P1: The father-killing and the flight
      text: `کاشیاپا پدرش را کشت. داستان از اینجا شروع می‌شود. سال ۴۷۷ میلادی، شاه داتوسِنا را — پادشاه سریلانکا، پدرِ خودش را — سرنگون کرد و دستور داد زنده در دیوار بچینندش. بعد تاج را برداشت. اما موگَلّانا، برادرِ ناتنی‌اش و وارثِ واقعیِ تخت، همان شب گریخت. یک شاهزاده‌ی نوجوان که در تاریکی به سمت جنوب هند می‌دوید. کاشیاپا می‌دانست برمی‌گردد. پس بالای یک صخره‌ی دویست‌متری وسط جنگل، قصر ساخت. دژی که هیچ لشکری نمی‌توانست بهش برسد.`,
    },
    {
      // P2: Eighteen years of waiting
      text: `هجده سال، کاشیاپا از بالای آسمان فرمان راند. دورِ سیگیریا خندق کَند، یک شیرِ غول‌پیکر از سنگ تراشید که دروازه‌ی ورودی‌اش باشد، و دیوارها را با نقاشیِ الهه‌های طلایی پوشاند. هر پله، هر سوراخِ تیراندازی، هر تنگه‌ی دفاعی برای یک چیز ساخته شده بود: روزی که برادرش با لشکر برگردد. و وقتی آن روز بالاخره رسید — سال ۴۹۵، موگَلّانا با سربازانِ هندیِ جنوب و ادعای تخت — کاشیاپا آخرین کاری را کرد که کسی انتظارش را داشت.`,
    },
    {
      // P3: He came down
      text: `پایین آمد. به‌جایِ اینکه پشتِ دیوارهایی بماند که دو دهه برای ساختنشان وقت گذاشته بود، لشکرش را به دشتِ باز بُرد. شاید فکر می‌کرد زود پیروز می‌شود. شاید می‌دانست پنهان شدن ضعفش نشان می‌دهد. یا شاید — بعد از هجده سال زندگی با سایه‌ی کاری که کرده بود — فقط می‌خواست تمام شود. مردی که دژی در آسمان ساخته بود، تصمیم گرفت روی زمین بجنگد.`,
    },
    {
      // P4: The elephant turns — the army breaks
      text: `دو لشکر زیرِ صخره به هم خوردند. کاشیاپا سوارِ فیلِ جنگی‌اش در قلبِ نبرد بود — جلوِ چشمِ همه. بعد اتفاق افتاد. فیلش به زمینِ باتلاقی رسید و کج شد تا جای بهتری پیدا کند. یک حیوان داشت از گِل دوری می‌کرد، همین. اما سربازها دیدند شاهشان دارد برمی‌گردد — و عقب‌نشینی دیدند. میگارا، همان فرمانده‌ای که به کاشیاپا کمک کرده بود پدرش را بکشد، دقیقاً منتظرِ همین لحظه بود. فرمانِ عقب‌نشینی داد و کلِ لشکر از هم پاشید. در عرضِ چند دقیقه، کاشیاپا کاملاً تنها مانده بود.`,
    },
    {
      // P5: The most famous death — the dagger, the sheath
      text: `آنچه بعد اتفاق افتاد، معروف‌ترین مرگ تاریخِ سریلانکاست. کاشیاپا خنجرِ جواهرنشانش را از کمر بیرون کشید، بر گلویش گذاشت و بُرید. اما یک جزئیّت هست که هزار و پانصد سال ذهنِ آدم‌ها را رها نکرده: بعد از بریدنِ گلوی خودش، خنجرِ خونین را بالای سرش بلند کرد — تا همه‌ی میدانِ جنگ ببینند. بعد آرام آن را در غلافش سُراند. و افتاد. خنجر را غلاف کرد چون جنگ تمام شده بود. حساب بسته شده بود.`,
    },
    {
      // P6: Sigiriya becomes a monastery
      text: `موگَلّانا تخت را گرفت و پایتخت را به آنورادّاپورا — شهرِ باستانیِ مقدس — برگرداند. سیگیریا، این دژِ ناممکن، این یادگارِ گناه و نبوغ، به راهبانِ بودایی سپرده شد. کاخِ عیش‌ونوشِ یک پدرکُش شد صومعه. الهه‌های نقاشی‌شده از بالا به سرهای تراشیده نگاه می‌کردند. فواره‌ها خاموش شدند. شیرِ سنگی فرو ریخت. چهارده قرن، تنها صداهای آن صخره، زمزمه‌ی راهبان بود و عاشقانی که شعرهای عاشقانه روی دیوارِ آینه‌ای می‌خراشیدند.`,
    },
    {
      // P7: Karma, the proverb, the fall
      text: `می‌گویند تا نباشد چیزکی، مردم نگویند چیزها — و لشکرِ کاشیاپا هجده سال چیزها می‌گفت. بودایی‌ها درباره‌ی کاشیاپا ساده و بی‌رحم حرف می‌زنند: کارما منتظرِ زندگیِ بعدی‌ات نمی‌ماند. باهوش بود. دژش شاهکار بود. اما جنایت بالاخره سراغش آمد — نه از دیوارهایی که ساخته بود، بلکه از وفاداری‌ای که هرگز نتوانست به دست بیاورد. لشکری که آن روز از هم پاشید، هیچ‌وقت واقعاً پشتِ شاهی نایستاده بود که پدرش را کشته باشد. دژت را هر چقدر بخواهی بلند بساز. سقوط همیشه منتظرت هست.`,
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
  await docClient.send(
    new PutCommand({
      TableName: TABLE,
      Item: item,
      ConditionExpression: 'attribute_not_exists(siteId) OR lang <> :en',
      ExpressionAttributeValues: { ':en': 'en' },
    })
  );
  console.log(`✓ ${label} pushed successfully (langStoryId: ${story.langStoryId})\n`);
}

async function main() {
  console.log('=== Validating FA story ===\n');
  console.log('--- FA ---');
  validate(fa);

  console.log('=== Pushing to DynamoDB ===\n');
  await pushStory(fa);

  console.log('=== King\'s Downfall (FA) pushed successfully ===');
}

main().catch((err) => {
  console.error('FAILED:', err.message);
  process.exit(1);
});
