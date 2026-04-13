import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });
const TABLE = "Story";
const NOW = Math.floor(Date.now() / 1000).toString();

// ============================================================
// CHINESE (zh) — 巨石追日
// Proverb: 天人合一 — subverted: "不是悟出来的——是搬出来的"
// Register: Popular podcast / WeChat longform article
// ============================================================
const zhItem = {
  siteId: { S: `stonehenge` },
  langStoryId: { S: `zh#solstice-druid-mysteries` },
  lang: { S: `zh` },
  storyId: { S: `solstice-druid-mysteries` },
  title: { S: `巨石追日` },
  subtitle: { S: `天文、祭司与一场跨越五千年的朝圣` },
  excerpt: {
    S: `巨石阵的中轴线，对准了夏至的日出和冬至的日落。这种精度不可能是碰巧。五千年前，有人专门这么设计的。`,
  },
  moralOrLesson: {
    S: `石头跟星辰的对齐，归根结底不是天文学的事——是人心的事。想在宇宙里找到秩序，想在光和暗的交界处跟别人站到一起，这股劲儿五千年来一天都没断过。`,
  },
  icon: { S: `\u2600\uFE0F` },
  tier: { S: `A` },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: `巨石阵的中轴线，对准了两个日子：夏至的日出，冬至的日落。每年六月二十一号前后，站在石阵正中间往东北方向看，太阳从一块叫\u201c脚跟石\u201d的巨石正上方升起，第一缕光像被谁瞄准了一样，直直穿过整个石圈的中心。这种精度不是碰巧。五千年前，有人故意把它造成了这样。`,
          },
        },
      },
      {
        M: {
          text: {
            S: `1720年代，一个英国医生彻底改变了世人看巨石阵的方式。他叫威廉\u00b7斯图克利，是第一个拿着工具认真测量、画图、记录石阵的人。当他发现夏至对准线的那一刻，一个念头把他牢牢抓住了：这一定是德鲁伊建的。德鲁伊是谁？凯撒大帝在书里记下的那群古凯尔特祭司，据说统治着整个不列颠的精神世界。斯图克利迷到什么地步？他给自己封了个头衔——\u201c德鲁伊王子\u201d。`,
          },
        },
      },
      {
        M: {
          text: {
            S: `问题是，他搞错了。德鲁伊比巨石阵晚了好几千年。可好故事不管对错，一旦开讲就拦不住。十九世纪，一帮自称德鲁伊的人开始在黎明时分穿白袍到巨石阵做仪式。到了二十世纪中叶，夏至去巨石阵变成了一种朝圣——信异教的来了，搞灵修的来了，还有一大批人只是想靠近一些古老的、真实的、比自己的日子大得多的东西。`,
          },
        },
      },
      {
        M: {
          text: {
            S: `然后事情翻了车。八十年代初，\u201c巨石阵自由音乐节\u201d每年引来几万人，音乐、帐篷、各种另类生活，什么都往里装。当局怕石头被毁，一纸禁令下来。1985年6月1日，大约六百名前往巨石阵的旅行者在半路上被警察截住。接下来的画面让整个英国震惊：砸车窗，拖人，抓人，一共逮捕537人——二战以来英格兰最大规模的集体逮捕。那天后来有了一个名字：豆田之战。`,
          },
        },
      },
      {
        M: {
          text: {
            S: `僵了十几年之后，双方终于各退一步。从2000年起，夏至和冬至那天，巨石阵的石圈免费对所有人开放。每到仲夏，两三万人在暗夜里聚到一起——白袍的德鲁伊、举手机的游客、牵着孩子的家长——安安静静等天亮。当太阳越过脚跟石、光涌进石圈的那一刻，几万人同时爆出一声欢呼。那是五千年前人们在这片平原上见过的同一轮太阳。`,
          },
        },
      },
      {
        M: {
          text: {
            S: `科学家也没放过这条对准线。1965年，天文学家霍金斯出了一本书叫《巨石阵解码》，提出一个大胆的观点：巨石阵就是一台远古计算机，能预测日食和月食。他的一些结论后来被推翻了，但核心判断站住了——巨石阵确实在用惊人的精度追踪太阳和月亮。更绝的是，遗址脚下的白垩岩层有一道天然的隆起，方向正好指着夏至日出——就好像大地自己早就画好了那条线，等了不知道多少年，才等到有人来读懂它。`,
          },
        },
      },
      {
        M: {
          text: {
            S: `我们天天把\u201c天人合一\u201d挂在嘴边，好像悟到了就行。但在巨石阵，天人合一不是悟出来的——是搬出来的。五千年前有人从两百多公里外拖来几十吨重的巨石，一块接一块竖起来，就为了让地上的石头跟天上的太阳严丝合缝。德鲁伊没有建这个地方，这事已经没有争议。但斯图克利说对了一点：这是人类从未停止仰望天空的地方。五千年了，我们还站在同一个石圈里，等着同一束光。`,
          },
        },
      },
    ],
  },
  source: {
    S: `William Stukeley, "Stonehenge: A Temple Restor'd to the British Druids" (1740); Gerald Hawkins, "Stonehenge Decoded" (1965); Andy Worthington, "Stonehenge: Celebration and Subversion" (2004); Christopher Chippindale, "Stonehenge Complete" (4th ed., 2012)`,
  },
  characters: {
    L: [
      { S: `威廉\u00b7斯图克利` },
      { S: `杰拉尔德\u00b7霍金斯` },
      { S: `古代德鲁伊教团` },
      { S: `1980年代的新时代旅行者` },
      { S: `现代夏至朝圣者` },
    ],
  },
  era: {
    S: `新石器时代起源（约公元前3000年）至现代复兴（18世纪至今）`,
  },
  readingTimeMinutes: { N: `3` },
  image: { S: `` },
  updatedAt: { N: NOW },
  disabled: { BOOL: false },
  thumbnail: { S: `` },
  coordinates: {
    M: {
      lng: { N: `-1.8262` },
      lat: { N: `51.1789` },
    },
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: `prophets_pilgrims` },
};

