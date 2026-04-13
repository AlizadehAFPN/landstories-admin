import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const now = Math.floor(Date.now() / 1000);

// ═══════════════════════════════════════════════════════════════════
//  ARABIC — حِصنٌ في السَّماء
//  Proverb subverted: «مَن حَفَرَ حُفرةً لأخيه وقع فيها»
//  (He who digs a pit for his brother falls into it)
// ═══════════════════════════════════════════════════════════════════

const item = {
  siteId: "sigiriya",
  langStoryId: "ar#kings-downfall",
  lang: "ar",
  storyId: "kings-downfall",
  title: "حِصنٌ في السَّماء",
  subtitle:
    "ثمانيةَ عشرَ عاماً حكم من قمّة صخرة لا يصلها جيش — ثمّ نزل بإرادته، وخسر كلّ شيء في دقائق",
  excerpt:
    "ملكٌ قتل أباه وبنى قصراً فوق السحاب. ثمانية عشر عاماً وهو ينتظر أخاه. حين جاء الأخ أخيراً، نزل كَاشْيَابَا من حصنه ليواجهه — وانتهى كلّ شيء قبل أن يبدأ.",
  paragraphs: [
    {
      text: `كَاشْيَابَا قتل أباه. من هنا تبدأ القصّة. سنة ٤٧٧ ميلاديّة، انقلب على الملك دَاتُوسِينَا ملك سريلانكا — أمر بأن يُحبَس حيّاً داخل جدار — واستولى على العرش. لكنّ أخاه غير الشقيق مُوغَلَّانَا، الوريث الشرعيّ، هرب في الليلة نفسها. أمير مراهق يركض في الظلام باتّجاه جنوب الهند. كَاشْيَابَا كان يعرف أنّه سيعود. فبنى قصراً فوق صخرة ارتفاعها مئتا متر وسط الأدغال. حصنٌ لا يصله جيش.`,
    },
    {
      text: `ثمانيةَ عشرَ عاماً حكم كَاشْيَابَا من السماء. أحاط سِيغِيرِيَا بالخنادق، ونحت أسداً عملاقاً في الصخر ليكون بوّابته، ورسم على الجدران آلهةً ذهبيّة. كلّ درج، كلّ فتحة سهم، كلّ ممرّ ضيّق — صُمِّم لشيء واحد: اليوم الذي يعود فيه أخوه بجيش. وحين جاء ذلك اليوم أخيراً سنة ٤٩٥ — مُوغَلَّانَا يزحف بجنود من جنوب الهند وعرشٌ ينتظره — فعل كَاشْيَابَا آخر شيء توقّعه أيّ إنسان.`,
    },
    {
      text: `نزل. بدلاً من أن يتحصّن خلف الجدران التي أمضى عشرين سنة يبنيها، قاد جيشه إلى السهل المكشوف. ربّما ظنّ أنّه سينتصر سريعاً. ربّما عرف أنّ الاختباء سيُظهره ضعيفاً. أو ربّما — بعد ثمانية عشر عاماً يعيش مع ما فعله — أراد فقط أن ينتهي الأمر. الرجل الذي بنى حصناً في السماء اختار أن يحارب على الأرض.`,
    },
    {
      text: `اشتبك الجيشان أسفل الصخرة. كَاشْيَابَا ركب فيله الحربيّ في القلب، يراه الجميع. ثمّ حدث ما حدث. الفيل داس أرضاً مُوحِلة فانعطف يبحث عن موطئ أصلب. حيوان يتفادى الوحل، لا أكثر. لكنّ جنوده رأوا ملكهم يُدير ظهره — فظنّوه يتراجع. مِيغَارَا، القائد نفسُه الذي ساعد كَاشْيَابَا على قتل أبيه، كان ينتظر هذه اللحظة بالذات. نادى بالانسحاب، فانهار الجيش كلّه. في دقائق، صار كَاشْيَابَا وحيداً تماماً.`,
    },
    {
      text: `ما حصل بعدها هو أشهر موت في تاريخ سريلانكا. سحب كَاشْيَابَا خنجراً مُرصَّعاً من خصره، وضعه على رقبته، وقطع. لكنّ التفصيل الذي يُلاحق الناس منذ ألفٍ وخمسمئة سنة: بعد أن شقّ حلقه، رفع الخنجر الملطّخ بالدم فوق رأسه كي يراه كلّ من في الميدان. ثمّ أعاده إلى غِمده. وسقط. أغمد النصل لأنّ المعركة انتهت. الحساب أُقفِل.`,
    },
    {
      text: `تولّى مُوغَلَّانَا العرش وأعاد العاصمة إلى أَنُورَادَابُورَا، المدينة المقدّسة القديمة. أمّا سِيغِيرِيَا — هذا الحصن المستحيل، هذا النُّصب للعبقريّة والذنب — فسُلِّمت للرهبان البوذيّين. قصر المتعة لقاتل أبيه صار ديراً. الآلهة المرسومة على الجدران صارت تُطِلّ على رؤوس محلوقة. النوافير سكتت. الأسد تفتّت. أربعة عشر قرناً، لم يُسمَع فوق تلك الصخرة إلّا ترتيل الرهبان وزوّارٌ ينقشون قصائد حبّ على جدار المرآة.`,
    },
    {
      text: `يقولون «مَن حَفَرَ حُفرةً لأخيه وقع فيها.» كَاشْيَابَا لم يحفر حفرة — بنى حصناً كاملاً في السماء ليهرب من حفرته. كان عبقريّاً. قلعته كانت أعجوبة. لكنّ الجريمة لحقته — لا من خلال الجدران، بل من خلال الولاء الذي لم يستطع شراءه. الجيش الذي انهار ذلك اليوم لم يتبع يوماً ملكاً قتل أباه. تبني حصنك عالياً كما تشاء. السقوط دائماً بالانتظار.`,
    },
  ],
  moralOrLesson:
    "بنى كَاشْيَابَا حصنه ليسبق ما فعله. لكنّ الجدران لم تخذله — الجريمة نفسها خذلته. جيشٌ يخدم رجلاً قتل أباه هو جيشٌ ينتظر لحظة المغادرة. وفي لحظته الأخيرة، حين قطع حلقه وأغمد الخنجر، أثبت كَاشْيَابَا أنّ الشيء الوحيد الذي حكمه حقّاً كان نفسه.",
  characters: [
    "الملك كَاشْيَابَا الأوّل (الملك المحكوم بالسقوط)",
    "الملك مُوغَلَّانَا الأوّل (أخوه غير الشقيق، الوريث العائد)",
    "مِيغَارَا (القائد الخائن الذي بدّل ولاءه)",
    "الجنرال سُولَاكْسمَانَا (قائد حامية سِيغِيرِيَا)",
  ],
  icon: "⚔️",
  tier: "S",
  source:
    "Culavamsa, chapters 38-39 (Geiger translation, 1929); De Silva, K.M. A History of Sri Lanka, 1981; Bandaranayake, Senake. Sigiriya: City, Palace and Royal Gardens, 2005; Gunawardana, R.A.L.H. Robe and Plough: Monasticism and Economic Interest in Early Medieval Sri Lanka, 1979; UNESCO World Heritage Nomination File 202",
  era: "495 CE",
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  coordinates: { lat: 7.957, lng: 80.7603 },
  hasAudio: false,
  isFree: true,
  storyCategory: "ghosts_curses",
  disabled: false,
  updatedAt: now,
};

