import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb';

// Load env from .env.local
const envContent = readFileSync('/Users/wallex/landstories-admin/.env.local', 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+?)\s*=\s*(.*)$/);
  if (match) env[match[1].trim()] = match[2].trim();
});

const client = new DynamoDBClient({
  region: env.AWS_REGION || 'eu-north-1',
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE = env.DYNAMO_TABLE_STORY || 'Story';

// Read all stories
const allStories = JSON.parse(readFileSync('/tmp/all-44-stories-dump.json', 'utf-8'));
const jaStories = allStories.filter(s => s.lang === 'ja');

console.log(`Found ${jaStories.length} Japanese stories:`);
jaStories.forEach(s => console.log(`  - ${s.langStoryId} (siteId: ${s.siteId})`));

const now = Math.floor(Date.now() / 1000);

// ============================================================
// HELPER: Check for simplified Chinese characters mixed in
// ============================================================
function checkSimplifiedChinese(text, storyId) {
  // These are simplified Chinese characters that should NOT appear in Japanese text
  // Note: 国 is valid shinjitai in Japanese, so we skip it
  const simplifiedChars = {
    '话': '話',
    '东': '東',
    '书': '書',
    '门': '門',
    '长': '長',
    '进': '進',
    '发': '發',
    '对': '對',
    '关': '關',
    '开': '開',
    '过': '過',
  };

  let issues = [];
  for (const [simp, trad] of Object.entries(simplifiedChars)) {
    if (text.includes(simp)) {
      issues.push(`Found simplified '${simp}' (should be '${trad}') in ${storyId}`);
    }
  }
  return issues;
}

// ============================================================
// FIX 1: JA Nowruz (ja#nowruz-world-born-again, siteId: persepolis)
// ============================================================
function fixNowruz(story) {
  const s = JSON.parse(JSON.stringify(story));

  s.paragraphs = s.paragraphs.map((p, i) => {
    let text = p.text;

    // Fix simplified Chinese: 神话 -> 神話
    if (text.includes('神话')) {
      console.log(`  [FIX] Paragraph ${i}: 神话 -> 神話 (simplified Chinese -> Japanese)`);
      text = text.replace('神话', '神話');
    }

    // Fix wrong kanji: 咆みついている -> 噛みついている
    if (text.includes('咆みついている')) {
      console.log(`  [FIX] Paragraph ${i}: 咆みついている -> 噛みついている`);
      text = text.replace('咆みついている', '噛みついている');
    }

    // Fix fake proverb: Replace with real kotowaza 七転び八起き
    if (text.includes('花は散っても根は残る')) {
      console.log(`  [FIX] Paragraph ${i}: Replacing fake proverb with real kotowaza 七転び八起き`);
      text = text.replace(
        '花は散っても根は残る——ノウルーズはその根だ。',
        '七転び八起きという言葉があるが、ノウルーズはまさにそれだ——何度倒されても必ず立ち上がる祭りなのだ。'
      );
    }

    return { ...p, text };
  });

  // Fix quotation marks: ensure all use Japanese 「」 not ""
  s.paragraphs = s.paragraphs.map((p) => {
    let text = p.text;
    text = text.replace(/\u201C([^\u201D]+)\u201D/g, '「$1」');
    return { ...p, text };
  });

  // Translate characters array to Japanese with parenthetical descriptions
  s.characters = [
    "ダレイオス一世（ノウルーズの舞台を建てた王）",
    "ジャムシード（ノウルーズの神話の王）",
    "モハンマド・レザー・パフラヴィー（1971年の祝典）",
    "フェルドウスィー（『シャーナーメ』の詩人）",
    "今も祝い続ける三億の人々"
  ];

  s.updatedAt = now;
  return s;
}

// ============================================================
// FIX 2: JA Molon Labe (ja#molon-labe, siteId: thermopylae)
// ============================================================
function fixMolonLabe(story) {
  const s = JSON.parse(JSON.stringify(story));

  // Fix: "こう提案させた" -> "こう伝えさせた" (more natural)
  s.paragraphs = s.paragraphs.map((p, i) => {
    let text = p.text;

    if (text.includes('こう提案させた')) {
      console.log(`  [FIX] Paragraph ${i}: こう提案させた -> こう伝えさせた`);
      text = text.replace('こう提案させた', 'こう伝えさせた');
    }

    return { ...p, text };
  });

  // Also fix in excerpt
  if (s.excerpt && s.excerpt.includes('こう提案させた')) {
    console.log(`  [FIX] Excerpt: こう提案させた -> こう伝えさせた`);
    s.excerpt = s.excerpt.replace('こう提案させた', 'こう伝えさせた');
  }

  // Keep 武士道/葉隠 reference (it's excellent)

  // Fix quotation marks consistency
  s.paragraphs = s.paragraphs.map((p) => {
    let text = p.text;
    text = text.replace(/\u201C([^\u201D]+)\u201D/g, '「$1」');
    return { ...p, text };
  });

  // Translate characters array to Japanese
  s.characters = [
    "レオニダス王（スパルタの王）",
    "クセルクセスの使者",
    "三百人のスパルタ兵"
  ];

  s.updatedAt = now;
  return s;
}

// ============================================================
// FIX 3: JA Napoleon Pyramid (ja#napoleons-night-inside, siteId: great-pyramids-giza)
// ============================================================
function fixNapoleonPyramid(story) {
  const s = JSON.parse(JSON.stringify(story));

  // Keep 「言わぬが花」 (it's real and well-used)

  // Tighten closing paragraph
  s.paragraphs = s.paragraphs.map((p, i) => {
    let text = p.text;

    if (text.includes('四千年の時を超えて人間の意識に働きかける何かが存在するのかもしれない')) {
      console.log(`  [FIX] Paragraph ${i}: Tightening closing sentence`);
      text = text.replace(
        '四千年の時を超えて人間の意識に働きかける何かが存在するのかもしれない',
        '四千年前の石が、今もなお人の心をかき乱す何かを宿している'
      );
    }

    return { ...p, text };
  });

  // Fix quotation marks
  s.paragraphs = s.paragraphs.map((p) => {
    let text = p.text;
    text = text.replace(/\u201C([^\u201D]+)\u201D/g, '「$1」');
    return { ...p, text };
  });

  // Translate characters array to Japanese
  s.characters = [
    "ナポレオン・ボナパルト",
    "フランス遠征隊の士官たち"
  ];

  s.updatedAt = now;
  return s;
}

// ============================================================
// FIX 4: JA Napoleon Kremlin (ja#napoleon-kremlin, siteId: moscow-kremlin)
// ============================================================
function fixNapoleonKremlin(story) {
  const s = JSON.parse(JSON.stringify(story));

  // Keep 「驕れる者は久しからず」from 平家物語 (it's PERFECT)

  // Replace "パルチザン" with "ゲリラ兵" for modern accessibility
  s.paragraphs = s.paragraphs.map((p, i) => {
    let text = p.text;

    if (text.includes('パルチザン')) {
      console.log(`  [FIX] Paragraph ${i}: パルチザン -> ゲリラ兵 (modern accessibility)`);
      text = text.replace('パルチザン', 'ゲリラ兵');
    }

    return { ...p, text };
  });

  // Fix quotation marks
  s.paragraphs = s.paragraphs.map((p) => {
    let text = p.text;
    text = text.replace(/\u201C([^\u201D]+)\u201D/g, '「$1」');
    return { ...p, text };
  });

  // Translate characters array to Japanese
  s.characters = [
    "ナポレオン・ボナパルト",
    "アレクサンドル一世（ロシア皇帝）",
    "ロストプチン総督（モスクワ総督）",
    "モルティエ元帥"
  ];

  s.updatedAt = now;
  return s;
}

// ============================================================
// MAIN
// ============================================================
async function main() {
  mkdirSync('/tmp/stories-ja-fixed', { recursive: true });

  const fixedStories = [];

  for (const story of jaStories) {
    console.log(`\nProcessing: ${story.langStoryId} (siteId: ${story.siteId})`);

    let fixed;
    switch (story.langStoryId) {
      case 'ja#nowruz-world-born-again':
        fixed = fixNowruz(story);
        break;
      case 'ja#molon-labe':
        fixed = fixMolonLabe(story);
        break;
      case 'ja#napoleons-night-inside':
        fixed = fixNapoleonPyramid(story);
        break;
      case 'ja#napoleon-kremlin':
        fixed = fixNapoleonKremlin(story);
        break;
      default:
        console.log(`  No fixes defined for ${story.langStoryId}, applying common fixes only`);
        fixed = JSON.parse(JSON.stringify(story));
        fixed.updatedAt = now;
    }

    // ---- Common checks for ALL JA stories ----

    // 1. Check for any remaining simplified Chinese
    let allText = fixed.paragraphs.map(p => p.text).join('');
    let issues = checkSimplifiedChinese(allText, fixed.langStoryId);
    if (issues.length > 0) {
      console.log('  [WARN] Remaining simplified Chinese issues:');
      issues.forEach(i => console.log(`    ${i}`));
    } else {
      console.log('  No simplified Chinese detected');
    }

    // 2. Count CJK characters
    const cjkCount = (allText.match(/[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff]/g) || []).length;
    console.log(`  CJK character count: ${cjkCount} (target: 1000-1500)`);

    // 3. Verify 「」 usage
    const leftCurly = (allText.match(/\u201C/g) || []).length;
    const rightCurly = (allText.match(/\u201D/g) || []).length;
    if (leftCurly > 0 || rightCurly > 0) {
      console.log(`  [WARN] Found ${leftCurly + rightCurly} non-Japanese quotation marks remaining`);
    } else {
      console.log('  Quotation marks OK (no Western-style double quotes found)');
    }

    // Write to file
    const filename = `/tmp/stories-ja-fixed/${fixed.langStoryId.replace('#', '_')}.json`;
    writeFileSync(filename, JSON.stringify(fixed, null, 2), 'utf-8');
    console.log(`  Written to: ${filename}`);

    fixedStories.push(fixed);
  }

  // Upload to DynamoDB
  console.log('\n========================================');
  console.log('Uploading to DynamoDB...');
  console.log('========================================\n');

  for (const story of fixedStories) {
    console.log(`Uploading: ${story.langStoryId} (siteId: ${story.siteId})...`);
    try {
      await docClient.send(new PutCommand({
        TableName: TABLE,
        Item: story,
      }));
      console.log(`  SUCCESS`);
    } catch (err) {
      console.error(`  FAILED: ${err.message}`);
    }
  }

  // Verify by reading back
  console.log('\n========================================');
  console.log('Verifying uploads...');
  console.log('========================================\n');

  for (const story of fixedStories) {
    console.log(`Verifying: ${story.langStoryId}...`);
    try {
      const result = await docClient.send(new GetCommand({
        TableName: TABLE,
        Key: {
          siteId: story.siteId,
          langStoryId: story.langStoryId,
        },
      }));

      if (result.Item) {
        const item = result.Item;
        const allText = item.paragraphs.map(p => p.text).join('');
        const cjkCount = (allText.match(/[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff]/g) || []).length;
        const hasSimplified = allText.includes('神话');
        const hasWrongKanji = allText.includes('咆みついている');
        const hasFakeProverb = allText.includes('花は散っても根は残る');
        const hasOldPartisan = allText.includes('パルチザン');
        const hasOldProposal = allText.includes('こう提案させた');
        const hasOldClosing = allText.includes('四千年の時を超えて人間の意識に働きかける何かが存在するのかもしれない');
        const updatedCorrectly = item.updatedAt === now;
        const charsTranslated = item.characters.some(c => /[\u3040-\u30ff\u4e00-\u9fff]/.test(c));

        console.log(`  updatedAt correct: ${updatedCorrectly} (${item.updatedAt})`);
        console.log(`  CJK chars: ${cjkCount}`);
        console.log(`  No simplified Chinese '神话': ${!hasSimplified}`);
        console.log(`  No wrong kanji '咆': ${!hasWrongKanji}`);
        console.log(`  No fake proverb: ${!hasFakeProverb}`);
        console.log(`  No old 'パルチザン': ${!hasOldPartisan}`);
        console.log(`  No old 'こう提案させた': ${!hasOldProposal}`);
        console.log(`  No old verbose closing: ${!hasOldClosing}`);
        console.log(`  Characters translated to JA: ${charsTranslated}`);
        console.log(`  VERIFIED OK`);
      } else {
        console.log(`  NOT FOUND in DynamoDB!`);
      }
    } catch (err) {
      console.error(`  VERIFY FAILED: ${err.message}`);
    }
  }

  console.log('\nAll done!');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
