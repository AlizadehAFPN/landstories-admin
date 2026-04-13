// Push Chinese (zh) and Japanese (ja) recreations of
// "The Princes in the Tower" to the Story DynamoDB table.

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = "Story";
const now = Math.floor(Date.now() / 1000);

// ─── Shared fields (identical across all languages) ──────────────────────────
const shared = {
  siteId: "tower-of-london",
  storyId: "princes-in-the-tower",
  icon: "\u{1F47B}",
  storyCategory: "ghosts_curses",
  tier: "S",
  isFree: true,
  hasAudio: false,
  readingTimeMinutes: 3,
  image: "",
  thumbnail: "",
  disabled: false,
  coordinates: { lat: 51.5081, lng: -0.0759 },
  source:
    "Sir Thomas More's \"History of King Richard III\", Dominic Mancini's contemporary account, Polydore Vergil's \"Anglica Historia\", 1933 forensic examination report",
  updatedAt: now,
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHINESE (zh)
// Proverb: 螳螂捕蝉，黄雀在后 (The mantis stalks the cicada, unaware of
// the oriole behind) — subverted: Richard III looks like the mantis, but
// after 500 years nobody has figured out who the oriole really was.
// Register: Modern Mandarin, WeChat/podcast storytelling. Punchy, rhythmic,
// conversational. Like a popular Chinese history podcast (看理想 / 大象公会).
// ═══════════════════════════════════════════════════════════════════════════════

const zh = {
  ...shared,
  lang: "zh",
  langStoryId: "zh#princes-in-the-tower",

  title: `塔中王子`,

  subtitle: `英国王室五百年不敢碰的悬案`,

  excerpt: `1483年春天，一个十二岁的男孩成了英格兰国王。爱德华五世刚失去了父亲，他和九岁的弟弟理查被送进伦敦塔——那时候的伦敦塔还不只是监狱，也是王宫。有人见过两个孩子在花园里射箭、玩耍。然后就再也没人见过他们了。`,

  moralOrLesson: `权力能吞噬最无辜的人，而有些真相也许永远找不到——不是因为证据消失了，而是因为有人不允许它被找到`,

  characters: [
    `爱德华五世 - 十二岁的少年国王`,
    `约克公爵理查 - 九岁的弟弟`,
    `理查三世 - 叔父，摄政王变篡位者`,
    `詹姆斯·蒂雷尔爵士 - 被指控的杀手`,
    `伊丽莎白·伍德维尔 - 王子们的母亲`,
    `珀金·沃贝克 - 自称理查王子的冒充者`,
  ],

  era: `1483年 - 玫瑰战争时期`,

  paragraphs: [
    {
      text: `1483年春天，一个十二岁的男孩成了英格兰国王。爱德华五世刚刚失去了父亲，和九岁的弟弟理查一起被送进了伦敦塔。那时候的伦敦塔不只是监狱，它也是王宫。叔叔格洛斯特公爵理查负责摄政，等小国王成年亲政。有人见过两个孩子在塔楼花园里射箭、玩耍。然后，突然就再也没人见过他们了。那年夏天，两个王子就像凭空蒸发——彻底消失了。`,
    },
    {
      text: `叔叔的动作快得惊人。他宣布两个侄子是私生子——理由是他们的父亲爱德华四世在娶他们母亲之前，早就秘密跟别人订了婚，这段婚姻从一开始就无效。两个孩子的继承权一夜之间被抹掉。叔叔顺顺当当给自己戴上了王冠，成为理查三世。消息炸开了整个欧洲。法国首相公开指控理查杀了自己的亲侄子。所有人都在问同一个问题：那两个孩子到底去哪了？`,
    },
    {
      text: `流传最广的说法来自托马斯·莫尔，写于事发三十年后。按他的记载，理查三世派了一个叫詹姆斯·蒂雷尔的骑士进伦敦塔。蒂雷尔雇了两个人，趁兄弟俩熟睡时用枕头活活把他们闷死。据说蒂雷尔在1502年被处决前亲口认了罪。但有个问题——这份供词从没有任何人见过。文件根本不存在。而从这份所谓的供词中获益最大的人是谁呢？新国王亨利七世。`,
    },
    {
      text: `将近两百年后的1674年，工人在伦敦塔拆除一段楼梯时，从石头底下挖出了一个木箱。打开一看——两具孩子的骨骸，骨头缠在一起。查理二世下令把遗骸封入大理石骨灰坛，安放在威斯敏斯特教堂。1933年医生检查了骨骼，结论是年龄大约十二岁和十岁——正好是两个王子失踪时的年纪。今天的DNA技术完全能给出答案。但威斯敏斯特教堂拒绝了每一次开坛检测的请求。`,
    },
    {
      text: `那凶手到底是谁？螳螂捕蝉，黄雀在后——理查三世看上去就是那只螳螂，但五百多年了，没人搞清楚他身后那只黄雀到底是谁。不少历史学家直接把矛头指向了亨利七世。1485年，亨利在博斯沃思战役中打败理查夺取了王位，终结了撕裂英格兰三十年的玫瑰战争。仔细想想，两个王子对亨利的威胁远比对理查更大。还有人怀疑白金汉公爵，一个一直觊觎王冠的野心家。说到底，那个年代靠近权力的人，谁的手是干净的？`,
    },
    {
      text: `故事还没完。1490年代，一个叫珀金·沃贝克的年轻人突然出现在欧洲各国宫廷，声称自己就是当年逃出伦敦塔的小王子理查。他演得够逼真——法国国王和苏格兰国王都站到了他那边，他甚至两次发兵入侵英格兰。最终被抓，最终被杀。他是真的王子吗？几乎可以肯定不是。但当时没人能证伪，到了今天，依然没人能。`,
    },
    {
      text: `五百多年过去了。威斯敏斯特教堂的大理石坛里，两具小小的骨骸还静静地躺着。没人知道那是谁的骨头。没人知道是谁下的命令。我们甚至没法百分百确定王子们真的被杀了。伦敦塔守过无数秘密，但这一个，它至今没有交出来。有些谜团能撑过五百年，不是因为证据丢了——而是因为掌权的人，从来就不想让答案被找到。`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// JAPANESE (ja)
// Proverb: 勝てば官軍 (If you win, you're the righteous army)
// — subverted: in this case, even the "righteous army" (Henry VII) is suspect.
// The winner wrote the history, but the history doesn't add up.
// Register: NHK documentary / popular nonfiction. Measured authority with
// restrained emotional intensity. Like a compelling historical narrative.
// ═══════════════════════════════════════════════════════════════════════════════

const ja = {
  ...shared,
  lang: "ja",
  langStoryId: "ja#princes-in-the-tower",

  title: `塔に消えた王子`,

  subtitle: `英国王室史上、最も暗い未解決事件`,

  excerpt: `1483年の春、イギリスに12歳の国王が誕生した。エドワード5世。父を亡くしたばかりの少年は、9歳の弟リチャードとともにロンドン塔へ送られた。塔の庭で遊ぶ二人の姿は目撃されていた。だが、やがてその姿はぱったりと消えた。`,

  moralOrLesson: `権力は最も無垢な者すら飲み込む。そしていくつかの真実は、歴史の手が届かない場所に永遠にとどまるのかもしれない——証拠が消えたからではなく、権力者がそれを許さないからだ`,

  characters: [
    `エドワード5世 - 12歳の少年王`,
    `ヨーク公リチャード - 9歳の弟`,
    `リチャード3世 - 叔父、摂政から国王へ`,
    `ジェームズ・ティレル - 暗殺の実行犯とされる人物`,
    `エリザベス・ウッドヴィル - 王子たちの母`,
    `パーキン・ウォーベック - リチャード王子を名乗った人物`,
  ],

  era: `1483年 - 薔薇戦争`,

  paragraphs: [
    {
      text: `1483年の春、イギリスに12歳の国王が誕生した。エドワード5世。父王を亡くしたばかりの少年は、9歳の弟リチャードとともにロンドン塔へ送られた。当時のロンドン塔は、牢獄であるだけでなく王宮でもあった。叔父のグロスター公リチャードが摂政として二人を預かることになった。塔の庭で弓を引いて遊ぶ兄弟の姿が目撃されている。だがやがて、その目撃はぱったりと途絶えた。夏を迎える頃には、二人の王子は跡形もなく消えていた。`,
    },
    {
      text: `叔父の動きは素早かった。二人の王子を庶子と宣言したのだ。根拠はこうだ——父エドワード4世は母親と結婚する前に、別の女性と密かに婚約していた。よって婚姻は無効であり、二人に王位継承権はない。こうして叔父は自らの頭に王冠を載せ、リチャード3世となった。噂はヨーロッパ中を駆け抜けた。フランスの首相は公の場でリチャードは甥を殺したと弾劾した。誰もが同じ問いを口にした——王子たちは、どこへ消えたのか。`,
    },
    {
      text: `最も広く知られている説は、事件から約30年後にトマス・モアが書き残したものだ。リチャード3世がジェームズ・ティレルという騎士をロンドン塔へ送り込んだ。ティレルが雇った男たちは、眠る兄弟の部屋に忍び込み、枕を押し当てて窒息させた。ティレル自身も1502年の処刑直前に犯行を認めたとされている。だが、その自白書を目にした者は一人もいない。文書そのものが存在しないのだ。そしてこの自白の発見で最も得をした人物——それは新王ヘンリー7世だった。`,
    },
    {
      text: `それから約200年後の1674年。ロンドン塔内の階段を解体していた作業員が、石の下に埋もれた木箱を掘り当てた。中には、絡み合うように重なった二体の子どもの骨があった。チャールズ2世は遺骨を大理石の壺に納め、ウェストミンスター寺院に安置させた。1933年の鑑定で、骨はおよそ12歳と10歳のものと判定された——王子たちが消えたときの年齢と一致する。現代のDNA鑑定なら答えは出せる。だがウェストミンスター寺院は、壺を開ける許可を一度たりとも出していない。`,
    },
    {
      text: `では、真犯人は誰なのか。勝てば官軍と日本では言う。だがこの事件では、官軍の正体すら怪しい。リチャード3世ではなく、ヘンリー7世こそ真犯人だと主張する歴史家は少なくない。ヘンリーは1485年、ボズワースの戦いでリチャードを破って王位を奪った。イングランドを30年にわたって引き裂いた薔薇戦争の終幕だ。よく考えれば、二人の王子の存在はリチャードよりもヘンリーにとってはるかに脅威だった。さらにバッキンガム公——王冠を狙う野心家——を犯人に挙げる説もある。権力のそばにいた者は、誰もが動機を持っていた。`,
    },
    {
      text: `物語にはさらに奇妙な展開がある。1490年代、パーキン・ウォーベックという青年がヨーロッパ各国の宮廷に現れ、自分こそ塔を生き延びた弟リチャードだと名乗り出た。その主張には相当な説得力があったらしく、フランス王もスコットランド王も彼を支持した。二度にわたってイングランドに攻め込み、最後は捕らえられ処刑された。本物の王子だったのか。ほぼ間違いなく偽者だろう。だが当時も今も、それを証明できた者はいない。`,
    },
    {
      text: `500年以上が経った。ウェストミンスター寺院の大理石の壺の中で、二つの小さな骨が今も静かに眠っている。それが誰の骨なのか、分からない。誰が命令を下したのかも、分からない。王子たちが本当に殺されたのかさえ、確かなことは言えない。ロンドン塔は何百年もの間、数えきれない秘密を飲み込んできた。だがこの一つだけは、決して吐き出そうとしない。解けない謎がある——証拠が失われたからではない。答えを見つけてほしくない者が、ずっと権力を握り続けてきたからだ。`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// PUSH TO DYNAMODB
// ═══════════════════════════════════════════════════════════════════════════════

async function pushStory(record) {
  const label = `${record.lang}#${record.storyId}`;
  console.log(`\n\u23F3 Pushing ${label} ...`);

  // JSON round-trip validation
  const json = JSON.stringify(record);
  const parsed = JSON.parse(json);
  if (parsed.paragraphs.length !== record.paragraphs.length) {
    throw new Error(`JSON round-trip mismatch for ${label}`);
  }

  // Verify no paragraph has empty text
  for (let i = 0; i < record.paragraphs.length; i++) {
    if (!record.paragraphs[i].text || record.paragraphs[i].text.trim() === "") {
      throw new Error(`Empty paragraph text at index ${i} for ${label}`);
    }
  }

  try {
    await doc.send(
      new PutCommand({
        TableName: TABLE,
        Item: record,
        ConditionExpression: "attribute_not_exists(langStoryId)",
      })
    );
    console.log(`\u2705 ${label} pushed successfully (new record).`);
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      console.log(
        `\u26A0\uFE0F  ${label} already exists. Overwriting with updated version...`
      );
      await doc.send(
        new PutCommand({ TableName: TABLE, Item: record })
      );
      console.log(`\u2705 ${label} overwritten successfully.`);
    } else {
      console.error(`\u274C Failed to push ${label}:`, err.message);
      throw err;
    }
  }
}

async function main() {
  console.log("═══ Pushing Princes in the Tower zh/ja recreations to DynamoDB ═══");
  console.log(`Table: ${TABLE}`);
  console.log(`Site: ${shared.siteId}`);
  console.log(`Timestamp: ${now}`);

  // Validate paragraph constraints before pushing
  for (const rec of [zh, ja]) {
    let totalChars = 0;
    for (let i = 0; i < rec.paragraphs.length; i++) {
      totalChars += rec.paragraphs[i].text.length;
    }
    console.log(
      `\n\uD83D\uDCCA ${rec.lang} "${rec.title}": ${rec.paragraphs.length} paragraphs, ${totalChars} total characters`
    );
    if (totalChars < 800 || totalChars > 2000) {
      console.warn(
        `\u26A0\uFE0F  ${rec.lang} total chars (${totalChars}) outside target range [800-2000]`
      );
    }
  }

  // Push sequentially to confirm each before proceeding
  await pushStory(zh);
  await pushStory(ja);

  console.log("\n═══ Both zh/ja recreations pushed successfully ═══");
}

main().catch((err) => {
  console.error("\n\uD83D\uDCA5 Fatal error:", err);
  process.exit(1);
});