// ─── VALIDATION ─────────────────────────────────────────────────────────────

console.log("\n=== PARAGRAPH VALIDATION ===\n");

let totalChars = 0;
let totalWords = 0;
let allPass = true;

for (let i = 0; i < item.paragraphs.length; i++) {
  const text = item.paragraphs[i].text;
  const chars = text.length;
  const words = text.split(/\s+/).length;
  totalChars += chars;
  totalWords += words;

  const charOk = chars <= 500;
  const wordOk = words <= 100;

  if (!charOk || !wordOk) allPass = false;

  console.log(
    `P${i + 1}: ${chars} chars ${charOk ? "\u2713" : "\u2717 OVER"} | ${words} words ${wordOk ? "\u2713" : "\u2717 OVER"}`
  );
}

console.log(
  `\nTotal: ${totalChars} chars | ${totalWords} words | ${item.paragraphs.length} paragraphs`
);
console.log(`Target: ~3000 chars (\u00b120% = 2400\u20133600)`);
console.log(
  `Status: ${totalChars >= 2400 && totalChars <= 3600 ? "\u2713 WITHIN RANGE" : "\u2717 OUT OF RANGE"}`
);

console.log(`\nSubtitle: ${item.subtitle.length} chars (max 200)`);
console.log(`Excerpt: ${item.excerpt.length} chars (max 250)`);

if (!allPass) {
  console.error("\n\u2717 Some paragraphs exceed limits. Aborting.");
  process.exit(1);
}

if (item.subtitle.length > 200) {
  console.error("\n\u2717 Subtitle exceeds 200 chars. Aborting.");
  process.exit(1);
}

if (item.excerpt.length > 250) {
  console.error("\n\u2717 Excerpt exceeds 250 chars. Aborting.");
  process.exit(1);
}

// ─── Validate JSON integrity ────────────────────────────────────────────────
const json = JSON.stringify(item);
JSON.parse(json);
console.log(`\n\u2713 JSON valid (${json.length} bytes)`);

// ─── DYNAMODB PUSH ──────────────────────────────────────────────────────────

async function pushStory() {
  console.log("\n\u23f3 Pushing Arabic (ar) King's Downfall...");
  try {
    await docClient.send(
      new PutCommand({
        TableName: "Story",
        Item: item,
        ConditionExpression:
          "attribute_not_exists(siteId) AND attribute_not_exists(langStoryId)",
      })
    );
    console.log("\u2705 Arabic story pushed successfully (new item).");
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(
        "\u26a0\ufe0f  Item already exists. Overwriting with updated version..."
      );
      await docClient.send(
        new PutCommand({
          TableName: "Story",
          Item: item,
        })
      );
      console.log("\u2705 Arabic story overwritten successfully.");
    } else {
      console.error("\u274c Push FAILED:", err.message);
      throw err;
    }
  }

  console.log(`   siteId: ${item.siteId}`);
  console.log(`   langStoryId: ${item.langStoryId}`);
  console.log(`   paragraphs: ${item.paragraphs.length}`);
  console.log(`   updatedAt: ${item.updatedAt}`);
}

async function main() {
  console.log("\n\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550");
  console.log("  King's Downfall \u2014 Arabic (ar) push  ");
  console.log("\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550");
  console.log(`Timestamp: ${now}`);

  await pushStory();

  console.log("\n\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550");
  console.log("  Arabic story pushed successfully!  ");
  console.log("\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550");
}

main().catch((err) => {
  console.error("\n\ud83d\udca5 Fatal error:", err.message);
  process.exit(1);
});
