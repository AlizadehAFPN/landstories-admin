// Push Chinese (zh) and Japanese (ja) recreations of
// "The Ten Thousand Immortals" (ten-thousand-immortals)
// to the Story table.

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (identical across both languages) ────────────────────────
const shared = {
  siteId: "persepolis",
  storyId: "ten-thousand-immortals",
  icon: "\uD83D\uDEE1\uFE0F",
  storyCategory: "crowns_conquests",
  tier: "A",
  isFree: true,
  isFeatured: true,
  hasAudio: false,
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 29.9342, lng: 52.8914 },
  source: `Herodotus, Histories VII.41, VII.61, VII.83, VII.211, VII.218; Arrian, Anabasis Alexandri 3.11.5; Shahbazi, A. Sh., 'Army i. Pre-Islamic Iran,' Encyclopaedia Iranica; Briant, Pierre, From Cyrus to Alexander (2002); Sekunda, Nicholas, The Persian Army 560-330 BC (Osprey, 1992); Root, Margaret Cool, The King and Kingship in Achaemenid Art (1979)`,
  updatedAt: now,
};

// ═════════════════════════════════════════════════════════════════════════════
// CHINESE (zh) — Modern Mandarin · Simplified · WeChat/podcast register
//
// Register: like a popular Chinese podcast host telling a gripping historical
// story — think 得到 or 看理想. Conversational, punchy, modern.
//
// Proverb: 事不过三
// (Things don't go past three)
// Subversion: The West only remembers 三百 (three hundred) — as if history
// itself follows the rule of three. The ten thousand who actually won?
// Nobody even mentions their names.
// ═════════════════════════════════════════════════════════════════════════════

