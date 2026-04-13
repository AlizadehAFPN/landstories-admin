/**
 * Push Arabic version of "The Wedding of the Sea" — عُرسُ البحر
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
const AR_KEY = { siteId: "venice-st-marks-doges", langStoryId: "ar#wedding-of-the-sea" };

async function main() {
  // 1. Fetch English version to copy non-text fields
  const { Item: en } = await docClient.send(new GetCommand({ TableName: TABLE, Key: EN_KEY }));
  if (!en) { console.error("\u2717 English story not found!"); process.exit(1); }
  console.log("\u2713 English source loaded:", en.title);

  const now = Math.floor(Date.now() / 1000);

  // 2. Build Arabic item
  const arItem = {
    ...en,
    lang: "ar",
    langStoryId: "ar#wedding-of-the-sea",
    title: "عُرسُ البحر",
    subtitle: "جُمهوريّةٌ تزوّجت البحر وحكمته ألفَ عام",
    excerpt: "مرّةً كلّ عام، طوالَ ثمانمئةِ سنة، كان حاكمُ البندقيّة يُلقي خاتمًا ذهبيًّا في البحر — عقدَ زواجٍ رسميّ بين دولةٍ ومُحيط.",
    moralOrLesson: "السيادةُ عَهدٌ يُجدَّدُ كلّ يوم — ميثاقٌ بين شعبٍ وعناصرِ الطبيعة وإرادتِهم في البقاء.",
    paragraphs: [
      {
        text: `يقولُ المَثَل: «مَن أمِنَ البحرَ غَرِق.» لكنّ البندقيّة لم تأمَنِ البحرَ — تزوَّجَته. مرّةً في السنة، طوالَ ثمانمئةِ عام، كان «الدوج» — حاكمُ البندقيّة المُنتخَبُ مدى الحياة — يصعدُ سفينةً مُذهَّبةً عملاقة، يُبحرُ نحوَ عُرضِ الأدرياتيكي، ثمّ يخلعُ خاتمًا ذهبيًّا من إصبعِه ويرميه في الموج. يُعلن: «نتزوَّجُكِ أيّتُها البحر، دليلًا على حُكمٍ حقيقيٍّ دائم.» ليس مَجازًا. ليس شِعرًا. مرسومٌ رسميّ.`,
      },
      {
        text: `بدأتِ الحكايةُ حوالي عامِ ألفٍ للميلاد. كانت البندقيّةُ مدينةً فتيّةً مَبنيّةً على أوتادٍ خشبيّةٍ في قلبِ بُحَيرة، وقراصنةٌ من سواحلِ كرواتيا الحاليّة يخنقون طُرُقَ تجارتِها. فحمَلَ الدوج «بيِترو أورسيولو الثاني» أسطولَ البندقيّة بأكملِه عبرَ الأدرياتيكي، سحقَ القراصنة، واستولى على الساحل. عادَ يومَ عيدِ الصعود — من كِبارِ الأعيادِ المسيحيّة — وأبحرَ إلى عُرضِ الماء مُعلنًا البحرَ مِلكًا للبندقيّة. كلّ دوجٍ بعدَه أعادَ العَهدَ ذاته. اليومَ ذاته. كلّ عام.`,
      },
      {
        text: `سنةَ 1177 حصلَ الاحتفالُ على ترقيةٍ سماويّة. البابا ألكسندر الثالث كان هاربًا من الإمبراطور فريدريك بربروسّا — أقوى رجُلٍ في أوروبّا يومَها — فآوَتهُ البندقيّةُ وتوسَّطت لصُلحٍ تاريخيّ. البابا المُمتَنّ أهدى الدوجَ خاتمًا من ذهب وأعلنَ أنّ للبندقيّة الآنَ بَرَكةَ الله نفسِه كي تتزوَّجَ البحرَ كلّ عام. سمَّوها «سبوزاليتسيو دِل ماري» — عُرسُ البحر. لم تَعُد مُناورةً سياسيّة. صارت طقسًا مُقدَّسًا.`,
      },
      {
        text: `نجمُ المَوكبِ الحقيقيّ كان سفينة: «البوتشينتورو» — مَركَبُ الدوجِ الاحتفاليّ. نُسختُه الأخيرة بُنيَت عامَ 1729: خمسةٌ وثلاثون مترًا طولًا، مكسوّةٌ برقائقِ الذهب، مُغطّاةٌ بالحريرِ الأحمر، يُجدِّفُها مئةٌ وثمانيةٌ وستّون مُجدِّفًا. كتبَ دبلوماسيّون أجانب لبلدانِهم أنّ لا حفلَ تتويجٍ في أوروبّا، ولا حتّى استعراضاتِ فرساي، تُضاهي هذه السفينةَ الذهبيّة وهي تنزلقُ فوقَ الماء يتبعُها المئات، والدوجُ واقفٌ في مُقدِّمتِها كعريسٍ يمشي نحوَ المذبح.`,
      },
      {
        text: `آخرُ عُرسٍ حقيقيّ أُقيمَ يومَ الصعود سنةَ 1797. بعدَها باثنَي عشرَ يومًا دخلَ جيشُ نابليون البندقيّة، وصوَّتتِ الجمهوريّةُ على حلّ نفسِها — مُنهيةً ألفًا ومئةَ سنةٍ من حُكمٍ ذاتيٍّ مُتّصل. نابليون عرفَ خُطوتَه التالية بالضبط: جرَّدَ البوتشينتورو من ذهبِه وصهرَه، ثمّ أضرمَ النارَ فيما تبقّى. رمادُ أروعِ سفينةٍ عرفها البشر أُلقيَ في الماءِ ذاتِه الذي طالما شقَّته ظافرة. لم يغزُ البندقيّةَ وحسب — أحرقَ ثوبَ عُرسِها.`,
      },
      {
        text: `عادَ الاحتفالُ في القرنِ العشرين ولا يزالُ يُقامُ كلّ سنة — لكنّ مَن يرمي الخاتمَ اليومَ رئيسُ البلديّة لا الدوج. تأمَّل ما يعنيه ذلك: في قاعِ الأدرياتيكي، تحتَ الأمواج قبالةَ ساحلِ البندقيّة، ترقدُ خواتمُ ذهبيّة عمرُها ثمانمئةِ عام غارقةٌ في الوَحل — ثمنٌ دفعَته جمهوريّةٌ عامًا بعدَ عام لتظلَّ مُتزوِّجةً من البحر. وطوالَ ألفِ سنة، وفَتِ البندقيّةُ بعَهدها.`,
      },
    ],
    updatedAt: now,
  };

  // 3. Validate paragraphs
  console.log("\n--- Arabic paragraph stats ---");
  let totalChars = 0;
  for (let i = 0; i < arItem.paragraphs.length; i++) {
    const t = arItem.paragraphs[i].text;
    const words = t.split(/\s+/).length;
    console.log(`  P${i + 1}: ${t.length} chars, ${words} words`);
    if (t.length > 500) console.warn(`  \u26A0  P${i + 1} exceeds 500 chars!`);
    if (words > 100) console.warn(`  \u26A0  P${i + 1} exceeds 100 words!`);
    totalChars += t.length;
  }
  console.log(`  Total: ${totalChars} chars (target ~3000 \u00B120%)`);
  console.log(`  Paragraphs: ${arItem.paragraphs.length}`);

  // 4. Push to DynamoDB
  console.log("\n--- Pushing Arabic story ---");
  await docClient.send(new PutCommand({ TableName: TABLE, Item: arItem }));
  console.log("\u2713 Arabic story pushed successfully");

  // 5. Verify
  const { Item: saved } = await docClient.send(new GetCommand({ TableName: TABLE, Key: AR_KEY }));
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

  console.log("\n\u2713 All done — Arabic version created successfully.");
}

main().catch((err) => { console.error("\u2717 ERROR:", err); process.exit(1); });
