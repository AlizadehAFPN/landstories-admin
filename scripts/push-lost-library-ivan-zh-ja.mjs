import { readFileSync } from 'node:fs';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

// ─── Load .env.local ─────────────────────────────────────
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

// ─── Non-text fields (from English original) ─────────────
const base = {
  siteId: 'moscow-kremlin',
  storyId: 'lost-library-ivan',
  icon: '\u{1F4DA}',
  tier: 'A',
  source: "Johann Wetterman's account (c. 1570), Professor Stelletsky's research (1894-1930s), Byzantine marriage records",
  era: '1472 - present',
  readingTimeMinutes: 2,
  image: '',
  disabled: false,
  thumbnail: '',
  coordinates: { lng: 37.6175, lat: 55.752 },
  hasAudio: false,
  isFree: true,
  storyCategory: 'riddles_past',
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════
//  CHINESE (zh) — 被封死的图书馆
//  Proverb: 欲盖弥彰 (the more you cover up, the more obvious it becomes)
//  — subverted: Stalin sealed the tunnels to bury the secret,
//    but by doing so made the legend even more irresistible.
//    The proverb is invoked and simultaneously defied.
// ═══════════════════════════════════════════════════════════
const zh = {
  lang: 'zh',
  langStoryId: 'zh#lost-library-ivan',
  title: `被封死的图书馆`,
  subtitle: `它可能藏着人类文明遗失的一章`,
  excerpt: `1472年，一个拜占庭公主远嫁莫斯科。她叫索菲亚\u00B7帕列奥洛格，是拜占庭末代皇帝的侄女。她带来的嫁妆不是金银珠宝，而是几百卷古希腊和拉丁文手稿\u2014\u2014据说是君士坦丁堡陷落前从皇家图书馆抢救出来的最后遗存。`,
  moralOrLesson: `最伟大的宝藏，往往被守护它的力量亲手埋葬`,
  characters: [
    '伊凡三世',
    '索菲亚\u00B7帕列奥洛格',
    '伊凡雷帝',
    '菲奥拉万蒂',
    '韦特曼',
    '斯特列茨基教授',
    '斯大林',
  ],
  paragraphs: [
    {
      text: `1472年，一个拜占庭公主远嫁莫斯科。她叫索菲亚\u00B7帕列奥洛格，是拜占庭末代皇帝的侄女。她带来的嫁妆不是金银珠宝，而是几百卷古希腊和拉丁文手稿\u2014\u2014据说是君士坦丁堡陷落前从皇家图书馆抢救出来的最后遗存。荷马的史诗、亚里士多德的哲学、西塞罗的雄辩，整个西方世界以为早已灰飞烟灭的东西，就这么装在箱子里悄悄运进了俄罗斯。`,
    },
    {
      text: `她的丈夫伊凡三世深知这批文献的价值。莫斯科当时还是一座木头城市，三天两头闹火灾，一场大火就能抹掉一个街区。于是他请来意大利建筑师菲奥拉万蒂\u2014\u2014就是设计了克里姆林宫圣母升天大教堂的那位\u2014\u2014在克宫地下修建了一座密封地窖，把所有手稿锁了进去。几个世纪积累的人类智慧，从此深埋在俄罗斯的心脏之下，与地面上的烈火永远隔绝。`,
    },
    {
      text: `让这座图书馆真正成为传奇的，是伊凡三世的孙子\u2014\u2014伊凡四世，也就是大名鼎鼎的\u201C伊凡雷帝\u201D。这个人在历史上以残暴著称，但同时是个不折不扣的书痴。他往地窖里又塞了几百卷书，包括炼金术和犹太神秘主义的珍本。大约在1570年，一个叫韦特曼的德国牧师声称亲眼看过这座图书馆，他说那些卷轴\u201C无法用世上任何财宝来衡量\u201D。`,
    },
    {
      text: `1584年，伊凡雷帝死了。然后，图书馆就消失了。`,
    },
    {
      text: `没人知道到底发生了什么。伊凡雷帝晚年越来越偏执多疑，身边的人一个接一个被处死。他很可能亲手封死了地窖入口，把秘密带进了坟墓。也有人说，1598到1613年俄罗斯那场惨烈的内战\u2014\u2014\u201C混乱时代\u201D\u2014\u2014中，知道地窖位置的人全都在战乱中丧了命，线索就此中断。还有人猜测，莫斯科没完没了的大火最终把一切化为灰烬。但多个目击者的证词和拜占庭的档案都指向同一个结论：这座图书馆确实存在过。`,
    },
    {
      text: `从此以后，寻找它的人就没断过。1724年，彼得大帝派出搜索队深入克宫地下，一无所获。1894年，一位叫斯特列茨基的教授把自己整个职业生涯都押在了这件事上\u2014\u2014他花了几十年在克宫地下绘制隧道地图，发表研究，四处呼吁，直到苏联政府强行叫停了他的一切活动。再然后是1930年代，斯大林下令进行一次秘密搜索。他的人顺着地下通道一路向下，发现了通往更深处的隧道。`,
    },
    {
      text: `都说欲盖弥彰，可斯大林偏不信这个邪。他听到报告后的反应是：用水泥把那些隧道统统灌死。想想看\u2014\u2014苏联最有权力的人，找到了可能通向人类历史上最伟大失落图书馆的地下通道，结果他没有派人继续探索，而是选择永远封死它。那下面到底有什么东西，能比\u201C不知道\u201D更让他害怕？`,
    },
    {
      text: `直到今天，克里姆林宫某些区域的地下仍然严禁开挖。如果这座图书馆还在，它就躺在地球上守卫最森严的地方之一，被几个世纪的秘密、几千吨水泥和层层国家安全机构死死压在下面。有人相信，当这座图书馆最终重见天日的那一天，世人发现的不只是一堆积满灰尘的旧书\u2014\u2014而是人类文明遗失已久的那一章。`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════
//  JAPANESE (ja) — 封印された図書館
//  Proverb: 仏の顔も三度 (even Buddha loses patience after three times)
//  — subverted: three attempts to find the library (Peter the Great,
//    Stelletsky, Stalin) were each thwarted, as if whatever guards
//    the secret bared its fangs on the third and final attempt.
// ═══════════════════════════════════════════════════════════
const ja = {
  lang: 'ja',
  langStoryId: 'ja#lost-library-ivan',
  title: `封印された図書館`,
  subtitle: `人類文明の失われた一章がここに眠る`,
  excerpt: `1472年、ひとりのビザンツ帝国の王女がモスクワに嫁いだ。ソフィア・パレオロギナ\u2014\u2014ビザンツ最後の皇帝の姪だ。彼女が持参した嫁入り道具は、金でも宝石でもなかった。数百巻にのぼる古代ギリシャ語とラテン語の写本。コンスタンティノープルの伝説の図書館から受け継がれた、おそらく最後の遺産。`,
  moralOrLesson: `最も偉大な宝は、それを守るべき力の手で封じられる`,
  characters: [
    'イヴァン三世',
    'ソフィア・パレオロギナ',
    'イヴァン雷帝',
    'フィオラヴァンティ',
    'ヨハン・ヴェッターマン',
    'ステレツキー教授',
    'スターリン',
  ],
  paragraphs: [
    {
      text: `1472年、ひとりのビザンツ帝国の王女がモスクワに嫁いだ。ソフィア・パレオロギナ\u2014\u2014ビザンツ最後の皇帝の姪だ。彼女が持参した嫁入り道具は、金でも宝石でもなかった。数百巻にのぼる古代ギリシャ語とラテン語の写本。コンスタンティノープルの伝説の図書館から受け継がれた、おそらく最後の遺産。ホメロス、アリストテレス、キケロの原典\u2014\u2014西洋世界がとうに失われたと信じていたものが、ひそかにロシアへ運ばれた。`,
    },
    {
      text: `夫のイヴァン三世は、この文献の価値をよく理解していた。当時のモスクワは木造の街で、火事は日常茶飯事だった。そこで彼は、クレムリンの大聖堂も手がけたイタリア人建築家フィオラヴァンティに命じ、地下に密封された書庫を造らせた。何世紀にもわたる人類の知の結晶が、ロシアの心臓部の真下に封じ込められた。`,
    },
    {
      text: `この図書館を伝説にしたのは、イヴァン三世の孫\u2014\u2014イヴァン四世、通称\u300C雷帝\u300Dだ。歴史上最も残忍な支配者のひとりとして知られるこの男は、同時に筋金入りの読書家でもあった。錬金術やユダヤ神秘主義の珍本を含む数百冊を書庫に加えた。1570年頃、ドイツ人牧師ヨハン・ヴェッターマンがこの図書館を実際に見たと証言し、\u300C地上のいかなる財宝をもってしても値がつけられない\u300D巻物があったと語っている。`,
    },
    {
      text: `1584年、イヴァン雷帝が死んだ。そして、図書館は消えた。`,
    },
    {
      text: `何が起きたのか、誰にもわからない。晩年のイヴァンは日ごとに猜疑心を募らせていた\u2014\u2014自ら入口を封じ、その場所を墓の中まで持っていった可能性がある。1598年から1613年にかけてロシアを引き裂いた内戦\u300C動乱時代\u300Dの混乱の中で、書庫の場所を知る者が全員命を落としたという説もある。モスクワの絶え間ない大火がすべてを灰にしたと考える人もいる。だが、目撃証言とビザンツの記録は、この図書館が確かに存在したことを物語っている。`,
    },
    {
      text: `以来、探し求める者が絶えたことはない。1724年、ピョートル大帝がクレムリンの地下に調査隊を送った。何も見つからなかった。1894年、ステレツキー教授はこの探索に全キャリアを捧げ、クレムリン地下のトンネルを測量し続けたが、ソビエト政府に中止させられた。そして1930年代、独裁者スターリンが極秘の捜索を命じた。彼の部下たちは、さらに深部へと続くトンネルを発見した。`,
    },
    {
      text: `\u300C仏の顔も三度\u300Dというが、この図書館を守る何かは、三度目にして完全に牙をむいた。スターリンの判断は\u2014\u2014そのトンネルをコンクリートで埋めること。考えてみてほしい。ソ連で最も強大な権力を持つ男が、人類史上最大の失われた図書館へ続くかもしれない通路を見つけて、探索するのではなく、永遠に封じたのだ。あの地下に、\u300C知らないままでいること\u300Dよりも恐ろしい何かがあったのだろうか。`,
    },
    {
      text: `今日に至るまで、クレムリンの特定区域の地下を掘ることは禁じられている。もしこの図書館がまだ存在するなら、それは地球上で最も厳重に警備された場所のひとつで、数世紀の秘密と、何千トンものコンクリートと、幾重もの国家安全保障の壁の奥に眠っている。いつかそれが見つかる日が来たなら、出てくるのはただの古い本の束ではないだろう\u2014\u2014人類文明の、失われた一章だ。`,
    },
  ],
};

// ─── Validation (adjusted for CJK) ──────────────────────
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
    totalChars += chars;
    console.log(`  P${i + 1}: ${chars} chars`);
  }

  console.log(`  Total: ${totalChars} chars (target: 1000-1500, acceptable: 800-1800)`);
  if (totalChars < 600 || totalChars > 2000) {
    throw new Error(`[${label}] Total ${totalChars} chars outside acceptable range`);
  }

  // Validate JSON round-trip
  const jsonStr = JSON.stringify(story);
  JSON.parse(jsonStr);
  console.log(`  JSON valid. Size: ${jsonStr.length} bytes`);
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
  console.log(`\u2713 ${label} pushed successfully (langStoryId: ${story.langStoryId})\n`);
}

// ─── Main ────────────────────────────────────────────────
async function main() {
  console.log('=== Validating stories ===\n');

  console.log('--- ZH (Chinese) ---');
  validate(zh);

  console.log('--- JA (Japanese) ---');
  validate(ja);

  console.log('=== Pushing to DynamoDB ===\n');

  await pushStory(zh);
  console.log('--- ZH confirmed. Proceeding to JA... ---\n');

  await pushStory(ja);

  console.log('=== Lost Library of Ivan (ZH + JA) pushed successfully ===');
}

main().catch((err) => {
  console.error('FAILED:', err.message);
  process.exit(1);
});