const zh = {
  ...shared,
  lang: "zh",
  langStoryId: "zh#ten-thousand-immortals",

  title: `不死军团`,

  subtitle: `披金戴银、永不倒下的战士，与那场翻越群山改写历史的暗夜行军`,

  excerpt: `他们被称为\u201c不死军\u201d，不是因为刀枪不入，而是因为每倒下一个人，另一个人会立刻补上，部队永远是整整一万人\u2014\u2014永远完整，永远不灭。`,

  moralOrLesson: `温泉关的故事，在西方是关于三百斯巴达人的传说\u2014\u2014但真正的故事，是一万波斯人在黑暗中翻越山林，把僵局变成了胜利。不死军没有输掉温泉关，他们赢了。他们输掉的，是叙事权。`,

  era: `公元前550\u2013330年；温泉关之战，公元前480年`,

  characters: [
    `许达尔尼斯（温泉关之战不死军指挥官）`,
    `薛西斯一世（波斯大王）`,
    `列奥尼达斯（斯巴达国王）`,
    `厄菲阿尔特斯（叛徒）`,
    `苹果持有者（梅洛弗罗伊）`,
  ],

  paragraphs: [
    {
      text: `想象一下，一万个士兵，浑身上下都是真金\u2014\u2014金手镯、金耳环、长矛上挂着金坠子。他们穿着紫色和藏红花色的长袍，底下藏着鳞甲。弓箭射程两百五十米。最核心的一千人叫\u201c苹果持有者\u201d，手里的矛顶端是金石榴，其余人的是银的。这就是波斯不死军\u2014\u2014古代世界最精锐的部队，还没开打，光站在那儿就能把你吓到腿软。`,
    },
    {
      text: `他们为什么叫\u201c不死军\u201d？因为一个绝妙的障眼法。只要有人死了\u2014\u2014战死、病死、怎么死的都算\u2014\u2014替补立刻顶上。部队永远是整整一万人，不多不少。站在对面看过去，这些人好像根本杀不死。你亲眼看一个倒下去，另一个立刻出现在原地，好像死亡对他们不起作用。也有历史学家说，其实是希腊人听错了\u2014\u2014波斯语里\u201c同伴\u201d跟\u201c不死者\u201d发音太像。但管它呢，这名号一叫就是两千多年。`,
    },
    {
      text: `他们最高光的时刻？温泉关，公元前480年\u2014\u2014没错，就是电影\u300a300\u300b里那场仗。但电影没告诉你的是：波斯大王薛西斯入侵希腊，七千希腊士兵堵在一条窄得要命的海岸隘道里，最窄处只有十五米。不死军冲上去了，被打了回来。不是他们打得差，是那地形直接废了他们所有优势。没法射箭，人多也没用，只能跟更厚的铠甲和更长的矛肉搏。`,
    },
    {
      text: `但不死军没有输掉温泉关。他们赢了。一个叫厄菲阿尔特斯的希腊叛徒\u2014\u2014这名字在希腊语里就是\u201c噩梦\u201d\u2014\u2014偷偷告诉薛西斯，后山有条秘道能绕到希腊军背后。薛西斯二话不说，把全部一万不死军都派了上去。天黑之后出发，穿过橡树林，在完全的黑暗中翻过山顶，避开守军，天一亮就出现在希腊人身后。一万人，黑夜，群山，一声不响\u2014\u2014古代军事史上最精彩的行军之一。`,
    },
    {
      text: `希腊人发现不死军已经出现在身后时，一切都结束了。斯巴达王列奥尼达斯让大部分盟军撤了，自己带着三百斯巴达勇士和大约一千志愿者做最后的抵抗。先用矛，矛断了用剑，剑没了就赤手空拳。但胜负在不死军完成行军的瞬间就已注定。都说事不过三\u2014\u2014西方人偏偏只记住了那三百个人。三百死士，名垂千古。一万胜者？连个名字都没人提。`,
    },
    {
      text: `在波斯波利斯\u2014\u2014波斯帝国的礼仪之都，今天的伊朗境内\u2014\u2014不死军的形象被刻在巨大的台阶两侧。一排接一排，一模一样的战士，长矛笔直竖着，一直延伸到墙的尽头。这种重复本身就是宣言。一个士兵让人敬畏。一万个一模一样的士兵？你看到的已经不是一支军队，而是一台机器。`,
    },
    {
      text: `今天，石刻上的不死军卫士是伊朗文化中最具辨识度的符号之一\u2014\u2014货币、邮票、首饰、全世界伊朗家庭的墙上，到处是他们的身影。电影\u300a300\u300b把他们变成没有脸的怪物时，伊朗人怒了。不是因为一部电影，而是因为西方几百年来一直把一个修建了从埃及到印度的大道的文明，硬塞进\u201c反派\u201d的模子里。不死军不是什么无脑暴徒。他们是佩戴黄金的骄傲战士，把为王而战视为至高的荣耀。`,
    },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// JAPANESE (ja) — Modern Japanese · NHK documentary / popular nonfiction
//
// Register: the voice of a compelling NHK documentary narrator or popular
// nonfiction author. Clear, authoritative, but never dry. Draws you in.
//
// Proverb: 仏の顔も三度
// (Even Buddha loses patience after three times)
// Subversion: The Immortals were pushed back once — just once — and didn't
// wait for a second or third attempt. They went over the mountain instead.
// More decisive than even Buddha's patience allows.
// ═════════════════════════════════════════════════════════════════════════════

const ja = {
  ...shared,
  lang: "ja",
  langStoryId: "ja#ten-thousand-immortals",

  title: `不死の軍団`,

  subtitle: `黄金の戦士たちはなぜ死ななかったのか\u2014\u2014テルモピュライを本当に制したのは誰だったのか`,

  excerpt: `彼らが\u300c不死隊\u300dと呼ばれたのは、不死身だったからではない。一人が倒れるたびに、別の一人が即座にその場に立った。だから部隊は常にちょうど一万人\u2014\u2014常に完全で、常に不滅だった。`,

  moralOrLesson: `テルモピュライの物語は、西洋では300人のスパルタ兵の伝説として語られる。だが本当の物語は、一万人のペルシア兵が闇の山中を越え、膠着状態を勝利に変えたことだ。不死隊はテルモピュライで負けたのではない。勝ったのだ。彼らが失ったのは、語られる側の権利だった。`,

  era: `紀元前550\u301c330年；テルモピュライの戦い、紀元前480年`,

  characters: [
    `ヒュダルネス（テルモピュライの不死隊指揮官）`,
    `クセルクセス1世（ペルシア大王）`,
    `レオニダス（スパルタ王）`,
    `エピアルテス（裏切り者）`,
    `リンゴの持ち手（メロフォロイ）`,
  ],

  paragraphs: [
    {
      text: `一万人の兵士が、全身を本物の金で覆っている光景を想像してほしい。金のブレスレット、金のイヤリング、槍に付いた金の飾り。紫とサフランの衣の下には鱗状の鎧が隠されていた。弓の射程は250メートル。中でも最精鋭の千人は\u300cリンゴの持ち手\u300dと呼ばれ、先端に金のザクロがついた槍を手にしていた。残りの槍飾りは銀だ。これがペルシアの不死隊\u2014\u2014古代世界最強の精鋭部隊であり、戦いが始まる前に相手の戦意を砕くために存在した。`,
    },
    {
      text: `\u300c不死隊\u300dの名には仕掛けがある。一人が倒れると\u2014\u2014戦死でも病死でも\u2014\u2014補充兵がすぐに入る。部隊の人数は常にちょうど一万人。一人たりとも欠けない。戦場の向こう側から見れば、まるで殺せない兵士たちだった。一人が倒れた瞬間、同じ場所に別の兵士が立っている。死が、彼らだけを素通りしているかのように。一説では、ペルシア語の\u300c仲間\u300dがギリシア人の耳には\u300c不死者\u300dに聞こえた誤訳だったとも言われる。どちらにせよ、\u300c不死隊\u300dの名は2500年経った今も残っている。`,
    },
    {
      text: `彼らの最大の見せ場は、紀元前480年のテルモピュライの戦いだ。映画\u300e300\u300fで有名なあの戦い\u2014\u2014ただし、映画が語らなかった部分がある。ペルシア大王クセルクセスがギリシアに侵攻したとき、7000人のギリシア兵が\u300c熱い門\u300dと呼ばれる幅わずか15メートルの隘路に陣取っていた。不死隊は突撃し、押し返された。弱かったからではない。あの狭さが、すべての強みを殺したのだ。弓は撃てない。数の優位も意味がない。重装備の相手との接近戦だけが残った。`,
    },
    {
      text: `だが不死隊は、テルモピュライで敗れたのではない。勝ったのだ。エピアルテスというギリシア人の裏切り者が\u2014\u2014その名はギリシア語で\u300c悪夢\u300dを意味する\u2014\u2014ギリシア軍の背後に回れる山道の存在をクセルクセスに密告した。クセルクセスは一万の不死隊すべてをその道に送り込んだ。日没後に出発し、闇の中でオークの森を抜け、山頂の見張りをかわし、夜明けとともにギリシア軍の背後に姿を現した。一万人が、闇の山中を音もなく越えた\u2014\u2014古代軍事史に残る屈指の作戦行動だ。`,
    },
    {
      text: `不死隊が背後に回ったと知ったとき、勝負はすでについていた。スパルタ王レオニダスは同盟軍の大半を退却させ、300人のスパルタ兵と約1000人の志願兵で最後の抵抗に臨んだ。槍が折れるまで戦い、次は剣で、最後は素手で。だが結果は、不死隊があの行軍を終えた瞬間に決まっていた。\u300c仏の顔も三度\u300dと言うが、不死隊は一度退けられただけで、二度目も三度目も待たなかった。山を越えるという、誰にも読めなかった一手を打った。西洋は死んだ300人を語り継いでいる。勝った一万人のことは、ほとんど誰も語らない。`,
    },
    {
      text: `ペルセポリス\u2014\u2014現在のイランにあるペルシア帝国の儀式の都\u2014\u2014では、巨大な階段の壁面に不死隊が彫り込まれている。一列また一列、まったく同じ姿の戦士が槍をまっすぐに構え、壁の端から端まで続いている。この反復こそがメッセージだ。一人の兵士は畏敬の対象になる。一万人の同じ兵士は、もはや宣言だ。目の前にあるのは軍隊ではない。機械だ。`,
    },
    {
      text: `今日、この石に刻まれた不死隊の衛兵像は、イラン文化で最も知られたシンボルの一つだ。紙幣、切手、アクセサリー、世界中のイラン人家庭の壁\u2014\u2014あらゆる場所にその姿がある。映画\u300e300\u300fが彼らを顔のない怪物に変えたとき、イランは怒った。映画一本に対してではない。エジプトからインドまで道路を敷いた文明を、何世紀にもわたって単なる悪役に貶めてきた西洋の視線に対してだ。不死隊は烏合の衆ではなかった。誇り高き黄金の戦士たちであり、王に仕えることこそ最高の名誉だと信じていた。`,
    },
  ],
};

// ─── Validation & Push ──────────────────────────────────────────────────────

const stories = [
  { label: "Chinese (zh)", data: zh },
  { label: "Japanese (ja)", data: ja },
];

for (const { label, data } of stories) {
  // Character count validation
  let totalChars = 0;
  for (let i = 0; i < data.paragraphs.length; i++) {
    const text = data.paragraphs[i].text;
    if (!text || text.trim() === "") {
      console.error(`\u274c ${label}: Paragraph ${i + 1} has empty text`);
      process.exit(1);
    }
    totalChars += text.length;
    console.log(`  P${i + 1}: ${text.length} chars`);
  }
  console.log(`  Total: ${totalChars} chars (target: 1000-1500 for CJK)`);

  if (totalChars < 800 || totalChars > 1800) {
    console.error(
      `\u274c ${label}: Total chars ${totalChars} outside acceptable range (800-1800)`
    );
    process.exit(1);
  }

  try {
    await doc.send(new PutCommand({ TableName: TABLE, Item: data }));
    console.log(`\u2705 ${label} pushed successfully (${data.langStoryId})\n`);
  } catch (err) {
    console.error(`\u274c ${label} FAILED:`, err.message);
    process.exit(1);
  }
}

console.log("Both CJK stories pushed to Story table.");