// ============================================================
// JAPANESE (ja) — 太陽を追った巨石
// Proverb: 石の上にも三年 — subverted: "三年ではなく五千年"
// Register: Compelling NHK documentary / popular nonfiction
// ============================================================
const jaItem = {
  siteId: { S: `stonehenge` },
  langStoryId: { S: `ja#solstice-druid-mysteries` },
  lang: { S: `ja` },
  storyId: { S: `solstice-druid-mysteries` },
  title: { S: `太陽を追った巨石` },
  subtitle: { S: `天文学、祭司、そして五千年の巡礼` },
  excerpt: {
    S: `ストーンヘンジは、でたらめに石を並べた場所ではない。中心軸が夏至の日の出と冬至の日没にぴたりと揃えてある。偶然じゃない。`,
  },
  moralOrLesson: {
    S: `石と星の整列が伝えるのは、天文学の話ではなく、人の話だ\u2014\u2014宇宙に秩序を見つけたい、時の流れに印を刻みたい、光と闇の境目にみんなで立っていたい。その衝動は五千年前から何ひとつ変わっていない。`,
  },
  icon: { S: `\u2600\uFE0F` },
  tier: { S: `A` },
  paragraphs: {
    L: [
      {
        M: {
          text: {
            S: `ストーンヘンジは、でたらめに石を並べた場所ではない。中心軸が夏至の日の出と冬至の日没にぴたりと揃えてある。毎年六月二十一日前後、石の輪のど真ん中に立つと、「ヒールストーン」と呼ばれる巨石のちょうど真上から太陽が昇り、最初の光が遺跡の中心をまっすぐ射抜く。偶然じゃない。五千年前、誰かが狙ってこう造った。`,
          },
        },
      },
      {
        M: {
          text: {
            S: `一七二〇年代、ウィリアム・ステュークリーというイギリスの医師が、ストーンヘンジの見方をひっくり返した。彼がこの遺跡を初めてきちんと測量し、図面に落とした人物だ。夏至の整列に気づいた瞬間、ひとつの確信に取り憑かれた\u2014\u2014これはドルイドの仕業にちがいない。ドルイドとは、古代ローマの将軍カエサルが書き残したケルトの祭司集団のこと。ブリテン島の人々の精神世界を握っていたとされる存在だ。ステュークリーはのめり込みすぎて、ついには自分のことを「ドルイドの王子」と名乗りはじめた。`,
          },
        },
      },
      {
        M: {
          text: {
            S: `ところが、彼は間違っていた。ドルイドの時代は、ストーンヘンジの建造より何千年も後の話だ。でも一度走り出した物語は止まらない。十九世紀には白い衣をまとった「ドルイド」たちが夜明けのストーンヘンジで儀式を行うようになった。二十世紀半ばには夏至の巡礼が大きなうねりに育ち、異教の信者やスピリチュアルを求める人たち、それからただ「何か古くて確かなもの」に触れたいだけの人たちが集まりはじめた。`,
          },
        },
      },
      {
        M: {
          text: {
            S: `やがて事態は荒れた。一九八〇年代初頭、「ストーンヘンジ・フリー・フェスティバル」に毎年数万人が押し寄せた。音楽、キャンプ、既成の枠に収まらない生き方の祭典だ。当局は遺跡への被害を恐れ、開催を禁止。一九八五年六月一日、現地へ向かう約六百人の旅行者を警察が途中で封鎖した。そこから先は惨劇だった。車の窓が叩き割られ、家族連れがバスから引きずり出され、五百三十七人が一斉逮捕された\u2014\u2014第二次世界大戦以降、イングランド最大の大量検挙だ。この日は後に「ビーンフィールドの戦い」と呼ばれるようになる。`,
          },
        },
      },
      {
        M: {
          text: {
            S: `長い交渉のすえ、二〇〇〇年に折り合いがついた。夏至と冬至の日に限り、石の輪が無料で開放されることになったのだ。毎年真夏の夜、二万人から三万七千人が暗闇の中に集まる。白衣のドルイド、スマホを構える観光客、小さな子の手を引く親。みんなで静かに朝を待つ。太陽がヒールストーンの向こうから顔を出し、光が石の輪を満たした瞬間\u2014\u2014何万もの歓声が一気にはじける。五千年前、この場所で誰かが見た朝日と、同じものだ。`,
          },
        },
      },
      {
        M: {
          text: {
            S: `この整列は科学者たちの心にも火をつけた。一九六五年、天文学者ジェラルド・ホーキンズが『ストーンヘンジ解読』を出版し、この遺跡は日食や月食を予測する古代のコンピューターだったと主張した。主張の一部は後に退けられたが、核心は揺るがなかった\u2014\u2014ストーンヘンジは驚くべき精度で太陽と月の軌道を追っている。しかも地形そのものが味方していた。遺跡の地下にある白亜の地層には自然にできた隆起があり、その方角がちょうど夏至の日の出を指していたのだ。まるで大地が、人間よりずっと先に目印をつけていたかのように。`,
          },
        },
      },
      {
        M: {
          text: {
            S: `「石の上にも三年」という言葉がある。辛抱すれば報われる、という意味だ。だがストーンヘンジの石の上で人が待ち続けたのは、三年ではなく五千年。そして報われたのは忍耐ではなく、夏至の朝にヒールストーンの向こうから届く、たった一筋の光だった。ドルイドがこの場所を建てたのではない\u2014\u2014それは歴史的に決着がついている。だがステュークリーが正しかったことがひとつある。ここは、人が空を見上げることをやめなかった場所だ。五千年後のいま、私たちはまだ同じ石の輪の中に立ち、同じ太陽を待っている。`,
          },
        },
      },
    ],
  },
  source: {
    S: `William Stukeley, "Stonehenge: A Temple Restor'd to the British Druids" (1740); Gerald Hawkins, "Stonehenge Decoded" (1965); Andy Worthington, "Stonehenge: Celebration and Subversion" (2004); Christopher Chippindale, "Stonehenge Complete" (4th ed., 2012)`,
  },
  characters: {
    L: [
      { S: `ウィリアム・ステュークリー` },
      { S: `ジェラルド・ホーキンズ` },
      { S: `古代ドルイド教団` },
      { S: `1980年代のニューエイジ・トラベラーたち` },
      { S: `現代の夏至巡礼者` },
    ],
  },
  era: {
    S: `新石器時代の起源（紀元前3000年頃）から現代の復興（18世紀〜現在）`,
  },
  readingTimeMinutes: { N: `3` },
  image: { S: `` },
  updatedAt: { N: NOW },
  disabled: { BOOL: false },
  thumbnail: { S: `` },
  coordinates: {
    M: {
      lng: { N: `-1.8262` },
      lat: { N: `51.1789` },
    },
  },
  hasAudio: { BOOL: false },
  isFree: { BOOL: true },
  storyCategory: { S: `prophets_pilgrims` },
};

