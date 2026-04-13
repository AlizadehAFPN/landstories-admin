import { readFileSync } from 'node:fs';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb';

// ─── Load .env ───────────────────────────────────────
const env = {};
let envFile;
try { envFile = readFileSync('.env', 'utf-8'); }
catch { envFile = readFileSync('.env.local', 'utf-8'); }
for (const line of envFile.split('\n')) {
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

// ─── Base fields (unchanged from English original) ───
const base = {
  siteId: 'neuschwanstein-castle',
  storyId: 'madness-of-king-ludwig',
  icon: '\u{1F451}',
  tier: 'S',
  source: 'McIntosh, Christopher. The Swan King: Ludwig II of Bavaria, 2012; Blunt, Wilfrid. The Dream King, 1970; Bavarian State Archives',
  characters: [
    'King Ludwig II of Bavaria',
    'Richard Wagner',
    'Bavarian ministers',
    'Dr. Bernhard von Gudden',
  ],
  era: '19th century (1864-1886)',
  readingTimeMinutes: 3,
  image: '',
  disabled: false,
  thumbnail: '',
  hasAudio: false,
  isFree: true,
  storyCategory: 'lost_found',
  coordinates: { lat: 47.5576, lng: 10.7498 },
  updatedAt: now,
};

// ═════════════════════════════════════════════════════════
//  CHINESE  (zh) — Simplified Mandarin
//  Register: modern storytelling (popular podcast / WeChat)
//  Proverb: 事不过三 — subverted around the three castles
// ═════════════════════════════════════════════════════════
const zhItem = {
  ...base,
  lang: 'zh',
  langStoryId: 'zh#madness-of-king-ludwig',

  title: `疯王路德维希`,

  subtitle: `他不要权力，只要美——于是用石头建了一个童话，直到王国容不下他`,

  excerpt: `1864年，十八岁的路德维希成了巴伐利亚国王。他高大英俊，却对权力毫无兴趣。他想要的只有音乐——他给作曲家瓦格纳写了一封像情书一样的信，从此开始了历史上最疯狂也最动人的执念。`,

  moralOrLesson: `世界会惩罚那些选择美而放弃权力的人——但他们的作品，比每一个审判过他们的王座都活得更久。`,

  paragraphs: [
    { text: `1864年，十八岁的路德维希二世成了巴伐利亚国王。他高大英俊，却对权力毫无兴趣。他真正想要的是音乐。登基没几个星期，他就给作曲家理查德\u00B7瓦格纳写了一封信，语气像极了情书：\u201C我要永远替你卸下生活的重担。你对我来说就是神。\u201D他十八岁，瓦格纳五十一岁。这段关系从第一天起就注定疯狂——但也注定动人。` },

    { text: `路德维希把巴伐利亚的国库一股脑倒进了瓦格纳的才华里。他替瓦格纳还清了所有债务，出资建造了瓦格纳梦想了几十年的拜罗伊特节日剧院，还专门安排私人歌剧演出——观众只有一个人，就是他自己。他独自坐在漆黑的慕尼黑剧院里，听着音乐流泪。政客们气疯了，逼着瓦格纳离开了慕尼黑。但路德维希的心从没动摇过。一个连国事都懒得理的国王，却愿意为一段旋律翻天覆地。` },

    { text: `现实让他失望透顶，他就自己造一个世界。三座梦幻城堡，一座比一座离谱。林德霍夫宫有一个地下溶洞，他坐在金色小船上漂浮在隐秘的湖面，洞壁回荡着瓦格纳的音乐。海伦基姆湖宫是凡尔赛宫的等比复制品，建在一座湖心岛上，镜厅比原版还长。而新天鹅堡——悬在阿尔卑斯山的悬崖上——整座城堡就是瓦格纳歌剧的实景舞台。` },

    { text: `路德维希的行为一年比一年古怪。他把白天黑夜完全颠倒，凌晨三点坐着金色雪橇、在火把照耀下穿过森林。他给根本不存在的客人摆好餐具——路易十四、玛丽\u00B7安托瓦内特，早已死去的法国王室——然后对着空椅子聊上一整顿饭。他还画过飞行器的草图，设计过一座建在石柱顶端、只能坐热气球到达的城堡。两样东西都没造出来。` },

    { text: `1886年6月8日，四位从未当面检查过路德维希的精神科医生联名宣布他精神失常。两天后，官员来新天鹅堡逮捕他。卫兵赶走了第一批人，有那么几个小时，这个国王像自己传说里的角色一样守住了城堡。但第二批人得手了。路德维希被剥夺王位，押送到施塔恩贝格湖畔的贝格堡。那个用石头建造童话的人，自己成了囚徒。` },

    { text: `三天后，6月13日傍晚，路德维希和他的精神科医生古登博士沿湖散步。两个人都没有回来。当晚，人们在浅水区发现了他们的遗体。路德维希年仅四十岁。官方结论是溺亡——但发现遗体的那片水域还不到腰深，而路德维希本人是个游泳好手。到底发生了什么，至今没有人说得清。这个谜困扰了巴伐利亚一百多年。` },

    { text: `今天，每年有一百四十万人来到新天鹅堡。华特\u00B7迪士尼当年看到它，把它做成了迪士尼乐园睡美人城堡的原型。那座让国王被关进牢笼的童话城堡，成了全世界最有名的城堡。都说事不过三——路德维希偏偏建了三座，第三座还没完工，巴伐利亚的耐心就到了头。但那些赶他下台的大臣早已无人记得，他的政府不过是历史的注脚。而他们拼命要毁掉的那个梦呢？至今还立在阿尔卑斯山的悬崖上。他们说他疯了，因为他选了美而不是权力。最后，世界证明了他是对的。` },
  ],
};

// ═════════════════════════════════════════════════════════
//  JAPANESE  (ja) — Modern Japanese
//  Register: NHK documentary / popular nonfiction
//  Proverb: 仏の顔も三度まで — subverted around three castles
// ═════════════════════════════════════════════════════════
const jaItem = {
  ...base,
  lang: 'ja',
  langStoryId: 'ja#madness-of-king-ludwig',

  title: '狂王ルートヴィヒ二世',

  subtitle: '権力より美を選んだ王は、石で童話を築き、そして国に奪われた',

  excerpt: '1864年、わずか十八歳でバイエルン王になったルートヴィヒ二世。長身で端正な容姿を持ちながら、権力にはまるで興味がなかった。彼が求めたのは音楽だった。作曲家ワーグナーに送った手紙はまるでラブレターだった——こうして、歴史上もっとも無謀で美しい執着が始まった。',

  moralOrLesson: '美を選んだ者を、世界は罰する——だがその創造物は、彼を裁いたすべての王座より長く残り続ける。',

  paragraphs: [
    { text: '1864年、ルートヴィヒ二世はわずか十八歳でバイエルン国王になった。長身で黒髪、端正な容姿の持ち主だったが、権力にはまるで関心がなかった。彼が本当に欲しかったのは音楽だ。即位からわずか数週間後、作曲家リヒャルト・ワーグナーに手紙を送った。その文面はまるでラブレターだった。「あなたの肩から日々の重荷を永遠に取り除きたい。あなたは私にとって神です」。十八歳の王が五十一歳の作曲家に宛てた言葉である。歴史上もっとも無謀で、もっとも美しい執着の始まりだった。' },

    { text: 'ルートヴィヒはバイエルンの国庫をワーグナーの才能に注ぎ込んだ。借金をすべて肩代わりし、ワーグナーが何十年も夢見ていたバイロイト祝祭劇場の建設を支援した。さらに、観客がたった一人——自分だけのプライベートオペラ公演まで手配した。暗い劇場に独りで座り、音楽を聴きながら涙を流す王。政治家たちは激怒し、ワーグナーをミュンヘンから追放した。しかしルートヴィヒの献身は揺るがなかった。国政に見向きもしない王が、一つの旋律のためなら天地をひっくり返した。' },

    { text: '現実に裏切られた王は、自分だけの世界を造り始めた。三つの幻想の城。一つ目より二つ目、二つ目より三つ目と、壮大さは増していった。リンダーホーフ宮殿には地下洞窟があり、王は金色の小舟に乗って秘密の湖に漂い、岩壁にワーグナーの音楽が反響した。ヘレンキームゼー宮殿は湖の島に建てられたヴェルサイユ宮殿の実物大レプリカで、鏡の間は本物より長い。そしてノイシュヴァンシュタイン城——アルプスの断崖に聳えるその城は、まるごとワーグナーのオペラの舞台装置だった。' },

    { text: 'ルートヴィヒの振る舞いは年を追うごとに常軌を逸していった。昼と夜を完全に逆転させ、真夜中の三時に松明に照らされながら金の橇で森を駆け抜けた。存在しない客のために食卓を整えた——ルイ十四世やマリー・アントワネットなど、とうの昔に世を去ったフランス王族を招き、空の椅子に向かって食事中ずっと語りかけた。空飛ぶ機械の設計図を描き、気球でしか辿り着けない岩柱の上の城も構想した。どちらも実現しなかった。' },

    { text: '1886年6月8日、ルートヴィヒを一度も直接診察したことのない四人の精神科医が、彼を精神異常と宣告した。二日後、官吏たちがノイシュヴァンシュタイン城に王を拘束しに来た。衛兵が最初の一団を追い返し、数時間だけ、王は自分の伝説の登場人物のように城を守り抜いた。だが二度目の試みは成功した。ルートヴィヒは王位を剥奪され、シュタルンベルク湖畔のベルク城に連行された。童話を石で築き上げた男が、囚われの身になった。' },

    { text: '三日後の6月13日、夕暮れどき。ルートヴィヒと主治医のグッデン博士が湖畔を散歩に出た。二人とも戻ってこなかった。その夜、浅瀬で遺体が発見された。ルートヴィヒは四十歳だった。公式には溺死とされた。だが遺体が見つかった場所の水深は腰ほどしかなく、ルートヴィヒは泳ぎが達者だった。何が起きたのか、誰にも説明できない。この謎は百年以上、バイエルンに影を落とし続けている。' },

    { text: '今日、ノイシュヴァンシュタイン城には年間百四十万人が訪れる。ウォルト・ディズニーはこの城を目にし、ディズニーランドの眠れる森の美女の城のモデルにした。王を牢に閉じ込めるきっかけとなった童話の城が、世界でもっとも有名な城になった。「仏の顔も三度まで」と言うが、ルートヴィヒは三つの城を建て、三つ目でついに国の堪忍袋の緒が切れた。だが皮肉なことに、彼を引きずり下ろした大臣たちの名前は誰も覚えていない。彼の政府は歴史の脚注にすぎない。しかし、彼らが潰そうとした夢は——今もアルプスの断崖に立っている。美を選んだから狂気だと言われた。だが最後に正しかったのは、この王のほうだった。' },
  ],
};

// ─── Push & Verify ───────────────────────────────────
async function pushAndVerify(item, lang) {
  console.log(`\nPushing ${lang}...`);
  await docClient.send(new PutCommand({ TableName: TABLE, Item: item }));
  console.log(`  \u2705 ${lang} put-item succeeded`);

  const { Item: saved } = await docClient.send(new GetCommand({
    TableName: TABLE,
    Key: { siteId: item.siteId, langStoryId: item.langStoryId },
  }));

  if (!saved) throw new Error(`${lang} verification failed \u2014 item not found`);
  console.log(`  \u2705 ${lang} verified \u2014 title: "${saved.title}"`);
  console.log(`  \u2705 ${lang} paragraphs: ${saved.paragraphs.length}`);
  console.log(`  \u2705 ${lang} updatedAt: ${saved.updatedAt}`);
}

try {
  await pushAndVerify(zhItem, 'zh');
  await pushAndVerify(jaItem, 'ja');
  console.log('\n\uD83C\uDF89 All done \u2014 both languages pushed and verified.');
} catch (err) {
  console.error('\n\u274C Error:', err.message);
  process.exit(1);
}
