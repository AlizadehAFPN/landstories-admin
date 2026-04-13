/**
 * Push Persian version of "The Wedding of the Sea" — عروسی دریا
 * New record in Story table. Does NOT overwrite English.
 */

import { readFileSync } from "fs";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

// Load env
const envFile = readFileSync("/Users/wallex/landstories-admin/.env.local", "utf-8");
for (const line of envFile.split("\n")) {
  const match = line.match(/^(\w+)\s*=\s*(.+)$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
}

const client = new DynamoDBClient({ region: process.env.AWS_REGION || "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const EN_KEY = { siteId: "venice-st-marks-doges", langStoryId: "en#wedding-of-the-sea" };
const FA_KEY = { siteId: "venice-st-marks-doges", langStoryId: "fa#wedding-of-the-sea" };

async function main() {
  // 1. Fetch English version to copy non-text fields
  const { Item: en } = await docClient.send(new GetCommand({ TableName: TABLE, Key: EN_KEY }));
  if (!en) { console.error("\u2717 English story not found!"); process.exit(1); }
  console.log("\u2713 English source loaded:", en.title);

  const now = Math.floor(Date.now() / 1000);

  // 2. Build Persian item
  const faItem = {
    ...en,
    lang: "fa",
    langStoryId: "fa#wedding-of-the-sea",
    title: "عروسی دریا",
    subtitle: "جمهوری\u200Cای که با دریا ازدواج کرد و هزار سال بر آن فرمان راند",
    excerpt: "سالی یک بار، هشتصد سال تمام، حاکم ونیز انگشتری طلا توی دریا می\u200Cانداخت \u2014 عقد رسمی میان یک دولت و یک اقیانوس.",
    moralOrLesson: "فرمانروایی پیمانی است که هر روز باید تازه\u200Cاش کنی \u2014 عهدی میان یک ملّت و طبیعت و اراده\u200Cشان برای پابرجا ماندن.",
    paragraphs: [
      {
        text: `ضرب\u200Cالمثل قدیمی می\u200Cگوید: «هر که طاووس خواهد، جور هندوستان کشد.» ونیز طاووس نمی\u200Cخواست \u2014 دریا می\u200Cخواست. و مَهرش را هشتصد سال تمام داد. سالی یک بار، «دوج» \u2014 حاکم انتخابی و مادام\u200Cالعمرِ ونیز \u2014 سوار یک کشتی طلاکاری غول\u200Cپیکر می\u200Cشد، تا دلِ دریای آدریاتیک پیش می\u200Cرفت، انگشتر طلا را از دستش درمی\u200Cآورد و می\u200Cانداخت توی موج\u200Cها. بعد اعلام می\u200Cکرد: «ای دریا، با تو ازدواج می\u200Cکنم، نشانه\u200Cی فرمانروایی راستین و جاودانه.» نه شعر بود، نه استعاره. فرمان رسمیِ دولت بود.`,
      },
      {
        text: `داستان از حوالی سال هزار میلادی شروع شد. ونیز شهر جوانی بود روی تیرک\u200Cهای چوبی وسطِ یک مرداب، و دزدان دریایی از سواحل کرواسیِ امروزی راه\u200Cهای تجارتش را بسته بودند. دوج «پیِترو اورسئولو دوم» کلّ ناوگان ونیز را برداشت، آدریاتیک را رد کرد، دزدان دریایی را له کرد و ساحل را گرفت. روز عید صعود \u2014 یکی از بزرگ\u200Cترین عیدهای مسیحی \u2014 برگشت و در آب\u200Cهای آزاد اعلام کرد: دریا مالِ ونیز است. هر دوجی که بعدش آمد همان سوگند را تکرار کرد. همان روز. هر سال.`,
      },
      {
        text: `سال ۱۱۷۷ مراسم یک پلّه بالاتر رفت. پاپ الکساندر سوم از دست فردریک بارباروسا فراری بود \u2014 قدرتمندترین مرد اروپا \u2014 و ونیز به\u200Cاش پناه داد و میانجیِ صلح شد. پاپ از سرِ سپاس یک انگشتر طلا به دوج هدیه داد و اعلام کرد ونیز از این به بعد برکتِ خدا را دارد که هر ساله با دریا «ازدواج» کند. اسمش شد «اسپوزالیتسیو دل ماره» \u2014 عروسیِ دریا. دیگر یک بازی سیاسی نبود. مقدّس شده بود.`,
      },
      {
        text: `ولی ستاره\u200Cی اصلی ماجرا یک کشتی بود: «بوچینتورو» \u2014 قایق تشریفاتیِ دوج. آخرین نسخه\u200Cاش سال ۱۷۲۹ ساخته شد: سی\u200Cوپنج متر درازا، پوشیده از ورق طلا، روکش حریر سرخ، و صدوشصت\u200Cوهشت پاروزن حرکتش می\u200Cدادند. سفیرهای خارجی به کشورشان نوشتند هیچ\u200Cچیز در اروپا \u2014 نه تاج\u200Cگذاری، نه حتی جشن\u200Cهای ورسای \u2014 حریفِ این کشتیِ طلایی نمی\u200Cشود وقتی آرام روی آب سُر می\u200Cخورَد و صدها قایق پشت سرش. دوج جلو ایستاده بود، درست مثل دامادی که از راهروی عروسی رد می\u200Cشود.`,
      },
      {
        text: `آخرین عروسیِ واقعی روز عید صعودِ ۱۷۹۷ بود. دوازده روز بعد ارتش ناپلئون وارد ونیز شد و جمهوری رأی به انحلال خودش داد \u2014 هزار و صد سال حکومتِ بدون وقفه تمام شد. ناپلئون دقیقاً می\u200Cدانست قدم بعدی چیست: طلای بوچینتورو را کَند و ذوب کرد، بعد بقیّه\u200Cاش را آتش زد. خاکسترِ باشکوه\u200Cترین کشتیِ تاریخ ریخته شد توی همان آبی که روزگاری پیروزمندانه در آن می\u200Cراند. ناپلئون فقط ونیز را نگرفت \u2014 لباس عروسش را سوزاند.`,
      },
      {
        text: `مراسم قرن بیستم برگشت و هنوز هر سال برگزار می\u200Cشود \u2014 فقط حالا شهردار انگشتر را می\u200Cاندازد، نه دوج. یک لحظه فکر کن: تهِ دریای آدریاتیک، زیر موج\u200Cها جلوی ساحل ونیز، هشتصد سال انگشتر طلا توی گِل نشسته. بهایی که یک جمهوری سال به سال پرداخت تا عروس\u200Cودامادِ دریا بماند. و هزار سال تمام، ونیز سرِ عهدش ماند.`,
      },
    ],
    updatedAt: now,
  };

  // 3. Validate paragraphs
  console.log("\n--- Persian paragraph stats ---");
  let totalChars = 0;
  for (let i = 0; i < faItem.paragraphs.length; i++) {
    const t = faItem.paragraphs[i].text;
    const words = t.split(/\s+/).length;
    console.log(`  P${i + 1}: ${t.length} chars, ${words} words`);
    if (t.length > 500) console.warn(`  \u26A0  P${i + 1} exceeds 500 chars!`);
    if (words > 100) console.warn(`  \u26A0  P${i + 1} exceeds 100 words!`);
    totalChars += t.length;
  }
  console.log(`  Total: ${totalChars} chars (target ~3000 \u00B120%)`);
  console.log(`  Paragraphs: ${faItem.paragraphs.length}`);

  // 4. Push to DynamoDB
  console.log("\n--- Pushing Persian story ---");
  await docClient.send(new PutCommand({ TableName: TABLE, Item: faItem }));
  console.log("\u2713 Persian story pushed successfully");

  // 5. Verify
  const { Item: saved } = await docClient.send(new GetCommand({ TableName: TABLE, Key: FA_KEY }));
  if (!saved) { console.error("\u2717 Verification failed — item not found!"); process.exit(1); }

  console.log("\n--- Verification ---");
  console.log("  siteId:", saved.siteId);
  console.log("  langStoryId:", saved.langStoryId);
  console.log("  lang:", saved.lang);
  console.log("  title:", saved.title);
  console.log("  subtitle:", saved.subtitle);
  console.log("  excerpt:", saved.excerpt.substring(0, 60) + "...");
  console.log("  moralOrLesson:", saved.moralOrLesson.substring(0, 60) + "...");
  console.log("  paragraphs:", saved.paragraphs.length);
  console.log("  storyCategory:", saved.storyCategory);
  console.log("  tier:", saved.tier);
  console.log("  icon:", saved.icon);
  console.log("  isFree:", saved.isFree);
  console.log("  updatedAt:", saved.updatedAt);
  console.log("  characters:", JSON.stringify(saved.characters));

  // Verify English is untouched
  const { Item: enCheck } = await docClient.send(new GetCommand({ TableName: TABLE, Key: EN_KEY }));
  console.log("\n--- English record check ---");
  console.log("  English still exists:", !!enCheck);
  console.log("  English title:", enCheck?.title);
  console.log("  English lang:", enCheck?.lang);

  console.log("\n\u2713 All done — Persian version created successfully.");
}

main().catch((err) => { console.error("\u2717 ERROR:", err); process.exit(1); });