// ============================================================
// VALIDATION & PUSH
// ============================================================
function validate(item, label) {
  const checks = [
    [item.siteId?.S, `siteId`],
    [item.langStoryId?.S, `langStoryId`],
    [item.lang?.S, `lang`],
    [item.title?.S, `title`],
    [item.subtitle?.S, `subtitle`],
    [item.excerpt?.S, `excerpt`],
    [item.moralOrLesson?.S, `moralOrLesson`],
  ];
  for (const [val, field] of checks) {
    if (!val) throw new Error(`${label}: Missing ${field}`);
  }
  const paras = item.paragraphs?.L;
  if (!paras || paras.length < 6) {
    throw new Error(`${label}: Only ${paras?.length ?? 0} paragraphs`);
  }
  for (let i = 0; i < paras.length; i++) {
    const t = paras[i]?.M?.text?.S;
    if (!t || t.length < 20) {
      throw new Error(`${label}: Paragraph ${i} too short or empty`);
    }
  }
  console.log(`${label}: Validated \u2714 (${paras.length} paragraphs, title="${item.title.S}")`);
}

async function push(item, label) {
  console.log(`\nPushing ${label}...`);
  const cmd = new PutItemCommand({ TableName: TABLE, Item: item });
  const resp = await client.send(cmd);
  console.log(`  \u2713 ${label} pushed successfully (HTTP ${resp.$metadata.httpStatusCode})`);
  return resp;
}

try {
  validate(zhItem, `zh`);
  validate(jaItem, `ja`);

  await push(zhItem, `zh (Chinese)`);
  await push(jaItem, `ja (Japanese)`);

  console.log(`\n=== All pushes completed successfully ===`);
} catch (err) {
  console.error(`\n\u2717 FAILED:`, err.message);
  process.exit(1);
}
